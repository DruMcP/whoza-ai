// FAQ Page Schema — server-rendered FAQPage structured data.
//
// Use this for server-rendered pages where crawlers must see the schema
// without executing JavaScript.
//
// Current usage (all pages pass unique FAQ data — no duplication):
//  - Trade pages: /for-[trade] and /for-[trade]-[city] pages
//  - FAQ page: /faq
//  - Research/blog pages with FAQ sections
//
// For client-side injection (homepage, blog), use @/components/whoza/faq-schema.

export interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[]
  speakableSelectors?: string[]
}

export function FAQPageSchema({ faqs, speakableSelectors }: FAQPageSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  if (speakableSelectors && speakableSelectors.length > 0) {
    schema.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
