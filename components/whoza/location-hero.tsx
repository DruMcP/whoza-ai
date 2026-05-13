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
      className="hero dark-section relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)",
        paddingTop: "var(--section-py-xl)",
      }}
      aria-label={`AI call handling for ${trade || "trades"} in ${city}`}
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
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 16px",
              whiteSpace: "pre-line",
            }}
          >
            <span style={{ display: "block" }}>Your phone&apos;s ringing.</span>
            <span style={{ display: "block", color: "#D63031" }}>
              Katie&apos;s got it — in {city}.
            </span>
          </motion.h1>

          {/* Secondary headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "#94A3B8",
              margin: "0 0 12px",
              letterSpacing: "0.01em",
            }}
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
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
              fontSize: 17,
              fontWeight: 600,
              lineHeight: 1.4,
              color: "#FFFFFF",
              margin: "0 0 20px",
            }}
          >
            No apps. No contract. Just more work.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 16,
              alignItems: "flex-start",
            }}
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

            <span style={{ fontSize: 13, color: "#94A3B8", letterSpacing: "0.01em" }}>
              No credit card required · 30-day money-back guarantee
            </span>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 transition-colors hover:underline text-left"
              style={{
                fontSize: 15,
                color: "#94A3B8",
                fontWeight: 500,
                fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
                minHeight: 44,
                textDecoration: "none",
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
              Hear Katie in Action (60 sec — no signup)
            </a>

            {/* Pricing anchor */}
            <p
              style={{
                fontSize: 14,
                color: "#94A3B8",
                marginTop: 4,
              }}
            >
              From <strong style={{ color: "#fff" }}>{config.currencySymbol}59/month</strong> + VAT{" "}
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
            <span style={{ animation: "livePulse 2s infinite", display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#10B981", marginRight: 8 }} />
            Limited to 50 {country === "uk" ? "UK" : "US"} trades in our pilot programme
          </motion.p>

          {/* Trust Pills */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Key benefits"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 20,
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

          {/* City-specific stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 20,
              padding: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#10B981" }}>{stats.businesses}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>trade businesses<br />in {city}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#3B82F6" }}>{stats.households}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>households<br />in {city}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#F59E0B" }}>{stats.avgJob}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>average job<br />in {city}</div>
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
                Built by Dru McPherson for {city} trades
              </p>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
                Got questions?{" "}
                <a
                  href="mailto:dru@whoza.ai"
                  style={{ color: "#10B981", textDecoration: "none" }}
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
            <footer style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <cite style={{ fontSize: 13, color: "#64748B", fontStyle: "normal" }}>
                — Ludmila Lamont, {city}
              </cite>
              <span style={{ fontSize: 13, color: "#10B981" }}>★★★★★ Google Review</span>
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
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: 40 }}
        >
          <PhoneMockup city={city} trade={trade} />
        </motion.div>
      </div>
    </section>
  )
}
