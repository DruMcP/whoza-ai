// Unified telephony router
// Backend selection logic: trillet vs retell_twilio
// All routing decisions based on contractor_telephony.telephony_backend

import { createClient } from "@supabase/supabase-js";
import { retellService } from "./retell-service";
import { twilioService } from "./twilio-service";
import { elevenLabsService } from "./elevenlabs-service";
import { telephonyFeatures, validateRetellTwilioConfig } from "./telephony-config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export type TelephonyBackend = "trillet" | "retell_twilio";

interface TelephonyRoute {
  backend: TelephonyBackend;
  contractorId: string;
  phoneNumber?: string;
  agentId?: string;
  voiceId?: string;
  isActive: boolean;
}

class TelephonyRouter {
  private supabase = createClient(supabaseUrl, supabaseServiceKey);

  // ─── Route Inbound Call ───
  // Determines which backend handles an inbound call based on called number
  async routeInboundCall(phoneNumber: string): Promise<TelephonyRoute | null> {
    // Find contractor by phone number
    const { data: telephony, error } = await this.supabase
      .from("contractor_telephony")
      .select("contractor_id, telephony_backend, retell_agent_id, elevenlabs_voice_id, setup_status")
      .eq("phone_number", phoneNumber)
      .single();

    if (error || !telephony) {
      console.log(`[TelephonyRouter] No contractor found for ${phoneNumber}`);
      return null;
    }

    if (telephony.setup_status !== "active") {
      console.warn(`[TelephonyRouter] Contractor ${telephony.contractor_id} telephony not active (${telephony.setup_status})`);
      return null;
    }

    return {
      backend: telephony.telephony_backend as TelephonyBackend,
      contractorId: telephony.contractor_id,
      phoneNumber,
      agentId: telephony.retell_agent_id,
      voiceId: telephony.elevenlabs_voice_id,
      isActive: true,
    };
  }

  // ─── Route by Contractor ID ───
  // For admin operations, explicit contractor selection
  async routeByContractor(contractorId: string): Promise<TelephonyRoute | null> {
    const { data: telephony, error } = await this.supabase
      .from("contractor_telephony")
      .select("telephony_backend, phone_number, retell_agent_id, elevenlabs_voice_id, setup_status")
      .eq("contractor_id", contractorId)
      .single();

    if (error || !telephony) {
      console.log(`[TelephonyRouter] No telephony config for contractor ${contractorId}`);
      return null;
    }

    return {
      backend: telephony.telephony_backend as TelephonyBackend,
      contractorId,
      phoneNumber: telephony.phone_number,
      agentId: telephony.retell_agent_id,
      voiceId: telephony.elevenlabs_voice_id,
      isActive: telephony.setup_status === "active",
    };
  }

  // ─── Get Backend Status ───
  async getBackendStatus(): Promise<{
    trillet: { available: boolean; mockMode: boolean };
    retellTwilio: { available: boolean; configured: boolean; missingVars: string[] };
    elevenLabs: { available: boolean };
  }> {
    const retellValidation = validateRetellTwilioConfig();

    return {
      trillet: {
        available: telephonyFeatures.trilletEnabled,
        mockMode: !process.env.TRILLET_API_KEY,
      },
      retellTwilio: {
        available: telephonyFeatures.retellTwilioEnabled,
        configured: retellValidation.valid,
        missingVars: retellValidation.missing,
      },
      elevenLabs: {
        available: telephonyFeatures.elevenLabsEnabled,
      },
    };
  }

  // ─── Handle Retell + Twilio Inbound ───
  // Full flow: Twilio webhook → register call with Retell → return TwiML with WebSocket
  async handleRetellTwilioInbound(params: {
    twilioCallSid: string;
    fromNumber: string;
    toNumber: string;
    contractorId: string;
    agentId: string;
  }): Promise<{ twiml: string; retellCallId?: string } | null> {
    if (!telephonyFeatures.retellTwilioEnabled) {
      console.warn("[TelephonyRouter] Retell+Twilio not configured");
      return { twiml: twilioService.generateFallbackTwiML() };
    }

    // Register the call with Retell
    const registration = await retellService.registerCall(
      params.agentId,
      params.twilioCallSid,
      params.fromNumber,
      params.toNumber
    );

    if (!registration) {
      console.error("[TelephonyRouter] Failed to register call with Retell");
      return { twiml: twilioService.generateFallbackTwiML() };
    }

    // Generate TwiML with Retell WebSocket
    const twiml = twilioService.generateRetellTwiML(registration.websocket_url);

    return {
      twiml,
      retellCallId: registration.call_id,
    };
  }

  // ─── Provision Retell+Twilio for New Contractor ───
  async provisionContractor(contractorId: string, config: {
    businessName: string;
    areaCode?: string;
    voiceCloneSamples?: Buffer[];
  }): Promise<{ success: boolean; phoneNumber?: string; agentId?: string; error?: string }> {
    if (!telephonyFeatures.retellTwilioEnabled) {
      return { success: false, error: "Retell+Twilio not configured" };
    }

    try {
      // 1. Create Twilio subaccount
      const subaccount = await twilioService.createSubaccount(config.businessName);
      if (!subaccount) {
        return { success: false, error: "Failed to create Twilio subaccount" };
      }

      // 2. Clone voice (if samples provided, otherwise use default)
      let voiceId = "XB0fDUnXU5powFXDhGBwa"; // Default ElevenLabs UK female voice
      if (config.voiceCloneSamples && config.voiceCloneSamples.length > 0) {
        const clonedVoiceId = await elevenLabsService.cloneVoice(
          `${config.businessName} Voice`,
          config.voiceCloneSamples
        );
        if (clonedVoiceId) voiceId = clonedVoiceId;
      }

      // 3. Create Retell agent
      const agent = await retellService.createAgent({
        name: `${config.businessName} AI Receptionist`,
        voice_id: voiceId,
        language: "en-GB",
        begin_message: "Hello, thank you for calling. I'm your AI receptionist. How can I help you today?",
      });
      if (!agent) {
        return { success: false, error: "Failed to create Retell agent" };
      }

      // 4. Search and purchase UK number
      const availableNumbers = await twilioService.searchUkNumbers(config.areaCode, 3);
      if (availableNumbers.length === 0) {
        return { success: false, error: "No UK numbers available" };
      }

      const webhookBase = process.env.NEXT_PUBLIC_APP_URL || "https://api.whoza.ai";
      const purchasedNumber = await twilioService.purchaseNumber(
        subaccount.sid,
        subaccount.authToken,
        availableNumbers[0],
        `${webhookBase}/webhooks/twilio/inbound`,
        `${webhookBase}/webhooks/twilio/status`
      );
      if (!purchasedNumber) {
        return { success: false, error: "Failed to purchase phone number" };
      }

      // 5. Store configuration in database
      const { error: dbError } = await this.supabase.from("contractor_telephony").insert({
        contractor_id: contractorId,
        telephony_backend: "retell_twilio",
        twilio_subaccount_sid: subaccount.sid,
        twilio_subaccount_auth_token: subaccount.authToken, // TODO: encrypt
        twilio_master_account_sid: process.env.TWILIO_MASTER_ACCOUNT_SID,
        retell_agent_id: agent.agent_id,
        elevenlabs_voice_id: voiceId,
        phone_number: purchasedNumber.phoneNumber,
        phone_number_sid: purchasedNumber.sid,
        number_type: "local",
        number_strategy: "new",
        setup_status: "active",
        activated_at: new Date().toISOString(),
      });

      if (dbError) {
        return { success: false, error: `Database error: ${dbError.message}` };
      }

      return {
        success: true,
        phoneNumber: purchasedNumber.phoneNumber,
        agentId: agent.agent_id,
      };
    } catch (err) {
      console.error("[TelephonyRouter] Provisioning error:", err);
      return { success: false, error: String(err) };
    }
  }
}

export const telephonyRouter = new TelephonyRouter();
