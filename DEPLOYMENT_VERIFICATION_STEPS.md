# URGENT: Deployment Verification Steps

## Problem Fixed

**ROOT CAUSE**: Vite config was stripping ALL console.log statements in production builds (line 28 of vite.config.js)

**FIX**: Temporarily disabled console.log removal to enable debugging

## Build Verification ✅

Confirmed all debug strings are in the built file:
- ✅ Component Mounted
- ✅ handleSubmit CALLED
- ✅ BUTTON CLICK
- ✅ FORM SUBMIT
- ✅ FREE SCORE API
- ✅ VERIFY SUBMISSION

## Deployment Steps

### 1. Deploy the New Build

Upload the entire `/dist` folder to your hosting provider. Make sure these files are deployed:

```
dist/assets/FreeScore-PUU17Nh8.js  (51.65 kB - NEW VERSION with logging)
dist/index.html                     (Updated references)
```

### 2. Verify Deployment

After deploying, check that the new files are live:

**Method A: Check JavaScript hash**
1. Open your live site
2. View page source (Ctrl+U or Cmd+U)
3. Search for "FreeScore"
4. You should see: `FreeScore-PUU17Nh8.js` (NOT FreeScore-lL5ztrwy.js)

**Method B: Check file timestamp**
1. Open: `https://your-domain.com/assets/FreeScore-PUU17Nh8.js`
2. File should exist and be ~51KB
3. If you get 404, deployment didn't complete

### 3. Clear Browser Cache

**Critical: You MUST hard refresh after deployment**

**Chrome/Firefox/Edge:**
- Windows: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**Safari:**
- Mac: `Cmd + Option + R`

**Alternative: Clear cache manually:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 4. Test Debug Logging

1. Open DevTools Console (F12 → Console tab)
2. Clear any existing logs (click 🚫 icon)
3. Go to `/free-score` page
4. **Expected output immediately:**

```
[FREE SCORE COMPONENT] ========================================
[FREE SCORE COMPONENT] Component Mounted/Rendering
[FREE SCORE COMPONENT] ========================================
[FREE SCORE COMPONENT] State: {step: 'form', loading: false, error: null, ...}
```

If you see this → Deployment is LIVE and working ✅

If you don't see this → One of these issues:
- ❌ Browser still has old cached version (try incognito/private window)
- ❌ Deployment not complete (check file exists)
- ❌ CDN not updated yet (wait 5 minutes, try again)

### 5. Test Form Submission

1. Fill out the form:
   - Business Name: Test Business
   - Trade Type: Plumber
   - Location: London
   - Email: test@example.com

2. Click "Get My Free Score"

3. **Watch Console - You should see this sequence:**

```
[BUTTON CLICK] ========================================
[BUTTON CLICK] Submit button clicked!
[BUTTON CLICK] ========================================

[FORM SUBMIT] ========================================
[FORM SUBMIT] Form onSubmit event triggered!
[FORM SUBMIT] Calling handleSubmit...
[FORM SUBMIT] ========================================

[FREE SCORE] ========================================
[FREE SCORE] handleSubmit CALLED
[FREE SCORE] Form Data: {...}
[FREE SCORE] Validation Result: {valid: true}
[FREE SCORE] ✅ Validation PASSED
[FREE SCORE] Calling submitScore...
[FREE SCORE] ========================================

[FREE SCORE API] ========================================
[FREE SCORE API] submitScore CALLED
[FREE SCORE API] Step 1: Calling verifySubmission...
[FREE SCORE API] ========================================

[VERIFY SUBMISSION] ========================================
[VERIFY SUBMISSION] Making FETCH call to: https://...
[VERIFY SUBMISSION] Payload: {...}
[VERIFY SUBMISSION] ========================================
[VERIFY SUBMISSION] Response status: 200 or 403
[VERIFY SUBMISSION] Response data: {...}
```

## Interpreting Results

### Scenario A: No Logs at All
**Problem**: Old cached version still loaded
**Solution**:
1. Try incognito/private window
2. Check if FreeScore-PUU17Nh8.js exists on server
3. Wait for CDN cache to clear (5-10 minutes)

### Scenario B: Component Logs Only
**Problem**: Button not clickable or JavaScript error
**Solution**: Look for red error messages in console

### Scenario C: Logs Stop at Validation
**Problem**: Form validation is blocking
**Solution**: The console will show the exact validation error message

### Scenario D: Response Status 403
**Expected behavior**: This means:
- ✅ Form IS submitting
- ✅ Fetch call IS being made
- ❌ Backend is rejecting with "Invalid security token"

**This is the current behavior you're seeing.**

If you see Response Status 403, the frontend is working correctly. The issue is in the backend edge function `verify-free-score`.

### Scenario E: Response Status 200
**Success!** The form is submitting and backend is accepting it.

## Next Steps After Testing

1. **Copy the ENTIRE console output** from your test
2. Share it to confirm what's happening
3. If you see 403 errors, we'll need to fix the backend edge function

## Important Notes

- The debug logging will make the JavaScript bundle slightly larger (~9KB increase)
- After debugging is complete, we should re-enable console.log stripping in vite.config.js line 29
- The current build has a hash of `PUU17Nh8` - if you see any other hash, it's the old version
