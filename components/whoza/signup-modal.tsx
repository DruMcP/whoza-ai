"use client"

import { useEffect } from "react"

interface SignupModalProps {
  onClose?: () => void
  source?: string
}

// Whoza is LIVE: the on-site signup is retired in favour of the app's pay-first flow.
// Any CTA that opened this modal now redirects to app.whoza.ai/signup.
const SIGNUP_URL = "https://app.whoza.ai/signup"

export function SignupModal({ source = "homepage" }: SignupModalProps) {
  useEffect(() => {
    window.location.href = `${SIGNUP_URL}?utm_source=whoza.ai&utm_content=${encodeURIComponent(source)}`
  }, [source])

  return null
}
