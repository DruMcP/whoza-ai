// Unified telephony configuration
// Reads from environment, provides feature flags
// NO existing imports — standalone new file

export interface TelephonyConfig {
  // Trillet (existing)
  trilletApiKey: string | undefined;
  trilletBaseUrl: string;
  trilletWebhookSecret: string | undefined;

  // Retell (new)
  retellApiKey: string | undefined;
  retellBaseUrl: string;

  // Twilio (new)
  twilioMasterSid: string | undefined;
  twilioMasterToken: string | undefined;
  twilioWebhookSecret: string | undefined;

  // ElevenLabs (new)
  elevenLabsApiKey: string | undefined;
  elevenLabsBaseUrl: string;

  // Encryption (new)
  encryptionKey: string | undefined;
}

export const telephonyConfig: TelephonyConfig = {
  trilletApiKey: process.env.TRILLET_API_KEY,
  trilletBaseUrl: process.env.TRILLET_BASE_URL || "https://api.trillet.ai/v1",
  trilletWebhookSecret: process.env.TRILLET_WEBHOOK_SECRET,

  retellApiKey: process.env.RETELL_API_KEY,
  retellBaseUrl: process.env.RETELL_BASE_URL || "https://api.retellai.com/v2",

  twilioMasterSid: process.env.TWILIO_MASTER_ACCOUNT_SID,
  twilioMasterToken: process.env.TWILIO_MASTER_AUTH_TOKEN,
  twilioWebhookSecret: process.env.TWILIO_WEBHOOK_SECRET,

  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
  elevenLabsBaseUrl: process.env.ELEVENLABS_BASE_URL || "https://api.elevenlabs.io/v1",

  encryptionKey: process.env.TELEPHONY_CREDENTIALS_ENCRYPTION_KEY,
};

// Feature flags — code paths only execute when configured
export const telephonyFeatures = {
  trilletEnabled: !!process.env.TRILLET_API_KEY,
  retellTwilioEnabled: !!(process.env.RETELL_API_KEY && process.env.TWILIO_MASTER_ACCOUNT_SID),
  elevenLabsEnabled: !!process.env.ELEVENLABS_API_KEY,
  encryptionEnabled: !!process.env.TELEPHONY_CREDENTIALS_ENCRYPTION_KEY,
};

// Validate critical config for Retell/Twilio path
export function validateRetellTwilioConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!telephonyConfig.retellApiKey) missing.push("RETELL_API_KEY");
  if (!telephonyConfig.twilioMasterSid) missing.push("TWILIO_MASTER_ACCOUNT_SID");
  if (!telephonyConfig.twilioMasterToken) missing.push("TWILIO_MASTER_AUTH_TOKEN");

  return {
    valid: missing.length === 0,
    missing,
  };
}

// Log configuration status (safe — never logs secrets)
export function logTelephonyConfig(): void {
  console.log("[Telephony] Configuration status:");
  console.log(`  Trillet: ${telephonyFeatures.trilletEnabled ? "enabled" : "disabled (no API key)"}`);
  console.log(`  Retell+Twilio: ${telephonyFeatures.retellTwilioEnabled ? "enabled" : "disabled (missing env vars)"}`);
  console.log(`  ElevenLabs: ${telephonyFeatures.elevenLabsEnabled ? "enabled" : "disabled (no API key)"}`);
  console.log(`  Encryption: ${telephonyFeatures.encryptionEnabled ? "enabled" : "disabled (no key)"}`);
}
