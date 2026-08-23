import { CalculatorForm } from "@/components/whoza/calculator-form"
import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, PoundSterling, TrendingUp, AlertTriangle } from "lucide-react"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Call Cost Calculator | Check Losses",
  description: "Calculate how much missed calls cost your trade business. Enter job value, call volume, and conversion rate. Free calculator for UK trades.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/missed-calls-cost-calculator",
    siteName: "Whoza.ai",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Calculate how much missed calls cost your trade business. Free calculator for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Missed call cost calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Calculate how much missed calls cost your trade business. Free calculator for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/missed-calls-cost-calculator",
  },
}

const faqs = [
  {
    question: "How much do missed calls cost UK tradespeople?",
    answer: "Missed calls cost UK tradespeople £3,000-£12,000 per year on average. Based on the Moneypenny Small Business Call Report (2016), 33% of small businesses fail to answer incoming calls. With an average job value of £280 and 35% conversion rate, 10 missed calls per week = £5,096 in lost annual revenue.",
  },
  {
    question: "What percentage of calls do trade businesses miss?",
    answer: "33% of small UK businesses fail to answer incoming calls, according to the Moneypenny Small Business Call Report (2016). Plumbers miss the most calls (68%) because they're often working in areas with poor phone signal.",
  },
  {
    question: "What is the average job value for UK trades?",
    answer: "The average job value varies by trade: Plumbing (£180-350), Electrical (£150-400), Roofing (£500-2,000), Heating (£200-600), Building (£1,000-5,000). The UK average across all trades is approximately £280 per job.",
  },
  {
    question: "How many missed calls turn into actual jobs?",
    answer: "Approximately 35% of answered calls convert into booked jobs for UK tradespeople. This means if you miss 10 calls per week, you're losing 3-4 potential jobs — worth £840-£1,120 per week.",
  },
  {
    question: "Can an AI call handler recover lost revenue?",
    answer: "Yes. AI call handlers like whoza.ai answer 100% of missed calls, qualify leads, and deliver them via WhatsApp. Tradespeople using AI call handling report recovering 2-5 additional jobs per month, worth £560-£1,400 monthly.",
  },
]


export const revalidate = 3600

export default function MissedCallsCalculatorPage() {
  return (
    <>
            <FAQPageSchema faqs={faqs} />


      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Missed Call Calculator", item: "https://whoza.ai/missed-calls-cost-calculator" },
      ]} />

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
                <div className="text-3xl font-extrabold text-emerald-600">33%</div>
                <p className="text-sm text-slate-600 mt-1">of small businesses fail to answer calls</p>
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
                <div className="text-3xl font-extrabold text-emerald-600">69%</div>
                <p className="text-sm text-slate-600 mt-1">hang up on voicemail</p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">Source: Moneypenny Small Business Call Report, 2016</p>
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
                  When a customer calls and gets voicemail, 69% don't leave a message. They'll call your competitor instead.
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
      {/* FAQ — visible matching schema */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </>
  )
}
