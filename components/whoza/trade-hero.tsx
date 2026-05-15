"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle2, PhoneCall, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradeData } from "@/lib/trades"

interface TradeHeroProps {
  tradeData: TradeData
}

export function TradeHero({ tradeData }: TradeHeroProps) {
  const jobsThisWeek = Math.floor(Math.random() * 60) + 80

  return (
    <section className="relative min-h-screen bg-[var(--navy-900)] overflow-hidden pt-20 lg:pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--katie-blue)]/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--rex-green)]/15 rounded-full blur-[100px] opacity-40" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Trade Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/20 border border-[var(--rex-green)]/30 mb-6"
            >
              <PhoneCall className="w-4 h-4 text-[var(--rex-green)]" />
              <span className="text-sm text-white font-medium">
                {jobsThisWeek}+ {tradeData.plural} enquiries captured this week
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              {tradeData.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              {tradeData.subheadline}
              <span className="block mt-2 text-white font-semibold">Installed in 30 minutes. No credit card required.</span>
            </p>

            {/* Local Proof */}
            <div className="mt-6 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <TrendingUp className="w-4 h-4 text-[var(--claire-amber)]" />
                <span>Demand for {tradeData.plural} is at an all-time high</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8 py-6 text-lg gap-2 group"
              >
                Start Free 7-Day Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white/10 text-white/40 hover:bg-transparent hover:text-white/40 px-8 py-6 text-lg gap-2 cursor-default"
                disabled
                aria-label="Audio demo coming soon"
              >
                <Play className="w-5 h-5 opacity-40" />
                Audio demo — coming soon
              </Button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/60">
              {[
                "No credit card required", 
                "Cancel anytime", 
                "Live in 30 minutes"
              ].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Key Benefits Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Why {tradeData.display} Choose Whoza
              </h3>
              <div className="space-y-4">
                {tradeData.solutionStatements.slice(0, 4).map((solution, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--katie-blue)]" />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{solution}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Average missed call value</span>
                  <span className="text-white font-semibold">
                    {tradeData.stats.find(s => s.label.includes("missed") || s.label.includes("Average"))?.value || "£200+"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--off-white)] to-transparent" />
    </section>
  )
}
