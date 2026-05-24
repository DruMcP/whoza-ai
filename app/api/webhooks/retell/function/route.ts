import { NextRequest, NextResponse } from "next/server";

/**
 * Retell Function Webhook Handler
 * Route: POST /api/webhooks/retell/function
 * 
 * Retell LLM calls this when it needs to execute functions:
 * - book_appointment: Check calendar availability and book slot
 * - send_quote: Generate and send a quote
 * - transfer_call: Forward to human contractor
 * - check_availability: Get contractor's schedule
 */

interface RetellFunctionRequest {
  call_id: string;
  agent_id: string;
  function_name: string;
  arguments: Record<string, any>;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();

  try {
    const body: RetellFunctionRequest = await req.json();
    const { call_id, function_name, arguments: args } = body;

    console.log(`[Retell Function] ${requestId} | Call ${call_id} | ${function_name}`);

    let result: any;

    switch (function_name) {
      case "check_availability":
        result = await handleCheckAvailability(args);
        break;
      case "book_appointment":
        result = await handleBookAppointment(args);
        break;
      case "send_quote":
        result = await handleSendQuote(args);
        break;
      case "transfer_call":
        result = await handleTransferCall(args);
        break;
      default:
        result = {
          success: false,
          error: `Unknown function: ${function_name}`,
        };
    }

    return NextResponse.json({
      request_id: requestId,
      result,
    });

  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[Retell Function] ${requestId} | Error:`, error);

    return NextResponse.json({
      request_id: requestId,
      result: {
        success: false,
        error,
      },
    });
  }
}

async function handleCheckAvailability(args: Record<string, any>) {
  const { date, time_range, service_type } = args;

  // TODO: Integrate with actual calendar system
  // For now, return mock availability
  return {
    success: true,
    available_slots: [
      "09:00",
      "11:00",
      "14:00",
      "16:00",
    ],
    message: `We have availability on ${date} at these times for ${service_type || "your service"}.`,
  };
}

async function handleBookAppointment(args: Record<string, any>) {
  const { date, time, customer_name, customer_phone, service_type, address } = args;

  // TODO: Create actual appointment in database
  // For now, return confirmation
  return {
    success: true,
    appointment: {
      date,
      time,
      customer_name,
      service_type,
      address,
      confirmation_code: `WHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    },
    message: `Great! I've booked ${customer_name} in for ${service_type} on ${date} at ${time}. The confirmation code is in the appointment details.`,
  };
}

async function handleSendQuote(args: Record<string, any>) {
  const { customer_email, service_type, estimated_hours, materials_needed } = args;

  // TODO: Generate actual quote via quote generator component
  const estimatedCost = estimated_hours * 75; // £75/hour default

  return {
    success: true,
    quote: {
      service_type,
      estimated_hours,
      hourly_rate: 75,
      labour_cost: estimatedCost,
      materials_estimate: materials_needed ? 150 : 0,
      total_estimate: estimatedCost + (materials_needed ? 150 : 0),
    },
    message: `I've prepared a quote for ${service_type}. Estimated cost is £${estimatedCost + (materials_needed ? 150 : 0)}.`,
  };
}

async function handleTransferCall(args: Record<string, any>) {
  const { reason, urgency } = args;

  // TODO: Get contractor's forwarding number from database
  // Return TwiML for transfer
  return {
    success: true,
    transfer_number: "+441234567890", // Placeholder
    reason,
    message: "I'm transferring you to the contractor now. One moment please.",
  };
}
