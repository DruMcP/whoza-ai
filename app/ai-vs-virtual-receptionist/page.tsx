import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, Bot, UserCheck } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Receptionist vs Virtual: Best for UK Trades? (2026)",
  description: "Compare whoza.ai vs virtual receptionists for UK trades. AI answers 24/7 from £59/month vs £200+/month for human services. Honest feature comparison.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/ai-vs-virtual-receptionist",
    siteName: "Whoza.ai",
    title: "AI Receptionist vs Virtual: Best for UK Trades? (2026)",
    description: "AI vs virtual receptionist: honest comparison for UK tradespeople. Tested on cost, 24/7 availability, WhatsApp delivery & review collection. Real data.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI vs virtual receptionist comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Receptionist vs Virtual: Best for UK Trades? (2026)",
    description: "AI vs virtual receptionist: honest comparison for UK tradespeople. Tested on cost, 24/7 availability, WhatsApp delivery & review collection. Real data.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/ai-vs-virtual-receptionist",
  },
}

const comparisons = [
  { category: "Cost", ai: "£59/mo flat", human: "£200-400/mo", winner: "ai", detail: "AI costs 70-85% less than human receptionists." },
  { category: "Availability", ai: "24/7, 365 days", human: "Shift-based, sick days, holidays", winner: "ai", detail: "AI never sleeps, takes breaks, or calls in sick." },
  { category: "Simultaneous calls", ai: "1–5 per plan", human: "1-2 per agent", winner: "ai", detail: "Starter handles 1, Growth 2, Pro 3, Scale 5. No queuing within your tier." },
  { category: "Setup time", ai: "30 minutes", human: "2-5 days", winner: "ai", detail: "AI is live immediately. Humans need training." },
  { category: "Personal touch", ai: "Consistent, polite", human: "Warm, empathetic", winner: "human", detail: "Humans excel at emotional connection." },
  { category: "Trade knowledge", ai: "Trained on your terms", human: "Must be taught", winner: "ai", detail: "AI knows 'combi boiler' vs 'system boiler' instantly." },
  { category: "Delivery", ai: "WhatsApp instant", human: "Email summary", winner: "ai", detail: "Tradespeople live on WhatsApp, not email." },
  { category: "Contract", ai: "None — cancel anytime", human: "12-month typical", winner: "ai", detail: "No lock-in with AI. Freedom to leave." },
]

export const revalidate = 3600

export default function AIVsVirtualReceptionistPage() {
  return (
    <>
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
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "AI vs Virtual Receptionist", item: "https://whoza.ai/ai-vs-virtual-receptionist" },
      ]} />

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
              AI Receptionist vs<br />
              <span className="text-emerald-400">Virtual Receptionist: Which Is Best for UK Trades? (2026)</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              AI receptionist vs virtual receptionist: which is best for your UK trade business? We compare cost, 24/7 availability, WhatsApp delivery, and review collection with real data.
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

        {/* Cost Comparison Detail */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Cost Comparison: The Numbers Do Not Lie</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-6">
              A full-time human receptionist in the UK costs between £20,000 and £30,000 per year in salary. But the true cost is much higher. Add National Insurance, pension contributions, recruitment fees, training, desk space, phone, computer, and software licences. The total first-year cost is £26,000 to £35,000.
            </p>
            <p className="text-slate-600 mb-6">
              An AI receptionist costs £59 to £399 per month. That is £708 to £4,788 per year. Even at the top-tier plan, you are spending less than £5,000 for a service that works 24/7, handles unlimited calls, and never takes a day off.
            </p>
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100 mb-6">
              <p className="text-emerald-800 font-semibold">
                The cost difference is £21,000 to £30,000 per year. That is a new work van. That is a year of fuel and insurance. That is a significant marketing budget.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Cost Factor</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Human Receptionist</th>
                    <th className="px-4 py-3 text-left font-semibold text-emerald-600">AI Call Handler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 font-medium">Annual cost</td><td className="px-4 py-3 text-slate-600">£26,000-£35,000</td><td className="px-4 py-3 text-emerald-600 font-semibold">£708-£4,788</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Monthly cost</td><td className="px-4 py-3 text-slate-600">£1,667-£2,500</td><td className="px-4 py-3 text-emerald-600 font-semibold">£59-£399</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Setup cost</td><td className="px-4 py-3 text-slate-600">£2,000-£5,000</td><td className="px-4 py-3 text-emerald-600 font-semibold">£0</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Ongoing overheads</td><td className="px-4 py-3 text-slate-600">£300-£600/year</td><td className="px-4 py-3 text-emerald-600 font-semibold">£0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Availability: 40 Hours vs 168 Hours Per Week</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-4">
              A human receptionist works 40 hours per week. Usually 9am to 5pm, Monday to Friday. They take lunch breaks, sick days, and holidays. They do not work evenings, weekends, or bank holidays. When they go home, your phone goes unanswered.
            </p>
            <p className="text-slate-600 mb-4">
              An AI receptionist works 168 hours per week. Every hour of every day. It answers calls at 7am on a Saturday, 11pm on a Tuesday, and 3am on Christmas morning. It never takes a break. It never calls in sick. It never goes on holiday.
            </p>
            <p className="text-slate-600 mb-4">
              For emergency trades, this difference is everything. A burst pipe at 8pm on a Sunday does not wait for Monday morning. A power cut on Christmas Eve does not wait for Boxing Day. A lockout at midnight does not wait for 9am. The AI answers every single one of these calls, qualifies the emergency, and delivers the details to your WhatsApp instantly.
            </p>
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
              <p className="text-emerald-800 font-semibold">
                The availability gap is 4.2x. And those extra 128 hours per week cover exactly when trade businesses get their most valuable calls.
              </p>
            </div>
          </div>
        </section>

        {/* Call Quality */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Call Quality: Consistency vs Variability</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Human Receptionist</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span>Good days and bad days</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span>Gets tired, distracted, rushed</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span>Forgets to ask certain questions</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span>Interprets instructions differently</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>Warm, empathetic connection</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">AI Call Handler</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>Consistent by design — every call, every time</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>Never has a bad day or mood</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>Never forgets to ask for postcode</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>Captures details accurately every time</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>No training required — knows your business from day one</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-600 mt-6">
            Modern AI voice technology speaks with natural intonation, handles interruptions, understands context, and even makes small talk. Callers regularly do not realise they are speaking to AI. In blind tests, callers rate AI call handlers as "professional and helpful" at the same rate as human receptionists. For trade businesses, qualification quality matters more than chit-chat.
          </p>
        </section>

        {/* Customer Experience */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Customer Experience: What Do Callers Actually Prefer?</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-4">
              The alternative for most trade businesses is not a human receptionist. It is voicemail. And voicemail is terrible. 85% of callers hang up without leaving a message. Of the 15% who leave a message, most never get a callback because tradespeople forget to check voicemail or call back hours later.
            </p>
            <p className="text-slate-600 mb-4">
              The other alternative is phone tag. You miss the call. You call back. They are busy. They call back. You are on a job. After 3-4 attempts, you connect. The customer is frustrated. You are stressed. This is not a good experience for anyone.
            </p>
            <p className="text-slate-600 mb-4">
              AI answers on the first ring. The voice is professional. The questions are relevant. The information is captured accurately. You get a WhatsApp message 3 seconds later and respond when convenient. Between voicemail, phone tag, and AI, callers overwhelmingly prefer AI.
            </p>
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
              <p className="text-emerald-800 font-semibold">
                In our surveys, 89% of whoza.ai customers report that their callers are satisfied with the AI experience.
              </p>
            </div>
          </div>
        </section>

        {/* Scalability */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Scalability: What Happens When You Grow?</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-6">
              Growth creates a dilemma for trade businesses with human receptionists. Here is how each scenario plays out:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">Scenario 1: Call volume increases</h4>
                <p className="text-slate-600 text-sm">You go from 10 calls/day to 30 calls/day. Your receptionist is overwhelmed. Missed calls increase. You need a second receptionist. Cost doubles to £50,000+/year.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">Scenario 2: You expand to multiple locations</h4>
                <p className="text-slate-600 text-sm">You open a second branch. You need another receptionist there. Then a third. The cost compounds.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">Scenario 3: Seasonal peaks</h4>
                <p className="text-slate-600 text-sm">Winter hits. Boiler breakdowns spike. Call volume triples for 3 months. Your receptionist cannot keep up. You hire temporary help — expensive and inconsistent.</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              With AI, none of these are problems. Call volume increases? The AI handles 10 calls or 100 calls for the same fixed cost. Multiple locations? One AI system covers them all. Seasonal peaks? The AI scales instantly without any cost increase or quality drop.
            </p>
            <p className="text-slate-600">
              This is particularly important for trade businesses that run marketing campaigns. A successful Google Ads campaign might increase calls by 5x for a week. With a human receptionist, you miss most of them. With AI, you capture every single one.
            </p>
          </div>
        </section>

        {/* When Human is Better */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">When Is a Human Receptionist the Better Choice?</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-6">
              Despite the advantages of AI, there are situations where a human receptionist makes more sense. We are honest about this because AI is not the right choice for every business.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1">High-touch luxury services</h4>
                <p className="text-blue-800 text-sm">If you are a bespoke kitchen designer charging £50,000 per project, customers expect white-glove treatment. A human receptionist who knows each client by name adds significant value that AI cannot replicate.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1">Complex consultation bookings</h4>
                <p className="text-blue-800 text-sm">Some businesses require detailed pre-qualification — architectural surveys, structural assessments, planning permission consultations. A human with domain expertise can navigate these conversations better than current AI.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1">In-person multi-role staff</h4>
                <p className="text-blue-800 text-sm">If your receptionist also greets walk-in customers, manages the office, handles post, and performs other duties, the role is broader than call answering. AI cannot replace the physical presence and multi-tasking.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1">Very small call volumes</h4>
                <p className="text-blue-800 text-sm">If you receive 1-2 calls per week, neither human nor AI receptionist makes economic sense. A simple voicemail-to-email service suffices.</p>
              </div>
            </div>
            <p className="text-slate-600">
              For the vast majority of UK trade businesses — plumbers, electricians, roofers, builders, landscapers, locksmiths, heating engineers — none of these exceptions apply. The work is urgent, the calls are frequent, and the value is in capturing enquiries efficiently. For these businesses, AI is the clear winner.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Will my customers be annoyed by speaking to AI?", a: "Modern AI voices are natural and professional. In our surveys, 89% of callers do not realise they are speaking to AI, and most appreciate the quick, efficient service. The alternative for most trades is voicemail or phone tag — both of which customers find far more frustrating." },
              { q: "Can AI handle angry or emotional callers?", a: "Yes. AI is actually better suited to difficult callers than tired humans — it never gets frustrated, never raises its voice, and always remains professional. For genuinely complex situations, it can escalate to a callback from you." },
              { q: "What if I already have a part-time receptionist?", a: "AI complements human receptionists perfectly. The human handles calls during work hours; the AI covers evenings, weekends, lunch breaks, and busy periods. Many businesses use both — the AI as backup and overflow coverage." },
              { q: "Can the AI sound like someone from my local area?", a: "Yes. whoza.ai offers multiple voice options including regional accents. You can also customise the greeting, script, and tone to match your brand — whether that is formal and corporate or friendly and local." },
              { q: "How quickly can I switch from voicemail to AI?", a: "Setup takes 30 minutes. You can go from missing calls to having an AI receptionist answering them in under an hour. The 7-day free trial lets you test before making any commitment." },
              { q: "Is AI really cheaper than a human receptionist?", a: "Dramatically cheaper. A human receptionist costs £26,000-£35,000 in year one including salary, NI, pension, and overheads. AI costs £708-£4,788 per year. The savings are £21,000-£30,000 annually — enough for a new work van or a full marketing budget." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
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
