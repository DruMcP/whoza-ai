import { Metadata } from "next"
import Script from "next/script"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { WatchPageClient } from "./watch-page-client"

export const metadata: Metadata = {
  title: "Watch Whoza in Action — 60-Second Demo | whoza.ai",
  description:
    "See Katie capture a missed enquiry in under 60 seconds. Watch how Whoza.ai turns every unanswered call into a booked job, review request, and growth insight.",
  keywords: [
    "AI call answering demo",
    "missed calls solution",
    "trade business automation",
    "AI receptionist UK",
    "whoza.ai demo",
    "watch whoza",
  ],
  openGraph: {
    title: "Watch Whoza in Action — 60-Second Demo",
    description:
      "See Katie capture a missed enquiry in under 60 seconds. The enquiry lands in WhatsApp. Claire requests the review. Rex shows what to improve.",
    url: "https://whoza.ai/watch",
    type: "video.other",
    videos: [
      {
        url: "https://whoza.ai/whoza-explainer.mp4",
        width: 1280,
        height: 720,
        type: "video/mp4",
      },
    ],
    images: [
      {
        url: "https://whoza.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whoza.ai — Watch the 60-second demo",
      },
    ],
  },
  twitter: {
    card: "player",
    title: "Watch Whoza in Action — 60-Second Demo",
    description:
      "See Katie capture a missed enquiry in under 60 seconds. Every unanswered call becomes a booked job.",
    images: ["https://whoza.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://whoza.ai/watch",
  },
}

// VideoObject JSON-LD schema
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Whoza.ai 60-Second Demo — Katie Answers Every Call",
  description:
    "Watch Katie, Whoza's AI call handler, capture a missed enquiry in under 60 seconds. The call is answered instantly, the enquiry lands in WhatsApp, Claire requests a review, and Rex delivers growth insights. Built for UK tradespeople.",
  thumbnailUrl: [
    "https://whoza.ai/og-image.png",
    "https://whoza.ai/og-image-1200x630.png",
  ],
  uploadDate: "2026-05-06T00:00:00+00:00",
  duration: "PT60S",
  contentUrl: "https://whoza.ai/whoza-explainer.mp4",
  embedUrl: "https://whoza.ai/watch",
  interactionStatistic: {
    "@type": "InteractionCounter",
    interactionType: { "@type": "WatchAction" },
    userInteractionCount: 0,
  },
  author: {
    "@type": "Organization",
    name: "Whoza.ai",
    url: "https://whoza.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://whoza.ai/logo.png",
      width: 512,
      height: 512,
    },
  },
  publisher: {
    "@type": "Organization",
    name: "Whoza.ai",
    url: "https://whoza.ai",
  },
  potentialAction: {
    "@type": "WatchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://whoza.ai/watch",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    expectsAcceptanceOf: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  },
}

// Breadcrumb schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://whoza.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Watch Demo",
      item: "https://whoza.ai/watch",
    },
  ],
}

export default function WatchPage() {
  return (
    <>
      <Script
        id="video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <main id="main-content">
          <WatchPageClient />
        </main>
        <Footer />
      </div>
    </>
  )
}
