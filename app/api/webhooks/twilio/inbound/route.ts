import { NextRequest, NextResponse } from "next/server";
import { telephonyRouter } from "@/lib/telephony-router";
import { twilioService } from "@/lib/twilio-service";
import { createClient } from "@supabase/supabase-js";
import { logTelephonyConfig } from "@/lib/telephony-config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Twilio Inbound Webhook Handler
 * Route: POST /api/webhooks/twilio/inbound
 * 
 * Flow:
 * 1. Twilio receives call to contractor's number
 * 2. Twilio sends webhook here with call details
 * 3. We look up contractor by called number
 * 4. Register call with Retell via register-call API
 * 5. Return TwiML <Connect> with Retell WebSocket URL
 * 6. Twilio streams audio to Retell, Retell handles conversation
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    // Parse Twilio form data
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    const {
      CallSid: twilioCallSid,
      From: fromNumber,
      To: toNumber,
      CallStatus: callStatus,
      Direction: direction,
    } = params;

    console.log(`[Twilio Inbound] ${requestId} | Call ${twilioCallSid} from ${fromNumber} to ${toNumber}`);

    // Verify Twilio signature (in production)
    const signature = req.headers.get("x-twilio-signature");
    const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://api.whoza.ai"}/api/webhooks/twilio/inbound`;
    const isValid = twilioService.verifyWebhookSignature(webhookUrl, params, signature);

    if (!isValid && process.env.NODE_ENV === "production") {
      console.error(`[Twilio Inbound] ${requestId} | Invalid signature`);
      await logWebhook(requestId, "twilio", "inbound", params, req.headers, 403, "Invalid signature");
      return new NextResponse(twilioService.generateFallbackTwiML("Authentication failed."), {
        status: 200,
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Route the call
    const route = await telephonyRouter.routeInboundCall(toNumber);

    if (!route) {
      console.warn(`[Twilio Inbound] ${requestId} | No contractor found for ${toNumber}`);
      await logWebhook(requestId, "twilio", "inbound", params, req.headers, 404, "No contractor found");
      return new NextResponse(twilioService.generateFallbackTwiML("This number is not currently active."), {
        status: 200,
        headers: { "Content-Type": "application/xml" },
      });
    }

    if (route.backend === "retell_twilio" && route.agentId) {
      // Retell + Twilio path
      const result = await telephonyRouter.handleRetellTwilioInbound({
        twilioCallSid,
        fromNumber,
        toNumber,
        contractorId: route.contractorId,
        agentId: route.agentId,
      });

      if (!result) {
        await logWebhook(requestId, "twilio", "inbound", params, req.headers, 500, "Retell registration failed");
        return new NextResponse(twilioService.generateFallbackTwiML(), {
          status: 200,
          headers: { "Content-Type": "application/xml" },
        });
      }

      // Create call record
      await supabase.from("retell_calls").insert({
        contractor_id: route.contractorId,
        retell_call_id: result.retellCallId || "pending",
        retell_agent_id: route.agentId,
        twilio_call_sid: twilioCallSid,
        from_number: fromNumber,
        to_number: toNumber,
        direction: direction === "outbound-api" ? "outbound" : "inbound",
        status: "initiated",
        started_at: new Date().toISOString(),
      });

      await logWebhook(requestId, "twilio", "inbound", params, req.headers, 200, undefined, twilioCallSid, route.contractorId);

      return new NextResponse(result.twiml, {
        status: 200,
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Fallback for unknown backend
    await logWebhook(requestId, "twilio", "inbound", params, req.headers, 400, `Unknown backend: ${route.backend}`);
    return new NextResponse(twilioService.generateFallbackTwiML(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });

  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[Twilio Inbound] ${requestId} | Error:`, error);
    await logWebhook(requestId, "twilio", "inbound", {}, req.headers, 500, error);

    return new NextResponse(twilioService.generateFallbackTwiML(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}

// Helper to log webhooks for audit trail
async function logWebhook(
  requestId: string,
  provider: string,
  eventType: string,
  body: Record<string, string>,
  headers: Headers,
  status: number,
  error?: string,
  callId?: string,
  contractorId?: string
) {
  const headerObj: Record<string, string> = {};
  headers.forEach((value, key) => {
    headerObj[key] = value;
  });

  await supabase.from("telephony_webhook_logs").insert({
    request_id: requestId,
    provider,
    event_type: eventType,
    request_body: body,
    request_headers: headerObj,
    response_status: status,
    error_message: error,
    call_id: callId,
    contractor_id: contractorId,
  });
}
