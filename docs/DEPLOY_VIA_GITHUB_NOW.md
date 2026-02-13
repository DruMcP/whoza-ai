# 🚀 Deploy via GitHub - Quick Commands

**Status**: ✅ Git repository initialized and ready to push
**Commit**: `6be5d31` - Fix: Update to correct Supabase project URL

---

## ⚡ 5-Minute Setup

### Step 1: Create GitHub Repository (30 seconds)

1. Go to: **https://github.com/new**
2. Repository name: **whoza-ai**
3. Visibility: **Private** (recommended)
4. **Don't** check any initialization options
5. Click **"Create repository"**

### Step 2: Push to GitHub (1 minute)

Copy the commands from GitHub's next screen, or use these:

```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Connect Netlify (2 minutes)

1. **Go to Netlify**:
   - https://app.netlify.com
   - Click **"Add new site"** → **"Import an existing project"**

2. **Select GitHub**:
   - Click **"GitHub"**
   - Authorize Netlify (if needed)
   - Select **"whoza-ai"** repository

3. **Build Settings**:
   ```
   Branch:             main
   Build command:      npm run build
   Publish directory:  dist
   ```

4. **STOP!** Don't deploy yet. Click **"Show advanced"** first.

### Step 4: Add Environment Variables (1 minute)

Before deploying, add these variables (click **"New variable"** for each):

```bash
VITE_SUPABASE_URL = https://ryeqbewlmaqewsuvuhlm.supabase.co

VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4

VITE_RESEND_API_KEY = re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX

VITE_GOOGLE_PLACES_API_KEY = AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A

VITE_APP_URL = https://whoza.ai
```

**OR** if already connected to Netlify site:
- Go to: https://app.netlify.com/sites/whoza-ai/configuration/env
- Add each variable above

### Step 5: Deploy! (1 minute)

Click **"Deploy site"** in Netlify.

Build will complete in 1-2 minutes.

---

## ✅ Verify Deployment

Once deploy completes:

### 1. Check Supabase URL

```bash
curl -s "https://whoza.ai" | grep -o "https://[a-z]*\.supabase\.co" | sort -u
```

**Expected**: `https://ryeqbewlmaqewsuvuhlm.supabase.co`

### 2. Test Authentication

1. Clear browser cache (Ctrl+Shift+Delete)
2. Open https://whoza.ai in Incognito
3. Click **"Sign In"** → **"Continue with Google"**
4. URL should redirect to `ryeqbewlmaqewsuvuhlm.supabase.co`
5. Complete sign-in

### 3. Test Free Score

1. Go to https://whoza.ai/free-score
2. Fill in form
3. Complete Turnstile
4. Submit
5. Should see score (not error)

---

## 🎉 Future Deploys (Automatic!)

From now on, every `git push` deploys automatically:

```bash
# Make changes
vim src/components/Header.jsx

# Commit and push
git add .
git commit -m "Update header"
git push

# ✨ Automatic deploy to production!
# Watch at: https://app.netlify.com/sites/whoza-ai/deploys
```

---

## 📋 Copy-Paste Commands

### If Starting Fresh

```bash
# Create GitHub repo at: https://github.com/new
# Name: whoza-ai
# Then run:

cd /path/to/whoza-ai-project
git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git
git push -u origin main

# Connect to Netlify at: https://app.netlify.com
# Add environment variables from NETLIFY_ENV_VARS.txt
# Deploy!
```

### If You Already Pushed to Different Remote

```bash
# Change remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/whoza-ai.git

# Push
git push -u origin main
```

### If You Need to Recreate Commit

```bash
git reset --soft HEAD~1  # Undo last commit (keeps changes)
git add .
git commit -m "Fix: Update to correct Supabase project URL"
git push -u origin main -f  # Force push
```

---

## 🔧 Alternative: Netlify CLI

If you prefer command-line:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to existing site
netlify link
# → Select "whoza-ai" from list

# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://ryeqbewlmaqewsuvuhlm.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4"
netlify env:set VITE_RESEND_API_KEY "re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX"
netlify env:set VITE_GOOGLE_PLACES_API_KEY "AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A"
netlify env:set VITE_APP_URL "https://whoza.ai"

# Trigger deploy
netlify deploy --prod
```

---

## 🎯 Why This Works

**The Problem**:
- Live site had wrong Supabase URL embedded
- Manual uploads were temporary fix

**The Solution**:
- Git + Netlify = consistent builds every time
- Environment variables managed centrally
- Every deploy uses correct configuration
- Automatic deployments on every push

**The Result**:
- Zero-downtime deployments
- Version control for all changes
- Easy rollbacks if needed
- Team collaboration ready

---

## 📚 Additional Resources

- **CONNECT_TO_GITHUB_AND_NETLIFY.md** - Complete detailed guide
- **NETLIFY_ENV_VARS.txt** - Copy-paste ready environment variables
- **GITHUB_NETLIFY_QUICK_START.sh** - Interactive setup script

---

## 🆘 Troubleshooting

### "Permission denied" when pushing

```bash
# Use HTTPS with personal access token
# Or set up SSH keys: https://docs.github.com/en/authentication
```

### Netlify deploy fails with "Secrets detected"

Already fixed! `netlify.toml` has whitelist for safe API keys.

### Wrong Supabase URL after deploy

Check environment variables in Netlify:
https://app.netlify.com/sites/whoza-ai/configuration/env

Must have: `VITE_SUPABASE_URL = https://ryeqbewlmaqewsuvuhlm.supabase.co`

### Build fails

Check build log in Netlify deploy. Common issues:
- Missing environment variables
- Node version (Netlify uses Node 18 by default)
- Dependencies issue (clear build cache)

---

## ⏱️ Time Estimate

- Create GitHub repo: **30 seconds**
- Push to GitHub: **1 minute**
- Connect Netlify: **2 minutes**
- Add env vars: **1 minute**
- Deploy & verify: **2 minutes**

**Total: ~7 minutes**

---

## ✅ Success Indicators

You're done when:

1. ✅ Code is on GitHub
2. ✅ Netlify connected to repo
3. ✅ Environment variables set
4. ✅ Deploy successful
5. ✅ https://whoza.ai loads
6. ✅ Authentication redirects to correct Supabase URL
7. ✅ Free Score form works

---

**Ready? Let's do this!** 🚀

Start here: **https://github.com/new**

Questions? Check **CONNECT_TO_GITHUB_AND_NETLIFY.md** for full details.
