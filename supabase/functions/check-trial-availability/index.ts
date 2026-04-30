import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { checkRateLimit, getClientIP, rateLimitResponse } from '../_shared/rateLimiter.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Rate limit: 30 requests per minute per IP
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP, 30, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.remaining, rateLimit.resetAt);
  }

  try {
    // Use service role key for internal operations — no user auth required for public availability check
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase.rpc('get_current_trial_week');
    
    if (error) throw error;

    return new Response(
      JSON.stringify({
        available: data.slots_remaining > 0,
        slots_remaining: data.slots_remaining,
        slots_total: data.slots_total,
        slots_used: data.slots_used,
        week_starting: data.week_starting,
        reset_at: data.reset_at,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': String(rateLimit.remaining) },
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
