"use client"

import { motion } from "framer-motion"
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react"
import { TradeData } from "@/lib/trades"

interface TradeProblemsProps {
  tradeData: TradeData
}

export function TradeProblems({ tradeData }: TradeProblemsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[var(--navy-900)]"
          >
            The {tradeData.display} Call Problem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-[var(--slate-500)] max-w-2xl mx-auto"
          >
            You&apos;re great at your trade. But every missed call is a missed job — and a competitor&apos;s gain.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2 mb-6">
              <XCircle className="w-6 h-6" />
              Without AI Call Handling
            </h3>
            {tradeData.problemStatements.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
              >
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[var(--slate-600)] text-sm leading-relaxed">{problem}</p>
              </div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-6 h-6" />
              With Whoza + Katie
            </h3>
            {tradeData.solutionStatements.map((solution, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-[var(--slate-600)] text-sm leading-relaxed">{solution}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Transition CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-[var(--katie-blue)] font-semibold hover:underline"
          >
            See how it works for {tradeData.plural}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
