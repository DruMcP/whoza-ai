"use client"

import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { TradeData } from "@/lib/trades"
import { locations } from "@/lib/locations"

interface TradeLocationsProps {
  tradeData: TradeData
}

export function TradeLocations({ tradeData }: TradeLocationsProps) {
  // Find all locations that include this trade
  const relatedLocs = locations.filter(
    (loc) =>
      loc.trades?.some(
        (t) =>
          t.toLowerCase() === tradeData.singular.toLowerCase() ||
          t.toLowerCase() === tradeData.plural.toLowerCase()
      )
  )

  // Also include all UK locations for broader reach
  const ukLocations = locations.filter((loc) => loc.country === "uk")

  const displayLocations =
    relatedLocs.length > 0 ? relatedLocs : ukLocations

  return (
    <section className="py-16 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-[var(--navy-900)]"
          >
            AI Call Handling for {tradeData.display} Across the UK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-[var(--slate-500)]"
          >
            Localised pages for {tradeData.plural} in major UK cities
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayLocations.map((loc, i) => (
            <motion.a
              key={loc.slug}
              href={`/${loc.slug}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[var(--katie-blue)]/30 hover:shadow-sm transition-all group"
            >
              <MapPin className="w-4 h-4 text-[var(--slate-400)] group-hover:text-[var(--katie-blue)] transition-colors" />
              <span className="text-sm text-[var(--navy-900)] group-hover:text-[var(--katie-blue)] transition-colors">
                {loc.city}
              </span>
              <ArrowRight className="w-3 h-3 text-[var(--slate-300)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
