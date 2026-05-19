# whoza.ai Action Plan vs Live Site — Audit Report
**Date:** 2026-05-20
**Live Site:** https://whoza.ai
**Action Plan:** Whoza.ai_Action_Plan_Hierarchy_Fix.docx

---

## SUMMARY: NONE of the recommended changes are present on the live site.

The live site is in its **pre-edit state** (commit 8a70249 + infrastructure fixes only). All content remains exactly as the action plan critiqued. Every issue identified in the audit document is **still present** on the live site.

---

## FIX 1: Restructure the Hierarchy — ❌ NOT IMPLEMENTED

### 1.1 Hero: One Dominant Conversion Path
**Recommendation:** Reduce hero to 4 elements: H1 + subhead, one-line body copy, single CTA, WhatsApp mockup.

**Live site status:**
- ✅ H1 + subhead present: "While you work, we book." + "The AI call handler..."
- ✅ Body paragraph present: "No apps. No Contract. Just more work." (+ 2 more sentences)
- ✅ **6 checkmark pills STILL PRESENT** — "UK Pilot Programme — 50 tradespeople only", "7-day free trial", "30-day money-back guarantee", "Dru personally sets you up", "No credit card needed to join"
- ✅ **Dru personal card STILL PRESENT** — "Built by Dru McPherson, former trade business owner" + email
- ✅ **Pilot badge STILL PRESENT** — "UK Pilot Programme — Limited to 50 tradespeople" with green background + "Pilot filling up" counter
- ✅ **Secondary CTA STILL PRESENT** — "Read a sample call" (visible in hero area)
- ✅ WhatsApp mockup present

**Verdict:** ❌ Hero has 10+ competing elements. Zero simplification applied.

### 1.2 Visual Priority System
**Recommendation:** Reduce CTAs from 8+ to 3 strategic placements.

**Live site status — CTA count:**
1. "Try Katie Free for 7 Days" (hero primary CTA)
2. "Read a sample call" (hero secondary CTA)
3. "Start free trial" (after Lost Revenue Calculator)
4. "Watch the demo" (after Video Explainer)
5. "Start your free week" (after Typical Day section)
6. "Lock in pilot pricing" (after How It Works)
7. "Try Katie free" (after Meet the Team)
8. "Start your free trial" (after Testimonials)
9. "Chat with Us" (FAQ section)
10. Final CTA "Try Whoza free for 7 days" (footer)

**Verdict:** ❌ 10+ CTAs present. No reduction applied.

### 1.3 Pilot Badge Repositioning
**Recommendation:** Move pilot badge to sticky nav bar as subtle text.

**Live site status:**
- ✅ Pilot badge remains in hero with **green background** (accent color)
- ✅ "Pilot filling up" counter present
- ❌ **NOT moved to nav bar**

**Verdict:** ❌ Badge still competes with CTA using accent color.

---

## FIX 2: Eliminate Repetition — ❌ NOT IMPLEMENTED

### 2.1 Single-Appearance Rule
**Recommendation:** Each message appears exactly once.

**Live site status:**
| Message | Appearances on Live Site | Status |
|---------|------------------------|--------|
| "No apps. No contract. Just more work." | Hero body, footer | ❌ Repeated |
| "Works with your existing number" | Hero pills, How It Works, FAQ | ❌ Repeated (3x+) |
| "Dru personally sets you up" | Hero pills, Dru card, How It Works | ❌ Repeated (3x) |
| "30-day money-back guarantee" | Hero subtext, pills, FAQ | ❌ Repeated |
| "7-day free trial" | CTA buttons, FAQ, footer | ❌ Repeated |
| "No credit card required" | Hero subtext, pills, FAQ | ❌ Repeated |
| "More jobs every week" | Why Whoza Wins (x2), CTAs | ❌ Repeated |
| "Be the first to experience" | Onboarding section (x2) | ❌ Repeated |

**Verdict:** ❌ All messages still appear multiple times. Zero consolidation.

### 2.2 Consolidate Checkmark Pills
**Recommendation:** Reduce from 6 pills to 3 maximum: "No credit card required", "30-day money-back guarantee", "Live in 30 minutes".

**Live site status:**
- ✅ All 6 pills still present:
  1. "UK Pilot Programme — 50 tradespeople only"
  2. "7-day free trial when we go live"
  3. "30-day money-back guarantee"
  4. "Dru personally sets you up"
  5. "No credit card needed to join"

**Verdict:** ❌ 6 pills still present. No consolidation.

### 2.3 Trim Section-Level Repetition
**Recommendation:**
- Remove duplicate "Be the first to experience" line in onboarding
- Choose one closing line for "Why Whoza Wins" section
- Consolidate FAQ trade questions into one

**Live site status:**
- ✅ "Be the first to experience AI call handling for trades" appears **twice** in onboarding section
- ✅ "Most services answer calls. Whoza turns them into more work every week." AND "Others answer your calls. Whoza turns them into more jobs every week." — **both present** in comparison section
- ❌ Cannot verify FAQ consolidation without checking FAQ component source

**Verdict:** ❌ Section-level repetition still present.

---

## FIX 3: Tighten Accessibility Basics — ❌ NOT IMPLEMENTED

### 3.1 Contrast Verification
**Recommendation:** Verify WCAG AA contrast ratios (4.5:1 body, 3:1 large text).

**Live site status:**
- ❌ No evidence of contrast audit or fixes applied
- ❌ Green accent on dark backgrounds not verified
- ❌ Grey body text contrast unknown

**Verdict:** ❌ No accessibility contrast fixes visible.

### 3.2 Focus States
**Recommendation:** Visible focus states for all interactive elements (2px outline, high contrast).

**Live site status:**
- ❌ Cannot verify from static fetch — requires browser inspection
- ⚠️ CSS has `:focus-visible` rule with `box-shadow: var(--focus-ring-v9)` but implementation quality unknown

**Verdict:** ⚠️ Partial — focus CSS exists but quality unverified.

### 3.3 Mobile Scanability
**Recommendation:**
- Checkmark pills minimum 44px tap target
- Cookie banner reduced to 2 buttons
- Section dividers added
- No horizontal scroll from WhatsApp mockup

**Live site status:**
- ❌ Cannot verify pill tap targets from static fetch
- ❌ Cookie banner not visible in fetch (may be JS-triggered)
- ❌ No clear section dividers visible
- ❌ WhatsApp mockup width unknown

**Verdict:** ❌ No visible mobile scanability improvements.

### 3.4 Motion and Colour Independence
**Recommendation:** Add static fallbacks for animated elements.

**Live site status:**
- ✅ ONS live counter still uses ticking animation ("Since you opened this page, UK trades have missed 0 calls")
- ✅ Green pilot counter still relies on color for urgency
- ❌ No static fallbacks added

**Verdict:** ❌ No motion/color independence fixes applied.

---

## FIX 4: Better Sequencing — ❌ NOT IMPLEMENTED

### 4.1 Proposed Page Structure vs Live Site

| Section | Action Plan Position | Live Site Position | Match? |
|---------|---------------------|-------------------|--------|
| Hero (4 elements only) | 1 | 1 (10+ elements) | ❌ |
| Trust Signals (3 pills) | 2 | ❌ Not separate section | ❌ |
| How It Works | 3 | Present, but after Lost Revenue Calculator, Video, WhatsApp Delivery, Pre-Launch Proof | ❌ |
| Revenue Team (5-stage) | 4 | Present (How Whoza Works 4-phase) | ⚠️ Partial |
| Live Metrics | 5 | Present (ONS counter in hero, Stats Band lower down) | ❌ |
| Meet the Team | 6 | Present (after How It Works + Trial) | ❌ Wrong position |
| Why Whoza Wins | 7 | Present (after Testimonials) | ❌ Wrong position |
| Pricing | 8 | Present (after Comparison Table) | ❌ Wrong position |
| Testimonials | 9 | Present (before Comparison Table) | ❌ Wrong position |
| Support (FAQ) | 10 | Present (after Pricing) | ❌ Wrong position |

**Verdict:** ❌ Page sequencing is completely different from the proposed structure.

### 4.2 Key Principles Check
| Principle | Live Site Status |
|-----------|-----------------|
| One CTA per viewport | ❌ Multiple CTAs compete |
| Show, then tell | ⚠️ WhatsApp mockup early, but feature lists also early |
| Trust builds progressively | ❌ Dru card in hero (too early) |
| Urgency comes last | ❌ Pilot badge in hero (too early) |
| Support is soft close | ❌ FAQ interrupts main flow |

**Verdict:** ❌ None of the sequencing principles applied.

---

## DETAILED CHECK: SPECIFIC ELEMENTS

### Element: Hero Section
**Action Plan:** "Headline > One-line value prop > Single CTA > WhatsApp visual. Four elements."

**Live Site:**
1. H1: "While you work, we book."
2. Subhead: "The AI call handler and Revenue Team built for UK trades..."
3. Body: "No apps. No Contract. Just more work." (+ 2 sentences)
4. Pilot badge: "UK Pilot Programme — Limited to 50 tradespeople" (green)
5. CTA subtext: "No credit card required · 30-day money-back guarantee"
6. **6 checkmark pills** (dense visual block)
7. **Dru personal card** with photo + email
8. **WhatsApp mockup**
9. **Secondary CTA** "Read a sample call"
10. **Primary CTA** "Try Katie Free for 7 Days"

**Count: 10+ elements** ❌ Target was 4.

### Element: "Why Whoza Wins" Section
**Action Plan:** Choose ONE closing line. Remove duplicate.

**Live Site:**
- Header: "From Call to More Work — Every Week"
- Subhead: "Most services answer calls. Whoza turns them into more work every week."
- Comparison table (present)
- Footer line: "Others answer your calls. Whoza turns them into more jobs every week."

**Verdict:** ❌ Both lines still present. No consolidation.

### Element: Onboarding Section
**Action Plan:** Remove duplicate "Be the first to experience" line.

**Live Site:**
- "Be the first to experience AI call handling for trades."
- "See how AI call handling works for your trade."
- "Lock in pilot pricing"
- "Be the first to experience AI call handling for trades." (REPEATED)

**Verdict:** ❌ Duplicate still present.

### Element: Pricing Page Linkage
**Action Plan:** Pilot counter should appear in pricing, not hero.

**Live Site:**
- Pilot badge in hero with green background
- Pricing section shows "30-day money-back guarantee on all plans"
- "Pricing shown is for our full launch. Pilot users will lock in introductory rates."

**Verdict:** ❌ Pilot counter still in hero.

---

## CONCLUSION

**Status: 0% of action plan changes implemented.**

The live site is in its **original pre-audit state** (commit 8a70249). Every issue identified in the action plan is still present:

- ❌ Hero has 10+ competing elements (target: 4)
- ❌ 6 checkmark pills overwhelm the CTA (target: 3)
- ❌ Dru card competes with conversion in hero (target: move to trust section)
- ❌ Pilot badge uses accent color, draws eye from CTA (target: move to nav)
- ❌ 10+ CTAs throughout page (target: 3 strategic placements)
- ❌ Messages repeated 3-5 times each (target: single appearance)
- ❌ Section-level repetition unaddressed
- ❌ Page sequencing follows original order, not proposed structure
- ❌ Accessibility basics not tightened
- ❌ No contrast verification visible
- ❌ No motion independence fixes

**The action plan changes were part of the Batch A-E edits that were rolled back** during the infrastructure fix process (commits 2011c48, 619b3f5, 6f22326). They are **not present** on the current live site.

**To implement:** These changes would need to be re-applied on top of the current stable base (commit 8a70249 + infrastructure fixes).
