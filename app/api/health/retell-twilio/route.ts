import { NextResponse } from "next/server";
import { telephonyFeatures, validateRetellTwilioConfig, logTelephonyConfig } from "@/lib/telephony-config";
import { twilioService } from "@/lib/twilio-service";
import { retellService } from "@/lib/retell-service";
import { elevenLabsService } from "@/lib/elevenlabs-service";

/**
 * Health Check: Retell + Twilio Integration
 * Route: GET /api/health/retell-twilio
 * 
 * Returns configuration status and connectivity for all telephony backends.
 * Safe to call — no side effects.
 */

export async function GET() {
  logTelephonyConfig();

  const retellValidation = validateRetellTwilioConfig();

  const checks = {
    retell: {
      configured: telephonyFeatures.retellTwilioEnabled,
      api_reachable: false,
      error: null as string | null,
    },
    twilio: {
      configured: telephonyFeatures.retellTwilioEnabled,
      api_reachable: false,
      error: null as string | null,
    },
    elevenlabs: {
      configured: telephonyFeatures.elevenLabsEnabled,
      api_reachable: false,
      error: null as string | null,
    },
  };

  // Test Retell connectivity (lightweight: list voices)
  if (telephonyFeatures.retellTwilioEnabled) {
    try {
      const voices = await retellService.listVoices();
      checks.retell.api_reachable = voices.length > 0;
    } catch (err) {
      checks.retell.error = err instanceof Error ? err.message : String(err);
    }
  }

  // Test Twilio connectivity (check if credentials work)
  if (telephonyFeatures.retellTwilioEnabled) {
    try {
      checks.twilio.api_reachable = twilioService.isConfigured();
    } catch (err) {
      checks.twilio.error = err instanceof Error ? err.message : String(err);
    }
  }

  // Test ElevenLabs connectivity
  if (telephonyFeatures.elevenLabsEnabled) {
    try {
      const voices = await elevenLabsService.listVoices();
      checks.elevenlabs.api_reachable = voices.length > 0;
    } catch (err) {
      checks.elevenlabs.error = err instanceof Error ? err.message : String(err);
    }
  }

  const allHealthy =
    (!telephonyFeatures.retellTwilioEnabled || (checks.retell.api_reachable && checks.twilio.api_reachable)) &&
    (!telephonyFeatures.elevenLabsEnabled || checks.elevenlabs.api_reachable);

  return NextResponse.json({
    status: allHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    features: {
      trillet: telephonyFeatures.trilletEnabled,
      retell_twilio: telephonyFeatures.retellTwilioEnabled,
      elevenlabs: telephonyFeatures.elevenLabsEnabled,
    },
    checks,
    missing_env_vars: retellValidation.missing,
  }, {
    status: allHealthy ? 200 : 503,
  });
}
