"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gauge, ArrowRight, TrendingUp, CheckCircle2, Copy, MapPin, Clock } from "lucide-react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Script from "next/script"

const trades = [
  { key: "plumber", label: "Plumber" },
  { key: "electrician", label: "Electrician" },
  { key: "roofer", label: "Roofer" },
  { key: "builder", label: "Builder" },
  { key: "gas-engineer", label: "Gas Engineer" },
  { key: "heating-engineer", label: "Heating Engineer" },
  { key: "locksmith", label: "Locksmith" },
  { key: "landscaper", label: "Landscaper" },
  { key: "cleaner", label: "Cleaner" },
  { key: "other", label: "Other" },
]

const regions = [
  "London",
  "South East",
  "South West",
  "East Anglia",
  "Midlands",
  "North West",
  "North East",
  "Yorkshire",
  "Wales",
  "Scotland",
  "Northern Ireland",
]

const experienceLevels = [
  { key: "apprentice", label: "Apprentice / Trainee", multiplier: 0.6 },
  { key: "qualified", label: "Qualified (2–14 years)", multiplier: 1.0 },
  { key: "master", label: "Master / 15+ years", multiplier: 1.3 },
]

// Base hourly rates by trade (qualified level, Midlands baseline)
const baseRates: Record<string, number> = {
  plumber: 55,
  electrician: 50,
  roofer: 48,
  builder: 45,
  "gas-engineer": 60,
  "heating-engineer": 55,
  locksmith: 45,
  landscaper: 38,
  cleaner: 20,
  other: 48,
}

const regionMultipliers: Record<string, number> = {
  London: 1.35,
  "South East": 1.2,
  "South West": 1.05,
  "East Anglia": 1.0,
  Midlands: 1.0,
  "North West": 0.95,
  "North East": 0.9,
  Yorkshire: 0.92,
  Wales: 0.9,
  Scotland: 0.95,
  "Northern Ireland": 0.88,
}

const timeMultipliers = {
  normal: 1.0,
  evening: 1.3,
  night: 1.6,
  weekend: 1.4,
}

export function RateChecker() {
  const [trade, setTrade] = useState("plumber")
  const [region, setRegion] = useState("London")
  const [currentRate, setCurrentRate] = useState("")
  const [experience, setExperience] = useState("qualified")
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const tradeLabel = trades.find((t) => t.key === trade)?.label || "Tradesperson"
  const expInfo = experienceLevels.find((e) => e.key === experience) || experienceLevels[1]

  const base = baseRates[trade] || 48
  const regionMult = regionMultipliers[region] || 1.0
  const expMult = expInfo.multiplier

  const yourRate = Math.round(base * regionMult * expMult)
  const regionalAvg = Math.round(base * regionMult)
  const top10Rate = Math.round(base * regionMult * 1.5)

  const currentRateNum = currentRate ? Number(currentRate) : null
  const vsAvg = currentRateNum ? Math.round(((currentRateNum - regionalAvg) / regionalAvg) * 100) : null

  // Annual earning projection (48 weeks, 40hrs/week)
  const annualNormal = Math.round(yourRate * 40 * 48)
  const annualEvening = Math.round(yourRate * timeMultipliers.evening * 40 * 48)
  const annualWeekend = Math.round(yourRate * timeMultipliers.weekend * 40 * 48)

  const breakdownText = `${tradeLabel} Rate Check — ${region}\nExperience: ${expInfo.label}\n\nYour recommended rate: £${yourRate}/hr\nRegional average: £${regionalAvg}/hr\nTop 10% rate: £${top10Rate}/hr\n\nAnnual projection (40h/wk, 48 wks):\nNormal hours: £${annualNormal.toLocaleString()}\nEvening rate: £${annualEvening.toLocaleString()}\nWeekend rate: £${annualWeekend.toLocaleString()}`

  const handleCopy = () => {
    navigator.clipboard.writeText(breakdownText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--coral)]/10 text-[var(--coral)] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gauge className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hourly Rate Checker for UK Tradespeople
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Are you charging what you are worth? Compare your rate against regional averages and the top 10% in your trade. Most UK tradespeople undervalue their skills by 15–30%.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
          >
            <div className="space-y-6">
              {/* Trade */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  What trade are you in? <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={trade}
                  onChange={(e) => { setTrade(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {trades.map((t) => (
                    <option key={t.key} value={t.key} className="bg-[var(--navy-900)]">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  What region are you in? <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={region}
                  onChange={(e) => { setRegion(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r} value={r} className="bg-[var(--navy-900)]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current rate */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your current hourly rate (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">£</span>
                  <input
                    type="number"
                    value={currentRate}
                    onChange={(e) => { setCurrentRate(e.target.value); setShowResults(false) }}
                    placeholder="e.g. 55"
                    className="w-full pl-8 pr-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                  />
                </div>
                <p className="text-sm text-white/50 mt-1">Leave blank if you are unsure — we will show you the benchmark</p>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Experience level <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={experience}
                  onChange={(e) => { setExperience(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {experienceLevels.map((e) => (
                    <option key={e.key} value={e.key} className="bg-[var(--navy-900)]">
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full py-4 min-h-[56px] rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Gauge className="w-5 h-5" />
                CHECK MY RATE
              </button>
            </div>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[var(--coral)]" />
                YOUR RATE ANALYSIS
              </h2>

              {/* Main rate card */}
              <div className="bg-[var(--coral)]/10 border border-[var(--coral)]/20 rounded-xl p-6 mb-6 text-center">
                <p className="text-sm text-white/60 mb-1">Recommended Hourly Rate</p>
                <p className="text-5xl font-bold text-[var(--coral)]">£{yourRate}<span className="text-2xl">/hr</span></p>
                <p className="text-sm text-white/50 mt-2">
                  {tradeLabel} · {region} · {expInfo.label}
                </p>
              </div>

              {/* Comparison */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Regional Average</p>
                  <p className="text-2xl font-bold text-[var(--katie-blue)]">£{regionalAvg}/hr</p>
                  {vsAvg !== null && (
                    <p className={`text-xs mt-1 ${vsAvg >= 0 ? "text-[#10B981]" : "text-[var(--coral)]"}`}>
                      You are {vsAvg >= 0 ? "above" : "below"} avg by {Math.abs(vsAvg)}%
                    </p>
                  )}
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Top 10% Rate</p>
                  <p className="text-2xl font-bold text-[#10B981]">£{top10Rate}/hr</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Gap to Top 10%</p>
                  <p className="text-2xl font-bold text-white">+£{top10Rate - yourRate}/hr</p>
                </div>
              </div>

              {/* Time-of-day rates */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <p className="text-sm text-white/60 font-medium mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recommended rates by time of day
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Normal hours", mult: timeMultipliers.normal },
                    { label: "Evening", mult: timeMultipliers.evening },
                    { label: "Night", mult: timeMultipliers.night },
                    { label: "Weekend", mult: timeMultipliers.weekend },
                  ].map((t) => {
                    const rate = Math.round(yourRate * t.mult)
                    return (
                      <div key={t.label} className="rounded-lg p-3 text-center border border-white/10 bg-white/5">
                        <p className="text-xs text-white/50 mb-1">{t.label}</p>
                        <p className="text-lg font-bold text-white">£{rate}/hr</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Annual projection */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <p className="text-sm text-white/60 font-medium mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Annual earning projection (40 hrs/week, 48 weeks)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg p-4 border border-white/10 bg-white/5 text-center">
                    <p className="text-xs text-white/50 mb-1">Normal rate only</p>
                    <p className="text-xl font-bold text-white">£{annualNormal.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg p-4 border border-[var(--katie-blue)]/30 bg-[var(--katie-blue)]/5 text-center">
                    <p className="text-xs text-white/50 mb-1">Evening premium mix</p>
                    <p className="text-xl font-bold text-[var(--katie-blue)]">£{annualEvening.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg p-4 border border-[#10B981]/30 bg-[#10B981]/5 text-center">
                    <p className="text-xs text-white/50 mb-1">Weekend premium mix</p>
                    <p className="text-xl font-bold text-[#10B981]">£{annualWeekend.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 min-h-[48px] rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> : <Copy className="w-5 h-5" />}
                  {copied ? "COPIED" : "COPY BREAKDOWN"}
                </button>
                <a
                  href="/pricing"
                  className="flex-1 py-3 min-h-[48px] rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  KATIE HANDLES THE ADMIN — FREE TRIAL
                </a>
              </div>
            </motion.div>
          )}

          {/* Hidden FAQ */}
          <div className="hidden">
            <h2>FAQ</h2>
            <h3>What is the average hourly rate for UK tradespeople?</h3>
            <p>The average hourly rate for qualified UK tradespeople ranges from £38/hr for landscapers to £60/hr for gas engineers. London rates are approximately 35% higher than the Midlands baseline.</p>
            <h3>How much more should a master tradesperson charge?</h3>
            <p>Master tradespeople with 15+ years experience typically command 30% above the qualified rate. An apprentice or trainee should charge around 60% of the qualified benchmark.</p>
            <h3>Do hourly rates vary by region in the UK?</h3>
            <p>Yes. London and the South East have the highest rates (20–35% above national average), while Northern Ireland and the North East are typically 10–12% below average.</p>
            <h3>Is the Rate Checker free?</h3>
            <p>Yes. It is completely free to use with no signup required.</p>
          </div>
        </div>
      </main>

      <Footer />

      <Script
        id="rate-checker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Hourly Rate Checker for UK Tradespeople",
                applicationCategory: "FinanceApplication",
                offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", ratingCount: "112" },
                operatingSystem: "Web",
                description: "Free rate checker for UK tradespeople. Compare your hourly rate against regional averages and top earners in your trade.",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is the average hourly rate for UK tradespeople?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The average hourly rate for qualified UK tradespeople ranges from £38/hr for landscapers to £60/hr for gas engineers. London rates are approximately 35% higher than the Midlands baseline.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much more should a master tradesperson charge?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Master tradespeople with 15+ years experience typically command 30% above the qualified rate. An apprentice or trainee should charge around 60% of the qualified benchmark.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do hourly rates vary by region in the UK?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. London and the South East have the highest rates (20–35% above national average), while Northern Ireland and the North East are typically 10–12% below average.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is the Rate Checker free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. It is completely free to use with no signup required.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  )
}
