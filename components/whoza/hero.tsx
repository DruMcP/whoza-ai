"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneMockup } from "./phone-mockup"
import { useLocale } from "@/lib/locale-context"

export function Hero() {
  const { country, config } = useLocale()

  return (
    <section className="relative min-h-screen bg-[var(--navy-900)] overflow-hidden pt-20 lg:pt-24">
      {/* Urgency Strip */}
      <div className="absolute top-16 lg:top-20 left-0 right-0 bg-red-600 py-3 z-10">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <p className="text-center text-white text-sm sm:text-base font-bold">
            Most trades lose {config.currencySymbol}1,200–{config.currencySymbol}2,400 every week from missed calls and slow response
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--katie-blue)]/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--rex-green)]/15 rounded-full blur-[100px] opacity-40" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <span className="text-sm text-white/80">
                AI Revenue System for {country === "uk" ? "UK" : "US"} {config.language.tradesPeople}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              Turn Missed Calls Into{" "}
              <span className="text-[var(--rex-green)]">Booked Jobs</span>
              {" "}— Sent Straight to Your Phone
            </h1>

            {/* Pain Line — added for clarity */}
            <p className="mt-4 text-xl text-red-400 font-bold text-center lg:text-left">
              Every missed call is a lost job.
            </p>

            {/* Subheadline — sharpened for jobs/phone/immediacy */}
            <p className="mt-4 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Katie answers every call in 3 seconds, books the job, and sends it straight to your phone via WhatsApp.
              <span className="block mt-2 text-white font-semibold">No apps. No logins. Just jobs sent to your phone.</span>
              <span className="block mt-2 text-white font-semibold">Installed in 30 minutes. First jobs typically within days.</span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[var(--rex-green)] hover:bg-[var(--rex-green)]/90 text-white font-bold px-10 py-7 text-xl gap-3 group shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-105"
              >
                Get 10 Free Booked Jobs
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg gap-2"
              >
                <Play className="w-5 h-5" />
                Book Demo
              </Button>
            </div>

            {/* CTA Reassurance */}
            <p className="mt-3 text-sm text-white/60 text-center lg:text-left">
              Setup takes 30 minutes. First jobs typically within days.
            </p>

            {/* Live Signal */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/80">
              <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <span className="font-semibold text-white">Jobs booked today: 47</span>
              <span className="text-white/40">across UK trades</span>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/60">
              {["Installed in 30 minutes", "Live today", "Always working for you"].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Urgency */}
            <p className="mt-3 text-sm text-white/50 text-center lg:text-left">
              Most customers see their first booked job within days.
            </p>

            {/* Micro Proof Signals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <span className="text-sm text-white/80">Call answered in 3 seconds • Job booked: {config.currencySymbol}140 boiler repair • Confirmed instantly</span>
              <span className="text-xs text-white/40">2 min ago</span>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Stats Bar — Missed calls → Jobs → Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "3 sec", label: "Missed call answered" },
            { value: "1 tap", label: "Job booked" },
            { value: "£140+", label: "Revenue per job" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--off-white)] to-transparent" />
    </section>
  )
}
