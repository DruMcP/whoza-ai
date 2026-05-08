import { TrilletCallEvent } from "./trillet-types";
import { createClient } from "@supabase/supabase-js";

/**
 * Trillet Webhook Processor
 * 
 * Processes incoming Trillet webhooks and persists to Supabase.
 * Designed to work in both Next.js API routes and Supabase Edge Functions.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials for webhook processing");
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function processCallStarted(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.from("calls").insert({
    call_id: payload.callId,
    agent_id: payload.agentId,
    workspace_id: payload.workspaceId,
    event_type: payload.event,
    status: "started",
    started_at: payload.timestamp,
    caller_number: payload.customer?.phone || null,
    caller_name: payload.customer?.name || null,
    custom_variables: payload.customVariables || {},
  });

  if (error) {
    console.error("[Webhook] Failed to record call.started:", error);
    throw new Error(`Database insert failed: ${error.message}`);
  }

  return { success: true, action: "call_started_recorded" };
}

export async function processCallCompleted(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  // Upsert call record
  const { data: call, error: upsertError } = await supabase
    .from("calls")
    .upsert({
      call_id: payload.callId,
      agent_id: payload.agentId,
      workspace_id: payload.workspaceId,
      event_type: payload.event,
      status: payload.outcome || "completed",
      ended_at: payload.timestamp,
      duration_seconds: payload.duration || 0,
      recording_url: payload.recordingUrl || null,
      transcript: payload.transcript || null,
      caller_number: payload.customer?.phone || null,
      caller_name: payload.customer?.name || null,
      outcome: payload.outcome || null,
      custom_variables: payload.customVariables || {},
      updated_at: new Date().toISOString(),
    }, { onConflict: "call_id" })
    .select()
    .single();

  if (upsertError) {
    console.error("[Webhook] Failed to record call.completed:", upsertError);
    throw new Error(`Database upsert failed: ${upsertError.message}`);
  }

  // Create enquiry record if outcome is "qualified" or "booked"
  if (payload.outcome === "qualified" || payload.outcome === "booked") {
    const qualificationData = payload.customVariables || {};
    
    const { error: enquiryError } = await supabase.from("enquiries").upsert({
      call_id: payload.callId,
      client_id: qualificationData.client_id || null,
      caller_number: payload.customer?.phone || null,
      caller_name: payload.customer?.name || null,
      transcript: payload.transcript || null,
      duration_seconds: payload.duration || 0,
      recording_url: payload.recordingUrl || null,
      job_type: qualificationData.job_type || null,
      postcode: qualificationData.postcode || null,
      urgency: qualificationData.urgency || null,
      status: payload.outcome === "booked" ? "completed" : "new",
      qualification_data: qualificationData,
      source: "trillet",
      updated_at: new Date().toISOString(),
    }, { onConflict: "call_id" });

    if (enquiryError) {
      console.error("[Webhook] Failed to create enquiry:", enquiryError);
      // Non-fatal — call is still recorded
    }
  }

  // Trigger WhatsApp delivery for qualified enquiries
  if (payload.outcome === "qualified" && payload.customer?.phone) {
    try {
      await supabase.functions.invoke("whatsapp-deliver", {
        body: {
          callId: payload.callId,
          callerNumber: payload.customer.phone,
          callerName: payload.customer?.name,
          transcript: payload.transcript,
          qualificationData: payload.customVariables,
        },
      });
    } catch (err) {
      console.error("[Webhook] WhatsApp delivery failed:", err);
      // Non-fatal — don't fail webhook if notification fails
    }
  }

  return { success: true, action: "call_completed_processed", callId: call?.id };
}

export async function processAppointmentBooked(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.from("appointments").insert({
    call_id: payload.callId,
    agent_id: payload.agentId,
    appointment_date: payload.appointment?.date || null,
    appointment_time: payload.appointment?.time || null,
    service_type: payload.appointment?.service || null,
    customer_name: payload.customer?.name || null,
    customer_phone: payload.customer?.phone || null,
    status: "confirmed",
    created_at: payload.timestamp,
  });

  if (error) {
    console.error("[Webhook] Failed to record appointment:", error);
    throw new Error(`Database insert failed: ${error.message}`);
  }

  return { success: true, action: "appointment_recorded" };
}

export async function processLeadCaptured(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.from("leads").insert({
    call_id: payload.callId,
    agent_id: payload.agentId,
    customer_name: payload.customer?.name || null,
    customer_phone: payload.customer?.phone || null,
    customer_email: payload.customer?.email || null,
    source: "trillet_voice",
    custom_variables: payload.customVariables || {},
    created_at: payload.timestamp,
  });

  if (error) {
    console.error("[Webhook] Failed to record lead:", error);
    throw new Error(`Database insert failed: ${error.message}`);
  }

  return { success: true, action: "lead_recorded" };
}

export async function processVoicemailLeft(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.from("calls").upsert({
    call_id: payload.callId,
    agent_id: payload.agentId,
    status: "voicemail",
    recording_url: payload.recordingUrl || null,
    transcript: payload.transcript || null,
    caller_number: payload.customer?.phone || null,
    caller_name: payload.customer?.name || null,
    updated_at: new Date().toISOString(),
  }, { onConflict: "call_id" });

  if (error) {
    console.error("[Webhook] Failed to record voicemail:", error);
    throw new Error(`Database upsert failed: ${error.message}`);
  }

  // Send notification about voicemail
  try {
    await supabase.functions.invoke("whatsapp-deliver", {
      body: {
        type: "voicemail_notification",
        callId: payload.callId,
        recordingUrl: payload.recordingUrl,
        callerNumber: payload.customer?.phone,
      },
    });
  } catch (err) {
    console.error("[Webhook] Voicemail notification failed:", err);
  }

  return { success: true, action: "voicemail_recorded" };
}

export async function processCallTransferred(payload: TrilletCallEvent) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.from("calls").upsert({
    call_id: payload.callId,
    status: "transferred",
    ended_at: payload.timestamp,
    updated_at: new Date().toISOString(),
  }, { onConflict: "call_id" });

  if (error) {
    console.error("[Webhook] Failed to record transfer:", error);
    throw new Error(`Database upsert failed: ${error.message}`);
  }

  return { success: true, action: "transfer_recorded" };
}
