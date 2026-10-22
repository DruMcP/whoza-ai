"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { trackCTA, trackPricingView } from "@/lib/gtag"
import { useLocale } from "@/lib/locale-context"
import { WaitlistModal } from "./waitlist-modal"
import { useState } from "react"

const colorStyles = {
  blue: {
    border: "border-[var(--katie-blue)]",
    bg: "bg-[var(--katie-blue)]",
    text: "text-[var(--katie-blue)]",
    hover: "hover:bg-[var(--katie-blue)]/90",
  },
  green: {
    border: "border-[var(--rex-green)]",
    bg: "bg-[var(--rex-green)]",
    text: "text-[var(--rex-green)]",
    hover: "hover:bg-[var(--rex-green-hover)]",
  },
  amber: {
    border: "border-[var(--claire-amber)]",
    bg: "bg-[var(--claire-amber)]",
    text: "text-[var(--claire-amber)]",
    hover: "hover:bg-[var(--claire-amber)]/90",
  },
  grey: {
    border: "border-[var(--mark-grey)]",
    bg: "bg-[var(--mark-grey)]",
    text: "text-[var(--mark-grey)]",
    hover: "hover:bg-[var(--mark-grey)]/90",
  },
}

export function PricingSummary() {
  const { config } = useLocale()
  const cs = config.currencySymbol
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistPlan, setWaitlistPlan] = useState("")

  const openWaitlist = (plan: string) => {
    trackPricingView(plan)
    trackCTA("Choose Your Plan", `pricing-summary-${plan}`)
    setWaitlistPlan(plan)
    setShowWaitlist(true)
  }

  const plans = [
    {
      name: "Starter",
      description: "Capture + deliver jobs",
      price: String(config.pricing.starter),
      jobsIncluded: "10",
      period: "month",
      color: "blue" as keyof typeof colorStyles,
      popular: false,
      features: [
        "AI call handling 24/7",
        "WhatsApp job delivery",
        "Calendar sync",
        "12 AI voice options",
      ],
    },
    {
      name: "Growth",
      description: "Qualify + book more jobs",
      price: String(config.pricing.growth),
      jobsIncluded: "20",
      period: "month",
      color: "green" as keyof typeof colorStyles,
      popular: true,
      features: [
        "Everything in Starter",
        "Zapier integration",
        "Custom WhatsApp templates",
        "Weekly summary email",
      ],
    },
    {
      name: "Pro",
      description: "Scale with analytics",
      price: String(config.pricing.pro),
      jobsIncluded: "40",
      period: "month",
      color: "amber" as keyof typeof colorStyles,
      popular: false,
      features: [
        "Everything in Growth",
        "Advanced analytics",
        "Team notifications",
        "White-label WhatsApp",
      ],
    },
  ]

  return (
    <section id="pricing" className="v2-section bg-[var(--off-white)]" aria-label="Pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="v2-eyebrow">Simple, Transparent Pricing</span>
            <h2 className="v2-h2 mb-5">
              Start Free. Scale as You Grow.
            </h2>
            <p className="v2-lead max-w-2xl mx-auto">
              No hidden fees. No long-term contracts. Cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            // One accent site-wide: the popular plan is the dark card, the rest are plain.
            const dark = plan.popular
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[20px] border p-6 lg:p-8 flex flex-col ${
                  dark ? "bg-[var(--v2-navy)] border-[var(--v2-navy)] text-white" : "bg-white border-[var(--v2-line)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--v2-green)] text-white px-4 py-1 rounded-full text-[13px] font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-[var(--v2-ink)]"}`}>{plan.name}</h3>
                  <p className={`text-sm ${dark ? "text-white/60" : "text-[var(--v2-muted)]"}`}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold tracking-tight ${dark ? "text-white" : "text-[var(--v2-ink)]"}`}>
                      {cs}{plan.price}
                    </span>
                    <span className={dark ? "text-white/60" : "text-[var(--v2-muted)]"}>/{plan.period}</span>
                  </div>
                  <p className={`text-sm mt-1 ${dark ? "text-white/60" : "text-[var(--v2-muted)]"}`}>
                    {plan.jobsIncluded} jobs included
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${dark ? "text-[#6ee7b7]" : "text-[var(--v2-green)]"}`} />
                      <span className={`text-sm ${dark ? "text-white/80" : "text-[var(--v2-body)]"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openWaitlist(plan.name)}
                  className={`${dark ? "v2-btn" : "v2-btn-secondary"} w-full cursor-pointer`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] font-semibold transition-colors"
          >
            See full plan comparison
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {showWaitlist && (
        <WaitlistModal
          onClose={() => setShowWaitlist(false)}
          plan={waitlistPlan}
        />
      )}
    </section>
  )
}
