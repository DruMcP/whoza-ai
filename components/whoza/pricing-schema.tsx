"use client"

import Script from "next/script"

/**
 * Pricing Schema — Service type structured data for whoza.ai pricing plans.
 *
 * Uses verified pricing (do not change without confirming with product):
 * - Starter: £59/month, 10 jobs, 100 min, £4.50/extra job, 1 concurrent call
 * - Growth: £125/month, 20 jobs, 300 min, £3.25/extra job, 2 concurrent calls
 * - Pro: £230/month, 40 jobs, 700 min, £2.75/extra job, 3 concurrent calls
 * - Scale: £399/month, 100 jobs, 1500 min, £2.25/extra job, 5 concurrent calls
 * - Overage: £0.40/minute for extra minutes
 * - Currency: GBP, Country: GB
 */

const PLANS = [
  {
    name: "Starter",
    price: "59",
    description:
      "AI call handling for UK trades. 10 jobs included, 100 minutes included, 1 concurrent call. £4.50 per extra job.",
  },
  {
    name: "Growth",
    price: "125",
    description:
      "AI call handling for UK trades. 20 jobs included, 300 minutes included, 2 concurrent calls. £3.25 per extra job.",
  },
  {
    name: "Pro",
    price: "230",
    description:
      "AI call handling for UK trades. 40 jobs included, 700 minutes included, 3 concurrent calls. £2.75 per extra job.",
  },
  {
    name: "Scale",
    price: "399",
    description:
      "AI call handling for UK trades. 100 jobs included, 1500 minutes included, 5 concurrent calls. £2.25 per extra job.",
  },
]

const ORGANIZATION_ID = "https://whoza.ai/#organization"

export function PricingSchema() {
  const offers = PLANS.map((plan) => ({
    "@type": "Offer" as const,
    name: `${plan.name} Plan`,
    price: plan.price,
    priceCurrency: "GBP",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://whoza.ai/pricing",
    itemOffered: {
      "@type": "Service" as const,
      "@id": `https://whoza.ai/pricing#${plan.name.toLowerCase()}-plan`,
      name: `whoza.ai ${plan.name} Plan`,
      description: plan.description,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: {
        "@type": "Country" as const,
        name: "United Kingdom",
      },
    },
    eligibleRegion: {
      "@type": "Country" as const,
      name: "United Kingdom",
      applicableCountry: "GB",
    },
  }))

  const services = PLANS.map((plan) => ({
    "@type": "Service" as const,
    "@id": `https://whoza.ai/pricing#${plan.name.toLowerCase()}-plan`,
    name: `whoza.ai ${plan.name} Plan`,
    description: plan.description,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "Country" as const,
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog" as const,
      name: "whoza.ai Pricing Plans",
      itemListElement: offers,
    },
  }))

  const aggregateOffer = {
    "@type": "AggregateOffer" as const,
    name: "whoza.ai Plans",
    description:
      "AI call handling plans for UK tradespeople. Starting from £59/month.",
    lowPrice: "59",
    highPrice: "399",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    url: "https://whoza.ai/pricing",
    eligibleRegion: {
      "@type": "Country" as const,
      name: "United Kingdom",
      applicableCountry: "GB",
    },
    offerCount: PLANS.length.toString(),
    offers,
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "whoza.ai",
        url: "https://whoza.ai",
      },
      ...services,
      aggregateOffer,
    ],
  }

  return (
    <Script
      id="pricing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
