import { FOUNDER_SAME_AS } from "@/lib/seo/identity"

export function HomepageSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://whoza.ai/#service",
        "serviceType": "AI Call Handling for UK Tradespeople",
        "provider": { "@id": "https://whoza.ai/#organization" },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "whoza.ai Plans",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Starter Plan" },
              "price": "59",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31"
            },
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Growth Plan" },
              "price": "125",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31"
            },
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Pro Plan" },
              "price": "230",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31"
            },
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Scale Plan" },
              "price": "399",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31"
            }
          ]
        },
        "termsOfService": "https://whoza.ai/terms"
      },
      {
        "@type": "Person",
        "@id": "https://whoza.ai/#dru-mcpherson",
        "name": "Dru McPherson",
        "jobTitle": "Founder & CEO",
        "worksFor": { "@id": "https://whoza.ai/#organization" },
        "knowsAbout": ["Trade Business", "Plumbing", "AI Voice Agents", "Customer Service", "UK Tradespeople"],
        "description": "Dru McPherson is the founder of whoza.ai, a former trade business owner who built Katie the AI call handler for UK tradespeople.",
        "sameAs": [...FOUNDER_SAME_AS],
        "url": "https://whoza.ai",
        "email": "support@whoza.ai"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://whoza.ai/#katie",
        "name": "Katie",
        "alternateName": "Katie by whoza.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "59",
          "priceCurrency": "GBP"
        },
        "url": "https://whoza.ai/for-plumbers",
        "knowsAbout": ["Plumbing", "Electrical", "HVAC", "Building", "Roofing", "Customer Service", "Call Handling"],
        "description": "Katie is an AI voice agent that answers missed calls for UK tradespeople 24/7, qualifies customer enquiries, and sends them to WhatsApp for instant response."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://whoza.ai/#mark",
        "name": "Mark",
        "alternateName": "Mark by whoza.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "59",
          "priceCurrency": "GBP"
        },
        "url": "https://whoza.ai/for-plumbers",
        "knowsAbout": ["Plumbing", "Electrical", "HVAC", "Building", "Roofing", "Customer Service", "Call Handling"],
        "description": "Mark is an AI voice agent with a male voice that answers missed calls for UK tradespeople 24/7, qualifies customer enquiries, and sends them to WhatsApp for instant response."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://whoza.ai/#claire",
        "name": "Claire",
        "alternateName": "Claire by whoza.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "url": "https://whoza.ai/blog/how-to-get-more-google-reviews-trades",
        "knowsAbout": ["Google Reviews", "Review Management", "Customer Feedback", "Reputation Management"],
        "description": "Claire is an AI review collection agent that automatically follows up after completed jobs to gather Google reviews and monitors competitor review activity."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://whoza.ai/#rex",
        "name": "Rex",
        "alternateName": "Rex by whoza.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "url": "https://whoza.ai/research/aeo-ai-search-optimisation-2026",
        "knowsAbout": ["SEO", "Competitor Analysis", "AI Visibility", "ChatGPT Optimization", "Google AI Overviews"],
        "description": "Rex is an AI visibility and competitor tracking agent that analyses competitors monthly and delivers weekly action reports to improve ChatGPT, Google AI, and customer recommendations."
      },
      {
        "@type": "HowTo",
        "name": "How whoza.ai Works",
        "description": "Get set up with whoza.ai in 4 simple steps: We answer every call, book real enquiries, send them to your phone, and you accept or decline.",
        "totalTime": "PT30M",
        "supply": [
          { "@type": "HowToSupply", "name": "Your existing business phone number" }
        ],
        "tool": [
          { "@type": "HowToTool", "name": "WhatsApp" }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "We Answer Every Call",
            "text": "Customer calls, Katie or Mark answers within 3 seconds. No voicemail, no missed opportunity. 24/7 availability with natural conversation that understands trade terms.",
            "url": "https://whoza.ai/#how-it-works"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "We Book Real Enquiries",
            "text": "Katie gathers all the details: what they need, when they need it, where they are. Collects job requirements, confirms location and urgency, and filters time-wasters.",
            "url": "https://whoza.ai/#how-it-works"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "We Send Them to Your Phone",
            "text": "Qualified enquiry lands on your phone instantly. Customer name, job type, location, time, and value. Accept, decline, or callback in just 2 taps.",
            "url": "https://whoza.ai/#how-it-works"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "You Accept, Call Back or Decline",
            "text": "You control every job. The enquiry is captured instantly with full details sent to your phone. You only deal with real, qualified jobs.",
            "url": "https://whoza.ai/#how-it-works"
          }
        ]
      },
      {
        "@type": "AudioObject",
        "name": "Hear Katie Answer a Real Customer Call",
        "description": "30-second demo of Katie, the AI voice agent for UK tradespeople, answering a real customer call about a leaky tap.",
        "contentUrl": "https://whoza.ai/audio/katie-demo.mp3",
        "encodingFormat": "audio/mpeg",
        "duration": "PT30S",
        "author": { "@id": "https://whoza.ai/#katie" },
        "publisher": { "@id": "https://whoza.ai/#organization" }
      },
      {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".faq-question", ".how-it-works-step"]
      }
    ]
  }

  return (
    <script
      id="homepage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}


// ─── VideoSchema ───────────────────────────────────────────────

interface VideoSchemaProps {
  name: string
  description: string
  embedUrl: string
  thumbnailUrl?: string
  contentUrl?: string
  uploadDate?: string
  duration?: string
}

/**
 * VideoSchema — JSON-LD structured data for VideoObject
 *
 * Usage: Add to any page that embeds the explainer video.
 *
 * Example:
 *   <VideoSchema
 *     name="Whoza.ai 60-Second Demo"
 *     description="See Katie capture a missed enquiry..."
 *     embedUrl="https://whoza.ai"
 *   />
 */
export function VideoSchema({
  name,
  description,
  embedUrl,
  thumbnailUrl = "https://whoza.ai/og-image.png",
  contentUrl = "https://whoza.ai/whoza-explainer.mp4",
  uploadDate = "2026-05-06T00:00:00+00:00",
  duration = "PT60S",
}: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnailUrl, "https://whoza.ai/og-image-1200x630.png"],
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
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
        urlTemplate: embedUrl,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
