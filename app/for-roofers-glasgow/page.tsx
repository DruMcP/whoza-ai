import { Metadata } from "next"
import CityTradeSchema from "@/components/CityTradeSchema";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, Home, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TradeCityLinks } from "@/components/whoza/trade-city-links"

export const metadata: Metadata = {
  title: "AI Call Answering for Roofers in Glasgow | whoza.ai",
  description: "Stop losing roofer jobs to missed calls in Glasgow. Katie answers 24/7, captures storm damage and repair enquiries via WhatsApp. Plans from £59/month.",
  alternates: {
    canonical: "https://whoza.ai/for-roofers-glasgow",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-roofers-glasgow",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Roofers in Glasgow | whoza.ai",
    description: "Stop losing roofer jobs to missed calls in Glasgow. Katie answers 24/7, captures storm damage and repair enquiries via WhatsApp. Plans from £59/month.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Roofers in Glasgow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Roofers in Glasgow | whoza.ai",
    description: "Stop losing roofer jobs to missed calls in Glasgow. Katie answers 24/7, captures storm damage and repair enquiries via WhatsApp. Plans from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for roofers in Glasgow?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one roofer job in Glasgow. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most roofers recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for roofers in Glasgow?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Glasgow or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from roofers customers in Glasgow?",
    "answer": "Katie captures: full name, phone number, Glasgow postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Glasgow business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Glasgow business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a roofer in Glasgow?",
    "answer": "Most roofers in Glasgow are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for roofers in Glasgow?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for roofers. She understands storm damage, slipped tiles, leak emergencies & full re-roof quotes — and with 5,500+ trade businesses competing in Glasgow, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForRooferGlasgowPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Glasgow", item: "https://whoza.ai/glasgow" },
        { name: "For Roofers", item: "https://whoza.ai/for-roofers" },
        { name: "Roofers in Glasgow", item: "https://whoza.ai/for-roofers-glasgow" },
      ]} />
      <div>
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />
      </div>

            <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
      <CityTradeSchema trade="Roofer" tradePlural="Roofers" city="Glasgow" region="Greater Glasgow" pageUrl="https://whoza.ai/for-roofers-glasgow" />
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-500/10 text-slate-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Home className="w-4 h-4" />
                  Roofers in Glasgow
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  Never Miss a{" "}
                  <span className="text-slate-400">Roofer</span>{" "}
                  Job in Glasgow Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Glasgow has 5,500+ trade businesses competing for 310K households. 
                  With 2,600 missed calls every week across the city, 
                  Katie ensures you capture every roofing enquiry — storm damage, slipped tiles, leak emergencies & full re-roof quotes.
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
            <p className="text-white/60">
              Also available across all trades in 
              <a href="/glasgow" className="text-emerald-400 hover:underline">
                Glasgow
              </a>
            </p>
          </div>
        </section>


        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Glasgow Roofers Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for roofers in Glasgow.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "5,500+", color: "text-slate-400" },
                { icon: Home, label: "Households", value: "310K", color: "text-slate-400" },
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
                The Real Cost of Missed Calls for Roofers in Glasgow
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Tenement buildings have shared systems — emergencies affect multiple flats. Harsh winters cause boiler and heating emergencies to spike. Older housing stock needs frequent updates.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-500/10 border-slate-500/20 border flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 text-slate-400`} />
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
                      A customer calls about an urgent issue at 8pm while you're having dinner. They leave a voicemail, then call the next roofer on Google. You lose a £290+ job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average Glasgow roofer misses multiple calls per day = 
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
                How Katie Works for Roofers in Glasgow
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
                  icon: Home,
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
                      <div className={`w-12 h-12 rounded-xl bg-slate-500/10 border-slate-500/20 border flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-slate-400`} />
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

        {/* ─── LOCAL CONTEXT ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Roofers in Glasgow Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Partick and Hillhead in the West End are lined with sandstone tenements whose slate roofs have endured over a century of Glasgow&apos;s notorious weather. Pollokshields and Shawlands in the Southside mix tenement flats with larger Victorian villas where roof maintenance is a constant priority. Milngavie and Bearsden offer suburban detached homes with more conventional pitched roofs, but even these face the same relentless rain that defines the city.
              </p>
              <p>
                Glasgow receives 1,124mm of rainfall per year — the highest of any major UK city. Persistent damp and driving wind from the west cause gutter overflow, flashing failures, and gradual slate slippage that can turn a minor leak into a major repair. Harsh winters bring frequent freeze-thaw cycles that crack mortar and pointing, particularly on older properties in Dennistoun and the East End where maintenance budgets have been stretched thin.
              </p>
              <p>
                The Glasgow Housing Association manages 43,000 homes and maintains approved contractor lists for responsive repairs. Getting and staying on these lists requires demonstrable reliability — including answering calls during peak emergency periods. When a GHA property in Drumchapel reports a roof leak at 5:30pm and you&apos;re finishing a job in Newton Mearns, Katie captures the enquiry, notes the housing association context, and delivers it to your WhatsApp with the urgency flagged. That responsiveness is what keeps you on the approved list.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for Roofers Across the UK
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for roofers in cities nationwide. Find your location:
            </p>
            <TradeCityLinks trade="for-roofers" current="glasgow" />
            <div className="mt-6">
              <Link href="/for-roofers" className="inline-flex items-center text-slate-400 hover:text-slate-300 text-sm font-medium transition-all">
                View all Roofers →
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="trade-faq py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Roofers in Glasgow Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for roofers in Glasgow.
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
                Trusted by Roofers Across the UK
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
                    <Icon className={`w-8 h-8 text-slate-400 mx-auto mb-3`} />
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
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Roofer Jobs in Glasgow Today
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
