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
import { TestimonialCarousel } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
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
    title: `AI Call Answering for ${tradesText} in ${locationData.city} | whoza.ai`,
    description: `Stop losing jobs to missed calls. Katie answers your phone 24/7 for ${tradesText} in ${locationData.city}. Book appointments automatically.`,
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { location } = await params
  const locationData = getLocationBySlug(location)

  if (!locationData) {
    notFound()
  }

  return (
    <>
      <Header />
      
      <main id="main-content" role="main">
        <LocationHero 
          city={locationData.city} 
          trade={locationData.trades?.[0]}
          region={locationData.region}
          jobsThisWeek={Math.floor(Math.random() * 80) + 100}
        />
        <GeoProofBand />
        <SocialProofBand />
        <LostRevenueCalculator />
        <ROICalculator />
        <TrustBadgeBand />
        <RevenueSystem />
        <MeetTheTeam />
        <HowItWorks />
        <AudioDemo />
        <TestimonialCarousel />
        <GoogleReviews />
        <ComparisonTable />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
      <StickyCTA />
    </>
  )
}
