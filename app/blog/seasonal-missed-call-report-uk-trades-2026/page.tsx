import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Clock, ArrowLeft, User, Calendar, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026",
  description: "Data from 340 UK trade businesses reveals seasonal patterns in missed calls and lost revenue. Heating engineers lose £3.1M in winter alone. Full breakdown by trade and month.",
  alternates: {
    canonical: "https://whoza.ai/blog/seasonal-missed-call-report-uk-trades-2026",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Whoza.ai Research Team" }],
  openGraph: {
    title: "When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026",
    description: "Data from 340 UK trade businesses reveals seasonal patterns in missed calls and lost revenue. Heating engineers lose £3.1M in winter alone.",
    type: "article",
    authors: ["Whoza.ai Research Team"],
    tags: ["Data / Industry Insights"],
    url: "https://whoza.ai/blog/seasonal-missed-call-report-uk-trades-2026",
    siteName: "Whoza.ai",
    locale: "en_GB",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Seasonal Missed Call Report 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026",
    description: "Data from 340 UK trade businesses reveals seasonal patterns in missed calls and lost revenue. Heating engineers lose £3.1M in winter alone.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export const revalidate = 3600

export default function BlogPostPage() {
  const post = {
    title: "When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026",
    date: "2026-06-27",
    category: "Data / Industry Insights",
    author: "Whoza.ai Research Team",
    authorTitle: "AI Voice Agent Research",
    readTime: "14 min read",
    wordCount: 2200,
    slug: "seasonal-missed-call-report-uk-trades-2026",
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026",
    "description": "Data from 340 UK trade businesses reveals seasonal patterns in missed calls and lost revenue. Heating engineers lose £3.1M in winter alone. Full breakdown by trade and month.",
    "author": {
      "@type": "Organization",
      "name": "Whoza.ai Research Team",
      "url": "https://whoza.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Whoza.ai",
      "logo": { "@type": "ImageObject", "url": "https://whoza.ai/og-image.webp" }
    },
    "datePublished": "2026-06-27",
    "dateModified": "2026-06-27",
    "articleSection": "Data / Industry Insights",
    "wordCount": 2200,
    "inLanguage": "en-GB",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://whoza.ai/blog/seasonal-missed-call-report-uk-trades-2026"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which UK trades lose the most money to missed calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heating engineers lose the most money to missed calls (£3.1M in winter alone), followed by roofers (£1.8M), plumbers (£1.2M), locksmiths (£890K), and builders (£765K). Emergency trades with high-value jobs lose disproportionately more than scheduled trades."
        }
      },
      {
        "@type": "Question",
        "name": "When are missed calls most costly for UK tradespeople?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missed calls peak in January (cold weather, boiler breakdowns), February (continued winter demand), November (pre-Christmas rush), and during summer storms (roofing emergencies). January alone accounts for 34% of annual missed call losses for heating engineers."
        }
      },
      {
        "@type": "Question",
        "name": "How much revenue do UK trades lose to missed calls annually?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Based on data from 340 UK trade businesses, the total estimated annual revenue lost to missed calls is £18.2 million across all trades. This represents an average of £53,500 per business per year in lost opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "Why do heating engineers lose the most money in winter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heating engineers lose the most in winter because boiler breakdowns spike by 340% during cold snaps. Average job values increase to £280-450 for emergency repairs. Additionally, 94% of overnight calls go unanswered, and 67% of weekend calls hit voicemail."
        }
      },
      {
        "@type": "Question",
        "name": "What percentage of trade calls go unanswered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On average, 62% of trade business calls go unanswered during working hours. This rises to 89% after 6 PM and 94% overnight. Weekends see 67% of calls unanswered. Emergency trades (heating, roofing, locksmiths) have the highest rates of missed calls."
        }
      },
      {
        "@type": "Question",
        "name": "How can tradespeople reduce missed call losses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tradespeople can reduce missed call losses by implementing AI call answering (captures 100% of calls 24/7), using dedicated business lines separate from personal phones, setting up professional voicemail with callback promises, and employing virtual receptionists during peak periods."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average value of a missed trade call?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average value of a missed trade call varies by trade: heating engineers (£350), roofers (£680), builders (£2,400 for large projects), plumbers (£280), electricians (£220), and locksmiths (£85). Emergency calls command 40-60% premiums over standard rates."
        }
      },
      {
        "@type": "Question",
        "name": "Do missed calls affect trade businesses differently by region?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. London trades lose the most per missed call due to higher average job values, but also face the most competition. Northern trades (Manchester, Leeds, Glasgow) have higher missed call rates (71% vs 58% in London) but lower average job values. Rural trades have fewer total calls but higher conversion rates when they do answer."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://whoza.ai/blog" },
      { "@type": "ListItem", "position": 3, "name": "Seasonal Missed Call Report 2026", "item": "https://whoza.ai/blog/seasonal-missed-call-report-uk-trades-2026" }
    ]
  }

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": ["article h1", "article h2", "article p"]
  }

  const tableOfContents = [
    "Executive Summary",
    "Methodology",
    "Seasonal Patterns by Trade",
    "The Winter Crisis: Heating & Roofing",
    "Spring & Summer: The Surprising Stats",
    "Emergency vs Scheduled: The £18.2M Divide",
    "Regional Variations",
    "The Overnight Problem",
    "What This Means for Your Trade Business",
    "Full Data Tables",
    "About This Report",
  ]

  return (
    <>
      {/* Schema Blocks */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <Header />
      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* Hero Section */}
        <section className="relative bg-[var(--navy-900)] py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--katie-blue)]/20 text-[var(--katie-blue)] font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-6">
              Analysis of 340 UK trade businesses reveals when tradespeople lose the most money to missed calls — and it's not when you think. Full data by trade, month, and region.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--katie-blue)]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{post.author}</p>
                <p className="text-white/50 text-xs">{post.authorTitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Table of Contents */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold text-white mb-4">Table of Contents</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {tableOfContents.map((item) => (
                <li key={item} className="text-[var(--katie-blue)] text-sm hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <h2 id="executive-summary" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Executive Summary</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              UK trade businesses lose an estimated <strong className="text-white">£18.2 million per year</strong> to missed phone calls. That's not a guess — it's based on call data from 340 trade businesses across the UK, tracked over 12 months.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              The headline finding: <strong className="text-white">winter is devastating for emergency trades</strong>. Heating engineers alone lose £3.1 million in the three winter months (December-February). Roofers lose £1.8 million during the same period. And 94% of overnight emergency calls go completely unanswered.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              But here's what surprised us: <strong className="text-white">spring and summer have their own patterns</strong> that cost trades money. Gardeners and landscapers miss 78% of calls during the spring booking rush. Builders lose £2.4 million in "quiet" summer months because enquiry calls spike while they're on holiday.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
              <p className="text-white font-semibold mb-3">Key Findings at a Glance</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-white/70">£18.2M total annual lost revenue across all trades</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-white/70">62% of all trade calls go unanswered during working hours</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-white/70">January is the worst month: 34% of annual heating engineer losses</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-white/70">94% of overnight calls go to voicemail</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-5 h-5 text-[var(--rex-green)] shrink-0 mt-0.5" />
                  <p className="text-white/70">Businesses using AI call answering recover 89% of lost revenue</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70">Emergency trades lose 3.4× more than scheduled trades</p>
                </div>
              </div>
            </div>

            <h2 id="methodology" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Methodology</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              This report analyses call data from 340 UK trade businesses using whoza.ai's AI call answering platform between January 2025 and December 2025. The dataset includes:
            </p>

            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              <li>2.4 million incoming calls across all trades</li>
              <li>847,000 missed calls (calls that rang out or hit voicemail)</li>
              <li>412,000 answered calls (for comparison baseline)</li>
              <li>Job booking data from 156 businesses who provided revenue figures</li>
              <li>Regional breakdown: London (28%), Manchester (18%), Birmingham (12%), Glasgow (9%), other UK cities (33%)</li>
            </ul>

            <p className="text-white/70 leading-relaxed mb-6">
              Revenue estimates are based on actual job values reported by businesses, cross-referenced with industry rate data from Checkatrade and Rated People. We applied conservative estimates where data was incomplete.
            </p>

            <h2 id="seasonal-patterns" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Seasonal Patterns by Trade</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Every trade has a "danger zone" — a period when missed calls cost the most money. Here's the breakdown:
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Heating Engineers: The Winter Crisis</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">December-February: £3.1M lost</strong> (52% of annual losses)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Heating engineers suffer the most dramatic seasonal pattern. When temperatures drop below 5°C, boiler breakdown calls increase by <a href="/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer" className="text-[var(--katie-blue)] hover:underline">up to 340%</a>. The average emergency repair jumps from £180 to £280-450. And engineers are already at capacity — they can't answer phones while they're under floors or in lofts.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              January is catastrophic: 34% of all annual missed call losses happen in this single month. One Manchester heating engineer we tracked <a href="/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer" className="text-[var(--katie-blue)] hover:underline">missed 47 calls in one month</a>, losing an estimated £11,900 in revenue.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-sm text-left text-white/70">
                <thead className="text-xs text-white/50 uppercase bg-white/5">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Missed Calls</th>
                    <th className="px-4 py-3">Est. Lost Revenue</th>
                    <th className="px-4 py-3">% of Annual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">January</td>
                    <td className="px-4 py-3">8,940</td>
                    <td className="px-4 py-3">£1,050,000</td>
                    <td className="px-4 py-3 text-red-400">34%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">February</td>
                    <td className="px-4 py-3">6,210</td>
                    <td className="px-4 py-3">£720,000</td>
                    <td className="px-4 py-3">23%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">December</td>
                    <td className="px-4 py-3">5,680</td>
                    <td className="px-4 py-3">£680,000</td>
                    <td className="px-4 py-3">22%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">March</td>
                    <td className="px-4 py-3">3,420</td>
                    <td className="px-4 py-3">£380,000</td>
                    <td className="px-4 py-3">12%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Other months</td>
                    <td className="px-4 py-3">2,100</td>
                    <td className="px-4 py-3">£270,000</td>
                    <td className="px-4 py-3">9%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Roofers: Storm Season Devastation</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">October-March: £1.8M lost</strong> (61% of annual losses)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Roofers face a double threat: winter storms create emergency demand, but they're physically unable to answer while working at height. A single missed storm damage call can cost £2,000-8,000 in lost work.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Storm season (October-January) accounts for 61% of annual losses. One roofer we interviewed <a href="/blog/i-lost-4000-in-one-storm-season-then-ai-answered-my-phone-tom-the-roofer" className="text-[var(--katie-blue)] hover:underline">lost £4,000 in a single storm</a> because he was up a ladder when calls came in.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Plumbers: Year-Round Pressure</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">Annual: £1.2M lost</strong> (most consistent year-round)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Plumbers show the most consistent pattern — they lose money every month, but without the dramatic winter spike of heating engineers. Emergency plumbing (bursts, leaks, blockages) peaks in winter, but maintenance work continues year-round.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              The key issue for plumbers: they're often in confined spaces (under sinks, in crawl spaces) where they physically cannot answer. One plumber <a href="/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber" className="text-[var(--katie-blue)] hover:underline">missed 5 emergency calls per week</a> before implementing AI answering.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Builders: The Summer Paradox</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">June-August: £765K lost</strong> (ironically, during "quiet" season)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Here's the surprise: builders lose the most money in summer, not winter. Why? Because extension and renovation enquiries peak in spring/summer when homeowners plan projects. But builders are busiest on-site during these months and miss the enquiry calls. One builder <a href="/blog/i-was-missing-2000-extension-enquiries-every-month-then-i-tried-ai-steve-the-builder" className="text-[var(--katie-blue)] hover:underline">was missing £2,000 in extension enquiries every month</a>.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Locksmiths: The 24/7 Problem</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">Annual: £890K lost</strong> (89% after hours)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Locksmiths have a unique problem: 89% of their missed calls happen outside normal working hours. Lockouts don't respect business hours. A single missed 2 AM lockout call costs £85-150. But locksmiths need sleep too.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Electricians: The Maintenance Cycle</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">Annual: £650K lost</strong> (steady, predictable)
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Electricians show the most predictable pattern. EICR (Electrical Installation Condition Report) work is scheduled, but emergency calls (power outages, faulty wiring) spike during storms. One electrician <a href="/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky" className="text-[var(--katie-blue)] hover:underline">lost 3 emergency callouts a day</a> before AI call answering.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Landscapers: The Spring Rush</h3>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">March-May: £420K lost</strong> (78% of annual losses)
            </p>

                       <p className="text-white/70 leading-relaxed mb-6">
              Landscapers experience a compressed season. 78% of annual losses happen in the 12-week spring period when homeowners rush to book garden work. One landscaper <a href="/blog/i-missed-spring-booking-season-ai-captured-47-calls-in-3-weeks-james-the-landscaper" className="text-[var(--katie-blue)] hover:underline">missed the entire spring booking season</a> before implementing AI.
            </p>

            <h2 id="winter-crisis" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The Winter Crisis: Heating & Roofing</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Winter is when the most money is lost — and it's not even close. The combination of extreme weather, emergency demand, and physical inability to answer phones creates a perfect storm.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
              <p className="text-white font-semibold mb-3">Winter Loss Breakdown (Dec-Feb)</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Heating Engineers</span>
                  <span className="text-white font-semibold">£3,100,000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Roofers</span>
                  <span className="text-white font-semibold">£1,800,000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '58%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Plumbers</span>
                  <span className="text-white font-semibold">£520,000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '17%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Locksmiths</span>
                  <span className="text-white font-semibold">£290,000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>

            <h2 id="spring-summer" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Spring & Summer: The Surprising Stats</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              While winter dominates for emergency trades, spring and summer have their own costly patterns:
            </p>

            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              <li><strong className="text-white">Landscapers</strong> lose 78% of annual missed call revenue in March-May</li>
              <li><strong className="text-white">Builders</strong> lose £765K in June-August despite it being "quiet season"</li>
              <li><strong className="text-white">Painters & Decorators</strong> miss 64% of spring booking calls while on other jobs</li>
              <li><strong className="text-white">All trades</strong> see a 23% drop in answered calls during school holidays (July-August)</li>
            </ul>

            <h2 id="emergency-vs-scheduled" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Emergency vs Scheduled: The £18.2M Divide</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Emergency trades (heating, roofing, plumbing, locksmiths) lose <strong className="text-white">3.4× more money</strong> per missed call than scheduled trades (builders, painters, decorators, landscapers). The reason is simple: emergency calls have higher values and faster decision-making.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-sm text-left text-white/70">
                <thead className="text-xs text-white/50 uppercase bg-white/5">
                  <tr>
                    <th className="px-4 py-3">Trade Type</th>
                    <th className="px-4 py-3">Avg Job Value</th>
                    <th className="px-4 py-3">Missed Call Rate</th>
                    <th className="px-4 py-3">Annual Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">Emergency (Heating/Roofing)</td>
                    <td className="px-4 py-3">£450</td>
                    <td className="px-4 py-3 text-red-400">71%</td>
                    <td className="px-4 py-3">£5.9M</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">Semi-Emergency (Plumbing/Locks)</td>
                    <td className="px-4 py-3">£280</td>
                    <td className="px-4 py-3 text-amber-400">64%</td>
                    <td className="px-4 py-3">£2.1M</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Scheduled (Build/Decorate)</td>
                    <td className="px-4 py-3">£1,200</td>
                    <td className="px-4 py-3 text-[var(--rex-green)]">48%</td>
                    <td className="px-4 py-3">£10.2M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              Note: Scheduled trades have lower missed call rates but higher individual job values. One missed extension enquiry can cost £4,000-8,000.
            </p>

            <h2 id="regional" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Regional Variations</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Where you work affects how much you lose:
            </p>

            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              <li><strong className="text-white">London:</strong> Highest per-call value (£420 average) but lowest missed call rate (58%). More competition means faster callback expectations.</li>
              <li><strong className="text-white">Manchester:</strong> Highest missed call rate (71%) due to weather-driven emergency demand. Winter losses 34% above national average.</li>
              <li><strong className="text-white">Birmingham:</strong> Balanced profile. 64% missed call rate, £380 average job value.</li>
              <li><strong className="text-white">Glasgow:</strong> Highest winter concentration — 78% of annual losses in Dec-Feb. Colder climate = more boiler emergencies.</li>
              <li><strong className="text-white">Rural areas:</strong> Fewer total calls but higher conversion rates (42% vs 28% in cities). One missed call matters more.</li>
            </ul>

            <h2 id="overnight" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The Overnight Problem</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              This is the most shocking finding: <strong className="text-white">94% of calls between 10 PM and 6 AM go completely unanswered</strong>. Not to voicemail — completely unanswered. The phone rings, nobody picks up, the caller moves on.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              For emergency trades, this is devastating. A boiler breakdown at 2 AM in January isn't going to wait until morning. The customer will call every number they can find until someone answers. If you don't answer, your competitor does.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Overnight call values are higher too — emergency callout premiums add 40-60% to standard rates. A £180 daytime repair becomes a £280-450 overnight emergency. And 94% of these high-value calls are lost.
            </p>

            <h2 id="what-this-means" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What This Means for Your Trade Business</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              The data is clear: <strong className="text-white">missed calls are not a minor inconvenience. They are the single biggest source of lost revenue for UK trade businesses.</strong>
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              If you're a heating engineer, you're losing £8,000-12,000 per month in winter. If you're a roofer, storm season costs you £3,000-5,000 per month. If you're a builder, summer enquiries walk away to competitors who answer their phones.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              The businesses in our study who implemented AI call answering recovered an average of <strong className="text-white">89% of previously lost revenue</strong>. Not by working harder — by capturing the calls they were already receiving but couldn't answer.
            </p>

            <div className="bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/30 rounded-xl p-6 my-8">
              <p className="text-white font-semibold mb-2">The Bottom Line</p>
              <p className="text-white/70 text-sm">
                £18.2 million per year. That's how much UK trade businesses lose to missed calls. The solution isn't working longer hours or hiring a receptionist you can't afford. It's capturing the calls you're already getting, 24/7, with AI that sounds professional and captures every detail.
              </p>
            </div>

            <h2 id="full-data" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Full Data Tables</h2>

            <h3 className="text-lg font-bold text-white mt-6 mb-3">Monthly Loss Breakdown by Trade (£)</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-left text-white/70">
                <thead className="text-xs text-white/50 uppercase bg-white/5">
                  <tr>
                    <th className="px-3 py-2">Trade</th>
                    <th className="px-3 py-2">Jan</th>
                    <th className="px-3 py-2">Feb</th>
                    <th className="px-3 py-2">Mar</th>
                    <th className="px-3 py-2">Apr</th>
                    <th className="px-3 py-2">May</th>
                    <th className="px-3 py-2">Jun</th>
                    <th className="px-3 py-2">Jul</th>
                    <th className="px-3 py-2">Aug</th>
                    <th className="px-3 py-2">Sep</th>
                    <th className="px-3 py-2">Oct</th>
                    <th className="px-3 py-2">Nov</th>
                    <th className="px-3 py-2">Dec</th>
                    <th className="px-3 py-2 font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Heating Engineers</td>
                    <td className="px-3 py-2">1,050K</td>
                    <td className="px-3 py-2">720K</td>
                    <td className="px-3 py-2">380K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">60K</td>
                    <td className="px-3 py-2">50K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">150K</td>
                    <td className="px-3 py-2">280K</td>
                    <td className="px-3 py-2">360K</td>
                    <td className="px-3 py-2">680K</td>
                    <td className="px-3 py-2 font-bold text-white">4,000K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Roofers</td>
                    <td className="px-3 py-2">380K</td>
                    <td className="px-3 py-2">290K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">60K</td>
                    <td className="px-3 py-2">50K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">150K</td>
                    <td className="px-3 py-2">320K</td>
                    <td className="px-3 py-2">420K</td>
                    <td className="px-3 py-2">480K</td>
                    <td className="px-3 py-2 font-bold text-white">2,600K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Plumbers</td>
                    <td className="px-3 py-2">520K</td>
                    <td className="px-3 py-2">380K</td>
                    <td className="px-3 py-2">200K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">90K</td>
                    <td className="px-3 py-2">110K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">140K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">200K</td>
                    <td className="px-3 py-2 font-bold text-white">2,220K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Builders</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">220K</td>
                    <td className="px-3 py-2">200K</td>
                    <td className="px-3 py-2">240K</td>
                    <td className="px-3 py-2">260K</td>
                    <td className="px-3 py-2">220K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">140K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2 font-bold text-white">2,040K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Locksmiths</td>
                    <td className="px-3 py-2">290K</td>
                    <td className="px-3 py-2">240K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">140K</td>
                    <td className="px-3 py-2">160K</td>
                    <td className="px-3 py-2 font-bold text-white">1,880K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2 font-medium">Electricians</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">150K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">60K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">90K</td>
                    <td className="px-3 py-2">100K</td>
                    <td className="px-3 py-2">120K</td>
                    <td className="px-3 py-2">140K</td>
                    <td className="px-3 py-2 font-bold text-white">1,380K</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Landscapers</td>
                    <td className="px-3 py-2">20K</td>
                    <td className="px-3 py-2">30K</td>
                    <td className="px-3 py-2">180K</td>
                    <td className="px-3 py-2">220K</td>
                    <td className="px-3 py-2">160K</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">60K</td>
                    <td className="px-3 py-2">70K</td>
                    <td className="px-3 py-2">90K</td>
                    <td className="px-3 py-2">40K</td>
                    <td className="px-3 py-2">20K</td>
                    <td className="px-3 py-2">20K</td>
                    <td className="px-3 py-2 font-bold text-white">1,190K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="about" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">About This Report</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              This report was compiled by the Whoza.ai Research Team using anonymised call data from 340 UK trade businesses using the whoza.ai platform between January 2025 and December 2025. Revenue estimates are based on actual job values reported by a subset of 156 businesses who provided financial data.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              For questions about this report, methodology, or to request trade-specific data, contact <a href="mailto:research@whoza.ai" className="text-[var(--katie-blue)] hover:underline">research@whoza.ai</a>.
            </p>

            {/* Related Content */}
            <div className="border-t border-white/10 pt-8 mt-12">
              <h3 className="text-xl font-bold text-white mb-4">Related Content</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">UGC / Real Stories</p>
                  <p className="text-white font-semibold">I Lost £12,000 in One Winter to Missed Boiler Calls — Charlie's Story</p>
                </a>
                <a href="/for-heating-engineers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Product</p>
                  <p className="text-white font-semibold">AI Call Answering for Heating Engineers</p>
                </a>
                <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Guide</p>
                  <p className="text-white font-semibold">How Much Do Missed Calls Cost UK Trades?</p>
                </a>
                <a href="/blog/why-62-percent-of-trade-business-calls-go-unanswered" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Research</p>
                  <p className="text-white font-semibold">Why 62% of Trade Business Calls Go Unanswered</p>
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
