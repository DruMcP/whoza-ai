import { TrilletCallEvent, TrilletCreateAgentRequest, TrilletInitiateCallRequest } from "./trillet-types";
import { trilletConfig } from "./trillet-config";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Production-ready Trillet service for server-side usage.
 * 
 * Features:
 * - Exponential backoff retry
 * - Graceful mock mode when API key is missing (pre-trial development)
 * - Structured error handling
 * - Request/response logging
 */

class TrilletServerService {
  private apiKey: string | undefined;
  private baseUrl: string;
  private webhookSecret: string | undefined;
  private mockMode: boolean;

  constructor() {
    this.apiKey = trilletConfig.apiKey;
    this.baseUrl = trilletConfig.baseUrl;
    this.webhookSecret = trilletConfig.webhookSecret;
    this.mockMode = trilletConfig.isMockMode;
    
    if (this.mockMode) {
      console.warn("[Trillet Server] MOCK MODE — No TRILLET_API_KEY configured. All API calls return mock data.");
    }
  }

  isMockMode(): boolean {
    return this.mockMode;
  }

  private async fetchWithRetry(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new TrilletAPIError(res.status, errorText, endpoint);
      }

      // Handle empty responses (e.g., 204 No Content)
      if (res.status === 204) {
        return null;
      }

      return res.json();
    } catch (error) {
      if (error instanceof TrilletAPIError && error.status >= 500 && retryCount < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * Math.pow(2, retryCount);
        console.warn(`[Trillet] Retry ${retryCount + 1}/${MAX_RETRIES} for ${endpoint} after ${delay}ms`);
        await sleep(delay);
        return this.fetchWithRetry(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    if (this.mockMode) {
      return this.mockResponse(endpoint, options);
    }
    return this.fetchWithRetry(endpoint, options);
  }

  private mockResponse(endpoint: string, _options: RequestInit) {
    console.log(`[Trillet Mock] ${endpoint}`);
    
    // Return sensible mock data based on endpoint
    if (endpoint.includes("/call-agents")) {
      return {
        id: "mock-agent-123",
        name: "Katie",
        voice: "female-uk",
        status: "active",
        createdAt: new Date().toISOString(),
      };
    }
    
    if (endpoint.includes("/voice-calls")) {
      return {
        id: "mock-call-" + Math.random().toString(36).substring(7),
        status: "initiated",
        agentId: "mock-agent-123",
        phoneNumber: "+441234567890",
        createdAt: new Date().toISOString(),
      };
    }

    return { mock: true, endpoint };
  }

  // ─── Agent Management ───

  async listAgents() {
    return this.fetch("/call-agents");
  }

  async getAgent(agentId: string) {
    return this.fetch(`/call-agents/${agentId}`);
  }

  async createAgent(data: TrilletCreateAgentRequest) {
    return this.fetch("/call-agents", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateAgent(agentId: string, data: Partial<TrilletCreateAgentRequest>) {
    return this.fetch(`/call-agents/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // ─── Call Management ───

  async initiateCall(data: TrilletInitiateCallRequest) {
    return this.fetch("/voice-calls", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getCall(callId: string) {
    return this.fetch(`/voice-calls/${callId}`);
  }

  async listCalls(params?: { agentId?: string; limit?: number; status?: string }) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return this.fetch(`/voice-calls?${query}`);
  }

  async endCall(callId: string) {
    return this.fetch(`/voice-calls/${callId}/end`, {
      method: "POST",
    });
  }

  async transferCall(callId: string, phoneNumber: string) {
    return this.fetch(`/voice-calls/${callId}/transfer`, {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
    });
  }

  // ─── Conversation Management ───

  async getConversation(conversationId: string) {
    return this.fetch(`/conversations/${conversationId}`);
  }

  async listConversations(params?: { agentId?: string; limit?: number }) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return this.fetch(`/conversations?${query}`);
  }

  // ─── Number Management ───

  async listAvailableNumbers(params?: { country?: string; areaCode?: string; type?: string }) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return this.fetch(`/numbers/available?${query}`);
  }

  async provisionNumber(phoneNumber: string, agentId: string) {
    return this.fetch("/numbers", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, agentId }),
    });
  }

  async releaseNumber(phoneNumber: string) {
    return this.fetch(`/numbers/${phoneNumber}`, {
      method: "DELETE",
    });
  }

  // ─── Webhook Security ───

  verifyWebhookSignature(payload: string, signature: string | null): boolean {
    if (!this.webhookSecret) {
      console.warn("[Trillet Webhook] No TRILLET_WEBHOOK_SECRET configured — skipping signature verification (safe for trial, NOT for production)");
      return true;
    }

    if (!signature) {
      console.error("[Trillet Webhook] Missing signature header");
      return false;
    }

    // HMAC-SHA256 verification
    const crypto = require("crypto");
    const expected = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(payload)
      .digest("hex");

    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  }

  // ─── Webhook Processing ───

  async processWebhook(payload: TrilletCallEvent) {
    switch (payload.event) {
      case "call.completed":
        return { type: "call_completed", payload };
      case "call.started":
        return { type: "call_started", payload };
      case "call.transferred":
        return { type: "call_transferred", payload };
      case "appointment.booked":
        return { type: "appointment_booked", payload };
      case "lead.captured":
        return { type: "lead_captured", payload };
      case "voicemail.left":
        return { type: "voicemail_left", payload };
      default:
        console.warn(`[Trillet Webhook] Unhandled event type: ${(payload as any).event}`);
        return { type: "unknown", payload };
    }
  }
}

class TrilletAPIError extends Error {
  status: number;
  endpoint: string;

  constructor(status: number, message: string, endpoint: string) {
    super(`Trillet API Error ${status}: ${message} (${endpoint})`);
    this.status = status;
    this.endpoint = endpoint;
    this.name = "TrilletAPIError";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const trilletServer = new TrilletServerService();
export { TrilletAPIError };
