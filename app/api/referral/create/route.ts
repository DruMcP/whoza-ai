import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * POST /api/referral/create
 * 
 * Body:
 *   - code: referral code
 *   - email: referred person's email
 *   - source: optional (e.g. "refer-page", "pricing-strip")
 *   - utm_*: optional UTM params
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, email, source, utm_campaign, utm_source, utm_medium } = body

    if (!code || !email) {
      return NextResponse.json(
        { error: "Referral code and email are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const normalizedCode = code.toUpperCase().trim()
    const normalizedEmail = email.toLowerCase().trim()

    // Look up referrer
    const { data: referrer, error: referrerError } = await supabase
      .from("contractors")
      .select("id, referral_code")
      .eq("referral_code", normalizedCode)
      .single()

    if (referrerError || !referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      )
    }

    // Check if this email was already referred by this referrer
    const { data: existing } = await supabase
      .from("referrals")
      .select("id, status")
      .eq("referrer_contractor_id", referrer.id)
      .eq("referred_email", normalizedEmail)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        referral_id: existing.id,
        status: existing.status,
        message: "This email has already been referred",
      })
    }

    // Create referral record
    const { data: referral, error: insertError } = await supabase
      .from("referrals")
      .insert({
        referrer_contractor_id: referrer.id,
        referred_email: normalizedEmail,
        status: "pending",
        reward_status: "pending",
        reward_months: 1,
        source: source || "refer-page",
        utm_campaign: utm_campaign || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error("Referral insert error:", insertError)
      return NextResponse.json(
        { error: "Failed to create referral" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      referral_id: referral.id,
      status: referral.status,
      message: "Referral recorded successfully",
    }, { status: 201 })
  } catch (error) {
    console.error("POST /api/referral/create error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
