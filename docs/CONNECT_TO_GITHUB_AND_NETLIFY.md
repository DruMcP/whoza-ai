# 🚀 Connect to GitHub and Deploy via Netlify

**Status**: ✅ Git repository initialized and committed
**Commit**: Fix - Update to correct Supabase project URL (ryeqbewlmaqewsuvuhlm)

This guide sets up automatic deployments so every push to GitHub triggers a new Netlify build.

---

## 📋 Overview

**What We're Doing**:
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Configure environment variables
4. Enable automatic deployments
5. **Result**: Every `git push` = automatic production deploy

---

## Step 1: Push to GitHub

### Option A: Create New Repository on GitHub (Recommended)

1. **Go to GitHub**:
   - Visit: https://github.com/new
   - Repository name: `whoza-ai`
   - Visibility: **Private** (recommended) or Public
   - Don't initialize with README, .gitignore, or license
   - Click **"Create repository"**

2. **Copy your repository URL** from the next screen:
   ```
   https://github.com/YOUR_USERNAME/whoza-ai.git
   ```

3. **Push from your local machine**:
   ```bash
   # Navigate to project directory
   cd /path/to/whoza-ai-project

   # Add GitHub remote
   git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git

   # Push to GitHub
   git push -u origin main
   ```

### Option B: Use GitHub CLI (If You Have It)

```bash
# Create repo and push in one command
gh repo create whoza-ai --private --source=. --remote=origin --push
```

---

## Step 2: Connect GitHub to Netlify

### Via Netlify UI (Recommended)

1. **Go to Netlify**:
   - Visit: https://app.netlify.com
   - Click **"Add new site"** → **"Import an existing project"**

2. **Connect to Git**:
   - Click **"GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select **"whoza-ai"** repository

3. **Configure Build Settings**:
   ```
   Branch to deploy:     main
   Build command:        npm run build
   Publish directory:    dist
   ```

4. **Don't deploy yet!** Click **"Show advanced"** and add environment variables first.

### Via Netlify Existing Site (If Already Connected)

If you already have a Netlify site:

1. Go to: https://app.netlify.com/sites/whoza-ai/configuration/deploys
2. Click **"Link repository"** or **"Connect to Git"**
3. Select **GitHub** → Authorize → Select **"whoza-ai"** repo
4. Set build settings as above

---

## Step 3: Add Environment Variables in Netlify

**CRITICAL**: Add these BEFORE the first deploy!

### Via Netlify UI

1. **Go to Site Settings**:
   - Navigate to: https://app.netlify.com/sites/whoza-ai/configuration/env
   - Or: Site settings → Environment variables

2. **Add Each Variable**:

Click **"Add a variable"** and add these one by one:

```bash
# Supabase Configuration (CRITICAL - Must be correct!)
VITE_SUPABASE_URL = https://ryeqbewlmaqewsuvuhlm.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4

# Resend API (for email notifications)
VITE_RESEND_API_KEY = re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX

# Google Places API (for business verification)
VITE_GOOGLE_PLACES_API_KEY = AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A

# Custom Domain
VITE_APP_URL = https://whoza.ai
```

3. **Deployment context**: Set to **"All"** (applies to all branches and deploy contexts)

### Via Netlify CLI (Alternative)

```bash
# Link to site (one time)
netlify link

# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://ryeqbewlmaqewsuvuhlm.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4"
netlify env:set VITE_RESEND_API_KEY "re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX"
netlify env:set VITE_GOOGLE_PLACES_API_KEY "AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A"
netlify env:set VITE_APP_URL "https://whoza.ai"
```

---

## Step 4: Deploy to Production

### First Deploy

1. **Trigger Deploy**:
   - In Netlify UI, click **"Deploy site"** or **"Trigger deploy"**
   - Or push a new commit to trigger automatic deploy:
     ```bash
     git commit --allow-empty -m "Trigger Netlify deploy"
     git push
     ```

2. **Watch Build Log**:
   - Go to: https://app.netlify.com/sites/whoza-ai/deploys
   - Click on the deploy in progress
   - Watch the build log for errors

3. **Build Should Complete in 1-2 minutes**

### Verify Deployment

After deployment completes:

1. **Check Deploy Log**:
   - Look for: `✓ built in XXs`
   - Check for Supabase URL in build output

2. **Test Live Site**:
   ```bash
   # Check Supabase URL in deployed site
   curl -s "https://whoza.ai" | grep -o "https://[a-z]*\.supabase\.co" | sort -u
   ```

   **Should show**: `https://ryeqbewlmaqewsuvuhlm.supabase.co`

3. **Browser Test**:
   - Clear cache (Ctrl+Shift+Delete) or use Incognito
   - Go to: https://whoza.ai
   - Click **"Sign In"** → **"Continue with Google"**
   - Check URL redirects to `ryeqbewlmaqewsuvuhlm.supabase.co`
   - Complete sign-in to verify

---

## Step 5: Enable Automatic Deployments

Once connected, automatic deployments are enabled by default.

### How It Works

```
git push origin main
    ↓
GitHub notifies Netlify
    ↓
Netlify pulls latest code
    ↓
Runs: npm install && npm run build
    ↓
Deploys to production
    ↓
Live in 1-2 minutes
```

### Test Automatic Deploy

```bash
# Make a small change
echo "# Updated" >> README.md

# Commit and push
git add README.md
git commit -m "Test: Verify automatic deployment"
git push

# Watch deploy at: https://app.netlify.com/sites/whoza-ai/deploys
```

---

## 🔧 Configuration Files Already Set Up

Your repository already has these configured:

### `netlify.toml`
- Build command: `npm run build`
- Publish directory: `dist`
- Secrets whitelist (prevents deploy failures)
- Edge functions config
- Redirects

### `.env.production`
- Correct Supabase URL
- All API keys
- Production-ready config

### `.gitignore`
- Excludes `node_modules`, `.env` (local only)
- Keeps `.env.production` (for reference)

---

## 📊 Netlify Build Settings Summary

Once connected, verify these settings:

### Build & Deploy Settings
```
Repository:           github.com/YOUR_USERNAME/whoza-ai
Production branch:    main
Base directory:       (leave empty)
Build command:        npm run build
Publish directory:    dist
Functions directory:  supabase/functions
```

### Deploy Contexts
```
Production branch:    main (auto-publish)
Branch deploys:       All (optional - creates preview URLs)
Deploy previews:      Any pull request (optional)
```

### Environment Variables
```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ VITE_RESEND_API_KEY
✅ VITE_GOOGLE_PLACES_API_KEY
✅ VITE_APP_URL
```

---

## 🎯 Benefits of Git-Connected Deploys

### 1. **Automatic Deployments**
- Every push deploys automatically
- No manual upload needed
- Deploy previews for pull requests

### 2. **Version Control**
- Track all changes in Git
- Easy rollbacks to previous versions
- Collaborate with team members

### 3. **CI/CD Pipeline**
- Consistent builds every time
- Environment variables managed centrally
- Build logs for debugging

### 4. **Deploy Previews**
- Test changes before production
- Unique URL for each branch
- Safe experimentation

---

## 🔄 Daily Workflow

Once set up, your workflow becomes:

```bash
# 1. Make changes locally
vim src/components/Header.jsx

# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Update header design"
git push

# 4. Watch automatic deploy
# Go to: https://app.netlify.com/sites/whoza-ai/deploys

# 5. Live in 1-2 minutes! 🎉
```

---

## 🆘 Troubleshooting

### Deploy Fails with "Secrets Detected"

**Solution**: Already fixed in `netlify.toml`

The whitelist allows these safe API keys:
- Google Places API Key
- Supabase Anon Key (public by design)

### Wrong Supabase URL in Deploy

**Check**:
1. Environment variables in Netlify UI
2. `.env.production` file in repo
3. Clear build cache: Site settings → Build & deploy → Clear cache and deploy

### Build Fails

**Common fixes**:
```bash
# Update package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push

# Or clear build cache in Netlify UI
```

### Automatic Deploys Not Working

**Check**:
1. GitHub webhook exists: GitHub repo → Settings → Webhooks
2. Netlify has correct permissions: GitHub → Settings → Applications → Netlify
3. Build settings correct: Netlify → Site settings → Build & deploy

---

## 🔍 Monitoring and Logs

### Deploy Logs
- View at: https://app.netlify.com/sites/whoza-ai/deploys
- Each deploy shows full build output
- Troubleshoot build errors here

### Function Logs
- View at: https://app.netlify.com/sites/whoza-ai/functions
- Monitor Netlify Edge Functions
- Check Supabase Edge Functions in Supabase dashboard

### Analytics
- View at: https://app.netlify.com/sites/whoza-ai/analytics
- Traffic, bandwidth, build minutes
- Performance insights

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] Repository pushed to GitHub
- [ ] Netlify connected to GitHub repo
- [ ] Environment variables added in Netlify
- [ ] First deploy successful
- [ ] Live site uses correct Supabase URL (`ryeqbewlmaqewsuvuhlm.supabase.co`)
- [ ] Authentication works (Google sign-in)
- [ ] Free Score form works
- [ ] Test automatic deploy with dummy commit

---

## 📚 Quick Reference Commands

```bash
# Check current remote
git remote -v

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git

# Push to GitHub
git push -u origin main

# Make changes and deploy
git add .
git commit -m "Your change description"
git push  # Triggers automatic Netlify deploy

# Force new deploy (no changes)
git commit --allow-empty -m "Trigger deploy"
git push

# View deploy status
netlify watch  # If using Netlify CLI

# Check environment variables
netlify env:list
```

---

## 🚀 Next Steps

Once connected and deployed:

1. **Set up deploy notifications**:
   - Netlify → Site settings → Build & deploy → Deploy notifications
   - Get notified on Slack/Email when deploys succeed/fail

2. **Enable deploy previews**:
   - Netlify → Site settings → Build & deploy → Deploy contexts
   - Preview every PR before merging

3. **Add custom domain** (if not already):
   - Netlify → Domain management → Add custom domain
   - Point DNS to Netlify

4. **Monitor performance**:
   - Set up Netlify Analytics
   - Monitor Core Web Vitals

---

## 💡 Pro Tips

1. **Branch Deploys**: Create feature branches for testing
   ```bash
   git checkout -b feature/new-design
   git push -u origin feature/new-design
   # Gets its own preview URL!
   ```

2. **Instant Rollbacks**: Revert to any previous deploy instantly in Netlify UI

3. **Build Plugins**: Add Netlify plugins for optimization, SEO, etc.

4. **Split Testing**: Test multiple versions with Netlify Split Testing

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **GitHub Docs**: https://docs.github.com
- **Netlify Status**: https://www.netlifystatus.com

---

**You're all set!** 🎉

Every push to GitHub will now automatically deploy to production.
Zero-downtime, automatic rollbacks, and deploy previews included.

Questions? Issues? Let me know!
