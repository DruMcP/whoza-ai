"use client"

import { motion } from "framer-motion"
import { Phone, ClipboardCheck, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    title: "We Answer Every Call",
    description: "Customer calls, Katie or Mark answers within 3 seconds. No voicemail, no missed opportunity.",
    icon: Phone,
    bgClass: "bg-[var(--katie-blue)]",
    bgLightClass: "bg-[var(--katie-blue)]/10",
    textClass: "text-[var(--katie-blue)]",
    details: [
      "24/7 availability",
      "Natural conversation",
      "Understands trade terms",
    ],
  },
  {
    number: "02",
    title: "We Book Real Enquiries",
    description: "Katie gathers all the details: what they need, when they need it, where they are.",
    icon: ClipboardCheck,
    bgClass: "bg-[var(--rex-green)]",
    bgLightClass: "bg-[var(--rex-green)]/10",
    textClass: "text-[var(--rex-green)]",
    details: [
      "Collects job requirements",
      "Confirms location & urgency",
      "Filters time-wasters",
    ],
  },
  {
    number: "03",
    title: "We Send Them to Your Phone",
    description: "Qualified enquiry lands on your phone instantly. Customer name, job type, location, time, and value.",
    icon: MessageCircle,
    bgClass: "bg-[var(--claire-amber)]",
    bgLightClass: "bg-[var(--claire-amber)]/10",
    textClass: "text-[var(--claire-amber)]",
    details: [
      "Full job details on your phone",
      "Accept, decline, or callback",
      "2 taps to confirm",
    ],
  },
  {
    number: "04",
    title: "You Accept Jobs and Get Paid",
    description: "Tap accept. Customer gets confirmation. Job is in your calendar. Done.",
    icon: CheckCircle2,
    bgClass: "bg-[var(--mark-grey)]",
    bgLightClass: "bg-[var(--mark-grey)]/10",
    textClass: "text-[var(--mark-grey)]",
    details: [
      "Customer confirmed instantly",
      "Calendar synced automatically",
      "You only deal with real jobs",
    ],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] text-sm font-medium mb-4">
            Installed in 30 Minutes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Call → Enquiry → WhatsApp → Paid
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            The complete loop from missed call to booked job. 
            <span className="font-semibold text-[var(--navy-900)]"> You only deal with real enquiries.</span>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--katie-blue)] via-[var(--rex-green)] via-[var(--claire-amber)] to-[var(--mark-grey)]" />
          
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Card */}
                <div className="relative bg-[var(--off-white)] rounded-3xl p-8 border border-[var(--border)] h-full">
                  {/* Number Badge */}
                  <div className={`absolute -top-4 left-8 w-10 h-10 rounded-xl ${step.bgClass} flex items-center justify-center text-white font-bold text-sm shadow-lg z-10`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${step.bgLightClass} flex items-center justify-center mt-4 mb-6`}>
                    <step.icon className={`w-8 h-8 ${step.textClass}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--navy-900)] mb-3">{step.title}</h3>
                  <p className="text-[var(--slate-500)] mb-6 leading-relaxed">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 ${step.textClass} mt-0.5 shrink-0`} />
                        <span className="text-[var(--slate-500)]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-[var(--slate-400)] rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--slate-500)] mb-2">
            Set up in 30 minutes once we go live.
          </p>
          <p className="text-sm text-[var(--slate-500)] mb-6">
            Early access is now open for selected UK trades businesses.
          </p>
          <Button 
            size="lg"
            className="bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-semibold px-8"
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
