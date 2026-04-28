# whoza.ai Pre-Production Build & Validation Plan
**Staging Environment Strategy**
**Date:** 2026-04-28
**Status:** Proposed

---

## Executive Summary

Yes — every component should be built, tested, and validated in a **separate staging environment** before any production customer sees it. This document defines the **pre-production infrastructure**, **testing protocols**, and **go-live gates**.

**Key principle:** The production whoza.ai site stays live and untouched until the new voice + bundle platform is proven in staging. No customer-facing changes until all tests pass.

---

## Strategy: Separate Repo vs. Branch

### Recommended: Branch-Based Staging (Not Separate Repo)

| Approach | Pros | Cons |
|----------|------|------|
| **Separate repo** (`whoza-ai-staging`) | Completely isolated, can break anything | Double the CI/CD setup, drift between repos, merge conflicts later |
| **Branch-based (`staging` branch)** | Same repo, same history, easy merge to `main`, shared CI/CD | Need discipline to not touch `main` |

**Verdict:** Use **branch-based staging**. Create a `staging` branch in the existing `whoza-ai` repo. Deploy `staging` branch to a separate Netlify site (e.g., `staging.whoza.ai` or `whoza-ai-staging.netlify.app`).

**Why:** You're not rebuilding the wheel — you're adding a voice layer to an existing site. A branch keeps everything in one place, one history, one merge when ready.

---

## Staging Environment Architecture

### 1. Staging Website (`staging.whoza.ai`)

**Setup:**
- Branch: `staging` in existing GitHub repo
- Netlify site: New site connected to `staging` branch
- URL: `https://staging.whoza.ai` (or `whoza-ai-staging.netlify.app`)
- Environment variables: All pointing to **staging services**

**Differences from production:**
- No indexing by Google (`robots.txt` blocks all crawlers)
- No analytics pixels (or separate GA4 property)
- Stripe test keys, not live keys
- Trillet staging/test sub-account
- Supabase staging project
- All emails prefixed with `[STAGING]`

---

### 2. Staging Database (Supabase)

**Setup:**
- New Supabase project: `whoza-ai-staging`
- Same schema as production (migrated via SQL)
- Seeded with fake data: 50 test tradespeople, 200 test calls, 15 test subscriptions
- **No real customer data ever**

**Test data profile:**
```
Test trades:
- "Bob's Plumbing" — plumber, Manchester, Solo plan
- "Sparky Solutions" — electrician, Birmingham, Business plan
- "BuildRight Construction" — builder, London, Professional plan
- etc. (50 total, covering all trades + cities)

Test calls:
- 200 simulated calls with realistic metadata
- Mix of: answered, missed, booked, emergency, spam
- Time distribution: 30% business hours, 50% after hours, 20% weekends
```

---

### 3. Staging Billing (Stripe Test Mode)

**Setup:**
- Stripe account: Use **test mode** (no real money)
- Test cards: `4242 4242 4242 4242` (success), `4000 0000 0000 0002` (decline)
- Test subscriptions: Trial periods, billing cycles, payment failures
- Webhooks: Point to staging Netlify functions

**What to test:**
- Trial creation with no card
- Trial-to-paid conversion
- Payment failure handling
- Invoice generation (VAT breakdown)
- Subscription cancellation
- Prorated upgrades/downgrades
- Refund processing

---

### 4. Staging Voice (Trillet Test Environment)

**Setup:**
- Trillet account: Use **development/free tier** or separate test sub-account
- Test phone number: Trillet provisioned test number (not published anywhere)
- Call simulation: Use Trillet's built-in test call feature or manual calls from your mobile

**What to test:**
- Number provisioning speed
- Call divert setup and teardown
- AI voice quality (greeting, comprehension, accent)
- Call flow: qualification → booking → summary
- Emergency keyword detection and live transfer
- Spam filtering
- WhatsApp/SMS summary delivery
- Calendar booking integration
- Call recording and analytics

**Critical test:** Have 5 different people call the test number with realistic scenarios (emergency, quote request, spam, wrong number, after-hours).

---

### 5. Staging Email/SMS (Resend + Twilio Test)

**Setup:**
- Resend: Use staging API key, all emails to `staging@whoza.ai` or test inboxes
- Twilio: Use test credentials, all SMS to test phones (your team)
- Email capture: Mailpit or Mailtrap for staging inbox inspection

**What to test:**
- Welcome email on trial signup
- SMS with divert instructions
- Call summary emails
- Trial reminder sequence (Day 3, 7, 10, 13)
- Payment reminder emails
- Monthly health report
- Review request SMS
- All templates render correctly on mobile/desktop

---

### 6. Staging Agents (Isolated Execution)

All 12 agents run against staging environment only during pre-production:

| Agent | Staging Test |
|-------|-------------|
| CTO Architect | Architecture review of staging vs. production parity |
| Full-Stack Builder | Deploys to `staging` branch only |
| DevOps Guardian | Monitors staging uptime, tests alerting |
| Voice Integration Engineer | Trillet test sub-account, test number |
| Platform Integrator | Test calendar, test directory APIs |
| Growth Hacker | Staging landing page A/B tests |
| Content Engine | Publishes to staging blog only |
| Ad Optimiser | **Not active in staging** — ads only in production |
| Onboarding Guide | Trial users = internal team + friends |
| Retention Keeper | Test churn scenarios with fake data |
| Market Analyst | Operates normally (public data, no risk) |
| Business Intelligence | Staging dashboard, test metrics |

---

## Pre-Production Testing Protocol

### Phase 1: Infrastructure Validation (Days 1–3)

**Goal:** Staging environment is stable, connected, and secure.

| Test | How | Pass Criteria |
|------|-----|--------------|
| Staging site loads | Browse to `staging.whoza.ai` | 200 OK, no console errors |
| SSL certificate | SSL Labs scan | A+ rating |
| No indexation | `robots.txt` check | Disallow all, no sitemap |
| Supabase connection | Run health check query | <100ms response |
| Stripe test mode | Create test subscription | Success, no real charge |
| Trillet test account | Provision test number | <2 min, number active |
| Resend email | Send test email | Delivered to test inbox |
| Twilio SMS | Send test SMS | Delivered to test phone |
| Environment isolation | Check no prod keys in staging | All keys prefixed `test` or `staging` |

**Deliverable:** `INFRASTRUCTURE_TEST_REPORT.md`

---

### Phase 2: Feature Integration Testing (Days 4–7)

**Goal:** All features work end-to-end in staging.

#### Test Suite A: Trial Signup Flow
```
1. User visits staging.whoza.ai/pricing
2. Selects "Business" plan → clicks "Start Free Trial"
3. Enters: test business name, trade, email (test@staging.whoza.ai)
4. Stripe creates trial subscription (test mode)
5. Supabase creates user record
6. Trillet provisions test number
7. Resend sends welcome email
8. Twilio sends SMS with divert instructions
9. User receives: email + SMS within 2 minutes

Pass: All steps complete, no errors in any system logs
```

#### Test Suite B: Voice Agent Operation
```
1. User dials divert code (**21*[test number]#)
2. Test call made from mobile to user's existing number
3. Trillet answers with AI voice
4. AI: greeting → qualification → booking attempt
5. Call summary sent via SMS/WhatsApp
6. Call recorded in Supabase
7. Dashboard shows call in real-time

Pass: Call answered <3 rings, AI understood caller, summary accurate
```

#### Test Suite C: Calendar Booking
```
1. AI agent books appointment during call
2. Event appears in Google Calendar (test calendar)
3. Confirmation SMS sent to "customer" (test phone)
4. Dashboard shows booking with details

Pass: Calendar event correct, SMS delivered, no double-booking
```

#### Test Suite D: Trial-to-Paid Conversion
```
1. Trial user (day 10) clicks "Add Payment"
2. Stripe Checkout opens with test card
3. Enters test card: 4242 4242 4242 4242
4. Subscription converts to paid
5. Invoice emailed with VAT breakdown
6. Dashboard updates to "Active"

Pass: Payment succeeds, invoice correct, no errors
```

#### Test Suite E: Payment Failure Handling
```
1. Trial user (day 15) attempts payment with decline card: 4000 0000 0000 0002
2. Stripe declines
3. Dunning sequence triggered: email day 1, retry day 3, final day 7
4. Account pauses after 7 days
5. Win-back email sent on day 14

Pass: All dunning emails sent, account pauses correctly, win-back fires
```

#### Test Suite F: Upsell Flow
```
1. Create test user with 85% minute usage for 2 months
2. Trigger upsell detection
3. User receives upsell email: "Upgrade to Professional"
4. Clicks upgrade link → Stripe Checkout with prorated amount
5. Subscription upgrades mid-cycle

Pass: Email sent, checkout works, proration correct, plan upgraded
```

**Deliverable:** `FEATURE_INTEGRATION_TEST_REPORT.md`

---

### Phase 3: Load & Performance Testing (Days 8–9)

**Goal:** System handles expected load gracefully.

| Test | Scenario | Target |
|------|----------|--------|
| **Concurrent signups** | 50 trial signups in 10 minutes | All succeed, no DB locks |
| **Concurrent calls** | 20 simultaneous calls to Trillet | All answered, no dropped |
| **Dashboard load** | 100 simultaneous dashboard users | <2s load time |
| **Email burst** | 1,000 emails in 5 minutes | All delivered, no rate limiting |
| **API stress** | 10,000 requests/min to Netlify functions | <500ms response, no 5xx |
| **Endurance** | 72-hour continuous operation | 0 memory leaks, stable CPU |

**Tools:** k6, Artillery, or Locust for load testing. Trillet's own load testing docs.

**Deliverable:** `PERFORMANCE_TEST_REPORT.md`

---

### Phase 4: Security & Compliance Testing (Days 10–11)

**Goal:** No vulnerabilities, GDPR compliant, audit-ready.

| Test | How | Pass Criteria |
|------|-----|--------------|
| **Penetration test** | OWASP ZAP or Burp Suite | 0 critical, <3 high severity |
| **SQL injection** | Test all API inputs | No injection possible |
| **XSS test** | Inject scripts in all forms | No execution |
| **Auth bypass** | Attempt unauth access to protected routes | All blocked |
| **Stripe webhook security** | Verify signature validation | All webhooks reject invalid |
| **GDPR data export** | Request data export for test user | Complete export <24h |
| **GDPR deletion** | Request account deletion | All data purged, no orphans |
| **VAT invoice accuracy** | Generate 100 test invoices | All calculations correct |
| **SSL/TLS** | SSL Labs scan | A+ rating |
| **Dependency audit** | `npm audit` | 0 critical vulnerabilities |

**Deliverable:** `SECURITY_COMPLIANCE_TEST_REPORT.md`

---

### Phase 5: User Acceptance Testing (Days 12–14)

**Goal:** Real humans validate the experience.

**Testers:**
- You (Dru) — full admin walkthrough
- 3–5 tradespeople friends/family (the target demographic, 35–55, non-technical)
- 1–2 "tech-savvy" testers for edge cases

**UAT Scenarios:**

| Scenario | Tester | What to Observe |
|----------|--------|----------------|
| Sign up for trial | Tradesperson | Can they complete in <15 min without help? |
| Set up call divert | Tradesperson | Do they understand the instructions? |
| Receive a call | Tradesperson | Does the AI sound professional? |
| Check dashboard | Tradesperson | Can they find their call history? |
| Upgrade to paid | Tradesperson | Is payment flow smooth? |
| Cancel subscription | Tradesperson | Can they find cancel? Any friction? |
| Mobile experience | All | Does it work on their actual phone? |
| After-hours test | All | Call at 8 PM — does AI answer? |

**Feedback capture:**
- Screen recording (with permission)
- Post-test questionnaire (5 questions, 1–5 scale)
- Open-ended: "What confused you?" "What would make you pay?"

**Pass criteria:**
- 80% of testers complete signup without asking for help
- Average satisfaction score >4/5
- 0 critical usability issues
- <3 minor issues to fix before go-live

**Deliverable:** `UAT_REPORT.md`

---

## Go-Live Gates

### Gate 1: Pre-Flight Checklist (Before Production Deploy)

| Check | Owner | Status |
|-------|-------|--------|
| All 5 test reports pass | CTO Architect | ☐ |
| UAT score >4/5 | Onboarding Guide | ☐ |
| 0 critical security issues | DevOps Guardian | ☐ |
| Performance targets met | Full-Stack Builder | ☐ |
| Stripe live keys configured | CTO Architect | ☐ |
| Trillet production account ready | Voice Integration Engineer | ☐ |
| Production Supabase migrated | DevOps Guardian | ☐ |
| SSL certificate live | DevOps Guardian | ☐ |
| `robots.txt` updated (allow index) | Full-Stack Builder | ☐ |
| Analytics pixels active | Growth Hacker | ☐ |
| Support channels ready (email/WhatsApp) | Onboarding Guide | ☐ |
| Backup and rollback plan documented | DevOps Guardian | ☐ |

**Gate 1 approval required from:** Dru

---

### Gate 2: Soft Launch (Days 1–7 of Production)

**Definition:** Site is live, but no paid ads. Traffic is organic + direct + referrals only.

**Monitoring:**
- Real-time error tracking (Sentry)
- Call quality monitoring (Trillet dashboard)
- Stripe payment success rate
- Trial signup funnel
- Page load times

**Thresholds for concern:**
- Error rate >0.5%
- Call drop rate >2%
- Payment failure rate >10%
- Trial signup rate <2%
- Page load >3s

**Action if threshold crossed:** Immediate staging investigation, potential rollback.

**Deliverable:** `SOFT_LAUNCH_REPORT.md` (daily for 7 days)

---

### Gate 3: Full Launch (Day 8+)

**Definition:** Paid ads activated. Full marketing automation running.

**Prerequisites:**
- 7 days of soft launch data
- 0 critical issues
- Trial-to-paid conversion >10% (early indicator)
- Call answer rate >95%

**Activation sequence:**
1. Google Ads: £15/day
2. Meta Ads: £10/day
3. Retargeting: £5/day
4. Content Engine: 3 posts/week
5. All agent automations active

**Deliverable:** `FULL_LAUNCH_REPORT.md` (weekly)

---

## Rollback Plan

If critical issues occur post-launch:

| Severity | Action | Time to Execute |
|----------|--------|----------------|
| **Critical** (site down, payments broken, data leak) | Rollback to last known good deployment | <5 minutes |
| **High** (call answering broken, >10% payment failures) | Disable affected feature via feature flag | <15 minutes |
| **Medium** (UI bug, non-critical flow broken) | Fix forward, deploy patch | <2 hours |
| **Low** (cosmetic, analytics gap) | Schedule fix in next sprint | <1 week |

**Rollback mechanism:**
- Netlify: Instant rollback to previous deployment (1 click)
- Supabase: Point-in-time recovery (if needed, <1 hour)
- Stripe: No rollback needed — subscription state preserved
- Trillet: Feature flag to disable new call routing

---

## Cost of Pre-Production Environment

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| Netlify staging site | £0 | Included in Pro plan |
| Supabase staging project | £0 | Free tier sufficient for testing |
| Stripe | £0 | Test mode free |
| Trillet test account | £0 | Use free tier or dev credits |
| Resend staging | £0 | Free tier |
| Twilio test | £0 | Test credentials |
| Load testing tools | £0 | k6 open source |
| Security scanning | £0 | OWASP ZAP open source |
| **Total pre-production cost** | **£0** | Everything covered by free tiers or included |

**Time cost:** 14 days of focused testing (can parallelise with content creation and marketing prep).

---

## The 14-Day Pre-Production Calendar

| Day | Activity | Owner | Deliverable |
|-----|----------|-------|-------------|
| **1** | Set up staging branch, Netlify site, Supabase staging, Stripe test | Builder + DevOps | Staging env live |
| **2** | Configure Trillet test account, provision test number | Voice Engineer | Test number active |
| **3** | Seed test data, verify all integrations | Platform Integrator | Test data ready |
| **4** | Run Test Suite A (Trial Signup) | Onboarding Guide | Pass/fail report |
| **5** | Run Test Suite B (Voice Agent) | Voice Engineer | Pass/fail report |
| **6** | Run Test Suite C (Calendar) + D (Conversion) | Platform Integrator + Onboarding Guide | Pass/fail report |
| **7** | Run Test Suite E (Failure) + F (Upsell) | Retention Keeper | Pass/fail report |
| **8** | Load testing | Builder + DevOps | Performance report |
| **9** | Performance fixes if needed | Builder | Updated deployment |
| **10** | Security scanning | DevOps Guardian | Security report |
| **11** | Compliance fixes if needed | Builder | Updated deployment |
| **12** | UAT with real testers | Onboarding Guide | UAT report |
| **13** | Fix UAT issues | Builder | Patch deployed |
| **14** | Final go/no-go review | All agents + Dru | Go-live decision |

---

## Success Criteria for Production Launch

All must pass:

1. **Infrastructure:** 99.9% uptime in staging for 14 days
2. **Voice:** >98% call answer rate, <3 ring pickup
3. **Booking:** >60% of qualified calls result in calendar event
4. **Payments:** >95% payment success rate
5. **Emails:** >99% delivery rate, <1% spam folder
6. **UAT:** >4/5 average satisfaction
7. **Security:** 0 critical, <3 high vulnerabilities
8. **Performance:** <2s page load, <500ms API response
9. **Compliance:** GDPR export/deletion tested and verified
10. **Rollback:** Rollback tested successfully, <5 min execution

---

## Conclusion

**Yes — build everything in staging first.** 14 days of pre-production testing costs £0 and eliminates the risk of breaking the live site or losing customer trust. The staging environment mirrors production exactly (same code, same services, fake data). Only when all 10 success criteria pass do we flip to production.

**The production site stays untouched until the staging branch passes all gates.** This is non-negotiable for a billing-critical, customer-facing platform.

---

*Pre-production strategy for whoza.ai voice + bundle launch. Staging-first approach with 5 test phases, 3 go-live gates, and full rollback plan.*
