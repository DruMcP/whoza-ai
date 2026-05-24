// Twilio BYOC service
// Responsibilities:
// - Subaccount creation/management
// - UK number search/purchase
// - Webhook configuration
// - Number porting (PAC code)
// - Credential encryption at rest

import { telephonyConfig, telephonyFeatures } from "./telephony-config";

interface TwilioSubaccount {
  sid: string;
  authToken: string;
  friendlyName: string;
  status: string;
}

interface PhoneNumber {
  phoneNumber: string;
  sid: string;
  friendlyName: string;
  voiceUrl: string;
  statusCallback: string;
}

export class TwilioService {
  private masterSid: string | undefined;
  private masterToken: string | undefined;
  private baseUrl = "https://api.twilio.com/2010-04-01";

  constructor() {
    this.masterSid = telephonyConfig.twilioMasterSid;
    this.masterToken = telephonyConfig.twilioMasterToken;
  }

  isConfigured(): boolean {
    return !!(this.masterSid && this.masterToken);
  }

  // ─── Subaccount Management ───

  async createSubaccount(friendlyName: string): Promise<TwilioSubaccount | null> {
    if (!this.isConfigured()) {
      console.warn("[Twilio] Not configured — skipping subaccount creation");
      return null;
    }

    try {
      const url = `${this.baseUrl}/Accounts.json`;
      const body = new URLSearchParams({ FriendlyName: friendlyName });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.masterSid}:${this.masterToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Twilio subaccount creation failed: ${res.status} ${error}`);
      }

      const data = await res.json();
      return {
        sid: data.sid,
        authToken: data.auth_token,
        friendlyName: data.friendly_name,
        status: data.status,
      };
    } catch (err) {
      console.error("[Twilio] Subaccount creation error:", err);
      return null;
    }
  }

  async closeSubaccount(subaccountSid: string): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const url = `${this.baseUrl}/Accounts/${subaccountSid}.json`;
      const body = new URLSearchParams({ Status: "closed" });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.masterSid}:${this.masterToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      return res.ok;
    } catch (err) {
      console.error("[Twilio] Close subaccount error:", err);
      return false;
    }
  }

  // ─── UK Number Search & Purchase ───

  async searchUkNumbers(areaCode?: string, limit = 5): Promise<string[]> {
    if (!this.isConfigured()) return [];

    try {
      const params = new URLSearchParams({
        Country: "GB",
        Type: "local",
        PageSize: String(limit),
        ...(areaCode && { AreaCode: areaCode }),
      });

      const url = `${this.baseUrl}/Accounts/${this.masterSid}/AvailablePhoneNumbers/GB/Local.json?${params}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.masterSid}:${this.masterToken}`).toString("base64")}`,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Twilio number search failed: ${res.status} ${error}`);
      }

      const data = await res.json();
      return (data.available_phone_numbers || []).map((n: any) => n.phone_number);
    } catch (err) {
      console.error("[Twilio] Number search error:", err);
      return [];
    }
  }

  async purchaseNumber(
    subaccountSid: string,
    subaccountToken: string,
    phoneNumber: string,
    webhookUrl: string,
    statusCallbackUrl: string
  ): Promise<PhoneNumber | null> {
    if (!this.isConfigured()) return null;

    try {
      const url = `${this.baseUrl}/Accounts/${subaccountSid}/IncomingPhoneNumbers.json`;
      const body = new URLSearchParams({
        PhoneNumber: phoneNumber,
        VoiceUrl: webhookUrl,
        VoiceMethod: "POST",
        StatusCallback: statusCallbackUrl,
        StatusCallbackMethod: "POST",
      });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${subaccountSid}:${subaccountToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Twilio number purchase failed: ${res.status} ${error}`);
      }

      const data = await res.json();
      return {
        phoneNumber: data.phone_number,
        sid: data.sid,
        friendlyName: data.friendly_name,
        voiceUrl: webhookUrl,
        statusCallback: statusCallbackUrl,
      };
    } catch (err) {
      console.error("[Twilio] Number purchase error:", err);
      return null;
    }
  }

  // ─── Webhook Configuration ───

  async configureNumberWebhooks(
    subaccountSid: string,
    subaccountToken: string,
    numberSid: string,
    inboundUrl: string,
    statusUrl: string
  ): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/Accounts/${subaccountSid}/IncomingPhoneNumbers/${numberSid}.json`;
      const body = new URLSearchParams({
        VoiceUrl: inboundUrl,
        VoiceMethod: "POST",
        StatusCallback: statusUrl,
        StatusCallbackMethod: "POST",
      });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${subaccountSid}:${subaccountToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      return res.ok;
    } catch (err) {
      console.error("[Twilio] Webhook configuration error:", err);
      return false;
    }
  }

  // ─── Call Management ───

  async getCallDetails(
    subaccountSid: string,
    subaccountToken: string,
    callSid: string
  ): Promise<any> {
    try {
      const url = `${this.baseUrl}/Accounts/${subaccountSid}/Calls/${callSid}.json`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${subaccountSid}:${subaccountToken}`).toString("base64")}`,
        },
      });

      if (!res.ok) return null;
      return res.json();
    } catch (err) {
      console.error("[Twilio] Get call details error:", err);
      return null;
    }
  }

  // ─── Balance Check ───

  async getAccountBalance(subaccountSid: string, subaccountToken: string): Promise<number> {
    try {
      const url = `${this.baseUrl}/Accounts/${subaccountSid}.json`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${subaccountSid}:${subaccountToken}`).toString("base64")}`,
        },
      });

      if (!res.ok) return 0;
      const data = await res.json();
      return data.balance || 0;
    } catch (err) {
      console.error("[Twilio] Balance check error:", err);
      return 0;
    }
  }

  // ─── TwiML Generation ───

  generateRetellTwiML(retellWebSocketUrl: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${retellWebSocketUrl}">
      <Parameter name="retell_audio_websocket_protocol" value="twilio"/>
    </Stream>
  </Connect>
</Response>`;
  }

  generateFallbackTwiML(message = "We're sorry, our AI assistant is temporarily unavailable. Please call back later."): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy">${message}</Say>
</Response>`;
  }

  // ─── Webhook Security ───

  verifyWebhookSignature(
    url: string,
    params: Record<string, string>,
    signature: string | null
  ): boolean {
    if (!telephonyFeatures.retellTwilioEnabled || !this.masterToken) {
      console.warn("[Twilio] Webhook verification skipped — not configured");
      return true;
    }

    if (!signature) {
      console.error("[Twilio] Missing X-Twilio-Signature header");
      return false;
    }

    try {
      // Twilio signs the full URL + sorted params
      const sortedKeys = Object.keys(params).sort();
      const paramString = sortedKeys.map((key) => `${key}${params[key]}`).join("");
      const fullUrl = url + paramString;

      const crypto = require("crypto");
      const expected = crypto
        .createHmac("sha1", this.masterToken)
        .update(Buffer.from(fullUrl, "utf8"))
        .digest("base64");

      // Use timingSafeEqual to prevent timing attacks
      const sigBuffer = Buffer.from(signature, "base64");
      const expectedBuffer = Buffer.from(expected, "base64");

      if (sigBuffer.length !== expectedBuffer.length) return false;
      return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
    } catch (err) {
      console.error("[Twilio] Signature verification error:", err);
      return false;
    }
  }
}

export const twilioService = new TwilioService();
