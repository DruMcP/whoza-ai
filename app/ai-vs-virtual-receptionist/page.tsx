import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, X, Bot, UserCheck, Clock, PoundSterling, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Call Handler vs Virtual Receptionist: Which Wins?",
  description: "AI call handler or human virtual receptionist? Compare cost, availability, accuracy, and setup time. See which is right for your UK trade business.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/ai-vs-virtual-receptionist",
    siteName: "Whoza.ai",
    title: "AI Call Handler vs Virtual Receptionist: Which Wins?",
    description: "AI call handler or human virtual receptionist? Compare cost, availability, accuracy, and setup time.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI vs virtual receptionist comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handler vs Virtual Receptionist: Which Wins?",
    description: "AI call handler or human virtual receptionist? Compare cost, availability, accuracy, and setup time.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/ai-vs-virtual-receptionist",
  },
}

const comparisons = [
  { category: "Cost", ai: "£59/mo flat", human: "£200-400/mo", winner: "ai", detail: "AI costs 70-85% less than human receptionists." },
  { category: "Availability", ai: "24/7, 365 days", human: "Shift-based, sick days, holidays", winner: "ai", detail: "AI never sleeps, takes breaks, or calls in sick." },
  { category: "Simultaneous calls", ai: "Unlimited", human: "1-2 per agent", winner: "ai", detail: "AI handles 50 calls at once without queueing." },
  { category: "Setup time", ai: "30 minutes", human: "2-5 days", winner: "ai", detail: "AI is live immediately. Humans need training." },
  { category: "Personal touch", ai: "Consistent, polite", human: "Warm, empathetic", winner: "human", detail: "Humans excel at emotional connection." },
  { category: "Trade knowledge", ai: "Trained on your terms", human: "Must be taught", winner: "ai", detail: "AI knows 'combi boiler' vs 'system boiler' instantly." },
  { category: "Delivery", ai: "WhatsApp instant", human: "Email summary", winner: "ai", detail: "Tradespeople live on WhatsApp, not email." },
  { category: "Contract", ai: "None — cancel anytime", human: "12-month typical", winner: "ai", detail: "No lock-in with AI. Freedom to leave." },
]

export default function AIVsVirtualReceptionistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
          { "@type": "ListItem", "position": 2, "name": "AI vs Virtual Receptionist", "item": "https://whoza.ai/ai-vs-virtual-receptionist" }
        ]
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is an AI call handler better than a virtual receptionist?",
            "acceptedAnswer": { "@type": "Answer", "text": "For most UK tradespeople, yes. AI call handlers cost 70-85% less (£59 vs £200-400/month), answer unlimited calls simultaneously, work 24/7, and deliver leads via WhatsApp. Human virtual receptionists offer personal warmth but cost significantly more and handle only 1-2 calls at a time." }
          },
          {
            "@type": "Question",
            "name": "Do customers know they're talking to AI?",
            "acceptedAnswer": { "@type": "Answer", "text": "Modern AI call handlers like whoza.ai use natural, conversational voices. Most callers don't realize it's AI. The focus is on solving their problem quickly, not pretending to be human. Trades report high customer satisfaction with AI handling." }
          },
          {
            "@type": "Question",
            "name": "Can AI handle complex trade enquiries?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. whoza.ai's AI is trained on trade-specific terminology — boilers, electrical faults, roofing materials, drainage issues. It asks the right qualifying questions (location, urgency, budget) and escalates complex cases to you immediately." }
          },
          {
            "@type": "Question",
            "name": "When should I choose a human receptionist instead?",
            "acceptedAnswer": { "@type": "Answer", "text": "Choose human receptionists if you need emotional empathy (funeral services, counselling), handle very high-value bespoke enquiries (luxury renovations), or prefer building personal relationships with every caller. For typical trade enquiries, AI is more cost-effective." }
          },
          {
            "@type": "Question",
            "name": "How much can I save switching from virtual receptionist to AI?",
            "acceptedAnswer": { "@type": "Answer", "text": "UK tradespeople save £1,700-4,100 per year switching from virtual receptionist (£200-400/month) to AI call handling (£59/month). whoza.ai includes unlimited calls, WhatsApp delivery, and 30-day money-back guarantee." }
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
                <li className="text-white">AI vs Virtual Receptionist</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              AI Call Handler vs<br />
              <span className="text-emerald-400">Virtual Receptionist: Which Wins?</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              An honest comparison for UK tradespeople. See cost, availability, call handling capacity, 
              and trade-specific features side by side.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all">
              Try AI Call Handling Free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Head-to-Head Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold text-emerald-400">AI Call Handler</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Virtual Receptionist</th>
                  <th className="px-6 py-4 font-semibold">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisons.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.category}</td>
                    <td className="px-6 py-4 text-emerald-700">
                      <div className="font-semibold">{row.ai}</div>
                      <div className="text-sm text-slate-600 mt-1">{row.detail}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.human}</td>
                    <td className="px-6 py-4">
                      {row.winner === "ai" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Bot className="w-4 h-4" /> AI</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-blue-600 font-bold"><UserCheck className="w-4 h-4" /> Human</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Which Should You Choose?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-bold text-emerald-900">Choose AI If...</h3>
              </div>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You miss calls while working on jobs</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You want to save £1,700+ per year</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You need 24/7 coverage without paying night rates</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You want WhatsApp delivery, not email summaries</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You handle 5+ calls per day</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You want instant setup without training anyone</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-900">Choose Human If...</h3>
              </div>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> You handle sensitive/emotional enquiries (funerals, counselling)</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Your customers expect white-glove personal service</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> You get fewer than 3 calls per week</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> You prefer building personal relationships with every caller</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Budget is not a primary concern</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cost breakdown */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Cost Breakdown: 12-Month Comparison</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-700">AI Call Handler</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Monthly fee</span><span className="font-semibold">£59</span></div>
                  <div className="flex justify-between"><span>Setup cost</span><span className="font-semibold text-emerald-600">£0</span></div>
                  <div className="flex justify-between"><span>Overage charges</span><span className="font-semibold text-emerald-600">None</span></div>
                  <div className="flex justify-between"><span>Contract</span><span className="font-semibold text-emerald-600">None</span></div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold">
                    <span>12-month total</span>
                    <span className="text-emerald-600">£708</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-6 h-6 text-slate-400" />
                  <h3 className="text-xl font-bold text-slate-600">Virtual Receptionist</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Monthly fee (avg)</span><span className="font-semibold">£300</span></div>
                  <div className="flex justify-between"><span>Setup cost</span><span className="font-semibold">£50-100</span></div>
                  <div className="flex justify-between"><span>Overage charges</span><span className="font-semibold">Per minute</span></div>
                  <div className="flex justify-between"><span>Contract</span><span className="font-semibold">12-month min</span></div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold">
                    <span>12-month total</span>
                    <span className="text-slate-500">£3,650+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 p-6 border-t border-slate-200">
              <p className="text-center text-lg text-emerald-900 font-semibold">
                💰 Annual savings with AI: <strong className="text-emerald-700">£2,942+</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to switch to AI call handling?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of UK tradespeople saving £2,900+ per year with whoza.ai.
            7-day free trial — no credit card required.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
            Try AI Call Handling Free <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
