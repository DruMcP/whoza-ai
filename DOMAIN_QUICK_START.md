# Custom Domain - Quick Start

**You have upgraded to Pro.** Here's how to get your custom domain live in under an hour.

---

## Step 1: Buy Your Domain (10 minutes)

Go to any registrar:
- **Namecheap**: https://www.namecheap.com
- **Google Domains**: https://domains.google.com
- **Cloudflare**: https://www.cloudflare.com/products/registrar

**Cost:** ~$12/year

Suggested domains:
- `whoza.com`
- `getwhoza.com`
- `whoza.io`
- `whoza.app`

---

## Step 2: Configure Netlify (15 minutes)

### 2.1 Add Domain

1. Go to: https://app.netlify.com
2. Select your site
3. **Site settings** → **Domain management** → **Add custom domain**
4. Enter: `yourdomain.com`
5. Click **Verify**

### 2.2 Configure DNS

**Option A - Easy (Recommended):**
1. Netlify will show nameservers like: `dns1.p01.nsone.net`
2. Copy these nameservers
3. Go to your domain registrar → DNS Settings
4. Replace nameservers with Netlify's
5. Save

**Option B - Manual:**
Add these DNS records at your registrar:

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: www
Value: [your-site].netlify.app
TTL: 3600
```

### 2.3 Enable HTTPS

1. Wait 10-30 minutes for DNS to propagate
2. In Netlify → **Domain settings** → **HTTPS**
3. Click **Verify DNS configuration**
4. Click **Provision certificate**
5. Enable **Force HTTPS**

---

## Step 3: Update Supabase (5 minutes)

1. Go to: https://supabase.com/dashboard
2. Select your project
3. **Authentication** → **URL Configuration**
4. Add these URLs:

```
https://yourdomain.com
https://www.yourdomain.com
https://yourdomain.com/**
https://www.yourdomain.com/**
```

5. Update **Site URL** to: `https://yourdomain.com`
6. Click **Save**

---

## Step 4: Test (5 minutes)

1. Visit `https://yourdomain.com`
2. Check green padlock (HTTPS working)
3. Test login/signup
4. Test password reset

---

## Timeline

- **DNS Propagation:** 1-24 hours (usually 1-4 hours)
- **SSL Certificate:** Automatic once DNS resolves
- **Total:** 2-24 hours from start to finish

---

## Troubleshooting

### Domain not loading?
- Wait up to 24 hours for DNS propagation
- Check DNS status: https://www.whatsmydns.net
- Clear browser cache and try incognito mode

### Login not working?
- Verify redirect URLs in Supabase dashboard
- Make sure Site URL is updated
- Check browser console for errors

### Need help?
- Netlify Support: https://www.netlify.com/support
- See full guide: `CUSTOM_DOMAIN_SETUP.md`

---

## After Domain is Live

✅ **Update:**
- Social media profiles
- Google Business listing
- Email signatures
- Marketing materials

✅ **Set up:**
- Professional email (support@yourdomain.com)
- Google Search Console
- Uptime monitoring

✅ **Security:**
- Enable domain auto-renewal at registrar
- Enable WHOIS privacy protection

---

**Full detailed guide available in:** `CUSTOM_DOMAIN_SETUP.md`
