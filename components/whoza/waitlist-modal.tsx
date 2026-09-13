"use client"

import { useEffect, useRef } from "react"
import { APP_SIGNUP_URL } from "@/lib/signup"

interface WaitlistModalProps {
  onClose: () => void
  source?: string
  plan?: string
}

/**
 * Opens the app's signup page.
 *
 * This used to be the "Start Your Free Trial" waitlist card. Signup is open now, so the card is
 * gone and every button that opened it goes straight to app.whoza.ai/signup instead. It keeps the
 * same name and props so the eighteen places that open it, and the header's `openWaitlist` event
 * that other pages fire, all move over at once with nothing missed.
 */
export function WaitlistModal({ onClose }: WaitlistModalProps) {
  // Call sites pass onClose as an inline arrow; hold it so the effect runs once per opening.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    // Reset the opener before leaving. If the visitor comes Back and the browser restores this
    // page from its cache, the button must be able to open signup again, which it could not if
    // its "open" flag were still set.
    onCloseRef.current()
    window.location.assign(APP_SIGNUP_URL)
  }, [])

  return null
}
