#!/usr/bin/env node
/**
 * Post-deploy maintenance for the committed IndexNow store (.indexnow-store.json).
 *
 * The store is the source of truth for the change-gated manifest builder
 * (scripts/build-indexnow-manifest.js). Production reads it via the
 * INDEXNOW_STORE_PATH=.indexnow-store.json env var (Netlify UI, production
 * context only). Netlify builds cannot commit back to the repo, so after any
 * production deploy in which IndexNow actually submitted URLs, run this
 * script and commit the result.
 *
 * Usage:
 *   node scripts/update-indexnow-store.js --all
 *       Refresh content hashes for every sitemap URL from the current local
 *       build (.next/server/app). Preserves each URL's lastSubmittedAt.
 *       Run once after the FIRST IndexNow-enabled deploy, and after any
 *       deploy where the builder submitted URLs.
 *
 *   node scripts/update-indexnow-store.js --submitted /pricing,/
 *       Stamp lastSubmittedAt=now (and refresh hashes) for the given paths —
 *       the URLs the just-finished production run actually submitted.
 *
 * Prerequisite: a deterministic build (generateBuildId in next.config.mjs),
 * so hashes computed locally match what Netlify builds at the same commit.
 */
const fs = require('fs')
const path = require('path')
const { hashForRoute, MAX_URLS_PER_RUN, DAY_MS } = require('./indexnow-core')

const ROOT = path.resolve(__dirname, '..')
const STORE_PATH = path.join(ROOT, '.indexnow-store.json')
const SITEMAP_CANDIDATES = [
  path.join(ROOT, 'public', 'sitemap.xml'),
  path.join(ROOT, '.next', 'server', 'app', 'sitemap.xml.body'),
]

function readSitemapUrls() {
  for (const p of SITEMAP_CANDIDATES) {
    if (fs.existsSync(p)) {
      const body = fs.readFileSync(p, 'utf8')
      return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    }
  }
  console.error('[store] no sitemap found — run after a build')
  process.exit(1)
}

function main() {
  const args = process.argv.slice(2)
  const submittedIdx = args.indexOf('--submitted')
  const submitted =
    submittedIdx !== -1 && args[submittedIdx + 1]
      ? args[submittedIdx + 1].split(',').map((p) => p.trim()).filter(Boolean)
      : null
  const all = args.includes('--all')

  if (!all && !submitted) {
    console.error('Usage: node scripts/update-indexnow-store.js --all | --submitted /path,/path2')
    process.exit(1)
  }

  const store = fs.existsSync(STORE_PATH)
    ? JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'))
    : { version: 1, urls: {} }
  store.urls = store.urls || {}

  const urls = readSitemapUrls()
  const now = Date.now()
  let refreshed = 0
  let stamped = 0
  let missing = []

  for (const url of urls) {
    const pathname = new URL(url).pathname
    const hash = hashForRoute(pathname)
    if (!hash) { missing.push(url); continue }
    const entry = store.urls[url] || { hash: '', lastSubmittedAt: 0 }
    entry.hash = hash
    if (submitted && submitted.includes(pathname)) {
      entry.lastSubmittedAt = now
      stamped++
    }
    store.urls[url] = entry
    refreshed++
  }

  // Sort for stable diffs
  const sorted = {}
  for (const k of Object.keys(store.urls).sort()) sorted[k] = store.urls[k]
  store.urls = sorted

  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2) + '\n')
  console.log(`[store] ${refreshed} URLs hashed from current build (${missing.length} without built HTML: ${missing.slice(0, 5).join(', ') || 'none'})`)
  if (submitted) console.log(`[store] stamped lastSubmittedAt for ${stamped}/${submitted.length} submitted paths`)
  console.log(`[store] wrote ${path.relative(ROOT, STORE_PATH)} — commit this file`)
  console.log(`[store] reminder: cap ${MAX_URLS_PER_RUN}/24h, ${DAY_MS / 86400000}-day resubmit floor`)
}

main()
