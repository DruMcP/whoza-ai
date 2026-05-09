---
created: 2026-04-29
updated: 2026-04-29
tags: [process, deploy, devops]
frequency: as-needed
owner: "Agent-3: DevOps Guardian"
---

# Process — Deploy to Staging

## Trigger
New feature ready for testing, PR merged to `staging` branch, or scheduled deploy.

## Steps
1. **Ensure `staging` branch is clean**
   ```bash
   git checkout staging
   git pull origin staging
   ```

2. **Run automated checks**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

3. **Deploy via script**
   ```bash
   ./scripts/deploy-staging.sh
   ```

4. **Verify deploy**
   - Check `https://whoza-ai-staging.netlify.app`
   - Run health check: `scripts/monitor.sh`
   - Verify `robots.txt` blocks crawlers

5. **Notify team**
   - Update [[Project — Pre-Production Build]] status
   - Tag relevant agents in chat

## Rollback
If staging deploy breaks:
```bash
git revert HEAD
npm run build
netlify deploy --prod --build
```

## Related
- [[Project — Pre-Production Build]] — Staging environment
- [[Process — Deploy to Production]] — Production runbook
- [[Index — Processes]]
