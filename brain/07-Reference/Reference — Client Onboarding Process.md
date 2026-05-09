---
created: 2026-04-29
updated: 2026-04-29
tags: [reference, onboarding, process]
---

# Reference — Client Onboarding Process

## Architecture
whoza.ai owns the client-facing portal. Trillet runs the voice engine underneath. Clients never see Trillet branding.

**Flow:**
```
[Client visits whoza.ai] → [Selects plan → Stripe payment] → [Auto-provisioned on Trillet]
 → [Gets whoza.ai dashboard] → [Sets up divert] → [Live in 10 minutes]
```

## Step-by-Step

### Step 1: Discovery & Signup (whoza.ai Website)
- Client visits `whoza.ai/pricing`
- Selects plan (Solo/Business/Professional/Enterprise)
- Clicks "Get Started" → Stripe Checkout
- Enters: business name, phone number, trade type, postcode
- Stripe processes payment
- whoza.ai backend triggers Trillet API

**Time elapsed:** 2 minutes

### Step 2: Trillet Sub-Account Auto-Provisioning
```
POST https://api.trillet.ai/v1/accounts
Body: {
  "name": "ABC Plumbing - whoza.ai",
  "plan": "sub-account",
  "region": "UK",
  "parent_account_id": "whoza_ai_master"
}
```

**Time elapsed:** 5–10 seconds

### Step 3: UK Phone Number Assignment
- Trillet assigns: `0333 XXX XXXX`
- whoza.ai stores: `trillet_phone_number`

**Time elapsed:** 2–3 seconds

### Step 4: AI Agent Configuration
- whoza.ai fetches client website (if provided)
- Auto-configures: voice persona, greeting script, business knowledge
- Trade-specific defaults: plumber, electrician, builder, etc.

**Time elapsed:** 10–20 seconds

### Step 5: Client Dashboard Access
- Client logs into `whoza.ai/portal`
- Sees: phone number, divert instructions, setup checklist
- Guided setup: "Dial `**21*0333XXXXXXX#` from your mobile"

**Time elapsed:** 1 minute

### Step 6: Test Call & Go-Live
- Client makes test call to their own number
- AI answers in their business name
- Client receives summary via WhatsApp/SMS
- Status: **LIVE**

**Total time from signup to live: 10–15 minutes**

## Resources
- Full process: [[CLIENT_ONBOARDING_PROCESS.md]] (flat file, 14KB)
- Voice design: [[TRILLET_DESIGN_AND_COSTING.md]] (flat file)
- Free trial design: [[FREE_TRIAL_DESIGN.md]] (flat file)

## Related
- [[Project — Voice Agent White Label]] — The product being onboarded
- [[Project — Free Trial Design]] — Trial flows into onboarding
- [[Process — New Project Kickoff]] — General project kickoff
- [[Index — Reference]]
