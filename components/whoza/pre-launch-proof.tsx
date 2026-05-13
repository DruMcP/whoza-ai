"use client"

import { motion } from "framer-motion"
import { Phone, CheckCircle2, ArrowRight, Zap, MessageSquare, Star, BarChart3, Target } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function PreLaunchProof() {
  const { config } = useLocale()

  return (
    <section className="section-padding-lg bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-bold mb-4">
            <Zap className="w-4 h-4" />
            What This Looks Like in Practice
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
            A Typical Day{" "}
            <span className="text-[var(--rex-green)]">With Whoza</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Example Scenario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-8 shadow-xl border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-xs font-bold">
                  EXAMPLE SCENARIO
                </span>
                <span className="text-xs text-[var(--slate-500)">Example based on typical trades</span>
              </div>
              
              <p className="text-sm text-[var(--slate-500)] mb-4">Typical for many trades. Projections based on industry averages.</p>

              {/* Flow */}
              <div className="space-y-2">
                {/* Step 1: Calls captured */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Calls captured</div>
                    <div className="text-[var(--slate-500)]">Whoza answers every call</div>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--katie-blue)] uppercase tracking-wider">Katie answers</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>

                {/* Step 2: Enquiries booked */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[var(--rex-green)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Enquiries booked</div>
                    <div className="text-[var(--slate-500)]">Real enquiries sent to your phone</div>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--rex-green)] uppercase tracking-wider">Job confirmed</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>

                {/* Step 3: Reviews collected */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--claire-amber)]/10 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-[var(--claire-amber)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Reviews collected</div>
                    <div className="text-[var(--slate-500)]">Claire requests 5-star reviews</div>
                  </div>
                </div>

                {/* Arrow 3 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--claire-amber)] uppercase tracking-wider">Claire follows up</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>

                {/* Step 4: Competitors analysed */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)]/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-[var(--rex-green)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Competitors analysed</div>
                    <div className="text-[var(--slate-500)]">Rex checks who is winning locally</div>
                  </div>
                </div>

                {/* Arrow 4 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--rex-green)] uppercase tracking-wider">Rex compares</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-4" />
                </div>

                {/* Step 5: Actions recommended */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)] flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Actions recommended</div>
                    <div className="text-[var(--slate-500)]">Rex tells you what to fix next</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result + WhatsApp confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Result Card */}
            <div className="bg-[var(--navy-900)] rounded-xl p-8 text-center">
              <div className="text-white/60 mb-2">Example: What you could recover in a day</div>
              <div className="text-5xl lg:text-6xl font-bold text-[var(--rex-green)]">
                {config.currencySymbol}480
              </div>
              <div className="text-white/60 mt-2">from 10 missed calls (illustrative)</div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-2xl font-bold text-white">{config.currencySymbol}2,400</div>
                  <div className="text-xs text-white/50">per week</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-2xl font-bold text-white">{config.currencySymbol}9,600</div>
                  <div className="text-xs text-white/50">per month</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--rex-green)]/20">
                  <div className="text-2xl font-bold text-[var(--rex-green)]">{config.currencySymbol}115k</div>
                  <div className="text-xs text-white/50">per year</div>
                </div>
              </div>
            </div>

            {/* Recovery message */}
            <div className="bg-[var(--rex-green)]/10 rounded-2xl p-6 border border-[var(--rex-green)]/20">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--rex-green)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--navy-900)]">
                    Most trades break even with just 1 extra job per month.
                  </div>
                  <div className="text-[var(--slate-500)] text-sm mt-1">
                    At {config.currencySymbol}59/month with {config.currencySymbol}120 average job value, one extra booking covers your cost.
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a 
              href="#final-cta"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-10 py-6 text-lg gap-3 shadow-xl shadow-[var(--rex-green)]/30 transition-all hover:scale-105"
            >
              Get Katie answering my calls
              <ArrowRight className="w-5 h-5" />
            </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
