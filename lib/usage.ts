import { createClient } from "@supabase/supabase-js";

/**
 * Usage Tracking Service
 * 
 * Tracks voice agent usage against plan limits.
 * Alerts when approaching limits or overages.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export interface UsageSummary {
  clientId: string;
  period: string; // "2026-05"
  totalMinutes: number;
  totalCalls: number;
  planMinutes: number;
  planName: string;
  percentUsed: number;
  overageMinutes: number;
  overageCost: number;
  isNearLimit: boolean;
  isOverLimit: boolean;
}

export async function getUsageSummary(clientId: string): Promise<UsageSummary | null> {
  const supabase = getSupabaseAdmin();

  // Get client's plan
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("plan_id, plan:plans(*)")
    .eq("id", clientId)
    .single();

  if (clientError || !client) {
    console.error("[Usage] Failed to fetch client:", clientError);
    return null;
  }

  const plan = client.plan;
  const planMinutes = plan?.included_minutes || 0;
  const overageRate = plan?.overage_rate_per_minute || 0;

  // Get current month's usage
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  const { data: calls, error: callsError } = await supabase
    .from("calls")
    .select("duration_seconds")
    .eq("client_id", clientId)
    .gte("started_at", periodStart)
    .lte("started_at", periodEnd)
    .not("duration_seconds", "is", null);

  if (callsError) {
    console.error("[Usage] Failed to fetch calls:", callsError);
    return null;
  }

  const totalSeconds = calls?.reduce((sum, call) => sum + (call.duration_seconds || 0), 0) || 0;
  const totalMinutes = Math.ceil(totalSeconds / 60);
  const totalCalls = calls?.length || 0;

  const percentUsed = planMinutes > 0 ? Math.round((totalMinutes / planMinutes) * 100) : 0;
  const overageMinutes = Math.max(0, totalMinutes - planMinutes);
  const overageCost = overageMinutes * overageRate;

  return {
    clientId,
    period: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    totalMinutes,
    totalCalls,
    planMinutes,
    planName: plan?.name || "Unknown",
    percentUsed,
    overageMinutes,
    overageCost,
    isNearLimit: percentUsed >= 80 && percentUsed < 100,
    isOverLimit: percentUsed >= 100,
  };
}

export async function checkUsageLimit(clientId: string): Promise<{ allowed: boolean; reason?: string }> {
  const summary = await getUsageSummary(clientId);
  if (!summary) return { allowed: true }; // Allow if we can't determine

  if (summary.isOverLimit) {
    return {
      allowed: false,
      reason: `Plan limit exceeded: ${summary.totalMinutes}/${summary.planMinutes} minutes used`,
    };
  }

  return { allowed: true };
}

export async function logUsage(clientId: string, callId: string, durationSeconds: number) {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("usage_logs").insert({
    client_id: clientId,
    call_id: callId,
    duration_seconds: durationSeconds,
    billed_minutes: Math.ceil(durationSeconds / 60),
    period: new Date().toISOString().slice(0, 7), // "2026-05"
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("[Usage] Failed to log usage:", error);
  }
}
