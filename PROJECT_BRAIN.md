# Whoza.ai Project Brain
**Last Updated:** 2026-04-30
**Project:** whoza.ai v2.0 Upgrade
**Staging Project:** ligjstpxqtkurvteyyhw (Supabase)
**Production URL:** https://whoza.ai

---

## 🎯 Current Status

### Deployed ✅
| Component | Status | Notes |
|-----------|--------|-------|
| Supabase Migration | ✅ Applied | `trial_slots`, `trial_waitlist` tables live |
| Edge Functions | ✅ Deployed | All 4 ACTIVE (check-trial, join-waitlist, get-status, notify-waitlist) |
| Netlify Staging | ✅ DEPLOYED | https://whoza-ai-staging.netlify.app |

### Built ✅
| Component | Status | Location |
|-----------|--------|----------|
| v2.0 Design System | ✅ Complete | 18 components in `src/components/` |
| Trial Waitlist System | ✅ Code Complete | SQL + 4 edge functions |
| Admin Dashboard | ✅ Built | `/admin/trials` route + `AdminTrials.jsx` |
| Pricing Page (4 tiers) | ✅ Updated | `src/pages/Pricing.jsx` |
| TrialGate Mobile UX | ✅ Improved | `src/components/TrialGate.jsx` v2 |
| Rate Limiting | ✅ Added | All 4 edge functions + shared utility |
| SQL Race Condition Fix | ✅ Fixed | `FOR UPDATE` in `claim_trial_slot` |
| Competitor Analysis Copy | ✅ Updated | "under 2 minutes" everywhere |
| Start.jsx Split | ✅ Done | 5 sub-components extracted from 1300-line monolith |

---

## 📁 File Structure (Recent Changes)

### New Files
- `src/pages/AdminTrials.jsx` — Admin trial dashboard with 4 KPI cards, waitlist table, weekly progress bar
- `supabase/functions/_shared/rateLimiter.ts` — Shared rate limiting utility for edge functions
- `SITE_CRITIQUE_AND_DEBATE.md` — Full multi-perspective critique (16K words)

### Modified Files
- `src/App.jsx` — Added `/admin/trials` route, fixed `AdminTrials` lazy import
- `src/pages/Pricing.jsx` — Added Growth tier (£169), "2 months free" badge, VAT breakdown, testimonial badge, social proof band
- `src/components/TrialGate.jsx` — Complete rewrite v2: design system classes, progressive disclosure for optional fields, progress dots, mobile-optimized
- `src/components/ComparisonTable.jsx` — Added Growth tier to comparison table
- `src/pages/CompetitorAnalysis.jsx` — Changed "60 seconds" to "under 2 minutes"
- `src/components/NewHero.jsx` — Updated hero copy
- `src/components/FAQAccordion.jsx` — Updated FAQ answer timing
- `src/components/StickyCTABar.jsx` — Updated CTA copy
- `src/components/HowItWorks.jsx` — Updated step 2 timing
- `src/components/FinalCTA.jsx` — Updated CTA copy
- `src/components/HeroSection.jsx` — Updated hero copy
- `src/components/ExplainerVideo.jsx` — Updated video CTA copy
- `src/data/blogPosts.js` — Updated all blog post CTAs
- `src/pages/VideoWatch.jsx` — Updated video page copy
- `supabase/functions/check-trial-availability/index.ts` — Added rate limiting (30 req/min)
- `supabase/functions/join-waitlist/index.ts` — Added rate limiting (5 req/min)
- `supabase/functions/get-waitlist-status/index.ts` — Added rate limiting (20 req/min)
- `supabase/functions/notify-waitlist/index.ts` — Added rate limiting (3 req/hour) + auth check
- `supabase/migrations/20250430000001_trial_waitlist_system.sql` — Added `FOR UPDATE` to prevent race conditions

---

## 🧠 Architecture Decisions

### Trial System
- **Weekly cap:** 25 slots (starting at 15 for month 1)
- **No credit card** required for trial
- **Waitlist** with position tracking and automatic Monday 9 AM reset
- **Rate limiting:** IP-based to prevent slot exhaustion attacks
- **SQL locking:** `SELECT ... FOR UPDATE` prevents double-claims

### Pricing Structure
| Tier | Monthly | Annual | Voice Minutes | Key Feature |
|------|---------|--------|---------------|-------------|
| Core | £59 | £590 | 100 min | Entry point |
| Pro | £99 | £990 | 300 min | Most popular (94% retention) |
| Growth | £169 | £1690 | 800 min | Multi-location (10) |
| Unlimited | £249 | £2490 | Unlimited | White-label |

- All prices **inc VAT**
- Annual billing: **2 months free** (not "Save 17%")
- Overage: **£0.22/minute** across all tiers

### Edge Function Rate Limits
| Function | Limit | Window |
|----------|-------|--------|
| check-trial-availability | 30 | 1 minute |
| join-waitlist | 5 | 1 minute |
| get-waitlist-status | 20 | 1 minute |
| notify-waitlist | 3 | 1 hour (admin only) |

---

## 🔒 Security

### Rate Limiting
- In-memory store with automatic cleanup every 5 minutes
- IP-based identification (x-forwarded-for, x-real-ip, cf-connecting-ip)
- Returns 429 with Retry-After header

### SQL Race Condition Prevention
```sql
SELECT * INTO slot_row
FROM public.trial_slots
WHERE week_starting = date_trunc('week', current_date)::date
FOR UPDATE;
```

---

## 📊 Market Validation

### 2026 AI Receptionist Market Data
- Market size: **$4.64B** (Business Research Insights)
- CAGR: **34.8%** through 2034 (Market.us)
- SMB AI adoption: **55%** US, **78%** org-wide
- Missed call rate: **62%** of SMB calls unanswered

### Trial Conversion Benchmarks
| Metric | Industry Median | Top Quartile | Our Realistic Target |
|--------|----------------|--------------|---------------------|
| Opt-in trial (no CC) | 8-12% | 22-28% | **15%** |
| Low-touch onboarding | 16-22% | — | **18-20%** |

### Cost Structure
- Trillet cost: ~£0.09/min
- whoza.ai overage: £0.22/min
- Markup: **144%**
- vs human receptionist: **5× cheaper** (Moneypenny £1.65/min)

---

## 🚀 Next Steps (Priority Order)

### Recently Completed ✅
1. Supabase migration applied ✅
2. All 4 edge functions deployed ✅
3. Netlify staging deployed ✅
4. Start.jsx component split ✅

### High Priority
1. Fix Pricing page VAT display on mobile
2. Add "Reserve with Card" upsell flow
3. Build automated AI configuration to reduce onboarding time

### Medium Priority
4. Add skeleton loading to CompetitorAnalysis staged progress
5. Add voice-specific FAQs to main FAQ

### Scale Preparation
6. A/B test VAT presentation (inc vs +VAT)
7. Add downgrade path: £19/month "Email Insights" plan
8. Build automated onboarding (AI configures voice agent without Dru)

---

## 🔑 Credentials & Config

### Supabase Staging
- **Project ref:** `ligjstpxqtkurvteyyhw`
- **URL:** `https://ligjstpxqtkurvteyyhw.supabase.co`
- **CLI Access Token:** `sbp_5d579ddf...b5d8220` ✅ (for CLI: `supabase login --token sbp_...`)
- **Anon Key:** `sb_publishable_zg2uH...J36Vg_5JWOJyMD`
- **Service Role Key:** `sb_secret_ol2kv...FJg_Lfw6QoCf`

### Netlify Staging
- **Site ID:** `41e7051b-7603-43a3-bad2-0803bcb498f2`
- **Site URL:** https://whoza-ai-staging.netlify.app
- **Token:** `nfp_KLNi...LFy7145` ✅ VALID
- **Deploy command:** `NETLIFY_AUTH_TOKEN=nfp_KL... npx netlify deploy --prod --dir=dist --site=41e7051b-7603-43a3-bad2-0803bcb498f2`

### Resend
- **API Key:** `re_ReCob6Ft...Bt4kBPc37`

### GitHub
- **Token:** `ghp_S0...Ds3B`

---

## 📝 Documentation

### Full Critique
- `SITE_CRITIQUE_AND_DEBATE.md` — 16K words covering UX, technical, business model, market validation, financial modeling, competitive positioning

### Pricing
- `FINAL_PRICING_STRUCTURE.md` — Complete pricing rationale and cost analysis

---

## ✅ Completed After Initial Brain Creation

### Start.jsx Component Split
- Extracted 5 sub-components from 1300-line monolith:
  - `AccountStep.jsx` — Sign up/in, social login (Google/LinkedIn), forgot password flow
  - `BusinessDetailsStep.jsx` — Business name, trade dropdown, postcode auto-format, service area
  - `AdditionalInfoStep.jsx` — Website URL, Google Business URL, key services
  - `FinalDetailsStep.jsx` — Credentials, competitors, founder circle checkbox
  - `StepIndicator.jsx` — Reusable 3-step progress bar with checkmarks
- Start.jsx now ~350 lines (pure orchestrator: state, validation, auth, navigation)
- Build successful, zero regressions (95 pages prerendered)

### Files Added
- `src/components/AccountStep.jsx` (new)
- `src/components/BusinessDetailsStep.jsx` (new)
- `src/components/AdditionalInfoStep.jsx` (new)
- `src/components/FinalDetailsStep.jsx` (new)
- `src/components/StepIndicator.jsx` (new)

---

*Last build: 2026-04-30 — 95 pages prerendered ✅*
