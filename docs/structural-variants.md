# Structural Variant Map — /for-* Pages

**Date:** 2026-08-18
**Scope:** All 42 `/for-*` pages
**Method:** Automated component detection + H2 count

---

## Variant A — Full Hub Pages (7 pages)

**Pages:** `for-plumbers`, `for-electricians`, `for-roofers`, `for-builders`, `for-heating-engineers`, `for-locksmiths`, `for-painters-decorators`

**Characteristics:**
- Lines: 450–600
- H2 count: 4–6
- Components: Pain Points → VideoExplainer → Calculator → MeetTheTeam → Testimonials → ComparisonTable
- Have hero section with phone mockup
- Have pricing CTA section
- Have full FAQ (8 questions)
- Have related trades / city links
- Have testimonials/social proof

**QuickAnswer insertion point:** After hero, before Pain Points (after first `section-divider`)

---

## Variant B — City Combo Pages (28 pages)

**Pages:** All `for-{trade}-{city}` combos (e.g., `for-plumbers-london`, `for-electricians-glasgow`, `for-builders-manchester`)

**Characteristics:**
- Lines: 430–470
- H2 count: 8–9
- NO: VideoExplainer, Calculator, MeetTheTeam, Testimonials, ComparisonTable
- Have city-specific content (local landmarks, weather, regulations)
- Have FAQ (8 questions, city-specific)
- Have pricing CTA
- Have city links (other cities for same trade)

**QuickAnswer insertion point:** After hero, before city-specific content (after first `section-divider`)

---

## Variant C — Simple Hub Pages (7 pages)

**Pages:** `for-carpenters`, `for-cleaners`, `for-drainage`, `for-handymen`, `for-joiners`, `for-landscapers`, `for-pest-control`, `for-plasterers`, `for-tilers`, `for-gas-engineers`

**Characteristics:**
- Lines: 500–620
- H2 count: 5–7
- Some have Pain Points section, but NO VideoExplainer/Calculator/MeetTheTeam/Testimonials
- pest-control is largest (616 lines)
- Simpler structure: Hero → Pain Points/Features → How It Works → FAQ → Pricing CTA
- No social proof band or testimonial section

**QuickAnswer insertion point:** After hero, before Pain Points/Features (after first `section-divider`)

---

## Key Differences by Variant

| Feature | Variant A (Full) | Variant B (City) | Variant C (Simple) |
|---------|-----------------|------------------|-------------------|
| VideoExplainer | ✅ | ❌ | ❌ |
| LostRevenueCalculator | ✅ | ❌ | ❌ |
| MeetTheTeam | ✅ | ❌ | ❌ |
| Testimonials | ✅ | ❌ | ❌ |
| ComparisonTable | ✅ | ❌ | ❌ |
| City-specific content | ❌ | ✅ | ❌ |
| Local landmarks/refs | ❌ | ✅ | ❌ |
| Phone mockup in hero | ✅ | ❌ | ✅ |

---

## Stage 1 Status

| Page | Variant | QuickAnswer | Commit |
|------|---------|-------------|--------|
| /for-plumbers | A | ✅ | c99d5e0 |
| /for-electricians | A | ✅ | c99d5e0 (uncommitted) |
| /for-roofers | A | ⚠️ Inserted but not tested | c99d5e0 (uncommitted) |

**Note:** `/for-roofers` has a different component order (SocialProofBand → Pain Points → VideoExplainer → Calculator → ...). QuickAnswer was inserted after SocialProofBand, before Pain Points. This may need adjustment to match the plumber/electrician pattern.

---

## Rollout Plan (Post-Stage 1)

1. **Validate Stage 1** (3 pages) — 14-day position hold
2. **Variant A** (remaining 4: builders, heating-engineers, locksmiths, painters-decorators) — Batch 2
3. **Variant C** (10 pages) — Batch 3 — may need different QuickAnswer item sets
4. **Variant B** (28 city pages) — Batch 4 — lowest priority, city-specific items
