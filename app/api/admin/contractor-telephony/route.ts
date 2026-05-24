import { NextRequest, NextResponse } from "next/server";
import { telephonyRouter } from "@/lib/telephony-router";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Admin: Contractor Telephony Management
 * Route: /api/admin/contractor-telephony
 * 
 * GET  /api/admin/contractor-telephony?contractor_id=xxx  → Get telephony config
 * POST /api/admin/contractor-telephony                  → Provision new Retell+Twilio
 * PATCH /api/admin/contractor-telephony                 → Update config
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const contractorId = searchParams.get("contractor_id");

    if (!contractorId) {
      return NextResponse.json({ error: "contractor_id required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("contractor_telephony")
      .select("*")
      .eq("contractor_id", contractorId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    // Remove sensitive fields
    const safe = { ...data };
    delete safe.twilio_subaccount_auth_token;
    delete safe.retell_api_key_encrypted;
    delete safe.elevenlabs_api_key_encrypted;

    return NextResponse.json({ telephony: safe });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractor_id, business_name, area_code, voice_clone_samples } = body;

    if (!contractor_id || !business_name) {
      return NextResponse.json(
        { error: "contractor_id and business_name required" },
        { status: 400 }
      );
    }

    const result = await telephonyRouter.provisionContractor(contractor_id, {
      businessName: business_name,
      areaCode: area_code,
      voiceCloneSamples: voice_clone_samples,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      phone_number: result.phoneNumber,
      agent_id: result.agentId,
    });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractor_id, updates } = body;

    if (!contractor_id || !updates) {
      return NextResponse.json(
        { error: "contractor_id and updates required" },
        { status: 400 }
      );
    }

    // Prevent updating sensitive fields directly via API
    const safeUpdates = { ...updates };
    delete safeUpdates.twilio_subaccount_auth_token;
    delete safeUpdates.retell_api_key_encrypted;
    delete safeUpdates.elevenlabs_api_key_encrypted;

    const { data, error } = await supabase
      .from("contractor_telephony")
      .update(safeUpdates)
      .eq("contractor_id", contractor_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, telephony: data });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
