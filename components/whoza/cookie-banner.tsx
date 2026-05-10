"use client"

import { useState, useEffect } from "react"
import { X, Cookie, Check } from "lucide-react"

type ConsentType = "all" | "essential" | "custom"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  functional: boolean
  timestamp: number
}

const STORAGE_KEY = "whoza_cookie_consent"
const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000 // 12 months

function getStoredConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookiePreferences
    // Check expiry
    if (Date.now() - parsed.timestamp > CONSENT_EXPIRY_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function setStoredConsent(preferences: Omit<CookiePreferences, "timestamp">) {
  const payload: CookiePreferences = {
    ...preferences,
    timestamp: Date.now(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [functional, setFunctional] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      setVisible(true)
    } else {
      setAnalytics(stored.analytics)
      setFunctional(stored.functional)
    }
  }, [])

  useEffect(() => {
    const handleOpenCookieConsent = () => {
      setShowModal(true)
    }
    window.addEventListener('openCookieConsent', handleOpenCookieConsent)
    return () => {
      window.removeEventListener('openCookieConsent', handleOpenCookieConsent)
    }
  }, [])

  const acceptAll = () => {
    setStoredConsent({ essential: true, analytics: true, functional: true })
    setAnalytics(true)
    setFunctional(true)
    // Add .dismissed class for prompt compatibility
    const banner = document.querySelector('.cookie-banner')
    if (banner) banner.classList.add('dismissed')
    setTimeout(() => setVisible(false), 300)
  }

  const acceptEssential = () => {
    setStoredConsent({ essential: true, analytics: false, functional: false })
    setAnalytics(false)
    setFunctional(false)
    // Add .dismissed class for prompt compatibility
    const banner = document.querySelector('.cookie-banner')
    if (banner) banner.classList.add('dismissed')
    setTimeout(() => setVisible(false), 300)
  }

  const saveCustom = () => {
    setStoredConsent({ essential: true, analytics, functional })
    // Add .dismissed class for prompt compatibility
    const banner = document.querySelector('.cookie-banner')
    if (banner) banner.classList.add('dismissed')
    setTimeout(() => {
      setVisible(false)
      setShowModal(false)
    }, 300)
  }

  if (!visible && !showModal) return null

  return (
    <>
      {/* Banner */}
      {visible && (
        <div className="cookie-banner fixed bottom-0 left-0 right-0 z-[100] bg-[var(--navy-900)] border-t border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white/80 leading-relaxed">
                  We use cookies to make Whoza work properly and to improve your experience.
                  Essential cookies are always on. Analytics cookies help us improve the site.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors min-h-[44px]"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptEssential}
                  className="cookie-dismiss px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors min-h-[44px]"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-white/60 hover:text-white text-sm transition-colors min-h-[44px]"
                >
                  Manage Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--navy-800)] border border-white/10 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Cookie className="w-5 h-5 text-emerald-400" />
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close cookie preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Essential */}
              <div className="flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white">Essential (required)</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Cannot be disabled. Needed for the site to work: login, security, session management.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`mt-1 shrink-0 w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    analytics ? "bg-emerald-500 justify-end" : "bg-white/20 justify-start"
                  }`}
                  aria-label={`Toggle analytics cookies ${analytics ? "off" : "on"}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
                <div>
                  <h4 className="font-medium text-white">Analytics</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Helps us improve our website. We use privacy-focused analytics to understand how tradespeople use Whoza. We do not use Google Analytics or any ad-tracking cookies.
                  </p>
                </div>
              </div>

              {/* Functional */}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setFunctional(!functional)}
                  className={`mt-1 shrink-0 w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    functional ? "bg-emerald-500 justify-end" : "bg-white/20 justify-start"
                  }`}
                  aria-label={`Toggle functional cookies ${functional ? "off" : "on"}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
                <div>
                  <h4 className="font-medium text-white">Functional</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Remembers your preferences. Saves your choices so you don&apos;t have to set them again.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end">
              <button
                onClick={saveCustom}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hook for other components to check consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())
  }, [])

  return {
    consent,
    hasAnalytics: consent?.analytics ?? false,
    hasFunctional: consent?.functional ?? false,
    hasEssential: true,
  }
}
