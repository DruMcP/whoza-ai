import React from "react"

interface BreadcrumbItem {
  name: string
  item: string
}

export interface BreadcrumbNodeItem {
  name: string
  item: string
}

const SITE_ORIGIN = "https://whoza.ai"

function normalizeBreadcrumbItemUrl(item: string) {
  return item === SITE_ORIGIN ? `${SITE_ORIGIN}/` : item
}

/**
 * buildBreadcrumbNode — returns the BreadcrumbList node for merging into a
 * page-level @graph (see JsonLdGraph). Wires isPartOf → #website so engines
 * can state the relationship instead of inferring it.
 *
 * The breadcrumb @id is scoped to the final crumb URL so every page describes
 * a distinct breadcrumb node instead of reusing the homepage identifier.
 */
export function buildBreadcrumbNode(items: BreadcrumbNodeItem[]) {
  const normalizedItems = items.map((item) => ({
    ...item,
    item: normalizeBreadcrumbItemUrl(item.item),
  }))
  const pageUrl = normalizedItems[normalizedItems.length - 1]?.item

  if (!pageUrl) {
    throw new Error("BreadcrumbSchema requires at least one breadcrumb item")
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "isPartOf": { "@id": "https://whoza.ai/#website" },
    "itemListElement": normalizedItems.map((item, index) => ({
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
 *   <BreadcrumbSchema items={[{ name: "Home", item: "https://whoza.ai/" }]} />
 * 
 * Example (pricing):
 *   <BreadcrumbSchema items={[
 *     { name: "Home", item: "https://whoza.ai/" },
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
