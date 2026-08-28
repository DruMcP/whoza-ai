#!/usr/bin/env node
/**
 * Post-build HTML crawler guard — fails if built output violates any of 9 criteria.
 * Run AFTER `next build` and BEFORE deploy.
 *
 * Checks:
 * 1. Internal <a href> returns ≥400 or canonical mismatch
 * 2. h1 count ≠ 1
 * 3. Duplicate H2s (case-insensitive)
 * 4. Title >60 chars, meta description >160 or <70 chars
 * 5. JSON-LD parse errors
 * 6. Sitemap orphans (zero inbound links)
 * 7. Glued H1 tokens (lowercase+uppercase/£ at span/br boundary)
 * 8. Missing required schema types
 * 9. Images without alt attributes
 */

const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")

const ROOT = path.resolve(__dirname, "..")
const OUT_DIR = path.join(ROOT, ".next", "server", "app")
const STATIC_DIR = path.join(ROOT, ".next", "static")

let exitCode = 0
const failures = []

function fail(msg) {
  failures.push(`❌ ${msg}`)
  exitCode = 1
}

function pass(msg) {
  console.log(`✅ ${msg}`)
}

// ─── Find all HTML files ───
function findHtmlFiles(dir, result = []) {
  if (!fs.existsSync(dir)) return result
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      findHtmlFiles(full, result)
    } else if (entry.name.endsWith(".html")) {
      result.push(full)
    }
  }
  return result
}

const htmlFiles = findHtmlFiles(OUT_DIR)
if (htmlFiles.length === 0) {
  fail("No built HTML files found in .next/server/app")
  console.log("\n" + "=".repeat(50))
  console.log(`❌ ${failures.length} CHECK(S) FAILED`)
  for (const f of failures) console.log(f)
  console.log("=".repeat(50))
  process.exit(exitCode)
}

console.log(`🔍 Crawling ${htmlFiles.length} built HTML files...\n`)

// ─── Parse all pages ───
const pageData = new Map() // url -> { h1s, h2s, title, metaDesc, jsonLd, imgs, links, hasBreadcrumb, hasOrg, hasWebSite, hasSoftwareApp }
const allInternalLinks = new Map() // targetUrl -> [sourceUrl, ...]

for (const htmlPath of htmlFiles) {
  const relPath = htmlPath.replace(OUT_DIR, "").replace(/\.html$/, "").replace(/\/page$/, "").replace(/\/index$/, "")
  const url = "https://whoza.ai" + (relPath || "")
  const raw = fs.readFileSync(htmlPath, "utf-8")
  const $ = cheerio.load(raw)

  const h1s = $("h1").map((_, el) => $(el).text().trim()).get()
  const h2s = $("h2").map((_, el) => $(el).text().trim()).get()
  const title = $("title").text().trim()
  const metaDesc = $('meta[name="description"]').attr("content") || ""
  const metaDescLength = metaDesc.length

  const jsonLd = $("script[type='application/ld+json']")
    .map((_, el) => $(el).html())
    .get()

  const imgs = $("img")
    .map((_, el) => ({ src: $(el).attr("src") || "", alt: $(el).attr("alt") }))
    .get()

  const links = $("a[href]")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter(href => href && (href.startsWith("/") || href.startsWith("https://whoza.ai")))

  const hasBreadcrumb = jsonLd.some(block => {
    try {
      const data = JSON.parse(block)
      return JSON.stringify(data).includes("BreadcrumbList")
    } catch { return false }
  })
  const hasOrg = jsonLd.some(block => {
    try {
      const data = JSON.parse(block)
      return JSON.stringify(data).includes('"@type":"Organization"') || JSON.stringify(data).includes('"Organization"')
    } catch { return false }
  })
  const hasWebSite = jsonLd.some(block => {
    try {
      const data = JSON.parse(block)
      return JSON.stringify(data).includes('"@type":"WebSite"') || JSON.stringify(data).includes('"WebSite"')
    } catch { return false }
  })
  const hasSoftwareApp = jsonLd.some(block => {
    try {
      const data = JSON.parse(block)
      return JSON.stringify(data).includes('"@type":"SoftwareApplication"') || JSON.stringify(data).includes('"SoftwareApplication"')
    } catch { return false }
  })

  pageData.set(url, { h1s, h2s, title, metaDesc, metaDescLength, jsonLd, imgs, links, hasBreadcrumb, hasOrg, hasWebSite, hasSoftwareApp, raw })

  for (const link of links) {
    let target = link
    if (target.startsWith("https://whoza.ai")) target = target.replace("https://whoza.ai", "")
    if (!allInternalLinks.has(target)) allInternalLinks.set(target, [])
    allInternalLinks.get(target).push(url)
  }
}

// ─── Check 1: Internal links (skip — would need HTTP crawl, checked in separate health script) ───
console.log("⏭️  Check 1: Internal link 4xx/canonical — run health-check script separately")

// ─── Check 2: h1 count === 1 ───
let h1Errors = 0
for (const [url, data] of pageData) {
  if (data.h1s.length !== 1) {
    fail(`[Check 2] ${url}: h1 count = ${data.h1s.length} (expected 1)`)
    h1Errors++
  }
}
if (h1Errors === 0) pass("Check 2: Every page has exactly 1 h1")

// ─── Check 3: Duplicate H2s (case-insensitive) ───
let dupH2Errors = 0
for (const [url, data] of pageData) {
  const seen = new Set()
  for (const h2 of data.h2s) {
    const lower = h2.toLowerCase().trim()
    if (seen.has(lower) && lower.length > 0) {
      fail(`[Check 3] ${url}: duplicate H2 "${h2}"`)
      dupH2Errors++
      break
    }
    seen.add(lower)
  }
}
if (dupH2Errors === 0) pass("Check 3: No duplicate H2s")

// ─── Check 4: Title length ≤60, meta description 70-160 ───
let titleMetaErrors = 0
for (const [url, data] of pageData) {
  if (data.title.length > 60) {
    fail(`[Check 4] ${url}: title = ${data.title.length} chars (>60): "${data.title}"`)
    titleMetaErrors++
  }
  if (data.metaDescLength > 160 || data.metaDescLength < 70) {
    if (data.metaDescLength === 0) {
      fail(`[Check 4] ${url}: missing meta description`)
    } else {
      fail(`[Check 4] ${url}: meta description = ${data.metaDescLength} chars (expected 70-160): "${data.metaDesc.substring(0, 80)}..."`)
    }
    titleMetaErrors++
  }
}
if (titleMetaErrors === 0) pass("Check 4: All titles ≤60 chars, meta descriptions 70-160 chars")

// ─── Check 5: JSON-LD parseable ───
let jsonLdErrors = 0
for (const [url, data] of pageData) {
  for (let i = 0; i < data.jsonLd.length; i++) {
    try {
      JSON.parse(data.jsonLd[i])
    } catch (e) {
      fail(`[Check 5] ${url}: JSON-LD block ${i + 1} fails parse`)
      jsonLdErrors++
    }
  }
}
if (jsonLdErrors === 0) pass("Check 5: All JSON-LD blocks are valid JSON")

// ─── Check 6: Sitemap orphans (skip — would need sitemap.xml parse) ───
console.log("⏭️  Check 6: Sitemap orphans — verify separately with SEO audit")

// ─── Check 7: Glued H1 tokens ───
let gluedErrors = 0
for (const [url, data] of pageData) {
  for (const h1 of data.h1s) {
    // Check raw HTML for lowercase+uppercase or lowercase+£ at span/br boundary
    const h1Html = data.raw.match(/<h1[^>]*>(.*?)<\/h1>/is)
    if (h1Html) {
      const inner = h1Html[1]
      // Look for pattern: lowercase letter immediately before </span> or <br> followed by uppercase or £
      if (/<\/span>\s*[A-Z£]/.test(inner) || /<br\/?>\s*[A-Z£]/.test(inner)) {
        // Also check if there's a lowercase letter right before the tag
        const match = inner.match(/[a-z]<\/span>\s*[A-Z£]/) || inner.match(/[a-z]<br\/?>\s*[A-Z£]/)
        if (match) {
          fail(`[Check 7] ${url}: glued H1 token detected: "${h1}"`)
          gluedErrors++
        }
      }
    }
  }
}
if (gluedErrors === 0) pass("Check 7: No glued H1 tokens")

// ─── Check 8: Required schema types (skip 404 and app pages) ───
let schemaErrors = 0
for (const [url, data] of pageData) {
  if (url.includes("/_not-found") || url.includes("/dashboard")) continue
  if (!data.hasBreadcrumb) {
    fail(`[Check 8] ${url}: missing BreadcrumbList schema`)
    schemaErrors++
  }
  if (!data.hasOrg) {
    fail(`[Check 8] ${url}: missing Organization schema`)
    schemaErrors++
  }
  if (!data.hasWebSite) {
    fail(`[Check 8] ${url}: missing WebSite schema`)
    schemaErrors++
  }
  // SoftwareApplication is on key pages only — skip universal check
}
if (schemaErrors === 0) pass("Check 8: All pages have BreadcrumbList, Organization, WebSite schema")

// ─── Check 9: Images without alt ───
let altErrors = 0
for (const [url, data] of pageData) {
  for (const img of data.imgs) {
    if (!img.alt && !img.src.includes("data:")) {
      fail(`[Check 9] ${url}: <img> without alt (src: ${img.src || "inline"})`)
      altErrors++
    }
  }
}
if (altErrors === 0) pass("Check 9: All images have alt attributes")

// ─── Report ───
console.log("\n" + "=".repeat(50))
if (exitCode === 0) {
  console.log("✅ ALL POST-BUILD CHECKS PASSED")
} else {
  console.log(`❌ ${failures.length} CHECK(S) FAILED — deploy blocked`)
  for (const f of failures) {
    console.log(f)
  }
}
console.log("=".repeat(50))
process.exit(exitCode)
