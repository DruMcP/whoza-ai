import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Call Index 2026: What Unanswered Calls Cost UK Trades",
  description:
    "A third of UK small-business calls go unanswered. The Missed Call Index Q3 2026 models £2.3bn of trades revenue at risk — the data, the cost, and the fix.",
  alternates: {
    canonical: "https://whoza.ai/research/missed-call-index-q3-2026",
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
    url: "https://whoza.ai/research/missed-call-index-q3-2026",
    siteName: "Whoza.ai",
    title: "Missed Call Index 2026: What Unanswered Calls Cost UK Trades",
    description:
      "A third of UK small-business calls go unanswered. The Missed Call Index Q3 2026 models £2.3bn of trades revenue at risk — the data, the cost, and the fix.",
    images: [
      {
        url: "https://whoza.ai/og-image.webp",
        width: 1200,
        height: 630,
        alt: "The Missed Call Index — Q3 2026 Edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missed Call Index 2026: What Unanswered Calls Cost UK Trades",
    description:
      "A third of UK small-business calls go unanswered. The Missed Call Index Q3 2026 models £2.3bn of trades revenue at risk — the data, the cost, and the fix.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  other: {
    "article:published_time": "2026-08-04",
    "article:modified_time": "2026-08-04",
    "article:author": "Dru McPherson",
    "article:section": "Research",
    "article:tag": "Missed Calls, UK Trades, Revenue Loss, AI Receptionist, Call Answering",
  },
}

// ─── JSON-LD Block 1: Report + Dataset ───
const reportSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  "headline": "The Missed Call Index — Q3 2026 Edition",
  "author": {
    "@type": "Person",
    "name": "Dru McPherson",
    "jobTitle": "Founder",
    "worksFor": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
  },
  "publisher": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
  "datePublished": "2026-08-04",
  "about": "Unanswered calls to UK trades businesses: rates, costs and AI adoption",
  "mainEntity": {
    "@type": "Dataset",
    "name": "The Missed Call Index — Q3 2026",
    "description":
      "Quarterly index of unanswered call rates and revenue at risk for UK trades businesses, combining Whoza platform data with named third-party sources.",
    "creator": { "@type": "Organization", "name": "Whoza", "url": "https://whoza.ai" },
    "temporalCoverage": "2026-07/2026-09",
    "spatialCoverage": { "@type": "Place", "name": "United Kingdom" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
  },
}

// ─── JSON-LD Block 2: BreadcrumbList ───
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai" },
    { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://whoza.ai/research" },
    { "@type": "ListItem", "position": 3, "name": "The Missed Call Index — Q3 2026" },
  ],
}

// ─── JSON-LD Block 3: FAQPage + Speakable ───
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do missed calls cost UK tradespeople?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "£2.3 billion a year in revenue is at risk across UK trades businesses from unanswered calls.",
      },
    },
    {
      "@type": "Question",
      "name": "How many calls does a small business actually miss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A third of UK micro-businesses fail to answer their incoming calls.",
      },
    },
    {
      "@type": "Question",
      "name": "Do callers leave voicemail when tradespeople don't answer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "69% of callers who reach voicemail hang up without leaving a message.",
      },
    },
    {
      "@type": "Question",
      "name": "When do missed calls happen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Small and micro businesses are three times more likely than large ones to rely on voicemail.",
      },
    },
    {
      "@type": "Question",
      "name": "How many construction firms use AI to answer calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "88% of construction firms neither use AI nor plan to, according to the Government's own AI Adoption Research, while 16% of UK businesses overall already use it.",
      },
    },
  ],
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://whoza.ai/research/missed-call-index-q3-2026",
  "url": "https://whoza.ai/research/missed-call-index-q3-2026",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      ".intro-paragraph",
      "#finding-1 strong",
      "#finding-2 strong",
      "#finding-3 strong",
      "#finding-4 strong",
      "#finding-5 strong",
    ],
  },
}

export default function MissedCallIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      {/* ─── JSON-LD blocks ─── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ─── Header / Byline ─── */}
        <header className="mb-12">
          <p className="text-emerald-400 text-sm font-medium mb-4">
            Q3 2026 Field Report
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            The Missed Call Index — Q3 2026 Edition
          </h1>
          <p className="text-white/60 text-lg">
            A quarterly field report from Whoza on the calls UK trades businesses don&apos;t answer, written by{" "}
            <span className="text-white font-medium">Dru McPherson</span>, founder.
          </p>
        </header>

        {/* ─── Hero Image ─── */}
        <figure className="mb-12">
          <Image
            src="/images/hero_missed_call.webp"
            alt="A heating engineer up a ladder while a phone rings unanswered on his van dashboard — the £8,000 ladder problem"
            width={1280}
            height={720}
            priority
            fetchPriority="high"
            className="w-full rounded-xl"
            srcSet="/images/hero_missed_call-768.webp 768w, /images/hero_missed_call-1280.webp 1280w, /images/hero_missed_call-1600.webp 1600w"
          />
          <noscript>
            <img
              src="/images/hero_missed_call.png"
              alt="A heating engineer up a ladder while a phone rings unanswered on his van dashboard — the £8,000 ladder problem"
              className="w-full rounded-xl"
            />
          </noscript>
        </figure>

        {/* ─── Intro ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Intro: The £8,000 ladder problem</h2>
          <p className="intro-paragraph text-white/80 leading-relaxed text-lg mb-4">
            Fifteen years ago I lost an £8,000 boiler install because I was up a ladder in Cheltenham when the phone rang. It went to voicemail. The woman didn&apos;t leave a message. They never do. She rang the next plumber on Google, he answered, and he fitted her boiler, her sister&apos;s boiler, and her bathroom two years later. I know because he told me, in the pub, with the exact grin you&apos;d expect.
          </p>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            I carried that one for years. Every tradesperson I know has a version of the same story, and we all tell it like it&apos;s bad luck. It isn&apos;t luck. It&apos;s arithmetic. One unanswered call here, two there, and by Christmas you&apos;ve paid for somebody else&apos;s holiday.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            So we measured it. This is the first Missed Call Index: what we found, what it costs, and what the small minority who answer everything are doing differently.
          </p>
        </section>

        {/* ─── Headline Findings ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Headline findings</h2>

          <div id="finding-1" className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              1. Missed calls put £2.3bn of UK trades revenue at risk every year
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              <strong>
                £2.3 billion a year in revenue is at risk across UK trades businesses from unanswered calls.
              </strong>{" "}
              That&apos;s not a scare number. It&apos;s 885,000 construction businesses each losing, on a deliberately conservative model, about £2,600 a year in jobs that rang out. The full calculation is in &quot;What a missed call costs&quot;, and every input is sourced or declared. Argue with any input you like. The answer stays ugly.
            </p>
          </div>

          <div id="finding-2" className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              2. A third of small businesses fail to answer the phone
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              <strong>A third of UK micro-businesses fail to answer their incoming calls.</strong> One in three.
              That&apos;s from Moneypenny&apos;s Small Business Call Report, a proper survey of 300 micro-businesses backed by call data from 10,000 firms, not a marketing blog. If you get fifteen calls a week, five of them are ringing into a void.
            </p>
          </div>

          <div id="finding-3" className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              3. Voicemail loses 69% of callers before the beep
            </h3>
            <p className="text-white/80 leading-relaxed text-lg mb-4">
              <strong>69% of callers who reach voicemail hang up without leaving a message.</strong> Seven out of ten people who hit your recorded greeting are gone before the beep. Voicemail isn&apos;t a safety net. It&apos;s a polite way of telling customers to try your competitor.
            </p>
            <figure className="mb-4">
              <Image
                src="/images/chart_missed_call_funnel.webp"
                alt="Where a week of calls goes: 12 inbound calls, 4 unanswered (33%), roughly 3 of those callers hanging up at voicemail (69%). Source: Moneypenny Small Business Call Report, 2020."
                width={1280}
                height={720}
                loading="lazy"
                className="w-full rounded-xl"
                srcSet="/images/chart_missed_call_funnel-768.webp 768w, /images/chart_missed_call_funnel-1280.webp 1280w, /images/chart_missed_call_funnel-1600.webp 1600w"
              />
              <noscript>
                <img
                  src="/images/chart_missed_call_funnel.png"
                  alt="Where a week of calls goes: 12 inbound calls, 4 unanswered (33%), roughly 3 of those callers hanging up at voicemail (69%). Source: Moneypenny Small Business Call Report, 2020."
                  className="w-full rounded-xl"
                />
              </noscript>
              <figcaption className="text-sm text-white/50 mt-2">
                Where a week of calls goes: 12 inbound calls, 4 unanswered (33%), roughly 3 of those callers
                hanging up at voicemail (69%). Source: Moneypenny Small Business Call Report, 2020.
              </figcaption>
            </figure>
          </div>

          <div id="finding-4" className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              4. Small firms lean on voicemail three times as much as big ones — at exactly the wrong hours
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              <strong>Small and micro businesses are three times more likely than large ones to rely on voicemail</strong>{" "}
              (Moneypenny). And the phone rings hardest when you&apos;re least able to answer it: customers ring when the boiler dies and the fuse box trips, which is mornings, mostly, which is when you&apos;re under a floor. Tuesday at 9am is when you&apos;re flat out, and it&apos;s when Mrs Patterson&apos;s boiler gives up. (Whoza platform data on hourly patterns: pending Q3 export, see appendix.)
            </p>
          </div>

          <div id="finding-5" className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              5. 88% of construction firms don&apos;t use AI — and that&apos;s the opening
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              <strong>
                88% of construction firms neither use AI nor plan to, according to the Government&apos;s own AI
                Adoption Research, while 16% of UK businesses overall already use it.
              </strong>{" "}
              That&apos;s nearly nine in ten firms in our sector standing still while one in six across the economy moves. The few who answer every call will quietly take the work of everyone who doesn&apos;t.
            </p>
          </div>
        </section>

        {/* ─── Data by trade ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">The data by trade</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-6">
            Unanswered rates and peak windows are Whoza platform data (aggregate, anonymised, ~50 active trade
            businesses). Figures marked <strong>[PD]</strong> are reserved for the verified Q3 export and stay
            unpublished until it lands. Revenue-at-risk is modelled per &quot;What a missed call costs&quot;, with
            trade job values from Checkatrade&apos;s 2026 cost guides.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Trade
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Unanswered rate
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Peak missed-call window
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Est. revenue at risk / month
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">Plumber / heating engineer</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">~£217</td>
                  <td className="py-3 px-4 text-sm">Platform data [PD]; £50 avg job (Checkatrade 2026)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">Electrician</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">~£217</td>
                  <td className="py-3 px-4 text-sm">Platform data [PD]; £50 avg job (Checkatrade 2026)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">Locksmith</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">~£430</td>
                  <td className="py-3 px-4 text-sm">Platform data [PD]; £100 emergency call-out (Checkatrade 2026)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">Roofer / builder</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">[PD]</td>
                  <td className="py-3 px-4 text-sm">Withheld until export</td>
                  <td className="py-3 px-4 text-sm">Platform data [PD]</td>
                </tr>
                <tr className="bg-white/5 font-semibold">
                  <td className="py-3 px-4 text-sm">All trades (modelled average)</td>
                  <td className="py-3 px-4 text-sm">~33% (benchmark)</td>
                  <td className="py-3 px-4 text-sm">Weekday mornings</td>
                  <td className="py-3 px-4 text-sm">~£217</td>
                  <td className="py-3 px-4 text-sm">Moneypenny; DBT BPE 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── When the phone rings ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">When the phone rings</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            Customers don&apos;t ring when it&apos;s convenient for you. They ring when the school run reveals the leak and the commute reveals the &quot;we need someone today.&quot; Your busiest earning hours and your busiest ringing hours are the same hours. You can&apos;t solder a joint and take a booking at the same time. Something gives, and it&apos;s always the phone.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            We&apos;ll publish the exact hourly and day-of-week pattern with the verified Q3 platform export. For now, the benchmark: small firms lean on voicemail three times as much as large ones, and 69% of callers punished for it hang up.
          </p>
        </section>

        {/* ─── What a missed call costs ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What a missed call costs — the calculation, step by step</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            No hand-waving. Every input below is either sourced or labelled as our assumption.
          </p>
          <ol className="list-decimal list-inside space-y-3 text-white/80 leading-relaxed text-lg mb-6">
            <li>
              <strong>Businesses.</strong> 885,000 SMEs operate in UK construction, the largest sector by business
              count (Department for Business &amp; Trade, Business Population Estimates 2025).
            </li>
            <li>
              <strong>Missed calls.</strong> A third of small businesses fail to answer incoming calls
              (Moneypenny). We model a modest 15 inbound calls a week per business, of which a third, five calls, go
              unanswered. <em>Call volume is a stated modelling assumption, kept deliberately low.</em>
            </li>
            <li>
              <strong>Conversion.</strong> One in five missed calls would have become a paid job.{" "}
              <em>Stated conservative assumption.</em> That&apos;s one lost job a week.
            </li>
            <li>
              <strong>Job value.</strong> £50, the midpoint of a typical plumber&apos;s call-out fee (£40–£60,
              Checkatrade cost guides 2026). We use small-job value, not the £200–£600 full-job figures, to stay
              conservative.
            </li>
            <li>
              <strong>Per business per year.</strong> 1 job × £50 × 52 weeks = <strong>£2,600 a year</strong>. Call
              it <strong>£217 a month</strong>, walking to whoever answered instead.
            </li>
            <li>
              <strong>National total.</strong> £2,600 × 885,000 businesses = <strong>£2.3 billion a year.</strong>
            </li>
          </ol>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            Change an input and the number moves. Use Checkatrade&apos;s full-job average of £150 or more and it
            triples. We chose the smallest defensible version, because the smallest version is bad enough.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            If you&apos;d rather not watch £217 leave the business every month,{" "}
            <Link href="/pricing" className="text-emerald-400 hover:underline">
              see how Whoza answers every call
            </Link>
            .
          </p>
        </section>

        {/* ─── What the 6% know ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What the 6% know</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            The Government&apos;s AI Adoption Research (DSIT, fieldwork February–May 2025, 3,500 UK businesses) found
            16% of businesses now use AI. One in six. But in construction, 88% neither use it nor plan to. Strip out
            the planners and the firms actually using AI in construction come out in single figures: roughly six in a
            hundred, against 43% in information and communication (two in five) and 54% in a March 2026 British
            Chambers of Commerce member survey of SMEs (more than half).
          </p>
          <figure className="mb-4">
            <Image
              src="/images/chart_ai_adoption_gap.webp"
              alt="The AI adoption gap: 43% of information & communication businesses currently use AI, 16% of all UK businesses, and roughly 6% of construction firms (derived). Source: DSIT AI Adoption Research, fieldwork February–May 2025."
              width={1280}
              height={720}
              loading="lazy"
              className="w-full rounded-xl"
              srcSet="/images/chart_ai_adoption_gap-768.webp 768w, /images/chart_ai_adoption_gap-1280.webp 1280w, /images/chart_ai_adoption_gap-1600.webp 1600w"
            />
            <noscript>
              <img
                src="/images/chart_ai_adoption_gap.png"
                alt="The AI adoption gap: 43% of information & communication businesses currently use AI, 16% of all UK businesses, and roughly 6% of construction firms (derived). Source: DSIT AI Adoption Research, fieldwork February–May 2025."
                className="w-full rounded-xl"
              />
            </noscript>
            <figcaption className="text-sm text-white/50 mt-2">
              The AI adoption gap: 43% of information &amp; communication businesses currently use AI, 16% of all UK
              businesses, and roughly 6% of construction firms (derived). Source: DSIT AI Adoption Research, fieldwork
              February–May 2025.
            </figcaption>
          </figure>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            This isn&apos;t a lecture. I was the 94% for most of my working life; I didn&apos;t need an app to fit a
            bathroom. But here&apos;s what the 6% have worked out: AI in a trade business isn&apos;t robots laying
            bricks. It&apos;s someone answering the phone while you&apos;re laying bricks.
          </p>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            Construction sits among the least digitised sectors in Britain on the Government&apos;s own numbers. That
            gap isn&apos;t a failure of the trades. It&apos;s the biggest competitive opening we&apos;ve had in twenty
            years. The plumber who answers every call doesn&apos;t need to be cheaper, faster or better. He just needs
            to pick up. See{" "}
            <Link href="/compare" className="text-emerald-400 hover:underline">
              how Whoza compares to a traditional answering service
            </Link>
            .
          </p>
        </section>

        {/* ─── Method & sources ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Method &amp; sources (appendix)</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            <strong>Governance.</strong> Every figure traces to a named source below. Whoza platform data and
            third-party data are never blended. [PD] figures are withheld pending verified export. The £2.3bn
            aggregate is modelled, inputs shown above.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    #
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Figure claimed
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Source
                  </th>
                  <th scope="col" className="py-3 px-4 text-sm font-semibold text-white/70">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">1</td>
                  <td className="py-3 px-4 text-sm">33% of UK micro-businesses failed to answer incoming calls</td>
                  <td className="py-3 px-4 text-sm">
                    Moneypenny Small Business Call Report (300 micro-businesses surveyed; call data from 10,000 firms)
                  </td>
                  <td className="py-3 px-4 text-sm">2020, UK edition</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">2</td>
                  <td className="py-3 px-4 text-sm">69% of callers who reach voicemail hang up with no message</td>
                  <td className="py-3 px-4 text-sm">Moneypenny Small Business Call Report</td>
                  <td className="py-3 px-4 text-sm">2020</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">3</td>
                  <td className="py-3 px-4 text-sm">Small/micro firms 3× more likely than large ones to rely on voicemail</td>
                  <td className="py-3 px-4 text-sm">Moneypenny Small Business Call Report</td>
                  <td className="py-3 px-4 text-sm">2020</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">4</td>
                  <td className="py-3 px-4 text-sm">885,000 SMEs in UK construction (largest sector)</td>
                  <td className="py-3 px-4 text-sm">DBT, Business Population Estimates 2025</td>
                  <td className="py-3 px-4 text-sm">Start of 2025</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">5</td>
                  <td className="py-3 px-4 text-sm">16% of UK businesses (5+ staff) use AI; 43% in information &amp; communication</td>
                  <td className="py-3 px-4 text-sm">DSIT AI Adoption Research (3,500 interviews)</td>
                  <td className="py-3 px-4 text-sm">Fieldwork Feb–May 2025</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">6</td>
                  <td className="py-3 px-4 text-sm">88% of construction firms neither use nor plan AI; ~6% using (derived, shown above)</td>
                  <td className="py-3 px-4 text-sm">DSIT AI Adoption Research</td>
                  <td className="py-3 px-4 text-sm">As above</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">7</td>
                  <td className="py-3 px-4 text-sm">54% of SME Chamber members using AI</td>
                  <td className="py-3 px-4 text-sm">British Chambers of Commerce / Atos SME survey</td>
                  <td className="py-3 px-4 text-sm">March 2026</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">8</td>
                  <td className="py-3 px-4 text-sm">Plumber call-out £40–£60; emergency £100–£120+</td>
                  <td className="py-3 px-4 text-sm">Checkatrade cost guides (checkatrade.com)</td>
                  <td className="py-3 px-4 text-sm">2026</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">9</td>
                  <td className="py-3 px-4 text-sm">£2.3bn national figure</td>
                  <td className="py-3 px-4 text-sm">Modelled: 885,000 × £2,600 (inputs 1, 4, 8 plus declared assumptions)</td>
                  <td className="py-3 px-4 text-sm">Q3 2026</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm">10</td>
                  <td className="py-3 px-4 text-sm">Per-trade unanswered rates; time-of-day patterns</td>
                  <td className="py-3 px-4 text-sm">Whoza platform data, ~50 businesses</td>
                  <td className="py-3 px-4 text-sm font-semibold">[PD] pending Q3 2026 export</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/80 leading-relaxed text-lg mt-6">
            <strong>Declared assumptions (ours, not sourced):</strong> 15 inbound calls/week; 1-in-5
            missed-call-to-job conversion. Both deliberately conservative.
          </p>
          <p className="text-white/80 leading-relaxed text-lg mt-4">
            <strong>Deliberately excluded:</strong> the widely circulated &quot;62% of calls go unanswered&quot; and
            &quot;85% won&apos;t leave voicemail&quot; figures. Neither could be traced to a primary published source,
            so neither appears in this report.
          </p>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How much do missed calls cost UK tradespeople?</h3>
              <p className="text-white/80 leading-relaxed">
                £2.3 billion a year in revenue is at risk across UK trades businesses from unanswered calls.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How many calls does a small business actually miss?</h3>
              <p className="text-white/80 leading-relaxed">
                A third of UK micro-businesses fail to answer their incoming calls.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do callers leave voicemail when tradespeople don&apos;t answer?</h3>
              <p className="text-white/80 leading-relaxed">
                69% of callers who reach voicemail hang up without leaving a message.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">When do missed calls happen?</h3>
              <p className="text-white/80 leading-relaxed">
                Small and micro businesses are three times more likely than large ones to rely on voicemail.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How many construction firms use AI to answer calls?</h3>
              <p className="text-white/80 leading-relaxed">
                88% of construction firms neither use AI nor plan to, according to the Government&apos;s own AI
                Adoption Research, while 16% of UK businesses overall already use it.
              </p>
            </div>
          </div>
        </section>

        {/* ─── About Whoza ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">About Whoza</h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            <Link href="/" className="text-emerald-400 hover:underline">
              Whoza
            </Link>{" "}
            is the AI receptionist built for UK tradespeople. It answers every call, captures the job details and sends
            them straight to your WhatsApp, so you stay on the tools while your business stays on the phone. Founded
            by Dru McPherson, a former tradesperson. Journalists can request the full dataset.
          </p>
          <p className="text-white/80 leading-relaxed text-lg">
            <strong>Press contact:</strong>{" "}
            <a href="mailto:press@whoza.ai" className="text-emerald-400 hover:underline">
              press@whoza.ai
            </a>{" "}
            ·{" "}
            <Link href="/" className="text-emerald-400 hover:underline">
              whoza.ai
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
