# Retell AI White-Label Investigation
## Client-by-Client Basis · Upfront Fees · Feasibility for whoza.ai
**Date:** 2026-04-28  
**Classification:** Internal — Supplier Vetting  
**Status:** VERIFIED — Not Suitable Out-of-Box

---

## 1. Executive Summary

**Bottom line:** Retell AI does **NOT** offer native white-labeling for agencies. It is developer infrastructure, not a reseller platform. You can use it as the voice engine **underneath** a white-label layer you build (or buy from a third-party wrapper), but Retell itself has:
- ❌ No white-label dashboard
- ❌ No sub-accounts / multi-tenancy
- ❌ No client billing / wallet system
- ❌ No custom branding

**Upfront fees:** Zero platform fee. Pay-as-you-go only ($10 free credits to start). But the **real cost** is the build work to create a client-facing layer on top.

**Verdict for whoza.ai:** Retell is a strong voice engine, but you would need to either (a) build a white-label portal yourself, or (b) use a wrapper platform like ChatDash/Voicerr. For speed-to-market, **Trillet or Stammer.ai** are better native white-label options.

---

## 2. Retell AI Pricing — Confirmed

| Plan | Cost | What's Included |
|------|------|----------------|
| **Pay-As-You-Go** | **$0** to start · $0.07+/min voice · $0.002+/msg chat | $10 free credits, 20 free concurrent calls, 10 free knowledge bases, Discord + email support, self-serve |
| **Enterprise** | Custom quote | Higher concurrency, custom deployment, premium support, optional white-glove service |

**Key facts:**
- ✅ **No monthly platform fee**
- ✅ **No setup fee**
- ✅ **No contract**
- ✅ **$10 free credits** = enough to test dozens of calls
- ⚠️ **Real all-in cost:** $0.12–$0.31/min once you add LLM + telephony + premium voice

**So: NO upfront fees. BUT also NO white-label.**

---

## 3. White-Label Reality Check

### What Retell AI Actually Is
Retell sells **raw voice AI infrastructure** — voice engine, LLM connectors, telephony APIs. It is built for developers building custom products, not for agencies reselling to clients.

### What You Would Need to Build Yourself
To white-label Retell for client-by-client resale, you need to build:

| Component | What Retell Provides | What You Must Build |
|-----------|---------------------|---------------------|
| Voice AI engine | ✅ Core API | ❌ Nothing |
| Client dashboard | ❌ Nothing | ✅ Full web app with auth, analytics, call logs |
| Sub-accounts / multi-tenancy | ❌ Nothing | ✅ Isolated workspaces per client |
| Custom branding (logo, colors, domain) | ❌ Nothing | ✅ White-label theming engine |
| Billing / usage tracking per client | ❌ Nothing | ✅ Metering + invoicing system |
| Call recording access per client | ❌ Nothing | ✅ Secure audio file delivery per tenant |
| CRM integrations | ✅ Webhooks | ✅ Client-specific CRM connectors |
| Compliance (GDPR/consent flows) | ❌ SOC 2/HIPAA at infra level | ✅ UI-layer consent + DPA management |

**Estimate to build this:** 4–8 weeks of engineering time, then ongoing maintenance.

### Third-Party Wrappers (Shortcut, But Adds Cost)
Some platforms wrap Retell with a white-label dashboard:

| Wrapper | Monthly Cost | Sub-Accounts | Notes |
|---------|--------------|--------------|-------|
| **ChatDash** | $300–$600/mo | Unlimited | Retell/Voiceflow wrapper; $200/mo HIPAA add-on |
| **Voicerr** | $28/mo | Up to 1,000 | VAPI + Retell wrapper; no compliance certs; Discord support |
| **VoiceAIWrapper** | $299/mo | Unlimited | Multi-provider (VAPI, Retell, ElevenLabs, etc.) |

**Problem with wrappers:**
- You now depend on a small startup (longevity risk)
- Two invoices: wrapper + Retell usage
- They can't fix Retell outages — you're two layers away from the infrastructure
- No SOC 2 / GDPR guarantees on most wrappers

---

## 4. Retell AI vs. Native White-Label Platforms

| Platform | White-Label | Sub-Accounts | Monthly Fee | All-in £/min | Notes |
|----------|-------------|--------------|-------------|--------------|-------|
| **Retell AI** | ❌ None | ❌ None | $0 | $0.12–$0.31 | Dev infrastructure only |
| **Trillet** | ✅ Full native | ✅ Unlimited at $299/mo | $99 (3 subs) / $299 (unlimited) | ~$0.09 | Built for agencies; 5-min setup |
| **Stammer.ai** | ✅ Full native | ✅ Unlimited | $197/mo | $0.11–$0.17 | Wallet billing, no rev share, GHL integration |
| **Synthflow** | ✅ Full native | ✅ Unlimited at $1,400/mo | $1,400/mo | $0.12 | Enterprise-focused; SOC 2/HIPAA/GDPR |
| **Assistable.ai** | ✅ Full native | ✅ 3 subs at $225/mo | $225/mo | $0.07 | Deep GoHighLevel integration |
| **Convocore** | ✅ Full native | ✅ Unlimited | $20/mo + $200 white-label | $0.05–$0.10 | Newer platform; lower cost |
| **Thinkrr** | ✅ Full native | ✅ Unlimited at $499/mo | $499/mo | $0.18–$0.22 | GHL-focused; one-time included minutes |

---

## 5. What "Client-by-Client" Means for Retell

If you still want to use Retell, here's what "client-by-client" looks like:

### Option A: Build Your Own Portal (Maximum Control)
```
[Your whoza.ai Dashboard]
    ├── Client A sub-account → Retell API key A → Twilio number A
    ├── Client B sub-account → Retell API key B → Twilio number B
    └── Client C sub-account → Retell API key C → Twilio number C
```
- You manage all API keys, Twilio numbers, and usage
- You bill clients directly via Stripe
- You build all analytics, call logs, recording access
- **Timeline:** 4–8 weeks dev, then ongoing maintenance
- **Cost:** Dev time + Retell usage + Twilio numbers

### Option B: Use Retell "Teams" / Workspaces (Limited)
Retell has a workspace/team concept, but it is NOT multi-tenant:
- All team members see ALL agents and calls
- No client isolation
- No custom branding
- **Not suitable** for client-by-client resale

### Option C: Wrapper + Retell (Fastest But Riskiest)
```
[Voicerr $28/mo] → [Retell $0.07+/min] → [Twilio numbers]
```
- Voicerr gives you white-label dashboard + sub-accounts
- Retell provides the voice engine underneath
- **Risk:** Voicerr is a small team, no compliance certs, inherits Retell outages

---

## 6. Financial Modeling: Retell vs. Native White-Label

### Scenario: 20 clients, 300 min/client/month = 6,000 min total

| Cost Layer | Retell (Build Your Own) | Retell + Voicerr Wrapper | Trillet Agency |
|-----------|------------------------|-------------------------|----------------|
| Platform fee | $0 | $28/mo | $299/mo |
| Voice AI (6,000 min) | ~$720/mo ($0.12/min) | ~$720/mo | ~$540/mo ($0.09/min) |
| Telephony (Twilio) | ~$60/mo | ~$60/mo | Included |
| Engineering / build | $5,000–$15,000 one-time | $0 | $0 |
| Maintenance | $1,000–$2,000/mo | $0 | $0 |
| **Total Year 1** | **$15,320–$31,320** | **$9,696** | **$10,068** |

**Surprise:** Building your own portal on Retell costs MORE in Year 1 than using Trillet or a wrapper, due to engineering costs.

---

## 7. Compliance Notes for Retell

| Requirement | Retell Status | Who Handles It |
|-------------|---------------|----------------|
| SOC 2 | ✅ Type II | Retell |
| HIPAA | ✅ Infra-level | Retell |
| GDPR / Data Processing | ⚠️ Infra-level only | **You must build consent flows + DPA** |
| Call recording consent | ❌ No built-in UI | **You must build pre-call announcement** |
| UK data residency | ⚠️ US-hosted | Check if acceptable for your clients |

**Action:** If using Retell, you need to add a GDPR-compliant call recording notice before the AI answers.

---

## 8. Final Verdict & Recommendation

### Can you white-label Retell on a client-by-client basis with no upfront fees?

**Technically yes, practically no.**

- ✅ No upfront fees: True — $0 platform fee, $10 free credits, pay-as-you-go
- ❌ No native white-label: You must build it or use a wrapper
- ❌ No client isolation: No sub-accounts, no per-client billing, no custom branding

### Recommendation for whoza.ai

| Priority | Recommendation |
|----------|----------------|
| **Speed to market** | Use **Trillet** ($299/mo Agency) or **Stammer.ai** ($197/mo) — native white-label, no build work |
| **Maximum margin** | Use **Convocore** ($220/mo effective) or **Assistable.ai** ($225/mo) — lower per-minute cost |
| **Maximum control** | Use **Retell + build your own portal** — but budget 4–8 weeks + £5K–£15K dev cost |
| **Risk tolerance low** | Avoid wrappers (Voicerr, ChatDash) — too many dependency layers, no compliance certs |

### If You Still Want Retell

1. **Accept the build cost:** Budget £5K–£15K to build a white-label dashboard
2. **Use Twilio UK** for numbers and call divert compatibility
3. **Add GDPR call recording consent** in your build
4. **Model margins carefully:** At $0.12–$0.31/min all-in, your £99/mo Growth plan has thinner margins
5. **Consider Retell Enterprise:** Contact sales for custom pricing — may unlock better rates at scale

---

## 9. Next Steps

1. **Decision point:** Do you want to BUILD a white-label layer (Retell/Vapi) or BUY a native white-label platform (Trillet/Stammer/Convocore)?
2. **If buying:** I can deep-dive Trillet, Stammer, or Convocore next
3. **If building:** I can scope the white-label dashboard build requirements and estimate dev time

**My recommendation for whoza.ai:** Go with **Trillet Agency** ($299/mo) or **Stammer.ai** ($197/mo) for fastest launch with no build work. Both allow unlimited client sub-accounts, custom branding, and have no per-client upfront fees.
