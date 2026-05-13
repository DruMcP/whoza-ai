import { CalculatorForm } from "@/components/whoza/calculator-form"
import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Calculator, PoundSterling, TrendingUp, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
  description: "Calculate how much missed calls cost your trade business. Enter your average job value, weekly call volume, and conversion rate to see monthly lost revenue.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/missed-calls-cost-calculator",
    siteName: "Whoza.ai",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Calculate how much missed calls cost your trade business. Free calculator for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: "Missed call cost calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Calculate how much missed calls cost your trade business. Free calculator for UK tradespeople.",
    images: ["https://whoza.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://whoza.ai/missed-calls-cost-calculator",
  },
}

export default function MissedCallsCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Cost Calculator", "item": "https://whoza.ai/missed-calls-cost-calculator" }
        ]
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much do missed calls cost UK tradespeople?",
            "acceptedAnswer": { "@type": "Answer", "text": "Missed calls cost UK tradespeople £3,000-£12,000 per year on average. Based on ONS data, 62% of calls to small trade businesses go unanswered. With an average job value of £280 and 35% conversion rate, 10 missed calls per week = £5,096 in lost annual revenue." }
          },
          {
            "@type": "Question",
            "name": "What percentage of calls do trade businesses miss?",
            "acceptedAnswer": { "@type": "Answer", "text": "62% of calls to small UK trade businesses go unanswered, according to ONS Business Population Estimates 2025. Plumbers miss the most calls (68%) because they're often working in areas with poor phone signal." }
          },
          {
            "@type": "Question",
            "name": "What is the average job value for UK trades?",
            "acceptedAnswer": { "@type": "Answer", "text": "The average job value varies by trade: Plumbing (£180-350), Electrical (£150-400), Roofing (£500-2,000), Heating (£200-600), Building (£1,000-5,000). The UK average across all trades is approximately £280 per job." }
          },
          {
            "@type": "Question",
            "name": "How many missed calls turn into actual jobs?",
            "acceptedAnswer": { "@type": "Answer", "text": "Approximately 35% of answered calls convert into booked jobs for UK tradespeople. This means if you miss 10 calls per week, you're losing 3-4 potential jobs — worth £840-£1,120 per week." }
          },
          {
            "@type": "Question",
            "name": "Can an AI call handler recover lost revenue?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. AI call handlers like whoza.ai answer 100% of missed calls, qualify leads, and deliver them via WhatsApp. Tradespeople using AI call handling report recovering 2-5 additional jobs per month, worth £560-£1,400 monthly." }
          }
        ]
      })}} />

      <Header />

      <main className="pb-24 lg:pb-0">
        {/* Hero */}
        <section className="dark-section relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-slate-400" style={{ listStyle: "none", padding: 0 }}>
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li className="mx-2">/</li>
                <li className="text-white">Cost Calculator</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              How Much Do Missed Calls<br />
              <span className="text-emerald-400">Cost Your Trade Business?</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              Use our free calculator to see exactly how much revenue you're losing to missed calls every month. 
              Based on real UK trade industry data from the Office for National Statistics.
            </p>
            <a href="#calculator" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all">
              Calculate My Losses <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-emerald-50 border-y border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">62%</div>
                <p className="text-sm text-slate-600 mt-1">of calls go unanswered</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">£280</div>
                <p className="text-sm text-slate-600 mt-1">average job value</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">35%</div>
                <p className="text-sm text-slate-600 mt-1">conversion rate</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">85%</div>
                <p className="text-sm text-slate-600 mt-1">won't call back</p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">Source: ONS Business Population Estimates 2025, UK Trade Federation survey 2024</p>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Calculate Your Missed Call Losses</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <CalculatorForm />
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
                <h3 className="text-xl font-bold text-slate-900 mb-2">Every missed call is a potential job lost</h3>
                <p className="text-slate-700">
                  When a customer calls and gets voicemail, 85% won't call back. They'll call your competitor instead.
                  With an average job value of £280, each missed call represents £98 in expected revenue (35% conversion × £280).
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
                  whoza.ai costs £59/month. If it recovers just 1 extra job per month (worth £280), 
                  you're already up £221. Most trades recover 2-5 additional jobs monthly — 
                  worth £560-£1,400 in extra revenue.
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
                  that's £50,960 in lost opportunity annually. Even recovering 10% of those through AI call handling 
                  adds £5,096 to your bottom line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stop losing jobs to missed calls</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            whoza.ai answers every call, qualifies leads, and delivers them to your WhatsApp. 
            Start your 7-day free trial today.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
            Try whoza.ai Free for 7 Days <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
