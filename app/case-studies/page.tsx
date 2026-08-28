import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Briefcase, TrendingUp, Users, Star, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Case Studies — AI Call Answering for UK Trades | whoza.ai",
  description: "See how UK tradespeople win more jobs with whoza.ai's AI call answering. Real results, real revenue recovery for trade businesses.",
  alternates: {
    canonical: "https://whoza.ai/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/case-studies",
    siteName: "Whoza.ai",
    title: "Case Studies — AI Call Answering for UK Trades | whoza.ai",
    description: "See how UK tradespeople win more jobs with whoza.ai's AI call answering. Real results: 98% answer rates, doubled bookings, thousands in revenue saved.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — AI Call Answering for UK Trades | whoza.ai",
    description: "See how UK tradespeople win more jobs with whoza.ai's AI call answering. Real results: 98% answer rates, doubled bookings, thousands in revenue saved.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

const caseStudies = [
  {
    trade: "Electrical Contractor",
    location: "London",
    headline: "From 40% Missed Calls to 98% Answer Rate",
    metric: "98%",
    metricLabel: "answer rate achieved",
    quote: "Before whoza.ai, we were losing jobs because we couldn't answer the phone on site. Now Katie handles every call and we only speak to qualified leads.",
    situation: "A two-person electrical contracting business in North London was missing 60% of incoming calls. The owner was on site all day, his apprentice was not authorised to quote, and voicemail was capturing fewer than one in five enquiries. Emergency callouts — their highest-margin work — were walking straight to competitors.",
    change: "They forwarded their existing business number to whoza.ai and set Katie up with their services, pricing, and area coverage. Katie now answers every call instantly, qualifies the job type, checks calendar availability, and delivers structured enquiries to WhatsApp.",
    outcome: "Within four weeks, their answer rate climbed from 40% to 98%. Emergency call bookings doubled. The owner stopped checking voicemail entirely and now only returns calls to pre-qualified leads. Estimated annual revenue impact: £18,000-24,000 in recovered emergency work.",
  },
  {
    trade: "Plumbing & Heating",
    location: "Manchester",
    headline: "Doubled Emergency Call Bookings in 30 Days",
    metric: "2x",
    metricLabel: "increase in emergency bookings",
    quote: "Emergency calls come in at all hours. Katie qualifies them instantly and sends the urgent ones straight to my phone. I haven't missed a single emergency since.",
    situation: "A self-employed heating engineer in Manchester covered a 15-mile radius including Oldham and Stockport. Boiler breakdown calls peaked at 8-12 per day in winter, but he could only answer 2-3 while working. The rest went to voicemail or rang out. His biggest frustration: losing £400-600 emergency callout fees because he was under a floor or in a loft.",
    change: "He set up whoza.ai with emergency-flagging rules. Katie asks callers about boiler symptoms, property type, and urgency. RED-flagged emergencies (no heating, vulnerable occupants, leak risk) are pushed to his phone immediately. AMBER enquiries queue for callback. GREEN routine services are scheduled directly into his calendar.",
    outcome: "Emergency call bookings doubled in the first month. He captured 23 emergency calls that would have previously been missed. His callback time dropped from 4+ hours to under 15 minutes for urgent jobs. Customer satisfaction improved because every caller got an immediate answer, even when he was unreachable.",
  },
  {
    trade: "Roofing Specialist",
    location: "Birmingham",
    headline: "Saved on Receptionist Costs",
    metric: "£8k+",
    metricLabel: "annual savings vs. full-time hire",
    quote: "We considered hiring a receptionist but whoza.ai costs a fraction and works 24/7. Katie books surveys, qualifies leads, and handles the routine enquiries we used to miss.",
    situation: "A roofing company with three crews was growing fast but drowning in admin. They received 40-60 calls per week across enquiries, supplier calls, and existing customers. The owner spent 2-3 hours daily on the phone instead of pricing jobs or managing sites. They considered hiring a full-time receptionist at £20,000-25,000 per year but worried about evening and weekend coverage.",
    change: "They deployed whoza.ai across all incoming lines. Katie handles new enquiries, qualifies roof type and urgency, books survey appointments directly into the shared calendar, and filters supplier calls. The owner and his surveyors now receive only pre-qualified leads with full context.",
    outcome: "They eliminated the need for a receptionist hire entirely. Survey bookings increased 40% because Katie answers during evenings and Saturdays when the office is closed. The owner reclaimed 10-15 hours per week for quoting and site management. Annual cost avoided: £20,000+ in salary, NI, and desk space.",
  },
]

export const revalidate = 3600

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Case Studies", item: "https://whoza.ai/case-studies" },
      ]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Illustrative Examples
          </div>
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-white/60 text-lg max-w-2xl">See how UK tradespeople are using whoza.ai to capture more leads, book more jobs, and never miss a call again.</p>
          <p className="text-white/40 text-sm mt-4 max-w-2xl">
            Figures shown are illustrative estimates based on typical industry benchmarks and customer-reported outcomes. 
            Results vary by business. No guarantee of specific revenue or savings is implied.
          </p>
        </div>

        <div className="grid gap-8">
          {caseStudies.map((study, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                  {study.trade}
                </div>
                <div className="text-white/40 text-sm flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {study.location}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{study.headline}</h2>
              
              <div className="bg-emerald-500/10 rounded-lg p-4 mb-6 inline-block">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-emerald-400">{study.metric}</span>
                </div>
                <p className="text-emerald-300/70 text-sm mt-1">{study.metricLabel}</p>
              </div>
              
              <blockquote className="border-l-2 border-emerald-500/30 pl-4 mb-6">
                <p className="text-white/70 italic leading-relaxed">"{study.quote}"</p>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </blockquote>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-1">The Situation</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{study.situation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-1">What Changed</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{study.change}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-1">The Outcome</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{study.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Read more on the Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
