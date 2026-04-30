# whoza.ai Staging Site — UX/Design Audit

**URL:** https://whoza-ai-staging.netlify.app  
**Date:** 2026-04-30  
**Audited Pages:** /, /pricing, /competitor-analysis, /start, /how-it-works, /blog, /case-studies, /contact, /trust  
**Viewports Tested:** 375px (mobile), 768px (tablet), 1440px (desktop)

---

## 🔴 CRITICAL ISSUES

### 1. Two Pages Completely Broken — Stuck in "Loading..." State
| Page | Status |
|------|--------|
| `/case-studies` | 🔴 Stuck in loading — only shows spinner + site nav |
| `/trust` | 🔴 Stuck in loading — only shows spinner + site nav |

**Details:** Both pages display a `role="status"` loading spinner that never resolves. On `/case-studies`, the loading text **contains raw CSS code** (`.logo-text { font-family: 'Inter'... }`) — this suggests the loading component is rendering stylesheet content as text. These pages are completely unusable.

**Impact:** Users cannot access case studies or trust/security information. Breaks credibility for a B2B SaaS.

---

### 2. Duplicate H1 Headings on Every Single Page
Every audited page has **two `<h1>` elements**, which violates WCAG heading hierarchy and confuses screen readers + search engines:

| Page | H1 #1 | H1 #2 |
|------|-------|-------|
| `/` | "See How AI-Searchable Your Trade Business Is" | "Whoza.ai — See Who AI Recommends for Your Trade" |
| `/pricing` | "Three plans. Pick what fits." | "AI Search Optimization Pricing for Tradespeople" |
| `/competitor-analysis` | "Check Your AI Visibility Score" | "Why Is My Business Not in ChatGPT? Free Competitor Analysis" |
| `/start` | "Start Your Free Trial" | "Start Your AI Search Optimization" |
| `/how-it-works` | "How it works" | "How AI Search Optimization Works for Tradespeople" |
| `/blog` | "AI Visibility Blog" | "AI Visibility Guides for Tradespeople" |
| `/contact` | "Get in Touch" | "Contact Us" |
| `/trust` | "Trust and privacy" | "Trust & Security" |

**Root cause:** The second H1 appears inside the hidden site navigation (`<nav>`) that is visually hidden but not removed from the accessibility tree. This is likely an SEO nav pattern gone wrong — the nav is `display: none` or visually hidden but still rendered in the DOM as an H1.

**Impact:** Screen reader users hear two competing page titles. Search engines get conflicting signals about page topic. WCAG 2.4.6 violation.

---

### 3. Horizontal Overflow on Mobile & Tablet
| Viewport | docWidth | windowWidth | Overflow |
|----------|----------|-------------|----------|
| 375px mobile | 407-595px | 375px | ✅ Yes |
| 768px tablet | 816px | 768px | ✅ Yes |
| 1440px desktop | 1426px | 1440px | ❌ No |

**Root cause:** The pricing comparison table (`<table>`) is 563px wide at mobile — forcing horizontal scroll. On homepage, some element overflows by ~30px.

**Impact:** Mobile users must pinch-zoom and scroll horizontally. Poor mobile UX. Breaks responsive design promise.

---

### 4. Massive Inline Style Regressions
| Page | `[style]` attributes |
|------|----------------------|
| `/pricing` | **367** |
| `/trust` | 119 |
| `/how-it-works` | 73 |
| `/contact` | 67 |
| `/start` | 58 |
| `/competitor-analysis` | 69 |
| `/blog` | 3 |
| `/` | 5 (on some loads) |

**Details:** The pricing page has **367 inline style attributes** — this indicates either: (a) runtime JS injecting styles directly, (b) a build tooling issue where CSS-in-JS is falling back to inline styles, or (c) third-party widget injection. The DS classes exist alongside these (`ds-btn`, `ds-container`, etc.) but inline styles override them.

**Impact:** Breaks design system consistency. Makes theming/debugging impossible. Hurts performance (larger HTML payload). Suggests unstable rendering pipeline.

---

### 5. Inconsistent/Empty Page Titles
| Page | Expected Title | Actual Title (some loads) |
|------|---------------|---------------------------|
| `/start` | "Start Your Free Trial — Whoza.ai" | "Whoza.ai — See Who AI Recommends for Your Trade" (generic) |
| `/blog` | "AI Visibility Blog — Whoza.ai" | "Whoza.ai — See Who AI Recommends for Your Trade" (generic) |
| `/case-studies` | "Case Studies — Whoza.ai" | "Whoza.ai — See Who AI Recommends for Your Trade" (generic) |
| `/trust` | "Trust & Security — Whoza.ai" | "Whoza.ai — See Who AI Recommends for Your Trade" (generic) |
| `/competitor-analysis` | "Free Competitor Analysis — Whoza.ai" | Sometimes shows generic title |

**Impact:** Browser tabs all look identical. Bookmark confusion. SEO title dilution. Social sharing previews broken.

---

### 6. All Site Navigation Links Point to PRODUCTION Domain
Every page's hidden site navigation contains links to `https://whoza.ai/` instead of the staging domain:

```html
<a href="https://whoza.ai/pricing/">Pricing</a>
<a href="https://whoza.ai/case-studies/">Case Studies</a>
<!-- etc -->
```

**Impact:** If users navigate via these links (e.g., via screen reader rotor, or if the nav becomes visible), they silently leave the staging environment and land on production. Also means any staging-only changes are invisible when testing navigation flows.

---

## 🟡 MODERATE ISSUES

### 7. Pricing Inconsistencies Across Pages
| Source | Price Mentioned |
|--------|----------------|
| Homepage hero | "Plans from £59/month inc VAT" + "Unlimited £149/mo" |
| Homepage FAQ | "£49/month plan" (doesn't exist) |
| Pricing page | Core £59, Pro £99, Growth £169, Unlimited £249 |
| Start page trial | "7 days" (hero says "14-day free trial") |

**Impact:** Users see conflicting pricing. The £49/month plan is referenced in FAQ but doesn't exist. The 7-day vs 14-day trial discrepancy creates confusion about what's actually offered.

---

### 8. Extremely Small Touch Targets (Mobile)
Multiple interactive elements are well below the 44×44px WCAG minimum:

| Element | Size | Location |
|---------|------|----------|
| `BUTTON.w-3` | **19×7px** | Homepage testimonial carousel dots |
| `BUTTON.w-3` | **16×6px** | Homepage testimonial carousel dots |
| `A.text-sm` | ~31-59×17px | Footer/site nav links |
| Skip link | 133×17px | Hidden until focused |
| `A.flex` | 303×40px | Header logo link (height marginal) |

**Impact:** Mobile users will struggle to tap carousel controls and small footer links. WCAG 2.5.5 violation.

---

### 9. Blog Page Lacks Header, Footer, and Cookie Consent
The `/blog` page is structurally different from all other pages:
- No `<header>` banner with navigation
- No `<footer>` with company info, contact, copyright
- No cookie consent dialog
- No DS classes at all
- Breadcrumb nav present but different pattern

**Impact:** Inconsistent user experience. Users landing on blog posts lose navigation context. No way to sign up/convert from blog. Looks like a different site.

---

### 10. Duplicate Article Titles in Blog
Two articles share the same title:
1. "Electrician's Guide to Google AI Overviews" (multiple instances)
2. "How to Create an FAQ Page AI Can Find" (multiple instances)

**Impact:** SEO cannibalization. Users can't distinguish between articles. Suggests content management issue or auto-generation gone wrong.

---

### 11. Contact Page Has No Contact Form
The `/contact` page only shows:
- Email link (support@whoza.ai)
- Company address
- FAQ accordion

There is **no contact form**, no phone number, no live chat, no Calendly booking embed — despite the "Can I schedule a call or demo?" FAQ saying to email them.

**Impact:** High-friction contact path. Users who prefer forms (or want to provide detailed info) have no option. Conversion drop-off.

---

### 12. Cookie Consent Dialog Issues
- Dialog is a `<dialog>` element but **blocks interaction** on some pages
- "Accept all cookies" button caused unexpected navigation to `/pricing` in testing
- Dialog persists across page loads (not dismissed after acceptance)
- Not present on `/blog` at all

**Impact:** Users may accidentally navigate away when trying to dismiss cookies. Frustrating repeat prompts. Potential GDPR compliance issue if preferences aren't persisted.

---

### 13. Address Format Inconsistency
Contact page shows:
> "6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom"

The "6" is duplicated. Footer shows the cleaner:
> "6 Atholl Crescent, Perth, PH1 5JN"

**Impact:** Unprofessional. Suggests data quality issues.

---

### 14. Missing Alt Text on Functional Images
While `imagesWithoutAlt` returned 0 in programmatic checks (because decorative images may use `aria-hidden`), manual snapshot review shows:
- Checkmark icons in pricing comparison table have no accessible text
- "Most Popular" star icon in Pro plan
- Social proof icons ("4.9/5", "94% keep") use `img` with text labels but no alt
- Menu button icon (`img` inside hamburger button) lacks alt

**Impact:** Screen reader users hear "image" with no context for table checkmarks. WCAG 1.1.1 violation.

---

### 15. Floating CTA Element Outside Main Content Flow
Homepage has a floating CTA link "Check My Score — Free" (`e320`) that appears after the footer and outside `<main>`. It has no containing section or landmark.

**Impact:** Screen reader users navigating by landmarks will miss this. Tab order may jump unexpectedly.

---

## 🟢 MINOR ISSUES

### 16. Inconsistent DS Class Adoption
| Page | DS Classes Found |
|------|-----------------|
| `/pricing` | 12 (`ds-btn`, `ds-badge`, `ds-heading-hero`, etc.) |
| `/start` | 6 (`ds-card`, `ds-heading-3`, etc.) |
| `/how-it-works` | 3 |
| `/contact` | 3 |
| `/trust` | 3 |
| `/blog` | 0 |
| `/` | 0-3 (variable) |
| `/competitor-analysis` | 0-12 (variable) |

**Details:** The design system is inconsistently applied. Some pages use `ds-*` classes heavily, others not at all. The homepage and blog appear to bypass the DS entirely, suggesting parallel component libraries or legacy markup.

---

### 17. Footer Headings Use H4 for Section Titles
Footer sections ("Product", "Company", "Contact") use `<h4>` — while semantically correct for depth, there's no H2/H3 on the page preceding them in the footer context.

**Impact:** Screen reader heading navigation shows footer sections mixed with content headings. Minor heading hierarchy quirk.

---

### 18. Testimonial Carousel Buttons Unlabeled
The testimonial navigation buttons ("Testimonial 1", "Testimonial 2", etc.) are present but the small dot indicators (`BUTTON.w-3`) have no accessible labels.

**Impact:** Screen reader users don't know what the dots do. Sighted mobile users can't tap them reliably (see #8).

---

### 19. Pricing Table Caption Present But Long
The comparison table has a `<caption>` which is good for accessibility, but the caption text is long enough to be unwieldy for screen readers.

---

### 20. Hidden H1 in Site Nav Contains Staging-Sensitive Content
The hidden site navigation H1 ("AI Search Optimization Pricing for Tradespeople" on pricing, etc.) is rendered in the DOM but hidden with CSS. If CSS fails to load, users see a second H1 and a massive link list.

**Impact:** Graceful degradation failure. FOUC (flash of unstyled content) would expose SEO nav.

---

## Summary by Category

### Visual Design
- ✅ Brand color (green `#9ef01a`) consistent across focus states, badges, CTAs
- ✅ Clean typography hierarchy (when H1 duplication fixed)
- ❌ Inline style chaos undermines design system
- ❌ Inconsistent page layouts (blog missing header/footer)

### Mobile UX
- ❌ Horizontal scroll on mobile & tablet (pricing table, homepage overflow)
- ❌ Touch targets below 44px (carousel dots, footer links)
- ✅ Hamburger menu present
- ✅ Viewport meta tag correct
- ❌ Table not responsive (no horizontal scroll container)

### Accessibility
- ❌ Duplicate H1 on every page (WCAG 2.4.6)
- ❌ Missing alt text on functional images (WCAG 1.1.1)
- ✅ Focus states visible (green outline + glow)
- ✅ Skip link present
- ❌ Small touch targets (WCAG 2.5.5)
- ✅ `#main-content` target exists on most pages
- ❌ Form inputs on `/start` need label verification

### Animations/Motion
- ⚠️ Loading spinners on broken pages never resolve
- ⚠️ Cookie dialog animation caused navigation bug in testing
- ✅ No excessive motion detected

### Loading States
- ❌ `/case-studies` and `/trust` permanently loading
- ❌ CSS code visible in loading spinner text
- ✅ Other pages load reasonably fast

### Design System Consistency
- ❌ Inline styles (367 on pricing) override DS classes
- ❌ DS classes missing on blog and homepage
- ❌ Variable DS adoption across pages
- ⚠️ Suggests multiple component libraries or build issues

---

## Recommended Priority Fixes

1. **Fix `/case-studies` and `/trust` loading** — investigate why these pages hang. The CSS-in-loading-text bug suggests a component rendering issue.
2. **Remove duplicate H1 from site nav** — the hidden nav H1 should be a `<p>` or `<span>` with `role="text"`, or the nav should use `aria-hidden` properly.
3. **Fix pricing table overflow** — wrap the comparison table in a `overflow-x: auto` container for mobile.
4. **Consolidate page titles** — each page should have a unique, descriptive `<title>`.
5. **Fix staging nav links** — change `https://whoza.ai/` to relative paths or staging domain.
6. **Enlarge touch targets** — carousel dots should be 44×44px minimum.
7. **Add alt text to table checkmarks** — use `aria-label` or visually hidden text.
8. **Fix pricing inconsistencies** — align all price mentions to actual plans.
9. **Add header/footer to blog** — maintain site-wide navigation consistency.
10. **Investigate inline styles** — 367 inline styles on pricing suggests a build/runtime bug.

---

*Audit performed via browser automation on staging environment. Some results may vary based on CDN caching, JS execution timing, or A/B test bucketing.*
