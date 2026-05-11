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

    </motion.div>
  )
}
