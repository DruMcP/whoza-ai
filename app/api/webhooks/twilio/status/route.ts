import { NextRequest, NextResponse } from "next/server";
import { twilioService } from "@/lib/twilio-service";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Twilio Status Callback Webhook Handler
 * Route: POST /api/webhooks/twilio/status
 * 
 * Tracks call lifecycle events:
 * - initiated, ringing, in-progress, completed, failed, busy, no-answer
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();

  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    const {
      CallSid: twilioCallSid,
      CallStatus: callStatus,
      CallDuration: duration,
      RecordingUrl: recordingUrl,
      RecordingDuration: recordingDuration,
      From: fromNumber,
      To: toNumber,
      Timestamp: timestamp,
    } = params;

    console.log(`[Twilio Status] ${requestId} | Call ${twilioCallSid} status: ${callStatus}`);

    // Map Twilio status to our status enum
    const statusMap: Record<string, string> = {
      queued: "initiated",
      ringing: "ringing",
      "in-progress": "in_progress",
      completed: "completed",
      failed: "failed",
      busy: "busy",
      "no-answer": "no_answer",
      canceled: "failed",
    };

    const mappedStatus = statusMap[callStatus] || callStatus;

    // Update retell_calls record
    const updateData: Record<string, any> = {
      status: mappedStatus,
    };

    if (duration) {
      updateData.duration_seconds = parseInt(duration, 10);
    }

    if (recordingUrl) {
      updateData.recording_url = recordingUrl;
    }

    if (recordingDuration) {
      updateData.recording_duration_seconds = parseInt(recordingDuration, 10);
    }

    if (mappedStatus === "completed" || mappedStatus === "failed" || mappedStatus === "busy" || mappedStatus === "no_answer") {
      updateData.ended_at = new Date().toISOString();
    }

    if (mappedStatus === "in_progress") {
      updateData.answered_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("retell_calls")
      .update(updateData)
      .eq("twilio_call_sid", twilioCallSid);

    if (error) {
      console.error(`[Twilio Status] ${requestId} | Database update error:`, error);
    }

    // Log webhook
    await supabase.from("telephony_webhook_logs").insert({
      request_id: requestId,
      provider: "twilio",
      event_type: `status_${mappedStatus}`,
      request_body: params,
      response_status: 200,
      call_id: twilioCallSid,
    });

    return new NextResponse("OK", { status: 200 });

  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[Twilio Status] ${requestId} | Error:`, error);

    await supabase.from("telephony_webhook_logs").insert({
      request_id: requestId,
      provider: "twilio",
      event_type: "status_error",
      request_body: {},
      response_status: 500,
      error_message: error,
    });

    return new NextResponse("OK", { status: 200 });
  }
}
