"use client"

import { motion } from "framer-motion"
import { Phone, ClipboardCheck, MessageCircle, Check, Calendar, Star, TrendingUp, ArrowRight, ArrowDown } from "lucide-react"

const phases = [
  {
    id: "capture",
    label: "Capture",
    color: "var(--katie-blue)",
    steps: [
      { icon: Phone, label: "Call Comes In", desc: "Missed or after hours" },
      { icon: ClipboardCheck, label: "AI Answers", desc: "Katie handles it 24/7" },
      { icon: MessageCircle, label: "Job Qualified", desc: "Filters out time-wasters" },
    ],
  },
  {
    id: "deliver",
    label: "Deliver",
    color: "var(--claire-amber)",
    steps: [
      { icon: MessageCircle, label: "Sent to Phone", desc: "Via WhatsApp or SMS" },
      { icon: Check, label: "You Accept", desc: "One tap to confirm" },
      { icon: Calendar, label: "Enquiry Captured", desc: "In your dashboard" },
    ],
  },
  {
    id: "convert",
    label: "Convert",
    color: "var(--mark-grey)",
    steps: [
      { icon: Star, label: "Job Completed", desc: "You do the work" },
      { icon: Star, label: "Review Requested", desc: "Claire auto-follows up" },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    color: "var(--rex-green)",
    steps: [
      { icon: TrendingUp, label: "Rex Analyses", desc: "Monthly competitor check" },
      { icon: TrendingUp, label: "Growth+ Actions", desc: "Weekly recommendations" },
      { icon: TrendingUp, label: "More Calls", desc: "More jobs, every week" },
    ],
  },
]

export function HowWhozaWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-bold mb-4">
            The Complete Revenue System
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
            From Missed Call to{" "}
            <span className="text-[var(--rex-green)]">5-Star Review</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Fully automated. Always running. More work every week.
          </p>
        </motion.div>

        {/* 4 Phase Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, phaseIdx) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: phaseIdx * 0.15, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 border border-[var(--slate-200)] shadow-md hover:shadow-lg transition-all"
            >
              {/* Phase header */}
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold mb-5"
                style={{ 
                  backgroundColor: `${phase.color}15`,
                  color: phase.color,
                  border: `1px solid ${phase.color}30`
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
                Phase {phaseIdx + 1}: {phase.label}
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {phase.steps.map((step, stepIdx) => {
                  const Icon = step.icon
                  return (
                    <div key={step.label} className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${phase.color}12` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: phase.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[var(--navy-900)]">{step.label}</div>
                        <div className="text-xs text-[var(--slate-500)]">{step.desc}</div>
                      </div>
                      {stepIdx < phase.steps.length - 1 && (
                        <ArrowDown className="w-3 h-3 text-[var(--slate-300)] shrink-0 mt-1 ml-auto" />
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#final-cta"
            className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-10 py-4 text-lg gap-3 shadow-lg shadow-[var(--rex-green)]/20 rounded-lg transition-all hover:scale-105"
          >
            See it in action
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
