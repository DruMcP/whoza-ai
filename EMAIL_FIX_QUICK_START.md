# 🔴 URGENT: Fix Free VCS Emails (10 Minutes)

**Status**: Emails only work for dru.mcpherson@gmail.com
**Impact**: 100% of customer emails are failing
**Fix Time**: 10 minutes

---

## THE PROBLEM

✅ Email system is working correctly
✅ Code is correct
✅ API keys are configured
❌ **Resend is in SANDBOX MODE**

**Result**: Emails only send to dru.mcpherson@gmail.com (your verified email)

**Test Proof**:
```bash
# This WORKS ✅
Email to: dru.mcpherson@gmail.com
Result: SUCCESS (Email ID: be55d77a-a22f-4e32-b6ac-9b00aa60f130)

# This FAILS ❌
Email to: test@example.com
Result: "You can only send testing emails to your own email address"
```

---

## THE FIX (3 STEPS)

### Step 1: Verify Your Domain (10 minutes)

1. **Go to Resend**
   ```
   https://resend.com/domains
   ```

2. **Add Domain**
   - Click: "Add Domain"
   - Enter: `whoza.ai` (or use `mail.whoza.ai`)
   - Click: "Add"

3. **Add DNS Records**
   - Resend shows you 3 DNS records (SPF, DKIM, DMARC)
   - Go to your DNS provider (Cloudflare/Namecheap/etc)
   - Add all 3 records exactly as shown
   - Wait 2-5 minutes

4. **Verify**
   - Click "Verify Domain" in Resend
   - Status should show: ✅ Verified

### Step 2: Update Sender Address (2 minutes)

**File**: `supabase/functions/send-free-score-email/index.ts`
**Line**: 269

**Change this**:
```typescript
from: 'Whoza AI <onboarding@resend.dev>',
```

**To this**:
```typescript
from: 'Whoza AI <hello@whoza.ai>',
```

### Step 3: Redeploy Edge Function (1 minute)

The edge function will be automatically redeployed on your next build/deploy, or you can redeploy it manually via Supabase dashboard.

---

## TEST IT WORKS

After completing steps above:

### Test 1: Via Form
1. Go to: https://whoza.ai/free-score
2. Submit with ANY email address
3. Check inbox (1-2 minutes)
4. ✅ Email should arrive

### Test 2: Check Database
```sql
SELECT business_name, email, email_sent
FROM free_score_submissions
WHERE created_at >= NOW() - INTERVAL '10 minutes';
```

Expected: `email_sent` = TRUE for all submissions

---

## WHY THIS HAPPENED

**Resend starts ALL accounts in "sandbox mode"**:
- Security feature to prevent spam
- Forces proper domain setup
- Can only send to verified email (yours)
- Standard industry practice

**To enable production mode**:
- MUST verify a custom domain
- MUST update sender address
- Then emails work for everyone

---

## DOMAIN SETUP OPTIONS

### Option A: mail.whoza.ai (Recommended)
- Professional
- Keeps email separate
- Easier to manage
- Industry standard

### Option B: whoza.ai
- Simpler
- Shorter email address
- More recognizable

Both work equally well. Choose what you prefer.

---

## DNS RECORDS EXAMPLE

**Your actual records will be different**. Copy them EXACTLY from Resend.

```
Type: TXT
Name: resend._domainkey.whoza.ai
Value: v=DKIM1; k=rsa; p=MIGfMA0GCS...
TTL: 300

Type: TXT
Name: whoza.ai
Value: v=spf1 include:_spf.resend.com ~all
TTL: 300

Type: TXT
Name: _dmarc.whoza.ai
Value: v=DMARC1; p=none; rua=mailto:dmarc@whoza.ai
TTL: 300
```

---

## COSTS

- Domain verification: **FREE**
- Sending emails: **FREE** (up to 3,000/month)
- Your current volume: ~100/month (well within free tier)

**No additional cost to fix this**

---

## CURRENT IMPACT

**Working**:
- dru.mcpherson@gmail.com ✅

**Broken**:
- Every other email address ❌
- All customer emails ❌
- All lead generation ❌

**After Fix**:
- All emails work ✅
- Lead generation functional ✅
- Professional sender address ✅

---

## DETAILED REPORTS

- **EMAIL_BUG_FINAL_REPORT.md** - Complete technical analysis (30+ pages)
- **FIX_EMAIL_NOW.md** - Original quick fix guide
- **This file** - Simplest quick start guide

---

## NEED HELP?

**Resend Support**:
- https://resend.com/docs
- support@resend.com

**DNS Issues**:
- https://dnschecker.org (check propagation)
- Your DNS provider's support

---

## QUICK CHECKLIST

- [ ] Go to resend.com/domains
- [ ] Add whoza.ai domain
- [ ] Copy 3 DNS records
- [ ] Add records to DNS provider
- [ ] Wait 5 minutes
- [ ] Verify domain in Resend (should show ✅)
- [ ] Update sender address in code (line 269)
- [ ] Redeploy edge function
- [ ] Test with any email address
- [ ] Verify email arrives

**Time**: 10-15 minutes total
**Priority**: 🔴 CRITICAL

---

**Do this now to enable customer emails.** 🚀
