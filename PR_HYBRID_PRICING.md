# PR: Hybrid Outcome-Based Pricing Model

## Summary
Major strategic pivot from flat SaaS subscription to **revenue participation model**: base fee + pay per AI-booked job. This aligns incentives with customers — we only make more money when they do.

## Changes

### 📊 Business Model
- `BUSINESS_MODEL_ANALYSIS.md` — Section 4 completely rewritten with:
  - 4.1: Subscription + Outcome Hybrid Model
  - 4.2: Updated pricing tiers with included jobs
  - 4.3: Revenue projections (£120k → £150k–£200k MRR at 1,000 customers)
  - 4.4: Unit economics (LTV:CAC 21.5:1 → ~30:1)
  - 4.5: Competitive comparison vs Moneypenny/AnswerConnect
  - 4.6: Booking definition & risk mitigation

### 💰 Pricing Page (`src/pages/Pricing.jsx`)
- Complete redesign showing hybrid model
- Interactive cost calculator: drag slider to see total cost per tier
- Each tier card shows: base price, included jobs, overage rate
- ROI anchor per tier: "≈ X jobs/month pays for this plan"
- Trust line: "We only make more money when you do."
- Comparison table: old flat vs new hybrid at different usage levels

### 🎯 CTAs Updated Site-Wide
All "Start Your 14-Day Free Trial" → "Start Your 14-Day Free Trial — 15 Jobs Included"
- `NewHero.jsx`
- `FinalCTA.jsx`
- `ExitIntentModal.jsx`
- `VoiceLanding.jsx`
- `CompetitorAnalysis.jsx`

### 📋 FAQAccordion (`src/components/FAQAccordion.jsx`)
Added 5 new outcome-pricing FAQs (now 22 total):
1. How does the outcome pricing work?
2. What counts as an AI-booked job?
3. What if I don't use all my included jobs?
4. Is there a limit to how many jobs Katie can book?
5. Can I switch plans if my usage changes?

### 🛒 Checkout (`src/pages/Checkout.jsx`)
- Added `includedJobs` and `overageRate` metadata to each tier
- Helper text: "First X jobs included, then £Y per job"

### 🎁 PricingTeaser (`src/components/PricingTeaser.jsx`)
- Added "includes X jobs" to each tier preview
- Added overage note: "Extra jobs from £2–£3"
- Footer: "14-day free trial — 15 jobs included"

## Pricing Tiers

| Tier | Base | Included | Overage | Positioning |
|------|------|----------|---------|-------------|
| **Capture** | £59 | Lead capture only | N/A | Never miss a lead |
| **Convert** | £119 | **15 jobs** | £3 each | Most popular |
| **Grow** | £199 | **40 jobs** | £2.50 each | Full AI team |
| **Scale** | £349 | **100 jobs** | £2 each | Multi-location |

## Impact
- **ARPU**: £120 → £150–£250
- **MRR at 1,000 customers**: £120k → £150k–£200k
- **LTV:CAC**: 21.5:1 → ~30:1
- **Positioning shift**: "SaaS subscription" → "Revenue participation"

## Deployment
- Build: 97 pages prerendered, zero errors
- Staging: `https://whoza-ai-staging.netlify.app`
- Production: ready to promote

## Booking Definition
Confirmed appointment + entered into calendar + not cancelled within 24 hours.

## Sales Language
> "You get 15 jobs included, after that it's £3 per extra job."

Never say "hybrid billing model" to customers.
