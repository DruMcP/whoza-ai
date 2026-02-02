# 🚨 URGENT: Deploy Fixed Build to Netlify

**Issue**: The fixes are complete but NOT deployed because this project isn't connected to git/Netlify yet.

**Status**: Build is ready ✅ | Deployment pipeline needs setup ⚠️

---

## Current Situation

✅ **Code Fixes Complete**:
- Correct Supabase URL: `ryeqbewlmaqewsuvuhlm.supabase.co`
- Secrets scanner whitelist configured
- Fresh production build in `dist/` folder
- `.env.production` created with correct config

❌ **Deployment Issue**:
- Project is NOT a git repository
- No connection to Netlify
- Live site still serving old build from December 28

---

## OPTION 1: Deploy via Git + Netlify (RECOMMENDED)

This is the best long-term solution for automatic deployments.

### Step 1: Initialize Git Repository

```bash
cd /tmp/cc-agent/61841550/project

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Production ready: Fix Supabase URL and secrets scanner"
```

### Step 2: Connect to GitHub/GitLab

**Option A: Create new GitHub repository**
```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/whoza-ai.git
git branch -M main
git push -u origin main
```

**Option B: Use existing repository**
```bash
# If you already have a repo:
git remote add origin YOUR-REPO-URL
git branch -M main
git push -u origin main
```

### Step 3: Connect Netlify to Git Repository

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub" (or GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Production branch**: `main`
6. Click "Deploy site"

### Step 4: Configure Netlify Site Settings

1. Go to Site settings → General → Site details
2. Change site name to: `whoza-ai`
3. Add custom domain: `whoza.ai`
4. Wait for DNS propagation (usually 5-30 minutes)

### Step 5: Force Deploy

```bash
# After connecting, trigger redeploy:
# Option A: Push a small change
echo "" >> README.md
git add README.md
git commit -m "Trigger redeploy"
git push

# Option B: Use Netlify UI
# Go to Deploys → Trigger deploy → Deploy site
```

---

## OPTION 2: Manual Deploy via Netlify CLI (QUICK FIX)

Use this if you need to deploy immediately without setting up git.

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli

# Or if you don't have global npm:
npx netlify-cli --help
```

### Step 2: Authenticate with Netlify

```bash
netlify login
# This opens a browser for authentication
```

### Step 3: Link to Existing Site

```bash
cd /tmp/cc-agent/61841550/project

# If you already have a Netlify site:
netlify link

# Select "whoza-ai" from the list
```

### Step 4: Deploy to Production

```bash
# Deploy the dist folder
netlify deploy --prod --dir=dist

# Confirm when prompted
```

### Step 5: Clear CDN Cache

```bash
# After deploy, force cache clear:
curl -X POST "https://api.netlify.com/api/v1/sites/YOUR-SITE-ID/builds" \
  -H "Authorization: Bearer YOUR-NETLIFY-TOKEN"

# Or use Netlify UI:
# Site Settings → Build & Deploy → Post processing → Clear cache and deploy
```

---

## OPTION 3: Manual Upload via Netlify UI (EMERGENCY)

If CLI doesn't work, you can drag-and-drop deploy.

### Step 1: Create Deployment Archive

```bash
cd /tmp/cc-agent/61841550/project

# Create a zip of the dist folder contents
cd dist
zip -r ../whoza-dist-latest.zip .
cd ..

# Now you have: whoza-dist-latest.zip
```

### Step 2: Deploy via Netlify UI

1. Go to https://app.netlify.com
2. Navigate to your "whoza-ai" site
3. Go to "Deploys" tab
4. Drag and drop `whoza-dist-latest.zip` into the deploy dropzone
5. Wait for deployment to complete

---

## Verification After Deployment

### 1. Check Deployment Status

**Via Netlify UI**:
- Go to https://app.netlify.com → whoza-ai → Deploys
- Latest deploy should show "Published"
- Build time should be recent (today's date)

**Via Command Line**:
```bash
netlify status
# Should show: Current site: whoza-ai
# Last published at: [Recent timestamp]
```

### 2. Verify Correct Supabase URL

```bash
# Check the live site
curl -s "https://whoza.ai" | grep -o "https://[a-z0-9]*\.supabase\.co" | sort -u

# Should return ONLY:
# https://ryeqbewlmaqewsuvuhlm.supabase.co

# Should NOT return:
# https://snoeyjwqrooxsilhetvn.supabase.co
```

### 3. Test Authentication Flow

1. Go to https://whoza.ai
2. Click "Sign In"
3. Click "Continue with Google"
4. **CRITICAL CHECK**: Look at the URL in address bar
5. Should redirect to: `https://ryeqbewlmaqewsuvuhlm.supabase.co/auth/v1/authorize...`
6. Complete sign-in to verify it works

### 4. Check Browser Console

1. Open https://whoza.ai
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for any Supabase errors
5. Go to Network tab
6. Filter by "supabase"
7. All requests should go to `ryeqbewlmaqewsuvuhlm.supabase.co`

### 5. Test Free Score Form

1. Go to https://whoza.ai/free-score
2. Fill out business details:
   - Business name: Test Business
   - Industry: Plumber
   - Email: test@example.com
3. Complete Turnstile challenge
4. Submit form
5. Should see score results (not an error)

---

## Troubleshooting

### Issue: "Site already exists" when deploying

**Solution**: You need to link to your existing site first:
```bash
netlify link
# Select existing site: whoza-ai
```

### Issue: "Build failed" in Netlify

**Solution**: Check if Netlify is building correctly:
1. Go to Netlify → Deploys → Latest deploy → Build logs
2. Look for errors
3. Common issues:
   - Missing `package.json`: Should be present ✅
   - Wrong Node version: Set to 20 in `netlify.toml` ✅
   - Build command failed: Should run `npm run build` ✅

### Issue: Still seeing old Supabase URL after deploy

**Solution**: Hard refresh the browser:
```bash
# Clear browser cache:
- Chrome/Edge: Ctrl+Shift+Delete → Clear cached images and files
- Firefox: Ctrl+Shift+Delete → Cached Web Content
- Safari: Cmd+Option+E

# Or open in incognito/private mode
```

### Issue: CDN serving cached old version

**Solution**: Force Netlify to purge CDN cache:
```bash
# Via Netlify UI:
# Site Settings → Build & Deploy → Post processing
# Click "Clear cache and retry deploy"

# Or via CLI:
netlify build --clear-cache
```

### Issue: Environment variables not working

**Solution**: Check `.env.production` is in the repository:
```bash
ls -la .env.production
# Should show: -rw------- 1 user user 696 Jan 10 17:14 .env.production

# If missing, it wasn't committed:
git add .env.production
git commit -m "Add production environment config"
git push
```

---

## What to Expect

### Successful Deployment Log

```
✔ Deploying to whoza-ai
✔ Building
  ◈ Starting build
  ◈ Running build command: npm run build
  ◈ vite v7.3.0 building client environment for production...
  ◈ ✓ built in 10.21s
✔ Deploy complete
  ◈ Deploy URL: https://whoza.ai
  ◈ Unique deploy URL: https://[hash]--whoza-ai.netlify.app
```

### Successful Verification

```bash
$ curl -s "https://whoza.ai" | grep -o "https://[a-z0-9]*\.supabase\.co" | sort -u
https://ryeqbewlmaqewsuvuhlm.supabase.co

✅ CORRECT - Only one Supabase URL, and it's the right one!
```

---

## Quick Checklist

**Before Deployment**:
- ✅ `.env.production` exists with correct Supabase URL
- ✅ `dist/` folder has fresh build
- ✅ Old Supabase URL NOT in dist: `grep -r "snoeyjwqrooxsilhetvn" dist/` returns nothing
- ✅ `netlify.toml` has secrets whitelist

**After Deployment**:
- [ ] Netlify shows "Published" status
- [ ] Build timestamp is today
- [ ] Live site URL works: https://whoza.ai
- [ ] Correct Supabase URL in live site JS
- [ ] Google OAuth redirects to correct project
- [ ] Free Score form works
- [ ] Portal loads for signed-in users

---

## Need Help?

### Check Deployment Status

```bash
# If you set up Netlify CLI:
netlify status
netlify deploy --prod --dir=dist

# Check what's in the dist folder:
ls -la dist/
ls -la dist/assets/
```

### Check Build Output

```bash
# Verify the build is correct locally:
grep -r "ryeqbewlmaqewsuvuhlm" dist/ | wc -l
# Should be > 0 (found in bundle)

grep -r "snoeyjwqrooxsilhetvn" dist/ | wc -l
# Should be 0 (old URL removed)
```

### Contact Netlify Support

If deployment still fails:
1. Go to https://app.netlify.com
2. Click "Support" in the bottom left
3. Provide:
   - Site name: whoza-ai
   - Issue: "Old build still being served, need to deploy new build"
   - Latest deploy ID from Deploys tab

---

## Summary

**The Problem**: Your fixes are ready but not deployed because:
1. Project is not a git repository
2. No connection to Netlify
3. Live site still serving December 28 build

**The Solution**: Choose one option:
1. **RECOMMENDED**: Set up git → push to GitHub → connect Netlify (automatic deploys)
2. **QUICK**: Use Netlify CLI to deploy manually
3. **EMERGENCY**: Drag-and-drop zip file to Netlify UI

**After Deployment**:
- Verify correct Supabase URL in live site
- Test Google OAuth flow
- Test Free Score form
- Monitor for errors

---

**🚨 ACTION REQUIRED**: You need to deploy using one of the options above. The code is ready, it just needs to be uploaded to Netlify!
