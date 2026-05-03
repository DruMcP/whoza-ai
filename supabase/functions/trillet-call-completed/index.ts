/**
 * Trillet Call Completed Handler
 *
 * Processes call.completed webhook events from Trillet.
 * - Saves the enquiry to the enquiries table
 * - Triggers WhatsApp delivery to the tradesperson
 * - Updates usage logs
 *
 * Endpoint: POST /functions/v1/trillet-call-completed
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface CallCompletedPayload {
  event: 'call.completed';
  callId: string;
  agentId: string;
  workspaceId: string;
  timestamp: string;
  duration?: number;
  recordingUrl?: string;
  transcript?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  outcome?: 'booked' | 'qualified' | 'voicemail' | 'transferred' | 'missed';
  customVariables?: Record<string, string>;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: CallCompletedPayload = await req.json();

    if (!payload.callId) {
      return new Response(
        JSON.stringify({ error: 'Missing callId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract qualification data from customVariables if present
    const qualificationData = payload.customVariables || {};
    const jobType = qualificationData.job_type || null;
    const postcode = qualificationData.postcode || null;
    const urgency = qualificationData.urgency || null;

    // Insert or update enquiry record
    const { data: enquiry, error: enquiryError } = await supabase
      .from('enquiries')
      .upsert({
        call_id: payload.callId,
        client_id: qualificationData.client_id || null,
        caller_number: payload.customer?.phone || null,
        caller_name: payload.customer?.name || null,
        transcript: payload.transcript || null,
        duration_seconds: payload.duration || 0,
        recording_url: payload.recordingUrl || null,
        job_type: jobType,
        postcode: postcode,
        urgency: urgency,
        status: payload.outcome === 'booked' ? 'completed' : 'new',
        qualification_data: qualificationData,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'call_id' })
      .select()
      .single();

    if (enquiryError) {
      console.error('Error saving enquiry:', enquiryError);
      throw new Error('Failed to save enquiry');
    }

    // Trigger WhatsApp delivery (fire-and-forget)
    try {
      await supabase.functions.invoke('whatsapp-deliver', {
        body: {
          enquiryId: enquiry.id,
          clientId: enquiry.client_id,
          callerNumber: enquiry.caller_number,
          callerName: enquiry.caller_name,
          transcript: enquiry.transcript,
          jobType: enquiry.job_type,
          postcode: enquiry.postcode,
          urgency: enquiry.urgency,
        },
      });
    } catch (err) {
      console.error('WhatsApp delivery invocation failed:', err);
      // Non-fatal — we don't fail the webhook if WhatsApp fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        enquiryId: enquiry.id,
        callId: payload.callId,
        outcome: payload.outcome || 'unknown',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('trillet-call-completed error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
