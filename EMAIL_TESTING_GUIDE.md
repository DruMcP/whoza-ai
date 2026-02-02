# Free VCS Email Testing Guide

**Date**: December 31, 2024
**Status**: ✅ Enhanced logging deployed + Test commands ready

---

## 🎯 WHAT WAS DONE

1. **Added comprehensive logging** to freeScoreService.js
2. **Added user-visible warnings** when email fails
3. **Created test script**: `test-edge-function.sh`
4. **Built and deployed** successfully

---

## 🧪 HOW TO TEST

### Test 1: Via Live Form (RECOMMENDED)

1. Open browser DevTools (F12) → Console tab
2. Go to: https://whoza.ai/free-score
3. Fill in form with email: dru.mcpherson@gmail.com
4. Submit and watch console output

**Look for**:
```
[FREE SCORE] ✅ Database insert successful
[FREE SCORE] ✅ Email sent successfully!
```

### Test 2: Edge Function Directly

```bash
./test-edge-function.sh
```

**Expected**: `✅ SUCCESS! Email sent.`

### Test 3: Check Database

```sql
SELECT id, business_name, email, email_sent, email_sent_at
FROM free_score_submissions
WHERE email = 'dru.mcpherson@gmail.com'
ORDER BY created_at DESC LIMIT 3;
```

---

## 🔍 WHAT TO LOOK FOR

**Success**:
```
[FREE SCORE] ✅ Database insert successful
[FREE SCORE] ✅ Email sent successfully!
```

**Database Error**:
```
[FREE SCORE] ❌ Database error: {...}
```

**Email Error (Resend Sandbox)**:
```
[FREE SCORE] ❌ Email send failed: You can only send testing emails...
```

---

## 🎯 MOST LIKELY ISSUE

**Resend Sandbox Mode** (emails only work for dru.mcpherson@gmail.com)

**Fix**: See EMAIL_FIX_QUICK_START.md
- Verify custom domain in Resend (10 min)
- Update sender address
- Redeploy

---

## ✅ TEST RESULTS

Edge function test via script:
```
✅ SUCCESS! Email sent.
Email ID: 25891635-cb36-457c-961d-b4fa54e0f9d8
```

**Conclusion**: Edge function works, likely in Resend sandbox mode

---

**The console now tells you exactly what's happening!** 🔍

See **EMAIL_DEBUG_COMPREHENSIVE.md** for complete debug guide.
