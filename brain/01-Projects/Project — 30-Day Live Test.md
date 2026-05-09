---
created: 2026-04-29
updated: 2026-04-29
tags: [project, growth, active, go-to-market]
status: active
owner: "Dru / Agent-6: Growth Hacker"
priority: P0
---

# Project — 30-Day Live Test

## Objective
Validate that UK tradespeople will buy and that the voice tech works end-to-end. Spend £855 (gated: £300 → £555) to get ≥3 paying customers in 30 days.

## Context
This is the go-live validation sprint. No more building — this is about getting real customers using the service. The white-label model means we can launch in days, not months.

## Key Results
- [ ] ≥3 paying customers by Day 30
- [ ] Voice tech works (call divert, AI answers, summaries delivered)
- [ ] CAC validated (£80–£150 target)
- [ ] Churn rate baseline established
- [ ] Testimonial/review from ≥1 customer
- [ ] Decision: scale or iterate

## Capital at Risk
| Gate | Budget | Period | Trigger to Advance |
|------|--------|--------|-------------------|
| **Day 0** | £53 | Setup | Trillet Pro + 5 UK numbers |
| **Gate 1** | £300 | Weeks 1–2 | ≥3 paying customers |
| **Gate 2** | £555 | Weeks 3–4 | Positive unit economics + testimonials |
| **Total** | £855 | 30 days | — |

## Day 0 Pre-Flight (Do Today)
| # | Task | Owner | Cost |
|---|------|-------|------|
| 1 | Sign Trillet Pro ($49/mo) at trillet.ai | Dru | £38 |
| 2 | Buy 5 UK numbers via Trillet dashboard | Dru | £15 |
| 3 | Run live divert test — dial `**21*[Trillet number]#` from EE/Vodafone/O2 SIM | Dru | £0 |
| 4 | Confirm call connects and AI answers | Dru | £0 |
| 5 | Create "Voice" product in Stripe (Solo £69, Business £129) | Dru | £0 |
| 6 | Update whoza.ai pricing page — add Voice section | Dev/Jarvis | £0 |
| 7 | Draft voice landing page copy | Jarvis | £0 |
| 8 | Set up Google Ads account | Dru | £0 |
| 9 | Create "Beta" badge graphic | Dru/Jarvis | £0 |
| 10 | List 10 tradespeople in network to approach | Dru | £0 |

## Week 1–2 (Gate 1: £300 Budget)
**Objective:** Get ≥3 paying customers via warm outreach + paid ads.

### Day 1 (Monday)
- Deploy voice landing page to `whoza.ai/voice`
- Add "Voice" nav link to header
- Configure Stripe checkout for Solo £69 / Business £129
- Send outreach #1 to 3 warmest contacts (text/WhatsApp)
- Record 2-min Loom demo video
- Post in 2 trade Facebook groups

### Day 2 (Tuesday)
- Check Stripe for trial signups
- Set up Trillet sub-accounts manually for any interest
- LinkedIn post: "Testing something new. 3 beta spots."
- Add "Missed Call Calculator" to landing page
- Reply to all Day 1 engagement

### Day 3 (Wednesday)
- Launch £200 Facebook/Instagram ads (UK plumbers/electricians/builders, 25–55)
- Daily budget: £14/day
- Follow up non-responders from Day 1
- Collect feedback from any signups

### Day 4 (Thursday)
- Review ad performance (CTR, CPC, leads)
- If CTR <1%: swap creative
- Cold outreach #3 — DM 5 tradespeople on Instagram
- Add 3 more UK numbers if needed
- Document onboarding pain points

### Day 5 (Friday)
- Review week's results: signups, conversions, feedback
- Adjust ad creative based on top performer
- Plan weekend content (Facebook groups, personal social)

### Week 2
- Continue £14/day ad spend
- Follow-up to all Week 1 outreach
- Collect video testimonials if possible
- Iterate landing page based on feedback

## Week 3–4 (Gate 2: £555 Budget)
**Objective:** Scale what worked. Kill what didn't.

- Increase ad spend to £27/day (£555 remaining / 20 days)
- Expand to Google Search ads
- Launch referral program (existing customers get £20 credit for referrals)
- Build case study from first 3 customers
- Prepare pitch for trade associations (Checkatrade, Rated People)

## Kill Criteria (Stop and Pivot)
- 0 paying customers after £300 spend → revisit product-market fit
- Tech failures (calls not connecting, AI not answering) → fix before spending more
- CAC > £300 per customer → pricing or channel problem

## Resources
- Full plan: [[30_DAY_GATED_EXECUTION_PLAN.md]] (flat file, 21KB)
- Business model: [[BUSINESS_MODEL_ANALYSIS.md]] (flat file)
- PnL model: [[TRILLET_PnL_MODEL.md]] (flat file)
- Voice design: [[TRILLET_DESIGN_AND_COSTING.md]] (flat file)

## Related
- [[Project — Voice Agent White Label]] — The product being tested
- [[Project — Marketing Automation]] — Ads and content engine
- [[Reference — Validated Business Model]] — Economics
- [[Index — Projects]]
