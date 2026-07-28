import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY is not configured")
  return new Resend(key)
}

// Use anon key for waitlist persistence — email_subscribers has public INSERT RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  ""
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Admin emails that must receive notification on every signup
const ADMIN_EMAILS = ["dru@whoza.ai", "support@whoza.ai"]

function buildWelcomeHtml(_referralCode: string | null): string {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,.08);">
        <tr><td style="background:#0f172a;padding:26px 32px;">
          <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-.4px;">whoza<span style="color:#34d399;">.ai</span></span>
        </td></tr>
        <tr><td style="padding:34px 32px 6px;">
          <h1 style="margin:0 0 18px;font-size:24px;line-height:1.25;color:#0f172a;font-weight:800;">You're in. Welcome to Whoza.</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">Hi there,</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">Thanks for signing up — you've claimed one of our early-access spots. That means <strong>Katie</strong>, your new AI receptionist, is about to start answering every call for you, 24/7 — and booking the real jobs straight to your WhatsApp.</p>
          <p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#0f172a;font-weight:700;">Here's what happens next</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 20px;">
            <tr><td valign="top" style="padding:6px 12px 6px 0;"><span style="display:inline-block;width:26px;height:26px;background:#ecfdf5;color:#047857;border-radius:50%;text-align:center;line-height:26px;font-weight:800;font-size:14px;">1</span></td><td style="padding:6px 0;font-size:15px;line-height:1.55;color:#334155;">I'll personally email you within 48 hours to get you set up.</td></tr>
            <tr><td valign="top" style="padding:6px 12px 6px 0;"><span style="display:inline-block;width:26px;height:26px;background:#ecfdf5;color:#047857;border-radius:50%;text-align:center;line-height:26px;font-weight:800;font-size:14px;">2</span></td><td style="padding:6px 0;font-size:15px;line-height:1.55;color:#334155;">We'll do a quick call to point your existing number at Katie — nothing to install, you keep your number.</td></tr>
            <tr><td valign="top" style="padding:6px 12px 6px 0;"><span style="display:inline-block;width:26px;height:26px;background:#ecfdf5;color:#047857;border-radius:50%;text-align:center;line-height:26px;font-weight:800;font-size:14px;">3</span></td><td style="padding:6px 0;font-size:15px;line-height:1.55;color:#334155;">Katie goes live, usually within about 30 minutes of that call.</td></tr>
            <tr><td valign="top" style="padding:6px 12px 6px 0;"><span style="display:inline-block;width:26px;height:26px;background:#ecfdf5;color:#047857;border-radius:50%;text-align:center;line-height:26px;font-weight:800;font-size:14px;">4</span></td><td style="padding:6px 0;font-size:15px;line-height:1.55;color:#334155;">Your 7 days free start then — no card needed. After that you only pay per job you accept.</td></tr>
          </table>
          <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#334155;">Any questions before then, just hit reply — this reaches me directly.</p>
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:12px;background:#0f172a;"><a href="https://www.whoza.ai" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:12px;">Explore Whoza</a></td></tr></table>
        </td></tr>
        <tr><td style="padding:26px 32px 30px;">
          <p style="margin:22px 0 4px;font-size:16px;line-height:1.6;color:#334155;">Cheers,</p>
          <p style="margin:0;font-size:16px;line-height:1.6;color:#0f172a;font-weight:700;">Dru</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b;">Founder, Whoza · <a href="mailto:dru@whoza.ai" style="color:#047857;text-decoration:none;">dru@whoza.ai</a> · <a href="https://www.whoza.ai" style="color:#047857;text-decoration:none;">whoza.ai</a></p>
        </td></tr>
        <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;">
          <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;">You're receiving this because you signed up at whoza.ai. Whoza — the AI phone receptionist for UK trades.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildWelcomeText(_referralCode: string | null): string {
  return `Hi there,

Thanks for signing up to Whoza — you're in.

You've claimed one of our early-access spots, which means Katie, your new AI receptionist, is about to start answering every call for you, 24/7 — and booking the real jobs straight to your WhatsApp.

Here's what happens next:
1. I'll personally email you within 48 hours to get you set up.
2. We'll do a quick call to point your existing number at Katie — nothing to install, you keep your number.
3. Katie goes live, usually within about 30 minutes of that call.
4. Your 7 days free start then — no card needed. After that you only pay per job you accept.

Any questions before then, just hit reply — this reaches me directly.

Cheers,
Dru
Founder, Whoza
dru@whoza.ai · whoza.ai
`
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
    const { email, trade, phone, postcode, referral_code, source, plan } = body

    if (!email || !trade) {
      return NextResponse.json(
        { error: "Email and trade are required" },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()

    // ── 1. Persist signup to database (backup / audit trail) ──
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from("email_subscribers").upsert(
          {
            email: email.toLowerCase().trim(),
            source: source ? `waitlist-${source}` : "waitlist-homepage",
            page_path: plan ? `/waitlist?plan=${plan}` : "/waitlist",
            metadata: {
              trade,
              phone: phone || null,
              postcode: postcode || null,
              referral_code: referral_code || null,
              plan: plan || null,
              source: source || "homepage",
              signed_up_at: timestamp,
            },
          },
          { onConflict: "email" }
        )
        if (dbError) {
          console.error("Waitlist DB persistence error:", dbError)
        }
      } catch (dbErr) {
        // Non-blocking: log but continue so user experience isn't affected
        console.error("Waitlist DB persistence exception:", dbErr)
      }
    }

    const resend = getResend()

    // ── 2. Send admin notifications (both emails, independent) ──
    const adminResults = await Promise.all(
      ADMIN_EMAILS.map((adminEmail) =>
        resend.emails.send({
          from: "Whoza.ai <support@whoza.ai>",
          to: adminEmail,
          subject: `New Signup — ${trade} — ${email}`,
          text: `
New signup:

Email: ${email}
Trade: ${trade}
Phone: ${phone || "Not provided"}
Postcode: ${postcode || "Not provided"}
Referral Code: ${referral_code || "None"}
Source: ${source || "homepage"}
Plan: ${plan || "N/A"}
Timestamp: ${timestamp}
          `.trim(),
        })
      )
    )

    // ── 3. Send user confirmation ──
    const userResult = await resend.emails.send({
      from: "Dru @ Whoza.ai <dru@whoza.ai>",
      replyTo: "dru@whoza.ai",
      to: email,
      subject: "You're in — welcome to Whoza",
      html: buildWelcomeHtml(referral_code || null),
      text: buildWelcomeText(referral_code || null),
    })

    // ── 4. Check for errors (Resend returns { error } without throwing) ──
    const adminErrors = adminResults
      .filter((r): r is { error: { name: string; message: string } } => !!r.error)
      .map((r) => `${r.error.name}: ${r.error.message}`)

    const userError = userResult?.error
      ? `${userResult.error.name}: ${userResult.error.message}`
      : null

    if (adminErrors.length > 0) {
      console.error("Admin notification errors:", adminErrors)
    }
    if (userError) {
      console.error("User confirmation email error:", userError)
    }

    // If all emails failed, log it but don't block the signup
    if (adminErrors.length === ADMIN_EMAILS.length && userError) {
      console.error("All email deliveries failed:", { admin: adminErrors, user: userError })
    }

    return NextResponse.json({
      success: true,
      notified: ADMIN_EMAILS.length - adminErrors.length,
      total: ADMIN_EMAILS.length,
      userEmailId: userResult?.data?.id || null,
      errors:
        adminErrors.length > 0 || userError
          ? { admin: adminErrors, user: userError }
          : undefined,
    })
  } catch (error) {
    console.error("Waitlist submission error:", error)
    // Even on total failure, if we have the email and supabase, try to store it
    if (body?.email && supabase) {
      try {
        await supabase.from("email_subscribers").upsert(
          {
            email: body.email.toLowerCase().trim(),
            source: "waitlist-error-recovery",
            metadata: {
              trade: body.trade || "unknown",
              error: String(error).slice(0, 500),
              recovered_at: new Date().toISOString(),
            },
          },
          { onConflict: "email" }
        )
      } catch {
        /* best effort */
      }
    }
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
