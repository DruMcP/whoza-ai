"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, BarChart3, Star, Eye, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"

const teamMembers = [
  { name: "Katie", icon: Phone, bgClass: "bg-[var(--katie-blue)]/20 border-[var(--katie-blue)]/30", iconClass: "text-[var(--katie-blue)]" },
  { name: "Mark", icon: Phone, bgClass: "bg-[var(--mark-grey)]/20 border-[var(--mark-grey)]/30", iconClass: "text-[var(--mark-grey)]" },
  { name: "Claire", icon: Star, bgClass: "bg-[var(--claire-amber)]/20 border-[var(--claire-amber)]/30", iconClass: "text-[var(--claire-amber)]" },
  { name: "Rex", icon: Eye, bgClass: "bg-[var(--rex-green)]/20 border-[var(--rex-green)]/30", iconClass: "text-[var(--rex-green)]" },
]

export function FinalCTA() {
  const { country, config } = useLocale()
  
  return (
    <section className="py-24 lg:py-40 bg-[var(--navy-900)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--katie-blue)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--rex-green)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Team Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`w-16 h-16 rounded-2xl ${member.bgClass} border flex items-center justify-center`}
            >
              <member.icon className={`w-8 h-8 ${member.iconClass}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight text-balance">
            Stop Losing Revenue{" "}
            <span className="text-red-400">This Week</span>
          </h2>
          <p className="mt-8 text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto text-pretty">
            Every day you wait = {config.currencySymbol}200+ walking to your competitors.
            <span className="block mt-3 font-bold text-[var(--rex-green)] text-2xl">Installed in 30 minutes. No risk.</span>
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
            No results in 30 days? We extend free.
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg"
            className="bg-[var(--rex-green)] hover:bg-[var(--rex-green)]/90 text-white font-bold px-12 py-7 text-xl gap-3 shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-105"
          >
            Get Free Jobs Now
            <ArrowRight className="w-6 h-6" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            Book Demo Call
          </Button>
        </motion.div>

        {/* CTA Urgency */}
        <p className="mt-3 text-sm text-white/50 text-center">
          Most customers see their first booked job within days.
        </p>

        {/* Risk Reversal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 px-6 py-3 rounded-full bg-[var(--rex-green)]/20 border border-[var(--rex-green)]/30 inline-flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5 text-[var(--rex-green)]" />
          <span className="text-white font-semibold">No results in 30 days? We extend free.</span>
        </motion.div>

        {/* Trust Points */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-white/50"
        >
          {["Installed in 30 minutes", "Runs in the background", "Always working for you"].map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
              <span>{point}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
