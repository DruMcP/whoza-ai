"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Play, MapPin, TrendingUp, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneMockup } from "./phone-mockup"
import { useLocale } from "@/lib/locale-context"

interface LocationHeroProps {
  city: string
  trade?: string
  region?: string
  jobsThisWeek?: number
}

/* ── Trust pills (aligned with main site) ── */
const trustItems = [
  "7-day free trial — no card required",
  "30-day money-back guarantee",
  "Live in 30 minutes",
  "Works with your existing number",
  "Cancel anytime",
]

/* ── City-specific stats ── */
const cityStats: Record<string, { businesses: string; households: string; avgJob: string }> = {
  london: { businesses: "32,000+", households: "1.2M", avgJob: "£340" },
  manchester: { businesses: "8,500+", households: "540K", avgJob: "£310" },
  birmingham: { businesses: "11,000+", households: "680K", avgJob: "£295" },
  leeds: { businesses: "6,000+", households: "350K", avgJob: "£285" },
  glasgow: { businesses: "5,500+", households: "310K", avgJob: "£290" },
  bristol: { businesses: "4,800+", households: "235K", avgJob: "£320" },
  liverpool: { businesses: "4,200+", households: "210K", avgJob: "£275" },
  edinburgh: { businesses: "4,500+", households: "245K", avgJob: "£315" },
}

/* ── London boroughs (only for London) ── */
const londonBoroughs = [
  "Chelsea", "Kensington", "Hackney", "Camden", "Croydon",
  "Islington", "Greenwich", "Westminster", "and all London boroughs",
]

export function LocationHero({ city, trade, region, jobsThisWeek = 127 }: LocationHeroProps) {
  const { country, config } = useLocale()
  const cityKey = city.toLowerCase()
  const stats = cityStats[cityKey] || { businesses: "5,000+", households: "250K", avgJob: "£300" }

  // Natural H1 — no keyword stuffing, punchy and human
  const h1Text = trade
    ? `Your phone's ringing.\nKatie's got it — in ${city}.`
    : `Your phone's ringing.\nKatie's got it — in ${city}.`

  // Borough list for London, otherwise city + region
  const serviceArea = cityKey === "london"
    ? londonBoroughs.join(" · ")
    : `Serving ${city}${region ? ` & ${region}` : ""}`

  return (
    <section
      className="hero dark-section relative overflow-hidden bg-gradient-to-br from-[#0F1729] via-[#1A1A2E] to-[#0F1729] pt-[var(--section-py-xl)]"
      aria-label={`AI call handling for ${trade || "trades"} in ${city}`}
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          className="bg-emerald-500/[0.08] blur-[120px]"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          className="bg-emerald-500/[0.05] blur-[100px]"
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
        <div className="max-w-[540px]">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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
            <MapPin className="w-4 h-4" />
            {jobsThisWeek}+ enquiries captured this week in {city}
          </motion.div>

          {/* H1 — Punchy, natural, no keyword stuffing */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-white mb-4 whitespace-pre-line"
          >
            <span className="block">Your phone&apos;s ringing.</span>
            <span className="block text-[#D63031]">
              Katie&apos;s got it — in {city}.
            </span>
          </motion.h1>

          {/* Secondary headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg font-semibold text-emerald-500 mb-4 leading-snug tracking-tight"
          >
            While you work, we book.
          </motion.p>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[17px] leading-relaxed text-slate-400 mb-3 tracking-wide"
          >
            The <abbr title="Artificial Intelligence">AI</abbr> call handler and Revenue Team built for{" "}
            {country === "uk" ? "UK" : "US"} {config.language.tradesPeople}. Answers every missed call,
            qualifies real jobs, and sends them straight to your WhatsApp — so you accept, call back,
            or decline in two taps.
          </motion.p>

          {/* Outcome punchline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[17px] font-semibold leading-snug text-white mb-5"
          >
            No apps. No contract. Just more work.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 mb-4 items-start"
          >
            <a
              href="#pricing"
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
            >
              Start Capturing Jobs in {city}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>

            <span className="text-[13px] text-slate-400 tracking-wide">
              No credit card required · 30-day money-back guarantee
            </span>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 text-left text-[15px] text-slate-400/50 font-medium font-sans min-h-[44px] no-underline cursor-default"
              aria-label="Audio demo coming soon"
              style={{ pointerEvents: "none" }}
            >
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/30">
                <Play className="w-3 h-3 fill-current" />
              </span>
              Audio demo — coming soon
            </a>

            {/* Pricing anchor */}
            <p className="text-sm text-slate-400 mt-1">
              From <strong className="text-white">{config.currencySymbol}59/month</strong> + VAT{" "}
              — one recovered job pays for the entire year
            </p>

            {/* Calculator teaser */}
            <a
              href="#calculator"
              style={{
                fontSize: 14,
                color: "#10B981",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              💰 See what missed calls are costing you →
            </a>
          </motion.div>

          {/* Urgency trigger */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 13,
              color: "#10B981",
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Limited to 50 {country === "uk" ? "UK" : "US"} trades in our pilot programme
          </motion.p>

          {/* Trust Pills */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Key benefits"
            className="flex flex-wrap gap-2.5 mb-5 list-none p-0"
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

          {/* City-specific stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-3 mb-5 p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-500">{stats.businesses}</div>
              <div className="text-xs text-slate-400 mt-1">trade businesses<br />in {city}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">{stats.households}</div>
              <div className="text-xs text-slate-400 mt-1">households<br />in {city}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-amber-500">{stats.avgJob}</div>
              <div className="text-xs text-slate-400 mt-1">average job<br />in {city}</div>
            </div>
          </motion.div>

          {/* Founder Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              marginBottom: 16,
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
              <span className="text-xl">👤</span>
            </div>
            <div className="min-w-0">
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 4px",
                  lineHeight: 1.3,
                }}
              >
                Built by Dru McPherson for {city} trades
              </p>
              <p className="text-[13px] text-slate-400 m-0">
                Got questions?{" "}
                <a
                  href="mailto:dru@whoza.ai"
                  className="text-emerald-500 no-underline"
                >
                  dru@whoza.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Real Review — Ludmila Lamont */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
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
            <footer className="flex items-center gap-3">
              <cite className="text-[13px] text-slate-500 not-italic">
                — Ludmila Lamont, {city}
              </cite>
              <span className="text-[13px] text-emerald-500">★★★★★ Google Review</span>
            </footer>
          </motion.blockquote>

          {/* Service area (boroughs for London) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 12,
              color: "#64748B",
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            {serviceArea}
          </motion.p>
        </div>

        {/* ══ RIGHT: Phone mockup ══ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-end pt-10"
        >
          <PhoneMockup city={city} trade={trade} />
        </motion.div>
      </div>
    </section>
  )
}
