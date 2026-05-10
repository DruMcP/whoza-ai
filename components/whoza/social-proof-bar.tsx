"use client"

import { motion } from "framer-motion"
import { Shield, Award, BadgeCheck } from "lucide-react"

const badges = [
  { icon: Shield, label: "FMB Member" },
  { icon: Award, label: "NAPIT Registered" },
  { icon: BadgeCheck, label: "Checkatrade" },
]

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-4 border-t border-white/5"
      style={{ background: "#111418" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <p className="text-sm text-[#6B7280] text-center sm:text-left">
          Built for FMB-certified, NAPIT-registered & Checkatrade-vetted trades
        </p>
        <div className="flex items-center gap-4">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-1.5 text-[#4B5563]">
              <badge.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
