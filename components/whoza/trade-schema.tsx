import { TradeData } from "@/lib/trades"

interface TradeSchemaProps {
  tradeData: TradeData
}

/**
 * Trade Schema — consolidated structured data for trade pages.
 *
 * Outputs ONE <script> tag with @graph array containing:
 * - FAQPage
 * - HowTo
 * - Service (with all 4 pricing plans)
 * - BreadcrumbList
 * - WebPage (with SpeakableSpecification)
 *
 * Pricing must match verified data exactly:
 * - Starter: £59, Growth: £125, Pro: £230, Scale: £399
 * - Currency: GBP, Country: GB
 */

const ORGANIZATION_ID = "https://whoza.ai/#organization"

const PRICING_PLANS = [
  { name: "Starter", price: "59" },
  { name: "Growth", price: "125" },
  { name: "Pro", price: "230" },
  { name: "Scale", price: "399" },
]

export function TradeSchema({ tradeData }: TradeSchemaProps) {
  const serviceId = `https://whoza.ai/trade/${tradeData.slug}#service`

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: tradeData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const howToSchema = {
    "@type": "HowTo",
    name: `How to Set Up AI Call Handling for ${tradeData.display}`,
    description: `Four-step process to get Katie answering calls for your ${tradeData.singular} business`,
    totalTime: "PT30M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "UK phone number or existing business line",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Smartphone with WhatsApp",
      },
    ],
    step: tradeData.howItWorks.map((step) => ({
      "@type": "HowToStep",
      position: step.step,
      name: step.title,
      text: step.description,
    })),
  }

  const serviceSchema = {
    "@type": "Service",
    "@id": serviceId,
    name: `AI Call Handling for ${tradeData.display}`,
    description: tradeData.metaDescription,
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "whoza.ai",
      url: "https://whoza.ai",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "whoza.ai Pricing Plans",
      itemListElement: PRICING_PLANS.map((plan) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `https://whoza.ai/pricing#${plan.name.toLowerCase()}-plan`,
          name: `${plan.name} Plan`,
        },
        price: plan.price,
        priceCurrency: "GBP",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://whoza.ai/pricing",
        eligibleRegion: {
          "@type": "Country",
          name: "United Kingdom",
          applicableCountry: "GB",
        },
      })),
    },
  }

  const breadcrumbSchema = {
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
        name: tradeData.display,
        item: `https://whoza.ai/trade/${tradeData.slug}`,
      },
    ],
  }

  const speakableSchema = {
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".trade-headline",
        ".trade-subheadline",
        ".trade-faq-question",
      ],
    },
    headline: tradeData.headline,
    description: tradeData.subheadline,
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      faqSchema,
      howToSchema,
      serviceSchema,
      breadcrumbSchema,
      speakableSchema,
    ],
  }

  return (
    <script
      id="trade-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
