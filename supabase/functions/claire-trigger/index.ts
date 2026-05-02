import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Claire Trigger — Handles job completion webhooks
 * 
 * Triggered when a job is completed (from Trillet or manual).
 * Creates a review_request record with appropriate delay.
 */

interface JobCompletedPayload {
  client_id: string;
  customer_name: string;
  phone: string;
  job_type: "emergency" | "standard" | "install";
  job_value?: number;
  trillet_call_id?: string;
  business_name: string;
  review_url: string;
}

const DELAYS = {
  emergency: 2 * 60 * 60 * 1000,    // 2 hours
  standard: 4 * 60 * 60 * 1000,      // 4 hours
  install: 24 * 60 * 60 * 1000,      // 24 hours
};

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const payload: JobCompletedPayload = await req.json();

    // Validate required fields
    if (!payload.client_id || !payload.phone || !payload.customer_name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Calculate send time based on job type
    const delay = DELAYS[payload.job_type] || DELAYS.standard;
    const sendAt = new Date(Date.now() + delay);

    // Create review request record
    const { data, error } = await supabase
      .from("review_requests")
      .insert({
        client_id: payload.client_id,
        customer_name: payload.customer_name,
        phone: payload.phone,
        job_type: payload.job_type,
        job_value: payload.job_value,
        status: "pending",
        review_url: payload.review_url,
        trillet_call_id: payload.trillet_call_id,
        metadata: {
          business_name: payload.business_name,
          scheduled_send_at: sendAt.toISOString(),
        },
      })
      .select()
      .single();

    if (error) {
      console.error("[Claire Trigger] Insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create review request" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Schedule the send via edge function invoke
    // In production, this would trigger claire-send-request after delay
    // For MVP, we log and let a cron handle it
    console.log(`[Claire] Review request ${data.id} scheduled for ${sendAt.toISOString()}`);

    return new Response(
      JSON.stringify({
        success: true,
        review_request_id: data.id,
        scheduled_send_at: sendAt.toISOString(),
        message: "Review request queued",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[Claire Trigger] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
