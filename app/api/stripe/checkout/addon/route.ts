import { NextResponse } from "next/server"
import Stripe from "stripe"
import { STRIPE_ADDONS, CURRENCY } from "@/lib/stripe-config"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(req: Request) {
  try {
    const { addonId, quantity = 1, successUrl, cancelUrl } = await req.json()

    const addon = STRIPE_ADDONS[addonId as keyof typeof STRIPE_ADDONS]
    if (!addon) {
      return NextResponse.json({ error: "Invalid addon" }, { status: 400 })
    }

    const unitAmount = "price" in addon ? addon.price : addon.pricePerHour
    const isHourly = "pricePerHour" in addon

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: addon.name,
              description: isHourly
                ? `${addon.description} — ${quantity} hour${quantity > 1 ? "s" : ""}`
                : addon.description,
            },
            unit_amount: unitAmount,
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?addon_success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?addon_canceled=true`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe addon checkout error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
