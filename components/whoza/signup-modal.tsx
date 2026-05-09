"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { X, ArrowRight, Loader2 } from "lucide-react"

interface SignupModalProps {
  onClose: () => void
}

const tradeOptions = [
  "Plumber",
  "Electrician",
  "Roofer",
  "Builder",
  "Heating Engineer",
  "Locksmith",
  "Landscaper",
  "Cleaner",
  "Pest Control",
  "Other",
]

const alertOptions = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
]

export function SignupModal({ onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    trade: "",
    businessName: "",
    mobile: "",
    email: "",
    businessPhone: "",
    alerts: "whatsapp",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.trade) newErrors.trade = "Trade type is required"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.businessPhone.trim()) newErrors.businessPhone = "Business phone is required"
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      onClose()
      // In real implementation, this would redirect or show success
    },
    [validate, onClose]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: 480,
          maxHeight: "90vh",
          background: "#1E2229",
          borderRadius: 16,
          padding: 32,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "#9CA3AF", minHeight: 48, minWidth: 48 }}
          aria-label="Close signup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2
          id="signup-title"
          className="text-2xl font-bold pr-8"
          style={{ color: "#FFFFFF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Get Katie answering your calls
        </h2>
        <p className="mt-2" style={{ fontSize: 14, color: "#9CA3AF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
          Try Katie free for 7 days on Starter. No card required.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Full name <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              id="signup-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2"
              style={{
                background: "#111418",
                border: errors.name ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              placeholder="e.g. John Smith"
            />
            {errors.name && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.name}</p>}
          </div>

          {/* Trade type */}
          <div>
            <label htmlFor="signup-trade" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Trade type <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <select
              id="signup-trade"
              value={formData.trade}
              onChange={(e) => handleChange("trade", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 appearance-none"
              style={{
                background: "#111418",
                border: errors.trade ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                color: formData.trade ? "#FFFFFF" : "#6B7280",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              <option value="" disabled>Select your trade</option>
              {tradeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.trade && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.trade}</p>}
          </div>

          {/* Business name (optional) */}
          <div>
            <label htmlFor="signup-business" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Business name <span style={{ color: "#6B7280" }}>(optional)</span>
            </label>
            <input
              id="signup-business"
              type="text"
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2"
              style={{
                background: "#111418",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              placeholder="e.g. Smith Plumbing Ltd"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="signup-mobile" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Mobile number <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              id="signup-mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2"
              style={{
                background: "#111418",
                border: errors.mobile ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              placeholder="e.g. 07700 900123"
            />
            {errors.mobile && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Email address <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              id="signup-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2"
              style={{
                background: "#111418",
                border: errors.email ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              placeholder="e.g. john@smithplumbing.co.uk"
            />
            {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
          </div>

          {/* Business phone */}
          <div>
            <label htmlFor="signup-phone" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Business phone number <span style={{ color: "#EF4444" }}>*</span>
              <span className="block font-normal" style={{ fontSize: 12, color: "#6B7280" }}>
                The number Katie will answer
              </span>
            </label>
            <input
              id="signup-phone"
              type="tel"
              value={formData.businessPhone}
              onChange={(e) => handleChange("businessPhone", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2"
              style={{
                background: "#111418",
                border: errors.businessPhone ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              placeholder="e.g. 0117 123 4567"
            />
            {errors.businessPhone && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.businessPhone}</p>}
          </div>

          {/* Preferred alerts */}
          <div>
            <label htmlFor="signup-alerts" className="block text-sm font-medium mb-1" style={{ color: "#D1D5DB" }}>
              Preferred alert method
            </label>
            <select
              id="signup-alerts"
              value={formData.alerts}
              onChange={(e) => handleChange("alerts", e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors focus:ring-2 appearance-none"
              style={{
                background: "#111418",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              {alertOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

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
                Setting up...
              </>
            ) : (
              <>
                Start my 7-day Katie trial
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-center" style={{ fontSize: 12, color: "#6B7280", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            Starter plan only · Fair use applies · Cancel anytime
          </p>

          {/* Escape hatch to pricing */}
          <p className="text-center" style={{ fontSize: 14, color: "#9CA3AF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            Want Starter, Growth or Pro now?{' '}
            <a
              href="/pricing"
              className="group inline-flex items-center gap-1 transition-colors"
              style={{ color: "#10B981", fontWeight: 500, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <span className="underline underline-offset-2 decoration-transparent group-hover:decoration-current transition-all">
                View all plans
              </span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </p>

          {/* WhatsApp alternative */}
          <a
            href="https://wa.me/447831643012"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center transition-colors hover:underline"
            style={{ fontSize: 14, color: "#10B981", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Prefer WhatsApp? Start via chat →
          </a>
        </form>
      </motion.div>
    </motion.div>
  )
}
