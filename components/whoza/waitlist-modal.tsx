"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { WaitlistForm } from "./waitlist-form"

interface WaitlistModalProps {
  onClose: () => void
  source?: string
  plan?: string
}

export function WaitlistModal({ onClose, source = "homepage", plan }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false)

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence>
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <svg
                  className="w-12 h-12 text-emerald-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-white font-sans">
                You're on the list!
              </h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Dru will personally be in touch within 48 hours to get you started.
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
                {plan ? `Start Free Trial — ${plan} Plan` : "Start Your Free Trial"}
              </h2>
              <p className="mt-2 text-sm text-slate-400 font-sans">
                Limited to 50 tradespeople. You're getting early access.
              </p>

              {/* Form */}
              <div className="mt-6">
                <WaitlistForm
                  source={source}
                  plan={plan}
                  variant="modal"
                  onSubmitted={() => setSubmitted(true)}
                />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
