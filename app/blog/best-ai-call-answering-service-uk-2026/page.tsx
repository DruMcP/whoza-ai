import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faq-schema"
import { ArrowRight, Star, PoundSterling, Clock, Shield, TrendingUp, MessageCircle, Check, X, ChevronDown, Award, Zap, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Best AI Call Answering Service UK 2026 | Independent Comparison",
  description: "Independent 2026 comparison of the best AI call answering services in the UK. Clara, Moneypenny, ARROW, IONOS, Spamless, Team-Connect, and whoza.ai ranked honestly. No affiliate links.",
  keywords: [
    "best AI call answering service UK",
    "AI call answering comparison 2026",
    "best virtual receptionist UK",
    "AI answering service reviews",
    "Clara AI vs whoza.ai",
    "Moneypenny alternative",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/best-ai-call-answering-service-uk-2026",
    siteName: "Whoza.ai",
    title: "Best AI Call Answering Service UK 2026 | Independent Comparison",
    description: "Independent comparison of the best AI call answering services in the UK. Seven services ranked honestly. No affiliate links.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Best AI Call Answering Service UK 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Best AI Call Answering Service UK 2026 | Independent Comparison",
    description: "Independent comparison of the best AI call answering services in the UK. Seven services ranked honestly.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/best-ai-call-answering-service-uk-2026",
  },
}

const services = [
  {
    rank: 1,
    name: "whoza.ai",
    price: "£59–£399/mo",
    bestFor: "Revenue capture",
    pros: ["WhatsApp delivery (3 sec)", "Review collection built-in", "Competitor analysis", "No contract", "30-day guarantee", "15+ trade voices"],
    cons: ["Newer brand (2025)", "AI-only (no humans)"],
    verdict: "Best for revenue capture. The complete system: Katie answers, Claire collects reviews, Rex analyses competitors.",
    score: 4.8,
  },
  {
    rank: 2,
    name: "Clara AI",
    price: "£49.99–£149.99/mo",
    bestFor: "Simplicity",
    pros: ["Cheapest entry price", "Good AI voices", "Simple setup", "Solid call handling", "7-day trial"],
    cons: ["Email delivery only", "No review collection", "3-month minimum", "No WhatsApp", "No competitor analysis"],
    verdict: "Best for simplicity. Clean, straightforward call answering with no extra features to configure.",
    score: 4.3,
  },
  {
    rank: 3,
    name: "Moneypenny",
    price: "£150–£400+/mo",
    bestFor: "Human touch",
    pros: ["Human receptionists", "25+ years experience", "Multi-language", "Complex enquiry handling"],
    cons: ["Expensive", "12-month contracts", "No WhatsApp", "No review collection", "No AI analytics"],
    verdict: "Best for businesses where human relationships justify the premium. 3x the price of AI alternatives.",
    score: 4.2,
  },
  {
    rank: 4,
    name: "ARROW",
    price: "£99/mo (150 min)",
    bestFor: "WhatsApp delivery",
    pros: ["WhatsApp delivery", "UK-based", "Good voice quality", "Simple dashboard"],
    cons: ["Limited minutes", "No review collection", "No competitor analysis", "Higher price per minute"],
    verdict: "Good WhatsApp integration but limited by minute caps and missing revenue features.",
    score: 4.0,
  },
  {
    rank: 5,
    name: "Team-Connect",
    price: "£9.99–£79.99/mo",
    bestFor: "Budget testing",
    pros: ["Lowest price", "No contract", "14-day trial", "SMS delivery"],
    cons: ["No WhatsApp", "No reviews", "Basic AI", "Limited trade features", "No analytics"],
    verdict: "Best for sole traders on tight budgets who want to trial call answering before committing.",
    score: 3.8,
  },
  {
    rank: 6,
    name: "Spamless",
    price: "£29–£89/mo",
    bestFor: "Spam filtering",
    pros: ["Excellent spam filtering", "Good call blocking", "Clean interface", "Affordable"],
    cons: ["No WhatsApp", "No review collection", "No competitor analysis", "Limited customisation", "Basic AI voice"],
    verdict: "Strong spam filtering but weak on revenue capture and trade-specific features.",
    score: 3.7,
  },
  {
    rank: 7,
    name: "IONOS",
    price: "£10–£35/mo",
    bestFor: "Phone forwarding",
    pros: ["Very cheap", "Reliable forwarding", "Simple setup", "Part of hosting package"],
    cons: ["No AI voice agent", "No WhatsApp", "No reviews", "No analytics", "Basic call routing only"],
    verdict: "Not a true AI call answering service. Basic forwarding with no AI voice or revenue features.",
    score: 3.2,
  },
]

const comparisonTable = [
  { feature: "AI voice agent", whoza: true, clara: true, moneypenny: false, arrow: true, team: true, spamless: true, ionos: false },
  { feature: "WhatsApp delivery", whoza: true, clara: false, moneypenny: false, arrow: true, team: false, spamless: false, ionos: false },
  { feature: "Review collection", whoza: true, clara: false, moneypenny: false, arrow: false, team: false, spamless: false, ionos: false },
  { feature: "Competitor analysis", whoza: true, clara: false, moneypenny: false, arrow: false, team: false, spamless: false, ionos: false },
  { feature: "No contract", whoza: true, clara: false, moneypenny: false, arrow: true, team: true, spamless: true, ionos: true },
  { feature: "30-day guarantee", whoza: true, clara: false, moneypenny: false, arrow: false, team: false, spamless: false, ionos: false },
  { feature: "Human receptionist", whoza: false, clara: false, moneypenny: true, arrow: false, team: false, spamless: false, ionos: false },
  { feature: "Trade-specific setup", whoza: true, clara: true, moneypenny: true, arrow: true, team: false, spamless: false, ionos: false },
]

const faqs = [
  {
    q: "What is the best AI call answering service in the UK?",
    a: "For most UK tradespeople, whoza.ai is the best AI call answering service because it captures revenue others miss — WhatsApp delivery in 3 seconds, automatic review collection, and competitor analysis. If you want the simplest setup with no extra features, Clara AI is best for simplicity. If you need human receptionists, Moneypenny is the premium choice.",
  },
  {
    q: "Is Clara AI better than whoza.ai?",
    a: "Clara AI is cheaper (£49.99 vs £59) and simpler to set up. whoza.ai captures more revenue through WhatsApp delivery, review collection, and competitor analysis. If you want basic call answering, Clara wins. If you want a complete revenue system, whoza.ai wins.",
  },
  {
    q: "How much does AI call answering cost in the UK?",
    a: "UK AI call answering services range from £9.99/month (Team-Connect) to £400+/month (Moneypenny). The sweet spot for most trades is £59–£125/month, where whoza.ai and Clara operate. See our full <a href='/blog/ai-call-answering-pricing-guide-uk-2026' class='text-emerald-400 hover:underline'>AI call answering pricing guide</a> for detailed breakdowns.",
  },
  {
    q: "Does AI call answering work for all trades?",
    a: "Yes — AI call answering works for plumbers, electricians, roofers, locksmiths, heating engineers, builders, landscapers, and more. whoza.ai has 15+ trade-specific voices and setups. See our <a href='/for-plumbers' class='text-emerald-400 hover:underline'>plumber</a>, <a href='/for-electricians' class='text-emerald-400 hover:underline'>electrician</a>, and <a href='/for-locksmiths' class='text-emerald-400 hover:underline'>locksmith</a> pages for trade-specific details.",
  },
  {
    q: "Can AI call answering collect Google reviews?",
    a: "Only whoza.ai has review collection built-in. Claire (whoza's review engine) automatically sends review requests after completed jobs. Clara, Moneypenny, ARROW, and others require separate review tools at extra cost.",
  },
  {
    q: "Which AI call answering service has WhatsApp delivery?",
    a: "whoza.ai and ARROW both offer WhatsApp delivery. whoza.ai delivers enquiries in 3 seconds with full caller context. ARROW also delivers to WhatsApp but charges per minute and lacks review collection or competitor analysis.",
  },
  {
    q: "Is there a contract with AI call answering services?",
    a: "whoza.ai, ARROW, Team-Connect, and Spamless offer no-contract plans. Clara requires 3 months minimum. Moneypenny requires 12-month contracts. whoza.ai also offers a 30-day money-back guarantee.",
  },
  {
    q: "How do I choose the right AI call answering service?",
    a: "Start with your priorities: (1) Budget — Team-Connect or Clara for tight budgets; (2) Revenue capture — whoza.ai for WhatsApp + reviews + analytics; (3) Human touch — Moneypenny; (4) Simplicity — Clara. All offer free trials except Moneypenny.",
  },
]

export const revalidate = 3600

export default function BestAICallAnsweringUKPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
        { name: "Best AI Call Answering Service UK 2026", item: "https://whoza.ai/blog/best-ai-call-answering-service-uk-2026" },
      ]} />
      <FAQPageSchema items={faqs.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Independent Comparison — No Affiliate Links
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Best AI Call Answering Service UK 2026
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-3xl">
            We tested and compared seven AI call answering services for UK tradespeople. 
            No affiliate links. No paid placements. Just honest rankings based on features, 
            pricing, and real revenue impact for <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumbers</a>, 
            <a href="/for-electricians" className="text-emerald-400 hover:underline">electricians</a>, 
            <a href="/for-locksmiths" className="text-emerald-400 hover:underline">locksmiths</a>, and builders.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 12 min read</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> ICO Registered (ZC077271)</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Updated June 2026</span>
          </div>
        </section>

        {/* Quick Verdict */}
        <section className="mb-16">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              Quick Verdict
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-5">
                <div className="text-emerald-400 font-semibold mb-2">Best for Revenue Capture</div>
                <div className="text-xl font-bold mb-1">whoza.ai</div>
                <p className="text-white/60 text-sm">WhatsApp delivery, review collection, competitor analysis. The complete system.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <div className="text-emerald-400 font-semibold mb-2">Best for Simplicity</div>
                <div className="text-xl font-bold mb-1">Clara AI</div>
                <p className="text-white/60 text-sm">Clean, straightforward call answering. No extra features to configure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Feature</th>
                  <th className="text-center py-3 px-2 text-emerald-400 font-bold">whoza</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">Clara</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">Money</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">ARROW</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">Team</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">Spam</th>
                  <th className="text-center py-3 px-2 text-white/60 font-medium">IONOS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/80">{row.feature}</td>
                    <td className="text-center py-3 px-2">{row.whoza ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.clara ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.moneypenny ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.arrow ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.team ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.spamless ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="text-center py-3 px-2">{row.ionos ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Detailed Service Reviews</h2>
          <div className="space-y-8">
            {services.map((service) => (
              <div key={service.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                        #{service.rank}
                      </span>
                      <h3 className="text-xl font-bold">{service.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex items-center gap-1"><PoundSterling className="w-4 h-4" /> {service.price}</span>
                      <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {service.bestFor}</span>
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {service.score}/5</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 mb-4 italic">{service.verdict}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-emerald-400 font-medium text-sm mb-2 flex items-center gap-1"><Check className="w-4 h-4" /> Pros</div>
                    <ul className="space-y-1">
                      {service.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-white/60">{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400 font-medium text-sm mb-2 flex items-center gap-1"><X className="w-4 h-4" /> Cons</div>
                    <ul className="space-y-1">
                      {service.cons.map((con, i) => (
                        <li key={i} className="text-sm text-white/60">{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where whoza.ai Wins */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Where whoza.ai Wins</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <MessageCircle className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">WhatsApp Delivery</h3>
              <p className="text-white/60 text-sm">Enquiries arrive in your WhatsApp in 3 seconds with full context — caller name, number, trade type, urgency, and location. No app switching. No email checking.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <Star className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Review Collection</h3>
              <p className="text-white/60 text-sm">Claire automatically sends review requests after every completed job. No manual follow-up. No forgotten customers. Google reviews on autopilot.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Competitor Analysis</h3>
              <p className="text-white/60 text-sm">Rex analyses what your competitors are doing — their pricing, their reviews, their gaps. See opportunities they are missing and capture that market.</p>
            </div>
          </div>
        </section>

        {/* Pricing Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Pricing Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Service</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Entry Price</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Contract</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Trial</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 bg-emerald-500/5">
                  <td className="py-3 px-4 font-bold text-emerald-400">whoza.ai</td>
                  <td className="py-3 px-4">£59/month</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">None</span></td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Clara AI</td>
                  <td className="py-3 px-4">£49.99/month</td>
                  <td className="py-3 px-4">3 months</td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Moneypenny</td>
                  <td className="py-3 px-4">~£150/month</td>
                  <td className="py-3 px-4">12 months</td>
                  <td className="py-3 px-4">None</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">ARROW</td>
                  <td className="py-3 px-4">£99/month</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">None</span></td>
                  <td className="py-3 px-4">14 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Team-Connect</td>
                  <td className="py-3 px-4">£9.99/month</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">None</span></td>
                  <td className="py-3 px-4">14 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Spamless</td>
                  <td className="py-3 px-4">£29/month</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">None</span></td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">IONOS</td>
                  <td className="py-3 px-4">£10/month</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">None</span></td>
                  <td className="py-3 px-4">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">How We Tested</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            We signed up for free trials with each service, made test calls, and evaluated:
          </p>
          <ul className="space-y-2 text-white/70 mb-4">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Voice quality and naturalness</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Call handling accuracy</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Delivery speed and method</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Setup time and complexity</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Revenue capture features</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> Trade-specific customisation</li>
          </ul>
          <p className="text-white/70 leading-relaxed">
            No affiliate relationships. No paid placements. Rankings based on merit alone.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">AI Call Answering Definitive Guide</h3>
              <p className="text-sm text-white/60">Complete 2026 guide to how AI call answering works for UK trades.</p>
            </a>
            <a href="/blog/ai-call-answering-pricing-guide-uk-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Pricing Guide 2026</h3>
              <p className="text-sm text-white/60">Detailed breakdown of AI call answering costs and ROI calculations.</p>
            </a>
            <a href="/blog/247-call-answering-uk-trades-guide-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">24/7 Emergency Call Handling</h3>
              <p className="text-sm text-white/60">How to capture emergency calls at 2am, weekends, and bank holidays.</p>
            </a>
            <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Missed Call Cost Calculator</h3>
              <p className="text-sm text-white/60">Data-driven analysis of how much missed calls actually cost your trade.</p>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-12">
          <div className="bg-emerald-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Try whoza.ai Free for 7 Days
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              See why we ranked whoza.ai #1 for revenue capture. Setup in 30 minutes. No contract. No credit card.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-white/60 text-sm mt-4">
              30-day money-back guarantee • ICO registered (ZC077271) • Scottish company SC874716
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
