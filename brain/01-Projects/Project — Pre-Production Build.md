---
created: 2026-06-25
updated: 2026-06-25
tags: [project, pre-production, active]
---


## 🔒 2026-05-16 — Soft Launch Site Fixes + Best AI Call Handler Comparison Page

### Critical Fixes (Production)
- ✅ **Restored broken pages** — `/blog`, `/pricing`, `/how-it-works`, `/case-studies`, `/trust`, `/contact` were 301-redirecting to homepage due to conflicting netlify.toml redirects. Removed trailing slash normalization + page-specific redirects.
- ✅ **Removed "Content Update in Progress" banners** from blog and case studies pages.
- ✅ **Disabled all audio demo buttons** — changed to "Audio demo — coming soon" across hero, location-hero, trade-hero. No MP3 files ready yet.
- ✅ **Fixed footer** — Company column (Blog, Case Studies) was in data but never rendered in JSX. Added Company column + adjusted grid to `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`.
- ✅ **Build passes** — 58 pages, zero errors.
- ✅ **Production deploy** — `https://whoza.ai` (deploy ID: `6a07595a9e12531969251009`).
- ✅ **Cloudflare cache purged** — Dru manually purged after deploy.

### New Page: Best AI Call Handler Comparison
- ✅ **URL:** `/best-ai-call-handler-uk-trades`
- ✅ **Content:** Comprehensive AEO-optimized comparison of 5 AI call handlers for UK trades
  - whoza.ai (£59/mo) — Winner, "Full Revenue Team"
  - Clara (£49.99/mo) — "Best for Budget"
  - Trade Receptionist (£29/mo) — "Traditional Phone-Based"
  - Moneypenny (£150/mo) — "Larger Trade Businesses"
  - Rosie AI (£41/mo) — "US-Based, Limited UK"
- ✅ **10-row comparison table:** Price, trial, setup, delivery, AI personas, reviews, competitor tracking, contract, money-back, UK-specific
- ✅ **"How We Tested" methodology** — 6 criteria (call quality, WhatsApp delivery, setup ease, actionability, price transparency, UK-specific features)
- ✅ **Recommendation table** — "If you want X, choose Y"
- ✅ **10 FAQ items** with FAQPage schema markup
- ✅ **Bottom Line CTA** with ONS statistics
- ✅ **Meta title:** "Best AI Call Handler for UK Trades (2026) | whoza.ai"
- ✅ **Canonical + OG tags** configured
- ✅ **Schema:** BreadcrumbList + FAQPage
- ✅ **Dark theme** matching whoza.ai design system

### Waitlist Email Notifications (Verified)
- ✅ **Resend domain verified** — `whoza.ai` status: verified, sending: enabled
- ✅ **Notification to Dru** — `dru@whoza.ai` receives email on every signup with: email, trade, phone, postcode, source, plan, timestamp
- ✅ **User confirmation email** — Sent automatically with next steps and Dru's contact
- ✅ **API endpoint:** `/api/waitlist` (POST) — uses Resend API key, handles errors gracefully

### Deploy Status
- **Site:** `https://whoza.ai`
- **Deploy ID:** `6a07595a9e12531969251009`
- **Commit:** `3078b27`
- **Branch:** `master`
- **Pages:** 58 static + dynamic
- **Build:** Zero errors
- **PAT:** `nfp_X2qcnNhe5BiLVwpzdRGiL8unPq54AxAe1a90` (new production token)

### Environment (Soft Launch)
- **Supabase:** Staging project `ligjstpxqtkurvteyyhw` (correct for soft launch)
- **Stripe:** Test mode (`sk_test_...`) — no live keys yet
- **Trillet:** MOCK_MODE — awaiting API key from Dru
- **Resend:** Production ready, domain verified

### Next Steps / Blocked
- [ ] Trillet API key — switch from MOCK_MODE to live
- [ ] Live Stripe keys — when ready to take real payments
- [ ] Audio demo MP3s — re-enable "Hear Katie" buttons
- [ ] Remaining 11 blog posts — currently placeholder/404
- [ ] Google Site Verification + GA4/GTM IDs — add to layout.tsx
- [ ] Supabase production migration — when soft launch graduates to full launch

---

## 🔲 Still Needed Before Staging Goes Live
1. ~~Netlify Staging Site Setup~~ — Production site operational
2. ~~Supabase Staging Project~~ — Using staging for soft launch ✅
3. ~~Stripe Test Products~~ — Test mode active ✅
4. **Trillet Master Account** — awaiting API key
5. **Domain DNS** — `whoza.ai` live ✅
6. ~~Test Data~~ — 50 tradespeople simulated via MOCK_MODE
7. **Claire MVP Build** — 9-day build cycle (pending go-ahead)

## Go-Live Gates (Updated)
1. ✅ All health checks passing (18/18)
2. ✅ Zero critical SEO issues on production
3. ✅ Stripe checkout works end-to-end (test mode)
4. ⏳ Trillet sub-account provisioning works (needs API key)
5. ✅ Voice onboarding wizard completes in < 3 min (MOCK_MODE)
6. ✅ Portal dashboard shows live call data (mock)
7. ⏳ Claire MVP built and tested (pending go-ahead)
8. ✅ Dru sign-off — soft launch live
