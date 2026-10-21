"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ArrowRight, Loader2, Play } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { trackCTA } from "@/lib/gtag"

/*
 * Light green hero, modelled on the original app.whoza.ai landing page:
 * centred copy on a green-to-mint gradient, with the hand-held phone below.
 * The previous dark hero is kept in hero-dark-backup.tsx.
 */

/* ── Live counter constants (Moneypenny-derived) ── */
const CALL_RATE = 0.31        // calls per second across UK trades
const AVG_JOB_VALUE = 120     // £
const CONVERSION_RATE = 0.35  // ~35% of missed calls = lost jobs

/* ── Framer-motion helper ── */
const fadeUpVisible = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

/* Sampled from the original hero: #1fcd80 green fading to #effdf4 mint. The
   gradient covers only the copy and ends in pure mint, which is also the
   background of the hand-held phone image, so the image has no visible edge at
   any screen width. */
const HERO_MINT = "#effdf4"
const COPY_GRADIENT =
  `linear-gradient(180deg, #1fcd80 0%, #1fcd80 28%, #3ddb96 42%, #69f2b6 55%, #b7f9da 70%, #e4fcef 85%, ${HERO_MINT} 100%)`

/* Fade the image's left, right and top edges into the mint so the crop
   boundary never shows. */
const HAND_MASK =
  "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%)"

export function Hero() {
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

  const handleTrialCTA = useCallback(() => {
    trackCTA("Try for free", "hero")
    setCtaLoading(true)
    setTimeout(() => {
      setCtaLoading(false)
      window.dispatchEvent(new CustomEvent('openWaitlist', { detail: { source: 'hero' } }))
    }, 800)
  }, [])

  return (
    <>
      <section
        className="hero relative overflow-hidden"
        style={{ background: HERO_MINT }}
        aria-label="Introduction"
      >
        <div style={{ background: COPY_GRADIENT }} className="pb-10 sm:pb-16">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[clamp(96px,12vw,132px)] text-center">
          {/* Eyebrow pill */}
          <motion.div {...fadeUpVisible(0.05)} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
              AI call agent · UK trades
            </span>
          </motion.div>

          {/* H1 — text unchanged for SEO, split across the two colours */}
          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[clamp(48px,8.5vw,112px)] font-extrabold leading-[0.95] tracking-[-0.045em] mb-6"
          >
            <span className="block text-white">Never miss a</span>
            <span className="block text-[#09382b]">job again.</span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            {...fadeUpVisible(0.2)}
            className="mx-auto max-w-[640px] font-sans text-[clamp(16px,1.6vw,20px)] leading-relaxed text-[#205544] mb-8"
          >
            AI receptionists that answer, qualify and follow up on every job,
            tailored to your trade, running around the clock.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUpVisible(0.3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8"
          >
            <a
              href="#katie-demo-audio"
              onClick={() => trackCTA("See a demo", "hero")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d8656] hover:bg-[#0a7149] px-7 py-3.5 min-h-[52px] font-sans text-base font-semibold text-white no-underline shadow-lg shadow-emerald-900/15 transition-colors"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              See a demo
            </a>
            <button
              onClick={handleTrialCTA}
              disabled={ctaLoading}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-2 font-sans text-base font-semibold text-[#09382b] bg-transparent border-none cursor-pointer hover:underline underline-offset-4"
              aria-label="Try Whoza free for 7 days"
            >
              {ctaLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Setting up Katie…
                </>
              ) : (
                <>
                  Try for free
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        </div>
        </div>

        {/* Hand-held phone. Its background is the same #effdf4 mint as the
            section; the side mask hides any seam. */}
        <motion.div
          {...fadeUpVisible(0.35)}
          className="relative flex justify-center overflow-hidden"
        >
          <Image
            src="/images/hero-hand-phone.webp"
            alt="A hand holding a phone showing a Whoza WhatsApp job card: new lead, Sarah Williams, boiler repair, Bristol BS16, £250 to £450, high priority, with Accept, Call Back and Decline buttons"
            width={1000}
            height={880}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 150vw, 760px"
            className="h-auto max-w-none w-[min(150vw,760px)]"
            style={{
              maskImage: HAND_MASK,
              WebkitMaskImage: HAND_MASK,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>
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
            Live statistics from the Moneypenny Small Business Call Report (2016):
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
          Source: Moneypenny Small Business Call Report, 2016, 33% of small businesses fail to answer
        </p>
      </section>
    </>
  )
}
