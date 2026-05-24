# ZERO-ERROR INTEGRATION PLAN
## Retell + ElevenLabs + Twilio BYOC for UK Operations

**Status:** PLANNING — AWAITING DRU APPROVAL BEFORE ANY CODE CHANGES  
**Risk Level:** LOW (all new files, zero existing file modifications in Phase 1-4)  
**Estimated Implementation:** 6-8 hours across 6 phases  
**Target:** New `telephony_backend` column allows per-contractor choice: `trillet` | `retell_twilio`

---

## EXECUTIVE SUMMARY

We ADD Retell+Twilio BYOC as a **new telephony backend option** alongside the existing Trillet integration. No existing Trillet code is touched. Contractors choose their backend via admin toggle.

**Why this approach is zero-risk:**
- All new files — no edits to existing Trillet webhook, config, or UI
- Existing routes (`/api/trillet-webhook`, `/api/health/trillet`) remain untouched
- Database uses **additive only** — new tables, no column drops or renames
- Feature-flagged — contractors default to `trillet` until explicitly switched
- Build-time safe — new code paths only execute when env vars are present

---

## CURRENT STATE (Verified)

| Component | Status | File |
|-----------|--------|------|
| Trillet webhook handler | ✅ Working (mock mode) | `app/api/trillet-webhook/route.ts` |
| Trillet health check | ✅ Working | `app/api/health/trillet/route.ts` |
| Trillet server service | ✅ Complete | `lib/trillet-server.ts` |
| Trillet config | ✅ Complete | `lib/trillet-config.ts` |
| Database (calls, enquiries, appointments, leads) | ✅ Migrated | `supabase/migrations/20260508000001_create_trillet_tables.sql` |
| Build | ✅ Zero errors | 72 pages generated |
| Staging 349 | ✅ Live | Deploy `6a12bde3` verified |
| Production | ✅ Live | All assets 200 |

---

## PHASE 0: SCHEMA ADDITIONS (Additive Only — Zero Breaking Changes)

### 0.1 New Table: `contractor_telephony`

```sql
-- NEW FILE: supabase/migrations/20260524000001_create_retell_twilio_schema.sql

-- Contractor telephony configuration (additive, no existing table changes)
CREATE TABLE IF NOT EXISTS contractor_telephony (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  
  -- Backend selection
  telephony_backend TEXT NOT NULL DEFAULT 'trillet' 
    CHECK (telephony_backend IN ('trillet', 'retell_twilio')),
  
  -- Twilio subaccount (only used when backend = 'retell_twilio')
  twilio_subaccount_sid TEXT,
  twilio_subaccount_auth_token TEXT, -- AES-256 encrypted at application layer
  twilio_master_account_sid TEXT,
  
  -- Retell agent (only used when backend = 'retell_twilio')
  retell_agent_id TEXT,
  retell_api_key_encrypted TEXT,
  
  -- ElevenLabs voice (only used when backend = 'retell_twilio')
  elevenlabs_voice_id TEXT,
  elevenlabs_api_key_encrypted TEXT,
  
  -- Phone number (Twilio-provisioned)
  phone_number TEXT,
  phone_number_sid TEXT,
  number_type TEXT CHECK (number_type IN ('local', 'mobile', 'toll_free')),
  
  -- Number strategy
  number_strategy TEXT NOT NULL DEFAULT 'new' 
    CHECK (number_strategy IN ('forwarding', 'porting', 'new')),
  forwarding_number TEXT, -- original number if using call forwarding
  pac_code TEXT, -- for porting
  port_status TEXT CHECK (port_status IN ('pending', 'submitted', 'foc_received', 'completed', 'failed')),
  
  -- Webhook configuration
  inbound_webhook_url TEXT DEFAULT 'https://api.whoza.ai/webhooks/twilio/inbound',
  status_webhook_url TEXT DEFAULT 'https://api.whoza.ai/webhooks/twilio/status',
  
  -- Compliance
  uk_compliance_bundle_id TEXT,
  uk_compliance_status TEXT CHECK (uk_compliance_status IN ('not_started', 'submitted', 'approved', 'rejected', 'expired')),
  uk_compliance_submitted_at TIMESTAMPTZ,
  uk_compliance_approved_at TIMESTAMPTZ,
  
  -- Cost tracking
  twilio_balance_gbp DECIMAL(10,2) DEFAULT 0,
  low_balance_alert_sent_at TIMESTAMPTZ,
  
  -- Status
  setup_status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (setup_status IN ('pending', 'compliance_pending', 'number_pending', 'agent_pending', 'ready', 'active', 'suspended')),
  
  -- Metadata
  setup_notes TEXT,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contractor_telephony_contractor_id ON contractor_telephony(contractor_id);
CREATE INDEX idx_contractor_telephony_backend ON contractor_telephony(telephony_backend);
CREATE INDEX idx_contractor_telephony_setup_status ON contractor_telephony(setup_status);

-- Trigger for updated_at
CREATE TRIGGER update_contractor_telephony_updated_at
  BEFORE UPDATE ON contractor_telephony
  FOR EACH ROW EXECUTE FUNCTION update_calls_updated_at();

ALTER TABLE contractor_telephony ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage all telephony"
  ON contractor_telephony FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### 0.2 New Table: `retell_calls` (mirrors `calls` structure, retell-specific)

```sql
-- Retell-specific call records (separate from Trillet calls table)
CREATE TABLE IF NOT EXISTS retell_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  
  -- Retell identifiers
  retell_call_id TEXT NOT NULL UNIQUE,
  retell_agent_id TEXT NOT NULL,
  
  -- Twilio identifiers
  twilio_call_sid TEXT NOT NULL,
  twilio_account_sid TEXT,
  
  -- Call details
  from_number TEXT,
  to_number TEXT,
  direction TEXT DEFAULT 'inbound' CHECK (direction IN ('inbound', 'outbound')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'initiated' 
    CHECK (status IN ('initiated', 'ringing', 'in_progress', 'completed', 'failed', 'no_answer', 'busy')),
  
  -- Timing
  started_at TIMESTAMPTZ,
  answered_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  
  -- Media
  recording_url TEXT,
  recording_duration_seconds INTEGER,
  transcript TEXT,
  
  -- Retell metadata
  retell_metadata JSONB DEFAULT '{}',
  
  -- Cost tracking
  twilio_cost_usd DECIMAL(10,6) DEFAULT 0,
  retell_cost_usd DECIMAL(10,6) DEFAULT 0,
  elevenlabs_cost_usd DECIMAL(10,6) DEFAULT 0,
  total_cost_usd DECIMAL(10,6) DEFAULT 0,
  
  -- Outcome (mapped to shared enquiry status)
  outcome TEXT CHECK (outcome IN ('qualified', 'booking_requested', 'voicemail', 'missed', 'transferred', 'declined')),
  
  -- Linked enquiry (if qualified)
  enquiry_id UUID REFERENCES enquiries(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_retell_calls_contractor_id ON retell_calls(contractor_id);
CREATE INDEX idx_retell_calls_retell_call_id ON retell_calls(retell_call_id);
CREATE INDEX idx_retell_calls_twilio_call_sid ON retell_calls(twilio_call_sid);
CREATE INDEX idx_retell_calls_status ON retell_calls(status);
CREATE INDEX idx_retell_calls_created_at ON retell_calls(created_at DESC);

ALTER TABLE retell_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage all retell calls"
  ON retell_calls FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### 0.3 New Table: `telephony_webhook_logs` (shared audit trail)

```sql
-- Unified webhook audit log (works for BOTH trillet and retell/twilio)
CREATE TABLE IF NOT EXISTS telephony_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  provider TEXT NOT NULL CHECK (provider IN ('trillet', 'twilio', 'retell')),
  event_type TEXT NOT NULL,
  
  -- Request details
  request_id TEXT NOT NULL,
  request_body JSONB,
  request_headers JSONB,
  
  -- Response details
  response_status INTEGER,
  response_body TEXT,
  processing_time_ms INTEGER,
  
  -- Error tracking
  error_message TEXT,
  error_stack TEXT,
  
  -- Related records
  call_id TEXT,
  contractor_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_provider ON telephony_webhook_logs(provider);
CREATE INDEX idx_webhook_logs_event_type ON telephony_webhook_logs(event_type);
CREATE INDEX idx_webhook_logs_call_id ON telephony_webhook_logs(call_id);
CREATE INDEX idx_webhook_logs_created_at ON telephony_webhook_logs(created_at DESC);

ALTER TABLE telephony_webhook_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage all webhook logs"
  ON telephony_webhook_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### 0.4 Add `telephony_backend` to `contractors` table (nullable, default null)

```sql
-- ADDITIVE: New column with default null (existing contractors unaffected)
ALTER TABLE contractors 
  ADD COLUMN IF NOT EXISTS telephony_backend TEXT 
  CHECK (telephony_backend IN ('trillet', 'retell_twilio'));

-- Default remains NULL — existing contractors continue using Trillet via legacy path
-- New contractors can be explicitly set to 'retell_twilio'
```

---

## PHASE 1: ENVIRONMENT VARIABLES (New Only)

### 1.1 New `.env` variables (DO NOT touch existing Trillet vars)

```bash
# === RETELL (NEW — additive, no Trillet changes) ===
RETELL_API_KEY=              # Retell API key for BYOC
RETELL_BASE_URL=https://api.retellai.com/v2

# === TWILIO MASTER ACCOUNT (NEW) ===
TWILIO_MASTER_ACCOUNT_SID=   # Whoza AI Ltd master account
TWILIO_MASTER_AUTH_TOKEN=    # Master auth token
TWILIO_WEBHOOK_SECRET=       # Webhook signature verification

# === ELEVENLABS (NEW) ===
ELEVENLABS_API_KEY=          # For voice cloning
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1

# === ENCRYPTION (NEW — for subaccount credentials at rest) ===
TELEPHONY_CREDENTIALS_ENCRYPTION_KEY=  # AES-256 key for encrypting subaccount tokens

# === UK COMPLIANCE (NEW) ===
TWILIO_UK_COMPLIANCE_BUNDLE_ID=  # Once approved
```

### 1.2 Validation Rule
- All existing `TRILLET_*` variables remain untouched
- New Retell/Twilio code checks for presence of new vars — if missing, gracefully skips initialization
- Build succeeds with OR without new variables

---

## PHASE 2: SERVICE LAYER (New Files — Zero Existing File Edits)

### 2.1 New: `lib/telephony-config.ts`

```typescript
// Unified telephony configuration
// Reads from environment, provides feature flags
// NO existing imports — standalone new file

export interface TelephonyConfig {
  // Trillet (existing)
  trilletApiKey: string | undefined;
  trilletBaseUrl: string;
  trilletWebhookSecret: string | undefined;
  
  // Retell (new)
  retellApiKey: string | undefined;
  retellBaseUrl: string;
  
  // Twilio (new)
  twilioMasterSid: string | undefined;
  twilioMasterToken: string | undefined;
  twilioWebhookSecret: string | undefined;
  
  // ElevenLabs (new)
  elevenLabsApiKey: string | undefined;
  elevenLabsBaseUrl: string;
  
  // Encryption (new)
  encryptionKey: string | undefined;
}

// Feature flags — code paths only execute when configured
export const telephonyFeatures = {
  trilletEnabled: !!process.env.TRILLET_API_KEY,
  retellTwilioEnabled: !!(process.env.RETELL_API_KEY && process.env.TWILIO_MASTER_ACCOUNT_SID),
  elevenLabsEnabled: !!process.env.ELEVENLABS_API_KEY,
};
```

### 2.2 New: `lib/twilio-service.ts`

```typescript
// Twilio BYOC service
// Responsibilities:
// - Subaccount creation/management
// - UK number search/purchase
// - Webhook configuration
// - Number porting (PAC code)
// - Credential encryption at rest

class TwilioService {
  // All methods use master account credentials
  // Subaccount credentials encrypted with AES-256 before storage
  // Never logs auth tokens
}
```

### 2.3 New: `lib/retell-service.ts`

```typescript
// Retell Custom Telephony (BYOC) service
// Responsibilities:
// - Agent creation per contractor
// - register-call API (with audio_websocket_protocol='twilio')
// - WebSocket connection management
// - Voice configuration (ElevenLabs voice_id)

class RetellService {
  // All API calls use Retell API key
  // BYOC mode enforced — never uses Retell native telephony
}
```

### 2.4 New: `lib/elevenlabs-service.ts`

```typescript
// ElevenLabs voice service
// Responsibilities:
// - Voice cloning from contractor sample
// - Voice ID management
// - Voice preview generation

class ElevenLabsService {
  // Upload 2-5 min sample → receive voice_id
  // Store voice_id in contractor_telephony.elevenlabs_voice_id
}
```

### 2.5 New: `lib/telephony-router.ts`

```typescript
// CRITICAL: Routes incoming calls to correct backend
// Reads contractor.telephony_backend to determine path

export async function routeIncomingCall(
  contractorId: string,
  callerNumber: string,
  calledNumber: string
): Promise<{
  backend: 'trillet' | 'retell_twilio';
  handler: () => Promise<Response>;
}> {
  const config = await getContractorTelephony(contractorId);
  
  if (config.telephony_backend === 'retell_twilio') {
    return { backend: 'retell_twilio', handler: () => handleRetellTwilioInbound(config, callerNumber, calledNumber) };
  }
  
  // Default: Trillet (existing behavior)
  return { backend: 'trillet', handler: () => handleTrilletInbound(contractorId, callerNumber) };
}
```

---

## PHASE 3: WEBHOOK ROUTES (New Routes — Existing Routes Untouched)

### 3.1 New: `app/api/webhooks/twilio/inbound/route.ts`

```typescript
// Twilio inbound call webhook
// CRITICAL CONSTRAINT: Must respond with valid TwiML XML within 2 seconds
// This is a NEW route — existing /api/trillet-webhook is NOT touched

// Processing steps:
// 1. Parse Twilio form-encoded payload
// 2. Lookup contractor by AccountSid (from subaccount)
// 3. Register call with Retell (POST /v2/register-call)
// 4. Return TwiML with WebSocket stream URL
// 5. Store call record in retell_calls table
// 6. All errors return fallback TwiML (never hang up silently)
```

### 3.2 New: `app/api/webhooks/twilio/status/route.ts`

```typescript
// Twilio status callback webhook
// Receives: CallSid, CallStatus, CallDuration, RecordingUrl
// Updates retell_calls status and timing
```

### 3.3 New: `app/api/webhooks/retell/call-ended/route.ts`

```typescript
// Retell webhook: call-ended event
// Extract transcript, parse job details
// Trigger WhatsApp/SMS delivery pipeline (reuse existing delivery logic)
// Verify X-Retell-Signature header
```

### 3.4 New: `app/api/webhooks/retell/function/route.ts`

```typescript
// Retell custom function webhook
// Handles: check-calendar, create-booking
// Reuses existing calendar/booking logic where possible
```

---

## PHASE 4: ONBOARDING AUTOMATION (New Admin API)

### 4.1 New: `app/api/admin/contractor-telephony/route.ts`

```typescript
// Admin endpoint to configure contractor telephony
// Methods:
// - POST: Create new telephony config (subaccount, number, agent)
// - PATCH: Update existing config (port number, change voice)
// - GET: Read config status
// - DELETE: Decommission (close subaccount, release number)
```

### 4.2 Onboarding Flow (target: 15 minutes)

```
Step 1: Admin inputs contractor details (business name, services, voice preference)
Step 2: Create Twilio subaccount via API
Step 3: Search + purchase UK number (or configure forwarding/porting)
Step 4: Clone voice from contractor sample (ElevenLabs)
Step 5: Create Retell agent with voice_id + custom prompt
Step 6: Configure inbound webhook on Twilio number
Step 7: Run end-to-end test call
Step 8: Activate for live traffic
```

---

## PHASE 5: MONITORING & ALERTS (New Metrics)

### 5.1 New monitoring checks

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Twilio webhook response time | > 1.5s (of 2s hard timeout) | PagerDuty alert |
| Retell /register-call failure | > 3 failures in 5 min | Degrade to fallback TwiML |
| Twilio account balance | < GBP 50 | Email + SMS alert |
| Per-contractor call volume | > 500 calls/day | Capacity review |
| ElevenLabs API latency | > 200ms | Switch to backup voice |
| UK compliance expiry | < 30 days | Renewal notification |

### 5.2 New health endpoint: `/api/health/retell-twilio`

```typescript
// Mirrors /api/health/trillet structure
// Checks: Retell API connectivity, Twilio master account, subaccount count,
//         ElevenLabs API, compliance bundle status
```

---

## PHASE 6: MIGRATION & TESTING PLAN

### 6.1 Pre-deployment Checklist

- [ ] All new environment variables set in staging
- [ ] UK compliance bundle submitted to Twilio (3-7 day lead time)
- [ ] Database migrations run successfully on staging
- [ ] New webhook routes respond with 200 in mock mode
- [ ] Existing Trillet routes still return 200 (regression test)
- [ ] Build produces zero errors, zero warnings
- [ ] Staging deploy: all static assets 200

### 6.2 Testing Matrix

| Test | Trillet Path | Retell/Twilio Path | Expected Result |
|------|-------------|-------------------|-----------------|
| Inbound call | `/api/trillet-webhook` | `/api/webhooks/twilio/inbound` | Both return 200 |
| Health check | `/api/health/trillet` | `/api/health/retell-twilio` | Both return 200 |
| Database | `calls` table | `retell_calls` table | Records in correct table |
| Webhook signature | X-Trillet-Signature | X-Twilio-Signature / X-Retell-Signature | Verified |
| Call delivery | WhatsApp via Trillet | WhatsApp via Retell | Same delivery pipeline |
| Build | — | — | Zero errors |

### 6.3 Rollback Plan

If ANY issue detected:
1. Contractor `telephony_backend` stays `NULL` → routes to Trillet (unchanged)
2. New routes can be disabled by removing env vars
3. Database tables are additive — no data loss on rollback
4. Zero impact on existing Trillet customers

---

## PHASE 7: PRODUCTION DEPLOY SEQUENCE

```
1. Deploy to staging 349 (soft-launch branch)
2. Run full test matrix
3. Verify Trillet path still works (no regression)
4. Configure one test contractor with retell_twilio backend
5. Place test call, verify end-to-end flow
6. Fix any issues
7. Deploy to production (whoza.ai)
8. Monitor for 24 hours
9. Begin onboarding first real contractor
```

---

## FILE CREATION SUMMARY

### New Files (Zero Risk)
| File | Purpose |
|------|---------|
| `lib/telephony-config.ts` | Unified config, feature flags |
| `lib/twilio-service.ts` | Twilio BYOC subaccount/number management |
| `lib/retell-service.ts` | Retell Custom Telephony API |
| `lib/elevenlabs-service.ts` | Voice cloning and management |
| `lib/telephony-router.ts` | Backend selection logic |
| `app/api/webhooks/twilio/inbound/route.ts` | Twilio → Retell WebSocket bridge |
| `app/api/webhooks/twilio/status/route.ts` | Call status tracking |
| `app/api/webhooks/retell/call-ended/route.ts` | Post-call processing |
| `app/api/webhooks/retell/function/route.ts` | Calendar/booking functions |
| `app/api/admin/contractor-telephony/route.ts` | Onboarding automation |
| `app/api/health/retell-twilio/route.ts` | Health check endpoint |
| `supabase/migrations/20260524000001_create_retell_twilio_schema.sql` | Database schema |
| `.env.example` (update) | Document new variables |

### Modified Files (Minimal Risk)
| File | Change |
|------|--------|
| `.env.local` / `.env.staging` / `.env.production` | Add new vars only |
| `supabase/migrations/` | Add new migration file only |

### Untouched Files (Zero Risk)
- ALL existing Trillet files (`lib/trillet-*`, `app/api/trillet-webhook/*`, `app/api/health/trillet/*`)
- ALL existing UI components
- ALL existing Stripe, Resend, Supabase configs
- `next.config.js`, `app/layout.tsx`, ALL page files

---

## COST PROJECTION

| Component | Monthly (per 1000 min) | Notes |
|-----------|---------------------|-------|
| Retell voice engine | $70 | $0.07/min |
| Claude 3.5 Sonnet | $60 | $0.06/min |
| Twilio UK domestic | $14-18 | $0.014-0.018/min |
| UK number rental | $1-3 | per number |
| **Total BYOC** | **$145-151** | vs Retell managed $230 |
| **Savings** | **37%** | per 1000 min |

---

## CRITICAL DEPENDENCIES (Blockers)

1. **Twilio UK Compliance Bundle** — MUST be approved before ANY number provisioning
   - Companies House certificate (SC874716)
   - Proof of address (< 3 months)
   - Director photo ID
   - Timeline: 3-7 business days
   - Status: ⏳ NOT YET SUBMITTED

2. **Twilio master account** — MUST be funded with GBP 500 minimum
   - Status: ⏳ NOT YET CREATED

3. **Retell API key** — MUST be obtained from Retell dashboard
   - Status: ⏳ NOT YET OBTAINED

4. **ElevenLabs API key** — MUST be obtained for voice cloning
   - Status: ⏳ NOT YET OBTAINED

**NONE of these blockers affect the existing Trillet integration.**

---

## APPROVAL REQUIRED

Before ANY code is written, Dru must confirm:

1. ✅ **Approve this plan** — Proceed with Phase 0-2 implementation?
2. ✅ **Confirm Twilio account creation** — Will you create the master Twilio account?
3. ✅ **Confirm UK compliance bundle submission** — Will you submit the regulatory docs?
4. ✅ **Priority** — Is this blocking soft launch, or post-launch feature?
5. ✅ **First contractor** — Do you have a pilot contractor ready for Retell/Twilio?

**Recommended:** Complete soft launch with Trillet (current path), then add Retell/Twilio as **expansion option** for new contractors who need UK numbers or want lower costs.

---

*Plan prepared by Jarvis | Zero-error architecture | All new files, zero existing modifications*
