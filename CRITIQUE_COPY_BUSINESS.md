# whoza.ai Copy & Business Model Critique

**Audited:** 2026-04-29  
**URL:** https://whoza-ai-staging.netlify.app  
**Auditor:** Jarvis (Subagent)

---

## Executive Summary

The whoza.ai staging site has **strong value proposition clarity** and generally good copy, but suffers from **critical technical issues** (pages stuck on loading), **pricing inconsistency** across pages, and a **broken free analysis flow** that undermines the core business model. The homepage is the most polished page; deeper pages degrade in quality or fail to load entirely.

**Overall Grade: C+** — Good bones, but several 🔴 critical issues that would hurt conversion and confuse users.

---

## 🔴 Critical Issues

### 1. PRICING INCONSISTENCY: Homepage vs Pricing Page
**Severity:** Critical 🔴 | **Pages:** Homepage vs /pricing

- **Homepage** shows: Core £59/mo, Pro £99/mo, **Unlimited £149/mo**
- **Pricing page** shows: Core £59/mo, Pro £99/mo, **Growth £169/mo**, **Unlimited £249/mo**

**Problem:** Two different tier names and prices. A user sees "Unlimited £149" on the homepage, clicks "See Full Plans," and sees "Growth £169" and "Unlimited £249." This is a trust-destroying bait-and-switch.

**Suggested Rewrite:**
- Pick ONE tier structure and use it everywhere
- The pricing page has 4 tiers (Core/Pro/Growth/Unlimited) — if that's the real structure, the homepage MUST show all 4 or at least not contradict them
- If Growth is new, add it to the homepage preview section

---

### 2. BROKEN FREE ANALYSIS FLOW
**Severity:** Critical 🔴 | **Page:** /competitor-analysis

- The homepage hero and CTAs repeatedly promise: **"Check My Score — Free"** and **"No signup required · Results in under 2 minutes"**
- Clicking through to /competitor-analysis lands on a **sign-up form** requiring email + password
- There is NO free score tool visible — just a "Start Your Free Trial" form with 7-day trial messaging

**Problem:** This is false advertising. The core acquisition funnel (free analysis → paid plan) is broken. Users who came for the free score will bounce immediately.

**Suggested Rewrite:**
- Either build the actual free score tool, or
- Remove all "free score" / "no signup" claims from the homepage and change CTAs to "Start Free Trial"
- The FAQ asks "How long does the free analysis take?" — but there's no free analysis to take

---

### 3. STAGING SITE HAS BROKEN PAGES
**Severity:** Critical 🔴 | **Pages:** /start, /case-studies, /blog, /contact, /trust

- **/start** — stuck on "Loading..." spinner indefinitely
- **/case-studies, /blog, /contact, /trust** — appear to be empty SPAs with only navigation rendered

**Problem:** Users navigating to these pages from the homepage/footer will hit dead ends. This makes the business look unfinished/unprofessional.

**Suggested Fix:**
- Fix the React/SPA routing or hydration issues on staging before deploying to production
- If pages are intentionally minimal, add "Coming Soon" copy instead of blank loading states

---

### 4. FAQ REFERENCES NON-EXISTENT PLAN
**Severity:** Critical 🔴 | **Page:** Homepage FAQ section

- FAQ button asks: **"What's included in the £49/month plan?"**
- No plan on any page costs £49/month

**Problem:** This suggests a copy-paste error or outdated pricing that wasn't updated when prices changed to £59/£99/£149 (or £59/£99/£169/£249).

**Suggested Fix:**
- Update FAQ to match actual plans: "What's included in the Core £59/month plan?"
- Audit ALL pricing mentions across every page for consistency

---

## 🟡 Moderate Issues

### 5. TRIAL LENGTH INCONSISTENCY
**Severity:** Moderate 🟡 | **Pages:** Homepage vs /competitor-analysis vs /pricing

- **Homepage:** "14-day free trial on every plan"
- **Pricing page:** "14-day free trial" repeated on each plan
- **/competitor-analysis (sign-up page):** "7 days, all features, no credit card required" and "25 trial slots available this week"

**Problem:** Is it 7 days or 14 days? Is there limited availability or not? Mixed messages create hesitation.

**Suggested Fix:**
- Standardize on ONE trial length everywhere
- Remove scarcity tactics ("25 slots") unless they are real and dynamically updated
- The sign-up page should match the pricing page messaging

---

### 6. VALUE PROPOSITION: "AI Visibility" IS CLEAR, BUT EXPECTATION GAP EXISTS
**Severity:** Moderate 🟡 | **Page:** Homepage

**Strengths:**
- H1 is strong: "See How AI-Searchable Your Trade Business Is"
- The "70% of customers now ask AI for recommendations" stat is specific and compelling
- "Before/After" comparison is clear

**Weakness:**
- The term "AI-Searchable" is coined — will tradespeople understand this instantly? Some may think it's about being found on Google (which is true but incomplete)
- No visual proof or screenshot of what the "AI Visibility Score" actually looks like in the hero section
- The subhead says "ChatGPT, Google AI, and Perplexity" — good specificity, but some tradespeople may not know what Perplexity is

**Suggested Rewrite:**
- Consider adding a micro-visual or badge: "Your Score: 72/100" mockup in the hero
- Test replacing "AI-Searchable" with "Found by AI" or "Recommended by AI" — more outcome-focused
- For tradespeople less tech-savvy, maybe: "When customers ask ChatGPT for a plumber near me, will it recommend YOU?"

---

### 7. CTA MISMATCH ON HOMEPAGE
**Severity:** Moderate 🟡 | **Page:** Homepage

- Hero CTA: "Check My Score — Free" (goes to broken /competitor-analysis)
- Secondary CTA: "See Pricing" (works)
- Floating bottom CTA: "Check My Score — Free" (repeats the broken promise)

**Suggested Rewrite:**
- If free score is broken, change hero CTA to: "Start Free Trial — 14 Days" → /start (once /start works)
- Or: "See How It Works" → /how-it-works (this page loads correctly)
- The "See Pricing" CTA is actually the safest current option

---

### 8. TESTIMONIALS: ONLY ONE VISIBLE, LIMITED CREDIBILITY
**Severity:** Moderate 🟡 | **Page:** Homepage

- Only one testimonial visible at a time (Mike T., Electrician — Birmingham)
- No company logo, photo, or verification badge
- The quote is generic: "I get one task each week by email..."

**Weakness:**
- "Mike T." — first name + initial feels anonymous/potentially fabricated
- No before/after metric (e.g., "went from score 34 to 78")
- Only one visible despite having 4 testimonial buttons

**Suggested Rewrite:**
- Add a real photo or business logo
- Include a specific metric: "Score went from 34 to 78 in 3 months. Now I get 4 more calls per week."
- Consider showing 2-3 testimonials at once instead of carousel (carousels have low engagement)

---

### 9. COMPETITOR POSITIONING TABLE HAS WEAK DIFFERENTIATION
**Severity:** Moderate 🟡 | **Page:** /pricing

The comparison table pits whoza.ai against Trade Receptionist and BrightLocal:
- Trade Receptionist: £29-119/mo — actually CHEAPER than whoza.ai Core
- BrightLocal: $39-59/mo/location — priced per location, which is worse for multi-location

**Problem:**
- whoza.ai is NOT the cheapest option. The table shows Trade Receptionist starts at £29/mo vs whoza.ai Core at £59/mo
- The comparison doesn't explain WHY whoza.ai is worth 2x the price
- "AI visibility score" is a checkmark for whoza.ai but X for competitors — but if the user doesn't understand what that means, it's not compelling

**Suggested Rewrite:**
- Add a row: "What you get" that explains the value difference
- Trade Receptionist = call answering only, BrightLocal = directory management only, whoza.ai = both + AI visibility
- Consider a positioning statement above the table: "Trade Receptionist answers calls. BrightLocal manages listings. whoza.ai makes sure AI recommends you in the first place — then answers the calls too."

---

### 10. HOW IT WORKS PAGE: STRONG, BUT OVERCOMPLICATES WITH "REX"
**Severity:** Moderate 🟡 | **Page:** /how-it-works

**Strengths:**
- 4-step process is clear
- Time commitments are specific (10-15 min/week)
- "Why tasks instead of automation?" section builds trust well

**Weakness:**
- "Rex" is introduced without explanation: "Rex handles your AI visibility..." "Rex studies your situation..." 
- Is Rex a person? A chatbot? The AI? Tradespeople may be confused
- "Entity Confidence Engineering™" appears at the bottom — trademarked jargon that tradespeople won't understand
- "ECE pillars: Clarity, Consensus, Answerability, Safety, Context" — 5 pillars are well-explained, but the acronym "ECE" is unnecessary cognitive load

**Suggested Rewrite:**
- Introduce Rex explicitly: "Rex is your AI assistant..."
- Remove "Entity Confidence Engineering™" or rephrase: "Powered by our proprietary AI visibility technology"
- Drop the acronym, keep the 5 pillars with their plain-English explanations

---

## 🟢 Minor Issues

### 11. TRUST SIGNALS ARE PRESENT BUT SCATTERED
**Severity:** Minor 🟢 | **Pages:** Homepage, /pricing

**Present:**
- "ICO Registered · GDPR Compliant" in footer
- "2,847 tradespeople checked this week" (social proof metric)
- "4.9/5 from 128 tradespeople" on pricing page
- "94% keep their plan after trial" on pricing page
- "£2,400/yr average revenue recovered" on pricing page

**Missing:**
- No security badges (SSL, payment security)
- No "As Seen In" or press mentions
- No money-back guarantee (just "cancel anytime")
- No photo/video testimonials
- No specific "before/after" case study with metrics

**Suggested Additions:**
- Add a guarantee: "If you don't see your AI visibility score improve in 30 days, we'll refund your first month"
- Add payment security badges near CTAs
- One strong case study with before/after metrics would be more powerful than 4 generic testimonials

---

### 12. HOMEPAGE HERO: "2,847 TRADESPEOPLE CHECKED THIS WEEK" IS REPEATED
**Severity:** Minor 🟢 | **Page:** Homepage

- The stat "2,847 tradespeople checked this week" appears twice in the hero section (once below CTA, once after the trade-type icons)
- This feels like a layout bug or copy-paste error

**Suggested Fix:**
- Remove the duplicate
- Consider making the number dynamic if possible, or update it periodically

---

### 13. FOOTER NAVIGATION: "ABOUT" LINKS TO /TRUST
**Severity:** Minor 🟢 | **Page:** Footer

- Footer has "About" → /trust
- Header has "About" → /how-it-works
- Two different "About" destinations depending on where you click

**Suggested Fix:**
- Standardize: make both point to the same page, or rename one to "How It Works" and the other to "About Us" or "Trust & Security"

---

### 14. VOICE AGENT CLAIMS: COMPREHENSIVE BUT UNVERIFIED
**Severity:** Minor 🟢 | **Pages:** Homepage, /pricing

The copy claims the AI voice agent includes:
- "24/7 call answering, WhatsApp summaries, calendar booking, emergency patch-through, and spam filtering — all included"

**Question:**
- Is this all actually working in the product? The staging site itself is broken in places
- If any of these features aren't live yet, the copy is creating liability

**Suggested Fix:**
- Audit which features are actually shipped
- Add "Beta" or "Coming Soon" tags to features not yet live
- The comprehensive list is a strength IF it's real

---

## Business Model Coherence Assessment

### Free → Paid Funnel: **BROKEN** 🔴

The intended funnel appears to be:
1. Free AI visibility score → captures lead
2. Show competitors → creates urgency
3. Offer action plan → demonstrates value
4. Convert to paid plan

**Current reality:**
- Step 1 doesn't exist (no free score tool)
- The /competitor-analysis page is just a sign-up form
- Users are asked to commit to a trial before seeing ANY value

**Recommendation:**
- The free score tool is the most important conversion asset. Without it, the business model is just "sign up for a trial" — which is a much harder sell.
- Either build the free score (even a simplified version) OR restructure the funnel to lead with the trial but offer more upfront value (e.g., "Enter your business name and we'll show you 3 competitors instantly")

### Pricing Progression: **GOOD** 🟢

The 4-tier structure (Core → Pro → Growth → Unlimited) has logical progression:
- Core: Solo tradesperson, basic needs
- Pro: More minutes, more directories, most popular
- Growth: Multi-location, teams
- Unlimited: Agencies, white-label

The jump from Pro (£99) to Growth (£169) is steep — that's a 70% increase. The "Most Popular" badge on Pro is well-placed to anchor users there.

**Suggestion:**
- Add a "What's right for me?" wizard or simple quiz: "How many locations? How many calls per week?" → recommends a plan

---

## Copy Consistency Scorecard

| Term | Homepage | Pricing | How It Works | Competitor Analysis | Notes |
|------|----------|---------|--------------|---------------------|-------|
| AI Visibility Score | ✅ | ✅ | ✅ | N/A | Consistent |
| Voice Agent | ✅ | ✅ | N/A | ✅ | Consistent |
| WhatsApp Summaries | ✅ | ✅ | N/A | ✅ | Consistent |
| Pricing | £59/99/149 | £59/99/169/249 | N/A | N/A | **🔴 MISMATCH** |
| Free Trial Length | 14 days | 14 days | N/A | 7 days | **🟡 MISMATCH** |
| "No signup" claim | ✅ (hero) | N/A | N/A | ❌ (requires signup) | **🔴 FALSE** |
| "Rex" | N/A | N/A | ✅ | N/A | Introduced late |
| "Entity Confidence Engineering" | N/A | N/A | ✅ | N/A | Jargon risk |

---

## Priority Action Items

### Immediate (Before Any Traffic)
1. 🔴 Fix /start page loading issue
2. 🔴 Fix pricing consistency across all pages
3. 🔴 Fix or remove "free score" claims (build the tool OR change the copy)
4. 🔴 Update FAQ to match actual pricing

### Short Term (Before Paid Ads)
5. 🟡 Standardize trial length (7 vs 14 days)
6. 🟡 Fix /competitor-analysis to either deliver free value OR honestly be a trial signup page
7. 🟡 Add real testimonials with photos and metrics
8. 🟡 Build out /case-studies with 1-2 strong before/after stories

### Medium Term (Optimization)
9. 🟢 Add money-back guarantee
10. 🟢 Create plan recommendation quiz
11. 🟢 Add security/payment trust badges
12. 🟢 A/B test hero headline: "AI-Searchable" vs "Found by AI" vs "Recommended by ChatGPT"

---

## Overall Verdict

**The whoza.ai staging site has a compelling concept and generally strong copy on the homepage.** The problem-solution framing is clear, the specificity of "ChatGPT, Google AI, and Perplexity" is excellent, and the pricing page comparison table is a smart competitive move.

**However, the site currently has too many broken promises and technical issues to convert well.** The pricing inconsistency alone would cause significant drop-off, and the missing free score tool undermines the entire top-of-funnel strategy.

**Fix the critical issues, and this becomes a solid B+ site. Leave them, and it's a C at best.**

---

*End of Audit*
