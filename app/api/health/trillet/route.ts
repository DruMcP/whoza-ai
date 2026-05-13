import { NextRequest, NextResponse } from "next/server";
import { trilletConfig } from "@/lib/trillet-config";
import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/health/trillet
 *
 * Diagnostic endpoint to verify Trillet integration status.
 * Returns mock mode status, Supabase connectivity, and credential check.
 */
export async function GET(req: NextRequest) {
  const checks: Record<string, { status: "ok" | "warn" | "error"; detail: string }> = {};

  // 1. Mock mode check
  checks.mockMode = trilletConfig.isMockMode
    ? { status: "warn", detail: "TRILLET_API_KEY not set — running in MOCK mode (no real calls)" }
    : { status: "ok", detail: "TRILLET_API_KEY present — LIVE mode ready" };

  // 2. Supabase connectivity
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: tables, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .in("table_name", ["calls", "enquiries", "appointments", "leads"]);

    if (error) {
      checks.supabase = { status: "error", detail: `Supabase query failed: ${error.message}` };
    } else {
      const foundTables = tables?.map((t) => t.table_name) || [];
      const missing = ["calls", "enquiries", "appointments", "leads"].filter(
        (t) => !foundTables.includes(t)
      );
      if (missing.length > 0) {
        checks.supabase = {
          status: "warn",
          detail: `Missing tables: ${missing.join(", ")}. Run migrations.`,
        };
      } else {
        checks.supabase = { status: "ok", detail: "All required tables present" };
      }
    }
  } catch (err) {
    checks.supabase = { status: "error", detail: `Supabase connection failed: ${(err as Error).message}` };
  }

  // 3. Webhook secret
  checks.webhookSecret = process.env.TRILLET_WEBHOOK_SECRET
    ? { status: "ok", detail: "TRILLET_WEBHOOK_SECRET set — signature verification enabled" }
    : { status: "warn", detail: "TRILLET_WEBHOOK_SECRET not set — webhook signatures bypassed (unsafe for production)" };

  // 4. WhatsApp provider
  const whatsappProvider = process.env.WHATSAPP_PROVIDER || "stub";
  checks.whatsapp = whatsappProvider === "stub"
    ? { status: "warn", detail: "WHATSAPP_PROVIDER=stub — no real WhatsApp delivery" }
    : { status: "ok", detail: `WHATSAPP_PROVIDER=${whatsappProvider} — live delivery configured` };

  // 5. Overall status
  const allOk = Object.values(checks).every((c) => c.status === "ok");
  const hasErrors = Object.values(checks).some((c) => c.status === "error");

  return NextResponse.json({
    status: hasErrors ? "error" : allOk ? "ready" : "partial",
    mockMode: trilletConfig.isMockMode,
    timestamp: new Date().toISOString(),
    checks,
    nextSteps: trilletConfig.isMockMode
      ? [
          "1. Get TRILLET_API_KEY from Trillet dashboard (trial starts May 23–29)",
          "2. Set TRILLET_WEBHOOK_SECRET for webhook verification",
          "3. Choose WHATSAPP_PROVIDER (twilio | meta | trillet) and add credentials",
          "4. Run scripts/test-trillet-mock.js on staging to verify pipeline",
          "5. Place first live test call via Trillet dashboard",
        ]
      : ["Integration is LIVE — place a test call to verify end-to-end flow"],
  });
}
