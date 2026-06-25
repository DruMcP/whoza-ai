"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Calculator, PoundSterling, TrendingUp, AlertTriangle, Phone, ChevronRight , Calendar} from "lucide-react"
import Link from "next/link"

// NOTE: This page uses "use client" so metadata must be exported from a separate file.
// Create metadata in a separate layout or accept that this page won't have perfect metadata.
// Per Next.js App Router pattern, we use generateMetadata in a separate file if needed.
// For now, we inline the metadata approach via a parent layout file or keep it as-is.
// Actually — "use client" components cannot export metadata. We'll create a layout wrapper.

export default function MissedCallCostCalculatorPage() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(10)
  const [averageJobValue, setAverageJobValue] = useState(280)
  const [conversionRate, setConversionRate] = useState(35)

  const weeklyCalls = missedCallsPerWeek
  const monthlyCalls = weeklyCalls * 4.33
  const yearlyCalls = weeklyCalls * 52

  const weeklyConverted = weeklyCalls * (conversionRate / 100)
  const monthlyConverted = monthlyCalls * (conversionRate / 100)
  const yearlyConverted = yearlyCalls * (conversionRate / 100)

  const weeklyLoss = weeklyConverted * averageJobValue
  const monthlyLoss = monthlyConverted * averageJobValue
  const yearlyLoss = yearlyConverted * averageJobValue

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

  const Slider = useCallback(
    ({
      label,
      value,
      min,
      max,
      step,
      onChange,
      suffix,
    }: {
      label: string
      value: number
      min: number
      max: number
      step: number
      onChange: (val: number) => void
      suffix: string
    }) => (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-slate-700">{label}</label>
          <span className="text-emerald-600 font-bold text-lg">
            {value}
            {suffix}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          aria-label={label}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>
            {min}
            {suffix}
          </span>
          <span>
            {max}
            {suffix}
          </span>
        </div>
      </div>
    ),
    []
  )

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Resources", item: "https://whoza.ai/resources" },
          { name: "Missed Call Calculator", item: "https://whoza.ai/resources/missed-call-cost-calculator" },
        ]}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* Hero */}
        <section
          className="dark-section relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-slate-400" style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white">Missed Call Cost Calculator</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calculator className="w-4 h-4" />
                Free Interactive Tool
              </div>
              <h1
                className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Missed Call Cost
                <br />
                <span className="text-emerald-400">Calculator for UK Trades</span>
              </h1>

              <div className="mt-4 text-white/30 text-sm">
                Last updated: <time dateTime="2026-06-06">2026-06-06</time>
              </div>
              <p className="text-lg text-slate-400 max-w-2xl mb-8">
                See exactly how much revenue your trade business is losing to missed calls. Adjust the sliders below
                and watch your losses add up. Based on real UK trade industry data.
              </p>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
              >
                Calculate My Losses <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-emerald-50 border-y border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">62%</div>
                <p className="text-sm text-slate-600 mt-1">of trade calls go unanswered</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">£280</div>
                <p className="text-sm text-slate-600 mt-1">average UK job value</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">35%</div>
                <p className="text-sm text-slate-600 mt-1">call-to-job conversion</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">85%</div>
                <p className="text-sm text-slate-600 mt-1">won't call back</p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              Source: ONS Business Population Estimates 2025, UK Trade Federation survey 2024
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            How Much Are Missed Calls Costing You?
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Drag the sliders to match your business. The numbers update instantly.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 lg:p-10">
            <Slider
              label="Missed calls per week"
              value={missedCallsPerWeek}
              min={1}
              max={50}
              step={1}
              onChange={setMissedCallsPerWeek}
              suffix=""
            />
            <Slider
              label="Average job value"
              value={averageJobValue}
              min={50}
              max={2000}
              step={10}
              onChange={setAverageJobValue}
              suffix="£"
            />
            <Slider
              label="Conversion rate (calls that become jobs)"
              value={conversionRate}
              min={5}
              max={80}
              step={1}
              onChange={setConversionRate}
              suffix="%"
            />

            <div className="border-t border-slate-200 pt-8 mt-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">Your Estimated Lost Revenue</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                  <div className="text-sm text-red-600 font-medium mb-1">Weekly Loss</div>
                  <div className="text-3xl font-extrabold text-red-600">{formatCurrency(weeklyLoss)}</div>
                  <div className="text-xs text-red-400 mt-1">{weeklyConverted.toFixed(1)} lost jobs/week</div>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center">
                  <div className="text-sm text-orange-600 font-medium mb-1">Monthly Loss</div>
                  <div className="text-3xl font-extrabold text-orange-600">{formatCurrency(monthlyLoss)}</div>
                  <div className="text-xs text-orange-400 mt-1">{monthlyConverted.toFixed(1)} lost jobs/month</div>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 text-center">
                  <div className="text-sm text-rose-600 font-medium mb-1">Yearly Loss</div>
                  <div className="text-3xl font-extrabold text-rose-600">{formatCurrency(yearlyLoss)}</div>
                  <div className="text-xs text-rose-400 mt-1">{yearlyConverted.toFixed(0)} lost jobs/year</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What the numbers mean */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What These Numbers Mean</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Every missed call is a potential job lost
                </h3>
                <p className="text-slate-700">
                  When a customer calls and gets voicemail,{" "}
                  <strong>85% won't call back</strong>. They'll call your competitor instead. With the average UK trade
                  job worth £280 and a 35% conversion rate, each missed call represents £98 in expected revenue.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI call handling pays for itself</h3>
                <p className="text-slate-700">
                  whoza.ai costs <strong>£59/month</strong>. If it recovers just 1 extra job per month (worth £280),
                  you're already up £221. Most trades recover 2–5 additional jobs monthly — worth £560–£1,400 in
                  extra revenue.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <PoundSterling className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Annual impact compounds quickly</h3>
                <p className="text-slate-700">
                  10 missed calls per week = 520 missed calls per year. At 35% conversion and £280 average job value,
                  that's <strong>£50,960 in lost opportunity annually</strong>. Even recovering 10% of those through AI
                  call handling adds £5,096 to your bottom line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/pricing"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <PoundSterling className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">View Pricing</div>
                <div className="text-sm text-slate-500">Plans from £59/month</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
            <Link
              href="/blog/how-much-do-missed-calls-cost-uk-trades"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Missed Call Recovery Guide</div>
                <div className="text-sm text-slate-500">How to win back lost jobs</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stop losing jobs to missed calls</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            whoza.ai answers every call, qualifies leads, and delivers them to your WhatsApp. Start your 7-day free
            trial today — no credit card required.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Try whoza.ai Free for 7 Days <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
