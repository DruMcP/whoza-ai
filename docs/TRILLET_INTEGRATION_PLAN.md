# Trillet Integration Plan for whoza.ai

**Research Date:** May 2, 2026
**Platform:** Trillet AI (https://trillet.ai)
**Status:** Ready for evaluation

---

## What Trillet Is

Trillet AI is a **white-label voice AI platform** purpose-built for agencies. It provides:
- AI-powered voice agents that answer calls 24/7
- Messaging agents (SMS, WhatsApp)
- REST API + Web SDK for integration
- Built-in compliance (HIPAA, GDPR, TCPA)
- Website scraping for instant agent knowledge
- Calendar integration (Google, Outlook, Calendly)
- CRM integrations (GoHighLevel, HubSpot, Salesforce)

**Architecture:** Native platform (not a wrapper like VoiceAIWrapper/Vapify)

---

## Integration Requirements

### 1. API Access

**Base URL:** `https://api.trillet.ai/v1` (assumed — docs reference REST API)

**Authentication:** API Key (Bearer token)
- Sign up at: `app.trillet.ai`
- Generate API key from dashboard
- Pass as header: `Authorization: Bearer {api_key}`

**Required Headers:**
```
Content-Type: application/json
Authorization: Bearer <your-api-key>
```

### 2. Core API Endpoints

Based on Trillet docs, these are the key APIs:

| API | Purpose | Use for whoza.ai |
|-----|---------|------------------|
| **Call Agents API** | Create/manage voice agents | Build "Katie" agent |
| **Omni Flow Agents API** | Create messaging agents | Build WhatsApp/SMS agents |
| **Call Flows API** | Design conversation flows | Configure call handling |
| **Voice Calls API** | Initiate/manage calls | Outbound callbacks |
| **Conversations API** | Manage interactions | Unified conversation view |

### 3. Web SDK for Frontend

**Package:** `@trillet-ai/web-sdk` (npm)

**Use case:** Embed "Talk to Katie" voice widget on whoza.ai website

**Installation:**
```bash
npm install @trillet-ai/web-sdk
```

**Basic Implementation:**
```typescript
import { TrilletAgent } from '@trillet-ai/web-sdk';

const agent = new TrilletAgent({
  workspaceId: 'your-workspace-id',
  agentId: 'your-agent-id',
  mode: 'voice',
});

// Start call (no API key needed for public calls)
await agent.startPublicCall();
```

**SDK Requirements:**
- Modern browser with WebRTC support
- HTTPS or localhost (secure context)
- Microphone permission
- React/Next.js compatible

### 4. Webhook Integration

**Incoming Webhooks:** Trillet can POST to your endpoint when:
- Call starts/ends
- Appointment booked
- Lead captured
- Voicemail left

**Outgoing Webhooks:** Your app can trigger Trillet via:
- REST API calls
- Make.com integration
- n8n integration

**Webhook Payload Format:**
```json
{
  "variables": {
    "customer_name": "John Doe",
    "order_status": "shipped"
  }
}
```

---

## Pricing Structure

### For Agencies (White-Label)

| Plan | Monthly | Sub-accounts | Per-minute |
|------|---------|--------------|------------|
| **Studio** | $99/mo | Up to 3 | $0.09/min |
| **Agency** | $299/mo | Unlimited | $0.09/min |

### For Small Business (Direct)

| Plan | Monthly | Included | Per-minute |
|------|---------|----------|------------|
| **Receptionist** | $49/mo | 150 min | $0.09/min after |

### Cost Calculation Example

**Scenario:** Agency with 10 clients, 1,000 min/client/month
- Platform fee: $299/month
- Usage: 10,000 min × $0.09 = $900/month
- **Total cost: ~$1,200/month**

**Revenue potential:** Charge clients £297-997/month
- At £500/client × 10 = £5,000/month revenue
- **Gross margin: ~75-80%**

---

## Onboarding Process

### Phase 1: Discovery (30-45 min)
Gather from client:
- Primary use case (receptionist, lead qual, booking)
- Business hours
- Common caller questions
- Calendar/CRM systems
- Call volume estimates
- Compliance needs

### Phase 2: Configuration (15-30 min)
1. **Website scraping:** Paste client URL → auto-generates knowledge
2. **FAQ customization:** Add specific Q&A
3. **Calendar integration:** Connect Google/Outlook/Calendly
4. **Call routing:** Set transfer numbers, voicemail, escalation
5. **Branding:** Apply white-label (domain, logo, colors)

### Phase 3: Testing (1-2 hours)
- Basic inquiry test
- Appointment booking test
- Edge case test
- Call transfer test
- After-hours test
- Multi-channel test (SMS/WhatsApp)

### Phase 4: Training + Handoff (30 min)
- Record training videos (Loom)
- Provide documentation
- Schedule follow-up check-ins

**Total setup time:** 3-5 hours of agency time across 48-72 hours

---

## How whoza.ai Can Integrate

### Option A: White-Label Reseller (Recommended)

whoza.ai becomes a Trillet agency partner:

1. **Sign up for Trillet Agency plan** ($299/mo)
2. **Create sub-accounts** for each client
3. **Configure agents** using Trillet dashboard
4. **White-label** with whoza.ai branding
5. **Bill clients** at your markup (£297-997/mo)

**Integration points:**
- whoza.ai landing page → Trillet sub-account creation
- whoza.ai dashboard → Trillet API for call data
- whoza.ai CRM → Trillet webhook for lead sync

### Option B: API Integration (Custom)

Build custom integration using Trillet REST API:

**Required endpoints:**
```
POST /v1/call-agents          # Create Katie agent
POST /v1/call-flows            # Define conversation flow
POST /v1/voice-calls           # Initiate outbound calls
GET  /v1/conversations         # Fetch call history
POST /v1/webhooks              # Configure webhooks
```

**Authentication:**
```typescript
const headers = {
  'Authorization': `Bearer ${TRILLET_API_KEY}`,
  'Content-Type': 'application/json'
};
```

**Webhook handler in whoza.ai:**
```typescript
// app/api/trillet-webhook/route.ts
export async function POST(req: Request) {
  const payload = await req.json();
  
  // Handle events:
  // - call.completed → Update dashboard
  // - appointment.booked → Send to client WhatsApp
  // - lead.captured → Add to Supabase
  
  return Response.json({ received: true });
}
```

---

## Technical Implementation Plan

### Step 1: Sign up + API keys
- Register at `app.trillet.ai`
- Choose Agency plan ($299/mo)
- Generate API key
- Configure webhook URL: `https://whoza.ai/api/trillet-webhook`

### Step 2: Create "Katie" agent
```bash
curl -X POST https://api.trillet.ai/v1/call-agents \
  -H "Authorization: Bearer $TRILLET_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Katie - whoza.ai Receptionist",
    "voice": "en-GB-female-1",
    "language": "en-GB",
    "knowledge_base": "https://whoza.ai",
    "greeting": "Hello, youve reached whoza.ai. How can I help?",
    "capabilities": ["appointment_booking", "lead_capture", "faq"]
  }'
```

### Step 3: Install Web SDK on whoza.ai
```bash
npm install @trillet-ai/web-sdk
```

Add to hero component:
```tsx
import { TrilletAgent } from '@trillet-ai/web-sdk';

// "Talk to Katie" button
const agent = new TrilletAgent({
  workspaceId: 'whoza-workspace',
  agentId: 'katie-agent-id',
  mode: 'voice'
});

await agent.startPublicCall();
```

### Step 4: Webhook handler
Create `app/api/trillet-webhook/route.ts`:
- Receive call events
- Update Supabase database
- Send WhatsApp notifications to clients
- Update dashboard metrics

### Step 5: Dashboard integration
- Fetch call data from Trillet API
- Display in whoza.ai client dashboard
- Show metrics: calls answered, jobs booked, revenue

---

## Compliance & Security

**Trillet includes:**
- ✅ HIPAA compliance (healthcare)
- ✅ GDPR compliance (EU clients)
- ✅ TCPA compliance (US outbound)
- ✅ SOC 2 certification
- ✅ Call recording with consent
- ✅ Encryption in transit + at rest

**whoza.ai requirements:**
- Privacy policy update (call recording disclosure)
- Terms of service (AI agent usage)
- Data processing agreement (if needed)
- Client consent flow for call recording

---

## Comparison: Trillet vs whoza.ai Current Setup

| Feature | whoza.ai (current) | Trillet |
|---------|-------------------|---------|
| Voice AI | Partner fulfillment | Native (built-in) |
| Control | Limited | Full API control |
| Branding | Partial | Full white-label |
| Setup time | Unknown | 30 min per client |
| Cost structure | Unknown | $0.09/min + $299/mo |
| Compliance | Unknown | HIPAA/GDPR/TCPA |
| SDK | None | React/Next.js SDK |
| Webhooks | None | Built-in |

---

## Recommended Next Steps

1. **Sign up for Trillet free trial** (Studio plan, $99/mo)
2. **Create test agent** for whoza.ai
3. **Install Web SDK** on staging site
4. **Test voice widget** on landing page
5. **Configure webhook** endpoint
6. **Build client onboarding flow**
7. **Migrate from partner** to Trillet (if beneficial)

---

## Resources

- **Trillet Docs:** https://docs.trillet.ai
- **API Reference:** https://docs.trillet.ai/api-reference
- **Web SDK:** https://www.npmjs.com/package/@trillet-ai/web-sdk
- **GitHub SDK:** https://github.com/comms-channel/trillet-sdk
- **Pricing:** https://trillet.ai/pricing
- **Agency Resources:** Skool community (included with plan)

---

## Contact

- **Trillet Support:** Via dashboard or docs.trillet.ai
- **Agency Partnerships:** Via Skool community
- **Sales:** https://trillet.ai

---

**Summary:** Trillet provides a complete white-label voice AI platform with REST API, Web SDK, and built-in compliance. whoza.ai can integrate as an agency partner ($299/mo) with full API control, or build a custom integration. The platform is purpose-built for reselling — no engineering team required.
