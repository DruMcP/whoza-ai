import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * GET /api/enquiries
 *
 * Query params:
 *   - client_id (optional): filter by client
 *   - status (optional): filter by status
 *   - limit (optional): default 50, max 500
 *   - offset (optional): default 0
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const clientId = searchParams.get("client_id")
    const status = searchParams.get("status")
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 500)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    let query = supabase
      .from("enquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error("GET /api/enquiries error:", error)
      return NextResponse.json(
        { error: "Failed to fetch enquiries", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("GET /api/enquiries exception:", error)
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    )
  }
}

/**
 * POST /api/enquiries
 *
 * Body: enquiry object (matches enquiries table schema)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      call_id,
      client_id,
      caller_number,
      caller_name,
      transcript,
      duration_seconds,
      recording_url,
      job_type,
      postcode,
      urgency,
      status,
      qualification_data,
    } = body

    if (!call_id) {
      return NextResponse.json(
        { error: "call_id is required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        call_id,
        client_id: client_id || null,
        caller_number: caller_number || null,
        caller_name: caller_name || null,
        transcript: transcript || null,
        duration_seconds: duration_seconds || 0,
        recording_url: recording_url || null,
        job_type: job_type || null,
        postcode: postcode || null,
        urgency: urgency || null,
        status: status || "new",
        qualification_data: qualification_data || {},
      })
      .select()
      .single()

    if (error) {
      console.error("POST /api/enquiries error:", error)
      return NextResponse.json(
        { error: "Failed to create enquiry", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    }, { status: 201 })
  } catch (error) {
    console.error("POST /api/enquiries exception:", error)
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    )
  }
}
