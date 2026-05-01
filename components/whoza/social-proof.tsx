"use client"

import { motion } from "framer-motion"
import { Shield, Award, CheckCircle2 } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const badgesConfig = {
  uk: [
    { name: "ICO Registered", icon: Shield },
    { name: "GDPR Compliant", icon: CheckCircle2 },
    { name: "Gas Safe Partner", icon: Award },
    { name: "NICEIC Approved", icon: Award },
    { name: "FMB Member", icon: Award },
  ],
  us: [
    { name: "SOC 2 Compliant", icon: Shield },
    { name: "CCPA Compliant", icon: CheckCircle2 },
    { name: "BBB Accredited", icon: Award },
    { name: "Licensed & Insured", icon: Award },
  ],
}

const tradesConfig = {
  uk: ["Plumbers", "Electricians", "Builders", "Roofers", "Painters", "Landscapers", "HVAC Engineers", "Carpenters"],
  us: ["HVAC", "Roofing", "Plumbing", "Electrical", "Remodeling", "Landscaping", "General Contractors", "Flooring"],
}

export function SocialProofBand() {
  const { country } = useLocale()
  const badges = badgesConfig[country]

  return (
    <section className="py-8 bg-[var(--off-white)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-[var(--slate-500)]"
              >
                <badge.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{badge.name}</span>
              </motion.div>
            ))}
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
              key={trade}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)]"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
              <span className="text-sm font-medium text-[var(--navy-900)]">{trade}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsBand() {
  const { country, config } = useLocale()
  
  const stats = [
    { value: "47,000+", label: "Calls Handled Monthly", colorClass: "text-[var(--katie-blue)]" },
    { value: country === "uk" ? "£2.3M" : "$3.1M", label: "Revenue Saved for Customers", colorClass: "text-[var(--rex-green)]" },
    { value: "8 seconds", label: "Average Answer Time", colorClass: "text-[var(--claire-amber)]" },
    { value: "99.7%", label: "Uptime Guarantee", colorClass: "text-[var(--mark-grey)]" },
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
