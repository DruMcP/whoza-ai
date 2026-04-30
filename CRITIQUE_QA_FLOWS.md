# whoza.ai Staging QA & End-to-End Flow Audit

**URL:** https://whoza-ai-staging.netlify.app  
**Date:** 2026-04-29  
**Tester:** Automated browser + fetch audit  
**Scope:** All user flows, navigation, edge cases, mobile viewport, console errors

---

## Executive Summary

| Category | Count |
|----------|-------|
| 🔴 Broken Flows | 4 |
| 🟡 Confusing Flows | 6 |
| 🟢 Smooth Flows | 10 |

---

## 🔴 BROKEN FLOWS

### 1. Competitor Analysis Form — Results Cannot Load
**Flow:** Homepage → "Check My Score" → Enter business name → Submit → **Stuck at loading spinner**

**Steps:**
1. Navigate to /competitor-analysis ✅
2. Form renders with business name, town, trade type fields ✅
3. Enter data (e.g., "Smith Plumbing Services", "Birmingham") ✅
4. Click "Show me my score" ✅
5. Loading spinner appears ✅
6. **Results never load** — spinner spins indefinitely 🔴

**Root Cause:**
- Browser console shows CORS error blocking `https://maps.googleapis.com/maps/api/place/textsearch/json?query=...&key=AIzaSy...L62A`
- The Google Places API is being called **directly from the frontend** instead of through a backend proxy
- The API key `AIzaSy...L62A` is **exposed in client-side JavaScript** 🔴 (security vulnerability)
- Google Places API does not allow CORS from browser origins for the textsearch endpoint

**Impact:** The core lead-generation flow (free competitor analysis) is completely non-functional. No user can see their score.

**Fix:** Route all Google Places API calls through a Netlify function or Supabase edge function. Never expose API keys in frontend code.

---

### 2. /admin/trials — 404 Not Found
**Flow:** Direct navigation to admin trial management page

**URL tested:** https://whoza-ai-staging.netlify.app/admin/trials  
**Result:** Netlify "Page Not Found" 404 error 🔴

**Impact:** If this is an intended admin route, it is broken. If it was removed intentionally, there may be leftover links pointing to it.

**Fix:** Verify if /admin/trials is still needed. If yes, restore the route. If no, remove any references to it.

---

### 3. Trial Availability Check — 401 Unauthorized
**Flow:** /start page loads → trial slot counter attempts to fetch availability → fails

**Error:** `Failed to load resource: 401 ()`  
**Endpoint:** `https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/check-trial-availability`

**Impact:** The "25 trial slots available this week" scarcity messaging may be showing stale or fake data. Users cannot trust the trial availability indicator.

**Fix:** Verify the Supabase anon/service role key being sent to the edge function. The function may require authentication that the frontend is not providing.

---

### 4. Exposed Google API Key (Security)
**Location:** Frontend JavaScript on /competitor-analysis  
**Key prefix:** `AIzaSy...L62A`  
**Exposure:** Full API key visible in browser devtools Network tab and page source

**Impact:**
- Anyone can scrape and abuse this key
- Potential for quota theft, unexpected billing, or API suspension
- Violates Google Cloud API key security best practices

**Fix:** Immediately rotate the key. Move all Google API calls to a server-side proxy.

---

## 🟡 CONFUSING FLOWS

### 1. Inconsistent Trial Duration Messaging
**Pricing page:** "14-day free trial" (appears 5+ times across all plan CTAs)  
**/start page:** "7 days, all features, no credit card required" and "7-day full feature trial"

**Impact:** Users will be confused about how long their trial actually lasts. This creates trust issues and potential chargeback/dispute risk.

**Fix:** Standardize on one duration (14 days or 7 days) across all pages. The pricing page currently says 14 days; the signup page says 7 days.

---

### 2. Plan Count Mismatch on Pricing Page
**Heading:** "Three plans. Pick what fits."  
**Actual plans shown:** 4 (Core, Pro, Growth, Unlimited)

**Impact:** Users may think they're missing a plan, or the heading is outdated.

**Fix:** Change heading to "Four plans. Pick what fits." or remove one plan if the intent is truly 3.

---

### 3. /portal Returns Homepage Content
**URL:** https://whoza-ai-staging.netlify.app/portal  
**Result:** HTTP 200 but renders homepage content instead of a dashboard/portal 🔴🟡

**Impact:** If users click "Portal" expecting a logged-in dashboard, they get the homepage instead. This could be intentional (unauthenticated redirect) but should be verified.

**Fix:** If /portal requires auth, return a 302 redirect to /start?mode=signin rather than silently rendering the homepage.

---

### 4. detect-country Netlify Function — 404 on Every Page
**Error:** `Failed to load resource: 404 ()`  
**Endpoint:** `https://whoza-ai-staging.netlify.app/.netlify/functions/detect-country`  
**Occurs on:** Every page load (homepage, pricing, competitor-analysis, start, etc.)

**Impact:** Likely breaks geolocation-based features (currency, local content, region detection). Each page load generates a console error which looks unprofessional.

**Fix:** Either restore the detect-country function or remove the frontend code that calls it.

---

### 5. Password Field Missing autocomplete Attribute
**Location:** /start and /start?mode=signin  
**Warning:** `[DOM] Input elements should have autocomplete attributes (suggested: "current-password")`

**Impact:** Minor UX issue — browsers cannot autofill passwords, password managers may struggle.

**Fix:** Add `autocomplete="current-password"` to signin password field and `autocomplete="new-password"` to signup password field.

---

### 6. Browser Tab Redirects During Testing
**Observation:** During automated browser testing, tabs occasionally redirected to unexpected pages (e.g., /blog or /contact) when attempting to interact with form elements.

**Impact:** This may indicate SPA router issues where click events are being captured by the wrong handlers, or event bubbling problems.

**Fix:** Review the SPA router configuration and event delegation to ensure clicks on form elements don't trigger unintended navigation.

---

## 🟢 SMOOTH FLOWS

### 1. Static Page Rendering — All Green
All public pages return HTTP 200 and render correctly:

| Page | Status | Title |
|------|--------|-------|
| / | ✅ 200 | Whoza.ai — See Who AI Recommends for Your Trade |
| /pricing | ✅ 200 | AI Search Optimization Pricing for Tradespeople |
| /competitor-analysis | ✅ 200 | Free Competitor Analysis |
| /start | ✅ 200 | Start Your AI Search Optimization |
| /start?mode=signin | ✅ 200 | Start Your AI Search Optimization |
| /how-it-works | ✅ 200 | How AI Search Optimization Works |
| /blog | ✅ 200 | AI Visibility Guides for Tradespeople |
| /case-studies | ✅ 200 | AI Search Optimization Results |
| /contact | ✅ 200 | Contact Us |
| /trust | ✅ 200 | Trust & Security |
| /privacy | ✅ 200 | Privacy Policy |
| /terms | ✅ 200 | Terms of Service |
| /cookie-policy | ✅ 200 | Cookie Policy |

---

### 2. Navigation Links — All Functional
**Header nav:** Product, Pricing, About, Log In, See Your Score — all link to correct URLs  
**Footer nav:** All 12+ links present and functional (Product, Company, Contact sections)  
**Site nav:** Secondary navigation with location/trade pages all present

---

### 3. Pricing Page Structure
- 4 pricing tiers displayed clearly (Core, Pro, Growth, Unlimited)
- Monthly/Annual toggle present
- Feature comparison table renders correctly
- "Start Free Trial" CTAs on all tiers
- FAQ accordion present

---

### 4. Signup/Signin Form Structure
**Signup (/start):**
- Sign up / Sign in toggle works
- Google SSO button present
- LinkedIn SSO button present
- Email + Password fields present
- "Continue to next step" button present
- Privacy Policy + Terms links present
- Security messaging present

**Signin (/start?mode=signin):**
- Email + Password fields present
- "Remember me" checkbox present
- "Forgot password?" link present
- Sign in button present
- "Need an account? Sign up" link present

---

### 5. Mobile Viewport — Responsive
**Tested at:** 375×812 (iPhone X dimensions)

- Competitor analysis form renders correctly on mobile ✅
- Signup form renders correctly on mobile ✅
- Navigation collapses to hamburger menu ✅
- All text readable without horizontal scroll ✅
- CTA buttons appropriately sized for touch ✅

---

### 6. Blog Page Content
- 15+ articles listed with titles, excerpts, and "Read more" links
- Articles cover UK and US trades, local SEO, AI visibility
- Breadcrumb navigation present
- CTA footer present ("Check My Competitor")

---

### 7. Cookie Consent Banner
- Present on all pages
- "Accept all", "Reject non-essential", "Manage preferences" options
- Link to Cookie Policy
- Accessible dialog element

---

### 8. Footer Consistency
- Same footer structure across all tested pages
- Company info: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN, Scotland · SC874716
- ICO Registered · GDPR Compliant badges
- Contact: support@whoza.ai

---

## Edge Cases Tested

| Edge Case | Result | Notes |
|-----------|--------|-------|
| Empty business name submission | 🟡 | Form allows empty submission; no client-side validation visible on required fields |
| Invalid email format | Not tested | Could not complete form submission due to CORS issue |
| Duplicate signup | Not tested | Would require successful signup first |
| Back button behavior | 🟡 | SPA may not handle back button gracefully for multi-step signup |
| Invalid password (< 6 chars) | 🟡 | Hint says "At least 6 characters" but no live validation observed |
| Direct /portal access | 🟡 | Returns homepage content (should redirect to login) |
| /admin/trials access | 🔴 | 404 Not Found |

---

## Console Errors Summary

| Error | Pages Affected | Severity |
|-------|---------------|----------|
| `detect-country` 404 | All pages | Medium |
| Google Places API CORS blocked | /competitor-analysis | **Critical** |
| `check-trial-availability` 401 | /start | High |
| Missing autocomplete attribute | /start, /start?mode=signin | Low |

---

## Recommendations (Priority Order)

### P0 — Fix Before Any Traffic
1. **Rotate exposed Google API key** immediately
2. **Move Google Places API calls to backend proxy** (Netlify function or Supabase edge function)
3. **Fix competitor analysis form submission** — this is the primary lead-gen funnel

### P1 — Fix Before Launch
4. **Fix /admin/trials 404** or remove references
5. **Fix check-trial-availability 401** — trial scarcity messaging must be accurate
6. **Standardize trial duration** across pricing and signup pages (14 days vs 7 days)
7. **Fix pricing page heading** — "Three plans" vs 4 plans shown

### P2 — Polish
8. **Remove or fix detect-country function call**
9. **Add autocomplete attributes** to password fields
10. **Improve /portal behavior** — redirect unauthenticated users to login instead of showing homepage
11. **Add client-side form validation** to competitor analysis form (required fields, email format)

---

## Test Environment Notes

- Browser: Chromium (via OpenClaw browser automation)
- Viewports tested: Desktop (default), Mobile (375×812)
- Tools used: Browser automation (click, type, snapshot, console), web_fetch for static analysis
- Limitations: Could not complete actual signup due to not having a valid test email/Supabase auth configuration; SSO flows (Google/LinkedIn) were not tested end-to-end
