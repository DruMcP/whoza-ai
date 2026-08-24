import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, it, expect } from "vitest"
import { TRADE_CITY_PAGES } from "../lib/trade-city-pages"

// ── helpers ────────────────────────────────────────────────────────────────

const ROOTS = ["app", "components", "lib"]
const SKIP = new Set(["node_modules", ".next", "dist", ".git"])
const EXT_RE = /\.(ts|tsx|js|jsx|md|mdx)$/

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    if (SKIP.has(e)) continue
    const p = join(dir, e)
    statSync(p).isDirectory() ? walk(p, out) : out.push(p)
  }
  return out
}

/** Extract literal href="/…" and template href={`/…`} values from a file. */
function extractHrefs(content: string): string[] {
  const out: string[] = []
  // href="/foo"  or  href='/foo'
  for (const m of content.matchAll(/href=["'](\/(?:[^"']*))["']/g)) {
    out.push(m[1])
  }
  // href={`/foo${bar}`}  → capture the static prefix
  for (const m of content.matchAll(/href=\{`(\/[^${`]*)[^`]*`\}/g)) {
    out.push(m[1])
  }
  return out
}

// ── build valid-route set ──────────────────────────────────────────────────

const validRoutes = new Set<string>(["/"])

// 1. Static app/ routes (directories with page.tsx)
function addStaticRoutes(dir: string, prefix: string) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    if (e.name.startsWith("[")) continue // dynamic segment
    if (e.name.startsWith("(")) continue // route group
    if (e.name.startsWith("_")) continue
    const sub = join(dir, e.name)
    const hasPage = readdirSync(sub, { withFileTypes: true }).some(
      f => f.isFile() && /^page\.(tsx|ts|js|jsx|mdx)$/.test(f.name)
    )
    const route = prefix + "/" + e.name
    if (hasPage) validRoutes.add(route)
    // recurse if there are subdirectories with pages
    if (statSync(sub).isDirectory()) {
      try {
        addStaticRoutes(sub, route)
      } catch { /* ignore */ }
    }
  }
}
try { addStaticRoutes("app", "") } catch { /* ignore */ }

// 2. Blog posts
const blogKeys = (() => {
  try {
    const text = readFileSync("lib/blog-content.ts", "utf8")
    const m = text.match(/export const blogPostContents: Record<string, BlogPostContent> = \{([\s\S]*?)\n\};/)
    if (!m) return []
    return [...m[1].matchAll(/^\s+"([^"]+)":/gm)].map(x => x[1])
  } catch { return [] }
})()
for (const k of blogKeys) validRoutes.add("/blog/" + k)

// 3. Trade × city pages
for (const [trade, cities] of Object.entries(TRADE_CITY_PAGES)) {
  for (const city of cities) validRoutes.add(`/${trade}-${city}`)
}

// 4. Known dynamic routes with fixed slugs
const knownSlugs: Record<string, string[]> = {
  "/tools": ["lost-jobs-calculator", "quote-generator", "rate-checker", "voicemail-script-generator"],
}
for (const [base, slugs] of Object.entries(knownSlugs)) {
  for (const s of slugs) validRoutes.add(`${base}/${s}`)
}

// 5. City landing pages
const citySlugs = (() => {
  try {
    const text = readFileSync("lib/locations.ts", "utf8")
    return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1])
  } catch { return [] }
})()
for (const c of citySlugs) validRoutes.add("/" + c)

// 6. Allow-list: routes that are handled by rewrites/redirects or external
const ALLOWLIST = new Set([
  "/api",
  "/api/:path*",
  "/admin",
  "/portal",
  "/checkout",
  "/login",
  "/sign-in",
  "/dashboard",
  "/cdn-cgi",
  "/.netlify",
  "/sitemap.xml",
  "/robots.txt",
  "/ai.txt",
  "/favicon.ico",
  "/_next",
  "/_next/static",
])

// ── test ───────────────────────────────────────────────────────────────────

describe("no dead internal links", () => {
  const files = ROOTS.flatMap(r => {
    try { return walk(r) } catch { return [] }
  }).filter(f => EXT_RE.test(f))

  const unresolved = new Map<string, string[]>() // href -> [files]

  for (const f of files) {
    const content = readFileSync(f, "utf8")
    for (const href of extractHrefs(content)) {
      // Skip external, anchor-only, mail/tel, template variables
      if (href.startsWith("http")) continue
      if (href.startsWith("#")) continue
      if (href.startsWith("mailto:")) continue
      if (href.startsWith("tel:")) continue
      if (href.includes("${")) continue // unexpanded template
      if (ALLOWLIST.has(href)) continue
      if (ALLOWLIST.has(href.replace(/:\*$/, ""))) continue

      // Strip query strings and hashes for matching
      const clean = href.split(/[?#]/)[0]

      // Check exact match
      if (validRoutes.has(clean)) continue

      // Check parent route (e.g. /blog/foo matches if /blog exists)
      let found = false
      for (let i = clean.length; i > 0; i--) {
        if (clean[i] === "/") {
          if (validRoutes.has(clean.slice(0, i))) {
            found = true
            break
          }
        }
      }
      if (found) continue

      if (!unresolved.has(clean)) unresolved.set(clean, [])
      unresolved.get(clean)!.push(f)
    }
  }

  it("has zero unresolved internal href targets", () => {
    const list = Array.from(unresolved.entries())
      .map(([href, files]) => `${href}  (${[...new Set(files)].join(", ")})`)
      .sort()
    expect(list).toEqual([])
  })
})
