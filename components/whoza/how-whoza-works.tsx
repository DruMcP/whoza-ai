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
      { icon: ClipboardCheck, label: "AI Answers", desc: "Your chosen voice takes detailed notes 24/7" },
      { icon: MessageCircle, label: "Job Qualified", desc: "Urgency-flagged. Time-wasters filtered. Emergencies prioritised." },
      { icon: ClipboardCheck, label: "AI Call Notes", desc: "Every conversation captured as text" },
      { icon: Check, label: "Spam Filtered", desc: "Sales calls blocked automatically" },
    ],
  },
  {
    id: "deliver",
    label: "Deliver",
    color: "var(--claire-amber)",
    steps: [
      { icon: MessageCircle, label: "Sent to Phone", desc: "Detailed notes via WhatsApp or SMS" },
      { icon: Check, label: "You Accept", desc: "One tap to confirm. Auto-synced to your calendar (Growth+)." },
      { icon: Calendar, label: "Enquiry Captured", desc: "Searchable dashboard + exportable logs." },
      { icon: Phone, label: "Keep Your Number", desc: "Your customers never know anything changed" },
    ],
  },
  {
    id: "convert",
    label: "Convert",
    color: "var(--mark-grey)",
    steps: [
      { icon: Star, label: "Job Completed", desc: "You do the work" },
      { icon: Star, label: "Review Requested", desc: "Claire auto-follows up. Google reviews on autopilot." },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    color: "var(--rex-green)",
    steps: [
      { icon: TrendingUp, label: "Rex Analyses", desc: "Monthly competitor check" },
      { icon: TrendingUp, label: "Growth+ Actions", desc: "Weekly recommendations" },
      { icon: TrendingUp, label: "More Calls", desc: "Weekly insights. Advanced analytics (Pro+). More jobs, every week." },
      { icon: TrendingUp, label: "Weekly Summary", desc: "Your performance every Monday" },
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
          <span className="inline-block px-6 py-3 rounded-full bg-[#e0f2fe] text-[#0369a1] text-lg font-bold mb-5 border-2 border-[#0369a1]/30 shadow-md tracking-wide">
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
      </div>
    </section>
  )
}
