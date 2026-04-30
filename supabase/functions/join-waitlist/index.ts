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

  // Rate limit: 5 submissions per minute per IP
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP, 5, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.remaining, rateLimit.resetAt);
  }

  try {
    const { email, business_name, trade_type, phone, website_url, postcode } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Use service role key for internal operations — public waitlist signup
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase.rpc('join_waitlist', {
      p_email: email,
      p_business_name: business_name || null,
      p_trade_type: trade_type || null,
      p_phone: phone || null,
      p_website_url: website_url || null,
      p_postcode: postcode || null,
    });

    if (error) throw error;

    return new Response(
      JSON.stringify(data),
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