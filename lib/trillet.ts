import { TrilletCallEvent } from "./trillet-types";

const TRILLET_API_KEY = process.env.TRILLET_API_KEY;
const TRILLET_BASE_URL = "https://api.trillet.ai/v1";

/**
 * Trillet Service - White-label voice AI infrastructure
 * 
 * All methods are stubs ready to be activated once Agency trial is signed up.
 * When TRILLET_API_KEY is missing, methods return mock data for local testing.
 */

class TrilletService {
  private apiKey: string | undefined;
  private baseUrl: string;

  constructor() {
    this.apiKey = TRILLET_API_KEY;
    this.baseUrl = TRILLET_BASE_URL;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      console.warn("[Trillet] No API key configured - returning mock data");
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
      throw new Error(`Trillet API error: ${res.status} ${error}`);
    }

    return res.json();
  }

  // ─── Agent Management ───

  async listAgents() {
    return this.fetch("/call-agents");
  }

  async getAgent(agentId: string) {
    return this.fetch(`/call-agents/${agentId}`);
  }

  async createAgent(data: {
    name: string;
    voice?: string;
    language?: string;
    knowledgeBaseUrls?: string[];
    greeting?: string;
    capabilities?: string[];
  }) {
    return this.fetch("/call-agents", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateAgent(agentId: string, data: Partial<Record<string, unknown>>) {
    return this.fetch(`/call-agents/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // ─── Call Management ───

  async initiateCall(data: {
    agentId: string;
    phoneNumber: string;
    variables?: Record<string, string>;
  }) {
    return this.fetch("/voice-calls", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getCall(callId: string) {
    return this.fetch(`/voice-calls/${callId}`);
  }

  async listCalls(params?: { agentId?: string; limit?: number }) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return this.fetch(`/voice-calls?${query}`);
  }

  // ─── Conversation Management ───

  async getConversation(conversationId: string) {
    return this.fetch(`/conversations/${conversationId}`);
  }

  async listConversations(params?: { agentId?: string; limit?: number }) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return this.fetch(`/conversations?${query}`);
  }

  // ─── Webhook Processing ───

  async processWebhook(payload: TrilletCallEvent) {
    // Route to appropriate handler based on event type
    switch (payload.event) {
      case "call.completed":
        return this.handleCallCompleted(payload);
      case "appointment.booked":
        return this.handleAppointmentBooked(payload);
      case "lead.captured":
        return this.handleLeadCaptured(payload);
      case "voicemail.left":
        return this.handleVoicemailLeft(payload);
      default:
        console.log("[Trillet Webhook] Unhandled event:", payload.event);
        return { received: true };
    }
  }

  private async handleCallCompleted(payload: TrilletCallEvent) {
    // TODO: Update Supabase with call outcome
    // TODO: Send WhatsApp notification to client
    // TODO: Update dashboard metrics
    console.log("[Trillet] Call completed:", payload.callId, payload.outcome);
    return { processed: true };
  }

  private async handleAppointmentBooked(payload: TrilletCallEvent) {
    // TODO: Create job in Supabase
    // TODO: Send confirmation to customer
    // TODO: Notify tradesperson via WhatsApp
    console.log("[Trillet] Appointment booked:", payload.appointment);
    return { processed: true };
  }

  private async handleLeadCaptured(payload: TrilletCallEvent) {
    // TODO: Add lead to waitlist or CRM
    console.log("[Trillet] Lead captured:", payload.customer);
    return { processed: true };
  }

  private async handleVoicemailLeft(payload: TrilletCallEvent) {
    // TODO: Store voicemail recording URL
    // TODO: Send notification to tradesperson
    console.log("[Trillet] Voicemail left:", payload.recordingUrl);
    return { processed: true };
  }
}

export const trillet = new TrilletService();
