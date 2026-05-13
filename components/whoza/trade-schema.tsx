import { TradeData } from "@/lib/trades"

interface TradeSchemaProps {
  tradeData: TradeData
}

export function TradeSchema({ tradeData }: TradeSchemaProps) {
  // FAQPage schema for AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tradeData.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  // HowTo schema for the process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Set Up AI Call Handling for ${tradeData.display}`,
    "description": `Four-step process to get Katie answering calls for your ${tradeData.singular} business`,
    "totalTime": "PT30M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "UK phone number or existing business line",
      },
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Smartphone with WhatsApp",
      },
    ],
    "step": tradeData.howItWorks.map((step) => ({
      "@type": "HowToStep",
      "position": step.step,
      "name": step.title,
      "text": step.description,
    })),
  }

  // Service schema for the trade-specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `AI Call Handling for ${tradeData.display}`,
    "description": tradeData.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Whoza.ai",
      "url": "https://whoza.ai",
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Whoza Pricing Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Plan",
          },
          "price": "59",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Plan",
          },
          "price": "125",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
        },
      ],
    },
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://whoza.ai",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tradeData.display,
        "item": `https://whoza.ai/trade/${tradeData.slug}`,
      },
    ],
  }

  // SpeakableSpecification for voice search optimization
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".trade-headline", ".trade-subheadline", ".trade-faq-question"],
    },
    "headline": tradeData.headline,
    "description": tradeData.subheadline,
  }

  const schemas = [faqSchema, howToSchema, serviceSchema, breadcrumbSchema, speakableSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
