---
created: 2026-04-29
updated: 2026-04-29
tags: [process, monitoring, daily]
frequency: daily
owner: "Agent-3: DevOps Guardian"
---

# Process — Health Check

## Trigger
Heartbeat poll, scheduled cron, or manual run.

## Steps
1. **Run monitor script**
   ```bash
   ./scripts/monitor.sh
   ```

2. **Check 18 critical endpoints**
   - Homepage, core pages, blog, UK/US locations, trade pages, SEO assets
   - Response time tracking (alert if >5s)

3. **Check key metrics**
   - Total pages: 95 prerendered + dynamic
   - Sitemap URLs: 101
   - Avg response time: ~0.5s
   - robots.txt: Clean (AI crawlers allowed)
   - OG image: Properly configured
   - Schema markup: 10 types active

4. **Log results**
   Update [[HEARTBEAT.md]] with timestamp and result.

5. **Alert if issues**
   - Any endpoint failing → Immediate Agent-3 investigation
   - Response time >5s → Performance optimization
   - New errors in Sentry → Agent-2 bug fix

## Expected Output
```
2026-04-29 09:00 UTC — Health Check
Result: 18/18 checks passed ✅
Avg response: 0.48s
Site status: Fully operational
```

## Related
- [[HEARTBEAT.md]] — Operational monitoring log
- [[Project — SEO Remediation]] — SEO health
- [[Index — Processes]]
