import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Trillet Create Sub-account Edge Function
 * Called during voice onboarding to provision a Trillet sub-account and phone number
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

    const { user_id, business_name, trade_type } = await req.json();

    if (!user_id || !business_name) {
      return new Response(
        JSON.stringify({ error: "user_id and business_name required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Create sub-account in Trillet
    const trilletResponse = await fetch("https://api.trillet.ai/v1/subaccounts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${trilletApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: business_name,
        industry: trade_type || "trade",
        timezone: "Europe/London",
        webhook_url: `${Deno.env.get("SITE_URL") || "https://whoza-ai-staging.netlify.app"}/.netlify/functions/trillet-webhook`,
      }),
    });

    if (!trilletResponse.ok) {
      const error = await trilletResponse.text();
      throw new Error(`Trillet sub-account creation failed: ${error}`);
    }

    const trilletAccount = await trilletResponse.json();
    const subaccountId = trilletAccount.id;

    // 2. Provision UK phone number
    const numberResponse = await fetch("https://api.trillet.ai/v1/phone-numbers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${trilletApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subaccount_id: subaccountId,
        country: "GB",
        type: "local",
      }),
    });

    let phoneNumber = null;
    if (numberResponse.ok) {
      const numberData = await numberResponse.json();
      phoneNumber = numberData.phone_number;
    }

    // 3. Store in database
    await supabaseClient.from("voice_configs").update({
      trillet_subaccount_id: subaccountId,
      trillet_number: phoneNumber,
      status: "awaiting_divert",
      updated_at: new Date().toISOString(),
    }).eq("user_id", user_id);

    return new Response(
      JSON.stringify({
        success: true,
        subaccount_id: subaccountId,
        phone_number: phoneNumber,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("trillet-create-subaccount error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
