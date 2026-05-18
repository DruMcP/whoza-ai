"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Loader2, CheckCircle2, Mail } from "lucide-react"

const STORAGE_KEY = "whoza_exit_intent"
const WAITLIST_KEY = "whoza_waitlist_submitted"
const COOLDOWN_DAYS = 7

function shouldShow(): boolean {
  if (typeof window === "undefined") return false

  // Don't show if already on waitlist
  const waitlisted = window.localStorage.getItem(WAITLIST_KEY)
  if (waitlisted === "true") return false

  // Check cooldown
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const data = JSON.parse(stored)
      if (data.dismissedAt) {
        const daysSince = (Date.now() - data.dismissedAt) / (1000 * 60 * 60 * 24)
        if (daysSince < COOLDOWN_DAYS) return false
      }
      if (data.submittedAt) {
        const daysSince = (Date.now() - data.submittedAt) / (1000 * 60 * 60 * 24)
        if (daysSince < COOLDOWN_DAYS) return false
      }
    } catch {
      // ignore
    }
  }

  return true
}

function markDismissed() {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedAt: Date.now() }))
}

function markSubmitted() {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ submittedAt: Date.now() }))
}

export function ExitIntentModal() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollDepth, setScrollDepth] = useState(0)

  // Desktop: mouseleave toward top of viewport
  useEffect(() => {
    if (!shouldShow()) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !visible && shouldShow()) {
        setVisible(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [visible])

  // Mobile: 60s + 70% scroll
  useEffect(() => {
    if (!shouldShow()) return
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    let timer: ReturnType<typeof setTimeout> | null = null
    let scrollListener: (() => void) | null = null

    const checkTrigger = () => {
      if (scrollDepth >= 0.7 && !visible && shouldShow()) {
        setVisible(true)
        if (timer) clearTimeout(timer)
        if (scrollListener) window.removeEventListener("scroll", scrollListener)
      }
    }

    timer = setTimeout(() => {
      scrollListener = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight > 0) {
          setScrollDepth(window.scrollY / docHeight)
        }
      }
      window.addEventListener("scroll", scrollListener)
      // Check immediately in case already scrolled
      scrollListener()
    }, 60000)

    return () => {
      if (timer) clearTimeout(timer)
      if (scrollListener) window.removeEventListener("scroll", scrollListener)
    }
  }, [visible, scrollDepth])

  const handleClose = useCallback(() => {
    setVisible(false)
    markDismissed()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    setIsSubmitting(true)
    // Store in localStorage (same key as calculator for unified lead tracking)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("whoza_calc_email", JSON.stringify({ email, timestamp: Date.now() }))
    }
    await new Promise((r) => setTimeout(r, 800))
    markSubmitted()
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-[420px] bg-[#1E2229] rounded-2xl p-8 shadow-2xl border border-white/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10 text-slate-400 min-h-[48px] min-w-[48px]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white font-sans">You&apos;re all set!</h2>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Check your inbox in the next few minutes for your free guide.
                </p>
                <p className="mt-4 text-slate-500 text-sm">
                  Want Katie answering your calls?{" "}
                  <a href="#final-cta" onClick={handleClose} className="text-emerald-400 hover:underline">
                    Start your free trial →
                  </a>
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Lead magnet header */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <h2
                    id="exit-intent-title"
                    className="text-xl font-bold text-white font-sans pr-8"
                  >
                    Get 3 ways to never miss a job again
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 font-sans">
                    A 2-minute read with tactics you can use today — even without Whoza.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="exit-email" className="block text-sm font-medium mb-1 text-gray-300">
                      Email address
                    </label>
                    <input
                      id="exit-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError("") }}
                      className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 focus:ring-[var(--katie-blue)] bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06]"
                      placeholder="e.g. john@smithplumbing.co.uk"
                      autoFocus
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10B981)",
                      height: 52,
                      borderRadius: 12,
                      fontSize: 15,
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send me the free guide
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    No spam. Unsubscribe anytime. We hate cold emails too.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
