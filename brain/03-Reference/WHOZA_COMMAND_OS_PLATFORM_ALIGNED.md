# Whoza Command OS — Platform-Aligned v2.1

_Agentic control system for whoza.ai — adapted to whoza's actual architecture_

**Version 2.1 | whoza-Native | May 2026**

---

## 1. System Overview

Whoza Command OS is the agentic management layer for whoza.ai — the AI voice agent platform for UK tradespeople. It operates on top of whoza's existing Next.js + Supabase + Netlify + Trillet infrastructure, managing code, deploy, monitor, and improve cycles through a Sense-Decide-Act-Learn loop.

**Core Tenet:** The system manages the whoza.ai platform's lifecycle — not a generic webapp. Every decision flows through the lens of UK trade businesses, voice AI infrastructure, and the agent team (Katie, Mark, Claire, Rex).

**Managed Lifecycle:**
- **Code:** Next.js frontend, Supabase edge functions, Trillet integration
- **Deploy:** Netlify static + edge function deployment
- **Monitor:** Site health, enquiry pipeline, Trillet webhook reliability, usage thresholds
- **Maintain:** Dependency updates, security patches, Supabase schema migrations
- **Improve:** Conversion optimisation, SEO, agent performance, onboarding friction reduction
- **Document:** Living brain in `whoza-ai/brain/` — not generic docs

### 1.1 What This System Is (whoza Context)

- Autonomous intelligence managing whoza.ai 24/7
- Persistent knowledge in `brain/` + session handoffs in `memory/`
- Task queue fed by: monitoring triggers, user feedback, strategic goals, Dru directives
- Self-improving engine learning from: deployment outcomes, enquiry data, conversion metrics
- Governed system: autonomous for staging/hotfixes, human approval for production/schema/pricing

### 1.2 What This System Is Not

- Not a chatbot waiting for instructions — it initiates from triggers
- Not a replacement for Dru's strategic decisions (partnerships, pricing tiers, brand direction)
- Not magic — requires proper Trillet setup, Supabase project health, Netlify config

---

## 2. The Agentic Control Loop (SDAL)

```
+--------+     +--------+     +--------+     +--------+
| SENSE  | --> | DECIDE | --> |  ACT   | --> | LEARN  |
+--------+     +--------+     +--------+     +--------+
     ^                                            |
     +--------------------------------------------+
```

### 2.1 Sense Phase — whoza-Specific Inputs

| Input Source | What We Monitor | Trigger Example |
|-------------|-----------------|-----------------|
| **Netlify deploy logs** | Build success/failure, deploy frequency | Build fails on `npm run build` |
| **Site health checks** | Uptime, Core Web Vitals, Lighthouse | Performance < 80, uptime != 200 |
| **Trillet webhooks** | `call.completed`, `call.missed`, `usage.threshold` | Webhook 404s, call logs missing |
| **Supabase** | Edge function errors, DB health, RLS policy issues | Function timeout, auth failure |
| **Enquiry pipeline** | Conversion rate, drop-off points, response times | Enquiries drop vs baseline |
| **SEO monitoring** | Rankings, sitemap health, index coverage | Pages de-indexed, rank drop |
| **Security** | `npm audit`, Supabase security scans, secret exposure | Critical CVE, leaked token |
| **User feedback** | Support requests, onboarding drop-off, plan churn | "Can't hear agent", "Too expensive" |
| **Brain drift** | Code changed but brain not updated | New component, stale docs |

### 2.2 Decide Phase — whoza Decision Matrix

| Trigger + Context | Autonomous? | Action | Persona |
|-------------------|-------------|--------|---------|
| Build fails | Yes | Fix error, rebuild, deploy to staging | SiteReliability |
| Lighthouse < 80 | Yes | Auto-optimise images, minify, deploy | SiteReliability |
| Critical CVE in dep | Yes | Patch, test, deploy to staging | SecurityGuardian |
| Trillet webhook 404 | Yes | Check handler, fix route, test | PlatformArchitect |
| Supabase edge fn timeout | Yes | Check function, optimize, redeploy | BackendEngineer |
| Enquiry rate drops 20% | No | Investigate, report to Dru with hypothesis | ProductMaintainer |
| Schema change needed | No | Write migration plan, await Dru approval | PlatformArchitect |
| Pricing change | No | Create impact assessment, await Dru | ProductMaintainer |
| New trade page request | No | Create design + content plan, await Dru | ProductMaintainer |
| Docs-code drift | Yes | Update brain docs to match code | ProductMaintainer |
| Minor dep update | Yes | Update, test, deploy if build passes | SiteReliability |
| Major dep update | No | Create assessment task for Dru | PlatformArchitect |

### 2.3 Act Phase — whoza Action Types

- **Code:** Next.js pages/components, Supabase edge functions, Trillet webhook handlers
- **Deploy:** Netlify static deploy, edge function deploy, Supabase function deploy
- **Monitor:** Configure health checks, webhook monitoring, enquiry tracking
- **Maintain:** `npm audit` patches, Supabase migrations, dependency updates
- **Document:** Update `brain/` files, `memory/` logs, architecture decision records
- **Escalate:** Report to Dru with context, options, recommendation

### 2.4 Learn Phase — whoza Knowledge Updates

Learning outputs written to:
- `brain/03-Research/Learnings/[topic].md` — Pattern recognition, what works/doesn't
- `brain/03-Reference/Runbooks/[scenario].md` — Operational playbooks
- `memory/YYYY-MM-DD.md` — Session logs, decisions, failures
- `brain/Index — Research.md` — Updated with new findings

---

## 3. Agent Personas — Mapped to whoza

### 3.1 Persona Definitions

| Persona | Expertise | whoza Context | Tools |
|---------|-----------|-------------|-------|
| **PlatformArchitect** | System design, schema, integrations | Trillet-Supabase-Netlify architecture, webhook design, data flow | Code gen, ADR creation, schema design |
| **SiteReliabilityEngineer** | Performance, uptime, build health | Netlify builds, Lighthouse, Core Web Vitals, bundle size | Build optimisation, deploy, monitoring |
| **SecurityGuardian** | Vulnerabilities, secrets, compliance | GDPR/ICO compliance, secret scanning, auth security, call recording disclosure | npm audit, secret audit, compliance checks |
| **BackendEngineer** | APIs, database, edge functions | Supabase edge functions, Trillet API integration, webhooks, CKP sync | tRPC (future), Supabase functions, API design |
| **ProductMaintainer** | Content, UX, conversion | Landing pages, trade pages, SEO, onboarding flow, pricing presentation | React, Tailwind, content, A/B test setup |

### 3.2 whoza-Specific Authority Matrix

| Action | Architect | SRE | Security | Backend | Product |
|--------|-----------|-----|----------|---------|---------|
| Staging deploy | Auto | Auto | — | — | — |
| Production deploy | Dru | Dru | Dru | — | — |
| Security patch (critical) | — | — | Auto | — | — |
| Supabase schema change | Dru | — | Dru | Dru | — |
| Trillet config change | Dru | — | — | Dru | — |
| Pricing change | — | — | — | — | Dru |
| Content/SEO update | — | — | — | — | Auto |
| New trade page | — | — | — | — | Dru |
| Dependency minor | — | Auto | Auto | — | — |
| Dependency major | Dru | Dru | Dru | — | — |
| Brain update | Auto | Auto | Auto | Auto | Auto |
| Memory flush | Auto | Auto | Auto | Auto | Auto |

---

## 4. Persistent Memory — whoza Implementation

### 4.1 Three-Tier Architecture

| Tier | Location | Purpose |
|------|----------|---------|
| **Project Brain** | `whoza-ai/brain/` | Curated knowledge: architecture, decisions, research, references |
| **Session Context** | `memory/YYYY-MM-DD.md` | Raw daily logs, active tasks, blockers, handoffs |
| **Long-Term Patterns** | `brain/03-Research/Learnings/` | Distilled patterns: what works, what fails, baselines |

### 4.2 Brain Structure (Existing)

```
brain/
├── Index.md                          # Master index
├── Index — Reference.md              # Reference docs index
├── Index — Research.md               # Research docs index
├── 01-Strategy/
│   └── (strategic documents)
├── 02-Operations/
│   └── (ops documents)
├── 03-Reference/
│   ├── Launch-Vision/
│   ├── Infrastructure/
│   │   ├── Whoza Master Infrastructure Briefing.md
│   │   ├── Trillet-Whoza Architecture Map.md
│   │   └── (new: Runbooks/)
│   ├── Client Onboarding/
│   └── Agent Team/
├── 03-Research/
│   ├── Audits/
│   ├── Supplier-Evaluations/
│   └── Learnings/                    # NEW: Pattern recognition
└── 04-Archive/
```

### 4.3 Session Handoff Protocol

At session end, write to `memory/YYYY-MM-DD.md`:

```yaml
---
handoff: 2026-05-04T00:00:00Z
status: active_tasks_remaining | idle
active_tasks:
  - id: T-XXX
    description: "..."
    persona: PlatformArchitect
    progress: 0-100%
    blockers: []
recommendations:
  - "..."
last_deploy: "2026-05-03T15:08:00Z"
branch: "v0-staging"
---
```

---

## 5. Task Management — whoza Queue

### 5.1 Task Sources

| Source | Example |
|--------|---------|
| Monitoring triggers | Build failure, Lighthouse drop, webhook 404 |
| Strategic goals | Launch new trade vertical, add Crews feature |
| Dru directives | "Add plumber Manchester page", "Fix robots.txt" |
| User feedback | "Can't hear agent clearly", "Need SMS backup" |
| Security alerts | Critical CVE, secret exposure |
| Technical debt | Component refactor, schema cleanup |
| Brain drift | New code, stale docs |

### 5.2 Priority Matrix (whoza)

| Level | Response | Examples |
|-------|----------|----------|
| **P0** | Immediate | Site down, Trillet webhook down, critical CVE, data loss |
| **P1** | < 4 hours | Build broken, major page 404, enquiry pipeline blocked, Lighthouse < 50 |
| **P2** | < 24 hours | Layout bug, content outdated, minor SEO issue, dep update |
| **P3** | Next batch | Refactor, docs cleanup, nice-to-have feature |

### 5.3 Execution Rules

- P0 interrupts current work
- Max 3 concurrent tasks
- Batch P3 tasks during low-traffic windows
- Stale REVIEW >24h → auto-escalate

---

## 6. Build & Deploy — whoza Pipeline

### 6.1 Build Path

```
Read handoff + task queue
  |
  v
Select persona → Read brain context
  |
  v
Code generation (Next.js + TS + Tailwind + shadcn)
  |
  v
Local build: npm run build (must pass — zero errors)
  |
  v
Git commit to feature branch
  |
  v
[Dru approval if production/schema/pricing]
  |
  v
Merge to v0-staging
  |
  v
Deploy to Netlify staging: netlify deploy --prod --dir .next
  |
  v
Verify: health checks, Lighthouse, key pages
  |
  v
Update handoff + write ADR if architectural
```

### 6.2 whoza Technology Stack (Actual)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Intelligence | Kimi (Moonshot AI) | Autonomous management |
| Frontend | Next.js 16 + TypeScript + Tailwind | Web interface |
| UI Components | shadcn/ui | Accessible components |
| Backend | Supabase (Postgres + Edge Functions) | Database, auth, serverless API |
| Voice AI | Trillet | Voice agents, call handling, transcription |
| Hosting | Netlify | Static site + edge functions |
| CDN | Netlify + Cloudflare | Performance, DNS |
| Storage | Supabase Storage | Assets, recordings |
| Auth | Supabase Auth | Client authentication |
| Payments | Stripe (planned) | Subscription billing |
| Messaging | WhatsApp API + Meta | Primary customer delivery |
| Monitoring | Netlify Analytics + custom | Uptime, performance |
| Version Control | GitHub | Source, brain, state |

### 6.3 Build Discipline

- Every build must pass `npm run build` — zero errors
- No patches post-deploy
- SRE persona enforces this

---

## 7. Monitoring — whoza Dimensions

### 7.1 Site Health

| Check | Frequency | Tool |
|-------|-----------|------|
| Uptime | 5 min | HTTP probe |
| Lighthouse | Weekly | CI + browser |
| Core Web Vitals | Weekly | Browser automation |
| Broken links | Weekly | Crawl |
| robots.txt | Weekly | HTTP check |
| sitemap.xml | Weekly | Validate |

### 7.2 Voice Pipeline Health

| Check | Frequency | Trigger |
|-------|-----------|---------|
| Trillet webhook endpoint | 5 min | HTTP 200 on `/api/trillet-webhook` |
| Enquiry creation rate | Hourly | Compare to baseline |
| Call answer rate | Daily | Trillet dashboard |
| Transcript quality | Weekly | Sample review |
| WhatsApp delivery | Hourly | Delivery confirmation |

### 7.3 Security

| Check | Frequency |
|-------|-----------|
| npm audit | Daily |
| Secret scan | Per commit |
| Supabase RLS review | Weekly |
| Dependency licences | Weekly |

---

## 8. Security & Governance — whoza

### 8.1 Authority Summary

| Action | Authority |
|--------|-----------|
| Staging deploy | Autonomous (any persona) |
| Production deploy | Dru approval required |
| Critical security patch | Autonomous (SecurityGuardian) |
| Supabase schema change | Dru approval |
| Trillet config change | Dru approval |
| Pricing/billing change | Dru approval |
| Content/SEO update | Autonomous |
| Brain/memory update | Autonomous |

### 8.2 Security Protocols

- No credentials in code, prompts, or logs
- Secrets: GitHub Secrets + Supabase Vault + Netlify env vars
- Supabase service role key: never frontend-exposed
- Every action logged: persona, timestamp, result
- All changes traceable: Git commit hash
- Call recordings: encrypted at rest, 90-day retention

---

## 9. Integration with whoza Agent Team

The Command OS manages the platform that delivers the agent team:

| Agent | Command OS Responsibility |
|-------|----------------------------|
| **Katie/Mark** | Trillet agent config, CKP sync, voice testing, quality monitoring |
| **Claire** | Review workflow triggers, timing logic, WhatsApp template management |
| **Rex** | Report generation pipeline, competitor data freshness, API rate limits |
| **New Agents** | Onboarding flow, provisioning, knowledge base creation |

---

## 10. whoza Launch Checklist (Aligned)

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | GitHub repo: whoza-ai-v0 | Dru | ✅ |
| 2 | Brain structure in `whoza-ai/brain/` | Jarvis | ✅ |
| 3 | Netlify staging deployed | Jarvis | ✅ |
| 4 | Supabase project live | Dru | ✅ |
| 5 | Trillet Agency account | Dru | ✅ |
| 6 | P0 fixes deployed (robots.txt, legal pages) | Jarvis | ✅ |
| 7 | Architecture Map created | Jarvis | ✅ |
| 8 | Command OS spec adapted | Jarvis | 🔄 |
| 9 | Session handoff protocol active | Jarvis | 🔄 |
| 10 | Monitoring: Lighthouse CI | Jarvis | [ ] |
| 11 | Monitoring: Uptime checks | Jarvis | [ ] |
| 12 | Monitoring: npm audit scheduled | Jarvis | [ ] |
| 13 | Trillet webhook endpoint tested | Dru/Jarvis | [ ] |
| 14 | First enquiry captured end-to-end | Dru | [ ] |
| 15 | Stripe integration | Dru | [ ] |
| 16 | WhatsApp Business API | Dru | [ ] |

---

*whoza.ai — Sense. Decide. Act. Learn.*

*Agentic Platform Management | v2.1 whoza-Native | May 2026*