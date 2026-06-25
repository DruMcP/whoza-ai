import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, KeyRound, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, MapPin, TrendingUp, Users, Home } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Call Answering for Locksmiths in Manchester | whoza.ai",
  description: "Stop losing locksmiths jobs to missed calls in Manchester. Katie answers 24/7, captures emergency lockouts, key replacements, security upgrades & commercial lock changes, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-locksmiths-manchester",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-locksmiths-manchester",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Locksmiths in Manchester | whoza.ai",
    description: "Stop losing locksmiths jobs to missed calls in Manchester. Katie answers 24/7, captures emergency lockouts, key replacements, security upgrades & commercial lock changes, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Locksmiths in Manchester" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for Locksmiths in Manchester | whoza.ai",
    description: "Stop losing locksmiths jobs to missed calls in Manchester. Katie answers 24/7, captures emergency lockouts, key replacements, security upgrades & commercial lock changes, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for locksmiths in Manchester?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one locksmith job in Manchester. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most locksmiths recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for locksmiths in Manchester?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Manchester or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from locksmiths customers in Manchester?",
    "answer": "Katie captures: full name, phone number, Manchester postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Manchester business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Manchester business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a locksmith in Manchester?",
    "answer": "Most locksmiths in Manchester are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for locksmiths in Manchester?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for locksmiths. She understands emergency lockouts, key replacements, security upgrades & commercial lock changes — and with 8,500+ trade businesses competing in Manchester, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForLocksmithManchesterPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Locksmiths", item: "https://whoza.ai/for-locksmiths" },
        { name: "Manchester", item: "https://whoza.ai/for-locksmiths-manchester" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      {/* Schema JSON-LD */}
      <script
        id="locksmith-manchester-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FAQPage",
                "mainEntity": [{"@type":"Question","name":"How much does AI call answering cost for locksmiths in Manchester?","acceptedAnswer":{"@type":"Answer","text":"whoza.ai starts at £59/month for the Starter plan. That's less than one locksmith job in Manchester. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most locksmiths recover the cost within 48 hours by capturing just one missed job."}},{"@type":"Question","name":"Can Katie handle emergency calls for locksmiths in Manchester?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Manchester or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."}},{"@type":"Question","name":"What information does Katie collect from locksmiths customers in Manchester?","acceptedAnswer":{"@type":"Answer","text":"Katie captures: full name, phone number, Manchester postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."}},{"@type":"Question","name":"Does it work with my existing Manchester business phone number?","acceptedAnswer":{"@type":"Answer","text":"Yes. You simply set up call forwarding from your existing Manchester business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."}},{"@type":"Question","name":"How quickly can I get set up as a locksmith in Manchester?","acceptedAnswer":{"@type":"Answer","text":"Most locksmiths in Manchester are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."}},{"@type":"Question","name":"What makes whoza.ai different for locksmiths in Manchester?","acceptedAnswer":{"@type":"Answer","text":"Unlike generic call answering services, Katie is trained specifically for locksmiths. She understands emergency lockouts, key replacements, security upgrades & commercial lock changes — and with 8,500+ trade businesses competing in Manchester, capturing every call gives you a real competitive edge."}}]
              },
              {
                "@type": "LocalBusiness",
                "name": "whoza.ai - AI Call Answering for Locksmiths in Manchester",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Manchester",
                  "addressCountry": "GB"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "53.4808",
                  "longitude": "-2.2426"
                },
                "priceRange": "££",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127"
                }
              },
              {
                "@type": "Service",
                "serviceType": "AI Call Answering for Locksmiths",
                "areaServed": {
                  "@type": "City",
                  "name": "Manchester"
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai" },
                  { "@type": "ListItem", "position": 2, "name": "For Locksmiths", "item": "https://whoza.ai/for-locksmiths" },
                  { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "https://whoza.ai/for-locksmiths-manchester" }
                ]
              }
            ]
          })
        }}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <KeyRound className="w-4 h-4" />
                  Locksmiths in Manchester
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  Never Miss a{" "}
                  <span className="text-cyan-400">Locksmith</span>{" "}
                  Job in Manchester Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Manchester has 8,500+ trade businesses competing for 540K households. 
                  With 3,400 missed calls every week across the city, 
                  Katie ensures you capture every locksmiths enquiry — emergency lockouts, key replacements, security upgrades & commercial lock changes.
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
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">Manchester — Locksmith Enquiry</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached the business. I'm Katie, your digital assistant. How can I help today?"</p>
                    </div>
                    <div className="bg-cyan-500/10 rounded-lg p-3 border-cyan-500/20 border">
                      <p className="text-sm text-white/90">"I need a locksmith urgently in Manchester!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — let me get your details so I can get help to you quickly. Can you confirm your Manchester postcode?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent in 2.8 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── LOCAL STATS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Manchester Locksmiths Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for locksmiths in Manchester.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "8,500+", color: "text-cyan-400" },
                { icon: Home, label: "Households", value: "540K", color: "text-blue-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "£310", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "3,400", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "£420M", color: "text-amber-400" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-sm text-white/50">{item.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── SCENARIO ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The Real Cost of Missed Calls for Locksmiths in Manchester
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Rapid property development creates surge demand for trades. Weather emergencies cause unpredictable call spikes. Student housing market needs fast-turnaround maintenance. Old industrial buildings require specialist trade knowledge.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-cyan-500/10 border-cyan-500/20 border flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 text-cyan-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">While You're on the Job</h3>
                    <p className="text-white/60 leading-relaxed">
                      It's 2am and you're asleep. A tenant is locked out of their flat. They call you first. Voicemail. They call the next locksmith on Google who answers and dispatches immediately. You lose a £180 emergency callout.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">After Hours & Emergencies</h3>
                    <p className="text-white/60 leading-relaxed">
                      You're on a commercial lock change job and miss three calls. One is a landlord needing 12 properties re-keyed (£1,200), another is a burglary victim needing urgent security upgrade (£650), and the third is a routine key copy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average Manchester locksmith misses multiple calls per day = 
                <strong> £42,120</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Based on £180 avg lockout value with 35% conversion rate
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
                How Katie Works for Locksmiths in Manchester
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
                  description: `Customer calls your Manchester number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.`,
                },
                {
                  step: "02",
                  icon: KeyRound,
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
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                      <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>
                      <div className={`w-12 h-12 rounded-xl bg-cyan-500/10 border-cyan-500/20 border flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-cyan-400`} />
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
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CITY LINKS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                More Locksmiths Locations
              </h2>
              <p className="text-white/60">
                Katie answers calls for locksmiths across the UK.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["London", "Manchester", "Birmingham", "Glasgow", "Bristol", "Liverpool", "Leeds", "Edinburgh"].map(city => (
                <Link
                  key={city}
                  href={`/for-locksmiths-${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/for-locksmiths"
                className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors`}
              >
                View all locksmiths pages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FAQ ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Locksmiths in Manchester Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for locksmiths in Manchester.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold mb-3" itemProp="name">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <span itemProp="text">{faq.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TRUST SIGNALS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by Locksmiths Across the UK
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
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className={`w-8 h-8 text-cyan-400 mx-auto mb-3`} />
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FINAL CTA ─── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Locksmith Jobs in Manchester Today
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
