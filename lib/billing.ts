import { createClient } from "@supabase/supabase-js";

/**
 * Billing Service — Booked Job Definition
 *
 * A booked enquiry is an enquiry that the tradesperson has ACCEPTED via
 * WhatsApp or SMS job card. Only Accept bills. Decline and 24h auto-decline
 * do not bill. Idempotent: accepting twice bills once.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export interface BillableEvent {
  id?: string;
  enquiry_id: string;
  client_id: string;
  trigger: "accept" | "decline" | "auto-decline";
  channel: "whatsapp" | "sms" | "dashboard";
  outcome: "billed" | "not-billed";
  reason?: string;
  created_at?: string;
}

export interface JobBillingResult {
  billed: boolean;
  eventId?: string;
  reason: string;
}

/**
 * Check if an enquiry has already been billed (idempotency)
 */
export async function isAlreadyBilled(enquiryId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("billable_events")
    .select("id")
    .eq("enquiry_id", enquiryId)
    .eq("outcome", "billed")
    .maybeSingle();

  if (error) {
    console.error("[Billing] isAlreadyBilled error:", error);
    return false; // Fail open — don't block billing on query error
  }

  return !!data;
}

/**
 * Write a BillableEvent record for audit/dispute defence
 */
export async function writeBillableEvent(
  event: Omit<BillableEvent, "id" | "created_at">
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("billable_events")
    .insert({
      enquiry_id: event.enquiry_id,
      client_id: event.client_id,
      trigger: event.trigger,
      channel: event.channel,
      outcome: event.outcome,
      reason: event.reason || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[Billing] writeBillableEvent error:", error);
    return null;
  }

  return data?.id || null;
}

/**
 * Process billing for an accepted enquiry
 * Returns { billed: true } if a new BillableEvent was created,
 * { billed: false, reason } if idempotent duplicate or not billable.
 */
export async function processAcceptBilling(
  enquiryId: string,
  clientId: string,
  channel: "whatsapp" | "sms" | "dashboard" = "whatsapp"
): Promise<JobBillingResult> {
  // 1. Idempotency check
  const alreadyBilled = await isAlreadyBilled(enquiryId);
  if (alreadyBilled) {
    return { billed: false, reason: "already_billed" };
  }

  // 2. Write BillableEvent
  const eventId = await writeBillableEvent({
    enquiry_id: enquiryId,
    client_id: clientId,
    trigger: "accept",
    channel,
    outcome: "billed",
    reason: "owner_accepted",
  });

  if (!eventId) {
    return { billed: false, reason: "event_write_failed" };
  }

  return { billed: true, eventId, reason: "owner_accepted" };
}

/**
 * Process a decline or auto-decline — always not-billed, but log for audit
 */
export async function processDeclineBilling(
  enquiryId: string,
  clientId: string,
  trigger: "decline" | "auto-decline",
  channel: "whatsapp" | "sms" | "dashboard" = "whatsapp",
  reason?: string
): Promise<JobBillingResult> {
  const eventId = await writeBillableEvent({
    enquiry_id: enquiryId,
    client_id: clientId,
    trigger,
    channel,
    outcome: "not-billed",
    reason: reason || trigger,
  });

  return {
    billed: false,
    eventId: eventId || undefined,
    reason: reason || trigger,
  };
}

/**
 * Check if an enquiry should be excluded from billing (spam, wrong number,
 * duplicate, etc.). Returns true if excluded.
 *
 * NOTE: This is a lightweight check. Full spam/dedupe logic should run
 * before the job card is even delivered. This is a safety net.
 */
export async function isExcludedFromBilling(enquiryId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("enquiries")
    .select("is_spam, is_duplicate, is_test_call, caller_number")
    .eq("id", enquiryId)
    .maybeSingle();

  if (error || !data) {
    console.error("[Billing] isExcludedFromBilling error:", error);
    return false; // Fail open
  }

  // Exclude if flagged spam, duplicate, or test call
  if (data.is_spam || data.is_duplicate || data.is_test_call) {
    return true;
  }

  return false;
}
