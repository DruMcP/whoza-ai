"use client"

import { useState } from "react"

// Keep typed values inside a sane range: empty, negative, 1e309 or 99999999999
// would otherwise turn the results into negative or 40-digit pound amounts.
const clamp = (raw: string, max: number) => {
  const n = Number(raw)
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0
}
const gbp = (n: number) => (n < 0 ? "-£" : "£") + Math.abs(n).toLocaleString("en-GB")

export function CalculatorForm() {
  const [avgJobValue, setAvgJobValue] = useState(280)
  const [weeklyCalls, setWeeklyCalls] = useState(10)
  const [conversionRate, setConversionRate] = useState(35)
  const [answerRate, setAnswerRate] = useState(38)

  const missedPerWeek = Math.round(weeklyCalls * (1 - answerRate / 100))
  const monthlyLoss = Math.round(missedPerWeek * 4.33 * (conversionRate / 100) * avgJobValue)
  const annualLoss = Math.round(monthlyLoss * 12)
  const whozaROI = Math.round(monthlyLoss - 59)
  const fields = [
    { id: "calc-job-value", label: "Average job value (£)", value: avgJobValue, set: setAvgJobValue, max: 100000, hint: "Plumbing: £180-350 | Electrical: £150-400 | Roofing: £500+" },
    { id: "calc-weekly-calls", label: "Total calls per week", value: weeklyCalls, set: setWeeklyCalls, max: 2000, hint: "Include all business calls" },
    { id: "calc-conversion", label: "Conversion rate (%)", value: conversionRate, set: setConversionRate, max: 100, hint: "UK trade average: 35%" },
    { id: "calc-answer-rate", label: "Current answer rate (%)", value: answerRate, set: setAnswerRate, max: 100, hint: "UK average varies by trade (Moneypenny 2016: 33% of small businesses miss calls)" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-6">
        {fields.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="block text-sm font-semibold text-slate-700 mb-2">{f.label}</label>
            <input
              id={f.id}
              type="number"
              inputMode="numeric"
              min={0}
              max={f.max}
              value={f.value}
              onChange={(e) => f.set(clamp(e.target.value, f.max))}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-lg font-semibold"
            />
            <p className="text-xs text-slate-500 mt-1">{f.hint}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--v2-navy)] rounded-2xl p-8 text-white v2-island">
        <h2 className="text-xl font-bold mb-6 text-center">Your Results</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">{missedPerWeek}</div>
            <p className="text-sm text-slate-400 mt-1">missed calls/week</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">{gbp(monthlyLoss)}</div>
            <p className="text-sm text-slate-400 mt-1">lost revenue/month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">{gbp(annualLoss)}</div>
            <p className="text-sm text-slate-400 mt-1">lost revenue/year</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-emerald-400">{whozaROI > 0 ? "+" : ""}{gbp(whozaROI)}</div>
            <p className="text-sm text-slate-400 mt-1">net gain with whoza.ai</p>
          </div>
        </div>
      </div>
    </div>
  )
}
