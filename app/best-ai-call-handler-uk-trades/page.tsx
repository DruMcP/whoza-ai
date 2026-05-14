import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, Star } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "7 Best AI Call Handlers for UK Tradespeople [2026]",
  description: "The definitive 2026 guide to AI call handling services for UK trades. Compare features, pricing, and setup time. See why whoza.ai ranks #1.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/best-ai-call-handler-uk-trades",
    siteName: "Whoza.ai",
    title: "7 Best AI Call Handlers for UK Tradespeople [2026]",
    description: "The definitive 2026 guide to AI call handling services for UK trades. Compare features, pricing, and setup time.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Best AI call handlers for UK trades 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "7 Best AI Call Handlers for UK Tradespeople [2026]",
    description: "The definitive 2026 guide to AI call handling services for UK trades. Compare features, pricing, and setup time.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/best-ai-call-handler-uk-trades",
  },
}

const aiHandlers = [
  {
    rank: 1,
    name: "whoza.ai",
    highlight: "Best Overall for UK Trades",
    price: "£59/mo + VAT",
    setup: "30 minutes",
    pros: ["WhatsApp delivery (no app needed)", "Unlimited simultaneous calls", "Built by former tradesperson", "7-day free trial, no card", "30-day money-back guarantee"],
    cons: ["UK-only (US in beta)", "No human receptionist option"],
    bestFor: "All UK trades — plumbers, electricians, roofers, builders, heating engineers",
    verdict: "The most trade-focused AI call handler on the market. WhatsApp delivery, 30-minute setup, and founder Dru McPherson's direct involvement make it the clear winner for UK tradespeople.",
    isWinner: true,
  },
  {
    rank: 2,
    name: "Moneypenny",
    highlight: "Best Human Receptionist Hybrid",
    price: "£225/mo + VAT",
    setup: "2-3 days",
    pros: ["Human receptionists available", "Established brand (20+ years)", "24/7 coverage"],
    cons: ["Expensive for small trades", "Email/app dashboard delivery", "12-month contracts", "Setup takes days"],
    bestFor: "Larger trade businesses wanting human touch",
    verdict: "A solid choice if you need human receptionists and have the budget. Less suitable for one-person trades due to price.",
    isWinner: false,
  },
  {
    rank: 3,
    name: "Trade Receptionist",
    highlight: "Best for Multi-Trade Firms",
    price: "£200-350/mo + VAT",
    setup: "3-5 days",
    pros: ["Trade-specific training", "Appointment booking included", "CRM integrations"],
    cons: ["High price point", "Long setup", "Contracts required", "Limited simultaneous calls"],
    bestFor: "Multi-person trade firms with complex needs",
    verdict: "Good for larger firms but overkill and overpriced for solo tradespeople.",
    isWinner: false,
  },
  {
    rank: 4,
    name: "Breezy",
    highlight: "Best Budget Option",
    price: "£49/mo + VAT",
    setup: "1 hour",
    pros: ["Low price", "Quick setup", "Basic call handling"],
    cons: ["No trade-specific AI", "Email-only delivery", "Limited features", "No WhatsApp integration"],
    bestFor: "Very small businesses on tight budgets",
    verdict: "Cheap but lacks trade-specific intelligence and WhatsApp delivery that tradespeople need.",
    isWinner: false,
  },
  {
    rank: 5,
    name: "AnswerConnect",
    highlight: "Best US Coverage",
    price: "$199/mo (approx £160)",
    setup: "1-2 days",
    pros: ["US and UK coverage", "Bilingual support", "Appointment scheduling"],
    cons: ["US-focused pricing", "No WhatsApp", "Complex dashboard", "Overkill for UK trades"],
    bestFor: "Trades with US and UK customers",
    verdict: "Overkill for UK-only trades. US pricing and no WhatsApp make it less suitable.",
    isWinner: false,
  },
  {
    rank: 6,
    name: "Verbatim",
    highlight: "Best for High-Volume",
    price: "£400+/mo + VAT",
    setup: "5-7 days",
    pros: ["Enterprise-grade", "Custom scripts", "Detailed reporting"],
    cons: ["Very expensive", "Long setup", "Corporate feel", "Not trade-specific"],
    bestFor: "Large trade firms with 10+ employees",
    verdict: "Enterprise pricing for enterprise needs. Too complex and expensive for typical UK tradespeople.",
    isWinner: false,
  },
  {
    rank: 7,
    name: "Your Answer",
    highlight: "Best Basic Service",
    price: "£99/mo + VAT",
    setup: "2-3 days",
    pros: ["Simple service", "No long contracts", "UK-based"],
    cons: ["No AI features", "Basic message taking", "No lead qualification", "Email delivery only"],
    bestFor: "Trades wanting basic message taking only",
    verdict: "A basic virtual receptionist service. No AI means no lead qualification or intelligent call handling.",
    isWinner: false,
  },
]

export default function BestAICallHandlerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Best AI Call Handlers", "item": "https://whoza.ai/best-ai-call-handler-uk-trades" }
        ]
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best AI call handler for UK tradespeople?",
            "acceptedAnswer": { "@type": "Answer", "text": "whoza.ai is the best AI call handler for UK tradespeople in 2026. It offers WhatsApp delivery, 30-minute setup, unlimited simultaneous calls, and trade-specific AI starting at £59/month. Built by founder Dru McPherson, a former tradesperson." }
          },
          {
            "@type": "Question",
            "name": "How much does an AI call handler cost in the UK?",
            "acceptedAnswer": { "@type": "Answer", "text": "UK AI call handlers range from £49 to £400+ per month. whoza.ai starts at £59/month + VAT with a 7-day free trial. Human receptionist services like Moneypenny cost £200-400/month." }
          },
          {
            "@type": "Question",
            "name": "Do AI call handlers work for plumbers and electricians?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Modern AI call handlers like whoza.ai are trained on trade-specific terminology. Katie understands boiler types, electrical faults, roofing materials, and more. She asks the right questions to qualify leads for any trade." }
          },
          {
            "@type": "Question",
            "name": "Is an AI call handler better than a human receptionist?",
            "acceptedAnswer": { "@type": "Answer", "text": "For tradespeople, AI call handlers are often better: they answer unlimited calls simultaneously, work 24/7 without breaks, cost 70% less, and deliver leads via WhatsApp instead of email summaries. Human receptionists offer personal touch but cost £200-400/month and handle 1-2 calls at a time." }
          },
          {
            "@type": "Question",
            "name": "Can I try an AI call handler for free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. whoza.ai offers a 7-day free trial with no credit card required. Most trades are live and handling real calls within 30 minutes of signup." }
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
                <li className="text-white">Best AI Call Handlers</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              7 Best AI Call Handlers<br />
              <span className="text-emerald-400">for UK Tradespeople [2026]</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              An honest, independent comparison of every AI call handling service for UK trades.
              Tested, priced, and ranked by features that actually matter to tradespeople.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all">
              Try #1 Pick Free for 7 Days <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">At-a-Glance Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3 font-semibold">Rank</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Price/mo</th>
                  <th className="px-4 py-3 font-semibold">Setup</th>
                  <th className="px-4 py-3 font-semibold">Delivery</th>
                  <th className="px-4 py-3 font-semibold">Contract</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aiHandlers.map((handler) => (
                  <tr key={handler.rank} className={handler.isWinner ? "bg-emerald-50" : "bg-white hover:bg-slate-50"}>
                    <td className="px-4 py-3 font-bold text-slate-900">#{handler.rank}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {handler.name}
                      {handler.isWinner && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Winner</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{handler.price}</td>
                    <td className="px-4 py-3 text-slate-700">{handler.setup}</td>
                    <td className="px-4 py-3 text-slate-700">{handler.name === "whoza.ai" ? "WhatsApp" : "Email/App"}</td>
                    <td className="px-4 py-3 text-slate-700">{handler.name === "whoza.ai" || handler.name === "Breezy" || handler.name === "Your Answer" ? "None" : "12-month"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Detailed Reviews</h2>
          <div className="space-y-12">
            {aiHandlers.map((handler) => (
              <div key={handler.rank} id={handler.name.toLowerCase().replace(/\./g, "")} className={`rounded-xl p-8 border ${handler.isWinner ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${handler.isWinner ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"}`}>
                    {handler.rank}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{handler.name}</h3>
                    <p className={`text-sm font-semibold ${handler.isWinner ? "text-emerald-700" : "text-slate-500"}`}>{handler.highlight}</p>
                  </div>
                  {handler.isWinner && <Star className="w-6 h-6 text-emerald-500 ml-auto fill-emerald-500" />}
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Pros</h4>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {handler.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Cons</h4>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {handler.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-100 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Best for</p>
                  <p className="font-medium text-slate-900">{handler.bestFor}</p>
                </div>

                <div className={`p-4 rounded-lg ${handler.isWinner ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700"}`}>
                  <p className="font-semibold mb-1">{handler.isWinner ? "🏆 Verdict:" : "Verdict:"}</p>
                  <p>{handler.verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to try the #1 AI call handler?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            whoza.ai is built for UK trades. 7-day free trial. No credit card. Live in 30 minutes.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
