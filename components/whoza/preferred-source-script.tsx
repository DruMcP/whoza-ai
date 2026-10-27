"use client"

import { useEffect } from "react"
import { CONSENT_EVENT, getStoredConsent } from "./cookie-banner"

// Loads Google's Preferred Sources script (it renders the button and contacts
// Google) only on pages that show the button, and only once the visitor has
// allowed functional cookies.
export function PreferredSourceScript() {
  useEffect(() => {
    const load = () => {
      if (!getStoredConsent()?.functional || document.getElementById("google-preferred-source")) return
      const s = document.createElement("script")
      s.id = "google-preferred-source"
      s.async = true
      s.src = "https://news.google.com/swg/js/v1/publisher.js"
      document.head.appendChild(s)
    }
    load()
    window.addEventListener(CONSENT_EVENT, load)
    return () => window.removeEventListener(CONSENT_EVENT, load)
  }, [])
  return null
}
