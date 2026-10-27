/**
 * IndexNow change-gating core — pure functions, no I/O.
 *
 * Policy (Bing indexing remediation brief, Task 1):
 *   - A URL is submitted only when its content hash changed since last submission.
 *   - Never resubmit the same URL within 30 days, regardless of hash.
 *   - Hard ceiling of 50 URLs per 24h. Exceeding it ABORTS (nothing queued/retried).
 *
 * Recorded IndexNow key (DISABLED — key file removed from public/ on 2026-09-19
 * as a circuit breaker). To restore after the 30-day crawl-trust recovery:
 *   1. Recreate public/15b2a26cf70099d0a3c60581a444d58f.txt containing exactly
 *      the 32-char key, no trailing newline.
 *   2. Set INDEXNOW_ENABLED=true in the Netlify UI (not committed to the repo).
 */
const INDEXNOW_KEY = '15b2a26cf70099d0a3c60581a444d58f'
const MAX_URLS_PER_RUN = 50
const MIN_RESUBMIT_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Decide which URLs may be submitted.
 *
 * @param {Object} store  Persisted store: { urls: { [url]: { hash, lastSubmittedAt } } }
 * @param {Object} hashes Current content hashes: { [url]: string }
 * @param {number} now    Current time in ms.
 * @returns {{ urls: string[], reasons: Object, aborted: string|null }}
 */
function selectUrls(store, hashes, now = Date.now()) {
  const prev = (store && store.urls) || {}
  const minInterval = MIN_RESUBMIT_DAYS * DAY_MS
  const reasons = {}
  const eligible = []

  for (const [url, hash] of Object.entries(hashes)) {
    const entry = prev[url]

    if (!entry) {
      reasons[url] = 'first-time'
      eligible.push(url)
      continue
    }

    const last = entry.lastSubmittedAt || 0
    if (now - last < minInterval) {
      reasons[url] = 'skipped: submitted within last 30 days'
      continue
    }

    if (entry.hash !== hash) {
      reasons[url] = 'content changed'
      eligible.push(url)
      continue
    }

    reasons[url] = 'unchanged'
  }

  if (eligible.length > MAX_URLS_PER_RUN) {
    return {
      urls: [],
      reasons,
      aborted: `HARD CAP: ${eligible.length} URLs eligible, ceiling is ${MAX_URLS_PER_RUN}/24h. Nothing submitted.`,
    }
  }

  return { urls: eligible.sort(), reasons, aborted: null }
}

/**
 * Apply a successful submission batch to the store (pure).
 */
function applySubmission(store, urls, hashes, now = Date.now()) {
  const next = { urls: { ...((store && store.urls) || {}) } }
  for (const url of urls) {
    next.urls[url] = {
      hash: hashes[url] || (next.urls[url] && next.urls[url].hash) || '',
      lastSubmittedAt: now,
    }
  }
  return next
}

module.exports = {
  INDEXNOW_KEY,
  MAX_URLS_PER_RUN,
  MIN_RESUBMIT_DAYS,
  DAY_MS,
  selectUrls,
  applySubmission,
  hashForRoute,
}

// Content hash for a route. Prefer the built HTML (true rendered content),
// fall back to the page source file. Requires deterministic builds — see
// generateBuildId in next.config.mjs and docs/INDEXNOW.md.
function hashForRoute(pathname) {
  const { readFileSync, existsSync } = require('fs')
  const { createHash } = require('crypto')
  const { join } = require('path')
  const route = pathname.replace(/^\//, '')
  const htmlCandidates = [
    join('.next', 'server', 'app', `${route}.html`),
    join('.next', 'server', 'app', route, 'page.html'),
    join('.next', 'server', 'app', `${route}index.html`),
    join('.next', 'server', 'app', 'index.html'), // homepage
  ]
  const srcCandidates = [
    join('app', route, 'page.tsx'),
    join('app', route, 'page.jsx'),
    join('app', 'page.tsx'), // homepage
  ]
  for (const file of [...htmlCandidates, ...srcCandidates]) {
    if (existsSync(file)) {
      const content = readFileSync(file)
      return createHash('sha1').update(content).digest('hex')
    }
  }
  return null // unknown — treat as unchanged rather than guessing
}
