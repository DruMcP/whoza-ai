---
created: 2026-05-02
updated: 2026-05-02
tags: [decision, claire, product, positioning]
status: accepted
impact: high
---

# Decision — Claire is Post-Job Conversion Engine

## Context
Claire was originally conceived as a "review collection" feature — one of three personas (Katie = voice, Rex = visibility, Claire = reviews). During the 2026-05-02 specification session, we confronted a positioning problem: review software is a commoditized category with low perceived value. Tradespeople don't wake up wanting "review management." They wake up wanting more jobs.

## Decision
**Claire is NOT review software. Claire is a post-job conversion engine.**

| Claire is NOT | Claire IS |
|---------------|-----------|
| Review software | A post-job conversion engine |
| Reputation management tool | A mechanism that compounds revenue after every job |
| Add-on feature | Core revenue multiplier inside Whoza |
| "Collect reviews" | "Turn completed jobs into more future jobs automatically" |

## Rationale
1. **Category problem:** "Review software" = £20-50/mo tools (BirdEye, Podium, LocalClarity). Commoditized. Low willingness-to-pay.
2. **Outcome problem:** Tradespeople don't care about "stars." They care about "jobs."
3. **Integration advantage:** Claire triggers from the SAME job completion signal that Katie already handles. Same WhatsApp thread. Zero new friction.
4. **Margin story:** Cost per review request = £1-3. Value = potentially thousands in new job revenue from improved Google ranking.
5. **World-class positioning:** Linear.app doesn't say "issue tracker" — it says "the issue tracker." Whoever names the category wins.

## Consequences

### Messaging (LOCKED — never deviate)
✅ **Primary headline:** "Turn completed jobs into more future jobs automatically"
✅ **Secondary:** "Every review is a future customer finding you on Google"
✅ **Dashboard title:** "Win More Jobs with Reviews"

❌ **Forbidden phrases:**
- "Collect reviews"
- "Reputation management"
- "Review software"
- "Get more stars"
- "Manage your online reputation"

### Product
- Claire sits alongside Katie and Rex as equal-tier persona
- Dashboard shows REVENUE metrics, not vanity metrics
- Every metric is framed as "more jobs" — not "more reviews"

### Pricing
- Claire is bundled into all tiers (not sold separately)
- Value justification: "One extra job per month from better rating pays for your entire plan"

### Marketing
- Case studies: "How [Name] got 23% more calls after 90 days with Claire"
- Never: "How [Name] got 15 new reviews"

## Alternatives Considered
1. **Build Claire as review software** — Rejected. Commoditized category, low ASP.
2. **Partner with Pluspoint ($49/mo)** — On hold. Evaluating after Claire MVP. Pluspoint may supplement Phase 2 but Claire is the core engine.
3. **Buy/rebrand existing review tool** — Rejected. No off-the-shelf tool has the job-completion trigger integration.

## Related
- [[Project — Pre-Production Build]] — Where Claire is being built
- [[docs/CLAIRE_MVP_SPEC.md]] — Full technical specification
- [[Research — Pluspoint Review Platform]] — Potential partner/comparison
- [[9_PLUS_WORLD_CLASS_PLAN.md]] — Section 5: Claire roadmap
- [[Index — Decisions]]
