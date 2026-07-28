"use client"

import { useState, useCallback, useEffect } from "react"
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react"

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

interface WaitlistFormProps {
  source?: string
  plan?: string
  onSubmitted?: () => void
  variant?: "modal" | "page"
}

export function WaitlistForm({ source = "homepage", plan, onSubmitted, variant = "modal" }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    trade: "",
    phone: "",
    postcode: "",
    referral_code: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // When used inside a modal with onSubmitted, let parent handle success UI
  const isControlled = !!onSubmitted

  // Capture ?ref=CODE from URL on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get("ref")
      if (ref && /^[A-HJ-NP-Z2-9]{8}$/i.test(ref)) {
        setFormData((prev) => ({ ...prev, referral_code: ref.toUpperCase() }))
      }
    } catch {
      // ignore
    }
  }, [])

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
            referral_code: formData.referral_code,
            source,
            plan: plan || null,
          }),
        })

        if (!response.ok) throw new Error("Submission failed")

        if (isControlled) {
          onSubmitted()
        } else {
          setSubmitted(true)
        }
      } catch {
        setErrors({ submit: "Something went wrong. Please try again." })
      } finally {
        setIsSubmitting(false)
      }
    },
    [validate, formData, source, plan, onSubmitted, isControlled]
  )

  const isPage = variant === "page"

  if (submitted) {
    return (
      <div className={`text-center ${isPage ? "py-12" : "py-6"}`}>
        <CheckCircle2 className={`w-12 h-12 text-emerald-400 mx-auto mb-4`} />
        <h2 className={`font-bold text-white font-sans ${isPage ? "text-3xl" : "text-2xl"}`}>
          You're on the list!
        </h2>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
          Dru will personally be in touch within 48 hours to get you started.
        </p>
        <p className="mt-4 text-slate-500 text-sm">
          Got questions? Email{" "}
          <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">
            dru@whoza.ai
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label
          htmlFor={`waitlist-email-${variant}`}
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 focus:ring-emerald-400/50 bg-[#111418] text-white text-[15px] font-sans"
          style={{
            border: errors.email ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
          }}
          placeholder="e.g. john@smithplumbing.co.uk"
          required
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Trade type */}
      <div>
        <label
          htmlFor={`waitlist-trade-${variant}`}
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          What trade are you in? <span className="text-red-500">*</span>
        </label>
        <select
          id={`waitlist-trade-${variant}`}
          value={formData.trade}
          onChange={(e) => handleChange("trade", e.target.value)}
          className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 focus:ring-emerald-400/50 appearance-none bg-[#111418] text-[15px] font-sans"
          style={{
            border: errors.trade ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
            color: formData.trade ? "#FFFFFF" : "#6B7280",
          }}
          required
        >
          <option value="" disabled>
            Select your trade
          </option>
          {tradeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.trade && <p className="text-xs text-red-500 mt-1">{errors.trade}</p>}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor={`waitlist-phone-${variant}`}
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Phone number <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id={`waitlist-phone-${variant}`}
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 focus:ring-emerald-400/50 bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06]"
          placeholder="e.g. 07700 900123"
        />
      </div>

      {/* Postcode */}
      <div>
        <label
          htmlFor={`waitlist-postcode-${variant}`}
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Postcode <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id={`waitlist-postcode-${variant}`}
          type="text"
          value={formData.postcode}
          onChange={(e) => handleChange("postcode", e.target.value)}
          className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 focus:ring-emerald-400/50 bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06]"
          placeholder="e.g. SW1A 1AA"
        />
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
        style={{
          background: "linear-gradient(135deg, #047857, #10B981)",
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
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-500 mt-2">
        No credit card required. Dru personally reviews every application.
      </p>
    </form>
  )
}
