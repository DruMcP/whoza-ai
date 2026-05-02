import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Claire Reminder — Sends follow-up review reminders
 * 
 * Triggered by cron every hour.
 * Finds review requests where:
 * - Status = "sent" (not clicked or completed)
 * - sent_at > 24 hours ago
 * - reminder_sent = false
 */

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Find review requests needing reminders
    const { data: requests, error: fetchError } = await supabase
      .from("review_requests")
      .select("*")
      .eq("status", "sent")
      .eq("reminder_sent", false)
      .lt("sent_at", twentyFourHoursAgo)
      .limit(50);

    if (fetchError) {
      console.error("[Claire Reminder] Fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch pending reminders" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!requests || requests.length === 0) {
      return new Response(
        JSON.stringify({ message: "No reminders to send" }),
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
        const reminderMessage = `Just a quick reminder—would really appreciate a review if you have a minute. It helps other customers find us.\n\n${request.review_url}`;

        let sent = false;

        // Try Trillet WhatsApp first
        if (trilletKey) {
          const trilletRes = await fetch("https://api.trillet.ai/v1/messages/send", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${trilletKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: request.phone,
              body: reminderMessage,
              channel: "whatsapp",
            }),
          });

          if (trilletRes.ok) {
            sent = true;
            console.log(`[Claire Reminder] WhatsApp reminder sent to ${request.phone}`);
          }
        }

        // Fallback to Twilio SMS
        if (!sent && twilioSid && twilioToken) {
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
                Body: `Quick reminder: would appreciate a review! ${request.review_url}`,
              }),
            }
          );

          if (twilioRes.ok) {
            sent = true;
            console.log(`[Claire Reminder] SMS reminder sent to ${request.phone}`);
          }
        }

        // Update record
        if (sent) {
          await supabase
            .from("review_requests")
            .update({
              reminder_sent: true,
              reminder_sent_at: new Date().toISOString(),
            })
            .eq("id", request.id);

          results.push({ id: request.id, status: "reminder_sent" });
        } else {
          // Queue for tomorrow when keys are available
          results.push({ id: request.id, status: "queued", reason: "API keys not configured" });
        }

      } catch (err) {
        console.error(`[Claire Reminder] Failed for ${request.id}:`, err);
        results.push({ id: request.id, status: "error", error: err.message });
      }
    }

    return new Response(
      JSON.stringify({
        processed: requests.length,
        results,
        message: "Reminder batch complete",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[Claire Reminder] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
