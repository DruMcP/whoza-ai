"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { checkTrialAvailability } from "@/lib/supabase"

export function TrialAvailabilityBadge() {
  const [slots, setSlots] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Pre-launch: show limited availability without fake numbers
    setSlots(1)
  }, [])

  if (error) return null
  if (slots === null) return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/60 animate-pulse">
      Loading...
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm"
    >
      <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
      <span className="text-white/80">
        7-day free trial — 20 min + 4 jobs
      </span>
    </motion.div>
  )
}
