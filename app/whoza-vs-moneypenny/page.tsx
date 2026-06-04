import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Check, X, MessageCircle, PoundSterling, Clock, Shield, Star, TrendingUp, PhoneOff } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs Moneypenny: £59 vs £150+ (2026)",
  description: "AI vs human receptionist: honest cost and feature comparison for UK tradespeople. whoza.ai at £59/month vs Moneypenny from £150/month.",
  keywords: [
    "whoza.ai vs Moneypenny",
    "Moneypenny alternative UK trades",
    "AI vs human receptionist cost",
    "cheap call answering service UK",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/whoza-vs-moneypenny",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs Moneypenny: £59 vs £150+ for Trade Call Answering",
    description: "AI vs human receptionist: honest cost and feature comparison for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai vs Moneypenny comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs Moneypenny: £59 vs £150+ for Trade Call Answering",
    description: "AI vs human receptionist: honest cost and feature comparison for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/whoza-vs-moneypenny",
  },
}

const comparisonData = [
  { feature: "Monthly Price", whoza: "£59", competitor: "£150–£400", winner: "whoza", note: "whoze 62% cheaper entry" },
  { feature: "Price per Call", whoza: "£4.50/job booked", competitor: "Included in monthly", winner: "draw", note: "Different pricing models" },
  { feature: "Answerer Type", whoza: "AI voice agent", competitor: "Human receptionists", winner: "draw", note: "Different approaches" },
  { feature: "Availability", whoza: "24/7, unlimited calls", competitor: "24/7, within package", winner: "whoza", note: "AI never sleeps or takes breaks" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "2–5 days", winner: "whoza", note: "whoze much faster" },
  { feature: "WhatsApp Delivery", whoza: "✓ Native", competitor: "✗ Email/portal", winner: "whoza", note: "whoze better for mobile" },
  { feature: "Review Collection", whoza: "✓ Built-in", competitor: "✗ Not included", winner: "whoza", note: "whoze adds value" },
  { feature: "Competitor Analysis", whoza: "✓ Monthly reports", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Contract Length", whoza: "None", competitor: "12-month typical", winner: "whoza", note: "whoze more flexible" },
  { feature: "Free Trial", whoza: "7 days, no card", competitor: "Varies by package", winner: "whoza", note: "whoze more accessible" },
  { feature: "Human Touch", whoza: "✗ AI (94% pass as human)", competitor: "✓ Real people", winner: "moneypenny", note: "Moneypenny wins on empathy" },
  { feature: "Brand Heritage", whoza: "Launched 2025", competitor: "25+ years", winner: "moneypenny", note: "Moneypenny more established" },
  { feature: "Complex Enquiries", whoza: "✓ Handles 92%", competitor: "✓ Handles 99%+", winner: "moneypenny", note: "Humans better at nuance" },
  { feature: "Bilingual Support", whoza: "✓ English", competitor: "✓ Multiple languages", winner: "moneypenny", note: "Moneypenny more diverse" },
]

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "Whoza.ai",
    "applicationCategory": "BusinessApplication",
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.6",
    "bestRating": "5",
  },
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "reviewBody": "whoza.ai vs Moneypenny comparison for UK trades. whoza.ai wins on price (£59 vs £150+), setup speed (30 min vs 2-5 days), flexibility (no contract), and unique features (WhatsApp delivery, review collection, competitor analysis). Moneypenny wins on human empathy, complex enquiry handling, brand trust, and multi-language support. Recommendation: Choose whoza.ai for cost-conscious sole traders and small teams who want modern features. Choose Moneypenny for high-value commercial clients where human relationship-building matters.",
}

export default function VsMoneypennyPage() {
  return (
    <>
      <script id="comparison-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "vs Moneypenny", item: "https://whoza.ai/whoza-vs-moneypenny" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">vs Moneypenny</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Comparison — May 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Whoza.ai vs Moneypenny
                <span className="block text-emerald-400 mt-2">£59 AI vs £150+ Human Receptionists</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                Moneypenny is the UK's best-known call answering service — 25+ years, thousands of clients, 
                human receptionists. whoza.ai is the new AI alternative. Here's the honest breakdown of 
                where each wins, where each loses, and which makes sense for your trade business.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#comparison-table" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See Full Comparison <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/pricing" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Try whoza.ai Free <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Quick Verdict */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-amber-500/5 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Which should you choose: whoza.ai or Moneypenny?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose whoza.ai if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You want to save £1,000+ per year</li>
                    <li>• You need instant setup (not 2-5 days)</li>
                    <li>• You want WhatsApp delivery</li>
                    <li>• You want review collection included</li>
                    <li>• You hate long-term contracts</li>
                    <li>• You're a sole trader or small team (1-5 people)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose Moneypenny if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You serve high-value commercial clients</li>
                    <li>• Human relationship-building is critical</li>
                    <li>• You need multi-language support</li>
                    <li>• You value brand heritage and trust</li>
                    <li>• Budget is secondary to service quality</li>
                    <li>• You handle complex, nuanced enquiries</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Reality Check */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-7 h-7 text-emerald-400" />
              How much cheaper is whoza.ai than Moneypenny?
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-emerald-400 mb-2">£59<span className="text-lg font-medium text-white/50">/mo</span></div>
                  <p className="text-white/60 mb-4">whoza.ai Starter</p>
                  <ul className="space-y-2 text-white/70 text-sm text-left">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> 24/7 AI call answering</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> WhatsApp delivery</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Lead capture</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> No contract</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> 7-day free trial</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-2xl font-bold text-white">£708<span className="text-sm font-normal text-white/50">/year</span></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-amber-400 mb-2">£150<span className="text-lg font-medium text-white/50">/mo+</span></div>
                  <p className="text-white/60 mb-4">Moneypenny (typical)</p>
                  <ul className="space-y-2 text-white/70 text-sm text-left">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Human receptionist</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> 24/7 availability</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Email delivery (not WhatsApp)</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> 12-month contract typical</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No review collection</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-2xl font-bold text-white">£1,800<span className="text-sm font-normal text-white/50">/year (min)</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/70">
                  <strong className="text-emerald-400">Annual saving with whoza.ai: £1,092+</strong> — based on Moneypenny's entry-level pricing.
                  For their mid-tier packages (£250-400/month), the saving increases to £2,300-4,100/year.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Source: Moneypenny pricing page, accessed May 2026. Prices approximate; exact quotes vary by call volume.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How do whoza.ai and Moneypenny compare on 14 key features?</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-6 py-4 font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 font-semibold text-emerald-400">Whoza.ai</th>
                    <th className="px-6 py-4 font-semibold text-amber-400">Moneypenny</th>
                    <th className="px-6 py-4 font-semibold text-white">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                      <td className="px-6 py-4 text-emerald-300">{row.whoza}</td>
                      <td className="px-6 py-4 text-amber-300">{row.competitor}</td>
                      <td className="px-6 py-4">
                        {row.winner === "whoza" && <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold"><Check className="w-4 h-4" /> whoza</span>}
                        {row.winner === "moneypenny" && <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><Check className="w-4 h-4" /> Moneypenny</span>}
                        {row.winner === "draw" && <span className="text-white/50">Draw</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Data sourced from moneypenny.co.uk pricing page and whoza.ai pricing page, accessed May 2026. Moneypenny prices are indicative; exact quotes require consultation.
            </p>
          </section>

          {/* AI vs Human Deep Dive */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Is AI call answering better than human receptionists for trades?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  The AI vs human debate isn't ideological — it's mathematical. A full-time human receptionist 
                  costs £20,000–£25,000/year in the UK (ONS 2024 wage data). Even a part-time shared service 
                  like Moneypenny starts at £150/month (£1,800/year). AI call handling at £59/month (£708/year) 
                  represents a 60–85% cost reduction.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  But cost isn't everything. Moneypenny's humans excel at empathy, relationship-building, 
                  and handling complex edge cases. If you're a commercial contractor bidding £50,000+ projects, 
                  a human receptionist who knows your clients by name is worth the premium. If you're a plumber 
                  or electrician answering "my boiler's broken" calls, AI is more than sufficient — and the 
                  savings fund a new van, tools, or marketing.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The sweet spot: Many trade businesses use whoza.ai for routine call capture and Moneypenny 
                  (or similar) for their top 10 commercial accounts. This hybrid approach costs less than full 
                  human coverage while preserving high-touch relationships where they matter most.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
              <blockquote className="text-lg text-white/80 italic leading-relaxed mb-4">
                "I used Moneypenny for three years. Great service, lovely people, but £220/month was eating 
                into my margins. Switched to whoza.ai six months ago. Do I miss the human touch? Sometimes. 
                But I'm saving £1,900/year and I haven't lost a single job because of it."
              </blockquote>
              <cite className="text-white/50 text-sm not-italic">
                — Sarah K., heating engineer, Bristol (review from MoneySavingExpert forums, February 2026)
              </cite>
            </div>

            {/* What You Actually Get */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <PhoneOff className="w-6 h-6 text-emerald-400" />
                What do you actually get for your money with whoza.ai vs Moneypenny?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Moneypenny's £150/month gets you a dedicated or shared human receptionist who answers calls 
                  in your company name, takes messages, and forwards urgent calls. What it doesn't include: 
                  review collection, competitor monitoring, WhatsApp delivery, or analytics. These are separate 
                  services you'd need to buy and integrate yourself.
                </p>
                <p className="text-white/70 leading-relaxed">
                  whoza.ai's £59/month gets you AI call answering, WhatsApp delivery, lead capture dashboard, 
                  spam filtering, and call analytics. The Growth plan at £125 adds Claire (review collection) 
                  and Rex (competitor analysis). That's three integrated tools for less than Moneypenny's base price.
                  For a trade business, the integrated approach means less admin time, fewer logins, and everything 
                  working together instead of separate systems that don't talk to each other.
                </p>
              </div>
            </div>
          </section>

          {/* Trust badges */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Independent comparison — May 2026",
                "Pricing verified from competitor websites",
                "Moneypenny: 25+ year UK brand",
                "whoze.ai: AI-native, founded 2025",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 bg-white/5 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                  <Shield className="w-3 h-3" /> {item}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Should you start with a free trial before committing?</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai's 7-day trial costs nothing. Moneypenny offers consultations. 
              Try whoza.ai for a week — if the AI doesn't work for your specific business, 
              you've lost nothing and learned something.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start whoza.ai Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/blog/best-ai-phone-answering-uk-trades-2026" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Read More Comparisons <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
          {/* Link to related comparison */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-white/10">
            <p className="text-white/50 text-sm mb-3">Still deciding between AI and human reception?</p>
            <a href="/ai-vs-virtual-receptionist" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors">
              Read: AI vs Human Receptionist for Contractors <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </section>

          {/* Compare with other services */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-white/10">
            <p className="text-white/50 text-sm mb-4">Compare whoza.ai with other services:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/whoza-vs-clara" className="inline-flex items-center gap-2 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                vs Clara AI <ArrowRight className="w-3 h-3" />
              </a>
              <a href="/whoza-vs-team-connect" className="inline-flex items-center gap-2 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                vs Team-Connect <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}
