import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/whoza/header"
import { LocationHero } from "@/components/whoza/location-hero"
import { GeoProofBand } from "@/components/whoza/geo-proof-band"
import { SocialProofBand, TrustBadgeBand } from "@/components/whoza/social-proof"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
import { ROICalculator } from "@/components/whoza/roi-calculator"
import { RevenueSystem } from "@/components/whoza/revenue-system"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
import { HowItWorks } from "@/components/whoza/how-it-works"
import { AudioDemo } from "@/components/whoza/audio-demo"
import { Testimonials } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { LocaleProvider } from "@/lib/locale-context"
import { locations, getLocationBySlug } from "@/lib/locations"

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
  
  return {
    metadataBase: new URL("https://whoza.ai"),
    title: `AI Call Answering for ${tradesText} in ${locationData.city} | whoza.ai`,
    description: `Stop losing jobs to missed calls. Katie answers your phone 24/7 for ${tradesText} in ${locationData.city}. Book appointments automatically.`,
    alternates: {
      canonical: `https://whoza.ai/${location}`,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: `https://whoza.ai/${location}`,
      siteName: "Whoza.ai",
      title: `AI Call Answering for ${tradesText} in ${locationData.city} | whoza.ai`,
      description: `Stop losing jobs to missed calls. Katie answers your phone 24/7 for ${tradesText} in ${locationData.city}.`,
      images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: `whoza.ai — AI Call Answering in ${locationData.city}` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@whozaai",
      title: `AI Call Answering for ${tradesText} in ${locationData.city} | whoza.ai`,
      description: `Stop losing jobs to missed calls in ${locationData.city}.`,
      images: ["https://whoza.ai/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { location } = await params
  const locationData = getLocationBySlug(location)

  if (!locationData) {
    notFound()
  }

  const jobsThisWeek = Math.floor(Math.random() * 80) + 100

  return (
    <LocaleProvider forcedCountry={locationData.country}>
      <Header />
      
      <main id="main-content" role="main">
        <LocationHero 
          city={locationData.city} 
          trade={locationData.trades?.[0]}
          region={locationData.region}
          jobsThisWeek={jobsThisWeek}
        />
        <GeoProofBand 
          city={locationData.city}
          country={locationData.country}
          jobsThisWeek={jobsThisWeek}
        />
        <SocialProofBand />
        <LostRevenueCalculator />
        <ROICalculator />
        <TrustBadgeBand />
        <RevenueSystem />
        <MeetTheTeam />
        <HowItWorks />
        <AudioDemo />
        <Testimonials />
        <GoogleReviews />
        <ComparisonTable />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
      <StickyCTA />
    </LocaleProvider>
  )
}
