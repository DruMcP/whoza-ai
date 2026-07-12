"use client"

import { useEffect } from "react"

interface WaitlistModalProps {
  onClose?: () => void
  source?: string
  plan?: string
}

// Whoza is LIVE. Every "Get Started" CTA across the site opens this shared modal, so instead
// of collecting a waitlist entry it now sends the visitor straight to the app's pay-first
// signup (app.whoza.ai/signup). Kept as the shared open-point so all existing CTAs keep
// working unchanged — it simply redirects on open and renders nothing.
const SIGNUP_URL = "https://app.whoza.ai/signup"

export function WaitlistModal({ source = "homepage", plan }: WaitlistModalProps) {
  useEffect(() => {
    const params = new URLSearchParams({ utm_source: "whoza.ai" })
    if (source) params.set("utm_content", source)
    if (plan) params.set("plan", plan)
    window.location.href = `${SIGNUP_URL}?${params.toString()}`
  }, [source, plan])

  return null
}
