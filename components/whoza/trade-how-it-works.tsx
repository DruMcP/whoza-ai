"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, MessageSquare, Bell, CheckCircle } from "lucide-react"
import { TradeData } from "@/lib/trades"

interface TradeHowItWorksProps {
  tradeData: TradeData
}

const stepIcons = [Phone, MessageSquare, Bell, CheckCircle]

export function TradeHowItWorks({ tradeData }: TradeHowItWorksProps) {
  return (
    <section id="how-it-works" className="py-20 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[var(--navy-900)]"
          >
            How Whoza Works for {tradeData.display}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-[var(--slate-500)] max-w-2xl mx-auto"
          >
            Four simple steps from missed call to booked job
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tradeData.howItWorks.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div className="text-sm font-semibold text-[var(--katie-blue)] mb-2">
                    Step {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--navy-900)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--slate-500)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[var(--slate-300)]" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
