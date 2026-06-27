import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Briefcase, TrendingUp, Users, Star, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Case Studies — AI Call Answering for UK Trades | whoza.ai",
  description: "See how UK tradespeople win more jobs with whoza.ai's AI call answering. Real results: 98% answer rates, doubled bookings, thousands in revenue saved.",
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
    site: "@whozaai",
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
    metric: "£12,400",
    metricLabel: "additional monthly revenue",
    quote: "Before whoza.ai, we were losing jobs because we couldn't answer the phone on site. Now Katie handles every call and we only speak to qualified leads.",
  },
  {
    trade: "Plumbing & Heating",
    location: "Manchester",
    headline: "Doubled Emergency Call Bookings in 30 Days",
    metric: "2.1x",
    metricLabel: "increase in emergency bookings",
    quote: "Emergency calls come in at all hours. Katie qualifies them instantly and sends the urgent ones straight to my phone. I haven't missed a single emergency since.",
  },
  {
    trade: "Roofing Specialist",
    location: "Birmingham",
    headline: "£8,000 Saved on Receptionist Costs",
    metric: "£8,000",
    metricLabel: "annual savings vs. full-time hire",
    quote: "We considered hiring a receptionist but whoza.ai costs a fraction and works 24/7. Katie books surveys, qualifies leads, and handles the routine enquiries we used to miss.",
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
            Real Results
          </div>
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-white/60 text-lg max-w-2xl">See how UK tradespeople are using whoza.ai to capture more leads, book more jobs, and never miss a call again.</p>
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
              
              <blockquote className="border-l-2 border-emerald-500/30 pl-4">
                <p className="text-white/70 italic leading-relaxed">"{study.quote}"</p>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </blockquote>
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
