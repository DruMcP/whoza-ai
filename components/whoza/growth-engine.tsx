"use client"

import { motion } from "framer-motion"
import { Eye, TrendingUp, Target, CheckCircle2, ArrowRight, Zap } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function GrowthEngine() {
  const { config } = useLocale()

  return (
    <section className="py-20 lg:py-32 bg-[var(--navy-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Weekly AI Recommendation Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--claire-amber)]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[var(--claire-amber)]" />
                </div>
                <div>
                  <div className="text-white font-semibold">This Week&apos;s AI Recommendation</div>
                  <div className="text-white/50 text-sm">From Rex — Your Growth Advisor</div>
                </div>
              </div>

              {/* Action Items */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <Target className="w-3 h-3 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">You&apos;re not appearing in AI recommendations for your area</div>
                      <div className="text-red-400 text-xs mt-1 font-medium">→ Issue: Profile data missing key signals</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-[var(--claire-amber)]/10 border border-[var(--claire-amber)]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--claire-amber)]/20 flex items-center justify-center shrink-0">
                      <Eye className="w-3 h-3 text-[var(--claire-amber)]" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Competitor X has more reviews and stronger profile data</div>
                      <div className="text-[var(--claire-amber)] text-xs mt-1 font-medium">→ Action: Improve review count + get more jobs</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--rex-green)]/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3 h-3 text-[var(--rex-green)]" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">You need 5 more reviews to outrank competitors this week</div>
                      <div className="text-[var(--rex-green)] text-xs mt-1 font-medium">→ Result: Get found, more calls, more jobs</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-[var(--katie-blue)]" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Top recommendation: Add 3 more jobs to your portfolio</div>
                      <div className="text-[var(--katie-blue)] text-xs mt-1 font-medium">→ Result: Stronger AI recommendations in 7 days</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Revenue Connection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">The Result</div>
                <div className="text-white font-bold">More visibility → more calls → more booked jobs</div>
              </motion.div>
            </div>

            {/* Action Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--claire-amber)] text-white text-sm font-bold shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Delivered every Monday
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--claire-amber)]/20 text-[var(--claire-amber)] text-sm font-bold mb-6">
              <Eye className="w-4 h-4" />
              Rex — Your Growth Advisor
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Get More Work Every Week{" "}
              <span className="text-[var(--claire-amber)]">— Without Ads</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 text-pretty">
              When customers ask ChatGPT or Google AI for a tradesperson, Rex helps make sure your business is the one recommended.
              <span className="block mt-2 font-semibold text-white">Rex tells you what to fix this week so you get more calls and more jobs.</span>
            </p>

            <div className="mt-10 space-y-4">
              {[
                { text: "Monthly competitor analysis on every plan", color: "text-[var(--rex-green)]" },
                { text: "Weekly AI visibility actions from Growth upwards", color: "text-[var(--claire-amber)]" },
                { text: "Advanced Rex reporting on Pro and Scale", color: "text-[var(--katie-blue)]" },
                { text: "Multi-location intelligence on Scale", color: "text-white" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <ArrowRight className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* System Position */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Part of the Whoza System</div>
              <div className="flex flex-wrap gap-2">
                {["Capture", "Convert", "Deliver", "Amplify"].map((step) => (
                  <span key={step} className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm">
                    {step}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-[var(--claire-amber)]/20 text-[var(--claire-amber)] text-sm font-bold">
                  Grow
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--claire-amber)]/10 border border-[var(--claire-amber)]/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--claire-amber)]" />
                <span className="font-semibold text-white">Every plan includes monthly competitor analysis</span>
              </div>
              <p className="text-sm text-white/60">Growth and above unlock weekly actionable AI visibility insights that show what to fix so AI search and customers are more likely to recommend your business.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
