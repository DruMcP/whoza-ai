# whoza.ai Autonomous Monitoring System

## Overview

Production-grade monitoring and maintenance system for whoza.ai — AI Voice Receptionist for UK tradespeople.

**Architecture:** GitHub + Supabase Native Agents (no single VPS orchestration core)

## Directory Structure

```
monitoring/
├── better-uptime/          # Uptime monitor configuration
│   └── monitors.conf       # 14 monitor definitions
├── opsgenie/               # Alert policy configuration
│   └── config.yml          # Escalation chains + on-call schedule
├── status-page/            # Public status page config
│   └── config.yml          # Component definitions + CNAME setup
├── grafana/                # Grafana dashboard JSON (Week 3)
└── README.md              # This file

.github/workflows/
├── lighthouse-ci.yml       # Performance audits (daily + PRs)
├── security-audit.yml      # npm audit (weekly + on package change)
├── link-check.yml          # Broken link crawler (weekly)
└── seo-meta.yml           # SEO validation (daily)

supabase/functions/
├── webhook-health/        # Voice webhook health agent (5-min intervals)
├── db-integrity/          # Database integrity checks (daily)
└── verify-backup/         # PITR backup verification (daily)

supabase/migrations/
└── 20260517000000_agent_monitoring.sql  # Tables + views + functions

runbooks/
├── incident-response/
│   ├── voice-outage.md     # "No calls coming through"
│   ├── webhook-5xx.md      # Trillet/Bland webhook errors
│   └── database-down.md    # Supabase outage response
└── agent-prompts/
    └── (Week 3: system prompts for agents)

scripts/
└── setup-better-uptime.sh  # One-time Better Uptime monitor setup
```

## Week 1 — Critical Path (Current)

### ✅ Delivered

1. **Better Uptime Monitor Config** — 14 monitors defined (staging + production + voice infrastructure)
2. **Opsgenie Alert Policy** — P1/P2/P3 escalation chains configured
3. **Status Page Config** — 6 components, auto-updating from monitors
4. **PITR Verification** — Daily backup check edge function
5. **Supabase Migration** — `agent_metrics`, `call_baselines` tables + helper functions

### 🔧 Setup Required (Human)

Before monitors go live, Dru must:

1. **Better Uptime**
   - Sign up at betteruptime.com (Pro tier)
   - Create API key
   - Run: `BETTERUPTIME_API_KEY=xxx bash scripts/setup-better-uptime.sh`

2. **Opsgenie**
   - Sign up at opsgenie.com (free tier)
   - Create API key → add to GitHub Secrets
   - Configure Slack webhook URL
   - Add on-call phone number

3. **Status Page**
   - Create account at instatus.com
   - Configure custom domain `status.whoza.ai` (CNAME at registrar)
   - Connect Better Uptime monitors

4. **Supabase**
   - Deploy edge functions: `npx supabase functions deploy`
   - Run migration: `npx supabase migration up`
   - Set cron triggers for webhook-health (*/5) and db-integrity (04:00)

5. **GitHub Secrets**
   Add to repo Settings → Secrets:
   - `BETTERUPTIME_API_KEY`
   - `OPSGENIE_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NETLIFY_AUTH_TOKEN`
   - `GITHUB_TOKEN` (for auto-issues)
   - `SLACK_WEBHOOK_URL`

## Week 2 — CI/CD Hardening (Next)

### GitHub Actions
- Lighthouse CI: Runs on every PR + daily at 06:00 UTC
- Security Audit: Weekly + on package.json change
- Broken Link Checker: Weekly
- SEO Meta Validation: Daily

### Supabase Edge Functions
- webhook-health: Every 5 minutes
- db-integrity: Daily at 04:00 UTC

## Week 3 — Intelligence (Future)

- Call anomaly detection (hourly baselines)
- Staging-to-production promotion gate
- Grafana Cloud dashboard
- Obsidian runbook sync

## Safety Constraints

- **Production deploy:** Manual dispatch ONLY. Human PR approval required.
- **Database:** Agents READ from production. WRITE requires human approval.
- **Secrets:** Zero hardcoded keys. All in GitHub Secrets / Supabase Vault.
- **Rollback:** Every deploy script includes rollback procedure.

## Success Criteria

- [x] Better Uptime monitor config created (14 monitors)
- [x] Opsgenie alert policies defined (P1/P2/P3)
- [x] Status page config ready
- [x] Supabase edge functions written (3 functions)
- [x] Database migration created (tables + views)
- [x] GitHub Actions workflows created (4 workflows)
- [x] Incident response runbooks written (3 runbooks)
- [ ] Better Uptime monitors actually created (requires API key)
- [ ] Opsgenie integration live (requires API key)
- [ ] Status page deployed (requires account setup)
- [ ] Edge functions deployed to Supabase
- [ ] Migration applied to production database

## Test Commands

```bash
# Test webhook health agent locally
supabase functions serve webhook-health --env-file .env.local

# Test database integrity
supabase functions serve db-integrity --env-file .env.local

# Run npm audit
npm audit --audit-level=moderate

# Build site (for Lighthouse)
npm run build
```

## Contact

**Mission Commander:** Dru McPherson (dru@whoza.ai)
**System:** whoza.ai — AI Voice Agents for UK Tradespeople