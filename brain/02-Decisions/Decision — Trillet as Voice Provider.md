---
created: 2026-04-29
updated: 2026-06-25
tags: [decision, adr, voice, supplier]
status: accepted
owner: "Agent-1 / Dru"
impact: high
---

# Decision — Trillet as Voice Provider

## Context
Following [[Decision — White-Label vs Build Voice]], the choice was made to white-label rather than build a voice agent from scratch. Trillet was selected as the primary voice platform supplier after evaluation of UK voice agent suppliers.

## Options Considered
| Option | Pros | Cons | Cost |
|--------|------|------|------|
| Build custom voice (VAPI + self-hosted) | Full control, no vendor dependency | High dev cost, ongoing maintenance, slower to market | £50k+ build, £2k/mo run |
| White-label Trillet | Fast deployment, proven UK trades focus, white-label ready | Vendor dependency, margin sharing | Revenue share |
| White-label Retell | Good tech, flexible | Less UK-trades specific, white-label limitations | Revenue share |

## Decision
**Chosen: White-label Trillet** as the primary voice agent platform.

Trillet offered the best combination of:
- UK trades market focus and understanding
- White-label capability (branded as whoza.ai)
- Proven call-answering performance for trade businesses
- Fast time-to-market (weeks not months)

## Consequences
- **Positive:** Speed to market, reduced dev cost, proven voice quality
- **Negative:** Revenue share reduces margins, vendor lock-in risk
- **Risks:** Trillet platform changes could affect whoza.ai service

## Reversibility
Medium. Switching voice providers would require re-recording voice personas and rebuilding call flows. Possible but not trivial.

## Related
- [[Decision — White-Label vs Build Voice]] — Parent decision
- [[Research — Trillet Deep Dive]] — Due diligence
- [[Research — UK Voice Agent Suppliers]] — Full supplier comparison
- [[Trillet.ai Integration Knowledge Base]] — Technical integration details
- [[Project — Voice Agent White Label]] — Implementation project
- [[Index — Decisions]]
