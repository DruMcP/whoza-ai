# IndexNow — circuit breaker & restoration notes

**Status (2026-09-19): DISABLED.** Bing Webmaster Tools showed 21,900 IndexNow
submissions for a ~149-page site (~147 submissions/page), collapsing crawl trust
and wiping the site from the Bing index. All submission paths have been
change-gated and the system is off by default.

## What was done

1. **Key file removed**: `public/e3ccefa46e90635781bcc5fff037809c.txt` deleted
   from the repo and the `next.config.mjs` rewrite for it removed. Any
   outstanding submission source now fails key validation (403) immediately.
2. **Submitter rewritten** (`scripts/build-indexnow-manifest.js` +
   `netlify/functions/deploy-succeeded.js`): change-gated on content hash,
   30-day resubmit floor, hard 50-URL/24h cap (abort, no queue), sitemap
   membership + live 200/noindex verification, full batch logging.
3. **Kill switch**: `INDEXNOW_ENABLED` must equal `'true'` or nothing runs.
   It is **not set anywhere in the repo** — only settable via Netlify UI.
4. **Tests**: `node --test scripts/indexnow.test.js` proves the 50/day cap.

## History (do not resurrect)

- `.github/workflows/indexnow.yml` (Jan 2026): resubmitted the entire blog list
  on every push — the Mar–Jun daily flood. Deleted.
- `scripts/indexnow.sh` (Aug 2026): submitted all 142 sitemap URLs in one run —
  the 31 Aug 2026 same-minute full-sitemap batch. Deleted.

## Restoration procedure (earliest 2026-10-19)

1. Recreate `public/e3ccefa46e90635781bcc5fff037809c.txt` containing exactly
   `e3ccefa46e90635781bcc5fff037809c` (32 chars, no trailing newline).
2. Re-add the `next.config.mjs` rewrite for the key file if needed.
3. Set `INDEXNOW_ENABLED=true` in the Netlify UI.
4. Monitor BWT → IndexNow daily reports: must stay ≤ 50/day, and 0 on days
   with no content changes.
