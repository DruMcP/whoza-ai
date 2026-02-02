# 🚀 Deploy from Your Local Machine

Since you can't download the zip file directly, let's deploy from your local machine.

## ⚡ Quick Deploy (5 minutes)

### Step 1: Get the Project Files

If you already have the project locally, skip to Step 2.

Otherwise, you need the following key files:
- `package.json`
- `vite.config.js`
- `.env.production` (with correct Supabase URL)
- `netlify.toml`
- All `/src` files
- All `/public` files

### Step 2: Verify Production Config

Create/update `.env.production` with:

```bash
# .env.production
VITE_SUPABASE_URL=https://ryeqbewlmaqewsuvuhlm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4
VITE_RESEND_API_KEY=re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX
VITE_GOOGLE_PLACES_API_KEY=AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A
VITE_APP_URL=https://whoza.ai
```

### Step 3: Build Locally

```bash
# Install dependencies (if needed)
npm install

# Clean previous builds
rm -rf dist node_modules/.vite

# Build with production config
NODE_ENV=production npm run build
```

### Step 4: Verify the Build

```bash
# Check Supabase URL in build
grep -o "https://[a-z]*\.supabase\.co" dist/assets/index-*.js | sort -u
```

**Should show**: `https://ryeqbewlmaqewsuvuhlm.supabase.co`
**NOT**: `https://snoeyjwqrooxsilhetvn.supabase.co`

### Step 5: Deploy to Netlify

#### Option A: Drag & Drop (Easiest)

```bash
# Create zip
cd dist
zip -r ../whoza-dist-latest.zip .
cd ..
```

Then:
1. Go to https://app.netlify.com
2. Open "whoza-ai" site → Deploys
3. Drag `whoza-dist-latest.zip` to deploy area

#### Option B: Netlify CLI

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Link to site (one time)
netlify link
# → Select "whoza-ai" from the list

# Deploy to production
netlify deploy --prod --dir=dist
```

## ✅ Verify After Deploy

### 1. Check Live Site
```bash
curl -s "https://whoza.ai" | grep -o "https://[a-z]*\.supabase\.co" | sort -u
```

**Expected**: `https://ryeqbewlmaqewsuvuhlm.supabase.co`

### 2. Test in Browser

1. **Clear browser cache** (Ctrl+Shift+Delete) or use Incognito
2. Go to https://whoza.ai
3. Click **"Sign In"** → **"Continue with Google"**
4. **Check URL** in browser address bar during redirect
5. Should show: `ryeqbewlmaqewsuvuhlm.supabase.co`
6. Complete sign-in to verify

### 3. Test Free Score
1. Go to https://whoza.ai/free-score
2. Fill form and submit
3. Should work without errors

## 🔧 Alternative: Deploy via Git

If you have the project in Git and connected to Netlify:

```bash
# Commit the .env.production changes
git add .env.production netlify.toml
git commit -m "Fix: Use correct Supabase project URL"
git push

# Netlify will auto-deploy
```

**But you need to configure build environment variables in Netlify UI**:
1. Go to: https://app.netlify.com → whoza-ai → Site settings → Environment variables
2. Add all variables from `.env.production`
3. Trigger a new deploy

## 📋 Checklist

- [ ] `.env.production` has `ryeqbewlmaqewsuvuhlm.supabase.co`
- [ ] `netlify.toml` has secrets whitelist
- [ ] Run `npm run build` successfully
- [ ] Verify build has correct Supabase URL
- [ ] Deploy to Netlify (drag & drop or CLI)
- [ ] Clear browser cache
- [ ] Test authentication redirect
- [ ] Test Free Score form

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear everything and rebuild
rm -rf dist node_modules/.vite node_modules
npm install
NODE_ENV=production npm run build
```

### Still Shows Old URL After Deploy

**Issue**: Browser cached the old JavaScript files

**Solution**:
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Or clear cache and try Incognito mode
- Check Network tab in DevTools to see which files are cached

### Netlify Build Settings

If deploying via Git, ensure in Netlify UI:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: All from `.env.production`

## 🎯 Key Point

The critical thing is that the **build** must be created with the correct `.env.production` file containing:

```
VITE_SUPABASE_URL=https://ryeqbewlmaqewsuvuhlm.supabase.co
```

This gets baked into the JavaScript bundle during build time and cannot be changed after.

## ⏱️ Timeline

- Install dependencies: 1-2 min
- Build: 10-20 sec
- Upload to Netlify: 10-30 sec
- Verify: 1 min
- **Total**: ~5 minutes

---

**Questions?** Let me know if you hit any issues!
