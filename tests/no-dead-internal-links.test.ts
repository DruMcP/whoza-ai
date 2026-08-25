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
function extractLiteralHrefs(content: string): string[] {
  const out: string[] = []
  for (const m of content.matchAll(/href=["'](\/(?:[^"']*))["']/g)) {
    out.push(m[1])
  }
  for (const m of content.matchAll(/href=\{\`(\/[^`${`]*?)\`\}/g)) {
    out.push(m[1])
  }
  return out
}

/**
 * Resolve template hrefs inside .map() blocks over hardcoded arrays.
 * Returns every concrete href that would be emitted at runtime.
 */
function resolveTemplateHrefs(content: string): string[] {
  const out: string[] = []

  // Find .map() blocks over hardcoded string arrays.
  // Capture the array contents and the iteration variable name.
  const mapRe = /\[\s*"([^"]+)"((?:\s*,\s*"[^"]+")*)\s*\]\.map\(\s*(\w+)\s*=>/g

  let m
  while ((m = mapRe.exec(content)) !== null) {
    const first = m[1]
    const restRaw = m[2]
    const varName = m[3]

    // Build the full array of string values
    const values: string[] = [first]
    for (const rm of restRaw.matchAll(/"([^"]+)"/g)) {
      values.push(rm[1])
    }

    // Find the matching closing of this .map() expression.
    // We scan forward from the match, counting braces to locate the end.
    let depth = 1 // we've consumed the opening '('
    let pos = m.index + m[0].length
    const len = content.length
    while (pos < len && depth > 0) {
      const ch = content[pos]
      if (ch === "(") depth++
      else if (ch === ")") depth--
      pos++
    }
    const block = content.slice(m.index, pos)

    // Look for a template href inside this block that uses the iteration variable.
    // href={`/prefix-${VAR.transform()}-suffix`}
    const pattern =
      'href=\\{\\`([^\\`]*\\$\\{[^\\`]*\\b' + varName + '\\b[^\\`]*\\}[^\\`]*)\\`\\}'
    const hrefRe = new RegExp(pattern, 'g')

    let hm
    while ((hm = hrefRe.exec(block)) !== null) {
      const fullTemplate = hm[1]

      for (const rawVal of values) {
        let val = rawVal
        // Simulate the most common transforms seen in the codebase
        if (fullTemplate.includes(".toLowerCase()")) {
          val = val.toLowerCase()
        }
        if (fullTemplate.includes('.replace(/\\s+/g, "-")') || fullTemplate.includes(".replace(/\\s+/g, '-')")) {
          val = val.replace(/\s+/g, "-")
        }
        if (fullTemplate.includes('.replace(/[^a-z]+/g, "-")')) {
          val = val.toLowerCase().replace(/[^a-z]+/g, "-")
        }
        // Reconstruct: replace ${varName...} with the transformed value
        const resolved = fullTemplate.replace(/\$\{[^}]+\}/, val)
        out.push(resolved)
      }
    }
  }

  return out
}

/** Find template hrefs that contain ${ but were NOT resolved by resolveTemplateHrefs. */
function findUnresolvableTemplates(content: string, file: string): string[] {
  const out: string[] = []
  // Match any href={`...${...}...`} template
  for (const m of content.matchAll(/href=\{\`([^`]*\$\{[^`]*\}[^`]*)\`\}/g)) {
    const template = m[1]
    // Skip external/action links
    if (template.startsWith("mailto:") || template.startsWith("tel:") || template.startsWith("http")) continue
    // Skip anchor-only templates
    if (template.startsWith("#")) continue
    // Skip known dynamic route patterns (resolved by Next.js dynamic segments or registries)
    if (template.includes("${city.slug}") || template.includes("${loc.slug}")) continue
    if (template.includes("${key}") && file.includes("[slug]")) continue // dynamic blog/resource routes
    if (template.includes("${r.slug}")) continue // dynamic resource routes
    if (template.includes("${trade}") && template.includes("${city}") && file.includes("trade-city-links")) continue
    // Skip if it was already resolved (contains no ${ anymore)
    if (!template.includes("${")) continue
    out.push(template)
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

// ── 3. Trade × city pages (canonical registry) — verified against filesystem ──

const registryMissing: string[] = []
for (const [trade, cities] of Object.entries(TRADE_CITY_PAGES)) {
  for (const city of cities) {
    const dir = `app/${trade}-${city}`
    const page = `${dir}/page.tsx`
    try {
      statSync(page)
    } catch {
      registryMissing.push(`/${trade}-${city} (expected ${page})`)
    }
    validRoutes.add(`/${trade}-${city}`)
  }
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

// 6. Static assets in public/
const publicAssets = new Set<string>()
try {
  for (const f of walk("public")) {
    publicAssets.add("/" + f.replace(/^public\//, ""))
  }
} catch { /* ignore */ }

// 7. Allow-list: routes handled by rewrites/redirects or external
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

// ── self-test fixture ──────────────────────────────────────────────────────

const FIXTURE = `
<a href="/blog/zzz-fake-dead-post">probe</a>
<a href="/research/zzz-fake">probe2</a>
`

// ── test ───────────────────────────────────────────────────────────────────

describe("no dead internal links", () => {
  const files = ROOTS.flatMap(r => {
    try { return walk(r) } catch { return [] }
  }).filter(f => EXT_RE.test(f))

  const unresolved = new Map<string, string[]>() // href -> [files]
  const unresolvable = new Map<string, string[]>() // template pattern -> [files]
  let expandedCount = 0

  for (const f of files) {
    const content = readFileSync(f, "utf8")

    // Collect all hrefs: literal + resolved templates
    const allHrefs = new Set<string>()
    for (const href of extractLiteralHrefs(content)) allHrefs.add(href)
    const resolved = resolveTemplateHrefs(content)
    expandedCount += resolved.length
    for (const href of resolved) allHrefs.add(href)

    // Check for unresolvable templates
    for (const tmpl of findUnresolvableTemplates(content, f)) {
      if (!unresolvable.has(tmpl)) unresolvable.set(tmpl, [])
      unresolvable.get(tmpl)!.push(f)
    }

    for (const href of allHrefs) {
      if (href.startsWith("http")) continue
      if (href.startsWith("#")) continue
      if (href.startsWith("mailto:")) continue
      if (href.startsWith("tel:")) continue
      if (ALLOWLIST.has(href)) continue
      if (ALLOWLIST.has(href.replace(/:\*$/, ""))) continue

      const clean = href.split(/[?#]/)[0]

      if (publicAssets.has(clean)) continue
      if (publicAssets.has(clean + ".html")) continue
      if (validRoutes.has(clean)) continue

      // Parent-route fallback REMOVED — a page route is not a wildcard.
      // If a prefix genuinely needs matching, add it to ALLOWLIST with a comment.

      if (!unresolved.has(clean)) unresolved.set(clean, [])
      unresolved.get(clean)!.push(f)
    }
  }

  it("TRADE_CITY_PAGES registry matches filesystem — every entry has a page.tsx", () => {
    expect(registryMissing).toEqual([])
  })

  it("self-test: fixture must produce unresolved links", () => {
    const fixtureHrefs = extractLiteralHrefs(FIXTURE)
    const fixtureUnresolved: string[] = []
    for (const href of fixtureHrefs) {
      const clean = href.split(/[?#]/)[0]
      if (!validRoutes.has(clean) && !publicAssets.has(clean) && !ALLOWLIST.has(clean)) {
        fixtureUnresolved.push(clean)
      }
    }
    expect(fixtureUnresolved).toContain("/blog/zzz-fake-dead-post")
    expect(fixtureUnresolved).toContain("/research/zzz-fake")
  })

  it(`has zero unresolvable template hrefs (resolver checked ${expandedCount} expanded URLs)`, () => {
    const list = Array.from(unresolvable.entries())
      .map(([tmpl, files]) => `${tmpl}  (${[...new Set(files)].join(", ")})`)
      .sort()
    expect(list).toEqual([])
  })

  it("has zero unresolved internal href targets", () => {
    const list = Array.from(unresolved.entries())
      .map(([href, files]) => `${href}  (${[...new Set(files)].join(", ")})`)
      .sort()
    expect(list).toEqual([])
  })
})
