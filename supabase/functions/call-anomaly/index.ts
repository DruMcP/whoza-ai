import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

/**
 * Supabase Edge Function: call-anomaly
 * 
 * Runs hourly during business hours (07:00–19:00 UK time) via pg_cron.
 * 
 * Detects anomalies in voice call volume compared to 30-day baselines.
 * 
 * Logic:
 * 1. Fetch baseline for current day-of-week + hour
 * 2. Count calls in last hour
 * 3. Alert if current hour < 50% of baseline (voice flow breakage)
 * 4. Alert if error rate > 5%
 * 5. Store metrics in agent_metrics table
 * 
 * @trigger pg_cron: hourly during business hours
 * @environment SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ALERTOPS_API_KEY, SLACK_WEBHOOK_URL
 */

const SUPABASE_URL = Deno.env.get("DB_URL") || Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ALERTOPS_KEY = Deno.env.get("ALERTOPS_API_KEY") || Deno.env.get("OPSGENIE_API_KEY");
const SLACK_WEBHOOK = Deno.env.get("SLACK_WEBHOOK_URL");

const BUSINESS_HOURS = { start: 7, end: 19 };

interface AnomalyCheck {
  timestamp: string;
  day_of_week: number;
  hour_of_day: number;
  baseline_avg: number;
  baseline_min: number;
  baseline_max: number;
  current_calls: number;
  error_count: number;
  total_calls: number;
  error_rate_pct: number;
  volume_anomaly: boolean;
  error_anomaly: boolean;
  alert_triggered: boolean;
  alert_reason?: string;
}

Deno.serve(async (req) => {
  const now = new Date();
  const ukHour = now.getUTCHours();
  const ukDay = now.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Only run during business hours (07:00–19:00 UK time)
  // Note: This assumes UTC+0. For BST (UTC+1), adjust accordingly.
  // For simplicity, we check if hour is between 7-19 UTC (covers most of UK business hours)
  if (ukHour < BUSINESS_HOURS.start || ukHour >= BUSINESS_HOURS.end) {
    return new Response(
      JSON.stringify({ 
        status: "skipped", 
        reason: "Outside business hours", 
        ukHour,
        business_hours: BUSINESS_HOURS 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const result: AnomalyCheck = {
    timestamp: now.toISOString(),
    day_of_week: ukDay,
    hour_of_day: ukHour,
    baseline_avg: 0,
    baseline_min: 0,
    baseline_max: 0,
    current_calls: 0,
    error_count: 0,
    total_calls: 0,
    error_rate_pct: 0,
    volume_anomaly: false,
    error_anomaly: false,
    alert_triggered: false,
  };

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // ─── 1. Fetch baseline for current day/hour ───
    const { data: baseline, error: baselineError } = await supabase
      .from("call_baselines")
      .select("avg_calls, min_calls, max_calls")
      .eq("day_of_week", ukDay)
      .eq("hour_of_day", ukHour)
      .single();

    if (baselineError) {
      console.log("No baseline found for", ukDay, ukHour, "— recalculating...");
      // Trigger baseline recalculation
      await supabase.rpc("recalculate_call_baselines");
      
      // Try again
      const { data: newBaseline } = await supabase
        .from("call_baselines")
        .select("avg_calls, min_calls, max_calls")
        .eq("day_of_week", ukDay)
        .eq("hour_of_day", ukHour)
        .single();
      
      if (newBaseline) {
        result.baseline_avg = newBaseline.avg_calls;
        result.baseline_min = newBaseline.min_calls;
        result.baseline_max = newBaseline.max_calls;
      }
    } else if (baseline) {
      result.baseline_avg = baseline.avg_calls;
      result.baseline_min = baseline.min_calls;
      result.baseline_max = baseline.max_calls;
    }

    // ─── 2. Count calls in last hour ───
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    
    const { count: totalCalls, error: countError } = await supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneHourAgo);

    if (countError) {
      console.error("Error counting calls:", countError);
      result.total_calls = -1;
    } else {
      result.total_calls = totalCalls || 0;
      result.current_calls = totalCalls || 0;
    }

    // ─── 3. Count errors in last hour ───
    const { count: errorCount, error: errorCountError } = await supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneHourAgo)
      .eq("status", "error");

    if (errorCountError) {
      console.error("Error counting errors:", errorCountError);
      result.error_count = -1;
    } else {
      result.error_count = errorCount || 0;
    }

    // ─── 4. Calculate error rate ───
    if (result.total_calls > 0) {
      result.error_rate_pct = (result.error_count / result.total_calls) * 100;
    }

    // ─── 5. Detect anomalies ───
    // Volume anomaly: current < 50% of baseline (but only if baseline exists and > 0)
    if (result.baseline_avg > 0 && result.current_calls < (result.baseline_avg * 0.5)) {
      result.volume_anomaly = true;
      result.alert_triggered = true;
      result.alert_reason = `Call volume ${result.current_calls} is < 50% of baseline ${result.baseline_avg} (hour ${ukHour}, day ${ukDay})`;
    }

    // Error anomaly: error rate > 5%
    if (result.error_rate_pct > 5) {
      result.error_anomaly = true;
      result.alert_triggered = true;
      result.alert_reason = result.alert_reason 
        ? `${result.alert_reason}; Error rate ${result.error_rate_pct.toFixed(1)}% > 5%`
        : `Error rate ${result.error_rate_pct.toFixed(1)}% exceeds 5% threshold`;
    }

    // ─── 6. Store metrics ───
    await supabase.from("agent_metrics").insert({
      agent_name: "call-anomaly",
      metric_type: "anomaly_check",
      value: result.current_calls,
      metadata: result,
      created_at: now.toISOString(),
    });

    // ─── 7. Send alerts if anomalies detected ───
    if (result.alert_triggered) {
      console.log(`🚨 ANOMALY DETECTED: ${result.alert_reason}`);
      
    if (ALERTOPS_KEY) {
        await sendAlert(result);
      }
      
      if (SLACK_WEBHOOK) {
        await sendSlackAlert(result);
      }
    } else {
      console.log(`✅ Normal: ${result.current_calls} calls, ${result.error_rate_pct.toFixed(2)}% error rate (baseline: ${result.baseline_avg})`);
    }

    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[call-anomaly] Fatal error:", error);
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    await supabase.from("agent_metrics").insert({
      agent_name: "call-anomaly",
      metric_type: "error",
      value: 0,
      metadata: { error: error.message },
      created_at: now.toISOString(),
    });

    return new Response(
      JSON.stringify({ error: "Anomaly check failed", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

async function sendAlert(result: AnomalyCheck) {
  const priority = result.volume_anomaly && result.current_calls === 0 ? "P1" : "P2";
  
  const alertPayload = {
    title: `[${priority}] Whoza.ai Call Anomaly Detected`,
    message: result.alert_reason || "Anomaly detected",
    priority,
    source: "whoza-call-anomaly",
    alias: `whoza-anomaly-${result.day_of_week}-${result.hour_of_day}-${new Date().toISOString().split("T")[0]}`,
    tags: ["voice", "anomaly", "autonomous-agent"],
    details: {
      current_calls: String(result.current_calls),
      baseline_avg: String(result.baseline_avg),
      error_rate_pct: String(result.error_rate_pct.toFixed(2)),
      hour_of_day: String(result.hour_of_day),
      day_of_week: String(result.day_of_week),
      timestamp: result.timestamp,
    },
  };

  const alertopsKey = Deno.env.get("ALERTOPS_API_KEY");
  const opsgenieKey = Deno.env.get("OPSGENIE_API_KEY");
  
  if (alertopsKey) {
    const res = await fetch("https://api.alertops.com/v2/alerts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${alertopsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertPayload),
    });

    if (!res.ok) {
      console.error("Failed to send AlertOps alert:", await res.text());
    } else {
      console.log(`✅ AlertOps ${priority} alert sent`);
    }
  } else if (opsgenieKey) {
    const res = await fetch("https://api.opsgenie.com/v2/alerts", {
      method: "POST",
      headers: {
        "Authorization": `GenieKey ${opsgenieKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertPayload),
    });

    if (!res.ok) {
      console.error("Failed to send Opsgenie alert:", await res.text());
    } else {
      console.log(`✅ Opsgenie ${priority} alert sent (legacy)`);
    }
  }
}

async function sendSlackAlert(result: AnomalyCheck) {
  const slackPayload = {
    text: `🚨 *Call Anomaly Detected* — ${result.alert_reason}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚨 Call Anomaly Detected",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Current Calls:*\n${result.current_calls}` },
          { type: "mrkdwn", text: `*Baseline Avg:*\n${result.baseline_avg}` },
          { type: "mrkdwn", text: `*Error Rate:*\n${result.error_rate_pct.toFixed(2)}%` },
          { type: "mrkdwn", text: `*Hour:*\n${result.hour_of_day}:00 (Day ${result.day_of_week})` },
        ],
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Timestamp: ${result.timestamp}` },
        ],
      },
    ],
  };

  const res = await fetch(SLACK_WEBHOOK!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackPayload),
  });

  if (!res.ok) {
    console.error("Failed to send Slack alert:", await res.text());
  } else {
    console.log("✅ Slack alert sent");
  }
}
