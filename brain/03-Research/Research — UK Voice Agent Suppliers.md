---
created: 2026-04-29
updated: 2026-04-29
tags: [research, voice, suppliers]
source: "Direct investigation, API docs, competitor benchmarking"
credibility: high
---

# Research — UK Voice Agent Suppliers

## Summary
Multiple voice agent platforms and UK number suppliers enable the white-label reseller model. Trillet chosen as primary. Retell as backup. Call divert from existing UK numbers is standard across most carriers.

## Voice Agent Platforms (UK-Ready)

### Tier 1: Best for White-Label Resellers

#### Retell AI ⭐ Top Pick
- **White-label:** Yes — fully customizable voice, persona, scripts
- **UK Telephony:** Yes — provisions UK numbers directly or via Twilio
- **Cost:** ~£0.08–£0.16/min all-in
- **Strengths:** Best-in-class voice quality (Cartesia/ElevenLabs), built-in telephony, real-time dashboard
- **Reseller Fit:** Excellent — rebrand dashboard and voice experience

#### Vapi
- **White-label:** Yes — API-first, full control
- **UK Telephony:** Yes — via Twilio/Vonage
- **Cost:** ~£0.06–£0.11/min
- **Strengths:** Lowest cost, maximum technical control, strong dev community
- **Reseller Fit:** Good for technical teams

#### Autocalls.ai ⭐ Lowest Cost at Scale
- **White-label:** Yes — full white-label
- **UK Telephony:** Yes — built-in global telephony
- **Cost:** ~$0.09/min (~£0.07/min) at scale
- **Strengths:** Lowest all-in cost, purpose-built for AI calling
- **Reseller Fit:** Excellent for cost-sensitive trades market

### Platform Comparison
| Platform | White-Label | UK Numbers | All-in £/min | Best For |
|----------|-------------|-----------|--------------|----------|
| **Retell AI** | ✅ Full | ✅ Built-in | £0.08–£0.16 | Premium positioning |
| **Vapi** | ✅ API | ⚠️ Via Twilio | £0.06–£0.11 | Technical control |
| **Autocalls.ai** | ✅ Full | ✅ Built-in | £0.07–£0.15 | Cost leadership |
| **Bland AI** | ❌ Limited | ✅ Via Twilio | £0.12–£0.25+ | Enterprise only |

## UK Number Suppliers

### Twilio
- **UK Numbers:** Local, mobile, national, toll-free
- **Call Divert:** Via Twilio SIP or call forwarding
- **API:** Full REST API
- **Cost:** ~£1.25/number/month + £0.005/min

### Telnyx
- **UK Numbers:** Local, national, toll-free
- **Cost:** Competitive, often cheaper than Twilio
- **API:** Full REST API + SIP trunking

### Aircall
- **UK Numbers:** Available
- **Model:** Per-user pricing
- **Best for:** Teams needing a phone system, not just a number

## Call Divert Compatibility
**Standard USSD codes work on most UK carriers:**
- **Activate:** `**21*[divert number]#` then call
- **Deactivate:** `#21#` then call
- **Check status:** `*#21#` then call

**Compatible carriers:** EE, Vodafone, O2, Three, BT, Virgin Mobile, Sky Mobile, Tesco Mobile, giffgaff

**Incompatible:** Some MVNOs disable call forwarding (rare)

## Resources
- Full deep dive: [[UK_VOICE_AGENT_SUPPLIER_DEEP_DIVE.md]] (flat file, 17KB)
- Retell investigation: [[RETELL_WHITE_LABEL_INVESTIGATION.md]] (flat file)
- Trillet design: [[TRILLET_DESIGN_AND_COSTING.md]] (flat file)

## Related
- [[Decision — Trillet as Voice Provider]] — Why Trillet won
- [[Project — Voice Agent White Label]] — Execution
- [[Index — Research]]
