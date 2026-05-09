---
created: 2026-04-29
updated: 2026-04-29
tags: [research, web, seo, ux]
source: "Site audit, user experience analysis, competitor benchmarking"
credibility: high
---

# Research — Site Analysis & Enhancements

## Summary
The whoza.ai site is technically functional with clear value proposition, working competitor analysis tool, and proper auth/checkout. However, it suffers from critical engagement gaps explaining the 24 clicks in 90 days from Google Search.

## Critical Issues (Fix This Week)

### 1. FAQ Answers Showing TWICE to Users
**Severity: HIGH | Effort: 30 min**

The dual-visibility FAQ approach (for SEO crawling) displays both the accordion answer AND a visible duplicate answer to every user.

**Fix:** Wrap visible answer in `<noscript>` so it only appears for crawlers without JavaScript:
```jsx
<noscript>
  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
    <span itemProp="text">{faq.answer}</span>
  </div>
</noscript>
```

### 2. Video Shows Fallback Text in Some Browsers
**Severity: MEDIUM | Effort: 15 min**

Browser doesn't support H.264 playback. Real users on older Android devices may also see this.

**Fix:** Add WebM fallback + poster image:
```html
<video poster="/video-poster.jpg">
  <source src="/whoza-explainer.webm" type="video/webm">
  <source src="/whoza-explainer.mp4" type="video/mp4">
</video>
```

### 3. Competitor Analysis Has No Loading State
**Severity: HIGH | Effort: 1 hour**

When user submits competitor analysis form, no visual feedback. Users think the site is broken.

**Fix:** Show `LoadingScreen` component immediately after form submission — *before* API calls start.

## High-Impact Engagement Enhancements

### 4. "Before/After" AI Answer Hero Section
**Impact: VERY HIGH | Effort: 2 hours**
**Status: ✅ DONE** — Lost Revenue Calculator repositioned below video explainer with priming stats (62%/85%/78%)

### 5. More Social Proof on Homepage
**Impact: HIGH | Effort: 1 hour**
**Status: ✅ DONE** — Trade icons band (10 trades) replaced compliance badges. Real Google reviews already imported.

### 6. Email Capture Without Competitor Analysis
**Impact: HIGH | Effort: 2 hours**
Only email capture is via the high-friction competitor analysis tool.

**Fix:** Add low-friction email signup: "Get weekly tips on getting found by AI search."

## Medium-Impact Optimizations
- Add trade-specific case studies to homepage
- Improve mobile CTA visibility (sticky button)
- Add "Missed Call Calculator" widget
- Optimize page load speed (images, JS bundles)
- Add exit-intent popup for email capture

## Resources
- Full analysis: [[SITE_ANALYSIS_AND_ENHANCEMENTS.md]] (flat file, 13KB)
- SEO tracking: [[SEO_FIX_PLAN.md]] (flat file)
- Competitor intel: [[COMPETITIVE_INTELLIGENCE_REPORT.md]] (flat file)

## Related
- [[Project — SEO Remediation]] — Active fixes
- [[Project — Pre-Production Build]] — Where enhancements are built
- [[Process — SEO Audit]] — Recurring check
- [[Index — Research]]
