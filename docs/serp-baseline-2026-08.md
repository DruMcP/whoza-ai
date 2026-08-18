# SERP Baseline — whoza.ai (August 2026)

**Date captured:** 2026-08-19
**Method:** Kimi search index sampling + live site verification
**Scope:** Primary service pages, city combos, and high-value blog content

---

## Indexed Pages (Confirmed)

### Service Hub Pages
| Page | Title (as indexed) | Status |
|------|-------------------|--------|
| /for-electricians | AI for Electricians UK \| Catch Every Rewire & Emergency Call | ✅ Indexed |
| /for-roofers | AI for Roofers \| Never Miss a Storm Season Call — Whoza.ai | ✅ Indexed |
| /for-plumbers-london | AI Call Answering for Plumbers in London \| whoza.ai | ✅ Indexed |
| /for-plumbers-manchester | AI Call Answering for Plumbers in Manchester \| whoza.ai | ✅ Indexed |
| /for-plumbers-edinburgh | AI Call Answering for Plumbers in Edinburgh \| whoza.ai | ✅ Indexed |
| /for-electricians-london | AI Call Answering for Electricians in London \| whoza.ai | ✅ Indexed |

### Support / Authority Pages
| Page | Title (as indexed) | Status |
|------|-------------------|--------|
| /faq | AI Call Answering FAQ for UK Tradespeople | ✅ Indexed |
| /blog/ultimate-faq-tradespeople | The Ultimate FAQ for Tradespeople: 100+ Real Questions Answered... | ✅ Indexed |
| /blog/8-reasons-uk-tradespeople-switch-to-ai-call-handling-in-2026 | 8 Reasons UK Tradespeople Switch to AI Call Handling in 2026 | ✅ Indexed |

### Third-Party Listings
| Source | URL | Notes |
|--------|-----|-------|
| FreeIndex | freeindex.co.uk/profile(whoza-ai)_864115.htm | Business profile verified 6 Jul 2026 |

---

## QuickAnswer Deployment Status

| Page | Variant | QuickAnswer Present | Format |
|------|---------|---------------------|--------|
| /for-plumbers | A | ✅ | `**Label:** sentence` (this PR) |
| /for-electricians | A | ✅ | `**Label:** sentence` (this PR) |
| /for-roofers | A | ✅ | `**Label:** sentence` (this PR) |

**Format spec:** Bold label + colon + sentence. Desktop renders as plain paragraph list. Mobile retains accordion for compactness.

---

## Baseline Metrics (Pre-Stage-2)

| Metric | Value | Source |
|--------|-------|--------|
| Total indexed pages | 6+ hub/combo + 3 blog + 1 third-party | Search sampling |
| Avg response time (warm) | ~0.5s | HEARTBEAT.md |
| Avg response time (cold) | ~1.3s | HEARTBEAT.md |
| Core pages with QuickAnswer | 3 | This PR |
| Pages with FAQPage schema | All hub pages | Prior audit |

---

## Target Keywords (For Position Tracking)

### High Intent
- "AI call answering for electricians UK"
- "AI receptionist for plumbers"
- "AI call answering for roofers"
- "missed call answering service trades UK"

### Local Intent
- "AI call answering plumbers London"
- "AI receptionist electricians Manchester"
- "AI call answering roofers Glasgow"

### Informational
- "why tradespeople miss calls"
- "AI vs human receptionist cost"
- "how to get more plumbing customers"

---

## Notes

- Position data requires a rank tracker (e.g., Ahrefs, SEMrush, or manual SERP check) — not available in this baseline.
- QuickAnswer blocks are designed for AI Overview extraction; position impact will be measured in Stage 2.
- All listed pages return 200 and render full HTML (SSR verified).

---

*Next update: post-Stage-2 validation (target 14 days after merge).*
