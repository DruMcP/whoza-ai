import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, X, Clock, PoundSterling, Shield, AlertTriangle, Building, Globe, Scale } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs Trade Receptionist | UK Trades",
  description: "Compare whoza.ai and Trade Receptionist for UK trades. Honest comparison of pricing, setup, compliance, and quality.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/vs-trade-receptionist",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs Trade Receptionist: Which is Better for UK Trades?",
    description: "Compare whoza.ai and Trade Receptionist for UK tradespeople. Honest comparison of pricing, setup, legal compliance, and platform quality.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai vs Trade Receptionist comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs Trade Receptionist: Which is Better for UK Trades?",
    description: "Compare whoza.ai and Trade Receptionist for UK tradespeople. Honest comparison of pricing, setup, legal compliance, and platform quality.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/vs-trade-receptionist",
  },
}

const comparisonData = [
  { feature: "Monthly Price", whoza: "£59 (Starter)", competitor: "£29 / £59 / £119 (+VAT)", winner: "draw" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "~14 minutes (their claim)", winner: "competitor" },
  { feature: "Delivery Method", whoza: "WhatsApp", competitor: "WhatsApp job summaries", winner: "draw" },
  { feature: "Legal Entity", whoza: "UK Limited Company", competitor: "Australian Sole Trader", winner: "whoza" },
  { feature: "VAT Compliance", whoza: "VAT registered, displayed", competitor: "No VAT number shown", winner: "whoza" },
  { feature: "T&Cs / Privacy Policy", whoza: "Present", competitor: "Missing / non-functional", winner: "whoza" },
  { feature: "Pricing Model", whoza: "Per minute (matches infra cost)", competitor: "Per call (hides real cost)", winner: "whoza" },
  { feature: "Money-Back Guarantee", whoza: "30 days", competitor: "None stated", winner: "whoza" },
  { feature: "Build Quality", whoza: "Custom platform", competitor: "n8n template from course", winner: "whoza" },
  { feature: "Free Trial", whoza: "7 days, no card", competitor: "14 days, no card", winner: "competitor" },
  { feature: "Contract", whoza: "None", competitor: "None", winner: "draw" },
]

export default function VsTradeReceptionistPage() {
  return (
    <>
      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is whoza.ai cheaper than Trade Receptionist?",
            "acceptedAnswer": { "@type": "Answer", "text": "whoza.ai starts at £59/month. Trade Receptionist starts at £29/month (+VAT). However, Trade Receptionist charges per call while whoza.ai charges per minute - the same way the underlying infrastructure (Retell.ai + Twilio) is billed. At a realistic 4-minute average call, their £29 Starter plan costs more in infrastructure fees than they charge. Their 'unlimited calls' plan is mathematically unprofitable at realistic call durations." }
          },
          {
            "@type": "Question",
            "name": "Does whoza.ai use real people or AI?",
            "acceptedAnswer": { "@type": "Answer", "text": "whoza.ai uses AI voice agents (Katie and Mark) who answer calls 24/7. Trade Receptionist also uses AI voice agents powered by Retell.ai. Both services use AI - the difference is who built the platform and how it is priced." }
          },
          {
            "@type": "Question",
            "name": "Which is faster to set up?",
            "acceptedAnswer": { "@type": "Answer", "text": "Trade Receptionist claims setup in under 14 minutes. whoza.ai is typically live in 30 minutes. Both are fast - the real difference is what you get: a custom platform built for UK trades vs a template-based workflow distributed through a course community." }
          },
          {
            "@type": "Question",
            "name": "Why does whoza.ai charge per minute instead of per call?",
            "acceptedAnswer": { "@type": "Answer", "text": "Because that is how the infrastructure costs work. Retell.ai and Twilio both charge per minute. Charging per call either subsidises long calls with short ones, or incentivises cutting calls short to control costs. Per-minute pricing is transparent and sustainable." }
          },
          {
            "@type": "Question",
            "name": "Can I cancel whoza.ai anytime?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. whoza.ai has no contracts - cancel anytime. Trade Receptionist also has no contract and offers a 14-day free trial with no card required." }
          }
        ]
      })}} />

      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "vs Trade Receptionist", item: "https://whoza.ai/vs-trade-receptionist" },
      ]} />

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
              An honest comparison of two very different approaches to AI call handling.
              See pricing, setup time, legal compliance, and why the platform behind your calls matters.
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
                      ) : row.winner === "competitor" ? (
                        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">Trade Receptionist</span>
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
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">£59<span className="text-lg font-medium text-slate-500">/mo</span></div>
                <p className="text-slate-600 mb-4">Starter plan. Per-minute pricing. No contract.</p>
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
                <div className="text-4xl font-extrabold text-slate-500 mb-2">£29<span className="text-lg font-medium text-slate-500">/mo (+VAT)</span></div>
                <p className="text-slate-600 mb-4">Starter plan (100 calls). Per-call pricing. No contract.</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> 14-day free trial</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> No money-back guarantee stated</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> No setup fees</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Per-Minute Pricing Matters */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Per-Minute Pricing Matters</h2>
          <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">The Infrastructure Charges Per Minute</h3>
                <p className="text-amber-800 leading-relaxed">
                  Both whoza.ai and Trade Receptionist use Retell.ai for voice AI and Twilio for telephony.
                  Both of these services charge <strong>per minute</strong>. That is a fact.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-amber-100 mb-6">
              <h4 className="font-bold text-slate-900 mb-4">The Math Does Not Lie</h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Trade Receptionist Starter Plan</p>
                  <p className="text-2xl font-extrabold text-slate-700">£29 <span className="text-sm font-normal text-slate-500">/ month for 100 calls</span></p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Infrastructure cost at 4 min/call</p>
                  <p className="text-2xl font-extrabold text-red-600">~£38 <span className="text-sm font-normal text-slate-500">/ month in Retell + Twilio fees</span></p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-amber-100">
                <p className="text-lg text-amber-900 font-semibold">
                  At 4 minutes per call, their £29 Starter plan costs them ~£38 in Retell/Twilio fees.
                  That is not a sustainable business - it is a loss leader.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-amber-800">
              <p className="leading-relaxed">
                <strong>Charging per call is a pricing trick.</strong> It hides the real cost from customers.
                Short calls subsidise long calls. Or worse - calls are artificially cut short to control costs.
                Neither is good for your business.
              </p>
              <p className="leading-relaxed">
                <strong>whoza.ai charges per minute because that is what the infrastructure costs.</strong>
                No tricks. Predictable margins. Predictable quality. You know exactly what you are paying for.
              </p>
            </div>
          </div>
        </section>

        {/* Who Is Actually Behind Your Calls? */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Is Actually Behind Your Calls?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Your business calls are handled by a voice AI. The legal entity backing that service matters if something goes wrong.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-emerald-900">Whoza.ai</h3>
              </div>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> UK Limited Company</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> VAT registered - number displayed</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Full Terms & Conditions</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Privacy Policy (GDPR compliant)</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> ICO registered (ZC077271)</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> UK-based team</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-slate-500" />
                <h3 className="text-xl font-bold text-slate-700">Trade Receptionist</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><Scale className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" /> Australian sole trader (ABN 12 386 387 099)</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> No UK company at Companies House</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> No VAT number displayed despite "+VAT" pricing</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> No functional Terms & Conditions</li>
                <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> Privacy Policy link missing / non-functional</li>
                <li className="flex items-start gap-2"><Globe className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" /> Based in Melbourne, VIC 3004</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setup Time */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Setup Time: 30 Minutes vs ~14 Minutes</h2>
          <p className="text-lg text-slate-600 mb-6">
            Trade Receptionist claims setup in under 14 minutes. whoza.ai is live in 30 minutes.
            Both are fast - the real difference is what you get on the other side.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Connect your number</h4>
                  <p className="text-sm text-slate-600">2 minutes - forward your existing business number</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Set your hours</h4>
                  <p className="text-sm text-slate-600">3 minutes - tell Katie when to answer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-900">Receive your first lead</h4>
                  <p className="text-sm text-slate-600">25 minutes - test call, then go live</p>
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
          <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 leading-relaxed">
              <strong>But here is what those 30 minutes build:</strong> a custom platform designed specifically for UK trades,
              with proper legal compliance, VAT registration, GDPR-compliant privacy policy,
              and a UK-based team you can actually reach. Trade Receptionist is a Retell.ai + n8n + Twilio template
              distributed through a Skool community (&quot;Brendan&apos;s AI Community&quot;). It is not a purpose-built platform.
            </p>
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
                  &quot;I ran a trade business for years. I know what it&apos;s like to miss a call while you&apos;re under a sink,
                  on a roof, or in a customer&apos;s home. Every missed call is a job lost to a competitor.
                  I built Katie because I needed her myself. Every feature is designed around the reality
                  of working in the trades - not a corporate office.&quot;
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
            {["7-day free trial - no card needed", "30-day money-back guarantee", "Live in 30 minutes", "No contracts", "ICO Registered ZC077271"].map((item) => (
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
            Join hundreds of UK tradespeople who&apos;ve switched to whoza.ai.
            Start your 7-day free trial - no credit card required.
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
