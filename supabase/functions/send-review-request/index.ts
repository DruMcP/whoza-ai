import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Send Review Request Edge Function
 * Triggered 24 hours after a completed booking
 * Sends SMS + WhatsApp review request with custom review link
 */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");
    const siteUrl = Deno.env.get("SITE_URL") || "https://whoza.ai";

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhone) {
      throw new Error("Twilio credentials not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const { user_id, customer_number, customer_name, service_type } = await req.json();

    if (!user_id || !customer_number) {
      throw new Error("user_id and customer_number required");
    }

    // Get voice config for review settings
    const { data: config } = await supabaseClient
      .from("voice_configs")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (!config || config.review_enabled === false) {
      return new Response(
        JSON.stringify({ success: true, message: "Review requests disabled" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate review link
    const reviewLink = config.google_review_link || `${siteUrl}/review/${user_id}`;

    const message = `Hi ${customer_name || "there"}! 👋\n\nThanks for choosing ${config.business_name || "us"} for your ${service_type || "job"} yesterday.\n\nWould you mind leaving us a quick review? It really helps local tradespeople like us.\n\n${reviewLink}\n\nThanks so much!\n${config.business_name || "Team"}`;

    // Send SMS review request
    const smsResponse = await sendTwilioMessage(
      twilioAccountSid,
      twilioAuthToken,
      twilioPhone,
      customer_number,
      message
    );

    // Log review request
    await supabaseClient
      .from("scheduled_tasks")
      .insert({
        user_id,
        task_type: "review_request",
        status: "completed",
        customer_number,
        customer_name,
        service_type,
        review_link: reviewLink,
        sms_sent: smsResponse.ok,
        created_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({
        success: true,
        sms_sent: smsResponse.ok,
        review_link: reviewLink,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("send-review-request error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function sendTwilioMessage(
  accountSid: string,
  authToken: string,
  from: string,
  to: string,
  body: string
): Promise<Response> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = btoa(`${accountSid}:${authToken}`);

  return fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      From: from,
      To: to,
      Body: body,
    }),
  });
}
