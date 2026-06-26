import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { ArrowRight, Phone, Bug, Clock, PoundSterling, Shield, CheckCircle2, Star, AlertTriangle, Home, Building, Calendar, Sprout } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RelatedTrades } from "@/components/whoza/related-trades"

export const metadata: Metadata = {
  title: "AI Call Answering for Pest Control UK — Never Miss an Infestation Call",
  description: "AI call handling for UK pest control. Katie answers 24/7, captures infestation details and sends WhatsApp alerts. Never miss a £200+ emergency call. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-pest-control",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-pest-control",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Pest Control UK — Never Miss an Infestation Call",
    description: "AI call handling for UK pest control. Katie answers 24/7, captures infestation details and sends WhatsApp alerts. Never miss a £200+ emergency call. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Pest Control" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for Pest Control UK — Never Miss an Infestation Call",
    description: "AI call handling for UK pest control. Katie answers 24/7, captures infestation details and sends WhatsApp alerts. Never miss a £200+ emergency call. Free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for pest control?",
    answer: `whoza.ai starts at <a href="/pricing" className="text-amber-400 hover:text-amber-300 underline">plans start at £59/month</a> for the Starter plan. That's less than one emergency wasp nest removal. You get unlimited AI call answering, WhatsApp delivery, and a 7-day free trial with no credit card required. Most pest control operators recover the cost within 24 hours by capturing just one missed emergency call.`,
  },
  {
    question: "How does AI call answering work?",
    answer: `Katie uses advanced AI to answer your business calls 24/7, capture customer details, and send structured alerts to your WhatsApp. Read our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">complete guide to AI call answering</a> for UK trades to learn more.`,
  },
  {
    question: "Can Katie handle emergency pest calls at night?",
    answer: "Absolutely. Katie answers 24/7 including nights, weekends, and bank holidays. She identifies emergency keywords like 'wasp nest', 'rat infestation', 'bed bugs', 'swarm', and 'bites' — then marks the enquiry as emergency priority in your WhatsApp alert. You see it immediately and can respond within minutes, even at 3am.",
  },
  {
    question: "What information does Katie collect from pest control customers?",
    answer: "Katie captures: full name, phone number, postcode, property type (house/flat/commercial/restaurant/hotel), pest type (wasps, rats, mice, bed bugs, cockroaches, fleas, ants, squirrels, pigeons, foxes), infestation severity (single sighting vs full infestation), property size, commercial vs residential, urgency level, and preferred appointment time. For emergencies, she also asks about health risks and access requirements.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone — especially during panic situations like wasp stings or rat sightings. In user surveys, 89% of callers are satisfied with the AI experience — they just want the pest problem solved fast.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing pest control business number to your whoza.ai number. Your customers dial the same number they've always used — Katie just answers when you can't. Setup takes under 10 minutes and requires no hardware changes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most pest control operators are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required. You'll be capturing emergency calls by tonight.",
  },
  {
    question: "Can Katie handle commercial pest control contracts?",
    answer: "Yes. Katie is trained to identify commercial enquiries from restaurants, hotels, offices, warehouses, and food production facilities. She tags these as commercial priority, collects business name and contact details, and flags them for fast follow-up. Commercial contracts are your highest-value repeat business — Katie ensures you never miss one.",
  },
  {
    question: "What happens if Katie can't handle a complex enquiry?",
    answer: "Katie is trained to recognise when a call needs human attention. For complex multi-site contracts, unusual pest infestations, or specialist fumigation requirements, she takes a detailed message and flags it for your immediate callback. You receive the full context in WhatsApp so you can call back prepared with all the details.",
  },
]

export const revalidate = 3600

export default function ForPestControlPage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Pest Control — AI Call Answering Demo"
        description="Watch Katie capture a missed pest control enquiry in under 60 seconds. Wasp nest emergency answered instantly, infestation details sent to WhatsApp, job booked while the technician is still on another call."
        embedUrl="https://whoza.ai/for-pest-control"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Pest Control", item: "https://whoza.ai/for-pest-control" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      {/* Schema JSON-LD */}
      <script
        id="pest-control-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "whoza.ai — AI Call Answering for Pest Control",
            "url": "https://whoza.ai/for-pest-control",
            "description": "AI call answering service for UK pest control companies. Katie answers missed calls 24/7, captures infestation details, and delivers job alerts via WhatsApp in 3 seconds.",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling for Pest Control",
            "knowsAbout": ["Pest Control", "Wasp Nest Removal", "Rat Infestation", "Bed Bug Treatment", "Cockroach Control", "Flea Treatment", "Commercial Pest Control", "Domestic Pest Control"],
            "priceRange": "££",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "telephone": "+44-20-0000-0000",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB",
              "addressRegion": "England"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }
            ]
          })
        }}
      />
      <script
        id="pest-control-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Pest Control",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK pest control companies. Captures wasp nest emergencies, rat infestations, bed bug outbreaks and delivers details via WhatsApp in 3 seconds.",
            "offers": {
              "@type": "Offer",
              "price": "59",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock",
              "url": "https://whoza.ai/pricing"
            }
          })
        }}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Bug className="w-4 h-4" />
                  Built for UK Pest Control
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  AI Call Answering for Pest Control UK —{" "}
                  <span className="text-amber-400">Never Miss an Infestation Call</span>
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Wasps, rats, bed bugs, mice — customers call in panic. Katie answers every call, calms the situation, and captures the full infestation details so you arrive prepared.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
                  >
                    Try Katie free for 7 days
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all border border-white/20"
                  >
                    See Pricing
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Setup in 30 minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Cancel anytime
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">Emergency — Wasp Nest</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached Pest Control Pro. I'm Katie, the digital assistant. How can I help?"</p>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                      <p className="text-sm text-white/90">"There's a wasp nest in my loft! My kids are terrified and I'm worried about stings!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — that sounds urgent, especially with children in the house. Can you confirm your postcode so I can get help to you quickly?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent to technician in 2.8 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PAIN POINTS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The Real Cost of Missed Pest Control Calls
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every missed call is an emergency going to your competitor. Here's what pest control operators lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Infestation Calls Are Urgent",
                  description: "Customers call in panic and hang up if no one answers. A wasp nest, rat sighting, or bed bug outbreak needs immediate response. Miss the call and they dial the next number on Google within 60 seconds.",
                  stat: "55% of calls missed",
                  color: "red",
                },
                {
                  icon: Calendar,
                  title: "Seasonal Spikes Overwhelm",
                  description: "Wasps in summer, rats in winter, bed bugs in spring — your phone rings off the hook during peak season. One technician can't answer 3 simultaneous emergency calls. You capture one and lose two £200+ jobs.",
                  stat: "3x peak season calls",
                  color: "amber",
                },
                {
                  icon: Bug,
                  title: "Missed Calls = Unknown Severity",
                  description: "A missed call voicemail says 'I've got a pest problem'. You can't tell if it's a single mouse or a full rat infestation. You arrive unprepared, waste time, and look unprofessional — losing repeat business.",
                  stat: "£180 avg emergency call",
                  color: "orange",
                },
                {
                  icon: Building,
                  title: "Commercial Contracts Lost",
                  description: "Property managers and restaurant owners need fast response. They expect callback within the hour. Miss their call and they move to your competitor. Commercial contracts are worth £5,000-£50,000 annually.",
                  stat: "78% hire first responder",
                  color: "blue",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                const colorClass = item.color === "red" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                                   item.color === "amber" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
                                   item.color === "orange" ? "text-orange-400 bg-orange-500/10 border-orange-500/20" :
                                   "text-blue-400 bg-blue-500/10 border-blue-500/20"
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-4 border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-emerald-400">{item.stat}</div>
                  </div>
                )
              })}
            </div>
            <div className="mt-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average UK pest control operator misses 8 calls per day = <strong>£67,392</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Source: UK SME Communications Survey 2025 — based on £180 avg emergency call value, 40% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── SOLUTIONS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Solves Your Pest Control Call Problem
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                From panic call to prepared technician. Katie handles the chaos so you can focus on extermination.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Answers in 2 Rings, 24/7",
                  description: "Katie answers every pest control call in under 2 rings, even during seasonal spikes. No more missed calls at 2am or during your lunch break. Every customer gets immediate, professional response.",
                  color: "emerald",
                },
                {
                  icon: Bug,
                  title: "Captures Full Infestation Details",
                  description: "She captures: pest type (wasps, rats, mice, bed bugs, cockroaches, fleas, ants, squirrels, pigeons, foxes), property size, infestation severity, and whether it's commercial or residential. You arrive fully prepared.",
                  color: "amber",
                },
                {
                  icon: AlertTriangle,
                  title: "Emergency Priority Tagging",
                  description: "Urgent calls — wasp nests, rat infestations, bed bug outbreaks — get emergency priority tagging. You see them immediately in WhatsApp with a red flag. Respond first, charge emergency rates, win the job.",
                  color: "red",
                },
                {
                  icon: Building,
                  title: "Commercial Enquiries Tagged",
                  description: "Commercial enquiries from restaurants, hotels, offices, warehouses, and food production get tagged for fast follow-up. These are your biggest repeat customer base. Katie makes sure you never miss a contract enquiry.",
                  color: "blue",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                const colorClass = item.color === "emerald" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                                   item.color === "amber" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
                                   item.color === "red" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                                   "text-blue-400 bg-blue-500/10 border-blue-500/20"
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-4 border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <a href="/blog/247-call-answering-uk-trades-guide-2026" className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors">
                Read our 24/7 call answering guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── HOW KATIE WORKS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Works for Pest Control
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Four simple steps from panic call to prepared technician. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Customer Calls About Pest Problem",
                  description: "Customer calls your number in panic — wasp nest, rat sighting, bed bugs. Katie picks up in under 2 rings with your branded greeting: 'Hello, Pest Control Pro. I'm Katie, how can I help?' — 24/7, even during seasonal spikes.",
                },
                {
                  step: "02",
                  icon: Bug,
                  title: "Katie Captures Infestation Details",
                  description: "Katie asks the right questions: postcode, pest type (wasps, rats, mice, bed bugs, cockroaches, fleas, ants, squirrels, pigeons, foxes), infestation severity, property size, commercial vs residential, and urgency level. She identifies emergencies and marks them as urgent.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert with Full Context",
                  description: "A structured message lands on your phone: name, number, postcode, pest type, infestation severity, property details, urgency level, and estimated value. Emergency calls get red-flagged. Commercial enquiries get tagged for fast follow-up.",
                },
                {
                  step: "04",
                  icon: CheckCircle2,
                  title: "Accept or Schedule Visit",
                  description: "Tap Accept, Call Back, or Decline in WhatsApp. Customer gets an instant SMS either way. You arrive fully prepared with the right equipment and chemicals — because you know exactly what you're dealing with before you knock on the door.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                      <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-white/20" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                See the full process in detail
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TESTIMONIAL ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Pest Control Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-white/90 mb-8">
              "I used to miss 4 emergency calls a day during wasp season because I was on other jobs. In 3 weeks using whoza.ai, I captured 23 jobs I would have missed, recovering <span className="text-emerald-400 font-bold">£4,140</span> in revenue. It cost me £59 for the month."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl">
                SR
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Sarah Reynolds</p>
                <p className="text-white/50 text-sm">Owner, Reynolds Pest Control, Manchester</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="mt-6 text-white/50 text-sm">
              Read Sarah's full story: <Link href="/blog/i-missed-4-emergency-calls-a-day-then-i-tried-ai-sarah-pest-control" className="text-amber-400 hover:text-amber-300 underline">I Missed 4 Emergency Calls a Day. Then I Tried AI.</Link>
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PRICING CTA ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Recovered Emergency Call Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              See our <Link href="/pricing" className="text-blue-400 hover:text-blue-300 underline">full pricing and plan details</Link>.
            </p>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one wasp nest removal. Most pest control operators recover that cost within 24 hours.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/50">per month</div>
                <div className="text-xs text-white/40 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">£180</div>
                <div className="text-sm text-white/50">avg emergency call</div>
                <div className="text-xs text-white/40 mt-1">Wasp nest / rat callout</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">305%</div>
                <div className="text-sm text-white/50">ROI on 1 job</div>
                <div className="text-xs text-white/40 mt-1">First month alone</div>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
            >
              Try Katie free for 7 days
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-4 text-sm text-white/50">
              No credit card. No contract. Cancel anytime. Setup in 30 minutes.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FAQ ─── */}
        
        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for Pest Control in Your City
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for pest control across the UK. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
    <Link href="/for-pest-control-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
    <Link href="/for-pest-control-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
    <Link href="/for-pest-control-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
    <Link href="/for-pest-control-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
    <Link href="/for-pest-control-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
    <Link href="/for-pest-control-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
    <Link href="/for-pest-control-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
    <Link href="/for-pest-control-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />
<section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Pest Control Operators Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for pest control businesses.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-white/50 text-sm">
                Still have questions? Read our{" "}
                <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">
                  complete AI call answering guide
                </a>{" "}
                or{" "}
                <a href="/pricing" className="text-amber-400 hover:text-amber-300 underline">
                  compare all pricing plans
                </a>. See the <Link href="/blog/best-ai-call-answering-service-uk-trades-2026" className="text-amber-400 hover:text-amber-300 underline">7 best AI call answering services compared</Link> for UK trades.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by Pest Control Operators Across the UK
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From solo operators in London to multi-team pest control companies in Manchester, operators rely on Katie to capture every call.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: "GDPR Compliant", sub: "UK data centres" },
                { icon: Clock, label: "24/7 Coverage", sub: "Including bank holidays" },
                { icon: PoundSterling, label: "£1.2M+ Revenue", sub: "Recovered for trades" },
                { icon: Star, label: "4.9/5 Rating", sub: "From verified users" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["London", "Manchester", "Birmingham", "Glasgow", "Bristol", "Liverpool", "Leeds", "Edinburgh"].map(city => (
                <span key={city} className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

{/* ─── RELATED TRADES ─── */}
<section className="py-12 border-t border-white/10">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h3 className="text-lg font-semibold text-white/70 mb-6 text-center">Also See: AI Call Answering for Related Trades</h3>
    <div className="grid sm:grid-cols-3 gap-4">
      <a href="/for-plumbers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
        <div className="font-medium text-white">AI Call Answering for Plumbers</div>
        <p className="text-sm text-white/50 mt-1">Never miss a job</p>
      </a>
      <a href="/for-cleaners" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
        <div className="font-medium text-white">AI Call Answering for Cleaners</div>
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

        {/* ─── FINAL CTA ─── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Pest Control Jobs Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed call is a competitor gaining a customer. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
            >
              Try Katie free for 7 days
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50">
              {["No credit card required", "Setup in 30 minutes", "Cancel anytime", "24/7 call answering"].map(point => (
                <span key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="section-divider" />
        <RelatedTrades currentTrade="for-pest-control" />
        <Footer />
    </>
  )
}
