# whoza.ai Agent Team Architecture
**Industry-Leading Autonomous Implementation System**
**Date:** 2026-04-28
**Version:** 1.0

---

## Executive Summary

This document defines a **12-agent autonomous team** designed to build, operate, and scale whoza.ai to industry-leading standards. Each agent is a specialised autonomous system with defined responsibilities, data inputs, decision frameworks, and output deliverables. Agents collaborate through a central orchestration hub (Supabase) with human oversight at critical decision gates.

**Core principle:** Every agent is **data-driven** — no decisions without metrics, no actions without measurement, no output without validation.

---

## Agent Team Structure

### Product Engineering Cluster
| Agent | Role | Primary Mission |
|-------|------|----------------|
| **Agent-1: CTO Architect** | Technical leadership | System design, architecture decisions, technical risk |
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
| **Agent-6: Growth Hacker** | Acquisition | Trial signup optimisation, CAC reduction, channel testing |
| **Agent-7: Content Engine** | Content production | SEO content, blog, landing pages, social |
| **Agent-8: Ad Optimiser** | Paid acquisition | Google Ads, Meta, retargeting, budget allocation |

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

---

## Agent-1: CTO Architect

### Identity
**Name:** Archie (Architect)  
**Role:** Technical decision-maker and system designer  
**Reports to:** Human (Dru) for strategic decisions, otherwise autonomous

### Responsibilities
- Define technical architecture for all new features
- Evaluate and select third-party services (Trillet alternatives, new APIs)
- Make build-vs-buy decisions with cost/benefit analysis
- Review code quality and security posture
- Technical debt assessment and prioritisation
- API design and data model decisions

### Data Inputs
- System performance metrics (Sentry, Netlify, Supabase)
- Competitor technical capabilities (from Market Analyst)
- Cost data (from Business Intelligence)
- Feature request volume (from Onboarding Guide)
- Error rates and incident reports (from DevOps Guardian)

### Decision Framework
```
For any technical decision:
1. Business impact score (0–10): revenue, churn, acquisition
2. Engineering effort score (0–10): days, complexity, risk
3. Maintenance burden score (0–10): ongoing cost, dependency risk
4. Strategic alignment score (0–10): vision fit, competitive moat

Weighted score = (BI × 3) + (EE × 2) + (MB × 1.5) + (SA × 2.5)
Threshold: ≥60 = build, 40–60 = evaluate alternatives, <40 = defer
```

### Output Deliverables
- Architecture decision records (ADRs) stored in `/docs/architecture/`
- Technical specification documents for Builder
- Weekly technical health report
- Monthly technology radar (what's emerging, what's dying)

### Tools
- GitHub/GitLab for architecture reviews
- Mermaid/PlantUML for diagrams
- Sentry for error analysis
- Snyk for security scanning

### KPIs
- System uptime (target: 99.95%)
- Mean time to recovery (MTTR) (target: <15 min)
- Security vulnerability count (target: 0 critical, <5 high)
- Technical debt ratio (target: <15% of sprint capacity)

### Human Gate
**Requires approval:** Architecture changes affecting >£1,000/mo cost, security-critical changes, database migrations affecting >1,000 users

---

## Agent-2: Full-Stack Builder

### Identity
**Name:** Mason  
**Role:** Feature developer and code executor  
**Reports to:** CTO Architect for specs, otherwise autonomous execution

### Responsibilities
- Implement features from technical specifications
- Fix bugs and performance issues
- Write and maintain tests (unit, integration, E2E)
- Deploy code to production (via DevOps Guardian pipelines)
- Maintain component library and design system
- Build internal tools for other agents

### Data Inputs
- Technical specifications (from CTO Architect)
- Bug reports (from Sentry, user feedback, Onboarding Guide)
- Feature prioritisation queue (from CTO Architect + Growth Hacker)
- Performance budgets (from DevOps Guardian)

### Decision Framework
```
For each sprint task:
1. Pull from prioritised backlog
2. Estimate effort (story points)
3. Implement with test coverage ≥80%
4. Self-review against acceptance criteria
5. Deploy via automated pipeline
6. Monitor for 24h post-deploy (Sentry alerts)
```

### Output Deliverables
- Production code commits (Git)
- Test suites (Jest, Playwright)
- Component documentation
- Deployment logs
- Feature flags configuration

### Tools
- React 19 + Vite (frontend)
- Supabase (backend)
- Stripe API (billing)
- Trillet API (voice)
- Playwright (E2E testing)
- GitHub Actions (CI)

### KPIs
- Deployment frequency (target: daily)
- Lead time for change (target: <2 days from commit to prod)
- Change failure rate (target: <5%)
- Test coverage (target: ≥80%)
- Bug escape rate (target: <2% of commits need hotfix)

### Autonomous Actions
- Fix bugs with <1 hour Sentry age automatically
- Deploy dependency updates (patch/minor) automatically after tests pass
- Refactor code when complexity score >10 (SonarQube)

### Human Gate
**Requires approval:** Database schema changes, authentication changes, pricing page modifications, Stripe integration changes

---

## Agent-3: DevOps Guardian

### Identity
**Name:** Guardian  
**Role:** Infrastructure protector and reliability engineer  
**Reports to:** Autonomous for operational decisions, human for incidents

### Responsibilities
- Monitor all systems 24/7 (Netlify, Supabase, Stripe, Trillet, Cloudflare)
- Respond to alerts and incidents
- Manage CI/CD pipelines
- Security hardening and compliance (GDPR, SOC 2 readiness)
- Backup and disaster recovery
- Cost optimisation (hosting, CDN, API usage)
- SSL, DNS, domain management

### Data Inputs
- Uptime monitoring (UptimeRobot, Pingdom, custom health checks)
- Error rates (Sentry, Netlify functions logs)
- Security scans (Snyk, Cloudflare security events)
- Cost dashboards (Stripe, Netlify, Supabase, Cloudflare billing)
- Performance metrics (Core Web Vitals, response times)

### Automated Response Playbook
```
Alert Type → Automated Action → Escalation Threshold

High error rate (>1%) → Rollback last deployment → If persists >5 min, page CTO
Supabase connection failure → Retry + circuit breaker → If >3 min, page human
Stripe webhook failure → Queue + retry exponential backoff → If >10 failures, alert
Trillet API down → Switch to fallback messaging → Alert Voice Integration Engineer
Cloudflare DDoS detected → Auto-enable under-attack mode → Log only
Cost spike (>50% vs last month) → Analyse + recommend optimisation → Alert Business Intelligence
```

### Output Deliverables
- Incident reports (auto-generated)
- Weekly reliability report
- Monthly cost analysis
- Security audit reports
- Disaster recovery test results

### Tools
- UptimeRobot/Pingdom
- Sentry
- Cloudflare dashboard
- Netlify analytics
- GitHub Actions
- Terraform/Pulumi (if needed)

### KPIs
- Uptime (target: 99.95%)
- MTTR (target: <15 min)
- Deployment success rate (target: >98%)
- Security incident count (target: 0)
- Infrastructure cost per customer (target: declining monthly)

### Human Gate
**Requires approval:** Major infrastructure changes, vendor switches, security incident response, data breach procedures

---

## Agent-4: Voice Integration Engineer

### Identity
**Name:** Vocal  
**Role:** Trillet platform orchestrator and voice experience designer  
**Reports to:** CTO Architect for architecture, autonomous for daily operations

### Responsibilities
- Manage Trillet sub-accounts for all clients
- Configure call flows, voice training, and knowledge bases
- Provision and release UK phone numbers
- Monitor call quality and answer rates
- Optimise voice prompts and conversation flows
- Handle call divert setup and troubleshooting
- Integrate call data into whoza.ai dashboard

### Data Inputs
- Client onboarding data (trade type, services, postcodes, pricing)
- Call analytics (volume, duration, outcomes, recordings)
- Trillet API status and error logs
- Customer feedback on voice quality (from Onboarding Guide)
- Competitor voice features (from Market Analyst)

### Decision Framework
```
For each new client:
1. Auto-scrape website for business info (Trillet feature)
2. Select voice profile based on trade type (British female default)
3. Build knowledge base from client inputs
4. Configure emergency keywords (trade-specific defaults)
5. Provision UK number
6. Test with simulated call
7. Deliver setup instructions to client

For call flow optimisation:
- If "booking rate" <60% → Review qualification questions
- If "emergency transfer rate" >20% → Check keyword sensitivity
- If "call abandon rate" >15% → Review greeting/pickup speed
```

### Output Deliverables
- Client voice configurations (stored in Supabase)
- Call flow diagrams (updated per client)
- Voice quality reports
- Number inventory management
- Call outcome analytics

### Tools
- Trillet API
- Twilio (WhatsApp/SMS fallback)
- UK number provisioning APIs
- Call recording storage (Supabase/S3)

### KPIs
- Call answer rate (target: >98%)
- Booking conversion rate (target: >60% of qualified calls)
- Call quality score (target: >4.5/5 from customer feedback)
- Number provisioning time (target: <2 min)
- Voice setup time per client (target: <10 min)

### Human Gate
**Requires approval:** Voice provider changes (if moving from Trillet), custom voice cloning, emergency routing rule changes affecting live clients

---

## Agent-5: Platform Integrator

### Identity
**Name:** Nexus  
**Role:** Third-party API and integration manager  
**Reports to:** CTO Architect

### Responsibilities
- Calendar integrations (Google, Outlook, ServiceM8)
- Directory listing automation (Checkatrade, Yell, etc.)
- Review platform integrations (Google, Trustpilot)
- CRM/webhook connections
- WhatsApp Business API management
- Zapier/Make workflow automation
- Social media posting APIs

### Data Inputs
- Client CRM/calendar preferences (onboarding data)
- Directory listing status (scraped or API)
- Review generation triggers (from Retention Keeper)
- Integration error logs
- New client feature requests

### Output Deliverables
- Integration status dashboard per client
- Directory listing completion reports
- Review generation logs
- Webhook delivery analytics
- API credential rotation schedule

### KPIs
- Integration success rate (target: >99%)
- Directory listing accuracy (target: 100%)
- Review request delivery rate (target: >95%)
- Webhook latency (target: <2 sec)
- Integration setup time (target: <5 min per service)

### Human Gate
**Requires approval:** New directory partnerships, API credential changes, data sharing agreements

---

## Agent-6: Growth Hacker

### Identity
**Name:** Surge  
**Role:** User acquisition and conversion optimisation  
**Reports to:** Business Intelligence for targets, otherwise autonomous

### Responsibilities
- Optimise trial signup conversion rate
- A/B test landing pages, pricing displays, CTAs
- Design and run viral loops (referrals, sharing)
- Email capture and nurture sequences
- Partnership channel development (trade suppliers, directories)
- Organic growth tactics (trade forums, Facebook groups, LinkedIn)
- CAC optimisation across all channels

### Data Inputs
- Website analytics (GA4, Plausible)
- Trial signup funnel (Supabase events)
- Conversion rates by channel (Stripe + GA4)
- A/B test results (custom events)
- Competitor acquisition tactics (Market Analyst)
- Customer acquisition cost (Business Intelligence)

### Decision Framework
```
Weekly growth experiment cycle:
1. Hypothesis: "Changing CTA from 'Start Trial' to 'See Your Missed Calls' will +15% signup"
2. Design: A/B test, 50/50 traffic split, 2-week duration
3. Execute: Deploy variant via Builder
4. Measure: Track signup rate, trial quality, conversion to paid
5. Analyse: Statistical significance (p < 0.05)
6. Decision: Roll out winner, document learnings

Monthly channel review:
- CAC by channel (Google, Meta, organic, referral)
- LTV by channel
- Cut channels where CAC > 1/3 LTV
- Double down on channels where CAC < 1/5 LTV
```

### Output Deliverables
- Weekly experiment report
- Monthly acquisition dashboard
- Channel performance analysis
- Landing page variant library
- Referral program mechanics

### Tools
- GA4
- Plausible
- PostHog (product analytics)
- Hotjar/Microsoft Clarity (heatmaps)
- Unbounce/Optimizely (A/B testing)

### KPIs
- Trial signup rate (target: >5% of visitors)
- CAC (target: <£30)
- Trial-to-paid conversion (target: >20%)
- Organic traffic growth (target: +20% MoM)
- Referral rate (target: >10% of customers)

### Human Gate
**Requires approval:** Budget reallocation >£100/mo, partnership agreements, pricing tests, brand messaging changes

---

## Agent-7: Content Engine

### Identity
**Name:** Scribe  
**Role:** Content production and SEO optimisation  
**Reports to:** Growth Hacker for strategy, autonomous for production

### Responsibilities
- Generate SEO-optimised blog posts (trade + city + pain point)
- Create landing page copy for new cities/trades
- Produce social media content (Facebook, Instagram, TikTok, LinkedIn)
- Build email newsletter content
- Update existing content for freshness
- Generate video scripts and visual content concepts
- Manage content calendar and publication schedule

### Data Inputs
- Keyword opportunities (Ahrefs API or manual research)
- Search console data (top queries, impressions, CTR)
- Competitor content gaps (Market Analyst)
- Customer questions (from Onboarding Guide, FAQs)
- Trending topics in trades (Google Trends, trade forums)

### Automated Content Pipeline
```
Monday: Generate 3 draft blog posts via Claude API
  Input: keyword list, trade data, competitor gaps
  Output: 800-word draft with FAQs, meta title, description

Tuesday: Human review (Dru or AI-assisted refinement)

Wednesday: Publish to whoza.ai/blog via Netlify build hook
  Auto-generate: Schema markup, OG tags, internal links
  Auto-share: Social media posts via Buffer API

Thursday: Monitor performance (48h impressions, ranking change)

Friday: Update content calendar; schedule next batch
```

### Content Templates (Rotating)
1. **Trade Guide:** "How to price emergency callouts in [City]"
2. **Pain Point:** "£X lost to voicemail: The real cost for [Trade]"
3. **Case Study:** "[Trade] in [City] recovered £X in month 1"
4. **Comparison:** "AI receptionist vs. human receptionist for [Trade]"
5. **Location:** "Best [Trade] in [City]: Why visibility matters"
6. **Seasonal:** "Winter boiler breakdowns: How to capture every call"

### Output Deliverables
- 12–15 blog posts per month
- 20–30 social media posts per month
- 2–4 landing page copies per month
- 1 email newsletter per month
- Content performance report

### Tools
- Claude/GPT-4 API
- Netlify build hooks
- Buffer/Metricool
- Canva (visuals)
- Ahrefs/SEMrush
- Google Search Console

### KPIs
- Organic traffic (target: +20% MoM)
- Ranking positions (target: top 10 for 50+ keywords by month 6)
- Content engagement (target: >2 min avg time on page)
- Social reach (target: 10,000 impressions/month by month 3)
- Content-to-trial conversion (target: >2%)

### Human Gate
**Requires approval:** Content involving real client names/data, controversial industry topics, pricing comparisons with named competitors

---

## Agent-8: Ad Optimiser

### Identity
**Name:** Bidder  
**Role:** Paid advertising management and budget allocation  
**Reports to:** Growth Hacker for strategy, Business Intelligence for budget

### Responsibilities
- Manage Google Ads campaigns (search, display, local)
- Manage Meta Ads (Facebook, Instagram)
- Retargeting campaign management
- Budget allocation across channels
- Ad creative testing and rotation
- Keyword bidding and negative keyword management
- Landing page quality score optimisation
- ROI tracking and reporting

### Data Inputs
- Campaign performance (Google Ads API, Meta Marketing API)
- Conversion data (Stripe, GA4)
- Cost data (Business Intelligence)
- Creative performance (CTR, CPC, CPA)
- Competitor ad intelligence (Market Analyst)
- Landing page conversion rates (Growth Hacker)

### Automated Optimisation Rules
```
Daily (automated):
- If CPC > £2.00 for 3 days → Pause keyword, alert human
- If CTR < 1.5% for 5 days → Rotate creative
- If CPA > £50 for 7 days → Reduce bid 20%
- If CPA < £20 for 7 days → Increase bid 15%
- If conversion rate < 2% → Check landing page (alert Growth Hacker)

Weekly (automated + human review):
- Reallocate budget: 70% to top 3 performing campaigns
- Pause bottom 20% performing ads
- Launch new creative variants (from Content Engine)
- Update negative keyword list

Monthly (human-led):
- Review channel mix (Google vs Meta vs organic)
- Adjust overall budget (from Business Intelligence forecast)
- Test new channels (TikTok, LinkedIn, trade publications)
```

### Output Deliverables
- Daily spend report
- Weekly performance dashboard
- Monthly ROI analysis
- Creative asset library
- Keyword performance report

### Tools
- Google Ads API
- Meta Marketing API
- Google Analytics 4
- Supermetrics/FPowerBI
- Canva (creative production)

### KPIs
- CAC via paid (target: <£30)
- ROAS (target: >3:1)
- CTR (target: >3% search, >1% display)
- CPC (target: <£1.50)
- Conversion rate (target: >5%)

### Human Gate
**Requires approval:** Monthly budget changes >£100, new channel testing, brand safety issues, ad disapprovals

---

## Agent-9: Onboarding Guide

### Identity
**Name:** Guide  
**Role:** Trial activation and feature adoption  
**Reports to:** Growth Hacker for targets, otherwise autonomous

### Responsibilities
- Automate trial user onboarding sequence
- Monitor activation milestones (divert setup, first call, first booking)
- Intervene when users stall in onboarding
- Provide contextual help and tips
- Collect feedback during trial
- Identify upsell opportunities
- Score trial users by likelihood to convert

### Data Inputs
- Trial user events (Supabase analytics)
- Call data (from Voice Integration Engineer)
- Email/SMS engagement (Resend/Twilio logs)
- Support requests (if any)
- Feature usage (dashboard, calendar sync, etc.)

### Activation Scoring Model
```
Trial User Health Score (0–100):
- Account created: +10
- Profile completed: +15
- Call divert activated: +20
- First call received: +15
- First booking made: +20
- Dashboard visited: +5
- Calendar connected: +10
- Review request sent: +5

Score interpretation:
- 80–100: Hot lead → Push for payment conversion
- 50–79: Warm lead → Offer help, highlight value
- 20–49: Cold lead → Re-engagement campaign
- 0–19: At-risk → Intervention or qualification
```

### Automated Intervention Playbook
```
Day 1: No divert setup
→ SMS: "Your whoza.ai number is ready. Forward calls in 2 min: **21*[number]#"

Day 3: No calls received
→ Email: "No calls yet? Add your number to Google Business Profile and your van."

Day 7: <50 health score
→ Email: "Need help getting set up? Reply to this email or WhatsApp us."

Day 10: No booking made but calls received
→ Email: "You've had X calls. Here's how to convert more into bookings."

Day 12: Health score >80, no payment
→ SMS: "You've had X calls answered. Add payment to keep your number: [link]"
```

### Output Deliverables
- Daily trial cohort report
- Activation funnel analysis
- Conversion prediction scores
- Onboarding friction report
- Feature adoption heatmap

### Tools
- Supabase (events, user data)
- Resend (email automation)
- Twilio (SMS)
- PostHog (product analytics)
- Customer.io/Intercom (engagement platform)

### KPIs
- Trial activation rate (target: >70% complete onboarding)
- Trial-to-paid conversion (target: >20%)
- Time to first value (target: <24 hours)
- Feature adoption rate (target: >60% use 3+ features)
- Support ticket rate (target: <10% of trials)

### Human Gate
**Requires approval:** Changes to onboarding sequence, pricing presentation during trial, manual outreach to high-value prospects

---

## Agent-10: Retention Keeper

### Identity
**Name:** Keeper  
**Role:** Churn prevention and lifetime value maximisation  
**Reports to:** Business Intelligence for targets

### Responsibilities
- Monitor customer health scores
- Predict churn risk using usage patterns
- Trigger intervention campaigns for at-risk customers
- Manage upsell and cross-sell opportunities
- Run review generation campaigns
- Execute win-back campaigns for cancelled customers
- Measure and report net revenue retention (NRR)

### Data Inputs
- Usage metrics (calls, minutes, dashboard logins, feature use)
- Billing data (Stripe: payment failures, downgrades, cancellations)
- Support interactions
- NPS/satisfaction scores
- Competitor switching signals (if detectable)
- Market conditions (seasonality, trade demand)

### Churn Prediction Model
```
Risk factors (weekly scoring):
- No calls in 7 days: +20 risk
- No dashboard login in 14 days: +15 risk
- Payment failure: +30 risk
- Minute usage dropped 50% vs last month: +25 risk
- Support ticket (negative sentiment): +15 risk
- No review requests sent in 30 days: +10 risk
- Competitor mention in support: +20 risk

Risk levels:
- 0–30: Healthy → Monthly newsletter only
- 31–60: Caution → Personal check-in email
- 61–85: At-risk → Offer call or discount
- 86–100: Critical → Immediate intervention + human outreach
```

### Automated Retention Playbook
```
Monthly health report (all customers):
→ "This month: X calls answered, Y jobs booked, Z reviews gained"
→ Include ROI calculation: "whoza.ai cost £69, estimated value £X"

Upsell trigger (3 months, usage >80%):
→ "You're using 480 of 500 minutes. Upgrade to Business for £129."

Downgrade prevention (payment failure):
→ Day 1: "Payment failed. Update card to avoid interruption."
→ Day 3: "Your service pauses in 24 hours. Update now."
→ Day 7: "We'd love you back. 50% off first month: [link]"

Win-back (cancelled):
→ Day 7: "What could we have done better?" (survey)
→ Day 30: "New feature: AI visibility now included. Restart?"
→ Day 90: "Still missing calls? Here's what our customers say."

Review generation (48h post-booking):
→ SMS to customer: "How was your experience? Quick review: [Google link]"
```

### Output Deliverables
- Weekly churn risk report
- Monthly NRR analysis
- Intervention campaign results
- Upsell conversion report
- Customer satisfaction trends

### Tools
- Supabase (usage data)
- Stripe (billing events)
- Resend/Twilio (campaigns)
- Retool/Internal dashboard (health scores)

### KPIs
- Gross churn rate (target: <5% monthly)
- Net revenue retention (target: >110%)
- Upsell rate (target: >15% of eligible customers)
- Win-back rate (target: >10% of churned customers)
- Review generation rate (target: >20% of completed jobs)

### Human Gate
**Requires approval:** Discount offers >20%, contract amendments, churned customer manual outreach, escalated complaints

---

## Agent-11: Market Analyst

### Identity
**Name:** Scout  
**Role:** Competitive intelligence and market monitoring  
**Reports to:** CTO Architect (technical), Growth Hacker (tactical)

### Responsibilities
- Monitor competitor websites, pricing, and feature changes
- Track industry news and market trends
- Analyse competitor SEO and content strategies
- Identify partnership and acquisition opportunities
- Monitor trade industry regulations and compliance changes
- Alert team to competitive threats or opportunities

### Data Inputs
- Competitor websites (scraped weekly via browser automation)
- Competitor pricing pages (monitored for changes)
- Competitor blog/content (tracked for new topics)
- Industry news (Google Alerts, RSS feeds)
- Trade forums and social media (Reddit, Facebook groups)
- App store reviews (if competitors have apps)
- Job postings (signals expansion directions)

### Automated Monitoring
```
Weekly scan:
1. Scrape top 5 competitor homepages + pricing
2. Detect changes: new features, price changes, new pages
3. Extract new blog post topics and keywords
4. Check for new customer testimonials/case studies
5. Monitor social media follower growth and engagement

Monthly report:
- Competitor feature comparison matrix (updated)
- Pricing movement alerts
- Content gap analysis (what they rank for, we don't)
- Market share estimation (based on review counts, traffic estimates)
- Threat/opportunity scorecard
```

### Output Deliverables
- Weekly competitive intelligence brief
- Monthly market landscape report
- Competitor feature comparison (live dashboard)
- Pricing intelligence alert
- Content gap analysis
- Partnership opportunity list

### Tools
- Browser automation (Playwright)
- Scraping tools (Scrapy/BeautifulSoup)
- Ahrefs/SEMrush (competitor SEO)
- Google Alerts
- RSS feeds
- Social media monitoring (Mention/Brand24 — optional)

### KPIs
- Competitor change detection speed (target: <48 hours)
- Intelligence report accuracy (target: >95% verified)
- Strategic insight count (target: ≥3 actionable insights/month)
- False alert rate (target: <10%)

### Human Gate
**Requires approval:** Public competitive messaging, pricing responses to competitor moves, partnership outreach

---

## Agent-12: Business Intelligence

### Identity
**Name:** Oracle  
**Role:** Data analytics, forecasting, and business operations  
**Reports to:** Human (Dru) for strategic decisions

### Responsibilities
- Maintain real-time KPI dashboard
- Financial forecasting and scenario modelling
- Cohort analysis (trial, conversion, retention)
- Revenue recognition and reporting
- Anomaly detection in business metrics
- Budget allocation recommendations
- Investor/reporting-ready summaries

### Data Inputs
- Stripe (revenue, MRR, ARR, churn, LTV)
- Supabase (usage, events, user counts)
- Trillet (call volume, costs)
- Google Ads/Meta (ad spend, CAC)
- Sentry (error rates, uptime)
- All other agents' KPIs

### Core Dashboards (Auto-Updated)

**1. Executive Summary (Daily)**
```
MRR: £X (↑/↓ Y%)
New trials: X
New paid: X
Churned: X
Net revenue: £X
Cash runway: X months
Top concern: [auto-flagged anomaly]
```

**2. Unit Economics (Weekly)**
```
CAC: £X (by channel)
LTV: £X
LTV/CAC ratio: X
Payback period: X months
Gross margin: X%
Net margin: X%
```

**3. Operational Health (Real-time)**
```
Uptime: X%
Error rate: X%
Call answer rate: X%
Trial activation: X%
Trial-to-paid: X%
Customer health: X% green, X% yellow, X% red
```

**4. Forecasting (Monthly)**
```
Revenue forecast (3, 6, 12 months)
Customer count forecast
Cash flow projection
Scenario: conservative / moderate / aggressive
Break-even analysis
```

### Automated Anomaly Detection
```
Alert if:
- MRR growth rate drops >30% vs trailing 3-month avg
- Churn rate spikes >2× normal
- CAC increases >50% in one month
- Call answer rate drops <95%
- Trial-to-paid conversion drops <15%
- Infrastructure cost per customer increases >20%
- Any metric crosses threshold for 3 consecutive days
```

### Output Deliverables
- Daily executive brief (auto-generated)
- Weekly unit economics report
- Monthly forecast update
- Quarterly investor summary
- Annual business review

### Tools
- Supabase (data warehouse)
- Stripe dashboard
- Metabase/Lightdash (BI dashboard)
- Google Sheets (forecasting models)
- Python/pandas (analysis scripts)
- DBT (data transformation — if needed later)

### KPIs
- Dashboard freshness (target: real-time)
- Forecast accuracy (target: ±10% at 3 months)
- Anomaly detection speed (target: <24 hours)
- Report generation time (target: <1 hour human review)

### Human Gate
**Requires approval:** Budget allocation changes, pricing changes, revenue recognition decisions, investor communications

---

## Central Orchestration Hub

### Supabase as the Command Centre

All agents communicate through Supabase:

```
Agent → Supabase (tables/triggers) → Other Agents

Example workflows:

1. New trial signup:
   Stripe webhook → Supabase → Onboarding Guide triggers email
   Supabase → Voice Integration Engineer provisions number
   Supabase → Business Intelligence updates MRR forecast

2. Call received:
   Trillet webhook → Supabase → Onboarding Guide updates health score
   Supabase → Retention Keeper updates usage metrics
   Supabase → Business Intelligence updates unit economics

3. Churn risk detected:
   Retention Keeper → Supabase → Business Intelligence flags anomaly
   Supabase → Growth Hacker reviews CAC impact
   Supabase → Onboarding Guide checks for onboarding failure pattern

4. Competitor price drop:
   Market Analyst → Supabase → Business Intelligence models impact
   Supabase → Growth Hacker considers response
   Supabase → CTO Architect evaluates technical implications
```

### Agent Coordination Protocol

**Daily Standup (Automated, 6:00 AM):**
- Each agent posts status to Supabase `agent_daily_log`
- Flagged items escalated to human if threshold crossed
- Cross-agent dependencies identified and assigned

**Weekly Review (Automated report, Sunday):**
- All KPIs rolled up by Business Intelligence
- Anomalies highlighted
- Agent performance scored
- Resource allocation recommendations

**Monthly Planning (Human-led, 1st of month):**
- Business Intelligence presents forecast
- CTO Architect presents technical roadmap
- Growth Hacker presents experiment backlog
- Human approves priorities and budget

---

## Human Oversight Model

### The 3-Gate System

| Gate | What Requires Approval | Who |
|------|----------------------|-----|
| **Gate 1: Strategic** | Pricing changes, product vision shifts, major partnerships, fundraise | Dru |
| **Gate 2: Financial** | Budget changes >£100/mo, vendor switches, cost increases >20% | Dru + Business Intelligence |
| **Gate 3: Operational** | Architecture changes, security incidents, customer escalations, brand messaging | Dru or delegated to CTO Architect |

### Autonomous Zone (No Approval Needed)
- Bug fixes, performance optimisations, content creation
- A/B tests with <20% traffic
- Routine deployments, dependency updates
- Standard customer onboarding
- Daily ad optimisation
- Competitor monitoring
- Routine reporting

### Escalation Triggers
Any agent auto-escalates to human when:
- Revenue impact >£500
- Customer churn risk for >5 customers simultaneously
- Security incident or data breach
- System downtime >5 minutes
- Competitor launches direct competitor to bundle
- Legal/regulatory issue detected

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1–4)
- [ ] Deploy CTO Architect, DevOps Guardian, Full-Stack Builder
- [ ] Set up Supabase agent orchestration tables
- [ ] Connect all monitoring tools (Sentry, UptimeRobot, etc.)
- [ ] Build core dashboard (Business Intelligence)
- [ ] Launch whoza.ai/voice landing page

### Phase 2: Voice + Integration (Weeks 5–8)
- [ ] Deploy Voice Integration Engineer
- [ ] Deploy Platform Integrator
- [ ] Trillet Agency account setup
- [ ] Trial signup flow automated
- [ ] Calendar + basic CRM integrations
- [ ] Number provisioning automation

### Phase 3: Growth Engine (Weeks 9–12)
- [ ] Deploy Growth Hacker, Content Engine, Ad Optimiser
- [ ] Launch Google Ads + Meta Ads pilots
- [ ] Content pipeline operational (3 posts/week)
- [ ] Retargeting campaigns live
- [ ] SEO landing page expansion (new cities/trades)

### Phase 4: Customer Success (Weeks 13–16)
- [ ] Deploy Onboarding Guide
- [ ] Deploy Retention Keeper
- [ ] Trial-to-paid automation complete
- [ ] Review generation live
- [ ] Monthly health reports automated
- [ ] Upsell triggers active

### Phase 5: Intelligence Layer (Weeks 17–20)
- [ ] Deploy Market Analyst
- [ ] Competitor monitoring operational
- [ ] Weekly intelligence briefs
- [ ] Deploy full Business Intelligence
- [ ] Forecasting models calibrated
- [ ] Anomaly detection tuned

### Phase 6: Optimisation (Ongoing)
- [ ] Agent performance reviews (monthly)
- [ ] Workflow refinements based on data
- [ ] New agent additions as needed
- [ ] Continuous improvement loops

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | whoza.ai website, dashboard |
| **Backend** | Supabase (Postgres + Edge Functions) | Database, auth, APIs, triggers |
| **Voice** | Trillet API | AI answering, call management |
| **Billing** | Stripe | Subscriptions, trials, invoicing |
| **Email** | Resend | Transactional + marketing emails |
| **SMS** | Twilio | Notifications, reminders, reviews |
| **Hosting** | Netlify | CDN, edge functions, static generation |
| **Monitoring** | Sentry + UptimeRobot | Error tracking, uptime |
| **Analytics** | GA4 + Plausible + PostHog | Web + product analytics |
| **Ads** | Google Ads + Meta | Paid acquisition |
| **Social** | Buffer/Metricool | Content scheduling |
| **Content AI** | Claude/GPT-4 | Blog generation, copy |
| **BI** | Metabase/Lightdash | Dashboards, reporting |
| **Security** | Cloudflare + Snyk | DDoS, WAF, vulnerability scanning |

---

## Estimated Operating Cost

| Component | Monthly Cost |
|-----------|-------------|
| Supabase (Pro tier) | £20–40 |
| Netlify (Pro tier) | £15–25 |
| Resend (marketing emails) | £0–20 |
| Twilio (SMS) | £10–50 |
| Trillet Agency | £230 (~$299) |
| Sentry | £20–40 |
| Metabase/Lightdash | £0–30 |
| Claude/GPT-4 API | £20–50 |
| Buffer/Metricool | £10–20 |
| UptimeRobot | £10–20 |
| **Total platform/tools** | **£365–565** |
| Google Ads | £450 |
| Meta Ads | £300 |
| Retargeting | £150 |
| **Total marketing** | **£900** |
| **GRAND TOTAL** | **£1,265–1,465/mo** |

---

## The Vision: 12 Months Forward

**Month 3:** 30 paying customers, £3,000 MRR, 5 agents operational
**Month 6:** 80 paying customers, £9,000 MRR, 8 agents operational
**Month 9:** 150 paying customers, £18,000 MRR, all 12 agents operational
**Month 12:** 250 paying customers, £35,000 MRR, agents handling 90% of operations

**Human role at month 12:** Strategic decisions, partnerships, investor relations, creative direction. Day-to-day operations fully automated.

---

## Conclusion

This agent team is designed to make whoza.ai **self-operating at scale**. Each agent is specialised, data-driven, and connected to a central intelligence layer. The human role shifts from operator to strategist — approving high-impact decisions while the agents execute the predictable work with machine precision.

**The competitive moat:** No UK competitor has this level of operational automation. While they hire humans for onboarding, support, and marketing, whoza.ai runs 24/7 with minimal human overhead. This means lower costs, faster response times, and the ability to scale without proportional headcount growth.

---

*Architecture designed for whoza.ai's AI Voice + AI Visibility bundle. All agents integrate through Supabase with Stripe, Trillet, Resend, and Twilio as core service APIs.*
