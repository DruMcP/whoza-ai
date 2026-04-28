# whoza.ai Staging Deploy Checklist

**Branch:** `staging` → `https://whoza-ai-staging.netlify.app`
**Production:** `main` → `https://whoza.ai`

---

## ✅ Already Built (Committed to Staging — `50fdc38`)

### Voice Product Infrastructure
- [x] `/voice` landing page — hero, demo timeline, features, 3-step setup, pricing, testimonials, FAQ, CTA
- [x] `VoiceLanding.jsx` — full React component with bundle pricing display
- [x] `voiceService.js` — Trillet integration abstraction layer (sub-accounts, call analytics, minute tracking, review requests, divert activation)
- [x] `trillet-webhook` edge function — handles call.started, call.ended, call.booking, call.emergency, call.spam
- [x] `trillet-create-subaccount` edge function — provisions Trillet sub-account + UK phone number
- [x] `send-call-summary` edge function — sends WhatsApp/SMS summaries after each call
- [x] `send-urgent-notification` edge function — forwards emergency calls via SMS
- [x] `send-review-request` edge function — sends review request 24h after booking
- [x] SQL migration — `voice_configs`, `call_logs`, `trials`, `scheduled_tasks`, `subscription_plans` tables + RLS + views
- [x] Voice-specific CSS — fully responsive styles in `index.css`
- [x] Header nav — "🎙️ Voice" link added to main navigation
- [x] `/voice` route added to `App.jsx`

### Voice Onboarding Wizard
- [x] 3-step onboarding at `/voice/setup`: Business Profile → Voice Settings → Divert Setup
- [x] Trade type selector (15 UK trades)
- [x] UK voice selection (Sarah/James/Alex)
- [x] Divert code display with copy button
- [x] Test call button
- [x] Direct integration with `voiceService.js`

### Portal Voice Dashboard
- [x] Voice tab in `/portal` with phone icon
- [x] Status card — online/offline with green dot
- [x] Quick actions — pause/activate divert, test AI
- [x] Stats grid — calls today, jobs booked, emergencies, spam blocked
- [x] Minute usage bar with color-coded percentage
- [x] Recent calls list with booking/emergency badges
- [x] Real-time polling (30s interval)

### Trial & Bundle Pricing
- [x] `PlanSelection.jsx` — 4 bundle plans (Solo/Business/Professional/Enterprise)
- [x] Trial toggle — 14-day free, no credit card
- [x] Auto-redirect to voice onboarding after trial signup
- [x] `TrialExpiryGate.jsx` — blocks voice features, shows upgrade CTA
- [x] `Pricing.jsx` — updated with bundle tiers

### Deploy Automation
- [x] `scripts/deploy-staging.sh` — automated Netlify deploy script

### Environment Configuration
- [x] `.env.staging` created with feature flags:
  - `VITE_ENABLE_VOICE=true`
  - `VITE_ENABLE_TRIAL_NO_CARD=true`
  - `VITE_ENABLE_BUNDLE_PRICING=true`
- [x] Staging `robots.txt` blocks all crawlers (`Disallow: /`)

---

## 🔲 Still Needed Before Staging Goes Live

These require your credentials and manual setup:

### 1. Netlify Staging Site Setup
```bash
# Option A: Netlify CLI (if installed)
netlify sites:create --name whoza-ai-staging
netlify link
netlify deploy --prod --build

# Option B: Netlify Dashboard
# 1. Go to https://app.netlify.com
# 2. "Add new site" → "Import an existing project"
# 3. Select GitHub → DruMcP/whoza-ai → staging branch
# 4. Build command: npm run build
# 5. Publish directory: dist
```

**Set environment variables in Netlify dashboard (Settings → Environment variables):**
```
VITE_SUPABASE_URL=https://ryeqbewlmaqewsuvuhlm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # <-- TEST MODE KEY
VITE_ENABLE_VOICE=true
VITE_ENABLE_TRIAL_NO_CARD=true
VITE_ENABLE_BUNDLE_PRICING=true
VITE_ENVIRONMENT=staging
```

### 2. Supabase Staging Project
```bash
# Option A: Supabase CLI
supabase projects create whoza-ai-staging --org-id YOUR_ORG_ID --region eu-west-2

# Option B: Supabase Dashboard
# 1. Go to https://supabase.com/dashboard
# 2. "New project" → name: whoza-ai-staging
# 3. Region: London (eu-west-2)
# 4. Set strong database password
```

**After project creation:**
- [ ] Run SQL migration in SQL Editor: `supabase/migrations/20250428_add_voice_bundle_schema.sql`
- [ ] Set edge function secrets: `supabase secrets set TRILLET_API_KEY=your_trillet_dev_key`
- [ ] Set edge function secrets: `TWILIO_ACCOUNT_SID=xxx TWILIO_AUTH_TOKEN=xxx TWILIO_PHONE_NUMBER=xxx`
- [ ] Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify env vars to match staging project

### 3. Stripe Test Mode
```bash
# Option A: Stripe CLI
stripe products create --name="whoza.ai Solo" --description="AI Voice + Visibility (300 min)"
stripe prices create --product=prod_xxx --unit-amount=6900 --currency=gbp --recurring={interval:month}
# Repeat for Business (£129), Professional (£219), Enterprise (£499)

# Option B: Stripe Dashboard
# 1. Switch to Test mode (toggle top-right)
# 2. Products → Add product
# 3. Create 4 products with monthly recurring prices
# 4. Copy price IDs into .env.staging: VITE_STRIPE_PRICE_SOLO=price_xxx etc
```

### 4. Trillet Dev Account
- [ ] Sign up at https://trillet.ai (or contact for dev API key)
- [ ] Get dev API key
- [ ] Add to Supabase secrets: `supabase secrets set TRILLET_API_KEY=your_key`
- [ ] Configure webhook URL: `https://whoza-ai-staging.netlify.app/.netlify/functions/trillet-webhook`

---

## 📋 Deploy Commands (One-Liner)

```bash
cd /root/.openclaw/workspace/whoza-ai && bash scripts/deploy-staging.sh
```

---

## 🧪 14-Day Test Protocol

| Day | Task | Expected Result |
|-----|------|-----------------|
| 1 | Deploy staging, verify site loads | `/voice` loads, no console errors |
| 2 | Create test user, start trial | Trial active, 14 days shown in portal |
| 3 | Complete voice onboarding | Trillet sub-account created, UK number assigned |
| 4 | Test call divert | Mobile divert `**21*<number>#` works |
| 5 | Test AI answering | Call whoza.ai number, AI answers with business name |
| 6 | Test calendar booking | Appointment appears in connected calendar |
| 7 | Test emergency routing | Call transferred to mobile, SMS received |
| 8 | Test spam filtering | Spam call blocked, no SMS summary |
| 9 | Test WhatsApp summary | Summary received after normal call |
| 10 | Check minute tracking | Dashboard shows accurate usage |
| 11 | Simulate trial expiry | Update `trial_ends_at` in DB, gate appears |
| 12 | Test paid conversion | Stripe checkout, plan activates |
| 13 | Test cancellation | Service stops, number released |
| 14 | Final evaluation | Document results, plan production deploy |

---

## 🚀 Production Deploy (After Staging Passes)

```bash
# Merge staging to main
git checkout main
git merge staging
git push origin main

# Then:
# - Switch Stripe to live keys
# - Switch Trillet to live account
# - Update Netlify env vars for production
# - Update robots.txt to Allow
# - Run production SQL migration
```

---

## 💰 Risk Capital Required (One-Month Staging Test)

| Item | Cost |
|------|------|
| Trillet test minutes (~500) | ~£30 |
| Twilio test SMS/WhatsApp | ~£10 |
| Netlify staging | £0 (free tier) |
| Supabase staging | £0 (free tier) |
| Stripe test mode | £0 |
| **Total** | **~£40** |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/VoiceLanding.jsx` | Voice product landing page |
| `src/components/VoiceOnboarding.jsx` | 3-step setup wizard |
| `src/components/VoiceDashboard.jsx` | Portal voice stats |
| `src/components/TrialExpiryGate.jsx` | Trial expired gate |
| `src/pages/PlanSelection.jsx` | Bundle plan selection + trial |
| `src/services/voiceService.js` | Trillet API abstraction |
| `supabase/functions/trillet-webhook/` | Call event handler |
| `supabase/functions/trillet-create-subaccount/` | Sub-account provisioning |
| `supabase/functions/send-call-summary/` | WhatsApp/SMS summaries |
| `supabase/functions/send-urgent-notification/` | Emergency forwarding |
| `supabase/functions/send-review-request/` | Review requests |
| `supabase/migrations/20250428_add_voice_bundle_schema.sql` | Database schema |
| `scripts/deploy-staging.sh` | Deploy automation |

---

**Last updated:** 2026-04-28 23:05 UTC
**Staging branch:** `50fdc38`
