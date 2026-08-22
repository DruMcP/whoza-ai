import { Metadata } from "next"
import CityTradeSchema from "@/components/CityTradeSchema";
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ArrowRight, Phone, Wrench, Shield, Clock, PoundSterling, CheckCircle2, Star, AlertTriangle, TrendingUp, Users, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "AI Call Answering for Plumbers in Edinburgh | whoza.ai",
  description: "Stop losing plumber jobs to missed calls in Edinburgh. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
  alternates: {
    canonical: "https://whoza.ai/for-plumbers-edinburgh",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-plumbers-edinburgh",
    siteName: "Whoza.ai",
    title: "AI Call Answering for Plumbers in Edinburgh | whoza.ai",
    description: "Stop losing plumber jobs to missed calls in Edinburgh. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for Plumbers in Edinburgh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for Plumbers in Edinburgh | whoza.ai",
    description: "Stop losing plumber jobs to missed calls in Edinburgh. Katie answers 24/7, captures burst pipe and boiler enquiries via WhatsApp. Plans from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for plumbers in Edinburgh?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one plumber job in Edinburgh. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most plumbers recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for plumbers in Edinburgh?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in Edinburgh or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from plumbers customers in Edinburgh?",
    "answer": "Katie captures: full name, phone number, Edinburgh postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing Edinburgh business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing Edinburgh business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a plumber in Edinburgh?",
    "answer": "Most plumbers in Edinburgh are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for plumbers in Edinburgh?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for plumbers. She understands burst pipes, boiler repairs, leak detection, drainage & installations — and with 4,500+ trade businesses competing in Edinburgh, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function ForPlumberEdinburghPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For Plumbers", item: "https://whoza.ai/for-plumbers" },
        { name: "Edinburgh", item: "https://whoza.ai/for-plumbers-edinburgh" },
      ]} />
      <div className="trade-faq">
      <FAQPageSchema faqs={faqs} speakableSelectors={[".trade-headline", ".trade-faq"]} />
      </div>

            <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
      <CityTradeSchema trade="Plumber" tradePlural="Plumbers" city="Edinburgh" region="City of Edinburgh" pageUrl="https://whoza.ai/for-plumbers-edinburgh" />
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Wrench className="w-4 h-4" />
                  Plumbers in Edinburgh
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 trade-headline">
                  Never Miss a{" "}
                  <span className="text-blue-400">Plumber</span>{" "}
                  Job in Edinburgh Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  Edinburgh has 4,500+ trade businesses competing for 245K households. 
                  With 2,200 missed calls every week across the city, 
                  Katie ensures you capture every plumbing enquiry — burst pipes, boiler repairs, leak detection, drainage & installations.
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

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Edinburgh Plumbers Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for plumbers in Edinburgh.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "4,500+", color: "text-blue-400" },
                { icon: Home, label: "Households", value: "245K", color: "text-blue-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "£315", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "2,200", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "£200M", color: "text-amber-400" },
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
                The Real Cost of Missed Calls for Plumbers in Edinburgh
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Georgian and Victorian buildings need specialist conservation trades. Festival season brings emergency maintenance demands for venues. Tourist rentals need rapid turnaround between bookings.
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
                      A customer calls about an urgent issue at 8pm while you're having dinner. They leave a voicemail, then call the next plumber on Google. You lose a £315+ job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average Edinburgh plumber misses multiple calls per day = 
                <strong> £45,000+</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Based on £315 avg job value with 35% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Works for Plumbers in Edinburgh
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
                  description: `Customer calls your Edinburgh number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.`,
                },
                {
                  step: "02",
                  icon: Wrench,
                  title: "She Qualifies the Job",
                  description: `Katie asks the right questions: Edinburgh postcode, problem type, urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.`,
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

        {/* ─── WHY PLUMBERS IN EDINBURGH NEED AI CALL ANSWERING ─── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Plumbers in Edinburgh Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Edinburgh&apos;s plumbing scene is shaped by its UNESCO-listed Georgian and Victorian architecture, hard water from local reservoirs, and a dense concentration of rental properties. In New Town and Stockbridge, Georgian townhouses with original lead pipework require careful handling — any work on listed properties needs planning consent, and only plumbers with the right experience get these jobs. Leith&apos;s vibrant mix of old port housing and new developments creates constant demand for both emergency repairs and modern installations, while Morningside&apos;s established Victorian homes face the same hard water scaling issues that plague the entire city. With 3,800+ trade businesses competing for 245K households and 1,900 missed calls every week, Edinburgh&apos;s market rewards responsiveness.
              </p>
              <p>
                The listed building factor is critical here. In New Town especially — a UNESCO World Heritage Site — even internal plumbing alterations can require consent, and estate agents managing short-term lets in the area maintain lists of approved tradespeople who understand these restrictions. A missed call from an estate agent or a homeowner in a listed property isn&apos;t just a lost £275 job — it&apos;s a lost relationship with a client who needs ongoing maintenance. Katie captures the property type and urgency, ensuring that when a call comes in from a Georgian townhouse or a Leith tenement, you have the details to respond with the right expertise.
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
                Why Plumbers in Edinburgh Need AI Call Answering
              </h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                From Georgian townhouses in the New Town to Victorian tenements in Leith and Marchmont, Edinburgh&apos;s plumbing trade operates in a city where history and modernity collide. Category A listed buildings in Stockbridge and Comely Bank retain original lead piping that requires specialist knowledge and careful handling. With 47% of the city centre designated as a UNESCO World Heritage Site, almost every external repair needs planning permission — customers who call expect trades who understand these constraints.
              </p>
              <p>
                Hard water in west Edinburgh — particularly Corstorphine and Balerno — causes severe limescale buildup that destroys boilers and narrows pipes. East-coast winds from the Firth of Forth drive rain horizontally into roof spaces and down external walls, creating hidden damp that manifests as plumbing emergencies. Winter temperatures regularly drop below freezing, and with sunset around 3:30pm in December, emergency callouts often happen in darkness.
              </p>
              <p>
                Edinburgh&apos;s affluent market — the highest average household income outside London — means customers expect professionalism and pay for quality. But with 60,000+ students and a booming short-term let economy in the Old and New Towns, property managers need rapid turnaround on maintenance calls. When an Airbnb host in Bruntsfield reports a leak between changeovers, Katie captures the urgency, the time pressure, and delivers everything to your WhatsApp before the next guest checks in.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />


        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for Plumbers Across the UK
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for plumbers in cities nationwide. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/for-plumbers-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
              <Link href="/for-plumbers-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
              <Link href="/for-plumbers-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
              <Link href="/for-plumbers-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
              <Link href="/for-plumbers-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
              <Link href="/for-plumbers-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
              <Link href="/for-plumbers-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
              <Link href="/for-plumbers-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
            </div>
            <div className="mt-6">
              <Link href="/for-plumbers" className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-all">
                View all Plumbers →
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions Plumbers in Edinburgh Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for plumbers in Edinburgh.
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

        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing Plumber Jobs in Edinburgh Today
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
