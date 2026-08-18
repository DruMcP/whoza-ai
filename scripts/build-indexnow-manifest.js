/**
 * Build-time script: generates indexnow-manifest.json for the deploy-succeeded function.
 *
 * Reads git diff between CACHED_COMMIT_REF and COMMIT_REF (or HEAD^ as fallback),
 * maps changed source files to their canonical URLs, and writes a JSON manifest.
 *
 * Only includes real indexable HTML pages. Excludes:
 *   - /.netlify/*, /_next/*, /api/*
 *   - /sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt
 *   - static assets (.json, .xml, .txt, .js, .css, .map, .webp, .png, etc.)
 *
 * Usage: node scripts/build-indexnow-manifest.js
 */

const { execSync } = require('child_process')
const { writeFileSync, mkdirSync } = require('fs')
const { dirname } = require('path')

const BASE_URL = 'https://whoza.ai'
const MANIFEST_PATH = 'netlify/functions/indexnow-manifest.json'
const MAX_URLS = 50

// Map a changed file path to its canonical URL(s).
// Returns empty array for non-page files or excluded paths.
function fileToUrls(filePath) {
  // Only consider page source files
  if (!filePath.endsWith('/page.tsx') && !filePath.endsWith('/page.jsx')) {
    return []
  }

  // Exclude API routes and special paths
  if (
    filePath.startsWith('app/api/') ||
    filePath.includes('/_') ||
    filePath.includes('/[')
  ) {
    return []
  }

  // Map app/{path}/page.tsx → /{path}
  const match = filePath.match(/^app\/(.+)\/page\.(tsx|jsx)$/)
  if (!match) return []

  const route = match[1]

  // Skip non-indexable routes
  if (
    route.startsWith('api/') ||
    route.startsWith('_') ||
    route.startsWith('.')
  ) {
    return []
  }

  return [`${BASE_URL}/${route}`]
}

function getChangedFiles() {
  const cachedRef = process.env.CACHED_COMMIT_REF
  const commitRef = process.env.COMMIT_REF || 'HEAD'
  const baseRef = cachedRef || `${commitRef}^`

  try {
    const output = execSync(
      `git diff --name-only --diff-filter=ACMRT ${baseRef} ${commitRef}`,
      { encoding: 'utf8', cwd: process.cwd() }
    ).trim()
    return output ? output.split('\n').filter(Boolean) : []
  } catch {
    // If git diff fails (e.g. first deploy, shallow clone), return empty
    return []
  }
}

function buildManifest() {
  const changedFiles = getChangedFiles()
  console.log(`[build-indexnow-manifest] ${changedFiles.length} changed files`)

  const urlSet = new Set()

  for (const file of changedFiles) {
    const urls = fileToUrls(file)
    for (const url of urls) {
      urlSet.add(url)
    }
  }

  const urls = Array.from(urlSet).sort()

  const manifest = {
    generatedAt: new Date().toISOString(),
    commitRef: process.env.COMMIT_REF || 'unknown',
    cachedCommitRef: process.env.CACHED_COMMIT_REF || 'unknown',
    urlCount: urls.length,
    urls: urls.length > MAX_URLS ? [] : urls,
    capped: urls.length > MAX_URLS,
  }

  // If over cap, write empty URLs array (function will log and skip)
  if (urls.length > MAX_URLS) {
    console.log(`[build-indexnow-manifest] WARNING: ${urls.length} URLs changed — exceeds cap of ${MAX_URLS}. IndexNow will skip this deploy.`)
  } else if (urls.length > 0) {
    console.log(`[build-indexnow-manifest] ${urls.length} URLs to submit:`)
    for (const url of urls) {
      console.log(`  - ${url}`)
    }
  } else {
    console.log(`[build-indexnow-manifest] No indexable page URLs changed.`)
  }

  mkdirSync(dirname(MANIFEST_PATH), { recursive: true })
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
}

buildManifest()
