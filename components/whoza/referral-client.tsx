"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Gift, Users, TrendingUp, ArrowRight, Share2, MessageCircle, Mail } from "lucide-react"
import { trackCTA, trackEvent } from "@/lib/gtag"

// Generate a consistent demo referral code for this browser
function getOrCreateReferralCode(): string {
  const stored = localStorage.getItem("whoza_referral_code")
  if (stored) return stored
  const code = Math.random().toString(36).substring(2, 6).toUpperCase() +
               Math.random().toString(36).substring(2, 6).toUpperCase()
  localStorage.setItem("whoza_referral_code", code)
  return code
}

interface ReferralStats {
  total: number
  pending: number
  signed_up: number
  paid: number
  rewarded: number
  reward_months_earned: number
}

export function ReferralClient() {
  const [referralCode, setReferralCode] = useState<string>("")
  const [referralLink, setReferralLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [friendEmail, setFriendEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasGenerated, setHasGenerated] = useState(false)

  useEffect(() => {
    const code = getOrCreateReferralCode()
    setReferralCode(code)
    setReferralLink(`https://whoza.ai/?ref=${code}`)
    setIsLoading(false)

    // Try to fetch stats if we have a contractor_id in localStorage
    const contractorId = localStorage.getItem("whoza_contractor_id")
    if (contractorId) {
      fetch(`/api/referral/stats?contractor_id=${contractorId}`)
        .then(r => r.json())
        .then(data => {
          if (data.success) setStats(data.stats)
        })
        .catch(() => {/* ignore */})
    }
  }, [])

  const handleCopyLink = async () => {
    if (!referralLink) return
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      trackEvent("referral_link_copied", { code: referralCode, location: "refer-page" })
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWhatsApp = () => {
    if (!referralLink) return
    const text = `Check out Whoza.ai — an AI receptionist that answers missed calls 24/7 and books jobs via WhatsApp. Use my link and your first paid month is free after the trial: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    trackCTA("Share Referral WhatsApp", "refer-page")
  }

  const handleShareEmail = () => {
    if (!referralLink) return
    const subject = "Try Whoza.ai — AI receptionist for trades"
    const body = `Hi,\n\nI thought you'd be interested in Whoza.ai — an AI receptionist that answers missed calls 24/7 and sends job details straight to WhatsApp.\n\nUse my referral link and your first paid month is free after the 7-day trial:\n${referralLink}\n\nCheers!`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank")
    trackCTA("Share Referral Email", "refer-page")
  }

  const handleSubmitFriendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!friendEmail || !referralCode) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/referral/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: referralCode,
          email: friendEmail,
          source: "refer-page",
        }),
      })

      const data = await response.json()

      if (data.success || data.message?.includes("already been referred")) {
        setSubmitStatus("success")
        setFriendEmail("")
        trackEvent("referral_email_sent", { code: referralCode })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[var(--off-white)] pt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[var(--off-white)]">
      {/* Hero */}
      <div className="bg-[var(--navy-900)] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/20 text-[var(--rex-green)] text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Refer a Trade Programme
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Give a Free Month.<br />
              <span className="text-[var(--rex-green)]">Get a Free Month.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Refer a fellow tradesperson to Whoza.ai. When they join and stay,
              you both get rewarded. Earn up to a full year free.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Share2,
                title: "Share Your Link",
                description: "Copy your unique referral link or share it directly via WhatsApp or email.",
                color: "var(--katie-blue)",
                key: "share",
              },
              {
                icon: Users,
                title: "They Sign Up",
                description: "Your friend joins Whoza.ai using your referral link and starts their free trial.",
                color: "var(--rex-green)",
                key: "signup",
              },
              {
                icon: Gift,
                title: "You Both Win",
                description: "Your friend gets their first paid month free after their 7-day trial. You get a free month credited after they complete their second consecutive paid month.",
                color: "var(--claire-amber)",
                key: "reward",
              },
            ].map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color }} />
                </div>
                <h3 className="text-lg font-bold text-[var(--navy-900)] mb-2">{step.title}</h3>
                <p className="text-[var(--slate-500)]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="py-16 bg-[var(--off-white)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--border)]"
          >
            <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-2 text-center">
              Your Referral Link
            </h2>
            <p className="text-[var(--slate-500)] text-center mb-6">
              Share this link with other tradespeople
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--off-white)] text-[var(--navy-900)] font-mono text-sm break-all">
                  {referralLink || "Loading..."}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 bg-[var(--navy-900)] text-white font-medium rounded-lg hover:bg-[var(--navy-800)] transition-colors"
                  aria-label="Copy referral link"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={handleShareEmail}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/20 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Send to a Friend */}
      <div className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--navy-900)] rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-2 text-center">Send to a Friend</h2>
            <p className="text-white/70 text-center mb-6">
              Enter your friend's email and we'll send them an invitation with your referral code.
            </p>

            <form onSubmit={handleSubmitFriendEmail} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="friend@example.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--rex-green)]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--rex-green)] text-white font-medium rounded-lg hover:bg-[var(--rex-green-hover)] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>

              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[var(--rex-green)] text-sm text-center"
                >
                  Invitation sent successfully!
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="py-16 bg-[var(--off-white)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-6 text-center">
                Your Referral Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Referrals", value: stats.total, icon: Users, key: "total" },
                  { label: "Signed Up", value: stats.signed_up, icon: TrendingUp, key: "signed_up" },
                  { label: "Paid", value: stats.paid, icon: Check, key: "paid" },
                  { label: "Free Months Earned", value: stats.reward_months_earned, icon: Gift, key: "rewarded" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 text-center border border-[var(--border)]"
                  >
                    <stat.icon className="w-6 h-6 text-[var(--rex-green)] mx-auto mb-2" />
                    <div className="text-3xl font-bold text-[var(--navy-900)]">{stat.value}</div>
                    <div className="text-sm text-[var(--slate-500)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-8 text-center">
              Referral Programme FAQ
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "How do I get my referral code?",
                  answer: "Once you sign up for Whoza.ai, your unique referral code is automatically generated. You can find it in your dashboard under the 'Refer a Trade' section.",
                  key: "how",
                },
                {
                  question: "What does my friend get?",
                  answer: "Their first paid month free after their 7-day trial, on whichever plan they choose. The free month is valued on their chosen plan, not yours.",
                  key: "friend",
                },
                {
                  question: "What do I get?",
                  answer: "One free month of your own current plan for every referred tradesperson who (a) completes their 7-day trial AND (b) pays for their second consecutive month. No credit if they cancel or lapse before their second payment. Maximum 12 free months per rolling 12-month period.",
                  key: "me",
                },
                {
                  question: "When do I get my free month?",
                  answer: "After your friend completes their second consecutive paid month. We'll notify you via email and update your dashboard. The credit applies automatically to your next invoice.",
                  key: "when",
                },
                {
                  question: "Can I refer multiple people?",
                  answer: "Yes — refer as many tradespeople as you like. You can earn up to 12 free months in any 12-month period — a full year free. After the cap, referrals still track but no further credits accrue until the rolling window frees up.",
                  key: "multiple",
                },
                {
                  question: "What if my friend cancels?",
                  answer: "If your friend cancels or lapses before completing their second paid month, no credit is awarded. Credits only apply for referrals who genuinely continue as paying customers. No cash alternative; credits are non-transferable.",
                  key: "cancel",
                },
              ].map((faq, index) => (
                <div
                  key={faq.key}
                  className="border border-[var(--border)] rounded-xl p-6 hover:bg-[var(--off-white)] transition-colors"
                >
                  <h3 className="font-semibold text-[var(--navy-900)] mb-2">{faq.question}</h3>
                  <p className="text-[var(--slate-500)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-[var(--navy-900)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Sharing, Start Saving
            </h2>
            <p className="text-white/70 mb-8">
              Earn up to a full year free by referring tradespeople who love Whoza.ai.
            </p>
            <a
              href="/?ref=referral-cta"
              onClick={() => trackCTA("Sign Up from Refer Page", "refer-page")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--rex-green)] text-white font-bold rounded-lg hover:bg-[var(--rex-green-hover)] transition-colors"
            >
              Get Started with Whoza.ai
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
