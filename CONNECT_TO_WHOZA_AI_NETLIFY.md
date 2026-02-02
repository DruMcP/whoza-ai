# Fix: Connect Bolt Deployment to whoza-ai Netlify Site

## Problem
Bolt is deploying to a DIFFERENT Netlify site, not to the correct "whoza-ai" project.

## Solution Applied ✅

### 1. Created `.bolt/config.json`
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

### 2. Updated `netlify.toml`
Added clear site identification comments at the top:
```toml
# Netlify Site Configuration for whoza-ai
# Site Name: whoza-ai
# Production URL: https://whoza.ai
# IMPORTANT: This project MUST deploy to the 'whoza-ai' Netlify site
```

---

## Manual Steps Required

### Option A: Link via Netlify CLI (Recommended)

1. **Unlink any existing site:**
   ```bash
   netlify unlink
   ```

2. **Link to the correct whoza-ai site:**
   ```bash
   netlify link
   ```
   
3. **Select from the list:**
   - Choose "whoza-ai" from the list of your Netlify sites
   - OR enter the site ID if you know it

4. **Verify the connection:**
   ```bash
   netlify status
   ```
   
   Should show:
   ```
   Site Name: whoza-ai
   URL: https://whoza.ai
   ```

### Option B: Manual Configuration File

If you have the Netlify site ID, create `.netlify/state.json`:

```bash
mkdir -p .netlify
```

```json
{
  "siteId": "YOUR_WHOZA_AI_SITE_ID_HERE"
}
```

To find your site ID:
1. Go to Netlify Dashboard
2. Select the whoza-ai site
3. Go to Site Settings → General
4. Copy the "Site ID"

---

## How to Deploy to whoza-ai

### From Bolt Interface

After fixing the configuration:
1. Click "Deploy" in Bolt
2. It should now deploy to whoza-ai
3. Verify the deployment goes to https://whoza.ai

### From Command Line

```bash
# Deploy to production
netlify deploy --prod --dir=dist

# Or use the custom script
./deploy-to-whoza-ai.sh
```

---

## Verification Checklist

After applying the fix:

- [ ] `.bolt/config.json` exists with whoza-ai configuration
- [ ] `netlify.toml` has whoza-ai site comments
- [ ] Run `netlify status` shows "Site Name: whoza-ai"
- [ ] Deploy from Bolt goes to https://whoza.ai
- [ ] Check Netlify Dashboard shows deployment on whoza-ai site

---

## Finding the Correct Site

### Check Current Netlify Link
```bash
netlify status
```

### List All Your Sites
```bash
netlify sites:list
```

### Get Site Info
```bash
netlify api getSite --data '{ "site_id": "YOUR_SITE_ID" }'
```

---

## Common Issues

### Issue: "Site not linked"
**Solution:**
```bash
netlify link
# Select whoza-ai from the list
```

### Issue: "Wrong site still showing"
**Solution:**
```bash
netlify unlink
rm -rf .netlify
netlify link
# Select whoza-ai
```

### Issue: "Can't find whoza-ai in list"
**Solution:**
1. Log in to Netlify Dashboard
2. Verify the site exists and you have access
3. Check if site is under a team account
4. Use `netlify switch` to switch teams if needed

### Issue: "Bolt still deploys to wrong site"
**Solution:**
1. Clear Bolt's cache (if possible)
2. Verify `.bolt/config.json` has correct settings
3. Try restarting Bolt/IDE
4. Use manual deployment as fallback

---

## Environment Variables

After linking to whoza-ai, verify environment variables:

```bash
netlify env:list
```

Required variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RESEND_API_KEY`
- `VITE_GOOGLE_PLACES_API_KEY`

If missing, set them:
```bash
netlify env:set VITE_SUPABASE_URL "your_value"
```

Or via Netlify Dashboard:
- Site Settings → Environment Variables

---

## Deployment Script

The `deploy-to-whoza-ai.sh` script includes verification:

```bash
#!/bin/bash
set -e

# Checks current site
CURRENT_SITE=$(netlify status --json | grep -o '"name":"[^"]*"' | cut -d'"' -f4)

# Warns if not whoza-ai
if [ "$CURRENT_SITE" != "whoza-ai" ]; then
    echo "⚠️  WARNING: Currently linked to: $CURRENT_SITE"
    echo "❌ Expected: whoza-ai"
    exit 1
fi

# Builds and deploys
npm run build
netlify deploy --prod --dir=dist
```

---

## Quick Fix Command

Run this to ensure proper configuration:

```bash
# Create .bolt directory with config
mkdir -p .bolt
cat > .bolt/config.json << 'JSON'
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
JSON

# Unlink and relink to whoza-ai
netlify unlink
netlify link

# Verify
netlify status
```

---

## Testing the Fix

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy manually first:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Verify deployment URL:**
   - Should be: https://whoza.ai
   - NOT: https://some-other-site.netlify.app

4. **Test in Bolt:**
   - Click Deploy button
   - Check deployment logs
   - Verify it goes to whoza-ai site

---

## Support

If issues persist:

1. **Check Netlify Dashboard:**
   - https://app.netlify.com
   - Find whoza-ai site
   - Check recent deployments

2. **Check Deployment Logs:**
   ```bash
   netlify watch
   ```

3. **Manual Deploy as Fallback:**
   - Netlify Dashboard → Deploys → Manual deploy
   - Drag and drop `dist/` folder

---

**Status:** ✅ Configuration files created and updated
**Next Step:** Run `netlify link` to connect to whoza-ai site
**Verification:** Run `netlify status` to confirm connection
