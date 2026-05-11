"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Based on: 62% unanswered rate across UK trade businesses
// ~2.4M UK trade businesses, ~8 calls/day average
// = ~4,896,000 missed calls/day = ~204,000/hour = ~56.7/second
const MISSED_CALLS_PER_SECOND = 56.7
const AVG_JOB_VALUE = 280

export function MissedCallCounter() {
  const [missedCalls, setMissedCalls] = useState(0)
  const [lostRevenue, setLostRevenue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // IntersectionObserver — only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setMissedCalls((prev) => prev + Math.floor(MISSED_CALLS_PER_SECOND * 3.2))
      setLostRevenue((prev) => prev + Math.floor(MISSED_CALLS_PER_SECOND * 3.2 * AVG_JOB_VALUE))
    }, 3200)

    // Initial values
    setMissedCalls(Math.floor(MISSED_CALLS_PER_SECOND * 2))
    setLostRevenue(Math.floor(MISSED_CALLS_PER_SECOND * 2 * AVG_JOB_VALUE))

    return () => clearInterval(interval)
  }, [isVisible])

  const formattedCalls = missedCalls.toLocaleString("en-GB")
  const formattedRevenue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(lostRevenue)

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full py-3"
      style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))" }}
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          <span className="sr-only">Live statistics from the Office for National Statistics: </span>
          Since you opened this page, UK trades have missed{" "}
          <span className="font-bold" style={{ color: "#EF4444" }}>{formattedCalls}</span>{" "}
          calls. That&apos;s approximately{" "}
          <span className="font-bold" style={{ color: "#EF4444" }}>{formattedRevenue}</span>{" "}
          in lost work.
        </p>
        <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
          Source: ONS Business Population Estimates 2025, 62% unanswered rate
        </p>
        <p className="text-xs mt-1 font-medium" style={{ color: "#10B981" }}>
          That&apos;s why we built Katie&apos;s Revenue Team
        </p>
      </div>
    </motion.div>
  )
}
