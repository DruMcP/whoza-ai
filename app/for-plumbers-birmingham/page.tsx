import { Metadata } from "next"
import CityTradeSchema from "@/components/CityTradeSchema";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, Droplets, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, TrendingUp, Users, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TradeCityLinks } from "@/components/whoza/trade-city-links"

export const metadata: Metadata = {
  title: "AI Call Answering for Plumbers in Birmingham | whoza.ai",
  description: "Stop losing plumber jobs to missed calls in Birmingham. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
  alternates: {
    canonical: "https://whoza.ai/for-plumbers-birmingham",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-plumbers-birmingham",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Plumbers in Birmingham | whoza.ai",
    description: "Stop losing plumber jobs to missed calls in Birmingham. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Plumbers in Birmingham" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Plumbers in Birmingham | whoza.ai",
    description: "Stop losing plumber jobs to missed calls in Birmingham. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for plumbers in Birmingham?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one plumber job in Birmingham. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most plumbers recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for plumbers in Birmingham?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Birmingham or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from plumbers customers in Birmingham?",
    "answer": "Katie captures: full name, phone number, Birmingham postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Birmingham business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Birmingham business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a plumber in Birmingham?",
    "answer": "Most plumbers in Birmingham are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for plumbers in Birmingham?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for plumbers. She understands burst pipe emergencies, boiler breakdowns, blocked drains & leak enquiries — and with 11,000+ trade businesses competing in Birmingham, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForPlumberBirminghamPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Birmingham", item: "https://whoza.ai/birmingham" },
        { name: "For Plumbers", item: "https://whoza.ai/for-plumbers" },
        { name: "Plumbers in Birmingham", item: "https://whoza.ai/for-plumbers-birmingham" },
      ]} />
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />

      {/* Schema JSON-LD */}
            <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
      <CityTradeSchema trade="Plumber" tradePlural="Plumbers" city="Birmingham" region="West Midlands" pageUrl="https://whoza.ai/for-plumbers-birmingham" />
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
                  Plumbers in Birmingham
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  Never Miss a{" "}
                  <span className="text-blue-400">Plumber</span>{" "}
                  Job in Birmingham Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Birmingham has 11,000+ trade businesses competing for 680K households. 
                  With 4,100 missed calls every week across the city, 
                  Katie ensures you capture every plumbing enquiry — burst pipe emergencies, boiler breakdowns, blocked drains & leak enquiries.
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

        <div className="section-divider" />

        {/* ─── LOCAL STATS ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Birmingham Plumbers Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for plumbers in Birmingham.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "11,000+", color: "text-blue-400" },
                { icon: Home, label: "Households", value: "680K", color: "text-blue-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "£295", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "4,100", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "£380M", color: "text-amber-400" },
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
                The Real Cost of Missed Calls for Plumbers in Birmingham
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Large suburban areas mean longer travel times between jobs. Diverse housing from 1930s semis to modern apartments. High tenant turnover in rental areas means constant maintenance calls. Construction demand spikes from major infrastructure projects.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-blue-500/10 border-blue-500/20 border flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 text-blue-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">While You're on the Job</h3>
                    <p className="text-white/60 leading-relaxed">
                      You're under a sink fixing a waste pipe. Phone vibrates in your pocket. Can't answer — hands full of muck, water everywhere. Check missed call at 4pm. Customer already booked someone else.
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
                      A tenant calls about a burst pipe at 2am while you're asleep. They leave a voicemail, then call the next plumber on Google. You lose a £400 emergency callout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average Birmingham plumber misses multiple calls per day = 
                <strong> £50,568</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Based on £280 avg job value with 35% conversion rate
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
                How Katie Works for Plumbers in Birmingham
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
                  description: `Customer calls your Birmingham number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.`,
                },
                {
                  step: "02",
                  icon: Droplets,
                  title: "She Qualifies the Job",
                  description: `Katie asks the right questions: Birmingham postcode, problem type, urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.`,
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
                      <div className={`w-12 h-12 rounded-xl bg-blue-500/10 border-blue-500/20 border flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-blue-400`} />
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

        {/* ─── WHY PLUMBERS IN BIRMINGHAM NEED AI CALL ANSWERING ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Plumbers in Birmingham Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Birmingham&apos;s sprawling suburban layout and diverse housing stock create unique plumbing challenges across the city. In Edgbaston and Moseley, large Victorian and Edwardian homes with original plumbing systems require specialist knowledge for repairs and upgrades. Digbeth&apos;s industrial heritage means converted warehouse apartments with modern systems sit alongside older terraces in need of frequent maintenance. Meanwhile, Sutton Coldfield&apos;s suburban semis face seasonal pressure — cold snaps freeze outdoor pipes and push call volumes well beyond what a solo plumber can handle. With 9,500+ trade businesses competing across 680K households and 3,600 missed calls every week, the demand is relentless.
              </p>
              <p>
                One factor that sets Birmingham apart is its extensive canal network, which runs through neighbourhoods like Digbeth and impacts basement properties directly. Plumbers here regularly deal with flooding and damp-related pipe issues that wouldn&apos;t occur in other cities. Combined with the city&apos;s cold winters — pipe freezes are a genuine annual crisis — Birmingham plumbers face a double threat of weather emergencies and infrastructure-age problems. Katie captures the urgency and location specifics, whether it&apos;s a burst pipe in a Moseley Victorian or basement flooding near the canal, making sure you don&apos;t lose a £280 average job to a competitor who simply picked up the phone.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CITY LINKS ─── */}
        {/* ─── LOCAL CONTEXT ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Plumbers in Birmingham Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                From Edgbaston and Moseley to Digbeth and Sutton Coldfield, Birmingham&apos;s plumbing trade faces a city in transition. Victorian villas in Handsworth and period homes in Kings Heath still rely on original plumbing that fails without warning, while the Big City Plan drives new-build developments across Digbeth and Smithfield. As the youngest city in Europe, Birmingham&apos;s 40% under-25 population creates constant demand for rental property maintenance.
              </p>
              <p>
                Birmingham&apos;s inland position means colder winters than coastal cities — temperatures regularly drop below freezing in January and February, bursting pipes in poorly insulated 1930s semis across Kingstanding and Erdington. Summer thunderstorms cause flash flooding and drainage issues, particularly in the 35 miles of canal-side properties where basement flooding is a recurring problem. Post-war estates in Castle Vale and Bromford need responsive maintenance for aging pipework.
              </p>
              <p>
                With £10bn of regeneration investment, specialist trades are in constant demand — but customers won&apos;t wait. When a first-time buyer in Harborne discovers a leak during their survey, or a landlord in Selly Oak needs an emergency callout for a student property, Katie captures every detail, qualifies the job, and delivers it to your WhatsApp while you&apos;re still on your current fix.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />


        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                More Plumbers Locations
              </h2>
              <p className="text-white/60">
                Katie answers calls for plumbers across the UK.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <TradeCityLinks trade="for-plumbers" current="birmingham" />
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/for-plumbers"
                className={`inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors`}
              >
                View all plumbers pages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── FAQ ─── */}
        <section className="trade-faq py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Plumbers in Birmingham Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for plumbers in Birmingham.
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
                Trusted by Plumbers Across the UK
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
                    <Icon className={`w-8 h-8 text-blue-400 mx-auto mb-3`} />
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
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Plumber Jobs in Birmingham Today
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
