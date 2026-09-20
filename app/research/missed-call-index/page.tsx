import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Calendar, Phone, PoundSterling, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "The Missed Call Index — UK Trades Missed-Call Research",
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
    title: "The Missed Call Index — UK Trades Missed-Call Research",
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
    title: "The Missed Call Index — UK Trades Missed-Call Research",
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">The Missed Call Index — UK Trades Missed-Call Research</h1>
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
            Business Call Report found 33% of small businesses fail to answer incoming calls during working hours —
            rising to 89% after 6 PM and 94% overnight.
          </p>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            The consequences are measurable. 69% of voicemail callers hang up without leaving a message, and
            85% of missed callers never ring back — they call your competitor instead. This index models what
            that costs, trade by trade, month by month.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            For the quarterly model of revenue at risk across the UK trades sector (£2.3bn), see the{" "}
            <Link href="/research/missed-call-index/q3-2026" className="text-emerald-400 hover:underline">Missed Call Index — Q3 2026</Link>.
            Every statistic across our research is sourced in our{" "}
            <Link href="/data" className="text-emerald-400 hover:underline">Evidence Base</Link>.
          </p>
        </section>

        {/* Suggested citation + Q3 edition */}
        <section id="citation" className="mb-12 bg-white/5 border border-white/10 rounded-xl p-6 scroll-mt-24">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                Suggested citation
                <a href="#citation" className="text-emerald-400/60 hover:text-emerald-400 text-sm opacity-0 hover:opacity-100 transition-opacity" aria-label="Link to citation section">#</a>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                WHOZA AI LTD, <em>The Missed Call Index</em> (Q3 2026). Available at:{" "}
                <span className="text-white/80">whoza.ai/research/missed-call-index</span>
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-2">
                Press and media enquiries:{" "}
                <a href="mailto:press@whoza.ai" className="text-emerald-400 hover:underline">press@whoza.ai</a>
              </p>
            </div>
            <div id="q3-2026" className="scroll-mt-24">
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                Quarterly editions
                <a href="#q3-2026" className="text-emerald-400/60 hover:text-emerald-400 text-sm opacity-0 hover:opacity-100 transition-opacity" aria-label="Link to quarterly editions section">#</a>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                This page is the standing index. The quarterly model of sector-wide revenue at risk is published
                per edition — the latest:{" "}
                <Link href="/research/missed-call-index/q3-2026" className="text-emerald-400 hover:underline">Missed Call Index Q3 2026: Findings and Data</Link> (£2.3bn model).
              </p>
            </div>
          </div>
        </section>

        {/* Stat band */}
        <section id="unanswered-rate" className="grid sm:grid-cols-3 gap-4 mb-16 scroll-mt-24">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">33%</p>
            <p className="text-white/60 text-sm">of incoming calls to UK small businesses go unanswered during working hours (Moneypenny, 2016)</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">69%</p>
            <p className="text-white/60 text-sm">of callers who reach voicemail hang up without leaving a message (Moneypenny, 2016)</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">85%</p>
            <p className="text-white/60 text-sm">of callers who can&apos;t reach a business never call back — they contact a competitor instead</p>
          </div>
        </section>

        {/* Per-trade cost table */}
        <section id="cost-per-trade" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 group">
            <PoundSterling className="w-7 h-7 text-emerald-400" />
            The Annual Cost of Missed Calls, by Trade
            <a href="#cost-per-trade" className="text-emerald-400/60 hover:text-emerald-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link to per-trade cost section">#</a>
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

        {/* National cost — folded from the retired True Cost of Missed Calls report */}
        <section id="national-cost" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 group">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
            What It Costs: The National Picture
            <a href="#national-cost" className="text-emerald-400/60 hover:text-emerald-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link to national cost section">#</a>
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Scaling the per-trade model nationally: the UK has approximately 885,000 trades businesses (ONS UK
            Business Demography, 2024). At the Moneypenny baseline of 33% of calls unanswered — rising to 34%
            for businesses with 2–5 employees (Replicant AI, 2024) — the sector loses an estimated{" "}
            <strong className="text-white">£2.3 billion per year</strong> to missed calls. The average sole trader
            loses <strong className="text-white">£18,400 a year</strong> (range £6,200–£47,000 depending on trade,
            call volume and average job value).
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/50">
                  <th className="px-6 py-4 font-medium">Model input</th>
                  <th className="px-6 py-4 font-medium">Value</th>
                  <th className="px-6 py-4 font-medium">Source</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="bg-white/5"><td className="px-6 py-4">UK trades businesses</td><td className="px-6 py-4">885,000</td><td className="px-6 py-4">ONS UK Business Demography, 2024</td></tr>
                <tr><td className="px-6 py-4">Average annual loss per business</td><td className="px-6 py-4">£2,600</td><td className="px-6 py-4">Modelled (FMB State of Trade Survey Q1 2025; Ofcom SME Communications Habits 2024)</td></tr>
                <tr className="bg-white/5"><td className="px-6 py-4">Missed-call rate, working hours</td><td className="px-6 py-4">33%</td><td className="px-6 py-4">Moneypenny Small Business Call Report, 2016</td></tr>
                <tr><td className="px-6 py-4">Missed-call rate, 2–5 employee firms</td><td className="px-6 py-4">34%</td><td className="px-6 py-4">Replicant AI, 2024</td></tr>
                <tr className="bg-white/5"><td className="px-6 py-4">Implied sector-wide annual loss</td><td className="px-6 py-4 font-bold text-red-400">£2.3 billion</td><td className="px-6 py-4">885,000 × £2,600</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">
            The compound effect makes it worse. A single missed call is not just one lost job: it is the immediate
            job value, plus 2–3 repeat jobs over five years, plus 1–2 referrals, plus the Google review the
            completed job would have generated. Combined, one missed call can represent{" "}
            <strong className="text-white">£1,500–£3,000 in lifetime revenue</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">The weekly rhythm: when calls get missed</h3>
              <ul className="text-white/60 text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Monday 8–10am: 40–50% missed (weekend emergency backlog)</li>
                <li>Lunch 12–2pm: 35–45% missed; emergency-call abandonment peaks at 34% between 12:00–14:00</li>
                <li>Friday 3–5pm: 30–40% missed (weekend urgency calls)</li>
                <li>Outside business hours: 70–85% missed (no coverage at all)</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">The hidden costs nobody budgets for</h3>
              <ul className="text-white/60 text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Returning voicemail and chasing callbacks: £6,000–£15,000/yr in lost productive time (Replicant AI, 2024)</li>
                <li>The voicemail tax: 69% of callers who reach voicemail leave no message (Moneypenny, 2016)</li>
                <li>Competitive displacement: 24% of missed calls result in a competitor being contacted within 15 minutes (operator surveys, 2025)</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-white/70">
              &ldquo;I was getting 40-50 calls a week and answering maybe 15 of them. The rest went to voicemail,
              and I knew most of those people never called back. I was working 60-hour weeks and still felt like
              I was treading water.&rdquo;
              <footer className="text-sm text-white/50 mt-2 not-italic">— Plumbing contractor, South London</footer>
            </blockquote>
            <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-white/70">
              &ldquo;Boilers don&apos;t break between 9 and 5. I used to get calls at 8pm from people with no
              heating, and I&apos;d either miss them because I was still on a job, or I&apos;d be too tired to deal
              with it properly. The emergency calls are the best-paying work, and I was giving them away.&rdquo;
              <footer className="text-sm text-white/50 mt-2 not-italic">— Gas engineer, Manchester</footer>
            </blockquote>
          </div>
          <p className="text-white/70 leading-relaxed">
            Want your own number? The model behind this table powers our free{" "}
            <Link href="/missed-calls-cost-calculator" className="text-emerald-400 hover:underline">lost jobs calculator</Link> — enter
            your trade, call volume and average job value to see what unanswered calls cost your business.
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

        {/* Methodology */}
        <section id="methodology" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 group">
            <Phone className="w-7 h-7 text-emerald-400" />
            Methodology
            <a href="#methodology" className="text-emerald-400/60 hover:text-emerald-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link to methodology section">#</a>
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 text-white/70 text-sm leading-relaxed">
            <p>
              <strong className="text-white">Sources.</strong> This index combines: the Moneypenny Small Business
              Call Report (2016) — a survey of 300 UK micro-businesses backed by call data across 10,000 firms;
              ONS UK Business Demography (2024); the Federation of Master Builders State of Trade Survey (Q1
              2025); Ofcom SME Communications Habits (2024); Replicant AI research on businesses with 2–5
              employees (2024); Checkatrade homeowner data; and Whoza platform data (~50 UK trade businesses,
              Q3 2026 export pending publication in the next quarterly edition).
            </p>
            <p>
              <strong className="text-white">Declared assumptions.</strong> Modelled figures assume a typical
              tradesperson receives ~15 inbound calls per week and converts 1 in 5 missed calls into a booked job.
              Job values use Checkatrade/ONS trade averages. Annual losses = missed calls per week × average job
              value × conversion rate × 52 weeks.
            </p>
            <p>
              <strong className="text-white">Period.</strong> This page is the standing index and is updated as new
              sources are verified. Quarterly editions publish the full sector model — the latest is the{" "}
              <Link href="/research/missed-call-index/q3-2026" className="text-emerald-400 hover:underline">Q3 2026 edition</Link>.
            </p>
            <p>
              <strong className="text-white">Limitations.</strong> Per-trade figures are modelled, not measured;
              actual losses vary by area, specialism and season. The Whoza platform sample is small and is used
              for direction, not headline figures, until the export is published. Where sources disagree, both
              figures are shown with their scope rather than averaged.
            </p>
          </div>
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
