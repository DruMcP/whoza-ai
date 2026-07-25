"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Gift, Users, TrendingUp, ArrowRight, Share2, MessageCircle, Mail } from "lucide-react"
import { trackCTA, trackEvent } from "@/lib/gtag"

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
  const [email, setEmail] = useState("")
  const [friendEmail, setFriendEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock auth check — in production this would come from Supabase auth
  // For now, we show a generic referral page that works for both logged-in and logged-out users
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in (mock — would use Supabase auth in production)
    const checkAuth = async () => {
      try {
        // In production: const { data: { session } } = await supabase.auth.getSession()
        // For now, show the public referral page
        setIsLoggedIn(false)
        setIsLoading(false)
      } catch {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleCopyLink = async () => {
    const link = referralLink || `https://whoza.ai/?ref=${referralCode || "YOURCODE"}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      trackEvent("referral_link_copied", { code: referralCode })
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = link
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWhatsApp = () => {
    const link = referralLink || `https://whoza.ai/?ref=${referralCode || "YOURCODE"}`
    const text = `Check out Whoza.ai — an AI receptionist that answers missed calls 24/7 and books jobs via WhatsApp. Use my link for a free month: ${link}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    trackCTA("Share Referral WhatsApp", "refer-page")
  }

  const handleShareEmail = () => {
    const link = referralLink || `https://whoza.ai/?ref=${referralCode || "YOURCODE"}`
    const subject = "Try Whoza.ai — AI receptionist for trades"
    const body = `Hi,

I thought you'd be interested in Whoza.ai — an AI receptionist that answers missed calls 24/7 and sends job details straight to WhatsApp.

Use my referral link and we both get a free month:
${link}

Cheers!`
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

      if (data.success) {
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
              Refer a fellow tradesperson to Whoza.ai. When they sign up, you both get a free month.
              No limits. Stack your rewards.
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
              },
              {
                icon: Users,
                title: "They Sign Up",
                description: "Your friend joins Whoza.ai using your referral link and starts their free trial.",
                color: "var(--rex-green)",
              },
              {
                icon: Gift,
                title: "You Both Win",
                description: "When they become a paying customer, you both get a free month added to your accounts.",
                color: "var(--claire-amber)",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
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
              {isLoggedIn
                ? "Share this link with other tradespeople"
                : "Enter your email to get your unique referral link"}
            </p>

            {!isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--off-white)] text-[var(--navy-900)] placeholder:text-[var(--slate-400)] focus:outline-none focus:ring-2 focus:ring-[var(--katie-blue)]"
                  />
                  <button
                    onClick={() => {
                      if (email) {
                        setReferralCode("DEMO1234")
                        setReferralLink(`https://whoza.ai/?ref=DEMO1234`)
                        trackCTA("Get Referral Link", "refer-page")
                      }
                    }}
                    className="px-6 py-3 bg-[var(--rex-green)] text-white font-medium rounded-lg hover:bg-[var(--rex-green-hover)] transition-colors whitespace-nowrap"
                  >
                    Get Link
                  </button>
                </div>
                <p className="text-sm text-[var(--slate-400)] text-center">
                  You'll need to sign up for Whoza.ai to track your referrals and claim rewards.
                </p>
              </div>
            ) : (
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
            )}

            {/* Referral Link Display (when generated) */}
            {referralLink && !isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 pt-6 border-t border-[var(--border)]"
              >
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--off-white)] text-[var(--navy-900)] font-mono text-sm break-all">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 bg-[var(--navy-900)] text-white font-medium rounded-lg hover:bg-[var(--navy-800)] transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

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

                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> This is a demo link. Sign up for Whoza.ai to get your real referral code and track your rewards.
                  </p>
                </div>
              </motion.div>
            )}
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

      {/* Stats Section (for logged in users) */}
      {isLoggedIn && stats && (
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
                  { label: "Total Referrals", value: stats.total, icon: Users },
                  { label: "Signed Up", value: stats.signed_up, icon: TrendingUp },
                  { label: "Paid", value: stats.paid, icon: Check },
                  { label: "Free Months Earned", value: stats.reward_months_earned, icon: Gift },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
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
                },
                {
                  question: "What does my friend get?",
                  answer: "Your friend gets a free month of Whoza.ai when they sign up using your referral link. They'll get the same plan you're on.",
                },
                {
                  question: "What do I get?",
                  answer: "For every friend who becomes a paying customer, you get one free month added to your subscription. There's no limit — refer 12 friends, get a year free.",
                },
                {
                  question: "When do I get my free month?",
                  answer: "Your free month is added when your friend completes their first paid month. We'll notify you via email and update your dashboard.",
                },
                {
                  question: "Can I refer multiple people?",
                  answer: "Absolutely. There's no limit to how many people you can refer or how many free months you can earn.",
                },
                {
                  question: "What if my friend cancels?",
                  answer: "If your friend cancels before completing their first paid month, no free month is awarded. But if they rejoin later, the referral still counts.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
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
              Every tradesperson you refer is one more month you don't pay for.
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
