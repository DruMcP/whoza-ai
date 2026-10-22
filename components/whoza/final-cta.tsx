"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Star, Eye, CheckCircle2 } from "lucide-react"
import { WaitlistModal } from "./waitlist-modal"

import { trackCTA } from "@/lib/gtag"

const teamMembers = [
  { name: "Katie", icon: Phone, bgClass: "bg-white/[0.06] border-white/10", iconClass: "text-[#6ee7b7]" },
  { name: "Mark", icon: Phone, bgClass: "bg-white/[0.06] border-white/10", iconClass: "text-[#6ee7b7]" },
  { name: "Claire", icon: Star, bgClass: "bg-white/[0.06] border-white/10", iconClass: "text-[#6ee7b7]" },
  { name: "Rex", icon: Eye, bgClass: "bg-white/[0.06] border-white/10", iconClass: "text-[#6ee7b7]" },
]

export function FinalCTA() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  
  return (
    <>
    <section id="final-cta" className="v2-section bg-[var(--v2-navy)] relative overflow-hidden dark-section" aria-label="Call to action">
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
              className={`w-14 h-14 rounded-2xl ${member.bgClass} border flex items-center justify-center`}
            >
              <member.icon className={`w-6 h-6 ${member.iconClass}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="v2-h1 text-white text-balance reveal">
            Don't Miss Another Job
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Every missed call is a job going to your competitor.
            <span className="block mt-3 font-semibold text-[#6ee7b7]">Try Whoza free for 7 days on Starter.</span>
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
            7-day free trial on Starter: 100 minutes + 10 jobs included. Cancel anytime.
          </div>
        </motion.div>

        {/* Social Proof Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "4.9/5", label: "Average rating from verified users", icon: Star },
          ].map((stat, i) => {
            const StatIcon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center justify-center gap-1 text-xs text-white/50">
                  <StatIcon className="w-3 h-3" />
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-4 flex justify-center">
          {/* Pilot spot counter removed */}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => {
              trackCTA("Start your free week", "final-cta")
              setShowWaitlist(true)
            }}
            className="v2-btn cursor-pointer" style={{ minHeight: 56, padding: "0 30px", fontSize: 17 }}
          >
            Start your free week
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Reassurance */}
        <p className="mt-3 text-sm text-white/50 text-center">
          Set up in 30 minutes and start catching more calls. Prefer to go straight in?{" "}
          <a href="/signup" className="text-[#6ee7b7] hover:underline font-medium">
            Create your account
          </a>
          .
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
              <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
              <span>{point}</span>
            </div>
          ))}
        </motion.div>
      </div>
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} source="final-cta" />}
    </section>
    </>
  )
}
