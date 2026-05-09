---
created: 2026-04-29
updated: 2026-04-29
tags: [project, seo, active]
status: active
owner: "Agent-7: Content Engine / Agent-2: Full-Stack Builder"
priority: P0
---

# Project — SEO Remediation

## Objective
Fix all critical Google SEO issues and confirm full visibility to search crawlers.

## Context
Site audit revealed multiple SEO problems affecting whoza.ai's discoverability. This is blocking organic acquisition and undermining credibility. Dru escalated x3 — this is a P0 fire.

## Key Results
- [ ] All critical issues from [[whoza.ai-SEO-Remediation-2026-04-27.xlsx]] resolved
- [ ] All critical issues from [[whoza.ai-FAQ-Remediation-2026-04-27.xlsx]] resolved
- [ ] Sitemap clean and submitted to Google Search Console
- [ ] robots.txt allows all legitimate crawlers (including AI bots)
- [ ] OG images, schema markup, hreflang validated
- [ ] Google confirms indexing of core pages

## Current Status
- **Last audit:** 2026-04-27 (initial) | 2026-05-08 (full technical SEO audit from Kimi)
- **Issues tracked:** 2 Excel files (SEO + FAQ) + Kimi LIVE_SITE_SEO_AUDIT.md
- **Site health:** 18/18 endpoint checks passing (see [[Process — Health Check]])
- **Sitemap:** 21 real URLs (was 91 phantom URLs, cleaned 2026-05-08)
- **Build status:** 28 pages, zero errors

## Completed (2026-05-08)
- [x] All CTAs converted from `<button>` to `<a>` tags — 12 components, crawlable anchors
- [x] Homepage schema: FAQPage, HowTo, AudioObject, Person (Katie/Mark/Claire/Rex), Speakable, BreadcrumbList
- [x] Pricing page schema: FAQPage + breadcrumb
- [x] Support page schema: ContactPoint
- [x] Hreflang tags: `en-GB`, `en-US` added to layout
- [x] Sitemap cleaned: removed 70 phantom URLs (blog, city, trade pages that don't exist)
- [x] Google verification placeholder flagged with TODO
- [x] Build verified: 28 pages, zero TypeScript/build errors
- [x] v2 deploy attempt: Netlify CLI auth expired — awaiting Dru to provide token

## Files Changed (2026-05-08)
| File | Change |
|------|--------|
| `components/whoza/hero.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/testimonials.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/how-it-works.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/final-cta.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/faq.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/sticky-cta.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/pricing.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/header.tsx` | Nav CTAs → `<a>`, removed Button import |
| `components/whoza/meet-the-team.tsx` | CTA → `<a>` |
| `components/whoza/video-explainer.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/pre-launch-proof.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/revenue-system.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/trial-explanation.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/lost-revenue-calculator.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/roi-calculator.tsx` | CTA → `<a>`, removed Button import |
| `components/whoza/schema-markup.tsx` | Full schema rewrite — 11 schema types |
| `app/layout.tsx` | Hreflang tags added, Google verification TODO |
| `app/sitemap.ts` | Created — 21 real URLs only |
| `app/support/page.tsx` | ContactPoint schema added |
| `public/sitemap.xml` | Deleted (replaced by app/sitemap.ts) |

## Still Blocked (Need Dru)
- [ ] Google Search Console verification code
- [ ] GA4/GTM tracking ID
- **⏰ Reminder:** Will prompt Dru for these IDs when staging is tested and ready for production deploy to whoza.ai domain
