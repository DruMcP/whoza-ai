import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Retell Call-Ended Webhook Handler
 * Route: POST /api/webhooks/retell/call-ended
 * 
 * Retell sends this when a call completes.
 * Contains transcript, call outcome, duration, costs.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();

  try {
    const body = await req.json();

    const {
      call_id: retellCallId,
      call_status: callStatus,
      duration_ms: durationMs,
      transcript,
      recording_url: recordingUrl,
      agent_id: agentId,
      cost: retellCost,
      metadata,
    } = body;

    console.log(`[Retell Call-Ended] ${requestId} | Call ${retellCallId} ended, duration: ${durationMs}ms`);

    // Find the call record
    const { data: callRecord, error: findError } = await supabase
      .from("retell_calls")
      .select("id, contractor_id, twilio_call_sid")
      .eq("retell_call_id", retellCallId)
      .single();

    if (findError || !callRecord) {
      console.warn(`[Retell Call-Ended] ${requestId} | Call ${retellCallId} not found in database`);
    }

    // Update call record with completion data
    const updateData: Record<string, any> = {
      status: callStatus === "ended" ? "completed" : callStatus,
      ended_at: new Date().toISOString(),
      duration_seconds: durationMs ? Math.round(durationMs / 1000) : 0,
      transcript: transcript || null,
      recording_url: recordingUrl || null,
      retell_metadata: metadata || {},
      retell_cost_usd: retellCost || 0,
    };

    if (callRecord) {
      await supabase.from("retell_calls").update(updateData).eq("id", callRecord.id);

      // If call was qualified, create an enquiry
      if (callStatus === "ended" && transcript && isQualifiedCall(transcript)) {
        const { data: enquiry } = await supabase.from("enquiries").insert({
          client_id: callRecord.contractor_id,
          call_id: retellCallId,
          caller_number: metadata?.from_number,
          transcript: transcript,
          duration_seconds: updateData.duration_seconds,
          recording_url: recordingUrl,
          status: "new",
          qualification_data: metadata || {},
        }).select().single();

        if (enquiry) {
          await supabase.from("retell_calls").update({
            enquiry_id: enquiry.id,
            outcome: "qualified",
          }).eq("id", callRecord.id);
        }
      }
    }

    // Log webhook
    await supabase.from("telephony_webhook_logs").insert({
      request_id: requestId,
      provider: "retell",
      event_type: "call_ended",
      request_body: body,
      response_status: 200,
      call_id: retellCallId,
      contractor_id: callRecord?.contractor_id,
    });

    return NextResponse.json({ received: true, request_id: requestId });

  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[Retell Call-Ended] ${requestId} | Error:`, error);

    await supabase.from("telephony_webhook_logs").insert({
      request_id: requestId,
      provider: "retell",
      event_type: "call_ended_error",
      request_body: {},
      response_status: 500,
      error_message: error,
    });

    return NextResponse.json({ received: true, error });
  }
}

// Simple heuristic to determine if call was qualified
function isQualifiedCall(transcript: string): boolean {
  if (!transcript) return false;
  const lower = transcript.toLowerCase();
  const positiveSignals = [
    "book", "appointment", "schedule", "quote", "estimate",
    "price", "cost", "available", "when can you", "come out",
    "fix", "repair", "install", "replace", "urgent", "emergency",
  ];
  return positiveSignals.some(signal => lower.includes(signal));
}
