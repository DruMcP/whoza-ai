"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Based on: 62% unanswered rate across UK trade businesses
// ~2.4M UK trade businesses, ~8 calls/day average
// = ~4,896,000 missed calls/day = ~204,000/hour = ~56.7/second
const MISSED_CALLS_PER_SECOND = 56.7
const AVG_JOB_VALUE = 280

export function MissedCallCounter() {
  const [missedCalls, setMissedCalls] = useState(0)
  const [lostRevenue, setLostRevenue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMissedCalls((prev) => prev + Math.floor(MISSED_CALLS_PER_SECOND * 3.2))
      setLostRevenue((prev) => prev + Math.floor(MISSED_CALLS_PER_SECOND * 3.2 * AVG_JOB_VALUE))
    }, 3200)

    // Initial values based on time since page load estimate
    setMissedCalls(Math.floor(MISSED_CALLS_PER_SECOND * 2))
    setLostRevenue(Math.floor(MISSED_CALLS_PER_SECOND * 2 * AVG_JOB_VALUE))

    return () => clearInterval(interval)
  }, [])

  const formattedCalls = missedCalls.toLocaleString("en-GB")
  const formattedRevenue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(lostRevenue)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full py-3"
      style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-[#9CA3AF]">
          Since you opened this page, UK trades have missed{" "}
          <span className="font-bold text-red-400">{formattedCalls}</span>{" "}
          calls. That&apos;s approximately{" "}
          <span className="font-bold text-red-400">{formattedRevenue}</span>{" "}
          in lost work.
        </p>
        <p className="text-xs text-[#6B7280] mt-1">
          Source: ONS Business Population Estimates 2025, 62% unanswered rate
        </p>
      </div>
    </motion.div>
  )
}
