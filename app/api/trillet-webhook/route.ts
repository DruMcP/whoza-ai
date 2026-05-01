import { NextRequest, NextResponse } from "next/server";
import { trillet } from "@/lib/trillet";
import { TrilletCallEvent } from "@/lib/trillet-types";

/**
 * Trillet Webhook Handler
 * 
 * Receives real-time events from Trillet when:
 * - Call starts/completes
 * - Appointment is booked
 * - Lead is captured
 * - Voicemail is left
 * 
 * Endpoint: POST /api/trillet-webhook
 */

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature (when Trillet provides one)
    // const signature = req.headers.get("x-trillet-signature");
    // TODO: Verify HMAC signature once documented

    const payload = (await req.json()) as TrilletCallEvent;

    // Validate required fields
    if (!payload.event || !payload.callId) {
      return NextResponse.json(
        { error: "Invalid payload: missing event or callId" },
        { status: 400 }
      );
    }

    // Process the webhook
    const result = await trillet.processWebhook(payload);

    return NextResponse.json({
      received: true,
      event: payload.event,
      callId: payload.callId,
      processed: result,
    });

  } catch (error) {
    console.error("[Trillet Webhook] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint for Trillet webhook configuration
 * Use this to verify your endpoint is reachable
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "/api/trillet-webhook",
    version: "1.0.0",
    supportedEvents: [
      "call.started",
      "call.completed", 
      "call.transferred",
      "appointment.booked",
      "lead.captured",
      "voicemail.left"
    ],
  });
}
