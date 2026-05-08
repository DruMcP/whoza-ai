/**
 * Trillet Environment Configuration
 * 
 * Provides a centralized way to toggle between mock and real API modes.
 * During pre-trial development: MOCK mode (no API key needed)
 * During trial testing: REAL mode (swap in API keys)
 * 
 * Usage:
 *   import { trilletConfig } from "@/lib/trillet-config";
 *   if (trilletConfig.isMockMode) { ... }
 *   
 *   // For one-off override:
 *   trilletConfig.forceMockMode(true); // or false
 */

export interface TrilletConfig {
  apiKey: string | undefined;
  baseUrl: string;
  webhookSecret: string | undefined;
  workspaceId: string;
  agentId: string;
  isMockMode: boolean;
  forceMockMode: (value: boolean) => void;
}

let _forceMock: boolean | null = null;

export const trilletConfig: TrilletConfig = {
  get apiKey() {
    return process.env.TRILLET_API_KEY;
  },

  get baseUrl() {
    return process.env.TRILLET_BASE_URL || "https://api.trillet.ai/v1";
  },

  get webhookSecret() {
    return process.env.TRILLET_WEBHOOK_SECRET;
  },

  get workspaceId() {
    return process.env.TRILLET_WORKSPACE_ID || "whoza-workspace";
  },

  get agentId() {
    return process.env.TRILLET_AGENT_ID || "katie-agent";
  },

  get isMockMode() {
    if (_forceMock !== null) return _forceMock;
    return !this.apiKey;
  },

  forceMockMode(value: boolean) {
    _forceMock = value;
    console.warn(`[Trillet Config] Mock mode ${value ? "ENABLED" : "DISABLED"} by forceMockMode()`);
  },
};

/**
 * Helper to log current Trillet configuration state (safe for logs — no secrets)
 */
export function logTrilletConfig() {
  console.log("[Trillet Config]", {
    mockMode: trilletConfig.isMockMode,
    baseUrl: trilletConfig.baseUrl,
    workspaceId: trilletConfig.workspaceId,
    agentId: trilletConfig.agentId,
    hasApiKey: !!trilletConfig.apiKey,
    hasWebhookSecret: !!trilletConfig.webhookSecret,
  });
}
