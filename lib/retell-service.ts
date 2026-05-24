// Retell Custom Telephony (BYOC) service
// Responsibilities:
// - Agent creation per contractor
// - register-call API (with audio_websocket_protocol='twilio')
// - WebSocket connection management
// - Voice configuration (ElevenLabs voice_id)

import { telephonyConfig, telephonyFeatures } from "./telephony-config";

interface RetellAgent {
  agent_id: string;
  name: string;
  voice_id: string;
  language: string;
  webhook_url: string;
  response_engine: string;
  created_at: string;
}

interface RetellCallRegistration {
  call_id: string;
  websocket_url: string;
  agent_id: string;
}

interface RetellAgentConfig {
  name: string;
  voice_id: string;
  language?: string;
  webhook_url?: string;
  response_engine?: {
    type: "retell-llm";
    llm_model?: string;
    system_prompt?: string;
    begin_message?: string;
  };
  begin_message?: string;
  model?: string;
}

export class RetellService {
  private apiKey: string | undefined;
  private baseUrl: string;

  constructor() {
    this.apiKey = telephonyConfig.retellApiKey;
    this.baseUrl = telephonyConfig.retellBaseUrl;
  }

  isConfigured(): boolean {
    return telephonyFeatures.retellTwilioEnabled;
  }

  private async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.apiKey) {
      console.warn("[Retell] No API key configured — returning null");
      return null;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Retell API error: ${res.status} ${error}`);
    }

    return res.json();
  }

  // ─── Agent Management ───

  async createAgent(config: RetellAgentConfig): Promise<RetellAgent | null> {
    if (!this.isConfigured()) return null;

    try {
      const data = await this.fetch("/create-agent", {
        method: "POST",
        body: JSON.stringify({
          ...config,
          response_engine: config.response_engine || {
            type: "retell-llm",
            llm_model: "claude-3.5-sonnet",
          },
        }),
      });

      if (!data) return null;

      return {
        agent_id: data.agent_id,
        name: config.name,
        voice_id: config.voice_id,
        language: config.language || "en-GB",
        webhook_url: config.webhook_url || "",
        response_engine: "retell-llm",
        created_at: data.created_at || new Date().toISOString(),
      };
    } catch (err) {
      console.error("[Retell] Create agent error:", err);
      return null;
    }
  }

  async getAgent(agentId: string): Promise<any> {
    if (!this.isConfigured()) return null;
    return this.fetch(`/get-agent/${agentId}`);
  }

  async updateAgent(agentId: string, updates: Partial<RetellAgentConfig>): Promise<any> {
    if (!this.isConfigured()) return null;
    return this.fetch(`/update-agent/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  async deleteAgent(agentId: string): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      await this.fetch(`/delete-agent/${agentId}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("[Retell] Delete agent error:", err);
      return false;
    }
  }

  // ─── Call Registration (Critical for Twilio BYOC) ───

  async registerCall(
    agentId: string,
    twilioCallSid: string,
    fromNumber?: string,
    toNumber?: string,
    metadata?: Record<string, string>
  ): Promise<RetellCallRegistration | null> {
    if (!this.isConfigured()) return null;

    try {
      const data = await this.fetch("/register-call", {
        method: "POST",
        body: JSON.stringify({
          agent_id: agentId,
          audio_websocket_protocol: "twilio",
          audio_encoding: "mulaw",
          sample_rate: 8000,
          twilio_call_sid,
          from_number: fromNumber,
          to_number: toNumber,
          retell_llm_dynamic_variables: metadata || {},
        }),
      });

      if (!data) return null;

      return {
        call_id: data.call_id,
        websocket_url: data.websocket_url,
        agent_id,
      };
    } catch (err) {
      console.error("[Retell] Register call error:", err);
      return null;
    }
  }

  async endCall(callId: string): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      await this.fetch(`/end-call/${callId}`, { method: "POST" });
      return true;
    } catch (err) {
      console.error("[Retell] End call error:", err);
      return false;
    }
  }

  // ─── Call Details ───

  async getCall(callId: string): Promise<any> {
    if (!this.isConfigured()) return null;
    return this.fetch(`/get-call/${callId}`);
  }

  async listCalls(params?: { agent_id?: string; limit?: number }): Promise<any[]> {
    if (!this.isConfigured()) return [];

    const query = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";
    const data = await this.fetch(`/list-calls${query}`);
    return data?.calls || [];
  }

  // ─── WebSocket URL Generation ───

  getWebSocketUrl(callId: string): string {
    return `wss://api.retellai.com/v2/retell-llm-audio-websocket/${callId}`;
  }

  // ─── Voice Configuration ───

  async listVoices(): Promise<any[]> {
    if (!this.isConfigured()) return [];

    try {
      const data = await this.fetch("/list-voices");
      return data?.voices || [];
    } catch (err) {
      console.error("[Retell] List voices error:", err);
      return [];
    }
  }
}

export const retellService = new RetellService();
