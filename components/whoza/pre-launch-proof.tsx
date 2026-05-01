"use client"

import { motion } from "framer-motion"
import { Phone, CheckCircle2, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"

export function PreLaunchProof() {
  const { config } = useLocale()

  return (
    <section className="py-20 lg:py-32 bg-[var(--off-white)]">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
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
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-xs font-bold">
                  EXAMPLE SCENARIO
                </span>
              </div>

              {/* Flow */}
              <div className="space-y-2">
                {/* Step 1: 10 missed calls */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">10 missed calls</div>
                    <div className="text-[var(--slate-500)]">While you were on site, in the van, or finishing a job</div>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-6" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--katie-blue)] uppercase tracking-wider">Missed calls → Jobs booked</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-6" />
                </div>

                {/* Step 2: 4 booked jobs */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">4 booked jobs</div>
                    <div className="text-[var(--slate-500)]">Qualified, sent to your phone via WhatsApp, ready to accept</div>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-6" />
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <ArrowRight className="w-4 h-4 text-[var(--slate-300)] rotate-90" />
                  <span className="text-xs font-bold text-[var(--rex-green)] uppercase tracking-wider">Jobs → Money recovered</span>
                </div>
                <div className="flex items-center ml-6">
                  <div className="border-l-2 border-dashed border-[var(--slate-200)] h-6" />
                </div>

                {/* Step 3: £480 recovered */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-white">{config.currencySymbol}480</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">{config.currencySymbol}480 recovered</div>
                    <div className="text-[var(--slate-500)]">4 jobs at {config.currencySymbol}120 average = <span className="font-bold text-[var(--rex-green)]">{config.currencySymbol}480 in one day</span></div>
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
            <div className="bg-[var(--navy-900)] rounded-3xl p-8 text-center">
              <div className="text-white/60 mb-2">What you get back in a day</div>
              <div className="text-5xl lg:text-6xl font-bold text-[var(--rex-green)]">
                {config.currencySymbol}480
              </div>
              <div className="text-white/60 mt-2">from just 10 missed calls</div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
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
                    Most customers recover their monthly cost in their first few jobs.
                  </div>
                  <div className="text-[var(--slate-500)] text-sm mt-1">
                    At {config.currencySymbol}59/month ex VAT with {config.currencySymbol}120 avg jobs, you only need 1 extra job to break even.
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                size="lg"
                className="bg-[var(--rex-green)] hover:bg-[var(--rex-green)]/90 text-white font-bold px-10 py-6 text-lg gap-3 shadow-xl shadow-[var(--rex-green)]/30 transition-all hover:scale-105"
              >
                Get 10 Free Booked Jobs
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
