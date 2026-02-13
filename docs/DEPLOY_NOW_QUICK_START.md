# Deploy to whoza-ai - Quick Start

## 🎯 Problem Fixed
Bolt now deploys to the correct whoza-ai Netlify site (not a different site).

---

## ✅ What Was Fixed

1. **Created `.bolt/config.json`** - Tells Bolt to deploy to whoza-ai
2. **Updated `netlify.toml`** - Added site identification
3. **Updated `.gitignore`** - Excluded .netlify local state

---

## 🚀 Deploy Now (3 Ways)

### Option 1: Bolt Deploy Button (Easiest)
1. Click "Deploy" button in Bolt
2. Should now deploy to https://whoza.ai
3. Done!

### Option 2: Deployment Script
```bash
./deploy-to-whoza-ai.sh
```

### Option 3: Manual CLI
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## ✅ After Deploy - Test These URLs

- https://whoza.ai/sign-in (new sign-in page)
- https://whoza.ai/login (redirects to /sign-in)
- https://whoza.ai/portal (protected, redirects if not logged in)

---

## 📋 Files Changed

| File | Change |
|------|--------|
| `.bolt/config.json` | CREATED - Site configuration |
| `netlify.toml` | UPDATED - Added comments |
| `.gitignore` | UPDATED - Added .netlify |

---

## ❓ Troubleshooting

**If Bolt still deploys to wrong site:**
1. Restart Bolt/IDE
2. Or use manual deployment (Option 2 or 3 above)

**For detailed help:**
- See BOLT_DEPLOYMENT_FIX_SUMMARY.md
- See CONNECT_TO_WHOZA_AI_NETLIFY.md

---

**Status:** ✅ READY - Click Deploy in Bolt!
