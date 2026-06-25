"use client"

import { motion } from "framer-motion"
import { Check, X, ArrowRight, MessageCircle } from "lucide-react"

const groups = [
  {
    phase: "Capture",
    rows: [
      { outcome: "Every call answered 24/7", whoza: true, typical: false },
      { outcome: "Caller qualified as real job (not spam)", whoza: true, typical: false },
      { outcome: "Emergency call triage", whoza: true, typical: false },
      { outcome: "Spam Filtered", whoza: true, typical: false },
    ],
  },
  {
    phase: "Deliver",
    rows: [
      { outcome: "Job sent to your phone instantly", whoza: true, typical: false },
      { outcome: "You accept or decline via WhatsApp", whoza: true, typical: false },
      { outcome: "Customer follow-up sent", whoza: true, typical: false },
    ],
  },
  {
    phase: "Convert",
    rows: [
      { outcome: "Completed job → review requested", whoza: true, typical: false },
      { outcome: "Monthly competitor analysis", whoza: true, typical: false },
      { outcome: "Weekly AI visibility actions", whoza: true, typical: false },
      { outcome: "Clear action to get more calls", whoza: true, typical: false },
    ],
  },
  {
    phase: "Grow",
    rows: [
      { outcome: "More reviews → found more easily", whoza: true, typical: false },
      { outcome: "More visibility → more enquiries", whoza: true, typical: false },
      { outcome: "More enquiries → more jobs every week", whoza: true, typical: false },
      { outcome: "Get Recommended by Chat GPT, Perplexity etc", whoza: true, typical: false },
    ],
  },
]

function Cell({ value }: { value: boolean }) {
  if (value) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Check className="w-5 h-5 text-[var(--rex-green)]" />
        <span className="hidden sm:inline text-sm text-[var(--rex-green)] font-medium">Yes</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <X className="w-5 h-5 text-red-400" />
      <span className="hidden sm:inline text-sm text-red-400 font-medium">No</span>
    </div>
  )
}

export function ComparisonTable() {
  return (
    <section className="section-padding-lg bg-[var(--off-white)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--claire-amber)]/15 text-[var(--claire-amber)] text-base font-bold mb-4 border border-[var(--claire-amber)]/25 shadow-sm">
            <MessageCircle className="w-5 h-5" />
            Why Whoza Wins
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
            From Call to More Work — Every Week
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl border border-[var(--border)] overflow-x-auto"
        >
          <table className="w-full min-w-[340px]">
              <thead>
                <tr className="border-b-2 border-[var(--navy-900)]">
                  <th className="text-left py-3 px-3 sm:py-5 sm:px-6 text-xs sm:text-sm font-medium text-[var(--slate-500)] uppercase tracking-wider">
                    Outcome
                  </th>
                  <th className="py-3 px-2 sm:py-5 sm:px-4 text-center min-w-[80px] sm:min-w-[140px]">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-[var(--katie-blue)] text-sm sm:text-lg">whoza.ai</span>
                      <span className="text-xs text-[var(--slate-500)] mt-1">Complete system</span>
                    </div>
                  </th>
                  <th className="py-3 px-2 sm:py-5 sm:px-4 text-center min-w-[80px] sm:min-w-[140px]">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-medium text-[var(--navy-900)] text-sm sm:text-lg">Typical AI</span>
                      <span className="text-xs text-[var(--slate-500)] mt-1">Answers calls only</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Based In row */}
                <tr className="bg-[var(--navy-900)]/5">
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-[var(--navy-900)] font-medium">
                    Based In
                  </td>
                  <td className="py-3 px-2 sm:py-4 sm:px-4 text-center">
                    <span className="text-sm font-semibold text-[var(--katie-blue)]">Built in Scotland</span>
                  </td>
                  <td className="py-3 px-2 sm:py-4 sm:px-4 text-center">
                    <span className="text-xs text-[var(--slate-500)]">USA, Germany, UK (varies)</span>
                  </td>
                </tr>
                {groups.map((group, groupIndex) => (
                  <>
                    {/* Phase header row */}
                    <tr key={`${group.phase}-header`} className="bg-[var(--navy-900)]">
                      <td
                        colSpan={3}
                        className="py-3 px-6 sm:py-4 sm:px-8 text-xs font-bold text-white uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          <span>{group.phase}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </td>
                    </tr>
                    {group.rows.map((row, rowIndex) => (
                      <tr
                        key={row.outcome}
                        className={
                          (groupIndex + rowIndex) % 2 === 0 ? "bg-[var(--off-white)]/30" : ""
                        }
                      >
                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-[var(--navy-900)] font-medium">
                          {row.outcome}
                        </td>
                        <td className="py-3 px-2 sm:py-4 sm:px-4">
                          <Cell value={row.whoza} />
                        </td>
                        <td className="py-4 px-4">
                          <Cell value={row.typical} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[var(--navy-900)] text-white">
            <Check className="w-5 h-5 text-[var(--rex-green)] shrink-0" />
            <p className="text-sm sm:text-base font-semibold">
              Others answer your calls. Whoza turns them into more jobs every week.
            </p>
          </div>
        </motion.div>

        {/* Competitor comparison links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[var(--slate-500)] mb-4">
            See detailed comparison:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="/whoza-vs-moneypenny" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:bg-[var(--katie-blue)]/5 hover:border-[var(--katie-blue)]/20 transition-all text-sm font-medium text-[var(--navy-900)]"
            >
              Moneypenny vs whoza.ai
            </a>
            <a 
              href="/whoza-vs-clara" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:bg-[var(--katie-blue)]/5 hover:border-[var(--katie-blue)]/20 transition-all text-sm font-medium text-[var(--navy-900)]"
            >
              Clara AI vs whoza.ai
            </a>
            <a 
              href="/whoza-vs-arrow" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:bg-[var(--katie-blue)]/5 hover:border-[var(--katie-blue)]/20 transition-all text-sm font-medium text-[var(--navy-900)]"
            >
              Arrow vs whoza.ai
            </a>
            <a 
              href="/whoza-vs-ionos" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:bg-[var(--katie-blue)]/5 hover:border-[var(--katie-blue)]/20 transition-all text-sm font-medium text-[var(--navy-900)]"
            >
              IONOS vs whoza.ai
            </a>
            <a 
              href="/vs-trade-receptionist" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:bg-[var(--katie-blue)]/5 hover:border-[var(--katie-blue)]/20 transition-all text-sm font-medium text-[var(--navy-900)]"
            >
              Trade Receptionist vs whoza.ai
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
