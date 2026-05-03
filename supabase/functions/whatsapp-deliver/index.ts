/**
 * WhatsApp Delivery Handler
 *
 * Sends qualified enquiry summaries to tradespersons via WhatsApp.
 * Triggered by trillet-call-completed or other enquiry pipeline events.
 *
 * Endpoint: POST /functions/v1/whatsapp-deliver
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface WhatsAppDeliverRequest {
  enquiryId: string;
  clientId?: string;
  callerNumber?: string;
  callerName?: string;
  transcript?: string;
  jobType?: string;
  postcode?: string;
  urgency?: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      enquiryId,
      clientId,
      callerName,
      callerNumber,
      transcript,
      jobType,
      postcode,
      urgency,
    }: WhatsAppDeliverRequest = await req.json();

    if (!enquiryId) {
      return new Response(
        JSON.stringify({ error: 'enquiryId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Integrate with WhatsApp Business API (Twilio, 360dialog, or Meta)
    // For now, log the delivery attempt and mark the enquiry as sent

    const urgencyEmoji: Record<string, string> = {
      emergency: '🚨',
      high: '🔥',
      medium: '⚡',
      low: '📋',
    };

    const messageLines = [
      `*New Enquiry — ${urgencyEmoji[urgency || 'low'] || '📋'} ${urgency || 'standard'}*`,
      ``,
      `*Caller:* ${callerName || 'Unknown'}`,
      `*Phone:* ${callerNumber || 'N/A'}`,
      `*Job Type:* ${jobType || 'General enquiry'}`,
      `*Postcode:* ${postcode || 'N/A'}`,
      ``,
      `*Transcript:*`,
      transcript || 'No transcript available.',
    ];

    const messageText = messageLines.join('\n');

    console.log('[WhatsApp Deliver] Message prepared for enquiry', enquiryId);
    console.log('[WhatsApp Deliver] Message preview:');
    console.log(messageText);

    // Mark enquiry as WhatsApp sent
    const { error: updateError } = await supabase
      .from('enquiries')
      .update({
        whatsapp_sent: true,
        whatsapp_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', enquiryId);

    if (updateError) {
      console.error('Error updating enquiry WhatsApp status:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        enquiryId,
        whatsappSent: true,
        messagePreview: messageText,
        note: 'WhatsApp integration stub — connect to Twilio/Meta API for production delivery',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('whatsapp-deliver error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
