"use client"

import { useState } from "react"

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false)

  const checkout = async (planId: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Checkout failed")
      }
    } catch (err: any) {
      alert(err.message || "Payment setup error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return { checkout, loading }
}
