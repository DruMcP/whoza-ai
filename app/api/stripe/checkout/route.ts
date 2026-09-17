import { NextResponse } from "next/server"
import Stripe from "stripe"
import { STRIPE_PRODUCTS, CURRENCY } from "@/lib/stripe-config"
import { rateLimit, sameOriginUrl } from "@/lib/api-guard"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured")
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" })
}

export async function POST(req: Request) {
  const limited = rateLimit(req, "stripe-checkout", 10, 10 * 60 * 1000)
  if (limited) return limited

  try {
    const stripe = getStripe()
    const { planId, successUrl, cancelUrl } = await req.json()

    const plan = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS]
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: `${plan.name} Plan`,
              description: plan.description,
            },
            unit_amount: plan.monthlyPrice,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: sameOriginUrl(req, successUrl, `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`),
      cancel_url: sameOriginUrl(req, cancelUrl, `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`),
      automatic_tax: { enabled: true },
      customer_creation: "always",
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe checkout error:", err)
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 })
  }
}
