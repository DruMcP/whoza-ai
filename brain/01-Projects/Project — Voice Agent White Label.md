---
created: 2026-04-29
updated: 2026-04-29
tags: [project, voice, active]
status: active
owner: "Agent-4: Voice Integration Engineer"
priority: P0
---

# Project — Voice Agent White Label

## Objective
Launch a white-labelled AI voice receptionist for UK SMEs, powered by a technical partner (Trillet base design) with whoza.ai handling packaging, sales, and tier-1 support.

## Context
whoza.ai is pivoting from pure AI-visibility SaaS to a bundled offer that includes:
1. AI visibility management (existing)
2. AI voice receptionist (new — white labelled)
3. Optional directory/trade integration

This project was spawned by [[Decision — White-Label vs Build Voice]] and informed by [[Research — Trillet Deep Dive]], [[Research — Retell White Label]], and [[Research — UK Voice Agent Suppliers]].

## Key Results
- [ ] Trillet integration confirmed (call divert, number supply, minute bundles)
- [ ] White-label branding flow defined
- [ ] Client onboarding flow (< 5 min to live)
- [ ] Pricing model validated against [[Reference — PnL Model]]
- [ ] First paying client onboarded

## Current Status
- **Design base:** Trillet (replication of Trade Receptionist feature set)
- **Backup:** Retell (client-by-client white label, no upfront fees)
- **Numbers:** UK suppliers for call divert from client existing numbers
- **Commercial model:** Per-minute + SaaS tier

## Open Questions
1. Does Trillet supply client telephone numbers for divert? → [[Research — Trillet Deep Dive]]
2. Does Trillet offer minute bundles with overage? → [[Research — Trillet Deep Dive]]
3. Can we do true white-label (our branding, their infra) per client? → [[Research — Retell White Label]]

## Resources
- Full design spec: [[TRILLET_DESIGN_AND_COSTING.md]] (flat file)
- PnL model: [[TRILLET_PnL_MODEL.md]] (flat file)
- Supplier deep dive: [[UK_VOICE_AGENT_SUPPLIER_DEEP_DIVE.md]] (flat file)
- Retell investigation: [[RETELL_WHITE_LABEL_INVESTIGATION.md]] (flat file)

## Related
- [[Project — Trade Receptionist Feature Replication]] — Feature-level spec
- [[Reference — Validated Business Model]] — Business context
- [[Decision — Trillet as Voice Provider]] — Why Trillet won
- [[Person — Trillet Contact]] — Supplier relationship
- [[Index — Projects]]
