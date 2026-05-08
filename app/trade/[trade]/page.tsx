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
import { FloatingChatWidget, StickyCTA } from "@/components/whoza/sticky-cta"
import { TradeSchema } from "@/components/whoza/trade-schema"
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
      images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: `whoza.ai — AI Call Answering for ${tradeData.display}` }],
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
      
      <main id="main-content" role="main">
        <TradeHero tradeData={tradeData} />
        <TradeStats tradeData={tradeData} />
        <TradeProblems tradeData={tradeData} />
        <TradeHowItWorks tradeData={tradeData} />
        <AudioDemo />
        <TradeFAQ tradeData={tradeData} />
        <Testimonials />
        <ComparisonTable />
        <Pricing />
        <TradeLocations tradeData={tradeData} />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
      <StickyCTA />
    </>
  )
}
