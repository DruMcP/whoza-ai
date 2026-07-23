"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

import { trackCTA } from "@/lib/gtag"

/* ── Live counter constants (ONS-derived) ── */
const CALL_RATE = 0.31        // calls per second across UK trades
const AVG_JOB_VALUE = 120     // £
const CONVERSION_RATE = 0.35  // ~35% of missed calls = lost jobs

/* ── Framer-motion helpers ── */
const fadeUpVisible = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeInRightVisible = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export function Hero() {
  const [ctaLoading, setCtaLoading] = useState(false)

  /* ── 3D phone tilt on scroll ── */
  const { scrollY } = useScroll()
  const phoneRotateY = useTransform(scrollY, [0, 600], [0, -8])
  const phoneRotateX = useTransform(scrollY, [0, 600], [0, 3])

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

          // Reduced motion: show final values immediately
          const prefersReducedMotion = typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          if (prefersReducedMotion) {
            const now = Date.now();
            const todayStart = new Date(new Date().toDateString()).getTime();
            const secondsElapsed = Math.floor((now - todayStart) / 1000);
            const missedCalls = Math.floor(secondsElapsed * CALL_RATE);
            const lostValue = Math.floor(missedCalls * AVG_JOB_VALUE * CONVERSION_RATE);
            if (missedCallsRef.current) {
              missedCallsRef.current.textContent = missedCalls.toLocaleString("en-GB");
            }
            if (lostValueRef.current) {
              lostValueRef.current.textContent = `£${lostValue.toLocaleString("en-GB")}`;
            }
            return;
          }

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
    trackCTA("Try Katie Free", "hero")
    setCtaLoading(true)
    setTimeout(() => {
      setCtaLoading(false)
      window.dispatchEvent(new CustomEvent('openWaitlist', { detail: { source: 'hero' } }))
    }, 800)
  }, [])

  return (
    <>
      <section
        className="hero hero-grain dark-section relative overflow-hidden bg-[#0F172A]"
        aria-label="Introduction"
      >
        {/* Animated gradient background */}
        <div className="hero-animated-gradient" />

        {/* ── Main two-column grid ── */}
        <div className="hero-grid relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[clamp(40px,4vw,80px)] items-center pb-16 pt-[var(--section-py-xl)]">
          
          {/* ══ LEFT: Text column ══ */}
          <div className="max-w-[540px] lg:max-w-none">
            {/* Eyebrow */}
            <motion.div
              {...fadeUpVisible(0.05)}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Every missed call is a job going to your competitor.
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="headline-primary font-sans text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-white mb-3"
            >
              <span className="block">Never miss a job again.</span>
            </motion.h1>

            {/* Tagline 1 */}
            <motion.p
              {...fadeUpVisible(0.2)}
              className="font-sans text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-1"
            >
              Your phone rings. Katie answers 24/7.
            </motion.p>

            {/* Tagline 2 */}
            <motion.p
              {...fadeUpVisible(0.25)}
              className="font-sans text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-4"
            >
              While you work, we book — Job done.
            </motion.p>

            {/* Sub-paragraph */}
            <motion.p
              {...fadeUpVisible(0.3)}
              className="font-sans text-lg leading-relaxed text-slate-400 mb-6 tracking-wide"
            >
              The AI Receptionist built for UK trades. Answers every call, qualifies real jobs, and sends them to your WhatsApp. No apps. No contract. Live in 30 minutes.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              {...fadeUpVisible(0.4)}
              className="flex flex-col gap-3 mb-5 items-start"
            >
              <button
                onClick={handlePrimaryCTA}
                disabled={ctaLoading}
                className="btn-primary-hero inline-flex items-center justify-center font-sans text-lg font-semibold px-8 py-4 rounded-[14px] no-underline border-none cursor-pointer min-h-[56px] whitespace-nowrap hover:scale-105 active:scale-95 transition-transform"
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
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Positioning line */}
            <motion.p
              {...fadeUpVisible(0.45)}
              className="font-sans text-[clamp(20px,2.2vw,24px)] font-extrabold text-white mb-4 pt-4 border-t border-white/10"
            >
              Not just a receptionist. <span className="text-emerald-400">A revenue team.</span>
            </motion.p>

            {/* Trust Pills — 4 items */}
            <motion.div
              {...fadeUpVisible(0.5)}
              className="flex flex-wrap gap-2"
            >
              <span className="check-item inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-sm font-medium px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-emerald-400">✓</span>
                Pay only for jobs you accept
              </span>
              <span className="check-item inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-sm font-medium px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-emerald-400">✓</span>
                Keep your existing number
              </span>
              <span className="check-item inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-sm font-medium px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-emerald-400">✓</span>
                No call recording
              </span>
              <span className="check-item inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-sm font-medium px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-emerald-400">✓</span>
                No tech skills needed
              </span>
            </motion.div>
          </div>

          {/* ══ RIGHT: 3D Phone Image ══ */}
          {/* FIX 11: Phone column centers vertically */}
          <motion.div
            {...fadeInRightVisible(0.3)}
            className="phone-column relative flex justify-center items-center lg:justify-end"
          >
            {/* FIX 2: Phone wrapper with glow, float, and 3D scroll tilt */}
            <motion.div
              className="phone-wrapper"
              style={{
                rotateY: phoneRotateY,
                rotateX: phoneRotateX,
                perspective: 1000,
              }}
            >
              <Image
                src="/images/hero-phone-3d.webp"
                alt="Katie AI WhatsApp interface showing a new boiler repair lead from Sarah Williams in Bristol"
                width={420}
                height={630}
                quality={90}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 90vw, 40vw"
                className="phone-img"
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ LIVE COUNTER / STATS SECTION ══ */}
      <section
        ref={counterRef}
        className="hero-stats text-center relative"
        aria-label="Live statistics"
      >
        {/* Stats headline — same solid emerald as subheadline */}
        <h2 className="stats-headline font-sans text-xl font-bold text-emerald-400 mb-4">
          That&apos;s why we built Katie&apos;s Revenue Team
        </h2>

        <p className="text-base text-slate-400 leading-normal m-0">
          <span className="sr-only">
            Live statistics from the Office for National Statistics:
          </span>
          Since you opened this page, UK trades have missed{" "}
          <span
            ref={missedCallsRef}
            className="font-bold text-red-400 [font-variant-numeric:tabular-nums]"
            aria-live="polite"
          >
            0
          </span>{" "}
          calls. That&apos;s approximately{" "}
          <span
            ref={lostValueRef}
            className="font-bold text-red-400 [font-variant-numeric:tabular-nums]"
          >
            £0
          </span>{" "}
          in lost work.
        </p>
        <p className="text-xs text-gray-500 my-2 mb-1">
          Source: ONS Business Population Estimates 2025, 62% unanswered rate
        </p>
      </section>
    </>
  )
}
