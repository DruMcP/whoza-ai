"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, PhoneCall, Star, TrendingUp } from "lucide-react"

const expectationCards = [
  {
    title: "More Enquiries",
    description: "Never miss another call. Katie answers 24/7 and qualifies every enquiry.",
    icon: PhoneCall,
    color: "var(--katie-blue)",
    bgLight: "bg-[var(--katie-blue)]/10",
  },
  {
    title: "Better Reviews",
    description: "Claire automatically follows up with customers to collect 5-star reviews.",
    icon: Star,
    color: "var(--claire-amber)",
    bgLight: "bg-[var(--claire-amber)]/10",
  },
  {
    title: "More Revenue",
    description: "Rex grows your visibility so you show up when customers search for your trade.",
    icon: TrendingUp,
    color: "var(--rex-green)",
    bgLight: "bg-[var(--rex-green)]/10",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[var(--off-white)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
              <span className="text-sm font-semibold text-[var(--rex-green)]">Feedback from our UK pilot programme</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
              What Early Users Are Saying
            </h2>
            <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
              Our pilot programme is underway with select tradespeople across the UK.
              <span className="font-semibold text-[var(--navy-900)]"> Now onboarding selected UK trades businesses.</span>
            </p>
          </motion.div>
        </div>

        {/* What to Expect — Premium Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto reveal-stagger">
          {expectationCards.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-6 border border-[var(--slate-200)] shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${item.bgLight} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-[var(--navy-900)] mb-2">{item.title}</h3>
                <p className="text-[var(--slate-500)] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Subtle Marquee */}
        <div className="mt-16 overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -800] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[
              "Plumbers", "Electricians", "Builders", "Roofers", "Locksmiths",
              "Landscapers", "Heating Engineers", "Pest Control", "Cleaners", "Drainage"
            ].map((trade, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--slate-200)] text-sm text-[var(--slate-500)] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {trade}
              </span>
            ))}
            {[
              "Plumbers", "Electricians", "Builders", "Roofers", "Locksmiths",
              "Landscapers", "Heating Engineers", "Pest Control", "Cleaners", "Drainage"
            ].map((trade, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--slate-200)] text-sm text-[var(--slate-500)] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {trade}
              </span>
            ))}
          </motion.div>
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
            className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-10 py-7 text-xl gap-3 shadow-xl shadow-[var(--rex-green)]/30 rounded-lg transition-all hover:scale-105"
          >
            Start your free trial
            <ArrowRight className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
