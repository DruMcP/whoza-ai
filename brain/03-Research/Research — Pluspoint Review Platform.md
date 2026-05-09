---
created: 2026-05-02
updated: 2026-05-02
tags: [research, reviews, competitor, platform]
credibility: secondary
source: prior session research
---

# Research — Pluspoint Review Platform

## Overview
Pluspoint identified as a potential review platform partner during competitive research. Currently on hold pending Claire MVP build.

## Pricing
- **$49/mo per location**
- Unlimited SMS/WhatsApp review requests
- API included

## Feature Set (Inferred)
- Automated review requests via SMS/WhatsApp
- Multi-platform review collection (Google, Trustpilot, etc.)
- Dashboard and analytics
- API access for integrations

## Comparison vs. Claire (Custom Build)

| Dimension | Pluspoint | Claire (Custom) |
|-----------|-----------|-----------------|
| Cost | $49/mo/location | Marginal (existing stack) |
| Trigger | Unknown / generic | Job completion webhook (perfect integration) |
| Channel | SMS/WhatsApp | Same WhatsApp thread customer already used |
| Positioning | Review collection | Post-job conversion engine |
| Revenue framing | Stars/ratings | "More jobs" |
| Control | Vendor-dependent | Full stack ownership |
| Brand | Pluspoint branding | whoza.ai native |

## Open Questions
1. Does Pluspoint have a webhook/API that can trigger from job completion events?
2. Can Pluspoint messages be white-labeled (no Pluspoint branding)?
3. What is the actual conversion rate of Pluspoint vs. custom messaging?
4. Does Pluspoint support sentiment routing (happy→Google, unhappy→private)?

## Current Stance
- **Claire MVP is being built custom** — 9-day build cycle
- **Pluspoint evaluation deferred to Phase 2** (Month 2-3)
- If Pluspoint API is robust and white-label friendly, it may accelerate Phase 2 multi-platform features
- If Pluspoint has job-completion triggers and better conversion rates, it could replace custom messaging layer

## Decision Gate
**Evaluate Pluspoint after Claire MVP is live and baseline metrics are established.**
- If Claire MVP hits >30% conversion: custom build is validated, keep building
- If Claire MVP struggles: re-evaluate Pluspoint or other partners

## Related
- [[Project — Pre-Production Build]] — Claire build in progress
- [[Decision — Claire is Post-Job Conversion Engine]] — Why custom build over off-the-shelf
- [[docs/CLAIRE_MVP_SPEC.md]] — Claire technical specification
- [[9_PLUS_WORLD_CLASS_PLAN.md]] — Section 5.9: Future expansion roadmap
- [[Index — Research]]
