---
created: 2026-04-29
updated: 2026-04-29
tags: [reference, pnl, financial]
---

# Reference — PnL Model

## Unit Economics (Trillet-Based)

### Cost Structure
| Cost Item | Amount | Notes |
|-----------|--------|-------|
| Trillet Agency Plan | $299/mo (~£235) | Unlimited sub-accounts |
| Trillet per-minute cost | ~$0.09/min (~£0.07) | Voice + LLM + telephony included |
| UK phone number | ~£1–2/mo per client | Via Trillet |
| Stripe fees | 1.5% + £0.20 per transaction | UK/EU pricing |
| Netlify Pro (if needed) | ~£20/mo | When free tier exceeded |
| Supabase Pro (if needed) | ~£20/mo | When free tier exceeded |

### Revenue Tiers
| Tier | Monthly | Partner Cost | Gross Margin |
|------|---------|-------------|--------------|
| Solo (£69) | £69 | ~£15 | ~78% |
| Business (£129) | £129 | ~£25 | ~81% |
| Professional (£219) | £219 | ~£40 | ~82% |
| Enterprise (£499) | £499 | ~£80 | ~84% |

### Bundle Economics
| Component | Solo | Business | Professional |
|-----------|------|----------|--------------|
| Voice | £69 | £129 | £219 |
| Visibility | £49 | £79 | £129 |
| **Bundle** | **£99** | **£179** | **£299** |
| Bundle discount | 15% | 14% | 15% |

## 24-Month Forecast
| Month | Customers | MRR | ARR |
|-------|-----------|-----|-----|
| 6 | 50 | £5,000 | £60,000 |
| 12 | 300 | £35,000 | £420,000 |
| 18 | 900 | £110,000 | £1,320,000 |
| 24 | 1,800 | £225,000 | £2,700,000 |

**Assumptions:**
- Average ARPU: £129/mo (Business tier)
- Monthly churn: 8% (annual ~60%)
- Net new customers/month by month 18: 150
- CAC: £80–£150

## Break-Even Analysis
- **Fixed costs:** ~£300/mo (Trillet Agency + Netlify + Supabase at Pro tier)
- **Break-even:** ~4 Solo customers or ~2 Business customers
- **Target:** 10+ customers by month 3 for comfortable runway

## Resources
- Full model: [[TRILLET_PnL_MODEL.md]] (flat file, 10KB)
- Business model: [[BUSINESS_MODEL_ANALYSIS.md]] (flat file)
- Bundle strategy: [[BUNDLE_STRATEGY_ANALYSIS.md]] (flat file)

## Related
- [[Decision — Pricing Architecture]] — Pricing tiers
- [[Project — 30-Day Live Test]] — Validate economics
- [[Index — Reference]]
