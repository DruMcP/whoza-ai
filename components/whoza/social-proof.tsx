"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/lib/locale-context"

const tradesConfig = {
  uk: [
    { name: "Plumbers", description: "Emergency leaks, installs & repairs" },
    { name: "Electricians", description: "Wiring, faults & certificates" },
    { name: "Roofers", description: "Repairs, replacements & inspections" },
    { name: "Locksmiths", description: "Emergency entry & security" },
    { name: "Drainage", description: "Unblocking & CCTV surveys" },
    { name: "Landscapers", description: "Gardens, patios & maintenance" },
    { name: "Pest Control", description: "Rats, wasps & prevention" },
    { name: "Cleaners", description: "Domestic, end-of-tenancy & commercial" },
    { name: "Heating Engineers", description: "Boilers, servicing & breakdowns" },
    { name: "Builders", description: "Extensions, renovations & repairs" },
    { name: "Joiners", description: "Doors, staircases & bespoke woodwork" },
    { name: "Plasterers", description: "Skimming, boarding & repairs" },
    { name: "Tilers", description: "Bathrooms, kitchens & floors" },
    { name: "Carpenters", description: "Framing, fitted furniture & repairs" },
    { name: "Handymen", description: "Odd jobs, fixes & maintenance" },
  ],
  us: [
    { name: "Plumbers", description: "Emergency leaks, installs & repairs" },
    { name: "Electricians", description: "Wiring, faults & certificates" },
    { name: "Roofers", description: "Repairs, replacements & inspections" },
    { name: "HVAC", description: "Heating, cooling & servicing" },
    { name: "Landscapers", description: "Gardens, patios & maintenance" },
    { name: "Pest Control", description: "Rats, wasps & prevention" },
    { name: "Cleaners", description: "Domestic, end-of-tenancy & commercial" },
    { name: "General Contractors", description: "Renovations, builds & management" },
    { name: "Painters", description: "Interior, exterior & finishes" },
    { name: "Flooring", description: "Installation, repairs & refinishing" },
    { name: "Carpenters", description: "Framing, fitted furniture & repairs" },
    { name: "Plasterers", description: "Skimming, boarding & repairs" },
    { name: "Tilers", description: "Bathrooms, kitchens & floors" },
    { name: "Joiners", description: "Doors, staircases & bespoke woodwork" },
    { name: "Handymen", description: "Odd jobs, fixes & maintenance" },
  ],
}

export function SocialProofBand() {
  const { country } = useLocale()
  const trades = tradesConfig[country]

  return (
    <section className="py-6 bg-[var(--navy-900)] border-y border-white/10 dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          >
            {trades.map((trade, index) => (
                <motion.div
                  key={trade.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default shrink-0"
                >
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
    <section className="py-16 bg-[var(--navy-900)] dark-section">
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
