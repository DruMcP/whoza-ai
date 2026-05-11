"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ArrowRight, Loader2, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroPhoneMockup } from "./hero-phone-mockup"
import { SignupModal } from "./signup-modal"

/* ── Trade categories ── */
const tradeCategories = [
  { icon: "🔧", label: "Plumbers" },
  { icon: "⚡", label: "Electricians" },
  { icon: "🏠", label: "Roofers" },
  { icon: "🔒", label: "Locksmiths" },
  { icon: "🔥", label: "Heating Engineers" },
  { icon: "🔨", label: "Builders" },
]

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

export function Hero() {
  const [showSignup, setShowSignup] = useState(false)
  const [ctaLoading, setCtaLoading] = useState(false)

  /* ── Live counter state ── */
  const [elapsed, setElapsed] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [isVisible])

  const missedCalls = Math.floor(elapsed * CALL_RATE)
  const lostValue = Math.floor(missedCalls * AVG_JOB_VALUE * CONVERSION_RATE)

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

  /* ── Animation variants ── */
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      className="hero dark-section relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)",
        paddingTop: "var(--section-py-xl)",
      }}
      aria-label="Introduction"
    >
      {/* ── Background atmosphere ── */}
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

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Main grid ── */}
      <div
        className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: "clamp(40px, 4vw, 80px)",
          alignItems: "start",
          paddingBottom: 80,
        }}
      >
        {/* ══ LEFT: Text column ══ */}
        <div style={{ maxWidth: 540 }}>
          {/* H1 */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            <span style={{ display: "block" }}>Your phone&apos;s ringing.</span>
            <span style={{ display: "block", color: "#D63031" }}>Katie&apos;s got it.</span>
          </motion.h1>

          {/* Secondary headline */}
          <motion.p
            {...fadeUp(0.28)}
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: "#10B981",
              margin: "0 0 16px",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            While you work, we book.
          </motion.p>

          {/* Subhead */}
          <motion.p
            {...fadeUp(0.38)}
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "#94A3B8",
              margin: "0 0 12px",
              letterSpacing: "0.01em",
            }}
          >
            The <abbr title="Artificial Intelligence">AI</abbr> call handler and Revenue Team built for
            UK trades. Answers every missed call, qualifies real jobs, and sends them
            straight to your WhatsApp — so you accept, call back, or decline in two taps.
          </motion.p>

          {/* Outcome punchline */}
          <motion.p
            {...fadeUp(0.48)}
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: 17,
              fontWeight: 600,
              lineHeight: 1.4,
              color: "#FFFFFF",
              margin: "0 0 20px",
            }}
          >
            No apps. No Contract. Just more work.
          </motion.p>

          {/* Pilot badge */}
          <motion.div
            {...fadeUp(0.55)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10B981",
              fontSize: 13,
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            <span aria-hidden="true">🌱</span>
            UK Pilot Programme — Limited to 50 tradespeople
          </motion.div>

          {/* CTA Group */}
          <motion.div
            {...fadeUp(0.65)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <button
              onClick={handlePrimaryCTA}
              disabled={ctaLoading}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                color: "#1A1A2E",
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
                fontSize: 17,
                fontWeight: 700,
                padding: "16px 32px",
                borderRadius: 12,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                minHeight: 56,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(255,255,255,0.15)",
              }}
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

            <span style={{ fontSize: 13, color: "#94A3B8", letterSpacing: "0.01em" }}>
              No credit card required · 30-day money-back guarantee
            </span>

            <button
              onClick={scrollToDemo}
              className="inline-flex items-center gap-2 transition-colors hover:underline text-left"
              style={{
                fontSize: 15,
                color: "#94A3B8",
                fontWeight: 500,
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
                minHeight: 44,
              }}
              aria-label="See Katie handle a call — 60 second demo, no signup required"
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "#fff",
                }}
              >
                <Play className="w-3 h-3 fill-current" />
              </span>
              See Katie handle a call (60 sec — no signup)
            </button>
          </motion.div>

          {/* Trust Pills */}
          <motion.ul
            {...fadeUp(0.75)}
            aria-label="Key benefits"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 24,
              listStyle: "none",
              padding: 0,
            }}
          >
            {trustItems.map((item) => (
              <li
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.06)",
                  color: "#94A3B8",
                  fontSize: 13,
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ color: "#D63031", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </motion.ul>

          {/* Founder Bar */}
          <motion.div
            {...fadeUp(0.85)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.1)",
                background: "#1A1A2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 20 }}>👤</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 4px",
                  lineHeight: 1.3,
                }}
              >
                Built by Dru McPherson, former trade business owner
              </p>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
                Got questions? I answer every email:{" "}
                <a
                  href="mailto:dru@whoza.ai"
                  style={{ color: "#10B981", textDecoration: "none" }}
                >
                  dru@whoza.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Real Review */}
          <motion.blockquote
            {...fadeUp(0.95)}
            style={{
              margin: 0,
              padding: "16px 20px",
              background: "rgba(255,255,255,0.04)",
              borderLeft: "3px solid #B07D12",
              borderRadius: "0 12px 12px 0",
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: "#94A3B8",
                lineHeight: 1.5,
                margin: "0 0 10px",
              }}
            >
              &ldquo;By far the simplest and the cheapest. I&apos;m already seeing results.&rdquo;
            </p>
            <footer
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <cite
                style={{
                  fontSize: 13,
                  fontStyle: "normal",
                  color: "#6B7280",
                }}
              >
                — Ludmila Lamont, Early User
              </cite>
              <a
                href="https://g.page/r/CaV8r9vL8v9vEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="link-animated"
                style={{
                  fontSize: 13,
                  color: "#10B981",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                View on Google →
              </a>
            </footer>
          </motion.blockquote>
        </div>

        {/* ══ RIGHT: Phone mockup ══ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            minWidth: 300,
            height: 660,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 0,
            contain: "layout style paint",
            overflow: "visible",
          }}
        >
          {/* Ambient glow — enhanced multi-layer */}
          <div
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              background:
                "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, rgba(30,35,70,0.25) 30%, rgba(20,25,50,0.1) 55%, transparent 75%)",
              pointerEvents: "none",
              zIndex: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 600,
              background:
                "radial-gradient(ellipse at 40% 45%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(20px)",
            }}
          />

          <HeroPhoneMockup />
        </motion.div>
      </div>

      {/* ══ LIVE COUNTER ══ */}
      <div
        ref={counterRef}
        style={{
          textAlign: "center",
          padding: "40px var(--section-px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "#94A3B8",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          <span className="sr-only">
            Live statistics from the Office for National Statistics:
          </span>
          Since you opened this page, UK trades have missed{" "}
          <span
            style={{
              fontWeight: 700,
              color: "#D63031",
              fontVariantNumeric: "tabular-nums",
            }}
            aria-live="polite"
          >
            {missedCalls.toLocaleString("en-GB")}
          </span>{" "}
          calls. That&apos;s approximately{" "}
          <span
            style={{
              fontWeight: 700,
              color: "#D63031",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            £{lostValue.toLocaleString("en-GB")}
          </span>{" "}
          in lost work.
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#6B7280",
            margin: "8px 0 4px",
          }}
        >
          Source: ONS Business Population Estimates 2025, 62% unanswered rate
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#D63031",
            margin: "8px 0 0",
          }}
        >
          That&apos;s why we built Katie&apos;s Revenue Team
        </p>
      </div>

      {/* ══ TRADE CATEGORIES ══ */}
      <div
        className="reveal-stagger"
        style={{
          textAlign: "center",
          padding: "var(--section-py-md) var(--section-px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#6B7280",
            marginBottom: 20,
            letterSpacing: "0.02em",
          }}
        >
          Built for UK trades &amp; home services
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {tradeCategories.map((trade) => (
            <span
              key={trade.label}
              className="trade-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.04)",
                color: "#94A3B8",
                fontSize: 13,
                padding: "8px 16px",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span aria-hidden="true">{trade.icon}</span>
              {trade.label}
            </span>
          ))}
        </div>
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
      <AnimatePresence>
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      </AnimatePresence>
    </section>
  )
}
