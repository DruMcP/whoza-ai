# Whoza.ai Project Brain
**Last Updated:** 2026-05-03
**Project:** whoza.ai v2.0 Upgrade
**Staging Project:** ligjstpxqtkurvteyyhw (Supabase)
**Production URL:** https://whoza.ai
**Staging URL:** https://whoza-ai-staging.netlify.app

---

## 🎯 Current Status (May 3, 2026)

### Deployed ✅
| Component | Status | Notes |
|-----------|--------|-------|
| Supabase Migration | ✅ Applied | `trial_slots`, `trial_waitlist` tables live |
| Edge Functions | ✅ Deployed | All 4 ACTIVE (check-trial, join-waitlist, get-status, notify-waitlist) |
| Netlify Staging | ✅ DEPLOYED | https://whoza-ai-staging.netlify.app |
| Pricing Update | ✅ Live | New prices + per-job rates + trial structure |
| Country Flags | ✅ Fixed | SVG flags rendering in header |

### Built ✅
| Component | Status | Location |
|-----------|--------|----------|
| v2.0 Design System | ✅ Complete | 18 components in `src/components/` |
| Trial Waitlist System | ✅ Code Complete | SQL + 4 edge functions |
| Admin Dashboard | ✅ Built | `/admin/trials` route + `AdminTrials.jsx` |
| Pricing Page (4 tiers) | ✅ Updated | `components/whoza/pricing.tsx` |
| TrialGate Mobile UX | ✅ Improved | `src/components/TrialGate.jsx` v2 |
| Rate Limiting | ✅ Added | All 4 edge functions + shared utility |
| SQL Race Condition Fix | ✅ Fixed | `FOR UPDATE` in `claim_trial_slot` |
| Competitor Analysis Copy | ✅ Updated | "under 2 minutes" everywhere |
| Start.jsx Split | ✅ Done | 5 sub-components extracted from 1300-line monolith |
| Country Switcher | ✅ Fixed | SVG flags (UK/US) replacing text labels |

---

## 📁 File Structure (Recent Changes)

### New Files (May 2026)
- `src/pages/AdminTrials.jsx` — Admin trial dashboard with 4 KPI cards, waitlist table, weekly progress bar
- `supabase/functions/_shared/rateLimiter.ts` — Shared rate limiting utility for edge functions
- `SITE_CRITIQUE_AND_DEBATE.md` — Full multi-perspective critique (16K words)

### Modified Files (May 2026)
- `components/whoza/pricing.tsx` — **Rewritten**: New prices (£59/£125/£230/£399), per-job rates (£4.50/£3.25/£2.75/£2.25), trial badges, updated CTAs
- `lib/locale-config.ts` — Added `business: 59` for ROI calculator
- `components/whoza/faq.tsx` — Updated trial answer with pro-rata minute caps
- `components/whoza/country-switcher.tsx` — **Rewritten**: SVG flags (UK/US) replacing text labels
- `components/whoza/hero.tsx` — Badge positioning refinements
- `components/whoza/header.tsx` — Logo sizing increased (h-16 to h-20)
- `components/whoza/lost-revenue-calculator.tsx` — Red urgency box removed
- `src/App.jsx` — Added `/admin/trials` route, fixed `AdminTrials` lazy import
- `src/pages/Pricing.jsx` — Added Growth tier (£169), "2 months free" badge, VAT breakdown
- `src/components/TrialGate.jsx` — Complete rewrite v2: design system classes, progressive disclosure
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

### Pricing Structure (Updated May 3)
| Tier | Monthly | Annual | Per-Job Rate | Voice Minutes | Trial |
|------|---------|--------|--------------|---------------|-------|
| Starter | £59 | £590 | £4.50 | 100 min | ✅ 14-day (50 min cap) |
| Growth | £125 | £1250 | £3.25 | 300 min | ✅ 14-day (150 min cap) |
| Pro | £230 | £2300 | £2.75 | 700 min | ❌ No trial |
| Scale | £399 | £3990 | £2.25 | 1500 min | ❌ No trial |

- All prices **inc VAT**
- Annual billing: **2 months free** (not "Save 17%")
- Overage: **£0.22/minute** across all tiers
- Starter/Growth only get free trials with pro-rata minute caps
- Pro CTA: "Get Started" | Scale CTA: "Contact Sales"

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
5. Pricing update (£59/£125/£230/£399 + per-job rates) ✅
6. Trial structure (Starter/Growth 14-day, Pro/Scale no trial) ✅
7. Country flag SVG fix ✅
8. FAQ trial answer update ✅
9. ROI calculator fix (business: 59) ✅
10. Red urgency box removal ✅
11. Logo sizing increase ✅

### High Priority
1. Import TrialExplanation into page.tsx + position + deploy
2. Add "Reserve with Card" upsell flow
3. Build automated AI configuration to reduce onboarding time
4. Trillet API keys in .env.local for Claire end-to-end test

### Medium Priority
5. Scarcity + waitlist section (Point 3 from UX brief)
6. Audio demo file upload + player verification
7. Live micro signal real data feed
8. Add skeleton loading to CompetitorAnalysis staged progress
9. Add voice-specific FAQs to main FAQ

### Scale Preparation
10. A/B test VAT presentation (inc vs +VAT)
11. Add downgrade path: £19/month "Email Insights" plan
12. Build automated onboarding (AI configures voice agent without Dru)
13. GitHub branch standardization (v0-staging vs master)
14. Podium integration for Claire
15. TypeScript clean-up (trillet-types.ts)
16. Remaining UX brief points (6-17)

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

## 🏗️ Technical Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- shadcn/ui components
- Lucide React icons

### Backend
- Supabase (PostgreSQL + Edge Functions)
- Netlify (Hosting + Edge Functions)
- Trillet (Messaging: WhatsApp + SMS)
- Resend (Email)

### Voice/AI
- Vapi.ai (voice agents)
- OpenAI (Claire review engine)
- Perplexity (competitor analysis)

---

*Last build: 2026-05-03 — 21 pages prerendered ✅*
*Last deploy: Deploy ID 69f718cf207f6045b970ab35*
