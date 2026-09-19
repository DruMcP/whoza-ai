/**
 * Netlify deploy-succeeded function: submits the change-gated IndexNow manifest.
 *
 * DISABLED BY DEFAULT — requires INDEXNOW_ENABLED=true (Netlify UI only).
 * The IndexNow key file was removed from public/ on 2026-09-19 as a circuit
 * breaker. Do not re-enable before 2026-10-19 (30-day crawl-trust recovery).
 *
 * Defence in depth: even if the build-time gating misbehaves, this function
 * refuses batches over MAX_URLS_PER_RUN and refuses to run when disabled.
 */

const INDEXNOW_API = 'https://api.indexnow.org/indexnow'
const BASE_URL = 'https://whoza.ai'
// Recorded IndexNow key (see scripts/indexnow-core.js). Key file removed from
// public/ 2026-09-19 as a circuit breaker — restore it before re-enabling.
const INDEXNOW_KEY = 'e3ccefa46e90635781bcc5fff037809c'
const MAX_URLS_PER_RUN = 50

const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`

function logResponse(status, body) {
  switch (status) {
    case 200: console.log(`[indexnow] 200 accepted. ${body}`); break
    case 202: console.log(`[indexnow] 202 accepted, key validation pending. ${body}`); break
    case 403: console.warn(`[indexnow] 403 key invalid — key file missing (expected: circuit breaker active)`); break
    case 429: console.warn(`[indexnow] 429 too many requests — back off`); break
    default: console.warn(`[indexnow] HTTP ${status} — ${body}`)
  }
}

exports.handler = async () => {
  console.log('[indexnow] deploy-succeeded triggered')

  if (process.env.INDEXNOW_ENABLED !== 'true') {
    console.log('[indexnow] DISABLED (INDEXNOW_ENABLED !== true) — no submission')
    return { statusCode: 200, body: 'IndexNow disabled' }
  }

  let manifest
  try {
    manifest = require('./indexnow-manifest.json')
  } catch {
    console.log('[indexnow] no manifest — nothing to submit')
    return { statusCode: 200, body: 'No manifest' }
  }

  console.log(`[indexnow] manifest: ${manifest.urlCount} URLs, source=${manifest.source}, reason=${manifest.reason || 'n/a'}`)

  if (!manifest.urls || manifest.urls.length === 0) {
    return { statusCode: 200, body: 'Nothing to submit' }
  }

  if (manifest.urlCount > MAX_URLS_PER_RUN) {
    console.error(`[indexnow] REFUSING batch of ${manifest.urlCount} — hard cap is ${MAX_URLS_PER_RUN}/24h`)
    return { statusCode: 200, body: 'Batch refused: over cap' }
  }

  const payload = {
    host: 'whoza.ai',
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: manifest.urls,
  }

  try {
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
    const body = await res.text().catch(() => '')
    logResponse(res.status, body)
    return { statusCode: 200, body: `IndexNow: ${manifest.urlCount} URLs submitted` }
  } catch (err) {
    console.warn('[indexnow] submit error:', err)
    return { statusCode: 200, body: 'IndexNow submit failed' }
  }
}
