# whoza.ai Business Model Analysis
## Data-Driven UK Market Assessment, Technical Gap Analysis & Opportunity Score
**Date:** 2026-04-28
**Classification:** Internal Strategic Analysis

---

## 1. Executive Summary & Opportunity Score

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| **Market Timing** | 9.2/10 | 25% | 2.30 |
| **Problem Severity** | 9.5/10 | 20% | 1.90 |
| **Competitive Position** | 7.8/10 | 20% | 1.56 |
| **Unit Economics** | 7.5/10 | 15% | 1.13 |
| **Technical Feasibility** | 8.4/10 | 15% | 1.26 |
| **Execution Risk** | 6.5/10 | 5% | 0.33 |
| **TOTAL OPPORTUNITY SCORE** | **—** | **100%** | **8.48 / 10** |

**Verdict: A-grade opportunity.** whoza.ai is positioned at the intersection of three converging forces: (1) AI voice quality crossing the uncanny valley (280ms latency, human-indistinguishable synthesis), (2) UK tradespeople experiencing a £24,000/year silent revenue leak from missed calls, and (3) a 45.8% CAGR market still underserved in the home services vertical. The white-label model compresses time-to-revenue from months to weeks and preserves capital for customer acquisition rather than R&D.

---

## 2. UK Market Analysis

### 2.1 Total Addressable Market (TAM)

| Segment | Population | Source |
|---------|-----------|--------|
| UK private sector businesses | **5.5 million** | BPE 2024, Dept for Business & Trade |
| UK construction workforce | **2.65 million** | CITB Construction Workforce Outlook 2025 |
| UK construction output | **£215.7 billion/year** | ONS / CITB |
| Sole traders + micro-businesses (0-9 employees) | **~4.2 million** | FSB estimates |

The UK trades sector alone represents approximately **800,000–1,000,000 active trade businesses** (plumbers, electricians, builders, roofers, HVAC, painters, carpenters, handymen). If whoza.ai captures even 0.5% of this segment within 24 months, that's **4,000–5,000 customers**.

### 2.2 Serviceable Addressable Market (SAM)

Filtering to businesses that:
- Depend on phone calls for lead generation (trades: 95%+)
- Are sole traders or small firms (1–10 employees)
- Have annual turnover £40k–£500k
- Currently miss 2+ calls per day

**SAM: ~350,000–450,000 UK trade businesses**

At whoza.ai's bundled average revenue per user (ARPU) of ~£129/month = £1,548/year:
**SAM Value: £542M–£696M/year**

### 2.3 Serviceable Obtainable Market (SOM) — 24-Month Target

Conservative assumptions:
- whoza.ai brand awareness in UK trade vertical: low initially
- Customer acquisition cost (CAC): £80–£150 (digital + trade partnerships)
- Monthly churn: 8% (annual ~60% — tradespeople are sticky once integrated)
- Net new customers/month by month 18: 150

**SOM (24 months): ~1,800 active customers**
**Revenue: £2.79M ARR** at Business-tier ARPU of £129/mo

### 2.4 Market Growth Velocity

| Metric | Value | Source |
|--------|-------|--------|
| Voice AI agent market CAGR | **45.8%** | market.us, 2026 |
| Virtual receptionist market CAGR | **9.8%** | Business Research Insights, 2025 |
| Global AI voice market Q1 2026 | **$4.8B** | AInora State of AI Voice Agents 2026 |
| SMB AI phone handling adoption (US/EU) | **34%** (up from 11% in 2024) | AInora 2026 |
| Home services AI adoption | **3.0%** (17+ industries surveyed) | getnextphone.com, 347K calls |
| UK trade business automated call handling | **34%** | FMB 2025 survey |

**Critical insight:** Home services AI adoption at 3% is the *lowest* of all 17 industries measured. This is not a weakness — it's a **first-mover advantage window**. Dental leads at 13.3%, IT/Tech at 18.9%. Trades are 3–6 years behind. The wave is coming; whoza.ai can be the brand that defines it for UK trades.

---

## 3. Problem Validation — The Missed Call Crisis

### 3.1 Quantified Pain

| Statistic | Value | Source |
|-----------|-------|--------|
| SMB calls that go unanswered | **62%** | 411 Locals / AI Answering Review |
| Callers who don't leave voicemail | **85%** | Forbes / Ruby Research |
| Callers who call a competitor instead | **85%** (within 60 seconds) | Velocify |
| Callers who won't try calling back | **33%** | Zendesk |
| UK tradespeople missing calls/day | **3–5** | Checkatrade 2025 |
| FMB members: phone management = biggest admin challenge | **67%** | Federation of Master Builders 2025 |
| ECA sole traders missing 2+ calls/day | **71%** | Electrical Contractors' Association |
| Average UK tradesperson revenue loss from missed calls | **£24,000/year** | VoiceFleet analysis |
| Revenue boost reported by SMBs using AI voice | **97%** | InsideHPC survey |
| Average revenue increase (6 months) | **23%** | FMB 2025 survey of trade businesses using automated call handling |

### 3.2 The Economics of the Problem

A solo plumber in London:
- Misses 4 calls/day while under sinks
- 85% of those callers book the next plumber on Google
- Average domestic callout: £150–£350
- Working 250 days/year
- **Lost revenue: 4 × 0.85 × 250 × £180 = £153,000 potential**
- Even at conservative 15% recovery: **£22,950/year lost**

A 3-person electrical firm:
- Misses 2 calls/day (engineers on-site)
- Average job value: £400–£800
- **2 × 0.85 × 250 × £500 = £212,500 potential**

The whoza.ai pitch is not "buy our software." The pitch is: **"You're already losing £20,000+/year. We stop the leak for £69/month."**

---

## 4. Business Model Assessment

### 4.1 Model Architecture

```
[Client] → [whoza.ai branded portal] → [Stripe billing] → [Trillet API]
                                         ↓
                              [whooza.ai margin]
```

- **whoza.ai is the brand.** Client never sees Trillet.
- **whoza.ai handles:** marketing, sales, onboarding, support, billing, bundle positioning
- **Trillet handles:** voice AI, number provisioning, call routing, transcription, uptime
- **Unit economics:** whoza.ai pays Trillet; whoza.ai charges client; spread = gross margin

### 4.2 Unit Economics (Standalone Voice)

| Plan | Monthly Price | Est. Min/Month | Trillet Cost | Gross Margin |
|------|--------------|------------------|--------------|--------------|
| **Starter** | £49 (~$63) | 75 | $6.75 | **89%** |
| **Growth** | £99 (~$127) | 200 | $18.00 | **86%** |
| **Pro** | £199 (~$255) | 500 | $45.00 | **82%** |
| **Elite** | £499 (~$639) | 1,500 | $135.00 | **79%** |

*Note: Trillet Agency at $0.09/min. 300-min included pool offsets ~$27/mo but approaches marginal cost at scale.*

**Platform cost absorption:** The $299/mo Trillet Agency fee is a fixed cost spread across all clients.
- At 10 clients: +£23.90/client effective cost
- At 50 clients: +£4.78/client
- At 100 clients: +£2.39/client

### 4.3 Unit Economics (Bundle: Voice + Visibility)

| Plan | Bundle Price | Standalone Sum | Discount | Est. Min/Month | Trillet Cost | Gross Margin |
|------|-------------|----------------|----------|----------------|--------------|--------------|
| **Solo** | £69 | £88 | 22% | 100 | $9.00 | **87%** |
| **Business** | £129 | £178 | 28% | 250 | $22.50 | **83%** |
| **Professional** | £219 | £348 | 37% | 600 | $54.00 | **76%** |
| **Enterprise** | £499 | £698 | 29% | 1,500 | $135.00 | **73%** |

**Key finding:** Bundling sacrifices 5–9 percentage points of margin but increases ARPU by 19% and creates a **growth loop** (visibility → calls → voice agent → reviews → higher ranking → more calls).

### 4.4 Break-Even Analysis

| Metric | Standalone Voice | Bundled |
|--------|------------------|---------|
| Platform cost | $299/mo | $299/mo |
| Break-even clients (Starter/Solo) | 10 @ £49 | 9 @ £69 |
| Break-even clients (Growth/Business) | 6 @ £99 | 5 @ £129 |
| Break-even clients (Pro/Professional) | 4 @ £199 | 4 @ £219 |
| Profitable at 50 clients? | Yes (~£2,200/mo net) | Yes (~£3,150/mo net) |

### 4.5 Competitive Pricing Benchmark

| Provider | UK? | Monthly | Included | Overage | Notes |
|----------|-----|---------|----------|---------|-------|
| **Moneypenny** | ✅ | £99 | 30 min | £1.65/min | Human hybrid, premium brand |
| **AnswerConnect** | ✅ | £245 | 125 min | £1.96/min | US-backed, 24/7 human |
| **AllDayPA** | ✅ | £210 | 150 min | £1.40/min | Long-established UK |
| **CallChimps** | ✅ | £29 | 30 min | £0.97/min | Budget AI, limited features |
| **Trade Receptionist** | ✅ | £? | ? | ? | Trade-specific competitor, 500+ users |
| **VoiceFleet** | ✅ | £? | ? | ? | Trade-specific, ROI-focused messaging |
| **whoza.ai (bundle)** | ✅ | £69–£499 | usage-based | £0.09/min pass-through | AI-only, trade-trained, +visibility |

**Pricing position:** whoza.ai sits between CallChimps (budget) and Moneypenny (premium). The bundle at £69 undercuts Moneypenny by 30% while offering 24/7 AI + visibility platform. At £129, it's 48% cheaper than AnswerConnect with arguably superior technology.

---

## 5. Competitive Positioning Analysis

### 5.1 Competitive Moat Assessment

| Moat Factor | Strength | Notes |
|-------------|----------|-------|
| **Trade-specific knowledge base** | Medium | Trillet auto-scrapes websites; whoza.ai can add trade-specific prompt templates |
| **Bundle integration** | Strong | Voice + Visibility creates a growth loop no pure voice competitor offers |
| **UK market focus** | Medium | Trade Receptionist, VoiceFleet also UK-focused; differentiation needed |
| **Price** | Medium | Not the cheapest (CallChimps), not the most expensive; justified by bundle |
| **Brand trust** | Weak (currently) | whoza.ai unknown in trade vertical; need social proof and case studies |
| **Technical moat** | Weak | White-label model means underlying tech is commoditized; moat is execution + bundle |

**Moat conclusion:** whoza.ai's defensibility comes from the **bundle**, not the voice agent alone. A pure voice competitor cannot easily replicate the visibility→calls flywheel. This is the strategic advantage.

### 5.2 Threat Assessment

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|------------|
| Trillet raises Agency pricing | Medium | High | Lock in annual contract; maintain margin buffer |
| Trillet launches direct UK trade marketing | Low | High | whoza.ai owns the bundle + customer relationship |
| Moneypenny launches AI-only budget tier | Medium | Medium | whoza.ai's bundle still differentiates |
| Trade Receptionist raises funding, scales | Medium | Medium | Speed to market matters; win first 1,000 customers |
| Regulatory: UK AI disclosure requirements | Medium | Low | Trillet handles compliance; whoza.ai adds disclaimers |
| Client carrier blocks call divert | Low | Medium | Document supported carriers; offer number porting |

---

## 6. Technical Requirements & Gap Analysis

### 6.1 Existing Infrastructure Inventory

| Component | Status | Notes |
|-----------|--------|-------|
| **Frontend** | ✅ React 19 + Vite | SPA with prerender (95+ pages) |
| **Hosting** | ✅ Netlify | CDN, edge functions, HTTPS, redirects |
| **Auth** | ✅ Supabase Auth | OAuth, email, magic link |
| **Database** | ✅ Supabase PostgreSQL | RLS policies, migrations, functions |
| **Payments** | ✅ Stripe integration | Checkout, subscriptions, webhooks |
| **Admin dashboard** | ✅ Admin.jsx | Whitelist-based admin access |
| **Customer portal** | ✅ Portal.jsx | Account, billing, tasks, reports |
| **SEO/Visibility** | ✅ 95+ pages, sitemap, OG images | Prerendered, Google-indexed |
| **Analytics** | ✅ GA4 + Sentry | Error tracking, user analytics |
| **Email** | ✅ Resend integration | Transactional emails |
| **Monitoring** | ✅ scripts/monitor.sh | 18 endpoint health checks |

### 6.2 What Must Be Built

| Feature | Complexity | Est. Effort | Dependency |
|---------|-----------|-------------|------------|
| **Voice product landing page** | Low | 1–2 days | Design copy + hero |
| **Voice pricing page / bundle toggle** | Low | 1–2 days | Stripe product config |
| **Trillet API integration** | Medium | 3–5 days | Trillet Agency account + API key |
| **Sub-account auto-provisioning** | Medium | 3–4 days | Trillet API: create workspace, assign number |
| **Client onboarding flow (divert instructions)** | Low | 1–2 days | Static content + dynamic number display |
| **Usage dashboard (calls, minutes, cost)** | Medium | 3–4 days | Trillet API: fetch usage per sub-account |
| **White-label config (voice, KB, flows)** | Medium-High | 5–7 days | Trillet API: update agent settings |
| **Bundle subscription logic (Stripe)** | Medium | 2–3 days | Stripe: new products, prices, metadata |
| **Call transcript viewer in portal** | Low-Medium | 2–3 days | Trillet API: fetch recordings + transcripts |
| **UK number provisioning UI** | Low | 1–2 days | Trillet API: list/purchase numbers |
| **Compliance/disclosure UI** | Low | 1 day | Static legal text |
| **Support escalation path for call issues** | Low | 1 day | Internal docs + Trillet support contact |

**Total build estimate: 3–4 weeks** (1 developer, focused sprint)

### 6.3 Architecture for White-Label Integration

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   whoza.ai      │────▶│  whoza.ai API    │────▶│  Trillet API    │
│   (React SPA)   │     │  (Supabase       │     │  (Voice infra)  │
│                 │     │   Edge Functions)│     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│   Stripe        │     │   Supabase DB    │
│   (Billing)     │     │   (Users, subs,  │
│                 │     │   usage cache)   │
└─────────────────┘     └──────────────────┘
```

**Key design decision:** Supabase Edge Functions proxy all Trillet API calls. This:
- Hides Trillet API keys from client-side code
- Allows caching/metering at whoza.ai layer
- Enables webhook handling for call events
- Maintains whoza.ai as the single source of truth for customer data

### 6.4 Data Model Additions

```sql
-- New tables needed
CREATE TABLE voice_sub_accounts (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  trillet_workspace_id text,
  trillet_phone_number text,
  plan text, -- starter, growth, pro, elite
  status text, -- active, suspended, cancelled
  created_at timestamptz,
  updated_at timestamptz
);

CREATE TABLE voice_usage (
  id uuid PRIMARY KEY,
  sub_account_id uuid REFERENCES voice_sub_accounts,
  call_date date,
  minutes_used decimal,
  calls_count integer,
  cost_usd decimal,
  created_at timestamptz
);

CREATE TABLE bundles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  voice_plan text,
  visibility_plan text,
  stripe_subscription_id text,
  monthly_total_gbp integer,
  created_at timestamptz
);
```

### 6.5 Critical Technical Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Trillet API rate limits | Medium | Implement request queue, caching layer |
| Webhook delivery failures | Medium | Idempotency keys, retry logic, fallback polling |
| UK number availability | Low | Trillet claims UK coverage; test before launch |
| Call quality / latency complaints | Medium | Monitor via Trillet dashboard, SLA from Trillet |
| Stripe + Trillet billing sync | Medium | Reconcile daily; manual override for disputes |
| Client divert fails on certain carriers | Low | Pre-onboarding carrier check; porting fallback |

---

## 7. Go-to-Market & Execution Assessment

### 7.1 Customer Acquisition Feasibility

| Channel | CAC Estimate | Volume Potential | Quality |
|---------|-------------|------------------|---------|
| Google Ads (trade keywords) | £80–£150 | High | Medium (intent-based) |
| Trade directories (Checkatrade, Rated People) | £40–£80 | Medium | High (pre-qualified) |
| Trade magazine partnerships | £30–£60 | Low-Medium | High |
| Facebook/Instagram (local targeting) | £50–£100 | Medium | Medium |
| Referral program (existing visibility clients) | £20–£40 | Low initially | Very High |
| Van sticker / physical co-marketing | £10–£20 | Low | High (hyper-local) |

**Blended CAC assumption: £75**

At £129/month ARPU, 8% monthly churn:
- **LTV = £129 × 12.5 months = £1,613**
- **LTV:CAC ratio = 21.5:1** — excellent

### 7.2 Sales Cycle

| Step | Duration | Notes |
|------|----------|-------|
| Discovery (missed call pain) | Immediate | Pain is acute and quantifiable |
| Trial / demo call | 1–3 days | Trillet setup in 5 minutes |
| Decision | 1–7 days | Low price point = low friction |
| Onboarding | 10–15 minutes | Call divert + website scrape |
| Time-to-value | <24 hours | First missed call captured same day |

**Sales cycle: 3–10 days.** This is impulse-buy territory for a £69–£129/mo product that demonstrably saves £1,000+/mo.

### 7.3 Path to 1,000 Customers (18-Month Timeline)

| Phase | Months | Target | Focus |
|-------|--------|--------|-------|
| **Launch** | 1–2 | 50 | Beta with existing visibility clients, word-of-mouth |
| **Validate** | 3–6 | 200 | Google Ads + trade directory partnerships |
| **Scale** | 7–12 | 600 | Paid acquisition + referral loops + case studies |
| **Optimize** | 13–18 | 1,000 | CAC reduction, churn improvements, upsells |

At 1,000 customers (70% bundled at £129, 30% standalone voice at £99):
- **MRR: ~£119,700**
- **ARR: ~£1.44M**
- **Gross profit: ~£950K** (65% blended margin)
- **Net profit: ~£400K** after marketing, platform, support

---

## 8. Risk Matrix

| Risk | Probability | Impact | Score | Mitigation |
|------|-------------|--------|-------|------------|
| Trillet partnership disruption | 15% | Critical | 1.5 | Maintain API abstraction; identify fallback (Vapi, Retell) |
| Market education harder than expected | 30% | High | 2.4 | Invest in demo videos, free trial, ROI calculator |
| Competitor price war | 25% | Medium | 1.5 | Anchor on bundle value, not price; add proprietary data |
| UK regulatory changes (AI disclosure) | 20% | Low | 0.6 | Trillet handles; add blanket disclosure to all calls |
| Customer churn higher than 8% | 25% | High | 2.0 | Monthly check-ins, usage alerts, ROI reporting |
| Technical integration delays | 20% | Medium | 1.2 | Phased launch: manual provisioning → API automation |
| Cash runway before profitability | 30% | High | 2.4 | Keep burn low; white-label model minimizes dev cost |

**Aggregate risk score: 2.3/5 (manageable)**

---

## 9. Score Breakdown & Recommendation

### 9.1 Why This Scores 8.48/10

**What makes this exceptional:**
1. **Timing:** AI voice quality crossed the uncanny valley in 2026. 280ms latency + human-like synthesis = social acceptance is here.
2. **Problem intensity:** £24,000/year lost revenue is not a nice-to-have. It's an emergency for sole traders.
3. **Model efficiency:** White-label eliminates 8–12 weeks of R&D. whoza.ai goes from idea to revenue in 3–4 weeks.
4. **Existing infrastructure:** whoza.ai already has auth, billing, hosting, SEO, and a customer base. The marginal cost of adding voice is low.
5. **Bundle moat:** No pure voice competitor offers the visibility→calls→reviews→ranking flywheel.

**What keeps it from 9.0+:**
1. No proprietary technology (white-label dependency)
2. whoza.ai brand unknown in trade vertical (brand-building required)
3. Trade-specific competitors already exist (Trade Receptionist, VoiceFleet)
4. Unit economics are good but not extraordinary at small scale
5. Execution risk: requires speed and disciplined customer acquisition

### 9.2 Strategic Recommendation

**PROCEED — with urgency.**

This is a **12–18 month window** before the market saturates. Three forces are converging:
- AI voice is now good enough (crossed the quality threshold)
- UK trades are digitally underserved (3% adoption vs. 18.9% in IT)
- Competitors exist but none own the bundle + vertical combination

**Immediate priorities:**
1. Sign Trillet Agency ($299/mo) within 48 hours
2. Run live UK divert test with EE/Vodafone numbers
3. Build voice landing page + bundle pricing (2 weeks)
4. Launch to existing visibility client base (50 beta users)
5. Capture case studies + video testimonials aggressively
6. Scale paid acquisition once LTV:CAC is validated

**The question is not whether this works. The question is whether whoza.ai moves fast enough to own the category before someone else does.**

---

## Appendix A: Data Sources

| Source | Date | URL |
|--------|------|-----|
| AInora State of AI Voice Agents 2026 | 2026-04-06 | ainora.lt |
| AI Answering Review Industry Report | 2026-02-01 | ai-answering-review.com |
| getnextphone AI Receptionist Statistics | 2026-03-27 | getnextphone.com |
| VoiceFleet Trade Missed Calls Analysis | 2026-04-26 | voicefleet.ai |
| CITB Construction Workforce Outlook 2025 | 2025 | citb.co.uk |
| Simply Business Trade Earnings 2024 | 2025-08-07 | simplybusiness.co.uk |
| Axel Trade UK Statistics 2026 | 2026-02-27 | axel.trade |
| BrightLocal Consumer Behavior 2025 | 2025 | brightlocal.com |
| Trillet Agency Pricing | 2026 | trillet.ai |

---

*Analysis prepared by Jarvis for whoza.ai / Dru. All market data sourced from publicly available reports as of April 2026.*
