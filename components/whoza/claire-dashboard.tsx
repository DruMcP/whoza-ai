"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { getClaireMetrics, type ClaireMetrics } from "@/lib/claire"

/**
 * Claire Dashboard — Client-facing review conversion metrics
 * 
 * Displays:
 * - Conversion rate (sent → completed)
 * - Reviews received counter
 * - Average rating
 * - Pending requests
 * - Revenue impact statement
 */

interface ClaireDashboardProps {
  clientId?: string
}

export function ClaireDashboard({ clientId = "demo" }: ClaireDashboardProps) {
  const [metrics, setMetrics] = useState<ClaireMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d")

  useEffect(() => {
    async function loadMetrics() {
      try {
        // In production: const data = await getClaireMetrics(clientId, period);
        // For now: mock data
        const mockData: ClaireMetrics = {
          totalRequests: 47,
          sentCount: 42,
          clickedCount: 28,
          completedCount: 19,
          conversionRate: 45,
          clickThroughRate: 67,
          averageRating: 4.7,
          estimatedJobWinIncrease: 3,
          estimatedRevenueImpact: 1050,
          avgJobValue: 350,
          pendingCount: 5,
          reminderCount: 8,
          period,
        }
        setMetrics(mockData)
      } catch (err) {
        // Silent fail — metrics unavailable, show demo data
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [clientId, period])

  if (loading) {
    return (
      <div className="animate-pulse bg-[var(--navy-800)] rounded-2xl p-6 h-64" />
    )
  }

  if (!metrics) return null

  return (
    <section className="py-16 bg-[var(--navy-900)] dark-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--rex-green)] font-semibold text-sm uppercase tracking-wider mb-2">
            Win More Jobs with Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 reveal">
            Your Review Engine
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Every review is a future customer finding you on Google. 
            Claire automatically converts completed jobs into 5-star reviews.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                period === p
                  ? "bg-[var(--rex-green)] text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {p === "7d" ? "Last 7 days" : p === "30d" ? "Last 30 days" : "Last 90 days"}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 reveal-stagger">
          <MetricCard
            icon={<MessageSquare className="w-5 h-5" />}
            label="Reviews Requested"
            value={metrics.sentCount}
            subtext={`${metrics.pendingCount} pending`}
            color="blue"
          />
          <MetricCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Reviews Received"
            value={metrics.completedCount}
            subtext={`${metrics.conversionRate}% conversion`}
            color="green"
          />
          <MetricCard
            icon={<Star className="w-5 h-5" />}
            label="Average Rating"
            value={metrics.averageRating?.toFixed(1) || "—"}
            subtext="Google Business Profile"
            color="yellow"
          />
          <MetricCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Click-Through Rate"
            value={`${metrics.clickThroughRate}%`}
            subtext="Link clicks / requests sent"
            color="purple"
          />
        </div>

        {/* Revenue Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <RevenueCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Estimated New Jobs"
            value={`+${metrics.estimatedJobWinIncrease}`}
            subtext={`Based on ${metrics.completedCount} reviews × ${metrics.averageRating?.toFixed(1)}★ × 3% lift per review`}
            color="green"
          />
          <RevenueCard
            icon={<Star className="w-6 h-6" />}
            label="Estimated Revenue Impact"
            value={`£${metrics.estimatedRevenueImpact.toLocaleString()}`}
            subtext={`${metrics.estimatedJobWinIncrease} jobs × £${metrics.avgJobValue} avg job value`}
            color="rex-green"
          />
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[var(--rex-green)]/20 to-[var(--rex-green)]/5 border border-[var(--rex-green)]/30 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-6 h-6 text-[var(--rex-green)]" />
            <span className="text-2xl font-bold text-white">+{metrics.completedCount} new reviews this {period === "7d" ? "week" : period === "30d" ? "month" : "quarter"}</span>
          </div>
          <p className="text-white/60">
            Your improved rating is helping you win more jobs. 
            {metrics.estimatedJobWinIncrease > 0
              ? `Claire estimates ~${metrics.estimatedJobWinIncrease} additional jobs this ${period === "7d" ? "week" : period === "30d" ? "month" : "quarter"} from your reviews.`
              : `Keep going — every review compounds into future revenue.`}
          </p>
        </motion.div>

        {/* Status Breakdown */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard
            icon={<Clock className="w-5 h-5 text-yellow-400" />}
            label="Pending"
            value={metrics.pendingCount}
            description="Scheduled for send"
          />
          <StatusCard
            icon={<MessageSquare className="w-5 h-5 text-blue-400" />}
            label="Sent"
            value={metrics.sentCount - metrics.completedCount - metrics.pendingCount}
            description="Awaiting response"
          />
          <StatusCard
            icon={<AlertCircle className="w-5 h-5 text-orange-400" />}
            label="Reminders"
            value={metrics.reminderCount}
            description="Follow-ups sent"
          />
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  subtext: string
  color: "blue" | "green" | "yellow" | "purple"
}) {
  const colors = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-[var(--rex-green)]/20 text-[var(--rex-green)]",
    yellow: "bg-yellow-500/20 text-yellow-400",
    purple: "bg-purple-500/20 text-purple-400",
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[var(--navy-800)] rounded-xl p-6 border border-white/10"
    >
      <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/60 mb-1">{label}</div>
      <div className="text-xs text-white/40">{subtext}</div>
    </motion.div>
  )
}

function RevenueCard({
  icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  subtext: string
  color: "green" | "rex-green"
}) {
  const colors = {
    green: "bg-[var(--rex-green)]/20 text-[var(--rex-green)] border-[var(--rex-green)]/30",
    "rex-green": "bg-[var(--rex-green)]/30 text-[var(--rex-green)] border-[var(--rex-green)]/40",
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl p-6 border ${colors[color]} flex items-center gap-4`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-white/80 font-medium mb-1">{label}</div>
        <div className="text-xs text-white/50">{subtext}</div>
      </div>
    </motion.div>
  )
}

function StatusCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: number
  description: string
}) {
  return (
    <div className="bg-[var(--navy-800)] rounded-xl p-4 border border-white/10 flex items-center gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="text-lg font-bold text-white">{value}</div>
        <div className="text-sm text-white/60">{label}</div>
        <div className="text-xs text-white/40">{description}</div>
      </div>
    </div>
  )
}
