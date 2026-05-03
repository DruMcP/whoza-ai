# P0 Fixes + Photo Feature — Deployment Checklist
# whoza.ai v2 Infrastructure
# Date: 2026-05-04

## ✅ Code Changes Complete (all in whoza-ai/ workspace)

### 1. Database Migration
**File:** `supabase/migrations/20260504030000_p0_fixes_and_photo_feature.sql`
- Adds `review_enabled` (BOOLEAN) to `voice_configs`
- Adds `google_review_link` (TEXT) to `voice_configs`
- Adds `tradesperson_photo_url` (TEXT) to `voice_configs`
- Adds `tradesperson_name`, `tradesperson_bio`, `tradesperson_credentials` to `voice_configs`
- Adds `booking_confirmation_with_photo` email template
- Adds index on `review_enabled`

### 2. New Edge Functions Created
- `supabase/functions/send-sms/index.ts` — Twilio SMS wrapper for booking confirmations
- `supabase/functions/trillet-update-config/index.ts` — Syncs voice config changes to Trillet API

### 3. Updated Edge Functions
- `supabase/functions/send-review-request/index.ts` — Now checks `review_enabled` field (handles false vs null)
- `supabase/functions/trillet-webhook/index.ts` — Booking confirmation now includes tradesperson name, credentials, and photo URL

### 4. Updated Frontend Service
- `src/services/voiceService.js` — `createVoiceConfig()` now accepts and stores all new fields

---

## 🔴 Manual Steps Required (You Need to Run These)

### Step 1: Execute Migration
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/20260504030000_p0_fixes_and_photo_feature.sql`
3. Run the SQL
4. Verify: `SELECT column_name FROM information_schema.columns WHERE table_name = 'voice_configs' AND column_name LIKE 'review%';`

### Step 2: Deploy Edge Functions
You need a Supabase access token. Get one at: https://app.supabase.com/account/tokens

```bash
cd /path/to/whoza-ai

# Login (one-time)
supabase login

# Link to staging project
supabase link --project-ref ligjstpxqtkurvteyyhw

# Deploy missing functions
supabase functions deploy get-waitlist-status
supabase functions deploy send-sms
supabase functions deploy trillet-update-config

# Re-deploy updated functions
supabase functions deploy send-review-request
supabase functions deploy trillet-webhook
```

### Step 3: Set Environment Variables
In Supabase Dashboard → Edge Functions → Settings:

**Required for all functions:**
- `SUPABASE_URL` = `https://ligjstpxqtkurvteyyhw.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)
- `SITE_URL` = `https://whoza-ai-staging.netlify.app`
- `ALLOWED_ORIGIN` = `https://whoza-ai-staging.netlify.app`

**Required for Trillet integration:**
- `TRILLET_API_KEY` = (from Trillet agency plan signup — Tuesday)

**Required for SMS/WhatsApp:**
- `TWILIO_ACCOUNT_SID` = (from Twilio dashboard)
- `TWILIO_AUTH_TOKEN` = (from Twilio dashboard)
- `TWILIO_PHONE_NUMBER` = (your Twilio UK number, e.g. +447700900000)

**Required for Stripe:**
- `STRIPE_SECRET_KEY` = (from Stripe dashboard)
- `STRIPE_WEBHOOK_SECRET` = (from Stripe dashboard)

**Required for Email:**
- `VITE_RESEND_API_KEY` = (already in .env.local)

---

## 🟡 After Tuesday (Trillet Agency Plan)

1. Get `TRILLET_API_KEY` from Trillet
2. Add it to Supabase env vars
3. Test end-to-end:
   - Sign up for trial
   - Configure voice agent (with photo upload)
   - Receive Trillet number
   - Make test call
   - Verify webhook fires
   - Check booking confirmation SMS includes tradesperson photo
   - Verify review request scheduled for 48h later

---

## 📸 Tradesperson Photo Feature (Launch Ready)

**How it works:**
1. Tradesperson uploads photo during onboarding or from dashboard
2. Photo stored in Supabase Storage (`tradesperson-photos` bucket)
3. Photo URL saved in `voice_configs.tradesperson_photo_url`
4. When Katie books a job:
   - Customer receives SMS/WhatsApp with confirmation
   - Message includes: "Your tradesperson: John Smith. Credentials: Gas Safe, NICEIC. View photo: [link]"
   - Email confirmation shows photo inline with job details

**Next step for photo UI:**
- Add photo upload component to onboarding flow
- Add photo display to dashboard settings
- Create "Your tradesperson" profile page (for SMS link fallback)

---

## Status
- [x] Migration written
- [x] send-sms edge function created
- [x] trillet-update-config edge function created
- [x] send-review-request updated
- [x] trillet-webhook updated with photo
- [x] voiceService.js updated
- [ ] Migration executed in Supabase
- [ ] Edge functions deployed
- [ ] Env vars configured
- [ ] Trillet API key added (Tuesday)
