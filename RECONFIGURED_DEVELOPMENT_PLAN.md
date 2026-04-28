# whoza.ai White-Label Voice Agent — Revised Development Plan
## Packaging & Selling Model (Partner Handles Fulfillment)
**Date:** 2026-04-28
**Classification:** Internal — White-Label Reseller Model
**Status:** READY FOR REVIEW

---

## 1. Executive Summary

**Correction:** whoza.ai is not building voice infrastructure. We are **white-label resellers** — a technical partner handles all voice agent technology, number provisioning, call routing, and fulfillment. whoza.ai packages, brands, prices, sells, and supports the customer relationship.

This reduces build scope by ~80% and compresses timeline from 8-10 weeks to **2-4 weeks** for initial launch.

**What the partner handles:**
- Voice agent AI (conversations, scripts, routing)
- Phone number provisioning (UK numbers)
- Carrier compatibility and forwarding
- Call recording, transcription, analytics
- Technical uptime/SLA
- Underlying compliance (should verify)

**What whoza.ai builds:**
- Voice product landing page
- Pricing and signup flow
- Stripe billing (charge customers, pay partner)
- Reseller dashboard (customer list, status, usage)
- Support documentation and escalation path
- Bundle positioning with existing AI Visibility platform

---

## 2. Partner Verification Checklist

**Before any build begins, these must be confirmed:**

| # | Question | Why It Matters | Status |
|---|----------|---------------|--------|
| 1 | **Who is the partner?** (PulsyAI? Retell? Bland? Other?) | Determines API capabilities, pricing, feature set | ❓ UNCONFIRMED |
| 2 | **Does partner have a reseller/white-label program?** | Confirms we're authorized to resell | ❓ UNCONFIRMED |
| 3 | **What is the white-label cost per customer?** | Sets our margin and pricing floor | ❓ UNCONFIRMED |
| 4 | **Does partner provide a reseller API?** | If yes: automated provisioning. If no: manual dashboard work. | ❓ UNCONFIRMED |
| 5 | **Does partner handle UK GDPR compliance?** | If no: whoza.ai needs DPIA regardless | ❓ UNCONFIRMED |
| 6 | **Does partner provide UK numbers?** | If no: we need Telnyx fallback | ❓ UNCONFIRMED |
| 7 | **What is partner's uptime/SLA?** | Determines what we promise customers | ❓ UNCONFIRMED |
| 8 | **Who handles customer support for call issues?** | Determines our support scope | ❓ UNCONFIRMED |
| 9 | **What is provisioning workflow?** (API vs manual dashboard) | Determines build effort | ❓ UNCONFIRMED |
| 10 | **Does partner allow custom branding?** (whoza.ai logo, colors) | Determines white-label depth | ❓ UNCONFIRMED |

**Validated Model Flag:** PulsyAI's "Full REST API" claim was unverifiable — /developers returned 404, docs behind login wall. If PulsyAI is the partner, we need direct confirmation of reseller API access.

---

## 3. What whoza.ai Actually Builds

### Phase 1: Packaging Layer (Weeks 1-2)

#### 1.1 Voice Product Landing Page
**Effort:** 4-6 hours
**What:** Standalone landing page or section on whoza.ai homepage
**Content:**
- Hero: "Never Miss Another Customer Call" / "AI Answers Your Phone 24/7"
- Before/After: "Before: Missed call → Lost job" / "After: AI answers → Booking confirmed"
- 3 key features: 24/7 answering, trade-specific scripts, instant call summaries
- Social proof: "Join 200+ tradespeople..." (update when real)
- Pricing: £149/month Found tier (voice only) or bundle with visibility
- CTA: "Get Started" or "Check My Competitor First"

#### 1.2 Pricing Architecture
**Effort:** 2-3 hours
**What:** Clear pricing for voice-only and bundled options

| Tier | Voice Only | Voice + Visibility | What's Included |
|------|------------|-------------------|-----------------|
| **Found** | £149/mo | £199/mo | 24/7 answering, 1 number, call summaries, email alerts |
| **Connected** | £299/mo | £349/mo | + Calendar booking, CRM sync, WhatsApp notifications |
| **Complete** | £499/mo | £549/mo | + Dedicated account manager, priority support, custom scripts |

**Note:** If partner cost is $59-99/customer (PulsyAI range), margins are:
- Found (£149): ~60% gross margin
- Connected (£299): ~80% gross margin
- Complete (£499): ~85% gross margin

#### 1.3 Signup/Onboarding Flow
**Effort:** 4-6 hours
**What:** Capture customer details needed for partner provisioning
**Fields:**
- Business name
- Trade type (dropdown: Plumber, Electrician, Builder, etc.)
- Phone number (to forward from)
- Desired AI phone number (or "we'll assign one")
- Email for call summaries
- WhatsApp preference (yes/no)
- Current carrier (for compatibility check)

**If partner has API:** Submit directly to partner API on Stripe payment success
**If partner has no API:** Store in Supabase, manually provision via partner dashboard

#### 1.4 Stripe Billing Setup
**Effort:** 2-3 hours
**What:** Charge customers, handle subscriptions, pay partner

**Architecture:**
```
Customer pays whoza.ai via Stripe
  → whoza.ai keeps margin
  → whoza.ai pays partner monthly (API or manual)
```

**Products to create in Stripe:**
- `voice_found` — £149/month
- `voice_connected` — £299/month
- `voice_complete` — £499/month
- `bundle_found` — £199/month
- `bundle_connected` — £349/month
- `bundle_complete` — £549/month

#### 1.5 Reseller Dashboard (Minimal Viable)
**Effort:** 4-6 hours
**What:** Simple admin view for Dru to manage voice customers

**Features:**
- Customer list (name, trade, tier, status)
- Provisioning status (pending / active / suspended)
- Monthly revenue per customer
- Partner cost per customer
- Net margin per customer
- "Provision" button (if manual) or auto-provision via API

**If no partner API:** Dashboard is manual — Dru clicks "Provision" to open partner dashboard in new tab

### Phase 2: Integration Polish (Weeks 3-4)

#### 2.1 Partner API Integration (If Available)
**Effort:** 1-2 days
**What:** Automated provisioning when customer pays
**Flow:**
```
Stripe webhook → Supabase edge function → Partner API
  → Create sub-account
  → Assign phone number
  → Configure forwarding
  → Send welcome email to customer
```

#### 2.2 Call Log/Usage Dashboard (Customer-Facing)
**Effort:** 1-2 days
**What:** Simple view for customers to see their calls

**If partner provides call data via API:** Pull and display
**If partner provides no API:** Manual or skip for MVP

**Features:**
- Calls answered today/this week/this month
- Total minutes used
- Missed calls (if any)
- Call recordings (if partner provides)
- Call summaries (if partner provides)

#### 2.3 Unified Dashboard (Voice + Visibility)
**Effort:** 2-3 days
**What:** Single dashboard showing both AI Visibility tasks AND voice stats

**Sections:**
- AI Visibility Score + Trend
- Weekly Tasks (from Rex)
- Voice: Calls answered, minutes, summary
- Combined ROI: "This month: X tasks completed, Y calls answered, Z leads captured"

#### 2.4 Support Documentation
**Effort:** 2-3 hours
**What:** Clear documentation on what whoza.ai handles vs what partner handles

**Topics:**
- "How call forwarding works" (carrier-specific guides)
- "What to expect in your first week"
- "How to review call summaries"
- "Who to contact for call quality issues" (escalation to partner)
- "How to change your script or business hours"
- "Billing and cancellation"

---

## 4. Revised Timeline

| Week | Activity | Deliverable |
|------|----------|-------------|
| **1** | Partner confirmation + Stripe products + Landing page draft | Partner verified, Stripe ready, page mockup |
| **2** | Landing page live + Signup flow + Basic dashboard | Voice product page public, can accept signups |
| **3** | Partner API integration (if available) + Call dashboard + Bundle pricing | Automated provisioning or manual workflow |
| **4** | Unified dashboard + Support docs + Soft launch with 3-5 beta | Full product ready for public launch |

**Total:** 4 weeks from partner confirmation to public launch

---

## 5. What Still Needs Fixing (Track A — Existing Site)

Even with voice as white-label, the existing site issues still hurt conversion:

| Priority | Fix | Effort | Impact |
|----------|-----|--------|--------|
| 🔴 CRITICAL | FAQ duplicate answers | 30 min | User confusion |
| 🔴 CRITICAL | Competitor analysis loading state | 1 hour | +30% completion |
| 🟡 HIGH | Before/After hero section | 2 hours | +40% engagement |
| 🟡 HIGH | Google Reviews badge | 30 min | Trust |
| 🟡 HIGH | Deprecate AI Workforce vaporware | 30 min | Prevents trust damage |
| 🟡 HIGH | Email capture (non-competitor) | 2 hours | +200% leads |
| 🟢 MEDIUM | Sticky CTA context-awareness | 30 min | Correct pathing |
| 🟢 MEDIUM | Exit-intent popup | 2 hours | Capture abandons |

**These can run parallel with voice packaging — same 2-4 week window.**

---

## 6. Remaining Risks (White-Label Model)

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| 1 | **Partner has no reseller API** | MEDIUM | MANUAL WORK | Build manual provisioning workflow; automate later |
| 2 | **Partner's UK compliance gap** | MEDIUM | LEGAL | Verify partner has DPIA; if not, whoza.ai needs one |
| 3 | **Partner uptime/SLA insufficient** | MEDIUM | CHURN | Don't promise 99.9% until partner confirms SLA |
| 4 | **Partner number provisioning slow** | MEDIUM | DELAY | Test 3-5 number orders before launch |
| 5 | **Partner doesn't allow deep white-label** | LOW | BRANDING | Use iframe embed or subdomain if needed |
| 6 | **Partner margin too thin** | MEDIUM | PROFIT | Negotiate volume pricing; test unit economics at 1, 5, 10 customers |
| 7 | **Support escalation unclear** | HIGH | CHURN | Document exact split; partner handles technical, we handle relationship |
| 8 | **BrightLocal or competitor launches bundle** | HIGH | COMPETITION | Speed to market is now the only moat — execute in 4 weeks |

---

## 7. Immediate Action Items (Next 48 Hours)

### For Dru:
1. **Confirm partner identity** — Who is the white-label partner? (PulsyAI? Retell? Bland? Other?)
2. **Confirm partner reseller terms** — Cost per customer, margin structure, API access, UK compliance
3. **Verify partner has UK numbers + carrier compatibility handling**
4. **Sign off on voice pricing** — £149/£299/£499 for voice-only; £199/£349/£549 bundled

### For Dev (Parallel):
1. **Apply existing site fixes** (Week 1 critical items — FAQ, loading state, Before/After hero)
2. **Create Stripe products** for voice tiers (can do before partner confirmed)
3. **Draft voice landing page** (can build template before partner confirmed)
4. **Build minimal reseller dashboard** (Supabase table: voice_customers)

---

## 8. Budget (White-Label Model)

| Item | Monthly | Notes |
|------|---------|-------|
| Partner white-label cost | $59-99/customer | Pass-through or margin |
| Stripe fees | 1.5% + £0.20/txn | On customer charges |
| Cloudflare (existing) | $0-5 | Already paid |
| Supabase (existing) | $0-25 | Already paid |
| Resend email | ~£10 | Transactional |
| **Fixed** | **~£15** | Before any customers |
| **Per customer** | **£47-78** | Partner cost |
| **Margin at 1 customer** | **£71-102** | Found tier (£149) minus partner cost |

**Much healthier than building infrastructure.** At 1 customer: ~50-70% gross margin. At 10 customers: ~70-80% gross margin (volume discounts).

**One-time costs:**
- Legal review of partner terms: £500-1,000
- If partner lacks UK compliance: DPIA £2,000-5,000

---

## 9. Summary

**Old plan (building voice):** 12 weeks, £750-1,000/month, 80% technical build
**New plan (white-label):** 4 weeks, ~£15/month fixed, 80% packaging/selling

The white-label model is the correct path for whoza.ai's current stage. We are not a voice tech company — we are a trade-focused platform that bundles visibility and voice. The partner handles the hard technical problems; we handle the trade-specific positioning, pricing, customer relationship, and bundle value.

**Critical dependency:** Partner capabilities. The 4-week timeline assumes a partner with:
- White-label authorization
- UK number provisioning
- Reseller API (or at least a manageable dashboard)
- Acceptable uptime
- UK compliance (or clear documentation of who handles what)

**If partner lacks these, timeline extends by 2-4 weeks to build workarounds.**

**Ready to execute. Waiting on partner confirmation from Dru.**
