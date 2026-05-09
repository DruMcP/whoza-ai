---
created: 2026-04-29
updated: 2026-04-29
tags: [process, seo, weekly]
frequency: weekly
owner: "Agent-7: Content Engine"
---

# Process — SEO Audit

## Trigger
Monday morning, or after major deploy.

## Steps
1. **Check Google Search Console**
   - Indexing status
   - Crawl errors
   - Core Web Vitals
   - Search performance (impressions, clicks, CTR)

2. **Check sitemap health**
   - All URLs return 200 (not 301, 404, or blocked)
   - lastmod dates current
   - No redirect URLs included

3. **Check critical SEO elements**
   - Canonical tags present
   - OG images valid
   - Schema markup valid (test with Google Rich Results)
   - hreflang correct
   - robots.txt allows crawlers

4. **Check site speed**
   - Lighthouse score ≥ 90
   - Largest Contentful Paint < 2.5s
   - First Input Delay < 100ms

5. **Check for new issues**
   - Broken links
   - Duplicate content
   - Missing meta descriptions
   - Thin content pages

6. **Log and fix**
   - Update [[SEO_FIX_PLAN.md]] if new issues found
   - Assign fixes to Agent-2
   - Verify fixes before next audit

## Escalation
- If indexing drops >20% → Urgent investigation
- If Core Web Vitals fail → Performance sprint
- If new competitor outranks us → Content response

## Related
- [[Project — SEO Remediation]] — Active fixes
- [[Research — Site Analysis & Enhancements]] — Known issues
- [[Index — Processes]]
