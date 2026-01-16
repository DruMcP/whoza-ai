import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.10.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get('ALLOWED_ORIGIN') || "https://whoza.ai",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

// Helper function to send email via send-email Edge Function
async function sendSubscriptionEmail(supabaseUrl: string, supabaseAnonKey: string, userId: string, email: string, planName: string, amount: number) {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateName: 'subscription_confirmation',
        userId: userId,
        recipientEmail: email,
        variables: {
          plan_name: planName,
          amount: (amount / 100).toFixed(0), // Convert from cents to pounds
        },
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send subscription email:', error);
    } else {
      console.log('Subscription confirmation email sent to:', email);
    }
  } catch (error) {
    console.error('Error sending subscription email:', error);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    const supabaseClient = await import("npm:@supabase/supabase-js@2.39.0").then(
      (mod) => mod.createClient(supabaseUrl!, supabaseServiceKey!)
    );

    const { data: existingEvent } = await supabaseClient
      .from("stripe_webhook_events")
      .select("id")
      .eq("stripe_event_id", event.id)
      .maybeSingle();

    if (existingEvent) {
      console.log("Event already processed:", event.id);
      return new Response(
        JSON.stringify({ received: true, message: "Event already processed" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    await supabaseClient.from("stripe_webhook_events").insert({
      stripe_event_id: event.id,
      event_type: event.type,
      status: "pending",
      signature_verified: true,
      raw_payload: body,
      event_data: event.data.object,
    });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;

        if (userId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          await supabaseClient.from("stripe_subscriptions").upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            quantity: subscription.items.data[0].quantity,
            cancel_at_period_end: subscription.cancel_at_period_end,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
            items: subscription.items.data,
          });

          await supabaseClient.from("subscription_events").insert({
            user_id: userId,
            event_type: "subscription_created",
            subscription_id: subscription.id,
            metadata: { session_id: session.id },
          });

          // Send subscription confirmation email
          const { data: userData } = await supabaseClient
            .from("users")
            .select("email, business_name")
            .eq("id", userId)
            .maybeSingle();

          if (userData?.email && supabaseUrl && supabaseAnonKey) {
            // Get plan name from price
            const price = subscription.items.data[0].price;
            let planName = "Subscription";
            const amount = price.unit_amount || 0;
            
            // Map price to plan name based on amount
            if (amount === 1900) planName = "Monitor";
            else if (amount === 4900) planName = "Grow";
            else if (amount === 9900) planName = "Dominate";
            
            await sendSubscriptionEmail(
              supabaseUrl,
              supabaseAnonKey,
              userId,
              userData.email,
              planName,
              amount
            );
          }
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.user_id;

        if (userId) {
          await supabaseClient.from("stripe_subscriptions").upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            quantity: subscription.items.data[0].quantity,
            cancel_at_period_end: subscription.cancel_at_period_end,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
            items: subscription.items.data,
          });

          await supabaseClient.from("subscription_events").insert({
            user_id: userId,
            event_type:
              event.type === "customer.subscription.created"
                ? "subscription_created"
                : "subscription_updated",
            subscription_id: subscription.id,
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.user_id;

        if (userId) {
          await supabaseClient
            .from("stripe_subscriptions")
            .update({ status: "canceled" })
            .eq("stripe_subscription_id", subscription.id);

          await supabaseClient.from("subscription_events").insert({
            user_id: userId,
            event_type: "subscription_cancelled",
            subscription_id: subscription.id,
          });
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = invoice.subscription as string;

        if (subscription) {
          const { data: subData } = await supabaseClient
            .from("stripe_subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscription)
            .maybeSingle();

          if (subData?.user_id) {
            await supabaseClient.from("stripe_invoices").upsert({
              user_id: subData.user_id,
              stripe_invoice_id: invoice.id,
              stripe_subscription_id: subscription,
              amount_paid: invoice.amount_paid,
              amount_due: invoice.amount_due,
              currency: invoice.currency,
              status: invoice.status || "paid",
              invoice_pdf: invoice.invoice_pdf,
              hosted_invoice_url: invoice.hosted_invoice_url,
              created: new Date(invoice.created * 1000).toISOString(),
            });

            await supabaseClient.from("subscription_events").insert({
              user_id: subData.user_id,
              event_type: "payment_succeeded",
              subscription_id: subscription,
              metadata: {
                invoice_id: invoice.id,
                amount: invoice.amount_paid,
              },
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = invoice.subscription as string;

        if (subscription) {
          const { data: subData } = await supabaseClient
            .from("stripe_subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscription)
            .maybeSingle();

          if (subData?.user_id) {
            await supabaseClient.from("subscription_events").insert({
              user_id: subData.user_id,
              event_type: "payment_failed",
              subscription_id: subscription,
              metadata: {
                invoice_id: invoice.id,
                amount: invoice.amount_due,
              },
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    await supabaseClient
      .from("stripe_webhook_events")
      .update({ status: "completed", processed_at: new Date().toISOString() })
      .eq("stripe_event_id", event.id);

    return new Response(
      JSON.stringify({ received: true, event_type: event.type }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Webhook processing failed",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
