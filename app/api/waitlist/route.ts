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
    const adminNotificationPromises = ADMIN_EMAILS.map((adminEmail) =>
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

    // ── 3. Send user confirmation ──
    const userConfirmationPromise = resend.emails.send({
      from: "Dru @ Whoza.ai <dru@whoza.ai>",
      to: email,
      subject: "Welcome to whoza.ai — You're on the list",
      text: `
Hi there,

Thanks for signing up to whoza.ai!

You're on the list.

Here's what happens next:
1. Dru will personally email you within 48 hours
2. You'll get a call to discuss your setup
3. Katie goes live on your number in 30 minutes
4. 7 days free — no credit card needed${referral_code ? `

Referral bonus: You used a referral code. Your first paid month will be free after your trial.` : ""}

Got questions? Reply to this email or contact Dru at dru@whoza.ai.

— Dru & the whoza.ai team
      `.trim(),
    })

    // Run all sends concurrently; failures are isolated
    const [adminResults, userResult] = await Promise.all([
      Promise.allSettled(adminNotificationPromises),
      userConfirmationPromise,
    ])

    // Log any admin notification failures
    const adminFailures = adminResults.filter((r) => r.status === "rejected")
    if (adminFailures.length > 0) {
      console.error(
        "Admin notification failures:",
        adminFailures.map((f) => (f as PromiseRejectedResult).reason)
      )
    }

    // If user confirmation failed, we still return success (they're in the DB)
    // but log the error for follow-up
    if (!userResult || userResult.error) {
      console.error("User confirmation email failed:", userResult?.error)
    }

    return NextResponse.json({
      success: true,
      notified: ADMIN_EMAILS.length - adminFailures.length,
      total: ADMIN_EMAILS.length,
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
