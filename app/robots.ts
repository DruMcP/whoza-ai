import type { MetadataRoute } from "next"

/**
 * robots.txt — SINGLE wildcard group, deliberately.
 *
 * RFC 9309: a crawler obeys only the most specific matching group. A named
 * group containing only `Allow: /` (e.g. for Bingbot) makes that crawler
 * ignore every Disallow in the `*` group. Named per-agent groups must never
 * be shipped unless they duplicate the full Disallow block verbatim — and
 * 26 copies of the same rules is unmaintainable, so we use one group.
 * The wildcard group already allows every crawler not explicitly disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/"],
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/portal/",
          "/checkout/",
          "/login/",
          "/sign-in/",
          "/dashboard/",
          "/cdn-cgi/",
          "/.netlify/",
          "/*.json$",
          "/*?nocache=",
        ],
      },
    ],
    sitemap: "https://whoza.ai/sitemap.xml",
  }
}
