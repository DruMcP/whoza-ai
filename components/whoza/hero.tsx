"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Play } from "lucide-react"
import { PhoneMockup } from "./phone-mockup"
import { useLocale } from "@/lib/locale-context"

export function Hero() {
  const { country, config } = useLocale()

  return (
    <section className="relative min-h-screen bg-[var(--navy-900)] overflow-hidden pt-16 lg:pt-20">
      {/* AI Revenue Team Banner — flows naturally, pushes content down */}
      <div className="bg-[var(--rex-green)]/20 border-b border-[var(--rex-green)]/30 py-2 lg:py-3 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse shrink-0" />
          <p className="text-center text-[var(--rex-green)] text-xs sm:text-sm lg:text-lg font-bold leading-snug">
            Your 24/7 AI Revenue Team for answering calls, capturing enquiries and winning more work
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
            {/* H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              Turn missed calls into booked jobs, 5-star reviews, and more work every week — automatically.
            </h1>

            {/* Support Paragraph */}
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Whoza answers your calls, qualifies real customer enquiries, and sends them to WhatsApp — ready to accept, call back or decline.
              <span className="block mt-2 text-white font-semibold">No apps. No contracts. No logins. Just real enquiries sent to your phone.</span>
            </p>

            {/* CTA Buttons — SEO: using <a> tags for crawlability */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://wa.me/447831643012"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-6 py-5 text-lg sm:px-10 sm:py-7 sm:text-xl gap-3 group shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-105 rounded-lg"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                Hear Katie Answer a Call
              </a>
              <a 
                href="#final-cta"
                className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white hover:bg-white/10 px-6 py-5 text-lg sm:px-8 sm:py-6 gap-2 rounded-lg transition-colors"
              >
                Join Early Access
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Audio Cue — SEO: using <a> tag for crawlability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <a 
                href="https://wa.me/447831643012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                Hear Katie answer a call — 30 second demo
              </a>
            </motion.div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/60">
              {["Set up in 30 minutes", "Works with your phone", "No app required"].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
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
          className="mt-16 lg:mt-24 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "3 sec", label: "Missed call answered" },
            { value: "1 tap", label: "Enquiry captured" },
            { value: "£140+", label: "Revenue per job" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--off-white)] to-transparent" />
    </section>
  )
}
