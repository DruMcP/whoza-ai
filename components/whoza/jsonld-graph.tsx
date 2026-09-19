import React from "react"

/**
 * JsonLdGraph — renders ONE <script type="application/ld+json"> containing a
 * single @graph of page-scoped schema nodes.
 *
 * Why: multiple standalone JSON-LD blocks per page force search engines to
 * reconcile them by URL/name matching. One graph lets every node state its
 * relationships explicitly via @id references (isPartOf → #website,
 * provider → #organization, etc.). The canonical identity graph
 * (Organization / WebSite / SoftwareApplication) ships separately from
 * app/layout.tsx — the App Router root layout cannot read the current route
 * without forcing every page into dynamic rendering (which would kill ISR),
 * so the identity nodes live in the shared layout and every page graph
 * references them by @id.
 *
 * Usage (homepage):
 *   <JsonLdGraph nodes={[
 *     ...buildHomepageEntityNodes(),
 *     buildBreadcrumbNode(items),
 *     buildFaqPageNode(faqs, "https://whoza.ai/#faq"),
 *     buildVideoNode(videoProps),
 *   ]} />
 */
export function JsonLdGraph({
  id = "page-jsonld-graph",
  nodes,
}: {
  id?: string
  nodes: object[]
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
