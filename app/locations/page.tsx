import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { locations } from "@/lib/locations"
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
    site: "@whozaai",
    title: "AI Call Answering UK — Coverage Across 8 Cities | whoza.ai",
    description: "whoza.ai provides AI call answering for UK tradespeople in London, Manchester, Birmingham, Glasgow, Edinburgh, Bristol, Leeds and Liverpool. 24/7 coverage from £59/month.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const cityDescriptions: Record<string, string> = {
  london: "London's 32,000+ trade businesses face fierce competition — 15+ plumbers per postcode in some areas. Katie ensures you never lose a job to a competitor while you're stuck on the North Circular.",
  manchester: "From Salford Quays to Didsbury, Manchester tradespeople deal with storm-driven call spikes and student housing turnover. Katie answers every call so you can focus on the job.",
  birmingham: "Covering Edgbaston to Solihull, Birmingham's 11,000+ trade businesses span vast suburban areas. Katie captures enquiries while you're driving between the 1930s semis and new-build apartments.",
  leeds: "From Headingley's student terraces to Roundhay's family homes, Leeds tradespeople handle Victorian wiring and Yorkshire weather. Katie never misses a call, even when you're in a crawl space.",
  glasgow: "Tenement emergencies in Partick, West End renter callouts, and harsh winter boiler breakdowns — Glasgow tradespeople need 24/7 coverage. Katie handles it all, from Govan to Shawlands.",
  bristol: "Clifton's heat pump installations to Bedminster's renovations, Bristol tradespeople serve eco-conscious homeowners and listed buildings. Katie answers with the professionalism your customers expect.",
  liverpool: "From Aigburth's student rentals to Woolton's Victorian terraces, Liverpool tradespeople battle coastal weather and regeneration demand. Katie captures every enquiry across Merseyside.",
  edinburgh: "Georgian New Town emergencies, Festival season venue maintenance, and Portobello rental turnovers — Edinburgh trades need reliable call answering. Katie delivers, from Leith to Morningside.",
}

export const revalidate = 3600

export default function LocationsPage() {
  const ukCities = locations
    .filter(loc => loc.country === "uk")
    .sort((a, b) => a.city.localeCompare(b.city))

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Locations", item: "https://whoza.ai/locations" },
      ]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            UK-Wide Coverage
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            AI Call Answering Across the UK
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
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
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-[var(--katie-blue)] transition-colors">
                      {city.city}
                    </h2>
                    <p className="text-sm text-white/50">{city.region}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {cityDescriptions[city.slug]}
              </p>
              <div className="flex flex-wrap gap-2">
                {city.trades?.slice(0, 3).map(trade => (
                  <span key={trade} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                    {trade.charAt(0).toUpperCase() + trade.slice(1)}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  {city.localStats?.businesses} businesses
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Don't See Your City?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-6">
            Katie works anywhere in the UK. Our AI call answering service covers all of England, Scotland, Wales and Northern Ireland. 
            If you have a business phone number, we can answer it.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
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
