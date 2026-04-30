# Trillet Backend Integration — Business Model Validation
**Date:** 2026-04-30  
**Context:** Trillet is whoza.ai's voice fulfillment backend, not a competitor. This document validates the margin structure.

---

## Relationship Clarification

**Trillet = Backend Infrastructure Provider**  
**whoza.ai = Customer-Facing Brand + Value-Add Layer**

whoza.ai buys Trillet Agency plan (£235/mo base) and resells to UK tradespeople with additional features:
- AI visibility scoring (GEO, citations, reviews)
- Trade-specific onboarding and templates
- Unified dashboard (voice + visibility + competitors)
- UK-focused positioning and support

---

## Cost Structure (Trillet Agency)

| Item | Monthly Cost |
|------|--------------|
| Trillet Agency base | £235 |
| Included numbers | 10 |
| Included minutes | 300 |
| Extra numbers | £4 each |
| Extra minutes | £0.09/min ($0.12) |
| WhatsApp | Included |
| SMS | Included |
| White-label | Included |

---

## Margin Analysis per whoza.ai Tier

### Core (£59/mo customer revenue)

| Metric | Value |
|--------|-------|
| Customer pays | £59 |
| Customer uses | ~100 min, 1 number |
| Trillet cost per customer | £23.50 (base ÷ 10) + £0 for min (within 300 pool) |
| **Margin per customer** | £59 − £23.50 = **£35.50** |
| **Margin %** | **60%** |

### Pro (£99/mo customer revenue)

| Metric | Value |
|--------|-------|
| Customer pays | £99 |
| Customer uses | ~300 min, 1 number |
| Trillet cost per customer | £23.50 base + £0 for min |
| **Margin per customer** | £99 − £23.50 = **£75.50** |
| **Margin %** | **76%** |

### Unlimited (£149/mo customer revenue)

| Metric | Value |
|--------|-------|
| Customer pays | £149 |
| Customer uses | 500+ min, potentially 2+ numbers |
| Trillet cost per customer | £23.50 base + £18 overage (200 extra min × £0.09) |
| **Margin per customer** | £149 − £41.50 = **£107.50** |
| **Margin %** | **72%** |

---

## Trial Economics (Recalculated)

With Trillet as backend, trial costs are now **pool costs**, not per-trial:

### 10 Free Trials (Month 1)

| Item | Cost |
|------|------|
| Trillet Agency base | £235 |
| Extra numbers | £0 (10 included) |
| Minutes (500–1,500) | £0–£108 overage |
| Infra (Supabase, Netlify, Resend) | £60 |
| **Total** | **£295–£403** |

**At 35% conversion (3.5 users):**
- 3.5 × £59 (Core) = £206.50 → **Net: −£89 to −£197**
- 3.5 × £99 (Pro) = £346.50 → **Net: −£56 to +£51**
- Mixed: ~£280 → **Net: −£15 to −£123**

**Break-even requires ~4 Pro conversions or ~5 Core conversions.**

---

## Scale Economics

### 50 Active Customers (Month 3 target)

| Item | Calculation | Monthly Cost |
|------|-------------|--------------|
| Trillet Agency base | 1 plan | £235 |
| Extra numbers | 40 × £4 | £160 |
| Minutes used | ~10,000 min (50 × 200 avg) | — |
| Minutes included | 300 | — |
| Overage | 9,700 × £0.09 | £873 |
| Infra | Fixed | £60 |
| **Total backend cost** | | **£1,328** |

| Revenue (mixed tiers) | Calculation | Monthly |
|-----------------------|-------------|---------|
| 30 Core × £59 | | £1,770 |
| 15 Pro × £99 | | £1,485 |
| 5 Unlimited × £149 | | £745 |
| **Total revenue** | | **£4,000** |
| **Gross margin** | £4,000 − £1,328 | **£2,672** |
| **Gross margin %** | | **67%** |

**Healthy.** 67% gross margin at 50 customers is viable.

---

## Key Validations

### ✅ Pricing covers Trillet costs
- Core margin: 60%
- Pro margin: 76%
- Unlimited margin: 72%

### ✅ Trial cap protects against overage blowout
- 25 trials/week = 100/month
- At 100 trials: need 90 extra numbers (£360) + ~£900 overage
- Total voice cost: ~£1,500
- Revenue at 35% conversion (35 customers): ~£2,800–£5,200
- **Net positive even at scale**

### ✅ Value-add justifies markup
whoza.ai charges £59–£149 vs Trillet's raw £38 because:
- AI visibility scoring (unique)
- Trade-specific setup and templates
- Unified dashboard
- UK market focus and support
- Competitor tracking
- Review automation

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Trillet raises prices | Lock annual contract, build switching cost |
| High-minute customers burn margin | Unlimited tier pricing covers overage |
| 10-number cap forces second Trillet plan | At >10 simultaneous trials, yes. But trials are sequential (7 days each) |
| Customer churn before covering CAC | Trial → paid flow must be <7 days |

---

## Recommendations

1. **Lock Trillet Agency annual** for price stability
2. **Cap trial minutes at 50%** to control overage (already done)
3. **Monitor number rotation** — trials reuse numbers after expiry
4. **Build switching cost** — GEO data, competitor history, review accumulation

---

**Validation: whoza.ai pricing structure is viable with Trillet as backend.**
