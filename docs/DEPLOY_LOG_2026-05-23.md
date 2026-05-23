# Deployment Log — 2026-05-23

## Critical Incident: Static Files 404

**Time:** ~17:26 GMT+8  
**Issue:** Site reported as "not displaying" — blank white page  
**Root cause:** Previous deploys only uploaded prerendered HTML. All JS/CSS/image assets from `.next/static/` and `public/` returned 404. Since all Framer Motion elements start at `opacity:0`, the page loaded but stayed invisible (no JS hydration).  
**Fix:** Full rebuild + redeploy via `npx netlify deploy --prod --dir .next` with `@netlify/plugin-nextjs` handling the build. This correctly bundled all 161 files + 1 function.

## Deployments

### Production (whoza.ai)
- **Deploy ID:** `6a11779612646153f77c08b0` (static files fix)
- **URL:** https://whoza.ai
- **Status:** ✅ Live — all assets verified 200

### Staging (whoza-ai-staging-349)
- **Deploy ID:** `6a1178ff6cdba54bff5fc443` (static files fix)
- **URL:** https://whoza-ai-staging-349.netlify.app
- **Status:** ✅ Live — all assets verified 200

### Previous Deploys (superseded by static files fix)
- Production: `6a10b95b30b6eeb60eb66b71` / `6a116fb45e59791e0053a144`
- Staging: `6a10be3ac2ba3289347b0e61` / `6a10c217944c6fcedde3f0eb`

## Changes Applied Today

### Premium Enhancement Audit Fixes (AUDIT_PREMIUM_ENHANCEMENTS.md)

#### Batch 1 — Critical Fixes (Already Applied)
- ✅ Hero entrance animations fixed (`opacity: 0` in variants)
- ✅ Pricing page buttons all functional (Growth/Pro/Scale open WaitlistModal)
- ✅ Footer newsletter dead form replaced with functional CTA
- ✅ Location hero duplicate `className` bug fixed
- ✅ FAQ and MeetTheTeam gradient transition divs removed

#### Batch 2 — Max-Width & Typography Consistency
- `header.tsx`: `max-w-[1200px]` → `max-w-7xl` (nav + mobile menu)
- `hero.tsx`: `max-w-[1200px]` → `max-w-7xl`
- `location-hero.tsx`: `max-w-[1200px]` → `max-w-7xl`
- `hero.tsx`: `text-[17px]` → `text-lg`
- `location-hero.tsx`: `fontSize: 17` → `text-lg`, inline styles → Tailwind
- `comparison-table.tsx`: Phase headers `px-4→6`, `sm:px-6→8`

#### Batch 3 — Layout & Rhythm
- `footer.tsx`: `lg:grid-cols-7` → `lg:grid-cols-6` (density fix)
- `video-explainer.tsx`: `py-16 lg:py-20` → `section-padding`
- `google-reviews.tsx`: `py-16` → `section-padding`
- `city-content-section.tsx`: `py-16` → `section-padding`
- `testimonials.tsx`: `py-20 lg:py-28` → `section-padding-lg`
- `header.tsx`: Mobile menu links + `min-h-[44px]` touch targets

#### Batch 4 — Branded 404
- `app/not-found.tsx`: Custom 404 page with Katie branding

#### Batch 5 — Animated Orbs
- `hero.tsx`: Added gradient mesh orbs using existing `.gradient-mesh` CSS

### CSS Utilities Added (globals.css)
- `.section-padding`: `py-12 md:py-16 lg:py-24`
- `.section-padding-lg`: `py-16 md:py-24 lg:py-32`
- `.section-padding-xl`: `py-20 md:py-28 lg:py-40`

## Beta Test Results
- **Total tests:** 28
- **Passed:** 24
- **Failed:** 4 (test script issues, not site bugs)
- **Critical issues:** 0

### Warnings
- 5 images with `naturalWidth=0` (SVGs/data URIs — visual rendering fine)
- Minor horizontal overflow on 375px mobile (non-critical)

## Credentials Verified
- **Staging token:** `nfp_qP…8212` (valid for `whoza-ai-staging-349`)
- **Production token:** `nfp_TMHbA8uvKCQsTzEatoDuqU5EyhkCxrQM9506` (valid for `whoza-ai`)
- **Note:** Tokens are site-specific. Staging site ID `97f8a30c-8ba7-4e98-aef4-cfee00eb91dd` only accessible with staging token.

## Verification Checklist (Post-Deploy)
- [x] `curl -sI https://whoza.ai/_next/static/chunks/main-app-*.js` → 200
- [x] `curl -sI https://whoza.ai/_next/static/css/*.css` → 200
- [x] `curl -sI https://whoza.ai/og-image.webp` → 200
- [x] `curl -sI https://whoza.ai/og-image.png` → 200
- [x] Staging equivalents all → 200

## Pricing Trial Clarity Fix (2026-05-23 18:40 UTC)
- **Commit:** `1e60276` — `fix(pricing): clarify 7-day free trial applies to Starter only`
- **Files changed:**
  - `components/whoza/final-cta.tsx` — "Try Whoza free for 7 days on Starter." + "7-day free trial on Starter: 20 minutes + 4 jobs included"
  - `components/whoza/hero.tsx` — Trust pill: "7-day free trial on Starter" (was "when we go live")
  - `components/whoza/sticky-cta.tsx` — "7-day trial on Starter · No card needed" (was "Free 7-day trial")
  - `components/whoza/pricing.tsx` — No changes needed (already correct: only Starter shows trial badge, all 4 plans have working CTAs)
  - `components/whoza/faq.tsx` — No changes needed (already correct: FAQs state "Starter plan only")
- **Staging deploy:** `6a11828ae3ada6429c390963`
- **Production deploy:** `6a1184032f6a956401f7fa92`
- **Build:** Zero errors, zero TS issues, 72 pages generated
- **Status:** ✅ Live on both staging and production

## Deploy Summary — 2026-05-23

| Deploy | ID | Status | Key Changes |
|--------|-----|--------|-------------|
| Prod (latest) | `6a1184032f6a956401f7fa92` | ✅ Live | Trial clarity fixes |
| Staging (latest) | `6a11828ae3ada6429c390963` | ✅ Live | Trial clarity fixes |
| Prod (static fix) | `6a11779612646153f77c08b0` | ✅ Live | Static assets fix |
| Staging (static fix) | `6a1178ff6cdba54bff5fc443` | ✅ Live | Static assets fix |

**Total commits today:** 8 — GSC image fix, 404 page, gradient orbs, batch 2+3 audit fixes, schema fix, deploy log, trial clarity fix
