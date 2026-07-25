import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * GET /api/referral/stats?contractor_id=uuid
 * 
 * Returns referral statistics for a contractor
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const contractorId = searchParams.get("contractor_id")

    if (!contractorId) {
      return NextResponse.json(
        { error: "contractor_id is required" },
        { status: 400 }
      )
    }

    // Get contractor info
    const { data: contractor, error: contractorError } = await supabase
      .from("contractors")
      .select("id, business_name, referral_code, referral_count, referral_reward_months")
      .eq("id", contractorId)
      .single()

    if (contractorError || !contractor) {
      return NextResponse.json(
        { error: "Contractor not found" },
        { status: 404 }
      )
    }

    // Get referral breakdown
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select("status, reward_status")
      .eq("referrer_contractor_id", contractorId)

    if (referralsError) {
      console.error("Referral stats error:", referralsError)
      return NextResponse.json(
        { error: "Failed to fetch referral stats" },
        { status: 500 }
      )
    }

    const stats = {
      total: referrals?.length || 0,
      pending: referrals?.filter(r => r.status === "pending").length || 0,
      signed_up: referrals?.filter(r => r.status === "signed_up").length || 0,
      paid: referrals?.filter(r => r.status === "paid").length || 0,
      rewarded: referrals?.filter(r => r.status === "rewarded").length || 0,
      reward_months_earned: contractor.referral_reward_months,
    }

    return NextResponse.json({
      success: true,
      contractor: {
        id: contractor.id,
        business_name: contractor.business_name,
        referral_code: contractor.referral_code,
      },
      stats,
    })
  } catch (error) {
    console.error("GET /api/referral/stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
