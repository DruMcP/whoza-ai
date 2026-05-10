"use client"

import { motion } from "framer-motion"
import { TrendingUp, Phone, Star, ArrowUpRight } from "lucide-react"

const cards = [
  {
    icon: TrendingUp,
    value: "£480",
    label: "recovered today",
    color: "#10B981",
    bgColor: "rgba(16,185,129,0.1)",
    delay: 0,
  },
  {
    icon: Phone,
    value: "23",
    label: "leads this week",
    color: "#3B82F6",
    bgColor: "rgba(59,130,246,0.1)",
    delay: 0.15,
  },
  {
    icon: Star,
    value: "4.9★",
    label: "from 32 reviews",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.1)",
    delay: 0.3,
  },
  {
    icon: ArrowUpRight,
    value: "+5",
    label: "jobs vs last month",
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.1)",
    delay: 0.45,
  },
]

export function FloatingDataCards() {
  return (
    <div className="absolute -right-4 lg:-right-12 top-1/4 hidden lg:flex flex-col gap-3 z-20">
      {cards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + card.delay, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl px-4 py-3 shadow-lg border border-[#E2E8F0] flex items-center gap-3"
          style={{ willChange: "transform" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: card.bgColor }}
          >
            <card.icon className="w-5 h-5" style={{ color: card.color }} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#1A202C] leading-tight">{card.value}</div>
            <div className="text-xs text-[#718096] leading-tight">{card.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
