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
import { ArrowRight, Phone, Hammer, Clock, PoundSterling, Shield, CheckCircle2, Star, Ruler, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RelatedTrades } from "@/components/whoza/related-trades"
import Image from "next/image"
import { TradeCaseStudy, TradeLeadGen } from "@/components/whoza/trade-case-study"
import { tradeCaseStudies } from "@/lib/trade-case-studies"

export const metadata: Metadata = {
  title: "Call Answering Service for Joiners | From £59",
  description: "24/7 call answering for UK joiners. Every kitchen, staircase and fitted furniture enquiry captured and sent to your WhatsApp in 3 seconds. Plans from £59.",
  alternates: {
    canonical: "https://whoza.ai/for-joiners",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-joiners",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Joiners UK | Never Miss a Job",
    description: "AI call answering for UK joiners. Katie captures 24/7 enquiries for kitchens, staircases and fitted furniture. WhatsApp alerts instantly. Plans from £59.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai: AI Call Answering for Joiners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Joiners UK | Never Miss a Job",
    description: "AI call answering for UK joiners. Katie captures 24/7 enquiries for kitchens, staircases and fitted furniture. WhatsApp alerts instantly. Plans from £59.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for joiners?",
    answer: `whoza.ai starts at <a href="/pricing" className="text-amber-400 hover:text-amber-300 underline">plans start at £59/month</a> for the Starter plan. That's less than one bespoke kitchen consultation. You get unlimited AI call answering, WhatsApp delivery, and a 7-day free trial with no credit card required. Most joiners recover the cost within a week by capturing just one missed project enquiry.`,
  },
  {
    question: "How does AI call answering work?",
    answer: `Katie uses advanced AI to answer your business calls 24/7, capture customer details, and send structured alerts to your WhatsApp. Read our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-amber-400 hover:text-amber-300 underline">complete guide to AI call answering</a> for UK trades to learn more.`,
  },
  {
    question: "Can Katie handle bespoke furniture enquiries?",
    answer: "Absolutely. Katie is trained to handle detailed joinery enquiries including bespoke kitchens, fitted wardrobes, staircases, doors, and cabinets. She captures project type, materials preference, budget range, timeline, and dimensions, giving you a full brief before you even call back. Customers describing complex projects are guided through the key details Katie needs to collect.",
  },
  {
    question: "What information does Katie collect from joinery customers?",
    answer: "Katie captures: full name, phone number, postcode, project type (kitchen, wardrobe, staircase, door, window, etc.), materials preference (hardwood, oak, walnut, pine, MDF), budget range, timeline, property type (house/flat/commercial), and whether it's a commercial or residential client. For bespoke projects, she also asks about style preferences and whether plans or drawings are available.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone. Most callers are satisfied with the AI experience. They just want their joinery project discussed promptly and professionally.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing joinery business number to your whoza.ai number. Your customers dial the same number they've always used. Katie just answers when you can't. Setup takes under 10 minutes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most joiners are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.",
  },
  {
    question: "Can Katie handle commercial joinery contracts?",
    answer: "Yes. Katie identifies commercial enquiries from builders, developers, architects, and interior designers. She captures project scale, contract value, timeline, and decision-maker details. Commercial enquiries are tagged as priority in your WhatsApp alert so you can follow up fast. These are often your highest-value jobs.",
  },
  {
    question: "What happens if Katie can't handle a complex enquiry?",
    answer: "Katie is trained to recognise when a call needs human attention. For complex bespoke projects or unusual situations, she takes a detailed message and flags it for your immediate callback. You receive the full context in WhatsApp so you can call back prepared with all the details, no more 'can you tell me about your project again' conversations.",
  },
]

export const revalidate = 3600

export default function ForJoinersPage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Joiners: AI Call Answering Demo"
        description="Watch Katie capture a missed joinery enquiry in under 60 seconds. Bespoke kitchen project details collected, sent to WhatsApp, and ready for quoting while the carpenter is still on site."
        embedUrl="https://whoza.ai/for-joiners"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Joiners", item: "https://whoza.ai/for-joiners" },
      ]} />
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />

      {/* Schema JSON-LD */}
            <script
        id="joiner-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Joiners",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK joiners. Captures bespoke kitchen, fitted wardrobe, staircase, and renovation enquiries and delivers details via WhatsApp in 3 seconds.",
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
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-[#6ee7b7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Hammer className="w-4 h-4" />
                  Built for UK Joiners
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  AI Call Answering for{" "}
                  <span className="text-[#6ee7b7]">Joiners</span>{" "}
                  UK: Never Miss a Job
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Bespoke kitchens, fitted wardrobes, staircases, doors: customers call when they want quality woodwork. Katie answers every call, captures the project details, and sends them to your WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/"
                    className="v2-btn min-h-[54px] px-7 text-base"
                  >
                    Try Katie free for 7 days
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
                  alt="Whoza.ai AI call answering: Katie captures missed calls and sends job details to WhatsApp"
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
          heading="What whoza.ai does for joiners"
          tradeName="joiner"
          serviceUrl="/for-joiners"
          items={[            {
              label: "Instant pickup",
              answer: "Katie answers every joinery call in 2 rings, even during workshop hours.",
            },            {
              label: "Project capture",
              answer: "She records project type, materials preference, budget, timeline, and commercial or residential status.",
            },            {
              label: "Commercial priority",
              answer: "Enquiries from builders, developers, and architects get priority tagging for fast follow-up.",
            },            {
              label: "Bespoke detail",
              answer: "High-value bespoke projects get detailed capture for accurate quoting.",
            },            {
              label: "WhatsApp brief",
              answer: "A structured message with full project details lands on your phone in 3 seconds.",
            }
          ]}
        />


        <div className="section-divider" />

        {/* ─── PAIN POINTS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="v2-h2 mb-4">
                The Real Cost of Missed Joinery Calls
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Every missed call is a bespoke project going to your competitor. Here's what joiners lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Detailed Enquiries Go to Voicemail",
                  description: "A customer calls to discuss a bespoke kitchen with shaker cabinets, oak worktops, and a wine rack. You're on site fitting wardrobes and can't answer. They leave a vague voicemail. By the time you call back, they've booked a consultation with another joiner who answered immediately. You lost a £12,000 kitchen job.",
                  stat: "£12k+ lost per call",
                  color: "red",
                },
                {
                  icon: Ruler,
                  title: "Can't Judge Value from a Missed Call",
                  description: "A missed call flashes on your screen. Was it a simple door hinge adjustment worth £80, or a £15,000 bespoke fitted wardrobe for a new build? You can't tell from a number on a screen. You call back 4 hours later. It was the £15k job. They already have three quotes. You lost it.",
                  stat: "45% of calls unanswered",
                  color: "amber",
                },
                {
                  icon: Hammer,
                  title: "Commercial Clients Expect Fast Response",
                  description: "A builder calls about joinery for a 6-house development. He needs staircases, doors, and skirting for all units. You don't answer because you're in the workshop. He calls another joiner who picks up immediately. You lost a £40,000 contract because the phone rang at the wrong moment.",
                  stat: "First responder gets the job",
                  color: "amber",
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
                The average UK joiner misses 4 detailed calls per week = <strong>£38,400</strong> in lost revenue per year
              </p>
              <p className="text-[var(--v2-body)] text-sm mt-1">
                Source: UK SME Communications Survey 2025, based on £8,000 avg project value, 30% conversion rate
              </p>
            </div>
            <div className="mt-8 text-center">
              <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="inline-flex items-center text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] font-medium transition-colors">
                Read our 24/7 call answering guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── HOW KATIE WORKS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="v2-h2 mb-4">
                How Katie Works for Joiners
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Four simple steps from missed call to qualified project. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Customer Calls About a Project",
                  description: "Customer calls your number about a joinery or carpentry project: a bespoke kitchen, fitted wardrobe, staircase, or door replacement. Katie picks up in under 2 rings with your branded greeting.",
                },
                {
                  step: "02",
                  icon: Ruler,
                  title: "Katie Captures Project Details",
                  description: "She asks the right questions: project type, materials preference, budget range, timeline, property type, and whether it's commercial or residential. For commercial enquiries, she captures company details and project scale.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert with Full Context",
                  description: "A structured message lands on your phone: name, number, postcode, project type, materials, budget, timeline, and urgency. Commercial enquiries are tagged as priority. You have everything before you call back.",
                },
                {
                  step: "04",
                  icon: Hammer,
                  title: "Quote, Accept, or Schedule Visit",
                  description: "Tap Accept to move to quote stage, Call Back to discuss details, or Decline if you're fully booked. Customer gets an instant SMS either way. You walk into every conversation fully prepared.",
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
              Joiner Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-[var(--v2-ink)] mb-8">
              "I used to miss 3 to 4 project enquiries a week because I was in the workshop with machines running. In 6 weeks using whoza.ai, I captured 14 jobs I would have missed, recovering <span className="text-[var(--v2-green)] font-bold">£11,200</span> in revenue. It cost me £59 for the month."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-xl">
                JT
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--v2-ink)]">James Taylor</p>
                <p className="text-[var(--v2-muted)] text-sm">Bespoke Joiner, Manchester</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-[var(--v2-green)] fill-amber-400" />
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PRICING CTA ─── */}
        <section className="bg-[var(--v2-navy)] text-white v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="v2-h2 text-white mb-4">
              One Recovered Kitchen Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              See our <Link href="/pricing" className="text-[#6ee7b7] hover:text-white underline">full pricing and plan details</Link>.
            </p>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one fitted wardrobe. Most joiners recover that cost within a week.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/65">per month</div>
                <div className="text-xs text-white/60 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#6ee7b7] mb-1">£12,000</div>
                <div className="text-sm text-white/65">avg bespoke kitchen</div>
                <div className="text-xs text-white/60 mt-1">Project value</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#6ee7b7] mb-1">20,000%</div>
                <div className="text-sm text-white/65">ROI on 1 job</div>
                <div className="text-xs text-white/60 mt-1">First month alone</div>
              </div>
            </div>
            <Link
              href="/"
              className="v2-btn min-h-[54px] px-7 text-base"
            >
              Try Katie free for 7 days
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-4 text-sm text-white/65">
              No credit card. No contract. Cancel anytime. Setup in 30 minutes.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {(() => {
          const data = tradeCaseStudies["for-joiners"]
          return (
            <>
              <div className="section-divider" />
              <TradeCaseStudy trade={data.trade} stories={data.stories} />
              {data.leadGen && (
                <>
                  <div className="section-divider" />
                  <TradeLeadGen
                    trade={data.trade}
                    heading={data.leadGen.heading}
                    intro={data.leadGen.intro}
                    tips={data.leadGen.tips}
                  />
                </>
              )}
            </>
          )
        })()}


        {/* ─── FAQ ─── */}
<section className="trade-faq v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Questions Joiners Ask
              </h2>
              <p className="text-[var(--v2-body)]">
                Everything you need to know about AI call answering for joinery businesses.
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


        <TradeCityLinks trade="for-joiners" />

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Trusted by Joiners Across the UK
              </h2>
              <p className="text-[var(--v2-body)] max-w-2xl mx-auto">
                From solo craftsmen in London to workshop teams in Manchester, joiners rely on Katie to capture every call.
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

        <div className="section-divider" />

{/* ─── RELATED TRADES ─── */}
<section className="py-12 border-t border-[var(--v2-line)]">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h3 className="text-lg font-semibold text-[var(--v2-body)] mb-6 text-center">Also See: AI Call Answering for Related Trades</h3>
    <div className="grid sm:grid-cols-3 gap-4">
      <a href="/for-builders" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
        <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Builders</div>
        <p className="text-sm text-[var(--v2-muted)] mt-1">Never miss a job</p>
      </a>
      <a href="/for-handymen" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
        <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Handymen</div>
        <p className="text-sm text-[var(--v2-muted)] mt-1">Never miss a job</p>
      </a>
      <a href="/for-roofers" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-4 hover:border-[#b9c6bf] transition-colors text-center">
        <div className="font-medium text-[var(--v2-ink)]">AI Call Answering for Roofers</div>
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
              Stop Losing Joinery Jobs Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed call is a competitor gaining a customer. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
            </p>
            <Link
              href="/"
              className="v2-btn min-h-[54px] px-7 text-base"
            >
              Try Katie free for 7 days
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
        <RelatedTrades currentTrade="for-joiners" />
        <Footer />
    </>
  )
}
