# Trillet.ai Integration — Pre-Trial Preparation

**Trial Window:** May 23–29, 2026  
**Goal:** Flip from MOCK → LIVE in under 30 minutes when credentials arrive  
**Last Updated:** 2026-05-14

---

## ✅ Pre-Trial Checklist

### Infrastructure
- [x] Staging Supabase project isolated (`ligjstpxqtkurvteyyhw.supabase.co`)
- [x] All Trillet tables created (`calls`, `enquiries`, `appointments`, `leads`)
- [x] RLS policies active on all tables
- [x] Indexes on `call_id`, `status`, `created_at`
- [x] Webhook delivery log table (`webhook_deliveries`) for debugging
- [x] `enquiries` table enhanced with `whatsapp_provider`, `whatsapp_message_id`, `client_whatsapp_number`

### Codebase
- [x] `@trillet-ai/web-sdk` v1.7.1 installed
- [x] `lib/trillet-config.ts` — mock mode detection, graceful fallbacks
- [x] `lib/trillet-server.ts` — server-side SDK wrapper with retry logic
- [x] `lib/trillet-types.ts` — complete TypeScript interfaces
- [x] `lib/trillet-webhook.ts` — 6 event handlers:
  - `call.started` → create `calls` record
  - `call.completed` (outcome: `qualified`) → upsert `calls` + create `enquiries`
  - `call.transferred` → log + mark call
  - `appointment.booked` → create `appointments`
  - `lead.captured` → create `leads`
  - `voicemail.left` → create `enquiries` (type: `voicemail`)
- [x] `app/api/trillet-webhook/route.ts` — HMAC signature verification (bypassed when secret empty)
- [x] `app/api/enquiries/route.ts` — CRUD API with Supabase integration
- [x] `app/api/health/trillet/route.ts` — diagnostic endpoint (`GET /api/health/trillet`)
- [x] `components/whoza/trillet-voice-widget.tsx` — React component with WebRTC call UI
- [x] `supabase/functions/whatsapp-deliver/index.ts` — **Provider-agnostic WhatsApp delivery**
  - Supports: `stub`, `twilio`, `meta`, `trillet`
  - Configurable via `WHATSAPP_PROVIDER` env var
  - Auto-looks up enquiry by `call_id` when `callId` is passed
  - Formats messages with urgency emojis and structured layout
  - Updates `enquiries` table with delivery metadata
- [x] `.env.example` — all required variables with inline docs
- [x] `scripts/test-trillet-mock.js` — mock mode test suite

### Test Infrastructure
- [x] `scripts/test-trillet-mock.js` simulates full lifecycle:
  1. `call.started` → inserts `calls`
  2. `call.completed` (outcome: `qualified`) → upserts `calls` + creates `enquiries`
  3. `appointment.booked` → inserts `appointments`
  4. Verifies all records in Supabase
- [x] Test script handles network sandbox gracefully

---

## 🔧 Flip-to-Live Steps (30-Minute Checklist)

When Trillet trial API key arrives, do in this order:

### Step 1: Credentials (5 min)
```bash
# Paste into .env.staging
TRILLET_API_KEY=tk_live_xxxxxxxxxxxx
TRILLET_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Choose WhatsApp provider
WHATSAPP_PROVIDER=twilio  # or meta | trillet
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_WHATSAPP_FROM=+44xxxx
```

### Step 2: Verify Health (2 min)
```bash
curl https://whoza-ai-staging-349.netlify.app/api/health/trillet
```
Expected: `status: "ready"` with all checks green.

### Step 3: Enable Webhook Verification (3 min)
```bash
# In app/api/trillet-webhook/route.ts
# Remove the early-return bypass for empty TRILLET_WEBHOOK_SECRET
# (Already documented in code comments)
```

### Step 4: Run Mock Test on Staging (5 min)
```bash
# From project root on staging environment
node scripts/test-trillet-mock.js
```
Expected: All 3 test phases pass, records verified in Supabase.

### Step 5: Place Live Test Call (10 min)
1. Log into Trillet dashboard
2. Provision test phone number
3. Configure agent (Katie) with whoza workspace
4. Place test call
5. Verify webhook fires to `/api/trillet-webhook`
6. Check Supabase: `calls`, `enquiries` tables populated
7. Check WhatsApp delivery (if provider configured)

### Step 6: Production Deploy (5 min)
```bash
git checkout master
git merge v0-staging
# Copy .env.staging → .env.production (update URLs)
git push origin master
# Netlify auto-deploys
```

---

## 📊 WhatsApp Provider Comparison

| Provider | Setup Time | Cost/Msg | UK Number | Notes |
|----------|-----------|----------|-----------|-------|
| **Twilio** | 15 min | ~£0.005 | ✅ | Fastest. Sandbox mode for testing. |
| **Meta Business API** | 2–4 hrs | ~£0.002 | ✅ | Cheapest long-term. Needs Business Verification. |
| **Trillet Native** | 0 min | Unknown | ? | Check with Trillet team if included. |
| **stub** | 0 min | £0 | N/A | Logs only. Safe for dev. |

**Recommendation:** Start with Twilio for trial (fastest). Switch to Meta for production (cheapest).

---

## 🧪 Test Scenarios

### Scenario A: Qualified Call → WhatsApp Lead
1. Call Trillet test number
2. Katie answers, qualifies job
3. Webhook fires `call.completed` with `outcome: "qualified"`
4. Enquiry created in Supabase
5. WhatsApp message sent to tradesman
6. Tradesman taps "Accept Job"
7. Enquiry status → `accepted`

### Scenario B: Voicemail
1. Call outside hours
2. Voicemail recorded
3. Webhook fires `voicemail.left`
4. Enquiry created (type: `voicemail`)
5. WhatsApp notification with recording link

### Scenario C: Spam/Unqualified
1. Call comes in
2. Katie determines it's spam
3. Webhook fires `call.completed` with `outcome: "unqualified"`
4. Call logged, no enquiry created
5. Optionally: WhatsApp summary sent anyway

---

## 🔒 Security Checklist (Before Production)

- [ ] TRILLET_WEBHOOK_SECRET set (signature verification active)
- [ ] HMAC bypass removed from `trillet-webhook/route.ts`
- [ ] Webhook endpoint uses HTTPS
- [ ] Supabase RLS policies reviewed for production
- [ ] `SUPABASE_SERVICE_ROLE_KEY` rotated after staging testing
- [ ] `TRILLET_API_KEY` scoped to minimum permissions
- [ ] Error logs don't leak PII (phone numbers, names)
- [ ] GDPR: Call recordings have retention policy (auto-delete after 90 days?)

---

## 📞 Open Questions for Trillet Team

1. **WhatsApp native?** Does Trillet handle WhatsApp delivery natively, or do we integrate separately?
2. **Trial scope:** What call volume is included in trial? Any rate limits?
3. **UK numbers:** Can we provision a UK number for testing?
4. **Webhook retries:** What's Trillet's retry policy? (We return 500 for failures)
5. **Recording storage:** How long are recordings retained? Can we auto-download?
6. **Custom variables:** Can we pass `client_id`, `postcode`, `trade_type` via dialplan?
7. **Pricing post-trial:** Per-minute vs per-call pricing for UK numbers?
8. **Agent config:** Can we configure Katie's voice/persona via API?

---

## 🚨 Emergency Rollback

If production breaks:

```bash
# 1. Revert to mock mode instantly
git revert HEAD --no-edit  # or manually empty TRILLET_API_KEY

# 2. Deploy
netlify deploy --site 97f8a30c-8ba7-4e98-aef4-cfee00eb91dd --prod --dir=.next

# 3. Verify
# - Homepage loads without Trillet dependency
# - Webhook endpoint returns 401 (safe)
# - No calls accidentally placed
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/trillet-config.ts` | SDK config, mock mode, env vars |
| `lib/trillet-server.ts` | Server-side Trillet client |
| `lib/trillet-webhook.ts` | Webhook event processors |
| `lib/trillet-types.ts` | TypeScript interfaces |
| `app/api/trillet-webhook/route.ts` | HTTP webhook handler |
| `app/api/health/trillet/route.ts` | Health check endpoint |
| `app/api/enquiries/route.ts` | Enquiries REST API |
| `components/whoza/trillet-voice-widget.tsx` | WebRTC voice widget |
| `supabase/functions/whatsapp-deliver/index.ts` | WhatsApp delivery (provider-agnostic) |
| `scripts/test-trillet-mock.js` | Mock test suite |
| `.env.example` | Env var template |
| `supabase/migrations/20260508000001_create_trillet_tables.sql` | Trillet tables |
| `supabase/migrations/20260514000001_enhance_whatsapp_delivery.sql` | WhatsApp delivery enhancements |

---

*Ready for trial. Will execute flip-to-live on May 23 when credentials arrive.*
