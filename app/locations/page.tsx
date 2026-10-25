import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { locations, draftLocations } from "@/lib/locations"
import { TRADE_CITY_PAGES } from "@/lib/trade-city-pages"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Call Answering UK — Coverage Across 8 Cities | whoza.ai",
  description: "whoza.ai provides AI call answering for UK tradespeople in London, Manchester, Birmingham, Glasgow, Edinburgh, Bristol, Leeds and Liverpool. 24/7 coverage.",
  alternates: {
    canonical: "https://whoza.ai/locations",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/locations",
    siteName: "Whoza.ai",
    title: "AI Call Answering UK — Coverage Across 8 Cities | whoza.ai",
    description: "whoza.ai provides AI call answering for UK tradespeople in London, Manchester, Birmingham, Glasgow, Edinburgh, Bristol, Leeds and Liverpool. 24/7 coverage from £59/month.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering Coverage Across the UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering UK — Coverage Across 8 Cities | whoza.ai",
    description: "whoza.ai provides AI call answering for UK tradespeople in London, Manchester, Birmingham, Glasgow, Edinburgh, Bristol, Leeds and Liverpool. 24/7 coverage from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}


function formatTrade(slug: string): string {
  return slug
    .replace(/^for-/, "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatCity(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

export const revalidate = 3600

export default function LocationsPage() {
  const ukCities = locations
    .filter(loc => loc.country === "uk")
    .sort((a, b) => a.city.localeCompare(b.city))

  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Locations", item: "https://whoza.ai/locations" },
      ]} />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="v2-eyebrow inline-flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4" />
            UK-Wide Coverage
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            AI Call Answering Across the UK
          </h1>
          <p className="text-xl text-[var(--v2-body)] max-w-3xl mx-auto">
            Katie answers missed calls for tradespeople in 8 major UK cities — 24/7, 365 days a year. 
            Wherever you work, every enquiry gets captured and delivered to your WhatsApp in seconds.
          </p>
        </div>

        {/* City Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ukCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] hover:border-[#b9c6bf] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--v2-green)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--v2-ink)] group-hover:text-[var(--v2-green)] transition-colors">
                      {city.city}
                    </h2>
                    <p className="text-sm text-[var(--v2-muted)]">{city.region}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--v2-muted)] group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-4">
                {city.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {city.trades?.slice(0, 3).map(trade => (
                  <span key={trade} className="px-2.5 py-1 rounded-full bg-white border border-[var(--v2-line)] text-xs text-[var(--v2-muted)]">
                    {trade.charAt(0).toUpperCase() + trade.slice(1)}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded-full bg-white border border-[var(--v2-line)] text-xs text-[var(--v2-muted)]">
                  {city.localStats?.businesses} businesses
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Cities with a draft page (lib/locations.ts draftLocations) are named
            here as plain text until their pages are published. */}
        <p className="text-[var(--v2-body)] text-center max-w-3xl mx-auto mb-16">
          Katie answers calls for tradespeople anywhere in the UK, including{" "}
          {draftLocations.map((d) => d.city).join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>

        {/* Trade × City hub — server-rendered links to every combo page (Bing crawlability) */}
        <section className="mb-16" aria-label="Browse by trade and city">
          <h2 className="text-2xl font-bold mb-2">
            Browse by Trade and City
          </h2>
          <p className="text-[var(--v2-body)] mb-8">
            Dedicated AI call answering pages for every trade we cover in each city — pick yours.
          </p>
          <div className="space-y-8">
            {Object.entries(TRADE_CITY_PAGES).map(([trade, cities]) => (
              <div key={trade}>
                <h3 className="text-lg font-semibold text-[var(--v2-ink)] mb-3">
                  {formatTrade(trade)}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {cities.map((city) => (
                    <li key={`${trade}-${city}`}>
                      <Link
                        href={`/${trade}-${city}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[var(--v2-line)] text-sm text-[var(--v2-body)] hover:border-[#b9c6bf] hover:border-[#b9c6bf] hover:text-[var(--v2-ink)] transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[var(--v2-green)]" />
                        {formatCity(city)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-white border border-[var(--v2-line)] rounded-2xl p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Don't See Your City?
          </h2>
          <p className="text-[var(--v2-body)] max-w-2xl mx-auto mb-6">
            Katie works anywhere in the UK. Our AI call answering service covers all of England, Scotland, Wales and Northern Ireland. 
            If you have a business phone number, we can answer it.
          </p>
          <Link
            href="/"
            className="v2-btn min-h-[54px] px-7 text-base v2-island"
          >
            Start Your Free 7-Day Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
