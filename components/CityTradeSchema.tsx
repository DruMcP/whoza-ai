import React from "react";

export interface CityTradeSchemaProps {
  trade: string;
  tradePlural: string;
  city: string;
  region?: string;
  pageUrl: string;
  startingPrice?: string;
  currency?: string;
}

const esc = (d: unknown) => JSON.stringify(d).replace(/</g, "\\u003c");

export default function CityTradeSchema({
  trade,
  tradePlural,
  city,
  region,
  pageUrl,
  startingPrice = "59",
  currency = "GBP",
}: CityTradeSchemaProps) {
  const areaServed: Record<string, unknown> = {
    "@type": "City",
    name: city,
    address: { "@type": "PostalAddress", addressLocality: city, addressCountry: "GB" },
  };
  if (region) areaServed.containedInPlace = { "@type": "AdministrativeArea", name: region };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `AI Call Answering for ${tradePlural} in ${city}`,
        description: `AI voice agents answer missed calls 24/7 for ${tradePlural} in ${city}, qualifying enquiries and sending job details to WhatsApp. Plans from £${startingPrice}/month.`,
        provider: { "@id": "https://whoza.ai/#organization" },
        areaServed,
        serviceType: "AI Call Answering",
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: startingPrice,
          priceCurrency: currency,
          url: pageUrl,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: startingPrice,
            priceCurrency: currency,
            unitText: "month",
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `AI Call Answering for ${tradePlural} in ${city} | Whoza.ai`,
        isPartOf: { "@id": "https://whoza.ai/#website" },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "en-GB",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: esc(schema) }}
    />
  );
}
