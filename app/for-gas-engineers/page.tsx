import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { ArrowRight, Phone, Flame, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, Home, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Call Answering for Gas Engineers UK — 24/7",
  description: "Never miss a gas safety enquiry again. Katie answers 24/7, captures CP12 certificates, boiler breakdowns, gas leaks & carbon monoxide emergencies. WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-gas-engineers",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-gas-engineers",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Gas Engineers UK — 24/7",
    description: "Never miss a gas safety enquiry again. Katie answers 24/7, captures CP12 certificates, boiler breakdowns, gas leaks & carbon monoxide emergencies. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Gas Engineers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for Gas Engineers UK — 24/7",
    description: "Never miss a gas safety enquiry again. Katie answers 24/7, captures CP12 certificates, boiler breakdowns, gas leaks & carbon monoxide emergencies. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How much does AI call answering cost for gas engineers?",
    answer: "whoza.ai starts at £59/month for the Starter plan. That's less than one CP12 gas safety certificate job. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most gas engineers recover the cost within 48 hours by capturing just one missed boiler breakdown or gas leak enquiry.",
  },
  {
    question: "Can Katie handle gas leak emergencies at night?",
    answer: "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She is specifically trained to identify gas emergencies (gas leak smell, carbon monoxide alarm, boiler not firing, no hot water in winter) and marks them as highest priority. For gas leaks, she provides immediate safety advice (open windows, turn off gas at meter, don't use switches) while getting your details for urgent callback.",
  },
  {
    question: "What information does Katie collect from gas safety customers?",
    answer: "Katie captures: full name, phone number, postcode, property type (house/flat/commercial), job type (CP12, boiler breakdown, gas leak, carbon monoxide check, appliance installation), urgency level, property age, boiler type and brand, and whether it's a landlord or homeowner. For CP12s, she also asks about number of appliances, property size, and preferred certificate date.",
  },
  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing Gas Safe registered business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and your existing voicemail stays as a backup. Works with mobile and landline numbers.",
  },
  {
    question: "Can Katie handle CP12 and gas safety certificate enquiries?",
    answer: "Yes. Katie is specifically trained for gas safety certificate work. She captures: property type and size, number of gas appliances (boiler, hob, fire), certificate type (CP12/Landlord Gas Safety Record, service, installation), number of properties for portfolio landlords, and preferred date. These are tagged as 'landlord-gas' in your dashboard for fast bulk scheduling — your most reliable repeat income.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most gas engineers are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required. You can test it with a call from your own phone within minutes.",
  },
  {
    question: "Can Katie book gas safety appointments directly into my calendar?",
    answer: "Yes. Katie checks your connected calendar availability and offers specific time slots to customers. When they confirm, the appointment is saved to your calendar and both parties receive confirmation. For CP12s, she can offer morning or afternoon slots. For boiler breakdowns and gas leaks, she flags them for immediate callback with an emergency tag.",
  },
  {
    question: "What happens if Katie can't handle a complex gas enquiry?",
    answer: "Katie recognises when a call needs human attention — for complex boiler replacements, multi-appliance commercial jobs, or warranty enquiries. She takes a detailed message, captures all available context (appliance details, warranty status, previous work history), and flags it for your immediate callback. You receive the full details in WhatsApp so you can call back fully prepared.",
  },
]

export const revalidate = 3600

export default function ForGasEngineersPage() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai for Gas Engineers — AI Call Answering Demo"
        description="Watch Katie capture a missed gas safety enquiry in under 60 seconds. Boiler breakdown emergency answered instantly, details sent to WhatsApp, CP12 booking confirmed while the gas engineer is still on another job."
        embedUrl="https://whoza.ai/for-gas-engineers"
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Gas Engineers", item: "https://whoza.ai/for-gas-engineers" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      {/* Schema JSON-LD */}
      <script
        id="gas-engineer-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "whoza.ai — AI Call Answering for Gas Engineers",
            "url": "https://whoza.ai/for-gas-engineers",
            "description": "AI call answering service for UK Gas Safe registered engineers. Katie answers missed calls 24/7, captures CP12 enquiries, boiler breakdowns, gas leaks, and delivers job details via WhatsApp in 3 seconds.",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling for Gas Engineers",
            "knowsAbout": ["Gas Safety", "CP12", "Boiler Repairs", "Gas Leaks", "Carbon Monoxide", "Gas Safe Registered", "Landlord Gas Safety"],
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
        id="gas-engineer-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Call Answering for UK Gas Engineers",
            "provider": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "serviceType": "AI Call Handling",
            "description": "24/7 AI call answering for UK Gas Safe registered engineers. Captures CP12 certificates, boiler breakdowns, gas leaks, carbon monoxide emergencies, and delivers details via WhatsApp in 3 seconds.",
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
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Flame className="w-4 h-4" />
                  Built for Gas Safe Engineers
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  Never Miss a{" "}
                  <span className="text-orange-400">Gas Safety</span>{" "}
                  Call Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Boiler breakdowns in winter. CP12 certificate renewals. Gas leak emergencies. Carbon monoxide alarms. When customers call about gas, it's urgent. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
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
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">Emergency — No Heating</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached Green Gas Services. I'm Katie, your digital assistant. How can I help today?"</p>
                    </div>
                    <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                      <p className="text-sm text-white/90">"Our boiler's completely dead and we've got no hot water. It's freezing and I've got a newborn!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I completely understand — no heating with a newborn is an emergency. Can you confirm your postcode so I can get a gas engineer to you as soon as possible?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent to gas engineer in 2.8 seconds
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
                The Real Cost of Missed Gas Safety Calls
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every missed call is a job going to your competitor. Here's what gas engineers lose every single week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Boiler Breakdowns in Winter",
                  description: "Family with no heating in -2°C weather. They call you first because you're Gas Safe registered and local. You don't answer. They call the next engineer on the Gas Safe Register who picks up. You lost a £350 emergency callout plus a £2,400 boiler replacement.",
                  stat: "£350+ lost per call",
                  color: "red",
                },
                {
                  icon: Shield,
                  title: "CP12 Certificate Renewals Go to Voicemail",
                  description: "Landlord with 12 properties needs annual CP12s for all tenants. Leaves a voicemail. By the time you call back 4 hours later, they've already booked another Gas Safe engineer for the entire portfolio. You lost £960 in certificate work and a reliable annual repeat customer.",
                  stat: "78% hire first responder",
                  color: "amber",
                },
                {
                  icon: Flame,
                  title: "Gas Leak Emergencies While on Another Job",
                  description: "You're doing a boiler service in a customer's loft. Phone is on silent. Missed 2 calls: one gas leak smell enquiry (emergency £400 callout) and one carbon monoxide alarm activation (emergency £350 callout). Both went to competitors. £750 lost in 45 minutes.",
                  stat: "£750 lost in one afternoon",
                  color: "red",
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
                The average UK gas engineer misses 4 calls per day = <strong>£46,720</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Source: UK SME Communications Survey 2025 — based on £320 avg job value, 35% conversion rate
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
                How Katie Works for Gas Engineers
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Three simple steps from missed call to booked gas safety job. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Katie Answers Instantly",
                  description: "Customer calls your number. Katie picks up in under 2 rings with your branded greeting: 'Hello, Green Gas Services. I'm Katie, how can I help?' — 24/7, even at midnight on a bank holiday when a boiler breaks down.",
                },
                {
                  step: "02",
                  icon: Flame,
                  title: "She Qualifies the Job",
                  description: "Katie asks the right questions: postcode, job type (CP12, boiler breakdown, gas leak, carbon monoxide, appliance installation), urgency level, boiler type and brand, property type, and whether it's a landlord or homeowner. She identifies gas emergencies immediately and provides safety advice.",
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "You Get WhatsApp in 3 Seconds",
                  description: "A structured message lands on your phone: name, number, postcode, job type, urgency, boiler details, and property type. Tap Accept, Call Back, or Decline. Customer gets an instant SMS either way. For CP12s, she also captures appliance count and certificate due date.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                      <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-orange-400" />
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
                className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium transition-colors"
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
              Gas Engineer Success Story
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed text-white/90 mb-8">
              "I was losing CP12 bookings every week because I was on jobs and couldn't answer. whoza.ai captured 11 landlord certificate enquiries in my first month that I would have missed. That's <span className="text-emerald-400 font-bold">£3,520</span> in recovered revenue — and they're all annual repeat customers."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">
                TC
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Tom Carter</p>
                <p className="text-white/50 text-sm">Gas Safe Registered Engineer, Birmingham</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="mt-6 text-white/50 text-sm">
              Read more about how trades recover revenue: <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="text-orange-400 hover:text-orange-300 underline">How Much Do Missed Calls Cost UK Trades?</a>
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PRICING CTA ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Recovered CP12 Pays for the Whole Year
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              At £59/month, Katie costs less than one gas safety certificate. Most gas engineers recover that cost within 48 hours.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">£59</div>
                <div className="text-sm text-white/50">per month</div>
                <div className="text-xs text-white/40 mt-1">Starter Plan</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">£320</div>
                <div className="text-sm text-white/50">avg job value</div>
                <div className="text-xs text-white/40 mt-1">Gas safety callout</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">442%</div>
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
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Gas Engineers Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for gas safety businesses.
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
                <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-orange-400 hover:text-orange-300 underline">
                  complete AI call answering guide
                </a>{" "}
                or{" "}
                <a href="/pricing" className="text-orange-400 hover:text-orange-300 underline">
                  compare all pricing plans
                </a>.
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
                Trusted by Gas Engineers Across the UK
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From solo Gas Safe engineers in London to multi-van teams in Manchester, gas professionals rely on Katie to capture every call.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: "Gas Safe Aligned", sub: "Works with registered engineers" },
                { icon: Clock, label: "24/7 Coverage", sub: "Including bank holidays" },
                { icon: PoundSterling, label: "£1.2M+ Revenue", sub: "Recovered for trades" },
                { icon: Star, label: "4.9/5 Rating", sub: "From verified users" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
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
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Gas Safety Jobs Today
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

      <Footer />
    </>
  )
}
