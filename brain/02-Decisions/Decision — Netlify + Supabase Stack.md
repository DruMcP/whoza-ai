---
created: 2026-04-29
updated: 2026-04-29
tags: [decision, infrastructure, tech]
status: accepted
owner: "Agent-1: CTO Architect"
impact: high
---

# Decision — Netlify + Supabase Stack

## Context
whoza.ai needed a hosting and backend stack that is cost-effective, scalable, and developer-friendly for a small team.

## Options Considered
| Option | Pros | Cons |
|--------|------|------|
| **Netlify + Supabase** | Free tier generous, instant deploys, edge functions, real-time DB | Netlify function cold starts; Supabase free tier limits |
| **Vercel + PlanetScale** | Better Next.js support, MySQL scalability | PlanetScale deprecated free tier; more expensive |
| **AWS (ECS + RDS + Lambda)** | Infinite scale, enterprise-grade | Complex, expensive at small scale, overkill |
| **Firebase + GCP** | Google's ecosystem, good for mobile | Vendor lock-in, pricing traps at scale |

## Decision
**Netlify (hosting) + Supabase (database + auth + edge functions).**

## Rationale
- Cost: Both have generous free tiers; ~£0 at current scale
- Speed: Netlify deploys from Git in seconds; Supabase provisions instantly
- Features: Edge functions on Netlify match Supabase edge functions; real-time subscriptions
- Team size: One developer (Agent-2) can manage entire stack
- Migration path: Can move to AWS later if scale justifies it

## Architecture
```
[Netlify CDN]
    ├── Static site (homepage, landing pages, blog)
    ├── Edge functions (webhooks, API routes)
    └── Functions (Stripe checkout, Trillet API calls)
    
[Supabase]
    ├── PostgreSQL database (users, calls, subscriptions)
    ├── Auth (magic link + OAuth)
    ├── Edge functions (auth hooks, triggers)
    └── Real-time subscriptions (live dashboard)
```

## Consequences
- Positive: £0 infra cost at current scale; instant deploys; no DevOps overhead
- Negative: Netlify function cold starts (200–500ms); Supabase free tier project pauses after 7 days inactivity
- Risk: Hitting free tier limits → upgrade to Pro (~£20/mo each)

## Reversibility
**Reversible but painful.** Database migration from PostgreSQL to another PostgreSQL host is straightforward. Frontend can be deployed anywhere that serves static files.

## Related
- [[Project — Pre-Production Build]] — Staging uses same stack
- [[Reference — Site Architecture]] — Technical details
- [[Index — Decisions]]
