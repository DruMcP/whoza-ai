# whoza.ai Client Onboarding Process
## whoza.ai as White-Label Portal for Trillet
**Date:** 2026-04-28  
**Status:** Process Definition — Ready for Build

---

## 1. Overview

**Architecture:** whoza.ai owns the client-facing portal. Trillet runs the voice engine underneath. Clients never see Trillet branding.

**Flow:**
```
[Client visits whoza.ai] → [Selects plan → Stripe payment] → [Auto-provisioned on Trillet] → [Gets whoza.ai dashboard] → [Sets up divert] → [Live in 10 minutes]
```

**Key principle:** Everything the client touches is branded whoza.ai. Trillet is purely the infrastructure layer.

---

## 2. Step-by-Step Onboarding Flow

### Step 1: Discovery & Signup (whoza.ai Website)

**What happens:**
1. Client visits `whoza.ai/pricing`
2. Selects plan (Solo £69 / Business £129 / Professional £219 / Enterprise £499)
3. Clicks "Get Started" → Stripe Checkout
4. Enters: business name, phone number, trade type, postcode
5. Stripe processes payment
6. whoza.ai backend triggers Trillet API

**What client sees:**
- whoza.ai branded checkout
- Simple form: "Tell us about your business"
- Credit card entry (Stripe)
- Instant confirmation: "Welcome to whoza.ai — your AI is being configured"

**Time elapsed:** 2 minutes

---

### Step 2: Trillet Sub-Account Auto-Provisioning (Backend)

**What happens (whoza.ai → Trillet API):**
```
POST https://api.trillet.ai/v1/accounts
Headers: Authorization: Bearer {whoos_ai_master_api_key}
Body: {
  "name": "ABC Plumbing - whoza.ai",
  "plan": "sub-account",
  "region": "UK",
  "parent_account_id": "whoza_ai_master"
}
```

**Trillet response:**
```
{
  "account_id": "sub_abc123",
  "api_key": "trillet_sk_subabc123",
  "status": "active"
}
```

**whoza.ai stores:**
- `stripe_customer_id`
- `trillet_account_id`
- `trillet_api_key` (encrypted)
- `onboarding_status`: `provisioned`

**Time elapsed:** 5–10 seconds

---

### Step 3: UK Phone Number Assignment

**What happens:**
```
POST https://api.trillet.ai/v1/phone-numbers
Headers: Authorization: Bearer {trillet_sk_subabc123}
Body: {
  "country": "GB",
  "type": "local",
  "area_code": "preferred"  // or auto-assign 0333
}
```

**Trillet assigns:** `0333 123 4567`

**whoza.ai stores:** `trillet_phone_number: +443331234567`

**Time elapsed:** 2–3 seconds

---

### Step 4: AI Agent Configuration (Auto + Customization)

**Auto-configuration:**
1. whoza.ai fetches client website (if provided) or asks for URL
2. Trillet auto-scrapes: services, hours, FAQs, pricing
3. whoza.ai applies trade-specific template:
   - Plumber: emergency triage, leak severity, shutoff valve
   - Electrician: safety questions, quote process, booking
   - Builder: project type, timeline, estimate request
   - etc.

**Client customization screen (whoza.ai dashboard):**
```
Your AI Agent is Ready!

□ Business name greeting: "Thanks for calling ABC Plumbing..."
□ Services: [Plumbing] [Drainage] [Bathroom Install] [Emergency]
□ Hours: Mon-Fri 8am-6pm, Sat 9am-2pm
□ Emergency policy: Transfer to [YOUR MOBILE] for flooding/gas
□ Custom FAQ: Add your specific questions
□ Voice: Male/Female, accent: [British English]

[Save & Activate] [Preview Call]
```

**Behind the scenes:**
```
POST https://api.trillet.ai/v1/agents
Body: {
  "name": "ABC Plumbing AI",
  "voice": "en-GB-male",
  "knowledge_base": [scraped_data + trade_template],
  "actions": ["book_appointment", "take_message", "transfer_emergency"],
  "phone_number": "+443331234567"
}
```

**Time elapsed:** 3–5 minutes

---

### Step 5: Call Divert Setup (Client Action)

**whoza.ai sends:**
- Welcome email (whoza.ai branded)
- SMS to client mobile
- PDF: "Activate Your AI in 30 Seconds"

**Divert instructions per carrier:**

| Carrier | Divert Code | Check Code | Cancel Code |
|---------|-------------|------------|-------------|
| **EE** | `**21*03331234567#` | `*#21#` | `##21#` |
| **O2** | `**21*03331234567#` | `*#21#` | `##21#` |
| **Three** | `**21*03331234567#` | `*#21#` | `##21#` |
| **Vodafone** | `**21*03331234567#` | `*#21#` | `##21#` |
| **BT Mobile** | `**21*03331234567#` | `*#21#` | `##21#` |
| **Sky Mobile** | `**21*03331234567#` | `*#21#` | `##21#` |
| **Plusnet** | `**21*03331234567#` | `*#21#` | `##21#` |
| **BT Landline** | `*21*03331234567#` | `*#21#` | `#21#` |
| **Virgin Media** | `*70*03331234567#` | — | `#70#` |

**⚠️ Blocked carriers (no divert):**
- Tesco Mobile, Lyca Mobile, Lebara, Voxi, Virgin Mobile, SMARTY
- **Fallback:** Number porting (10–15 days) or recommend switching carrier

**Client action:**
1. Opens PDF/SMS on phone
2. Copies divert code
3. Dials code, presses call
4. Gets confirmation: "Call divert activated"
5. Clicks "I've activated divert" in whoza.ai dashboard

**Time elapsed:** 1–2 minutes

---

### Step 6: Test Call & Go-Live

**whoza.ai triggers test:**
1. Auto-calls client's existing number from whoza.ai test line
2. Should be diverted to Trillet AI number
3. AI answers with configured greeting
4. System records: call connected, duration, transcript

**Dashboard shows:**
```
🎉 Your AI Agent is LIVE!

Test call result: ✅ Connected (12 seconds)
AI answered: "Thanks for calling ABC Plumbing..."
Transcript: [Link]

Status: ACTIVE
Next call: Your real customers will reach the AI
```

**If test fails:**
- whoza.ai dashboard shows: "❌ Divert not detected"
- Offers troubleshooting:
  - "Did you press call after the code?"
  - "Try canceling (##21#) and re-activating"
  - "Check with *#21# that it's active"
  - "Contact support" button

**Time elapsed:** 1 minute

---

### Step 7: CRM/Calendar Integration (Optional)

**whoza.ai dashboard prompts:**
```
Connect Your Tools (Optional — Skip for now?)

□ Google Calendar → AI can book appointments
□ Microsoft Outlook → AI can book appointments
□ GoHighLevel → Leads sync automatically
□ HubSpot → Contacts sync automatically

[Connect] [Skip — I'll do this later]
```

**Behind the scenes:** OAuth flow to Trillet's native integrations.

**Time elapsed:** 2–3 minutes (or skipped)

---

### Step 8: Complete — Client Dashboard Active

**Client sees whoza.ai dashboard (white-labeled Trillet):**
```
whoza.ai Dashboard — ABC Plumbing

📞 0333 123 4567 (your AI number)
📊 This month: 0 calls | 0 bookings | £0 overage

Recent Calls:
[No calls yet — your AI is ready!]

Quick Actions:
[Customize AI] [View Call Recordings] [Change Hours]
[Upgrade Plan] [Support]
```

**Total onboarding time:** 10–15 minutes end-to-end

---

## 3. what whoza.ai Builds vs. What Trillet Provides

### whoza.ai Must Build:

| Component | Tech Stack | Effort |
|-----------|-----------|--------|
| Public marketing site | Astro/Next.js + Tailwind | 2–3 days |
| Stripe subscription billing | Stripe API + webhooks | 2–3 days |
| Client signup flow | React form → Trillet API | 3–4 days |
| whoza.ai dashboard (white-label wrapper) | React + Trillet API proxy | 5–7 days |
| Call divert instructions generator | PDF gen + SMS API | 1–2 days |
| Test call system | Twilio/Trillet API | 1–2 days |
| CRM/calendar OAuth connectors | OAuth + Trillet API | 3–4 days |
| Trade-specific AI templates | JSON templates + prompts | 2–3 days |
| Support ticket system | Intercom/Help Scout | 1 day |

**Total build time:** 3–4 weeks for MVP

### Trillet Provides (No Build Needed):

| Component | Status |
|-----------|--------|
| AI voice engine | ✅ API |
| LLM brain | ✅ Managed |
| Telephony (inbound/outbound) | ✅ API |
| UK number provisioning | ✅ API |
| Call recordings | ✅ API |
| Transcripts | ✅ API |
| CRM integrations | ✅ Native (GHL, HubSpot, Salesforce) |
| Calendar booking | ✅ Native (Google, Outlook, Calendly) |
| SMS/WhatsApp | ✅ API |
| Call analytics | ✅ API |
| White-label domain support | ✅ Agency plan feature |

---

## 4. The whoza.ai Dashboard Architecture

```
[Client Browser]
    |
    | HTTPS (custom domain: dashboard.whoza.ai)
    v
[whoza.ai Dashboard App]
    ├── Auth: whoza.ai accounts
    ├── Billing: Stripe subscriptions
    ├── Trillet API Proxy: routes calls to Trillet sub-account
    └── UI: White-labeled Trillet features
    |
    | API calls
    v
[Trillet API]
    ├── Sub-account: sub_abc123
    ├── Phone: +443331234567
    ├── Agent: ABC Plumbing AI
    └── Data: calls, recordings, transcripts
```

**Important:** whoza.ai never exposes Trillet URLs or branding. All API responses are proxied through whoza.ai backend and re-skinned.

---

## 5. Edge Cases & Handling

### Client is on blocked carrier (Tesco/Lyca/Lebara/Voxi/Virgin Mobile)

**Detection:** whoza.ai asks for carrier during signup.

**Flow:**
1. If blocked: "Your carrier doesn't support call divert. You have 2 options:"
   - Option A: "Port your number to EE/O2/Three (free, takes 1–2 days)"
   - Option B: "Use a new whoza.ai number for marketing while keeping your main line for existing customers"
2. Show guide for number porting with PAC code
3. Offer temporary solution: "We'll give you a whoza.ai number to put on your new flyers. When you're ready to port, we'll switch it over."

### Client has landline

**Flow:**
1. Detect landline from phone number format
2. Show landline divert codes (BT: `*21*...#`)
3. Note: "If your landline is with a bundled broadband provider, divert may need enabling in your online account"
4. Offer fallback: "We can arrange number porting to a VoIP provider that supports divert"

### Client wants to keep existing number but can't divert

**Alternative model:**
1. whoza.ai provisions a new 0333 number
2. Client updates Google Business Profile, website, flyers with new number
3. Old number stays active for a transition period
4. Full switchover once comfortable

### Client has multiple locations/numbers

**Flow:**
1. During signup: "How many business locations do you have?"
2. Provisions multiple Trillet sub-accounts (or one account with multiple numbers)
3. Each location gets its own AI agent with local knowledge
4. Parent dashboard shows all locations

---

## 6. Client Communication Templates

### Welcome Email (Sent immediately after payment)

```
Subject: Your whoza.ai AI Agent is Ready — Activate in 30 Seconds

Hi [First Name],

Welcome to whoza.ai! Your AI phone agent is configured and waiting.

Your AI number: 0333 123 4567
Your plan: [Business £129/mo]

👉 ACTIVATE NOW (takes 30 seconds):
1. On your mobile, dial: **21*03331234567# then press call
2. Wait for confirmation: "Call divert activated"
3. Click here to confirm: [whoza.ai/dashboard/confirm]

That's it. All your calls now go to your AI.

Need help? Reply to this email or call us on 0800 XXX XXXX.

The whoza.ai Team
```

### SMS (Sent 2 minutes after signup)

```
whoza.ai: Your AI is ready! Dial **21*03331234567# then press call to activate divert. Takes 30 seconds. Questions? Reply HELP.
```

### Test Success Notification

```
🎉 Your AI is LIVE!

We just tested your line. Your AI answered perfectly.

Next call from a customer will be handled automatically.

View your dashboard: [whoza.ai/dashboard]
```

---

## 7. Internal whoza.ai Admin View

### New Client Alert (Slack/Discord)

```
🆕 New whoza.ai Client

Name: ABC Plumbing
Plan: Business (£129/mo)
Trade: Plumbing
Location: Birmingham
Trillet Account: sub_abc123
AI Number: 0333 123 4567
Status: Awaiting divert activation
Stripe: cus_abc123 (payment confirmed)
```

### Daily Onboarding Dashboard

| Client | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Status |
|--------|--------|--------|--------|--------|--------|--------|
| ABC Plumbing | ✅ | ✅ | ✅ | ✅ | ⏳ | Awaiting divert |
| Smith Electrical | ✅ | ✅ | ✅ | ✅ | ✅ | **LIVE** |
| Jones Builders | ✅ | ✅ | ✅ | ⏳ | — | Customizing agent |

---

## 8. Time-to-Live Benchmarks

| Step | Target Time | Max Acceptable |
|------|-------------|----------------|
| Signup to payment | 2 min | 5 min |
| Payment to Trillet provision | 10 sec | 30 sec |
| Number assignment | 3 sec | 10 sec |
| Agent configuration | 5 min | 15 min |
| Divert activation (client) | 1 min | 5 min |
| Test call | 1 min | 3 min |
| **Total: Signup to LIVE** | **10 min** | **30 min** |

**Commitment to client:** "Your AI agent will be live within 15 minutes of signup."

---

## 9. Key Integrations to Build

### Trillet API Endpoints whoza.ai Needs:

| Endpoint | Purpose | Frequency |
|----------|---------|-----------|
| `POST /accounts` | Create sub-account | Per signup |
| `POST /phone-numbers` | Provision UK number | Per signup |
| `POST /agents` | Configure AI agent | Per signup + edits |
| `GET /calls` | Fetch call logs | Dashboard load |
| `GET /calls/{id}/recording` | Get call audio | On demand |
| `GET /calls/{id}/transcript` | Get transcript | On demand |
| `GET /analytics` | Usage stats | Dashboard + billing |
| `POST /calls/test` | Initiate test call | Onboarding step |

### Stripe Integration:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Trigger Trillet provisioning |
| `invoice.paid` | Activate/renew service |
| `invoice.payment_failed` | Grace period + notification |
| `subscription.canceled` | Suspend Trillet sub-account |

---

## 10. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Signup → LIVE conversion | >85% | % of paid signups that complete divert |
| Time to LIVE | <15 min | Median time from payment to test success |
| Divert failure rate | <10% | % of clients who can't activate divert |
| First call within 24h | >60% | % of new clients who get a real call in first day |
| Support tickets per onboarding | <0.3 | Avg tickets per new client |

---

**Process definition complete. whoza.ai as Trillet white-label portal: 10-minute client onboarding, fully branded, zero technical knowledge required.**
