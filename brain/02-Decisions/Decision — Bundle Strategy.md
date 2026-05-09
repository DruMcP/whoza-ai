---
created: 2026-04-29
updated: 2026-04-29
tags: [decision, product, strategy]
status: accepted
owner: "Agent-1: CTO Architect / Dru"
impact: high
---

# Decision — Bundle Strategy

## Context
Should whoza.ai sell AI Voice and AI Visibility as separate products or as a bundled offering?

## Options Considered
| Model | Pros | Cons |
|-------|------|------|
| **Separate products** | Clear pricing, customers buy only what they need | Lower LTV, no competitive moat, customers manage 2 subscriptions |
| **Bundled only** | Higher LTV, strong moat, single invoice | Higher entry price, some customers only need one product |
| **Bundle + à la carte** | Best of both: bundle discount + individual options | Complex pricing, more SKUs to manage |

## Decision
**Bundle-first with à la carte option. Bundle priced 15–25% below separate purchase.**

## Rationale
The bundle creates a structural moat: no UK competitor offers SEO + voice together. The two services form a growth loop:
```
AI Visibility → more search impressions → more calls
AI Voice Agent → answers every call → books every job
Reviews → boost ranking → more visibility
```

## Competitive Impact
| Competitor | What They Solve | What They Don't |
|-----------|----------------|-----------------|
| Moneypenny | Answer the phone | Get you found online |
| CallChimps | Answer the phone | SEO, listings, reviews |
| Yell | Get you found | Answer the phone |
| Checkatrade | Get you found | Answer the phone |
| **whoza.ai (bundle)** | **Get found AND answer** | Nothing — full pipeline |

## Churn Impact
Bundled clients typically churn 30–50% less than single-product clients. Double the friction to leave (phone number divert + SEO content + review strategy).

## LTV Impact
| Model | Monthly ARPU | Annual LTV (24 mo) |
|-------|--------------|-------------------|
| Voice only | £99 | £2,376 |
| Visibility only | £79 | £1,896 |
| **Bundle** | **£149** | **£3,576** |
| Bundle uplift | **+51%** | **+50%** |

## Consequences
- Positive: Genuine moat, higher LTV, lower churn, single invoice
- Negative: Higher entry price may deter small sole traders → mitigated by Solo £69 tier
- Risk: Bundle complexity in marketing → mitigated by simple pitch: "We make sure customers find you, then make sure every call becomes a booking"

## Reversibility
**Fully reversible.** Can unbundle at any time by creating separate Stripe products.

## Related
- [[Reference — Bundle Strategy Analysis]] — Full analysis
- [[Decision — Pricing Architecture]] — Pricing tiers
- [[Project — Voice Agent White Label]] — Execution
- [[Index — Decisions]]
