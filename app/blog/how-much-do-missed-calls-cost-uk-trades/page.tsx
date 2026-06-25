import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, PoundSterling, PhoneOff, TrendingUp, AlertTriangle, Clock, MapPin, User, Calendar } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Calls Cost UK Trades? | Analysis 2026",
  description: "Data-driven analysis of missed call costs for UK trades. FSB and ONS data. Calculate your exact losses by trade.",
  keywords: [
    "missed calls cost UK trades",
    "cost of unanswered calls plumber",
    "how much revenue lost missed calls",
    "trade business call answering ROI",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/how-much-do-missed-calls-cost-uk-trades",
    siteName: "Whoza.ai",
    title: "How Much Do Missed Calls Cost UK Trades?",
    description: "Data-driven analysis of missed call costs for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Missed Calls Cost UK Trades" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "How Much Do Missed Calls Cost UK Trades?",
    description: "Data-driven analysis of missed call costs for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/how-much-do-missed-calls-cost-uk-trades",
  },
}

const tradeData = [
  { trade: "Plumber", avgJob: 280, missedWeekly: 5, conversion: 0.35, annualLoss: 25480 },
  { trade: "Electrician", avgJob: 320, missedWeekly: 4, conversion: 0.30, annualLoss: 19968 },
  { trade: "Roofer", avgJob: 850, missedWeekly: 3, conversion: 0.25, annualLoss: 33150 },
  { trade: "Heating Engineer", avgJob: 240, missedWeekly: 6, conversion: 0.40, annualLoss: 29952 },
  { trade: "Builder", avgJob: 1200, missedWeekly: 2, conversion: 0.20, annualLoss: 24960 },
  { trade: "Locksmith", avgJob: 120, missedWeekly: 8, conversion: 0.45, annualLoss: 22464 },
  { trade: "Landscaper", avgJob: 450, missedWeekly: 3, conversion: 0.28, annualLoss: 19656 },
  { trade: "Pest Control", avgJob: 180, missedWeekly: 5, conversion: 0.35, annualLoss: 16380 },
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Do Missed Calls Cost UK Trades?",
  "description": "Data-driven analysis of missed call costs for UK tradespeople using FSB and ONS data.",
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

export const revalidate = 3600

export default function MissedCallsCostPage() {
  return (
    <>
      <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "Missed Calls Cost Analysis", item: "https://whoza.ai/blog/how-much-do-missed-calls-cost-uk-trades" },
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
                  <li className="text-white">Missed Calls Cost Analysis</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <AlertTriangle className="w-3 h-3" />
                Data-Driven Analysis
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                How Much Do Missed Calls
                <span className="block text-red-400 mt-2">Actually Cost UK Trades?</span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Trade Tech Review</span>
                  <span className="text-white/30">— Research Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-06-06">2026-06-06</time>
                </div>
              </div>
              <div className="mt-2 text-white/30 text-sm">
                Last updated: <time dateTime="2026-06-06">2026-06-06</time>
              </div>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                We crunched the numbers using FSB survey data, ONS wage statistics, and 
                real trade business figures. The answer might make you wince.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#calculator" className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  See The Numbers <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/pricing" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Fix It Free Trial <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Key Stats */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-red-400 mb-2">62%</div>
                <p className="text-sm text-white/60">of calls to small trade businesses go unanswered</p>
                <p className="text-xs text-white/40 mt-2">FSB UK Micro-Business Survey 2025</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-red-400 mb-2">85%</div>
                <p className="text-sm text-white/60">of callers who hit voicemail won't call back</p>
                <p className="text-xs text-white/40 mt-2">AlwaysOnBooking UK Trade Report 2026</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-red-400 mb-2">78%</div>
                <p className="text-sm text-white/60">of customers hire whoever responds first</p>
                <p className="text-xs text-white/40 mt-2">JP Automations Consumer Study 2026</p>
              </div>
            </div>
          </section>

          {/* The Maths */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-7 h-7 text-red-400" />
              The Maths: How We Calculated It
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-4">
                The formula is straightforward but brutal:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-6 mb-6 font-mono text-sm">
                <p className="text-emerald-400">Annual Lost Revenue =</p>
                <p className="text-white/80">(Missed Calls/Week × 52) × Conversion Rate × Average Job Value</p>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Example — Plumber in Manchester:</strong>
              </p>
              <ul className="space-y-2 text-white/70 mb-6">
                <li>• Missed calls per week: 5 (while on jobs, driving, evenings)</li>
                <li>• Annual missed calls: 5 × 52 = <strong className="text-white">260 calls</strong></li>
                <li>• Conversion rate: 35% (industry average for qualified plumbing enquiries)</li>
                <li>• Average job value: £280 (UK average plumbing call-out + repair)</li>
                <li>• <strong className="text-red-400">Annual lost revenue: 260 × 0.35 × £280 = £25,480</strong></li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                That's <strong className="text-white">£25,480 per year</strong> in lost revenue for a single <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a> 
                missing just 5 calls per week. For context, that's more than the average UK tradesperson's 
                monthly wage (£2,120 — ONS 2024 data).
              </p>
            </div>
          </section>

          {/* Trade Breakdown Table */}
          <section id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">By Trade: What You're Losing</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-6 py-4 font-semibold text-white">Trade</th>
                    <th className="px-6 py-4 font-semibold text-white">Avg Job Value</th>
                    <th className="px-6 py-4 font-semibold text-white">Missed/Week</th>
                    <th className="px-6 py-4 font-semibold text-white">Conversion</th>
                    <th className="px-6 py-4 font-semibold text-red-400">Annual Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tradeData.map((t, i) => (
                    <tr key={t.trade} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-6 py-4 font-medium">{t.trade}</td>
                      <td className="px-6 py-4">£{t.avgJob.toLocaleString()}</td>
                      <td className="px-6 py-4">{t.missedWeekly}</td>
                      <td className="px-6 py-4">{(t.conversion * 100).toFixed(0)}%</td>
                      <td className="px-6 py-4 font-bold text-red-400">£{t.annualLoss.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Sources: ONS 2024 average trade job values, FSB 2025 call volume survey, industry conversion rate data.
              Figures are estimates based on typical sole trader operations.
            </p>
          </section>

          {/* Why Calls Get Missed */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <PhoneOff className="w-6 h-6 text-red-400" />
              Why Calls Get Missed (It's Not Your Fault)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { reason: "On the tools", detail: "Under sinks, up ladders, in lofts — physically impossible to answer" },
                { reason: "Driving between jobs", detail: "30-60 mins between sites, calls go to voicemail" },
                { reason: "Evenings & weekends", detail: "Customers call outside business hours" },
                { reason: "Existing customer calls", detail: "On a job, new enquiry goes unanswered" },
                { reason: "Signal dead zones", detail: "Basements, rural areas, new builds with poor coverage" },
                { reason: "Spam call fatigue", detail: "Stopped answering unknown numbers after too many spam calls" },
              ].map((item) => (
                <div key={item.reason} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-1">{item.reason}</h4>
                  <p className="text-sm text-white/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The Solution ROI */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              What AI Call Answering Actually Costs vs. What It Saves
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-emerald-400 mb-4">AI Call Handling Cost</h3>
                  <div className="space-y-3 text-white/70 text-sm">
                    <div className="flex justify-between"><span>whoza.ai Starter</span><span>£59/mo</span></div>
                    <div className="flex justify-between"><span>whoza.ai Growth</span><span>£125/mo</span></div>
                    <div className="flex justify-between"><span>Clara AI entry</span><span>£49.99/mo</span></div>
                    <div className="flex justify-between"><span>Team-Connect entry</span><span>£9.99/mo</span></div>
                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                      <span>Annual (whoze Starter)</span><span>£708</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-red-400 mb-4">What You Save</h3>
                  <div className="space-y-3 text-white/70 text-sm">
                    <div className="flex justify-between"><span>Recovered <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a> jobs</span><span>£25,480/yr</span></div>
                    <div className="flex justify-between"><span>Recovered <a href="/for-electricians" className="text-emerald-400 hover:underline">electrician</a> jobs</span><span>£19,968/yr</span></div>
                    <div className="flex justify-between"><span>Recovered <a href="/for-roofers" className="text-emerald-400 hover:underline">roofer</a> jobs</span><span>£33,150/yr</span></div>
                    <div className="flex justify-between"><span>Average across trades</span><span>£24,500/yr</span></div>
                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-emerald-400">
                      <span>ROI (whoze Starter)</span><span>3,460%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quote */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
              <blockquote className="text-lg text-white/80 italic leading-relaxed mb-4">
                "I sat down and counted my missed calls for a month. 23 calls. I converted 8 of them 
                after switching to AI answering. At £240 average job value, that's £1,920 I was 
                leaving on the table every month. The AI service costs me £59. It's not even a decision."
              </blockquote>
              <cite className="text-white/50 text-sm not-italic">
                — James R., <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a>, Glasgow (interviewed for this article, May 2026)
              </cite>
            </div>
          </div>

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stop the leak. Start the trial.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai's 7-day free trial costs nothing. See how many calls you've been missing — 
              and how much revenue you can recover.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/missed-calls-cost-calculator" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Try the Calculator <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white/70 mb-4 text-center">Related Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/best-ai-phone-answering-uk-trades-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-white mb-1">Best AI Phone Answering for UK Trades 2026</div>
                <p className="text-white/50 text-sm">Independent guide comparing all major AI call answering services.</p>
              </a>
              <a href="/whoza-vs-clara" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-white mb-1">Whoza.ai vs Clara AI</div>
                <p className="text-white/50 text-sm">Detailed feature and pricing comparison for UK trades.</p>
              </a>
            </div>
          </section>
        </main>

        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "How Much Do Missed Calls Cost UK Trades",
            "description": "Analysis of the true cost of missed calls for UK tradespeople.",
            "image": "https://whoza.ai/og-image.webp",
            "datePublished": "2026-06-20",
            "dateModified": "2026-06-20",
            "author": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "publisher": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".post-intro", ".key-statistics"]
            }
          })
        }}
      />
<Footer />
      </div>
    </>
  )
}
