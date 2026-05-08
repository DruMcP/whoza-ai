"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/lib/locale-context"

const tradesConfig = {
  uk: [
    { name: "Plumbers", icon: "🔧" },
    { name: "Electricians", icon: "⚡" },
    { name: "Roofers", icon: "🏠" },
    { name: "Locksmiths", icon: "🔐" },
    { name: "Drainage", icon: "🌊" },
    { name: "Landscapers", icon: "🌳" },
    { name: "Pest Control", icon: "🐜" },
    { name: "Cleaners", icon: "🧹" },
    { name: "Heating Engineers", icon: "🔥" },
    { name: "Builders", icon: "🔨" },
  ],
  us: [
    { name: "Plumbers", icon: "🔧" },
    { name: "Electricians", icon: "⚡" },
    { name: "Roofers", icon: "🏠" },
    { name: "HVAC", icon: "❄️" },
    { name: "Landscapers", icon: "🌳" },
    { name: "Pest Control", icon: "🐜" },
    { name: "Cleaners", icon: "🧹" },
    { name: "General Contractors", icon: "🔨" },
    { name: "Painters", icon: "🎨" },
    { name: "Flooring", icon: "🏗️" },
  ],
}

export function SocialProofBand() {
  const { country } = useLocale()
  const trades = tradesConfig[country]

  return (
    <section className="py-6 bg-[var(--navy-900)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/40 uppercase tracking-wider font-medium mb-4"
        >
          Built for {country === "uk" ? "UK" : "US"} trades & home services
        </motion.p>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Fade edges on mobile */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--navy-900)] to-transparent z-10 sm:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--navy-900)] to-transparent z-10 sm:hidden" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {trades.map((trade, index) => (
              <motion.div
                key={trade.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default shrink-0"
              >
                <span className="text-lg leading-none">{trade.icon}</span>
                <span className="text-sm font-medium text-white/90 whitespace-nowrap">{trade.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function TrustBadgeBand() {
  const { country, config } = useLocale()
  const trades = tradesConfig[country]

  return (
    <section className="py-12 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-[var(--slate-500)] uppercase tracking-wider font-medium">
            Built for {country === "uk" ? "UK" : "US"} {config.language.tradesPeople}
          </p>
        </motion.div>

        {/* Trade Types Grid - No duplication */}
        <div className="flex flex-wrap justify-center gap-3">
          {trades.map((trade, index) => (
            <motion.div
              key={trade.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)]"
            >
              <span className="text-base">{trade.icon}</span>
              <span className="text-sm font-medium text-[var(--navy-900)]">{trade.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsBand() {
  const { country, config } = useLocale()
  
  // Micro proof signals instead of false aggregate claims
  const stats = [
    { value: "3 sec", label: "Answer Time", colorClass: "text-[var(--katie-blue)]" },
    { value: "24/7", label: "Always Working", colorClass: "text-[var(--rex-green)]" },
    { value: config.currencySymbol + "2–" + config.currencySymbol + "4", label: "Per Booked Job", colorClass: "text-[var(--claire-amber)]" },
    { value: "30 min", label: "Install Time", colorClass: "text-[var(--mark-grey)]" },
  ]

  return (
    <section className="py-16 bg-[var(--navy-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${stat.colorClass}`}>
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
