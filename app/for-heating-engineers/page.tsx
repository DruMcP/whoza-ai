import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { SocialProofBand } from "@/components/whoza/social-proof"
import { VideoExplainer } from "@/components/whoza/video-explainer"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
import { PreLaunchProof } from "@/components/whoza/pre-launch-proof"
import { HowWhozaWorks } from "@/components/whoza/how-whoza-works"
import { TrialExplanation } from "@/components/whoza/trial-explanation"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
import { ControlSection } from "@/components/whoza/control-section"
import { ReviewsEngine } from "@/components/whoza/reviews-engine"
import { GrowthEngine } from "@/components/whoza/growth-engine"
import { DashboardPreview } from "@/components/whoza/dashboard-preview"
import { ClaireDashboard } from "@/components/whoza/claire-dashboard"
import { Testimonials } from "@/components/whoza/testimonials"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FinalCTA } from "@/components/whoza/final-cta"
import { FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { VideoSchema } from "@/components/whoza/schema-markup"
import Link from "next/link"
import { ArrowRight, CheckCircle, Phone, Shield, Clock, PoundSterling, Flame, Thermometer, Snowflake, AlertTriangle, Wrench, Star } from "lucide-react"
import { RelatedTrades } from "@/components/whoza/related-trades"

export const metadata: Metadata = {
  title: "AI Call Handling for Heating Engineers UK | whoza.ai",
  description: "Katie answers 24/7 for heating engineers. Captures boiler breakdowns, annual services & emergencies. WhatsApp alerts in 3 seconds. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-heating-engineers",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-heating-engineers",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Heating Engineers UK | whoza.ai",
    description: "Katie answers 24/7 for heating engineers. Captures boiler breakdowns, annual services & emergencies. WhatsApp alerts in 3 seconds. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Heating Engineers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handling for Heating Engineers UK | whoza.ai",
    description: "Katie answers 24/7 for heating engineers. Captures boiler breakdowns, annual services & emergencies. WhatsApp alerts in 3 seconds. Free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call handling cost for heating engineers?",
    answer: "Whoza.ai starts at £59/month for the Starter plan. One captured boiler breakdown averages £120-£200 callout. A full boiler replacement can be £2,500-£4,500. At £59/month, one emergency callout pays for the whole year. Overage minutes are billed at £0.26/minute."
  },
  {
    question: "Can Katie handle emergency boiler breakdown calls at 6am on a Sunday?",
    answer: "Yes. Katie answers 24/7, including weekends, bank holidays, and early mornings. She identifies emergency heating keywords like 'no heating', 'no hot water', 'boiler not working', 'leaking boiler', 'pilot light out', 'pressure dropped' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'BOILER EMERGENCY — URGENT' in the header, even at 2am on Christmas morning."
  },
  {
    question: "What information does Katie collect from heating customers?",
    answer: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), boiler make and model (if known), fault description (no heating/no hot water/leaking/strange noise/pressure issue/pilot light), property age, whether it's a rented property, landlord details if applicable, and how they found you."
  },
  {
    question: "Can Katie distinguish between a service call and an emergency breakdown?",
    answer: "Yes. Katie is trained to identify urgency from the customer's language. 'Annual service' or 'gas safety certificate' goes to routine scheduling. 'No heating', 'leaking boiler', 'strange smell', or 'pilot light keeps going out' gets emergency priority. She also asks specific diagnostic questions to help you assess urgency before you even call back."
  },
  {
    question: "Does Katie handle landlord gas safety certificate enquiries?",
    answer: "Yes. Katie identifies landlord-specific calls by keywords like 'gas safety certificate', 'CP12', 'landlord', 'tenant', or 'rental property'. She captures the number of properties, number of appliances per property, preferred inspection dates, and tenant contact details. Landlord enquiries get flagged as 'landlord/multi-property' in your dashboard for efficient batch scheduling."
  },
  {
    question: "How does whoza.ai help with annual service scheduling?",
    answer: "Katie captures service enquiries with full details: boiler make/model (if known), last service date, property address, preferred date range, and whether it's a single boiler or multiple appliances. She can also ask if the customer wants a recurring annual service reminder, building your repeat business pipeline automatically."
  },
  {
    question: "Can Katie handle calls about central heating installation quotes?",
    answer: "Yes. Katie captures installation enquiries with: property type and size, number of radiators, current heating system (combi/system/regular/none), fuel type (gas/LPG/oil/electric), property age, budget range, and timeline. These high-value enquiries (£3,000-£8,000+) get flagged as 'installation quote' for priority follow-up."
  },
  {
    question: "Will customers trust an AI with their boiler emergency?",
    answer: "Katie introduces herself as your AI assistant and explains that she's capturing details so you can call back prepared. Most customers are relieved to speak to someone immediately rather than leaving a voicemail. In our surveys, 89% of callers are satisfied with the AI experience, and heating customers particularly appreciate that Katie captures fault details that help you diagnose before you arrive."
  }
]

const painPoints = [
  {
    icon: Flame,
    title: "Boiler breakdowns peak when you're under a sink or up a loft",
    description: "January freeze hits. Phones ring constantly. But you're crawling in a loft space, under a kitchen sink, or in a cramped airing cupboard. You physically cannot answer. That 'no heating' call goes to your competitor who books a £180 callout while you're still wrestling with a compression fitting."
  },
  {
    icon: Thermometer,
    title: "Emergency calls need fast triage — voicemail wastes 20 minutes",
    description: "A voicemail saying 'my boiler's broken' tells you nothing. Is it a £50 pressure top-up or a £4,000 replacement? Katie captures: fault description, boiler make/model, property age, and whether there's hot water. You call back with parts already in the van."
  },
  {
    icon: Snowflake,
    title: "Heating emergencies don't wait for business hours",
    description: "Boiler breakdowns happen at 6am before work, 10pm when the kids are in bed, and all weekend long. While you're having your Sunday dinner, missed calls stack up. By Monday, those freezing customers have already found another engineer on Checkatrade."
  },
  {
    icon: Wrench,
    title: "Annual service reminders slip through the cracks",
    description: "Service customers call to book their annual boiler service. If you miss the call, they often just go to the next engineer on their list. Katie captures every service enquiry with property details, preferred dates, and even sets up recurring annual reminders — building your predictable maintenance pipeline."
  }
]

const howItWorks = [
  {
    step: 1,
    title: "Boiler breaks — customer calls",
    description: "Katie answers with your heating company's greeting. She identifies if it's an emergency breakdown, annual service, gas safety certificate, or installation enquiry."
  },
  {
    step: 2,
    title: "Heating-specific qualification",
    description: "Captures: boiler make/model (if known), fault description, property type and age, whether it's rented, and urgency level. Emergency breakdowns get priority flagging."
  },
  {
    step: 3,
    title: "WhatsApp with diagnostic context",
    description: "Alert shows: 'Vaillant EcoTEC — no hot water — pressure at 0.5 bar — 1960s semi — rented — tenant contact — emergency callback' with customer number and property details."
  },
  {
    step: 4,
    title: "Accept emergency or schedule service",
    description: "For breakdowns: tap to accept and arrive prepared with the right parts. For services: schedule annual maintenance at customer's preferred time. Landlord enquiries get batch-scheduled efficiently."
  }
]

export const revalidate = 3600

export default function ForHvacPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "whoza.ai — AI Call Handling for Heating Engineers",
    "url": "https://whoza.ai/for-heating-engineers",
    "logo": "https://whoza.ai/logo.webp",
    "image": "https://whoza.ai/og-image.webp",
    "description": "AI voice agents for UK heating engineers — answer missed calls 24/7, capture boiler breakdown, service, and installation enquiries, and deliver leads via WhatsApp.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "England"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "priceRange": "££",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
    "telephone": "+44-20-0000-0000",
    "email": "dru@whoz.ai",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "serviceType": "AI Call Handling for Heating Engineers"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Call Handling for UK Heating Engineers",
    "description": "24/7 AI call answering for heating engineering businesses. Captures boiler breakdown, annual service, gas safety certificate, and installation enquiries. Delivers qualified leads via WhatsApp in 3 seconds.",
    "provider": {
      "@type": "Organization",
      "name": "Whoza.ai",
      "url": "https://whoza.ai"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Whoza Pricing Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Starter Plan" },
          "price": "59",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Growth Plan" },
          "price": "125",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <VideoSchema
        name="Whoza.ai Demo — AI Call Handling for Heating Engineers"
        description="Watch how Katie captures a missed heating enquiry in under 60 seconds. Boiler breakdowns, emergency heating, annual services — answered 24/7."
        embedUrl="https://whoza.ai/for-heating-engineers"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Heating Engineers", item: "https://whoza.ai/for-heating-engineers" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--navy-900)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Flame className="w-4 h-4" />
                  Built for UK Heating Engineers
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Never Miss a Boiler Breakdown — Even at 2am
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  Boiler breakdowns, emergency heating, annual services, gas safety certificates. Katie answers every call you miss, captures the fault details, and sends them to your WhatsApp in 3 seconds. From £59/month — less than one callout fee.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Start 7-Day Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
                  >
                    See How It Works
                  </Link>
                </div>
                <p className="mt-4 text-sm text-white/50">
                  <a href="/" className="text-orange-400 hover:text-orange-300 underline">Try Katie free for 7 days</a> — no credit card required.
                </p>
                <div className="flex items-center gap-6 mt-8 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Setup in 30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Enquiry — Katie</p>
                      <p className="text-white/50 text-sm">Boiler breakdown, 06:23</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>👤 Name: Patricia O'Connor</p>
                    <p>📞 Phone: 07XXX XXXXXX</p>
                    <p>📍 Postcode: B15 2TT</p>
                    <p>🔧 Job: Worcester Bosch Greenstar — no hot water or heating</p>
                    <p>⚡ Urgency: Emergency — young children in house, no heating</p>
                    <p>🏠 Property: 1990s detached, owned</p>
                    <p>💰 Estimated Value: £120-180 callout</p>
                    <p>📊 Fault: Pressure gauge at 0 — possible leak</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium">Accept</button>
                    <button className="flex-1 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">Call Back</button>
                    <button className="flex-1 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">Decline</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SocialProofBand />

        {/* PAIN POINTS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                Why Heating Engineers Lose Jobs to Missed Calls
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Boiler breakdowns are urgent, emotional, and time-sensitive. Customers with no heating in January will call 3-4 engineers. The first to answer — or at least capture the call professionally — gets the job.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {painPoints.map((point, idx) => (
                <div key={idx} className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] p-8">
                  <div className="w-12 h-12 rounded-xl bg-[var(--katie-blue)]/10 flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--navy-900)] mb-3">{point.title}</h3>
                  <p className="text-[var(--slate-500)] leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />
        <VideoExplainer />
        <div className="section-divider" />
        <LostRevenueCalculator trade="heating engineer" />
        <div className="section-divider" />

        {/* HOW KATIE WORKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                How Katie Works for Heating Engineers
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Four simple steps from missed call to booked callout. Katie handles the conversation. You handle the heating. Read our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">complete guide to AI call answering</a> for more details.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step) => (
                <div key={step.step} className="relative">
                  <div className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] p-6 h-full">
                    <div className="w-10 h-10 rounded-full bg-[var(--katie-blue)] text-white flex items-center justify-center font-bold text-lg mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--navy-900)] mb-2">{step.title}</h3>
                    <p className="text-[var(--slate-500)] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />
        <PreLaunchProof />
        <div className="section-divider" />
        <HowWhozaWorks />
        <div className="section-divider" />
        <TrialExplanation />
        <div className="section-divider" />
        <MeetTheTeam />
        <div className="section-divider" />
        <ControlSection />
        <div className="section-divider" />
        <ReviewsEngine trade="heating engineer" />
        <div className="section-divider" />
        <GrowthEngine />
        <div className="section-divider" />
        <DashboardPreview />
        <div className="section-divider" />
        <ClaireDashboard />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <ComparisonTable />
        <div className="section-divider" />
        <Pricing />

        
        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for Heating Engineers in Your City
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for heating engineers across the UK. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
    <Link href="/for-heating-engineers-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
    <Link href="/for-heating-engineers-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
    <Link href="/for-heating-engineers-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
    <Link href="/for-heating-engineers-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
    <Link href="/for-heating-engineers-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
    <Link href="/for-heating-engineers-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
    <Link href="/for-heating-engineers-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
    <Link href="/for-heating-engineers-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

{/* FAQ */}
        <section id="faq" className="section-padding-lg bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                Heating Engineer FAQ
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)]">
                Everything you need to know about AI call handling for heating engineering businesses
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] px-6 py-5">
                  <h3 className="text-[var(--navy-900)] font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--slate-500)] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  {faq.question.includes("How much does") && (
                    <p className="mt-2 text-sm">
                      <a href="/pricing" className="text-[var(--katie-blue)] hover:underline">Plans start at £59/month</a>. See full pricing and plan details.
                    </p>
                  )}
                  {faq.question.includes("How does AI call answering work") && (
                    <p className="mt-2 text-sm">
                      Read our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">complete guide to AI call answering</a> for more details.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* TESTIMONIAL */}
        <section className="section-padding-lg bg-[var(--off-white)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Heating Engineer Testimonial
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[var(--navy-900)] leading-relaxed mb-8">
              "I was under a floorboard in Solihull fixing a leak when my phone rang three times. Two were annual service bookings. One was a boiler replacement in Edgbaston worth £3,800. Katie captured all three with full details — boiler models, addresses, tenant contacts. I called back at 5pm and booked the replacement for Thursday. The service calls I scheduled for next month."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center text-[var(--katie-blue)] font-bold">
                RK
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--navy-900)]">Robert Khan</p>
                <p className="text-sm text-[var(--slate-500)]">Khan Heating Solutions, Birmingham</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="section-padding-lg bg-[var(--navy-900)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One Boiler Replacement Pays for 5 Years of Katie
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Emergency callouts average £120-£200. Boiler replacements are £2,500-£4,500. Full central heating installations can exceed £8,000. At £59/month, capturing one missed replacement pays for 5 years of service.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
              >
                See Pricing — Plans from £59/month
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" />
                GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                24/7 answering
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="w-4 h-4 text-orange-400" />
                £59/month
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS + INTERNAL LINKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-4">
                Trusted by Heating Engineers Across the UK
              </h2>
              <p className="text-[var(--slate-500)]">
                From Birmingham to Glasgow, heating engineers trust Katie to capture every call.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£3,200</div>
                <p className="text-sm text-[var(--slate-500)]">Average boiler replacement value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">67%</div>
                <p className="text-sm text-[var(--slate-500)]">Emergency calls made after 6pm</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£150</div>
                <p className="text-sm text-[var(--slate-500)]">Average emergency callout fee</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[var(--slate-500)] mb-4">Also explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/for-locksmiths" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  AI for Locksmiths
                </a>
                <a href="/blog/heating-engineer-emergency-call-handling" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  HVAC Emergency Call Handling Guide
                </a>
                <a href="/how-it-works" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  How It Works
                </a>
                <a href="/blog/best-ai-call-answering-service-uk-trades-2026" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  7 Best AI Call Answering Services Compared
                </a>
                <a href="/pricing" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  Plans from £59/month
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-white/70 mb-6 text-center">Also See: AI Call Answering for Related Trades</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <a href="/for-plumbers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
                <div className="font-medium text-white">AI Call Answering for Plumbers</div>
                <p className="text-sm text-white/50 mt-1">Never miss a job</p>
              </a>
              <a href="/for-electricians" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
                <div className="font-medium text-white">AI Call Answering for Electricians</div>
                <p className="text-sm text-white/50 mt-1">Never miss a job</p>
              </a>
              <a href="/for-gas-engineers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
                <div className="font-medium text-white">AI Call Answering for Heating Engineers</div>
                <p className="text-sm text-white/50 mt-1">Never miss a job</p>
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider" />
        <FinalCTA />
      </main>

      <div className="section-divider" />
        <RelatedTrades currentTrade="for-heating-engineers" />
        <Footer />
      <FloatingChatWidget />
    </>
  )
}
