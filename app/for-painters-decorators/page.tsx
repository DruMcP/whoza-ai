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
import { ArrowRight, CheckCircle, Phone, Shield, Clock, PoundSterling, Paintbrush, PaintBucket, Home, Briefcase, Palette, Star } from "lucide-react"
import { RelatedTrades } from "@/components/whoza/related-trades"

export const metadata: Metadata = {
  title: "AI Call Handling for Painters & Decorators UK | whoza.ai",
  description: "Katie answers 24/7 for painters & decorators. Captures interior, exterior & commercial painting enquiries. WhatsApp alerts in 3 seconds. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-painters-decorators",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-painters-decorators",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Painters & Decorators UK | whoza.ai",
    description: "Katie answers 24/7 for painters & decorators. Captures interior, exterior & commercial painting enquiries. WhatsApp alerts in 3 seconds. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Painters & Decorators" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handling for Painters & Decorators UK | whoza.ai",
    description: "Katie answers 24/7 for painters & decorators. Captures interior, exterior & commercial painting enquiries. WhatsApp alerts in 3 seconds. Free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call handling cost for painters and decorators?",
    answer: "Whoza.ai starts at £59/month for the Starter plan. One captured interior painting job for a 3-bedroom house averages £1,200-£2,500. A full exterior repaint can be £3,000-£8,000. At £59/month, one missed room repaint pays for the entire year. Overage minutes are billed at £0.26/minute. No hidden fees or contracts."
  },
  {
    question: "Can Katie handle emergency painting and touch-up calls?",
    answer: "Yes. Katie identifies urgent painting enquiries like 'water stain on ceiling', 'peeling paint after leak', 'mould on walls', 'scuff marks before house sale', and 'tenant check-out painting'. She marks these as priority and captures the full context — room size, surface type, colour match requirements, and timeline — so you arrive prepared with the right paint and tools."
  },
  {
    question: "What information does Katie collect from painting customers?",
    answer: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), job type (interior/exterior/both), room count and sizes (if known), surface type (plaster/wood/UPVC/metal), current condition (fresh paint/overpaint/damage repair), colour preferences, timeline, whether materials are included in quote, and how they found you."
  },
  {
    question: "Can Katie distinguish between a quick touch-up and a full house repaint?",
    answer: "Yes. Katie is trained to qualify painting jobs by scope. 'One wall in the lounge' gets small-job tagging. 'Full exterior including soffits and fascias' gets large-project tagging with budget qualification. 'Commercial office repaint' gets commercial tagging. Each type gets appropriate follow-up handling in your dashboard, so you prioritise high-value jobs."
  },
  {
    question: "Does Katie handle commercial painting and decorating enquiries?",
    answer: "Yes. Katie identifies commercial calls by keywords like 'office', 'shop', 'restaurant', 'hotel', 'landlord', 'letting agent', 'property management', and 'multiple properties'. She captures: business name, property type, number of rooms/units, whether it's a one-off or ongoing contract, insurance requirements, and preferred survey date. Commercial enquiries get flagged as 'commercial' for priority handling."
  },
  {
    question: "How does whoza.ai help with landlord and letting agent enquiries?",
    answer: "Katie recognises landlord-specific terminology like 'between tenancies', 'check-out', 'end of tenancy', 'rental property', and 'letting agent'. She captures: number of properties, property type, room count, whether it's a refresh or full repaint, preferred dates between tenancies, and agent contact details. These recurring maintenance jobs build predictable, repeat revenue."
  },
  {
    question: "Can Katie handle wallpapering and specialist finish enquiries?",
    answer: "Yes. Katie captures wallpapering, coving, cornicing, feature walls, lime washing, Venetian plaster, and other specialist finish enquiries. She asks about: type of finish, room dimensions, whether wallpaper is supplied, pattern matching requirements, and whether old wallpaper needs stripping. Specialist jobs get flagged so you know to bring the right tools and skills."
  },
  {
    question: "Will customers trust an AI with their home painting project?",
    answer: "Katie introduces herself as your AI assistant and explains that she's capturing details so you can provide an accurate quote. Most customers appreciate the immediate response and detailed information gathering. In our surveys, 89% of callers are satisfied with the AI experience, and painting customers particularly like that Katie captures room sizes, surface conditions, and colour preferences — saving time on the initial quote call."
  }
]

const painPoints = [
  {
    icon: Paintbrush,
    title: "You're up a ladder or in a dust sheet — phones go unanswered",
    description: "You're mid-roll on a ceiling, up a ladder cutting in, or covered in dust sheets. The phone rings. By the time you clean up, the caller has moved on to the next painter on Google. That £2,500 exterior repaint goes to your competitor while you're still washing brushes."
  },
  {
    icon: Home,
    title: "Pre-sale painting enquiries are time-sensitive and high-value",
    description: "A homeowner calls in February — 'We need the whole house painted before it goes on the market in March'. This is a £4,000-£6,000 job with a hard deadline. If you miss the call, they've already rung two other painters by the time you check your phone. Katie captures the deadline, room count, and move date immediately."
  },
  {
    icon: Briefcase,
    title: "Commercial contracts come from agents who won't leave voicemail",
    description: "A letting agent calls about painting 12 flats between tenancies. It's a £8,000 recurring contract. But agents are busy — they won't leave voicemail. If you miss the call, they move to the next painter on their approved list. Katie captures agent details, property count, and timeline — then texts you instantly."
  },
  {
    icon: Palette,
    title: "Colour-matching emergency calls need context voicemail can't capture",
    description: "A customer calls — 'I need the lounge ceiling repainted after a leak, and it needs to match the walls exactly'. A voicemail says nothing about the existing colour, finish type, or urgency. Katie captures: room size, existing paint brand/colour (if known), surface damage extent, and whether it's insurance work — so you arrive with colour cards and samples."
  }
]

const howItWorks = [
  {
    step: 1,
    title: "Painting enquiry comes in — any time",
    description: "Katie answers with your painting company's greeting. She identifies if it's an interior job, exterior repaint, commercial contract, emergency touch-up, or specialist finish enquiry."
  },
  {
    step: 2,
    title: "Painting-specific qualification",
    description: "Captures: property type and room count, job scope (touch-up/room/full house/exterior), surface condition, colour preferences, timeline, and whether materials are included. Commercial jobs get flagged."
  },
  {
    step: 3,
    title: "WhatsApp with full brief",
    description: "Alert shows: 'Full exterior repaint — 4-bed detached — soffits/fascias/guttering included — current paint flaking — want weather-resistant masonry paint — budget £4-6k — need completed before house sale — postcode RG1 — survey requested' with customer number."
  },
  {
    step: 4,
    title: "Accept job or schedule survey",
    description: "For emergency touch-ups: accept and arrive with matching paint. For large projects: schedule a site survey with full context. Commercial contracts get priority follow-up for quote preparation."
  }
]

export const revalidate = 3600

export default function ForPaintersDecoratorsPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "whoza.ai — AI Call Handling for Painters & Decorators",
    "url": "https://whoza.ai/for-painters-decorators",
    "logo": "https://whoza.ai/logo.webp",
    "image": "https://whoza.ai/og-image.webp",
    "description": "AI voice agents for UK painters and decorators — answer missed calls 24/7, capture interior, exterior, commercial, and emergency touch-up enquiries, and deliver leads via WhatsApp.",
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
    "serviceType": "AI Call Handling for Painters and Decorators"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Call Handling for UK Painters & Decorators",
    "description": "24/7 AI call answering for painting and decorating businesses. Captures interior, exterior, commercial, emergency touch-up, and specialist finish enquiries. Delivers qualified leads via WhatsApp in 3 seconds.",
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
        name="Whoza.ai Demo — AI Call Handling for Painters & Decorators"
        description="Watch how Katie captures a missed painting enquiry in under 60 seconds. Interior, exterior, commercial, emergency touch-ups — answered 24/7."
        embedUrl="https://whoza.ai/for-painters-decorators"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Painters & Decorators", item: "https://whoza.ai/for-painters-decorators" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--navy-900)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <PaintBucket className="w-4 h-4" />
                  Built for UK Painters & Decorators
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Never Miss a Painting Enquiry — Even Up a Ladder
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  Interior painting, exterior repaints, commercial contracts, emergency touch-ups, wallpapering. Katie answers every call you miss, captures the full job details, and sends them to your WhatsApp in 3 seconds. From £59/month — less than one room repaint.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-colors"
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
                <div className="flex items-center gap-6 mt-8 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    Setup in 30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Enquiry — Katie</p>
                      <p className="text-white/50 text-sm">Exterior repaint call, 19:45</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>👤 Name: Eleanor Davies</p>
                    <p>📞 Phone: 07XXX XXXXXX</p>
                    <p>📍 Postcode: BS8 1TL</p>
                    <p>🔧 Job: Full exterior repaint — 4-bed Victorian semi</p>
                    <p>⚡ Urgency: High — house going on market in 6 weeks</p>
                    <p>🏠 Property: Victorian semi, 3 storeys, bay windows</p>
                    <p>💰 Estimated Value: £4,500-£6,500</p>
                    <p>🎨 Finish: Masonry paint, woodwork gloss, heritage colours</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium">Accept</button>
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
                Why Painters & Decorators Lose Jobs to Missed Calls
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Painting jobs range from £200 touch-ups to £8,000+ commercial contracts. But you're up a ladder, in a dust sheet, or with paint on your hands. When the phone rings, you miss it — and the customer moves on.
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
        <LostRevenueCalculator trade="painter" />
        <div className="section-divider" />

        {/* HOW KATIE WORKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                How Katie Works for Painters & Decorators
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Four simple steps from missed call to booked job. Katie handles the conversation. You handle the painting.
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
        <ReviewsEngine trade="painter" />
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
              AI Call Answering for Painters & Decorators in Your City
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for painters & decorators across the UK. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
    <Link href="/for-painters-decorators-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
    <Link href="/for-painters-decorators-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
    <Link href="/for-painters-decorators-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
    <Link href="/for-painters-decorators-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
    <Link href="/for-painters-decorators-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
    <Link href="/for-painters-decorators-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
    <Link href="/for-painters-decorators-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
    <Link href="/for-painters-decorators-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
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
                Painter & Decorator FAQ
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)]">
                Everything you need to know about AI call handling for painting and decorating businesses
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] px-6 py-5">
                  <h3 className="text-[var(--navy-900)] font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--slate-500)] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* TESTIMONIAL */}
        <section className="section-padding-lg bg-[var(--off-white)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Painter Testimonial
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[var(--navy-900)] leading-relaxed mb-8">
              "I was cutting in a ceiling in Clifton when my phone rang three times. First was a lounge repaint — £850 job. Second was a letting agent with 8 flats between tenancies — £6,400 contract. Third was a scuff touch-up — £120. Katie captured all three with room counts, deadlines, and agent details. I called back at 4pm and booked the agent contract for next month. That one job paid for Katie for 9 years."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center text-[var(--katie-blue)] font-bold">
                TS
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--navy-900)]">Tom Saunders</p>
                <p className="text-sm text-[var(--slate-500)]">Saunders Painting & Decorating, Bristol</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="section-padding-lg bg-[var(--navy-900)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One Exterior Repaint Pays for 7 Years of Katie
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Room repaints average £400-£800. Full interior house £2,500-£5,000. Exterior repaints £4,000-£8,000. Commercial contracts £5,000-£15,000+. At £59/month, capturing one missed exterior repaint pays for nearly a decade.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-colors"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-pink-400" />
                GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-400" />
                24/7 answering
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="w-4 h-4 text-pink-400" />
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
                Trusted by Painters & Decorators Across the UK
              </h2>
              <p className="text-[var(--slate-500)]">
                From Bristol to Edinburgh, painters and decorators trust Katie to capture every enquiry.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£2,800</div>
                <p className="text-sm text-[var(--slate-500)]">Average full interior repaint value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£5,500</div>
                <p className="text-sm text-[var(--slate-500)]">Average exterior repaint value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">71%</div>
                <p className="text-sm text-[var(--slate-500)]">Painting enquiries made after 5pm</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[var(--slate-500)] mb-4">Also explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/for-roofers" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  AI for Roofers
                </a>
                <a href="/blog/builders-lead-generation-guide" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  Builders Lead Generation Guide
                </a>
                <a href="/how-it-works" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  How It Works
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
        <RelatedTrades currentTrade="for-painters-decorators" />
        <Footer />
      <FloatingChatWidget />
    </>
  )
}
