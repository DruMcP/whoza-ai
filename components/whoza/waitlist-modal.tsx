"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"

interface WaitlistModalProps {
  onClose: () => void
  source?: string
  plan?: string
}

const tradeOptions = [
  "Plumber",
  "Electrician",
  "Builder",
  "Roofer",
  "Gas Engineer",
  "Heating Engineer",
  "Locksmith",
  "Landscaper",
  "Cleaner",
  "Other",
]

export function WaitlistModal({ onClose, source = "homepage", plan }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    trade: "",
    phone: "",
    postcode: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [errors]
  )

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.trade) {
      newErrors.trade = "Trade type is required"
    }
    return newErrors
  }, [formData])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const validationErrors = validate()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            trade: formData.trade,
            phone: formData.phone,
            postcode: formData.postcode,
            source,
            plan: plan || null,
          }),
        })

        if (!response.ok) throw new Error("Submission failed")

        setSubmitted(true)
      } catch {
        setErrors({ submit: "Something went wrong. Please try again." })
      } finally {
        setIsSubmitting(false)
      }
    },
    [validate, formData, source, plan]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto bg-[#1E2229] rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10 text-slate-400 min-h-[48px] min-w-[48px]"
          aria-label="Close waitlist modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white font-sans">
              You're on the list!
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Dru will personally be in touch within 48 hours to set up your pilot.
            </p>
            <p className="mt-4 text-slate-500 text-sm">
              Got questions? Email{" "}
              <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">
                dru@whoza.ai
              </a>
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <h2
              id="waitlist-title"
              className="text-2xl font-bold pr-8 text-white font-sans"
            >
              {plan ? `Join the Pilot — ${plan} Plan` : "Join the UK Pilot Programme"}
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-sans">
              Limited to 50 tradespeople. You're getting early access.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium mb-1 text-gray-300">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 bg-[#111418] text-white text-[15px] font-sans"
                  style={{
                    border: errors.email ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                  }}
                  placeholder="e.g. john@smithplumbing.co.uk"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Trade type */}
              <div>
                <label htmlFor="waitlist-trade" className="block text-sm font-medium mb-1 text-gray-300">
                  What trade are you in? <span className="text-red-500">*</span>
                </label>
                <select
                  id="waitlist-trade"
                  value={formData.trade}
                  onChange={(e) => handleChange("trade", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 appearance-none bg-[#111418] text-[15px] font-sans"
                  style={{
                    border: errors.trade ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                    color: formData.trade ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  <option value="" disabled>Select your trade</option>
                  {tradeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.trade && <p className="text-xs text-red-500 mt-1">{errors.trade}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="waitlist-phone" className="block text-sm font-medium mb-1 text-gray-300">
                  Phone number <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  id="waitlist-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06]"
                  placeholder="e.g. 07700 900123"
                />
              </div>

              {/* Postcode */}
              <div>
                <label htmlFor="waitlist-postcode" className="block text-sm font-medium mb-1 text-gray-300">
                  Postcode <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  id="waitlist-postcode"
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleChange("postcode", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06]"
                  placeholder="e.g. SW1A 1AA"
                />
              </div>

              {errors.submit && (
                <p className="text-sm text-red-500">{errors.submit}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
                style={{
                  background: "linear-gradient(135deg, #059669, #10B981)",
                  height: 56,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  minHeight: 48,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join the Pilot — Free
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500 mt-2">
                No credit card required. Dru personally reviews every application.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
