import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Calculator, CheckCircle, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Resources for UK Tradespeople | whoza.ai",
  description: "Free tools and guides for UK tradespeople: missed call cost calculator, Google Business Profile checklist, and trade business growth toolkit.",
  alternates: {
    canonical: "https://whoza.ai/resources",
  },
}

const resources = [
  {
    href: "/resources/missed-call-cost-calculator",
    title: "Missed Call Cost Calculator",
    description: "Enter your trade, average job value, and missed calls per week. See exactly how much revenue you're losing — and what capturing those calls would be worth.",
    icon: <Calculator className="w-8 h-8 text-emerald-400" />,
  },
  {
    href: "/resources/google-business-profile-checklist-trades",
    title: "Google Business Profile Checklist",
    description: "A step-by-step checklist to optimise your Google Business Profile for local search. Covers categories, photos, reviews, posts, and Q&A for 15+ trade types.",
    icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
  },
  {
    href: "/resources/trade-business-growth-toolkit",
    title: "Trade Business Growth Toolkit",
    description: "Downloadable templates: quoting calculator, customer enquiry form, job sheet, and follow-up email scripts. Built for UK tradespeople.",
    icon: <Briefcase className="w-8 h-8 text-amber-400" />,
  },
]

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://whoza.ai/" },
        { name: "Resources", url: "https://whoza.ai/resources" },
      ]} />
      <Header />
      <main className="min-h-screen bg-[var(--navy-900)] text-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Free Resources for <span className="text-emerald-400">UK Tradespeople</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Practical tools and checklists built for trade businesses. No signup required — use them, share them, improve your business.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="mb-4">{r.icon}</div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {r.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {r.description}
                </p>
                <span className="inline-flex items-center text-emerald-400 text-sm font-medium">
                  Open resource <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
