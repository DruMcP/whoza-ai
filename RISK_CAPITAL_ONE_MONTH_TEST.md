# whoza.ai — One-Month Live Test: Risk Capital Definition
**Date:** 2026-04-28
**Purpose:** Minimum at-risk capital required to validate the voice agent model with real UK customers

---

## 1. Core Principle

The white-label model makes this an **asymmetric bet**: the downside is capped under £900, but the upside is confirmation of a £1M+ ARR trajectory. Most of the infrastructure is already paid for. The risk capital is purely the incremental cash needed to run a 30-day live pilot.

---

## 2. Risk Capital Scenarios

### Scenario A: Ultra-Lean Validation (£0–300)
**Use case:** You personally know 3–5 tradespeople who will test this manually.

| Item | Cost | Notes |
|------|------|-------|
| Trillet Pro plan (not Agency) | $49 ≈ £38 | 1 account, up to 3 sub-accounts |
| UK numbers | £10–15 | 3–5 numbers via Trillet |
| Customer acquisition | £0 | Personal network, no paid ads |
| Tech build | £0 | Manual Trillet dashboard, no API integration |
| **Total at-risk** | **~£50–80** | |
| **Revenue potential** | £207–345 | 3–5 customers × £69 Solo bundle |

**Outcome:** Validates that tradespeople will pay and that call divert works. No automation. You manually set up each agent in Trillet and bill them via existing Stripe invoice flow.

---

### Scenario B: Recommended Lean Pilot (£850–1,200) ⭐
**Use case:** 30-day automated test with paid acquisition, 10–20 real customers.

| Item | Cost | Risk Profile |
|------|------|--------------|
| Trillet Agency (1 month) | $299 ≈ **£230** | Lost if test fails |
| UK numbers (10–15) | **£25–40** | Lost if test fails |
| Paid acquisition (Google/Facebook, 30 days) | **£500** | Lost if test fails |
| Ad creative / copy | **£0** | You write it |
| Minimal tech integration | **£0** | Uses existing whoza.ai stack |
| Support / onboarding time | Dru's time | Opportunity cost, not cash |
| Stripe processing | **£0** | Only charged on revenue |
| Buffer (overage, extra numbers) | **£100** | Lost if test fails |
| **TOTAL RISK CAPITAL** | **~£855–870** | |

**Revenue scenario (conservative):**
- 100 leads from £500 ad spend
- 10% trial-to-paid conversion = **10 customers**
- 6 × Solo £69 + 4 × Business £129 = £414 + £516 = **£930 revenue**
- **Net position: +£60 profit**

**Revenue scenario (optimistic):**
- 15 customers at avg £100 = **£1,500 revenue**
- **Net position: +£630 profit**

**Total loss if zero customers:** £855. That is the maximum capital at risk.

---

### Scenario C: Full Pilot (£2,500–4,000)
**Use case:** Serious 30-day test with full integration, 30–50 customers.

| Item | Cost |
|------|------|
| Trillet Agency | £230 |
| UK numbers (20–30) | £50–80 |
| Paid acquisition (aggressive) | £1,500–2,500 |
| Freelance dev (2 weeks, API integration) | £1,500–3,000 |
| Trade directory partnerships | £200–500 |
| Buffer | £300 |
| **TOTAL RISK CAPITAL** | **~£3,780–6,410** |

This is only recommended if the lean pilot (Scenario B) shows >5% conversion.

---

## 3. What Is NOT Risk Capital

These are already paid for or are assets, not at-risk cash:

| Item | Status | Why Not Risk |
|------|--------|--------------|
| whoza.ai hosting (Netlify) | ✅ Existing | Sunk cost, no incremental spend |
| Supabase database | ✅ Existing | Already running |
| Stripe account | ✅ Existing | No monthly fee |
| Domain / SSL | ✅ Existing | Already paid |
| React + Vite codebase | ✅ Existing | Already built |
| Auth, billing, admin portal | ✅ Existing | Already built |
| Time spent building integration | Your time | Becomes a reusable asset |

**The white-label model means you are not risking R&D capital.** You are risking marketing capital and one month of platform fees.

---

## 4. Break-Even Math (Scenario B)

| Metric | Value |
|--------|-------|
| Total at-risk capital | **£855** |
| Average revenue per test customer | **£100** (blended Solo/Business) |
| Customers needed to break even | **9** |
| Leads needed at 10% conversion | **90** |
| Cost per lead required | **£5.56** |

**Reality check:** £500 ad spend ÷ 90 leads = £5.56 per lead. This is very achievable in UK trade verticals (local service Google Ads typically £3–£8/lead). At £10/lead, you'd need 90 leads = £900 ad spend, pushing total risk to ~£1,250.

---

## 5. Cash-Flow Timeline (Scenario B)

| Day | Event | Cash In | Cash Out | Net |
|-----|-------|---------|----------|-----|
| **0** | Sign Trillet Agency | — | £230 | **-£230** |
| **0** | Buy 10 UK numbers | — | £30 | **-£260** |
| **1–7** | Build minimal landing page + Stripe products | — | £0 | **-£260** |
| **1–30** | Run ads | — | £500 | **-£760** |
| **3–10** | First customers onboard | +£69–129 each | — | Improving |
| **30** | Month-end tally | ~£930 (10 cust) | — | **+£170** |

---

## 6. Risk Mitigation: How to Lose Less Than £855

| Tactic | Saving |
|--------|--------|
| Start with Trillet Pro ($49) instead of Agency | **-£192** |
| Use only 3 test numbers initially | **-£15** |
| Run ads for 2 weeks, evaluate, then decide on week 3–4 | **-£250** |
| Use organic outreach (trade Facebook groups, Checkatrade forums) instead of £500 ads | **-£500** |
| **Minimum possible test** | **~£50** |

**Recommended hedge:** Start with £300 (Trillet Pro + 5 numbers + £200 in ads for 2 weeks). If you get 3+ paying customers in 14 days, upgrade to Agency and scale ads. This staggers the risk:

| Phase | Capital | Gate |
|-------|---------|------|
| Week 1–2 | £300 | ≥3 paying customers |
| Week 3–4 | +£555 | ≥8 paying customers |
| Total if both gates pass | £855 | Model validated |

---

## 7. Decision Matrix

| If you have... | Run this scenario | Risk capital |
|----------------|-------------------|------------|
| 3+ tradesperson contacts | A: Ultra-lean | £50–80 |
| £1,000 and 2 weeks to focus | B: Lean pilot | £855 |
| £4,000 and a developer | C: Full pilot | £3,500+ |
| Zero cash, zero contacts | Not ready | £0 (build organic first) |

---

## 8. The Real Risk Is Not Money

| Risk | Cost | Mitigation |
|------|------|------------|
| **Capital loss** | £855 max | Capped by white-label model |
| **Time loss (30 days)** | Opportunity cost | 30 days to validate a £1M+ ARR idea is cheap |
| **Reputation risk** | Medium | Use "Beta" label. Full refund guarantee. |
| **Partner failure (Trillet)** | Low | Can switch to Vapi/Retell in 48 hours |
| **Not acting fast enough** | **Infinite** | Trade Receptionist, VoiceFleet, CallChimps are already in market |

**The actual risk is spending £855 to learn this works, then watching a competitor scale past you while you debate spending £10,000 on month two.**

---

## 9. Recommendation

**Commit £855 to Scenario B.**

Break it into two gates:
1. **Gate 1 (£300):** 2-week mini-test. 3+ paying customers = pass.
2. **Gate 2 (+£555):** Scale to 30 days. 10+ paying customers = model validated.

If either gate fails, you lose £300 or £855. If both pass, you have a validated acquisition model, working tech stack, and 10+ reference customers to scale from.

---

*Prepared by Jarvis for Dru / whoza.ai. Numbers based on Trillet Agency pricing (£0.09/min, $299/mo), UK number costs (£2–4/number), and UK trade Google Ads benchmarks (£3–£8/lead).*