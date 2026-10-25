"use client"

import { useEffect } from "react"
import { CONSENT_EVENT, getStoredConsent } from "./cookie-banner"

// Google Analytics 4 + Google Tag Manager, loaded only after the visitor allows
// analytics cookies (UK PECR). Until then nothing is requested from Google: the
// gtag() stub in app/layout.tsx just queues calls in window.dataLayer, and the
// queue is sent once the scripts load.
const GA_ID = "G-VCQND9WPW9"
const GTM_ID = "GTM-WBCCZVB4"

function addScript(src: string) {
  const s = document.createElement("script")
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadAnalytics() {
  const w = window as any
  if (w.__whozaAnalyticsLoaded) return
  w.__whozaAnalyticsLoaded = true
  w.gtag("consent", "update", { analytics_storage: "granted" })
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
  addScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  w.gtag("js", new Date())
  w.gtag("config", GA_ID)
}

export function Analytics() {
  useEffect(() => {
    const check = () => {
      const w = window as any
      if (getStoredConsent()?.analytics) loadAnalytics()
      // Consent withdrawn after the scripts loaded: GA stops setting cookies.
      else if (w.__whozaAnalyticsLoaded) w.gtag("consent", "update", { analytics_storage: "denied" })
    }
    check()
    window.addEventListener(CONSENT_EVENT, check)
    return () => window.removeEventListener(CONSENT_EVENT, check)
  }, [])
  return null
}
