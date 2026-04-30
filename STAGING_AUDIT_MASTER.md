# STAGING AUDIT — MASTER REPORT
**Date:** 2026-04-30
**URL:** https://whoza-ai-staging.netlify.app
**Auditors:** 4-agent panel (UX/Design, Copy/Business, Technical, QA/Flows)

---

## EXECUTIVE SUMMARY

| Category | Grade | Status |
|----------|-------|--------|
| Customer Journey | D | 🔴 Free score funnel is broken |
| Business Offer | C | 🟡 Pricing inconsistent, trial length conflicts |
| UI Design | B+ | 🟢 Strong design system, minor issues |
| Technical | D | 🔴 Edge functions 401, API exposed, pages broken |
| Industry Standards | C | 🟡 SEO issues, missing security headers |

**Overall: C-** — Cannot go live with current state. Critical fixes required.

---

## CRITICAL ISSUES (Fix Before Launch)

### 1. Edge Functions Completely Broken (401) 🔴
**Impact:** Trial waitlist system non-functional. Users can't check availability or join waitlist.
**Root Cause:** Functions require Authorization header but token format is invalid.
**Fix:** Use service role key internally; remove user-auth dependency for public functions.

### 2. Free Analysis Funnel Broken 🔴
**Impact:** Core acquisition promise is false. Users expect free score, get signup form.
**Root Cause:** /competitor-analysis has no actual free score tool — just a signup form.
**Fix:** Build simplified free score OR remove "free score" claims sitewide.

### 3. Pricing Inconsistency 🔴
**Impact:** Trust destroyed. Homepage shows Unlimited £149, pricing page shows Unlimited £249.
**Root Cause:** Homepage pricing preview not updated when Growth tier was added.
**Fix:** Update homepage to show all 4 tiers or match pricing page exactly.

### 4. /start Page Stuck Loading 🔴
**Impact:** Users can't sign up. Trial conversion funnel dead.
**Root Cause:** React hydration or auth context issue on staging.
**Fix:** Debug and fix hydration; add error boundary.

### 5. Google Maps API Exposed + CORS Blocked 🔴
**Impact:** Competitor analysis form completely non-functional. API key visible to attackers.
**Root Cause:** Client-side Places API calls with hardcoded key.
**Fix:** Move to server-side proxy. Rotate exposed key immediately.

### 6. /admin/trials 404 🔴
**Impact:** Dru can't monitor trial funnel.
**Fix:** Add route to App.jsx or remove link.

### 7. FAQ References Non-Existent £49 Plan 🔴
**Impact:** Looks unprofessional, suggests outdated/inaccurate info.
**Fix:** Update to Core £59.

### 8. detect-country Function Missing 🔴
**Impact:** Console errors on every page. Geo-detection broken.
**Fix:** Deploy function or remove client-side call.

---

## MODERATE ISSUES (Fix Before Ads)

### 9. Trial Length Inconsistency 🟡
Homepage: 14 days | Pricing: 14 days | Signup: 7 days
**Fix:** Standardize to 14 days everywhere.

### 10. Duplicate H1 Tags 🟡
Every page has 2 H1s (page heading + footer nav heading).
**Fix:** Change footer heading to H2.

### 11. Footer Links Escape to Production 🟡
Footer nav links to https://whoza.ai/... instead of relative paths.
**Fix:** Use relative paths.

### 12. Canonical/OG URLs Point to Production 🟡
Staging tells search engines to index production.
**Fix:** Make domain-aware.

### 13. Sitemap Points to Production 🟡
**Fix:** Generate per-environment.

### 14. No robots.txt 🟡
**Fix:** Add staging-blocking robots.txt.

### 15. Missing CSP Header 🟡
**Fix:** Add basic CSP via Netlify headers.

### 16. Weak Testimonials 🟡
Only 1 visible, anonymous, no metrics.
**Fix:** Add photos, specific before/after metrics.

### 17. Competitor Table Doesn't Explain Value Gap 🟡
Trade Receptionist starts at £29 (cheaper than Core £59).
**Fix:** Add "What you get" explanation row.

---

## MINOR ISSUES (Polish)

### 18. Duplicate Stat on Homepage 🟢
"2,847 tradespeople checked" appears twice.

### 19. Footer/Header "About" Mismatch 🟢
Footer → /trust, Header → /how-it-works.

### 20. Missing Autocomplete on Password 🟢

### 21. Trailing Slash Redirects 🟢

### 22. Generic Homepage Title 🟢

---

## AGENT CONSENSUS

**All 4 agents agree:**
1. The site CANNOT go live in current state
2. Critical fixes (#1-8) must be resolved first
3. After fixes, site will be B+ grade and ready for traffic
4. The business model is sound — execution needs to match the promise

**Disagreements resolved:**
- UX vs Business on free trial with/without CC → Consensus: No CC, but add "Reserve with card" upsell
- UX vs Technical on 25 trials/week → Consensus: 15/week month 1, scale to 25 after automation
- All agents agree pricing inconsistency is the #1 trust-killer

---

## FIX PRIORITY QUEUE

### Phase 1 (Today — Critical)
1. Fix edge function auth (all 4 functions)
2. Fix pricing consistency (homepage + pricing page)
3. Fix /start loading issue
4. Fix FAQ £49 reference
5. Add /admin/trials route or remove link
6. Fix detect-country 404

### Phase 2 (This Week — Before Ads)
7. Fix Google Maps API (server-side proxy)
8. Fix free analysis funnel (build tool OR remove claims)
9. Fix duplicate H1s
10. Fix footer links
11. Fix canonical/OG URLs
12. Add robots.txt + CSP
13. Standardize trial length

### Phase 3 (Optimization)
14. Improve testimonials
15. Add competitor table value explanation
16. Add plan recommendation quiz
17. Add money-back guarantee

---

*Report compiled from 4-agent panel audit. All findings cross-validated.*
