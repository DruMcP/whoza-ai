# Trillet → Whoza Architecture Map

_The bridge between supplier infrastructure and customer experience._

## 1. Philosophy

Whoza.ai is not Trillet's interface. Whoza is a **revenue system** built *on top of* Trillet's voice infrastructure. Every Trillet feature must map to a whoza customer outcome. If it doesn't create value for a UK tradesperson, it doesn't belong in the architecture.

---

## 2. Entity Mapping

| Trillet Concept | Whoza Concept | Customer-Facing Name | Purpose |
|----------------|---------------|---------------------|---------|
| **Agency Account** | Whoza Platform | whoza.ai | The master whoza account that owns all client infrastructure |
| **Sub-Account** | Client Instance | [Client Business Name] | One sub-account per trade business. Isolated data, dedicated phone number, branded experience. |
| **Agent** | Voice Agent | Katie or Mark | The AI voice persona that answers calls for a specific client. Gendered naming allows client preference. |
| **Knowledge Base** | Client Knowledge Profile | "Your Business Profile" | Scraped website + onboarding form + business rules that define what the agent knows and says. |
| **Crews (Multi-Agent)** | AI Team Workflow | "The Full AI Team" | Pro/Scale only. Coordinated handoffs between Katie/Mark (call capture), Claire (review follow-up), and Rex (analysis). |
| **Phone Number** | Client Number | "Your Whoza Number" | Trillet provisions the number. Whoza configures call forwarding from client's existing number. |
| **Call Logs / Transcripts** | Enquiry Records | "Your Call History" | Every answered call becomes an enquiry record with transcript, qualification data, and outcome. |
| **Minutes Usage** | Usage Dashboard | "Your Usage" | Real-time minute tracking with alerts at 80% and 100% of plan allowance. |
| **Meta/Facebook Lead** | Social Lead Capture | "Facebook Lead Response" | Pro/Scale only. AI responds to Facebook form submissions within 60 seconds. |
| **Webhook Events** | Platform Events | Internal | Trillet sends call.completed, lead.received, usage.threshold events to whoza backend. |

---

## 3. Plan Tier → Trillet Feature Mapping

| Whoza Plan | Trillet Features Enabled | Minute Allowance | Enquiry Cap | Price |
|-----------|------------------------|------------------|-------------|-------|
| **Starter (£59)** | Single agent, basic knowledge base, WhatsApp delivery, call transcripts | 100 mins | 0 included | £59/mo |
| **Growth (£125)** | Starter + Claire review engine, SMS backup delivery, monthly competitor snapshot (Rex basic) | 300 mins | 15 included | £125/mo |
| **Pro (£230)** | Growth + full Rex weekly reports, Meta/Facebook lead response, Crews multi-agent routing | 700 mins | 40 included | £230/mo |
| **Scale (£399)** | Pro + unlimited Crews workflows, advanced Rex (daily insights), multi-location sub-accounts, white-glove onboarding | 1,500 mins | 100 included | £399/mo |

**Trillet Agency Plan Cost:** $299/month (~£240) for unlimited sub-accounts + $0.09/min usage.

**Unit Economics Example (Growth Plan Client):**
- Whoza charges client: £125/month
- Trillet base cost (shared across all clients): ~£20/month per client at scale
- Trillet usage cost at 300 mins: 300 × $0.09 = $27 (~£21)
- **Gross margin per Growth client: ~£84/month (67%)**

---

## 4. Data Flow Architecture

### 4.1 Incoming Call Flow

```
Customer Calls Client's Number
        ↓
[Call Forwarding] → Trillet Phone Number
        ↓
[Trillet Voice AI] → Katie/Mark answers using Client Knowledge Profile
        ↓
[Trillet Transcription] → Real-time transcript generated
        ↓
[Trillet Webhook] → whoza backend receives: call.completed event
        ↓
[Whoza Enrichment] → Extract: postcode, job type, urgency, caller details
        ↓
[Supabase] → Enquiry record created (client_id, transcript, qualification_data)
        ↓
[WhatsApp API] → Summary sent to tradesperson's phone
        ↓
[Dashboard] → Enquiry appears in client dashboard with Accept/Decline actions
```

### 4.2 Review Request Flow (Claire — Growth+)

```
Tradesperson marks job "Complete" in dashboard (or WhatsApp reply)
        ↓
[Whoza Backend] → Triggers Claire review workflow
        ↓
[Delay: 24-48 hours] → Optimal timing for review request
        ↓
[WhatsApp API] → "Hi [Name], how did the [job type] go? We'd love a review..."
        ↓
[Customer replies with review / link] → Tracked in dashboard
        ↓
[Supabase] → Review record created with source attribution
        ↓
[Rex Analysis] → Review sentiment + keyword extraction for visibility insights
```

### 4.3 Competitor Analysis Flow (Rex — Growth+)

```
Weekly cron job (Monday 9am)
        ↓
[Whoza Backend] → Rex analysis triggered for all active clients
        ↓
[Google Places API] → Fetch competitor data for client's service area
        ↓
[SerpAPI / Custom Scraping] → Search visibility check for target keywords
        ↓
[Review Monitoring] → Track competitor review velocity and sentiment
        ↓
[AI Analysis] → GPT-4 generates actionable recommendations
        ↓
[Supabase] → Rex report stored (recommendations, competitor_scores, visibility_gap)
        ↓
[WhatsApp / Email] → Weekly report delivered to client
        ↓
[Dashboard] → Full report with charts and trend data available
```

### 4.4 Facebook Lead Flow (Pro/Scale Only)

```
Lead submits form on client's Facebook page
        ↓
[Meta Webhook] → Lead data received by whoza backend
        ↓
[Trillet API] → AI agent calls lead within 60 seconds
        ↓
[Trillet Voice AI] → Katie/Mark qualifies lead over phone
        ↓
[Same as call flow] → Enquiry record → WhatsApp summary → Dashboard
```

---

## 5. API / Webhook Mapping

### 5.1 Trillet → Whoza Webhooks (Inbound)

| Trillet Event | Whoza Handler | Action | Data Received |
|--------------|---------------|--------|---------------|
| `call.completed` | `api/trillet-webhook` | Create enquiry record | call_id, transcript, duration, recording_url, caller_number |
| `call.missed` | `api/trillet-webhook` | Create missed call alert | caller_number, timestamp, attempt_count |
| `lead.received` | `api/trillet-webhook` | Trigger AI call to lead | lead_data, form_id, source |
| `usage.threshold` | `api/trillet-webhook` | Send usage alert | client_id, minutes_used, minutes_remaining, percentage |
| `recording.available` | `api/trillet-webhook` | Attach recording to enquiry | recording_url, call_id, expiry |

### 5.2 Whoza → Trillet API Calls (Outbound)

| Whoza Action | Trillet API Endpoint | Purpose | When Called |
|-------------|---------------------|---------|-------------|
| Create client | `POST /sub-accounts` | Provision new sub-account | Client onboarding |
| Configure agent | `POST /agents` | Create Katie/Mark voice agent | After knowledge profile complete |
| Update knowledge | `PATCH /agents/{id}/knowledge` | Sync latest business rules | Profile updates, pricing changes |
| Get usage | `GET /usage` | Fetch minute consumption | Billing sync, daily |
| Provision number | `POST /phone-numbers` | Allocate UK number | Client setup |
| Configure webhook | `POST /webhooks` | Set whoza as event receiver | Sub-account creation |
| Trigger campaign | `POST /campaigns` | Start review request calls | Claire workflow activation |

### 5.3 Internal Whoza APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/rex` | POST | Generate competitor analysis report |
| `/api/enquiries` | GET/POST | List/create enquiry records |
| `/api/clients` | GET/POST/PATCH | Client CRUD operations |
| `/api/usage` | GET | Usage dashboard data |
| `/api/reviews` | GET/POST | Review tracking and requests |

---

## 6. Client Knowledge Profile → Trillet Knowledge Base

The Client Knowledge Profile (CKP) is whoza's structured onboarding output. It maps directly to Trillet's knowledge base fields.

### 6.1 CKP Sections → Trillet Knowledge Fields

| CKP Section | Trillet Knowledge Field | Example Value | Used By |
|------------|------------------------|---------------|---------|
| **Business Identity** | `business_name` | "Thompson Plumbing" | Katie/Mark greeting |
| | `trades` | ["Plumbing", "Heating", "Bathroom Fitting"] | Service qualification |
| | `town` | "Manchester" | Local reference |
| **Services** | `services_offered` | ["Leak repair", "Boiler install", "Emergency callout"] | Enquiry routing |
| | `services_not_offered` | ["Gas safety", "Electrical"] | Prevents wrong bookings |
| **Service Area** | `postcodes_covered` | ["M1", "M2", "M20", "SK1"] | Coverage check |
| | `towns_excluded` | ["Bolton"] | Boundary enforcement |
| **Hours** | `standard_hours` | "Mon-Fri 8am-6pm" | Availability response |
| | `emergency_hours` | "24/7 for existing customers" | Urgent call handling |
| | `after_hours_message` | "For emergencies, press 1..." | Out-of-hours routing |
| **Pricing** | `callout_fee` | "£60 within 5 miles" | Quote guidance |
| | `hourly_rate` | "£45/hour" | Estimate framing |
| | `min_charge` | "£80 minimum" | Prevents small job waste |
| | `emergency_premium` | "1.5x after 6pm" | Urgent pricing |
| **Booking Rules** | `booking_type` | "approval_required" | Workflow: direct vs confirm |
| | `response_time_target` | "30 minutes" | SLA commitment |
| **Qualification Questions** | `job_questions` | ["What's the address?", "Is it urgent?", "What type of property?"] | Katie/Mark asks these |
| **Escalation** | `escalation_phone` | "07700 900123" | Transfer target |
| | `escalation_conditions` | ["emergency", "existing_customer"] | When to transfer |
| **WhatsApp Format** | `summary_template` | "New enquiry: [job_type] at [postcode]. Urgency: [level]. Caller: [name] [number]." | Message format |
| **Review Rules** | `review_link` | "https://g.page/r/..." | Claire sends this |
| | `review_timing` | "48 hours after completion" | Delay setting |
| | `review_tone` | "friendly, professional" | Message style |
| **Rex Rules** | `competitors` | ["Smith Plumbing", "QuickFix Heating"] | Track these |
| | `target_keywords` | ["plumber Manchester", "emergency plumber"] | Visibility targets |
| | `target_towns` | ["Manchester", "Stockport", "Salford"] | Local SEO focus |

### 6.2 No-Website Onboarding Path

When a client has no website, the CKP is built from:
1. Structured onboarding form (15-20 questions)
2. Google Business Profile scrape (if exists)
3. Facebook page scrape (if exists)
4. Trade directory listings (Checkatrade, Yell, Bark, TrustATrader)
5. Client-supplied business rules (via WhatsApp or form)

This assembled CKP is then synced to Trillet as a **manual knowledge base** rather than scraped.

---

## 7. Onboarding Flow

### 7.1 Has Website (Fast Path — ~10 minutes)

```
Client signs up → Chooses plan
        ↓
Enters business URL → [Whoza scraper] extracts: services, hours, contact, areas
        ↓
Auto-generates CKP v1 → Client reviews via WhatsApp link
        ↓
Client confirms or edits (3-5 quick replies)
        ↓
CKP finalized → Synced to Trillet → Agent created
        ↓
Phone number provisioned → Call forwarding instructions sent
        ↓
Test call initiated → Katie answers with client's greeting
        ↓
Client receives test call summary → Approves or requests changes
        ↓
LIVE ✅
```

### 7.2 No Website (Guided Path — ~30 minutes)

```
Client signs up → Chooses plan
        ↓
Structured form: trade type, services, areas, hours, pricing, rules
        ↓
WhatsApp confirmation: "We just need 5 minutes to set up your AI agent"
        ↓
Agent calls client → Gathers missing details conversationally
        ↓
CKP assembled from form + conversation → Client reviews
        ↓
CKP finalized → Synced to Trillet → Agent created
        ↓
[Same as fast path] → Phone → Test → Live
```

---

## 8. Database Schema (Supabase)

### 8.1 Core Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `clients` | Master client records | id, business_name, trade_type, plan_tier, status, created_at |
| `client_profiles` | Full CKP JSON | client_id, knowledge_json, version, last_synced_at |
| `sub_accounts` | Trillet mapping | client_id, trillet_sub_account_id, phone_number, status |
| `agents` | Voice agent config | client_id, agent_name (Katie/Mark), voice_profile_id, trillet_agent_id |
| `enquiries` | Call/enquiry records | id, client_id, call_id, transcript, qualification_data, status, whatsapp_sent |
| `call_recordings` | Recording metadata | enquiry_id, recording_url, duration, retention_expiry |
| `usage_logs` | Minute tracking | client_id, date, minutes_used, minutes_remaining, plan_allowance |
| `review_requests` | Claire workflow | client_id, customer_phone, job_id, sent_at, status, review_received |
| `rex_reports` | Competitor analysis | client_id, report_date, recommendations_json, competitor_scores |
| `competitors` | Tracked competitors | client_id, competitor_name, business_type, last_analyzed |
| `invoices` | Billing records | client_id, period_start, period_end, amount, status |

### 8.2 Client Status Lifecycle

```
trial → active → suspended (non-payment) → cancelled
  ↓        ↓
paused (client request) → resumed
```

---

## 9. Security & Compliance Mapping

| Requirement | Trillet Provides | Whoza Layer | Customer Outcome |
|------------|-----------------|-------------|-----------------|
| GDPR | SOC 2 Type II, GDPR certified | UK data processing, consent flows, DPO | "Your data stays in the UK" |
| Call Recording | Recording capability | Disclosure at call start, 90-day retention, deletion on request | "You're always told it's recorded" |
| Data Isolation | Sub-account separation | Database-level client isolation, encryption | "Your competitors can't see your data" |
| Payment Security | — | Stripe PCI compliance, no card storage | "Your payment details are secure" |
| Uptime | 99.9% SLA | Monitoring, alerting, backup routing | "Your calls always get answered" |
| Ofcom/ICO | — | UK-specific disclosure language, TPS check | "We follow UK rules" |

---

## 10. Scaling Considerations

### 10.1 Sub-Account Limits
- Trillet Agency: **Unlimited** sub-accounts at $299/month
- Practical limit: 500-1,000 clients before enterprise negotiation
- At 500 clients: cost per client = £0.48/month base + usage

### 10.2 Minute Aggregation
- Trillet bills whoza at $0.09/min across ALL clients
- Whoza bills clients at tiered rates (effectively £0.07-£0.22/min)
- **Margin on usage: 60-85%**

### 10.3 Enterprise Threshold
- Trillet enterprise negotiation: 100,000+ mins/month
- At 200 mins/client average: ~500 clients
- Whoza at 500 clients: £62,500-£199,500/month revenue
- Trillet cost at 500 clients: $299 + (100,000 × $0.09) = $9,299/month (~£7,400)
- **Gross margin at scale: ~90% on usage, ~70% blended**

---

## 11. Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Trillet as voice provider | 4.7x cheaper than Synthflow, unlimited sub-accounts, native Meta integration | 2026-05-03 |
| Sub-account = 1 client | Isolation, per-client phone numbers, white-label dashboards | 2026-05-03 |
| Katie/Mark naming | Gender choice increases adoption; personal names beat "AI Assistant" | 2026-05-03 |
| CKP as master data | One source of truth for all agents; syncs to Trillet + powers Claire + Rex | 2026-05-03 |
| WhatsApp as primary delivery | Tradespeople don't want dashboards; they want messages on their phone | 2026-05-03 |
| Pro/Scale for advanced features | Crews multi-agent and Meta leads justify premium pricing; Starter/Growth fund acquisition | 2026-05-03 |

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **CKP** | Client Knowledge Profile — structured business data that powers all AI agents |
| **Crews** | Trillet's multi-agent orchestration feature (Pro/Scale only) |
| **Sub-Account** | Isolated client instance within Trillet's Agency plan |
| **Enquiry** | A qualified lead captured through an answered call |
| **Minute Allowance** | Monthly included call minutes per plan tier |
| **Overage** | Additional minutes charged beyond plan allowance |
| **White-Label** | Complete brand separation — clients see only whoza.ai branding |

---

*Document version: 1.0*
*Created: 2026-05-03*
*Owner: whoza.ai Agent Team*
*Source documents: Trillet Agency Plan Evaluation, Launch Vision Overview, Master Infrastructure Briefing*
