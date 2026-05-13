import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Pricing } from "@/components/whoza/pricing"
import { FinalCTA } from "@/components/whoza/final-cta"
import { ArrowRight, Check, X, Clock, PoundSterling, MessageCircle, Phone, Shield } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs Trade Receptionist: Which is Better for UK Trades?",
  description: "Compare whoza.ai and Trade Receptionist for UK tradespeople. Price, setup time, WhatsApp delivery, and more. See why trades choose whoza.ai.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/vs-trade-receptionist",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs Trade Receptionist: Which is Better for UK Trades?",
    description: "Compare whoza.ai and Trade Receptionist for UK tradespeople. Price, setup time, WhatsApp delivery, and more.",
    images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: "Whoza.ai vs Trade Receptionist comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs Trade Receptionist: Which is Better for UK Trades?",
    description: "Compare whoza.ai and Trade Receptionist for UK tradespeople. Price, setup time, WhatsApp delivery, and more.",
    images: ["https://whoza.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://whoza.ai/vs-trade-receptionist",
  },
}

const comparisonData = [
  { feature: "Monthly Price", whoza: "£59 + VAT", competitor: "£200 – £400 + VAT", winner: "whoza" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "2 – 5 days", winner: "whoza" },
  { feature: "Delivery Method", whoza: "WhatsApp (no app needed)", competitor: "Email + dashboard login", winner: "whoza" },
  { feature: "Simultaneous Calls", whoza: "Unlimited", competitor: "1 – 2 per agent", winner: "whoza" },
  { feature: "Contract", whoza: "None — cancel anytime", competitor: "12-month minimum", winner: "whoza" },
  { feature: "Free Trial", whoza: "7 days — no card needed", competitor: "Usually none", winner: "whoza" },
  { feature: "Money-Back Guarantee", whoza: "30 days", competitor: "Rare", winner: "whoza" },
  { feature: "Built By", whoza: "Former tradesperson", competitor: "Corporate team", winner: "draw" },
]

export default function VsTradeReceptionistPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Comparison", "item": "https://whoza.ai/vs-trade-receptionist" }
        ]
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is whoza.ai cheaper than Trade Receptionist?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. whoza.ai starts at £59/month + VAT. Trade Receptionist typically charges £200-400/month + VAT for comparable call volumes. Over a year, whoza.ai saves £1,700-4,100." }
          },
          {
            "@type": "Question",
            "name": "Does whoza.ai use real people or AI?",
            "acceptedAnswer": { "@type": "Answer", "text": "whoza.ai uses AI voice agents (Katie and Mark) who answer calls 24/7. Trade Receptionist uses human receptionists. AI means unlimited simultaneous calls, instant setup, and no sick days." }
          },
          {
            "@type": "Question",
            "name": "Which is faster to set up?",
            "acceptedAnswer": { "@type": "Answer", "text": "whoza.ai is live in 30 minutes. Trade Receptionist typically requires 2-5 days for onboarding, script creation, and training." }
          },
          {
            "@type": "Question",
            "name": "Why do tradespeople prefer WhatsApp over email?",
            "acceptedAnswer": { "@type": "Answer", "text": "Tradespeople live on their phones. WhatsApp is instant, already installed, and allows one-tap accept/call-back/decline. Email requires checking inbox, opening messages, and manual follow-up." }
          },
          {
            "@type": "Question",
            "name": "Can I cancel whoza.ai anytime?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. whoza.ai has no contracts. Cancel anytime with 30 days' notice. Trade Receptionist typically requires a 12-month minimum contract." }
          }
        ]
      })}} />

      <Header />

      <main className="pb-24 lg:pb-0">
        {/* Hero */}
        <section className="dark-section relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            {/* Breadcrumb nav */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-slate-400" style={{ listStyle: "none", padding: 0 }}>
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li className="mx-2">/</li>
                <li className="text-white">Comparison</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Whoza.ai vs Trade Receptionist:<br />
              <span className="text-emerald-400">Which is Better for UK Trades?</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              An honest comparison of the two leading call handling services for UK tradespeople.
              See pricing, setup time, features, and why hundreds of trades are switching.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all">
              Try whoza.ai free for 7 days <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Head-to-Head Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold text-emerald-400">Whoza.ai</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Trade Receptionist</th>
                  <th className="px-6 py-4 font-semibold">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-emerald-700 font-medium">{row.whoza}</td>
                    <td className="px-6 py-4 text-slate-600">{row.competitor}</td>
                    <td className="px-6 py-4">
                      {row.winner === "whoza" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold"><Check className="w-4 h-4" /> Whoza</span>
                      ) : (
                        <span className="text-slate-500">Draw</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* WhatsApp vs Dashboard */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">WhatsApp vs Dashboard: Where Trades Actually Live</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-emerald-900">Whoza.ai — WhatsApp</h3>
              </div>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Already on every tradesperson's phone</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Instant push notification</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> One-tap accept / call back / decline</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> No login, no password, no training</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-6 h-6 text-slate-500" />
                <h3 className="text-xl font-bold text-slate-700">Trade Receptionist — Email + Dashboard</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> Must check email inbox</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> Login to portal to see calls</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> Manual follow-up process</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> Another app to learn</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pricing Comparison</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-emerald-700">Whoza.ai</h3>
                </div>
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">£59<span className="text-lg font-medium text-slate-500">/mo + VAT</span></div>
                <p className="text-slate-600 mb-4">Starter plan. Unlimited calls. No contract.</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 7-day free trial</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 30-day money-back guarantee</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> No setup fees</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="w-6 h-6 text-slate-400" />
                  <h3 className="text-2xl font-bold text-slate-700">Trade Receptionist</h3>
                </div>
                <div className="text-4xl font-extrabold text-slate-500 mb-2">£200-400<span className="text-lg font-medium text-slate-500">/mo + VAT</span></div>
                <p className="text-slate-600 mb-4">Typical pricing for UK virtual receptionist services.</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> 12-month contract typical</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Setup fees may apply</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Per-minute overage charges</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-lg text-slate-700">
                <strong className="text-emerald-700">Annual savings with whoza.ai:</strong>{" "}
                £1,700 – £4,100 per year compared to Trade Receptionist.
                That's 10-20 recovered jobs paying for the entire service.
              </p>
            </div>
          </div>
        </section>

        {/* Setup Time */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Setup Time: 30 Minutes vs 2-5 Days</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Connect your number</h4>
                  <p className="text-sm text-slate-600">2 minutes — forward your existing business number</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Set your hours</h4>
                  <p className="text-sm text-slate-600">3 minutes — tell Katie when to answer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-900">Receive your first lead</h4>
                  <p className="text-sm text-slate-600">25 minutes — test call, then go live</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-emerald-600">30 min</div>
                <p className="text-slate-600 mt-2">From signup to first real call handled</p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Built by a Former Tradesperson</h2>
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-xl p-8 border border-slate-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl shrink-0">👤</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Dru McPherson, Founder</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  "I ran a trade business for years. I know what it's like to miss a call while you're under a sink,
                  on a roof, or in a customer's home. Every missed call is a job lost to a competitor.
                  I built Katie because I needed her myself. Every feature is designed around the reality
                  of working in the trades — not a corporate office."
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <a href="mailto:dru@whoza.ai" className="text-emerald-600 hover:underline font-medium">dru@whoza.ai</a>
                  <span>•</span>
                  <span>Direct founder access on all plans</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-4">
            {["7-day free trial — no card needed", "30-day money-back guarantee", "Live in 30 minutes", "No contracts", "ICO Registered ZC077271"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-sm font-medium px-4 py-2 rounded-full border border-emerald-100">
                <Shield className="w-4 h-4" /> {item}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to stop missing calls?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of UK tradespeople who've switched to whoza.ai.
            Start your 7-day free trial — no credit card required.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl">
            Try whoza.ai free for 7 days <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* Related links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/pricing" className="block p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              <h4 className="font-bold text-emerald-700 mb-1">Whoza.ai Pricing</h4>
              <p className="text-sm text-slate-600">See all plans starting from £59/month</p>
            </a>
            <a href="/support" className="block p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              <h4 className="font-bold text-emerald-700 mb-1">Support Centre</h4>
              <p className="text-sm text-slate-600">Get help with setup and usage</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
