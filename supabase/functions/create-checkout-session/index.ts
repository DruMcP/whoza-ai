import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.10.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Read request body as text first, then parse manually
    // This provides better error handling and debugging
    let body;
    try {
      const bodyText = await req.text();
      console.log("Request body text:", bodyText);
      body = JSON.parse(bodyText);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request body",
          details: error.message 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { user_id, price_id, success_url, cancel_url } = body;

    if (!user_id || !price_id || !success_url || !cancel_url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const { data: existingCustomer } = await supabaseClient
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user_id)
      .maybeSingle();

    let customerId: string;

    if (existingCustomer) {
      customerId = existingCustomer.stripe_customer_id;
    } else {
      const { data: userData } = await supabaseClient.auth.admin.getUserById(
        user_id
      );

      const customer = await stripe.customers.create({
        email: userData?.user?.email,
        metadata: {
          user_id: user_id,
        },
      });

      customerId = customer.id;

      await supabaseClient.from("stripe_customers").insert({
        user_id: user_id,
        stripe_customer_id: customerId,
        email: userData?.user?.email,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: success_url,
      cancel_url: cancel_url,
      metadata: {
        user_id: user_id,
      },
      subscription_data: {
        metadata: {
          user_id: user_id,
        },
      },
    });

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create checkout session",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
