import { stableNum } from "@/lib/stable-num"
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
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
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
      title: `AI Call Answering ${locationData.city} | whoza.ai`,
      description: citySpecificDescription,
      images: ["https://whoza.ai/og-image.webp"],
    },
    robots: {
      index: true,
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

  const jobsThisWeek = stableNum(location, 100, 180)

  // City-specific FAQ content — unique per city
  const cityFaqs = [
    {
      question: `Do you cover all areas of ${locationData.city} including suburbs?`,
      answer: `Yes — Katie answers calls for tradespeople across ${locationData.city} and surrounding areas${locationData.neighbourhoods ? `, including ${locationData.neighbourhoods.slice(0, 6).join(", ")} and beyond` : ""}. Whether you're working in the city centre or the outer suburbs, every missed call gets captured and delivered to your WhatsApp instantly.`,
    },
    {
      question: `What's the average response time for tradespeople in ${locationData.city}?`,
      answer: `${locationData.responseTime || "Most tradespeople in " + locationData.city + " respond within 20-30 minutes"}. Katie ensures you never miss the initial enquiry — she answers instantly, 24/7, and sends you the full job details via WhatsApp so you can call back prepared with all the context.`,
    },
    {
      question: `Are missed calls a big problem for ${locationData.city} tradespeople?`,
      answer: `Yes — ${locationData.localStats?.missedCallsWeekly || "thousands of"} calls go unanswered every week in ${locationData.city}. ${locationData.callVolume || ""} Many tradespeople miss calls while on site, driving between jobs, or during evenings and weekends. At an average job value of ${locationData.localStats?.avgJob || "£280"}, that's significant lost revenue every month. Katie captures every call so you don't lose a single job.`,
    },
    {
      question: `Does whoza.ai work with local trade associations in ${locationData.city}?`,
      answer: `Absolutely. We work with tradespeople who hold certifications from ${locationData.associations ? locationData.associations.slice(0, 3).join(", ") : "NICEIC, Gas Safe, FMB and other"} bodies. Katie is trained to handle enquiries professionally and can reference your accreditations when speaking with customers, building trust from the first call.`,
    },
    {
      question: `Can Katie handle emergency calls in ${locationData.city} at night and weekends?`,
      answer: `Yes — Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency keywords and marks urgent enquiries with priority flags in your WhatsApp. Whether it's a burst pipe at 2am or a boiler breakdown on Christmas Day, Katie captures the details and alerts you immediately.`,
    },
    {
      question: `How quickly can I get set up in ${locationData.city}?`,
      answer: `Most tradespeople in ${locationData.city} are live within 30 minutes. You forward your existing business number to whoza.ai, set your greeting and trade details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.`,
    },
  ]

  return (
    <LocaleProvider forcedCountry={locationData.country}>
      {/* City-specific Service JSON-LD — Service + areaServed (no fabricated address) */}
      <script
        id={`service-${location}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `https://whoza.ai/${location}#service`,
            "name": `whoza.ai — AI Call Answering in ${locationData.city}`,
            "url": `https://whoza.ai/${location}`,
            "provider": { "@id": "https://whoza.ai/#organization" },
            "areaServed": {
              "@type": "City",
              "name": locationData.city,
            },
            "serviceType": "AI Call Handling Service",
            "description": `AI voice agents that answer missed calls for tradespeople in ${locationData.city} 24/7. Capture enquiries, book jobs, collect reviews. Plans from £59/month.`,
            "offers": {
              "@type": "Offer",
              "price": "59",
              "priceCurrency": "GBP",
              "url": "https://whoza.ai/pricing",
            },
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
      <FAQPageSchema faqs={cityFaqs} />
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

        {/* CITY FAQ — visible matching schema */}
        <div className="section-divider" />
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Questions from {locationData.city} Tradespeople</h2>
            <div className="space-y-4">
              {cityFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSE — Hard close */}
        <div className="section-divider" />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
    </LocaleProvider>
  )
}
