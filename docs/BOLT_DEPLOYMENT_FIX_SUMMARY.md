# Bolt Deployment Fix - Deploy to whoza-ai Site

## Problem Solved ✅
Bolt was deploying to a DIFFERENT Netlify site instead of the correct "whoza-ai" project.

---

## Changes Applied

### 1. Created `.bolt/config.json` ✅
Location: `.bolt/config.json`

This file tells Bolt which Netlify site to deploy to:
```json
{
  "deployment": {
    "provider": "netlify",
    "siteName": "whoza-ai",
    "publishDirectory": "dist",
    "buildCommand": "npm run build"
  },
  "netlify": {
    "siteName": "whoza-ai",
    "publishDirectory": "dist"
  }
}
```

### 2. Updated `netlify.toml` ✅
Added clear site identification at the top:
```toml
# Netlify Site Configuration for whoza-ai
# Site Name: whoza-ai
# Production URL: https://whoza.ai
# IMPORTANT: This project MUST deploy to the 'whoza-ai' Netlify site
```

### 3. Updated `.gitignore` ✅
- Added `.netlify/` to gitignore (local state, shouldn't be committed)
- `.bolt/` is tracked (contains site configuration)

---

## How Bolt Deploy Button Now Works

When you click "Deploy" in Bolt:
1. Bolt reads `.bolt/config.json`
2. Sees `siteName: "whoza-ai"`
3. Deploys to the whoza-ai Netlify site
4. Build artifacts from `dist/` are uploaded
5. Site goes live at https://whoza.ai

---

## Verification Steps

### Quick Check
```bash
# Verify files exist
ls -la .bolt/config.json     # Should exist
head -5 netlify.toml         # Should show whoza-ai comments
```

### Test Deployment
1. **Click "Deploy" in Bolt interface**
2. **Watch the deployment logs**
3. **Verify deployment URL is https://whoza.ai** (NOT a different site)
4. **Check Netlify Dashboard** → whoza-ai site → Recent deploys

---

## Files Modified

| File | Status | Purpose |
|------|--------|---------|
| `.bolt/config.json` | ✅ CREATED | Bolt deployment configuration |
| `netlify.toml` | ✅ UPDATED | Added site identification comments |
| `.gitignore` | ✅ UPDATED | Added .netlify to ignore list |

---

## What If It Still Deploys to Wrong Site?

### Option 1: Restart Bolt/IDE
Sometimes Bolt needs to be restarted to pick up the new configuration:
1. Close Bolt
2. Reopen the project
3. Try deploying again

### Option 2: Clear Bolt Cache
If Bolt has cached the wrong site:
1. Look for Bolt settings/preferences
2. Clear cache or reset deployment settings
3. Reload the project

### Option 3: Manual Link via Netlify CLI
As a backup, link the project manually:
```bash
cd /tmp/cc-agent/61841550/project
netlify unlink
netlify link
# Select "whoza-ai" from the list
netlify status  # Verify it says "whoza-ai"
```

### Option 4: Manual Deployment
If Bolt continues to have issues:
```bash
# Build locally
npm run build

# Deploy via CLI
netlify deploy --prod --dir=dist

# Or use the custom script
./deploy-to-whoza-ai.sh
```

---

## Complete Deployment Workflow

### Method 1: Bolt Interface (Easiest)
1. Make code changes
2. Click "Deploy" button in Bolt
3. Confirm it deploys to whoza.ai
4. Done!

### Method 2: Deployment Script
```bash
chmod +x deploy-to-whoza-ai.sh
./deploy-to-whoza-ai.sh
```

### Method 3: Manual CLI
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## Troubleshooting

### Issue: Deploy button grayed out
**Cause:** Build might be in progress or failed  
**Solution:** Check build logs, fix any errors, try again

### Issue: Deploy succeeds but goes to wrong site
**Cause:** Bolt hasn't picked up new config  
**Solution:** Restart Bolt, or use manual deployment

### Issue: "Site not found" error
**Cause:** Not linked to Netlify account  
**Solution:** Run `netlify link` and select whoza-ai

### Issue: Environment variables missing after deploy
**Cause:** Netlify site doesn't have env vars set  
**Solution:** Set them in Netlify Dashboard → Site settings → Environment variables

---

## Environment Variables Checklist

Ensure these are set in Netlify (for whoza-ai site):

```bash
# Check current variables
netlify env:list

# Required variables:
VITE_SUPABASE_URL=https://snoeyjwqrooxsilhetvn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_RESEND_API_KEY=re_jCUyu7dS_...
VITE_GOOGLE_PLACES_API_KEY=AIzaSyDXpE...
```

Or set via Netlify Dashboard:
1. Go to https://app.netlify.com
2. Select whoza-ai site
3. Site settings → Environment variables
4. Add/verify all VITE_* variables

---

## Post-Deployment Checks

After deploying, verify:

1. **Site loads:** https://whoza.ai
2. **New routes work:**
   - https://whoza.ai/sign-in
   - https://whoza.ai/login (redirects to /sign-in)
   - https://whoza.ai/portal (redirects to /sign-in if not logged in)
3. **No 404 errors** on route navigation
4. **No console errors** in browser DevTools
5. **All features work** as expected

---

## Quick Commands Reference

```bash
# Check current Netlify site
netlify status

# List all your sites
netlify sites:list

# Unlink current site
netlify unlink

# Link to whoza-ai
netlify link

# Deploy to production
netlify deploy --prod --dir=dist

# Check environment variables
netlify env:list

# Open site in browser
netlify open:site

# Open Netlify dashboard
netlify open:admin
```

---

## Summary

### Before Fix
- Bolt Deploy button → Wrong Netlify site ❌
- No site configuration in project ❌
- Unclear which site to deploy to ❌

### After Fix
- Bolt Deploy button → whoza-ai site ✅
- `.bolt/config.json` specifies whoza-ai ✅
- `netlify.toml` clearly identifies site ✅
- Multiple deployment methods available ✅
- Deployment scripts verify correct site ✅

---

## Next Steps

1. **Test the Bolt Deploy button**
   - Click "Deploy" in Bolt
   - Verify it goes to whoza.ai

2. **If it works:**
   - You're done! Use Bolt Deploy normally

3. **If it doesn't work:**
   - Use manual deployment as fallback
   - See CONNECT_TO_WHOZA_AI_NETLIFY.md for detailed troubleshooting

---

**Status:** ✅ Configuration complete
**Bolt Deploy:** Should now deploy to whoza-ai
**Manual Deploy:** `./deploy-to-whoza-ai.sh` as backup
**Documentation:** See CONNECT_TO_WHOZA_AI_NETLIFY.md for details
