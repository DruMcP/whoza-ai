"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gift, Copy, Check, Share2, Users, TrendingUp } from "lucide-react"
import { trackEvent, trackCTA } from "@/lib/gtag"

interface ReferralStats {
  total: number
  pending: number
  signed_up: number
  paid: number
  rewarded: number
  reward_months_earned: number
}

export function ReferralDashboardBlock() {
  const [referralCode, setReferralCode] = useState<string>("")
  const [referralLink, setReferralLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In production, fetch from API:
    // fetch(`/api/referral/stats?contractor_id=${contractorId}`)
    // For now, show placeholder
    setReferralCode("DEMO1234")
    setReferralLink("https://whoza.ai/?ref=DEMO1234")
    setStats({
      total: 3,
      pending: 1,
      signed_up: 1,
      paid: 1,
      rewarded: 1,
      reward_months_earned: 1,
    })
    setIsLoading(false)
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      trackEvent("referral_link_copied", { location: "dashboard" })
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWhatsApp = () => {
    const text = `Check out Whoza.ai — an AI receptionist that answers missed calls 24/7 and books jobs via WhatsApp. Use my link for a free month: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    trackCTA("Share Referral WhatsApp", "dashboard")
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)] animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden border border-[var(--border)] mb-8"
    >
      <div className="p-6 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--rex-green)]/10 flex items-center justify-center">
            <Gift className="w-5 h-5 text-[var(--rex-green)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--navy-900)]">Refer a Trade</h2>
            <p className="text-sm text-[var(--slate-500)]">
              Give a free month, get a free month
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--navy-900)] mb-2">
            Your Referral Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--off-white)] text-[var(--navy-900)] font-mono text-sm break-all">
              {referralLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 bg-[var(--navy-900)] text-white rounded-lg hover:bg-[var(--navy-800)] transition-colors"
              aria-label="Copy referral link"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-medium text-sm"
          >
            <Share2 className="w-4 h-4" />
            WhatsApp
          </button>
          <a
            href={`mailto:?subject=Try Whoza.ai - AI Receptionist for Trades&body=Hi,%0D%0A%0D%0AI thought you'd be interested in Whoza.ai - an AI receptionist that answers missed calls 24/7 and sends job details straight to WhatsApp.%0D%0A%0D%0AUse my referral link and we both get a free month:%0D%0A${referralLink}%0D%0A%0D%0ACheers!`}
            onClick={() => trackCTA("Share Referral Email", "dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/20 transition-colors font-medium text-sm"
          >
            <Share2 className="w-4 h-4" />
            Email
          </a>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total", value: stats.total, icon: Users, key: "total" },
              { label: "Signed Up", value: stats.signed_up, icon: TrendingUp, key: "signed_up" },
              { label: "Paid", value: stats.paid, icon: Check, key: "paid" },
              { label: "Free Months", value: stats.reward_months_earned, icon: Gift, key: "rewarded" },
            ].map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--off-white)] rounded-xl p-4 text-center"
              >
                <stat.icon className="w-5 h-5 text-[var(--rex-green)] mx-auto mb-1" />
                <div className="text-2xl font-bold text-[var(--navy-900)]">{stat.value}</div>
                <div className="text-xs text-[var(--slate-500)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-4 text-center">
          <a
            href="/refer"
            className="text-sm text-[var(--katie-blue)] hover:underline font-medium"
          >
            View full referral programme →
          </a>
        </div>
      </div>
    </motion.div>
  )
}
