# whoza.ai Pricing — VAT Treatment: CONFIRMED
**Date:** 2026-04-28  
**Status:** CONFIRMED — Option C (Total First Display)  
**Decision by:** Dru

---

## Confirmed VAT Treatment

**Display format:** Total price as headline, VAT breakdown as secondary text.

| Plan | Monthly Total | Ex-VAT (Revenue) | VAT @ 20% |
|------|--------------|------------------|-----------|
| **Solo** | **£69** | £57.50 | £11.50 |
| **Business** | **£129** | £107.50 | £21.50 |
| **Professional** | **£219** | £182.50 | £36.50 |
| **Enterprise** | **£499** | £415.83 | £83.17 |

**Invoice line items:**
- Solo Plan — £57.50
- VAT @ 20% — £11.50
- **Total due: £69.00**

**Stripe configuration:** Enable Stripe Tax (0.5% fee). Auto-calculates 20% UK VAT. Customer sees total at checkout. Invoice shows breakdown.

**Action:** Register for VAT with HMRC (free, ~2 weeks). Issue VAT invoices from day one.

---

## Why This Decision

1. **Sole traders are 70% of the market** — they cannot reclaim VAT. Total price matters.
2. **No checkout shock** — price shown = price paid. Unlike Trade Receptionist's "+VAT" surprise.
3. **B2B buyers see ex-VAT** — secondary text shows £57.50 ex-VAT for their accounting.
4. **Trust through transparency** — no hidden fees, no ambiguity.
5. **Competitive positioning** — Solo £69 total vs Trade Receptionist Pro £70.80 total = we win.

---

## Updated Competitive Price Comparison (VAT-Inclusive)

| Competitor | Their Price | Likely VAT | **Actual Monthly Cost** |
|------------|------------|----------|------------------------|
| Trade Receptionist Starter | £29 + VAT | Ex-VAT | **£34.80** |
| Trade Receptionist Pro | £59 + VAT | Ex-VAT | **£70.80** |
| Trade Receptionist Agency | £119 + VAT | Ex-VAT | **£142.80** |
| CallChimps Basic | £29/mo | Inc-VAT | **£29.00** |
| CallChimps Growth | £89/mo | Inc-VAT | **£89.00** |
| CallChimps Premium | £179/mo | Inc-VAT | **£179.00** |
| Team Connect Smart | £9.99/mo | Inc-VAT | **£9.99** |
| Team Connect Business | £39.99/mo | Inc-VAT | **£39.99** |
| Team Connect Enterprise | £99.99/mo | Inc-VAT | **£99.99** |
| VoiceFleet Starter | €99/mo | No UK VAT | **~£84.00** |
| Moneypenny | ~£99-245/mo | Ex-VAT | **£118.80-294.00** |
| **whoza.ai Solo** | **£69/mo** | Total first | **£69.00** |
| **whoza.ai Business** | **£129/mo** | Total first | **£129.00** |
| **whoza.ai Professional** | **£219/mo** | Total first | **£219.00** |
| **whoza.ai Enterprise** | **£499/mo** | Total first | **£499.00** |

**Positioning:** whoza.ai Solo (£69) sits between Trade Receptionist Starter (£34.80) and Pro (£70.80), but offers **bundle value** (voice + visibility) neither provides.

---

## Updated P&L Model (Ex-VAT Revenue)

**Key change:** Revenue figures below are the **ex-VAT amount whoza.ai retains** (before Trillet costs). VAT portion (£11.50–£83.17 per client) is remitted to HMRC and not counted as revenue.

| Plan | Total Price | Ex-VAT Revenue | Est. Usage | Trillet Cost | Gross Profit | Margin |
|------|------------|----------------|------------|--------------|--------------|--------|
| **Solo** | £69 | **£57.50** (~$73) | ~300 min | ~$27 | **~$46** | **~63%** |
| **Business** | £129 | **£107.50** (~$136) | ~600 min | ~$54 | **~$82** | **~60%** |
| **Professional** | £219 | **£182.50** (~$232) | ~1,200 min | ~$108 | **~$124** | **~53%** |
| **Enterprise** | £499 | **£415.83** (~$528) | ~3,000 min | ~$270 | **~$258** | **~49%** |

*(Assumes £1 = $1.27, Trillet blended rate ~$0.09/min)*

### Portfolio P&L — 30 Clients (Updated)

| Client Mix | Total Price Revenue | Ex-VAT Revenue | Trillet Costs | Other Costs | Net Profit | Margin |
|------------|---------------------|----------------|---------------|-------------|------------|--------|
| 12 Solo (£69) | £828 | £690 (~$876) | ~$324 | ~$100 | **~$452** | ~52% |
| 12 Business (£129) | £1,548 | £1,290 (~$1,638) | ~$648 | — | — | — |
| 6 Pro (£219) | £1,314 | £1,095 (~$1,391) | ~$648 | — | — | — |
| **TOTAL 30 clients** | **£3,690** | **£3,075 (~$3,905)** | **~$1,620** | **~$100** | **~$2,185** | **~56%** |

**Note:** This replaces the previous P&L which used ex-VAT prices as revenue. The margin is slightly lower because the effective revenue is 83.3% of the headline price (after VAT), but still healthy at 56% net margin at 30 clients.

---

## Updated Bundle Pricing (VAT-Inclusive)

| Tier | Bundle Total | Voice + Visibility Value | Discount vs Separate |
|------|-------------|-------------------------|---------------------|
| **Solo** | **£69** | Voice £49 + Vis £39 = £88 | **22%** |
| **Business** | **£129** | Voice £99 + Vis £79 = £178 | **28%** |
| **Professional** | **£219** | Voice £199 + Vis £149 = £348 | **37%** |
| **Enterprise** | **£499** | Voice £499 + Vis £299 = £798 | **37%** |

**Marketing display:**
```
Solo — £69/month
Voice answering + Google visibility. For sole traders.
(£57.50 + £11.50 VAT = £69 total)
```

---

## Action Checklist

- [x] VAT treatment decided (Option C — Total First)
- [ ] Register for VAT with HMRC
- [ ] Configure Stripe Tax (20% UK VAT)
- [ ] Update pricing page on whoza.ai
- [ ] Update all marketing materials with total pricing
- [ ] Create VAT invoice template
- [ ] Update P&L model (ex-VAT revenue basis)
- [ ] Update competitive pricing analysis
- [ ] Update bundle strategy document
- [ ] Brief any sales copy with "no hidden fees, VAT included" messaging

---

## Key Messaging

**For sole traders:**
> "£69/month. That's the total. No setup fees, no hidden charges. VAT is included."

**For VAT-registered businesses:**
> "£69/month total (£57.50 ex VAT). You can reclaim the £11.50 VAT."

**Vs. competitors:**
> "Trade Receptionist says £29 + VAT. That's really £34.80. whoza.ai Solo is £69 total — and you get voice AND visibility, not just answering."

---

*Confirmed 2026-04-28. All pricing documents to be updated to reflect total-first VAT treatment.*
