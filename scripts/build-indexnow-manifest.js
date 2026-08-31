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
 * FIRST-RUN SEED: Set INDEXNOW_FIRST_RUN=true to submit all sitemap URLs once.
 * This gates the initial bulk seed so it cannot repeat on later deploys.
 *
 * Usage: node scripts/build-indexnow-manifest.js
 */

const { execSync } = require('child_process')
const { writeFileSync, mkdirSync, readFileSync } = require('fs')
const { dirname } = require('path')

const BASE_URL = 'https://whoza.ai'
const MANIFEST_PATH = 'netlify/functions/indexnow-manifest.json'
const SITEMAP_PATH = 'public/sitemap.xml'
const MAX_URLS = 10000

// IndexNow key — 32-char hex. Generate once, treat as permanent.
// If you change this, you must update netlify/functions/deploy-succeeded.js too.
const INDEXNOW_KEY = 'e3ccefa46e90635781bcc5fff037809c'

// Ensure the key file exists in public/ with exactly the key, no trailing newline
function ensureKeyFile() {
  const keyFilePath = `public/${INDEXNOW_KEY}.txt`
  try {
    writeFileSync(keyFilePath, INDEXNOW_KEY, { encoding: 'utf8' })
    console.log(`[build-indexnow-manifest] key file written: ${keyFilePath}`)
  } catch (err) {
    console.warn(`[build-indexnow-manifest] failed to write key file:`, err)
  }
}

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

function getAllSitemapUrls() {
  try {
    const xml = readFileSync(SITEMAP_PATH, 'utf8')
    const urls = new Set()
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g)
    for (const match of matches) {
      urls.add(match[1].trim())
    }
    return Array.from(urls).sort()
  } catch {
    console.warn('[build-indexnow-manifest] could not read sitemap.xml')
    return []
  }
}

function buildManifest() {
  // Step 1: ensure key file is present
  ensureKeyFile()

  const isFirstRun = process.env.INDEXNOW_FIRST_RUN === 'true'
  let urls = []
  let source = 'git-diff'

  if (isFirstRun) {
    // First-run seed: submit all sitemap URLs once
    urls = getAllSitemapUrls()
    source = 'first-run-seed'
    console.log(`[build-indexnow-manifest] FIRST RUN: seeding ${urls.length} URLs from sitemap`)
  } else {
    // Normal deploy: derive changed URLs from git diff
    const changedFiles = getChangedFiles()
    console.log(`[build-indexnow-manifest] ${changedFiles.length} changed files`)

    const urlSet = new Set()
    for (const file of changedFiles) {
      const fileUrls = fileToUrls(file)
      for (const url of fileUrls) {
        urlSet.add(url)
      }
    }

    urls = Array.from(urlSet).sort()
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    commitRef: process.env.COMMIT_REF || 'unknown',
    cachedCommitRef: process.env.CACHED_COMMIT_REF || 'unknown',
    source,
    urlCount: urls.length,
    urls: urls.length > MAX_URLS ? [] : urls,
    capped: urls.length > MAX_URLS,
  }

  if (urls.length > MAX_URLS) {
    console.log(`[build-indexnow-manifest] WARNING: ${urls.length} URLs — exceeds cap of ${MAX_URLS}. IndexNow will skip this deploy.`)
  } else if (urls.length > 0) {
    console.log(`[build-indexnow-manifest] ${urls.length} URLs to submit (${source}):`)
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
