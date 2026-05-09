---
created: 2026-04-29
updated: 2026-04-29
tags: [project, product, planning]
status: planning
owner: "Agent-9: Onboarding Guide"
priority: P1
---

# Project — Free Trial Design

## Objective
Design a 14-day free trial (no credit card) that maximizes trial-to-paid conversion while keeping marginal cost low (~£1–3 per trial user).

## Context
Free trials are the primary conversion mechanism for the voice + visibility bundle. Trade Receptionist offers 14 days no card. VoiceFleet offers 7 days no card. We match or exceed the best competitor offer.

## Key Results
- [ ] Trial flow built in production
- [ ] 14-day trial, no card, full feature access
- [ ] 500-minute cap during trial
- [ ] Auto-convert to paid on Day 15 (email + SMS reminder 48h before)
- [ ] One-click cancellation in dashboard
- [ ] Trial-to-paid conversion rate ≥ 20%

## Chosen Design: Option A — 14 Days, No Card, Full Access

| Parameter | Setting |
|-----------|---------|
| Duration | 14 days |
| Credit card required? | No |
| Features included | Full bundle (Voice + Visibility) |
| Minutes cap | 500 minutes (generous but not unlimited) |
| Visibility cap | Full access — no restrictions |
| UK number | Included |
| Auto-convert? | Yes — Stripe subscription starts Day 15 unless cancelled |
| Reminder | Email + SMS 48 hours before trial ends |
| Cancellation | One-click in dashboard, no questions, instant |

## Marginal Cost Per Trial
| Cost Item | Amount |
|-----------|--------|
| UK phone number | ~£1–2/month |
| Trillet minutes (500 cap) | Within 300-min pool → effectively £0 |
| Supabase storage/compute | Negligible |
| Stripe fees | Only on paid conversion |
| **Total marginal cost** | **~£1–3 per trial** |

## Trial User Journey
```
[Visit whoza.ai/voice]
    ↓
[Click "Start Free Trial"]
    ↓
[Stripe Checkout — NO card required]
    ↓
[Enter: business name, trade type, phone number, postcode]
    ↓
[Auto-provisioned on Trillet]
    ↓
[Get whoza.ai dashboard + divert instructions]
    ↓
[Day 3: "How's it going?" email with tips]
    ↓
[Day 7: Mid-trial check-in — call stats summary]
    ↓
[Day 12: "Your trial ends in 2 days" email + SMS]
    ↓
[Day 13: "Add payment details to keep your AI" reminder]
    ↓
[Day 15: Auto-convert to paid OR account pauses]
    ↓
[Post-conversion: Welcome to whoza.ai — onboarding sequence]
```

## Rejected Options
- **Option B (7 days):** Too short for tradespeople to see real call volume
- **Option C (30 days, card required):** Card requirement kills 40–60% of signups
- **Option D (Freemium 50 min):** 50 min is barely useful; no revenue until upsell

## Anti-Gaming Measures
- One trial per phone number (verified via SMS)
- One trial per business domain/email
- 30-day cooldown before re-trial
- Flag suspicious patterns (same IP, same device, multiple trials)

## Resources
- Full spec: [[FREE_TRIAL_DESIGN.md]] (flat file, 15KB)
- PnL model: [[TRILLET_PnL_MODEL.md]] (flat file)
- Competitor intel: [[COMPETITIVE_INTELLIGENCE_REPORT.md]] (flat file)

## Related
- [[Project — Voice Agent White Label]] — Trial is the entry point
- [[Project — Client Onboarding]] — Trial flows into onboarding
- [[Index — Projects]]
