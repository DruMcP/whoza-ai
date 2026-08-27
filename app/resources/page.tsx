import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Footer } from "@/components/whoza/footer"
import Link from "next/link"
import { Calculator, ClipboardCheck, TrendingUp, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Free Resources for UK Trades | whoza.ai",
  description:
    "Free tools and guides for UK tradespeople: lost revenue calculator, Google Business Profile checklist, and business growth toolkit.",
  alternates: { canonical: "/resources" },
}

const resources = [
  {
    slug: "missed-call-cost-calculator",
    href: "/missed-calls-cost-calculator",
    title: "Lost Revenue Calculator",
    description:
      "Calculate how much missed calls are costing your trade business. Enter your average job value, weekly call volume, and missed call rate to see your annual lost revenue.",
    icon: Calculator,
    cta: "Calculate your losses",
  },
  {
    slug: "google-business-profile-checklist-trades",
    title: "Google Business Profile Checklist",
    description:
      "A step-by-step checklist to optimise your Google Business Profile for local trade searches. Covers categories, photos, reviews, posts, and Q&A.",
    icon: ClipboardCheck,
    cta: "Get the checklist",
  },
  {
    slug: "trade-business-growth-toolkit",
    title: "Trade Business Growth Toolkit",
    description:
      "A practical toolkit for growing your trade business: pricing frameworks, follow-up templates, seasonal planning guides, and referral systems.",
    icon: TrendingUp,
    cta: "Download the toolkit",
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[var(--navy-950)] text-white">
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Resources", item: "https://whoza.ai/resources" },
        ]}
      />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Free Resources for UK Trades
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Practical tools and guides built specifically for UK tradespeople — no signup required.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {resources.map((r) => {
            const Icon = r.icon
            return (
              <Link
                key={r.slug}
                href={r.href ?? `/resources/${r.slug}`}
                className="group block bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 bg-[var(--katie-blue)]/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--katie-blue)] transition-colors">
                      {r.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed mb-4">
                      {r.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[var(--katie-blue)] font-medium">
                      {r.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
