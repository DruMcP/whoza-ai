---
created: 2026-04-29
updated: 2026-05-10
tags: [reference, architecture, tech]
---

# Reference — Site Architecture

## Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite + Next.js 16 | SPA with prerendered static pages |
| **Hosting** | Netlify | CDN + edge functions + deploy pipeline |
| **Backend** | Supabase | PostgreSQL + auth + edge functions + real-time |
| **Payments** | Stripe | Checkout + subscriptions + webhooks |
| **Voice** | Trillet | AI voice agent + telephony + call management |
| **Email** | Resend | Transactional emails |
| **Monitoring** | Sentry + GA4 | Error tracking + analytics |
| **Audio** | HTML5 Audio API | Katie demo player overlay |

## Database Setup
| Environment | Project | Region | Status |
|------------|---------|--------|--------|
| **Production** | `ryeqbewlmaqewsuvuhlm` | London (eu-west-2) | Live |
| **Staging / Upgrade** | `ligjstpxqtkurvteyyhw` | London (eu-west-2) | New — pending migrations |

### Staging Project Details
- **Project URL:** `https://ligjstpxqtkurvteyyhw.supabase.co`
- **REST API:** `https://ligjstpxqtkurvteyyhw.supabase.co/rest/v1/`
- **Keys:** New format (`sb_publishable_` / `sb_secret_`) — Supabase's updated key format
- **Migration count:** 67 files pending push
- **CLI link:** `supabase link --project-ref ligjstpxqtkurvteyyhw`

### Connection
```bash
# Staging
VITE_SUPABASE_URL=https://ligjstpxqtkurvteyyhw.supabase.co
VITE_SUPABASE_ANON_KEY=[REDACTED — see .env.staging in v0 workspace]
SUPABASE_SERVICE_ROLE_KEY=[REDACTED — see .env.staging in v0 workspace]
```

## Database Schema (Key Tables)
| Table | Purpose |
|-------|---------|
| `profiles` | User profiles, business info |
| `subscriptions` | Stripe subscription data |
| `voice_configs` | Trillet sub-account config per user |
| `call_logs` | Call history, outcomes, recordings |
| `trials` | Trial tracking, expiry dates |
| `scheduled_tasks` | Cron jobs, reminders, review requests |
| `subscription_plans` | Plan definitions (Solo/Business/Pro/Enterprise) |

## Key Pages & Routes
| Route | Component | Purpose | Status |
|-------|-----------|---------|--------|
| `/` | `Home.jsx` | Homepage with SEO, FAQ, video | Live |
| `/voice` | `VoiceLanding.jsx` | Voice product landing page | Live |
| `/voice/setup` | Onboarding wizard | 3-step setup flow | Live |
| `/pricing` | `Pricing.jsx` | Bundle pricing display | Live |
| `/sign-in` | Auth | Magic link + OAuth | Live |
| `/portal` | `Portal.jsx` | Customer dashboard | Live |
| `/portal/voice` | Voice dashboard | Call stats, settings | Live |
| `/competitor-analysis` | Competitor tool | AI visibility analysis | Live |
| `/blog` | Blog | SEO content | Live |
| `/trade/:trade` | Trade pages | Trade-specific landing | Live |
| `/city/:city` | City pages | City-specific landing | Live |
| `/cookie-policy` | Legal | Cookie consent policy | **2026-05-10** |
| `/dpa` | Legal | Data Processing Agreement | **2026-05-10** |
| `/fair-use` | Legal | Fair Use Policy | **2026-05-10** |
| `/sla` | Legal | Service Level Agreement | **2026-05-10** |
| `/refund-policy` | Legal | Refund & cancellation | **2026-05-10** |
| `/modern-slavery` | Legal | Modern Slavery Statement | **2026-05-10** |
| `/accessibility` | Legal | Accessibility Statement | **2026-05-10** |
| `/vat-info` | Legal | VAT registration info | **2026-05-10** |
| `/complaints` | Legal | Complaints procedure | **2026-05-10** |

## Environment Variables
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_STRIPE_PUBLISHABLE_KEY
VITE_ENABLE_VOICE
VITE_ENABLE_TRIAL_NO_CARD
VITE_ENABLE_BUNDLE_PRICING
VITE_ENVIRONMENT
```

## Build Pipeline
```
GitHub push → Netlify build (npm run build) → Prerender (prerender.mjs) → Deploy to CDN
```

## Recent Changes
- **2026-05-10** — Legal compliance sprint: 9 legal pages added, CookieBanner component, ICO badge, sitemap updated. Katie audio player overlay installed (35s boiler enquiry demo). Header CTA resized and tagline updated.
- **2026-05-08** — SEO remediation: CTA buttons converted to anchor tags, 11 schema types, hreflang, sitemap, support page.
- Deploy checklist: [[STAGING_DEPLOY_CHECKLIST.md]] (flat file)
- SEO fix plan: [[SEO_FIX_PLAN.md]] (flat file)
- Site analysis: [[SITE_ANALYSIS_AND_ENHANCEMENTS.md]] (flat file)

## Related
- [[Decision — Netlify + Supabase Stack]] — Why this stack
- [[Project — Pre-Production Build]] — Staging environment
- [[Index — Reference]]
