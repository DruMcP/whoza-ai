# whoza.ai Marketing Automation Blueprint
**Date:** 2026-04-28
**Status:** Proposed execution plan
**Goal:** Automate 80% of marketing activity for AI Voice + AI Visibility bundle

---

## Executive Summary

We can automate most of the marketing funnel using our existing stack (Supabase, Stripe, Resend, Netlify, Trillet webhooks) plus low-cost third-party tools. The key insight: **tradespeople respond to practical proof, not marketing fluff.** Every automation must deliver tangible value (a saved call, a booking, a ranking improvement) — not just a sales pitch.

**Automation budget:** £200–400/mo (tools + ad spend) during pilot phase.

---

## The Automated Marketing Funnel

### Stage 1: Lead Generation (Automated Inbound)

#### 1A. SEO Content Engine (Fully Automated)

**What:** Publish 3–5 blog posts per week targeting trade + location + pain point keywords.

**Automation stack:**
- **Content generation:** Claude/GPT-4 via API → drafts posts
- **CMS:** whoza.ai blog (already built) → auto-publish via Netlify build hook
- **Keyword source:** Ahrefs API or manual list of 500+ target keywords
- **Schedule:** Supabase cron job triggers generation 3×/week

**Content templates (rotate):**
- "How [Trade] in [City] Can Stop Missing Calls" (location + trade)
- "£X Lost to Voicemail: The Real Cost for [Trade]" (calculator + trade)
- "[Trade] vs AI Receptionist: 30-Day Experiment" (comparison)
- "Top 10 [Trade] in [City]" (directory-style, drives engagement)

**Output:** 150 posts in 12 months. Each targets a specific long-tail keyword. Estimated organic traffic: 500–2,000 visits/mo within 6 months.

**Cost:** £0 (use existing OpenAI credits) + 2 hours/week review.

---

#### 1B. Trade-Specific Landing Pages (Auto-Generated)

**What:** Every trade + city combination gets a unique landing page.

**Already built:** 20 trade pages + 32 city pages = 52 pages live.

**Automation:**
- **Template:** React component with variable injection
- **Data source:** Supabase table of trades, cities, stats
- **Build:** Static generation at build time (Netlify)
- **Schedule:** Monthly batch build adding new cities/trades

**Next step:** Add dynamic content injection via edge functions:
- Live call stats ("whoza.ai answered 1,247 calls for plumbers this week")
- Dynamic testimonial rotation
- Local weather + trade context ("It's raining in Manchester — roofers are busy")

**Cost:** £0 (existing infrastructure).

---

#### 1C. Google Ads (Semi-Automated)

**What:** Run Google Search ads targeting "AI receptionist [trade]" and "call answering [city]".

**Automation:**
- **Campaign structure:** One campaign per trade type, one ad group per city
- **Ad copy:** Rotating 3 headlines + 2 descriptions via Google Ads responsive ads
- **Budget:** £15/day pilot (£450/mo)
- **Bidding:** Automated bidding (maximize conversions)
- **Landing page:** Dynamic whoza.ai page matching the keyword

**Keyword targets:**
- "AI phone answering plumber London"
- "virtual receptionist electrician Birmingham"
- "24/7 call answering builder Manchester"
- "missed calls costing me money"
- "best call answering service UK trades"

**Expected:** 15–30 clicks/day, 5–10% conversion to trial, 1–3 trial signups/day.

**Cost:** £450/mo ad spend + £0 (manage via Google Ads interface).

---

#### 1D. Facebook/Instagram Ads (Semi-Automated)

**What:** Run Meta ads targeting tradespeople by job title, interest, and location.

**Audience:**
- Job titles: "Plumber", "Electrician", "Builder", "Self-employed"
- Interests: "Checkatrade", "Rated People", "Federation of Master Builders", "Toolstation", "Screwfix"
- Locations: UK cities with high trade density

**Ad creative (automated rotation):**
- **Video:** 15-sec clip of tradesperson under sink, phone ringing, AI answering, booking confirmed
- **Carousel:** "Before whoza.ai: 5 missed calls/day. After: 0 missed calls. £2,400/mo recovered."
- **Testimonial:** "I was losing jobs on roofs. Now Alex answers every call. — Mark, Roofer, Leeds"

**Budget:** £10/day pilot (£300/mo)

**Expected:** Lower intent than Google but higher volume. 50–100 clicks/day, 2–5% trial conversion.

**Cost:** £300/mo ad spend.

---

#### 1E. Retargeting (Automated)

**What:** Show ads to people who visited whoza.ai but didn't sign up for trial.

**Stack:**
- **Meta Pixel** on whoza.ai → tracks visitors
- **Google Ads Remarketing** → tracks visitors
- **Segments:**
  - Visited homepage, no action → "See how many calls you're missing" ad
  - Visited pricing, no trial → "14-day free trial. No card needed." ad
  - Started signup, didn't finish → "Finish your setup in 2 minutes" ad

**Budget:** £5/day (£150/mo)

**Expected:** 2–5× higher conversion than cold traffic. Cheap win.

---

### Stage 2: Lead Capture + Trial Signup (Automated)

#### 2A. Landing Page Conversion Flow

**Already built:** Homepage, pricing, trade pages, city pages.

**Automated enhancements:**
1. **Exit-intent popup:** "Before you go — calculate how much voicemail costs you" (lost revenue calculator)
2. **Sticky header CTA:** "Start Free Trial" follows scroll
3. **Social proof ticker:** "47 tradespeople started trials this week" (live counter via Supabase)
4. **Chat widget:** WhatsApp Business chat (manual response, but automated away message)

**Cost:** £0 (dev time only).

---

#### 2B. Trial Onboarding Automation

**Trigger:** User clicks "Start Free Trial" → Stripe creates subscription with 14-day trial.

**Automated sequence:**

| Time | Channel | Message | System |
|------|---------|---------|--------|
| **Instant** | Email | "Welcome to whoza.ai. Your trial starts now. Set up in 14 minutes." | Resend + Supabase trigger |
| **Instant** | SMS | "Your whoza.ai number: 020 XXXX XXXX. Forward calls with **21*[number]#" | Twilio + Supabase |
| **+2 hours** | Email | "Quick start guide: 3 steps to never miss a call" | Resend |
| **+24 hours** | Email | "How's your first day? Here's what to expect this week" | Resend |
| **+3 days** | SMS | "You've had X calls answered so far. Check your dashboard: [link]" | Twilio + Supabase cron |
| **+7 days** | Email | "Halfway through. Here's your week 1 report." | Resend + Supabase |
| **+10 days** | Email | "3 days left. Add payment to keep your number." | Resend |
| **+12 days** | Email + SMS | "48 hours left. Don't lose your number — add payment now." | Resend + Twilio |
| **+14 days** | Email + SMS | "Last day of trial. Add payment to continue uninterrupted." | Resend + Twilio |
| **+15 days** | — | Subscription starts (if payment added) or account pauses | Stripe |

**All of this is automated via Supabase database triggers + edge functions + Resend/Twilio APIs.**

**Cost:** £0 (Resend free tier: 3,000 emails/mo. Twilio: ~£0.03/SMS).

---

### Stage 3: Trial-to-Paid Conversion (Automated)

#### 3A. Usage-Based Triggers

**Trigger:** Trial user receives ≥3 calls → high conversion probability.

**Automated action:**
- Tag user as "hot lead" in Supabase
- Send personalized email: "You've already had 3 calls answered. That's potentially £600 in jobs. Ready to make it permanent?"
- Include direct Stripe checkout link

**Trigger:** Trial user receives 0 calls in 7 days → low engagement.

**Automated action:**
- Send re-engagement email: "No calls yet? Here's how to get more leads while your trial is active."
- Include tips: add whoza.ai number to Google Business Profile, website, van signage
- Offer 1-on-1 setup call (you, manually, but only for high-value prospects)

---

#### 3B. Payment Collection Automation

**Stripe checkout flow:**
1. Trial reminder email includes "Add payment details" button
2. Button opens Stripe Checkout page (pre-filled with trial plan)
3. User enters card → subscription starts day 15
4. Invoice emailed automatically (VAT breakdown as confirmed)

**Failed payment handling:**
- Day 15: payment fails → email: "There was a problem with your payment. Update card here."
- +3 days: retry → email reminder
- +7 days: final retry → account pauses, number released

**All automated via Stripe dunning + webhooks.**

---

### Stage 4: Customer Success + Expansion (Automated)

#### 4A. Monthly Health Report (Automated)

**Trigger:** First day of each month.

**Content (auto-generated from Supabase data):**
- Calls answered this month: X
- Jobs booked: X
- Missed calls before whoza.ai: X (estimated)
- Revenue potentially recovered: £X
- Google ranking change: +Y positions (visibility component)
- New reviews generated: Z

**Channel:** Email (Resend) + optional SMS summary (Twilio).

**Purpose:** Reinforces value every month. Reduces churn by making ROI visible.

---

#### 4B. Review Generation Automation

**Trigger:** 48 hours after a booking (detected via calendar webhook or call outcome).

**Flow:**
1. Trillet webhook signals "job booked"
2. Supabase schedules delayed job (48 hours later)
3. Automated SMS to customer: "How was your experience with [Trade]? Quick review: [Google review link]"
4. If no review after 7 days: second SMS
5. If review received: thank-you SMS to tradesperson

**Expected:** 15–25% review conversion. Each review boosts Google ranking.

**Cost:** £0.03/SMS × 2 = £0.06 per job. At 20 jobs/mo = £1.20 per client.

---

#### 4C. Upsell Automation

**Trigger:** Client hits 80% of minute allowance consistently for 2 months.

**Flow:**
1. Supabase detects pattern
2. Automated email: "You're using 480 of your 500 minutes. Upgrade to Business (£129) for 600 minutes and 15 directory listings."
3. Include one-click upgrade via Stripe Checkout

**Trigger:** Client on Solo (voice only) for 3 months.

**Flow:**
1. Email: "Your visibility report: you're ranking #8 for 'plumber Manchester'. Upgrade to Business to hit #1."
2. Include visibility score + competitor comparison

---

#### 4D. Referral Automation

**Trigger:** Client completes 3 months.

**Flow:**
1. Email: "Love whoza.ai? Get a month free for every tradesperson you refer."
2. Unique referral link generated per client (Stripe referral code or manual tracking)
3. Referred client signs up → referrer gets £69 credit
4. Automated email to both: "Referral confirmed! £69 credit applied."

**Why this works for trades:** Tradespeople talk to each other on job sites. Word-of-mouth is the #1 channel.

---

### Stage 5: Re-engagement + Win-Back (Automated)

#### 5A. Trial Drop-Off Recovery

**Trigger:** Trial ends, no payment.

**Flow:**
- Day 16: "Your trial ended. Reactivate in 1 click and keep your number."
- Day 23: "Still thinking it over? Here's what other plumbers say." (testimonial)
- Day 30: "Last chance — your number will be released in 7 days."
- Day 37: Number released. "Your number is gone, but you can start a new trial anytime."

---

#### 5B. Churned Customer Win-Back

**Trigger:** Subscription cancelled.

**Flow:**
- Day 1: "Sorry to see you go. What could we have done better?" (feedback survey)
- Day 14: "Missing whoza.ai? 50% off your first month back."
- Day 60: "New feature: AI visibility is now included. Restart for £34.50."
- Day 90: Final email: "Still using voicemail? Here's what you're missing."

---

### Stage 6: Content Marketing Automation

#### 6A. Blog Post Pipeline

**Weekly automation:**
1. **Monday:** Generate 3 blog post drafts via Claude API
   - Prompt: "Write 800 words on [topic] for UK tradespeople. Include 5 FAQs. Tone: practical, no fluff."
2. **Tuesday–Wednesday:** Human review (Dru or AI-assisted)
3. **Thursday:** Publish to whoza.ai/blog via Netlify build hook
4. **Friday:** Auto-share to social media (Buffer/Metricool)

**Content calendar (rotating):**
- Week 1: Trade guide ("How to price emergency callouts")
- Week 2: whoza.ai feature spotlight ("How the AI books jobs while you work")
- Week 3: Case study ("Plumber in Leeds recovered £2,400 in month 1")
- Week 4: Industry news ("New VAT rules for tradespeople 2026")

**Cost:** £0 (API calls) + £10–20/mo (scheduling tool).

---

#### 6B. Social Media Automation

**Channels:** Facebook (trades groups), Instagram (visual proof), TikTok (short demos), LinkedIn (B2B networking).

**Automation:**
- **Buffer/Metricool:** Schedule posts weekly
- **Content types:**
  - Screenshot of WhatsApp summary ("Another job booked while I was under a sink")
  - Before/after ranking charts ("From page 2 to page 1 in 3 weeks")
  - Video: 30-sec screen recording of AI answering a call
  - Poll: "How many calls did you miss this week?"

**Frequency:** 3–5 posts/week per channel. Automated scheduling, manual community management (replying to comments).

**Cost:** £10–15/mo (scheduling tool).

---

#### 6C. Email Newsletter (Automated)

**List:** Trial signups + customers + website opt-ins.

**Frequency:** Monthly.

**Content (auto-generated):**
- "This month in whoza.ai: X calls answered, £Y jobs booked"
- Trade tip of the month
- New feature announcement
- Customer spotlight

**Tool:** Resend (free to 3,000 contacts) or Beehiiv (free tier).

**Cost:** £0.

---

### Stage 7: Partner + Channel Automation

#### 7A. Trade Directory Integration

**What:** Auto-list whoza.ai on trade directories with special offer.

**Directories:**
- Checkatrade (partner program)
- Rated People
- MyBuilder
- Yell
- Thomson Local
- FMB (Federation of Master Builders)
- NICEIC
- Gas Safe Register

**Automation:**
- Create profile template
- Submit to directories (mostly manual, one-time)
- Track referral traffic via UTM parameters
- Auto-generate directory-specific landing pages

**Cost:** £0–50/directory (some free, some paid).

---

#### 7B. Affiliate/Referral Program (Automated Tracking)

**What:** Let trade suppliers, tool merchants, and industry influencers refer customers.

**Automation:**
- Unique referral links per partner
- Stripe affiliate tracking or Rewardful
- Auto-email partner when referral converts
- Monthly partner report: referrals, conversions, commissions

**Commission:** £20–30 per converted trial (or 1 month free).

**Cost:** £30–50/mo (Rewardful or similar).

---

## The Complete Automation Stack

| Layer | Tool | Purpose | Cost |
|-------|------|---------|------|
| **Website** | whoza.ai (React + Netlify) | Landing pages, blog, dashboard | £0 |
| **Database** | Supabase | User data, triggers, cron jobs | £0 (free tier) |
| **Auth** | Supabase Auth | Trial signup, user management | £0 |
| **Billing** | Stripe | Trials, subscriptions, invoices | 1.5% + £0.20/transaction |
| **Email** | Resend | All email automation | £0 (3,000/mo free) |
| **SMS** | Twilio | Trial reminders, review requests | ~£0.03/SMS |
| **Voice** | Trillet | AI answering, webhooks | $299/mo + usage |
| **Ads** | Google Ads + Meta | Lead generation | £750/mo (pilot) |
| **Retargeting** | Google + Meta Pixel | Return visitors | Included in ad spend |
| **Scheduling** | Buffer/Metricool | Social media posts | £15/mo |
| **Content AI** | Claude/GPT-4 | Blog drafts, email copy | £20–50/mo (API) |
| **Affiliates** | Rewardful | Partner tracking | £50/mo |
| **Analytics** | GA4 + Plausible | Traffic, conversion tracking | £0 |
| **CRM** | Supabase + custom views | Lead scoring, pipeline | £0 |

**Total marketing automation stack cost: ~£150–200/mo (tools) + £750/mo (ads) = £900–950/mo.**

---

## The "Set and Forget" Workflows

Once built, these require minimal maintenance:

### Daily (Automated)
- [ ] Meta/Google ads running (monitor spend, pause underperformers)
- [ ] Retargeting campaigns active
- [ ] Trial signups onboarded via email sequence
- [ ] Call summaries sent (Trillet → Resend)

### Weekly (Semi-Automated)
- [ ] Review 3 AI-generated blog posts, publish 1–2
- [ ] Schedule social media content for next week
- [ ] Check ad performance, adjust budgets
- [ ] Review trial-to-paid conversion rate

### Monthly (Manual Review)
- [ ] Send monthly customer health reports
- [ ] Review churned users, trigger win-back sequence
- [ ] Analyse which trade/city pages drive most trials
- [ ] Adjust content calendar based on search trends

---

## Expected Results (Month 3–6)

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Organic traffic** | 200/mo | 1,000/mo | 3,000/mo |
| **Paid traffic** | 1,500/mo | 2,000/mo | 2,500/mo |
| **Trial signups** | 15/mo | 40/mo | 80/mo |
| **Trial cost** | £400 | £800 | £1,200 |
| **Paid conversions (20%)** | 3/mo | 8/mo | 16/mo |
| **CAC** | £133 | £100 | £75 |
| **MRR from marketing** | £207–516 | £552–1,376 | £1,104–2,752 |
| **Marketing ROI** | 50–130% | 200–500% | 400–900% |

---

## Quick-Start: Build These First (Priority Order)

### Week 1: Foundation
1. [ ] Configure Stripe trial products (14-day, no card)
2. [ ] Build trial onboarding email sequence (Resend + Supabase)
3. [ ] Set up Twilio SMS for trial reminders
4. [ ] Add Meta + Google Pixel to whoza.ai
5. [ ] Launch Google Ads pilot (£15/day)

### Week 2: Conversion
6. [ ] Build trial-to-paid dashboard (calls, bookings, visibility stats)
7. [ ] Set up automated payment reminder flow
8. [ ] Add exit-intent popup to pricing page
9. [ ] Launch retargeting campaigns (£5/day)

### Week 3: Retention
10. [ ] Build monthly health report email
11. [ ] Set up review generation SMS (48h post-booking)
12. [ ] Create referral email template
13. [ ] Add upsell triggers (80% minute usage)

### Week 4: Growth
14. [ ] Set up content generation pipeline (Claude → blog)
15. [ ] Schedule social media posts (Buffer)
16. [ ] Launch Facebook Ads pilot (£10/day)
17. [ ] Submit to 5 trade directories

---

## The Honest Truth

**80% can be automated. 20% needs a human touch.**

**Automate:**
- Emails, SMS, reminders, reports, invoices
- Ad bidding, retargeting, landing page delivery
- Content generation, social scheduling, SEO
- Trial provisioning, number allocation, payment collection

**Don't automate (yet):**
- Responding to WhatsApp chat inquiries (use you or VA)
- Complex sales calls (Enterprise tier)
- Dispute resolution, refunds, cancellations
- Partnership negotiations (trade directories, affiliates)
- Crisis management (service outages, complaints)

**The goal:** Automate the predictable so you can focus on the high-value human interactions.

---

*Blueprint based on existing whoza.ai infrastructure, Trillet capabilities, Stripe/Supabase automation potential, and UK trades market buyer behaviour.*
