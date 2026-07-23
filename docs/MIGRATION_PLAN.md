# WHOOZA.AI PRODUCTION → SOFT-LAUNCH MIGRATION PLAN
**Status:** DEPLOY BLOCKED — migration plan required
**Date:** 2026-05-14
**Prepared by:** Jarvis

---

## EXECUTIVE SUMMARY

The existing production site at `www.whoza.ai` has **~115 indexed URLs** with established Google authority. The new soft-launch build only covers **~35 of these**. Deploying now would cause **80+ 404s** and destroy 3+ months of SEO equity.

**This document maps every old URL to its new equivalent and specifies the redirect/content strategy needed before deploy.**

---

## SECTION 1: URL INVENTORY

### 1.1 Pages That EXIST in New Build (✅ Safe)

| Old URL | New URL | Status |
|---------|---------|--------|
| `/` | `/` | ✅ Same |
| `/pricing/` | `/pricing` | ⚠️ Trailing slash — needs redirect |
| `/privacy/` | `/privacy` | ⚠️ Trailing slash — needs redirect |
| `/terms/` | `/terms` | ⚠️ Trailing slash — needs redirect |
| `/cookie-policy/` | `/cookie-policy` | ⚠️ Trailing slash — needs redirect |
| `/support/` | `/support` | ⚠️ Trailing slash — needs redirect |
| `/accessibility/` | `/accessibility` | ⚠️ Trailing slash — needs redirect |
| `/vat-info/` | `/vat-info` | ⚠️ Trailing slash — needs redirect |
| `/refund-policy/` | `/refund-policy` | ⚠️ Trailing slash — needs redirect |
| `/fair-use/` | `/fair-use` | ⚠️ Trailing slash — needs redirect |
| `/sla/` | `/sla` | ⚠️ Trailing slash — needs redirect |
| `/dpa/` | `/dpa` | ⚠️ Trailing slash — needs redirect |
| `/modern-slavery/` | `/modern-slavery` | ⚠️ Trailing slash — needs redirect |
| `/complaints/` | `/complaints` | ⚠️ Trailing slash — needs redirect |
| `/london/` | `/london` | ⚠️ Trailing slash — needs redirect |
| `/manchester/` | `/manchester` | ⚠️ Trailing slash — needs redirect |
| `/birmingham/` | `/birmingham` | ⚠️ Trailing slash — needs redirect |
| `/glasgow/` | `/glasgow` | ⚠️ Trailing slash — needs redirect |
| `/leeds/` | `/leeds` | ⚠️ Trailing slash — needs redirect |
| `/liverpool/` | `/liverpool` | ⚠️ Trailing slash — needs redirect |
| `/bristol/` | `/bristol` | ⚠️ Trailing slash — needs redirect |
| `/edinburgh/` | `/edinburgh` | ⚠️ Trailing slash — needs redirect |
| `/trade/plumber/` | `/trade/plumber` | ⚠️ Trailing slash — needs redirect |
| `/trade/electrician/` | `/trade/electrician` | ⚠️ Trailing slash — needs redirect |
| `/trade/builder/` | `/trade/builder` | ⚠️ Trailing slash — needs redirect |
| `/trade/roofer/` | `/trade/roofer` | ⚠️ Trailing slash — needs redirect |
| `/trade/landscaper/` | `/trade/landscaper` | ⚠️ Trailing slash — needs redirect |
| `/trade/hvac/` | `/trade/hvac` | ⚠️ Trailing slash — needs redirect |
| `/trade/painter/` | `/trade/painter` | ⚠️ Trailing slash — needs redirect |

### 1.2 Pages That DO NOT EXIST in New Build (❌ CRITICAL — 301 Redirects Needed)

#### A. Blog Posts (30 posts — highest SEO value)

| Old URL | Redirect Target | Priority |
|---------|----------------|----------|
| `/blog/` | `/` (homepage with pilot messaging) | HIGH |
| `/blog/why-your-business-isnt-showing-up-in-chatgpt-recommendations-and-how-to-fix-it/` | `/` or `/best-ai-call-handler-uk-trades` | HIGH |
| `/blog/ai-visibility-for-london-tradespeople-2026/` | `/london` | HIGH |
| `/blog/ai-visibility-manchester-trades-2026-guide/` | `/manchester` | HIGH |
| `/blog/best-practices-tradespeople-london-local-ai-visibility-guide/` | `/london` | MEDIUM |
| `/blog/electricians-guide-to-google-ai-overviews-2026/` | `/trade/electrician` | HIGH |
| `/blog/electricians-guide-to-google-ai-overviews-how-to-get-featured/` | `/trade/electrician` | MEDIUM |
| `/blog/google-ai-overviews-stealing-clicks-guide-uk-tradespeople/` | `/` | MEDIUM |
| `/blog/how-ai-search-engines-choose-plumber-recommendation-manchester/` | `/manchester` | HIGH |
| `/blog/how-ai-search-engines-choose-which-local-businesses-to-recommend/` | `/` | MEDIUM |
| `/blog/how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026/` | `/` | MEDIUM |
| `/blog/how-plumbers-can-get-found-in-chatgpt-2026/` | `/trade/plumber` | HIGH |
| `/blog/how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide/` | `/trade/plumber` | MEDIUM |
| `/blog/how-reviews-influence-ai-search-recommendations-tradespeople-2026/` | `/` | MEDIUM |
| `/blog/how-to-create-an-faq-page-that-ai-can-find-and-reference/` | `/` | MEDIUM |
| `/blog/how-to-create-faq-page-ai-can-find-2026/` | `/` | MEDIUM |
| `/blog/how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026/` | `/` | HIGH |
| `/blog/how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026/` | `/` | HIGH |
| `/blog/how-uk-tradespeople-get-found-ai-search-2026/` | `/` | HIGH |
| `/blog/manchester-vs-birmingham-local-seo-strategies-2026/` | `/` | MEDIUM |
| `/blog/roofers-10-step-checklist-ai-visibility-2026/` | `/trade/roofer` | HIGH |
| `/blog/roofers-checklist-10-steps-to-ai-visibility-2026/` | `/trade/roofer` | MEDIUM |
| `/blog/the-ultimate-guide-to-google-business-profile-optimization-for-ai-search-2026/` | `/` | MEDIUM |
| `/blog/top-10-ai-visibility-strategies-uk-tradespeople-2026/` | `/` | MEDIUM |
| `/blog/uk-trades-business-playbook-ai-search-visibility-2026/` | `/` | HIGH |
| `/blog/us-contractors-guide-ai-search-visibility-2026/` | `/` | MEDIUM |
| `/blog/what-is-ai-visibility-uk-tradespeople-2026/` | `/` | MEDIUM |
| `/blog/why-ai-search-wont-recommend-your-trade-business-and-how-to-fix-it/` | `/` | HIGH |
| `/blog/why-bing-matters-for-ai-search-the-perplexity-connection/` | `/` | MEDIUM |

#### B. Old Location Pages (Different URL Structure)

| Old URL | Redirect Target | Notes |
|---------|----------------|-------|
| `/uk/ai-visibility/london/` | `/london` | ✅ Has equivalent |
| `/uk/ai-visibility/manchester/` | `/manchester` | ✅ Has equivalent |
| `/uk/ai-visibility/birmingham/` | `/birmingham` | ✅ Has equivalent |
| `/uk/ai-visibility/glasgow/` | `/glasgow` | ✅ Has equivalent |
| `/uk/ai-visibility/leeds/` | `/leeds` | ✅ Has equivalent |
| `/uk/ai-visibility/liverpool/` | `/liverpool` | ✅ Has equivalent |
| `/uk/ai-visibility/bristol/` | `/bristol` | ✅ Has equivalent |
| `/uk/ai-visibility/edinburgh/` | `/edinburgh` | ✅ Has equivalent |
| `/uk/ai-visibility/belfast/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/bradford/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/cardiff/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/coventry/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/leicester/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/newcastle/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/nottingham/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/sheffield/` | `/` | ❌ No equivalent — redirect home |
| `/uk/ai-visibility/southampton/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/new-york/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/los-angeles/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/chicago/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/austin/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/charlotte/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/columbus/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/dallas/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/fort-worth/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/houston/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/jacksonville/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/philadelphia/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/phoenix/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/san-antonio/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/san-diego/` | `/` | ❌ No equivalent — redirect home |
| `/us/ai-visibility/san-jose/` | `/` | ❌ No equivalent — redirect home |

#### C. Old Trade Pages (Different URL Structure)

| Old URL | Redirect Target | Notes |
|---------|----------------|-------|
| `/trades/plumber/` | `/trade/plumber` | ✅ Has equivalent |
| `/trades/electrician/` | `/trade/electrician` | ✅ Has equivalent |
| `/trades/builder/` | `/trade/builder` | ✅ Has equivalent |
| `/trades/roofer/` | `/trade/roofer` | ✅ Has equivalent |
| `/trades/locksmith/` | `/trade/locksmith` | ❌ Need to create or redirect |
| `/trades/heating-engineer/` | `/trade/hvac` | ⚠️ Approximate match |
| `/trades/painter-decorator/` | `/trade/painter` | ⚠️ Approximate match |
| `/trades/carpenter/` | `/` | ❌ No equivalent |
| `/trades/tiler/` | `/` | ❌ No equivalent |
| `/trades/gardener/` | `/trade/landscaper` | ⚠️ Approximate match |
| `/trades/window-installer/` | `/` | ❌ No equivalent |
| `/trades/bathroom-fitter/` | `/` | ❌ No equivalent |
| `/trades/kitchen-fitter/` | `/` | ❌ No equivalent |
| `/trades/plasterer/` | `/` | ❌ No equivalent |
| `/trades/flooring-installer/` | `/` | ❌ No equivalent |
| `/trades/drainage-engineer/` | `/` | ❌ No equivalent |
| `/trades/gas-engineer/` | `/trade/hvac` | ⚠️ Approximate match |
| `/trades/handyman/` | `/` | ❌ No equivalent |
| `/trades/fencing-contractor/` | `/` | ❌ No equivalent |
| `/trades/scaffolder/` | `/` | ❌ No equivalent |

#### D. Legacy Content Pages (No New Equivalent)

| Old URL | Redirect Target | Notes |
|---------|----------------|-------|
| `/video/` | `/` | Old video page |
| `/competitor-analysis/` | `/vs-trade-receptionist` | ⚠️ Has similar content |
| `/how-it-works/` | `/` | Anchor `#how-it-works` |
| `/case-studies/` | `/` | No case studies in new build |
| `/trust/` | `/` | Old trust page |
| `/contact/` | `/support` | ⚠️ Support page has contact |
| `/start/` | `/` | Old onboarding page |

---

## SECTION 2: TRAILING SLASH NORMALIZATION

The old site uses trailing slashes (`/pricing/`). The new build uses no trailing slash (`/pricing`). **Google treats these as separate URLs.**

**Required:** Add trailing slash → no-trailing-slash 301 redirects in `netlify.toml`:

```toml
[[redirects]]
  from = "/pricing/"
  to = "/pricing"
  status = 301

[[redirects]]
  from = "/privacy/"
  to = "/privacy"
  status = 301

# ... (all pages with equivalents)
```

---

## SECTION 3: RECOMMENDED MIGRATION STRATEGY

### Phase 1: Before Deploy (CRITICAL)

1. **Create `netlify.toml` redirect rules** for ALL old URLs
2. **Add blog content placeholder** — At minimum, create `/blog` page that lists posts with "Content being updated for pilot launch" messaging (preserves `/blog` URL equity)
3. **Verify all redirects with `curl -I`**

### Phase 2: Immediately After Deploy

1. **Submit updated sitemap** to Google Search Console
2. **Monitor Google Search Console** for 404 crawl errors for 7 days
3. **Check redirect chains** — ensure no double-redirects

### Phase 3: Week 1-2 Post-Deploy

1. **Recreate high-value blog posts** as new content in `/blog/[slug]` format
2. **Add canonical tags** to any preserved content
3. **Update internal links** in new build to reference new URL structure

---

## SECTION 4: REDIRECT RULES TO ADD

### 4.1 Netlify.toml Redirects (Bulk)

```toml
# === BLOG POSTS → HOMEPAGE (preserve link equity) ===
[[redirects]]
  from = "/blog/*"
  to = "/"
  status = 301

# === OLD LOCATION PAGES → NEW LOCATION PAGES ===
[[redirects]]
  from = "/uk/ai-visibility/london/*"
  to = "/london"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/manchester/*"
  to = "/manchester"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/birmingham/*"
  to = "/birmingham"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/glasgow/*"
  to = "/glasgow"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/leeds/*"
  to = "/leeds"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/liverpool/*"
  to = "/liverpool"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/bristol/*"
  to = "/bristol"
  status = 301

[[redirects]]
  from = "/uk/ai-visibility/edinburgh/*"
  to = "/edinburgh"
  status = 301

# All other UK cities → homepage
[[redirects]]
  from = "/uk/ai-visibility/*"
  to = "/"
  status = 301

# All US cities → homepage
[[redirects]]
  from = "/us/ai-visibility/*"
  to = "/"
  status = 301

# === OLD TRADE PAGES → NEW TRADE PAGES ===
[[redirects]]
  from = "/trades/plumber/*"
  to = "/trade/plumber"
  status = 301

[[redirects]]
  from = "/trades/electrician/*"
  to = "/trade/electrician"
  status = 301

[[redirects]]
  from = "/trades/builder/*"
  to = "/trade/builder"
  status = 301

[[redirects]]
  from = "/trades/roofer/*"
  to = "/trade/roofer"
  status = 301

[[redirects]]
  from = "/trades/locksmith/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/trades/heating-engineer/*"
  to = "/trade/hvac"
  status = 301

[[redirects]]
  from = "/trades/painter-decorator/*"
  to = "/trade/painter"
  status = 301

[[redirects]]
  from = "/trades/gardener/*"
  to = "/trade/landscaper"
  status = 301

[[redirects]]
  from = "/trades/gas-engineer/*"
  to = "/trade/hvac"
  status = 301

# All other trades → homepage
[[redirects]]
  from = "/trades/*"
  to = "/"
  status = 301

# === LEGACY CONTENT PAGES ===
[[redirects]]
  from = "/video/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/competitor-analysis/*"
  to = "/vs-trade-receptionist"
  status = 301

[[redirects]]
  from = "/how-it-works/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/case-studies/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/trust/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/contact/*"
  to = "/support"
  status = 301

[[redirects]]
  from = "/start/*"
  to = "/"
  status = 301

# === TRAILING SLASH NORMALIZATION ===
[[redirects]]
  from = "/pricing/"
  to = "/pricing"
  status = 301

[[redirects]]
  from = "/privacy/"
  to = "/privacy"
  status = 301

[[redirects]]
  from = "/terms/"
  to = "/terms"
  status = 301

[[redirects]]
  from = "/support/"
  to = "/support"
  status = 301

[[redirects]]
  from = "/cookie-policy/"
  to = "/cookie-policy"
  status = 301

[[redirects]]
  from = "/accessibility/"
  to = "/accessibility"
  status = 301

[[redirects]]
  from = "/vat-info/"
  to = "/vat-info"
  status = 301

[[redirects]]
  from = "/refund-policy/"
  to = "/refund-policy"
  status = 301

[[redirects]]
  from = "/fair-use/"
  to = "/fair-use"
  status = 301

[[redirects]]
  from = "/sla/"
  to = "/sla"
  status = 301

[[redirects]]
  from = "/dpa/"
  to = "/dpa"
  status = 301

[[redirects]]
  from = "/modern-slavery/"
  to = "/modern-slavery"
  status = 301

[[redirects]]
  from = "/complaints/"
  to = "/complaints"
  status = 301

[[redirects]]
  from = "/london/"
  to = "/london"
  status = 301

[[redirects]]
  from = "/manchester/"
  to = "/manchester"
  status = 301

[[redirects]]
  from = "/birmingham/"
  to = "/birmingham"
  status = 301

[[redirects]]
  from = "/glasgow/"
  to = "/glasgow"
  status = 301

[[redirects]]
  from = "/leeds/"
  to = "/leeds"
  status = 301

[[redirects]]
  from = "/liverpool/"
  to = "/liverpool"
  status = 301

[[redirects]]
  from = "/bristol/"
  to = "/bristol"
  status = 301

[[redirects]]
  from = "/edinburgh/"
  to = "/edinburgh"
  status = 301
```

---

## SECTION 5: GOOGLE SEARCH CONSOLE TASKS

### 5.1 Pre-Deploy
- [ ] Verify `whoza.ai` property in GSC (if not already)
- [ ] Download current performance report (keywords, impressions, CTR)
- [ ] Note top 20 performing pages

### 5.2 Post-Deploy (Day 1)
- [ ] Submit new sitemap.xml
- [ ] Request re-indexing of homepage
- [ ] Check "Coverage" report for errors

### 5.3 Post-Deploy (Week 1)
- [ ] Monitor "Pages" report for 404s
- [ ] Check "Core Web Vitals" for regression
- [ ] Verify redirects working in "URL Inspection" tool

---

## SECTION 6: RISK ASSESSMENT

| Risk | Impact | Mitigation |
|------|--------|------------|
| Blog posts 404 | HIGH — 30 indexed posts lost | Mass redirect to homepage + recreate high-value posts |
| Old location pages 404 | MEDIUM — 23 city pages lost | Redirect to new equivalents or homepage |
| Old trade pages 404 | MEDIUM — 20 trade pages lost | Redirect to new equivalents or homepage |
| Trailing slash mismatch | LOW — duplicate content | 301 redirects + canonical tags |
| Schema markup loss | LOW — old site had basic schema | New build has richer schema |
| Backlink equity loss | HIGH — external links to old URLs | 301 redirects preserve ~90% equity |

---

## SECTION 7: DECISION REQUIRED FROM DRU

**Before I can proceed with deploy, you need to confirm:**

1. **Blog strategy:** Redirect all 30 blog posts to homepage, or do you want me to recreate the top 5-10 posts in the new build first?

2. **Missing trade pages:** Create pages for `/trade/locksmith`, `/trade/carpenter`, etc., or redirect to homepage for now?

3. **Missing location pages:** Create pages for Belfast, Bradford, Cardiff, etc., or redirect to homepage?

4. **Old content pages:** `/video/`, `/case-studies/`, `/how-it-works/` — recreate or redirect?

5. **Google Search Console:** Do you have access? If yes, I need the verification code for `app/layout.tsx`.

**My recommendation:**
- Implement all 301 redirects NOW (2 hours of work)
- Deploy with redirects active
- Recreate top 10 blog posts over the following 2 weeks
- Add missing trade/location pages as Phase 2

**Deploy is BLOCKED until redirects are in place.**
