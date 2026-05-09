---
created: 2026-04-29
updated: 2026-04-29
tags: [decision, infrastructure, devops]
status: accepted
owner: "Agent-1: CTO Architect / Agent-3: DevOps Guardian"
impact: high
---

# Decision — Staging Branch Strategy (Not Separate Repo)

## Context
We needed a staging environment for the voice + bundle platform without disrupting the live production site.

## Options Considered
| Approach | Pros | Cons |
|----------|------|------|
| **Separate repo** (`whoza-ai-staging`) | Completely isolated, can break anything | Double CI/CD, drift between repos, merge conflicts later |
| **Branch-based (`staging` branch)** | Same repo, same history, easy merge to `main`, shared CI/CD | Need discipline to not touch `main` |

## Decision
**Branch-based staging. Create `staging` branch in existing `whoza-ai` repo. Deploy to separate Netlify site.**

## Rationale
- We're adding a voice layer to an existing site, not rebuilding from scratch
- One repo = one history = one merge when ready
- Shared CI/CD = less maintenance
- Branch discipline is enforced by code review + Agent-3 monitoring

## Implementation
```
GitHub repo: whoza-ai
├── main branch → whoza.ai (production)
├── staging branch → whoza-ai-staging.netlify.app (staging)
└── feature/* branches → preview deploys
```

## Consequences
- Positive: Simple, cheap, no drift
- Negative: Accidental `main` push could break production → mitigated by branch protection + Agent-3
- Risk: Staging data (fake) could leak to production → separate Supabase projects prevent this

## Reversibility
**Trivial.** Can create a separate repo later if needed. Just clone and repoint Netlify.

## Related
- [[Project — Pre-Production Build]] — Execution
- [[Process — Deploy to Staging]] — Runbook
- [[Process — Deploy to Production]] — Runbook
- [[Index — Decisions]]
