/**
 * Whoza.ai GA4 Event Tracking
 * Safe wrapper around gtag() for conversion tracking
 */

export type GtagEvent =
  | "begin_checkout"
  | "contact"
  | "generate_lead"
  | "page_view"
  | "purchase"
  | "select_content"
  | "sign_up"
  | "submit_application"
  | "view_item"
  | "custom"

interface EventParams {
  event_category?: string
  event_label?: string
  value?: number
  currency?: string
  [key: string]: unknown
}

export function trackEvent(
  eventName: string,
  params?: EventParams
): void {
  if (typeof window === "undefined") return
  const gtag = (window as any).gtag
  if (!gtag) {
    // Queue for when gtag loads
    const dl = (window as any).dataLayer || []
    dl.push({ event: eventName, ...params })
    return
  }
  gtag("event", eventName, params)
}

// Convenience wrappers for common Whoza events
export const trackCTA = (label: string, location: string) =>
  trackEvent("cta_click", { event_category: "engagement", event_label: `${label} | ${location}` })

export const trackLead = (source: string) =>
  trackEvent("generate_lead", { event_category: "conversion", event_label: source })

export const trackTrialStart = (plan?: string) =>
  trackEvent("begin_checkout", { event_category: "conversion", event_label: plan || "starter" })

export const trackPricingView = (plan: string) =>
  trackEvent("view_item", { event_category: "pricing", event_label: plan })

export const trackCalculatorUse = () =>
  trackEvent("select_content", { event_category: "calculator", event_label: "lost_revenue_calculator" })

export const trackCalculatorLead = (email: string) =>
  trackEvent("generate_lead", { event_category: "calculator", event_label: "email_capture", value: 1 })

// Referral programme tracking
export const trackReferralShare = (method: string, location: string) =>
  trackEvent("referral_share", { event_category: "referral", event_label: `${method} | ${location}` })

export const trackReferralSignup = (code: string) =>
  trackEvent("referral_signup", { event_category: "referral", event_label: code })

export const trackReferralReward = (referrerId: string, months: number) =>
  trackEvent("referral_reward_issued", { event_category: "referral", event_label: referrerId, value: months })
