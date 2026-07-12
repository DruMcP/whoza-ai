import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/whoza/header"
import { LocationHero } from "@/components/whoza/location-hero"
import { GeoProofBand } from "@/components/whoza/geo-proof-band"
import { SocialProofBar } from "@/components/whoza/social-proof-bar"
import { SocialProofBand, StatsBand } from "@/components/whoza/social-proof"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
import { VideoExplainer } from "@/components/whoza/video-explainer"
// import { AudioDemo } from "@/components/whoza/audio-demo"
import { WhatsAppDelivery } from "@/components/whoza/whatsapp-delivery"
import { PreLaunchProof } from "@/components/whoza/pre-launch-proof"
import { HowWhozaWorks } from "@/components/whoza/how-whoza-works"
import { TrialExplanation } from "@/components/whoza/trial-explanation"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
import { TrilletVoiceWidget } from "@/components/whoza/trillet-voice-widget"
import { ControlSection } from "@/components/whoza/control-section"
import { ReviewsEngine } from "@/components/whoza/reviews-engine"
import { GrowthEngine } from "@/components/whoza/growth-engine"
import { DashboardPreview } from "@/components/whoza/dashboard-preview"
import { ClaireDashboard } from "@/components/whoza/claire-dashboard"
import { Testimonials } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { CityContentSection } from "@/components/whoza/city-content-section"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { LocaleProvider } from "@/lib/locale-context"
import { locations, getLocationBySlug } from "@/lib/locations"
import { VideoSchema } from "@/components/whoza/schema-markup"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"

export const revalidate = 3600

interface PageProps {
  params: Promise<{ location: string }>
}

export async function generateStaticParams() {
  return locations.map((loc) => ({
    location: loc.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params
  const locationData = getLocationBySlug(location)
  
  if (!locationData) {
    return {
      title: "Location Not Found | whoza.ai",
    }
  }

  const tradesText = locationData.trades?.slice(0, 2).join(", ") || "tradespeople"
  const citySpecificDescription = locationData.description || `Stop losing jobs to missed calls. Katie answers your phone 24/7 for ${tradesText} in ${locationData.city}. Book appointments automatically.`
  
  return {
    metadataBase: new URL("https://whoza.ai"),
    title: `AI Call Answering ${locationData.city} | whoza.ai`,
    description: citySpecificDescription,
    alternates: {
      canonical: `https://whoza.ai/${location}`,
    },
    openGraph: {
      type: "website",
      locale: locationData.country === "uk" ? "en_GB" : "en_US",
      url: `https://whoza.ai/${location}`,
      siteName: "Whoza.ai",
      title: `AI Call Answering ${locationData.city} | whoza.ai`,
      description: citySpecificDescription,
      images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: `whoza.ai — AI Call Handling in ${locationData.city}` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@whozaai",
      title: `AI Call Answering ${locationData.city} | whoza.ai`,
      description: citySpecificDescription,
      images: ["https://whoza.ai/og-image.webp"],
    },
    robots: {
      index: false,
      follow: true,
    },
    other: {
      'geo.region': `GB-${locationData.region}`,
      'geo.placename': locationData.city,
      'geo.position': `${locationData.lat};${locationData.lng}`,
      'ICBM': `${locationData.lat}, ${locationData.lng}`,
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { location } = await params
  const locationData = getLocationBySlug(location)

  if (!locationData) {
    notFound()
  }

  // Return 404 for non-UK cities (Issue #5 fix)
  if (locationData.country !== 'uk') {
    notFound()
  }

  const jobsThisWeek = Math.floor(Math.random() * 80) + 100

  return (
    <LocaleProvider forcedCountry={locationData.country}>
      {/* City-specific LocalBusiness JSON-LD — overrides global Perth coordinates */}
      <script
        id={`localbusiness-${location}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `https://whoza.ai/${location}#localbusiness`,
            "name": `whoza.ai — AI Call Answering in ${locationData.city}`,
            "url": `https://whoza.ai/${location}`,
            "logo": "https://whoza.ai/logo.webp",
            "image": "https://whoza.ai/og-image.webp",
            "description": `AI voice agents that answer missed calls for tradespeople in ${locationData.city} 24/7. Capture enquiries, book jobs, collect reviews. Plans from £59/month.`,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB",
              "addressRegion": locationData.region,
              "addressLocality": locationData.city,
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": locationData.lat,
              "longitude": locationData.lng,
            },
            "areaServed": {
              "@type": "City",
              "name": locationData.city,
            },
            "priceRange": "££",
            "telephone": "+447463141750",
            "email": "support@whoza.ai",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59",
              },
            ],
            "serviceType": "AI Call Handling Service",
            "knowsAbout": [
              "AI Voice Agents",
              "Call Handling",
              "Missed Call Recovery",
              "Lead Qualification",
              "Google Review Collection",
              "Plumbing",
              "Electrical Services",
              "HVAC",
              "Building Services",
              "Locksmith Services",
              "Roofing",
            ],
          }),
        }}
      />
      <VideoSchema
        name={`Whoza.ai Demo — AI Call Handling in ${locationData.city}`}
        description={`Watch how Whoza.ai's Katie captures a missed enquiry in under 60 seconds for ${locationData.trades?.slice(0, 2).join(", ") || "tradespeople"} in ${locationData.city}. The call is answered instantly, the enquiry lands in WhatsApp, and you accept or decline in two taps.`}
        embedUrl={`https://whoza.ai/${location}`}
      />
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: locationData.city, item: `https://whoza.ai/${location}` },
      ]} />
      
      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* LOCATION HERO — City-specific value prop */}
        <LocationHero 
          city={locationData.city} 
          trade={locationData.trades?.[0]}
          region={locationData.region}
          jobsThisWeek={jobsThisWeek}
        />
        <SocialProofBar />
        <GeoProofBand 
          city={locationData.city}
          country={locationData.country}
          jobsThisWeek={jobsThisWeek}
        />
        <SocialProofBand />

        {/* CITY-SPECIFIC CONTENT — Unique value for each location */}
        <div className="section-divider" />
        <CityContentSection locationData={locationData} />


        {/* DOMINANT MOMENT — Pain → Solution sequence */}
        <div className="section-divider" />
        <LostRevenueCalculator />

        {/* VIDEO EXPLAINER — See Whoza in action */}
        <div className="section-divider" />
        <VideoExplainer />

        {/* AUDIO DEMO — Hear Katie handle a customer enquiry */}
        <div className="section-divider" />
        {/* AUDIO DEMO - removed for soft launch */}
        {/* <AudioDemo /> */}

        <WhatsAppDelivery />

        {/* PRE-LAUNCH PROOF — Example scenario */}
        <div className="section-divider" />
        <PreLaunchProof />

        {/* HOW IT WORKS — Full visual flow */}
        <div className="section-divider" />
        <HowWhozaWorks />

        {/* TRIAL EXPLANATION — How the 7-day free trial works */}
        <div className="section-divider" />
        <TrialExplanation />

        {/* MEET THE TEAM — Katie, Claire, Rex */}
        <div className="section-divider" />
        <MeetTheTeam />

        {/* VOICE AGENT DEMO — Experience Katie live */}
        <div className="section-divider" />
        <section className="py-12 bg-[var(--navy-900)] dark-section">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm mb-4">Experience the demo — no signup needed</p>
            <TrilletVoiceWidget buttonLabel="Talk to Katie" />
          </div>
        </section>

        {/* CONTROL — You stay in control */}
        <div className="section-divider" />
        <ControlSection />

        {/* GROWTH ENGINE — Reviews + AI recommendations */}
        <div className="section-divider" />
        <ReviewsEngine />
        <GrowthEngine />

        {/* DASHBOARD — ROI + Claire Reviews */}
        <div className="section-divider" />
        <DashboardPreview />
        <ClaireDashboard />
        
        {/* STATS — Key metrics */}
        <div className="section-divider" />
        <StatsBand />

        {/* PROOF — Social proof */}
        <div className="section-divider" />
        <Testimonials />
        <GoogleReviews />

        {/* WHY US — Comparison */}
        <div className="section-divider" />
        <ComparisonTable />

        {/* OFFER — Pricing (no-brainer) */}
        <div className="section-divider" />
        <Pricing />

        {/* TRADE LINKS — Cross-link to all trade pages */}
        <div className="section-divider" />
        <section className="py-12 bg-[var(--navy-900)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Handling for Every Trade in {locationData.city}
            </h2>
            <p className="text-white/60 mb-6">
              Whatever your trade, Katie&apos;s got you covered in {locationData.city}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/for-plumbers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Plumbers</a>
              <a href="/for-electricians" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Electricians</a>
              <a href="/for-gas-engineers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Gas Engineers</a>
              <a href="/for-builders" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Builders</a>
              <a href="/for-roofers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Roofers</a>
              <a href="/for-locksmiths" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Locksmiths</a>
              <a href="/for-joiners" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Joiners</a>
              <a href="/for-heating-engineers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Heating Engineers</a>
              <a href="/for-painters-decorators" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Painters & Decorators</a>
              <a href="/for-carpenters" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Carpenters</a>
              <a href="/for-cleaners" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Cleaners</a>
              <a href="/for-drainage" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Drainage</a>
              <a href="/for-handymen" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Handymen</a>
              <a href="/for-landscapers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Landscapers</a>
              <a href="/for-pest-control" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Pest Control</a>
              <a href="/for-plasterers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Plasterers</a>
              <a href="/for-tilers" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Tilers</a>
            </div>
          </div>
        </section>

        {/* OBJECTIONS — FAQ */}
        <div className="section-divider" />
        <FAQ />

        {/* CLOSE — Hard close */}
        <div className="section-divider" />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
    </LocaleProvider>
  )
}
