"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Flame } from "lucide-react"

/* Generate a deterministic "spots remaining" count based on the current
   calendar week so it changes slowly without needing a backend.  */
function getSpotsRemaining() {
  if (typeof window === "undefined") return 37

  const stored = window.localStorage.getItem("whoza_pilot_spots")
  if (stored) {
    const parsed = JSON.parse(stored)
    // Refresh once per week
    const now = Date.now()
    if (parsed.week === getWeekNumber(now) && parsed.year === new Date(now).getFullYear()) {
      return parsed.spots
    }
  }

  // Base: 50 total.  Random-ish but deterministic based on week number.
  const week = getWeekNumber(Date.now())
  const year = new Date().getFullYear()
  const seed = week * 7 + year * 13
  const taken = 13 + (seed % 19) // 13–32 taken → 18–37 remaining
  const spots = Math.max(8, Math.min(42, 50 - taken))

  window.localStorage.setItem(
    "whoza_pilot_spots",
    JSON.stringify({ week, year, spots })
  )
  return spots
}

function getWeekNumber(d: number) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 4 - (date.getDay() || 7))
  const yearStart = new Date(date.getFullYear(), 0, 1)
  return Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7)
}

export function PilotSpotCounter({ variant = "badge" }: { variant?: "badge" | "banner" | "inline" }) {
  const [spots, setSpots] = useState(37)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSpots(getSpotsRemaining())
    setMounted(true)
  }, [])

  const taken = 50 - spots

  if (!mounted) {
    // Avoid hydration mismatch — render a static placeholder
    if (variant === "badge") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Users className="w-3 h-3" />
          Pilot filling up
        </span>
      )
    }
    return null
  }

  if (variant === "badge") {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
      >
        <Flame className="w-3 h-3 text-orange-400" />
        {taken} of 50 spots taken
      </motion.span>
    )
  }

  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-400 rounded-xl p-4 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/10"
      >
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-bold text-[var(--navy-900)]">
            {taken} of 50 pilot spots taken
          </span>
        </div>
        <div className="h-3 w-28 rounded-full bg-[var(--navy-900)]/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(taken / 50) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
          />
        </div>
        <span className="text-xs font-semibold text-[var(--navy-900)]/70">{spots} remaining</span>
      </motion.div>
    )
  }

  // inline
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
      <Flame className="w-3 h-3 text-orange-400" />
      {spots} spots left
    </span>
  )
}
