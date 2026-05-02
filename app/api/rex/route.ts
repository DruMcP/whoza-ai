import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { RexDecisionEngine } from "@/lib/rex/rexDecisionEngine"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { action, business_id, user_id } = await req.json()

    if (!business_id || !user_id) {
      return NextResponse.json({ error: "Missing business_id or user_id" }, { status: 400 })
    }

    const engine = new RexDecisionEngine()

    switch (action) {
      case "evaluate": {
        const evaluation = await engine.evaluateBusiness(business_id, user_id)
        return NextResponse.json({ success: true, evaluation })
      }

      case "recommend": {
        const recommendation = await engine.generateRecommendation(business_id, user_id)
        return NextResponse.json({ success: true, recommendation })
      }

      case "evaluate_and_recommend": {
        const evaluation = await engine.evaluateBusiness(business_id, user_id)
        const recommendation = await engine.generateRecommendation(business_id, user_id)
        return NextResponse.json({ success: true, evaluation, recommendation })
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Rex API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const business_id = searchParams.get("business_id")

    if (!business_id) {
      return NextResponse.json({ error: "Missing business_id" }, { status: 400 })
    }

    // Get latest evaluation
    const { data: evaluation } = await supabase
      .from("rex_ece_evaluations")
      .select("*")
      .eq("business_id", business_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    // Get active recommendations
    const { data: recommendations } = await supabase
      .from("rex_recommendations")
      .select("*")
      .eq("business_id", business_id)
      .in("status", ["draft", "in_progress", "approved"])
      .order("created_at", { ascending: false })

    return NextResponse.json({
      success: true,
      evaluation,
      recommendations: recommendations || [],
    })
  } catch (error) {
    console.error("Rex API GET error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    )
  }
}
