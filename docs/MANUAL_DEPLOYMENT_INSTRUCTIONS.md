# Manual Deployment to whoza-ai Netlify Site

## Issue Identified

The Bolt "Deploy" button is not deploying to the whoza-ai Netlify site. Bolt has its own internal site connection that `.bolt/config.json` cannot override.

## Solution: Manual Deployment

### Option 1: Netlify Dashboard (Recommended)

1. **Build completed successfully** - dist/ folder is ready
2. Go to: https://app.netlify.com
3. Navigate to your **whoza-ai** site
4. Click **"Deploys"** tab
5. Drag and drop the **entire `dist/` folder** onto the deploy area
6. Wait for deployment to complete
7. Verify at: https://whoza.ai

### Option 2: Netlify CLI (If you have access)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to whoza-ai site
netlify link
# Select "whoza-ai" from the list

# Deploy to production
netlify deploy --prod --dir=dist

# Or combine in one command (if you know the site ID)
netlify deploy --prod --dir=dist --site=<SITE_ID>
```

### Finding Your Site ID

1. Go to https://app.netlify.com
2. Open your **whoza-ai** site
3. Go to **Site settings**
4. Look for **Site information** → **API ID**
5. Use that ID in the deploy command:
   ```bash
   netlify deploy --prod --dir=dist --site=<API_ID>
   ```

## Build Verification

Latest build output:
```
✓ 498 modules transformed
✓ built in 15.84s

dist/index.html                    17.18 kB
dist/assets/index-Zsw4n4G9.js     476.27 kB
dist/assets/supabase-vendor...    166.11 kB
+ 30 more optimized files
```

## Post-Deployment Checklist

After deploying via dashboard or CLI:

1. ✅ Check Netlify dashboard shows new deployment
2. ✅ Test https://whoza.ai/ (home page)
3. ✅ Test https://whoza.ai/sign-in
4. ✅ Test https://whoza.ai/portal (should redirect to sign-in)
5. ✅ Check browser console for errors
6. ✅ Verify all routes work correctly

## Why Bolt's Deploy Button Doesn't Work

Bolt maintains its own internal Netlify site connection that cannot be changed via configuration files. The `.bolt/config.json` file we created doesn't affect where Bolt deploys - it has its own persistent site association.

**Solution:** Always use manual deployment (dashboard or CLI) for the whoza-ai site.

## Quick Command Reference

```bash
# Rebuild if needed
npm run build

# Manual deploy via CLI
netlify deploy --prod --dir=dist --site=<SITE_ID>

# Check deployment status
netlify status

# View logs
netlify logs
```

## Current Status

✅ Build completed successfully  
✅ dist/ folder ready for deployment  
✅ 33 optimized files generated  
⏳ Awaiting manual deployment to whoza-ai

**Next Step:** Use Netlify Dashboard to drag/drop dist/ folder to whoza-ai site
