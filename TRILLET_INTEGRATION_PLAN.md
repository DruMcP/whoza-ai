# Trillet.ai Integration Plan — whoza.ai

## Status: Pre-Trial Prep (May 14, 2026)
Trial window: May 23–29, 2026

## Objective
Flip Trillet integration from MOCK → LIVE in under 30 minutes when trial credentials arrive.

---

## Pre-Trial Checklist (Do Now)

### 1. Environment Variables
| Variable | Current | Need From Trillet | Action |
|----------|---------|---------------------|--------|
| `TRILLET_API_KEY` | Empty (mock mode) | Trial API key | Paste into `.env.staging` + `.env.production` |
| `TRILLET_WEBHOOK_SECRET` | Empty | Trillet dashboard | Generate in Trillet, paste, restart API route |
| `TRILLET_BASE_URL` | `https://api.trillet.ai/v1` | Confirm endpoint | Verify with Trillet docs |
| `TRILLET_WORKSPACE_ID` | `whoza-workspace` | Confirm workspace ID | Verify in Trillet dashboard |
| `TRILLET_AGENT_ID` | `katie-agent` | Confirm agent ID | Verify in Trillet dashboard |

### 2. Supabase Schema (✅ DONE)
All tables created, indexed, RLS enabled:
- `calls` — voice call events
- `enquiries` — qualified leads
- `appointments` — booked appointments
- `leads` — captured lead records

### 3. WhatsApp Delivery (⚠️ STUB)
Current: Edge function formats message, logs to console
Need: Live WhatsApp API credentials
Options:
- **Twilio WhatsApp** — Fastest, £0.005/message, needs WhatsApp Business Account
- **Meta Business API** — Cheaper long-term, more setup
- **Trillet native WhatsApp** — Check if Trillet handles this directly

### 4. Webhook Endpoint (✅ READY)
- URL: `https://whoza-ai-staging-349.netlify.app/api/trillet-webhook`
- Verifies HMAC-SHA256 signatures
- Handles 6 event types with dedicated processors
- Returns 500 on errors (Trillet retries)

### 5. Voice Widget (✅ READY)
- React component with WebRTC
- Mock mode graceful fallback
- Real-time transcript display
- Mute/end call controls

---

## Flip-to-Live Steps (When Credentials Arrive)

### Step 1: Paste Credentials (2 min)
```bash
# .env.staging
TRILLET_API_KEY=trl_live_xxxx
TRILLET_WEBHOOK_SECRET=whsec_xxxx
```

### Step 2: Verify Webhook (2 min)
```bash
curl -X GET https://whoza-ai-staging-349.netlify.app/api/trillet-webhook
# Should return: { status: "active", signatureVerification: true }
```

### Step 3: Test End-to-End (10 min)
1. Place test call via Trillet dashboard
2. Verify `calls` table gets record
3. Verify webhook fires to our endpoint
4. Check enquiry creation on qualified outcome
5. Verify WhatsApp delivery (if wired)

### Step 4: Widget Test (5 min)
1. Open `/` on staging
2. Click "Talk to Katie"
3. Verify WebRTC connection
4. Confirm transcript appears
5. End call, verify `calls` record

### Step 5: Production Deploy (10 min)
Same `.env` vars into Netlify production environment
```bash
netlify env:set TRILLET_API_KEY trl_live_xxxx --context=production
netlify env:set TRILLET_WEBHOOK_SECRET whsec_xxxx --context=production
```

---

## WhatsApp Options Analysis

| Provider | Setup Time | Cost/Msg | Pros | Cons |
|----------|-----------|----------|------|------|
| **Twilio** | 1 day | £0.005 | Fast, reliable, good docs | Needs WABA approval |
| **360dialog** | 2 days | £0.004 | Cheaper, EU-based | More setup |
| **Meta Direct** | 3–5 days | £0.003 | Cheapest | Complex approval |
| **Trillet Native** | 0 days | ? | Might be included | Need to check |

**Recommendation:** Ask Trillet if they handle WhatsApp natively. If not, use Twilio for trial, migrate to Meta direct for production scale.

---

## Test Scenarios

### Scenario 1: Emergency Plumbing Call
1. Call comes in at 2am
2. Katie answers, identifies emergency
3. Qualifies: postcode, urgency, problem
4. Outcome: `qualified`
5. Webhook fires to `/api/trillet-webhook`
6. `calls` + `enquiries` created
7. WhatsApp delivers to plumber
8. Plumber taps "Accept"
9. `enquiries.status` → `accepted`

### Scenario 2: EICR Certificate Booking
1. Landlord calls about EICR
2. Katie identifies letting agent enquiry
3. Qualifies: portfolio size, certificate type, urgency
4. Outcome: `booked`
5. `appointments` record created
6. Confirmation SMS sent

### Scenario 3: Voicemail After Hours
1. Call after 10pm, no answer
2. Katie takes voicemail
3. Outcome: `voicemail`
4. Recording URL saved
5. WhatsApp notification sent with recording link

---

## Open Questions for Trillet Team

1. **WhatsApp:** Does Trillet handle WhatsApp delivery natively, or do we integrate separately?
2. **Phone Numbers:** Can we provision UK numbers through Trillet, or use existing business numbers?
3. **Agent Config:** Is agent configuration done via API or dashboard UI?
4. **Transfer:** Can Katie transfer to human if customer insists?
5. **Multi-language:** Can we configure separate agents for UK English vs US English?

---

## Files Involved

| File | Role | Status |
|------|------|--------|
| `app/api/trillet-webhook/route.ts` | Webhook receiver | ✅ Production ready |
| `app/api/enquiries/route.ts` | CRUD API | ✅ Production ready |
| `components/whoza/trillet-voice-widget.tsx` | Voice UI | ✅ Production ready |
| `lib/trillet-server.ts` | Server SDK | ✅ Retry + mock mode |
| `lib/trillet-webhook.ts` | Event processors | ✅ 6 handlers |
| `lib/trillet-types.ts` | Type definitions | ✅ Complete |
| `supabase/functions/whatsapp-deliver/index.ts` | WhatsApp stub | ⚠️ Needs API |
| `.env.staging` | Staging secrets | ⚠️ Needs API key |

---

## Next Actions

- [ ] Get Trillet trial API key (May 23–29)
- [ ] Confirm WhatsApp strategy with Trillet
- [ ] Provision test phone number
- [ ] Run end-to-end test call
- [ ] Wire WhatsApp delivery (if not native)
- [ ] Deploy to production
