import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Send Call Summary Edge Function
 * Triggered after call.ended webhook
 * Sends WhatsApp and/or SMS summary to the tradesperson
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

    const { call_id, user_id } = await req.json();

    // Get voice config for user preferences
    const { data: config } = await supabaseClient
      .from("voice_configs")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (!config) {
      throw new Error("Voice config not found");
    }

    // Get call log details
    const { data: callLog } = await supabaseClient
      .from("call_logs")
      .select("*")
      .eq("trillet_call_id", call_id)
      .eq("user_id", user_id)
      .single();

    if (!callLog) {
      throw new Error("Call log not found");
    }

    const message = formatSummary(config, callLog);
    const toNumber = config.forward_number;

    const sentChannels = [];

    // Send WhatsApp if enabled
    if (config.whatsapp_summary) {
      try {
        const waResponse = await sendTwilioMessage(
          twilioAccountSid,
          twilioAuthToken,
          `whatsapp:${twilioPhone}`,
          `whatsapp:${toNumber}`,
          message
        );
        if (waResponse.ok) sentChannels.push("whatsapp");
      } catch (e) {
        console.error("WhatsApp send failed:", e);
      }
    }

    // Send SMS if enabled (and WhatsApp failed or SMS also enabled)
    if (config.sms_summary) {
      try {
        const smsResponse = await sendTwilioMessage(
          twilioAccountSid,
          twilioAuthToken,
          twilioPhone,
          toNumber,
          message
        );
        if (smsResponse.ok) sentChannels.push("sms");
      } catch (e) {
        console.error("SMS send failed:", e);
      }
    }

    // Update call log with summary sent status
    await supabaseClient
      .from("call_logs")
      .update({
        summary_sent: true,
        summary_channels: sentChannels,
        updated_at: new Date().toISOString(),
      })
      .eq("id", callLog.id);

    return new Response(
      JSON.stringify({ success: true, channels: sentChannels }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("send-call-summary error:", error);
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

function formatSummary(config: any, call: any): string {
  const time = new Date(call.created_at).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let msg = `📞 *whoza.ai Call Summary*\n\n`;
  msg += `Time: ${time}\n`;
  msg += `Caller: ${call.customer_name || "Unknown"}\n`;
  msg += `Duration: ${Math.round(call.duration / 60)}m ${call.duration % 60}s\n`;
  msg += `Service: ${call.service_requested || "General enquiry"}\n\n`;

  if (call.booking_made) {
    msg += `✅ *Booking confirmed*\n`;
    msg += `Date: ${call.booking_date || "TBD"}\n`;
    msg += `Time: ${call.booking_time || "TBD"}\n\n`;
  }

  if (call.is_emergency) {
    msg += `🚨 *Emergency call* — transferred to you\n\n`;
  }

  if (call.sentiment === "negative") {
    msg += `⚠️ *Note:* Call sentiment was negative. Consider following up.\n\n`;
  }

  msg += `Reply STOP to pause summaries.`;

  return msg;
}
