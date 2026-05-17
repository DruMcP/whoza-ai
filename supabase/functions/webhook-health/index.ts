import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

/**
 * Supabase Edge Function: webhook-health
 * 
 * Runs every 5 minutes via pg_cron to check voice webhook health.
 * 
 * Checks:
 * 1. Trillet webhook endpoint responds with 200 and < 2000ms
 * 2. Supabase calls table has records in last 15 min (business hours)
 * 3. Response body schema is valid
 * 
 * On failure: Creates agent_metrics record + alerts via Opsgenie if critical
 * 
 * @trigger pg_cron: */5 * * * *
 * @environment SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPSGENIE_API_KEY
 */

const WEBHOOK_URL = Deno.env.get("WEBHOOK_HEALTH_URL") || "https://www.whoza.ai/api/health/trillet";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const OPSGENIE_KEY = Deno.env.get("OPSGENIE_API_KEY");

// Business hours: 07:00 - 19:00 UK time
const BUSINESS_HOURS = { start: 7, end: 19 };

interface HealthCheckResult {
  timestamp: string;
  webhook_status: number;
  webhook_latency_ms: number;
  webhook_body_valid: boolean;
  calls_last_15min: number;
  business_hours: boolean;
  alert_triggered: boolean;
  alert_reason?: string;
}

Deno.serve(async (req) => {
  const startTime = Date.now();
  const now = new Date();
  const ukHour = now.getUTCHours(); // Simplified - UK time is UTC+1 (BST) or UTC+0 (GMT)
  const isBusinessHours = ukHour >= BUSINESS_HOURS.start && ukHour < BUSINESS_HOURS.end;

  const result: HealthCheckResult = {
    timestamp: now.toISOString(),
    webhook_status: 0,
    webhook_latency_ms: 0,
    webhook_body_valid: false,
    calls_last_15min: 0,
    business_hours: isBusinessHours,
    alert_triggered: false,
  };

  try {
    // ─── 1. Check webhook endpoint ───
    const webhookStart = Date.now();
    const webhookRes = await fetch(WEBHOOK_URL, {
      method: "GET",
      headers: { "User-Agent": "whoza-webhook-health-agent/1.0" },
    });
    result.webhook_latency_ms = Date.now() - webhookStart;
    result.webhook_status = webhookRes.status;

    if (webhookRes.ok) {
      const body = await webhookRes.json();
      // Validate expected fields exist
      result.webhook_body_valid = 
        body.status !== undefined &&
        body.timestamp !== undefined &&
        body.checks !== undefined;
    }

    // ─── 2. Check calls table ───
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const fifteenMinAgo = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
    
    const { count, error } = await supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fifteenMinAgo);

    if (error) {
      console.error("Supabase query error:", error);
      result.calls_last_15min = -1; // Error indicator
    } else {
      result.calls_last_15min = count || 0;
    }

    // ─── 3. Determine if alert needed ───
    const webhookFailed = result.webhook_status >= 500 || result.webhook_latency_ms > 2000;
    const noCallsDuringBusiness = isBusinessHours && result.calls_last_15min === 0;
    
    if (webhookFailed || noCallsDuringBusiness) {
      result.alert_triggered = true;
      result.alert_reason = webhookFailed 
        ? `Webhook ${result.webhook_status} (${result.webhook_latency_ms}ms)`
        : "Zero calls during business hours";
    }

    // ─── 4. Store metrics ───
    await supabase.from("agent_metrics").insert({
      agent_name: "webhook-health",
      metric_type: "webhook_check",
      value: result.webhook_latency_ms,
      metadata: result,
      created_at: now.toISOString(),
    });

    // ─── 5. Send Opsgenie alert if critical ───
    if (result.alert_triggered && OPSGENIE_KEY) {
      await sendOpsgenieAlert(result);
    }

    const duration = Date.now() - startTime;
    console.log(`[webhook-health] Checked in ${duration}ms — Status: ${result.webhook_status}, Latency: ${result.webhook_latency_ms}ms, Calls: ${result.calls_last_15min}`);

    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[webhook-health] Fatal error:", error);
    
    // Store error metric
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    await supabase.from("agent_metrics").insert({
      agent_name: "webhook-health",
      metric_type: "error",
      value: 0,
      metadata: { error: error.message },
      created_at: now.toISOString(),
    });

    return new Response(
      JSON.stringify({ error: "Health check failed", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

async function sendOpsgenieAlert(result: HealthCheckResult) {
  const priority = result.webhook_status >= 500 ? "P1" : "P2";
  
  const alertPayload = {
    message: `[${priority}] Whoza.ai Voice Webhook Issue`,
    description: `Webhook health check failed: ${result.alert_reason}`,
    priority,
    alias: `whoza-webhook-${new Date().toISOString().split("T")[0]}`,
    tags: ["voice", "webhook", "autonomous-agent"],
    details: {
      webhook_status: String(result.webhook_status),
      webhook_latency_ms: String(result.webhook_latency_ms),
      calls_last_15min: String(result.calls_last_15min),
      business_hours: String(result.business_hours),
      timestamp: result.timestamp,
    },
  };

  const res = await fetch("https://api.opsgenie.com/v2/alerts", {
    method: "POST",
    headers: {
      "Authorization": `GenieKey ${OPSGENIE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertPayload),
  });

  if (!res.ok) {
    console.error("Failed to send Opsgenie alert:", await res.text());
  } else {
    console.log(`✅ Opsgenie ${priority} alert sent`);
  }
}
