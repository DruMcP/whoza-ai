---
created: 2026-05-01
updated: 2026-05-01
tags: [log, deploy, bugfix, logo-band]
---

# May 1, 2026 — Logo Band Deploy + Critical Bugfix

## What happened

**Dru's directive:** "Build and deploy logo band first"

**Issue found during audit:** Staging site was completely broken — React app crashing with Sentry error boundary "Something went wrong" (Error IDs: ERR-1777580184797, ERR-1777580225558, ERR-1777580225558).

**Root cause:** `src/pages/Home.jsx` was using `<LostRevenueCalculator />` component but the import statement was missing. This caused a ReferenceError at runtime, crashing the entire React app before any components could render.

**Fix:** Added `import LostRevenueCalculator from '../components/LostRevenueCalculator';` to `Home.jsx`.

## Deploy Log

| Step | Status | Detail |
|------|--------|--------|
| Build | ✅ Pass | `npm run build` — 97 pages prerendered, 203 URLs in sitemap |
| Deploy | ✅ Live | Netlify staging — `69f3b99b19183ded43a9a64e` |
| URL | ✅ | https://whoza-ai-staging.netlify.app |

## Components Verified on Live Staging

All 15 homepage components rendering correctly:

1. ✅ **NewHero** — headline, CTAs, phone mockup, persona avatars
2. ✅ **SocialProofBand** — "Trusted by 2,800+ UK tradespeople" + trade icons
3. ✅ **StatsBand** — £2,400 / 94% / 4.9/5 / 1,200+ / Under 2 min
4. ✅ **TrustBadgeBand** — ICO, GDPR, Gas Safe, NICEIC, FMB badges
5. ✅ **ProblemSolution** — Before/after layout with checks
6. ✅ **LostRevenueCalculator** — 3 sliders, calculates weekly/monthly/yearly loss + CTA
7. ✅ **AudioDemoPlayer** — "Listen to Katie Handle a Real Enquiry" + transcript
8. ✅ **HowItWorks** — 3 steps (Enter details → Get score → Follow plan)
9. ✅ **DashboardPreview** — Live stats, activity feed, AI team status, bookings chart
10. ✅ **MeetTheTeam** — Katie, Mark, Rex, Claire cards with features
11. ✅ **IntegrationLogoBand** — 11 integration logos in scrolling marquee (Google, WhatsApp, Stripe, etc.)
12. ✅ **PricingTeaser** — Capture/Convert/Grow/Scale tiers with included jobs
13. ✅ **ComparisonTable** — whoza.ai vs VA vs call service vs voicemail
14. ✅ **TestimonialCarousel** — Mike Tanner testimonial + nav dots
15. ✅ **FAQAccordion** — 21 questions, all collapsible
16. ✅ **FinalCTA** — Should be at bottom (confirmed in page structure)

## Key Metrics

- **Build time:** 4.82s (Vite) + 5.4s (prerender) = ~10s total
- **Bundle size:** Main chunk 537KB (warning: larger than 500KB — code splitting needed)
- **Total pages:** 97 prerendered
- **Sitemap:** 203 URLs
- **Deploy time:** 18.8s

## Netlify Token Used

- **Token:** `nfp_6hyBaDqk23yU7pyREfQ3BgEEiZpDomLq78a5` (from brain/03-Reference/Netlify Auth Token.md)
- **Site ID:** `41e7051b-7603-43a3-bad2-0803bcb498f2`
- **Site name:** whoza-ai-staging

## Next Steps

- [ ] Consider code-splitting to reduce main bundle below 500KB
- [ ] Monitor for any console errors on staging
- [ ] Production deploy when Dru approves
