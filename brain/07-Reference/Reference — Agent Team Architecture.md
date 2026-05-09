---
created: 2026-04-29
updated: 2026-04-29
tags: [reference, team, agents]
---

# Reference — Agent Team Architecture

## 12-Agent Autonomous Team

### Product Engineering Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-1: Archie (CTO Architect)** | Technical leadership | System design, architecture, build-vs-buy |
| **Agent-2: Full-Stack Builder** | Code execution | Feature development, bug fixes, deployment |
| **Agent-3: DevOps Guardian** | Infrastructure | Uptime, security, CI/CD, monitoring |

### Voice & Integration Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-4: Voice Integration Engineer** | Trillet orchestration | Call flows, voice training, number management |
| **Agent-5: Platform Integrator** | Third-party APIs | Calendar, CRM, directory, webhook management |

### Growth & Marketing Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-6: Growth Hacker** | Acquisition | Trial signup optimization, CAC reduction, channel testing |
| **Agent-7: Content Engine** | Content production | SEO content, blog, landing pages, social |
| **Agent-8: Ad Optimizer** | Paid acquisition | Google Ads, Meta, retargeting, budget allocation |

### Customer Success Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-9: Onboarding Guide** | Trial conversion | User activation, feature adoption, trial-to-paid |
| **Agent-10: Retention Keeper** | Churn prevention | Health scoring, intervention triggers, win-back |

### Intelligence Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-11: Market Analyst** | Competitive intelligence | Competitor tracking, pricing intelligence, market signals |
| **Agent-12: Business Intelligence** | Data & reporting | KPI dashboards, forecasting, P&L tracking, anomaly detection |

## Core Principle
**Every agent is data-driven** — no decisions without metrics, no actions without measurement, no output without validation.

## Collaboration Model
- **Central hub:** Supabase (shared database)
- **Human oversight:** Dru at critical decision gates
- **Communication:** Brain notes + chat + automated reports

## Resources
- Full architecture: [[AGENT_TEAM_ARCHITECTURE.md]] (flat file, 36KB)

## Related
- [[AGENT_BRAIN_PROTOCOL.md]] — How agents use the brain
- [[Index — Reference]]
