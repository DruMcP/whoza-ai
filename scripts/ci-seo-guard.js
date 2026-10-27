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
  // Normalise the separator before anything else. On Windows path.join hands back backslashes,
  // so every URL came out as "https://whoza.ai\guide\faq" and no canonical, internal link or
  // inbound-link lookup could ever match — thousands of phantom failures that do not exist on
  // CI. Linux has no backslashes to replace, so this changes nothing where the guard actually
  // gates the deploy; it just makes the same run possible before pushing.
  const relPath = htmlPath
    .replace(/\\/g, "/")
    .replace(OUT_DIR.replace(/\\/g, "/"), "")
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

// 4b. Every BreadcrumbList ListItem has a non-empty item URL
let breadcrumbErrors = 0;

function isBreadcrumbListNode(node) {
  const type = node?.["@type"];
  return type === "BreadcrumbList" || (Array.isArray(type) && type.includes("BreadcrumbList"));
}

function walkJsonLd(node, visit) {
  if (Array.isArray(node)) {
    node.forEach((entry) => walkJsonLd(entry, visit));
    return;
  }
  if (!node || typeof node !== "object") return;
  visit(node);
  Object.values(node).forEach((value) => walkJsonLd(value, visit));
}

for (const [url, data] of pageData) {
  let breadcrumbCount = 0;
  for (let i = 0; i < data.jsonLd.length; i++) {
    let parsed;
    try {
      parsed = JSON.parse(data.jsonLd[i]);
    } catch {
      continue; // parse failures are already reported by Check 4
    }

    walkJsonLd(parsed, (node) => {
      if (!isBreadcrumbListNode(node)) return;
      breadcrumbCount++;
      const elements = node.itemListElement;
      if (!Array.isArray(elements)) {
        fail("4b", url, `BreadcrumbList block ${i + 1} is missing itemListElement`);
        breadcrumbErrors++;
        return;
      }

      elements.forEach((element, index) => {
        const item = element?.item;
        if (typeof item !== "string" || item.trim() === "") {
          fail("4b", url, `BreadcrumbList block ${i + 1} itemListElement[${index}] has no non-empty item`);
          breadcrumbErrors++;
        }
      });
    });
  }
  if (breadcrumbCount > 1) {
    fail("4b", url, `Page emits ${breadcrumbCount} BreadcrumbList nodes — expected exactly 1`);
    breadcrumbErrors++;
  }
}
if (breadcrumbErrors === 0) pass("Check 4b: Every breadcrumb ListItem has a non-empty item URL");

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

// 23. No lowercase→uppercase gluing inside any rendered h1/h2/h3.
// Catches JSX whitespace-collapse concatenation ("ARROW" + "Honest" → "ARROWHonest").
// Legitimate camelCase brand tokens are allow-listed by full-word substring; the
// bug pattern must never be allow-listed.
const HEADING_GLUE_ALLOWLIST = ["WhatsApp", "ChatGPT", "McPherson", "IoT", "ElevenLabs"];
let headingGlueErrors = 0;
for (const [url, data] of pageData) {
  const raw = data.raw || "";
  const blocks = [...raw.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi)];
  blocks.forEach((b, i) => {
    const text = b[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
    if (!/[a-z][A-Z]/.test(text)) return;
    let masked = text;
    for (const ok of HEADING_GLUE_ALLOWLIST) masked = masked.split(ok).join("");
    if (/[a-z][A-Z]/.test(masked)) {
      fail(23, url, `heading #${i + 1} glued lowercase→uppercase: "${text.slice(0, 80)}"`);
      headingGlueErrors++;
    }
  });
}
if (headingGlueErrors === 0) pass("Check 23: No lowercase→uppercase gluing in any h1/h2/h3");

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

// 20. Sitemap integrity: every built sitemap URL has a built page; every URL
// in the DEPLOYED sitemap returns 200 and is not a redirect (live check).
const { execSync } = require("child_process");
const sitemapBodyPath = path.join(OUT_DIR, "sitemap.xml.body");
let sitemapErrors = 0;
if (!fs.existsSync(sitemapBodyPath)) {
  fail(20, "/sitemap.xml", "built sitemap.xml.body missing — cannot verify sitemap integrity");
  sitemapErrors++;
} else {
  const builtUrls = [...fs.readFileSync(sitemapBodyPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  let builtOk = 0;
  for (const u of builtUrls) {
    const p = new URL(u).pathname;
    const candidates =
      p === "/"
        ? [path.join(OUT_DIR, "index.html")]
        : [path.join(OUT_DIR, p + ".html"), path.join(OUT_DIR, p, "index.html")];
    if (candidates.some((c) => fs.existsSync(c))) {
      builtOk++;
    } else {
      fail(20, u, "sitemap URL has no corresponding built HTML page");
      sitemapErrors++;
    }
  }
  try {
    const deployed = execSync("curl -sS --max-time 20 https://whoza.ai/sitemap.xml", { encoding: "utf8" });
    const liveUrls = [...deployed.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    let liveOk = 0;
    for (const u of liveUrls) {
      const status = execSync(`curl -s -o /dev/null --max-time 15 -w "%{http_code}" '${u}'`, { encoding: "utf8" }).trim();
      if (status === "200") {
        liveOk++;
      } else {
        fail(20, u, `deployed sitemap URL returned HTTP ${status} (expected exactly 200 — redirects, 404s and 410s are all fails)`);
        sitemapErrors++;
      }
    }
    if (sitemapErrors === 0)
      pass(`Check 20: Sitemap integrity — ${builtOk}/${builtUrls.length} built URLs have built pages; ${liveOk}/${liveUrls.length} deployed URLs return 200, no redirects`);
  } catch (e) {
    fail(20, "https://whoza.ai/sitemap.xml", `live sitemap check could not run: ${e.message}`);
  }
}

// 21. Two-build sitemap diff: fail on >20 URL delta, warn loudly on 1-20.
// scripts/sitemap-previous.xml is the previous build's snapshot. Intentional
// sitemap changes must update the snapshot in the same commit (same rule as
// redirects for re-slugged posts). Seeded from the 2026-10-24 build.
const SITEMAP_SNAPSHOT = path.join(ROOT, "scripts", "sitemap-previous.xml");
let sitemapDiffErrors = 0;
if (!fs.existsSync(SITEMAP_SNAPSHOT)) {
  fail(21, "scripts/sitemap-previous.xml", "snapshot missing — seed it from the current build's .next/server/app/sitemap.xml.body");
  sitemapDiffErrors++;
} else if (fs.existsSync(sitemapBodyPath)) {
  const prevSet = new Set([...fs.readFileSync(SITEMAP_SNAPSHOT, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const currSet = new Set([...fs.readFileSync(sitemapBodyPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const added = [...currSet].filter((u) => !prevSet.has(u));
  const removed = [...prevSet].filter((u) => !currSet.has(u));
  const delta = added.length + removed.length;
  if (delta > 20) {
    fail(
      21,
      "/sitemap.xml",
      `sitemap URL set changed by ${delta} (added ${added.length}: ${added.slice(0, 5).join(", ")}${added.length > 5 ? " …" : ""}; removed ${removed.length}: ${removed.slice(0, 5).join(", ")}${removed.length > 5 ? " …" : ""}) — over the ±20 runaway threshold. If intentional, update scripts/sitemap-previous.xml in the same commit.`
    );
    sitemapDiffErrors++;
  } else if (delta > 0) {
    // Any non-zero delta fails the build. A warning is not a gate — the
    // 43→16 consolidation and the 21,900-submission incident both began as
    // unnoticed sitemap deltas. Intentional changes (new page, re-slug) must
    // bump scripts/sitemap-previous.xml in the SAME commit, same rule as
    // redirects. delta ≤20 gets the actionable message; >20 is called out
    // as a possible runaway above.
    fail(
      21,
      "/sitemap.xml",
      `sitemap URL set changed by ${delta} (added ${added.length}: ${added.slice(0, 5).join(", ")}; removed ${removed.length}: ${removed.slice(0, 5).join(", ")}) — update scripts/sitemap-previous.xml in the same commit if this change is intentional`
    );
    sitemapDiffErrors++;
  }
  if (sitemapDiffErrors === 0 && delta === 0) pass("Check 21: Two-build sitemap diff — URL set unchanged vs previous build");
}

// 22. IndexNow gate (Task 1 of the 2026-10-24 Bing remediation): the 50/24h
// cap is enforced in code but was not gated in CI. Assert the cap constant is
// ≤ 50 everywhere it is enforced, the key file matches the key constant
// exactly (32 chars, no trailing newline), and INDEXNOW_ENABLED is not
// committed as true in any repo config — it lives in the Netlify UI,
// production context only, so previews and branch deploys never submit.
let indexnowErrors = 0;
try {
  const indexnowCore = require("./indexnow-core.js");
  if (typeof indexnowCore.MAX_URLS_PER_RUN !== "number" || indexnowCore.MAX_URLS_PER_RUN > 50) {
    fail(22, "scripts/indexnow-core.js", `MAX_URLS_PER_RUN=${indexnowCore.MAX_URLS_PER_RUN} exceeds the hard cap of 50 — a refactor must not be able to raise the cap without this build failing`);
    indexnowErrors++;
  }
  if (/^[0-9a-f]{32}$/.test(indexnowCore.INDEXNOW_KEY)) {
    const keyFile = path.join(ROOT, "public", `${indexnowCore.INDEXNOW_KEY}.txt`);
    if (!fs.existsSync(keyFile)) {
      fail(22, `public/${indexnowCore.INDEXNOW_KEY}.txt`, "IndexNow key file missing");
      indexnowErrors++;
    } else if (fs.readFileSync(keyFile, "utf8") !== indexnowCore.INDEXNOW_KEY) {
      fail(22, `public/${indexnowCore.INDEXNOW_KEY}.txt`, "key file body must equal the key exactly (32 hex chars, no trailing newline)");
      indexnowErrors++;
    }
  } else {
    fail(22, "scripts/indexnow-core.js", `INDEXNOW_KEY '${indexnowCore.INDEXNOW_KEY}' is not 32 lowercase hex chars`);
    indexnowErrors++;
  }
  const fnSrc = fs.readFileSync(path.join(ROOT, "netlify", "functions", "deploy-succeeded.js"), "utf8");
  const fnCap = fnSrc.match(/MAX_URLS_PER_RUN\s*=\s*(\d+)/);
  if (!fnCap || Number(fnCap[1]) > 50) {
    fail(22, "netlify/functions/deploy-succeeded.js", "function-level cap missing or > 50 — defence in depth must hold");
    indexnowErrors++;
  }
  const manifestPath = path.join(ROOT, "netlify", "functions", "indexnow-manifest.json");
  if (fs.existsSync(manifestPath)) {
    try {
      const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      if (typeof m.urlCount === "number" && m.urlCount > 50) {
        fail(22, "netlify/functions/indexnow-manifest.json", `committed manifest has urlCount ${m.urlCount} > 50`);
        indexnowErrors++;
      }
    } catch { /* builder rewrites the manifest every build */ }
  }
  // INDEXNOW_ENABLED=true must never appear in a committed config file.
  const configCandidates = ["netlify.toml"];
  for (const f of fs.readdirSync(ROOT)) {
    if (/^\.(env|.*\.env).*/.test(f) || f.endsWith(".toml") || f.endsWith(".yml") || f.endsWith(".yaml")) configCandidates.push(f);
  }
  const wfDir = path.join(ROOT, ".github", "workflows");
  if (fs.existsSync(wfDir)) for (const f of fs.readdirSync(wfDir)) configCandidates.push(path.join(".github", "workflows", f));
  for (const f of [...new Set(configCandidates)]) {
    const fp = path.join(ROOT, f);
    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) continue;
    const src = fs.readFileSync(fp, "utf8");
    if (/INDEXNOW_ENABLED[\s\S]{0,40}?[=:]\s*['"]?true['"]?/i.test(src)) {
      fail(22, f, "INDEXNOW_ENABLED=true is committed — it is production-only via the Netlify UI; previews and branch deploys must never submit");
      indexnowErrors++;
    }
  }
} catch (e) {
  fail(22, "scripts/indexnow-core.js", `IndexNow gate could not run: ${e.message}`);
  indexnowErrors++;
}
if (indexnowErrors === 0)
  pass("Check 22: IndexNow gate — cap ≤50 in builder and function, key file exact-match, no committed non-production enablement");

// ─── Report ───
console.log("\n" + "=".repeat(60));
if (exitCode === 0) {
  console.log("✅ ALL 23 CHECKS PASSED — deploy can proceed");
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
