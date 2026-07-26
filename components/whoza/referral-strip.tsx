"use client"

import { motion } from "framer-motion"
import { Gift, ArrowRight } from "lucide-react"
import { trackCTA } from "@/lib/gtag"

export function ReferralStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-y border-[var(--rex-green)]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <a
          href="/refer"
          onClick={() => trackCTA("Referral Strip Click", "pricing-page")}
          className="flex items-center justify-center gap-3 text-sm sm:text-base text-[var(--navy-900)] hover:text-[var(--rex-green)] transition-colors group"
        >
          <Gift className="w-5 h-5 text-[var(--rex-green)] shrink-0" />
          <span className="font-medium">
            <strong>Refer a Trade:</strong> Give a free month, get a free month. Earn up to a year free.
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--rex-green)] font-semibold group-hover:gap-2 transition-all">
            Learn more
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </motion.div>
  )
}
