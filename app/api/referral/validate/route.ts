import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * GET /api/referral/validate?code=ABC123
 * 
 * Validates a referral code and returns referrer info
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")?.toUpperCase().trim()

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      )
    }

    // Validate code format (8 chars, alphanumeric, no confusing chars)
    if (!/^[A-Z2-9]{8}$/.test(code)) {
      return NextResponse.json(
        { error: "Invalid referral code format" },
        { status: 400 }
      )
    }

    // Look up contractor by referral code
    const { data: contractor, error } = await supabase
      .from("contractors")
      .select("id, business_name, trade, referral_code, referral_count")
      .eq("referral_code", code)
      .single()

    if (error || !contractor) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      referrer: {
        id: contractor.id,
        business_name: contractor.business_name,
        trade: contractor.trade,
        referral_code: contractor.referral_code,
        referral_count: contractor.referral_count,
      },
    })
  } catch (error) {
    console.error("GET /api/referral/validate error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
