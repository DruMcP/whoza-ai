# 🚀 Quick Deploy to Netlify - 3 Fast Options

**Current Status**: Build is ready ✅ | Needs deployment to Netlify

---

## ⚡ FASTEST: Option 1 - Netlify CLI (2 minutes)

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your existing site
netlify link
# → Select "whoza-ai" from the list

# Deploy to production
netlify deploy --prod --dir=dist

# Verify deployment
curl -s "https://whoza.ai" | grep -o "https://[a-z0-9]*\.supabase\.co" | sort -u
# Should show: https://ryeqbewlmaqewsuvuhlm.supabase.co
```

---

## 🎯 RECOMMENDED: Option 2 - Git + Auto Deploy (5 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Fix: Deploy correct Supabase URL"

# Connect to your GitHub repo
git remote add origin https://github.com/YOUR-USERNAME/whoza-ai.git
git branch -M main
git push -u origin main

# Then in Netlify:
# 1. Go to https://app.netlify.com
# 2. Add new site → Import from Git
# 3. Connect your repository
# 4. Build settings:
#    - Build command: npm run build
#    - Publish directory: dist
# 5. Deploy!
```

**Future deploys**: Just `git push` and Netlify auto-deploys! 🎉

---

## 🖱️ EASIEST: Option 3 - Drag & Drop (1 minute)

A deployment package is ready: **`whoza-dist-latest.zip`** (302 KB)

**Steps**:
1. Go to https://app.netlify.com
2. Open your **"whoza-ai"** site
3. Click **"Deploys"** tab
4. **Drag and drop** `whoza-dist-latest.zip` into the deploy area
5. Wait 10-30 seconds for deployment
6. Done! ✅

**Location**: `/tmp/cc-agent/61841550/project/whoza-dist-latest.zip`

---

## ✅ Verification After Deploy

```bash
# Check live site has correct Supabase URL
curl -s "https://whoza.ai" | grep -o "https://[a-z0-9]*\.supabase\.co" | sort -u

# Expected: https://ryeqbewlmaqewsuvuhlm.supabase.co
# NOT: https://snoeyjwqrooxsilhetvn.supabase.co

# Test authentication flow
# 1. Go to https://whoza.ai
# 2. Click "Sign In"
# 3. Click "Continue with Google"
# 4. Check URL redirects to: ryeqbewlmaqewsuvuhlm.supabase.co
```

---

## 🔧 Helper Script

Run the interactive deployment script:

```bash
./DEPLOY_NOW.sh
```

This script will:
- Check your git status
- Help you choose the best deployment method
- Guide you through the process step-by-step

---

## 📊 What's in the Build

- ✅ Correct Supabase URL: `ryeqbewlmaqewsuvuhlm.supabase.co`
- ✅ `.env.production` with production config
- ✅ Secrets scanner whitelist in `netlify.toml`
- ✅ Fresh production build (no old URLs)
- ✅ All assets optimized and ready

---

## 🆘 Need Help?

**Problem**: Can't decide which option?
- Use **Option 3** (drag & drop) for instant fix
- Then set up **Option 2** (git) for long-term

**Problem**: Netlify CLI not working?
- Make sure you're logged in: `netlify login`
- Make sure you linked the site: `netlify link`

**Problem**: Still seeing old build after deploy?
- Hard refresh: Ctrl+Shift+F5 (Windows) or Cmd+Shift+R (Mac)
- Or open in incognito/private mode
- Check Netlify deploy logs for errors

**Full Documentation**: See `URGENT_DEPLOYMENT_INSTRUCTIONS.md`

---

## 🎯 TL;DR

**The Issue**: Your site is fixed but not deployed yet.

**Quick Fix**:
```bash
# Download whoza-dist-latest.zip
# Drag & drop to Netlify at https://app.netlify.com
# Done!
```

**Long-term Solution**: Set up git + connect to Netlify for auto-deploys.

---

**⏰ Time to deploy**: 1-5 minutes depending on option
**📝 Next step**: Pick an option above and deploy now!
