"use client"

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
import { ArrowRight, CheckCircle, Phone, Shield, Clock, PoundSterling, Building, Hammer, AlertTriangle, ClipboardList, Star } from "lucide-react"


const faqs = [
  {
    question: "How much does AI call handling cost for builders?",
    answer: "Whoza.ai starts at £59/month for the Starter plan. One captured extension or renovation enquiry can be worth £15,000-£80,000. That's one free trial to pay for over a decade. Overage minutes are billed at £0.26/minute. No hidden setup fees or long-term contracts."
  },
  {
    question: "Can Katie handle large project enquiries like full house renovations?",
    answer: "Absolutely. Katie is trained to recognise the scope of building work. She captures project type (extension, renovation, new build, structural repair), property type (house, flat, commercial), budget range, timeline, and whether plans exist. Large projects get flagged as 'high-value' in your dashboard for priority follow-up."
  },
  {
    question: "What happens if a customer calls about emergency structural damage?",
    answer: "Katie identifies emergency keywords like 'collapse', 'structural damage', 'subsidence', 'crack in wall', 'unsafe', and 'dangerous' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'STRUCTURAL EMERGENCY — URGENT' in the header, even at 2am."
  },
  {
    question: "Does Katie collect information for building quotes?",
    answer: "Yes. Katie gathers: full name, postcode, property type and age, project type (extension, loft conversion, kitchen renovation, bathroom, full reno, new build), rough size/scope, budget range, timeline, whether architects or structural engineers are already involved, planning permission status, and how they found you."
  },
  {
    question: "Can Katie handle calls from estate agents or property developers?",
    answer: "Yes. Katie identifies commercial callers and captures their company name, contact details, number of properties, project scope, and preferred callback time. These are often high-volume, repeat business enquiries that are extremely valuable to your firm."
  },
  {
    question: "How does whoza.ai handle after-hours calls for builders?",
    answer: "Builders often work on-site from 8am-6pm, but enquiries come in evenings and weekends when homeowners have time to research. Katie answers 24/7, capturing every call and delivering it to your WhatsApp. You review and respond when it suits you — no more Monday morning panic."
  },
  {
    question: "Will customers know they're talking to an AI receptionist?",
    answer: "Katie introduces herself as your AI assistant. Most callers are relieved to get an immediate, friendly response rather than voicemail. In our surveys, 89% of callers are satisfied with the AI experience, and many appreciate the instant WhatsApp confirmation with all their details."
  },
  {
    question: "Can Katie handle calls about planning permission and building regulations?",
    answer: "Yes. Katie recognises when a customer is asking about planning permission, building control, or party wall agreements. She captures the specific question and marks it as 'advice enquiry' in your dashboard, so you can provide a detailed response rather than playing phone tag."
  }
]

const painPoints = [
  {
    icon: Hammer,
    title: "You're on site with machinery — phones ring in your van",
    description: "You're operating a digger, cutting timber, or laying foundations. The phone rings. By the time you wash up and check, it's gone to voicemail. That was a £25,000 extension enquiry. Your competitor answered."
  },
  {
    icon: AlertTriangle,
    title: "Emergency structural calls can't wait until tea break",
    description: "A customer calls about a crack in their wall, a sagging ceiling, or a collapsed garage. They need immediate reassurance. If you don't answer in 3 rings, they call the next builder on Google. These are often insurance-paid jobs worth £5,000+."
  },
  {
    icon: ClipboardList,
    title: "Extension enquiries need detail — voicemails don't deliver",
    description: "'Hi, I need a quote for an extension' tells you nothing. How big? What type? Budget? Timeline? Planning permission status? Katie captures all of this — property age, project scope, budget range, architect involvement — so you arrive at the site meeting fully prepared."
  },
  {
    icon: Phone,
    title: "Weekend calls from serious buyers go to voicemail",
    description: "Homeowners research builders on Saturday and Sunday evenings. They call 2-3 firms. The one that answers — or at least captures the enquiry professionally — gets the site visit. By Monday, the serious buyers have already chosen."
  }
]

const howItWorks = [
  {
    step: 1,
    title: "Extension enquiry comes in",
    description: "Katie answers with your building company's greeting. She identifies if it's a new build, extension, renovation, or emergency structural call."
  },
  {
    step: 2,
    title: "Building-specific qualification",
    description: "Captures: property type and age, project scope, rough budget, timeline, planning permission status, whether architects are involved, and property postcode."
  },
  {
    step: 3,
    title: "WhatsApp with full brief",
    description: "Alert shows: '4-bed extension — £40k-60k budget — Q3 timeline — architect appointed — planning submitted — postcode SE22 — callback requested' with customer number."
  },
  {
    step: 4,
    title: "Accept survey or schedule callback",
    description: "For emergencies: tap to accept and assess immediately. For quotes: schedule a site survey at a time that works. High-value projects get flagged for priority handling."
  }
]

export default function ForBuildersPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "whoza.ai — AI Call Handling for Builders",
    "url": "https://whoza.ai/for-builders",
    "logo": "https://whoza.ai/logo.webp",
    "image": "https://whoza.ai/og-image.webp",
    "description": "AI voice agents for UK builders — answer missed calls 24/7, capture extension, renovation, and emergency structural enquiries, and deliver leads via WhatsApp.",
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
    "serviceType": "AI Call Handling for Builders"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Call Handling for UK Builders",
    "description": "24/7 AI call answering for building businesses. Captures extension, renovation, new build, and emergency structural enquiries. Delivers qualified leads via WhatsApp in 3 seconds.",
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
        name="Whoza.ai Demo — AI Call Handling for Builders"
        description="Watch how Katie captures a missed building enquiry in under 60 seconds. Extensions, renovations, emergency structural work — answered 24/7."
        embedUrl="https://whoza.ai/for-builders"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Builders", item: "https://whoza.ai/for-builders" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--navy-900)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Building className="w-4 h-4" />
                  Built for UK Builders
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Never Miss a Building Enquiry — Even From Site
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  Extensions, renovations, new builds, emergency structural work. Katie answers every call you miss, captures the full project details, and sends them to your WhatsApp in 3 seconds. From £59/month — less than one missed quote.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors"
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
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    Setup in 30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Enquiry — Katie</p>
                      <p className="text-white/50 text-sm">Extension call, 18:47</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>👤 Name: Rebecca Hartley</p>
                    <p>📞 Phone: 07XXX XXXXXX</p>
                    <p>📍 Postcode: SW18 3TQ</p>
                    <p>🔧 Job: Single-storey rear extension — kitchen/diner</p>
                    <p>💰 Budget: £45,000-£65,000</p>
                    <p>📅 Timeline: September start</p>
                    <p>🏠 Property: 3-bed Victorian terrace</p>
                    <p>📋 Planning: Not yet applied — needs advice</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium">Accept</button>
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
                Why Builders Lose Jobs to Missed Calls
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Building projects are high-value, long-lead enquiries. Homeowners research for weeks, then call 2-3 builders on the same evening. The one that captures the enquiry professionally wins the site visit.
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
        <LostRevenueCalculator trade="builder" />
        <div className="section-divider" />

        {/* HOW KATIE WORKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                How Katie Works for Builders
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Four simple steps from missed call to booked site survey. Katie handles the conversation. You handle the build.
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
        <ReviewsEngine trade="builder" />
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

        {/* FAQ */}
        <section id="faq" className="section-padding-lg bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                Builder FAQ
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)]">
                Everything you need to know about AI call handling for building businesses
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[var(--off-white)] rounded-xl border border-[var(--border)] px-6 py-5">
                  <h3 className="text-[var(--navy-900)] font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--slate-500)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* TESTIMONIAL */}
        <section className="section-padding-lg bg-[var(--off-white)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Builder Testimonial
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[var(--navy-900)] leading-relaxed mb-8">
              "I was pouring a concrete slab in Croydon when my phone rang four times. Three were time-wasters. One was a £67,000 loft conversion in Bromley. Katie filtered out the tyre-kickers, captured the full brief with budget and timeline, and sent it to my WhatsApp. I called back at 6pm and booked the site survey the next morning."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center text-[var(--katie-blue)] font-bold">
                DW
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--navy-900)]">David Williams</p>
                <p className="text-sm text-[var(--slate-500)]">Williams Construction, South London</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="section-padding-lg bg-[var(--navy-900)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One Extension Enquiry Pays for 15 Years of Katie
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Average kitchen extension: £45,000-£65,000. Loft conversion: £35,000-£55,000. Full renovation: £80,000+. At £59/month, capturing one missed job pays for the next decade.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                24/7 answering
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="w-4 h-4 text-amber-400" />
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
                Trusted by Builders Across the UK
              </h2>
              <p className="text-[var(--slate-500)]">
                From London to Birmingham, builders trust Katie to capture every enquiry.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£47k</div>
                <p className="text-sm text-[var(--slate-500)]">Average extension value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£63k</div>
                <p className="text-sm text-[var(--slate-500)]">Average loft conversion value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">82%</div>
                <p className="text-sm text-[var(--slate-500)]">Enquiries made after 6pm</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[var(--slate-500)] mb-4">Also explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/for-roofers" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  AI for Roofers
                </Link>
                <Link href="/blog/builders-lead-generation-guide" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  Builders Lead Generation Guide
                </Link>
                <Link href="/how-it-works" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
    </>
  )
}
