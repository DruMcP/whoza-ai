# whoza.ai — Final Pricing Structure & Add-On Menu
**Date:** 2026-04-30  
**Status:** Approved for implementation

---

## Tier Structure (4 Tiers)

| Tier | Monthly Price | Voice | Visibility | Review | Social | Target |
|------|---------------|-------|------------|--------|--------|--------|
| **Core** | £59 | 100 min, 1 number | AI score, action plan, 2 directories | ❌ | ❌ | Solo tradesperson |
| **Pro** | £99 | 300 min, 1 number | + competitor tracking, 5 directories, calendar sync, emergency routing | ✅ **Included free** | ❌ | Small team |
| **Growth** | £169 | 500 min, 2 numbers | + 10 directories, quarterly strategy call | ✅ Included | ✅ **Social starter** (2 posts/week) | Established business |
| **Unlimited** | £275 | Unlimited, unlimited numbers | Unlimited everything, white-label portal | ✅ Included | ✅ **Social growth** (5 posts/week) | Multi-trade / agency |

All prices **inc VAT**.

---

## What's Included Per Tier

### Core (£59)
- Trillet voice: 100 minutes, 1 phone number
- WhatsApp + SMS included
- AI visibility score (monthly)
- Basic action plan (3 priorities)
- 2 directory listings
- 24/7 answering
- Spam filter

### Pro (£99)
- **Everything in Core**
- 300 minutes voice
- **Review automation** (EmbedMyReviews white-label) — **FREE**
- Competitor tracking (3 competitors)
- Calendar sync (Google/Outlook)
- Emergency call routing
- 5 directory listings
- Monthly visibility report

### Growth (£169)
- **Everything in Pro**
- 500 minutes voice
- 2 phone numbers
- **Social media starter** (2 posts/week, 2 platforms)
- 10 directory listings
- Quarterly strategy call
- Priority support

### Unlimited (£275)
- **Everything in Growth**
- **Unlimited** voice minutes
- **Unlimited** phone numbers
- **Social media growth** (5 posts/week, 4 platforms)
- Unlimited competitor tracking
- White-label portal (resell under your brand)
- Dedicated account manager
- Phone support
- Custom onboarding

---

## Add-On Menu

| Add-On | Monthly Price | Supplier Cost | Margin | When to Offer |
|--------|---------------|---------------|--------|---------------|
| **Extra 100 minutes** | £20 | £9 | 55% | User hits 80% of plan limit |
| **Extra phone number** | £10 | £4 | 60% | Pro/Growth user adds second trade |
| **AI Social Generator** | £49 | £5 | 90% | Any tier — auto-creates posts from jobs |
| **Review Automation** | £39 | £1.56 | 96% | **Included free in Pro+** — standalone for Core |
| **GBP Optimization (referral)** | £199 | £0 (20% comm) | 100% | Refer to white-label SEO partner |

---

## Minute Overage Policy

| Tier | Included | Overage Rate | Cap |
|------|----------|--------------|-----|
| Core | 100 min | **£0.22/min** | Soft cap — agent switches to "message mode" |
| Pro | 300 min | **£0.22/min** | Hard cap at 450 min unless add-on purchased |
| Growth | 500 min | **£0.22/min** | Hard cap at 750 min unless upgraded |
| Unlimited | Unlimited | **£0.22/min** | No cap |

**Why £0.22 across all tiers:** Simple, transparent, no confusion. Trades know exactly what they'll pay if they go over. At ~£0.09/min Trillet cost, this is a 144% markup — healthy margin, still 5× cheaper than human receptionists. |

**Soft cap behavior:** When Core user hits 100 min, AI agent says "I'm transferring you to message mode" — takes name/number, sends transcript. No extra charge.

**Hard cap behavior:** Pro/Growth users can buy minute bundles or pay overage. Auto-prompted at 80% usage.

---

## Economics

### Supplier Costs (Monthly)

| Service | Supplier | Cost |
|---------|----------|------|
| Voice backend | Trillet Agency | £235 base + £4/number + £0.09/min |
| Review automation | EmbedMyReviews | $99 (£78) flat — unlimited clients |
| Social starter | AI-generated (in-house) | ~£5 API cost |
| Social growth | AI-generated (in-house) | ~£10 API cost |

### Margin Per Tier

| Tier | Revenue | Voice Cost | Review Cost | Social Cost | **Total Margin** | **Margin %** |
|------|---------|------------|-------------|-------------|------------------|--------------|
| Core | £59 | £23.50 | £0 | £0 | **£35.50** | **60%** |
| Pro | £99 | £23.50 | £1.56 | £0 | **£73.94** | **75%** |
| Growth | £169 | £47* | £1.56 | £5 | **£115.44** | **68%** |
| Unlimited | £275 | £60** | £1.56 | £10 | **£203.44** | **74%** |

*2 numbers + ~500 min usage  
**4 numbers + ~1000 min avg usage

---

## Upgrade Triggers

| Trigger | Suggested Action |
|---------|------------------|
| Core hits 80% minutes (80/100) | Prompt: "Add 100 min for £20 or upgrade to Pro?" |
| Pro hits 80% minutes (240/300) | Prompt: "Add 100 min for £20 or upgrade to Growth?" |
| Pro user asks about reviews | Auto-enroll (already included) |
| Growth hits 2 numbers | Prompt: "Upgrade to Unlimited for unlimited numbers?" |
| Any tier asks about social | Offer AI Social Generator add-on (£49) |

---

## Competitive Positioning

| vs. Competitor | Message |
|----------------|---------|
| **Trade Receptionist** (generic AI) | "Trained for trades, not just answering" |
| **Moneypenny** (human) | "£99 vs £200+ — AI that never sleeps" |
| **Trillet direct** | "Same voice tech + trade AI + visibility + reviews" |

**Key differentiator:** Pro tier at £99 includes review automation that competitors charge £39–£99 for separately.

---

## Implementation Checklist

- [ ] Update pricing page with 4 tiers
- [ ] Add "review automation" badge to Pro tier
- [ ] Create add-on menu in checkout flow
- [ ] Build 80% usage trigger prompt
- [ ] Set up EmbedMyReviews white-label integration
- [ ] Build AI social generator (job data → posts)
- [ ] Update Stripe/plan codes in Supabase
- [ ] Add upgrade prompts in dashboard

---

**Approved by:** Dru  
**File:** `whoza-ai/FINAL_PRICING_STRUCTURE.md`
