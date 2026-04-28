# whoza.ai Staging Deploy Checklist

**Branch:** `staging` → `https://whoza-ai-staging.netlify.app`
**Production:** `main` → `https://whoza.ai`

---

## ✅ Already Built (Committed to Staging)

### Voice Product Infrastructure
- [x] `/voice` landing page — hero, demo timeline, features, 3-step setup, pricing, testimonials, FAQ, final CTA
- [x] `VoiceLanding.jsx` — full React component with bundle pricing display
- [x] `voiceService.js` — Trillet integration abstraction layer (sub-accounts, call analytics, minute tracking)
- [x] `trillet-webhook` edge function — handles call.started, call.ended, call.booking, call.emergency, call.spam
- [x] SQL migration — `voice_configs`, `call_logs`, `trials`, `scheduled_tasks`, `subscription_plans` tables + RLS + views
- [x] Voice-specific CSS — fully responsive styles in `index.css`
- [x] Header nav — "🎙️ Voice" link added to main navigation
- [x] `/voice` route added to `App.jsx`

### Bundle Pricing
- [x] Pricing page updated — Solo £69, Business £129, Professional £219, Enterprise £499
- [x] All plans include AI Voice + AI Visibility bundle
- [x] Minutes displayed: 300/600/1200/3000

### Environment Configuration
- [x] `.env.staging` created with feature flags:
  - `VITE_ENABLE_VOICE=true`
  - `VITE_ENABLE_TRIAL_NO_CARD=true`
  - `VITE_ENABLE_BUNDLE_PRICING=true`
- [x] Staging `robots.txt` blocks all crawlers (`Disallow: /`)

---

## 🔲 Still Needed Before Staging Goes Live

### 1. Netlify Staging Site Setup
```bash
# Create new site from staging branch
netlify sites:create --name whoza-ai-staging

# Link to GitHub staging branch
netlify link
netlify deploy --prod --build
```

**Set environment variables in Netlify dashboard:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_ENABLE_VOICE=true`
- `VITE_ENABLE_TRIAL_NO_CARD=true`
- `VITE_ENABLE_BUNDLE_PRICING=true`
- `VITE_ENVIRONMENT=staging`

### 2. Supabase Staging Project
- [ ] Create new Supabase project (separate from production)
- [ ] Run SQL migration: `20250428_add_voice_bundle_schema.sql`
- [ ] Set edge function secrets: `TRILLET_API_KEY`
- [ ] Configure CORS for staging domain

### 3. Stripe Test Mode
- [ ] Switch Stripe keys to test mode
- [ ] Create test products/prices for bundle plans:
  - Solo: £69/month (price_xxx)
  - Business: £129/month (price_xxx)
  - Professional: £219/month (price_xxx)

### 4. Trillet Test Account
- [ ] Get Trillet dev API key
- [ ] Create test sub-account for staging
- [ ] Provision test UK phone number
- [ ] Configure webhook URL: `https://whoza-ai-staging.netlify.app/.netlify/functions/trillet-webhook`

### 5. Voice Onboarding Wizard
- [x] Build 3-step onboarding: Business Profile → Voice Settings → Divert Setup
- [x] Add to `/start` flow when `plan_id` is voice bundle
- [x] Accessible at `/voice/setup`

### 6. Portal Voice Dashboard
- [x] Add voice stats to `/portal` (calls today, minutes used, divert status)
- [x] Add "Test My AI" button
- [x] Add divert toggle (activate/deactivate)
- [x] Add Voice tab to portal navigation

### 7. 14-Day Trial Flow
- [x] Build trial signup without credit card (configured in `.env.staging`)
- [x] Add trial expiry logic (`TrialExpiryGate.jsx` component)
- [ ] Add trial-to-paid conversion flow
- [ ] Add trial expired gate integration into portal

### 8. Testing Protocol
- [ ] Test call divert with real phone
- [ ] Test AI answering with sample script
- [ ] Test booking into calendar
- [ ] Test WhatsApp summary delivery
- [ ] Test emergency routing
- [ ] Test minute usage tracking
- [ ] Test trial expiry

---

## 📋 Deploy Commands

```bash
# 1. Push latest staging
git push origin staging

# 2. Deploy to Netlify staging
netlify deploy --prod --build

# 3. Run SQL migration in Supabase SQL Editor
# (paste contents of supabase/migrations/20250428_add_voice_bundle_schema.sql)

# 4. Deploy edge functions
supabase functions deploy trillet-webhook

# 5. Verify staging URL
open https://whoza-ai-staging.netlify.app/voice
```

---

## 🧪 14-Day Test Protocol

| Day | Task | Expected Result |
|-----|------|-----------------|
| 1 | Set up staging, deploy code | Site loads, no errors |
| 2 | Create test user, start trial | Trial active, 14 days remaining |
| 3 | Complete voice onboarding | Config saved, Trillet number assigned |
| 4 | Test call divert | Call forwards to AI |
| 5 | Test AI conversation | AI answers in business name |
| 6 | Test calendar booking | Appointment appears in Google Calendar |
| 7 | Test emergency routing | Call transferred to mobile |
| 8 | Test spam filtering | Spam call blocked |
| 9 | Test WhatsApp summary | Summary received in WhatsApp |
| 10 | Check minute tracking | Usage accurate in dashboard |
| 11 | Simulate trial expiry | Account gated, prompt to upgrade |
| 12 | Test paid conversion | Stripe checkout works, plan activated |
| 13 | Test cancellation | Service stops, number released |
| 14 | Final evaluation | All features pass, ready for production |

---

## 🚀 Production Deploy (After Staging Passes)

```bash
# Merge staging to main
git checkout main
git merge staging
git push origin main

# Update production robots.txt back to Allow
# Switch Supabase to production project
# Switch Stripe to live keys
# Switch Trillet to live account
# Update Netlify env vars for production
```

---

## 💰 Risk Capital Required (One-Month Staging Test)

| Item | Cost |
|------|------|
| Trillet test minutes (~500 for testing) | ~£30 |
| Twilio test SMS/WhatsApp | ~£10 |
| Netlify staging (free tier) | £0 |
| Supabase staging (free tier) | £0 |
| Stripe test mode | £0 |
| **Total** | **~£40** |

---

**Last updated:** 2026-04-28 22:45 UTC
**Staging branch:** `d7f0109`
