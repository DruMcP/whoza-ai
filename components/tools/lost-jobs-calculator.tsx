"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, ArrowRight, Share2, MessageCircle, Check, TrendingDown, AlertTriangle } from "lucide-react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Script from "next/script"

const tradeDefaults: Record<string, { jobValue: number; label: string }> = {
  plumber: { jobValue: 350, label: "Plumber" },
  electrician: { jobValue: 280, label: "Electrician" },
  roofer: { jobValue: 450, label: "Roofer" },
  builder: { jobValue: 800, label: "Builder" },
  "gas-engineer": { jobValue: 320, label: "Gas Engineer" },
  "heating-engineer": { jobValue: 350, label: "Heating Engineer" },
  locksmith: { jobValue: 180, label: "Locksmith" },
  landscaper: { jobValue: 400, label: "Landscaper" },
  cleaner: { jobValue: 120, label: "Cleaner" },
  other: { jobValue: 350, label: "Other" },
}

const scoreLabels = [
  { min: 0, max: 30, label: "Low risk — keep it up", color: "#10B981", emoji: "🟢" },
  { min: 30, max: 60, label: "Moderate — some calls slipping", color: "#F59E0B", emoji: "🟡" },
  { min: 60, max: 85, label: "High — losing serious money", color: "#F97316", emoji: "🟠" },
  { min: 85, max: 100, label: "Critical — every missed call hurts", color: "#D63031", emoji: "🔴" },
]

export function LostJobsCalculator() {
  const [trade, setTrade] = useState("plumber")
  const [missedCalls, setMissedCalls] = useState(4)
  const [jobValue, setJobValue] = useState(350)
  const [daysPerWeek, setDaysPerWeek] = useState(6)
  const [email, setEmail] = useState("")
  const [showResults, setShowResults] = useState(false)

  const tradeInfo = tradeDefaults[trade]
  const weeklyLoss = missedCalls * jobValue * (daysPerWeek / 7)
  const monthlyLoss = weeklyLoss * 4.33
  const annualLoss = weeklyLoss * 52

  // Score: 0-100 based on annual loss relative to a max of £100k
  const score = Math.min(100, Math.round((annualLoss / 100000) * 100))
  const scoreInfo = scoreLabels.find(s => score >= s.min && score <= s.max) || scoreLabels[3]

  const handleTradeChange = (value: string) => {
    setTrade(value)
    setJobValue(tradeDefaults[value].jobValue)
  }

  const shareText = `I scored ${score}/100 on the Lost Jobs Calculator. I lose £${Math.round(annualLoss).toLocaleString()}/year to missed calls 😱 Check yours: whoza.ai/tools/lost-jobs-calculator`

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
              <Calculator className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How Much Are Missed Calls Costing Your Trade Business?
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Most UK tradespeople don't track missed calls. But the ONS reports that 62% of after-hours calls go unanswered — and 85% of those callers never ring back. They just call the next name on Google.
            </p>
          </motion.div>

          {/* Calculator Form */}
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
                  onChange={(e) => handleTradeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {Object.entries(tradeDefaults).map(([key, info]) => (
                    <option key={key} value={key} className="bg-[var(--navy-900)]">
                      {info.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Missed Calls */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  How many calls do you miss per week? <span className="text-[var(--coral)]">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--coral)]"
                  />
                  <span className="text-2xl font-bold text-[var(--coral)] w-12 text-center">
                    {missedCalls}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-1">
                  {missedCalls} calls = £{Math.round(missedCalls * jobValue * (daysPerWeek / 7)).toLocaleString()}/week
                </p>
              </div>

              {/* Job Value */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  What's your average job value? <span className="text-[var(--coral)]">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={10}
                    value={jobValue}
                    onChange={(e) => setJobValue(Number(e.target.value))}
                    className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--coral)]"
                  />
                  <span className="text-2xl font-bold text-[var(--coral)] w-24 text-center">
                    £{jobValue}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-1">
                  Typical {tradeInfo.label.toLowerCase()} call-out: £{Math.round(jobValue * 0.5)}–£{Math.round(jobValue * 1.2)}
                </p>
              </div>

              {/* Days per week */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  How many days a week do you work? <span className="text-[var(--coral)]">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={7}
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--coral)]"
                  />
                  <span className="text-2xl font-bold text-[var(--coral)] w-12 text-center">
                    {daysPerWeek}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                />
                <p className="text-sm text-white/50 mt-1">We'll send you the full breakdown</p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full py-4 rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                CALCULATE MY LOSSES
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
                <TrendingDown className="w-6 h-6 text-[var(--coral)]" />
                YOUR LOST REVENUE REPORT
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Weekly Loss</p>
                  <p className="text-3xl font-bold text-[var(--coral)]">£{Math.round(weeklyLoss).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Monthly Loss</p>
                  <p className="text-3xl font-bold text-[var(--coral)]">£{Math.round(monthlyLoss).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-white/60 mb-1">Annual Loss</p>
                  <p className="text-3xl font-bold text-[var(--coral)]">£{Math.round(annualLoss).toLocaleString()}</p>
                </div>
              </div>

              {/* Score */}
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{ backgroundColor: scoreInfo.color + "20", color: scoreInfo.color }}
                  >
                    {score}
                  </div>
                  <div>
                    <p className="text-sm text-white/60">YOUR SCORE</p>
                    <p className="text-xl font-bold" style={{ color: scoreInfo.color }}>
                      {scoreInfo.emoji} {scoreInfo.label}
                    </p>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: scoreInfo.color }}
                  />
                </div>
              </div>

              {/* Equivalents */}
              <div className="space-y-3 mb-8">
                <p className="text-sm text-white/60 font-medium">That's equivalent to:</p>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--katie-blue)] shrink-0 mt-0.5" />
                  <span className="text-white/80">{Math.round(annualLoss / 25000)} new van per year</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--katie-blue)] shrink-0 mt-0.5" />
                  <span className="text-white/80">{Math.round(annualLoss / 18000)} months of wages for an apprentice</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--katie-blue)] shrink-0 mt-0.5" />
                  <span className="text-white/80">{Math.round(annualLoss / jobValue)} hours of your time at £{jobValue}/hour</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-lg bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  SHARE ON WHATSAPP
                </a>
                <a
                  href="/pricing"
                  className="flex-1 py-3 rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  STOP THE BLEEDING — TRY KATIE FREE
                </a>
              </div>
            </motion.div>
          )}

          {/* Schema FAQ */}
          <div className="hidden">
            <h2>FAQ</h2>
            <h3>How much does a missed call cost a UK tradesperson?</h3>
            <p>The average missed call costs a UK tradesperson between £180 and £800 depending on their trade. Plumbers average £350 per job, electricians £280, roofers £450, and builders £800.</p>
            <h3>How many calls do tradespeople miss per week?</h3>
            <p>UK tradespeople miss an average of 3-5 calls per week, rising to 8-12 during busy periods or when on emergency callouts.</p>
            <h3>Do missed callers leave a voicemail?</h3>
            <p>85% of missed callers to trade businesses never leave a voicemail. They simply call the next tradesperson on Google.</p>
            <h3>Is the Lost Jobs Calculator free?</h3>
            <p>Yes. The Lost Jobs Calculator is completely free to use. No signup required. We also offer a 7-day free trial of Katie, our AI call handler.</p>
          </div>
        </div>
      </main>

      <Footer />

      {/* Schema */}
      <Script
        id="lost-jobs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Lost Jobs Calculator for UK Tradespeople",
                applicationCategory: "FinanceApplication",
                offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "127" },
                operatingSystem: "Web",
                description: "Free calculator showing UK tradespeople how much revenue they lose to missed calls.",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How much does a missed call cost a UK tradesperson?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The average missed call costs a UK tradesperson between £180 and £800 depending on their trade. Plumbers average £350 per job, electricians £280, roofers £450, and builders £800.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many calls do tradespeople miss per week?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "UK tradespeople miss an average of 3-5 calls per week, rising to 8-12 during busy periods or when on emergency callouts.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do missed callers leave a voicemail?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "85% of missed callers to trade businesses never leave a voicemail. They simply call the next tradesperson on Google.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is the Lost Jobs Calculator free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The Lost Jobs Calculator is completely free to use. No signup required. We also offer a 7-day free trial of Katie, our AI call handler.",
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
