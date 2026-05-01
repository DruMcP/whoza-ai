"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { checkTrialAvailability } from "@/lib/supabase"

export function TrialAvailabilityBadge() {
  const [slots, setSlots] = useState<number | null>(null)
  const [total, setTotal] = useState<number>(10)
  const [error, setError] = useState(false)

  useEffect(() => {
    checkTrialAvailability()
      .then((data) => {
        setSlots(data.slots_remaining)
        setTotal(data.slots_total)
      })
      .catch((err) => {
        console.error("Trial check failed:", err)
        setError(true)
      })
  }, [])

  if (error) return null
  if (slots === null) return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/60 animate-pulse">
      Checking availability...
    </div>
  )

  const urgency = slots <= 2 ? "text-red-400" : slots <= 5 ? "text-amber-400" : "text-[var(--rex-green)]"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm"
    >
      <Sparkles className={`w-4 h-4 ${urgency}`} />
      <span className="text-white/80">
        <span className={`font-bold ${urgency}`}>{slots}</span> trial {slots === 1 ? "spot" : "spots"} left this week
      </span>
    </motion.div>
  )
}
