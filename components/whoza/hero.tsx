"use client"

import { useState, useCallback } from "react"
import { Play, ArrowRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroPhoneMockup } from "./hero-phone-mockup"
import { SignupModal } from "./signup-modal"
import { KatieAudioPlayer } from "./katie-audio-player"
import { SocialProofBar } from "./social-proof-bar"
import { MissedCallCounter } from "./missed-call-counter"

// Reordered by psychological impact (highest conversion trigger first)
const trustItems = [
  "7-day free trial — no card required",
  "Live in 30 minutes",
  "Works with your existing number",
  "Cancel anytime",
]

export function Hero() {
  const [showSignup, setShowSignup] = useState(false)
  const [showAudio, setShowAudio] = useState(false)
  const [ctaLoading, setCtaLoading] = useState(false)

  const handlePrimaryCTA = useCallback(() => {
    setCtaLoading(true)
    setTimeout(() => {
      setCtaLoading(false)
      setShowSignup(true)
    }, 800)
  }, [])

  const scrollToVideo = useCallback(() => {
    const videoSection = document.getElementById("video-explainer")
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 lg:pt-20" style={{ background: "#1A1D23" }}>
      {/* Announcement Bar */}
      <div className="w-full flex items-center justify-center" style={{ background: "#111418", height: 40 }}>
        <p className="text-sm font-medium" style={{ color: "#D1D5DB", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
          Built for UK trades · <span style={{ color: "#10B981" }}>Starter from £59/month</span> · Try Katie free for 7 days
        </p>
      </div>

      {/* Subtle Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "rgba(16,185,129,0.12)", filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "rgba(16,185,129,0.08)", filter: "blur(100px)" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Headline */}
            <h1
              className="font-bold tracking-tight text-balance"
              style={{
                fontSize: "clamp(48px, 5vw, 72px)",
                lineHeight: 1.1,
                color: "#FFFFFF",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Your phone&apos;s ringing.
              <br />
              <span style={{ color: "#10B981" }}>Katie&apos;s got it.</span>
            </h1>

            {/* Secondary headline — bridges emotion to outcome */}
            <p
              className="mt-3 max-w-[560px]"
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.4,
                color: "#10B981",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              While you work, we book.
            </p>

            {/* Subhead — 9.5 refinement */}
            <p
              className="mt-4 max-w-[560px]"
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#D1D5DB",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              The AI call handler built for UK trades. Answers every missed call, qualifies real jobs, and sends them straight to your WhatsApp — so you accept, call back, or decline in two taps.
            </p>

            {/* Outcome punchline */}
            <p
              className="mt-2 max-w-[560px]"
              style={{
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#6B7280",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              No apps. No dashboards. Just more work.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4">
              {/* Primary CTA */}
              <button
                onClick={handlePrimaryCTA}
                disabled={ctaLoading}
                className="inline-flex items-center justify-center gap-3 font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 w-full sm:w-auto sm:min-w-[280px] group"
                style={{
                  background: "linear-gradient(135deg, #059669, #10B981)",
                  fontSize: 18,
                  height: "clamp(52px, 6vh, 56px)",
                  borderRadius: 12,
                  boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  minHeight: 48,
                }}
                aria-label="Try Katie Free — Start Catching Calls"
              >
                {ctaLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up Katie…
                  </>
                ) : (
                  <>
                    Try Katie Free — Start Catching Calls
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Micro-copy */}
              <p
                className="text-center sm:text-left"
                style={{ fontSize: 13, color: "#6B7280", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                7-day free trial · No card required · Works with your existing number
              </p>

              {/* Secondary CTA — links to video explainer */}
              <button
                onClick={scrollToVideo}
                className="inline-flex items-center gap-2 transition-colors hover:underline text-left"
                style={{
                  fontSize: 15,
                  color: "#10B981",
                  fontWeight: 500,
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  minHeight: 48,
                }}
                aria-label="See how it works"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                See how it works →
              </button>
            </div>

            {/* Trust Pills — reordered by psychological impact */}
            <div className="mt-8 flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full"
                  style={{ background: "#F1F5F9" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#475569", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient to off-white sections below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--off-white)] to-transparent" />

      {/* Modals */}
      <AnimatePresence>
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
        {showAudio && <KatieAudioPlayer isOpen={showAudio} onClose={() => setShowAudio(false)} />}
      </AnimatePresence>
    </section>
  )
}

// Export these for use in page.tsx
export { SocialProofBar, MissedCallCounter }
