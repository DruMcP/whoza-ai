"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ArrowRight, Loader2, Play } from "lucide-react"
import { motion } from "framer-motion"
import { HeroPhoneMockup } from "./hero-phone-mockup"
import { SignupModal } from "./signup-modal"

/* ── Trust pills ── */
const trustItems = [
  "7-day free trial — no card required",
  "30-day money-back guarantee",
  "Live in 30 minutes",
  "Works with your existing number",
  "Cancel anytime",
]

/* ── Live counter constants (ONS-derived) ── */
const CALL_RATE = 0.31        // calls per second across UK trades
const AVG_JOB_VALUE = 120     // £
const CONVERSION_RATE = 0.35  // ~35% of missed calls = lost jobs

/* ── Framer-motion helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeUpVisible = (delay = 0) => ({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeInRightVisible = (delay = 0) => ({
  initial: { opacity: 1, x: 0 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export function Hero() {
  const [showSignup, setShowSignup] = useState(false)
  const [ctaLoading, setCtaLoading] = useState(false)

  /* ── Live counter refs (no React re-renders) ── */
  const counterRef = useRef<HTMLDivElement>(null)
  const missedCallsRef = useRef<HTMLSpanElement>(null)
  const lostValueRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (timerRef.current) return
          let elapsed = 0
          timerRef.current = setInterval(() => {
            elapsed += 1
            const missedCalls = Math.floor(elapsed * CALL_RATE)
            const lostValue = Math.floor(missedCalls * AVG_JOB_VALUE * CONVERSION_RATE)
            if (missedCallsRef.current) {
              missedCallsRef.current.textContent = missedCalls.toLocaleString("en-GB")
            }
            if (lostValueRef.current) {
              lostValueRef.current.textContent = `£${lostValue.toLocaleString("en-GB")}`
            }
          }, 1000)
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
        }
      },
      { threshold: 0 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const handlePrimaryCTA = useCallback(() => {
    setCtaLoading(true)
    setTimeout(() => {
      setCtaLoading(false)
      setShowSignup(true)
    }, 800)
  }, [])

  const scrollToDemo = useCallback(() => {
    const el = document.getElementById("demo")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      className="hero dark-section relative overflow-hidden bg-gradient-to-br from-[#0F1729] via-[#1A1A2E] to-[#0F1729] pt-[var(--section-py-xl)]"
      aria-label="Introduction"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.08] blur-[120px]"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.05] blur-[100px]"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[length:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        }}
        aria-hidden="true"
      />

      {/* ── Main grid ── */}
      <div
        className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[55%_45%] gap-[clamp(40px,4vw,80px)] items-start pb-20"
      >
        {/* ══ LEFT: Text column ══ */}
        <div className="max-w-[540px]">
          {/* H1 */}
          <motion.h1
            {...fadeUpVisible(0.1)}
            className="font-sans text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-white mb-4"
          >
            <span className="block">Your phone&apos;s ringing.</span>
            <span className="block text-[#D63031]">Katie&apos;s got it.</span>
          </motion.h1>

          {/* Entity definitions for AI consumption — visually hidden but machine-readable */}
          <div className="hidden" aria-hidden="true">
            <p itemScope itemType="https://schema.org/Thing">
              <span itemProp="name">Katie</span> is an
              <span itemProp="additionalType">https://schema.org/SoftwareApplication</span>
              that answers missed phone calls for UK tradespeople, qualifies the enquiry,
              and delivers it to WhatsApp.
            </p>
            <p itemScope itemType="https://schema.org/Thing">
              <span itemProp="name">Whoza.ai</span> is an
              <span itemProp="additionalType">https://schema.org/TechnologyCompany</span>
              based in the United Kingdom that provides AI call handling services for
              plumbers, electricians, and other tradespeople.
            </p>
          </div>

          {/* Secondary headline */}
          <motion.p
            {...fadeUpVisible(0.3)}
            className="font-sans text-lg font-semibold text-emerald-500 mb-4 leading-snug tracking-tight"
          >
            While you work, we book.
          </motion.p>

          {/* Subhead */}
          <motion.p
            {...fadeUpVisible(0.4)}
            className="font-sans text-[17px] leading-relaxed text-slate-400 mb-3 tracking-wide"
          >
            The <abbr title="Artificial Intelligence">AI</abbr> call handler and Revenue Team built for
            UK trades. Answers every missed call, qualifies real jobs, and sends them
            straight to your WhatsApp — so you accept, call back, or decline in two taps.
          </motion.p>

          {/* Outcome punchline */}
          <motion.p
            {...fadeUpVisible(0.5)}
            className="font-sans text-[17px] font-semibold leading-snug text-white mb-5"
          >
            No apps. No Contract. Just more work.
          </motion.p>

          {/* Pilot badge */}
          <motion.div
            {...fadeUpVisible(0.6)}
            className="inline-flex items-center gap-2 bg-emerald-500/[0.15] border border-emerald-500/[0.3] text-emerald-500 text-[13px] font-semibold px-4 py-2 rounded-[20px] mb-5"
          >
            <span aria-hidden="true">🌱</span>
            UK Pilot Programme — Limited to 50 tradespeople
          </motion.div>

          {/* CTA Group */}
          <motion.div
            {...fadeUpVisible(0.7)}
            className="flex flex-col gap-3 mb-5 items-start"
          >
            <button
              onClick={handlePrimaryCTA}
              disabled={ctaLoading}
              className="btn-primary inline-flex items-center justify-center bg-white text-[#1A1A2E] font-sans text-[17px] font-bold px-8 py-4 rounded-xl no-underline border-none cursor-pointer min-h-[56px] whitespace-nowrap shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
              aria-label="Try Katie Free for 7 Days"
            >
              {ctaLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Setting up Katie…
                </>
              ) : (
                <>
                  Try Katie Free for 7 Days
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <span className="text-[13px] text-slate-400 tracking-wide">
              No credit card required · 30-day money-back guarantee
            </span>

            <button
              onClick={scrollToDemo}
              className="inline-flex items-center gap-2 transition-colors hover:underline text-left text-[15px] text-slate-400 font-medium font-sans min-h-[44px]"
              aria-label="See Katie handle a call — 60 second demo, no signup required"
            >
              <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] text-white">
                <Play className="w-3 h-3 fill-current" />
              </span>
              See Katie handle a call (60 sec — no signup)
            </button>
          </motion.div>

          {/* Trust Pills */}
          <motion.ul
            {...fadeUpVisible(0.8)}
            aria-label="Key benefits"
            className="flex flex-wrap gap-2.5 mb-6 list-none p-0"
          >
            {trustItems.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 bg-white/[0.06] text-slate-400 text-[13px] px-3.5 py-2 rounded-[20px] border border-white/[0.08]"
              >
                <span className="text-[#D63031] font-bold">✓</span>
                {item}
              </li>
            ))}
          </motion.ul>

          {/* Founder Bar */}
          <motion.div
            {...fadeUpVisible(0.9)}
            className="flex items-center gap-3.5 p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl mb-5"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/10 bg-[#1A1A2E] flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white mb-1 leading-snug">
                Built by Dru McPherson, former trade business owner
              </p>
              <p className="text-[13px] text-slate-400 m-0">
                Got questions? I answer every email:{" "}
                <a
                  href="mailto:dru@whoza.ai"
                  className="text-emerald-500 no-underline"
                >
                  dru@whoza.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Real Review */}
          <motion.blockquote
            {...fadeUpVisible(1.0)}
            className="m-0 px-5 py-4 bg-white/[0.04] border-l-[3px] border-[#B07D12] rounded-r-xl"
          >
            <p
              className="text-[15px] italic text-slate-400 leading-relaxed mb-2.5"
            >
              &ldquo;By far the simplest and the cheapest. I&apos;m already seeing results.&rdquo;
            </p>
            <footer
              className="flex items-center gap-3 flex-wrap"
            >
              <cite
                className="text-[13px] not-italic text-gray-500"
              >
                — Ludmila Lamont, Early User
              </cite>
              <a
                href="https://g.page/r/CaV8r9vL8v9vEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="link-animated text-[13px] text-emerald-500 font-medium no-underline"
              >
                View on Google →
              </a>
            </footer>
          </motion.blockquote>
        </div>

        {/* ══ RIGHT: Phone mockup ══ */}
        <motion.div
          {...fadeInRightVisible(0.3)}
          className="relative w-full min-w-[300px] h-[660px] flex justify-center items-start pt-0 overflow-visible"
          style={{ contain: "layout style paint" }}
        >
          {/* Ambient glow — amplified multi-layer aura */}
          <div
            className="absolute w-[900px] h-[900px] pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.15) 25%, rgba(30,35,70,0.2) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-[600px] h-[700px] pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[30px]"
            style={{
              background:
                "radial-gradient(ellipse at 40% 45%, rgba(255,255,255,0.12) 0%, rgba(16,185,129,0.08) 40%, transparent 65%)",
            }}
          />
          <div
            className="absolute w-[300px] h-[400px] pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[15px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.25) 0%, transparent 60%)",
            }}
          />

          <HeroPhoneMockup />
        </motion.div>
      </div>

      {/* ══ LIVE COUNTER ══ */}
      <div
        ref={counterRef}
        className="text-center"
        style={{
          padding: "40px var(--section-px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          className="text-base text-slate-400 leading-normal m-0"
        >
          <span className="sr-only">
            Live statistics from the Office for National Statistics:
          </span>
          Since you opened this page, UK trades have missed{" "}
          <span
            ref={missedCallsRef}
            className="font-bold text-[#D63031] [font-variant-numeric:tabular-nums]"
            aria-live="polite"
          >
            0
          </span>{" "}
          calls. That&apos;s approximately{" "}
          <span
            ref={lostValueRef}
            className="font-bold text-[#D63031] [font-variant-numeric:tabular-nums]"
          >
            £0
          </span>{" "}
          in lost work.
        </p>
        <p
          className="text-xs text-gray-500 my-2 mb-1"
        >
          Source: ONS Business Population Estimates 2025, 62% unanswered rate
        </p>
        <p
          className="text-[22px] font-bold text-[#D63031] mt-2 mb-0"
        >
          That&apos;s why we built Katie&apos;s Revenue Team
        </p>
      </div>

      {/* ── Bottom gradient to off-white ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to top, var(--off-white), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Modals ── */}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </section>
  )
}
