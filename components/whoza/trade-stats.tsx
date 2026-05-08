"use client"

import { motion } from "framer-motion"
import { TradeData } from "@/lib/trades"

interface TradeStatsProps {
  tradeData: TradeData
}

export function TradeStats({ tradeData }: TradeStatsProps) {
  return (
    <section className="py-12 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {tradeData.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
            >
              <div className="text-3xl font-bold text-[var(--navy-900)]">{stat.value}</div>
              <div className="text-sm text-[var(--slate-500)] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
