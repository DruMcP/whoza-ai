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
      {/* AI Revenue Team Banner */}
      <div className="absolute top-16 lg:top-20 left-0 right-0 bg-[var(--rex-green)]/20 border-b border-[var(--rex-green)]/30 py-3 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse shrink-0" />
          <p className="text-center text-[var(--rex-green)] text-sm sm:text-base font-bold">
            Katie, Mark, Claire and Rex are your AI Revenue Team.
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
            {/* Pre-Headline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-base text-white/70 mb-4 text-center lg:text-left"
            >
              Katie, Mark, Claire and Rex are your AI Revenue Team.
            </motion.p>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              Turn missed calls into booked jobs, 5-star reviews, and more work every week — automatically.
            </h1>

            {/* Support Paragraph */}
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              We answer your calls, qualify real customer enquiries, and send them straight to your phone — ready to accept.
              <span className="block mt-2 text-white font-semibold">No apps. No logins. Just enquiries sent to your phone.</span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-10 py-7 text-xl gap-3 group shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-105"
                onClick={() => window.open('https://wa.me/447831643012', '_blank')}
              >
                <Play className="w-6 h-6" />
                Hear Katie Answer a Call
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg gap-2"
                onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join Early Access
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Audio Cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center gap-2 justify-center lg:justify-start cursor-pointer"
              onClick={() => window.open('https://wa.me/447831643012', '_blank')}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <span className="text-sm text-white/60 hover:text-white/80 transition-colors">Hear Katie answer a call — 30 second demo</span>
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

            {/* Early Access Note */}
            <p className="mt-4 text-sm text-white/50 text-center lg:text-left">
              Early access is now open for selected UK trades businesses.
            </p>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 cursor-pointer hover:bg-white/15 transition-colors"
              onClick={() => window.open('https://wa.me/447831643012', '_blank')}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
              <span className="text-sm text-white/80">Hear Katie answer a call — 30 second demo</span>
              <span className="text-xs text-[var(--rex-green)]">Click to listen →</span>
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
