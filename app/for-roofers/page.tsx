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
import { ArrowRight, CheckCircle, Phone, Shield, Clock, PoundSterling, Home, Droplets, CloudRain, Wrench, Star, MessageCircle } from "lucide-react"


const faqs = [
  {
    question: "How much does AI call handling cost for roofers?",
    answer: "Whoza.ai starts at £59/month for the Starter plan. That's less than the cost of one missed emergency repair. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Overage minutes are billed at £0.26/minute. One captured £14,000 re-roof pays for 20+ years of service."
  },
  {
    question: "Can Katie handle storm damage emergencies at 2am?",
    answer: "Yes. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies storm damage by keywords like 'leak', 'water coming through', 'storm damage', and 'wind damage' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'STORM DAMAGE — URGENT' in the header."
  },
  {
    question: "What information does Katie collect from roofing customers?",
    answer: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), roof type (tile/slate/flat/metal), problem description (leak/storm damage/loose tiles/full re-roof), urgency level (routine/urgent/emergency), insurance status, whether photos are available, and how they found you."
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your AI assistant. Customers appreciate the honesty and the instant response. Most prefer a friendly AI that answers immediately over voicemail or a ringing phone. In our surveys, 89% of callers are satisfied with the AI experience."
  },
  {
    question: "Can Katie handle insurance roofing claims?",
    answer: "Yes. Katie specifically asks about insurance status and captures the insurance company name, policy number, and loss adjuster details when available. Insurance work is tagged as 'insurance' in your dashboard for specialised follow-up. These are often your highest-value jobs."
  },
  {
    question: "How quickly can I get set up as a roofer?",
    answer: "Most roofers are fully set up in under 30 minutes. You'll forward your existing business number to your new whoza.ai number, customize your agent's greeting, and you're live. No technical knowledge required. Katie starts capturing calls the same day."
  },
  {
    question: "What happens if Katie can't handle a complex roofing enquiry?",
    answer: "Katie is trained to recognise when she needs to transfer to a human. For complex queries, large commercial projects, or if the customer specifically requests you, she'll take a message and notify you immediately via WhatsApp and SMS. You can call them back within minutes."
  },
  {
    question: "Does whoza.ai work with my existing roofer phone number?",
    answer: "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number they always have — they just get answered every time instead of hitting voicemail. No need to change business cards, van signage, or Google listings."
  }
]

const painPoints = [
  {
    icon: CloudRain,
    title: "Storm damage calls peak when you're already on a roof",
    description: "When heavy rain hits, phones ring off the hook. But you're up a ladder, on scaffolding, or mid-repair. You physically cannot answer. Meanwhile, the caller dials the next roofer on Google."
  },
  {
    icon: Droplets,
    title: "Active leaks = customers who won't wait",
    description: "A customer with water coming through their ceiling will call 3-4 roofers. The first to answer gets the job. If you're on a roof tiling, you miss it. That £320 emergency repair goes to your competitor."
  },
  {
    icon: Wrench,
    title: "You can't see the roof from a missed call",
    description: "A voicemail saying 'my roof is leaking' tells you nothing. Is it a slipped tile (£150) or a full re-roof (£14,000)? Katie captures roof type, property age, leak location, and insurance status — so you arrive prepared."
  },
  {
    icon: Phone,
    title: "After-hours calls from tenants and landlords pile up",
    description: "Roofing emergencies don't stick to 9-5. Weekend storm damage, late-night leaks, bank holiday wind damage. While you're having dinner, missed calls stack up. By Monday morning, the jobs are gone."
  }
]

const howItWorks = [
  {
    step: 1,
    title: "Storm hits — phones start ringing",
    description: "Katie answers every call with your roofing company's greeting. She identifies if it's an active leak, storm damage, or routine maintenance."
  },
  {
    step: 2,
    title: "Roof-specific qualification",
    description: "Captures: roof type (tile, slate, flat, metal), property age, leak location, insurance status, and whether photos are available. Active leaks get emergency priority."
  },
  {
    step: 3,
    title: "WhatsApp with full context",
    description: "Alert shows: 'Active leak — bedroom ceiling — 1930s semi — tiled roof — insured — photos available — urgent callback' with customer number and photo link."
  },
  {
    step: 4,
    title: "Accept emergency or schedule survey",
    description: "For active leaks: tap to accept and head straight there. For quotes: schedule a roof survey with time preference. Insurance work gets flagged for priority handling."
  }
]

export default function ForRoofersPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "whoza.ai — AI Call Handling for Roofers",
    "url": "https://whoza.ai/for-roofers",
    "logo": "https://whoza.ai/logo.webp",
    "image": "https://whoza.ai/og-image.webp",
    "description": "AI voice agents for UK roofers — answer missed calls 24/7, capture storm damage and leak enquiries, and deliver leads via WhatsApp.",
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
    "serviceType": "AI Call Handling for Roofers"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Call Handling for UK Roofers",
    "description": "24/7 AI call answering for roofing businesses. Captures storm damage, leak, guttering, and emergency repair enquiries. Delivers qualified leads via WhatsApp in 3 seconds.",
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
        name="Whoza.ai Demo — AI Call Handling for Roofers"
        description="Watch how Katie captures a missed roofing enquiry in under 60 seconds. Storm damage, leaks, emergency repairs — answered 24/7."
        embedUrl="https://whoza.ai/for-roofers"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Roofers", item: "https://whoza.ai/for-roofers" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--navy-900)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Home className="w-4 h-4" />
                  Built for UK Roofers
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Never Miss a Roofing Call Again — Even in a Storm
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  Storm damage, leaks, slipped tiles, guttering, emergency repairs. Katie answers every call you miss, captures the full job details, and sends them to your WhatsApp in 3 seconds. From £59/month — less than one missed repair.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
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
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Setup in 30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Enquiry — Katie</p>
                      <p className="text-white/50 text-sm">Storm damage call, 14:32</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>👤 Name: Sarah Mitchell</p>
                    <p>📞 Phone: 07XXX XXXXXX</p>
                    <p>📍 Postcode: M20 4BD</p>
                    <p>🔧 Job: Storm damage — tiles blown off, water entering loft</p>
                    <p>⚡ Urgency: Emergency — needs today</p>
                    <p>🏠 Property: 1930s semi, tiled roof</p>
                    <p>💰 Estimated Value: £450-800</p>
                    <p>📸 Photos: Available</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Accept</button>
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
                Why Roofers Lose Jobs to Missed Calls
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Roofing is hands-on, high-risk work. You can't answer a phone while you're 30 feet up on scaffolding. But every missed call is a job that goes to your competitor.
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
        <LostRevenueCalculator trade="roofer" />
        <div className="section-divider" />

        {/* HOW KATIE WORKS */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
                How Katie Works for Roofers
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
                Four simple steps from missed call to booked job. Katie handles the conversation. You handle the roof.
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
        <ReviewsEngine trade="roofer" />
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
                Roofer FAQ
              </h2>
              <p className="mt-6 text-lg text-[var(--slate-500)]">
                Everything you need to know about AI call handling for roofing businesses
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Roofer Testimonial
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[var(--navy-900)] leading-relaxed mb-8">
              "I was up a ladder in Didsbury when a storm hit. My phone rang 7 times in 2 hours. Katie captured every single call. One was a £12,000 re-roof job in Stockport. I called back at my tea break and booked the survey. Best £59 I ever spent."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center text-[var(--katie-blue)] font-bold">
                JM
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--navy-900)]">James Mitchell</p>
                <p className="text-sm text-[var(--slate-500)]">Mitchell Roofing, Manchester</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="section-padding-lg bg-[var(--navy-900)] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One Missed Re-Roof Pays for 20 Years of Katie
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Emergency tile repairs average £200-400. Full re-roofs are £8,000-25,000. Insurance claims can exceed £50,000. At £59/month, capturing one missed job pays for the entire year.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                24/7 answering
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="w-4 h-4 text-emerald-400" />
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
                Trusted by Roofers Across the UK
              </h2>
              <p className="text-[var(--slate-500)]">
                From Manchester to Bristol, roofers trust Katie to capture every call.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">73%</div>
                <p className="text-sm text-[var(--slate-500)]">Roofing calls missed during storms</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£320</div>
                <p className="text-sm text-[var(--slate-500)]">Average emergency repair value</p>
              </div>
              <div className="text-center p-6 bg-[var(--off-white)] rounded-xl border border-[var(--border)]">
                <div className="text-3xl font-bold text-[var(--katie-blue)] mb-1">£14k</div>
                <p className="text-sm text-[var(--slate-500)]">Average full re-roof value</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[var(--slate-500)] mb-4">Also explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/for-builders" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  AI for Builders
                </Link>
                <Link href="/blog/roofing-lead-generation-guide" className="px-4 py-2 bg-[var(--off-white)] border border-[var(--border)] rounded-lg text-[var(--navy-900)] hover:bg-[var(--katie-blue)]/10 hover:border-[var(--katie-blue)]/30 transition-colors text-sm">
                  Roofing Lead Generation Guide
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
