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
import { ArrowRight, CheckCircle, Phone, Shield, Clock, PoundSterling, Lock, KeyRound, DoorOpen, AlertTriangle, Star } from "lucide-react"
import { RelatedTrades } from "@/components/whoza/related-trades"

export const metadata: Metadata = {
  title: "AI Call Handling for Locksmiths UK — 24/7 Lockout Help",
  description: "Katie answers 24/7 for locksmiths. Captures emergency lockouts, key replacements & security upgrades. WhatsApp alerts in 3 seconds. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-locksmiths",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-locksmiths",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Locksmiths UK — 24/7 Lockout Help",
    description: "Katie answers 24/7 for locksmiths. Captures emergency lockouts, key replacements & security upgrades. WhatsApp alerts in 3 seconds. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Locksmiths" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handling for Locksmiths UK — 24/7 Lockout Help",
    description: "Katie answers 24/7 for locksmiths. Captures emergency lockouts, key replacements & security upgrades. WhatsApp alerts in 3 seconds. Free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call handling cost for locksmiths?",
    answer: "Whoza.ai starts at £59/month for the Starter plan. One captured emergency lockout averages £80-£150 callout fee. A full security upgrade can be £500-£2,000. At £59/month, one emergency lockout callout pays for the entire year. Overage minutes are billed at £0.26/minute. No hidden fees or contracts."
  },
  {
    question: "Can Katie handle emergency lockout calls at 3am?",
    answer: "Yes. Katie answers 24/7, 365 days a year. She identifies lockout emergencies by keywords like 'locked out', 'lost keys', 'broken key', 'snapped key', 'can't get in', 'urgent', and 'emergency' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'LOCKOUT EMERGENCY — URGENT' in the header, even at 3am on Christmas Day."
  },
  {
    question: "What information does Katie collect from lockout customers?",
    answer: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), lock type (if known — Yale, Chubb, euro cylinder, mortice, digital), how they got locked out (lost keys, broken key, snapped in lock, locked inside, lock failure), whether it's a tenant or landlord situation, number of locks affected, and how they found you."
  },
  {
    question: "Can Katie distinguish between a residential lockout and a commercial security job?",
    answer: "Yes. Katie is trained to identify the type of locksmith job from the customer's description. 'Locked out of my house' gets residential lockout priority. 'Need to change all locks on my rental property' gets landlord/multi-property tagging. 'Security survey for my shop' gets commercial security priority. Each type gets different follow-up handling in your dashboard."
  },
  {
    question: "Does Katie handle UPVC door lock and window lock enquiries?",
    answer: "Yes. Katie recognises UPVC-specific terminology like 'euro cylinder', 'multipoint lock', 'mechanism failure', 'window lock', 'patio door', and 'French door'. She captures the specific issue and marks it as 'UPVC specialist' in your dashboard so you know to bring the right replacement parts."
  },
  {
    question: "How does whoza.ai help with key cutting and key replacement enquiries?",
    answer: "Katie captures key replacement enquiries with: type of key (house key, car key, safe key, padlock key), whether it's a standard key or high-security key, number of copies needed, and whether the customer can bring the lock or key to you. She can also ask if they need the lock rekeyed or just a key cut."
  },
  {
    question: "Can Katie handle calls about security upgrades and CCTV?",
    answer: "Yes. Katie identifies security upgrade calls by keywords like 'security survey', 'CCTV', 'alarm', 'smart lock', 'digital lock', 'keyless entry', and 'high security'. She captures: property type, number of entry points, current security level, budget range, and preferred survey date. These high-value enquiries (£500-£3,000+) get flagged as 'security upgrade' for priority follow-up."
  },
  {
    question: "Will customers trust an AI with their lockout emergency?",
    answer: "Katie introduces herself as your AI assistant and explains that she's capturing details so you can respond immediately. Most lockout customers are relieved to speak to someone right away rather than leaving a voicemail. Katie reassures them that their locksmith has been notified and will call back within minutes. In our surveys, 89% of callers are satisfied with the AI experience."
  }
]

const painPoints = [
  {
    icon: Lock,
    title: "Lockouts are urgent — customers call 3-4 locksmiths at once",
    description: "A customer locked out at 11pm is panicking. They Google 'emergency locksmith near me' and call every number on page one. The first to answer gets the £120 callout. If you're on another job or asleep, you miss it. Katie answers instantly, captures the details, and reassures the customer you're on your way."
  },
  {
    icon: KeyRound,
    title: "Key replacement calls seem small but build repeat business",
    description: "A tenant calls to replace their key. Seems like a £15 job. But Katie captures that it's a rental property with 5 tenants. The landlord might need all locks rekeyed (£200+). Or the customer might need a security survey. Katie doesn't miss the upsell opportunity in a simple key-cutting call."
  },
  {
    icon: DoorOpen,
    title: "Late-night commercial lockouts are premium jobs",
    description: "A pub landlord calls at 1am — front door lock failed, can't secure the premises. This is a £200+ emergency callout plus a new lock. If you're asleep, the call goes to voicemail. The landlord calls the next number. Katie captures these high-value late-night commercial jobs while you sleep."
  },
  {
    icon: AlertTriangle,
    title: "Security upgrade enquiries need detailed qualification",
    description: "A customer calls for a 'security survey'. Voicemail says nothing. Katie captures: property type, number of doors/windows, current locks, whether they want CCTV/alarms/smart locks, budget range, and timeline. You arrive at the survey knowing exactly what to quote — £800 vs £3,500."
  }
]

const howItWorks = [
  {
    step: 1,
    title: "Lockout call comes in — any time",
    description: "Katie answers with your locksmith company's greeting. She identifies if it's an emergency lockout, key replacement, lock repair, or security upgrade enquiry."
  },
  {
    step: 2,
    title: "Locksmith-specific qualification",
    description: "Captures: property type, lock type (if known), how they got locked out, postcode, urgency level, and whether it's residential or commercial. Emergency lockouts get instant priority flagging."
  },
  {
    step: 3,
    title: "WhatsApp with full context",
    description: "Alert shows: 'Lockout — Yale euro cylinder — snapped key — 2nd floor flat — BS3 1AB — emergency — tenant locked out — landlord contact available' with customer number and ETA request."
  },
  {
    step: 4,
    title: "Accept emergency or schedule upgrade",
    description: "For lockouts: tap to accept and head straight there with the right tools. For security surveys: schedule at a convenient time. Commercial jobs get flagged for priority response."
  }
]

export const revalidate = 3600

export default function ForLocksmithsPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "whoza.ai — AI Call Handling for Locksmiths",
    "url": "https://whoza.ai/for-locksmiths",
    "logo": "https://whoza.ai/logo.webp",
    "image": "https://whoza.ai/og-image.webp",
    "description": "AI voice agents for UK locksmiths — answer missed calls 24/7, capture emergency lockout, key replacement, and security upgrade enquiries, and deliver leads via WhatsApp.",
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
    "serviceType": "AI Call Handling for Locksmiths"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Call Handling for UK Locksmiths",
    "description": "24/7 AI call answering for locksmith businesses. Captures emergency lockout, key replacement, lock repair, and security upgrade enquiries. Delivers qualified leads via WhatsApp in 3 seconds.",
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
        name="Whoza.ai Demo — AI Call Handling for Locksmiths"
        description="Watch how Katie captures a missed locksmith enquiry in under 60 seconds. Emergency lockouts, key replacements, security upgrades — answered 24/7."
        embedUrl="https://whoza.ai/for-locksmiths"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Locksmiths", item: "https://whoza.ai/for-locksmiths" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--navy-900)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Lock className="w-4 h-4" />
                  Built for UK Locksmiths
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Never Miss a Lockout Call — Even at 3am
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  Emergency lockouts, key replacements, lock repairs, security upgrades. Katie answers every call you miss, captures the full details, and sends them to your WhatsApp in 3 seconds. From £59/month — less than one callout fee.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl transition-colors"
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
                  <a href="/" className="text-yellow-400 hover:text-yellow-300 underline">Try Katie free for 7 days</a> — no credit card required.
                </p>
                <div className="flex items-center gap-6 mt-8 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                    Setup in 30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Enquiry — Katie</p>
                      <p className="text-white/50 text-sm">Lockout call, 02:17</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>👤 Name: Marcus Chen</p>
                    <p>📞 Phone: 07XXX XXXXXX</p>
                    <p>📍 Postcode: E14 5AB</p>
                    <p>🔧 Job: Locked out of flat — snapped key in euro cylinder</p>
                    <p>⚡ Urgency: Emergency — cannot enter property</p>
                    <p>🏠 Property: 1st floor flat, residential block</p>
                    <p>💰 Estimated Value: £120-150 callout + new cylinder</p>
                    <p>📊 Lock: UPVC door, euro cylinder (likely Yale)</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium">Accept</button>
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
                Why Locksmiths Lose Jobs to Missed Calls
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Lockouts are the most time-sensitive trade enquiries. A customer locked out in the rain will call every locksmith on Google until someone answers. If you're on another job or asleep, that £150 callout goes to your competitor.
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
        <LostRevenueCalculator trade="locksmith" />
        <div className="section-divider" />

        {/* HOW KATIE WORKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                How Katie Works for Locksmiths
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Four simple steps from missed call to booked job. Katie handles the conversation. You handle the locks. Read our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">complete guide to AI call answering</a> for more details.
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
        <ReviewsEngine trade="locksmith" />
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
              AI Call Answering for Locksmiths in Your City
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for locksmiths across the UK. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
    <Link href="/for-locksmiths-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
    <Link href="/for-locksmiths-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
    <Link href="/for-locksmiths-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
    <Link href="/for-locksmiths-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
    <Link href="/for-locksmiths-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
    <Link href="/for-locksmiths-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
    <Link href="/for-locksmiths-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
    <Link href="/for-locksmiths-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
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
                Locksmith FAQ
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)]">
                Everything you need to know about AI call handling for locksmith businesses
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] px-6 py-5">
                  <h3 className="text-[var(--navy-900)] font-semibold mb-2">{faq.question}</h3>
                  <div className="text-[var(--slate-500)] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  {faq.question.includes("How much does") && (
                    <p className="mt-2 text-sm">
                      <Link href="/pricing" className="text-[var(--katie-blue)] hover:underline">Plans start at £59/month</Link>. See full pricing and plan details.
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
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Locksmith Testimonial
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[var(--navy-900)] leading-relaxed mb-8">
              "I was fitting a new mortice lock in Shoreditch when my phone rang twice. First was a key replacement — £20 job. Second was a full security upgrade for a restaurant in Hackney — £1,800 including smart locks, CCTV, and alarm integration. Katie captured both with full details. I called back at 4pm, quoted the upgrade on the spot, and booked it for next week."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center text-[var(--katie-blue)] font-bold">
                AP
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--navy-900)]">Ade Patterson</p>
                <p className="text-sm text-[var(--slate-500)]">Patterson Security Solutions, East London</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="section-padding-lg bg-[var(--navy-900)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One Security Upgrade Pays for 2 Years of Katie
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Emergency lockouts average £80-£150. Key replacements £15-£40. Security upgrades £500-£3,000+. Smart lock installations £800-£2,500. At £59/month, capturing one missed security survey pays for years of service.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl transition-colors"
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
                <Shield className="w-4 h-4 text-yellow-400" />
                GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                24/7 answering
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="w-4 h-4 text-yellow-400" />
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
                Trusted by Locksmiths Across the UK
              </h2>
              <p className="text-[var(--slate-500)]">
                From London to Leeds, locksmiths trust Katie to capture every call — day or night.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£120</div>
                <p className="text-sm text-[var(--slate-500)]">Average lockout callout fee</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">89%</div>
                <p className="text-sm text-[var(--slate-500)]">Lockout calls made after 8pm</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£1,800</div>
                <p className="text-sm text-[var(--slate-500)]">Average security upgrade value</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[var(--slate-500)] mb-4">Also explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/for-painters-decorators" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  AI for Painters & Decorators
                </Link>
                <Link href="/blog/locksmith-24-7-call-answering" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  24/7 Call Answering for Locksmiths
                </Link>
                <Link href="/how-it-works" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  How It Works
                </Link>
                <Link href="/blog/best-ai-call-answering-service-uk-trades-2026" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  7 Best AI Call Answering Services Compared
                </Link>
                <Link href="/pricing" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  Plans from £59/month
                </Link>
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
              <a href="/for-handymen" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
                <div className="font-medium text-white">AI Call Answering for Handymen</div>
                <p className="text-sm text-white/50 mt-1">Never miss a job</p>
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider" />
        <FinalCTA />
      </main>

      <div className="section-divider" />
        <RelatedTrades currentTrade="for-locksmiths" />
        <Footer />
      <FloatingChatWidget />
    </>
  )
}
