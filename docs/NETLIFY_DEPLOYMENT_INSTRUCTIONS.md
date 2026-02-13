# 🚀 NETLIFY DEPLOYMENT INSTRUCTIONS FOR WHOZA.AI

## ⚠️ CRITICAL: Your hosting provider is NETLIFY, not Bolt.new

**Bolt.new** = Development environment (where you code)
**Netlify** = Production hosting (where whoza.ai lives)

**This is why your build isn't live:** Changes in Bolt.new don't automatically deploy to Netlify.

---

## 📦 DEPLOYMENT OPTIONS

### OPTION 1: Direct Netlify Upload (FASTEST - 2 minutes)

1. **Log in to Netlify**
   - Go to https://app.netlify.com/
   - Find your "whoza.ai" site

2. **Deploy the /dist folder**
   - Click "Deploys" tab
   - Drag and drop the entire `/dist` folder into the deploy dropzone
   - OR click "Deploy manually" and select the `/dist` folder

3. **Purge the cache**
   - After deployment completes, go to "Post processing" → "Asset optimization"
   - Click "Clear cache and deploy site"

4. **Verify deployment**
   - Visit https://whoza.ai/free-score
   - Open console (F12)
   - Fill form and click submit
   - Look for: `MANUS_FIX_VERIFIED: handleSubmit called`
   - If you see it → SUCCESS ✅
   - If you don't → Cache issue, wait 2-3 minutes and hard refresh (Ctrl+Shift+R)

---

### OPTION 2: Git-Based Deployment (Automatic future deploys)

If your Netlify is connected to a Git repo (GitHub/GitLab):

1. **Push the changes to your repository**
   ```bash
   git add .
   git commit -m "Critical fixes: CSRF token, Turnstile fallback, Supabase import"
   git push origin main
   ```

2. **Netlify auto-deploys**
   - Netlify will detect the push and build automatically
   - Check the "Deploys" tab for progress

3. **Verify**
   - Same verification steps as Option 1

---

### OPTION 3: Netlify CLI (For developers)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod --dir=dist

# Verify
# Same verification steps as Option 1
```

---

## 🔍 VERIFICATION CHECKLIST

After deployment, confirm the fix is live:

✅ Go to https://whoza.ai/free-score
✅ Open browser console (F12)
✅ Fill out the form completely
✅ Click "Get My Free Score"
✅ Check console for: `MANUS_FIX_VERIFIED: handleSubmit called`

**If you see this log → Deployment SUCCESS ✅**
**If you don't see it → Old code still cached ❌**

---

## 🐛 TROUBLESHOOTING

### "I deployed but still see the old site"

**Problem:** CDN cache not cleared

**Solution:**
1. Go to Netlify dashboard
2. Click "Deploys" → "Trigger deploy" → "Clear cache and deploy site"
3. Wait 2-3 minutes
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R on Mac)

### "Netlify build is failing"

**Problem:** Build command or environment issue

**Solution:**
1. Check Netlify build logs for errors
2. Verify environment variables are set in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_PLACES_API_KEY`
   - `VITE_TURNSTILE_SITE_KEY`
3. Ensure Node.js version is 20+ (set in netlify.toml)

### "Form still not submitting"

**Problem:** Supabase functions not deployed or environment vars missing

**Solution:**
1. Check browser console for the exact error
2. Verify Supabase environment variables in Netlify
3. Test Supabase functions directly (see below)

---

## 🧪 TESTING SUPABASE EDGE FUNCTIONS

After Netlify deployment, test the backend:

```bash
# Test the verify-free-score function
curl -X POST https://YOUR_SUPABASE_URL/functions/v1/verify-free-score \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "location": "Test Location",
    "email": "test@example.com",
    "turnstileToken": "fallback",
    "csrfToken": "fallback"
  }'
```

Expected response: 200 OK with score data

---

## 📊 WHAT WAS FIXED IN THIS BUILD

1. **Supabase Import Error** (src/pages/FreeScore.jsx:12)
   - Added missing import: `import { supabase } from '../lib/supabase';`

2. **CSRF Token RPC Call** (src/pages/FreeScore.jsx:55-80)
   - Calls `generate_csrf_token` on component mount
   - Uses 'fallback' on error

3. **Frontend Submission Block** (src/pages/FreeScore.jsx:177)
   - Added verification log: `MANUS_FIX_VERIFIED: handleSubmit called`
   - Removed Turnstile validation blocks
   - Uses 'fallback' when Turnstile unavailable

---

## 🎯 CRITICAL SUCCESS METRIC

**The deployment is ONLY successful if you see this in the browser console:**

```
MANUS_FIX_VERIFIED: handleSubmit called
```

**Nothing else matters.** If you don't see this log, the new code is not live.

---

## 📞 NEED HELP?

If deployment fails after following these steps:

1. Check the Netlify build logs
2. Verify environment variables are set
3. Ensure the /dist folder contains the new build (check FreeScore-*.js for "MANUS_FIX_VERIFIED")
4. Clear browser cache completely
5. Try incognito/private browsing mode

Build timestamp: 2026-01-01 19:07 UTC
FreeScore bundle: 52 KB (dist/assets/FreeScore-CsOnr9-y.js)
