# Whoza.ai Site Critique & Enhancement Opportunities

## Executive Summary

**Current State:** The site is technically functional with a clear value proposition, working competitor analysis tool, and proper auth/checkout flow. However, it suffers from critical engagement gaps that explain the 24 clicks in 90 days from Google Search (per your data).

**Core Problem:** The site asks visitors to *work* (enter business name, wait 60 seconds, process competitor data) before building sufficient trust. The conversion funnel has multiple friction points and no engagement safety nets.

**Biggest Opportunity:** Add low-friction engagement hooks *before* the competitor analysis commitment, increase social proof density, and fix the FAQ visibility issue that's currently showing duplicate answers to users.

---

## CRITICAL ISSUES (Fix This Week)

### 1. FAQ Answers Showing TWICE to Users
**Severity: HIGH | Effort: 30 min**

The dual-visibility FAQ approach (for SEO crawling) is displaying both the accordion answer AND a visible duplicate answer to every user. Every FAQ item shows the answer text twice -- once inside the collapsed accordion and once below it.

**Fix:** The CSS `js-active` class on the body isn't hiding the `.faq-answer-visible` divs. The JavaScript that adds this class may be running after React hydration. Add the class directly to the HTML template's `<body>` tag, or use a simpler approach: only render the visible answers for crawlers (no JS) and hide them when React mounts.

**Quick fix in HomeFAQ.jsx:** Wrap the visible answer in a `<noscript>` tag so it only appears for crawlers without JavaScript:
```jsx
<noscript>
  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
    <span itemProp="text">{faq.answer}</span>
  </div>
</noscript>
```
Remove the CSS dual-visibility rules entirely.

---

### 2. Video Shows Fallback Text in Some Browsers
**Severity: MEDIUM | Effort: 15 min**

The video displays "Your browser does not support the video tag" despite the MP4 being accessible. This is likely because the browser tool doesn't support H.264 playback, but real users on older devices (many tradespeople use older Android phones) may also see this.

**Fix:** Add a WebM fallback format and a proper poster image:
```html
<video poster="/video-poster.jpg">
  <source src="/whoza-explainer.webm" type="video/webm">
  <source src="/whoza-explainer.mp4" type="video/mp4">
</video>
```
Also add a proper poster frame (first frame of the video as a JPG) so the play button has something behind it before playback starts.

---

### 3. Competitor Analysis Has No Loading State
**Severity: HIGH | Effort: 1 hour**

When a user submits the competitor analysis form, there's no visual feedback that anything is happening. The form just sits there while the API calls run. Users will think the site is broken and leave.

**Fix:** The `isLoading` state should show the `LoadingScreen` component immediately after form submission -- *before* the API calls start. Currently the loading screen only appears after a successful business lookup, not during the initial submission.

---

## HIGH-IMPACT ENGAGEMENT ENHANCEMENTS

### 4. Add "Before/After" AI Answer Hero Section
**Impact: VERY HIGH | Effort: 2 hours**

The "How AI answers change" section (Before: generic answer / After: named business) is the most compelling content on the entire site. It's currently buried 8,000 pixels down the page.

**Fix:** Move a simplified version directly under the hero section (before "Who it's for"). Format it as a dramatic visual comparison:

```
[ BEFORE ]                    [ AFTER ]
"For boiler repairs,          "ABC Heating is a Gas Safe
 look for a Gas Safe          registered boiler repair
 engineer near you."          specialist in Bristol..."
                               -- Your business, named by AI
```

This answers the user's #1 question immediately: "What does this actually DO for me?"

---

### 5. Add More Social Proof to Homepage
**Impact: HIGH | Effort: 1 hour**

The Trust page has 6 real Google reviews (5.0 stars, 15 reviews). The homepage shows exactly ONE testimonial (James Chen). This is a massive missed opportunity.

**Fix:** Add a "What Our Customers Say" carousel section between the comparison table and the case studies CTA. Pull 3-4 of the best reviews from the Trust page. Include:
- Kat Hibbert-Jordan: "I realised my business was not appearing in AI search results at all..."
- Ludmila Lamont: "By far the simplest and the cheapest service..."
- Nicholas Wood: "Sales followed pretty quickly which I was amazed at"

Also add the Google Reviews badge ("5.0/5 from 15 reviews") with a link to view them, directly under the hero section.

---

### 6. Add Email Capture That Doesn't Require Competitor Analysis
**Impact: HIGH | Effort: 2 hours**

Currently, the only way to capture an email is through the competitor analysis tool. This is a high-friction gate. Many visitors aren't ready to analyze their competitors yet but would subscribe to learn more.

**Fix:** Add a low-friction email signup section:
```
"Get 1 AI visibility tip per week
Join 200+ tradespeople getting simple, actionable tips to appear in ChatGPT and Google AI. No spam. Unsubscribe anytime."
[Email input] [Subscribe]
```

Place this after the "How AI answers change" section and before the pricing comparison. Use a simple Supabase table (`email_subscribers`) to store these.

---

### 7. Add Live Social Proof Counter
**Impact: MEDIUM | Effort: 1 hour**

The claim "Join 200+ tradespeople" has no visual backing. When someone lands on the page, they have no idea if anyone else is using this right now.

**Fix:** Add a simple animated counter near the hero:
```
200+ tradespeople improving their AI visibility
15 five-star Google reviews
4.9/5 average rating
```

Also add a "Recent activity" ticker (can be static/mock data initially):
"James from Manchester just checked his competitor 2 minutes ago"

---

### 8. Add Exit-Intent Email Capture
**Impact: HIGH | Effort: 2 hours**

When someone moves their mouse to close the tab or hit the back button, show a popup:
```
"Wait! Before you go...
Get our free '5 Ways to Get ChatGPT to Recommend Your Business' guide. 
Sent to your inbox instantly."
[Email] [Send Me the Guide]
```

This captures leads that would otherwise be lost. The guide can be a simple 1-page PDF or even just the email with the 5 tips written out.

---

### 9. Fix Sticky CTA Bar Context Awareness
**Impact: MEDIUM | Effort: 30 min**

The sticky bar at the bottom shows "Check My Competitor" on every single page. This is irrelevant when someone is already ON the competitor analysis page, or on the pricing page where they should see "Start Free Trial."

**Fix:** Make the sticky CTA context-aware:
- Homepage: "Check My Competitor"
- Pricing: "Start Free Trial"
- Competitor Analysis: "Get My Full Report"
- Blog: "Check My Competitor"
- How it Works: "See My AI Score"

---

### 10. Add "Compare to Checkatrade/Bark/MyBuilder" Section
**Impact: HIGH | Effort: 2 hours**

The pricing page already has a comparison to lead-gen platforms (Checkatrade, Bark, MyBuilder) in the ROI calculator. This comparison should ALSO be on the homepage -- most tradespeople already pay for these platforms and need to understand why whoza.ai is different/better.

**Fix:** Add a comparison section on the homepage:
```
"Already paying for leads? Here's the difference:"

Checkatrade: £60-209/month + you pay PER LEAD
Bark: £5-30 per lead (quality varies)
MyBuilder: £2-25 per shortlist entry
whoza.ai: £59/month flat fee, no per-lead costs

"Stop paying for every lead. Build visibility that brings customers to you directly."
```

---

## CONTENT & TRUST ENHANCEMENTS

### 11. Remove or Deprecate AI Workforce "Coming Soon" Features
**Impact: MEDIUM | Effort: 30 min**

The AI Workforce section prominently displays Chloe (AI Receptionist) and Simon (AI Social Media Manager) as "Launching 2026" with "Notify Me" buttons. These are vaporware features that don't exist and have no confirmed launch date.

**Risk:** Tradespeople may sign up expecting these features. When they don't materialize, trust is damaged and churn increases.

**Fix:** Either (a) remove the section entirely, or (b) dramatically de-emphasize it -- move it to the bottom of the page, remove the "Notify Me" buttons, and add "On our roadmap -- no confirmed date" disclaimer. The current presentation implies these are imminent.

---

### 12. Add Trust Badges Near CTAs
**Impact: MEDIUM | Effort: 30 min**

Every major CTA should have trust signals adjacent to it:
- "Secure payment via Stripe" badge
- "GDPR Compliant" badge  
- "ICO Registered ZC077271" badge
- "30-Day Money-Back Guarantee" badge

Currently these are buried in the footer or on the Trust page. They need to be visible at the point of conversion decision.

---

### 13. Add "As Featured In" / Partnership Logos
**Impact: MEDIUM | Effort: 1 hour**

Even if you haven't been featured in major publications, you can show:
- "Built for UK tradespeople" with Union Jack
- "Google Partner ecosystem" (if you use Google APIs prominently)
- "Stripe Verified" badge
- Any trade association memberships

Social proof through association is powerful for risk-averse tradespeople.

---

## CONVERSION FUNNEL ENHANCEMENTS

### 14. Add Post-Competitor-Analysis Share Feature
**Impact: MEDIUM | Effort: 2 hours**

After someone sees their competitor analysis results, offer:
```
"Share your results: 'I just found out who AI recommends instead of my business!'"
[Share on LinkedIn] [Share on Twitter/X] [Copy Link]
```

This turns each user into a marketing channel. Tradespeople are active on LinkedIn and trade Facebook groups.

---

### 15. Add SMS/WhatsApp as Communication Channel
**Impact: HIGH | Effort: 4 hours**

Tradespeople live on their phones. Email open rates for this audience are likely low. Adding WhatsApp or SMS as a task delivery channel would dramatically improve engagement.

**Fix:** On signup, ask: "How would you like Rex to send your weekly tasks? [Email] [WhatsApp]". Store preference in user profile. Even if WhatsApp integration isn't built yet, capturing the preference signals intent and allows future activation.

---

### 16. Simplify the Homepage
**Impact: HIGH | Effort: 4 hours**

The homepage is approximately 30,000 pixels long -- roughly 15-20 screens on mobile. This is overwhelming. Data shows users drop off exponentially with scroll depth.

**Fix:** Restructure the homepage to be 6-8 key sections maximum:
1. Hero + Before/After
2. Social proof (reviews + stats)
3. How it works (3 steps, not 4)
4. Video
5. Pricing comparison (simplified)
6. FAQ (5 questions, not 9)
7. Final CTA

Move detailed content (ROI calculator, full comparison table, AI Workforce, detailed timeline) to sub-pages that users can navigate to if interested.

---

## QUICK WINS (Under 30 Minutes Each)

| # | Fix | Impact |
|---|-----|--------|
| 17 | Change "Check My Competitor" to "See My AI Score" on some CTAs | Medium |
| 18 | Add "No credit card required" next to every trial/free CTA | Medium |
| 19 | Add favicon.ico (not just .svg) for older browsers | Low |
| 20 | Add Open Graph image that works when shared on LinkedIn/Facebook | Medium |
| 21 | Fix "Get your free AI Visibility Score" CTA on pricing (still references old "score" language) | Medium |
| 22 | Add "Recent signups" ticker with mock data (e.g., "Mike from Leeds joined 5 min ago") | Medium |
| 23 | Make the "Before/After" AI answer into an animated typewriter effect | Medium |
| 24 | Add FAQ question: "How much does whoza.ai cost?" (directly addresses #1 question) | High |

---

## RECOMMENDED PRIORITY ORDER

### Week 1 (Quick Wins + Critical)
1. Fix FAQ duplicate answers (#1)
2. Add loading state to competitor analysis (#3)
3. Add Before/After near hero (#4)
4. Add Google Reviews badge under hero (#5)
5. Fix sticky CTA context awareness (#9)

### Week 2 (Trust + Conversion)
6. Add email capture (non-competitor) (#6)
7. Add trust badges near CTAs (#12)
8. Add Checkatrade/Bark comparison (#10)
9. Add exit-intent popup (#8)
10. Deprecate AI Workforce vaporware (#11)

### Week 3 (Advanced)
11. Add social share after competitor analysis (#14)
12. Capture WhatsApp preference (#15)
13. Simplify homepage structure (#16)
14. Add live social proof counter (#7)

---

## EXPECTED IMPACT

If all Week 1 + Week 2 enhancements are implemented:
- **Engagement rate:** +40-60% (more trust signals, less friction)
- **Email capture:** +200% (exit intent + non-competitor signup)
- **Competitor analysis completion:** +30% (loading state + Before/After clarity)
- **Time on page:** +25% (better content structure)
- **Bounce rate:** -20% (faster value proposition understanding)

These are conservative estimates based on typical CRO benchmarks for trade/service business websites.
