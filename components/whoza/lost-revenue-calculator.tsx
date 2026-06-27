"use client"

// v2.1 - Updated priming stats + UK defaults
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calculator, Phone, PoundSterling, TrendingUp, ArrowRight, PhoneMissed, Voicemail, Zap } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { trackCalculatorLead, trackCalculatorUse } from "@/lib/gtag"
import { WaitlistModal } from "./waitlist-modal"
import { trackCTA } from "@/lib/gtag"

// Job value examples by trade and location
const jobExamples: Record<string, { hint: string; minValue: number; maxValue: number; defaultValue: number }> = {
  default: {
    hint: "Typical plumbing call-out in the UK: £180-£350",
    minValue: 50,
    maxValue: 2000,
    defaultValue: 280,
  },
  electrician: {
    hint: "Typical electrical call-out in the UK: £150-£300",
    minValue: 75,
    maxValue: 2000,
    defaultValue: 220,
  },
}

interface LostRevenueCalculatorProps {
  trade?: string
}

export function LostRevenueCalculator({ trade }: LostRevenueCalculatorProps) {
  const tradeKey = trade && jobExamples[trade] ? trade : "default"
  const jobConfig = jobExamples[tradeKey]

  const [missedCalls, setMissedCalls] = useState([6])
  const [avgJobValue, setAvgJobValue] = useState([jobConfig.defaultValue])
  const [conversionRate, setConversionRate] = useState([35])

  const [showWaitlist, setShowWaitlist] = useState(false)

  const weeklyLoss = missedCalls[0] * (avgJobValue[0] * (conversionRate[0] / 100))
  const monthlyLoss = weeklyLoss * 4
  const yearlyLoss = monthlyLoss * 12

  // Email gate state
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("whoza_calc_email")
      if (saved) {
        try {
          const data = JSON.parse(saved)
          if (data.email && data.timestamp && Date.now() - data.timestamp < 30 * 24 * 60 * 60 * 1000) {
            setEmail(data.email)
            setEmailSubmitted(true)
          }
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email")
      return
    }
    setIsSubmitting(true)
    // Track lead in GA4
    trackCalculatorLead(email)
    // Store in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("whoza_calc_email", JSON.stringify({ email, timestamp: Date.now() }))
    }
    setTimeout(() => {
      setEmailSubmitted(true)
      setIsSubmitting(false)
    }, 600)
  }

  // Animated number states
  const [animatedWeekly, setAnimatedWeekly] = useState(0)
  const [animatedMonthly, setAnimatedMonthly] = useState(0)
  const [animatedYearly, setAnimatedYearly] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Number animation when results come into view
  useEffect(() => {
    const el = resultsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          trackCalculatorUse()
          animateNumber(setAnimatedWeekly, 0, weeklyLoss, 800)
          animateNumber(setAnimatedMonthly, 0, monthlyLoss, 1000)
          animateNumber(setAnimatedYearly, 0, yearlyLoss, 1200)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [weeklyLoss, monthlyLoss, yearlyLoss, hasAnimated])

  // Update animated values when slider changes (after initial animation)
  useEffect(() => {
    if (hasAnimated) {
      setAnimatedWeekly(weeklyLoss)
      setAnimatedMonthly(monthlyLoss)
      setAnimatedYearly(yearlyLoss)
    }
  }, [missedCalls, avgJobValue, conversionRate, hasAnimated, weeklyLoss, monthlyLoss, yearlyLoss])

  return (
    <section id="calculator" className="py-28 lg:py-44 bg-gradient-to-b from-red-50 via-red-50/50 to-[var(--off-white)] relative">
      {/* Transition Bridge - responsive sizing */}
      <div className="absolute top-3 sm:top-4 lg:top-6 left-1/2 -translate-x-1/2 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3.5 rounded-full bg-[var(--navy-900)] text-white text-sm sm:text-base lg:text-lg font-bold shadow-xl border-2 sm:border-4 border-white z-10 text-center whitespace-nowrap sm:whitespace-normal max-w-[calc(100vw-2rem)] truncate sm:truncate-none">
        What are missed calls costing you?
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Priming Stats - real UK trade data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal-stagger">
            {[
              { pct: "62%", text: "of calls to small trade businesses go unanswered", icon: PhoneMissed },
              { pct: "85%", text: "of callers who hit voicemail won't call back", icon: Voicemail },
              { pct: "78%", text: "of customers hire whoever responds first", icon: Zap },
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={stat.pct}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-6 text-center shadow-md border border-[var(--border)] hover:shadow-lg hover:border-[var(--katie-blue)]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--katie-blue)]/10 flex items-center justify-center mx-auto mb-3">
                    <StatIcon className="w-5 h-5 text-[var(--katie-blue)]" />
                  </div>
                  <div className="text-3xl font-bold text-[var(--navy-900)]">{stat.pct}</div>
                  <p className="text-sm text-[var(--slate-500)] mt-2">{stat.text}</p>
                </motion.div>
              )
            })}
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
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
          <div className="bg-white rounded-xl shadow-xl border border-[var(--border)] overflow-hidden">
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
                      <PoundSterling className="w-4 h-4 text-[var(--slate-500)]" />
                      Average job value
                    </label>
                    <span className="text-lg font-bold text-[var(--rex-green)]">£{avgJobValue[0]}</span>
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
                    <span>£{jobConfig.minValue}</span>
                    <span>£{jobConfig.maxValue.toLocaleString()}</span>
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
              <div ref={resultsRef} className="bg-[var(--navy-900)] p-6 sm:p-8 lg:p-10 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-8">Your Lost Revenue</h3>

                <div className="flex-1 space-y-6">
                  {/* Weekly loss - always visible (the hook) */}
                  <ResultCard
                    label="Weekly Loss"
                    value={animatedWeekly}
                    color="white/60"
                  />

                  {/* Monthly + Yearly - gated behind email */}
                  {!emailSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/5 rounded-2xl p-5 border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="w-4 h-4 text-[var(--katie-blue)]" />
                        <span className="text-sm font-semibold text-white/90">See your monthly & yearly loss</span>
                      </div>
                      <p className="text-xs text-white/50 mb-4">
                        Enter your email to unlock the full breakdown + get a free recovery report.
                      </p>
                      <form onSubmit={handleEmailSubmit} className="space-y-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
                          placeholder="e.g. john@smithplumbing.co.uk"
                          aria-label="Email address for recovery report"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--katie-blue)]"
                          required
                        />
                        {emailError && (
                          <p className="text-xs text-red-400">{emailError}</p>
                        )}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 rounded-lg bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/80 text-white font-semibold text-sm transition-colors disabled:opacity-60"
                        >
                          {isSubmitting ? "Unlocking..." : "Get my recovery report"}
                        </button>
                      </form>
                      <p className="text-[10px] text-white/30 mt-2 text-center">
                        No spam. Unsubscribe anytime. We hate cold emails too.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <ResultCard
                        label="Monthly Loss"
                        value={animatedMonthly}
                        color="white/80"
                        highlight
                      />
                      <ResultCard
                        label="Yearly Loss"
                        value={animatedYearly}
                        color="red-400"
                        isYearly
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center"
                      >
                        <p className="text-xs text-emerald-400 font-medium">
                          ✉ Recovery report sent to {email}
                        </p>
                      </motion.div>
                    </>
                  )}
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
                      £59/month
                    </span>
                  </p>
                  <button
                    onClick={() => { trackCTA("Start free trial", "calculator"); setShowWaitlist(true); }}
                    className="btn-primary inline-flex items-center justify-center w-full rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold py-6 text-lg transition-colors cursor-pointer border-none"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} source="calculator" />}
    </section>
  )
}

function ResultCard({
  label,
  value,
  color,
  highlight = false,
  isYearly = false,
}: {
  label: string
  value: number
  color: string
  highlight?: boolean
  isYearly?: boolean
}) {
  const formattedValue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value)

  const monthlyPrice = 69

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

// Animate number counting up
function animateNumber(
  setter: (val: number) => void,
  start: number,
  target: number,
  duration: number
) {
  const startTime = performance.now()
  function step(timestamp: number) {
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setter(Math.floor(start + (target - start) * eased))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
