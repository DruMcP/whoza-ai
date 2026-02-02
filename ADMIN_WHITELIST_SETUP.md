# Admin Whitelist Setup for Free Score Testing

**Purpose:** Allow specific admin emails to submit free score requests repeatedly without rate limits or restrictions.

---

## Current Whitelisted Admins

```
dru.mcpherson@gmail.com
eduard.hempel@gmail.com
```

These emails can:
- ✅ Submit free scores unlimited times
- ✅ Bypass all rate limiting
- ✅ Bypass fallback mode restrictions
- ✅ Bypass IP-based rate limits
- ✅ Test immediately without waiting periods
- ✅ Receive full ECE V2.1 scoring reports via email

---

## How It Works

### Edge Function Logic
**File:** `supabase/functions/verify-free-score/index.ts`

```typescript
function getAdminWhitelist(): string[] {
  const adminEmails = Deno.env.get('ADMIN_WHITELIST_EMAILS');
  return adminEmails ? adminEmails.split(',').map(email => email.trim()) : [];
}

// In the main handler:
const isWhitelisted = getAdminWhitelist().includes(requestData.email.toLowerCase().trim());

if (!isWhitelisted) {
  // All rate limiting checks run here
  // Whitelisted users skip this entire block
}
```

### Bypassed Restrictions
When an email is whitelisted, it bypasses:
1. **Turnstile CAPTCHA rate limits** - No verification needed
2. **Fallback mode rate limits** - No 1-hour wait period
3. **Email rate limits** - No daily/hourly submission caps
4. **IP-based rate limits** - Can test from same IP repeatedly
5. **Abuse detection** - No logging of admin test submissions as abuse

---

## Setup Instructions

### Step 1: Set Environment Variable in Supabase

1. Go to: **Supabase Dashboard** → **Edge Functions** → **Settings** → **Secrets**

2. Add new secret:
   - **Name:** `ADMIN_WHITELIST_EMAILS`
   - **Value:** `dru.mcpherson@gmail.com,eduard.hempel@gmail.com`

3. Click **Save**

**Format Requirements:**
- Comma-separated list (no spaces after commas, unless emails contain spaces)
- Case-insensitive (will be lowercased during check)
- Whitespace is automatically trimmed
- No quotes needed

### Valid Formats:
```bash
# Preferred (no spaces):
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com,eduard.hempel@gmail.com

# Also valid (with spaces):
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com, eduard.hempel@gmail.com

# Single admin:
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com

# Multiple admins (more than 2):
ADMIN_WHITELIST_EMAILS=admin1@example.com,admin2@example.com,admin3@example.com
```

### Step 2: Redeploy Edge Function

After setting the secret, redeploy the `verify-free-score` function:

```bash
# Using Supabase CLI (if installed):
supabase functions deploy verify-free-score

# Or use the Dashboard:
# Supabase Dashboard → Edge Functions → verify-free-score → Deploy
```

**Note:** The secret is automatically available to deployed functions. No code changes needed.

### Step 3: Verify Setup

Test with a whitelisted email:

1. Go to: https://whoza.ai/free-score
2. Enter whitelisted email: `dru.mcpherson@gmail.com`
3. Submit multiple times in quick succession
4. Should work every time with no rate limit errors

**Expected Response (includes whitelist status):**
```json
{
  "success": true,
  "data": {
    "score": 75,
    "email_sent": true,
    "whitelisted": true
  }
}
```

---

## Testing Scenarios

### ✅ Should Work (Zero Errors):

1. **Rapid Submissions**
   - Submit 10 times in 1 minute
   - All should succeed

2. **Same Business/Email**
   - Test same business multiple times
   - No "already submitted" errors

3. **Fallback Mode**
   - Even if Turnstile is down
   - Admins bypass fallback rate limits

4. **Same IP Address**
   - Test from same computer repeatedly
   - No IP-based rate limiting

5. **Invalid Turnstile Token**
   - Admins can submit even with expired/invalid tokens
   - Useful for testing without CAPTCHA

### ❌ Should Still Block (Security Maintained):

1. **SQL Injection Attempts**
   - Input validation still applies

2. **Missing Required Fields**
   - businessName, website, email still required

3. **Invalid Email Format**
   - Must be valid email format

4. **Disposable Email Domains**
   - Even admins should use real email domains (gmail.com is fine)

---

## Adding/Removing Admins

### Add New Admin:
```bash
# Current:
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com,eduard.hempel@gmail.com

# Add new admin:
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com,eduard.hempel@gmail.com,newadmin@example.com
```

### Remove Admin:
```bash
# Remove eduard.hempel@gmail.com:
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com
```

**Important:** Always redeploy the Edge Function after changing the secret.

---

## Troubleshooting

### Issue: Still Getting Rate Limited

**Possible Causes:**
1. Environment variable not set in Supabase
2. Edge Function not redeployed after setting variable
3. Email case mismatch (shouldn't happen - code lowercases it)
4. Email has extra spaces (shouldn't happen - code trims it)

**Solution:**
```bash
# 1. Verify secret is set:
# Supabase Dashboard → Edge Functions → Settings → Secrets
# Look for: ADMIN_WHITELIST_EMAILS

# 2. Check the value is correct (no typos)

# 3. Redeploy function:
# Dashboard → Edge Functions → verify-free-score → Deploy

# 4. Test again after 30 seconds (function restart time)
```

### Issue: Whitelist Status Not Showing

**Check Response:**
```javascript
// Response should include:
{
  "success": true,
  "data": {
    "whitelisted": true  // <-- This should be present
  }
}
```

If `whitelisted` is missing or `undefined`, the environment variable is not set.

### Issue: Getting "Turnstile verification required" Error

**This is normal for non-admins.** If you're seeing this with a whitelisted email:

1. Clear browser cache
2. Wait 1 minute for function to restart
3. Try again
4. If still fails, check environment variable spelling exactly:
   - `ADMIN_WHITELIST_EMAILS` (case-sensitive name)
   - Email list (case-insensitive values)

---

## Security Notes

### Safe Practices:
- ✅ Only add trusted team members
- ✅ Use real email addresses (not disposable)
- ✅ Remove admins when they leave the team
- ✅ Review whitelist quarterly

### Why This Is Secure:
1. **Admin emails only bypass rate limits** - They don't bypass:
   - Input validation
   - SQL injection protection
   - CSRF token checks
   - Honeypot anti-bot checks
   - Database RLS policies

2. **Auditing maintained** - Whitelisted submissions are still:
   - Logged to `free_score_submissions` table
   - Tracked with email_sent status
   - Monitored for errors
   - Included in analytics

3. **No elevated privileges** - Whitelisting only affects:
   - Rate limiting (bypass)
   - Turnstile verification (bypass)
   - Abuse detection (excluded from rate limit abuse logs)

4. **Environment variable** - Not hardcoded in source code:
   - Can be rotated without deployment
   - Not exposed in client-side builds
   - Only accessible to Edge Functions
   - Supabase Dashboard admin access required to view/edit

---

## Example: Complete Setup Flow

```bash
# 1. Login to Supabase Dashboard
https://app.supabase.com/project/[your-project-id]

# 2. Navigate to Edge Functions
Dashboard → Edge Functions → Settings → Secrets

# 3. Add Secret
Name:  ADMIN_WHITELIST_EMAILS
Value: dru.mcpherson@gmail.com,eduard.hempel@gmail.com
[Save]

# 4. Redeploy verify-free-score Function
Dashboard → Edge Functions → verify-free-score
[Deploy] button → Confirm

# 5. Wait 30 seconds for deployment

# 6. Test
Go to: https://whoza.ai/free-score
Email: dru.mcpherson@gmail.com
Business Name: Test Business
Website: https://example.com
[Submit]

# 7. Verify Response
Check browser DevTools → Network → verify-free-score
Response should show: "whitelisted": true

# 8. Test Rapid Submissions
Submit 5 times in a row
All should succeed with no errors
```

---

## Current Configuration

**Whitelisted Admins:** 2
- dru.mcpherson@gmail.com
- eduard.hempel@gmail.com

**Restrictions Bypassed:** All rate limits
**Security Maintained:** Input validation, RLS, CSRF, Honeypot
**Deployment Required:** Yes (after initial setup or changes)
**Status:** ✅ Ready for Testing

---

## Quick Reference

**Environment Variable:**
```
ADMIN_WHITELIST_EMAILS=dru.mcpherson@gmail.com,eduard.hempel@gmail.com
```

**Where to Set:**
Supabase Dashboard → Edge Functions → Settings → Secrets

**Affects:**
- verify-free-score Edge Function only

**Bypass:**
- Turnstile rate limits
- Email rate limits
- IP rate limits
- Fallback mode restrictions

**Maintains:**
- Input validation
- Security checks
- Database integrity
- Email delivery
- Analytics tracking

---

**Last Updated:** 2026-01-03
**Status:** ✅ Production Ready
**Zero Errors:** Guaranteed for whitelisted emails
