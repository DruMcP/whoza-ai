# whoza.ai Voice Product — Trillet-Based Design & Costing
## White-Label Reseller Architecture for UK Trades Market
**Date:** 2026-04-28  
**Classification:** Internal — Product Architecture & P&L  
**Status:** READY FOR BUILD

---

## 1. Executive Summary

**Platform choice:** Trillet Agency Plan ($299/month, unlimited sub-accounts)  
**All-in cost:** ~$0.09/minute (voice + LLM + telephony included)  
**Client onboarding model:** Call divert from client's existing number → Trillet-provided number  
**Go-live timeline:** 1–2 weeks (no custom development required)

---

## 2. Architecture Overview

### The whoza.ai ↔ Trillet Stack

```
[Client's Existing Number]
          |
          |  *21*[Trillet Number]#
          v
[Trillet AI Number] ← Provisioned by Trillet per client
          |
          |  Webhook/telephony layer
          v
[Trillet AI Agent] ← Custom voice, script, business knowledge
          |
          |  Actions (built-in)
          v
[Call Outcome]
    ├── Booking/Calendar event
    ├── CRM entry (GoHighLevel, HubSpot, etc.)
    ├── SMS/Email notification to client
    └── Call summary + recording
```

### Trillet Supplies
| Component | Who Provides | Notes |
|-----------|-------------|-------|
| AI voice engine | ✅ Trillet | Low latency (~400ms), natural voice |
| LLM brain | ✅ Trillet | Managed LLM (no manual model selection) |
| Telephony | ✅ Trillet | Inbound/outbound, carrier-grade |
| UK phone numbers | ✅ Trillet | Local + national numbers available |
| Client dashboard | ✅ Trillet | White-label, custom domain, logo |
| Call recordings | ✅ Trillet | Stored + accessible per client |
| CRM integrations | ✅ Trillet | Native GHL, HubSpot, Salesforce |
| Calendar booking | ✅ Trillet | Google, Outlook, Calendly |
| SMS/WhatsApp | ✅ Trillet | Included on higher plans |
| Compliance | ✅ Trillet | SOC 2, HIPAA, GDPR |

### whoza.ai Builds
| Component | What whoza.ai Does |
|-----------|-------------------|
| Public website | Landing page, pricing, signup flow |
| Billing | Stripe subscriptions + usage tracking |
| Client onboarding | "Dial *21* then your Trillet number then #" instructions |
| Brand layer | whoza.ai branded client portal (Trillet white-label underneath) |
| Support | First-line client support |

---

## 3. Telephone Numbers & Call Divert — How It Works

### Does Trillet Supply Numbers for Divert?

**YES.** Trillet provides phone numbers directly through the platform:

> *"Buy a New Number — Purchase directly through the platform. Quick setup and ready to use right away. Search by country, type (local or toll-free), state, or area code."*  
> — Trillet Docs

**Alternative:** You can also bring your own Twilio numbers and link them to Trillet, but this adds complexity. **Use Trillet-native numbers for simplicity.**

### UK Divert Flow

1. **whoza.ai provisions a Trillet number** for each new client (e.g., 0333 XXX XXXX)
2. **Client activates call divert** on their existing mobile/landline:
   - Mobile: `**21*0333XXXXXXX#` then press call
   - BT Landline: `*21*0333XXXXXXX#`
3. **All incoming calls** now hit Trillet's AI agent
4. **Client can disable** anytime with `##21#`

### Trillet Confirms This Model

> *"Forward their number. Done. Client sets up conditional forwarding to the Trillet number. Their existing phone number stays the same. Callers don't notice."*  
> — Trillet Solutions Page

> *"You keep your existing business number through conditional call forwarding, so calls route to AI only when you can't answer. No new phone lines, no porting."*  
> — Trillet Towing Blog

### Number Types Available (UK)

| Type | Cost | Best For |
|------|------|----------|
| **0333 National** | Included / small fee | Professional, nationwide trades |
| **01/02 Local** | Included / small fee | Local identity (e.g., 0121 Birmingham) |
| **0800 Freephone** | Higher cost | Marketing lines, premium positioning |

---

## 4. Trillet Pricing — Full Breakdown

### Agency Plan (Recommended for whoza.ai)

| Feature | Detail |
|---------|--------|
| **Monthly fee** | $299/month (~£235) |
| **Sub-accounts** | **Unlimited** |
| **Per-minute rate** | ~$0.09/min (~£0.07/min) |
| **Included minutes** | Not specified; pay-as-you-go on top of platform fee |
| **White-label** | ✅ Full — custom domain, logo, colors |
| **Client dashboard** | ✅ Included |
| **CRM integrations** | ✅ GoHighLevel, HubSpot, Salesforce |
| **Calendar** | ✅ Google, Outlook, Calendly |
| **SMS/WhatsApp** | ✅ Included |
| **Compliance** | ✅ SOC 2, HIPAA, GDPR |
| **Support** | Email + agency resources |

### Studio Plan (For Testing)

| Feature | Detail |
|---------|--------|
| **Monthly fee** | $99/month (~£78) |
| **Sub-accounts** | 3 max |
| **Best for** | Pilot with 1–3 beta clients |

### AI Receptionist Plan (Direct Consumer)

| Feature | Detail |
|---------|--------|
| **Monthly fee** | $49/month |
| **Minutes** | 150 included |
| **Best for** | Individual tradespeople going direct (not reseller) |

### Cost per Client (Trillet Layer Only)

| Usage | Trillet Cost |
|-------|-------------|
| 300 min/month | ~$27 (~£21) |
| 500 min/month | ~$45 (~£35) |
| 1,000 min/month | ~$90 (~£71) |
| 2,000 min/month | ~$180 (~£142) |

---

## 5. whoza.ai Pricing vs. Trillet Costs

### P&L per Client

| whoza.ai Plan | whoza.ai Price | Est. Usage | Trillet Cost | Gross Margin | Margin % |
|---------------|---------------|------------|--------------|--------------|----------|
| **Starter** | £49/mo | 300 min | ~£21 | ~£28 | **57%** |
| **Growth** | £99/mo | 500 min | ~£35 | ~£64 | **65%** |
| **Pro** | £199/mo | 1,000 min | ~£71 | ~£128 | **64%** |
| **Elite** | £499/mo | 2,000 min | ~£142 | ~£357 | **72%** |

### Platform Costs (whoza.ai Overhead)

| Cost | Monthly | Annual |
|------|---------|--------|
| Trillet Agency | $299 (~£235) | ~£2,820 |
| whoza.ai website hosting | £15 | £180 |
| Stripe fees (1.5% + 20p) | ~£10–50 | ~£120–600 |
| **Total fixed overhead** | **~£260/mo** | **~£3,120/yr** |

### Break-Even Analysis

| Scenario | Monthly Rev | Trillet Var Cost | Fixed Cost | Net Profit |
|----------|-------------|------------------|------------|------------|
| 10 clients (Starter) | £490 | £210 | £260 | £20 |
| 20 clients (Starter) | £980 | £420 | £260 | £300 |
| 20 clients (Growth) | £1,980 | £700 | £260 | £1,020 |
| 50 clients (Growth) | £4,950 | £1,750 | £260 | £2,940 |
| 50 clients (mixed) | £7,500 | ~£2,500 | £260 | £4,740 |

**Break-even: ~10–12 clients at Starter tier, or ~5–6 clients at Growth tier.**

---

## 6. UK-Specific Considerations

### Number Formatting
- Trillet provides UK numbers in standard format: `0333 XXX XXXX`
- Client divert codes use the full number without +44: `**21*0333XXXXXXX#`

### Carrier Compatibility
- Trillet's divert model works with all major UK carriers (EE, Vodafone, O2, Three, BT, Sky, Plusnet, TalkTalk, giffgaff)
- **Blocked MVNOs:** Tesco Mobile, Lyca Mobile, Lebara, Voxi, Virgin Mobile do not support call divert
- **Fallback for blocked carriers:** Offer number porting (10–15 days) or recommend the client switches to a divert-compatible carrier

### Compliance
- **GDPR:** Trillet is GDPR-compliant (EU-hosted option available)
- **Call recording:** Trillet handles recording consent flows
- **Ofcom:** Trillet's telephony layer complies with UK caller ID rules

### Geographic vs National Numbers
- **0333 numbers** are ideal for trades — national reach, low cost, professional
- **01/02 numbers** for local identity (e.g., Birmingham plumber wants 0121 number)
- Trillet supports both; provision based on client preference

---

## 7. Client Onboarding Flow (Trillet-Powered)

### Step 1: Signup (whoza.ai Website)
- Client selects plan on whoza.ai
- Stripe payment collected
- whoza.ai auto-creates Trillet sub-account via API

### Step 2: Trillet Agent Setup (5 Minutes)
- whoza.ai pastes client website URL into Trillet
- Trillet auto-scrapes services, hours, FAQs
- whoza.ai customizes greeting and call flow
- Trillet assigns UK phone number

### Step 3: Call Divert Activation (2 Minutes)
- whoza.ai sends client a one-page PDF:
  - "Dial `**21*0333XXXXXXX#` then press call"
  - "To cancel: `##21#`"
  - "To check: `*#21#`"
- Client activates divert
- Test call confirms routing

### Step 4: Live
- AI answering calls within 10 minutes of divert activation
- Client gets SMS/email summaries after each call
- whoza.ai monitors via Trillet dashboard

---

## 8. Comparison: Trillet vs. Retell/Vapi for whoza.ai

| Factor | Trillet (Chosen) | Retell (Ruled Out) | Vapi (Ruled Out) |
|--------|-----------------|-------------------|------------------|
| **White-label** | ✅ Native, no build | ❌ Build yourself | ❌ Build yourself |
| **Sub-accounts** | ✅ Unlimited | ❌ None | ❌ None |
| **Dev time** | ✅ 1–2 weeks | ❌ 8–12 weeks | ❌ 8–12 weeks |
| **UK numbers** | ✅ Built-in | ⚠️ Via Twilio | ⚠️ Via Twilio |
| **Call divert** | ✅ Confirmed model | ✅ Works but DIY | ✅ Works but DIY |
| **All-in £/min** | ~£0.07 | ~£0.09–£0.20 | ~£0.05–£0.12 |
| **Compliance** | ✅ SOC 2/HIPAA/GDPR | ⚠️ Infra only | ⚠️ DIY |
| **CRM integrations** | ✅ Native GHL/HubSpot | ⚠️ Webhooks only | ⚠️ Build yourself |
| **Calendar booking** | ✅ Native | ⚠️ Build yourself | ⚠️ Build yourself |
| **Client dashboard** | ✅ Included | ❌ Build yourself | ❌ Build yourself |
| **Support** | ✅ Email + docs | ⚠️ Discord only | ⚠️ Community |

---

## 9. Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Trillet pricing increases | Medium | Lock annual contract; monitor alternatives (Stammer, Convocore) |
| Trillet platform outage | Low | Trillet runs carrier-grade telephony with failover |
| Client on blocked MVNO | Medium | Document fallback: port number or switch carrier |
| Trillet sunset/shutdown | Low | Data export available; alternative platforms ready |
| Per-minute cost spike | Low | $0.09/min is all-in and predictable |
| UK regulatory change | Low | Trillet maintains Ofcom/GDPR compliance |

---

## 10. Action Plan

### Week 1: Foundation
1. **Sign up for Trillet Agency** ($299/mo)
2. **Configure white-label:** Add whoza.ai logo, colors, custom domain
3. **Provision test numbers:** Get 2–3 UK numbers for testing
4. **Build whoza.ai landing page:** Pricing tiers, FAQ, signup flow

### Week 2: Pilot
5. **Create first agent:** Use whoza.ai website URL to test auto-scrape
6. **Test call divert:** Get EE/O2/Three SIMs; verify `**21*` codes work with Trillet number
7. **Test blocked carriers:** Verify Tesco/Lyca/Lebara cannot divert
8. **Build onboarding PDF:** One-page divert instructions per carrier

### Week 3: Stripe Integration
9. **Connect Stripe:** Subscriptions for 4 pricing tiers
10. **Build client signup flow:** Auto-provisions Trillet sub-account
11. **Set up monitoring:** Track usage vs. margins per client

### Week 4: Soft Launch
12. **Beta with 3–5 friendly tradespeople**
13. **Collect feedback:** Call quality, AI accuracy, client satisfaction
14. **Refine pricing:** Adjust tiers based on actual usage data

---

## 11. Final Numbers Summary

| Metric | Value |
|--------|-------|
| **Platform** | Trillet Agency |
| **Platform cost** | $299/mo (~£235) |
| **Per-minute cost** | ~$0.09 (~£0.07) |
| **Client setup time** | 5–10 minutes |
| **Go-live from signup** | < 30 minutes |
| **Break-even clients** | ~10 at Starter / ~6 at Growth |
| **Gross margin range** | 57–72% |
| **UK numbers supplied** | ✅ Yes, provisioned natively |
| **Call divert supported** | ✅ Yes, confirmed standard model |
| **White-label ready** | ✅ Yes, no build required |

---

**Recommendation:** Proceed with Trillet Agency. The platform is built exactly for the whoza.ai use case: white-label voice AI with unlimited client sub-accounts, native UK number provisioning, and a proven call divert model. Zero development time on voice infrastructure. All engineering effort goes to whoza.ai brand, billing, and client acquisition.
