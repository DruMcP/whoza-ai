/**
 * Netlify deploy-succeeded function: submits changed URLs to IndexNow.
 *
 * Rules:
 *   1. Only URLs in the manifest (which itself is built from git diff)
 *   2. Only real indexable HTML pages (verified against sitemap.xml, 200 OK, not noindex)
 *   3. Hard cap 10,000 per deploy — over cap submits nothing and logs
 *   4. Gated behind INDEXNOW_ENABLED === 'true'
 *
 * The manifest is bundled via included_files in netlify.toml.
 */

const BASE_URL = 'https://whoza.ai'
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`
const INDEXNOW_API = 'https://api.indexnow.org/indexnow'
const MAX_URLS = 10000

// Hardcoded IndexNow key — must match scripts/build-indexnow-manifest.js
const INDEXNOW_KEY = 'e3ccefa46e90635781bcc5fff037809c'
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`

async function fetchSitemapUrls() {
  try {
    const res = await fetch(SITEMAP_URL, { redirect: 'follow' })
    if (!res.ok) {
      console.warn(`[indexnow] sitemap fetch failed: ${res.status}`)
      return new Set()
    }
    const xml = await res.text()
    const urls = new Set()
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g)
    for (const match of matches) {
      urls.add(match[1].trim())
    }
    return urls
  } catch (err) {
    console.warn('[indexnow] sitemap fetch error:', err)
    return new Set()
  }
}

async function isIndexable(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': 'whoza-ai-indexnow/1.0' },
    })

    if (res.status !== 200) {
      console.log(`[indexnow] skip ${url} — HTTP ${res.status}`)
      return false
    }

    const body = await res.text()
    if (body.includes('noindex') || body.includes('noindex,')) {
      console.log(`[indexnow] skip ${url} — noindex detected`)
      return false
    }

    return true
  } catch (err) {
    console.warn(`[indexnow] check error for ${url}:`, err)
    return false
  }
}

function logResponse(status, body) {
  switch (status) {
    case 200:
      console.log(`[indexnow] HTTP 200 — Accepted. ${body}`)
      break
    case 202:
      console.log(`[indexnow] HTTP 202 — Accepted, key validation pending (normal on first submission). ${body}`)
      break
    case 400:
      console.warn(`[indexnow] HTTP 400 — Bad request. Likely malformed JSON. Body: ${body}`)
      break
    case 403:
      console.warn(`[indexnow] HTTP 403 — Key not valid. The key file is missing or does not match. Check ${KEY_LOCATION}`)
      break
    case 422:
      console.warn(`[indexnow] HTTP 422 — URLs don't belong to host, or key mismatch. Check for www vs apex inconsistency in urlList.`)
      break
    case 429:
      console.warn(`[indexnow] HTTP 429 — Too many requests. Back off; submitting too often.`)
      break
    default:
      console.warn(`[indexnow] HTTP ${status} — ${body}`)
  }
}

async function submitToIndexNow(urls) {
  const payload = {
    host: BASE_URL.replace(/^https?:\/\//, ''),
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  try {
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    const body = await res.text().catch(() => '')
    logResponse(res.status, body)

    return res.status === 200 || res.status === 202
  } catch (err) {
    console.warn('[indexnow] batch submit error:', err)
    return false
  }
}

// Fallback: individual GET submission
async function submitIndividual(url) {
  const apiUrl = `${INDEXNOW_API}?url=${encodeURIComponent(url)}&key=${encodeURIComponent(INDEXNOW_KEY)}`
  try {
    const res = await fetch(apiUrl, { method: 'GET' })
    const body = await res.text().catch(() => '')
    logResponse(res.status, body)
    return res.status === 200 || res.status === 202
  } catch {
    return false
  }
}

exports.handler = async (event, context) => {
  console.log('[indexnow] deploy-succeeded triggered')

  // Kill switch — must be explicitly enabled
  const enabled = process.env.INDEXNOW_ENABLED === 'true'
  if (!enabled) {
    console.log('[indexnow] INDEXNOW_ENABLED !== true — skipping submission')
    return { statusCode: 200, body: 'IndexNow disabled by kill switch' }
  }

  // Read manifest
  let manifest
  try {
    manifest = require('./indexnow-manifest.json')
  } catch {
    console.log('[indexnow] no manifest found — nothing to submit')
    return { statusCode: 200, body: 'No manifest found' }
  }

  console.log(`[indexnow] manifest: ${manifest.urlCount} URLs, capped=${manifest.capped}, source=${manifest.source || 'unknown'}`)

  if (manifest.capped || manifest.urls.length === 0) {
    console.log('[indexnow] no URLs to submit (empty or capped)')
    return { statusCode: 200, body: 'No URLs to submit' }
  }

  if (manifest.urls.length > MAX_URLS) {
    console.warn(`[indexnow] URL count ${manifest.urls.length} exceeds cap ${MAX_URLS} — skipping`)
    return { statusCode: 200, body: 'URL count exceeds cap' }
  }

  // Validate against sitemap
  const sitemapUrls = await fetchSitemapUrls()
  const inSitemap = manifest.urls.filter((u) => sitemapUrls.has(u))
  const notInSitemap = manifest.urls.filter((u) => !sitemapUrls.has(u))

  if (notInSitemap.length > 0) {
    console.log(`[indexnow] ${notInSitemap.length} URLs not in sitemap:`, notInSitemap)
  }

  if (inSitemap.length === 0) {
    console.log('[indexnow] no manifest URLs found in sitemap — skipping')
    return { statusCode: 200, body: 'No valid URLs in sitemap' }
  }

  // Verify each URL is indexable (200, not noindex)
  const validUrls = []
  for (const url of inSitemap) {
    if (await isIndexable(url)) {
      validUrls.push(url)
    }
  }

  if (validUrls.length === 0) {
    console.log('[indexnow] no indexable URLs after validation — skipping')
    return { statusCode: 200, body: 'No indexable URLs' }
  }

  // Submit
  const ok = await submitToIndexNow(validUrls)
  if (!ok && validUrls.length <= 10) {
    console.log('[indexnow] batch failed — trying individual submission')
    let success = 0
    for (const url of validUrls) {
      if (await submitIndividual(url)) {
        success++
      }
    }
    console.log(`[indexnow] individual: ${success}/${validUrls.length} succeeded`)
  }

  return {
    statusCode: 200,
    body: `IndexNow: ${validUrls.length} URLs submitted`,
  }
}
