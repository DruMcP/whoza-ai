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
 *   1. Recreate public/e3ccefa46e90635781bcc5fff037809c.txt containing exactly
 *      the 32-char key, no trailing newline.
 *   2. Set INDEXNOW_ENABLED=true in the Netlify UI (not committed to the repo).
 */
const INDEXNOW_KEY = 'e3ccefa46e90635781bcc5fff037809c'
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
  selectUrls,
  applySubmission,
}
