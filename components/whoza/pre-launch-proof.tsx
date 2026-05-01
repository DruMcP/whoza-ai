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
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">10 missed calls in a day</div>
                    <div className="text-[var(--slate-500)]">While you were on site, in the van, or finishing a job</div>
                  </div>
                </div>

                <div className="border-l-2 border-dashed border-[var(--slate-200)] ml-6 h-8" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Katie answers them all</div>
                    <div className="text-[var(--slate-500)]">Qualifies the job, books if possible, filters time-wasters</div>
                  </div>
                </div>

                <div className="border-l-2 border-dashed border-[var(--slate-200)] ml-6 h-8" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)]/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-[var(--rex-green)]">4</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">4 real jobs identified</div>
                    <div className="text-[var(--slate-500)]">Sent to your phone via WhatsApp, ready to accept</div>
                  </div>
                </div>

                <div className="border-l-2 border-dashed border-[var(--slate-200)] ml-6 h-8" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--rex-green)] flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-white">{config.currencySymbol}</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--navy-900)]">Average job {config.currencySymbol}120</div>
                    <div className="text-[var(--slate-500)]">You accept 4 jobs = <span className="font-bold text-[var(--rex-green)]">{config.currencySymbol}480 recovered</span></div>
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
              <div className="text-white/60 mb-2">Daily recovery potential</div>
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
                    At {config.currencySymbol}59/month with {config.currencySymbol}120 avg jobs, you only need 1 extra job to break even.
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
