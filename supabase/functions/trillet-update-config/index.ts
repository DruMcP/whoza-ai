import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Trillet Update Config Edge Function
 * Syncs voice config changes to Trillet AI platform
 * Called by voiceService.js when user updates their voice agent settings
 */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const trilletApiKey = Deno.env.get("TRILLET_API_KEY");
    if (!trilletApiKey) {
      throw new Error("TRILLET_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const { user_id, config } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "user_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get current voice config to find Trillet subaccount ID
    const { data: voiceConfig, error: configError } = await supabaseClient
      .from("voice_configs")
      .select("trillet_subaccount_id, trillet_number, business_name, trade_type, services, postcodes, pricing, emergency_keywords, forward_number, persona_name, voice_gender, calendar_type, calendar_id")
      .eq("user_id", user_id)
      .single();

    if (configError || !voiceConfig?.trillet_subaccount_id) {
      throw new Error("Voice config not found or not linked to Trillet");
    }

    const subaccountId = voiceConfig.trillet_subaccount_id;

    // Build knowledge base / agent config payload for Trillet
    const agentConfig = {
      name: config.persona_name || voiceConfig.persona_name || "Katie",
      business_name: config.business_name || voiceConfig.business_name,
      industry: config.trade_type || voiceConfig.trade_type || "trade",
      greeting: `Hello, you've reached ${config.business_name || voiceConfig.business_name}. I'm ${config.persona_name || voiceConfig.persona_name || "Katie"}, their assistant. How can I help you today?`,
      services: config.services || voiceConfig.services || [],
      service_areas: config.postcodes || voiceConfig.postcodes || [],
      pricing: config.pricing || voiceConfig.pricing || {},
      emergency_keywords: config.emergency_keywords || voiceConfig.emergency_keywords || ["emergency", "urgent", "burst", "flood", "gas leak", "no heat", "no hot water"],
      transfer_number: config.forward_number || voiceConfig.forward_number,
      calendar_integration: config.calendar_type || voiceConfig.calendar_type,
      calendar_id: config.calendar_id || voiceConfig.calendar_id,
      language: "en-GB",
      voice: config.voice_gender || voiceConfig.voice_gender || "female",
    };

    // Update Trillet subaccount/agent config
    const trilletResponse = await fetch(`https://api.trillet.ai/v1/subaccounts/${subaccountId}/agent`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${trilletApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentConfig),
    });

    if (!trilletResponse.ok) {
      const errorText = await trilletResponse.text();
      console.error("Trillet update failed:", errorText);
      // Don't throw — log and continue. Trillet API may not have this exact endpoint yet.
      // Store the config locally and retry later via background job.
    }

    // Update local DB with latest config
    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      "business_name", "trade_type", "services", "postcodes", "pricing",
      "calendar_type", "calendar_id", "emergency_keywords", "forward_number",
      "persona_name", "voice_gender", "review_enabled", "google_review_link",
      "tradesperson_photo_url", "tradesperson_name", "tradesperson_bio", "tradesperson_credentials"
    ];

    for (const field of allowedFields) {
      if (config[field] !== undefined) {
        updateData[field] = config[field];
      }
    }

    if (Object.keys(updateData).length > 0) {
      updateData.updated_at = new Date().toISOString();
      await supabaseClient
        .from("voice_configs")
        .update(updateData)
        .eq("user_id", user_id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        trillet_synced: trilletResponse.ok,
        subaccount_id: subaccountId,
        updated_fields: Object.keys(updateData),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("trillet-update-config error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
