"use client"

import { motion } from "framer-motion"
import { Phone, ClipboardCheck, MessageCircle, Check, Calendar, Star, TrendingUp, ArrowRight } from "lucide-react"

const flowSteps = [
  { icon: Phone, label: "Call Comes In", color: "var(--katie-blue)" },
  { icon: ClipboardCheck, label: "AI Answers", color: "var(--katie-blue)" },
  { icon: MessageCircle, label: "Job Qualified", color: "var(--rex-green)" },
  { icon: MessageCircle, label: "Sent to Phone", color: "var(--claire-amber)" },
  { icon: Check, label: "You Accept", color: "var(--claire-amber)" },
  { icon: Calendar, label: "Enquiry Captured", color: "var(--rex-green)" },
  { icon: Star, label: "Job Completed", color: "var(--mark-grey)" },
  { icon: Star, label: "Review Requested", color: "var(--mark-grey)" },
  { icon: TrendingUp, label: "Rex analyses competitors monthly", color: "var(--rex-green)" },
  { icon: TrendingUp, label: "Growth+ get weekly actions", color: "var(--rex-green)" },
  { icon: TrendingUp, label: "More calls, more jobs", color: "var(--rex-green)" },
]

export function HowWhozaWorks() {
  return (
    <section id="how-it-works" className="section-padding-lg bg-[var(--off-white)]">
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

        {/* Visual Flow */}
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[var(--katie-blue)] via-[var(--rex-green)] via-[var(--claire-amber)] to-[var(--mark-grey)] rounded-full" />
            
            <div className="grid grid-cols-11 gap-4">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 relative z-10"
                    style={{ backgroundColor: `${step.color}20`, borderColor: step.color, borderWidth: 2 }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span className="text-xs text-center text-[var(--navy-900)] font-medium leading-tight">{step.label}</span>
                  
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="absolute top-4 -right-2 w-4 h-4 text-[var(--slate-300)]" style={{ transform: 'translateX(50%)' }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Flow - Vertical */}
          <div className="lg:hidden space-y-4">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${step.color}20`, borderColor: step.color, borderWidth: 2 }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm text-[var(--navy-900)] font-medium">{step.label}</span>
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[var(--slate-300)] ml-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 reveal-stagger">
          {[
            { phase: "CAPTURE", items: ["AI answers instantly", "Qualifies the job", "Enquiry captured"], color: "var(--katie-blue)" },
            { phase: "DELIVER", items: ["Job sent via WhatsApp", "You accept or decline", "Customer follow-up sent"], color: "var(--claire-amber)" },
            { phase: "GROW", items: ["Review requested", "Rex analyses competitors monthly", "Growth+ get weekly AI visibility actions", "More calls, more jobs"], color: "var(--rex-green)" },
          ].map((card, index) => (
            <motion.div
              key={card.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm"
            >
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
              >
                {card.phase}
              </div>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[var(--slate-500)]">
                    <Check className="w-4 h-4" style={{ color: card.color }} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Clarity Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-[var(--navy-900)] font-semibold">
            No guesswork. Just clear actions to get more work.
          </p>
        </motion.div>

        {/* Micro Visual - Competitor Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm">
            <p className="text-sm font-bold text-[var(--navy-900)] mb-4 text-center">Rex Weekly Action</p>
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--navy-900)]">32</p>
                <p className="text-xs text-[var(--slate-500)]">Your reviews</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--slate-300)]" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--rex-green)]">41</p>
                <p className="text-xs text-[var(--slate-500)]">Competitor</p>
              </div>
            </div>
            <div className="bg-[var(--rex-green)]/10 rounded-lg px-4 py-3 text-center">
              <p className="text-sm font-semibold text-[var(--rex-green)]">
                → Get 5 more reviews to outrank competitors this week
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
