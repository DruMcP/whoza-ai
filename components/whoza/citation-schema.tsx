interface Citation {
  name: string
  url?: string
  author?: string
  datePublished?: string
  /** Source-level caution — not emitted into JSON-LD (not a schema.org property). */
  note?: string
}

export function CitationSchema({ citations }: { citations: Citation[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "citation": citations.map((c) => ({
      "@type": "CreativeWork",
      "name": c.name,
      ...(c.url && { "url": c.url }),
      ...(c.author && { "author": { "@type": "Organization", "name": c.author } }),
      ...(c.datePublished && { "datePublished": c.datePublished }),
    })),
  }

  return (
    <script
      id="citation-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
