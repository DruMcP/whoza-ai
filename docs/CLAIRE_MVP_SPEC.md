# Claire — Post-Job Conversion Engine

> **MVP Product Specification**
> **Status:** LOCKED — 2026-05-02
> **Owner:** Jarvis for Dru / whoza.ai

---

## 1. Identity

**Claire is NOT:**
- Review software
- Reputation management tool

**Claire IS:**
> A post-job conversion engine that increases win rate and future demand automatically.
> The mechanism that compounds revenue after every job.

---

## 2. Core System Flow (LOCKED)

```
Call → Booked → Job Completed → Claire Trigger → WhatsApp Review → Google Review → Higher Trust → More Jobs
```

---

## 3. MVP Architecture

### 3.1 Layer 1 — Trigger Engine

**Condition:** Job status = "Completed" OR "Accepted + time elapsed"

**Data input:**
- Customer name
- Phone number
- Job type
- Job value (optional)
- Timestamp

**Source:** Trillet flow / job completion webhook

---

### 3.2 Layer 2 — Timing Engine

| Job type | Delay |
|----------|-------|
| Emergency | 2 hours |
| Standard | 4 hours |
| Install | 24 hours |

**MVP default:** 4 hours

---

### 3.3 Layer 3 — Messaging Engine

**Channel priority:**
1. WhatsApp (primary)
2. SMS (fallback)

**Message template:**

```
Hi {{name}}, thanks again for today's {{job_type}}.

Would you mind leaving a quick review? It really helps.

{{review_link}}

– {{business_name}}
```

**World-class details:**
- Job type dynamically inserted
- Tone friendly, not robotic
- No AI mention
- One-tap review link (Google Business Profile)

---

### 3.4 Layer 4 — Smart Routing

**MVP:** Single path → Google review

**Phase 2 (post-MVP):**

```
"How was your experience?"

😊 → Google review
😐 / 😞 → Private feedback form
```

> Prevents negative public reviews. Diverts unhappy customers to private resolution.

---

### 3.5 Layer 5 — Follow-up Engine

**Rule:** If no review after 24h → send 1 reminder

**Reminder message:**

```
Just a quick reminder—would really appreciate a review if you have a minute.

{{review_link}}
```

**Constraint:** Only ONE follow-up. Avoid spam.

---

### 3.6 Layer 6 — Tracking Engine

Track the following:
- Requests sent
- Link clicked
- Review completed (manual or inferred)
- Conversion rate per job type
- Revenue attribution

---

## 4. Claire Dashboard (Client-Facing)

### 4.1 Purpose

Make Claire feel like a **revenue driver**, not a tool.

> "Your improved rating is helping you win more jobs"

### 4.2 MVP Metrics

| Metric | Display |
|--------|---------|
| Reviews requested | Counter |
| Reviews received | Counter |
| Conversion rate | Percentage |
| Current rating | Stars (e.g. 4.3 → 4.6) |
| Total reviews | Counter |
| Impact statement | "+23 new reviews this month" |

### 4.3 UX Principle

**Do NOT overwhelm.**

Show:
- Outcome
- Trend
- Simple metrics

### 4.4 Platform Section

**Title:** "Win More Jobs with Reviews"

**Layout:**
- Left: Graph — reviews over time
- Right: Conversion rate, Rating, Total reviews

---

## 5. Tech Stack (MVP)

| Layer | Tool | Rationale |
|-------|------|-----------|
| Orchestration | n8n | Visual workflow, fast iteration, webhook-native |
| Storage | Supabase | Existing stack, real-time, serverless |
| Messaging | Trillet (preferred) | Already in whoza.ai stack, WhatsApp-native |
| Fallback messaging | Twilio | SMS fallback, existing integration |
| Review link | Google Business Profile direct link | Free, highest impact for local trades |

### 5.1 n8n Workflow (Node-by-Node)

```
[Webhook] → job_completed
    ↓
[Wait] → 4 hours (configurable by job type)
    ↓
[Send WhatsApp] → review request
    ↓
[Wait] → 24 hours
    ↓
[If] → review_completed == false
    ↓
[Send WhatsApp/SMS] → gentle reminder
    ↓
[Log] → result to Supabase
```

### 5.2 Supabase Data Model

**Table:** `review_requests`

| Field | Type | Notes |
|-------|------|-------|
| id | uuid | Primary key |
| client_id | uuid | FK to tradespeople table |
| customer_name | text | |
| phone | text | Normalised E.164 |
| job_type | text | Emergency / Standard / Install |
| job_value | decimal | Optional, for ROI calc |
| status | enum | pending / sent / clicked / completed / declined |
| sent_at | timestamp | |
| reminder_sent | boolean | |
| reminder_sent_at | timestamp | |
| review_completed | boolean | |
| review_platform | text | google / trustpilot / etc |
| rating | smallint | 1-5, if known |
| created_at | timestamp | Default now() |
| updated_at | timestamp | Auto-update |

**Indexes:**
- `client_id` + `status`
- `phone` + `created_at` (for deduplication)
- `sent_at` (for follow-up batching)

---

## 6. Positioning & Messaging

### 6.1 What We Say

**Primary headline:** "Turn completed jobs into more future jobs automatically"

**Secondary:** "Every review is a future customer finding you on Google"

### 6.2 What We NEVER Say

❌ "Collect reviews"
❌ "Reputation management"
❌ "Review software"

---

## 7. Future Expansion Roadmap

### Phase 2 (Month 2-3)
- Sentiment routing (happy → Google, unhappy → private feedback)
- Multi-platform reviews (Trustpilot, Checkatrade)
- AI auto-reply to reviews
- Review request A/B testing

### Phase 3 (Month 4-6)
- AI-generated review responses (owner-approved before posting)
- Review-based lead ranking (which reviews drive most calls)
- Competitor review monitoring
- Review widget for tradespeople websites

### Phase 4 (Month 6-12)
- "Review → referral → new job" loop
- Automated referral requests from 5-star reviewers
- Review-driven SEO recommendations
- Integration with paid ads (show review count in ad copy)

---

## 8. Success Metrics

| Metric | MVP Target | Phase 2 Target |
|--------|-----------|--------------|
| Review request conversion rate | >30% | >40% |
| Average rating improvement | +0.3 stars in 90 days | +0.5 stars |
| Revenue attribution | Trackable | >10% of jobs from "highly reviewed" status |
| Follow-up spam rate | <5% complaints | <2% |
| Time to first review | <48h from job completion | <24h |

---

## 9. Integration Points

### 9.1 Inbound (Triggers Claire)
- Trillet job completion webhook
- Manual "mark complete" in whoza.ai dashboard
- Calendar event end + job tag

### 9.2 Outbound (Claire Actions)
- Trillet WhatsApp API
- Twilio SMS API
- Supabase real-time updates (dashboard)

### 9.3 Data Flow

```
Trillet (job done)
    ↓ webhook
n8n (Claire engine)
    ↓ API call
Trillet/Twilio (message sent)
    ↓ webhook
n8n (track click)
    ↓
Supabase (update status)
    ↓ real-time
whoza.ai dashboard (Claire metrics)
```

---

## 10. Why This Is World-Class

1. **Perfect integration** — Trigger = job completion, Channel = same WhatsApp thread customers already used
2. **Zero friction** — No login, no app, one tap to review
3. **Revenue linkage** — Every review directly tied to "more jobs" narrative
4. **Massive margin** — Cost per request: £1–£3. Value: potentially thousands in new job revenue
5. **Invisible automation** — Customer never feels "managed." They feel appreciated.

---

## 11. Build Priority

| Phase | Effort | Impact | Timeline |
|-------|--------|--------|----------|
| 1. n8n workflow + trigger | 2 days | High | Week 1 |
| 2. Supabase schema + edge function | 1 day | High | Week 1 |
| 3. Message template + send logic | 1 day | High | Week 1 |
| 4. Dashboard widget | 2 days | Medium | Week 2 |
| 5. Follow-up reminder | 1 day | Medium | Week 2 |
| 6. Tracking + analytics | 2 days | Medium | Week 2 |
| 7. Smart routing (Phase 2) | 3 days | High | Month 2 |

**Total MVP build time: ~9 days**

---

*Specification locked by Jarvis for whoza.ai / Dru — 2026-05-02*
*Build begins on explicit go-ahead.*
