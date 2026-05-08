"use client"

// v2.1 - Updated priming stats + UK defaults
import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Phone, PoundSterling, DollarSign, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useLocale } from "@/lib/locale-context"

// Job value examples by trade and location
const jobExamples = {
  uk: {
    hint: "Typical plumbing call-out in the UK: £180–£350",
    minValue: 50,
    maxValue: 2000,
    defaultValue: 280,
  },
  us: {
    hint: "Typical HVAC call in Dallas: $150–$400",
    minValue: 75,
    maxValue: 3000,
    defaultValue: 300,
  },
}

export function LostRevenueCalculator() {
  const { country, config } = useLocale()
  const jobConfig = jobExamples[country]
  
  const [missedCalls, setMissedCalls] = useState([6])
  const [avgJobValue, setAvgJobValue] = useState([jobConfig.defaultValue])
  const [conversionRate, setConversionRate] = useState([35])

  const weeklyLoss = missedCalls[0] * (avgJobValue[0] * (conversionRate[0] / 100))
  const monthlyLoss = weeklyLoss * 4
  const yearlyLoss = monthlyLoss * 12

  return (
    <section id="calculator" className="py-28 lg:py-44 bg-gradient-to-b from-red-50 via-red-50/50 to-[var(--off-white)] relative">
      {/* Transition Bridge — responsive sizing */}
      <div className="absolute top-3 sm:top-4 lg:top-6 left-1/2 -translate-x-1/2 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3.5 rounded-full bg-[var(--navy-900)] text-white text-sm sm:text-base lg:text-lg font-bold shadow-xl border-2 sm:border-4 border-white z-10 text-center whitespace-nowrap sm:whitespace-normal max-w-[calc(100vw-2rem)] truncate sm:truncate-none">
        What are missed calls costing you?
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Priming Stats — real UK trade data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--navy-900)]">62%</div>
              <p className="text-sm text-[var(--slate-500)] mt-2">of calls to small trade businesses go unanswered</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--navy-900)]">85%</div>
              <p className="text-sm text-[var(--slate-500)] mt-2">of callers who hit voicemail won't call back</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--navy-900)]">78%</div>
              <p className="text-sm text-[var(--slate-500)] mt-2">of customers hire whoever responds first</p>
            </div>
          </div>
          <p className="text-center text-xs text-[var(--slate-400)] mt-3">
            Sources: UK micro-business survey 2025, AlwaysOnBooking 2026, JP Automations 2026
          </p>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] text-sm font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            The numbers don't lie
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            What Are Missed Calls{" "}
            <span className="text-[var(--rex-green)]">Costing You?</span>
          </h2>
          <p className="mt-6 text-xl text-[var(--slate-500)] text-pretty">
            One missed enquiry can be a lost quote, a call-out, or a full day's work.
            <span className="font-semibold text-[var(--navy-900)]"> Use the calculator to see your number.</span>
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-[var(--border)] overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--katie-blue)]/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--navy-900)]">Lost Jobs Calculator</h3>
                    <p className="text-sm text-[var(--slate-500)]">Adjust the sliders to match your business</p>
                  </div>
                </div>

                {/* Missed Calls Per Week */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--navy-900)]">
                      <Phone className="w-4 h-4 text-[var(--slate-500)]" />
                      Missed calls per week
                    </label>
                    <span className="text-lg font-bold text-[var(--katie-blue)]">{missedCalls[0]}</span>
                  </div>
                  <Slider
                    value={missedCalls}
                    onValueChange={setMissedCalls}
                    max={50}
                    min={1}
                    step={1}
                    className="[&_[role=slider]]:bg-[var(--katie-blue)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--katie-blue)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--slate-500)]">
                    <span>1 call</span>
                    <span>50 calls</span>
                  </div>
                </div>

                {/* Average Job Value */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--navy-900)]">
                      {country === "uk" ? (
                        <PoundSterling className="w-4 h-4 text-[var(--slate-500)]" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-[var(--slate-500)]" />
                      )}
                      Average job value
                    </label>
                    <span className="text-lg font-bold text-[var(--rex-green)]">{config.currencySymbol}{avgJobValue[0]}</span>
                  </div>
                  <Slider
                    value={avgJobValue}
                    onValueChange={setAvgJobValue}
                    max={jobConfig.maxValue}
                    min={jobConfig.minValue}
                    step={25}
                    className="[&_[role=slider]]:bg-[var(--rex-green)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--rex-green)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--slate-500)]">
                    <span>{config.currencySymbol}{jobConfig.minValue}</span>
                    <span>{config.currencySymbol}{jobConfig.maxValue.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-[var(--katie-blue)] italic">{jobConfig.hint}</p>
                </div>

                {/* Conversion Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--navy-900)]">
                      <TrendingUp className="w-4 h-4 text-[var(--slate-500)]" />
                      Call-to-job conversion rate
                    </label>
                    <span className="text-lg font-bold text-[var(--claire-amber)]">{conversionRate[0]}%</span>
                  </div>
                  <Slider
                    value={conversionRate}
                    onValueChange={setConversionRate}
                    max={100}
                    min={10}
                    step={5}
                    className="[&_[role=slider]]:bg-[var(--claire-amber)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--claire-amber)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--slate-500)]">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-[var(--navy-900)] p-6 sm:p-8 lg:p-10 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-8">Your Lost Revenue</h3>
                
                <div className="flex-1 space-y-6">
                  <ResultCard 
                    label="Weekly Loss"
                    value={weeklyLoss}
                    color="white/60"
                    country={country}
                  />
                  <ResultCard 
                    label="Monthly Loss"
                    value={monthlyLoss}
                    color="white/80"
                    highlight
                    country={country}
                  />
                  <ResultCard 
                    label="Yearly Loss"
                    value={yearlyLoss}
                    color="red-400"
                    isYearly
                    country={country}
                  />
                </div>

                <p className="mt-4 text-sm text-red-400 font-semibold text-center">
                  That&apos;s money walking out the door to your competitor.
                </p>

                <p className="mt-3 text-sm text-white/80 font-semibold text-center">
                  One recovered job per month pays for Whoza.
                </p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-4">
                    Stop the leak. Katie answers every call from just{" "}
                    <span className="text-white font-semibold">
                      {config.currencySymbol}{config.pricing.starter}/month <span className="text-xs">+VAT</span>
                    </span>
                  </p>
                  <a 
                    href="#final-cta"
                    className="inline-flex items-center justify-center w-full rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold py-6 text-lg transition-colors"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ResultCard({ 
  label, 
  value, 
  color, 
  highlight = false, 
  isYearly = false,
  country = "uk"
}: { 
  label: string
  value: number
  color: string
  highlight?: boolean
  isYearly?: boolean
  country?: "uk" | "us"
}) {
  const formattedValue = new Intl.NumberFormat(country === "uk" ? "en-GB" : "en-US", {
    style: "currency",
    currency: country === "uk" ? "GBP" : "USD",
    maximumFractionDigits: 0,
  }).format(value)

  const monthlyPrice = country === "uk" ? 69 : 89

  return (
    <div className={`p-4 rounded-2xl ${highlight ? "bg-white/10" : "bg-white/5"}`}>
      <div className="text-sm text-white/60 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${isYearly ? "text-red-400" : "text-white"}`}>
        {formattedValue}
      </div>
      {isYearly && (
        <div className="mt-2 text-xs text-red-400/80">
          Recover just 1 job per month and Whoza pays for itself
        </div>
      )}
    </div>
  )
}
