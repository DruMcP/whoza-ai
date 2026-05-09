"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, BarChart3, Star, Eye, CheckCircle2 } from "lucide-react"
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
    <section id="final-cta" className="section-padding-xl bg-[var(--navy-900)] relative overflow-hidden">
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
            Don't Miss Another Job
          </h2>
          <p className="mt-8 text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto text-pretty">
            Every missed call is a job going to your competitor.
            <span className="block mt-3 font-bold text-[var(--rex-green)] text-2xl">Try Whoza free for 7 days.</span>
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)]" />
            7-day free trial: 20 minutes + 4 jobs included. Cancel anytime.
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              const modal = document.getElementById('signup-modal-trigger')
              if (modal) modal.click()
            }}
            className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-6 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-[var(--rex-green)]/40"
          >
            Get Katie answering my calls
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <a
            href="https://wa.me/447831643012"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg transition-colors"
          >
            Get Katie answering my calls
          </a>
        </motion.div>

        {/* Free Trial Pulse */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/80">
          <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
          <span className="font-semibold text-white">7-day free trial</span>
          <span className="text-white/40">— 20 min + 4 jobs included</span>
        </div>

        {/* Reassurance */}
        <p className="mt-3 text-sm text-white/50 text-center">
          Set up in 30 minutes and start catching more calls.
        </p>

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
