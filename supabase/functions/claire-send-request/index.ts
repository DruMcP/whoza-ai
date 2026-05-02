import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Claire Send Request — Sends WhatsApp/SMS review requests
 * 
 * Triggered by cron or manual invoke.
 * Sends review request to customers whose scheduled time has arrived.
 */

interface ReviewRequest {
  id: string;
  client_id: string;
  customer_name: string;
  phone: string;
  job_type: string;
  review_url: string;
  metadata: {
    business_name?: string;
  };
}

const TEMPLATES = {
  whatsapp: (name: string, jobType: string, businessName: string, url: string) =>
    `Hi ${name}, thanks again for today's ${jobType.toLowerCase()} job.${
      businessName ? `\n\n– ${businessName}` : ""
    }\n\nWould you mind leaving a quick review? It really helps local customers find us.\n\n${url}`,
  
  sms: (name: string, jobType: string, businessName: string, url: string) =>
    `Hi ${name}, thanks for choosing us for your ${jobType.toLowerCase()} job. Would you mind leaving a quick review? ${url} ${businessName ? `- ${businessName}` : ""}`,
};

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get pending review requests that are due
    const now = new Date().toISOString();
    const { data: requests, error: fetchError } = await supabase
      .from("review_requests")
      .select("*")
      .eq("status", "pending")
      .lte("metadata->>scheduled_send_at", now)
      .limit(50);

    if (fetchError) {
      console.error("[Claire Send] Fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch pending requests" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!requests || requests.length === 0) {
      return new Response(
        JSON.stringify({ message: "No pending review requests to send" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const results = [];
    const trilletKey = Deno.env.get("TRILLET_API_KEY");
    const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    for (const request of requests) {
      try {
        const message = TEMPLATES.whatsapp(
          request.customer_name,
          request.job_type,
          request.metadata?.business_name || "",
          request.review_url
        );

        let sent = false;
        let messageSid = null;

        // Try Trillet WhatsApp first (if key available)
        if (trilletKey) {
          const trilletRes = await fetch("https://api.trillet.ai/v1/messages/send", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${trilletKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: request.phone,
              body: message,
              channel: "whatsapp",
            }),
          });

          if (trilletRes.ok) {
            const trilletData = await trilletRes.json();
            messageSid = trilletData.message_id || trilletData.id;
            sent = true;
            console.log(`[Claire] WhatsApp sent to ${request.phone} via Trillet`);
          }
        }

        // Fallback to Twilio SMS (if available and WhatsApp failed)
        if (!sent && twilioSid && twilioToken) {
          const smsMessage = TEMPLATES.sms(
            request.customer_name,
            request.job_type,
            request.metadata?.business_name || "",
            request.review_url
          );

          const twilioRes = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                "Authorization": "Basic " + btoa(`${twilioSid}:${twilioToken}`),
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                To: request.phone,
                From: twilioPhone || "",
                Body: smsMessage,
              }),
            }
          );

          if (twilioRes.ok) {
            const twilioData = await twilioRes.json();
            messageSid = twilioData.sid;
            sent = true;
            console.log(`[Claire] SMS sent to ${request.phone} via Twilio`);
          }
        }

        // Update record
        if (sent) {
          await supabase
            .from("review_requests")
            .update({
              status: "sent",
              sent_at: new Date().toISOString(),
              twilio_message_sid: messageSid,
            })
            .eq("id", request.id);

          results.push({ id: request.id, status: "sent", channel: trilletKey ? "whatsapp" : "sms" });
        } else {
          // No API keys configured — mark as "would send" for tomorrow
          await supabase
            .from("review_requests")
            .update({
              status: "pending",
              metadata: {
                ...request.metadata,
                _queued_for_send: true,
                _queued_at: now,
                _reason: "API keys not configured",
              },
            })
            .eq("id", request.id);

          results.push({ id: request.id, status: "queued", reason: "API keys not configured" });
        }

      } catch (err) {
        console.error(`[Claire Send] Failed for ${request.id}:`, err);
        results.push({ id: request.id, status: "error", error: err.message });
      }
    }

    return new Response(
      JSON.stringify({
        processed: requests.length,
        results,
        message: "Review request batch complete",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[Claire Send] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
