"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"

const tradePresetsUk = [
  { name: "Plumber", avgJob: 350, callsPerWeek: 12, conversion: 35 },
  { name: "Electrician", avgJob: 280, callsPerWeek: 15, conversion: 30 },
  { name: "Builder", avgJob: 2500, callsPerWeek: 8, conversion: 25 },
  { name: "Roofer", avgJob: 1800, callsPerWeek: 6, conversion: 30 },
  { name: "Painter", avgJob: 450, callsPerWeek: 10, conversion: 40 },
  { name: "Landscaper", avgJob: 600, callsPerWeek: 8, conversion: 35 },
]

const tradePresetsUs = [
  { name: "Plumber", avgJob: 450, callsPerWeek: 12, conversion: 35 },
  { name: "Electrician", avgJob: 350, callsPerWeek: 15, conversion: 30 },
  { name: "General Contractor", avgJob: 3200, callsPerWeek: 8, conversion: 25 },
  { name: "Roofer", avgJob: 2200, callsPerWeek: 6, conversion: 30 },
  { name: "Painter", avgJob: 550, callsPerWeek: 10, conversion: 40 },
  { name: "Landscaper", avgJob: 750, callsPerWeek: 8, conversion: 35 },
  { name: "HVAC", avgJob: 1800, callsPerWeek: 10, conversion: 30 },
]

export function ROICalculator() {
  const { country, config } = useLocale()
  const tradePresets = country === "uk" ? tradePresetsUk : tradePresetsUs
  const [selectedTrade, setSelectedTrade] = useState(tradePresets[0])
  
  const monthlyRevenueSaved = selectedTrade.avgJob * selectedTrade.callsPerWeek * (selectedTrade.conversion / 100) * 4
  const yearlyRevenueSaved = monthlyRevenueSaved * 12
  const monthlyPlan = config.pricing.business
  const roiRaw = Math.round((monthlyRevenueSaved / monthlyPlan) * 100)
  const roiDisplay = roiRaw > 2000 ? "2,000%+" : `${roiRaw.toLocaleString()}%`

  return (
    <section className="py-20 lg:py-32 bg-[var(--navy-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--rex-green)]/20 text-[var(--rex-green)] text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            ROI Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            See Your Return on Investment
          </h2>
          <p className="mt-6 text-lg text-white/60 text-pretty">
            Select your trade to see how much revenue whoza.ai can save you.
          </p>
        </motion.div>

        {/* Trade Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tradePresets.map((trade) => (
            <button
              key={trade.name}
              onClick={() => setSelectedTrade(trade)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedTrade.name === trade.name
                  ? "bg-[var(--katie-blue)] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {trade.name}
            </button>
          ))}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-sm text-white/50 mb-2">Monthly Revenue Saved</div>
                <div className="text-4xl font-bold text-[var(--rex-green)]">
                  {config.currencySymbol}{monthlyRevenueSaved.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-white/50 mb-2">Yearly Revenue Saved</div>
                <div className="text-4xl font-bold text-[var(--katie-blue)]">
                  {config.currencySymbol}{yearlyRevenueSaved.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-white/50 mb-2">Return on Investment</div>
                <div className="text-4xl font-bold text-[var(--claire-amber)]">
                  {roiDisplay}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-white/60 text-sm">
                    Based on <span className="text-white font-medium">{selectedTrade.callsPerWeek} missed calls/week</span> at 
                    <span className="text-white font-medium"> {config.currencySymbol}{selectedTrade.avgJob} avg job value</span> with 
                    <span className="text-white font-medium"> {selectedTrade.conversion}% conversion</span>
                  </p>
                </div>
                <Button 
                  className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8 whitespace-nowrap"
                  onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
