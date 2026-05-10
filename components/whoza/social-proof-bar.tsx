"use client"

import { motion } from "framer-motion"

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-4 border-t border-white/5"
      style={{ background: "#111418" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Built for plumbers, electricians, heating engineers & roofers across the UK
        </p>
      </div>
    </motion.div>
  )
}
