#!/usr/bin/env node
/**
 * SEO CI Guard — comprehensive post-build crawler
 * Run AFTER `next build` and BEFORE deploy.
 * Exits non-zero on any regression.
 */

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ".next", "server", "app");

let exitCode = 0;
const failures = [];

function fail(check, url, msg) {
  failures.push({ check, url, msg });
  exitCode = 1;
}

function pass(msg) {
  console.log(`✅ ${msg}`);
}

// ─── Config ───
const INTENTIONAL_NOINDEX = ["/whoza-vs-ionos"];
const SKIP_SCHEMA_CHECK = ["/dashboard", "/_not-found"];
const DYNAMIC_PREFIXES = ["/blog/", "/locations/", "/uk/"];
const SKIP_CANONICAL_CHECK = ["/dashboard", "/_not-found"];
const INTENTIONAL_REDIRECTS = ["/research/cost-of-missed-calls-uk-trades-2026", "/tools/lost-jobs-calculator"];
const UTILITY_PAGES = ["/dashboard", "/_not-found", "/how-many-calls-at-once", "/sample-call", "/refer", "/whoza-vs-ionos", "/research/cost-of-missed-calls-uk-trades-2026", "/tools/lost-jobs-calculator"];

// ─── Find all HTML files ───
function findHtmlFiles(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(full, result);
    } else if (entry.name.endsWith(".html")) {
      result.push(full);
    }
  }
  return result;
}

const htmlFiles = findHtmlFiles(OUT_DIR);
if (htmlFiles.length === 0) {
  console.error("❌ No built HTML files found in .next/server/app");
  process.exit(1);
}

console.log(`🔍 Crawling ${htmlFiles.length} built HTML files...\n`);

// ─── Parse all pages ───
const pageData = new Map();
const allInternalLinks = new Map();

for (const htmlPath of htmlFiles) {
  const relPath = htmlPath
    .replace(OUT_DIR, "")
    .replace(/\.html$/, "")
    .replace(/\/page$/, "")
    .replace(/\/index$/, "");
  const urlPath = relPath || "/";
  const fullUrl = "https://whoza.ai" + urlPath;
  const raw = fs.readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(raw);

  const h1s = $("h1")
    .map((_, el) => ({ text: $(el).text().trim(), html: $(el).html() || "" }))
    .get();
  const h2s = $("h2").map((_, el) => $(el).text().trim()).get();
  const title = $("title").text().trim();
  const metaDesc = $('meta[name="description"]').attr("content") || "";
  const metaRobots = $('meta[name="robots"]').attr("content") || "";
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const htmlLang = $("html").attr("lang") || "";
  const hreflangLinks = $("link[hreflang]")
    .map((_, el) => $(el).attr("hreflang"))
    .get();

  const jsonLd = $("script[type='application/ld+json']")
    .map((_, el) => $(el).html())
    .get();

  const imgs = $("img")
    .map((_, el) => ({ src: $(el).attr("src") || "", alt: $(el).attr("alt") }))
    .get();

  const links = $("a[href]")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter(
      (href) =>
        href && (href.startsWith("/") || href.startsWith("https://whoza.ai"))
    );

  const schemaTypes = new Set();
  for (const block of jsonLd) {
    try {
      const data = JSON.parse(block);
      const extractTypes = (obj) => {
        if (Array.isArray(obj)) obj.forEach(extractTypes);
        else if (obj && typeof obj === "object") {
          if (obj["@type"]) {
            const types = Array.isArray(obj["@type"])
              ? obj["@type"]
              : [obj["@type"]];
            types.forEach((t) => schemaTypes.add(t));
          }
          if (obj["@graph"]) extractTypes(obj["@graph"]);
        }
      };
      extractTypes(data);
    } catch {
      /* ignore parse errors here, checked separately */
    }
  }

  pageData.set(fullUrl, {
    urlPath,
    h1s,
    h2s,
    title,
    metaDesc,
    metaDescLength: metaDesc.length,
    metaRobots,
    canonical,
    htmlLang,
    hreflangLinks,
    jsonLd,
    imgs,
    links,
    schemaTypes,
    raw,
  });

  for (const link of links) {
    let target = link;
    if (target.startsWith("https://whoza.ai"))
      target = target.replace("https://whoza.ai", "");
    if (target.includes("#")) target = target.split("#")[0];
    if (target === "") target = "/";
    if (!allInternalLinks.has(target)) allInternalLinks.set(target, []);
    allInternalLinks.get(target).push(fullUrl);
  }
}

// ─── Checks ───

// 2. Canonical matches URL
let canonicalErrors = 0;
for (const [url, data] of pageData) {
  if (!data.canonical) continue;
  if (SKIP_CANONICAL_CHECK.includes(data.urlPath)) continue;
  if (INTENTIONAL_REDIRECTS.includes(data.urlPath)) continue;
  if (data.urlPath.startsWith("/trade/")) continue;
  // Normalize trailing slash for comparison
  const normCanonical = data.canonical.replace(/\/$/, "");
  const normUrl = url.replace(/\/$/, "");
  if (normCanonical !== normUrl) {
    fail(2, url, `canonical "${data.canonical}" !== URL "${url}"`);
    canonicalErrors++;
  }
}
if (canonicalErrors === 0) pass("Check 2: All canonicals match their URL");

// 3. No unexpected noindex
let noindexErrors = 0;
for (const [url, data] of pageData) {
  if (INTENTIONAL_NOINDEX.includes(data.urlPath)) continue;
  if (SKIP_CANONICAL_CHECK.includes(data.urlPath)) continue;
  if (data.metaRobots.toLowerCase().includes("noindex")) {
    fail(3, url, `meta robots contains "noindex": "${data.metaRobots}"`);
    noindexErrors++;
  }
}
if (noindexErrors === 0) pass("Check 3: No unexpected meta robots noindex");

// 4. JSON-LD parseable
let jsonLdErrors = 0;
for (const [url, data] of pageData) {
  for (let i = 0; i < data.jsonLd.length; i++) {
    try {
      JSON.parse(data.jsonLd[i]);
    } catch {
      fail(4, url, `JSON-LD block ${i + 1} fails parse`);
      jsonLdErrors++;
    }
  }
}
if (jsonLdErrors === 0) pass("Check 4: All JSON-LD blocks are valid JSON");

// 5+6. Internal links resolve
let linkErrors = 0;
for (const [url, data] of pageData) {
  for (const link of data.links) {
    let targetPath = link;
    if (targetPath.startsWith("https://whoza.ai"))
      targetPath = targetPath.replace("https://whoza.ai", "");
    if (targetPath.includes("#")) targetPath = targetPath.split("#")[0];
    if (targetPath === "") targetPath = "/";
    // Skip query-param links to homepage
    if (targetPath.startsWith("/?")) continue;
    if (targetPath.match(/\.(pdf|png|jpg|jpeg|webp|svg|css|js)$/)) continue;
    const isDynamic =
      DYNAMIC_PREFIXES.some((p) => targetPath.startsWith(p)) ||
      targetPath.includes("[");
    if (isDynamic) continue;
    const targetUrl = "https://whoza.ai" + targetPath;
    if (!pageData.has(targetUrl) && !pageData.has(targetUrl + "/")) {
      fail(5, url, `Internal link to "${link}" does not resolve`);
      linkErrors++;
    }
  }
}
if (linkErrors === 0) pass("Check 5+6: All internal links resolve");

// 7. Orphans
let orphanErrors = 0;
for (const [url, data] of pageData) {
  if (data.urlPath.startsWith("/_")) continue;
  if (data.urlPath.startsWith("/trade/")) continue;
  if (data.urlPath === "/") continue;
  if (UTILITY_PAGES.some((p) => data.urlPath.startsWith(p))) continue;
  const inbound =
    allInternalLinks.get(data.urlPath) ||
    allInternalLinks.get(data.urlPath + "/") ||
    [];
  if (inbound.length === 0) {
    fail(7, url, `zero inbound internal links (orphan)`);
    orphanErrors++;
  }
}
if (orphanErrors === 0) pass("Check 7: No orphan pages");

// 8. h1 count === 1
let h1CountErrors = 0;
for (const [url, data] of pageData) {
  if (data.h1s.length !== 1) {
    fail(8, url, `h1 count = ${data.h1s.length} (expected 1)`);
    h1CountErrors++;
  }
}
if (h1CountErrors === 0) pass("Check 8: Every page has exactly 1 h1");

// 9. Glued H1 tokens
let gluedErrors = 0;
for (const [url, data] of pageData) {
  for (const h1 of data.h1s) {
    const inner = h1.html;
    if (
      inner.match(/[a-z]<\/span>\s*[A-Z£]/) ||
      inner.match(/[a-z]<br\/?>\s*[A-Z£]/)
    ) {
      fail(9, url, `glued H1 token: "${h1.text}"`);
      gluedErrors++;
    }
  }
}
if (gluedErrors === 0) pass("Check 9: No glued H1 tokens");

// 10. Duplicate H2s
let dupH2Errors = 0;
for (const [url, data] of pageData) {
  const seen = new Set();
  for (const h2 of data.h2s) {
    const lower = h2.toLowerCase().trim();
    if (seen.has(lower) && lower.length > 0) {
      fail(10, url, `duplicate H2: "${h2}"`);
      dupH2Errors++;
      break;
    }
    seen.add(lower);
  }
}
if (dupH2Errors === 0) pass("Check 10: No duplicate H2s");

// 11. Title ≤60
let titleErrors = 0;
for (const [url, data] of pageData) {
  if (data.title.length > 60) {
    fail(11, url, `title = ${data.title.length} chars`);
    titleErrors++;
  }
}
if (titleErrors === 0) pass("Check 11: All titles ≤60 chars");

// 12. Meta description 70-160
let descErrors = 0;
for (const [url, data] of pageData) {
  if (data.metaDescLength === 0) {
    fail(12, url, `missing meta description`);
    descErrors++;
  } else if (data.metaDescLength > 160 || data.metaDescLength < 70) {
    fail(12, url, `meta description = ${data.metaDescLength} chars`);
    descErrors++;
  }
}
if (descErrors === 0) pass("Check 12: All meta descriptions 70-160 chars");

// 13. Alt attributes
let altErrors = 0;
for (const [url, data] of pageData) {
  for (const img of data.imgs) {
    if (!img.alt && !img.src.includes("data:") && img.src) {
      fail(13, url, `<img> without alt (src: ${img.src})`);
      altErrors++;
    }
  }
}
if (altErrors === 0) pass("Check 13: All images have alt attributes");

// 14. Required schemas
let schemaErrors = 0;
const requiredSchemas = ["BreadcrumbList", "Organization", "WebSite"];
for (const [url, data] of pageData) {
  if (SKIP_SCHEMA_CHECK.some((p) => url.includes(p))) continue;
  for (const schema of requiredSchemas) {
    if (!data.schemaTypes.has(schema)) {
      fail(14, url, `missing ${schema} schema`);
      schemaErrors++;
    }
  }
}
if (schemaErrors === 0)
  pass("Check 14: All pages have BreadcrumbList, Organization, WebSite");

// 15. No hreflang
let hreflangErrors = 0;
for (const [url, data] of pageData) {
  if (data.hreflangLinks.length > 0) {
    fail(15, url, `has hreflang: ${data.hreflangLinks.join(", ")}`);
    hreflangErrors++;
  }
}
if (hreflangErrors === 0) pass("Check 15: No pages declare hreflang");

// 16. lang=en-GB
let langErrors = 0;
for (const [url, data] of pageData) {
  if (data.htmlLang !== "en-GB") {
    fail(16, url, `html lang = "${data.htmlLang}" (expected "en-GB")`);
    langErrors++;
  }
}
if (langErrors === 0) pass("Check 16: All pages have lang=en-GB");

// 17. Customer count
let customerCountErrors = 0;
for (const [url, data] of pageData) {
  const text = data.raw.toLowerCase();
  if (
    text.includes("hundreds of uk tradespeople") ||
    text.includes("hundreds of tradespeople")
  ) {
    fail(17, url, `customer count "hundreds" inconsistent with cap`);
    customerCountErrors++;
  }
}
if (customerCountErrors === 0) pass("Check 17: No customer count contradictions");

// 18. Comparison content
let compErrors = 0;
const badTerms = ["loss leader", "pricing trick"];
for (const [url, data] of pageData) {
  if (!url.includes("/whoza-vs-")) continue;
  const text = data.raw.toLowerCase();
  for (const term of badTerms) {
    if (text.includes(term)) {
      fail(18, url, `comparison page contains prohibited term: "${term}"`);
      compErrors++;
    }
  }
}
if (compErrors === 0) pass("Check 18: No comparison page violations");

// 19. Customer Stories disclosure
let disclosureErrors = 0;
for (const [url, data] of pageData) {
  if (!data.urlPath.match(/\/blog\/[^\/]+$/)) continue;
  let isCustomerStory = false;
  for (const block of data.jsonLd) {
    try {
      const parsed = JSON.parse(block);
      const str = JSON.stringify(parsed);
      if (
        str.includes("Customer Stories") ||
        str.includes('"articleSection":"Customer Stories"')
      ) {
        isCustomerStory = true;
        break;
      }
    } catch {
      /* skip */
    }
  }
  if (!isCustomerStory) continue;
  if (!data.raw.includes("About this story")) {
    fail(19, url, `Customer Stories missing "About this story" disclosure`);
    disclosureErrors++;
  }
}
if (disclosureErrors === 0) pass("Check 19: All Customer Stories have disclosure");

// ─── Report ───
console.log("\n" + "=".repeat(60));
if (exitCode === 0) {
  console.log("✅ ALL 19 CHECKS PASSED — deploy can proceed");
} else {
  console.log(`❌ ${failures.length} FAILURE(S) — deploy blocked`);
  console.log("\nFailure breakdown by check:");
  const byCheck = {};
  for (const f of failures) {
    if (!byCheck[f.check]) byCheck[f.check] = [];
    byCheck[f.check].push(f);
  }
  for (const [check, items] of Object.entries(byCheck).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  )) {
    console.log(`\n  Check ${check}: ${items.length} failure(s)`);
    for (const item of items) {
      console.log(`    • ${item.url}`);
      console.log(`      ${item.msg}`);
    }
  }
}
console.log("=".repeat(60));
process.exit(exitCode);
