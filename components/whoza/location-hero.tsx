"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Play, MapPin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneMockup } from "./phone-mockup"
import { useLocale } from "@/lib/locale-context"

interface LocationHeroProps {
  city: string
  trade?: string
  region?: string
  jobsThisWeek?: number
}

export function LocationHero({ city, trade, region, jobsThisWeek = 127 }: LocationHeroProps) {
  const { country, config } = useLocale()

  const headline = trade
    ? `AI That Books ${trade} Jobs in ${city}`
    : `AI That Books Jobs for ${config.language.tradesPeople} in ${city}`

  return (
    <section className="relative min-h-screen bg-[var(--navy-900)] overflow-hidden pt-20 lg:pt-24">
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
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/20 border border-[var(--rex-green)]/30 mb-6"
            >
              <MapPin className="w-4 h-4 text-[var(--rex-green)]" />
              <span className="text-sm text-white font-medium">
                {jobsThisWeek}+ jobs booked this week in {city}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Turn missed calls into booked jobs — and completed jobs into more future work. 
              Katie captures enquiries, Rex finds opportunities, and Claire turns every finished job into your next customer.
              <span className="block mt-2 text-white font-semibold">Installed in 30 minutes. No risk.</span>
            </p>

            {/* Local Proof */}
            <div className="mt-6 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <TrendingUp className="w-4 h-4 text-[var(--claire-amber)]" />
                <span>Local demand is high in {city}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8 py-6 text-lg gap-2 group"
              >
                Start Capturing Jobs in {city}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg gap-2"
              >
                <Play className="w-5 h-5" />
                Hear Katie in Action
              </Button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/60">
              {[
                "No credit card required", 
                `Serving ${city} ${region ? `& ${region}` : ""}`, 
                "Live today"
              ].map((point) => (
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
            <PhoneMockup city={city} trade={trade} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--off-white)] to-transparent" />
    </section>
  )
}
