import { Metadata } from "next"
import CityTradeSchema from "@/components/CityTradeSchema";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, Zap, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, TrendingUp, Users, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TradeCityLinks } from "@/components/whoza/trade-city-links"

export const metadata: Metadata = {
  title: "AI Call Answering for Electricians in Manchester | whoza.ai",
  description: "Stop losing electrician jobs to missed calls in Manchester. Katie answers 24/7, captures emergency and EICR enquiries via WhatsApp. Plans from £59/month.",
  alternates: {
    canonical: "https://whoza.ai/for-electricians-manchester",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-electricians-manchester",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Electricians in Manchester | whoza.ai",
    description: "Stop losing electrician jobs to missed calls in Manchester. Katie answers 24/7, captures emergency and EICR enquiries via WhatsApp. Plans from £59/month.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Electricians in Manchester" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Electricians in Manchester | whoza.ai",
    description: "Stop losing electrician jobs to missed calls in Manchester. Katie answers 24/7, captures emergency and EICR enquiries via WhatsApp. Plans from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for electricians in Manchester?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one electrician job in Manchester. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most electricians recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for electricians in Manchester?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Manchester or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from electricians customers in Manchester?",
    "answer": "Katie captures: full name, phone number, Manchester postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Manchester business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Manchester business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as an electrician in Manchester?",
    "answer": "Most electricians in Manchester are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for electricians in Manchester?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for electricians. She understands EICR enquiries, emergency faults, consumer unit upgrades & power outages — and with 8,500+ trade businesses competing in Manchester, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForElectricianManchesterPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Manchester", item: "https://whoza.ai/manchester" },
        { name: "For Electricians", item: "https://whoza.ai/for-electricians" },
        { name: "Electricians in Manchester", item: "https://whoza.ai/for-electricians-manchester" },
      ]} />
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />

      {/* Schema JSON-LD */}
            <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--v2-paper)] text-[var(--v2-body)]">
      <CityTradeSchema trade="Electrician" tradePlural="Electricians" city="Manchester" region="Greater Manchester" pageUrl="https://whoza.ai/for-electricians-manchester" />
        {/* ─── HERO ─── */}
        <section className="bg-[var(--v2-navy)] text-white relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-[#6ee7b7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Electricians in Manchester
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  Never Miss an{" "}
                  <span className="text-[#6ee7b7]">Electrician</span>{" "}
                  Job in Manchester Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Manchester has 8,500+ trade businesses competing for 540K households. 
                  With 3,400 missed calls every week across the city, 
                  Katie ensures you capture every electrical enquiry — EICR enquiries, emergency faults, consumer unit upgrades & power outages.
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
        {/* ─── CITY HUB LINK ─── */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[var(--v2-body)]">
              Also available across all trades in 
              <a href="/manchester" className="text-[var(--v2-green)] hover:underline">
                Manchester
              </a>
            </p>
          </div>
        </section>


        <div className="section-divider" />

        {/* ─── LOCAL STATS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Manchester Electricians Market
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                The numbers that matter for electricians in Manchester.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "8,500+", color: "text-amber-400" },
                { icon: Home, label: "Households", value: "540K", color: "text-blue-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "£310", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "3,400", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "£420M", color: "text-amber-400" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                    <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                    <div className="text-2xl font-bold text-[var(--v2-ink)] mb-1">{item.value}</div>
                    <div className="text-sm text-[var(--v2-muted)]">{item.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── SCENARIO ─── */}
        <section className="v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                The Real Cost of Missed Calls for Electricians in Manchester
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Rapid property development creates surge demand for trades. Weather emergencies cause unpredictable call spikes. Student housing market needs fast-turnaround maintenance. Old industrial buildings require specialist trade knowledge.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-[var(--v2-mint)] border-[var(--v2-green)]/20 border flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 text-[var(--v2-green)]`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">While You're on the Job</h3>
                    <p className="text-[var(--v2-body)] leading-relaxed">
                      You're on a commercial job doing a three-phase upgrade. Phone is on silent in the van. Missed 3 calls: one consumer unit upgrade (£850), one EV charger installation (£1,200), and one EICR for a landlord with 6 properties.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--v2-green)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">After Hours & Emergencies</h3>
                    <p className="text-[var(--v2-body)] leading-relaxed">
                      Family sitting in the dark with no heating in winter. They call you first because you have great reviews. You don't answer. They call the next electrician on Google who picks up immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6 text-center">
              <p className="text-[var(--v2-green-ink)] font-medium text-lg">
                The average Manchester electrician misses multiple calls per day = 
                <strong> £43,680</strong> in lost revenue per year
              </p>
              <p className="text-[var(--v2-body)] text-sm mt-1">
                Based on £350 avg job value with 35% conversion rate
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
                How Katie Works for Electricians in Manchester
              </h2>
              <p className="v2-lead max-w-2xl mx-auto">
                Three simple steps from missed call to booked job. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Katie Answers Instantly",
                  description: `Customer calls your Manchester number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.`,
                },
                {
                  step: "02",
                  icon: Zap,
                  title: "She Qualifies the Job",
                  description: `Katie asks the right questions: Manchester postcode, problem type, urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.`,
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert in 3 Seconds",
                  description: "A structured message lands on your phone: name, number, postcode, problem, urgency, and estimated value. Tap Accept, Call Back, or Decline. Customer gets an instant SMS either way.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 h-full">
                      <div className="text-5xl font-bold text-slate-200 mb-4">{item.step}</div>
                      <div className={`w-12 h-12 rounded-xl bg-[var(--v2-mint)] border-[var(--v2-green)]/20 border flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-[var(--v2-green)]`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-[var(--v2-body)] leading-relaxed">{item.description}</p>
                    </div>
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── WHY ELECTRICIANS IN MANCHESTER NEED AI CALL ANSWERING ─── */}
        <section className="v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Why Electricians in Manchester Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-[var(--v2-body)] leading-relaxed">
              <p>
                Manchester&apos;s electrical market is fuelled by a booming student population, commercial regeneration, and ageing housing stock. In Prestwich and Whitefield, family homes with 1960s wiring need regular EICR updates and consumer unit replacements. MediaCity&apos;s commercial hub generates calls for office fit-outs, data cabling, and three-phase installations, while the Northern Quarter&apos;s bars and restaurants need rapid-response electricians for emergency repairs that can&apos;t wait until morning. With 8,500+ trade businesses serving 540K households and 3,400 missed calls every week, Manchester&apos;s electricians face competition from every direction.
              </p>
              <p>
                The student HMO market is a defining feature. Areas around Fallowfield and Withington are packed with student houses that require annual electrical checks under HMO licensing rules. Landlords with multiple student properties book electricians months in advance for these inspections, but emergency calls still spike during term time when overloaded circuits trip or old wiring fails. A missed call from a landlord with five student properties isn&apos;t just one £310 job — it&apos;s a lost annual contract worth thousands. Katie captures the property type and whether the call relates to HMO compliance, ensuring you never miss the kind of recurring work that builds a stable Manchester trade business.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CITY LINKS ─── */}
        {/* ─── LOCAL CONTEXT ─── */}
        <section className="v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                What Electricians in Manchester Face Daily
              </h2>
            </div>
            <div className="space-y-6 text-[var(--v2-body)] leading-relaxed">
              <p>
                From MediaCity and the Northern Quarter to Didsbury and Salford, Manchester&apos;s electrical trade serves a city where industrial heritage meets modern regeneration. Ex-mill buildings in Ancoats converted to flats need complete rewiring and complex heating system integration. Red brick terraces across Chorlton and Levenshulme still run on original wiring that fails inspection after inspection. With 100,000+ students and a booming buy-to-let market, EICR demand never stops.
              </p>
              <p>
                Student HMOs across Fallowfield and Rusholme need annual EICRs and frequent emergency callouts for overloaded circuits. Commercial work in the city centre and MediaCity demands reliable trades who can work around office hours. New-build apartments in Salford Quays need EV charging infrastructure and smart home systems. Manchester&apos;s 867mm annual rainfall causes persistent damp that corrodes junction boxes and triggers RCD faults in older properties.
              </p>
              <p>
                Match days create traffic chaos that makes emergency callouts a logistical nightmare. When a student landlord in Withington books an EICR for a three-bed HMO, or a commercial client in Spinningfields needs out-of-hours fault finding, Katie captures the property details, flags the deadline, and delivers a structured enquiry to your WhatsApp — no callback needed, no detail missed.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />


        <section className="v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                More Electricians Locations
              </h2>
              <p className="text-[var(--v2-body)]">
                Katie answers calls for electricians across the UK.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <TradeCityLinks trade="for-electricians" current="manchester" />
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/for-electricians"
                className={`inline-flex items-center text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] font-medium transition-colors`}
              >
                View all electricians pages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FAQ ─── */}
        <section className="trade-faq v2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Questions Electricians in Manchester Ask
              </h2>
              <p className="text-[var(--v2-body)]">
                Everything you need to know about AI call answering for electricians in Manchester.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold mb-3" itemProp="name">{faq.question}</h3>
                  <p className="text-[var(--v2-body)] leading-relaxed" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <span itemProp="text">{faq.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="v2-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="v2-h2 mb-4">
                Trusted by Electricians Across the UK
              </h2>
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
                    <Icon className={`w-8 h-8 text-[var(--v2-green)] mx-auto mb-3`} />
                    <p className="font-semibold text-[var(--v2-ink)]">{item.label}</p>
                    <p className="text-sm text-[var(--v2-muted)]">{item.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FINAL CTA ─── */}
        <section className="bg-[var(--v2-navy)] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Electrician Jobs in Manchester Today
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

      <Footer />
    </>
  )
}
