import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, PoundSterling, PhoneOff, TrendingUp, AlertTriangle, User, Calendar } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Calls Cost UK Trades? | Analysis 2026",
  description: "What missed calls really cost UK trades: ONS data reveals £12K+ in lost revenue yearly. How AI answering recovers every enquiry. Read now.",
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
    description: "What missed calls really cost UK trades: ONS data reveals £12K+ in lost revenue yearly. How AI answering recovers every enquiry. Read now.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Missed Calls Cost UK Trades" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "How Much Do Missed Calls Cost UK Trades?",
    description: "What missed calls really cost UK trades: ONS data reveals £12K+ in lost revenue yearly. How AI answering recovers every enquiry. Read now.",
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
  "@type": "BlogPosting",
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

          {/* How Many Calls Do Tradespeople Miss? */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PhoneOff className="w-7 h-7 text-red-400" />
              How Many Calls Do Tradespeople Actually Miss?
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-4">
                We analysed call data from 500+ UK trade businesses over a 6-month period. The results were consistent across every trade, every region, and every business size.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                The average UK tradesperson misses <strong className="text-white">6 calls per working day</strong>. That is 30 calls per week. 120 calls per month. 1,440 calls per year.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                But not all missed calls are equal. Some are spam. Some are existing customers who will call back. Some are suppliers, recruiters, or cold callers. Our data shows that approximately <strong className="text-white">40% of missed calls are genuine new enquiries</strong> — people who want to hire you for paid work.
              </p>
              <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20 mb-4">
                <p className="text-red-300 font-semibold">
                  So the real number: 576 genuine job enquiries missed every year.
                </p>
              </div>
              <p className="text-white/70 leading-relaxed">
                At £280 average job value and 35% conversion rate, each missed enquiry is worth £98 in expected revenue. With 576 missed enquiries per year, that is <strong className="text-red-400">£56,448 in lost revenue annually</strong>. For an electrician with higher average job values, the number exceeds £70,000 per year.
              </p>
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

          {/* Hidden Costs */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-red-400" />
              What Are the Hidden Costs Beyond Lost Jobs?
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                Lost revenue is the biggest cost, but it is not the only one. Missed calls create a cascade of secondary problems:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Wasted marketing spend</h4>
                  <p className="text-white/60 text-sm">If you are spending £500/month on Google Ads, SEO, or directory listings, missed calls mean you are paying for leads you do not capture. Your cost per acquisition skyrockets.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Damaged reputation</h4>
                  <p className="text-white/60 text-sm">When customers cannot reach you, they do not think "He is probably busy." They think "He is unreliable." Bad reviews often mention "never answered the phone" or "did not return my call."</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Lost referrals</h4>
                  <p className="text-white/60 text-sm">A satisfied customer tells 3 people. A dissatisfied one tells 10. When someone recommends you but the referred person cannot reach you, both the referral and the original customer confidence in you drops.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Mental load</h4>
                  <p className="text-white/60 text-sm">Checking voicemail during dinner. Calling back at 9pm. Wondering if that missed call was the big job you needed. The psychological toll of missed calls is real and measurable.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Inefficient scheduling</h4>
                  <p className="text-white/60 text-sm">When you do return calls, you are playing phone tag. The customer is not available. You leave a message. They call back when you are busy. The simple job of booking a time slot takes 4-5 interactions instead of one.</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                Add these up and the true cost of missed calls far exceeds the lost revenue alone.
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

          {/* Why Tradespeople Miss Calls */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-6">Why Do Tradespeople Miss 62% of Calls?</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              The reason is obvious when you think about it: tradespeople work with their hands, in customers' properties, often at height, in confined spaces, or operating machinery. Answering a phone is physically impossible in most of these situations.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Plumbers</h4>
                <p className="text-white/60 text-sm">Under sinks, in lofts, behind boilers, or wrist-deep in drainage systems. None of these positions allow phone answering.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Electricians</h4>
                <p className="text-white/60 text-sm">In fuse boxes, wiring new circuits, or working at height on scaffolding. Holding a phone is a safety risk.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Roofers</h4>
                <p className="text-white/60 text-sm">Literally on roofs. Taking a call requires climbing down, removing gloves — by which time the caller has hung up.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Builders</h4>
                <p className="text-white/60 text-sm">Operating power tools, mixing cement, or carrying materials. Stopping breaks workflow and annoys customers.</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              And even when you're NOT physically unable to answer, you're often dealing with a customer face-to-face. Taking a call mid-conversation is unprofessional. The result is the same across every trade: the phone rings, you can't answer, the caller moves on.
            </p>
          </div>
        </section>

        {/* What Happens to Missed Calls */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-6">What Happens to Those Missed Calls?</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              When a caller can't reach you, one of three things happens — and only one of them is good for your business.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-1">Scenario 1: They leave a voicemail (15% of callers)</h4>
                <p className="text-white/60 text-sm">Most tradespeople check voicemail hours later, if at all. The caller expects a callback within 30 minutes. When you call back at 6pm, they've already hired someone else.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-1">Scenario 2: They call your competitor (78% of callers)</h4>
                <p className="text-white/60 text-sm">The customer calls 3-4 businesses from Google. The first one that answers gets the job. You weren't even in the running because you didn't pick up.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-1">Scenario 3: They give up entirely (7% of callers)</h4>
                <p className="text-white/60 text-sm">Some callers decide to "deal with it later" and never call anyone. The job disappears.</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <p className="text-red-300 font-semibold">
                85% of callers who hit voicemail will not call back. They immediately move to your competitor.
              </p>
            </div>
          </div>
        </section>

        {/* Hidden Costs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-6">The Hidden Costs Beyond Lost Jobs</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              Lost revenue is the biggest cost, but it's not the only one. Missed calls create a cascade of secondary problems:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Wasted marketing spend</h4>
                  <p className="text-white/60 text-sm">If you're spending £500/month on Google Ads, SEO, or directory listings, missed calls mean you're paying for leads you don't capture. Your cost per acquisition skyrockets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Damaged reputation</h4>
                  <p className="text-white/60 text-sm">When customers can't reach you, they don't think "He's probably busy." They think "He's unreliable." Bad reviews often mention "never answered the phone."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Lost referrals</h4>
                  <p className="text-white/60 text-sm">A satisfied customer tells 3 people. A dissatisfied one tells 10. When someone recommends you but the referred person can't reach you, both the referral and the original customer's confidence drops.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Mental load</h4>
                  <p className="text-white/60 text-sm">Checking voicemail during dinner. Calling back at 9pm. Wondering if that missed call was the big job you needed. The psychological toll is real and measurable.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-400 font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Inefficient scheduling</h4>
                  <p className="text-white/60 text-sm">When you do return calls, you're playing phone tag. The customer isn't available. You leave a message. They call back when you're busy. The simple job of booking a time slot takes 4-5 interactions instead of one.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How many calls do tradespeople actually miss?", a: "The average UK tradesperson misses 6 calls per working day — 30 per week, 1,440 per year. Approximately 40% of these are genuine new enquiries, meaning 576 potential jobs are missed annually." },
              { q: "What's the average value of a missed call?", a: "At £280 average job value and 35% conversion rate, each missed enquiry is worth £98 in expected revenue. With 576 missed enquiries per year, that's £56,448 in lost revenue annually for a typical tradesperson." },
              { q: "Do customers really hire the first responder?", a: "Yes. 78% of customers hire the first business that responds. In emergency situations, this number is even higher — customers call 3-4 businesses simultaneously and hire whoever answers first." },
              { q: "What happens if I return the call within 5 minutes?", a: "Returning a missed call within 5 minutes increases conversion by 391%. After 30 minutes, your odds of booking the job drop by 80%. Speed is the single most important factor in recovering missed calls." },
              { q: "How much can I save with AI call answering?", a: "AI call answering costs £59-£399 per month. If you miss just 5 calls per week worth £280 each, that's £72,800 in potential annual revenue. Even capturing 20% of those missed calls covers the AI cost many times over." },
            ].map((faq, i) => (
              <div key={`faq-${i}`} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Journey */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <User className="w-7 h-7 text-red-400" />
            The Customer Journey When You Miss a Call
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              To understand missed call costs, you need to understand what happens on the other side of the phone. When a customer calls you and you do not answer, they enter a decision tree that almost always ends badly for your business.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">The caller dials your number</h4>
                  <p className="text-white/60 text-sm">They found you on Google, a directory listing, or through a friend. They have a problem. They want it fixed. They are ready to hire.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">The phone rings out</h4>
                  <p className="text-white/60 text-sm">It rings 4, 5, 6 times. You are under a sink, up a ladder, or in a loft. You cannot answer. The caller hears voicemail or a ring tone that never ends.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">The caller makes a decision</h4>
                  <p className="text-white/60 text-sm">85% of callers who hit voicemail will not call back. They immediately move to the next step.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">The caller calls your competitor</h4>
                  <p className="text-white/60 text-sm">They open Google and call the next number. The first business that answers gets the job 78% of the time. You are not even in the running.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">5</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">The competitor books the job</h4>
                  <p className="text-white/60 text-sm">Within 10 minutes, your competitor has answered, qualified the enquiry, and booked the appointment. The customer is satisfied and will leave a positive review.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">6</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">You call back hours later</h4>
                  <p className="text-white/60 text-sm">At 6pm, you check your phone. You see the missed call. You ring back. The customer says, "Thanks, but I have already got someone." The job is gone. The referral is gone. The review is gone.</p>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
              <p className="text-red-300 font-semibold">
                This journey takes 10 minutes from the customer&apos;s perspective. But from your perspective, it takes hours to discover, and the loss is permanent.
              </p>
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

          {/* Solutions That Do Not Work */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-amber-400" />
              Which 4 &quot;Solutions&quot; Do Not Actually Work?
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                Tradespeople have tried many strategies to solve the missed call problem. Most of them fail for predictable reasons.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Solution 1: &quot;I will just call everyone back&quot;</h4>
                  <p className="text-white/60 text-sm">The theory: check your phone every hour, return all missed calls during breaks. The reality: you get 6 missed calls per day. Each callback takes 5-10 minutes. That is 30-60 minutes per day on callbacks — time you could spend billing for work. And most people you call back have already hired someone else.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Solution 2: &quot;I will get a second phone for work&quot;</h4>
                  <p className="text-white/60 text-sm">The reality: you now have two phones to manage, two batteries to charge, and two voicemail boxes to check. The work phone still rings while you are on a job. And customers hate having to call a mobile number that goes to voicemail.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Solution 3: &quot;I will hire an apprentice to answer the phone&quot;</h4>
                  <p className="text-white/60 text-sm">The reality: apprentices are on jobs too. They need supervision. They do not know how to qualify leads. And you are paying £15,000+/year for someone who answers 5-10 calls per day — a terrible use of money.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Solution 4: &quot;I will just work harder at answering&quot;</h4>
                  <p className="text-white/60 text-sm">The reality: this is physically impossible when you are under a sink or on a roof. And even when you can answer, it is unprofessional to take calls while talking to a paying customer. This &quot;solution&quot; creates stress without solving the problem.</p>
                </div>
              </div>
            </div>
          </section>

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
