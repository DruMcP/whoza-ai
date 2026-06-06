"use client"

import { motion } from "framer-motion"
import { FileText, MessageCircle, Star, TrendingUp, ArrowRight, Shield, Calendar } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const stages = [
  {
    number: "01",
    stage: "CAPTURE",
    title: "AI Answers — Call Notes, Spam Filter, Urgent Flags",
    description: "Your chosen voice answers every call 24/7. AI takes detailed text notes, filters spam, and flags urgent jobs instantly. Every conversation captured as searchable text.",
    icon: FileText,
    color: "var(--katie-blue)",
    bgLight: "bg-[var(--katie-blue)]/10",
    textColor: "text-[var(--katie-blue)]",
    borderColor: "border-[var(--katie-blue)]/30",
  },
  {
    number: "02",
    stage: "DELIVER",
    title: "Deliver — WhatsApp, Calendar Sync, Keep Your Number",
    description: "Searchable dashboard, auto-synced calendar, and keep your existing number. All job details sent to your phone instantly. Your customers never know anything changed.",
    icon: Calendar,
    color: "var(--claire-amber)",
    bgLight: "bg-[var(--claire-amber)]/10",
    textColor: "text-[var(--claire-amber)]",
    borderColor: "border-[var(--claire-amber)]/30",
  },
  {
    number: "03",
    stage: "CONVERT",
    title: "Convert — Google Reviews on Autopilot",
    description: "Claire auto-requests Google reviews after every completed job. More reviews = more trust = more customers choosing you. Turn every job into future work.",
    icon: Star,
    color: "var(--rex-green)",
    bgLight: "bg-[var(--rex-green)]/10",
    textColor: "text-[var(--rex-green)]",
    borderColor: "border-[var(--rex-green)]/30",
  },
  {
    number: "04",
    stage: "GROW",
    title: "Grow — Weekly Insights, Advanced Analytics",
    description: "Weekly summary email every Monday. Advanced analytics (Pro+). Rex insights tell you what to fix so you show up more in ChatGPT and Google AI. More calls. More jobs.",
    icon: TrendingUp,
    color: "var(--mark-grey)",
    bgLight: "bg-[var(--mark-grey)]/10",
    textColor: "text-[var(--mark-grey)]",
    borderColor: "border-[var(--mark-grey)]/30",
  },
]

export function RevenueSystem() {
  const { config } = useLocale()

  return (
    <section className="section-padding-lg bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--navy-900) 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--navy-900)] text-white text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            The Complete System
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Capture → Deliver →{" "}
            <span className="text-[var(--rex-green)]">Grow</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Not just an AI receptionist. A complete system that turns missed calls into captured enquiries and completed jobs into more money.
          </p>
        </motion.div>

        {/* System Flow */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--katie-blue)] via-[var(--claire-amber)] via-[var(--rex-green)] to-[var(--mark-grey)] rounded-full -translate-y-1/2" />

          <div className="grid lg:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Card */}
                <div className={`bg-white rounded-2xl p-6 border-2 ${stage.borderColor} shadow-lg relative z-10`}>
                  {/* Stage Number */}
                  <div className={`inline-flex items-center gap-2 ${stage.bgLight} ${stage.textColor} px-3 py-1 rounded-full text-xs font-bold mb-4`}>
                    <span>{stage.number}</span>
                    <span>{stage.stage}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${stage.bgLight} flex items-center justify-center mb-4`}>
                    <stage.icon className={`w-7 h-7 ${stage.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--navy-900)] mb-2">{stage.title}</h3>
                  <p className="text-[var(--slate-500)] text-sm leading-relaxed">{stage.description}</p>
                </div>

                {/* Arrow (Desktop) */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-20 w-6 h-6 rounded-full bg-white border-2 border-[var(--border)] items-center justify-center -translate-y-1/2">
                    <ArrowRight className="w-3 h-3 text-[var(--slate-400)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap gap-6 justify-center text-sm">
            {[
              "Always working in the background",
              "Installed in 30 minutes",
              "No training required"
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-[var(--slate-500)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--rex-green)]" />
                {item}
              </span>
            ))}
          </div>
          
          <div className="mt-8">
            <a 
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 h-11 text-base transition-colors"
          >
            See The Full System
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
