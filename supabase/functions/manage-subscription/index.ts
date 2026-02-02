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

    const { subscription_id, action, new_price_id } = await req.json();

    if (!subscription_id || !action) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseAnonKey!, {
        global: {
          headers: { Authorization: authHeader },
        },
      })
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: subscriptionData } = await supabaseClient
      .from("stripe_subscriptions")
      .select("user_id, stripe_subscription_id")
      .eq("stripe_subscription_id", subscription_id)
      .maybeSingle();

    if (!subscriptionData || subscriptionData.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: "Subscription not found or unauthorized" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let updatedSubscription: Stripe.Subscription;

    switch (action) {
      case "cancel": {
        updatedSubscription = await stripe.subscriptions.update(subscription_id, {
          cancel_at_period_end: true,
        });

        await supabaseClient
          .from("stripe_subscriptions")
          .update({
            cancel_at_period_end: true,
          })
          .eq("stripe_subscription_id", subscription_id);

        await supabaseClient.from("subscription_events").insert({
          user_id: user.id,
          event_type: "subscription_cancelled",
          subscription_id: subscription_id,
          metadata: { action: "cancel_at_period_end" },
        });

        break;
      }

      case "resume": {
        updatedSubscription = await stripe.subscriptions.update(subscription_id, {
          cancel_at_period_end: false,
        });

        await supabaseClient
          .from("stripe_subscriptions")
          .update({
            cancel_at_period_end: false,
          })
          .eq("stripe_subscription_id", subscription_id);

        await supabaseClient.from("subscription_events").insert({
          user_id: user.id,
          event_type: "subscription_resumed",
          subscription_id: subscription_id,
        });

        break;
      }

      case "update": {
        if (!new_price_id) {
          return new Response(
            JSON.stringify({ error: "new_price_id required for update action" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const subscription = await stripe.subscriptions.retrieve(subscription_id);
        const subscriptionItemId = subscription.items.data[0].id;

        updatedSubscription = await stripe.subscriptions.update(subscription_id, {
          items: [
            {
              id: subscriptionItemId,
              price: new_price_id,
            },
          ],
          proration_behavior: "always_invoice",
        });

        await supabaseClient
          .from("stripe_subscriptions")
          .update({
            price_id: new_price_id,
            items: updatedSubscription.items.data,
          })
          .eq("stripe_subscription_id", subscription_id);

        await supabaseClient.from("subscription_events").insert({
          user_id: user.id,
          event_type: "subscription_updated",
          subscription_id: subscription_id,
          metadata: { new_price_id, action: "plan_change" },
        });

        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: `Invalid action: ${action}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription: {
          id: updatedSubscription!.id,
          status: updatedSubscription!.status,
          cancel_at_period_end: updatedSubscription!.cancel_at_period_end,
          current_period_end: updatedSubscription!.current_period_end,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Subscription management error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to manage subscription",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
