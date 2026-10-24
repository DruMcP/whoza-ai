/**
 * Build-time script: change-gated IndexNow manifest builder.
 *
 * Policy (see scripts/indexnow-core.js):
 *   - Submit only when a URL's content hash changed since its last submission.
 *   - Never resubmit within 30 days.
 *   - Hard ceiling 50 URLs per run — exceeding it aborts (nothing queued).
 *   - Only URLs present in sitemap.xml AND returning HTTP 200 are submitted.
 *   - Every batch is logged with a count and triggering reason.
 *
 * DISABLED BY DEFAULT. Requires INDEXNOW_ENABLED=true (set in Netlify UI only,
 * ENABLED 2026-10-24. INDEXNOW_ENABLED=true is set via the Netlify UI,
 * production context only (never committed). Fresh key issued 2026-10-24.
 *
 * Persisted store: JSON at the first writable location of
 *   1. $INDEXNOW_STORE_PATH          (explicit override)
 *   2. /opt/build/cache/...          (Netlify persistent build cache)
 *   3. node_modules/.cache/...       (Netlify-cached)
 *   4. .indexnow-store.json          (local dev fallback, gitignored)
 *
 * Usage: node scripts/build-indexnow-manifest.js
 */

const { writeFileSync, mkdirSync, readFileSync, existsSync } = require('fs')
const { createHash } = require('crypto')
const { dirname, join } = require('path')
const { selectUrls, applySubmission, MAX_URLS_PER_RUN, hashForRoute } = require('./indexnow-core')

const BASE_URL = 'https://whoza.ai'
const MANIFEST_PATH = 'netlify/functions/indexnow-manifest.json'
const SITEMAP_PATH = 'public/sitemap.xml'
const STORE_NAME = 'indexnow-store.json'

function storeCandidates() {
  const list = []
  if (process.env.INDEXNOW_STORE_PATH) list.push(process.env.INDEXNOW_STORE_PATH)
  list.push(`/opt/build/cache/${STORE_NAME}`)
  list.push(join('node_modules', '.cache', STORE_NAME))
  list.push(join('.indexnow-store.json'))
  return list
}

function readStore() {
  for (const p of storeCandidates()) {
    if (existsSync(p)) {
      try {
        return { store: JSON.parse(readFileSync(p, 'utf8')), path: p }
      } catch {
        // try next candidate
      }
    }
  }
  return { store: { urls: {} }, path: storeCandidates()[0] }
}

function writeStore(path, store) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(store, null, 2))
}

const SITEMAP_CANDIDATES = [
  join('.next', 'server', 'app', 'sitemap.xml.body'), // this build's sitemap
  SITEMAP_PATH, // committed copy if present
]

function getSitemapUrls() {
  let xml = null
  for (const p of SITEMAP_CANDIDATES) {
    if (existsSync(p)) {
      xml = readFileSync(p, 'utf8')
      break
    }
  }
  if (xml === null) {
    // Fall back to the currently deployed sitemap
    return fetch(`${BASE_URL}/sitemap.xml`)
      .then((r) => (r.ok ? r.text() : ''))
      .then(parseSitemapUrls)
  }
  return Promise.resolve(parseSitemapUrls(xml))
}

function parseSitemapUrls(xml) {
  const urls = []
  for (const match of String(xml).matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1].trim()
    if (loc.startsWith(`${BASE_URL}/`) || loc === BASE_URL) {
      urls.push(loc)
    }
  }
  return urls.sort()
}

async function verify200(url) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'manual' })
    return res.status === 200 && !(await res.text()).includes('noindex')
  } catch {
    return false
  }
}

async function buildManifest() {
  const enabled = process.env.INDEXNOW_ENABLED === 'true'
  const empty = { generatedAt: new Date().toISOString(), source: 'disabled', urlCount: 0, urls: [], capped: false }

  if (!enabled) {
    console.log('[indexnow] DISABLED (INDEXNOW_ENABLED !== true) — writing empty manifest. Production-only env var is unset in this context; previews and branch deploys must never submit.')
    writeFileSync(MANIFEST_PATH, JSON.stringify(empty, null, 2))
    return
  }

  const { store, path: storePath } = readStore()
  const sitemapUrls = await getSitemapUrls()

  const hashes = {}
  for (const url of sitemapUrls) {
    const hash = hashForRoute(new URL(url).pathname)
    if (hash) hashes[url] = hash
  }

  const { urls: eligible, reasons, aborted } = selectUrls(store, hashes)

  console.log(`[indexnow] store: ${Object.keys(store.urls || {}).length} known URLs (${storePath})`)
  for (const [url, reason] of Object.entries(reasons)) {
    if (reason !== 'unchanged') console.log(`[indexnow]   ${reason}: ${url}`)
  }

  if (aborted) {
    console.error(`[indexnow] ABORTED: ${aborted}`)
    console.error('[indexnow] submission blocked by hard cap — deploy proceeds unaffected. Fix the store before the next content deploy.')
    writeFileSync(MANIFEST_PATH, JSON.stringify({ ...empty, source: 'aborted-cap', urls: [], capped: true }, null, 2))
    // Cap blocks the SUBMISSION, never the deploy (exit 0 on purpose).
    return
  }

  // Verify 200 + indexable immediately before submission
  const valid = []
  for (const url of eligible) {
    if (await verify200(url)) {
      valid.push(url)
    } else {
      console.log(`[indexnow] skip (not 200/indexable): ${url}`)
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'change-gated',
    reason: valid.length > 0 ? `${valid.length} URLs changed, never submitted within 30d, verified 200` : 'no eligible changes',
    urlCount: valid.length,
    urls: valid,
    capped: false,
  }

  if (valid.length > 0) {
    if (valid.length > MAX_URLS_PER_RUN) {
      console.error(`[indexnow] FATAL: batch exceeds ${MAX_URLS_PER_RUN}/24h cap — not submitting`)
      writeFileSync(MANIFEST_PATH, JSON.stringify({ ...empty, source: 'aborted-cap', capped: true }, null, 2))
      // Cap blocks the SUBMISSION, never the deploy (exit 0 on purpose).
      return
    }
    const nextStore = applySubmission(store, valid, hashes)
    writeStore(storePath, nextStore)
    console.log(`[indexnow] SUBMITTING ${valid.length} URLs (${valid.length}/${MAX_URLS_PER_RUN} daily cap). Store updated at ${storePath}`)
    for (const u of valid) console.log(`[indexnow]   submit: ${u}`)
  } else {
    console.log('[indexnow] nothing to submit')
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
}

buildManifest().catch((err) => {
  console.error('[indexnow] fatal error:', err)
  // Fail safe: empty manifest, do not abort the build
  try {
    writeFileSync(MANIFEST_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), source: 'error', urlCount: 0, urls: [], capped: false }, null, 2))
  } catch {}
})
