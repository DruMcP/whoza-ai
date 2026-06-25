import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, Paintbrush, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, TrendingUp, Users, Home } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Call Answering for Painters & Decorators in Glasgow | whoza.ai",
  description: "Stop losing painters decorators jobs to missed calls in Glasgow. Katie answers 24/7, captures water damage, urgent touch-ups & pre-sale makeovers, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-painters-decorators-glasgow",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-painters-decorators-glasgow",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Painters & Decorators in Glasgow | whoza.ai",
    description: "Stop losing painters decorators jobs to missed calls in Glasgow. Katie answers 24/7, captures water damage, urgent touch-ups & pre-sale makeovers, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Painters & Decorators in Glasgow" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for Painters & Decorators in Glasgow | whoza.ai",
    description: "Stop losing painters decorators jobs to missed calls in Glasgow. Katie answers 24/7, captures water damage, urgent touch-ups & pre-sale makeovers, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for painters decorators in Glasgow?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one painter & decorator job in Glasgow. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most painters & decorators recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for painters decorators in Glasgow?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Glasgow or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from painters decorators customers in Glasgow?",
    "answer": "Katie captures: full name, phone number, Glasgow postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Glasgow business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Glasgow business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a painter & decorator in Glasgow?",
    "answer": "Most painters & decorators in Glasgow are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for painters decorators in Glasgow?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for painters & decorators. She understands interior painting, exterior painting, wallpapering & decorative finishes — and with 5,500+ trade businesses competing in Glasgow, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForPainterDecoratorGlasgowPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Painters & Decorators", item: "https://whoza.ai/for-painters-decorators" },
        { name: "Glasgow", item: "https://whoza.ai/for-painters-decorators-glasgow" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <script
        id="painters-decorators-glasgow-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))
              },
              {
                "@type": "LocalBusiness",
                "name": "whoza.ai - AI Call Answering for Painters & Decorators in Glasgow",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Glasgow",
                  "addressCountry": "GB"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "55.8642",
                  "longitude": "-4.2518"
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
                "serviceType": "AI Call Answering for Painters & Decorators",
                "areaServed": {
                  "@type": "City",
                  "name": "Glasgow"
                }
              },
              {
                "@type": "VideoObject",
                "name": "Whoza.ai 60-Second Demo — Katie Answers Every Call",
                "description": "Watch Katie, Whoza's AI call handler, capture a missed enquiry in under 60 seconds. The call is answered instantly, the enquiry lands in WhatsApp, Claire requests a review, and Rex delivers growth insights. Built for UK tradespeople.",
                "thumbnailUrl": "https://whoza.ai/og-image.webp",
                "uploadDate": "2026-06-01",
                "duration": "PT60S",
                "embedUrl": "https://whoza.ai",
                "publisher": {
                  "@type": "Organization",
                  "name": "whoza.ai",
                  "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" }
                }
              },
              {
                "@type": "Organization",
                "@id": "https://whoza.ai/#organization",
                "name": "whoza.ai",
                "url": "https://whoza.ai",
                "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" },
                "sameAs": [
                  "https://twitter.com/whozaai",
                  "https://www.linkedin.com/company/whoza-ai"
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai" },
                  { "@type": "ListItem", "position": 2, "name": "For Painters & Decorators", "item": "https://whoza.ai/for-painters-decorators" },
                  { "@type": "ListItem", "position": 3, "name": "Glasgow", "item": "https://whoza.ai/for-painters-decorators-glasgow" }
                ]
              }
            ]
          })
        }}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Paintbrush className="w-4 h-4" />
                  Painters & Decorators in Glasgow
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  Never Miss a{" "}
                  <span className="text-purple-400">Painter & Decorator</span>{" "}
                  Job in Glasgow Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Glasgow has 5,500+ trade businesses competing for 310K households. 
                  With 2,600 missed calls every week across the city, 
                  Katie ensures you capture every painters decorators enquiry — interior painting, exterior painting, wallpapering & decorative finishes.
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
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">Glasgow — Painter & Decorator Enquiry</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached the business. I'm Katie, your digital assistant. How can I help today?"</p>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3 border-purple-500/20 border">
                      <p className="text-sm text-white/90">"I need a painter & decorator urgently in Glasgow!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — let me get your details so I can get help to you quickly. Can you confirm your Glasgow postcode?"</p>
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

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Glasgow Painters & Decorators Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for painters & decorators in Glasgow.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "5,500+", color: "text-purple-400" },
                { icon: Home, label: "Households", value: "310K", color: "text-purple-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "£290", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "2,600", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "£220M", color: "text-amber-400" },
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

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The Real Cost of Missed Calls for Painters & Decorators in Glasgow
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Tenement buildings have shared systems — emergencies affect multiple flats. Harsh winters cause boiler and heating emergencies to spike. Older housing stock needs frequent updates.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-purple-500/10 border-purple-500/20 border flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 text-purple-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">While You're on the Job</h3>
                    <p className="text-white/60 leading-relaxed">
                      You're mid-job and your phone rings. Can't answer — hands full, focused on the task. Check missed call at break. Customer already booked someone else.
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
                      A customer calls about an urgent issue at 8pm while you're having dinner. They leave a voicemail, then call the next painter & decorator on Google. You lose a £290+ job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average Glasgow painter & decorator misses multiple calls per day = 
                <strong> £45,000+</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Based on £290 avg job value with 35% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Works for Painters & Decorators in Glasgow
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
                  description: `Customer calls your Glasgow number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.`,
                },
                {
                  step: "02",
                  icon: Paintbrush,
                  title: "She Qualifies the Job",
                  description: `Katie asks the right questions: Glasgow postcode, problem type, urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.`,
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
                      <div className={`w-12 h-12 rounded-xl bg-purple-500/10 border-purple-500/20 border flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-purple-400`} />
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
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for Painters & Decorators Across the UK
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for painters & decorators in cities nationwide. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/for-painters-decorators-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
              <Link href="/for-painters-decorators-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
              <Link href="/for-painters-decorators-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
              <Link href="/for-painters-decorators-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
              <Link href="/for-painters-decorators-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
              <Link href="/for-painters-decorators-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
              <Link href="/for-painters-decorators-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
              <Link href="/for-painters-decorators-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
            </div>
            <div className="mt-6">
              <Link href="/for-painters-decorators" className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-all">
                View all Painters & Decorators →
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Painters & Decorators in Glasgow Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for painters & decorators in Glasgow.
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

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by Painters & Decorators Across the UK
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
                    <Icon className={`w-8 h-8 text-purple-400 mx-auto mb-3`} />
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Painter & Decorator Jobs in Glasgow Today
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
