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

  // Rate limit: 3 executions per hour per IP (cron/admin only)
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP, 3, 60 * 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.remaining, rateLimit.resetAt);
  }

  // Verify admin authorization
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized. Admin access required.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Activate waitlist entries (set to 'notified' status)
    const { data, error } = await supabase.rpc('process_waitlist_activations', {
      p_limit: 25,
    });

    if (error) throw error;

    // Fetch the newly notified entries to send emails
    const { data: notifiedEntries, error: fetchError } = await supabase
      .from('trial_waitlist')
      .select('*')
      .eq('status', 'notified')
      .is('notified_at', null) // Only ones just activated
      .order('position', { ascending: true })
      .limit(25);

    if (fetchError) throw fetchError;

    // Send notifications via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey && notifiedEntries && notifiedEntries.length > 0) {
      for (const entry of notifiedEntries) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Whoza.ai <hello@whoza.ai>',
              to: entry.email,
              subject: 'Your whoza.ai trial slot is open — activate within 24 hours',
              html: `
                <h1>Your trial slot is ready</h1>
                <p>Hi ${entry.business_name || 'there'},</p>
                <p>A 7-day trial slot has opened for you on whoza.ai. You have <strong>24 hours</strong> to activate it before it goes to the next person on the waitlist.</p>
                <p><a href="https://whoza.ai/start?waitlist=${entry.id}" style="background:#C2FF48;color:#0A0A0A;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Activate My Trial →</a></p>
                <p>Questions? Reply to this email.</p>
              `,
            }),
          });

          // Mark as notified with timestamp
          await supabase
            .from('trial_waitlist')
            .update({ notified_at: new Date().toISOString() })
            .eq('id', entry.id);

        } catch (emailErr) {
          console.error(`Failed to send email to ${entry.email}:`, emailErr);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        activated: data?.activated || 0,
        remaining: data?.remaining || 0,
        emails_sent: notifiedEntries?.length || 0,
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
