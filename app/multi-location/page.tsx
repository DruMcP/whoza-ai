import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { MapPin, Phone, Users, Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Multi-Location AI Call Answering | Scale Plan | whoza.ai",
  description: "Run AI call answering across multiple locations, depots, or franchise branches. One dashboard. Local routing. The Scale plan from whoza.ai.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/multi-location",
    siteName: "Whoza.ai",
    title: "Multi-Location AI Call Answering | Scale Plan | whoza.ai",
    description: "Run AI call answering across multiple locations, depots, or franchise branches. One dashboard. Local routing. The Scale plan from whoza.ai.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Multi-Location" }],
  },
  alternates: {
    canonical: "https://whoza.ai/multi-location",
  },
}

export const revalidate = 3600

const features = [
  "One central dashboard for all locations",
  "Location-based call routing (nearest depot, postcode matching)",
  "Per-location AI agents with custom greetings",
  "Unified reporting across all branches",
  "Individual manager access per location",
  "Up to 5 concurrent calls per location",
  "100 booked enquiries included per month",
  "Executive summary email weekly",
]

export default function MultiLocationPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Multi-Location", item: "https://whoza.ai/multi-location" },
      ]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Scale Plan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Call Answering Across Every Location
          </h1>
          <p className="text-white/60 max-w-2xl text-lg">
            Run whoza.ai from a single head office dashboard. Route calls to the nearest depot. Track performance per branch. Built for multi-location trade businesses and franchises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <MapPin className="w-10 h-10 text-[var(--katie-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location-Based Routing</h3>
            <p className="text-white/60">
              Calls are routed to the nearest branch based on caller postcode. Each location gets its own AI agent with a local greeting and booking calendar.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <Users className="w-10 h-10 text-[var(--katie-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manager Access Per Branch</h3>
            <p className="text-white/60">
              Each depot manager sees only their own leads, calls, and calendar. Head office sees everything. Role-based access keeps data clean.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <Phone className="w-10 h-10 text-[var(--katie-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Shared or Local Numbers</h3>
            <p className="text-white/60">
              Use one central number with postcode routing, or assign a unique number to each branch. Both work with whoza.ai.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <Users className="w-10 h-10 text-[var(--katie-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unified Reporting</h3>
            <p className="text-white/60">
              See which location is generating the most leads, where calls are being missed, and which branches need more capacity. Weekly executive summaries.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">What is Included</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-white/80">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-[var(--katie-blue)]/10 to-emerald-500/10 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">£399/month — No Contract</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            The Scale plan is designed for businesses with 3+ locations. All calls answered 24/7. One captured job per location per week pays for the entire plan.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[var(--katie-blue)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--katie-blue)]/90 transition-colors"
          >
            View Full Pricing <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
