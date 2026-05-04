"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2, Mail, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { joinWaitlist } from "@/lib/supabase"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<{ position?: number; message?: string }>({})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")
    try {
      const data = await joinWaitlist({ email, company, name })
      setResult({ position: data.position, message: data.message })
      setStatus("success")
    } catch (err) {
      console.error("Waitlist error:", err)
      setStatus("error")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[var(--rex-green)]/20 border border-[var(--rex-green)]/30 rounded-2xl p-6 text-center"
          >
            <CheckCircle2 className="w-10 h-10 text-[var(--rex-green)] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-white/70 text-sm">
              We'll be in touch to confirm your details and get you set up.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--rex-green)] focus:border-transparent transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              size="lg"
              className="w-full bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold py-6 text-lg gap-3 shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email dru@whoz.ai
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
