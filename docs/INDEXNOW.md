# IndexNow Operational Doc — whoza.ai

## Status: ENABLED (2026-10-24)

Re-enabled after the 2026-09-19 circuit breaker expired (30-day floor passed
2026-10-19). This doc is the single source of truth for how IndexNow runs on
this site. Read it before touching anything IndexNow-related.

---

## Current configuration

- **Key:** `15b2a26cf70099d0a3c60581a444d58f` (fresh, generated 2026-10-24 via
  `openssl rand -hex 16`)
- **Key file:** `public/15b2a26cf70099d0a3c60581a444d58f.txt` — body is the key
  alone: exactly 32 chars, **no trailing newline**. Served at
  `https://whoza.ai/15b2a26cf70099d0a3c60581a444d58f.txt`, HTTP 200,
  `Content-Type: text/plain`.
  - The pre-2026-09-19 key (`e3ccefa46e90635781bcc5fff037809c`) was retired —
    it was circulated during the incident. Do not reuse it.
- **Enable switch:** `INDEXNOW_ENABLED=true`, set in the **Netlify UI,
  production context only**. It is never committed to the repo (CI Check 22
  fails the build if it appears in any committed config). Deploy previews and
  branch deploys do not inherit it, so they can never submit.
- **Store path:** `INDEXNOW_STORE_PATH=.indexnow-store.json` (Netlify UI,
  production context only). The committed `.indexnow-store.json` at the repo
  root is the source of truth; see "Store maintenance" below.

## Architecture

1. **Build time** — `netlify.toml` runs
   `node scripts/build-indexnow-manifest.js` after the build. When enabled, it
   reads the store, computes a SHA-1 content hash per sitemap URL from the
   freshly built HTML, and selects URLs that are new, changed since their last
   submission, or past the 30-day resubmit floor. Eligible URLs are verified
   live-200, capped at **50 per run**, and written to
   `netlify/functions/indexnow-manifest.json` with a reason and count. Every
   selection is logged (`[indexnow] <reason>: <url>` plus a `SUBMITTING n URLs`
   line) — a run is fully observable in the Netlify build log.
2. **Post-deploy** — `netlify/functions/deploy-succeeded.js` submits the
   manifest to `api.indexnow.org`. It independently refuses to run when
   disabled and re-checks the 50-URL cap (defence in depth).

**Abort semantics:** if more than 50 URLs are eligible, the run aborts —
nothing is submitted, the manifest is written as `source: 'aborted-cap'`, and
the build still succeeds (exit 0). The cap blocks the *submission*, never the
*deploy*. Do not "fix" this by raising the cap or by failing the build.

## Why the build ID is stable

`next.config.mjs` sets `generateBuildId: async () => 'whoza-ai-stable'`.
Next.js's default random per-build ID is embedded in every prerendered page's
Flight payload, which would make every page's content hash differ on every
build — all ~120 URLs would look "changed" on every deploy, trip the 50-URL
cap every run, and IndexNow would submit nothing forever. The stable ID makes
hashes reflect real content changes only. Do not remove it without replacing
the hash source.

## Policy (unchanged, enforced in `scripts/indexnow-core.js`)

- Submit only when a URL's content hash changed since its last submission.
- Never resubmit within 30 days (`MIN_RESUBMIT_DAYS`).
- Hard ceiling 50 URLs per run (`MAX_URLS_PER_RUN`) — enforced in the builder
  AND the deploy function AND CI Check 22. Raising it fails the build.
- Only URLs in `sitemap.xml` that return live HTTP 200 are submitted.
- Nothing is queued or retried after a cap abort.

## Store maintenance (required after every content deploy)

Netlify builds cannot commit back to the repo, so the committed store does not
auto-update. After any production deploy where the build log shows
`[indexnow] SUBMITTING n URLs`:

```bash
node scripts/update-indexnow-store.js --submitted /path/one,/path/two
git add .indexnow-store.json && git commit -m "chore(indexnow): stamp store post-deploy"
git push origin HEAD:main
```

The follow-up build produces identical HTML (stable build ID), reads the
updated store, finds nothing eligible, and submits nothing — no resubmit loop.
`--all` refreshes every sitemap URL's hash from the current local build and is
safe to run any time.

**Seeding history:** the store was seeded 2026-10-24 from the first
deterministic build. Seven URLs changed in the 2026-10-18→24 commit window
were deliberately seeded stale (old timestamp + bogus hash) so the first
production run submitted exactly those:
`/` , `/pricing`, `/ai-vs-virtual-receptionist`,
`/blog/ai-call-answering-pricing-guide-uk-2026`,
`/resources/google-business-profile-checklist-trades`,
`/resources/missed-call-cost-calculator`,
`/resources/trade-business-growth-toolkit`.

## Incident procedure

If any 24-hour window submits more than 50 URLs:

1. Pull the key file from the repo (delete `public/<key>.txt`), commit, push —
   key validation fails closed at IndexNow (403).
2. Set `INDEXNOW_ENABLED=false` in the Netlify UI (production context).
3. Report the incident. Do **not** raise the cap.

## Verification commands

```bash
node --test scripts/indexnow.test.js        # cap 50/51, 30-day rule, re-eligibility
node scripts/build-indexnow-manifest.js      # local dry run (disabled without env var)
node scripts/redirect-guard.js               # live: key file 200/text-plain/body==key + all redirect chains
npm run build                                # CI guard incl. Check 20/21/22
```

## History

- **Jan 2026** — GitHub Action `indexnow.yml` deleted (double-submission bug).
- **31 Aug 2026** — `scripts/indexnow.sh` submitted full-sitemap batches.
- **19 Sep 2026** — 21,900 submissions for ~149 pages (~147/page); key file
  pulled as a circuit breaker; this doc created.
- **Sep 2026** — gating rework: `indexnow-core.js`, `build-indexnow-manifest.js`,
  `deploy-succeeded.js` deploy hook, `indexnow.test.js`, 50/24h cap in three
  places, 30-day resubmit floor, live-200 verification, persisted store.
- **24 Oct 2026** — re-enabled with fresh key, stable build ID, committed store,
  CI checks 20-22 (sitemap integrity, two-build diff, IndexNow gate),
  abort-made-non-fatal, `update-indexnow-store.js` maintenance helper.
