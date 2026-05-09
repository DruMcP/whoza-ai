---
created: 2026-04-29
updated: 2026-04-29
tags: [process, deploy, devops]
frequency: as-needed
owner: "Agent-1: CTO Architect / Agent-3: DevOps Guardian"
---

# Process — Deploy to Production

## Trigger
Staging validated, all go-live gates green, Dru approval.

## Steps
1. **Final staging validation**
   - All health checks passing (18/18)
   - Zero critical SEO issues
   - Stripe checkout tested end-to-end
   - Trillet provisioning tested

2. **Merge `staging` → `main`**
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

3. **Monitor production deploy**
   - Netlify auto-deploys from `main`
   - Watch Sentry for new errors
   - Run health check: `scripts/monitor.sh`

4. **Post-deploy verification**
   - Verify `whoza.ai` loads correctly
   - Check critical pages: homepage, pricing, sign-in, portal
   - Confirm Stripe webhooks receiving
   - Confirm Trillet webhooks receiving

5. **Announce**
   - Update relevant project notes in Brain
   - Notify Dru

## Rollback
If production deploy breaks:
1. Revert merge commit on `main`
2. Netlify auto-deploys previous version
3. Verify rollback within 5 minutes

## Escalation
- If rollback fails → Agent-1 + Dru emergency call
- If data corruption → Restore from Supabase backup
- If payment issues → Stripe support + Dru

## Related
- [[Project — Pre-Production Build]] — Go-live gates
- [[Process — Deploy to Staging]] — Staging runbook
- [[Index — Processes]]
