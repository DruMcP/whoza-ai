import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { ArrowRight, Phone, Droplets, Clock, PoundSterling, Shield, CheckCircle2, Star, Waves, AlertTriangle, Home, Building2, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "AI Call Answering for Drainage Companies UK — Never Miss an Emergency",
  description: "AI call handling for UK drainage companies. Katie answers 24/7, captures blocked drain, flood, and sewage enquiries. WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-drainage",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-drainage",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Drainage Companies UK — Never Miss an Emergency",
    description: "AI call handling for UK drainage companies. Katie answers 24/7, captures blocked drain, flood, and sewage enquiries. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Drainage Companies" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for Drainage Companies UK — Never Miss an Emergency",
    description: "AI call handling for UK drainage companies. Katie answers 24/7, captures blocked drain, flood, and sewage enquiries. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for drainage companies?",
    answer: "whoza.ai starts at \u003ca href='/pricing' className='text-amber-400 hover:text-amber-300 underline'\u003eplans start at £59/month\u003c/a\u003e for the Starter plan. That's less than one emergency callout fee. You get unlimited AI call answering, WhatsApp delivery, and a 7-day free trial with no credit card required. Most drainage companies recover the cost within 48 hours by capturing just one missed emergency job.",
  },
  {
    question: "How does AI call answering work?",
    answer: "Katie uses advanced AI to answer your business calls 24/7, capture customer details, and send structured alerts to your WhatsApp. Read our <a href='/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026' className='text-amber-400 hover:text-amber-300 underline'>complete guide to AI call answering</a> for UK trades to learn more.",
  },
  {
    question: "Can Katie handle emergency drainage calls at night?",
    answer: "Absolutely. Katie answers 24/7 including nights, weekends, and bank holidays. She identifies emergency keywords like 'flooding', 'sewage backup', 'blocked drain', 'drain collapse', and 'toilet overflowing' — then marks the enquiry as emergency priority in your WhatsApp alert. You see it immediately and can dispatch your crew within minutes.",
  },
  {
    question: "What information does Katie collect from drainage customers?",
    answer: "Katie captures: full name, phone number, postcode, property type (house/flat/commercial), problem description (blocked drain, flooding, sewage backup, drain collapse, CCTV survey), urgency level, severity of water damage, insurance claim status, and how they found you. For emergencies, she also asks about property access, water shut-off status, and whether sewage is entering the property.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone. In user surveys, 89% of callers are satisfied with the AI experience — they just want their flooding or blocked drain fixed fast.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing drainage business number to your whoza.ai number. Your customers dial the same number they've always used — Katie just answers when you can't. Setup takes under 10 minutes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most drainage companies are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.",
  },
  {
    question: "Can Katie handle insurance claim drainage calls?",
    answer: "Yes. Katie is trained to recognise insurance-related enquiries. She captures policy details, loss adjuster information, claim reference numbers, and the nature of the drainage damage. She tags these as 'Insurance Claim' in your WhatsApp alert so you can prioritise them. Insurance drainage jobs typically pay £800+ per job.",
  },
  {
    question: "What happens if Katie can't handle a complex drainage enquiry?",
    answer: "Katie is trained to recognise when a call needs human attention. For complex drainage surveys, subsidence-related enquiries, or unusual situations, she takes a detailed message and flags it for your immediate callback. You receive the full context in WhatsApp so you can call back prepared with all the details.",
  },
]

export const revalidate = 3600

export default function ForDrainagePage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Drainage Companies — AI Call Answering Demo"
        description="Watch Katie capture a missed drainage enquiry in under 60 seconds. Flooding emergency answered instantly, details sent to WhatsApp, emergency crew dispatched while the drainage team is still on another job."
        embedUrl="https://whoza.ai/for-drainage"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Drainage", item: "https://whoza.ai/for-drainage" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      {/* Schema JSON-LD */}
      <script
        id="drainage-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "whoza.ai — AI Call Answering for Drainage Companies",
            "url": "https://whoza.ai/for-drainage",
            "description": "AI call answering service for UK drainage companies. Katie answers missed calls 24/7, captures emergency drainage enquiries, and delivers job details via WhatsApp in 3 seconds.",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling for Drainage Companies",
            "knowsAbout": ["Drainage", "Emergency Drainage", "Blocked Drains", "Drain Unblocking", "CCTV Drain Surveys", "Sewer Repairs", "Flooding Cleanup", "Septic Tank Services", "Gutter Cleaning"],
            "priceRange": "££",
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
        id="drainage-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Drainage Companies",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK drainage companies. Captures blocked drain emergencies, flooding, sewage backups, drain collapses and delivers details via WhatsApp in 3 seconds.",
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
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Droplets className="w-4 h-4" />
                  Built for UK Drainage Companies
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  AI Call Answering for{" "}
                  <span className="text-blue-400">Drainage</span>{" "}
                  Companies UK — Never Miss an Emergency
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Blocked drains, flooding, sewage backups — customers call in distress. Katie answers every call, captures the emergency details, and sends them to your WhatsApp so you can respond fast.
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
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">Emergency — Sewage Backup</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached Rapid Drain Solutions. I'm Katie, the digital assistant. How can I help?"</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <p className="text-sm text-white/90">"My toilet is backing up and sewage is coming into my kitchen! I need someone NOW!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — that is a sewage emergency and needs immediate attention. Can you confirm your postcode so I can dispatch an emergency crew to you quickly?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent to drainage team in 2.8 seconds
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
                The Real Cost of Missed Drainage Calls
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every missed drainage call is an emergency getting worse and a job going to your competitor. Here's what drainage companies lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Waves,
                  title: "Flooding & Sewage Backups",
                  description: "Drainage emergencies are urgent — flooding and sewage backups need immediate response. But you can't tell if it's a simple blocked drain or a full sewage backup from a missed call. The customer leaves a voicemail, calls the next drainage company on Google, and gets emergency help within 20 minutes. You lost a £400+ emergency callout and potentially a £2,000 flood damage job.",
                  stat: "£400+ lost per call",
                  color: "red",
                },
                {
                  icon: Building2,
                  title: "Insurance & Commercial Contracts",
                  description: "Insurance companies and property managers expect fast callback — voicemail loses contracts. A property manager calls about a blocked drain at a rental property. You don't answer. They call your competitor who picks up immediately. You lost a £280 repair plus the ongoing commercial contract worth £15,000+ annually.",
                  stat: "78% hire first responder",
                  color: "amber",
                },
                {
                  icon: AlertTriangle,
                  title: "Out-of-Hours Emergency Calls",
                  description: "Out-of-hours emergency calls (weekends, nights) go unanswered while water damage worsens. A family discovers flooding at 11pm on a Saturday. They call you first. You don't answer. By Sunday morning, the water damage has spread to three rooms. They hired someone else at 11:15pm. Lost £800+ insurance job.",
                  stat: "58% of calls missed weekly",
                  color: "blue",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                const colorClass = item.color === "red" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                                   item.color === "amber" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
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
                The average UK drainage company misses 58% of calls = <strong>£72,800</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Source: UK SME Communications Survey 2025 — based on £280 avg emergency job value, 35% conversion rate, 58% call miss rate
              </p>
            </div>
            <div className="mt-8 text-center">
              <a href="/blog/247-call-answering-uk-trades-guide-2026" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
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
                How Katie Works for Drainage Companies
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Four simple steps from emergency call to dispatched crew. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Customer Calls",
                  description: "Customer calls your number about a drainage problem — blocked drain, flooding, sewage backup, or drain collapse. Katie picks up in under 2 rings with your branded greeting: 'Hello, Rapid Drain Solutions. I'm Katie, how can I help?' — 24/7, even at 2am on a Sunday.",
                },
                {
                  step: "02",
                  icon: Droplets,
                  title: "Katie Captures Details",
                  description: "Katie captures emergency details: problem type (blocked drain, flooding, sewage), severity (water damage extent, property entry), property type (residential/commercial), and insurance claim status. She identifies emergencies and marks them as urgent.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert",
                  description: "A structured message lands on your phone with full context: name, number, postcode, problem type, severity, water damage extent, property type, insurance status, and estimated job value. Tap Accept, Call Back, or Dispatch Crew.",
                },
                {
                  step: "04",
                  icon: CheckCircle2,
                  title: "Accept or Dispatch",
                  description: "Tap 'Accept' to confirm the job, 'Call Back' to speak to the customer directly, or 'Dispatch' to send your emergency crew immediately. Customer gets an instant SMS confirmation either way. Emergency calls get highest priority tagging.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                      <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-400" />
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
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                See the full process in detail
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── SOLUTIONS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Katie Solves the Drainage Emergency Problem
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Katie answers every drainage call in 2 rings, even at 2am. She captures problem type, property type, severity, insurance claim status, and water damage extent. Emergency calls get highest priority tagging. Commercial and insurance enquiries get tagged for fast follow-up.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Clock,
                  title: "24/7 Emergency Call Answering",
                  description: "Katie answers every drainage call in 2 rings, even at 2am on a Sunday. No more missed emergency calls while you're asleep, on another job, or simply can't get to the phone. She handles blocked drains, flooding, sewage backups, and drain collapses around the clock.",
                },
                {
                  icon: Shield,
                  title: "Insurance & Commercial Job Tagging",
                  description: "Commercial and insurance enquiries get tagged for fast follow-up. Katie recognises insurance claim calls, property manager enquiries, and council housing associations. She captures claim references, policy details, and loss adjuster information so you can prioritise £800+ jobs.",
                },
                {
                  icon: AlertTriangle,
                  title: "Emergency Priority Tagging",
                  description: "Emergency calls (flooding, sewage) get highest priority tagging. Katie identifies severe emergencies by keywords and water damage extent. A 'SEWAGE EMERGENCY' or 'FLOODING' tag means you see it first in your WhatsApp alerts, so you can dispatch your crew within minutes.",
                },
                {
                  icon: Building2,
                  title: "Full Context Capture",
                  description: "She captures: problem type, property type, severity, insurance claim status, water damage extent. You get the full picture before calling back — knowing if it's a simple blocked drain (£120) or a full sewage backup with property damage (£2,000+). Arrive prepared with the right equipment and crew.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TESTIMONIAL ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Drainage Company Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-white/90 mb-8">
              "I run a 3-van drainage operation and we used to miss at least 4 emergency calls every weekend. In 6 weeks using whoza.ai, we captured 31 jobs we would have missed, recovering <span className="text-emerald-400 font-bold">£11,200</span> in revenue. The insurance claim jobs alone paid for the whole year."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                DJ
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">David Johnson</p>
                <p className="text-white/50 text-sm">Owner, Johnson Drainage Services, Manchester</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="mt-6 text-white/50 text-sm">
              Service areas: <span className="text-white/70">Blocked drains, CCTV surveys, sewer repairs, flooding cleanup, septic tanks, gutter cleaning</span>
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PRICING CTA ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Recovered Emergency Job Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              See our <Link href="/pricing" className="text-blue-400 hover:text-blue-300 underline">full pricing and plan details</Link>.
            </p>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one emergency drainage callout. Most drainage companies recover that cost within 48 hours.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/50">per month</div>
                <div className="text-xs text-white/40 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">£280</div>
                <div className="text-sm text-white/50">avg emergency value</div>
                <div className="text-xs text-white/40 mt-1">Blocked drain / flooding</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">£800+</div>
                <div className="text-sm text-white/50">insurance claim jobs</div>
                <div className="text-xs text-white/40 mt-1">Flood damage / subsidence</div>
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
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Drainage Companies Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for drainage businesses.
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
                <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-blue-400 hover:text-blue-300 underline">
                  complete AI call answering guide
                </a>{" "}
                or{" "}
                <a href="/pricing" className="text-blue-400 hover:text-blue-300 underline">
                  compare all pricing plans
                </a>. See the <Link href="/blog/best-ai-call-answering-service-uk-trades-2026" className="text-blue-400 hover:text-blue-300 underline">7 best AI call answering services compared</Link> for UK trades.
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
                Trusted by Drainage Companies Across the UK
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From solo operators in London to multi-van teams in Manchester, drainage companies rely on Katie to capture every emergency call.
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
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
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
      <a href="/for-landscapers" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
        <div className="font-medium text-white">AI Call Answering for Landscapers</div>
        <p className="text-sm text-white/50 mt-1">Never miss a job</p>
      </a>
      <a href="/for-builders" className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors text-center">
        <div className="font-medium text-white">AI Call Answering for Builders</div>
        <p className="text-sm text-white/50 mt-1">Never miss a job</p>
      </a>
    </div>
  </div>
</section>

        <div className="section-divider" />

        {/* ─── FINAL CTA ─── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Drainage Emergency Calls Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed drainage call is water damage getting worse and a competitor gaining a customer. Katie answers 24/7, captures every emergency enquiry, and delivers it to your WhatsApp in 3 seconds.
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

      <Footer />
    </>
  )
}
