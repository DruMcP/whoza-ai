import React from "react"

interface BreadcrumbItem {
  name: string
  item: string
}

export interface BreadcrumbNodeItem {
  name: string
  item: string
}

/**
 * buildBreadcrumbNode — returns the BreadcrumbList node for merging into a
 * page-level @graph (see JsonLdGraph). Wires isPartOf → #website so engines
 * can state the relationship instead of inferring it.
 */
export function buildBreadcrumbNode(items: BreadcrumbNodeItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": "https://whoza.ai/#breadcrumb",
    "isPartOf": { "@id": "https://whoza.ai/#website" },
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item,
    })),
  }
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
    ...buildBreadcrumbNode(items),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
