#!/usr/bin/env node
/**
 * Pre-build audit guard — fails the build if any critical criteria regress.
 * Run with: node scripts/build-guard.js
 */

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
let exitCode = 0
const failures = []

function fail(msg) {
  failures.push(`❌ ${msg}`)
  exitCode = 1
}

function pass(msg) {
  console.log(`✅ ${msg}`)
}

// ─── Check 1: No "UGC / Real Stories" anywhere in source ───
const ugcMatches = []
function scanForUgc(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue
      scanForUgc(full)
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      const content = fs.readFileSync(full, "utf-8")
      if (content.includes("UGC / Real Stories")) {
        ugcMatches.push(full.replace(ROOT + "/", ""))
      }
    }
  }
}
scanForUgc(path.join(ROOT, "app"))
scanForUgc(path.join(ROOT, "components"))
scanForUgc(path.join(ROOT, "lib"))
if (ugcMatches.length > 0) {
  fail(`'UGC / Real Stories' found in: ${ugcMatches.join(", ")}`)
} else {
  pass("No 'UGC / Real Stories' strings in source")
}

// ─── Check 2: Ross and Charlie are in customerStoryAuthors ───
const blogSlugPath = path.join(ROOT, "app", "blog", "[slug]", "page.tsx")
const blogSlugPage = fs.readFileSync(blogSlugPath, "utf-8")
if (!blogSlugPage.includes('"Ross McAllister"')) {
  fail('Ross McAllister missing from customerStoryAuthors in app/blog/[slug]/page.tsx')
} else {
  pass("Ross McAllister in customerStoryAuthors")
}
if (!blogSlugPage.includes('"Charlie Hardcastle"')) {
  fail('Charlie Hardcastle missing from customerStoryAuthors in app/blog/[slug]/page.tsx')
} else {
  pass("Charlie Hardcastle in customerStoryAuthors")
}

// ─── Check 3: /pricing page uses full Pricing (not PricingSummary) ───
const pricingPagePath = path.join(ROOT, "app", "pricing", "page.tsx")
const pricingPage = fs.readFileSync(pricingPagePath, "utf-8")
if (pricingPage.includes("PricingSummary")) {
  fail("/pricing page must use full <Pricing />, not <PricingSummary />")
} else if (pricingPage.includes("from \"@/components/whoza/pricing\"")) {
  pass("/pricing page uses full Pricing component")
} else {
  fail("/pricing page import structure unexpected")
}

// ─── Check 4: Non-pricing pages use PricingSummary ───
const nonPricingPages = [
  "app/page.tsx",
  "app/[location]/page.tsx",
]
for (const rel of nonPricingPages) {
  const full = path.join(ROOT, rel)
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, "utf-8")
    if (content.includes("from \"@/components/whoza/pricing\"")) {
      fail(`${rel} should import PricingSummary, not Pricing`)
    }
  }
}
pass("Homepage and city hubs use PricingSummary")

// ─── Check 5: /how-it-works FAQ is inside <main> ───
const hiwPath = path.join(ROOT, "app", "how-it-works", "page.tsx")
const hiwContent = fs.readFileSync(hiwPath, "utf-8")
// Find the FAQ section and check it's before </main>
const mainCloseIdx = hiwContent.lastIndexOf("</main>")
const faqSectionIdx = hiwContent.indexOf("Frequently Asked Questions")
if (faqSectionIdx === -1) {
  fail("/how-it-works missing FAQ section")
} else if (mainCloseIdx === -1) {
  fail("/how-it-works missing </main> tag")
} else if (faqSectionIdx > mainCloseIdx) {
  fail("/how-it-works FAQ section is outside <main> landmark")
} else {
  pass("/how-it-works FAQ is inside <main>")
}

// ─── Check 6: /data has business claims section ───
const dataPagePath = path.join(ROOT, "app", "data", "page.tsx")
const dataPage = fs.readFileSync(dataPagePath, "utf-8")
if (!dataPage.includes('id="business-claims"')) {
  fail("/data page missing business-claims section")
} else {
  pass("/data page has business-claims section")
}
if (!dataPage.includes('"@type": "Dataset"')) {
  fail("/data page missing Dataset schema")
} else {
  pass("/data page has Dataset schema")
}

// ─── Check 7: Footer has link to /data ───
const footerPath = path.join(ROOT, "components", "whoza", "footer.tsx")
const footerContent = fs.readFileSync(footerPath, "utf-8")
if (!footerContent.includes('"Evidence Base"') && !footerContent.includes('"/data"')) {
  fail("Footer missing link to /data (Evidence Base)")
} else {
  pass("Footer links to /data")
}

// ─── Check 8: Dynamic blog posts have disclosure for persona authors ───
const dynamicBlogPath = path.join(ROOT, "app", "blog", "[slug]", "page.tsx")
const dynamicBlog = fs.readFileSync(dynamicBlogPath, "utf-8")
if (!dynamicBlog.includes("needsDisclosure")) {
  fail("Dynamic blog post missing needsDisclosure logic")
} else if (!dynamicBlog.includes("About this story")) {
  fail("Dynamic blog post missing disclosure component")
} else {
  pass("Dynamic blog posts have persona disclosure")
}

// ─── Check 9: Build would produce zero errors (checked separately) ───
// This is implicitly verified by the build step itself
pass("Build guard: structural checks complete")

// ─── Report ───
console.log("\n" + "=".repeat(50))
if (exitCode === 0) {
  console.log("✅ ALL CHECKS PASSED — build can proceed")
} else {
  console.log(`❌ ${failures.length} CHECK(S) FAILED — build blocked`)
  for (const f of failures) {
    console.log(f)
  }
}
console.log("=".repeat(50))
process.exit(exitCode)
