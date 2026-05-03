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

export function Pricing() {
  const { config } = useLocale()
  const cs = config.currencySymbol

  // Plans defined inside component to access locale currency symbol
  const plans = [
    {
      name: "Starter",
      description: "Capture + deliver jobs",
      price: String(config.pricing.starter),
      perJob: "4.50",
      includedMinutes: "100",
      period: "month",
      color: "blue" as keyof typeof colorStyles,
      popular: false,
      features: [
        { text: "AI call answering 24/7", included: true },
        { text: "Spam call filtering", included: true },
        { text: "Lead capture + dashboard", included: true },
        { text: "Booking automation", included: true },
        { text: "WhatsApp job delivery", included: true },
        { text: `${cs}4.50 per qualified job booked`, included: true },
      ],
      cta: "Join Early Access",
    },
    {
      name: "Growth",
      description: "Full revenue system",
      price: String(config.pricing.growth),
      perJob: "3.25",
      jobsIncluded: "15",
      includedMinutes: "300",
      period: "month",
      color: "green" as keyof typeof colorStyles,
      popular: true,
      features: [
        { text: "Everything in Starter", included: true },
        { text: "15 booked jobs included", included: true },
        { text: "Claire review engine", included: true },
        { text: "Monthly competitor tracking", included: true },
        { text: "Calendar sync (Google, Outlook, Apple)", included: true },
        { text: "Post-call email summary", included: true },
        { text: "Voicemail detection + auto-callback", included: true },
        { text: "Revenue dashboard", included: true },
        { text: `${cs}3.25 per additional job`, included: true },
      ],
      cta: "Join Early Access",
    },
    {
      name: "Pro",
      description: "High-volume + AI growth",
      price: String(config.pricing.pro),
      perJob: "2.75",
      jobsIncluded: "40",
      includedMinutes: "700",
      period: "month",
      color: "amber" as keyof typeof colorStyles,
      popular: false,
      features: [
        { text: "Everything in Growth", included: true },
        { text: "40 booked jobs included", included: true },
        { text: "Weekly AI growth reports", included: true },
        { text: "Actionable recommendations", included: true },
        { text: "Full system (Katie/Mark + Claire + Rex)", included: true },
        { text: "Smart scheduling (checks calendar before booking)", included: true },
        { text: "SMS + WhatsApp follow-up sequences", included: true },
        { text: "Outbound callback campaigns", included: true },
        { text: "CRM integration (Jobber, ServiceTitan)", included: true },
        { text: "API access", included: true },
        { text: `${cs}2.75 per additional job`, included: true },
      ],
      cta: "Join Early Access",
    },
    {
      name: "Scale",
      description: "Multi-location businesses",
      price: String(config.pricing.scale),
      perJob: "2.25",
      jobsIncluded: "100",
      includedMinutes: "1,500",
      period: "month",
      color: "grey" as keyof typeof colorStyles,
      popular: false,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "100 booked jobs included", included: true },
        { text: "Multi-location support", included: true },
        { text: "Multi-calendar team sync", included: true },
        { text: "Priority support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
        { text: `${cs}2.25 per additional job`, included: true },
      ],
      cta: "Join Early Access",
    },
  ]

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
            Simple Pricing That{" "}
            <span className="text-[var(--rex-green)]">Scales With You</span>
          </h2>
          <p className="mt-6 text-xl text-[var(--slate-500)] text-pretty max-w-2xl mx-auto">
            Jobs included. {cs}2.25–{cs}4.50 per extra job. Scales as you grow.
            <span className="block mt-2 font-semibold text-[var(--navy-900)]">Start small. Only pay more as you get more work.</span>
            <span className="block mt-2 font-semibold text-[var(--navy-900)]">Most customers cover their cost in their first few jobs.</span>
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] font-bold border border-[var(--rex-green)]/20">
            <CheckCircle2 className="w-5 h-5" />
            No results in 30 days? We extend free.
          </div>

          {/* Economics breakdown */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-10 text-center">
            <div className="px-4 py-3 rounded-xl bg-white shadow-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--navy-900)]">{cs}2.25–{cs}4.50</div>
              <div className="text-sm text-[var(--slate-500)]">per booked job</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20">
              <div className="text-2xl font-bold text-[var(--rex-green)]">{cs}140+</div>
              <div className="text-sm text-[var(--slate-500)]">avg job value</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white shadow-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--navy-900)]">35x</div>
              <div className="text-sm text-[var(--slate-500)]">return on cost</div>
            </div>
          </div>
        </motion.div>

        {/* Pricing transition text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-lg text-[var(--slate-500)] font-semibold mb-2">Choose a plan based on how many enquiries you need.</p>
          <p className="text-sm text-[var(--slate-500)] mb-2">All plans available through early access. Join now to secure your spot and lock in launch pricing.</p>
          <div className="mt-3 inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-xl bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[var(--rex-green)] shrink-0" />
            <span className="text-[var(--navy-900)] font-medium">Early access members get priority onboarding and exclusive launch pricing.</span>
          </div>
          <p className="mt-2 text-sm text-[var(--slate-500)]">Upgrade anytime as your business grows.</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
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
                      <span className="text-3xl font-bold text-[var(--navy-900)]">{cs}{plan.price}</span>
                      <span className="text-[var(--slate-500)]">/{plan.period} <span className="text-xs font-normal">ex VAT</span></span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-[var(--rex-green)] font-semibold">{cs}{plan.perJob}/job</span>
                      <span className="text-xs text-[var(--slate-400)]">• {plan.jobsIncluded} jobs included</span>
                    </div>
                    <div className="mt-2 text-sm text-[var(--slate-500)]">
                      Includes {plan.includedMinutes} call handling minutes/month
                    </div>
                    {/* Trial badge for trial-eligible plans */}
                    {(plan.name === "Starter" || plan.name === "Growth") && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20 text-xs font-medium text-[var(--rex-green)]">
                        <Sparkles className="w-3 h-3" />
                        14-day free trial • {plan.name === "Starter" ? "50" : "150"} mins cap
                      </div>
                    )}
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
                    onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Usage Clarity Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[var(--slate-500)]">
            Need more call time? Add 100-minute bundles for {cs}20 ex VAT, or pay {cs}0.26/min for additional usage.
          </p>
          <p className="text-xs text-[var(--slate-400)] mt-1">
            Need more call time? Add bundles or pay as you go.
          </p>
        </motion.div>

        {/* Optional Upgrades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--navy-900)]">
              Optional Upgrades
            </h3>
            <p className="mt-2 text-[var(--slate-500)]">
              Flexible add-ons to support your business as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Minutes Bundle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[var(--navy-900)]">100 Minute Bundle</h4>
                  <p className="text-sm text-[var(--slate-500)] mt-1">Extra call handling minutes at a discounted rate.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--navy-900)]">£20<span className="text-sm font-normal text-[var(--slate-500)]"> ex VAT</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--rex-green)] font-medium bg-[var(--rex-green)]/10 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-4 h-4" />
                Lower cost than standard overage rate (£0.26/min)
              </div>
            </motion.div>

            {/* Consultancy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[var(--navy-900)]">White Glove AI & Automation Consultancy</h4>
                  <p className="text-sm text-[var(--slate-500)] mt-1">Bespoke support to optimise your workflows, AI agents, and automation systems.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--navy-900)]">£200<span className="text-sm font-normal text-[var(--slate-500)]">/hr</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--katie-blue)] font-medium bg-[var(--katie-blue)]/10 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-4 h-4" />
                Ideal for scaling businesses and advanced optimisation
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pricing Psychology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-[var(--navy-900)] text-white">
            <CheckCircle2 className="w-6 h-6 text-[var(--rex-green)] shrink-0" />
            <p className="text-sm">
              <span className="font-bold">Simple pricing that scales with your business.</span>{" "}
              Most customers cover their cost in their first few jobs.{" "}
              <span className="text-white/60">Only continue if it's working for you.</span>
            </p>
          </div>
        </motion.div>

        {/* Pricing bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-[var(--slate-500)] font-semibold">Each plan includes enquiries, with additional ones charged per job — so you can scale as you grow.</p>
          <p className="text-sm text-[var(--slate-500)] mt-2">Start small. Only pay more as you get more work.</p>
        </motion.div>
        {/* Overage Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[var(--slate-400)]">
            Additional call handling minutes are charged at £0.26 per minute across all plans. You can monitor and control usage at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
