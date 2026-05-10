"use client"

import { useState, useCallback } from "react"
import { Play, ArrowRight, Loader2, Sprout, ShieldCheck, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroPhoneMockup } from "./hero-phone-mockup"
import { SignupModal } from "./signup-modal"
import { KatieAudioPlayer } from "./katie-audio-player"

// Trade categories showing domain understanding without claiming customers
const tradePills = [
  "Plumbers",
  "Electricians", 
  "Heating Engineers",
  "Roofers",
  "Builders",
  "Landscapers",
  "Locksmiths",
  "Painters",
]

// Trust items — all verifiable, zero fabrication
const trustItems = [
  "7-day free trial — no card required",
  "30-day money-back guarantee",
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
    <section 
      className="relative min-h-screen overflow-hidden" 
      style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}
      aria-label="Introduction"
    >
      {/* Skip link target */}
      <div id="main-content" />

      {/* Pilot Badge — top right, subtle but visible */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute top-20 right-4 sm:right-8 z-20"
      >
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{ 
            background: "rgba(16, 185, 129, 0.15)", 
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#10B981",
            backdropFilter: "blur(8px)",
          }}
        >
          <Sprout className="w-4 h-4" aria-hidden="true" />
          <span>UK Pilot Programme — Limited to 50 tradespeople</span>
        </div>
      </motion.div>

      {/* Subtle atmospheric glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "rgba(16,185,129,0.08)", filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "rgba(16,185,129,0.05)", filter: "blur(100px)" }}
        />
      </div>

      {/* Grid pattern — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* LEFT — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            {/* Headline — LCP candidate */}
            <h1
              className="font-bold tracking-tight text-balance"
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Your phone&apos;s ringing.
              <br />
              <span style={{ color: "#10B981" }}>Katie&apos;s got it.</span>
            </h1>

            {/* Secondary headline */}
            <p
              className="mt-3"
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.4,
                color: "#10B981",
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              While you work, we book.
            </p>

            {/* Subhead */}
            <p
              className="mt-4"
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#94A3B8",
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              The AI call handler built for UK trades. Answers every missed call, qualifies real jobs, and sends them straight to your WhatsApp — so you accept, call back, or decline in two taps.
            </p>

            {/* Outcome punchline */}
            <p
              className="mt-2"
              style={{
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#6B7280",
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
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
                className="cta-primary inline-flex items-center justify-center gap-3 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 w-full sm:w-auto group"
                style={{
                  background: "#FFFFFF",
                  color: "#1A1A2E",
                  fontSize: 17,
                  minHeight: 56,
                  borderRadius: 12,
                  padding: "16px 32px",
                  fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
                  boxShadow: "0 4px 14px rgba(255,255,255,0.15)",
                }}
                aria-label="Try Katie Free for 7 Days"
              >
                {ctaLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up Katie…
                  </>
                ) : (
                  <>
                    Try Katie Free for 7 Days
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Secondary CTA — demo */}
              <button
                onClick={scrollToVideo}
                className="inline-flex items-center gap-2 transition-colors hover:underline text-left"
                style={{
                  fontSize: 15,
                  color: "#94A3B8",
                  fontWeight: 500,
                  fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
                  minHeight: 48,
                }}
                aria-label="See Katie handle a call — 60 second demo, no signup required"
              >
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                See Katie handle a call (60 sec — no signup)
              </button>
            </div>

            {/* Trust Pills — as accessible list */}
            <ul 
              className="mt-6 flex flex-wrap gap-2" 
              aria-label="Key benefits"
            >
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    background: "rgba(255,255,255,0.08)",
                    color: "#94A3B8",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#10B981" }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Trade Category Pills — domain understanding, no customer claims */}
            <div className="mt-6">
              <p className="text-xs mb-2" style={{ color: "#475569" }}>
                Built for:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tradePills.map((trade) => (
                  <span
                    key={trade}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                    style={{
                      background: "rgba(15, 44, 117, 0.5)",
                      color: "#94A3B8",
                      border: "1px solid rgba(15, 44, 117, 0.8)",
                    }}
                  >
                    {trade}
                  </span>
                ))}
              </div>
            </div>

            {/* Founder Bar — radical transparency */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 flex items-center gap-3 p-3 rounded-xl"
              style={{ 
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: "#1A1A2E", border: "2px solid #10B981" }}
              >
                <User className="w-5 h-5" style={{ color: "#10B981" }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#E2E8F0" }}>
                  Built by Dru McPherson
                </p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  Founder, whoza.ai ·{" "}
                  <a 
                    href="mailto:dru@whoz.ai" 
                    className="underline hover:text-[#10B981] transition-colors"
                    style={{ color: "#94A3B8" }}
                  >
                    dru@whoz.ai
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Real Pilot Review — no fabrication */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-4 p-4 rounded-xl"
              style={{ 
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285F4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm italic leading-relaxed" style={{ color: "#CBD5E1" }}>
                    &ldquo;By far the simplest and the cheapest. I&apos;m already seeing results.&rdquo;
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
                    — Ludmila Lamont, Early User{" "}
                    <a 
                      href="https://g.page/r/CaV8r9vL8v9vEAI/review" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-[#10B981] transition-colors"
                      style={{ color: "#94A3B8" }}
                    >
                      View on Google →
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Phone Mockup */}
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

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--off-white)] to-transparent" aria-hidden="true" />

      {/* Modals */}
      <AnimatePresence>
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
        {showAudio && <KatieAudioPlayer isOpen={showAudio} onClose={() => setShowAudio(false)} />}
      </AnimatePresence>
    </section>
  )
}
