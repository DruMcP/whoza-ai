---
created: 2026-04-29
updated: 2026-04-29
tags: [decision, pricing, business]
status: accepted
owner: "Agent-1: CTO Architect / Dru"
impact: high
---

# Decision — Pricing Architecture

## Context
whoza.ai needs clear, defensible pricing for the AI Voice + AI Visibility bundle that positions us against both cheap AI tools and expensive human receptionists.

## Options Considered
| Tier | Price | Voice Only | Bundle (Voice + Visibility) |
|------|-------|-----------|---------------------------|
| Found | £149/mo | 24/7 answering, 1 number, call summaries, email alerts | £199/mo |
| Connected | £299/mo | + Calendar booking, CRM sync, WhatsApp notifications | £349/mo |
| Complete | £499/mo | + Dedicated account manager, priority support, custom scripts | £549/mo |

**Note:** If partner cost is $59–99/customer (PulsyAI range), margins are:
- Found (£149): ~60% gross margin
- Connected (£299): ~80% gross margin
- Complete (£499): ~85% gross margin

## Decision
**Adopt a 4-tier bundle pricing model:**

| Tier | Monthly | Annual | Target Customer |
|------|---------|--------|----------------|
| **Solo** | £69 | £690 | Single tradesperson, 1 number, basic answering |
| **Business** | £129 | £1,290 | Small firm, calendar booking, CRM sync |
| **Professional** | £219 | £2,190 | Growing firm, multiple numbers, priority support |
| **Enterprise** | £499 | £4,990 | Multi-location, custom scripts, dedicated AM |

**Bundle discount:** Voice + Visibility bundle priced at 15–25% less than separate purchase.

## Rationale
- Solo £69 matches the "premium AI" bracket — more than cheap tools (£20–40), far less than human receptionists (£99–250)
- Position against Moneypenny, not CallChimps: "human-quality call handling at AI prices"
- Bundle creates structural moat: no competitor offers both visibility + voice
- Annual pricing gives 2 months free, improving cash flow and retention

## Consequences
- Positive: Clear differentiation, predictable revenue, high margins
- Negative: Solo tier is thin margin until scale; may need to raise after proving value
- Risk: Price sensitivity in trades market → mitigated by 14-day free trial

## Reversibility
**Fully reversible.** Pricing can be adjusted in Stripe dashboard within minutes. A/B test different price points on landing pages.

## Related
- [[Reference — Competitive Pricing Analysis]] — Market benchmarks
- [[Reference — PnL Model]] — Unit economics
- [[Project — Free Trial Design]] — Trial feeds into pricing
- [[Index — Decisions]]
