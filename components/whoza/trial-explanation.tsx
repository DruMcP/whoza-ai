"use client"

import { motion } from "framer-motion"
import { Clock, Phone, MessageCircle, CheckCircle2, ArrowRight, Shield } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "We Set Up Whoza on Your Number",
    description: "Forward your business number to Whoza. Takes 30 minutes. No tech skills needed.",
    icon: Clock,
    time: "30 min",
    bgClass: "bg-[var(--katie-blue)]",
    textClass: "text-[var(--katie-blue)]",
  },
  {
    number: "02",
    title: "We Answer Your Calls",
    description: "Katie or Mark answers every call, qualifies the enquiry, and sends it to your phone.",
    icon: Phone,
    time: "24/7",
    bgClass: "bg-[var(--rex-green)]",
    textClass: "text-[var(--rex-green)]",
  },
  {
    number: "03",
    title: "You Accept Jobs and Get Paid",
    description: "Real enquiries land on your phone. Tap to accept, call back or decline. Enquiry captured.",
    icon: MessageCircle,
    time: "Instant",
    bgClass: "bg-[var(--claire-amber)]",
    textClass: "text-[var(--claire-amber)]",
  },
  {
    number: "04",
    title: "Only Continue If It's Working",
    description: "See real results first. No upfront cost. Cancel anytime if it's not right for you.",
    icon: CheckCircle2,
    time: "No commitment",
    bgClass: "bg-[var(--mark-grey)]",
    textClass: "text-[var(--mark-grey)]",
  },
]

export function TrialExplanation() {
  return (
    <section id="trial" className="section-padding-lg bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Zero Risk
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            How Whoza Works
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            From missed call to captured enquiry — automatically.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 border border-[var(--border)] h-full shadow-sm">
                {/* Number Badge */}
                <div className={`w-10 h-10 rounded-xl ${step.bgClass} flex items-center justify-center text-white font-bold text-sm shadow-lg mb-6`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.bgClass}/10 flex items-center justify-center mb-4`}>
                  <step.icon className={`w-6 h-6 ${step.textClass}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--navy-900)] mb-3">{step.title}</h3>
                <p className="text-[var(--slate-500)] leading-relaxed mb-4">{step.description}</p>

                {/* Time badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${step.bgClass}/10 text-sm font-semibold ${step.textClass}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {step.time}
                </div>
              </div>

              {/* Connecting arrow (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-[var(--slate-300)]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* No Website? No Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/20">
            <div className="w-10 h-10 rounded-xl bg-[var(--katie-blue)]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[var(--katie-blue)]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--navy-900)]">No website? No problem.</h4>
              <p className="text-sm text-[var(--slate-500)] mt-1">
                We build your AI call profile from your services, FAQs, prices, service areas and preferred job types during onboarding.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Speed proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20">
            <CheckCircle2 className="w-5 h-5 text-[var(--rex-green)]" />
            <span className="text-[var(--navy-900)] font-semibold">
              Be the first to experience AI call answering for trades.
            </span>
          </div>
        </motion.div>

        {/* Pre-Launch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[var(--slate-500)] mb-6">
            See how AI call answering works for your trade.
          </p>
          <a 
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-10 py-7 text-xl gap-3 shadow-2xl shadow-[var(--rex-green)]/40 transition-all hover:scale-105"
          >
            Get Katie answering my calls
            <ArrowRight className="w-6 h-6" />
          </a>
          <p className="mt-3 text-sm text-[var(--slate-500)]">
            Be the first to experience AI call answering for trades.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
