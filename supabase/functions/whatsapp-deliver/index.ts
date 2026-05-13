/**
 * WhatsApp Delivery Handler
 *
 * Sends qualified enquiry summaries to tradespersons via WhatsApp.
 * Supports multiple providers: Twilio, Meta Business API, Trillet Native.
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
  enquiryId?: string;
  callId?: string;
  clientId?: string;
  callerNumber?: string;
  callerName?: string;
  transcript?: string;
  jobType?: string;
  postcode?: string;
  urgency?: string;
  // For direct trigger without enquiry record
  type?: 'enquiry' | 'voicemail_notification';
  recordingUrl?: string;
}

// ─── Provider Configuration ───

const WHATSAPP_PROVIDER = Deno.env.get('WHATSAPP_PROVIDER') || 'stub'; // stub | twilio | meta | trillet

// Twilio credentials
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_WHATSAPP_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM');

// Meta credentials
const META_ACCESS_TOKEN = Deno.env.get('META_WHATSAPP_ACCESS_TOKEN');
const META_PHONE_NUMBER_ID = Deno.env.get('META_WHATSAPP_PHONE_NUMBER_ID');

// Trillet credentials (if native)
const TRILLET_API_KEY = Deno.env.get('TRILLET_API_KEY');
const TRILLET_BASE_URL = Deno.env.get('TRILLET_BASE_URL') || 'https://api.trillet.ai/v1';

// ─── Message Formatter ───

function formatEnquiryMessage(data: WhatsAppDeliverRequest): string {
  const urgencyEmoji: Record<string, string> = {
    emergency: '🚨',
    high: '🔥',
    medium: '⚡',
    low: '📋',
  };

  const lines = [
    `*New Enquiry — ${urgencyEmoji[data.urgency || 'low'] || '📋'} ${data.urgency || 'standard'}*`,
    ``,
    `*Caller:* ${data.callerName || 'Unknown'}`,
    `*Phone:* ${data.callerNumber || 'N/A'}`,
    `*Job Type:* ${data.jobType || 'General enquiry'}`,
    `*Postcode:* ${data.postcode || 'N/A'}`,
  ];

  if (data.transcript) {
    lines.push(
      ``,
      `*Transcript:*`,
      data.transcript.slice(0, 800) // Keep under WhatsApp limits
    );
  }

  return lines.join('\n');
}

function formatVoicemailMessage(data: WhatsAppDeliverRequest): string {
  return [
    `*New Voicemail 🎙️*`,
    ``,
    `*Caller:* ${data.callerName || 'Unknown'}`,
    `*Phone:* ${data.callerNumber || 'N/A'}`,
    ``,
    `*Recording:* ${data.recordingUrl || 'Not available'}`,
    ``,
    `Tap to listen and call back.`,
  ].join('\n');
}

// ─── Provider Implementations ───

interface WhatsAppProvider {
  name: string;
  send(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

const stubProvider: WhatsAppProvider = {
  name: 'stub',
  async send(to, message) {
    console.log(`[WhatsApp Stub] Would send to ${to}:`);
    console.log(message);
    return { success: true, messageId: 'stub-' + Date.now() };
  },
};

const twilioProvider: WhatsAppProvider = {
  name: 'twilio',
  async send(to, message) {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
      throw new Error('Missing Twilio credentials');
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    const body = new URLSearchParams({
      From: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      To: `whatsapp:${to}`,
      Body: message,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Twilio error: ${res.status} ${err}`);
    }

    const data = await res.json();
    return { success: true, messageId: data.sid };
  },
};

const metaProvider: WhatsAppProvider = {
  name: 'meta',
  async send(to, message) {
    if (!META_ACCESS_TOKEN || !META_PHONE_NUMBER_ID) {
      throw new Error('Missing Meta credentials');
    }

    const url = `https://graph.facebook.com/v18.0/${META_PHONE_NUMBER_ID}/messages`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: message },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Meta error: ${res.status} ${err}`);
    }

    const data = await res.json();
    return { success: true, messageId: data.messages?.[0]?.id };
  },
};

const trilletProvider: WhatsAppProvider = {
  name: 'trillet',
  async send(to, message) {
    if (!TRILLET_API_KEY) {
      throw new Error('Missing Trillet API key');
    }

    const url = `${TRILLET_BASE_URL}/messages/whatsapp`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TRILLET_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        body: message,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Trillet error: ${res.status} ${err}`);
    }

    const data = await res.json();
    return { success: true, messageId: data.messageId };
  },
};

// ─── Provider Resolver ───

function getProvider(): WhatsAppProvider {
  switch (WHATSAPP_PROVIDER) {
    case 'twilio':
      return twilioProvider;
    case 'meta':
      return metaProvider;
    case 'trillet':
      return trilletProvider;
    case 'stub':
    default:
      return stubProvider;
  }
}

// ─── Main Handler ───

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const data: WhatsAppDeliverRequest = await req.json();
    const provider = getProvider();

    console.log(`[WhatsApp Deliver] Provider: ${provider.name}, Type: ${data.type || 'enquiry'}`);

    // Resolve target phone number
    let targetPhone = data.callerNumber;
    let enquiryId = data.enquiryId;

    // If no enquiryId but callId provided, lookup enquiry
    if (!enquiryId && data.callId) {
      const { data: enquiry } = await supabase
        .from('enquiries')
        .select('id, caller_number, caller_name, job_type, postcode, urgency, transcript')
        .eq('call_id', data.callId)
        .single();

      if (enquiry) {
        enquiryId = enquiry.id;
        targetPhone = enquiry.caller_number || targetPhone;
        // Merge enquiry data
        data.callerName = data.callerName || enquiry.caller_name;
        data.jobType = data.jobType || enquiry.job_type;
        data.postcode = data.postcode || enquiry.postcode;
        data.urgency = data.urgency || enquiry.urgency;
        data.transcript = data.transcript || enquiry.transcript;
      }
    }

    if (!targetPhone) {
      return new Response(
        JSON.stringify({ error: 'No target phone number available' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format message
    const message = data.type === 'voicemail_notification'
      ? formatVoicemailMessage(data)
      : formatEnquiryMessage(data);

    // Send via provider
    const result = await provider.send(targetPhone, message);

    if (!result.success) {
      throw new Error(result.error || 'Provider returned failure');
    }

    // Mark enquiry as WhatsApp sent
    if (enquiryId) {
      const { error: updateError } = await supabase
        .from('enquiries')
        .update({
          whatsapp_sent: true,
          whatsapp_sent_at: new Date().toISOString(),
          whatsapp_provider: provider.name,
          whatsapp_message_id: result.messageId || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', enquiryId);

      if (updateError) {
        console.error('Error updating enquiry WhatsApp status:', updateError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        enquiryId,
        provider: provider.name,
        messageId: result.messageId,
        whatsappSent: true,
        messagePreview: message,
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
