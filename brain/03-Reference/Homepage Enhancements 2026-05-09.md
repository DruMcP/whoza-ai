---
created: 2026-05-09
updated: 2026-05-10
tags: [reference, web, ux, deployed]
status: live
source: "Staging deployment"
---

# Homepage Enhancements — Deployed 2026-05-09

## Overview
Three major UX enhancements deployed to staging to improve conversion, trust signaling, and trade-specific resonance.

---

## 1. Lost Revenue Calculator — Repositioned + Enhanced

**File:** `components/whoza/lost-revenue-calculator.tsx`
**Position:** DOMINANT MOMENT — below VideoExplainer, above AudioDemo

### Changes
- **Headline:** "What Are Missed Calls Costing You?" (was generic calculator title)
- **Priming stats bar** added above calculator:
  - 62% — of calls to small trade businesses go unanswered
  - 85% — of callers who hit voicemail won't call back
  - 78% — of customers hire whoever responds first
- **Sources cited:** UK micro-business survey 2025, AlwaysOnBooking 2026, JP Automations 2026
- **UK-optimized defaults:** 6 missed calls/week, £280 job value, 35% conversion
- **Currency hint:** "Typical plumbing call-out in the UK: £180–£350"
- **CTA:** "Start free trial" → links to #final-cta

### Rationale
Calculator was buried at bottom of page where 90% of visitors never scroll. Moved to position 4 (right after video explainer) to hit visitors while they're emotionally primed by the demo video.

---

## 2. Trade Icons Band — Replaced Compliance Badges

**File:** `components/whoza/social-proof.tsx` (SocialProofBand)
**Position:** Directly below Hero section

### Changes
- **Removed:** SOC 2 Compliant, CCPA Compliant, BBB Accredited, Licensed & Insured
- **Added:** Horizontal scroll of 10 trade-specific emoji icons per locale

**UK Trades:**
- 🔧 Plumbers | ⚡ Electricians | 🏠 Roofers | 🔐 Locksmiths | 🌊 Drainage | 🌳 Landscapers | 🐜 Pest Control | 🧹 Cleaners | 🔥 Heating Engineers | 🔨 Builders

**US Trades:**
- 🔧 Plumbers | ⚡ Electricians | 🏠 Roofers | ❄️ HVAC | 🌳 Landscapers | 🐜 Pest Control | 🧹 Cleaners | 🔨 General Contractors | 🎨 Painters | 🏗️ Flooring

### Design
- Dark navy background (`--navy-900`)
- Pill-shaped tags with white/10 borders
- Emoji icon + trade name
- Horizontal scroll on mobile (fade edges), wraps on desktop
- Label: "Built for [UK/US] trades & home services"
- Hover: slight brightness increase

### Rationale
SOC 2 / BBB badges are enterprise/niche signals that don't resonate with UK tradespeople. Trade icons immediately communicate "this is for people like me" — much stronger pattern match.

---

## 3. Pricing Page — Competitive Trust Messaging

**File:** `app/pricing/page.tsx`
**Position:** Below headline, above plan cards

### Changes
- Added: "**Pay for jobs booked, not calls answered**"
- Added: "**No hidden fees**"

### Rationale
Positions against competitors who charge per-minute or per-call. Reinforces whoza.ai's value-based pricing (jobs booked = revenue) vs. cost-based pricing (calls answered = cost center).

---

## 4. Katie Audio Player Overlay — Deployed 2026-05-10

**File:** `components/whoza/katie-audio-player.tsx`  
**Position:** Hero section, replaces old `AudioModal` trigger

### Changes
- **Headline:** "Or hear Katie handle a boiler enquiry — **35 seconds**" (was "30 seconds")
- **Full overlay modal:** Dark backdrop `rgba(0,0,0,0.85)` with `backdrop-filter: blur(8px)`
- **Katie avatar:** 80px with green live ring, pulses when playing
- **Waveform:** 5 animated green bars (CSS `@keyframes waveform`), static for `prefers-reduced-motion`
- **Synced transcript:** 6 timed segments (0-35s), auto-scroll to active line, past grey/active white
- **Controls:** Rewind 10s, Play/Pause, Volume toggle + slider (persisted to `localStorage` key `whoza_audio_volume`)
- **Keyboard:** Escape → close, Space → play/pause
- **States:** Loading spinner, tap-to-play (autoplay blocked), error retry, ended replay

### Audio Asset
- **File:** `public/assets/audio/katie_boiler_enquiry_demo.mp3`
- **Duration:** 35 seconds
- **Size:** ~277KB
- **Content:** Katie answers boiler repair enquiry, asks qualifying questions, captures urgency/location/contact, confirms callback

### Rationale
Replaces placeholder "Listen Now" with a full immersive demo experience. Live transcript sync proves Katie's capability in real-time. Volume persistence shows polish. Autoplay fallback handles browser restrictions gracefully.

---

## 5. Header & Modal Polish — Deployed 2026-05-09

### Header
- **Tagline:** "Built for UK Trades and Home Services" → `#10B981`, Inter Medium 500, 14px
- **CTA:** "Get Katie answering my calls" → green gradient, 32px height, 12px font
- **Layout:** Flex restructure with `ml-auto` on nav + `mr-8` gap = **32px spacing** between FAQ and CTA

### Signup Modal
- **Escape hatch:** "Want Starter, Growth or Pro now? View all plans →" links to `/pricing`

### Rationale
Longer CTA text was overflowing proportions. Tagline needed to be green (brand color) and shorter. Modal needed a non-WhatsApp exit path for visitors who want to self-serve plan selection.

---

## Build & Deploy Notes

- Clean build required: `rm -rf .next` + `npx next build` (cache invalidation issue)
- Deployed via: `netlify deploy --site 97f8a30c-8ba7-4e98-aef4-cfee00eb91dd --prod --dir=.next`
- Git: Committed to `master`, pushed to `v0-staging` branch (triggers auto-deploy)
- **Live URL:** https://whoza-ai-staging-349.netlify.app

---

## Verification Checklist

- [x] Katie audio overlay opens, plays, syncs transcript
- [x] Audio CTA reads "35 seconds"
- [x] Header CTA proportionate (32px height, 12px font)
- [x] FAQ → CTA spacing 32px on desktop
- [x] Modal escape hatch links to /pricing
- [x] All components responsive
- [x] No console errors
- [x] Zero build errors
- [x] All 9 legal pages return HTTP 200

---

## Related
- [[Project — Pre-Production Build]] — Parent project
- [[Research — Site Analysis & Enhancements]] — Original audit that identified gaps
- [[Index — Reference]]
