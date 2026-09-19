#!/usr/bin/env node
/**
 * redirect-guard.js — assert that no site redirect terminates on a non-200.
 *
 * Walks every redirect the site issues (netlify.toml [[redirects]] plus the
 * next.config.mjs trailing-slash/signup matrices) against the LIVE site and
 * asserts each chain ends at 200 (or an intentional 410) within two hops.
 *
 * Class of bug this prevents: a correct redirect rule landing on a dead route
 * (e.g. /video/ → 301 → /video → 404). That costs two crawl fetches and
 * passes no equity — worse than a plain 404 — and will otherwise recur every
 * time a page is removed.
 *
 * Exit 1 on any failure. Runs against BASE_URL (default production).
 */

const { execSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const BASE = (process.env.BASE_URL || "https://whoza.ai").replace(/\/$/, "")
const MAX_HOPS = 2
const ALLOWED_FINAL = new Set([200, 410])

function parseNetlifyRedirects(tomlPath) {
  const toml = fs.readFileSync(tomlPath, "utf8")
  const out = []
  let cur = null
  for (const line of toml.split("\n")) {
    const mFrom = line.match(/^\s*from\s*=\s*"(.*?)"/)
    const mTo = line.match(/^\s*to\s*=\s*"(.*?)"/)
    const mStatus = line.match(/^\s*status\s*=\s*(\d+)/)
    if (mFrom) {
      cur = { from: mFrom[1], to: null, status: null }
      out.push(cur)
    }
    if (cur && mTo) cur.to = mTo[1]
    if (cur && mStatus) cur.status = Number(mStatus[1])
  }
  return out
}

/** Fetch with retry — CI runners occasionally hit transient network flakes. */
async function fetchWithRetry(url, opts, attempts = 3) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, opts)
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
    }
  }
  throw lastErr
}

/** Follow a URL manually so we can count hops and inspect each step. */
async function walk(url, maxHops = MAX_HOPS) {
  const hops = []
  let current = url
  for (let i = 0; i <= maxHops; i++) {
    const res = await fetchWithRetry(current, {
      redirect: "manual",
      headers: { "user-agent": "whoza-redirect-guard/1.0" },
    })
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get("location")
      hops.push({ from: current, status: res.status, to: loc })
      current = new URL(loc, current).toString()
      continue
    }
    hops.push({ from: current, status: res.status, to: null })
    return { final: res.status, hops, finalUrl: current }
  }
  hops.push({ from: current, status: -1, to: "hop-limit-exceeded" })
  return { final: -1, hops, finalUrl: current }
}

async function main() {
  const root = path.resolve(__dirname, "..")
  const rules = parseNetlifyRedirects(path.join(root, "netlify.toml"))

  // Path-scoped rules only; skip domain-level rules (probe separately below).
  const pathRules = rules.filter((r) => r.from.startsWith("/"))

  const targets = []
  for (const r of pathRules) {
    // Splat/placeholder patterns (e.g. "/*.key") can't be probed literally.
    if (r.from.includes("*") || r.from.includes(":")) continue
    // status=404/410 rules are TERMINAL responses, not redirects — assert the
    // probed path returns that status directly and move on.
    if (r.status === 404 || r.status === 410) {
      targets.push({ probe: r.from, expectStatus: r.status, kind: "terminal" })
      continue
    }
    targets.push({ probe: r.from, expectStatus: r.status, kind: "netlify" })
    // Also probe the trailing-slash variant — the global normaliser must not
    // strand slashed URLs on a dead unslashed route.
    if (!r.from.endsWith("/")) {
      targets.push({ probe: r.from + "/", expectStatus: null, kind: "slash-variant" })
    }
  }

  // Known dynamic redirects issued by next.config.mjs / middleware.
  const EXTRA = [
    "/start", "/free-score", "/competitor-analysis",
    "/electrician-london", "/atlanta", "/locations/us/new-york",
    "/for-gas-engineers-manchester", "/for-roofers-birmingham",
  ]
  for (const p of EXTRA) targets.push({ probe: p, expectStatus: null, kind: "extra" })

  // GSC remediation evidence battery (2026-09-19 brief) — fixed URLs that must
  // serve 200. Redirects among them are walked; pages are checked directly.
  const MUST_200 = [
    "/research/voice-agent-technology-state-of-the-art-2026",
    "/case-studies", "/ai-visibility-checker", "/support", "/vs-moneypenny",
    "/blog/how-much-do-missed-calls-cost-uk-trades", "/london",
    "/uk/ai-visibility/london/ai-receptionist", "/electricians",
    "/blog/local-seo-trades-complete-guide", "/blog/how-to-grow-trade-business-uk-guide",
    "/blog/how-to-get-more-google-reviews-trades", "/blog/ultimate-faq-tradespeople",
    "/blog/roofing-lead-generation-guide", "/blog/how-to-get-more-plumbing-customers",
    "/blog/24-7-call-answering-emergency-trades", "/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky",
    "/blog/ai-receptionist-vs-human-cost-guide-2026", "/best-ai-call-handler-uk-trades",
    "/ai-vs-virtual-receptionist", "/vs-trade-receptionist",
    "/blog/how-does-ai-call-answering-work",
    "/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber",
    "/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026",
    "/for-gas-engineers", "/for-heating-engineers", "/for-painters-decorators",
    "/for-gas-engineers-london", "/for-heating-engineers-manchester",
  ]
  for (const p of MUST_200) targets.push({ probe: p, expectStatus: null, kind: "extra" })

  // Garbage URLs from the 404 export — must stay terminal 404 (never redirect,
  // never 200). Historical crawl-queue noise; guard against accidental wiring.
  const MUST_404 = ["/$", "/mo+", "/year", "/for-gutter-cleaners", "/for-fencers",
    "/for-kitchen-fitters", "/for-security-installers", "/for-driveway-specialists"]
  for (const p of MUST_404) targets.push({ probe: p, expectStatus: 404, kind: "terminal" })

  const failures = []
  const seen = new Set()
  let checked = 0

  for (const t of targets) {
    const key = t.probe
    if (seen.has(key)) continue
    seen.add(key)

    const url = BASE + t.probe

    // Terminal rules (forced 404/410): assert the direct response, no walk.
    if (t.kind === "terminal") {
      let status
      try {
        const res = await fetch(url, {
          redirect: "manual",
          headers: { "user-agent": "whoza-redirect-guard/1.0" },
        })
        status = res.status
      } catch (err) {
        failures.push({ probe: t.probe, reason: `fetch error: ${err.message}` })
        continue
      }
      checked++
      if (status !== t.expectStatus) {
        failures.push({ probe: t.probe, reason: `terminal rule returned ${status}, expected ${t.expectStatus}` })
      }
      continue
    }

    let result
    try {
      result = await walk(url)
    } catch (err) {
      failures.push({ probe: t.probe, reason: `fetch error: ${err.message}` })
      continue
    }
    checked++

    if (result.final === -1) {
      failures.push({
        probe: t.probe,
        reason: `exceeded ${MAX_HOPS} hops: ${result.hops.map((h) => `${h.status} ${h.to || ""}`).join(" -> ")}`,
      })
      continue
    }
    if (!ALLOWED_FINAL.has(result.final)) {
      failures.push({
        probe: t.probe,
        reason: `redirect terminates on ${result.final} at ${result.finalUrl}`,
        chain: result.hops,
      })
    }
    if (t.expectStatus && result.hops[0] && result.hops[0].status !== t.expectStatus) {
      failures.push({
        probe: t.probe,
        reason: `first hop ${result.hops[0].status}, expected ${t.expectStatus}`,
      })
    }
  }

  console.log(`redirect-guard: ${checked} redirect chains walked against ${BASE}`)
  if (failures.length === 0) {
    console.log("✅ ALL REDIRECT CHAINS TERMINATE ON 200/410 — no redirect-into-404")
    process.exit(0)
  }
  console.log(`❌ ${failures.length} FAILURE(S):`)
  for (const f of failures) {
    console.log(`  - ${f.probe}: ${f.reason}`)
    if (f.chain) for (const h of f.chain) console.log(`      ${h.status} ${h.to || "(final)"}`)
  }
  process.exit(1)
}

main().catch((err) => {
  console.error("redirect-guard crashed:", err)
  process.exit(1)
})
