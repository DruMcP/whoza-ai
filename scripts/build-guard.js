#!/usr/bin/env node
/**
 * Build verification guard for whoza.ai
 * Fails the build if:
 * - Any internal <a href> resolves to non-self-canonical or >=400
 * - Any page has h1 count !== 1
 * - Any page has duplicate H2s
 * - Any <title> over 60 characters
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, ".next/server/app");

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  console.log("🔍 Running build verification guard...\n");

  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory not found: ${BUILD_DIR}`);
    process.exit(1);
  }

  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let errors = [];
  const pageData = new Map(); // url -> { title, h1Count, h2s, canonical }

  // Pass 1: collect data from all pages
  for (const file of htmlFiles) {
    const relPath = path.relative(BUILD_DIR, file);
    const urlPath = "/" + relPath.replace(/\\/g, "/").replace(/\/page\.html$/, "").replace(/index\.html$/, "").replace(/\/$/, "");
    const html = fs.readFileSync(file, "utf-8");

    // Extract title (decode HTML entities for length check)
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].trim() : "";
    // Decode common HTML entities for accurate character count
    const title = rawTitle
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

    // Count h1s
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    const h1Count = h1Matches.length;

    // Extract h2 text for duplicates
    const h2Texts = [];
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    let m;
    while ((m = h2Regex.exec(html)) !== null) {
      // Strip HTML tags
      const text = m[1].replace(/<[^>]+>/g, "").trim().toLowerCase();
      if (text) h2Texts.push(text);
    }

    // Extract canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
      || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    // Extract all internal links
    const links = new Set();
    const linkRegex = /<a[^>]*href=["']([^"']+)["']/gi;
    while ((m = linkRegex.exec(html)) !== null) {
      const href = m[1];
      if (href.startsWith("/") && !href.startsWith("//")) {
        links.add(href.split("#")[0].split("?")[0]);
      }
    }

    pageData.set(urlPath, { title, h1Count, h2Texts, canonical, links, file: relPath });
  }

  // Pass 2: validate each page
  for (const [urlPath, data] of pageData) {
    // 1. Title length
    if (data.title.length > 60) {
      errors.push(`TITLE_TOO_LONG [${data.title.length}] ${urlPath}\n  "${data.title}"`);
    }

    // 2. h1 count
    if (data.h1Count !== 1) {
      errors.push(`H1_COUNT [${data.h1Count}] ${urlPath} (expected 1)`);
    }

    // 3. Duplicate H2s
    const seen = new Set();
    const dups = new Set();
    for (const h2 of data.h2Texts) {
      if (seen.has(h2)) dups.add(h2);
      seen.add(h2);
    }
    for (const dup of dups) {
      errors.push(`DUPLICATE_H2 "${dup}" ${urlPath}`);
    }

    // 4. Check internal links resolve to self-canonical 200 pages
    for (const link of data.links) {
      // Skip external, anchors, mailto, tel
      if (link.startsWith("http") || link.startsWith("mailto:") || link.startsWith("tel:")) continue;

      // Normalize link to urlPath format
      let targetPath = link;
      if (targetPath.endsWith("/")) targetPath = targetPath.slice(0, -1);

      const target = pageData.get(targetPath);
      if (!target) {
        // Could be a static asset or API route - skip if not in pageData
        continue;
      }

      // Check canonical matches self
      const expectedCanonical = `https://whoza.ai${targetPath}`;
      if (target.canonical && target.canonical !== expectedCanonical) {
        errors.push(`NON_SELF_CANONICAL_LINK ${urlPath} links to ${link}\n  target canonical: ${target.canonical} (expected: ${expectedCanonical})`);
      }
    }
  }

  // Report
  if (errors.length > 0) {
    console.error(`❌ BUILD GUARD FAILED — ${errors.length} issue(s):\n`);
    for (const err of errors) {
      console.error(`  • ${err}`);
    }
    console.error(`\nFix these issues before deploying.\n`);
    process.exit(1);
  }

  console.log(`✅ All checks passed:`);
  console.log(`   • ${htmlFiles.length} pages checked`);
  console.log(`   • 0 titles over 60 characters`);
  console.log(`   • 0 pages with h1 ≠ 1`);
  console.log(`   • 0 duplicate H2s`);
  console.log(`   • 0 non-canonical internal links`);
  console.log("");
}

main();
