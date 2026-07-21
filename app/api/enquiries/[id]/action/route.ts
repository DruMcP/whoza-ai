import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { processAcceptBilling, processDeclineBilling, isExcludedFromBilling } from "@/lib/billing";

/**
 * Enquiry Action API
 *
 * POST /api/enquiries/[id]/action
 *
 * Actions:
 * - "accept"     → Mark enquiry as accepted, bill if eligible
 * - "call_back"  → Schedule callback, NOT billable
 * - "decline"    → Decline enquiry, log not-billed event
 * - "complete"   → Mark job as completed (for Claire review flow)
 *
 * Billing rule: ONLY "accept" bills. Callback, decline, complete do not.
 * Idempotent: accepting twice bills once.
 *
 * Body: { action: string, reason?: string, callbackTime?: string }
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { action, reason, callbackTime, notes } = body;

    // Validate
    const validActions = ["accept", "call_back", "decline", "complete"];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: "Invalid action", validActions },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Fetch enquiry
    const { data: enquiry, error: fetchError } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    // Update enquiry status
    const newStatus = action === "accept" ? "accepted"
      : action === "call_back" ? "callback_scheduled"
      : action === "decline" ? "declined"
      : action === "complete" ? "completed"
      : enquiry.status;

    const { data: updated, error: updateError } = await supabase
      .from("enquiries")
      .update({
        status: newStatus,
        action_taken: action,
        action_reason: reason || null,
        callback_time: callbackTime || null,
        action_notes: notes || null,
        action_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update enquiry: ${updateError.message}`);
    }

    // ── BILLING LOGIC ──
    // Only "accept" bills. Decline, callback, complete do not.
    let billingResult: { billed: boolean; eventId?: string; reason: string } | null = null;

    if (action === "accept") {
      // Safety: exclude spam/duplicates/test calls
      const excluded = await isExcludedFromBilling(id);
      if (excluded) {
        billingResult = await processDeclineBilling(
          id,
          enquiry.client_id,
          "decline",
          "whatsapp",
          "excluded_spam_or_duplicate"
        );
      } else {
        billingResult = await processAcceptBilling(id, enquiry.client_id, "whatsapp");
      }
    } else if (action === "decline") {
      billingResult = await processDeclineBilling(
        id,
        enquiry.client_id,
        "decline",
        "whatsapp",
        reason || "owner_declined"
      );
    }
    // callback and complete are never billed — no event needed

    // Send WhatsApp notification based on action
    let notificationType: string;
    switch (action) {
      case "accept":
        notificationType = "enquiry_accepted";
        break;
      case "call_back":
        notificationType = "callback_scheduled";
        break;
      case "decline":
        notificationType = "enquiry_declined";
        break;
      case "complete":
        notificationType = "job_completed";
        break;
      default:
        notificationType = "status_update";
    }

    try {
      await supabase.functions.invoke("whatsapp-deliver", {
        body: {
          type: notificationType,
          enquiryId: id,
          customerPhone: enquiry.caller_number,
          customerName: enquiry.caller_name,
          action,
          callbackTime,
          reason,
        },
      });
    } catch (err) {
      console.error("[Action API] WhatsApp notification failed:", err);
      // Non-fatal
    }

    // If complete, trigger Claire review flow
    if (action === "complete") {
      try {
        await supabase.functions.invoke("claire-trigger", {
          body: {
            type: "review_request",
            enquiryId: id,
            customerPhone: enquiry.caller_number,
            customerName: enquiry.caller_name,
          },
        });
      } catch (err) {
        console.error("[Action API] Claire trigger failed:", err);
        // Non-fatal
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[Action API] ${action} on enquiry ${id} in ${duration}ms`);

    return NextResponse.json({
      success: true,
      enquiryId: id,
      action,
      newStatus,
      updated,
      billing: billingResult || { billed: false, reason: "not_applicable" },
    });

  } catch (error) {
    console.error("[Action API] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
