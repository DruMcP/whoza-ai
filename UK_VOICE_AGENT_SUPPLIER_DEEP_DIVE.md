# UK Voice Agent & Number Supplier Deep Dive
## For whoza.ai White-Label AI Voice Reseller Model
**Date:** 2026-04-28  
**Classification:** Internal — Supplier Intelligence  
**Status:** READY FOR COMMERCIAL DECISIONS

---

## 1. Executive Summary

This deep dive identifies voice agent platforms and UK number suppliers that enable a **white-label reseller model** where:
- **whoza.ai packages and sells** AI voice agent services to UK trades
- **A technical partner provides** the actual voice AI infrastructure
- **Client keeps their existing phone number** and diverts calls to the agent

**Key Finding:** Call diversion from existing UK numbers is a standard, well-documented feature across most UK carriers. The virtual receptionist industry (ReceptionHQ, Moneypenny, etc.) has operated on this exact model for years. The only blockers are specific MVNOs that disable call forwarding.

**Recommended Core Stack:**
- **Voice AI:** Retell AI or Vapi (best white-label flexibility)
- **UK Numbers:** Twilio UK (+44 numbers, programmable voice, instant provisioning)
- **Client Onboarding:** Call divert via USSD codes (*21*) — no number porting required

---

## 2. Voice Agent White-Label Platforms (UK-Ready)

### Tier 1: Best for White-Label Resellers

#### **Retell AI** ⭐ Top Pick
- **White-label:** Yes — fully customizable voice, persona, scripts
- **UK Telephony:** Yes — provisions UK numbers directly or via Twilio integration
- **Cost:** ~£0.08–£0.16/min all-in (infrastructure + voice + LLM + telephony)
- **Strengths:** Best-in-class voice quality (Cartesia/ElevenLabs), built-in telephony layer, real-time web dashboard
- **Weakness:** Higher per-minute cost than Autocalls; less transparent on enterprise/reseller pricing
- **Reseller Fit:** Excellent — you can rebrand the dashboard and voice experience

#### **Vapi**
- **White-label:** Yes — API-first, full control over voice + conversation logic
- **UK Telephony:** Yes — but relies on external telephony (Twilio/Vonage) for UK numbers
- **Cost:** ~£0.05–£0.10/min (voice infra) + telephony costs (~£0.01/min) = ~£0.06–£0.11/min
- **Strengths:** Lowest cost per minute, maximum technical control, strong developer community
- **Weakness:** More build work required; telephony is separate from voice AI
- **Reseller Fit:** Good for technical teams; you own the full UX layer

#### **Autocalls.ai** ⭐ Lowest Cost at Scale
- **White-label:** Yes — full white-label available
- **UK Telephony:** Yes — claims global telephony infrastructure
- **Cost:** ~$0.09/min (~£0.07/min) at scale; Starter plan ~$0.17–$0.20/min
- **Strengths:** Lowest all-in per-minute cost, purpose-built for AI calling, handles telephony internally
- **Weakness:** Less known brand, fewer public case studies, smaller ecosystem
- **Reseller Fit:** Excellent for cost-sensitive trades market; best margins

### Tier 2: Enterprise-Focused

#### **Bland AI**
- **White-label:** Limited — enterprise-focused, less reseller-friendly
- **UK Telephony:** Yes — uses Twilio as underlying carrier
- **Cost:** Not transparent; enterprise pricing only. Price hike Dec 2025 alienated smaller users
- **Strengths:** Very fast conversational AI, good for high-volume outbound
- **Weakness:** No transparent pricing, poor for resellers, recent price increases
- **Reseller Fit:** Poor — built for direct enterprise sales, not channel/reseller

#### **Synthesia / Other Video AI**
- Not relevant for voice-only agent use case

### Platform Comparison Matrix

| Platform | White-Label | UK Numbers | All-in £/min | Best For |
|----------|-------------|-----------|--------------|----------|
| **Retell AI** | ✅ Full | ✅ Built-in | £0.08–£0.16 | Premium positioning, best UX |
| **Vapi** | ✅ API | ⚠️ Via Twilio/Vonage | £0.06–£0.11 | Technical control, lowest cost |
| **Autocalls.ai** | ✅ Full | ✅ Built-in | £0.07–£0.15 | Cost leadership, margin maximization |
| **Bland AI** | ❌ Limited | ✅ Via Twilio | £0.12–£0.25+ | Enterprise direct sales only |

**Recommendation:** Start with **Retell AI** for premium positioning (£99/mo trades plan) or **Autocalls.ai** for cost leadership (£49/mo starter plan). Both handle UK telephony without you managing separate SIP trunking.

---

## 3. UK Number Suppliers & Telephony Infrastructure

### Option A: Twilio (Recommended for Speed)
- **UK Numbers:** Yes — geographic (01/02), national (03), mobile (07), toll-free (0800)
- **Provisioning:** Instant via API/dashboard
- **Cost:** ~£1–£3/month per number; inbound calls ~£0.005–£0.01/min; outbound ~£0.01–£0.02/min
- **Programmable Voice:** Yes — full API for call routing, IVR, webhooks
- **Call Divert Compatible:** Yes — Twilio numbers receive diverted calls normally from any UK carrier that supports divert
- **White-Label Reseller:** Yes — you can provision numbers under a master account for sub-accounts
- **Strengths:** Best developer ecosystem, instant setup, global reliability
- **Weakness:** Higher per-minute costs than wholesale SIP

### Option B: Vonage (Alternative to Twilio)
- **UK Numbers:** Yes — full range
- **Provisioning:** Via API
- **Cost:** ~£0.00798/min inbound (US rate; UK similar); numbers ~£1–£2/month
- **Programmable Voice:** Yes — full Voice API
- **Call Divert Compatible:** Yes
- **Strengths:** Slightly cheaper per-minute than Twilio; strong API
- **Weakness:** Less developer mindshare; hidden fees historically an issue ($100M FTC settlement)

### Option C: UK SIP Trunk Providers (For Scale/Reseller Margin)
These are relevant if you want to own the telephony layer directly (advanced):

| Provider | Price/Channel | Best For | Notes |
|----------|--------------|----------|-------|
| **sipgate** | £4.95/month | Transparent pricing, no contracts | Best for self-service; PAYG |
| **Gradwell** | £3.99/channel | 3CX integration | Good for PBX-style setups |
| **Gamma** | £5–10/channel | Enterprise, reseller channel | UK market leader; channel-only |
| **Spitfire** | £4/channel | End-to-end network | Direct sales |
| **AAISP** | £1.56/number | Technical teams | Monthly rolling; IPv6 native |
| **Simwood** | Wholesale | Carrier-grade | For building your own telco stack |

**SIP Trunk Note:** Using SIP trunking requires you to manage call routing infrastructure (Asterisk/FreeSWITCH/3CX or programmable PBX). This adds complexity but reduces per-minute costs to near-zero for inbound. Only recommended if you have telco expertise or a technical partner.

### Option D: Virtual Receptionist-Style Number Services
These are the **incumbents** in the exact business model you're entering:
- **ReceptionHQ** — provides UK 0333/local numbers; client diverts their number to the assigned DID
- **Moneypenny** — same model
- **Answer4u** — same model
- **Telecoms World** — from ~£1/number; UK inbound-focused

These prove the model works. You'd be adding **AI** instead of human receptionists to the same divert flow.

---

## 4. UK Call Divert Mechanics — How It Actually Works

### The Standard Model (What ReceptionHQ, Moneypenny, and whoza.ai will use)

1. **Client's existing number** (e.g., 0121 555 1234) stays with their current provider
2. **whoza.ai provisions a new UK number** (e.g., 0333 555 7890) via Twilio/Vonage
3. **Client activates call divert** on their existing number to forward to the whoza.ai number
4. **All incoming calls** hit the AI agent via the whoza.ai number
5. **Client can disable divert** anytime by dialing a cancellation code

### Carrier-Specific Divert Codes (UK)

| Carrier | Activate All Calls | Cancel | Notes |
|---------|-------------------|--------|-------|
| **BT (Landline)** | `*21*` then NUMBER then `#` | `#21#` | Most common business line |
| **BT (Mobile)** | `**21*` then NUMBER then `#` | `##21#` | — |
| **EE** | Call 150 → opt 1→2→4→1 | Call 150 → opt 1→2→4→2 | Or use GSM codes |
| **Vodafone** | `**21*` then NUMBER then `#` | `##21#` | Contract only; not PAYG |
| **O2** | `**21*` then NUMBER then `#` | `##21#` | — |
| **Three** | `**21*` then NUMBER then `#` | `##21#` | Supports PAYG too |
| **giffgaff** | `**21*` then NUMBER then `#` | `##21#` | Uses O2 network |
| **Sky** | `*21*` then NUMBER then `#` | `#21#` | — |
| **Plusnet** | `*21*` then NUMBER then `#` | `#21#` | — |
| **TalkTalk** | `*21*` then NUMBER then `#` | `#21#` | — |
| **Virgin Media** | `*21*` then NUMBER then `#` (most areas) | `#21#` | Red areas use `*70` |

### GSM Standard Codes (Work on Most Networks)
- **Divert all calls:** `**21*` DESTINATION NUMBER `#`
- **Divert when busy:** `**67*` DESTINATION NUMBER `#`
- **Divert when no answer:** `**61*` DESTINATION NUMBER `#`
- **Divert when unreachable:** `**62*` DESTINATION NUMBER `#`
- **Cancel all diverts:** `##002#`

### ⚠️ Carriers That BLOCK Call Divert
These MVNOs either don't offer call forwarding or charge prohibitively:

| Carrier | Status |
|---------|--------|
| **Tesco Mobile** | ❌ Not available |
| **Lyca Mobile** | ❌ Not available |
| **Lebara Mobile** | ❌ Not available |
| **Voxi (Vodafone MVNO)** | ❌ Not available |
| **Virgin Mobile** | ❌ Not available (reported) |
| **SMARTY (Three MVNO)** | ⚠️ Limited/Unreliable |
| **Asda Mobile** | ⚠️ Check with provider |

**Impact:** Tradespeople on budget MVNOs (Tesco, Lyca, Lebara) cannot use call divert. For these clients, you need **Option B: Number Porting**.

### Number Porting (Alternative to Call Divert)
If call divert isn't available:
1. Client ports their existing number to your platform (Twilio/Vonage)
2. Number stays the same but is now managed by your SIP provider
3. Porting takes **10–15 working days** in UK
4. Client must contact old provider to authorize port
5. Ofcom rules govern the process; you need a porting agreement with your carrier

**Downside:** Much slower onboarding, more friction, potential for service interruption.

**Recommendation:** Use **call divert as default**; offer number porting only for clients on blocked MVNOs.

---

## 5. Recommended whoza.ai Telephony Stack

### Standard Setup (Per Client)

```
[Client's Existing Number: 0121 555 1234]
              |
              |  Call Divert (*21*)
              v
[whoza.ai Number: 0333 555 7890] — Provisioned via Twilio UK
              |
              |  Webhook/API
              v
[Retell AI / Autocalls.ai / Vapi]
              |
              |  AI Conversation
              v
[Call Outcome: Booking, Lead Capture, Transferred]
```

### Component Costs (Per Client, Per Month)

| Component | Supplier | Cost |
|-----------|----------|------|
| UK Phone Number | Twilio | £1–£3/month |
| Inbound Minutes | Twilio | £0.005–£0.01/min |
| AI Voice Agent | Retell AI / Autocalls | £0.07–£0.16/min |
| **Total per minute** | — | **£0.075–£0.17/min** |
| **Assumed usage: 300 min/month** | — | **£22.50–£51/month** |

### whoza.ai Pricing vs. Cost

| whoza.ai Plan | Price to Client | Est. AI+Telco Cost | Gross Margin |
|---------------|-----------------|-------------------|--------------|
| **Starter** | £49/month | ~£22.50–£30 | **£19–£26.50 (39–54%)** |
| **Growth** | £99/month | ~£37.50–£51 | **£48–£61.50 (48–62%)** |
| **Pro** | £199/month | ~£52.50–£76.50 | **£122.50–£146.50 (62–74%)** |

**Margin is healthy across all tiers.**

---

## 6. Compliance & Regulatory Notes

### Ofcom Requirements
- **Caller ID:** Must be valid and uniquely identify the caller (Ofcom rule from May 2023)
- **Number porting:** Ofcom mandates max 1 working day for intra-port (same network) but 10–15 days is realistic for cross-network
- **Emergency services:** Twilio supports 999/112 from UK numbers

### GDPR / Data Protection
- **Call recording:** If AI records calls for "training" or "quality," you need explicit consent or a lawful basis (legitimate interest with notification)
- **Data retention:** Transcripts and recordings need a retention policy
- **DPIA (Data Protection Impact Assessment):** Required for AI processing of personal data at scale — **your voice partner should handle this or you need one**
- **Action:** Verify with chosen voice partner: "Do you provide GDPR compliance docs, call recording consent flows, and data processing agreements?"

### PCI-DSS (If Taking Payments)
- If the AI agent takes card payments over phone, this becomes **PCI-DSS scope**
- **Recommendation:** Don't have the AI agent take payments directly. Instead, send a payment link via SMS/email (Stripe Payment Links) or transfer to a secure IVR.

---

## 7. Competitor Intelligence: How Existing Virtual Receptionists Work

### ReceptionHQ (UK Market Leader)
- Model: Client diverts existing number to assigned DID (01/02/0333/0800)
- Pricing: From £39/month (20 calls) to £199/month (200 calls)
- They handle: Human receptionist, message taking, call transfer, diary management
- **whoza.ai replaces:** Human receptionist with AI; keeps same divert model

### Moneypenny
- Model: Same divert-based model
- Pricing: Custom quotes; starts around £65/month
- **whoza.ai advantage:** 24/7 availability, instant setup, lower cost

### Answer4u
- Model: Same
- Pricing: From £29/month

**Key Insight:** The divert model is **proven and standard**. Tradespeople already understand "forward your calls to us." You're just replacing "us" with an AI.

---

## 8. Action Items for whoza.ai

### Immediate (This Week)
1. **Choose voice partner:** Retell AI or Autocalls.ai (decide on premium vs. cost-leadership positioning)
2. **Open Twilio UK account:** Provision test numbers, verify divert works from major carriers
3. **Test call divert:** Get SIMs from EE, Vodafone, O2, Three, giffgaff, Sky. Test *21* codes to Twilio number
4. **Test blocked MVNOs:** Verify Tesco, Lyca, Lebara, Voxi genuinely block divert

### Short-Term (Next 2 Weeks)
5. **Build onboarding flow:** "Dial *21* followed by [your whoza.ai number] then #" — one-page instruction per carrier
6. **Create divert check tool:** Web page where client enters their number; you call them and detect if divert is active (Twilio has Call Forwarding Lookup API for this)
7. **Draft number porting process:** For clients on blocked MVNOs — 15-day porting docs
8. **Verify partner compliance:** Get GDPR/DPIA docs from chosen voice partner

### Medium-Term (Pre-Launch)
9. **White-label dashboard:** If using Retell AI, configure custom branding; if using Vapi, build your own dashboard
10. **Margin stress-test:** Model at 100, 500, 1000 clients — ensure Twilio costs don't erode margins
11. **Explore Gamma/sipgate:** If scaling beyond 500 clients, wholesale SIP may cut costs by 50%+

---

## 9. Supplier Contact Points

| Supplier | Website | UK Number Cost | AI Cost/Min | Best Contact |
|----------|---------|---------------|-------------|--------------|
| **Twilio** | twilio.com/uk | £1–£3/mo + £0.005–£0.01/min | N/A (number only) | Sales: twilio.com/contact |
| **Retell AI** | retellai.com | Built-in | ~$0.10–$0.20 | hello@retellai.com |
| **Autocalls.ai** | autocalls.ai | Built-in | ~$0.09–$0.20 | autocalls.ai |
| **Vapi** | vapi.ai | Via Twilio/Vonage | ~$0.05–$0.10 voice | vapi.ai |
| **Vonage** | vonage.com | ~£1–£2/mo | N/A (number only) | vonage.com/communications-apis |
| **sipgate** | sipgate.co.uk | £4.95/mo | N/A | sipgate.co.uk |
| **Gamma** | gamma.co.uk | £5–10/channel | N/A | Channel partner only |

---

## 10. Final Recommendation

**For whoza.ai's go-to-market:**

1. **Primary Voice Partner:** **Retell AI** — best voice quality, built-in telephony, white-label friendly, UK-ready. If margin pressure is high, switch to **Autocalls.ai**.

2. **Primary Number Supplier:** **Twilio UK** — instant provisioning, proven divert compatibility, developer ecosystem. No need to manage SIP trunks at launch.

3. **Client Onboarding Method:** **Call divert via USSD** — *21*NUMBER# on most UK carriers. Keep existing number. 2-minute setup. Zero porting risk.

4. **Fallback for Blocked Carriers:** Number porting to Twilio (10–15 days) for clients on Tesco, Lyca, Lebara, Voxi, Virgin Mobile.

5. **Compliance:** Verify Retell AI provides GDPR data processing agreement and call recording consent tooling. If not, build a simple pre-call announcement: *"This call is being recorded for quality and training purposes."*

**The model is proven. The technology is ready. The only remaining question is which voice partner you trust for white-label fulfillment.**
