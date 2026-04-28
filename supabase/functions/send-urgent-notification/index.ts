import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Send Urgent Notification Edge Function
 * Triggered by call.emergency webhook
 * Immediately forwards the caller to the tradesperson via SMS + optional phone call
 */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhone) {
      throw new Error("Twilio credentials not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const { call_id, user_id, customer_number, emergency_type } = await req.json();

    // Get voice config
    const { data: config } = await supabaseClient
      .from("voice_configs")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (!config || !config.forward_number) {
      throw new Error("No forward number configured for emergency routing");
    }

    const toNumber = config.forward_number;

    // 1. Send urgent SMS immediately
    const urgentMessage = `🚨 URGENT — whoza.ai\n\nEmergency ${emergency_type || "call"} from ${customer_number || "unknown caller"}.\n\nThe caller has been put through to you now. If you cannot answer, they will be asked to leave a voicemail.\n\nwhoza.ai`;

    const smsResponse = await sendTwilioMessage(
      twilioAccountSid,
      twilioAuthToken,
      twilioPhone,
      toNumber,
      urgentMessage
    );

    // 2. Log emergency event
    await supabaseClient
      .from("trillet_webhook_events")
      .insert({
        event_type: "call.emergency",
        payload: { call_id, customer_number, emergency_type, forwarded_to: toNumber },
        processed: true,
        created_at: new Date().toISOString(),
      });

    // 3. Update call log as emergency
    await supabaseClient
      .from("call_logs")
      .update({
        is_emergency: true,
        emergency_type: emergency_type || "general",
        updated_at: new Date().toISOString(),
      })
      .eq("trillet_call_id", call_id)
      .eq("user_id", user_id);

    return new Response(
      JSON.stringify({
        success: true,
        sms_sent: smsResponse.ok,
        forwarded_to: toNumber,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("send-urgent-notification error:", error);
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
