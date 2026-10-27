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
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <main id="main-content">
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
          <p className="text-xl text-[var(--v2-body)] max-w-2xl mx-auto">
            Practical tools and guides built specifically for UK tradespeople, no signup required.
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
                className="group block bg-white border border-[var(--v2-line)] rounded-2xl p-8 hover:border-[#b9c6bf] hover:border-[#b9c6bf] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 bg-[var(--v2-mint)] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--v2-green)]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--v2-green)] transition-colors">
                      {r.title}
                    </h2>
                    <p className="text-[var(--v2-body)] leading-relaxed mb-4">
                      {r.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[var(--v2-green)] font-medium">
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

      </main>
      <Footer />
    </div>
  )
}
