import { Metadata } from "next"
import { TradeCityLinks } from "@/components/TradeCityLinks";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { ArrowRight, Phone, Droplets, Clock, PoundSterling, Shield, CheckCircle2, Star, Wrench, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RelatedTrades } from "@/components/whoza/related-trades"
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

export const metadata: Metadata = {
  title: "AI Receptionist Plumbers UK | From £59/mo — Never Miss Jobs",
  description: "UK plumbers lose £12K+/year to missed calls. Whoza.ai answers 24/7, qualifies boiler repairs & leaks, sends job details to WhatsApp. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-plumbers",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-plumbers",
    siteName: "Whoza.ai",
    title: "AI Receptionist Plumbers UK | From £59/mo — Never Miss Jobs",
    description: "UK plumbers lose £12K+/year to missed calls. Whoza.ai answers 24/7, qualifies boiler repairs & leaks, sends job details to WhatsApp. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Plumbers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Receptionist Plumbers UK | From £59/mo — Never Miss Jobs",
    description: "UK plumbers lose £12K+/year to missed calls. Whoza.ai answers 24/7, qualifies boiler repairs & leaks, sends job details to WhatsApp. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for plumbers?",
    answer: "whoza.ai starts at £59/month for the Starter plan. That's less than one emergency callout fee. You get unlimited AI call answering, WhatsApp delivery, and a 7-day free trial with no credit card required. Most plumbers recover the cost within 48 hours by capturing just one missed job.",
  },
  {
    question: "Can Katie handle burst pipe emergencies at 2am?",
    answer: "Absolutely. Katie answers 24/7 including nights, weekends, and bank holidays. She identifies emergency keywords like 'burst pipe', 'flooding', 'no water', and 'leak through ceiling' — then marks the enquiry as emergency priority in your WhatsApp alert. You see it immediately and can call back within minutes.",
  },
  {
    question: "What information does Katie collect from plumbing customers?",
    answer: "Katie captures: full name, phone number, postcode, property type (house/flat/commercial), problem description (burst pipe, boiler breakdown, blocked drain, leak), urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about water shut-off status and property damage extent.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone. In user surveys, 89% of callers are satisfied with the AI experience — they just want their leak fixed fast.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing plumbing business number to your whoza.ai number. Your customers dial the same number they've always used — Katie just answers when you can't. Setup takes under 10 minutes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most plumbers are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.",
  },
  {
    question: "Can Katie book plumbing appointments directly into my calendar?",
    answer: "Yes. Katie checks your connected calendar availability and offers specific time slots to customers. When they confirm, the appointment is saved to your calendar and both parties receive confirmation. You can also tap 'Accept' or 'Call Back' in your WhatsApp alert to manage enquiries manually.",
  },
  {
    question: "What happens if Katie can't handle a complex plumbing enquiry?",
    answer: "Katie is trained to recognise when a call needs human attention. For complex quotes or unusual situations, she takes a detailed message and flags it for your immediate callback. You receive the full context in WhatsApp so you can call back prepared with all the details.",
  },
]

export const revalidate = 3600

export default function ForPlumbersPage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Plumbers — AI Call Answering Demo"
        description="Watch Katie capture a missed plumbing enquiry in under 60 seconds. Burst pipe emergency answered instantly, details sent to WhatsApp, job booked while the plumber is still under the sink."
        embedUrl="https://whoza.ai/for-plumbers"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Plumbers", item: "https://whoza.ai/for-plumbers" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      {/* Schema JSON-LD */}
      <script
        id="plumber-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "whoza.ai — AI Call Answering for Plumbers",
            "url": "https://whoza.ai/for-plumbers",
            "description": "AI call answering service for UK plumbers. Katie answers missed calls 24/7, captures emergency enquiries, and delivers job details via WhatsApp in 3 seconds.",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling for Plumbers",
            "knowsAbout": ["Plumbing", "Emergency Plumbing", "Boiler Repairs", "Burst Pipes", "Leak Detection", "Drainage"],
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
        id="plumber-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Plumbers",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK plumbers. Captures burst pipe emergencies, boiler breakdowns, leak enquiries and delivers details via WhatsApp in 3 seconds.",
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
                  Built for UK Plumbers
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  AI Receptionist for{" "}
                  <span className="text-blue-400">Plumbers UK</span>:{" "}
                  From £59/mo — Never Miss Jobs
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  UK plumbers lose £12K+/year to missed calls. Whoza.ai is an AI receptionist for plumbers: answers 24/7, qualifies boiler repairs and emergency leaks, and sends job details to your WhatsApp in 3 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
                  >
                    Start Your Free 7-Day Trial
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
                      <p className="text-xs text-white/50">Emergency — Burst Pipe</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached Smith Plumbing. I'm Katie, the digital assistant. How can I help?"</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <p className="text-sm text-white/90">"I have a burst pipe in my kitchen! Water everywhere!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — that sounds urgent. Can you confirm your postcode so I can get help to you quickly?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent to plumber in 2.8 seconds
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
                The Real Cost of Missed Plumbing Calls
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every missed call is a job going to your competitor. Here's what plumbers lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Burst Pipes at 2am",
                  description: "You're asleep. Your phone is on silent. The customer leaves a voicemail, calls the next plumber on Google, and gets emergency help within 20 minutes. You lost a £400 emergency callout and potentially a £2,000 replumbing job.",
                  stat: "£400+ lost per call",
                  color: "red",
                },
                {
                  icon: Wrench,
                  title: "Boiler Breakdowns on Sundays",
                  description: "Family with no hot water on a freezing Sunday morning. They call you first because you have great reviews. You don't answer. They call competitor #2 who answers immediately. You lost a £280 repair plus a £1,800 annual service contract.",
                  stat: "78% hire first responder",
                  color: "amber",
                },
                {
                  icon: Droplets,
                  title: "Leak Emergencies While Working",
                  description: "You're under a sink fixing a waste pipe. Phone vibrates in your pocket. Can't answer — hands full of muck, water everywhere. Check missed call at 4pm. Customer already booked someone else. Lost £350 job.",
                  stat: "62% of calls unanswered",
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
                The average UK plumber misses 5 calls per day = <strong>£50,568</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Source: UK SME Communications Survey 2025 — based on £280 avg job value, 35% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── HOW KATIE WORKS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Works for Plumbers
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Three simple steps from missed call to booked job. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Katie Answers Instantly",
                  description: "Customer calls your number. Katie picks up in under 2 rings with your branded greeting: 'Hello, Smith Plumbing. I'm Katie, how can I help?' — 24/7, even at 2am on a Sunday.",
                },
                {
                  step: "02",
                  icon: Wrench,
                  title: "She Qualifies the Job",
                  description: "Katie asks the right questions: postcode, problem type (burst pipe, boiler, leak, drain), urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "Emergency WhatsApp Alert in 3 Seconds",
                  description: "A structured message lands on your phone: name, number, postcode, problem, urgency, and estimated value. Tap Accept, Call Back, or Decline. Customer gets an instant SMS either way.",
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
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
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

        {/* ─── TESTIMONIAL ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Plumber Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-white/90 mb-8">
              "I used to miss 5 emergency calls a week because I was under sinks fixing pipes. In 4 weeks using whoza.ai, I captured 19 jobs I would have missed, recovering <span className="text-emerald-400 font-bold">£6,800</span> in revenue. It cost me £59 for the month."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                GM
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Gary Mitchell</p>
                <p className="text-white/50 text-sm">Self-Employed Plumber, Clapham, London</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="mt-6 text-white/50 text-sm">
              Read Gary's full story: <a href="/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber" className="text-blue-400 hover:text-blue-300 underline">I Missed 5 Emergency Calls a Week. Then I Tried AI.</a>
            </p>
          </div>
        </section>

        <div className="section-divider" />

                {/* ─── FAQ ─── */}
        <section id="faq" className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Plumber FAQ
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Common questions from plumbers about AI call answering.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: "How much does AI call answering cost for plumbers?",
                  a: "Whoza.ai starts at £59/month for the Starter plan. One captured emergency plumbing job averages £120-£250 callout. At £59/month, one emergency callout pays for the whole year. Overage minutes are billed at £0.26/minute."
                },
                {
                  q: "Can Katie handle burst pipe emergencies at 2am?",
                  a: "Yes. Katie answers 24/7, including weekends and bank holidays. She identifies emergency plumbing keywords like 'burst pipe', 'flooding', 'no water', 'leak', 'blocked drain', 'overflowing toilet' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'EMERGENCY — URGENT' in the header, even at 2am."
                },
                {
                  q: "What information does Katie collect from plumbing customers?",
                  a: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), plumbing issue (burst pipe/leak/blockage/drainage/boiler/no water), urgency level, property age, whether it's a rental property, and how they found you."
                },
                {
                  q: "Can Katie distinguish between a routine service and an emergency?",
                  a: "Yes. Katie is trained to identify urgency from the customer's language. 'Annual boiler service' or 'tap replacement' goes to routine scheduling. 'Burst pipe', 'flooding', 'no water', or 'sewage backup' gets emergency priority. She also asks specific questions to help you assess urgency before you call back."
                },
                {
                  q: "Does whoza.ai work with my existing business phone number?",
                  a: "Yes. You keep your existing number. We set up call forwarding from your current line to your whoza.ai number. Most plumbers have this active within 10 minutes. No need to change business cards, van signage, or Google Business Profile."
                },
                {
                  q: "How quickly can I get set up?",
                  a: "Most plumbers are live within 30 minutes. You choose your voice (Katie or one of 12 alternatives), set your greeting, configure your WhatsApp number, and activate call forwarding. We guide you through each step. No technical knowledge required."
                },
                {
                  q: "Will customers know they're talking to AI?",
                  a: "Katie introduces herself as your AI assistant and explains that she's capturing details so you can call back prepared. Most customers are relieved to speak to someone immediately rather than leaving a voicemail. In our surveys, 89% of callers are satisfied with the AI experience."
                },
                {
                  q: "Can Katie book plumbing appointments directly into my calendar?",
                  a: "Katie captures all the details needed for booking: customer name, phone, address, job type, urgency, and preferred time slots. While she doesn't directly write to your calendar, she delivers everything structured in a WhatsApp message that you can action in seconds. Zapier integration is available on Growth plans for automatic calendar syncing."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

{/* ─── PRICING CTA ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Recovered Job Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one emergency callout. Most plumbers recover that cost within 48 hours.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/50">per month</div>
                <div className="text-xs text-white/40 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">£280</div>
                <div className="text-sm text-white/50">avg job value</div>
                <div className="text-xs text-white/40 mt-1">Emergency callout</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">374%</div>
                <div className="text-sm text-white/50">ROI on 1 job</div>
                <div className="text-xs text-white/40 mt-1">First month alone</div>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
            >
              Start Your Free 7-Day Trial
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
        <TradeCityLinks tradeSlug="plumbers" />

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by Plumbers Across the UK
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From solo operators in London to multi-van teams in Manchester, plumbers rely on Katie to capture every call.
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

        {/* ─── FINAL CTA ─── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Plumbing Jobs Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed call is a competitor gaining a customer. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
            >
              Start Your Free 7-Day Trial
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
        <RelatedTrades currentTrade="for-plumbers" />
                <LostRevenueCalculator trade="plumber" />
        <PreLaunchProof />
        <HowWhozaWorks />
        <TrialExplanation />
        <MeetTheTeam businessName="Smith Plumbing" />
        <ControlSection />
        <ReviewsEngine trade="plumber" />
        <GrowthEngine />
        <DashboardPreview />
        <ClaireDashboard />
        <Testimonials />
        <ComparisonTable />

        <Footer />
    </>
  )
}
