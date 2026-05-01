"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"

const colorStyles = {
  blue: {
    border: "border-[var(--katie-blue)]",
    bg: "bg-[var(--katie-blue)]",
    bgLight: "bg-[var(--katie-blue)]/10",
    text: "text-[var(--katie-blue)]",
    hover: "hover:bg-[var(--katie-blue)]/90",
  },
  green: {
    border: "border-[var(--rex-green)]",
    bg: "bg-[var(--rex-green)]",
    bgLight: "bg-[var(--rex-green)]/10",
    text: "text-[var(--rex-green)]",
    hover: "hover:bg-[var(--rex-green)]/90",
  },
  amber: {
    border: "border-[var(--claire-amber)]",
    bg: "bg-[var(--claire-amber)]",
    bgLight: "bg-[var(--claire-amber)]/10",
    text: "text-[var(--claire-amber)]",
    hover: "hover:bg-[var(--claire-amber)]/90",
  },
  grey: {
    border: "border-[var(--mark-grey)]",
    bg: "bg-[var(--mark-grey)]",
    bgLight: "bg-[var(--mark-grey)]/10",
    text: "text-[var(--mark-grey)]",
    hover: "hover:bg-[var(--mark-grey)]/90",
  },
}

const plans = [
  {
    name: "Starter",
    description: "Capture + deliver jobs",
    price: "59",
    perJob: "4",
    jobsIncluded: "15",
    period: "month",
    color: "blue" as keyof typeof colorStyles,
    popular: false,
    features: [
      { text: "AI call answering 24/7", included: true },
      { text: "15 booked jobs included", included: true },
      { text: "WhatsApp job delivery", included: true },
      { text: "Calendar integration", included: true },
      { text: "SMS confirmations", included: true },
    ],
    cta: "Get 10 Free Jobs",
  },
  {
    name: "Growth",
    description: "Full revenue system",
    price: "119",
    perJob: "3",
    jobsIncluded: "40",
    period: "month",
    color: "green" as keyof typeof colorStyles,
    popular: true,
    features: [
      { text: "Everything in Starter", included: true },
      { text: "40 booked jobs included", included: true },
      { text: "Rex review engine", included: true },
      { text: "Claire competitor intel", included: true },
      { text: "Revenue dashboard", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Get 10 Free Jobs",
  },
  {
    name: "Pro",
    description: "High-volume trades",
    price: "199",
    perJob: "2.50",
    jobsIncluded: "80",
    period: "month",
    color: "amber" as keyof typeof colorStyles,
    popular: false,
    features: [
      { text: "Everything in Growth", included: true },
      { text: "80 booked jobs included", included: true },
      { text: "Multiple phone lines", included: true },
      { text: "Team access", included: true },
      { text: "Advanced analytics", included: true },
    ],
    cta: "Get 10 Free Jobs",
  },
  {
    name: "Scale",
    description: "Multi-location businesses",
    price: "349",
    perJob: "2",
    jobsIncluded: "175",
    period: "month",
    color: "grey" as keyof typeof colorStyles,
    popular: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "175 booked jobs included", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
  },
]



export function Pricing() {
  const { config, formatPrice } = useLocale()
  
  // Adjust plans based on locale pricing
  const localizedPlans = plans.map((plan) => ({
    ...plan,
    price: String(config.pricing[plan.name.toLowerCase() as keyof typeof config.pricing] || plan.price),
  }))

  return (
    <section id="pricing" className="py-24 lg:py-40 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--rex-green)] text-white text-sm font-bold mb-4">
            Zero Risk
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            We Only Get Paid When{" "}
            <span className="text-[var(--rex-green)]">You Get Work</span>
          </h2>
          <p className="mt-6 text-xl text-[var(--slate-500)] text-pretty max-w-2xl mx-auto">
            Jobs included. {config.currencySymbol}2–{config.currencySymbol}4 per extra job. Scales as you grow.
            <span className="block mt-2 font-semibold text-[var(--navy-900)]">Most customers recover their subscription in their first few jobs.</span>
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] font-bold border border-[var(--rex-green)]/20">
            <CheckCircle2 className="w-5 h-5" />
            No results in 30 days? We extend free.
          </div>

          {/* Economics breakdown */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-10 text-center">
            <div className="px-4 py-3 rounded-xl bg-white shadow-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--navy-900)]">{config.currencySymbol}2–{config.currencySymbol}4</div>
              <div className="text-sm text-[var(--slate-500)]">per booked job</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20">
              <div className="text-2xl font-bold text-[var(--rex-green)]">{config.currencySymbol}140+</div>
              <div className="text-sm text-[var(--slate-500)]">avg job value</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white shadow-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--navy-900)]">35x</div>
              <div className="text-sm text-[var(--slate-500)]">return on cost</div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {localizedPlans.map((plan, index) => {
            const colors = colorStyles[plan.color]
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl border ${
                  plan.popular 
                    ? `${colors.border} border-2 shadow-2xl scale-105 z-10` 
                    : "border-[var(--border)]"
                } overflow-hidden`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className={`absolute top-0 left-0 right-0 py-2 ${colors.bg} text-white text-center text-sm font-medium`}>
                    <Sparkles className="inline w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <div className={`p-6 ${plan.popular ? "pt-12" : ""}`}>
                  {/* Plan Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[var(--navy-900)]">{plan.name}</h3>
                    <p className="text-sm text-[var(--slate-500)] mt-1">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[var(--navy-900)]">{config.currencySymbol}{plan.price}</span>
                      <span className="text-[var(--slate-500)]">/{plan.period}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-[var(--rex-green)] font-semibold">{config.currencySymbol}{plan.perJob}/job</span>
                      <span className="text-xs text-[var(--slate-400)]">• {plan.jobsIncluded} jobs included</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 shrink-0 text-[var(--slate-300)]" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-[var(--navy-900)]" : "text-[var(--slate-400)]"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    className={`w-full font-bold transition-all hover:scale-105 ${
                      plan.popular 
                        ? `${colors.bg} ${colors.hover} text-white shadow-lg` 
                        : "bg-[var(--navy-900)] hover:bg-[var(--navy-800)] text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        
      </div>
    </section>
  )
}
