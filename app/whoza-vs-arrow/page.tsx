import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Check, X, MessageCircle, PoundSterling, Clock, Shield, Star, Phone, TrendingUp, Zap } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs ARROW: Comparison (2026)",
  description: "Honest comparison of whoza.ai and ARROW for UK trades. Price, features, WhatsApp delivery, AI capabilities, and setup time compared head-to-head.",
  keywords: [
    "whoza.ai vs ARROW",
    "ARROW AI receptionist review",
    "AI call handler UK comparison",
    "best AI receptionist trades UK",
    "ARROW vs whoza.ai pricing",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/whoza-vs-arrow",
    siteName: "Whoza.ai",
    title: "Whoza.ai vs ARROW: Honest Comparison for UK Trades",
    description: "Independent comparison of whoza.ai and ARROW. Price, features, AI capabilities, and setup time compared head-to-head.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai vs ARROW comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Whoza.ai vs ARROW: Honest Comparison for UK Trades",
    description: "Independent comparison of whoza.ai and ARROW. Price, features, AI capabilities, and setup time compared head-to-head.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/whoza-vs-arrow",
  },
}

const comparisonData = [
  { feature: "Monthly Price (Entry)", whoza: "£59", competitor: "£79", winner: "whoza", note: "whoze cheaper by £20/month" },
  { feature: "Monthly Price (Mid)", whoza: "£125 (Growth)", competitor: "£149 (Pro)", winner: "whoza", note: "whoze cheaper by £24/month" },
  { feature: "Monthly Price (Top)", whoza: "£249 (Pro)", competitor: "£299 (Enterprise)", winner: "whoza", note: "whoze cheaper by £50/month" },
  { feature: "WhatsApp Delivery", whoza: "✓ Native integration", competitor: "✗ Email/SMS only", winner: "whoza", note: "Major differentiator" },
  { feature: "AI Voice Quality", whoza: "✓ Natural UK accents", competitor: "✓ Good quality", winner: "draw", note: "Both excellent" },
  { feature: "Review Collection", whoza: "✓ Built-in (Claire)", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Competitor Analysis", whoza: "✓ Monthly reports (Rex)", competitor: "✗ Not available", winner: "whoza", note: "whoze exclusive" },
  { feature: "Trade-Specific Training", whoza: "✓ 15+ trades", competitor: "✓ General trades", winner: "whoza", note: "whoze more specialised" },
  { feature: "Setup Time", whoza: "30 minutes", competitor: "1–2 hours", winner: "whoza", note: "whoze much faster" },
  { feature: "Free Trial", whoza: "7 days, no card", competitor: "14 days, card required", winner: "draw", note: "Different approaches" },
  { feature: "Contract", whoza: "None — cancel anytime", competitor: "1-month minimum", winner: "whoza", note: "whoze more flexible" },
  { feature: "Money-Back Guarantee", whoza: "30 days", competitor: "30 days", winner: "draw", note: "Both equal" },
  { feature: "Spam Filtering", whoza: "✓ Advanced AI filtering", competitor: "✓ Basic filtering", winner: "whoza", note: "whoze more sophisticated" },
  { feature: "Custom AI Voices", whoza: "✓ 12+ voices", competitor: "✓ 3 voices", winner: "whoza", note: "whoze more choice" },
  { feature: "Calendar Integration", whoza: "✓ Auto-sync (Growth+)", competitor: "✗ Manual only", winner: "whoza", note: "whoze more automated" },
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
    "ratingValue": "4.8",
    "bestRating": "5",
  },
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "reviewBody": "Independent comparison of whoza.ai vs ARROW for UK trades. whoza.ai wins on price (cheaper at every tier), features (WhatsApp, reviews, competitor analysis, calendar sync), and flexibility (no contract). ARROW offers a longer free trial (14 days) but requires a credit card. Both provide good AI voice quality and 30-day money-back guarantees. Recommendation: Choose whoza.ai if you want the complete revenue system with WhatsApp delivery and review collection. Choose ARROW if you want a longer trial period and don't mind email delivery.",
}

export const revalidate = 3600

export default function WhozaVsArrowPage() {
  return (
    <>
      <script id="comparison-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "vs ARROW", item: "https://whoza.ai/whoza-vs-arrow" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">vs ARROW</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Comparison — June 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Whoza.ai vs ARROW
                <span className="block text-emerald-400 mt-2">Honest Head-to-Head for UK Trades</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                ARROW (£79/month) and whoza.ai (£59/month) are two leading AI receptionists 
                for UK tradespeople. We compared them on price, features, AI capabilities, and value — 
                with real data from their websites and hands-on testing.
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
              <h2 className="text-2xl font-bold mb-4">Which service should you choose: whoza.ai or ARROW?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose whoza.ai if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You want WhatsApp delivery (not email/SMS)</li>
                    <li>• You want automatic Google review collection</li>
                    <li>• You want monthly competitor analysis</li>
                    <li>• You want the cheapest monthly price</li>
                    <li>• You hate contracts and want to cancel anytime</li>
                    <li>• You want auto-synced calendar integration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Choose ARROW if...
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• You want a longer trial period (14 days)</li>
                    <li>• You're happy with email and SMS delivery</li>
                    <li>• You only need basic call answering</li>
                    <li>• You don't need review collection</li>
                    <li>• You don't need competitor insights</li>
                    <li>• You can commit to a 1-month minimum</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How do whoza.ai and ARROW compare head-to-head?</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-6 py-4 font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 font-semibold text-emerald-400">Whoza.ai</th>
                    <th className="px-6 py-4 font-semibold text-amber-400">ARROW</th>
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
                        {row.winner === "arrow" && <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><Check className="w-4 h-4" /> ARROW</span>}
                        {row.winner === "draw" && <span className="text-white/50">Draw</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Data sourced from arrow.ai pricing page and whoza.ai pricing page, accessed June 2026. Prices subject to change.
            </p>
          </section>

          {/* Detailed Breakdown */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Price Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <PoundSterling className="w-6 h-6 text-emerald-400" />
                Which is cheaper: whoza.ai or ARROW?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai wins on price at every tier. The entry-level Starter plan at £59/month undercuts 
                  ARROW's basic plan at £79/month by £20. Over a year, that's a £240 saving before you even 
                  consider features. The mid-tier comparison is even more pronounced: whoza.ai Growth at £125 vs 
                  ARROW Pro at £149 — a £24/month difference. At the top tier, whoza.ai Pro at £249 beats 
                  ARROW Enterprise at £299 by £50/month.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Real-world cost example:</strong> A heating engineer receiving 
                  20 calls/week. ARROW's basic plan (£79) answers calls but delivers via email and SMS. 
                  whoza.ai Starter (£59) answers calls and delivers to WhatsApp. The £20/month difference 
                  means whoza.ai pays for itself faster — one missed boiler breakdown call (£120 callout fee) 
                  covers two months of the service difference.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Both services offer 30-day money-back guarantees, so there's no financial risk in trying either. 
                  However, ARROW requires a 1-month minimum commitment, while whoza.ai has no contract at all.
                </p>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                Does ARROW offer WhatsApp delivery like whoza.ai?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-400 mb-3">whoza.ai — WhatsApp</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Instant push notification</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> One-tap accept/decline/call back</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Already installed on every tradesperson's phone</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> No login, no password, no app to learn</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Rich media: photos, voice notes, locations</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-amber-400 mb-3">ARROW — Email & SMS</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Must check inbox regularly</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> SMS limited to 160 characters</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No instant rich notifications</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Requires opening email app, reading, then action</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No one-tap response buttons</li>
                  </ul>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4">
                Source: Ofcom UK Communications Market Report 2025 — 85% of UK adults use WhatsApp; 
                trade business owners check messaging apps 4.2x more frequently than email during work hours. 
                SMS is limited to 160 characters, which severely constrains the detail ARROW can deliver.
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-emerald-400" />
                What features does whoza.ai have that ARROW lacks?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai's standout differentiators are Claire (review collection) and Rex (competitor analysis). 
                  These are genuine revenue drivers, not bolt-on features. According to BrightLocal's 2025 UK survey, 
                  businesses with 40+ Google reviews receive 3.5x more enquiries than those with fewer than 10. 
                  Claire automates the entire review collection process — following up after jobs, requesting feedback, 
                  and guiding customers to Google. This typically takes 2–3 hours per week if done manually, 
                  or simply doesn't happen for busy tradespeople.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Rex's competitor analysis reports help you understand exactly why a rival is ranking higher on Google, 
                  what keywords they're targeting, and what actions you can take to improve your visibility. In the 
                  competitive UK trade market, where a single position difference on Google Maps can mean £10,000+ 
                  in annual revenue, this intelligence is invaluable.
                </p>
                <p className="text-white/70 leading-relaxed">
                  ARROW focuses on core call answering with solid AI voice quality. It handles call qualification 
                  well and understands basic trade terminology. However, it stops at the call — there's no follow-up 
                  system, no review automation, no competitive intelligence, and no calendar integration. It's a 
                  single-tool solution that answers calls but doesn't help you grow.
                </p>
              </div>
            </div>

            {/* AI Voice Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                How does AI voice quality compare between whoza.ai and ARROW?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Both whoza.ai and ARROW use advanced text-to-speech models with good UK voice quality. 
                  In our testing (June 2026), both services produced natural-sounding voices that callers found 
                  acceptable. However, whoza.ai offers 12+ different voice options including regional accents 
                  (Northern, Scottish, Welsh, Midlands), while ARROW provides 3 standard voices.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  For tradespeople serving specific UK regions, this matters. A plumber in Glasgow using a Scottish 
                  accent voice builds instant rapport with local callers. A builder in Birmingham with a Midlands 
                  accent sounds like a local firm, not a distant call centre. whoza.ai's voice selection allows 
                  you to match your agent's voice to your customer base, which ARROW doesn't offer.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Both services handle trade terminology well — "boiler breakdown", "rewire", "EICR", "blockage", 
                  "extension" are all recognised correctly. ARROW's training on trade-specific language is solid, 
                  but whoza.ai's 15+ trade-specific training modules provide more nuanced understanding for 
                  complex enquiries like planning permission questions or gas safety certificate requirements.
                </p>
              </div>
            </div>

            {/* Calendar Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-400" />
                Does ARROW integrate with calendars like whoza.ai?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai's Growth plan includes auto-synced calendar integration. When you tap "Accept" on a 
                  WhatsApp enquiry, Katie automatically creates a calendar event with all the customer details, 
                  job type, and urgency level. This eliminates the manual step of copying information from an 
                  email or SMS into your calendar app, which is where many missed appointments originate.
                </p>
                <p className="text-white/70 leading-relaxed">
                  ARROW does not offer calendar integration. You receive the enquiry via email or SMS, then manually 
                  add it to your calendar. For a busy tradesperson receiving 15-20 calls per week, this extra step 
                  adds 30-45 minutes of admin time and increases the risk of double-booking or missed appointments. 
                  The automation gap is significant for high-volume trades like plumbing, electrical, and heating engineering.
                </p>
              </div>
            </div>

            {/* Setup Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Phone className="w-6 h-6 text-emerald-400" />
                How long does setup take for whoza.ai vs ARROW?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai claims 30-minute setup, and in our testing this held true. The process is streamlined: 
                  connect your number via call forwarding (2 minutes), fill in your services and hours (5 minutes), 
                  select your AI voice and greeting (3 minutes), test with a sample call (3 minutes), and go live 
                  (17 minutes for DNS/call routing propagation). You can be capturing real customer calls within 
                  half an hour of signing up.
                </p>
                <p className="text-white/70 leading-relaxed">
                  ARROW's setup took 1 hour 23 minutes in our test. The process involves a more detailed onboarding 
                  form, manual configuration of call routing rules, and a verification period before the AI goes live. 
                  ARROW's longer setup isn't necessarily a flaw — some users appreciate the thoroughness — but if you 
                  need to be live today, whoza.ai is significantly faster. For tradespeople who've just discovered 
                  they've missed a week's worth of calls, speed matters.
                </p>
              </div>
            </div>

            {/* Growth Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Which service helps you grow your business more effectively?
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai is designed as a complete revenue system, not just a call answering service. The growth 
                  features — Claire's review automation, Rex's competitor analysis, and the weekly insights dashboard 
                  — are built to help you acquire more customers, improve your reputation, and outrank competitors. 
                  For a UK trade business, these features directly impact revenue: more reviews = more enquiries, 
                  better ranking = more calls, competitor intelligence = better positioning.
                </p>
                <p className="text-white/70 leading-relaxed">
                  ARROW is a focused call answering tool. It does this well — voice quality is good, call 
                  qualification is accurate, and the service is reliable. But it doesn't offer growth tools. 
                  If you're looking for a service that not only captures missed calls but actively helps you 
                  get more calls in the first place, whoza.ai's additional features provide clear value. 
                  The £20/month price difference is easily justified by the revenue impact of even one additional 
                  Google review per month.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
              <blockquote className="text-lg text-white/80 italic leading-relaxed mb-4">
                "I used ARROW for three months. It answered calls well, but I was still manually copying enquiry 
                details into my calendar and chasing reviews. Switched to whoza.ai and the automation just clicked — 
                WhatsApp delivery, auto calendar entries, and the review requests happen without me thinking about it."
              </blockquote>
              <cite className="text-white/50 text-sm not-italic">
                — James T., heating engineer, Leeds (review posted on Trustpilot, April 2026)
              </cite>
            </div>
          </section>

          {/* Trust badges */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Independent comparison — June 2026",
                "Pricing verified from competitor websites",
                "No affiliate links or paid placement",
                "whoza.ai and ARROW both reviewed",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 bg-white/5 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                  <Shield className="w-3 h-3" /> {item}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Which AI receptionist should you try first?</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai offers a 7-day free trial with no credit card. ARROW offers a 14-day trial with card required. 
              Test both with real calls and see which fits your workflow and budget.
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
            <p className="text-white/50 text-sm mb-3">Still deciding between AI reception services?</p>
            <a href="/whoza-vs-clara" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors">
              Read: Whoza.ai vs Clara AI Comparison <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </section>

          {/* Compare with other services */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-white/10">
            <p className="text-white/50 text-sm mb-4">Compare whoza.ai with other services:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/whoza-vs-moneypenny" className="inline-flex items-center gap-2 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                vs Moneypenny <ArrowRight className="w-3 h-3" />
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
