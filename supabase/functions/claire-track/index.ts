import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Claire Track — Updates review request status
 * 
 * Triggered by:
 * - Link click tracking (webhook from link shortener)
 * - Manual status update from dashboard
 * - Review completion detection
 */

interface TrackPayload {
  review_request_id: string;
  event: "clicked" | "completed" | "declined" | "reminder_sent";
  rating?: number;
  platform?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const payload: TrackPayload = await req.json();

    if (!payload.review_request_id || !payload.event) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updates: Record<string, any> = {
      status: payload.event,
      updated_at: new Date().toISOString(),
    };

    if (payload.event === "clicked") {
      updates.metadata = {
        clicked_at: new Date().toISOString(),
        ...payload.metadata,
      };
    }

    if (payload.event === "completed") {
      updates.review_completed = true;
      updates.rating = payload.rating;
      updates.review_platform = payload.platform || "google";
      updates.metadata = {
        reviewed_at: new Date().toISOString(),
        ...payload.metadata,
      };
    }

    if (payload.event === "declined") {
      updates.metadata = {
        declined_at: new Date().toISOString(),
        ...payload.metadata,
      };
    }

    if (payload.event === "reminder_sent") {
      updates.reminder_sent = true;
      updates.reminder_sent_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("review_requests")
      .update(updates)
      .eq("id", payload.review_request_id)
      .select()
      .single();

    if (error) {
      console.error("[Claire Track] Update error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update review request" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        review_request: data,
        message: `Status updated to ${payload.event}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[Claire Track] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
