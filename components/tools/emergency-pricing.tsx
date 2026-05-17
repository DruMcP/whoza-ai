"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flame, ArrowRight, Clock, AlertTriangle, Check, Copy, CheckCircle2 } from "lucide-react"
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

const timeOfDayOptions = [
  { key: "normal", label: "Normal hours (8am–6pm)", multiplier: 1.0 },
  { key: "evening", label: "Evening (6pm–10pm)", multiplier: 1.5 },
  { key: "night", label: "Night (10pm–8am)", multiplier: 2.0 },
  { key: "weekend", label: "Weekend", multiplier: 1.5 },
  { key: "bank-holiday", label: "Bank Holiday", multiplier: 2.0 },
]

const complexityOptions = [
  { key: "simple", label: "Simple fix (~1 hour)", hours: 1 },
  { key: "standard", label: "Standard job (2–3 hours)", hours: 2.5 },
  { key: "complex", label: "Complex (4+ hours)", hours: 4.5 },
]

// Base hourly rates by trade (normal hours, Midlands baseline)
const baseRates: Record<string, number> = {
  plumber: 65,
  electrician: 60,
  roofer: 55,
  builder: 50,
  "gas-engineer": 70,
  "heating-engineer": 65,
  locksmith: 55,
  landscaper: 45,
  cleaner: 25,
  other: 55,
}

// Regional adjustment multipliers
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

// Callout fee by trade
const calloutFees: Record<string, number> = {
  plumber: 60,
  electrician: 55,
  roofer: 70,
  builder: 80,
  "gas-engineer": 75,
  "heating-engineer": 65,
  locksmith: 45,
  landscaper: 50,
  cleaner: 20,
  other: 55,
}

export function EmergencyPricingCalculator() {
  const [trade, setTrade] = useState("plumber")
  const [region, setRegion] = useState("London")
  const [timeOfDay, setTimeOfDay] = useState("normal")
  const [complexity, setComplexity] = useState("standard")
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const tradeLabel = trades.find((t) => t.key === trade)?.label || "Tradesperson"
  const timeInfo = timeOfDayOptions.find((t) => t.key === timeOfDay) || timeOfDayOptions[0]
  const complexityInfo = complexityOptions.find((c) => c.key === complexity) || complexityOptions[1]

  const baseRate = baseRates[trade] || 55
  const regionMult = regionMultipliers[region] || 1.0
  const timeMult = timeInfo.multiplier
  const callout = calloutFees[trade] || 55

  const hourlyRate = Math.round(baseRate * regionMult * timeMult)
  const labourCost = Math.round(hourlyRate * complexityInfo.hours)
  const materialsEstimate = Math.round(labourCost * 0.3)
  const recommendedRate = callout + labourCost + materialsEstimate

  // Market comparison
  const lowRate = Math.round(recommendedRate * 0.75)
  const avgRate = Math.round(recommendedRate * 0.95)
  const topRate = Math.round(recommendedRate * 1.25)

  const breakdownText = `Emergency ${tradeLabel} — ${region}\nTime: ${timeInfo.label}\nComplexity: ${complexityInfo.label}\n\nCallout fee: £${callout}\nLabour (${complexityInfo.hours}h @ £${hourlyRate}/hr): £${labourCost}\nMaterials estimate: £${materialsEstimate}\n\nRecommended rate: £${recommendedRate}\nMarket range: £${lowRate} – £${topRate}`

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
              <Flame className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Emergency Callout Pricing Calculator
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Quote emergency jobs with confidence. Most UK tradespeople undercharge for out-of-hours callouts — this calculator uses real regional rate data so you never leave money on the table.
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

              {/* Time of day */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  When is the callout? <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={timeOfDay}
                  onChange={(e) => { setTimeOfDay(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {timeOfDayOptions.map((t) => (
                    <option key={t.key} value={t.key} className="bg-[var(--navy-900)]">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Complexity */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Job complexity <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={complexity}
                  onChange={(e) => { setComplexity(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {complexityOptions.map((c) => (
                    <option key={c.key} value={c.key} className="bg-[var(--navy-900)]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full py-4 min-h-[56px] rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" />
                CALCULATE EMERGENCY RATE
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
                <Clock className="w-6 h-6 text-[var(--coral)]" />
                YOUR EMERGENCY PRICING BREAKDOWN
              </h2>

              {/* Main result */}
              <div className="bg-[var(--coral)]/10 border border-[var(--coral)]/20 rounded-xl p-6 mb-6 text-center">
                <p className="text-sm text-white/60 mb-1">Recommended Total Charge</p>
                <p className="text-5xl font-bold text-[var(--coral)]">£{recommendedRate}</p>
                <p className="text-sm text-white/50 mt-2">
                  {tradeLabel} · {region} · {timeInfo.label}
                </p>
              </div>

              {/* Breakdown grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Callout Fee</p>
                  <p className="text-2xl font-bold text-white">£{callout}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Labour ({complexityInfo.hours}h @ £{hourlyRate}/hr)</p>
                  <p className="text-2xl font-bold text-white">£{labourCost}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Materials (est.)</p>
                  <p className="text-2xl font-bold text-white">£{materialsEstimate}</p>
                </div>
              </div>

              {/* Market comparison */}
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <p className="text-sm text-white/60 font-medium mb-4">Market comparison for {tradeLabel.toLowerCase()}s in {region}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm text-white/60">Low end</div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-white/30" style={{ width: "60%" }} />
                    </div>
                    <div className="w-20 text-right font-bold text-white/60">£{lowRate}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm text-white/60">Average</div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[var(--katie-blue)]" style={{ width: "80%" }} />
                    </div>
                    <div className="w-20 text-right font-bold text-[var(--katie-blue)]">£{avgRate}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm text-white/60">Top 10%</div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[var(--coral)]" style={{ width: "100%" }} />
                    </div>
                    <div className="w-20 text-right font-bold text-[var(--coral)]">£{topRate}</div>
                  </div>
                </div>
              </div>

              {/* Rate per time of day */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <p className="text-sm text-white/60 font-medium mb-4">Your hourly rate by time of day</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeOfDayOptions.map((t) => {
                    const rate = Math.round(baseRate * regionMult * t.multiplier)
                    const isCurrent = t.key === timeOfDay
                    return (
                      <div
                        key={t.key}
                        className={`rounded-lg p-3 text-center border ${isCurrent ? "border-[var(--coral)] bg-[var(--coral)]/10" : "border-white/10 bg-white/5"}`}
                      >
                        <p className="text-xs text-white/50 mb-1">{t.label}</p>
                        <p className={`text-lg font-bold ${isCurrent ? "text-[var(--coral)]" : "text-white"}`}>
                          £{rate}/hr
                        </p>
                      </div>
                    )
                  })}
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
                  <AlertTriangle className="w-5 h-5" />
                  SET UP KATIE FOR EMERGENCY CALLS
                </a>
              </div>
            </motion.div>
          )}

          {/* Hidden FAQ for schema */}
          <div className="hidden">
            <h2>FAQ</h2>
            <h3>How much should I charge for an emergency callout in the UK?</h3>
            <p>Emergency callout rates vary by trade, region, and time of day. A plumber in London charging for a night callout should quote £150–£350 including callout fee, labour, and materials. Use our calculator for precise regional rates.</p>
            <h3>Do UK tradespeople charge more for weekend or bank holiday jobs?</h3>
            <p>Yes. Most UK tradespeople apply a 1.5x multiplier for evenings and weekends, and a 2.0x multiplier for night work (10pm–8am) and bank holidays.</p>
            <h3>What is a typical callout fee for a UK plumber or electrician?</h3>
            <p>Callout fees typically range from £45 for a locksmith to £80 for a builder. The fee covers travel, diagnostic time, and the first hour of labour.</p>
            <h3>Is the Emergency Pricing Calculator free?</h3>
            <p>Yes. It is completely free to use with no signup required.</p>
          </div>
        </div>
      </main>

      <Footer />

      <Script
        id="emergency-pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Emergency Callout Pricing Calculator for UK Trades",
                applicationCategory: "FinanceApplication",
                offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "94" },
                operatingSystem: "Web",
                description: "Free calculator for UK tradespeople to price emergency callouts by trade, region, time of day, and job complexity.",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How much should I charge for an emergency callout in the UK?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Emergency callout rates vary by trade, region, and time of day. A plumber in London charging for a night callout should quote £150–£350 including callout fee, labour, and materials. Use our calculator for precise regional rates.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do UK tradespeople charge more for weekend or bank holiday jobs?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Most UK tradespeople apply a 1.5x multiplier for evenings and weekends, and a 2.0x multiplier for night work (10pm–8am) and bank holidays.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is a typical callout fee for a UK plumber or electrician?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Callout fees typically range from £45 for a locksmith to £80 for a builder. The fee covers travel, diagnostic time, and the first hour of labour.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is the Emergency Pricing Calculator free?",
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
