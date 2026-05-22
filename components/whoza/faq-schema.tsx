"use client"

import { useEffect } from "react"

interface FAQItem {
  question: string
  answer: string
}

export function FAQPageSchema({ items }: { items: FAQItem[] }) {
  useEffect(() => {
    const existing = document.getElementById("homepage-faq-schema")
    if (existing) existing.remove()

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    }

    const script = document.createElement("script")
    script.id = "homepage-faq-schema"
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const cleanup = document.getElementById("homepage-faq-schema")
      if (cleanup) cleanup.remove()
    }
  }, [items])

  return null
}
