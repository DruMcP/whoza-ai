"use client"

import Script from "next/script"

interface PricingSchemaProps {
  currency: string
  plans: {
    name: string
    price: number
    description: string
    url?: string
  }[]
}

export function PricingSchema({ currency, plans }: PricingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: plans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `Whoza.ai ${plan.name} Plan`,
        description: plan.description,
        url: plan.url || "https://whoza.ai/pricing",
        brand: {
          "@type": "Brand",
          name: "Whoza.ai",
        },
        offers: {
          "@type": "Offer",
          price: plan.price.toString(),
          priceCurrency: currency,
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: plan.url || "https://whoza.ai/pricing",
          seller: {
            "@type": "Organization",
            name: "Whoza.ai",
            url: "https://whoza.ai",
          },
        },
      },
    })),
  }

  return (
    <Script
      id="pricing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
