import { Metadata } from "next"
import { TradeCityLinks } from "@/components/whoza/trade-city-links";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { QuickAnswer } from "@/components/whoza/quick-answer"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { ArrowRight, Phone, Clock, PoundSterling, Shield, CheckCircle2, Star, Wrench, AlertTriangle, Home, Calendar, Hammer } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RelatedTrades } from "@/components/whoza/related-trades"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Call Answering Service for Handymen | From £59",
  description: "24/7 call answering for UK handymen. Every repair, maintenance and odd-job enquiry captured and sent to your WhatsApp in 3 seconds. Plans from £59.",
  alternates: {
    canonical: "https://whoza.ai/for-handymen",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-handymen",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Handymen UK — Never Miss a Job",
    description: "AI call handling for UK handymen. Katie answers 24/7, captures odd jobs, repairs, and maintenance enquiries. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Handymen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Handymen UK — Never Miss a Job",
    description: "AI call handling for UK handymen. Katie answers 24/7, captures odd jobs, repairs, and maintenance enquiries. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for handymen?",
    answer: "whoza.ai starts at £59/month for the Starter plan. That's less than one half-day job. You get unlimited AI call answering, WhatsApp delivery, and a 7-day free trial with no credit card required. Most handymen recover the cost within a single job by capturing just one missed enquiry.",
  },
  {
    question: "Can Katie handle varied handyman enquiries?",
    answer: "Absolutely. Katie is trained on the full range of handyman services — from hanging pictures and flat-pack assembly to bathroom refits and full property maintenance. She captures job type, size, urgency, budget, materials needed, and whether it's a landlord or letting agent enquiry. No enquiry is too big or too small.",
  },
  {
    question: "What information does Katie collect from handyman customers?",
    answer: "Katie captures: full name, phone number, postcode, property type (house/flat/commercial), job type (odd jobs, repairs, maintenance, flat-pack assembly, painting, tiling, plumbing repairs, electrical repairs, carpentry, shelving, hanging pictures, door repairs, window repairs, gutter cleaning, fence repairs, garden maintenance), urgency level, estimated budget, materials needed, and whether it's a landlord, letting agent, or private customer. For urgent repairs, she also flags emergency priority.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone. Most callers are satisfied with the AI experience — they just want their job done fast.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing handyman business number to your whoza.ai number. Your customers dial the same number they've always used — Katie just answers when you can't. Setup takes under 10 minutes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most handymen are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.",
  },
  {
    question: "Can Katie handle landlord and letting agent enquiries?",
    answer: "Yes — and this is one of her strongest features. Katie recognises landlord and letting agent enquiries and tags them as priority. She captures property portfolio size, regular maintenance needs, and contract terms. These are your highest-value repeat customers, and Katie ensures they never hit voicemail.",
  },
  {
    question: "What happens if Katie can't handle a complex enquiry?",
    answer: "Katie is trained to recognise when a call needs human attention. For complex quotes or unusual situations, she takes a detailed message and flags it for your immediate callback. You receive the full context in WhatsApp so you can call back prepared with all the details.",
  },
]

export const revalidate = 3600

export default function ForHandymenPage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Handymen — AI Call Answering Demo"
        description="Watch Katie capture a missed handyman enquiry in under 60 seconds. Flat-pack assembly job answered instantly, details sent to WhatsApp, quote confirmed while the handyman is still on another job."
        embedUrl="https://whoza.ai/for-handymen"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Handymen", item: "https://whoza.ai/for-handymen" },
      ]} />
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />

      {/* Schema JSON-LD */}
            <script
        id="handyman-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Handymen",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK handymen. Captures odd jobs, repairs, maintenance, flat-pack assembly, and emergency enquiries. Delivers details via WhatsApp in 3 seconds.",
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
      />      <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--v2-paper)] text-[var(--v2-body)]">
        {/* ─── HERO ─── */}
        <section className="bg-[var(--v2-navy)] text-white relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="v2-eyebrow v2-eyebrow-light inline-flex items-center gap-2 mb-6">
                  <Hammer className="w-4 h-4" />
                  Built for UK Handymen
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  AI Call Answering for{" "}
                  <span className="text-[#6ee7b7]">Handymen</span>{" "}
                  UK — Never Miss a Job
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Odd jobs, repairs, maintenance, flat-pack assembly — customers call when they need help fast. Katie answers every call, captures the job details, and sends them to your WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/"
                    className="v2-btn min-h-[54px] px-7 text-base"
                  >
                    Start Your Free 7-Day Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="v2-btn-secondary min-h-[54px] px-7 text-base text-white border-white/25 hover:border-white"
                  >
                    See Pricing
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/65">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
                    Setup in 30 minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
                    Cancel anytime
                  </span>
                </div>
              </div>
              <div className="relative flex justify-center">
                <Image
                  src="/images/hero-phone-3d.webp"
                  alt="Whoza.ai AI call answering — Katie captures missed calls and sends job details to WhatsApp"
                  width={735}
                  height={1103}
                  className="w-full max-w-[380px] h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* ─── QUICK ANSWER ─── */}
        <QuickAnswer
          heading="What whoza.ai does for handymen"
          tradeName="handyman"
          serviceUrl="/for-handymen"
          items={[            {
              label: "Instant pickup",
              answer: "Katie answers every handyman enquiry in 2 rings, even when you are on a ladder.",
            },            {
              label: "Job variety",
              answer: "She handles everything from furniture assembly to plumbing repairs to painting jobs.",
            },            {
              label: "Urgency sorting",
              answer: "Emergency repairs get flagged for immediate callback; non-urgent jobs are scheduled.",
            },            {
              label: "Location capture",
              answer: "Postcode and property details are recorded so you know where to go.",
            },            {
              label: "WhatsApp delivery",
              answer: "A structured message with job details lands on your phone in 3 seconds.",
            }
          ]}
        />


        <div className="section-divider" />

        {/* ─── PAIN POINTS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="v2-h2 mb-4">
                The Real Cost of Missed Handyman Calls
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Every missed call is a job going to your competitor. Here's what handymen lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Varied Enquiries Need Detail",
                  description: "Handyman enquiries are varied — from hanging pictures to full bathroom refits — and need detailed capture. You can't tell if it's a £40 shelf fix or a £2k multi-room job from a missed call. Without the details, you can't price, prioritise, or prepare.",
                  stat: "£40–£2k per job range",
                  color: "red",
                },
                {
                  icon: Home,
                  title: "Landlord & Agent Calls Lost",
                  description: "Landlords and letting agents expect fast response — voicemail loses repeat work. A single landlord contract can be worth £1,500/month in regular maintenance. Miss their call and they move to the next handyman on their list.",
                  stat: "£1,500/mo contracts lost",
                  color: "amber",
                },
                {
                  icon: Wrench,
                  title: "Evening & Weekend Emergencies",
                  description: "Evening and weekend calls for urgent repairs (leaks, broken locks, no power) go unanswered. You're on another job or it's outside hours. The customer calls the next handyman. You lose a £200 emergency repair and a potential long-term customer.",
                  stat: "47% calls missed weekly",
                  color: "blue",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                const colorClass = item.color === "red" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                                   item.color === "amber" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
                                   "text-blue-400 bg-blue-500/10 border-blue-500/20"
                return (
                  <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-4 border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-[var(--v2-body)] leading-relaxed mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-[var(--v2-green)]">{item.stat}</div>
                  </div>
                )
              })}
            </div>
            <div className="mt-12 bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6 text-center">
              <p className="text-[var(--v2-green-ink)] font-medium text-lg">
                The average UK handyman misses 47% of calls = <strong>£31,200</strong> in lost revenue per year
              </p>
              <p className="text-[var(--v2-body)] text-sm mt-1">
                Source: UK SME Communications Survey 2025 — based on £80 avg odd job value, 35% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── HOW KATIE WORKS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="v2-h2 mb-4">
                How Katie Works for Handymen
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Four simple steps from missed call to booked job. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Customer Calls About Handyman Job",
                  description: "Customer calls your number about an odd job, repair, or maintenance need. Katie picks up in under 2 rings with your branded greeting: 'Hello, Handyman Direct. I'm Katie, how can I help?' — 24/7, even when you're on another job.",
                },
                {
                  step: "02",
                  icon: Hammer,
                  title: "Katie Captures Job Details",
                  description: "Katie asks the right questions: job type, property type, urgency, budget, materials needed, and whether it's a landlord or letting agent. She identifies emergencies (leaks, broken locks, no power) and marks them as urgent priority.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert With Full Context",
                  description: "A structured message lands on your phone: name, number, postcode, job type, size, urgency, budget, materials needed, and customer type. You see if it's a £40 shelf fix or a £2k multi-room job instantly.",
                },
                {
                  step: "04",
                  icon: Calendar,
                  title: "Quote, Accept, or Schedule Visit",
                  description: "Tap Accept, Call Back, or Decline in your WhatsApp. For urgent repairs, call back immediately with all the context. For planned jobs, schedule at your convenience. Customer gets an instant SMS either way.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 h-full">
                      <div className="text-5xl font-bold text-slate-200 mb-4">{item.step}</div>
                      <div className="w-12 h-12 rounded-2xl bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[var(--v2-green)]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-[var(--v2-body)] leading-relaxed">{item.description}</p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] font-medium transition-colors"
              >
                See the full process in detail
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TESTIMONIAL ─── */}
        <section className="v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="v2-eyebrow inline-flex items-center gap-2 mb-8">
              <Star className="w-4 h-4" />
              Handyman Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-[var(--v2-ink)] mb-8">
              "I used to miss half my calls because I was on another job or my hands were full. In 4 weeks using whoza.ai, I captured 14 jobs I would have missed, recovering <span className="text-[var(--v2-green)] font-bold">£3,200</span> in revenue. It cost me £59 for the month."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-xl">
                RJ
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--v2-ink)]">Raj Patel</p>
                <p className="text-[var(--v2-muted)] text-sm">Self-Employed Handyman, Birmingham</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-[var(--v2-green)] fill-amber-400" />
              ))}
            </div>
            <p className="mt-6 text-[var(--v2-muted)] text-sm">
              Read our guide: <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline">How Does AI Call Answering Work?</a>
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PRICING CTA ─── */}
        <section className="bg-[var(--v2-navy)] text-white v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="v2-h2 text-white mb-4">
              One Recovered Job Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one odd job. Most handymen recover that cost within a single job.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/65">per month</div>
                <div className="text-xs text-white/60 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#6ee7b7] mb-1">£80</div>
                <div className="text-sm text-white/65">avg odd job value</div>
                <div className="text-xs text-white/60 mt-1">Standard repair</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#6ee7b7] mb-1">35%</div>
                <div className="text-sm text-white/65">more jobs captured</div>
                <div className="text-xs text-white/60 mt-1">First month alone</div>
              </div>
            </div>
            <Link
              href="/"
              className="v2-btn min-h-[54px] px-7 text-base"
            >
              Start Your Free 7-Day Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-4 text-sm text-white/65">
              No credit card. No contract. Cancel anytime. Setup in 30 minutes.
            </p>
          </div>
        </section>

        <div className="section-divider" />
        {/* ─── FAQ ─── */}
<section className="trade-faq v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Questions Handymen Ask
              </h2>
              <p className="text-[var(--v2-body)]">
                Everything you need to know about AI call answering for handyman businesses.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-[var(--v2-body)] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-[var(--v2-muted)] text-sm">
                Still have questions? Read our{" "}
                <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline">
                  complete AI call answering guide
                </a>{" "}
                or{" "}
                <a href="/pricing" className="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline">
                  compare all pricing plans
                </a>.
              </p>
            </div>
          </div>
        </section>


        <TradeCityLinks trade="for-handymen" />

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Trusted by Handymen Across the UK
              </h2>
              <p className="text-[var(--v2-body)] max-w-2xl mx-auto">
                From solo operators in London to multi-trade teams in Manchester, handymen rely on Katie to capture every call.
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
                  <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                    <Icon className="w-8 h-8 text-[var(--v2-green)] mx-auto mb-3" />
                    <p className="font-semibold text-[var(--v2-ink)]">{item.label}</p>
                    <p className="text-sm text-[var(--v2-muted)]">{item.sub}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["London", "Manchester", "Birmingham", "Glasgow", "Bristol", "Liverpool", "Leeds", "Edinburgh"].map(city => (
                <span key={city} className="bg-white border border-[var(--v2-line)] rounded-full px-4 py-2 text-sm text-[var(--v2-body)]">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

      <section className="py-12 border-t border-[var(--v2-line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-[var(--v2-body)] mb-6 text-center">Also See: AI Call Answering for Related Trades</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/for-plumbers" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
              <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Plumbers</div>
              <p className="text-sm text-[var(--v2-muted)] mt-1">Never miss a job</p>
            </a>
            <a href="/for-electricians" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
              <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Electricians</div>
              <p className="text-sm text-[var(--v2-muted)] mt-1">Never miss a job</p>
            </a>
            <a href="/for-cleaners" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
              <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Cleaners</div>
              <p className="text-sm text-[var(--v2-muted)] mt-1">Never miss a job</p>
            </a>
          </div>
        </div>
      </section>

        <div className="section-divider" />

        {/* ─── FINAL CTA ─── */}
        <section className="bg-[var(--v2-navy)] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Handyman Jobs Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed call is a competitor gaining a customer. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
            </p>
            <Link
              href="/"
              className="v2-btn min-h-[54px] px-7 text-base"
            >
              Start Your Free 7-Day Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/65">
              {["No credit card required", "Setup in 30 minutes", "Cancel anytime", "24/7 call answering"].map(point => (
                <span key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="section-divider" />
        <RelatedTrades currentTrade="for-handymen" />
        <Footer />
    </>
  )
}
