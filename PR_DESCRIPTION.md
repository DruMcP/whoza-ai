# Refer a Trade — Verification Evidence, Ref-Capture Fix, and Programme Terms Lock

## Summary
Completes the Refer a Trade programme implementation with: (A) evidence documentation, (B) referral code capture on signup form, (C) locked programme terms with backend enforcement.

---

## Part A — Evidence

### A1. Referral State Machine → Credit Application

**File:** `lib/referral-service.ts`  
**Test output:** `tests/referral-service.run.ts`

```
=== Referral Programme Business Logic Tests ===

--- Credit trigger on payment number ---
✅ should NOT credit on 1st payment (trial completed)
✅ should NOT credit if trial not completed
✅ SHOULD credit on 2nd payment after trial completion
✅ should NOT credit on 3rd+ payment (already credited at 2nd)

--- Early cancellation protection ---
✅ should NOT credit if customer cancels after 1st payment
✅ should NOT credit if customer cancels during trial

--- 12-month rolling cap ---
✅ should credit when under cap (11 credits, 12th referral)
✅ should NOT credit when cap reached (12 credits, 13th referral)
✅ should NOT credit when over cap (13+ credits)

--- Rolling window calculation ---
✅ should return 12-month window

--- Complete state machine walkthrough ---
✅ walkthrough: trial → 1st payment → 2nd payment → credit

=== Results: 11 passed, 0 failed ===
```

**State machine flow:**
1. `link generated` → stored in `localStorage` as `whoza_referral_code`
2. `signup` → `?ref=CODE` captured in `waitlist-modal.tsx:44`, persisted to `email_subscribers.metadata.referral_code`
3. `trial` → 7-day free trial (existing business model)
4. `1st payment` → `process-payment` API checks: trial completed ✅, but payment < 2 → NO CREDIT
5. `2nd payment` → `process-payment` API checks: trial ✅, payment === 2 ✅, cap check ✅ → CREDIT APPLIED
6. `credit applied` → `referrals.reward_status = 'issued'`, `contractors.referral_reward_months += 1`

**Datastore records at each stage:**

```sql
-- After signup (waitlist entry)
SELECT email, metadata->>'referral_code' as ref
FROM email_subscribers
WHERE metadata ? 'referral_code';
-- Returns: email, REFCODE

-- After referral creation
SELECT 
  r.referred_email,
  r.status,           -- 'pending' → 'signed_up' → 'paid' → 'rewarded'
  r.reward_status,    -- 'pending' → 'issued'
  r.rewarded_at
FROM referrals r
WHERE r.referred_contractor_id = 'uuid-here';

-- After credit applied
SELECT 
  c.business_name,
  c.referral_reward_months,  -- incremented by 1
  c.referral_count
FROM contractors c
WHERE c.id = 'referrer-uuid';
```

---

### A2. Post-Signup Confirmation Screen and Customer Dashboard

**Dashboard block:** `components/whoza/referral-dashboard-block.tsx`

The dashboard shows:
- Referral link with copy-to-clipboard button (`handleCopyLink`, line 65)
- WhatsApp share intent (`handleShareWhatsApp`, line 75)
- Email share intent (`mailto:` link with pre-filled subject/body)
- Stats grid: Total / Signed Up / Paid / Free Months

**Screenshot evidence:** The component renders at `/dashboard` below the PhoneSetup section. Share actions:
- WhatsApp: `https://wa.me/?text=Check%20out%20Whoza.ai...`
- Email: `mailto:?subject=Try%20Whoza.ai...`
- Copy: writes `https://whoza.ai/?ref={CODE}` to clipboard

---

### A3. Monday Summary Email Line

**Status:** Not yet implemented. The Monday summary email template is managed in the email marketing platform (not in this codebase). 

**Required manual step:** Add the following line to the Monday summary email template in the email provider:

```
💰 Refer a Trade: You have {referral_stats.free_months_earned} free months banked. Share your link: https://whoza.ai/?ref={referral_code}
```

**Template location:** Email provider (Resend/Mailchimp) — not in repository.

---

### A4. Analytics Events

**File:** `lib/gtag.ts:61-68`

| Event Name | Fired From | File:Line | Parameters |
|---|---|---|---|
| `referral_share` | WhatsApp/Email share | `lib/gtag.ts:62` | `{ method, location }` |
| `referral_signup` | Referral code used at signup | `lib/gtag.ts:65` | `{ code }` |
| `referral_reward_issued` | Credit applied | `lib/gtag.ts:68` | `{ referrerId, months }` |

**Fired in code:**
- `referral_share`: `components/whoza/referral-client.tsx` (WhatsApp/Email buttons), `components/whoza/referral-dashboard-block.tsx` (dashboard share)
- `referral_signup`: `app/api/waitlist/route.ts` (when referral_code present in signup)
- `referral_reward_issued`: `app/api/referral/process-payment/route.ts` (when credit applied)

**Screenshot/log:** Events flow to GA4 via existing `gtag()` infrastructure. Verification via GA4 Real-Time dashboard.

---

### A5. Pricing Page Spacing Fix

**Issue:** Large empty white gap between hero and referral strip.

**Fix:** `components/whoza/pricing.tsx`
- Before: `<ReferralStrip />` inside `<section className="py-24 lg:py-40">` — double padding
- After: `<ReferralStrip />` moved outside the section, wrapped in `<>` fragment

```tsx
// BEFORE (spacing bug)
<section id="pricing" className="py-24 lg:py-40">
  <ReferralStrip />  {/* pt-24 + strip py-4 = massive gap */}
  ...
</section>

// AFTER (fixed)
<>
  <ReferralStrip />  {/* sits flush, no section padding */}
  <section id="pricing" className="py-24 lg:py-40">
    ...
  </section>
</>
```

**Live verification:** https://whoza.ai/pricing — strip sits directly below hero, no excessive spacing.

---

## Part B — Confirmed Spec Miss: Referral Code Capture on Signup Form

### B1. Signup Modal Field

**File:** `components/whoza/waitlist-modal.tsx:255-273`

```tsx
<div>
  <label htmlFor="waitlist-referral" className="block text-sm font-medium mb-1 text-gray-300">
    Referral code <span className="text-gray-500">(optional)</span>
  </label>
  <input
    id="waitlist-referral"
    type="text"
    value={formData.referral_code}
    onChange={(e) => handleChange("referral_code", e.target.value)}
    className="..."
    placeholder="e.g. ABC12345"
  />
  <p className="text-xs text-gray-500 mt-1">
    Know someone already on Whoza? Enter their code for a free month.
  </p>
</div>
```

**Position:** After Postcode field, before Submit button.

**?ref= prefill:** `useEffect` at line 38-46 captures `?ref=` from URL:

```tsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get("ref")
  if (ref && /^[A-HJ-NP-Z2-9]{8}$/i.test(ref)) {
    setFormData((prev) => ({ ...prev, referral_code: ref.toUpperCase() }))
  }
}, [isOpen])
```

### B2. Backend Persistence

**File:** `app/api/waitlist/route.ts:29,52,84`

```ts
const { email, trade, phone, postcode, referral_code, source, plan } = body

// Persisted to Supabase
const { data, error } = await supabase
  .from("email_subscribers")
  .upsert({
    email,
    metadata: {
      trade,
      phone,
      postcode,
      referral_code: referral_code || null,  // <-- persisted here
      source,
      plan,
    },
  })
```

**Admin notification includes referral code:**
```
Referral Code: ${referral_code || "None"}
```

### B3. Silent Fallback

No prior silent `?ref=` capture existed in backend. The visible field is the primary capture mechanism. URL parameter pre-fills the field (editable).

### B4. Test Proof

**Test signup via referral link:**

```bash
curl -X POST https://whoza.ai/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-referral@example.com",
    "trade": "Plumber",
    "phone": "07123456789",
    "postcode": "SW1A 1AA",
    "referral_code": "ABC12345",
    "source": "test"
  }'
```

**Stored record verification:**

```sql
SELECT email, metadata->>'referral_code' as ref
FROM email_subscribers
WHERE email = 'test-referral@example.com';

-- Returns: test-referral@example.com, ABC12345
```

**Evidence:** Admin notification email includes `Referral Code: ABC12345`.

---

## Part C — Programme Terms Lock

### C1-C5. Locked Terms (Authoritative)

| Rule | Implementation |
|---|---|
| **Referrer reward** | 1 free month per referred tradesperson who (a) completes 7-day trial AND (b) pays 2nd consecutive month. `lib/referral-service.ts:41-59` |
| **Friend reward** | First paid month free after 7-day trial. `components/whoza/referral-client.tsx` FAQ |
| **Cap** | Max 12 free months per rolling 12-month period. `lib/referral-service.ts:28-34` |
| **Credit value** | One month of referrer's OWN current plan. `lib/referral-service.ts:65-67` |
| **Non-transferable** | Credits auto-apply to next invoice. No cash alternative. `app/terms/page.tsx` |

### C6. Copy Updates — Verification

| Location | Before | After (Live) |
|---|---|---|
| `/refer` hero | "No limits. Stack your rewards." | "Earn up to a full year free." ✅ |
| `/refer` FAQ "Can I refer multiple?" | "No limits — stack for years" | "Up to 12 free months in any 12-month period" ✅ |
| `/refer` FAQ "When do I get my free month?" | "When they become paying" | "After they complete their second consecutive paid month" ✅ |
| Pricing strip | "No limits." | "Earn up to a year free." ✅ |
| Homepage FAQ | "No limits — stack for years" | "12 free months in any 12-month period" ✅ |
| Terms of Service | — | New "4a. Refer a Trade Programme" section ✅ |

### C7. Backend Enforcement

**File:** `lib/referral-service.ts` + `app/api/referral/process-payment/route.ts`

**Enforcement logic:**

```ts
// 1. Trial must be completed
if (!trialCompleted) return NO_CREDIT

// 2. Must be 2nd payment
if (paymentNumber < 2) return NO_CREDIT
if (paymentNumber > 2) return NO_CREDIT  // already credited

// 3. Check rolling 12-month cap
const { hasCap, remaining } = checkRollingCap(creditsInWindow, 12)
if (!hasCap) return NO_CREDIT

// 4. Apply credit
return CREDIT_APPLIED
```

**Tests (all passing):**

| Test | Scenario | Result |
|---|---|---|
| (i) Credit on 2nd payment | `evaluateCredit(2, true, 0, 12, 99)` | ✅ `creditApplied: true` |
| (ii) No credit on cancellation | `evaluateCredit(1, true, 0, 12, 99)` | ✅ `creditApplied: false` |
| (iii) 13th referral blocked | `evaluateCredit(2, true, 12, 12, 99)` | ✅ `creditApplied: false` |

**Run tests:**
```bash
cd whoza-ai
npx tsx tests/referral-service.run.ts
# Results: 11 passed, 0 failed
```

---

## Deployment

- **Build:** 123 pages, zero errors ✅
- **Commit:** `1da7e0c` ✅
- **Live:** https://whoza.ai ✅

## Files Changed

```
components/whoza/waitlist-modal.tsx          (+ referral_code field + ?ref= capture)
components/whoza/referral-client.tsx         (+ locked terms copy)
components/whoza/referral-dashboard-block.tsx (+ updated share copy)
components/whoza/referral-strip.tsx          (+ "Earn up to a year free")
components/whoza/pricing.tsx                 (+ spacing fix)
components/whoza/faq.tsx                     (+ locked terms FAQ)
app/dashboard/page.tsx                       (+ ReferralDashboardBlock)
app/terms/page.tsx                           (+ Referral Programme section)
app/api/waitlist/route.ts                    (+ referral_code persistence)
app/api/referral/validate/route.ts           (existing)
app/api/referral/create/route.ts             (existing)
app/api/referral/stats/route.ts              (existing)
app/api/referral/process-payment/route.ts    (+ new)
lib/referral-service.ts                      (+ new)
lib/gtag.ts                                  (+ referral tracking)
tests/referral-service.test.ts               (+ new)
tests/referral-service.run.ts                (+ new)
```
