# whoza.ai Pricing — VAT Treatment Clarification
**Date:** 2026-04-28  
**Status:** Decision Required  
**Context:** UK tradespeople market (sole traders, small businesses)

---

## The Issue

Our pricing documentation (£49, £99, £199, £499 for standalone; £69, £129, £219, £499 for bundles) **does not specify VAT treatment.** This is a critical commercial decision for UK sales.

**The question:** Are these prices **VAT-inclusive** or **ex-VAT**?

---

## UK VAT Rules for whoza.ai

### Are you required to charge VAT?

| Scenario | VAT Required? | Notes |
|----------|---------------|-------|
| **whoza.ai Ltd turnover < £85K/year** | No — can register voluntarily, but not required | Many startups stay below threshold initially |
| **whoza.ai Ltd turnover > £85K/year** | **Yes — mandatory VAT registration** | Once you hit threshold, must charge 20% VAT |
| **Selling to VAT-registered business** | They can reclaim VAT | Ex-VAT pricing is standard B2B convention |
| **Selling to non-VAT-registered sole trader** | They **cannot** reclaim VAT | Total price matters more to them |

**Current situation (pilot phase):** If whoza.ai Ltd is below £85K turnover, you do not legally need to register for VAT yet. However, most SaaS platforms register voluntarily because:
1. It looks more professional/established
2. You can reclaim VAT on your costs (Trillet, hosting, ads)
3. B2B buyers expect VAT invoices for their own accounting

**Recommendation:** Register for VAT voluntarily from launch. It costs nothing to register and signals legitimacy.

---

## How UK Competitors Handle VAT

| Competitor | Pricing Display | VAT Treatment |
|------------|----------------|---------------|
| **Trade Receptionist** | "£29 per month (+VAT)" | **Ex-VAT** — explicitly states +VAT |
| **Team Connect** | "£9.99/month" (no VAT note) | **Likely ex-VAT** (business service) |
| **CallChimps** | "£29/month" (no VAT note) | **Unclear** — may be VAT-inclusive for consumer appeal |
| **Moneypenny** | "£99/month" (billed as B2B) | **Ex-VAT** — VAT added at checkout |
| **VoiceFleet** | "€99/month" (EU/Ireland) | **No UK VAT** — EU pricing |

**UK convention for B2B SaaS:** Display prices **ex-VAT** with "+VAT" or "excl. VAT" notation. VAT is added at checkout.

**UK convention for B2C/consumer:** Display prices **VAT-inclusive** (the price you see is the price you pay).

**The tradespeople market sits in the middle:** They are businesses, but many are sole traders who act like consumers.

---

## The Two Options

### Option A: Ex-VAT Pricing (Recommended for B2B)

**Display:** £49/month + VAT

**At checkout:** £49 + £9.80 VAT = **£58.80 total**

| Tier | Ex-VAT | + VAT (20%) | Total Monthly |
|------|--------|-------------|---------------|
| **Starter** | £49 | £9.80 | **£58.80** |
| **Growth** | £99 | £19.80 | **£118.80** |
| **Pro** | £199 | £39.80 | **£236.80** |
| **Elite** | £499 | £99.80 | **£598.80** |

**Bundle pricing:**

| Tier | Ex-VAT | + VAT (20%) | Total Monthly |
|------|--------|-------------|---------------|
| **Solo** | £69 | £13.80 | **£82.80** |
| **Business** | £129 | £25.80 | **£154.80** |
| **Professional** | £219 | £43.80 | **£262.80** |
| **Enterprise** | £499 | £99.80 | **£598.80** |

**Pros:**
- Standard UK B2B convention
- VAT-registered clients can reclaim 20% (net cost to them is the ex-VAT price)
- Makes your prices look lower at first glance (anchoring effect)
- Allows you to reclaim VAT on your own costs (Trillet, hosting, ads)

**Cons:**
- Non-VAT-registered sole traders pay 20% more than the headline price
- Can cause sticker shock at checkout if not clear upfront
- Trade Receptionist's £29 + VAT = £34.80 — still cheap, but the jump matters psychologically

**Best for:** If most of your clients are VAT-registered businesses (turnover > £85K) or limited companies.

---

### Option B: VAT-Inclusive Pricing (Recommended for Sole Traders)

**Display:** £49/month (inc. VAT)

**Behind the scenes:** £40.83 + £8.17 VAT = £49 total

| Tier | VAT-Inclusive | Actual Ex-VAT | VAT Portion |
|------|--------------|---------------|-------------|
| **Starter** | £49 | £40.83 | £8.17 |
| **Growth** | £99 | £82.50 | £16.50 |
| **Pro** | £199 | £165.83 | £33.17 |
| **Elite** | £499 | £415.83 | £83.17 |

**Bundle pricing:**

| Tier | VAT-Inclusive | Actual Ex-VAT | VAT Portion |
|------|--------------|---------------|-------------|
| **Solo** | £69 | £57.50 | £11.50 |
| **Business** | £129 | £107.50 | £21.50 |
| **Professional** | £219 | £182.50 | £36.50 |
| **Enterprise** | £499 | £415.83 | £83.17 |

**Pros:**
- No checkout shock — price shown = price paid
- Appeals to sole traders who cannot reclaim VAT
- Matches consumer psychology (they don't think about VAT)
- Competitors like CallChimps likely use this approach (no +VAT shown)

**Cons:**
- Makes your prices look higher to VAT-registered businesses (they compare ex-VAT prices)
- You must still issue VAT invoices showing the breakdown
- Less common for B2B SaaS — may look less professional to larger buyers

**Best for:** If most of your clients are sole traders under the VAT threshold.

---

## The Critical Market Insight

**The UK trades market is ~70% sole traders / 30% limited companies.**

| Tradesperson Type | VAT Registered? | Cares About | Preferred Pricing |
|-------------------|----------------|-------------|-------------------|
| **Sole trader (<£85K turnover)** | **NO** | Total monthly cost | VAT-inclusive |
| **Sole trader (£85K+ turnover)** | YES | Net cost after reclaim | Ex-VAT |
| **Limited company** | YES | Net cost, tax efficiency | Ex-VAT |
| **Multi-location business** | YES | Professional invoicing | Ex-VAT |

**Most tradespeople starting out are NOT VAT registered.** They are one-man bands doing £40K–£70K/year. For them, the total price matters.

---

## Recommended Approach: Hybrid "Total First" Display

**Best practice for the trades market:** Show the total price prominently, but make the VAT breakdown transparent.

### Recommended Pricing Display:

```
£69/month
For sole traders. No setup fee. Cancel anytime.
(£57.50 + £11.50 VAT = £69 total)
```

Or for the pricing page:

| Plan | Monthly Total | For VAT-registered businesses |
|------|--------------|------------------------------|
| **Solo** | **£69** | £57.50 ex VAT |
| **Business** | **£129** | £107.50 ex VAT |
| **Professional** | **£219** | £182.50 ex VAT |
| **Enterprise** | **£499** | £415.83 ex VAT |

**Why this works:**
1. **Sole traders see the total** — no confusion, no checkout shock
2. **VAT-registered businesses see the ex-VAT** — they know their net cost
3. **Transparent** — builds trust, no hidden fees
4. **Different from Trade Receptionist** — they show "+VAT" which creates a negative surprise. We show "VAT included" which creates positive clarity.

---

## Stripe Setup for VAT

### If you register for VAT:

1. **Enable VAT in Stripe:**
   - Dashboard → Tax → Enable Stripe Tax or Taxamo
   - Set tax rate: 20% (UK standard rate)
   - Apply to all UK customers

2. **Stripe Tax (Recommended):**
   - Automatically calculates VAT at checkout
   - Handles VAT invoices
   - Supports VAT MOSS if you sell to EU
   - Cost: 0.5% of transaction

3. **Invoice display:**
   - Line 1: Solo Plan — £57.50
   - Line 2: VAT @ 20% — £11.50
   - **Total: £69.00**

4. **For annual billing:**
   - Annual total / 12 = monthly equivalent
   - Show annual discount clearly

---

## Competitor Price Comparison (VAT-Inclusive View)

To compare apples-to-apples, here's what competitors actually cost:

| Competitor | Their Price | Likely VAT Treatment | **Actual Monthly Cost** |
|------------|------------|---------------------|----------------------|
| **Trade Receptionist** Starter | £29 + VAT | Ex-VAT | **£34.80** |
| **Trade Receptionist** Pro | £59 + VAT | Ex-VAT | **£70.80** |
| **Trade Receptionist** Agency | £119 + VAT | Ex-VAT | **£142.80** |
| **CallChimps** Basic | £29/mo | Likely inc-VAT | **£29.00** |
| **CallChimps** Growth | £89/mo | Likely inc-VAT | **£89.00** |
| **CallChimps** Premium | £179/mo | Likely inc-VAT | **£179.00** |
| **Team Connect** Smart | £9.99/mo | Likely inc-VAT | **£9.99** |
| **Team Connect** Business | £39.99/mo | Likely inc-VAT | **£39.99** |
| **Team Connect** Enterprise | £99.99/mo | Likely inc-VAT | **£99.99** |
| **VoiceFleet** Starter | €99/mo | No UK VAT | **~£84.00** |
| **Moneypenny** | ~£99-245/mo | Ex-VAT | **£118.80-294.00** |

### whoza.ai (VAT-Inclusive Pricing):

| Tier | Monthly Total | vs. Trade Receptionist | vs. CallChimps | vs. Team Connect |
|------|--------------|----------------------|---------------|-----------------|
| **Solo** | **£69** | Cheaper than their Pro (£70.80) | Cheaper than Growth (£89) | More than Business (£39.99) |
| **Business** | **£129** | Cheaper than their Agency (£142.80) | Cheaper than Premium (£179) | More than Enterprise (£99.99) |
| **Professional** | **£219** | — | More than Premium (£179) | — |
| **Enterprise** | **£499** | — | — | — |

**Insight:** At VAT-inclusive pricing, whoza.ai Solo (£69) is positioned **below Trade Receptionist Pro** (£70.80) while offering more value (bundle). This is a strong competitive position.

---

## Decision Required

**Dru — you need to decide:**

| Option | Display | Best For | Risk |
|--------|---------|----------|------|
| **A** | £49 + VAT (ex-VAT) | B2B buyers, VAT-registered clients | Sole trader sticker shock |
| **B** | £49 inc VAT (inclusive) | Sole traders, consumer psychology | B2B perception of higher prices |
| **C (Recommended)** | **£69 total (£57.50 + VAT)** | Both markets | None — transparent |

**My recommendation: Option C — "Total First" display.**

- Show the total price as the headline (£69, £129, £219, £499)
- Show the VAT breakdown as secondary text
- Issue proper VAT invoices with breakdown
- Register for VAT voluntarily from day one

**Why:** The UK trades market is predominantly sole traders. They cannot reclaim VAT. They care about the total cost. A £69 total is easier to sell than a £49 + VAT that becomes £58.80.

---

## Action Items

1. **Decide VAT treatment** — Which option above? (A, B, or C)
2. **Register for VAT** — With HMRC (free, takes ~2 weeks)
3. **Configure Stripe Tax** — Enable automatic VAT calculation
4. **Update all pricing pages** — Show total + VAT breakdown
5. **Update all docs** — Revise P&L, competitive analysis, and bundle pricing with VAT treatment
6. **Invoice template** — Create VAT-compliant invoice with breakdown

---

*Note: This is UK-specific. If you expand to EU/US, tax treatment will differ.*
