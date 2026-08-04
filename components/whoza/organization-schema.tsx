/**
 * Shared Organization schema object for whoza.ai.
 *
 * This object is imported into any page that needs to render the canonical
 * Organization JSON-LD (layout.tsx, press/page.tsx, etc.).
 *
 * Keeps `sameAs`, address, identifier, and other entity fields in one place
 * so enrichment (Crunchbase, Trustpilot, Wikidata, etc.) is a single-line
 * change once a profile is confirmed live and owned by whoza.ai.
 */

export const organizationSchemaObject = {
  "@type": "Organization",
  "@id": "https://whoza.ai/#organization",
  "name": "Whoza.ai",
  "legalName": "WHOZA AI LTD",
  "alternateName": "whoza.ai",
  "url": "https://whoza.ai",
  "logo": {
    "@type": "ImageObject",
    "url": "https://whoza.ai/logo.webp",
    "width": 512,
    "height": 512,
  },
  "image": "https://whoza.ai/logo.webp",
  "description":
    "AI call answering service built in Scotland for UK tradespeople. Katie answers every missed call 24/7, qualifies jobs, and sends details to WhatsApp.",
  "slogan": "While you work, we book. Job done.",
  "foundingDate": "2025",
  "telephone": "+447463141750",
  "email": "support@whoza.ai",
  "identifier": [
    {
      "@type": "PropertyValue",
      "name": "Company number",
      "value": "SC787047",
    },
    {
      "@type": "PropertyValue",
      "name": "ICO registration",
      "value": "ZC077271",
    },
  ],
  "founders": [
    {
      "@type": "Person",
      "name": "Dru McPherson",
      "jobTitle": "Founder & CEO",
    },
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "5-10",
  },
  "knowsAbout": [
    "AI Voice Agents",
    "Call Answering Services",
    "UK Trade Businesses",
    "Plumbing",
    "Electrical Services",
    "Building and Construction",
    "Emergency Call Handling",
    "WhatsApp Business Integration",
  ],
  "areaServed": ["GB", "US"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6 Atholl Crescent",
    "addressLocality": "Perth",
    "addressRegion": "Scotland",
    "postalCode": "PH1 5JN",
    "addressCountry": "GB",
  },
  "location": {
    "@type": "Place",
    "name": "Operational base",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "97 Main Street",
      "addressLocality": "Tomintoul",
      "addressRegion": "Banffshire",
      "postalCode": "AB37 9HA",
      "addressCountry": "GB",
    },
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@whoza.ai",
    "telephone": "+447463141750",
    "areaServed": ["GB", "US"],
    "availableLanguage": ["English"],
  },
  // sameAs enrichment TODO — add each URL below only once the profile is confirmed
  // live and owned by whoza.ai. Do not add placeholder/guessed URLs.
  //   - Crunchbase company profile
  //   - Trustpilot business profile
  //   - Wikidata entity
  //   - G2 product listing (verify it's genuinely live before adding — could not
  //     be confirmed via search as of this writing)
  //   - Yell business listing (verify it's genuinely live before adding — could not
  //     be confirmed via search as of this writing)
  //   - YouTube channel (verify which handle is canonical — @whoza-ai and others
  //     may exist; confirm ownership before adding, and flag any handles that
  //     aren't actually whoza's for cleanup rather than adding them)
  //   - Instagram (same caveat — multiple handles referencing "whoza" were found;
  //     confirm which, if any, are genuinely owned before treating as a profile
  //     to add)
  "sameAs": [
    "https://www.linkedin.com/company/whoza",
    "https://www.facebook.com/profile.php?id=61586217731657",
  ],
} as const
