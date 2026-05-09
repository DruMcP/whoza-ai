---
created: 2026-04-29
updated: 2026-04-29
tags: [project, voice, planning, features]
status: planning
owner: "Agent-4: Voice Integration Engineer"
priority: P2
---

# Project — Trade Receptionist Feature Replication

## Objective
Replicate the full feature set of Trade Receptionist's "Sarah" AI on the whoza.ai platform, using Trillet as the underlying engine.

## Context
Trade Receptionist is the most mature UK trades-specific AI voice product. Their feature set is the benchmark. We need parity plus our bundle advantage.

## Key Results
- [ ] Trade-specific AI scripts (15 UK trades)
- [ ] 24/7 answering with natural British voices (Sarah, James, Alex)
- [ ] Calendar booking (Google Calendar, Outlook, ServiceM8)
- [ ] Job qualification (postcode, job type, urgency, budget)
- [ ] Emergency routing (burst pipe → instant mobile transfer)
- [ ] Spam filtering (PPI, cold calls blocked)
- [ ] Call summaries via WhatsApp/SMS after every call
- [ ] Call recordings accessible in dashboard
- [ ] CRM integrations (GoHighLevel, HubSpot)
- [ ] Review request 24h after booking
- [ ] Setup time: 10–15 minutes

## Feature Parity Matrix

| Feature | Trade Receptionist | whoza.ai (Target) | Status |
|---------|-------------------|-------------------|--------|
| Trades-specific AI | ✅ | ✅ (via Trillet) | Planned |
| 24/7 answering | ✅ | ✅ | Planned |
| Calendar booking | ✅ | ✅ | Planned |
| Emergency routing | ✅ | ✅ | Planned |
| Job qualification | ✅ | ✅ | Planned |
| WhatsApp summaries | ✅ | ✅ (SMS via Trillet) | Planned |
| Call recordings | ❌ | ✅ | Advantage |
| CRM integration | ❌ | ✅ | Advantage |
| Review generation | ❌ | ✅ | Advantage |
| AI Visibility bundle | ❌ | ✅ | **UNIQUE** |
| White-label branding | ❌ | ✅ | Advantage |
| Transparent pricing | ❌ | ✅ | Advantage |

## Missing Features (Post-MVP Roadmap)
- Postcode routing (nearest engineer)
- Photo request via SMS
- SMS Hub (bulk campaigns, boiler service reminders)
- Mobile app for tradespeople

## Voice Personas
| Name | Accent | Personality | Best For |
|------|--------|-------------|----------|
| Sarah | British (neutral) | Warm, professional | General trades |
| James | British (Northern) | Friendly, direct | Builders, roofers |
| Alex | British (Scottish) | Efficient, calm | Electricians, HVAC |

## Resources
- Full spec: [[TRADE_RECEPTIONIST_FEATURE_REPLICATION.md]] (flat file, 13KB)
- Voice design: [[TRILLET_DESIGN_AND_COSTING.md]] (flat file)
- Supplier deep dive: [[UK_VOICE_AGENT_SUPPLIER_DEEP_DIVE.md]] (flat file)

## Related
- [[Project — Voice Agent White Label]] — Parent project
- [[Project — Pre-Production Build]] — Where features are built
- [[Research — Trillet Deep Dive]] — Platform capabilities
- [[Index — Projects]]
