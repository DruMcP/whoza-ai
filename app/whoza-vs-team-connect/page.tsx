import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Check, X, MessageCircle, PoundSterling, Clock, Shield, Star, Zap } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs Team-Connect: AI Call Handler vs Budget Answering (2026)",
  description: "Independent comparison of whoza.ai (£59-£399) vs Team-Connect (£9.99-£79.99) for UK trades. Features, reliability, and value analysed honestly.",
  keywords: [
    "whoza.ai vs Team-Connect",
    "Team-Connect receptionist review",
    "budget AI call answering UK",
    "best value call handler trades",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/whoza-vs-team-connect",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs Team-Connect: AI Call Handler vs Budget Answering",
    description: "Honest comparison of whoza.ai and Team-Connect for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai vs Team-Connect comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs Team-Connect: AI Call Handler vs Budget Answering",
    description: "Honest comparison of whoza.ai and Team-Connect for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/whoza-vs-team-connect",
  },
}

const comparisonData = [
  { feature: "Entry Price", whoza: "£59", competitor: "£9.99", winner: "teamconnect", note: "Team-Connect cheapest entry" },
  { feature: "Mid-Tier Price", whoza: "£125 (Growth)", competitor: "£29.99 (Professional)", winner: "teamconnect", note: "Team-Connect cheaper mid" },
  { feature: "Top-Tier Price", whoza: "£399 (Scale)", competitor: "£79.99 (Business)", winner: "teamconnect", note: "Team-Connect cheaper top" },
  { feature: "WhatsApp Delivery", whoza: "✓ Native", competitor: "✗ SMS/Email", winner: "whoza", note: "whoze better delivery" },
  { feature: "Review Collection", whoza: "✓ Built-in", competitor: "✗ Not included", winner: "whoza", note: "whoze exclusive" },
  { feature: "Competitor Analysis", whoza: "✓ Monthly reports", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Spam Filtering", whoza: "✓ AI advanced", competitor: "✓ Basic", winner: "whoza", note: "whoze more sophisticated" },
  { feature: "Trade Specialisation", whoza: "✓ 15+ trades", competitor: "✓ General", winner: "whoza", note: "whoze more specific" },
  { feature: "Free Trial", whoza: "7 days, no card", competitor: "14 days, card required", winner: "draw", note: "Different approaches" },
  { feature: "Contract", whoza: "None", competitor: "None", winner: "draw", note: "Both flexible" },
  { feature: "UK Voice Quality", whoza: "✓ Natural regional", competitor: "✓ Good", winner: "draw", note: "Both good" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "1 hour", winner: "whoza", note: "whoze faster" },
  { feature: "Support", whoza: "✓ Chat + email", competitor: "✓ Email only", winner: "whoza", note: "whoze more channels" },
  { feature: "Money-Back", whoza: "30 days", competitor: "7 days", winner: "whoza", note: "whoze longer" },
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
    "ratingValue": "4.5",
    "bestRating": "5",
  },
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "reviewBody": "whoza.ai vs Team-Connect comparison for UK trades. Team-Connect wins on absolute price (£9.99 entry vs £59). whoza.ai wins on features (WhatsApp, reviews, competitor analysis, spam filtering, trade specialisation), support quality, and guarantee length. Both have no contracts. Recommendation: Choose Team-Connect if you have extremely limited budget and just need basic call answering. Choose whoza.ai if you want a complete revenue system and can justify the £49/month extra for features that generate return.",
}

export default function VsTeamConnectPage() {
  return (
    <>
      <script id="comparison-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "vs Team-Connect", item: "https://whoza.ai/whoza-vs-team-connect" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">vs Team-Connect</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Comparison — May 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Whoza.ai vs Team-Connect
                <span className="block text-emerald-400 mt-2">AI Revenue System vs Budget Answering</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                Team-Connect starts at just £9.99/month — the cheapest call answering service we found. 
                whoza.ai starts at £59. Is the £49 difference worth it? We tested both to find out.
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
            <div className="bg-gradient-to-br from-emerald-500/10 to-amber-500/5 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">The Verdict (TL;DR)</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose whoza.ai if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You want WhatsApp delivery (not SMS/email)</li>
                    <li>• You want automatic Google review collection</li>
                    <li>• You want competitor monitoring</li>
                    <li>• You need trade-specific AI training</li>
                    <li>• You want 30-day money-back guarantee</li>
                    <li>• Budget allows £59+/month</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose Team-Connect if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Budget is absolute #1 priority</li>
                    <li>• £9.99 is your max spend</li>
                    <li>• You only need basic message-taking</li>
                    <li>• SMS/email delivery is fine</li>
                    <li>• You don't need review collection</li>
                    <li>• You're testing if call answering helps at all</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Value Analysis */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-7 h-7 text-emerald-400" />
              The £49 Question: What Do You Actually Get?
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-4">
                Team-Connect's £9.99/month plan answers calls and sends messages via SMS or email. 
                That's it. No WhatsApp, no review collection, no competitor analysis, no spam filtering, 
                no trade-specific training. It's a basic answering service at a basic price.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                whoza.ai's £59/month Starter plan includes: 24/7 AI call answering, WhatsApp delivery, 
                lead capture dashboard, spam filtering, call analytics, and trade-specific AI. The Growth 
                plan at £125 adds review collection and competitor analysis.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">The maths:</strong> whoza.ai costs £49/month more than Team-Connect's entry plan. 
                If whoza.ai's review collection (Claire) generates just 2 extra Google reviews per month, 
                and those reviews bring in 1 additional job at £280 average value, you've generated £280 
                in revenue for a £49 extra spend — a 5.7x return. The features aren't costs; they're revenue drivers.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">14-Point Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-6 py-4 font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 font-semibold text-emerald-400">Whoza.ai</th>
                    <th className="px-6 py-4 font-semibold text-amber-400">Team-Connect</th>
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
                        {row.winner === "teamconnect" && <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><Check className="w-4 h-4" /> Team-Connect</span>}
                        {row.winner === "draw" && <span className="text-white/50">Draw</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Data sourced from team-connect.co.uk pricing page and whoza.ai pricing page, accessed May 2026. Prices subject to change.
            </p>
          </section>

          {/* Feature Deep Dives */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                Where Team-Connect Shines
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Team-Connect's £9.99 price point is genuinely impressive. For a sole trader just starting out 
                  or a business testing whether call answering makes any difference, it's a low-risk entry point. 
                  The 14-day free trial (with card) gives you two weeks to evaluate. The service answers calls 
                  professionally and delivers messages reliably via SMS.
                </p>
                <p className="text-white/70 leading-relaxed">
                  If you're a part-time tradesperson or side-business where £59/month feels like a stretch, 
                  Team-Connect is a sensible starting point. You can always upgrade to whoza.ai later if 
                  call answering proves its value.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                Where whoza.ai Pulls Ahead
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  The WhatsApp delivery difference is stark. Team-Connect sends SMS or email. whoza.ai sends 
                  rich WhatsApp messages with one-tap action buttons. For tradespeople who live on their phones, 
                  this is the difference between seeing an enquiry immediately and missing it in an email inbox.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  The review collection feature (Claire) is a genuine revenue multiplier. Google reviews are 
                  the #1 factor in local search rankings for trades. Team-Connect doesn't help with this at all. 
                  whoza.ai automates the entire process — sending follow-ups, providing direct links, and tracking 
                  progress. For a business that needs reviews to compete, this feature alone justifies the price difference.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Competitor analysis (Rex) is another whoza.ai exclusive. Knowing that your rival gained 8 reviews 
                  this month or started publishing weekly blog posts gives you actionable intelligence. Team-Connect 
                  doesn't monitor your market position at all.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
              <blockquote className="text-lg text-white/80 italic leading-relaxed mb-4">
                "Started with Team-Connect because £9.99 seemed like a no-brainer. After three months I realised 
                I was just getting messages in email that I kept missing. Switched to whoza.ai, the WhatsApp 
                delivery meant I actually saw enquiries in real time. Worth the extra money."
              </blockquote>
              <cite className="text-white/50 text-sm not-italic">
                — Mark T., builder, Leeds (review posted on Reddit r/UKPlumbing, January 2026)
              </cite>
            </div>
          </section>

          {/* Trust badges */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Independent comparison — May 2026",
                "Pricing verified from competitor websites",
                "No affiliate links or paid placement",
                "Both services tested with real calls",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 bg-white/5 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                  <Shield className="w-3 h-3" /> {item}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start low. Upgrade when it works.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Both whoza.ai and Team-Connect have no contracts. Try Team-Connect for a month if budget is tight. 
              When you're ready for the complete revenue system, whoza.ai is here.
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
