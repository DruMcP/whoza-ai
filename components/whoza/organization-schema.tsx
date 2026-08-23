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

import { COMPANY } from "@/lib/company";

export const organizationSchemaObject = {
  "@type": "Organization",
  "@id": "https://whoza.ai/#organization",
  "name": "Whoza.ai",
  "legalName": COMPANY.legalName,
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
  "foundingDate": COMPANY.incorporatedOn,
  "telephone": "+447463141750",
  "email": "support@whoza.ai",
  "identifier": [
    {
      "@type": "PropertyValue",
      "name": "Company number",
      "value": COMPANY.companyNumber,
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
  "areaServed": "GB",
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
    "areaServed": "GB",
    "availableLanguage": ["English"],
  },
  // sameAs enrichment TODO — add each URL below only once the profile is confirmed
  // live and owned by whoza.ai. Do not add placeholder/guessed URLs.
  //   - Crunchbase company profile
  //   - Trustpilot business profile
  //   - Wikidata entity
  //   - YouTube channel (verify which handle is canonical — @whoza-ai and others
  //     may exist; confirm ownership before adding, and flag any handles that
  //     aren't actually whoza's for cleanup rather than adding them)
  //   - Instagram (same caveat — multiple handles referencing "whoza" were found;
  //     confirm which, if any, are genuinely owned before treating as a profile
  //     to add)
  "sameAs": [
    COMPANY.registerUrl,
    "https://www.linkedin.com/company/whoza",
    "https://www.facebook.com/profile.php?id=61586217731657",
    "https://www.yell.com/biz/whoza-ai-ltd-perth-11011120/",
    "https://www.g2.com/sellers/whoza-ai",
  ],
} as const
