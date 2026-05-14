"use client"

import React from "react"

interface BreadcrumbItem {
  name: string
  item: string
}

/**
 * BreadcrumbSchema — JSON-LD structured data for breadcrumbs
 * 
 * Usage: Add to any page's JSX output with the page-specific breadcrumb trail.
 * 
 * Example (homepage):
 *   <BreadcrumbSchema items={[{ name: "Home", item: "https://whoza.ai" }]} />
 * 
 * Example (pricing):
 *   <BreadcrumbSchema items={[
 *     { name: "Home", item: "https://whoza.ai" },
 *     { name: "Pricing", item: "https://whoza.ai/pricing" },
 *   ]} />
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
