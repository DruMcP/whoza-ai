import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/whoza/header"
import { TradeHero } from "@/components/whoza/trade-hero"
import { TradeStats } from "@/components/whoza/trade-stats"
import { TradeProblems } from "@/components/whoza/trade-problems"
import { TradeHowItWorks } from "@/components/whoza/trade-how-it-works"
import { TradeFAQ } from "@/components/whoza/trade-faq"
import { TradeLocations } from "@/components/whoza/trade-locations"
import { AudioDemo } from "@/components/whoza/audio-demo"
import { Testimonials } from "@/components/whoza/testimonials"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { TradeSchema } from "@/components/whoza/trade-schema"
import { SocialProofBand } from "@/components/whoza/social-proof"
import { VideoExplainer } from "@/components/whoza/video-explainer"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
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
import { trades, getTradeBySlug, getAllTradeSlugs } from "@/lib/trades"

interface PageProps {
  params: Promise<{ trade: string }>
}

export async function generateStaticParams() {
  return getAllTradeSlugs().map((slug) => ({
    trade: slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { trade } = await params
  const tradeData = getTradeBySlug(trade)
  
  if (!tradeData) {
    return {
      title: "Trade Not Found | whoza.ai",
    }
  }

  return {
    metadataBase: new URL("https://whoza.ai"),
    title: tradeData.headline,
    description: tradeData.metaDescription,
    alternates: {
      canonical: `https://whoza.ai/trade/${tradeData.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: `https://whoza.ai/trade/${tradeData.slug}`,
      siteName: "Whoza.ai",
      title: tradeData.headline,
      description: tradeData.metaDescription,
      images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: `whoza.ai — AI Call Handling for ${tradeData.display}` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@whozaai",
      title: tradeData.headline,
      description: tradeData.metaDescription,
      images: ["https://whoza.ai/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function TradePage({ params }: PageProps) {
  const { trade } = await params
  const tradeData = getTradeBySlug(trade)

  if (!tradeData) {
    notFound()
  }

  return (
    <>
      <TradeSchema tradeData={tradeData} />
      <Header />
      
      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        <TradeHero tradeData={tradeData} />
        <div className="section-divider" />
        <SocialProofBand />
        <div className="section-divider" />
        
        <VideoExplainer />
        <div className="section-divider" />
        
        <LostRevenueCalculator trade={tradeData.slug} />
        <div className="section-divider" />
        
        <AudioDemo />
        <div className="section-divider" />
        
        <WhatsAppDelivery trade={tradeData.slug} />
        <div className="section-divider" />
        
        <PreLaunchProof />
        <div className="section-divider" />
        
        <HowWhozaWorks />
        <div className="section-divider" />
        
        <TrialExplanation />
        <div className="section-divider" />
        
        <MeetTheTeam />
        <div className="section-divider" />
        
        <TrilletVoiceWidget />
        <div className="section-divider" />
        
        <ControlSection />
        <div className="section-divider" />
        
        <ReviewsEngine trade={tradeData.slug} />
        <div className="section-divider" />
        
        <GrowthEngine />
        <div className="section-divider" />
        
        <DashboardPreview />
        <div className="section-divider" />
        
        <ClaireDashboard />
        <div className="section-divider" />
        
        <TradeStats tradeData={tradeData} />
        <div className="section-divider" />
        
        <Testimonials />
        <div className="section-divider" />
        
        <ComparisonTable />
        <div className="section-divider" />
        
        <Pricing />
        <div className="section-divider" />
        
        <TradeFAQ tradeData={tradeData} />
        <div className="section-divider" />
        
        <TradeLocations tradeData={tradeData} />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
    </>
  )
}
