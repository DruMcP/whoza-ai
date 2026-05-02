import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Claire Send Request — Sends WhatsApp/SMS review requests via Trillet
 * 
 * Triggered by cron or manual invoke.
 * Sends review request to customers whose scheduled time has arrived.
 * Trillet handles both WhatsApp and SMS natively — no Twilio needed.
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
    preferred_channel?: "whatsapp" | "sms";
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
    const trilletSecret = Deno.env.get("TRILLET_API_SECRET");

    for (const request of requests) {
      try {
        const channel = request.metadata?.preferred_channel || "whatsapp";
        const message = channel === "sms" 
          ? TEMPLATES.sms(
              request.customer_name,
              request.job_type,
              request.metadata?.business_name || "",
              request.review_url
            )
          : TEMPLATES.whatsapp(
              request.customer_name,
              request.job_type,
              request.metadata?.business_name || "",
              request.review_url
            );

        let sent = false;
        let messageId = null;

        // Send via Trillet (handles both WhatsApp and SMS)
        if (trilletKey) {
          const trilletRes = await fetch("https://api.trillet.ai/v1/messages/send", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${trilletKey}`,
              "X-API-Secret": trilletSecret || "",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: request.phone,
              body: message,
              channel: channel, // "whatsapp" or "sms"
              agent_id: Deno.env.get("TRILLET_AGENT_ID") || "claire-agent",
            }),
          });

          if (trilletRes.ok) {
            const trilletData = await trilletRes.json();
            messageId = trilletData.message_id || trilletData.id;
            sent = true;
            console.log(`[Claire] ${channel} sent to ${request.phone} via Trillet`);
          } else {
            const errorText = await trilletRes.text();
            console.error(`[Claire] Trillet failed: ${errorText}`);
          }
        }

        // Update record
        if (sent) {
          await supabase
            .from("review_requests")
            .update({
              status: "sent",
              sent_at: new Date().toISOString(),
              message_id: messageId,
              channel: channel,
            })
            .eq("id", request.id);

          results.push({ 
            id: request.id, 
            status: "sent", 
            channel: channel,
            provider: "trillet"
          });
        } else {
          // No API keys configured — mark as queued
          await supabase
            .from("review_requests")
            .update({
              status: "pending",
              metadata: {
                ...request.metadata,
                _queued_for_send: true,
                _queued_at: now,
                _reason: "Trillet API keys not configured",
              },
            })
            .eq("id", request.id);

          results.push({ 
            id: request.id, 
            status: "queued", 
            reason: "Trillet API keys not configured" 
          });
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
