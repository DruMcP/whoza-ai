import { TradeData } from "@/lib/trades"

interface TradeSchemaProps {
  tradeData: TradeData
}

export function TradeSchema({ tradeData }: TradeSchemaProps) {
  const tradeUrl = `https://whoza.ai/trade/${tradeData.slug}`

  // FAQPage schema for AEO — structured for AI snippet capture
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${tradeUrl}#faqpage`,
    "mainEntity": tradeData.faqs.map((faq, i) => ({
      "@type": "Question",
      "@id": `${tradeUrl}#faq-${i + 1}`,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "datePublished": "2026-05-19",
        "author": { "@id": "https://whoza.ai/#organization" }
      },
    })),
  }

  // HowTo schema for the setup process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${tradeUrl}#howto`,
    "name": `How to Set Up AI Call Handling for ${tradeData.display}`,
    "description": `Four-step process to get Katie answering calls for your ${tradeData.singular} business in under 30 minutes`,
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "GBP",
      "value": "59"
    },
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
      "url": `${tradeUrl}#step-${step.step}`,
    })),
  }

  // Service schema for the trade-specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${tradeUrl}#service`,
    "name": `AI Call Handling for ${tradeData.display}`,
    "description": tradeData.metaDescription,
    "provider": {
      "@type": "Organization",
      "@id": "https://whoza.ai/#organization",
      "name": "Whoza.ai",
      "url": "https://whoza.ai",
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom",
    },
    "serviceType": `AI Call Handling for ${tradeData.display}`,
    "audience": {
      "@type": "Audience",
      "audienceType": `${tradeData.display} in the UK`
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
            "description": "AI call handling for small trade businesses"
          },
          "price": "59",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://whoza.ai/pricing"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Plan",
            "description": "AI call handling for growing trade businesses"
          },
          "price": "125",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://whoza.ai/pricing"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pro Plan",
            "description": "AI call handling for established trade businesses"
          },
          "price": "230",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://whoza.ai/pricing"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scale Plan",
            "description": "AI call handling for multi-person trade businesses"
          },
          "price": "399",
          "priceCurrency": "GBP",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://whoza.ai/pricing"
        }
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  // Product schema for trade-specific offering
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${tradeUrl}#product`,
    "name": `Whoza.ai for ${tradeData.display}`,
    "description": tradeData.metaDescription,
    "brand": {
      "@type": "Brand",
      "name": "Whoza.ai"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "59",
      "highPrice": "399",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://whoza.ai/pricing",
      "offerCount": "4"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "24/7 AI call handling",
      "Instant WhatsApp alerts",
      "Lead qualification",
      "Google review collection",
      "7-day free trial",
      "No contracts"
    ]
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${tradeUrl}#breadcrumb`,
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
        "item": tradeUrl,
      },
    ],
  }

  // SpeakableSpecification for voice search optimization
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${tradeUrl}#webpage`,
    "url": tradeUrl,
    "name": tradeData.headline,
    "description": tradeData.subheadline,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".trade-headline", ".trade-subheadline", ".trade-problem", ".trade-solution", ".trade-faq-question"],
    },
    "publisher": { "@id": "https://whoza.ai/#organization" }
  }

  // WebPage schema with mainEntity
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": tradeUrl,
    "url": tradeUrl,
    "name": tradeData.headline,
    "description": tradeData.metaDescription,
    "mainEntity": { "@id": `${tradeUrl}#service` },
    "isPartOf": { "@id": "https://whoza.ai/#website" },
    "publisher": { "@id": "https://whoza.ai/#organization" },
    "datePublished": "2026-05-19",
    "dateModified": "2026-05-19"
  }

  const schemas = [faqSchema, howToSchema, serviceSchema, productSchema, breadcrumbSchema, speakableSchema, webPageSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`trade-schema-${tradeData.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
