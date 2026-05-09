---
created: 2026-04-29
updated: 2026-04-29
tags: [decision, voice, tech]
status: accepted
owner: "Agent-1: CTO Architect / Dru"
impact: high
---

# Decision — White-Label vs Build Voice

## Context
whoza.ai needed to add AI voice receptionist capability. Core question: build proprietary voice infra or white-label an existing provider?

## Options Considered
| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Build own voice stack** (Vapi + custom) | Full control, no dependency | 3–6 month build, high maintenance, £50k+ dev cost | Very high |
| **White-label Trillet** | Fast launch, proven UK receptionist feature, minute bundles | Limited customization, supplier dependency | Low upfront, usage-based |
| **White-label Retell** | Per-client branding, no upfront fees, flexible | Less mature UK offering, more integration work | Low upfront, usage-based |

## Decision
**White-label via Trillet as primary, Retell as backup per-client.**

We will not build proprietary voice infrastructure. Speed to market and capital efficiency are more important than full control at this stage. Trillet already has the "Trade Receptionist" feature set we want to replicate. Retell offers a viable alternative if Trillet cannot meet white-label terms for a specific client.

## Consequences
- Positive: Launch in weeks not months; proven UK call handling; bundle-ready
- Negative: Margin compression; supplier risk; limited deep customization
- Risk: Trillet changes pricing or terms → mitigated by Retell backup

## Reversibility
**Reversible in 3–6 months.** If volume justifies it, we can migrate to a hybrid or fully owned stack. Data portability is acceptable (call logs, recordings).

## Related
- [[Project — Voice Agent White Label]] — Execution
- [[Research — Trillet Deep Dive]] — Primary supplier intel
- [[Research — Retell White Label]] — Backup supplier intel
- [[Index — Decisions]]
