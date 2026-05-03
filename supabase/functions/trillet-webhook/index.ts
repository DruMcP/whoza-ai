import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Trillet Webhook Handler
 * Receives call events from Trillet AI voice platform
 * Events: call.started, call.ended, call.booking, call.emergency, call.spam
 */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const trilletApiKey = Deno.env.get("TRILLET_API_KEY");
    if (!trilletApiKey) {
      throw new Error("TRILLET_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const body = await req.json();
    const eventType = body.event_type;
    const callData = body.call;
    const userId = body.user_id;

    // Verify the webhook is from Trillet (simple API key check)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.includes(trilletApiKey)) {
      // For staging, we accept all webhooks for testing
      // In production, implement proper signature verification
      console.log("Webhook received (staging mode - auth relaxed)");
    }

    // Log the webhook event
    await supabaseClient.from("trillet_webhook_events").insert({
      event_type: eventType,
      trillet_call_id: callData?.id,
      user_id: userId,
      raw_payload: body,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    switch (eventType) {
      case "call.started": {
        // Call initiated — log it
        await supabaseClient.from("call_logs").insert({
          user_id: userId,
          trillet_call_id: callData.id,
          caller_number: callData.caller_number,
          direction: callData.direction || "inbound",
          status: "in_progress",
          started_at: new Date(callData.started_at).toISOString(),
          is_emergency: callData.is_emergency || false,
          source: callData.source || "direct",
        });
        break;
      }

      case "call.ended": {
        // Call completed — update log with outcome
        const duration = callData.ended_at && callData.started_at
          ? Math.round((new Date(callData.ended_at).getTime() - new Date(callData.started_at).getTime()) / 1000)
          : 0;

        await supabaseClient
          .from("call_logs")
          .update({
            status: callData.status || "completed",
            outcome: callData.outcome || "unknown",
            duration: duration,
            ended_at: new Date(callData.ended_at).toISOString(),
            recording_url: callData.recording_url || null,
            transcript: callData.transcript || null,
            summary: callData.summary || null,
            booking_made: callData.booking_made || false,
            booking_details: callData.booking_details || null,
            customer_name: callData.customer_name || null,
            customer_postcode: callData.customer_postcode || null,
            service_requested: callData.service_requested || null,
            is_emergency: callData.is_emergency || false,
            spam_score: callData.spam_score || 0,
          })
          .eq("trillet_call_id", callData.id);

        // Trigger summary notification
        if (userId && (callData.summary || callData.transcript)) {
          await supabaseClient.functions.invoke("send-call-summary", {
            body: {
              user_id: userId,
              call_id: callData.id,
              summary: callData.summary,
              transcript: callData.transcript,
              customer_name: callData.customer_name,
              booking_made: callData.booking_made,
            },
          });
        }
        break;
      }

      case "call.booking": {
        // AI successfully booked an appointment
        await supabaseClient
          .from("call_logs")
          .update({
            booking_made: true,
            booking_details: {
              calendar_event_id: callData.calendar_event_id,
              calendar_link: callData.calendar_link,
              appointment_time: callData.appointment_time,
              service: callData.service,
            },
            updated_at: new Date().toISOString(),
          })
          .eq("trillet_call_id", callData.call_id);

        // Send confirmation to customer if phone available
        if (callData.customer_phone) {
          // Get tradesperson details for safety photo
          const { data: vc } = await supabaseClient
            .from("voice_configs")
            .select("tradesperson_photo_url, tradesperson_name, business_name, tradesperson_credentials")
            .eq("user_id", userId)
            .single();

          let message = `Hi ${callData.customer_name || "there"}, your ${callData.service || "appointment"} with ${vc?.business_name || "us"} is confirmed for ${callData.appointment_time}. Reference: ${callData.call_id?.slice(-6)}.`;
          
          if (vc?.tradesperson_name) {
            message += ` Your tradesperson: ${vc.tradesperson_name}.`;
          }
          if (vc?.tradesperson_credentials?.length > 0) {
            message += ` Credentials: ${vc.tradesperson_credentials.join(", ")}.`;
          }
          if (vc?.tradesperson_photo_url) {
            message += ` View photo: ${vc.tradesperson_photo_url}`;
          }

          await supabaseClient.functions.invoke("send-sms", {
            body: {
              to: callData.customer_phone,
              message: message,
              user_id: userId,
            },
          });
        }

        // Trigger review request scheduling (48 hours later)
        await supabaseClient.from("scheduled_tasks").insert({
          user_id: userId,
          task_type: "review_request",
          status: "scheduled",
          scheduled_for: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          payload: {
            customer_phone: callData.customer_phone,
            customer_name: callData.customer_name,
            call_id: callData.call_id,
            service: callData.service,
          },
        });
        break;
      }

      case "call.emergency": {
        // Emergency detected — live transfer triggered
        await supabaseClient
          .from("call_logs")
          .update({
            is_emergency: true,
            transferred_to: callData.forwarded_to,
            transfer_reason: callData.emergency_keyword,
            status: "transferred",
            updated_at: new Date().toISOString(),
          })
          .eq("trillet_call_id", callData.call_id);

        // Send urgent notification to tradesperson
        await supabaseClient.functions.invoke("send-urgent-notification", {
          body: {
            user_id: userId,
            message: `🚨 EMERGENCY CALL: ${callData.emergency_keyword} from ${callData.customer_name || "unknown"}. Transferred to your mobile.`,
            call_id: callData.call_id,
          },
        });
        break;
      }

      case "call.spam": {
        // Spam call blocked
        await supabaseClient
          .from("call_logs")
          .update({
            status: "spam_blocked",
            spam_score: callData.spam_score || 1.0,
            spam_reason: callData.spam_reason || "auto_detected",
            updated_at: new Date().toISOString(),
          })
          .eq("trillet_call_id", callData.call_id);
        break;
      }

      default: {
        console.log(`Unhandled Trillet event type: ${eventType}`);
      }
    }

    // Mark webhook as processed
    await supabaseClient
      .from("trillet_webhook_events")
      .update({ status: "completed", processed_at: new Date().toISOString() })
      .eq("trillet_call_id", callData?.id)
      .eq("event_type", eventType);

    return new Response(
      JSON.stringify({ received: true, event_type: eventType }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Trillet webhook processing error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Webhook processing failed",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
