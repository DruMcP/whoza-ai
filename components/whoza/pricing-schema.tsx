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
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            merchantReturnLink: "https://whoza.ai/refund-policy",
            returnFees: "https://schema.org/FreeReturn",
            returnMethod: "https://schema.org/ReturnByMail",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "GBP",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "GB",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 0,
                unitCode: "HUR",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 0,
                unitCode: "HUR",
              },
            },
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
