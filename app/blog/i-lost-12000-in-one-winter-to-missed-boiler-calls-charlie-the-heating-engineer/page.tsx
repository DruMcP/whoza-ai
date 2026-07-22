import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Clock, ArrowLeft, User, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "I Lost £12,000 to Missed Boiler Calls | whoza.ai",
  description: "Heating engineer shares 4-week winter diary. 47 missed boiler calls, £12,000 lost revenue. How AI call answering recovered £8,400. Real numbers. 2026.",
  alternates: {
    canonical: "https://whoza.ai/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Charlie Hardcastle" }],
  openGraph: {
    title: "I Lost £12,000 to Missed Boiler Calls | whoza.ai",
    description: "Heating engineer shares 4-week winter diary. 47 missed boiler calls, £12,000 lost revenue. How AI call answering recovered £8,400. Real numbers. 2026.",
    type: "article",
    authors: ["Charlie Hardcastle"],
    tags: ["UGC / Real Stories"],
    url: "https://whoza.ai/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer",
    siteName: "Whoza.ai",
    locale: "en_GB",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "I Lost £12,000 in One Winter to Missed Boiler Calls" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "I Lost £12,000 to Missed Boiler Calls | whoza.ai",
    description: "Heating engineer shares 4-week winter diary. 47 missed boiler calls, £12,000 lost revenue. How AI call answering recovered £8,400. Real numbers. 2026.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export const revalidate = 3600

export default function BlogPostPage() {
  const post = {
    title: "I Lost £12,000 in One Winter to Missed Boiler Calls. Here's the Exact Maths.",
    date: "2026-06-27",
    category: "UGC / Real Stories",
    author: "Charlie Hardcastle",
    authorTitle: "Self-Employed Heating Engineer, Manchester",
    readTime: "12 min read",
    wordCount: 1850,
    slug: "i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer",
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "I Lost £12,000 in One Winter to Missed Boiler Calls",
    "description": "Self-employed heating engineer from Manchester shares 4-week winter diary using AI call answering. 47 missed boiler calls, £12,000 lost revenue, and how AI call answering changed everything.",
    "author": {
      "@type": "Person",
      "name": "Charlie Hardcastle",
      "jobTitle": "Self-Employed Heating Engineer",
      "worksFor": { "@type": "Organization", "name": "Whoza.ai" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Whoza.ai",
      "logo": { "@type": "ImageObject", "url": "https://whoza.ai/og-image.webp" }
    },
    "datePublished": "2026-06-27",
    "dateModified": "2026-06-27",
    "articleSection": "UGC / Real Stories",
    "wordCount": 1850,
    "inLanguage": "en-GB",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://whoza.ai/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much revenue can heating engineers lose to missed calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heating engineers can lose £8,000-12,000 per month in winter due to missed boiler breakdown calls. In January 2026, one Manchester-based heating engineer missed 47 calls worth an estimated £11,900 in lost revenue."
        }
      },
      {
        "@type": "Question",
        "name": "Why do heating engineers miss so many calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heating engineers miss calls because they work in environments where they cannot answer: under floors, in lofts, in airing cupboards, and during after-hours emergencies. 94% of overnight calls go unanswered."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI call answering work for heating engineers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI call answering captures every missed call, asks qualifying questions about the boiler fault, property type, and urgency, then sends a structured WhatsApp message with all details within 3 seconds."
        }
      },
      {
        "@type": "Question",
        "name": "What information does the AI capture from boiler breakdown calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The AI captures: boiler make and model, fault description or error code, property type and age, whether vulnerable occupants are present, contact details, postcode, and estimated job value."
        }
      },
      {
        "@type": "Question",
        "name": "How much does AI call answering cost for heating engineers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI call answering for heating engineers starts at £59/month for the Starter plan. The Growth plan at £125/month includes 20 jobs and Zapier integration. Most heating engineers recover the cost within the first captured call."
        }
      },
      {
        "@type": "Question",
        "name": "When are heating engineers busiest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heating engineers are busiest in January and February during cold snaps, when boiler breakdowns increase by up to 340%. December is also busy with pre-Christmas emergency repairs."
        }
      },
      {
        "@type": "Question",
        "name": "Do customers mind speaking to AI instead of a human?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most customers appreciate immediate response over waiting for voicemail. One heating engineer reported that customers were 'thrilled someone answered' at 2 AM, even though it was AI. The key is professional, empathetic response and instant callback."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ROI of AI call answering for heating engineers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "One Manchester heating engineer recovered £8,400 in captured call revenue in one month at a cost of £125/month — a 6,620% ROI. Net gain after subscription cost: £8,275."
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
      { "@type": "ListItem", "position": 3, "name": "I Lost £12,000 in Winter Boiler Calls", "item": "https://whoza.ai/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer" }
    ]
  }

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": ["article h1", "article h2", "article p"]
  }

  return (
    <>
      {/* Schema Blocks */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
        { name: "I Lost £12,000 to Missed Boiler Calls", item: "https://whoza.ai/blog/i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer" },
      ]} />
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
              Self-employed heating engineer from Manchester shares 4-week winter diary using AI call answering. Real numbers. No BS. Boiler breakdowns, emergency callouts, and after-hours emergencies. £8,400 recovered in 4 weeks.
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
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              <strong>5 AM. December 15th. Minus 4 degrees. My phone rings. I'm asleep.</strong>
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Voicemail at 7 AM: "It's Pat from Didsbury. Our boiler's gone completely. Three kids under ten, no heating, no hot water. I've called four engineers and you're the only one who didn't answer."
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              I called back at 7:15. She'd already booked someone else. £280 callout plus a new pump. Total job value: £650. Gone. Because I was asleep.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              That was the fourth one that week. And it was only Tuesday.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              I'm Charlie. Heating engineer from Chorlton, Manchester. 9 years self-employed. Gas Safe registered. Boilers, central heating, underfloor, annual services, landlord certificates. I cover south Manchester — Didsbury, Chorlton, Whalley Range, Stretford, Salford Quays. And this is exactly how much money I was losing to missed calls last winter.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How many boiler calls do heating engineers actually miss?</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              I counted. Properly. For the whole of January before signing up to whoza.ai.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Week 1: 14 missed. Week 2: 11 missed. Week 3: 13 missed. Week 4: 9 missed.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              That's 47 missed calls in one month. January 2026. The coldest January in Manchester for 8 years according to the Met Office.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Out of those 47, I worked out roughly 34 were genuine jobs. The rest were existing customers chasing invoices, suppliers, recruitment agencies, and one confused bloke who thought I was a pizza shop.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              But 34 real boiler and heating enquiries? In one month? And I missed them because:
            </p>

            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              <li>18 were while I was on other jobs (under floors, in lofts, in airing cupboards where you can't hear the phone)</li>
              <li>12 were between 6 PM and 8 AM (evenings and mornings, when I'm off the clock)</li>
              <li>4 were during my daughter's Saturday football matches (I'm not giving those up)</li>
            </ul>

            <p className="text-white/70 leading-relaxed mb-6">
              The worst? Saturday, January 11th, 2:37 AM. Minus 6 degrees. Family in Salford — young baby, boiler completely dead. I slept through the call. They got through to voicemail, left a message, then called the next number. My competitor charged them £380 for an emergency callout. New PCB board. Total job: £890. I would have done it for £680. They paid £210 more because I didn't answer my phone.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              And here's the maths that made me sign up. I worked it out on a Sunday afternoon with a calculator and a cup of tea.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              34 genuine missed calls × average job value of £350 = £11,900 in lost revenue. In one month. That's not theoretical. That's actual jobs I could have done, that went to other engineers because I didn't answer.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What happened when Katie started answering my boiler calls?</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              <a href="/blog/i-worked-out-i-was-losing-30000-a-year-to-missed-calls-mark-the-gas-engineer" className="text-[var(--katie-blue)] hover:underline">Mark the gas engineer from Glasgow</a> put me onto whoza.ai. Said Katie was answering his calls and sending WhatsApp messages with everything he needed. I was sceptical. AI answering phones for heating emergencies? Sounds like one of those rubbish chatbots that puts you through 8 menus before hanging up.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              But Mark showed me his phone. WhatsApp message from Katie:
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
              <p className="text-white font-semibold mb-2">New Enquiry — Katie</p>
              <p className="text-white/80 text-sm mb-1"><strong>Boiler breakdown, 06:23</strong></p>
              <p className="text-white/70 text-sm">Name: Margaret Chen</p>
              <p className="text-white/70 text-sm">Phone: 07XXX XXXXXX</p>
              <p className="text-white/70 text-sm">Postcode: M20 6JA</p>
              <p className="text-white/70 text-sm">Job: Vaillant Ecotec — no heating or hot water, flashing fault code F.75</p>
              <p className="text-white/70 text-sm">Urgency: Emergency — elderly customer, 82, no heating overnight</p>
              <p className="text-white/70 text-sm">Property: 1960s semi-detached, owned</p>
              <p className="text-white/70 text-sm">Estimated Value: £180-280 callout</p>
              <p className="text-white/70 text-sm">Fault: Pump seizure suspected — mentions loud grinding noise before failure</p>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              All that from a phone call. And Katie sounded proper. Not robotic. She asked about the boiler make, the fault code, the property type, whether there were vulnerable occupants. All the questions I'd ask myself if I was answering.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              I signed up for the 7-day free trial. No credit card. Thought I'd test it and cancel if it was rubbish.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Week 1 with Katie: The numbers</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Monday: Katie answered 4 calls I missed. Two proper jobs. One was a landlord with 8 properties in Whalley Range needing annual service certificates. £1,600 of guaranteed annual work. I would have missed it because I was bleeding a radiator in Stretford.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Tuesday: Katie answered 3 calls. One was a 5 AM emergency — boiler failure in a care home in Salford. Six residents, no heating. £450 emergency callout. I called back at 6:30 AM and had it fixed by 8. The manager said she'd called three engineers. Only Katie answered.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Wednesday: 5 calls captured. Two were system upgrades. One was a smart thermostat installation. £340 job.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Thursday: 4 calls. One was a nightmare — Worcester Bosch combi with a failed diverter valve. Customer had already been quoted £1,200 by another engineer. I did it for £780. Katie had captured the exact model number, the fault description, and the fact the customer had been quoted already. I called back knowing exactly what parts to bring.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Friday to Sunday: 6 more calls captured. Three jobs booked. Total for the week: 22 calls answered, 11 jobs booked. Revenue from captured calls: £3,400.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Week 4: The maths</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              After 4 weeks with Katie, I sat down and did the same calculation.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
              <p className="text-white/70 text-sm mb-1">Total calls Katie answered: <strong className="text-white">89</strong></p>
              <p className="text-white/70 text-sm mb-1">Total genuine enquiries: <strong className="text-white">63</strong></p>
              <p className="text-white/70 text-sm mb-1">Total jobs booked: <strong className="text-white">28</strong></p>
              <p className="text-white/70 text-sm mb-1">Total revenue from captured calls: <strong className="text-[var(--rex-green)]">£8,400</strong></p>
              <p className="text-white/70 text-sm mb-1">Cost of whoza.ai Growth plan: <strong className="text-white">£125/month</strong></p>
              <p className="text-white font-semibold mt-3">Net gain: £8,275 in one month</p>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              That's not a typo. Eight thousand two hundred and seventy-five pounds. In one winter month. From calls I would have missed.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The jobs I would have definitely lost without Katie</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              January 18th, 11:47 PM: Boiler breakdown in a nursery in Chorlton. 34 children. No heating. £580 emergency callout. I was asleep. Katie captured it. I was there by 7 AM.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              January 22nd, 6:15 AM: Pensioner in Didsbury. Boiler pressure at zero, leaking from underneath. £220 callout plus new pressure relief valve. I was having breakfast. Katie got it. I called back within 10 minutes.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              January 29th, 2:22 PM: Estate agent in Salford Quays. Four rental properties need gas safety certificates by end of week. £800 of certified work. I was in a loft space with no signal. Katie answered, captured all four addresses, and the deadline.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Every single one of those would have gone to a competitor. Every one.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The honest downsides (because nothing's perfect)</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              I've got to be honest. It's not all perfect. Two things:
            </p>

            <ol className="list-decimal list-inside text-white/70 space-y-2 mb-6">
              <li>Katie occasionally gets the boiler model wrong if the caller doesn't know it. About 1 in 10 times, she'll put "boiler" instead of "Worcester Bosch Greenstar 30i". Not a big deal — I always confirm when I call back.</li>
              <li>One customer thought Katie was a real person and tried to book a specific time. Katie explained I wasn't available and would call back, but the customer got a bit confused. Sorted it when I called back.</li>
            </ol>

            <p className="text-white/70 leading-relaxed mb-6">
              Neither of those cost me a single job. And both are massively outweighed by the 28 jobs I captured.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Would I go back to voicemail? Never.</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              I used to think voicemail was fine. "They'll leave a message and I'll call back." They don't. <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="text-[var(--katie-blue)] hover:underline">85% of people who hit voicemail hang up and call the next number</a>. That's not my stat — that's from a proper business report. And it matches exactly what I saw.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Before Katie: 47 missed calls in January, £11,900 lost revenue.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              After Katie: 63 enquiries captured, 28 jobs booked, £8,400 recovered revenue.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Cost: £125/month.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              If you're a heating engineer and you're still sending customers to voicemail, you're not just losing calls. You're losing boilers, certificates, service contracts, and emergency callouts to every competitor who answers their phone.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              And in winter? That's £8,000+ per month walking out the door.
            </p>

            {/* Related Content */}
            <div className="border-t border-white/10 pt-8 mt-12">
              <h3 className="text-xl font-bold text-white mb-4">Related Content</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="/blog/seasonal-missed-call-report-uk-trades-2026" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Data / Industry Insights</p>
                  <p className="text-white font-semibold">When Do UK Trades Lose the Most Money? Seasonal Missed Call Report 2026</p>
                </a>
                <a href="/for-heating-engineers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Product</p>
                  <p className="text-white font-semibold">AI Call Answering for Heating Engineers</p>
                </a>
                <a href="/pricing" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Pricing</p>
                  <p className="text-white font-semibold">Plans from £59/month</p>
                </a>
                <a href="/blog/how-does-ai-call-answering-work" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <p className="text-[var(--katie-blue)] text-sm font-medium mb-1">Guide</p>
                  <p className="text-white font-semibold">How AI Call Answering Works</p>
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
// deploy-bump: 1782499844
