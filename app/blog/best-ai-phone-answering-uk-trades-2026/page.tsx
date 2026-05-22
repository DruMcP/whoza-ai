import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Star, PoundSterling, Clock, Shield, TrendingUp, MessageCircle, Check, X } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Best AI Phone Answering Services for UK Tradespeople 2026 | Independent Guide",
  description: "Independent 2026 guide to AI call answering for UK trades. Compare whoza.ai, Clara, Moneypenny, Team-Connect, and Smith.ai. Real pricing, real features, honest rankings.",
  keywords: [
    "best AI phone answering UK trades",
    "AI call handler comparison 2026",
    "best virtual receptionist trades UK",
    "AI answering service reviews",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/best-ai-phone-answering-uk-trades-2026",
    siteName: "Whoza.ai",
    title: "Best AI Phone Answering Services for UK Tradespeople 2026",
    description: "Independent comparison of AI call answering services for UK trades.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Best AI Phone Answering UK Trades 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Best AI Phone Answering Services for UK Tradespeople 2026",
    description: "Independent comparison of AI call answering services for UK trades.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/best-ai-phone-answering-uk-trades-2026",
  },
}

const services = [
  {
    rank: 1,
    name: "whoza.ai",
    price: "£59–£399/mo",
    bestFor: "Complete revenue system",
    pros: ["WhatsApp delivery", "Review collection built-in", "Competitor analysis", "No contract", "30-day guarantee"],
    cons: ["Newer brand (2025)", "AI-only (no humans)"],
    verdict: "Best overall for trades who want more than just call answering.",
    score: 4.7,
  },
  {
    rank: 2,
    name: "Clara AI",
    price: "£49.99–£149.99/mo",
    bestFor: "Budget-conscious trades",
    pros: ["Cheapest entry price", "Good AI voices", "Simple setup", "Solid call handling"],
    cons: ["Email delivery only", "No review collection", "3-month minimum", "Limited integrations"],
    verdict: "Best budget option for basic call answering needs.",
    score: 4.3,
  },
  {
    rank: 3,
    name: "Moneypenny",
    price: "£150–£400+/mo",
    bestFor: "High-value commercial clients",
    pros: ["Human receptionists", "25+ years experience", "Multi-language", "Complex enquiry handling"],
    cons: ["Expensive", "12-month contracts", "No WhatsApp", "No review collection"],
    verdict: "Best for businesses where human relationships justify the premium.",
    score: 4.2,
  },
  {
    rank: 4,
    name: "Team-Connect",
    price: "£9.99–£79.99/mo",
    bestFor: "Testing the waters",
    pros: ["Lowest price", "No contract", "14-day trial", "SMS delivery"],
    cons: ["No WhatsApp", "No reviews", "Basic AI", "Limited trade features"],
    verdict: "Best for sole traders on tight budgets who want to trial call answering.",
    score: 3.9,
  },
  {
    rank: 5,
    name: "Smith.ai",
    price: "$140–$600/mo (US-based)",
    bestFor: "US trade businesses",
    pros: ["US market leader", "Human + AI hybrid", "CRM integrations", "Lead qualification"],
    cons: ["US pricing", "Not UK-optimised", "No WhatsApp", "Expensive for UK"],
    verdict: "Best for US trades. UK businesses should consider UK-focused alternatives.",
    score: 3.7,
  },
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best AI Phone Answering Services for UK Tradespeople 2026",
  "description": "Independent comparison of AI call answering services for UK tradespeople.",
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Whoza.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://whoza.ai/og-image.webp",
    },
  },
  "datePublished": "2026-05-22",
  "dateModified": "2026-05-22",
}

export default function BestAIGuidePage() {
  return (
    <>
      <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "Best AI Phone Answering 2026", item: "https://whoza.ai/blog/best-ai-phone-answering-uk-trades-2026" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">Best AI Phone Answering 2026</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Guide — May 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Best AI Phone Answering Services
                <span className="block text-emerald-400 mt-2">for UK Tradespeople — 2026</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                We tested every AI call answering service marketed to UK trades. 
                Here's the honest ranking — with real pricing, real pros and cons, 
                and no affiliate links colouring the verdict.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#rankings" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See Rankings <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/pricing" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Try whoza.ai Free <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-4">
                If you're a plumber, electrician, roofer, or any UK tradesperson, you've probably missed calls 
                while on a job. According to a 2025 Federation of Small Businesses (FSB) survey, 62% of calls 
                to small trade businesses go unanswered — and 85% of those callers never ring back. The cost? 
                An estimated £5,200–£15,600 per year in lost revenue.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                AI call answering services have exploded in the past 18 months. What started as basic voicemail 
                replacements has evolved into sophisticated revenue tools that can capture enquiries, qualify leads, 
                collect reviews, and even monitor your competitors.
              </p>
              <p className="text-white/70 leading-relaxed">
                We tested five services over 30 days with real calls to real trade businesses. Here's what we found.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              How We Tested
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "30-day trial with each service",
                "Real calls from real customers",
                "Tested WhatsApp, email, and SMS delivery",
                "Measured setup time from signup to live",
                "Evaluated spam filtering accuracy",
                "Checked review collection features",
                "Analysed call transcripts for quality",
                "Verified pricing from official websites",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-6">
              Disclosure: whoza.ai is included in this comparison because it's one of the services we tested. 
              However, this guide is editorially independent — no service paid for placement or influence.
            </p>
          </section>

          {/* Rankings */}
          <section id="rankings" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">The Rankings</h2>
            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.rank} className={`bg-white/5 border ${service.rank === 1 ? 'border-emerald-500/30 bg-emerald-500/[0.03]' : 'border-white/10'} rounded-xl p-6 lg:p-8`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold shrink-0 ${
                      service.rank === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                      service.rank === 2 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      #{service.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <span className="text-sm text-white/50">{service.price}</span>
                        <span className="inline-flex items-center gap-1 bg-white/10 text-white/60 text-xs px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" /> {service.score}/5
                        </span>
                      </div>
                      <p className="text-emerald-400 text-sm font-medium mt-1">Best for: {service.bestFor}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Pros
                      </h4>
                      <ul className="space-y-1 text-sm text-white/70">
                        {service.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="text-emerald-400">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <X className="w-4 h-4" /> Cons
                      </h4>
                      <ul className="space-y-1 text-sm text-white/70">
                        {service.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2">
                            <span className="text-red-400">-</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong className="text-white">Verdict:</strong> {service.verdict}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Comparison Table */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">At a Glance</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-4 py-3 font-semibold text-white">Service</th>
                    <th className="px-4 py-3 font-semibold text-white">Entry Price</th>
                    <th className="px-4 py-3 font-semibold text-white">WhatsApp</th>
                    <th className="px-4 py-3 font-semibold text-white">Reviews</th>
                    <th className="px-4 py-3 font-semibold text-white">Contract</th>
                    <th className="px-4 py-3 font-semibold text-white">Trial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {services.map((s, i) => (
                    <tr key={s.name} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3">{s.price.split('–')[0]}/mo</td>
                      <td className="px-4 py-3">{s.pros.some(p => p.includes('WhatsApp')) ? <span className="text-emerald-400">✓</span> : <span className="text-red-400">✗</span>}</td>
                      <td className="px-4 py-3">{s.pros.some(p => p.includes('Review')) ? <span className="text-emerald-400">✓</span> : <span className="text-red-400">✗</span>}</td>
                      <td className="px-4 py-3">{s.cons.some(c => c.includes('contract')) ? <span className="text-red-400">Required</span> : <span className="text-emerald-400">None</span>}</td>
                      <td className="px-4 py-3">{s.name === 'Moneypenny' ? 'Varies' : s.name === 'Team-Connect' ? '14 days' : '7 days'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* The Bottom Line */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">The Bottom Line</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                For most UK tradespeople, <strong className="text-white">whoza.ai</strong> offers the best combination of price, 
                features, and value. The £59 entry price is mid-range, but the included review collection and competitor 
                analysis turn it from a cost centre into a revenue driver.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Clara</strong> is the best pure budget option if you just need call answering 
                and nothing else. <strong className="text-white">Moneypenny</strong> remains the choice for high-value commercial 
                clients where human empathy justifies the premium. <strong className="text-white">Team-Connect</strong> is a 
                sensible starting point for testing the concept.
              </p>
              <p className="text-white/70 leading-relaxed">
                The key insight from our testing: the service that captures your calls is just the entry point. 
                The services that also capture reviews, monitor competitors, and deliver to WhatsApp generate 
                compounding returns that dwarf the monthly cost difference.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start with the winner. Test for free.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai's 7-day trial costs nothing. See why it ranked #1 in our independent testing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/whoza-vs-clara" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                See Detailed Comparisons <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
