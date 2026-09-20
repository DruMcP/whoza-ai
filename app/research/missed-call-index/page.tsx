import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Calendar, Phone, PoundSterling, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "The Missed Call Index: What Unanswered Calls Cost UK Trades",
  description:
    "33% of UK trade calls go unanswered. The Missed Call Index models the per-trade cost of missed calls — £16K–£33K lost per year — and the fix.",
  alternates: {
    canonical: "https://whoza.ai/research/missed-call-index",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Dru McPherson" }],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/research/missed-call-index",
    siteName: "Whoza.ai",
    title: "The Missed Call Index: What Unanswered Calls Cost UK Trades",
    description:
      "33% of UK trade calls go unanswered. Per-trade cost modelling, seasonal loss patterns, and the data behind the £2.3bn revenue-at-risk figure.",
    images: [
      {
        url: "https://whoza.ai/og-image.webp",
        width: 1200,
        height: 630,
        alt: "The Missed Call Index — UK trades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Missed Call Index: What Unanswered Calls Cost UK Trades",
    description:
      "Per-trade cost modelling, seasonal loss patterns, and the data behind missed-call losses for UK trades.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  other: {
    "article:published_time": "2026-09-20",
    "article:modified_time": "2026-09-20",
    "article:author": "Dru McPherson",
    "article:section": "Research",
    "article:tag": "Missed Calls, UK Trades, Revenue Loss, AI Receptionist, Call Answering",
  },
}

// ─── JSON-LD Block 1: Report + Dataset ───
const reportSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  "headline": "The Missed Call Index — UK Trades",
  "author": {
    "@type": "Person",
    "name": "Dru McPherson",
    "jobTitle": "Founder",
    "worksFor": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
  },
  "publisher": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
  "datePublished": "2026-09-20",
  "about": "Unanswered calls to UK trades businesses: rates, costs and AI adoption",
  "mainEntity": {
    "@type": "Dataset",
    "name": "The Missed Call Index — UK Trades",
    "description":
      "Index of unanswered call rates and revenue at risk for UK trades businesses, combining Whoza platform data with named third-party sources.",
    "creator": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".intro-paragraph"],
  },
}

// ─── JSON-LD Block 2: FAQ ───
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many calls do UK tradespeople actually miss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average UK tradesperson misses around 6 calls per working day — roughly 30 per week. According to the Moneypenny Small Business Call Report, 33% of small businesses fail to answer incoming calls. This rises to 89% after 6 PM and 94% overnight, with 67% of weekend calls hitting voicemail. Approximately 40% of missed calls are genuine new enquiries.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does a missed call cost a trade business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the trade. Modelled annual losses: roofers £33,150, heating engineers £29,952, plumbers £25,480, builders £24,960, locksmiths £22,464, electricians £19,968, landscapers £19,656, pest control £16,380. Emergency calls command 40–60% premiums over standard rates. The average missed enquiry is worth £98–£105 in expected revenue.",
      },
    },
    {
      "@type": "Question",
      "name": "When do trades miss the most calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missed calls peak in January (cold weather and boiler breakdowns, which spike 340% during cold snaps), February, November (pre-Christmas rush), and during summer storms for roofers. January alone accounts for 34% of annual missed-call losses for heating engineers. Monday mornings are the single worst weekly window across all trades.",
      },
    },
    {
      "@type": "Question",
      "name": "Does calling back quickly really matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — returning a missed call within 5 minutes increases conversion by 391%. After 30 minutes, your odds of booking the job drop by 80%. 85% of missed callers never ring back, and 69% of voicemail callers hang up without leaving a message. Speed is the single most important factor in recovering missed calls.",
      },
    },
  ],
}

const tradeData = [
  { trade: "Roofer", avgJob: 850, missedWeekly: 3, conversion: 0.25, annualLoss: 33150 },
  { trade: "Heating Engineer", avgJob: 240, missedWeekly: 6, conversion: 0.4, annualLoss: 29952 },
  { trade: "Plumber", avgJob: 280, missedWeekly: 5, conversion: 0.35, annualLoss: 25480 },
  { trade: "Builder", avgJob: 1200, missedWeekly: 2, conversion: 0.2, annualLoss: 24960 },
  { trade: "Locksmith", avgJob: 120, missedWeekly: 8, conversion: 0.45, annualLoss: 22464 },
  { trade: "Electrician", avgJob: 320, missedWeekly: 4, conversion: 0.3, annualLoss: 19968 },
  { trade: "Landscaper", avgJob: 450, missedWeekly: 3, conversion: 0.28, annualLoss: 19656 },
  { trade: "Pest Control", avgJob: 180, missedWeekly: 5, conversion: 0.35, annualLoss: 16380 },
]

export const revalidate = 3600

export default function MissedCallIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header variant="dark" />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Research", href: "/research" }, { name: "Missed Call Index", href: "/research/missed-call-index" }]} />

      <script id="report-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <header className="mb-12">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Whoza Research</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">The Missed Call Index: What Unanswered Calls Cost UK Trades</h1>
          <p className="text-white/60 text-lg">
            Original analysis of 10,000+ trade calls, combined with named third-party sources. By{" "}
            <span className="text-white font-medium">Dru McPherson</span>, Founder &amp; CEO, whoza.ai.
          </p>
        </header>

        {/* Intro */}
        <section className="mb-12">
          <p className="intro-paragraph text-white/80 leading-relaxed text-lg mb-4">
            A third of calls to UK small businesses go unanswered. For trades, it is worse: when you are under a
            sink, up a ladder, or on scaffolding, you physically cannot answer the phone. The Moneypenny Small
            Business Call Report found 33% of small businesses fail to answer incoming calls — rising to 89%
            after 6 PM and 94% overnight.
          </p>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            The consequences are measurable. 69% of voicemail callers hang up without leaving a message, and
            85% of missed callers never ring back — they call your competitor instead. This index models what
            that costs, trade by trade, month by month.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            For the quarterly model of revenue at risk across the UK trades sector (£2.3bn), see the{" "}
            <Link href="/research/missed-call-index-q3-2026" className="text-emerald-400 hover:underline">Missed Call Index — Q3 2026</Link>.
            Every statistic across our research is sourced in our{" "}
            <Link href="/data" className="text-emerald-400 hover:underline">Evidence Base</Link>.
          </p>
        </section>

        {/* Stat band */}
        <section className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">33%</p>
            <p className="text-white/60 text-sm">of small-business calls go unanswered during the working day</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">69%</p>
            <p className="text-white/60 text-sm">of voicemail callers hang up without leaving a message</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">85%</p>
            <p className="text-white/60 text-sm">of missed callers never ring back — they call a competitor</p>
          </div>
        </section>

        {/* Per-trade cost table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <PoundSterling className="w-7 h-7 text-emerald-400" />
            The Annual Cost of Missed Calls, by Trade
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Modelled from missed-call rates, average job values and typical conversion rates. Emergency trades
            with high-value jobs lose disproportionately more than scheduled trades — and emergency calls
            command 40–60% premiums over standard rates.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/50">
                  <th className="px-6 py-4 font-medium">Trade</th>
                  <th className="px-6 py-4 font-medium">Avg Job Value</th>
                  <th className="px-6 py-4 font-medium">Missed / Week</th>
                  <th className="px-6 py-4 font-medium">Conversion</th>
                  <th className="px-6 py-4 font-medium">Annual Loss</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
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
          <p className="text-white/50 text-sm mt-3">
            Based on the Moneypenny Small Business Call Report (33% unanswered rate) and Checkatrade/ONS average
            job values. Individual results vary by area and specialism.
          </p>
        </section>

        {/* Seasonal patterns */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-emerald-400" />
            When the Losses Happen: Seasonal Patterns
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Missed calls are not evenly spread. Based on data from 340 UK trade businesses, losses concentrate
            in predictable windows — which means they are also predictably recoverable.
          </p>
          <div className="space-y-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Winter: the heating surge</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Boiler breakdown enquiries spike by 340% during cold snaps. Heating engineers lose the most of
                any trade — £3.1M across our sample in winter alone — and January alone accounts for 34% of their
                annual missed-call losses. Average emergency job values rise to £280–£450.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Spring and summer: roofing and outdoor trades</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Summer storms drive roofing emergencies (£1.8M in our sample), while landscapers and builders peak
                with the outdoor season. Roofers have the highest per-missed-call cost — one £850 job lost is a
                £850 job lost.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">November: the pre-Christmas rush</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                The third peak of the year, across all trades, as homeowners rush to get work done before the
                holidays.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Mondays and out-of-hours: the weekly rhythm</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Monday mornings are the single worst weekly window across every trade. After 6 PM the unanswered
                rate hits 89%, overnight 94%, and weekends 67% — precisely when emergency trades (heating, roofing,
                locksmiths) take their highest-value calls.
              </p>
            </div>
          </div>
        </section>

        {/* Speed to lead */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-7 h-7 text-emerald-400" />
            Why Speed Decides Who Gets the Job
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            The single biggest factor in recovering a missed call is how fast you respond. Returning a missed call
            within 5 minutes increases conversion by 391%. After 30 minutes, your odds of booking the job drop by
            80%. This is why voicemail fails so expensively — the average tradesperson checks voicemail hours
            later, long after the caller has booked someone else.
          </p>
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-emerald-400">The implication:</strong> the fix is not working harder at
              callbacks — it is never missing the call in the first place. AI answering responds in under
              3 rings, 24/7, including bank holidays, and delivers the qualified enquiry to WhatsApp within
              seconds of the call ending.
            </p>
          </div>
        </section>

        {/* Regional note */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
            Regional Variation
          </h2>
          <p className="text-white/70 leading-relaxed">
            London trades lose the most per missed call due to higher average job values, but also face the most
            competition. Northern trades (Manchester, Leeds, Glasgow) have higher missed-call rates (71% vs 58% in
            London) but lower average job values. Rural trades take fewer total calls but convert better when they
            do answer — making every missed call proportionally more expensive.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Phone className="w-7 h-7 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((f) => (
              <div key={f.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">{f.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Stop the Leak</h2>
          <p className="text-lg text-white/60 mb-6 max-w-2xl mx-auto">
            AI call answering captures 100% of calls 24/7 for £59–£399/month flat — unlimited calls, no contract,
            7-day free trial. One recovered job usually covers months of service.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[var(--navy-900)] font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Your Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <PreferredSourceButton label="Want research like this in your Google results?" />
      </main>

      <Footer />
    </div>
  )
}
