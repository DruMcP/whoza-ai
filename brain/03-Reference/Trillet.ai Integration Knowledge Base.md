---
created: 2026-05-07
updated: 2026-05-07
tags: [trillet, integration, knowledge-base, api, voice-agent, whatsapp, white-label, uk-compliance]
status: validated
source: "Trillet Public Docs + Discovery Call Response"
---

# Trillet.ai Integration Knowledge Base

> Comprehensive reference for the Whoza.ai → Trillet.ai technical integration. Consolidates public API documentation, discovery-call findings, and architectural decisions.

---

## 1. Access & Authentication

### Base URL
```
https://api.trillet.ai
```

### Headers
```json
{
  "x-api-key": "YOUR_API_KEY",
  "Content-Type": "application/json",
  "x-workspace-id": "WORKSPACE_ID"
}
```

### Public Documentation URLs
- API Reference: `https://docs.trillet.ai/v1/api-reference/introduction`
- Quickstart: `https://docs.trillet.ai/documentation/quickstart`
- Best Practices: `https://docs.trillet.ai/documentation/best-practices`
- Get KB: `https://docs.trillet.ai/v1/api-reference/endpoints/knowledge-base/get`
- Create Call Agent: `https://docs.trillet.ai/v1/api-reference/endpoints/agents/call/create`

---

## 2. Core Capabilities Validated

### 2.1 Per-Client Custom Knowledge Bases
- Every agent can attach its own knowledge base
- Website useful but **not required** — supports "No website? No problem" onboarding
- KB sources: service descriptions, FAQs, pricing, intake notes, scripts, manual business info

### 2.2 Role-Specific Agent Architecture
Agents in a workspace are independent. Each can have:
- Own knowledge base
- Own prompt
- Own voice
- Own tools
- Own triggers

**Whoza mapping:**
```
Katie / Mark = call capture + enquiry qualification
Claire       = review request + reputation workflow
Rex          = competitor analysis + AI visibility recommendations
```

### 2.3 Cross-Agent Handoff
- Native cross-agent transfer / handoff supported
- Multi-agent coordinated workflows where customer journeys move between agents
- "Crews" feature included on Agency plan

### 2.4 Continuous Knowledge Updates
- KBs can be updated post-onboarding via dashboard or API
- Supports continuous improvement from:
  - accepted/rejected enquiries
  - updated services, areas, pricing, FAQs
- No full re-onboarding required

### 2.5 WhatsApp Enquiry Cards
- WhatsApp interactive templates support quick-reply or CTA buttons
- Meta posts button payload to webhook on tap
- Trillet routes Accept / Decline into workflow
- **No pre-built Whoza template included** — must be configured per partner
- Meta approval normally required
- Trillet estimates ~0.5 days per partner for template + routing config

### 2.6 Messaging Costs (Corrected)
| Channel | Rate |
|---------|------|
| Voice | **$0.12/min** standard agency rate |
| SMS | $0.02/msg |
| AI chat | $0.015/msg |
| Email | Via webhook to Whoza's own ESP |

> **Important:** Previous $0.09/min assumption is wrong. Volume rates start above 30,000 min/month.

### 2.7 Claire Review Workflows
- Supported via Trillet Workflows
- Pattern: post-call webhook → outbound review request → reminder retry → positive → public review prompt / negative → private feedback
- ~1–2 hours per client to tune from reference workflow
- Trillet can provide partner-grade reusable template

### 2.8 Meta / Facebook Lead Response
- Outbound call from Meta Lead Ads = native
- Sub-30 second response = default/configurable
- Parallel WhatsApp from same Meta lead webhook = native
- Pre-call SMS = possible via webhook fan-out

**Positioning:** "Instant Facebook and Instagram lead response" — Pro/Scale feature.

### 2.9 Multi-Agent Workflows / "Crews"
**Agency Plan:** $299 USD/month
- Unlimited sub-accounts
- Unlimited agents per sub-account
- Native cross-agent transfer
- No per-agent licence fee
- Minutes metered at account level

### 2.10 White-Label Capabilities
- Custom dashboard domain
- Whoza branding through login, dashboard, reporting
- Emails from Whoza domain
- Branded SMS sender via A2P 10DLC
- Trillet branding removed from sub-account users
- Stripe-integrated invoicing for downstream clients

---

## 3. UK Readiness

### UK Numbers
- Supported via Twilio and Telnyx
- Geographic, non-geographic, freephone available
- Number porting: standard carrier process, 5–10 business days

### UK English Voices
- Via ElevenLabs: British English, RP, regional voices

### Call Recording Consent
- Trillet provides recording infrastructure
- Whoza must configure disclosure script
- **Safe wording:** "This call may be recorded and handled by an AI assistant to help us manage your enquiry."

### Ofcom
- Not directly applicable to Trillet as software platform
- Twilio/Telnyx sit in regulated UK telephony chain

### UK GDPR & Data Residency
- ISO 27001 programme running
- SOC 2 Type II target: Aug–Oct 2026
- HIPAA add-on signed
- UK-flavoured DPA available
- SCCs + UK IDTA cover UK-to-US data flows under default residency
- **Default residency:** AWS US (us-east-1)
- **UK/EU residency:** AWS London (eu-west-2) — enterprise only, weeks lead time

### UK Compliance Gaps
1. **TPS / CTPS suppression:** Not native. Whoza/customer remains responsible for compliant outbound lead sources. Trillet can integrate suppression API (e.g. TPS Online) per-customer.
2. **ICO registration:** Still being scoped with compliance partner. **Do NOT claim "ICO-certified" or "fully UK telecom compliant.**

**Safe language:** "Built on GDPR-aware infrastructure with configurable call disclosure and partner-supported compliance workflows."

---

## 4. Whoza → Trillet Knowledge Architecture

### Core Principle
**Trillet is NOT the sole source of truth.**

Whoza maintains the master **Client Knowledge Profile** in Supabase, then pushes/syncs relevant sections into Trillet knowledge bases.

```
Client
↓
Whoza Client Knowledge Profile (Supabase)
↓
Trillet workspace / sub-account
↓
Katie/Mark capture agent
↓
Claire review agent
↓
Rex visibility agent
```

### Katie / Mark Knowledge Base Should Know
- business identity
- services offered / not offered
- service area
- opening hours
- emergency rules
- pricing guidance
- qualification questions
- escalation rules
- booking rules
- WhatsApp delivery format

**Safe fallback:** "I'll pass this to the team so they can confirm."

### Claire Knowledge Base Should Know
- review link
- tone preference
- job completion trigger rules
- review request wording
- reminder sequence
- positive/negative response routing
- customer follow-up rules

### Rex Knowledge Base Should Know
- service areas
- target services
- competitor list
- Google Business Profile details
- review count
- AI visibility checks
- weekly recommendation history
- action backlog
- monthly competitor analysis outputs

---

## 5. Key API Endpoints

### Create Knowledge Base
```http
POST https://api.trillet.ai/v1/api/knowledgebase
```

### Get Knowledge Base
```http
GET https://api.trillet.ai/v1/api/knowledgebase/{id}
```

### Create Call Agent
```http
POST https://api.trillet.ai/v1/api/agents
```
Fields: `name`, `ttsModel`, `llmModel`, `settings.variables`, `phoneNumberIds`, `smartCallback`, `maxAttemptsForSmartCallback`

### Webhook Events
```
call.started
call.completed
call.failed
sms.sent
sms.delivered
agent.created
agent.updated
flow.created
flow.updated
```

---

## 6. n8n Workflow Architecture

### 6.1 Client Onboarding → Trillet KB
```
Form submitted → Create client in Supabase → Generate Client Knowledge Profile
→ Create Trillet KB → Add content → Create Katie/Mark agent
→ Attach voice + prompt + tools → Send test call → Log result
```

### 6.2 Knowledge Update
```
Client feedback → Classify update type → Update Supabase CKP
→ Update Trillet KB → Write audit log → Notify support if approval required
```

### 6.3 WhatsApp Accept / Decline
```
Call completed → Enquiry summary → WhatsApp interactive template
→ Client taps Accept/Decline → Webhook receives payload
→ Update enquiry status → Dashboard updated → If accepted, trigger next step
```

### 6.4 Claire Review
```
Job completed / marked complete → Claire sends review request
→ Reminder sequence → Positive → public review link / Negative → private channel
→ Dashboard updated
```

### 6.5 Rex Weekly
```
Weekly schedule → Pull client profile + competitor targets
→ Run visibility checks → Generate action card → Send weekly insight
→ Log action history
```

---

## 7. Required Supabase Tables

| Table | Purpose |
|-------|---------|
| `clients` | Core client records |
| `client_knowledge_profiles` | Master knowledge source of truth |
| `trillet_workspaces` | Workspace + sub-account mapping |
| `trillet_knowledge_bases` | KB ID per agent role, sync status |
| `trillet_agents` | Agent ID, voice, prompt version |
| `enquiry_events` | Call → enquiry → accept/decline log |
| `review_events` | Review request → status tracking |
| `rex_actions` | Weekly action items + completion |

---

## 8. No-Website Onboarding Flow

```
Client completes onboarding form
→ Whoza collects trade, services, area, pricing, FAQs
→ Optionally collects GBP / Facebook / listings
→ Client Knowledge Profile generated
→ Client approves profile
→ Profile pushed to Trillet KB
→ Katie/Mark test call
→ Client approves go-live
```

**Website should say:** "No website? No problem. We build your AI call profile during onboarding."

---

## 9. Continuous Learning Loop

After each enquiry, ask client:
```
Was this a good enquiry?
✅ Good  ❌ Not suitable
```

If rejected, ask why:
- Out of area
- Too small
- Wrong service
- No availability
- Price shopper
- Other

Then update:
- Client Knowledge Profile
- Katie/Mark qualification rules
- Rex visibility assumptions
- Service-area logic
- Minimum job value
- Preferred enquiry rules

Sync updates to Trillet KB via API.

---

## 10. Key Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| $0.12/min pricing correction | Margin pressure | Update all pricing models immediately |
| WhatsApp job cards need Meta approval | Launch delay | Treat as launch-critical config item, start early |
| TPS/CTPS not native | Compliance gap | Use suppression API where needed, safe marketing language |
| ICO registration pending | Cannot claim certification | Avoid certified language, use "GDPR-aware" |
| US data residency default | Regulated verticals concern | Start with trades; scope healthcare/finance separately |

---

## 11. Follow-Up Required from Trillet

1. Sandbox workspace + API key
2. Example workspace ID + KB ID
3. Create/Update KB request body examples
4. Agent creation with KB attached — example
5. WhatsApp interactive template example
6. Accept/Decline webhook payload example
7. Claire review workflow template
8. Meta lead → call + WhatsApp template
9. Cross-agent handoff example
10. White-label dashboard setup guide
11. DPA / SCC / UK IDTA documents
12. Billing / Stripe integration details
13. Volume pricing thresholds
14. ICO + TPS status update

---

## 12. Final Architecture Principle

```
Whoza Supabase Client Knowledge Profile  ←  SOURCE OF TRUTH
                ↓
Whoza onboarding + approval workflow
                ↓
Trillet KBs + agents  ←  VOICE / MSG / WORKFLOW LAYER
                ↓
Trillet execution (calls, messages, workflows)
                ↓
Whoza dashboard, Rex, Claire, analytics, billing  ←  CUSTOMER FACING OS
```

**Whoza owns the intelligence. Trillet powers the pipes.**

---

## Related Brain Notes
- [[Research — Trillet Deep Dive]] — Initial evaluation
- [[Decision — Trillet as Voice Provider]] — Why we chose Trillet
- [[TRILLET_DESIGN_AND_COSTING.md]] — Commercial model
- [[TRILLET_PnL_MODEL.md]] — Unit economics
- [[Whoza Master Infrastructure Briefing]] — Full infrastructure context
- [[AGENT_TEAM_ARCHITECTURE.md]] — Katie, Mark, Claire, Rex roles
