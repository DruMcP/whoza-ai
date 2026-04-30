# Technical & Functionality Audit — whoza.ai Staging

**URL:** https://whoza-ai-staging.netlify.app  
**Date:** 2026-04-30  
**Audited by:** Jarvis  
**Method:** `curl` HTTP tests + content extraction + edge function validation

---

## Executive Summary

| Severity | Count | Categories |
|----------|-------|------------|
| 🔴 **Critical** | 6 | Broken functions, exposed secrets, missing pages, auth failure |
| 🟡 **Moderate** | 7 | SEO issues, routing issues, form UX |
| 🟢 **Minor** | 4 | Missing autocomplete, CSP, trailing slashes |

---

## 🔴 Critical Issues

### 1. Supabase Edge Functions All Return 401 (Invalid JWT)
**Impact:** Waitlist, trial availability, and waitlist notifications are completely non-functional.

| Function | Method | Status | Error |
|----------|--------|--------|-------|
| `check-trial-availability` | GET | 401 | `UNAUTHORIZED_INVALID_JWT_FORMAT` |
| `join-waitlist` | POST | 401 | `UNAUTHORIZED_INVALID_JWT_FORMAT` |
| `get-waitlist-status` | POST | 401 | `UNAUTHORIZED_INVALID_JWT_FORMAT` |
| `notify-waitlist` | POST | 401 | `UNAUTHORIZED_INVALID_JWT_FORMAT` |

**Technical detail:** The token `sb_publishable_zg2uH-mI-DmUhYzt2J36Vg_5JWOJyMD` is rejected as invalid JWT by all four functions. It is actually the **Supabase publishable key** (a marketing/public identifier), not an `anon` key or JWT. The functions require either:
- A valid Supabase JWT (`eyJ...` format)
- The `anon` key (a proper JWT, not a publishable string)

**Verification:** Even with `apikey` or `x-api-key` headers, the functions return `UNAUTHORIZED_NO_AUTH_HEADER`. CORS preflight works fine (`access-control-allow-origin: *`), so the issue is purely auth.

**Fix:** Pass the actual Supabase `anon` key (JWT format) in the `Authorization: Bearer <anon_key>` header, or remove auth requirements for public functions via `cors.ts`.

---

### 2. Supabase Publishable Key Hardcoded in JS Bundle
**Impact:** Any attacker can extract the publishable key from the client bundle.

The token `sb_publishable_zg2uH-mI-DmUhYzt2J36Vg_5JWOJyMD` was found **literally hardcoded** in the main JavaScript bundle (`/assets/index-Dv-rsnCr.js`, 518KB).

**Fix:** Move Supabase initialization to environment variables or server-side functions. Do not embed keys in client bundles.

---

### 3. `/admin/trials` Returns 404
**Impact:** Admin dashboard is missing.

- `/admin/trials` → 404
- `/admin/trials/` → 404

Both variants return Netlify's default 404 page with no custom content. This is a referenced but unbuilt route.

**Fix:** Deploy the `/admin/trials` page or remove all links to it until built.

---

### 4. `/faqs` Returns 404
**Impact:** FAQ page referenced in user request but missing from deployment.

- `/faqs` → 404
- `/faqs/` → 404

This page was in the user's audit request list but is not present on the staging site.

**Fix:** Build and deploy `/faqs/` or redirect it to an existing FAQ section.

---

### 5. Missing Netlify Function: `detect-country`
**Impact:** Geo-detection feature broken. Console errors on every page load.

The frontend references `/.netlify/functions/detect-country` on every page, but this function does not exist in the deployed build.

**Fix:** Either deploy the `detect-country` function or remove the client-side call.

---

### 6. Core Competitor Analysis Form Backend Broken
**Impact:** The main conversion tool cannot look up real businesses.

The `/competitor-analysis/` form triggers a Google Places API `textsearch` call from the client side, which is **blocked by CORS**:
```
Access to fetch at 'https://maps.googleapis.com/maps/api/place/textsearch/json?...'
from origin 'https://whoza-ai-staging.netlify.app' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

The user sees: *"Could not find your business. Try adding your town or postcode."* — but the real issue is the API call is blocked.

**Fix:** Move all Google Places API calls to a server-side proxy (Netlify function or Supabase edge function). The Google Maps API key (previously observed in browser console as `AIzaSy...L62A`) must be rotated and restricted to server-side IPs.

---

## 🟡 Moderate Issues

### 7. All Canonical & OG URLs Point to Production Domain
**Impact:** If staging is accidentally indexed, search engines will see duplicate content pointing to production.

Every audited page has `canonical`, `og:url`, and `og:image` pointing to `https://whoza.ai/...`:

| Page | Canonical |
|------|-----------|
| `/` | `https://whoza.ai/` |
| `/pricing/` | `https://whoza.ai/pricing/` |
| `/competitor-analysis/` | `https://whoza.ai/competitor-analysis/` |
| `/start/` | `https://whoza.ai/start/` |
| `/how-it-works/` | `https://whoza.ai/how-it-works/` |
| `/blog/` | `https://whoza.ai/blog/` |
| `/case-studies/` | `https://whoza.ai/case-studies/` |
| `/contact/` | `https://whoza.ai/contact/` |
| `/trust/` | `https://whoza.ai/trust/` |
| `/sign-in/` | `https://whoza.ai/sign-in/` |
| `/privacy/` | `https://whoza.ai/privacy/` |
| `/terms/` | `https://whoza.ai/terms/` |
| `/cookie-policy/` | `https://whoza.ai/cookie-policy/` |

**Fix:** Dynamically set canonical/OG URLs based on `window.location.origin` or use build-time `VITE_APP_URL` env var.

---

### 8. Sitemap.xml Points Exclusively to Production
**Impact:** The staging sitemap has zero staging URLs.

The sitemap.xml contains 80+ URLs all pointing to `https://whoza.ai/...`. This is correct for production but useless for staging validation.

**Fix:** Generate sitemap dynamically based on deployed domain.

---

### 9. Footer Navigation Links Escape to Production
**Impact:** Users on staging are unexpectedly redirected to production when clicking footer links.

The "Site navigation" section at the bottom of every page uses absolute URLs (`https://whoza.ai/...`) instead of relative paths. The main header navigation correctly uses relative paths (`/pricing`, `/competitor-analysis`).

**Fix:** Change all footer nav links to relative paths (`/pricing/`, `/blog/`, etc.).

---

### 10. Trailing-Slash Redirects on All Routes
**Impact:** Every non-slash URL incurs an extra 301 round-trip.

| Path | Status | Redirects To |
|------|--------|--------------|
| `/pricing` | 301 | `/pricing/` |
| `/blog` | 301 | `/blog/` |
| `/competitor-analysis` | 301 | `/competitor-analysis/` |
| `/contact` | 301 | `/contact/` |
| `/login` | 301 | `/sign-in/` |
| All others | 301 | `/…/` |

**Fix:** Ensure all internal links use trailing slashes consistently.

---

### 11. `/login` Route Redirects to `/sign-in/`
**Impact:** Inconsistent URL naming. `/login` is intuitive but redirects to `/sign-in/`. The `/start/` page also contains auth forms.

| Route | Status | Actual Content |
|-------|--------|----------------|
| `/start/` | 200 | Sign-up / auth forms |
| `/login` | 301 | → `/sign-in/` |
| `/sign-in/` | 200 | Sign-in page |

**Fix:** Standardize on `/login/` or `/sign-in/` but not both. Ensure all internal links are consistent.

---

### 12. Schema Markup Missing on 12 of 13 Pages
**Impact:** Only the homepage has structured data. All other pages lack JSON-LD schema, reducing rich snippet eligibility.

| Page | Schema Present |
|------|----------------|
| `/` | ✅ Yes |
| `/pricing/` | ❌ No |
| `/competitor-analysis/` | ❌ No |
| `/start/` | ❌ No |
| `/how-it-works/` | ❌ No |
| `/blog/` | ❌ No |
| `/case-studies/` | ❌ No |
| `/contact/` | ❌ No |
| `/trust/` | ❌ No |
| `/sign-in/` | ❌ No |
| `/privacy/` | ❌ No |
| `/terms/` | ❌ No |
| `/cookie-policy/` | ❌ No |

**Fix:** Add appropriate JSON-LD schema (Organization, Service, FAQPage, etc.) to each page.

---

### 13. Sign-Up Form Validation Appears Incomplete
**Impact:** Users may submit empty/incomplete sign-up data.

On `/start/`, the "Next" button navigated to `/how-it-works/` even with empty email and password fields in previous browser testing. The form may be relying on Supabase auth validation server-side rather than client-side.

**Fix:** Add client-side validation (required fields, email regex, password ≥6 chars) before allowing "Next".

---

## 🟢 Minor Issues

### 14. Missing `autocomplete` on Password Input
**Impact:** UX friction. Browsers can't suggest saved passwords.

Browser console verbose warning: *"Input elements should have autocomplete attributes (suggested: 'current-password')"*

**Fix:** Add `autocomplete="current-password"` to sign-in password and `autocomplete="new-password"` to sign-up password.

---

### 15. Missing Content-Security-Policy Header
**Impact:** Slightly increased XSS risk.

Response headers present:
- ✅ `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- ❌ `Content-Security-Policy` — **missing**

**Fix:** Add a CSP header via Netlify `_headers` file or `netlify.toml`.

---

### 16. Generic Page Title on Homepage
**Impact:** Homepage title is generic and identical to the fallback H1 used in footer navigation.

- Homepage title: "Whoza.ai — See Who AI Recommends for Your Trade"
- This exact string is used as the H1 in the footer nav on every page.

**Fix:** Make the homepage title more specific: "AI Visibility for UK Tradespeople | Whoza.ai"

---

### 17. Large JS Bundle (518KB)
**Impact:** First-load performance. The main bundle is 518KB uncompressed.

- `/assets/index-Dv-rsnCr.js` — 518KB
- Vendor chunks also loaded: `vendor-react.js`, `vendor-motion.js`, `vendor-supabase.js`, `vendor-icons.js`

**Fix:** Consider code-splitting by route and lazy-loading below-the-fold components.

---

## Page Status Summary (curl audit)

| Page | Status | Redirect | TTFB (s) | Size | Notes |
|------|--------|----------|----------|------|-------|
| `/` | 200 | — | 0.033 | 0 | SPA shell; meta present |
| `/pricing` | 301 | → `/pricing/` | 0.247 | 0 | Trailing-slash redirect |
| `/pricing/` | 200 | — | 0.029 | 0 | Good specific meta |
| `/competitor-analysis` | 301 | → `/competitor-analysis/` | 0.407 | 0 | Trailing-slash redirect |
| `/competitor-analysis/` | 200 | — | 0.340 | 0 | Form present; backend broken |
| `/start` | 301 | → `/start/` | 0.238 | 0 | Trailing-slash redirect |
| `/start/` | 200 | — | 0.437 | 0 | Auth forms; trial 401 |
| `/how-it-works` | 301 | → `/how-it-works/` | 0.255 | 0 | Trailing-slash redirect |
| `/how-it-works/` | 200 | — | 0.531 | 0 | OK |
| `/blog` | 301 | → `/blog/` | 0.250 | 0 | Trailing-slash redirect |
| `/blog/` | 200 | — | 0.033 | 0 | OK |
| `/case-studies` | 301 | → `/case-studies/` | 0.246 | 0 | Trailing-slash redirect |
| `/case-studies/` | 200 | — | 0.249 | 0 | OK |
| `/contact` | 301 | → `/contact/` | 0.248 | 0 | Trailing-slash redirect |
| `/contact/` | 200 | — | 0.242 | 0 | OK |
| `/trust` | 301 | → `/trust/` | 0.240 | 0 | Trailing-slash redirect |
| `/trust/` | 200 | — | 0.253 | 0 | OK |
| `/admin/trials` | 404 | — | 0.030 | 0 | 🔴 Missing page |
| `/admin/trials/` | 404 | — | 0.032 | 0 | 🔴 Missing page |
| `/login` | 301 | → `/sign-in/` | 0.032 | 0 | Route naming inconsistency |
| `/login/` | 301 | → `/sign-in/` | 0.032 | 0 | Route naming inconsistency |
| `/faqs` | 404 | — | 0.243 | 0 | 🔴 Missing page |
| `/faqs/` | 404 | — | 0.254 | 0 | 🔴 Missing page |
| `/privacy` | 301 | → `/privacy/` | 0.256 | 0 | Trailing-slash redirect |
| `/privacy/` | 200 | — | 0.252 | 0 | OK |
| `/terms` | 301 | → `/terms/` | 0.258 | 0 | Trailing-slash redirect |
| `/terms/` | 200 | — | 0.251 | 0 | OK |
| `/cookie-policy` | 301 | → `/cookie-policy/` | 0.240 | 0 | Trailing-slash redirect |
| `/cookie-policy/` | 200 | — | 0.697 | 0 | OK |
| `/robots.txt` | 200 | — | 0.241 | ~200B | ✅ Correctly blocks crawlers |
| `/sitemap.xml` | 200 | — | 0.464 | ~10KB | All URLs point to production |
| `/og-image.png` | 200 | — | 1.459 | ~? | OG image loads |

*Note: Sizes show 0 because curl `-I` HEAD requests don't return bodies. All pages are SPA shells with JS hydration.*

---

## Meta Tag Verification

| Page | Meta Description | OG Title | OG Description |
|------|----------------|----------|----------------|
| `/` | ✅ | ✅ | ✅ |
| `/pricing/` | ✅ | ✅ | ✅ |
| `/competitor-analysis/` | ✅ | ✅ | ✅ |
| `/start/` | ✅ | ✅ | ✅ |
| `/how-it-works/` | ✅ | ✅ | ✅ |
| `/blog/` | ✅ | ✅ | ✅ |
| `/case-studies/` | ✅ | ✅ | ✅ |
| `/contact/` | ✅ | ✅ | ✅ |
| `/trust/` | ✅ | ✅ | ✅ |
| `/sign-in/` | ✅ | ✅ | ✅ |
| `/privacy/` | ✅ | ✅ | ✅ |
| `/terms/` | ✅ | ✅ | ✅ |
| `/cookie-policy/` | ✅ | ✅ | ✅ |
| `/admin/trials/` | ❌ | ❌ | ❌ | (404 page) |
| `/faqs/` | ❌ | ❌ | ❌ | (404 page) |

All 200-status pages have proper meta descriptions and OG tags. **However, all canonical and OG URL tags point to production domain `whoza.ai`.**

---

## Security Headers Summary

| Header | Present | Value |
|--------|---------|-------|
| HSTS | ✅ | `max-age=31536000; includeSubDomains; preload` |
| X-Frame-Options | ✅ | `DENY` |
| X-Content-Type-Options | ✅ | `nosniff` |
| Referrer-Policy | ✅ | `strict-origin-when-cross-origin` |
| Permissions-Policy | ✅ | `geolocation=(), microphone=(), camera=()` |
| Content-Security-Policy | ❌ | Missing |

---

## Edge Function Test Results (Detailed)

### Auth: Bearer sb_publishable_zg2uH-mI-DmUhYzt2J36Vg_5JWOJyMD

```
GET  /functions/v1/check-trial-availability
→ 401 {"code":"UNAUTHORIZED_INVALID_JWT_FORMAT","message":"Invalid JWT"}

POST /functions/v1/join-waitlist
→ 401 {"code":"UNAUTHORIZED_INVALID_JWT_FORMAT","message":"Invalid JWT"}

POST /functions/v1/get-waitlist-status
→ 401 {"code":"UNAUTHORIZED_INVALID_JWT_FORMAT","message":"Invalid JWT"}

POST /functions/v1/notify-waitlist
→ 401 {"code":"UNAUTHORIZED_INVALID_JWT_FORMAT","message":"Invalid JWT"}
```

### Alternative Auth Methods Tested

```
GET /functions/v1/check-trial-availability  (apikey header)
→ 401 {"code":"UNAUTHORIZED_NO_AUTH_HEADER","message":"Missing authorization header"}

GET /functions/v1/check-trial-availability  (x-api-key header)
→ 401 {"code":"UNAUTHORIZED_NO_AUTH_HEADER","message":"Missing authorization header"}

GET /functions/v1/check-trial-availability  (no auth)
→ 401 {"code":"UNAUTHORIZED_NO_AUTH_HEADER","message":"Missing authorization header"}
```

### CORS Preflight (OPTIONS)

```
access-control-allow-origin: *
access-control-allow-headers: authorization, x-client-info, apikey, content-type
```

**CORS is configured correctly. The issue is purely authentication token mismatch.**

---

## robots.txt

```
# Robots.txt for whoza.ai STAGING
User-agent: *
Disallow: /

# Staging environment - block all crawlers
# Sitemap: none (staging should not be indexed)
```

✅ **Correctly configured** to block all crawlers on staging.

---

## Recommendations (Prioritized)

### Immediate (Before Launch)
1. **Fix edge function auth** — use actual Supabase `anon` key (JWT format) or remove auth requirements for public functions
2. **Move Google Places API server-side** — rotate any exposed key, proxy through Netlify function
3. **Remove hardcoded Supabase key from JS bundle** — use env vars
4. **Build or remove `/admin/trials/`** — currently 404
5. **Build or remove `/faqs/`** — currently 404
6. **Fix or remove `detect-country` function call** — causing 404s on every page

### Short Term (This Sprint)
7. **Fix canonical/OG URLs** — make domain-aware (staging vs production)
8. **Fix footer nav links** — use relative paths, not production absolute URLs
9. **Fix sitemap.xml** — generate dynamically per environment
10. **Add CSP header** — basic policy to mitigate XSS
11. **Add schema markup** to all pages (currently only homepage has it)
12. **Fix form validation on `/start/`** — ensure client-side validation before submission
13. **Standardize trailing slashes** in internal links

### Polish
14. **Add autocomplete attributes** to password fields
15. **Improve homepage title** for specificity
16. **Consider code-splitting** the 518KB JS bundle

---

*End of comprehensive audit*
