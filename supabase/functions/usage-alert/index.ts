/**
 * Usage Alert Handler
 *
 * Monitors call minute usage and sends alerts when clients approach or exceed
 * their plan allowance. Triggered by Supabase cron or external scheduler.
 *
 * Endpoint: POST /functions/v1/usage-alert
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface UsageAlertRequest {
  clientId?: string;
  checkAll?: boolean;
}

// Thresholds as percentage of plan allowance
const WARNING_THRESHOLD = 0.75;  // 75% — warn user
const CRITICAL_THRESHOLD = 0.95; // 95% — warn + notify admin

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { clientId, checkAll }: UsageAlertRequest = await req.json().catch(() => ({}));

    // Build query — either check one client or all active ones
    let query = supabase
      .from('usage_logs')
      .select('client_id, date, minutes_used, minutes_remaining, plan_allowance, overage_minutes')
      .eq('date', new Date().toISOString().split('T')[0]);

    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    const { data: usageRecords, error: fetchError } = await query;

    if (fetchError) {
      console.error('Error fetching usage logs:', fetchError);
      throw new Error('Failed to fetch usage data');
    }

    const alerts: Array<{
      clientId: string;
      severity: 'warning' | 'critical';
      minutesUsed: number;
      planAllowance: number;
      percentage: number;
    }> = [];

    for (const record of (usageRecords || [])) {
      const percentage = record.plan_allowance > 0
        ? record.minutes_used / record.plan_allowance
        : 0;

      if (percentage >= CRITICAL_THRESHOLD) {
        alerts.push({
          clientId: record.client_id,
          severity: 'critical',
          minutesUsed: record.minutes_used,
          planAllowance: record.plan_allowance,
          percentage: Math.round(percentage * 100),
        });
      } else if (percentage >= WARNING_THRESHOLD) {
        alerts.push({
          clientId: record.client_id,
          severity: 'warning',
          minutesUsed: record.minutes_used,
          planAllowance: record.plan_allowance,
          percentage: Math.round(percentage * 100),
        });
      }
    }

    // TODO: Send email/SMS notifications for critical alerts
    // TODO: Update client dashboard with warning banners

    for (const alert of alerts) {
      console.log(`[Usage Alert] ${alert.severity.toUpperCase()}: Client ${alert.clientId} at ${alert.percentage}% (${alert.minutesUsed}/${alert.planAllowance} mins)`);
    }

    return new Response(
      JSON.stringify({
        checked: usageRecords?.length || 0,
        alerts,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('usage-alert error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
