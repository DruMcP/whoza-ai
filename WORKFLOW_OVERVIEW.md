# whoza.ai Agentic Development Workflow Overview
## Master Coordination Document — 9+ World-Class Execution
**Date:** 2026-04-30
**Version:** 2.0
**Owner:** Jarvis for Dru

---

## 1. The Agentic System

**Architecture:** Multi-agent swarm with Jarvis (main) coordinating specialist subagents.

```
┌─────────────────────────────────────────────────────────────┐
│                     JARVIS (Main Agent)                      │
│               Strategy · Orchestration · QA                  │
└─────────────┬───────────────────────────────┬───────────────┘
              │                               │
    ┌─────────▼─────────┐          ┌──────────▼──────────┐
    │ Frontend Builder  │          │  Competitive Intel  │
    │ (Design + Code)   │          │  (Audits + Analysis) │
    └─────────┬─────────┘          └──────────┬──────────┘
              │                               │
    ┌─────────▼─────────┐          ┌──────────▼──────────┐
    │  Technical Audit  │          │   Content Writer    │
    │  (Performance)    │          │   (Copy + Blog)     │
    └───────────────────┘          └─────────────────────┘
```

---

## 2. Decision Matrix: Which Agent Does What

| Task Type | Who Handles | Tool/Method | Turnaround |
|-----------|-------------|-------------|------------|
| **Design system updates** | Frontend subagent | Spawn with design brief + component spec | 1-2 days |
| **New page/section** | Frontend subagent | Spawn with wireframe + copy | 2-3 days |
| **Component rewrite** | Direct (Jarvis) | Read → Edit → Build → Deploy | Same session |
| **Competitive audit** | Intel subagent | Spawn with target URLs + scoring rubric | 2-4 hours |
| **Copy/content** | Content subagent | Spawn with persona + tone guide | 1-2 days |
| **Technical audit** | Tech subagent | Spawn with staging URL + checklist | 2-4 hours |
| **SEO/schema** | Direct (Jarvis) | Read → Edit schemaOrg.js | Same session |
| **Deploy** | Direct (Jarvis) | `npm run build` + netlify deploy | 5-10 min |
| **Emergency fix** | Direct (Jarvis) | Immediate edit + deploy | 5 min |
| **Strategic planning** | Direct (Jarvis) | Write plan document, update MDs | Same session |

---

## 3. Standard Operating Procedure (SOP)

### Phase A: Discovery (15-30 min)
1. **Read memory files** — `memory/YYYY-MM-DD.md`, `USER.md`, `MEMORY.md`
2. **Read relevant skill** — Check `available_skills` for applicable SKILL.md
3. **Read existing code** — Understand current state before modifying
4. **Check staging** — Browser snapshot to verify current render

### Phase B: Design Brief (15-30 min)
1. **Write component spec** — Props, layout, animations, responsive behavior
2. **Reference design system** — Use CSS variables, never hardcode colors
3. **Check dependencies** — Lucide icons only, Framer Motion for animations
4. **Update design-brief.md** — Add new section if significant

### Phase C: Implementation (30-120 min)
1. **Write component** — `.jsx` file with full functionality
2. **Add to Home.jsx** — Import + placement in section order
3. **Build** — `npm run build` (must be zero errors)
4. **Deploy** — Netlify deploy with token
5. **Verify** — Browser snapshot to confirm render

### Phase D: Documentation (10-15 min)
1. **Update memory** — Append to `memory/YYYY-MM-DD.md`
2. **Update strategic docs** — `design-brief.md`, `BUSINESS_MODEL_ANALYSIS.md`
3. **Report to Dru** — Summary of what changed + score impact

---

## 4. Quality Gates (Non-Negotiable)

### Build Gate
- ✅ `npm run build` must complete with zero errors
- ✅ 97 pages prerendered (no drops)
- ✅ No console errors on homepage

### Design Gate
- ✅ Uses design system variables (not hardcoded colors)
- ✅ Lucide icons only
- ✅ Framer Motion with `whileInView` + `viewport={{ once: true }}`
- ✅ Mobile-first responsive
- ✅ Touch targets ≥44px on mobile

### Content Gate
- ✅ Copy reviewed for "free score" language (purged)
- ✅ Persona names consistent (Katie/Mark/Rex/Claire)
- ✅ Pricing matches: Core £59, Pro £99, Growth £169, Unlimited £249
- ✅ VAT included on all price displays

### Performance Gate
- ✅ No render-blocking resources
- ✅ Images lazy-loaded
- ✅ Fonts preconnected
- ✅ Lighthouse score tracked (target: 90+ → 100)

---

## 5. Score Tracking Dashboard

### Current State (April 30, 2026)

| Dimension | Score | Target | Gap | Owner | Priority |
|-----------|:-----:|:------:|:---:|-------|:--------:|
| Visual Design | 6.5 | 9.2 | -2.7 | Frontend agent | 🔴 High |
| Conversion Architecture | 7.5 | 9.1 | -1.6 | Strategy + Frontend | 🔴 High |
| Trust & Social Proof | 7.0 | 9.0 | -2.0 | Content + Frontend | 🔴 High |
| Content & Messaging | 7.5 | 9.0 | -1.5 | Content agent | 🟡 Med |
| Technical Performance | 7.0 | 9.3 | -2.3 | Tech agent | 🔴 High |
| Feature Demonstration | 6.0 | 9.5 | -3.5 | Frontend + Partner | 🔴 Critical |
| Pricing Clarity | 6.0 | 9.0 | -3.0 | Strategy + Frontend | 🔴 High |
| Mobile Experience | 6.5 | 9.0 | -2.5 | Frontend | 🔴 High |
| **OVERALL** | **6.8** | **9.2** | **-2.4** | **All** | **🔴** |

### Score Movement Log

| Date | Overall | Key Change | What Moved |
|------|---------|-----------|------------|
| Apr 28 | 5.2 | Baseline | Original site assessment |
| Apr 30 AM | 5.8 | Design system + homepage redesign | Visual Design +1.5 |
| Apr 30 PM | 6.8 | 5 new components (Stats, Audio, Comparison, Trust, Integration) + 15 FAQ items | Conversion +1.5, Trust +1.5, Feature Demo +3.0 |
| May 1-7 | 7.2 | Planned: Exit modal, live chat, testimonial photos | Conversion +0.5, Trust +0.5 |
| May 8-14 | 7.8 | Planned: Live demo number, dashboard preview, video | Feature Demo +2.0 |
| May 15-21 | 8.3 | Planned: Custom illustrations, hero video, performance | Visual Design +1.5, Technical +1.0 |
| May 22-28 | 8.8 | Planned: A/B tests, personalization, email nurture | Conversion +0.8, Content +0.5 |
| May 29-Jun 4 | 9.2 | Planned: Final polish, playground, AMP | All dimensions +0.2-0.5 |

---

## 6. File Structure Reference

```
whoza-ai/
├── 9_PLUS_WORLD_CLASS_PLAN.md     ← Master execution plan (this drives all work)
├── design-brief.md                 ← Visual design system + competitive intelligence
├── BUSINESS_MODEL_ANALYSIS.md      ← Market data + competitive benchmarking
├── COMPETITIVE_ANALYSIS_REPORT.md  ← Detailed competitor audits
├── A_PLUS_VALIDATION_REPORT.md     ← Technical quality audit
├── WORKFLOW_OVERVIEW.md            ← This file — process coordination
├──
├── src/
│   ├── styles/
│   │   └── design-system.css       ← CSS variables, base classes
│   ├── components/
│   │   ├── ui/                     ← Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── ...
│   │   ├── personas/              ← Persona visual components
│   │   │   ├── KatieAvatar.jsx
│   │   │   ├── RexAvatar.jsx
│   │   │   └── ClaireAvatar.jsx
│   │   ├── NewHero.jsx             ← Hero section
│   │   ├── StatsBand.jsx           ← Key metrics band
│   │   ├── AudioDemoPlayer.jsx     ← "Hear Katie" player
│   │   ├── ComparisonTable.jsx     ← whoza.ai vs alternatives
│   │   ├── TrustBadgeBand.jsx      ← Certification badges
│   │   ├── IntegrationLogoBand.jsx ← Tool integrations
│   │   ├── LostRevenueCalculator.jsx
│   │   ├── ProblemSolution.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── PricingTeaser.jsx
│   │   ├── TestimonialCarousel.jsx
│   │   ├── FAQAccordion.jsx        ← 15 items
│   │   ├── FinalCTA.jsx
│   │   └── ...
│   └── pages/
│       └── Home.jsx               ← Section order defined here
└──
```

---

## 7. Agent Communication Protocol

### Spawn Pattern
```javascript
sessions_spawn({
  task: "Specific task with acceptance criteria",
  runtime: "subagent",
  mode: "run"  // or "session" for multi-turn
})
```

### Required in Every Spawn
1. **Acceptance criteria** — "Done when X, Y, Z are true"
2. **File paths** — "Read /src/components/X.jsx before editing"
3. **Design system** — "Use CSS variables, no hardcoded colors"
4. **Build requirement** — "Must pass `npm run build` with zero errors"

### Never Spawn For
- Quick edits (single file, <30 min)
- Deploy-only tasks
- Copy/paste from existing files
- Emergency fixes

---

## 8. Risk & Escalation

| Risk | Trigger | Escalation |
|------|---------|------------|
| Build fails | `npm run build` errors | Fix immediately, never deploy broken |
| Score stuck | No +0.2 movement in 1 week | Reallocate resources, cut low-impact tasks |
| Partner API delay | No voice API access by Week 3 | Pivot to dashboard-only demo, defer live call |
| Budget pressure | >£5K spent before 8.0 | Freeze non-essential, focus Feature Demo + Conversion |
| Competitor moves | TR launches new feature | Emergency competitive audit, rapid response |

---

## 9. Key Documents (Always Current)

| Document | Purpose | Last Updated |
|----------|---------|--------------|
| `9_PLUS_WORLD_CLASS_PLAN.md` | Master execution plan | Apr 30 |
| `design-brief.md` | Visual system + competitive intel | Apr 30 |
| `BUSINESS_MODEL_ANALYSIS.md` | Market data + unit economics | Apr 30 |
| `COMPETITIVE_ANALYSIS_REPORT.md` | Competitor audits + scores | Apr 30 |
| `memory/2026-04-30.md` | Session log + decisions | Apr 30 |
| `A_PLUS_VALIDATION_REPORT.md` | Technical quality audit | Apr 30 |
| `WORKFLOW_OVERVIEW.md` | This file — process coordination | Apr 30 |

---

## 10. Weekly Rituals

### Monday: Sprint Kickoff (15 min)
- Review score dashboard
- Confirm this week's priorities from 9+ plan
- Spawn agents for Week N tasks

### Wednesday: Mid-Week Check (10 min)
- Agent status check
- Deploy verification
- Blocker identification

### Friday: Score Review (30 min)
- Measure all 8 dimensions
- Update score tracking
- Document what moved + what didn't
- Plan next week adjustments

---

*This workflow is living documentation. Update it when processes change.*
