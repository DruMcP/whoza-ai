"use client"

import { useEffect, useRef } from "react"

interface FAQItem {
  question: string
  answer: string
}

export function FAQPageSchema({ items }: { items: FAQItem[] }) {
  const idRef = useRef(`faq-schema-${Math.random().toString(36).slice(2, 11)}`)

  useEffect(() => {
    const id = idRef.current
    const existing = document.getElementById(id)
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
    script.id = id
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const cleanup = document.getElementById(id)
      if (cleanup) cleanup.remove()
    }
  }, [items])

  return null
}
