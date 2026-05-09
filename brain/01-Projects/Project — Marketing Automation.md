---
created: 2026-04-29
updated: 2026-04-29
tags: [project, growth, planning, automation]
status: planning
owner: "Agent-6: Growth Hacker / Agent-7: Content Engine"
priority: P1
---

# Project — Marketing Automation

## Objective
Automate 80% of marketing activity for the AI Voice + AI Visibility bundle. Budget: £200–400/mo during pilot.

## Context
Tradespeople respond to practical proof, not marketing fluff. Every automation must deliver tangible value (a saved call, a booking, a ranking improvement).

## Key Results
- [ ] SEO content engine: 3–5 blog posts/week auto-generated
- [ ] Trade-specific landing pages: all trade + city combos covered
- [ ] Google Ads: £15/day pilot running
- [ ] Facebook/Instagram Ads: £14/day pilot running
- [ ] Email automation: welcome sequence, trial nurture, post-conversion
- [ ] Review generation: automated post-job review requests
- [ ] Retargeting: abandoned trial recovery, upsell campaigns

## Automated Marketing Funnel

### Stage 1: Lead Generation (Automated Inbound)

#### 1A. SEO Content Engine
- **Frequency:** 3–5 posts/week
- **Keywords:** 500+ target keywords (trade + location + pain point)
- **Templates:** "How [Trade] in [City] Can Stop Missing Calls", "£X Lost to Voicemail", etc.
- **Cost:** £0 (OpenAI API credits)
- **Target:** 500–2,000 organic visits/mo within 6 months

#### 1B. Trade-Specific Landing Pages
- **Already built:** 20 trade pages + 32 city pages = 52 pages live
- **Next:** Dynamic content injection via edge functions (live call stats, local weather context)
- **Cost:** £0 (existing infrastructure)

#### 1C. Google Ads (Semi-Automated)
- **Budget:** £15/day pilot (£450/mo)
- **Keywords:** "AI phone answering plumber London", "virtual receptionist electrician Birmingham", "missed calls costing me money"
- **Expected:** 15–30 clicks/day, 5–10% trial conversion = 1–3 signups/day

#### 1D. Facebook/Instagram Ads
- **Budget:** £14/day pilot
- **Audience:** UK tradespeople by job title, interest (Checkatrade, Rated People, Screwfix)
- **Creative rotation:** Video demo, carousel before/after, testimonial quotes

### Stage 2: Lead Nurturing (Automated)

#### 2A. Welcome Sequence (Email)
| Day | Subject | Content |
|-----|---------|---------|
| 0 | "Your AI is being configured" | Setup confirmation, divert instructions |
| 1 | "3 ways to get the most from whoza.ai" | Tips: calendar sync, custom script, WhatsApp |
| 3 | "See how many calls you answered this week" | Call stats summary |
| 7 | "Tradespeople like you are saving £2,000+/mo" | Case study + social proof |
| 12 | "Your trial ends in 2 days" | Payment reminder + value recap |
| 14 | "Welcome to the team" | Post-conversion onboarding |

#### 2B. SMS Nurturing
- Trial day 12: "Your whoza.ai trial ends in 2 days. Add payment to keep your AI answering calls 24/7. [Link]"
- Post-booking: "A customer just booked via your AI! See details in your dashboard."
- Monthly: "This month your AI answered X calls and booked Y jobs."

### Stage 3: Conversion Optimization

#### 3A. Abandoned Trial Recovery
- Users who start trial but don't set up divert → "Your AI is waiting" email sequence
- Users who don't add payment details → "Don't lose your number" urgency sequence

#### 3B. Upsell Automation
- Solo → Business: "You've used 80% of your minutes. Upgrade for unlimited."
- Voice-only → Bundle: "Add AI Visibility for £50/mo and get found on Google too."

### Stage 4: Retention & Advocacy

#### 4A. Review Generation
- 24h after job booking → "How did the job go? Leave a review."
- Monthly → "Happy with whoza.ai? Share your story."

#### 4B. Referral Program
- "Give £20, Get £20" — automated credit application
- Referral tracking via unique codes in Supabase

## Tools & Stack
| Function | Tool | Cost |
|----------|------|------|
| Content generation | OpenAI API (GPT-4/Claude) | £0 (existing credits) |
| Email | Resend (already integrated) | £0 (within free tier) |
| SMS | Twilio or Trillet native | Usage-based |
| Ads | Google Ads + Meta Ads Manager | £450–600/mo |
| CRM | Supabase + edge functions | £0 |
| Analytics | GA4 + custom dashboard | £0 |

## Resources
- Full blueprint: [[MARKETING_AUTOMATION_BLUEPRINT.md]] (flat file, 18KB)
- Business model: [[BUSINESS_MODEL_ANALYSIS.md]] (flat file)
- Competitor intel: [[COMPETITIVE_INTELLIGENCE_REPORT.md]] (flat file)

## Related
- [[Project — 30-Day Live Test]] — Marketing automation feeds the go-live sprint
- [[Project — Free Trial Design]] — Trial nurture is core automation
- [[Process — SEO Audit]] — Weekly SEO health check
- [[Index — Projects]]
