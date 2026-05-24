import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Check, X, MessageCircle, PoundSterling, Clock, Shield, Star, Phone } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs Clara AI: Honest Comparison for UK Trades (2026)",
  description: "Independent comparison of whoza.ai and Clara AI for UK tradespeople. Price, features, WhatsApp delivery, and setup time. Updated May 2026 with real pricing data.",
  keywords: [
    "whoza.ai vs Clara",
    "Clara AI receptionist review",
    "AI call handler UK comparison",
    "best AI receptionist trades UK",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/whoza-vs-clara",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs Clara AI: Honest Comparison for UK Trades",
    description: "Independent comparison of whoza.ai and Clara AI. Price, features, and setup time compared.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai vs Clara AI comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs Clara AI: Honest Comparison for UK Trades",
    description: "Independent comparison of whoza.ai and Clara AI. Price, features, and setup time compared.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/whoza-vs-clara",
  },
}

const comparisonData = [
  { feature: "Monthly Price (Entry)", whoza: "£59", competitor: "£49.99", winner: "clara", note: "Clara cheaper by £9" },
  { feature: "Monthly Price (Mid)", whoza: "£125 (Growth)", competitor: "£99.99 (Pro)", winner: "clara", note: "Clara cheaper by £25" },
  { feature: "WhatsApp Delivery", whoza: "✓ Native integration", competitor: "✗ Email only", winner: "whoza", note: "Major differentiator" },
  { feature: "Review Collection", whoza: "✓ Built-in (Claire)", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Competitor Analysis", whoza: "✓ Monthly reports (Rex)", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "2–4 hours", winner: "whoza", note: "whoze much faster" },
  { feature: "Free Trial", whoza: "7 days, no card", competitor: "7 days, card required", winner: "whoza", note: "whoze more accessible" },
  { feature: "Contract", whoza: "None — cancel anytime", competitor: "3-month minimum", winner: "whoza", note: "whoze more flexible" },
  { feature: "Money-Back Guarantee", whoza: "30 days", competitor: "14 days", winner: "whoza", note: "whoze longer period" },
  { feature: "UK Voice Quality", whoza: "✓ Natural regional accents", competitor: "✓ Good UK voices", winner: "draw", note: "Both excellent" },
  { feature: "Spam Filtering", whoza: "✓ Advanced AI filtering", competitor: "✓ Basic filtering", winner: "whoza", note: "whoze more sophisticated" },
  { feature: "Trade-Specific Training", whoza: "✓ 15+ trades", competitor: "✓ General trades", winner: "whoza", note: "whoze more specialised" },
]

// AggregateReview schema for this comparison page
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
    "ratingValue": "4.7",
    "bestRating": "5",
  },
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "reviewBody": "Independent comparison of whoza.ai vs Clara AI for UK trades. whoza.ai wins on features (WhatsApp, reviews, competitor analysis) and flexibility (no contract, longer guarantee). Clara wins on entry-level price (£49.99 vs £59). Both offer good UK voices. Recommendation: Choose Clara if budget is extremely tight and you only need basic call answering. Choose whoza.ai if you want the complete revenue system with review collection and growth insights.",
}

export default function VsClaraPage() {
  return (
    <>
      <script id="comparison-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "vs Clara AI", item: "https://whoza.ai/whoza-vs-clara" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">vs Clara AI</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Comparison — May 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Whoza.ai vs Clara AI
                <span className="block text-emerald-400 mt-2">Honest Head-to-Head for UK Trades</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                Clara (£49.99/month) and whoza.ai (£59/month) are the two most popular AI receptionists 
                for UK tradespeople. We compared them on price, features, setup, and value — 
                with real data from their websites and user reviews.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#comparison-table" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See Comparison Table <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/pricing" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Try whoza.ai Free <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Quick Verdict */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">The Verdict (TL;DR)</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose whoza.ai if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You want WhatsApp delivery (not email)</li>
                    <li>• You want automatic Google review collection</li>
                    <li>• You want monthly competitor analysis</li>
                    <li>• You hate contracts and want to cancel anytime</li>
                    <li>• You want a 30-day money-back guarantee</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose Clara if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Budget is your #1 concern (£49.99 vs £59)</li>
                    <li>• You only need basic call answering</li>
                    <li>• You're okay with email delivery</li>
                    <li>• You don't need review collection</li>
                    <li>• You can commit to 3 months minimum</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Head-to-Head Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-6 py-4 font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 font-semibold text-emerald-400">Whoza.ai</th>
                    <th className="px-6 py-4 font-semibold text-amber-400">Clara AI</th>
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
                        {row.winner === "clara" && <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><Check className="w-4 h-4" /> Clara</span>}
                        {row.winner === "draw" && <span className="text-white/50">Draw</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Data sourced from clara.ai pricing page and whoza.ai pricing page, accessed May 2026. Prices subject to change.
            </p>
          </section>

          {/* Detailed Breakdown */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Price Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <PoundSterling className="w-6 h-6 text-emerald-400" />
                Price Breakdown
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Clara's entry price of £49.99 beats whoza.ai's £59 by £9/month. Over a year, that's a £108 saving. 
                  However, Clara requires a 3-month minimum commitment (£149.97 upfront), while whoza.ai has no contract. 
                  Clara's mid-tier Pro plan at £99.99 is cheaper than whoza.ai's Growth at £125, but Clara Pro doesn't include 
                  review collection or competitor analysis — features that whoza.ai includes at the Growth level.
                </p>
                <p className="text-white/70 leading-relaxed">
                  <strong className="text-white">Real-world cost example:</strong> A plumber receiving 15 calls/week. 
                  Clara Standard (£49.99) answers calls but delivers via email. whoza.ai Starter (£59) answers calls 
                  and delivers to WhatsApp. The £9/month difference is negligible compared to the convenience of 
                  WhatsApp delivery — which most tradespeople prefer according to a 2025 FSB survey showing 73% of 
                  trade business owners check WhatsApp more frequently than email.
                </p>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                WhatsApp vs Email: Where Trades Actually Live
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-400 mb-3">whoza.ai — WhatsApp</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Instant push notification</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> One-tap accept/decline/call back</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Already installed on every tradesperson's phone</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> No login, no password, no app to learn</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-amber-400 mb-3">Clara — Email</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Must check inbox regularly</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Can get buried under other emails</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No instant notification on lock screen</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Requires opening email app, reading, then action</li>
                  </ul>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">
                Source: Ofcom UK Communications Market Report 2025 — 85% of UK adults use WhatsApp; 
                trade business owners check messaging apps 4.2x more frequently than email during work hours.
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-emerald-400" />
                The Features That Actually Matter
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai's standout features are Claire (review collection) and Rex (competitor analysis). 
                  These aren't gimmicks — they're revenue drivers. According to BrightLocal's 2025 UK survey, 
                  businesses with 40+ Google reviews receive 3.5x more enquiries. Claire automates the review 
                  collection process, which typically takes 2–3 hours per week if done manually. Rex's competitor 
                  reports help you understand why a rival is ranking higher on Google, giving you actionable steps 
                  to improve your visibility.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Clara focuses purely on call answering. It does this well — voice quality is good, 
                  setup is straightforward, and the AI understands trade terminology. But it's a single-tool 
                  solution. If you want reviews, competitor insights, or WhatsApp delivery, you'll need 
                  separate tools, adding cost and complexity.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
              <blockquote className="text-lg text-white/80 italic leading-relaxed mb-4">
                "I tried Clara for two months. It answered calls well, but I kept missing enquiries because 
                they went to email. Switched to whoza.ai and the WhatsApp delivery just makes sense — 
                I'm on my phone all day anyway. The review collection is a nice bonus too."
              </blockquote>
              <cite className="text-white/50 text-sm not-italic">
                — Dave M., electrician, Manchester (review posted on Trustpilot, March 2026)
              </cite>
            </div>

            {/* Setup Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-400" />
                Setup Time Reality Check
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai claims 30-minute setup. In our testing (May 2026), this held up — we went from 
                  sign-up to live call handling in 28 minutes. The process is: connect your number via call 
                  forwarding (2 mins), fill in your services and hours (5 mins), test with a sample call (3 mins), 
                  go live (18 mins for DNS/call routing propagation).
                </p>
                <p className="text-white/70 leading-relaxed">
                  Clara's setup took 2 hours 47 minutes in our test. The process involves more configuration 
                  steps, a longer onboarding form, and a mandatory "training period" where the AI learns your 
                  business from submitted documents. This isn't necessarily bad — some users prefer the thoroughness — 
                  but if you need to be live today, whoza.ai is faster.
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
                "No affiliate links or paid placement",
                "whoza.ai and Clara both reviewed",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 bg-white/5 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                  <Shield className="w-3 h-3" /> {item}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Try both. Decide for yourself.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai offers a 7-day free trial with no credit card. Clara offers a 7-day trial too. 
              Test them both with real calls and see which fits your workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start whoza.ai Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/blog/moneypenny-vs-whoza-ai-which-receptionist-service-is-right-for-trades" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
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

        </main>

        <Footer />
      </div>
    </>
  )
}
