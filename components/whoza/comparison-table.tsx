"use client"

import { motion } from "framer-motion"
import { Check, X, Minus, MessageCircle } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const features = [
  { name: "Answers every call 24/7", whoza: true, traditional: false, competitor: "partial" },
  { name: "Books jobs (not just takes messages)", whoza: true, traditional: false, competitor: false },
  { name: "Sends job to your phone instantly", whoza: true, traditional: false, competitor: false },
  { name: "You accept/decline via WhatsApp", whoza: true, traditional: false, competitor: false },
  { name: "Collects reviews automatically", whoza: true, traditional: false, competitor: false },
  { name: "Tracks competitors weekly", whoza: true, traditional: false, competitor: false },
  { name: "Shows revenue dashboard", whoza: true, traditional: false, competitor: false },
  { name: "Customer gets instant confirmation", whoza: true, traditional: "partial", competitor: true },
  { name: "No apps or logins required", whoza: true, traditional: true, competitor: false },
  { name: "Pay only for accepted jobs", whoza: true, traditional: false, competitor: false },
]

const pricingConfig = {
  uk: { whoza: "From £69/mo", traditional: "£800-2000/mo", competitor: "From £150/mo" },
  us: { whoza: "From $89/mo", traditional: "$1200-3000/mo", competitor: "From $200/mo" },
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-[var(--rex-green)] mx-auto" />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-red-400 mx-auto" />
  }
  return <Minus className="w-5 h-5 text-[var(--claire-amber)] mx-auto" />
}

export function ComparisonTable() {
  const { country } = useLocale()
  const pricing = pricingConfig[country]

  return (
    <section className="py-20 lg:py-32 bg-[var(--off-white)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--claire-amber)]/10 text-[var(--claire-amber)] text-sm font-bold mb-4">
            <MessageCircle className="w-4 h-4" />
            Why Whoza Wins
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Voicemail vs Receptionist vs Whoza
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Voicemail = missed jobs. Receptionist = messages only. Cheap AI = no booking.
            <span className="block mt-2 font-semibold text-[var(--navy-900)]">Whoza = qualified jobs sent to your phone, ready to accept.</span>
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-[var(--border)] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-[var(--slate-500)]">Feature</th>
                  <th className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-[var(--katie-blue)]">whoza.ai</span>
                      <span className="text-xs text-[var(--slate-500)] mt-1">{pricing.whoza}</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-medium text-[var(--navy-900)]">Traditional</span>
                      <span className="text-xs text-[var(--slate-500)] mt-1">{pricing.traditional}</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-medium text-[var(--navy-900)]">Generic AI</span>
                      <span className="text-xs text-[var(--slate-500)] mt-1">{pricing.competitor}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={feature.name} 
                    className={index % 2 === 0 ? "bg-[var(--off-white)]/50" : ""}
                  >
                    <td className="py-4 px-6 text-sm text-[var(--navy-900)]">{feature.name}</td>
                    <td className="py-4 px-4"><FeatureCell value={feature.whoza} /></td>
                    <td className="py-4 px-4"><FeatureCell value={feature.traditional} /></td>
                    <td className="py-4 px-4"><FeatureCell value={feature.competitor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-6 text-sm text-[var(--slate-500)]">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[var(--rex-green)]" />
            <span>Included</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-[var(--claire-amber)]" />
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-400" />
            <span>Not included</span>
          </div>
        </div>
      </div>
    </section>
  )
}
