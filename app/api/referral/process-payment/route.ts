import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { evaluateCredit, getRollingWindow } from "@/lib/referral-service"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * POST /api/referral/process-payment
 * 
 * Called by payment webhooks (Stripe) when a referred customer pays.
 * Enforces: credit only on 2nd payment, 12-month rolling cap.
 * 
 * Body:
 *   - contractor_id: the paying contractor's UUID
 *   - payment_number: which payment this is (1st, 2nd, etc.)
 *   - trial_completed: boolean
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { contractor_id, payment_number, trial_completed = true } = body

    if (!contractor_id || typeof payment_number !== "number") {
      return NextResponse.json(
        { error: "contractor_id and payment_number are required" },
        { status: 400 }
      )
    }

    // Find the referral record for this contractor (if they were referred)
    const { data: referral, error: referralError } = await supabase
      .from("referrals")
      .select("id, referrer_contractor_id, status, reward_status, rewarded_at")
      .eq("referred_contractor_id", contractor_id)
      .single()

    if (referralError || !referral) {
      // Not a referred customer — nothing to do
      return NextResponse.json({
        success: true,
        creditApplied: false,
        reason: "No referral record found for this contractor",
      })
    }

    // If already rewarded, skip
    if (referral.reward_status === "issued") {
      return NextResponse.json({
        success: true,
        creditApplied: false,
        reason: "Credit already issued for this referral",
      })
    }

    // Get referrer's current plan value and rolling credit count
    const { data: referrer, error: referrerError } = await supabase
      .from("contractors")
      .select("id, referral_reward_months, current_plan_value")
      .eq("id", referral.referrer_contractor_id)
      .single()

    if (referrerError || !referrer) {
      return NextResponse.json(
        { error: "Referrer not found" },
        { status: 404 }
      )
    }

    // Count credits in rolling 12-month window
    const window = getRollingWindow()
    const { count: creditsInWindow, error: countError } = await supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("referrer_contractor_id", referral.referrer_contractor_id)
      .eq("reward_status", "issued")
      .gte("rewarded_at", window.start.toISOString())
      .lte("rewarded_at", window.end.toISOString())

    if (countError) {
      console.error("Rolling window count error:", countError)
    }

    // Evaluate credit
    const result = evaluateCredit(
      payment_number,
      trial_completed,
      creditsInWindow || 0,
      12, // cap
      referrer.current_plan_value || 0
    )

    if (result.creditApplied) {
      // Update referral record
      const { error: updateError } = await supabase
        .from("referrals")
        .update({
          status: "rewarded",
          reward_status: "issued",
          rewarded_at: new Date().toISOString(),
          paid_at: new Date().toISOString(),
        })
        .eq("id", referral.id)

      if (updateError) {
        console.error("Referral update error:", updateError)
        return NextResponse.json(
          { error: "Failed to update referral record" },
          { status: 500 }
        )
      }

      // Update referrer's reward count
      const { error: referrerUpdateError } = await supabase
        .from("contractors")
        .update({
          referral_reward_months: (referrer.referral_reward_months || 0) + 1,
        })
        .eq("id", referral.referrer_contractor_id)

      if (referrerUpdateError) {
        console.error("Referrer update error:", referrerUpdateError)
      }

      // Track analytics
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "https://whoza.ai"}/api/analytics/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "referral_reward_issued",
            referrer_id: referral.referrer_contractor_id,
            referred_id: contractor_id,
            months: 1,
          }),
        })
      } catch {
        // Analytics failure is non-blocking
      }
    } else {
      // Update payment tracking even if no credit applied
      const { error: updateError } = await supabase
        .from("referrals")
        .update({
          status: payment_number >= 1 ? "paid" : "signed_up",
          paid_at: new Date().toISOString(),
        })
        .eq("id", referral.id)

      if (updateError) {
        console.error("Referral status update error:", updateError)
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("POST /api/referral/process-payment error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
