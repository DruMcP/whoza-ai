# Deployment Log — 2026-05-25

## Today's Work Summary

### 1. VAT Removal (Complete)

**Objective:** Remove all "+VAT" references from the entire whoza.ai website.

**Files changed (22+ files):**
- `components/whoza/pricing.tsx` — Removed +VAT from all pricing cards, bundles, consultancy
- `components/whoza/faq.tsx` — Removed VAT references from FAQ answers
- `components/whoza/comparison-table.tsx` — Removed VAT from comparison table
- `components/whoza/pricing-schema.tsx` — Removed VAT from schema markup
- `app/terms/page.tsx` — Removed VAT references from terms
- `app/fair-use/page.tsx` — Removed VAT references from fair use policy
- `app/vat-info/page.tsx` — Rewritten: "No VAT Charged" (WHOZA AI LTD is NOT VAT-registered)
- `lib/locale-config.ts` — Numeric pricing only (no +VAT strings)
- `components/tools/quote-generator.tsx` — Removed VAT toggle and calculations
- `app/blog/how-much-do-missed-calls-cost-uk-trades-2026/page.tsx` — Removed VAT references
- `app/blog/best-ai-phone-answering-uk-trades-2026/page.tsx` — Removed VAT references
- Multiple other blog and landing pages

**Canonical overage rate:** £0.26/minute (aligned across all files)

**Build:** 77 pages, zero errors
**Deploy:** Production (whoza.ai) and Staging 349 both verified clean

---

### 2. Audio Demo Enhancement (Complete)

**Objective:** Make "Hear Katie answer a call" section more engaging.

**What was built:**
- Animated waveform visualizer (24 bars, Katie blue → cyan gradient)
- Pulsing ring animation behind play button when playing
- Dark gradient background (navy → slate)
- "AI Voice Demo" badge with sparkle icon
- "Hear Katie answer a real call" with gradient text
- Enhanced CTA button with gradient

**What was removed (Dru request):**
- Live transcript bubbles (caller vs Katie) — considered unnecessary clutter
- ChatBubble component and TRANSCRIPT data

**Final state:** Clean player with waveform + play button + status line + CTA

**File changed:** `components/whoza/audio-demo.tsx`

**Build:** 77 pages, zero errors
**Deploy:** Production (whoza.ai) ✅ | Staging 349 ✅

---

### 3. Retell + Twilio + ElevenLabs Integration (Phase 0-2 Complete)

**Status:** CODE IMPLEMENTED — Dormant until API keys configured

**New files created (13 files, 2,097 lines, zero existing modifications):**

| File | Purpose | Status |
|------|---------|--------|
| `supabase/migrations/20260524000001_create_retell_twilio_schema.sql` | Database schema (contractor_telephony, retell_calls, telephony_webhook_logs) | ✅ Applied |
| `lib/telephony-config.ts` | Feature flags, env validation | ✅ Implemented |
| `lib/twilio-service.ts` | Subaccount management, UK number search/purchase, webhook config | ✅ Implemented |
| `lib/retell-service.ts` | Agent CRUD, call registration (BYOC), WebSocket URLs | ✅ Implemented |
| `lib/elevenlabs-service.ts` | Voice listing, voice cloning, TTS generation | ✅ Implemented |
| `lib/telephony-router.ts` | Backend selection (trillet vs retell_twilio), provisioning orchestration | ✅ Implemented |
| `app/api/webhooks/twilio/inbound/route.ts` | Twilio → Retell WebSocket bridge | ✅ Implemented |
| `app/api/webhooks/twilio/status/route.ts` | Call status tracking | ✅ Implemented |
| `app/api/webhooks/retell/call-ended/route.ts` | Post-call processing, transcript → enquiry creation | ✅ Implemented |
| `app/api/webhooks/retell/function/route.ts` | Retell function calls (book_appointment, send_quote, transfer_call, check_availability) | ✅ Implemented |
| `app/api/admin/contractor-telephony/route.ts` | Admin provisioning/management API (GET/POST/PATCH) | ✅ Implemented |
| `app/api/health/retell-twilio/route.ts` | Health check endpoint | ✅ Implemented |
| `.env.example` | Updated with all new environment variables | ✅ Updated |

**Key decisions implemented:**
- All webhook endpoints return HTTP 200 even on errors (to prevent retries)
- Twilio responses are XML (`Content-Type: application/xml`)
- Retell responses are JSON
- Twilio signature verification only in production
- `SUPABASE_SERVICE_ROLE_KEY` used for server-side Supabase operations
- `crypto.randomUUID()` for request tracing
- Feature-flagged — code is dormant until env vars are present

**Blocked (awaiting Dru):**
- Retell API key
- Twilio master account creation + funding
- ElevenLabs API key
- UK compliance bundle submission

---

## Deployments

### Production (whoza.ai)
| Deploy ID | Commit | Changes |
|-----------|--------|---------|
| `6a132a8524a34efd920563ce` | `86cb64c` | Enhanced audio demo (waveform + transcript) |
| `6a132ede22605f39b52f2eda` | `2b2d5a1` | Audio demo — transcript removed |

### Staging (whoza-ai-staging-349)
| Deploy ID | Commit | Changes |
|-----------|--------|---------|
| `6a13251639f53b146b1f9da3` | `86cb64c` | Enhanced audio demo (waveform + transcript) |
| `6a133dfc749b3f691163494c` | `599b5d4` | Audio demo — transcript removed |

### GitHub
| Commit | Message |
|--------|---------|
| `a1c6d42` | `fix: remove all VAT references from pricing, terms, fair use, FAQ, vat-info, blog, schema, quote-generator` |
| `942c431` | `feat: implement Retell + Twilio BYOC + ElevenLabs voice layer (Phase 0-2)` |
| `1d05eec` | `chore: empty trigger commit for Netlify redeploy` |
| `86cb64c` | `feat: enhanced audio demo with waveform visualizer, transcript bubbles, dark gradient theme` |
| `599b5d4` | `fix: remove transcript from audio demo - cleaner layout` |

**Branch:** `soft-launch`

---

## Verification Checklist
- [x] Zero "+VAT" references in source code (verified via grep)
- [x] Zero "+VAT" in built output (verified via grep)
- [x] Audio demo enhanced with waveform and dark theme
- [x] Audio demo transcript removed per Dru request
- [x] 77 pages generated, zero build errors
- [x] Production and staging both deployed successfully
- [x] All static assets return 200
- [x] Retell/Twilio code deployed (dormant, no API keys)

---

## Next Steps (Pending Dru)
1. **Retell/Twilio Phase 3-7:** UI components, onboarding flow, end-to-end testing
2. **API keys:** Obtain Retell, Twilio, ElevenLabs credentials
3. **UK compliance:** Submit Twilio UK compliance bundle
4. **Test contractor:** Configure first pilot contractor with retell_twilio backend

---

*Log maintained by Jarvis | whoza.ai Agent Team*
