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
  for (const m of content.matchAll(/href=\{`(\/[^`${`]*?)`\}/g)) {
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
      'href=\\{\\`([^\\`]*)\\$\\{[^\\`]*\\b' + varName + '\\b[^\\`]*\\}([^\\`]*)\\`\\}'
    const hrefRe = new RegExp(pattern, 'g')

    let hm
    while ((hm = hrefRe.exec(block)) !== null) {
      const prefix = hm[1]
      const suffix = hm[2]

      for (const rawVal of values) {
        let val = rawVal
        // Simulate the most common transforms seen in the codebase
        if (hm[0].includes(".toLowerCase()")) {
          val = val.toLowerCase()
        }
        if (hm[0].includes('.replace(/\\s+/g, "-")') || hm[0].includes(".replace(/\\s+/g, '-')")) {
          val = val.replace(/\s+/g, "-")
        }
        if (hm[0].includes('.replace(/[^a-z]+/g, "-")')) {
          val = val.toLowerCase().replace(/[^a-z]+/g, "-")
        }
        out.push(prefix + val + suffix)
      }
    }
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

// 3. Trade × city pages (canonical registry)
for (const [trade, cities] of Object.entries(TRADE_CITY_PAGES)) {
  for (const city of cities) {
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

// ── test ───────────────────────────────────────────────────────────────────

describe("no dead internal links", () => {
  const files = ROOTS.flatMap(r => {
    try { return walk(r) } catch { return [] }
  }).filter(f => EXT_RE.test(f))

  const unresolved = new Map<string, string[]>() // href -> [files]

  for (const f of files) {
    const content = readFileSync(f, "utf8")

    // Collect all hrefs: literal + resolved templates
    const allHrefs = new Set<string>()
    for (const href of extractLiteralHrefs(content)) allHrefs.add(href)
    for (const href of resolveTemplateHrefs(content)) allHrefs.add(href)

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

      // Check parent route
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
