# Trillet Agency Plan — Number Cost Analysis
**Date:** 2026-04-30  
**Context:** whoza.ai trial economics, 10-number scenario

---

## Trillet Agency Plan Pricing

| Item | Cost |
|------|------|
| **Monthly base** | $299 (£235) |
| **Numbers included** | 10 |
| **Minutes included** | 300 |
| **Additional numbers** | $5/month each |
| **Additional minutes** | $0.12/min |

**Key fact:** whoza.ai pays Trillet per-number. Each trial user needs a divert number. Agency plan covers first 10 numbers in the £235 base fee.

---

## Cost Risk: Month 1 with 10 Free Trials

### Scenario A — All Core Trials (50 min each)

| Cost Item | Calculation | Monthly Cost |
|-----------|-------------|--------------|
| Trillet Agency base | 1 plan | £235 |
| Extra numbers (0) | 10 included | £0 |
| Minutes used | 10 × 50 = 500 min | — |
| Minutes included | 300 min | — |
| Overage | 200 × $0.12 = $24 | £19 |
| whoza infra (Supabase, Netlify, Resend) | Fixed | £60 |
| **Total cost risk** | | **£314** |

### Scenario B — All Pro Trials (150 min each)

| Cost Item | Calculation | Monthly Cost |
|-----------|-------------|--------------|
| Trillet Agency base | 1 plan | £235 |
| Extra numbers (0) | 10 included | £0 |
| Minutes used | 10 × 150 = 1,500 min | — |
| Minutes included | 300 min | — |
| Overage | 1,200 × $0.12 = $144 | £113 |
| whoza infra | Fixed | £60 |
| **Total cost risk** | | **£408** |

### Scenario C — Mixed (avg 100 min each)

| Cost Item | Calculation | Monthly Cost |
|-----------|-------------|--------------|
| Trillet Agency base | 1 plan | £235 |
| Extra numbers (0) | 10 included | £0 |
| Minutes used | 10 × 100 = 1,000 min | — |
| Overage | 700 × $0.12 = $84 | £66 |
| whoza infra | Fixed | £60 |
| **Total cost risk** | | **£361** |

---

## At Scale: 25 Trials/Week (100/Month)

**Critical:** If you hit the weekly cap consistently, numbers become the dominant cost.

| Cost Item | Calculation | Monthly Cost |
|-----------|-------------|--------------|
| Trillet Agency base | 1 plan | £235 |
| Extra numbers | 90 × $5 = $450 | £354 |
| Minutes used | 100 × 100 = 10,000 min | — |
| Minutes included | 300 min | — |
| Overage | 9,700 × $0.12 = $1,164 | £917 |
| whoza infra | Fixed | £60 |
| **Total cost risk** | | **£1,566** |

**This is why the 25/week cap exists.** Uncapped trials would cost £1,500+/mo in voice alone.

---

## Conversion Offset (Expected Case)

At 35% conversion (industry benchmark for voice AI trials):

### Scenario C — Mixed trials, 10 users

| Metric | Value |
|--------|-------|
| Cost risk (0% conversion) | £361 |
| Conversions (35%) | 3.5 users |
| Revenue @ Core (£59) | 3.5 × £59 = £206.50 |
| Revenue @ Pro (£99) | 3.5 × £99 = £346.50 |
| Revenue @ Unlimited (£149) | 3.5 × £149 = £521.50 |
| **Net at Core** | £361 − £206.50 = **−£154.50** |
| **Net at Pro** | £361 − £346.50 = **−£14.50** |
| **Net at Unlimited** | £361 − £521.50 = **+£160.50** |

**Break-even:** If 3.5 users convert to Pro, you nearly break even in month 1. Any Unlimited conversions = profit immediately.

---

## Recommendation

1. **Start with Agency plan** (£235/mo) — covers 10 numbers, which matches your initial trial cohort size.
2. **Number cost is zero for first 10 trials** — included in base fee.
3. **Minute overage is the real variable cost** — £0.12/min adds up fast at scale.
4. **Weekly cap of 25 protects against £1,500+/mo burn** at 100 trials/month.
5. **Conversion economics are favourable** — break-even at ~4 Pro conversions.

---

## Action

Update trial economics model in:
- `FREE_TRIAL_DESIGN.md`
- `BUSINESS_MODEL_ANALYSIS.md`
- `TrialMetricsDashboard.jsx` (burn projection)
