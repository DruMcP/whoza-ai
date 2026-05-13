"use client"

import { useState } from "react"

export function CalculatorForm() {
  const [avgJobValue, setAvgJobValue] = useState(280)
  const [weeklyCalls, setWeeklyCalls] = useState(10)
  const [conversionRate, setConversionRate] = useState(35)
  const [answerRate, setAnswerRate] = useState(38)

  const missedPerWeek = Math.round(weeklyCalls * (1 - answerRate / 100))
  const monthlyLoss = Math.round(missedPerWeek * 4.33 * (conversionRate / 100) * avgJobValue)
  const annualLoss = Math.round(monthlyLoss * 12)
  const whozaROI = Math.round(monthlyLoss - 59)

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Average job value (£)</label>
          <input 
            type="number" 
            value={avgJobValue} 
            onChange={(e) => setAvgJobValue(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-lg font-semibold"
          />
          <p className="text-xs text-slate-500 mt-1">Plumbing: £180-350 | Electrical: £150-400 | Roofing: £500+</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Total calls per week</label>
          <input 
            type="number" 
            value={weeklyCalls} 
            onChange={(e) => setWeeklyCalls(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-lg font-semibold"
          />
          <p className="text-xs text-slate-500 mt-1">Include all business calls</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Conversion rate (%)</label>
          <input 
            type="number" 
            value={conversionRate} 
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-lg font-semibold"
          />
          <p className="text-xs text-slate-500 mt-1">UK trade average: 35%</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current answer rate (%)</label>
          <input 
            type="number" 
            value={answerRate} 
            onChange={(e) => setAnswerRate(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-lg font-semibold"
          />
          <p className="text-xs text-slate-500 mt-1">UK average: 38% (62% missed)</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 text-center">Your Results</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">{missedPerWeek}</div>
            <p className="text-sm text-slate-400 mt-1">missed calls/week</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">£{monthlyLoss.toLocaleString()}</div>
            <p className="text-sm text-slate-400 mt-1">lost revenue/month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-400">£{annualLoss.toLocaleString()}</div>
            <p className="text-sm text-slate-400 mt-1">lost revenue/year</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-emerald-400">+£{whozaROI.toLocaleString()}</div>
            <p className="text-sm text-slate-400 mt-1">net gain with whoza.ai</p>
          </div>
        </div>
      </div>
    </div>
  )
}
