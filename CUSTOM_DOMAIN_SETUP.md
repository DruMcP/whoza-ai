# Custom Domain Setup Guide

## Overview
This guide walks you through purchasing and configuring a custom domain for your Whoza platform.

---

## Step 1: Purchase Your Domain

### Recommended Domain Registrars
- **Namecheap** (https://www.namecheap.com) - Affordable, good support
- **Google Domains/Squarespace** (https://domains.google) - Clean interface, reliable
- **Cloudflare Registrar** (https://www.cloudflare.com/products/registrar) - At-cost pricing
- **GoDaddy** (https://www.godaddy.com) - Popular, widely used

### Domain Selection Tips
- Choose a `.com` domain if available for credibility
- Keep it short, memorable, and brandable
- Avoid hyphens and numbers if possible
- Examples: `whoza.com`, `getwhoza.com`, `whoza.io`, `whoza.app`

**Cost:** Typically $10-15/year for `.com` domains

---

## Step 2: Determine Your Hosting Platform

Based on your project structure, you're using:

### Vercel (Current Platform)
Your project has a `vercel.json` configuration file, which indicates Vercel deployment.

---

## Step 3: Configure Domain on Vercel (Recommended)

### 3.1 Add Domain to Vercel

1. Log in to your Vercel dashboard: https://vercel.com/dashboard
2. Select your Whoza project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain (e.g., `whoza.com`)
6. Click **Add**

### 3.2 Configure DNS Records

Vercel will provide you with DNS records. Follow these steps:

1. Go to your domain registrar's DNS settings
2. Add these DNS records:

**For Root Domain (whoza.com):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Alternative for Root Domain (CNAME):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**For WWW Subdomain (www.whoza.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3.3 Enable HTTPS

1. In Vercel → **Domains**
2. Scroll to **HTTPS**
3. Click **Verify DNS configuration**
4. Once verified, click **Provision certificate**
5. Enable **Force HTTPS** (redirects HTTP to HTTPS)

**SSL Certificate:** Free, automatic via Let's Encrypt

---

## Step 4: Configure Domain on Vercel (Alternative)

### 4.1 Add Domain to Vercel

1. Log in to Vercel: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your domain (e.g., `whoza.com`)

### 4.2 Configure DNS Records

Add these records at your domain registrar:

**For Root Domain:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 4.3 Verify and Enable HTTPS

- Vercel automatically provisions SSL certificates
- Click **Refresh** in Vercel dashboard to verify DNS
- HTTPS is enabled automatically once DNS propagates

---

## Step 5: Update Application Configuration

### 5.1 Update Supabase Redirect URLs

Your application uses Supabase authentication. Update allowed redirect URLs:

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add these URLs:

```
https://yourdomain.com
https://www.yourdomain.com
https://yourdomain.com/**
https://www.yourdomain.com/**
```

5. Update **Site URL** to: `https://yourdomain.com`

### 5.2 Update Environment Variables (if needed)

If your application references the domain anywhere:

```env
VITE_APP_URL=https://yourdomain.com
```

Redeploy after making this change.

### 5.3 Update Stripe Webhook URLs (if using Stripe)

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** → **Webhooks**
3. Update webhook endpoint URL:

```
https://[your-supabase-project-id].supabase.co/functions/v1/stripe-webhook
```

Note: The webhook URL uses your Supabase function URL, not your custom domain.

---

## Step 6: Configure WWW Redirect

Decide on your primary domain:

### Option A: Redirect www to non-www (Recommended)
`www.whoza.com` → `whoza.com`

**Vercel:** Automatic if you add both domains

### Option B: Redirect non-www to www
`whoza.com` → `www.whoza.com`

Configure this in your hosting platform's domain settings.

---

## Step 7: Verify Setup

### 7.1 Check DNS Propagation

Use these tools to verify DNS changes:
- https://www.whatsmydns.net
- https://dnschecker.org

Enter your domain and check for:
- A records pointing to hosting provider
- CNAME records for www subdomain

### 7.2 Test HTTPS

1. Visit `https://yourdomain.com`
2. Check for:
   - Green padlock in browser
   - Valid SSL certificate
   - No mixed content warnings

### 7.3 Test Authentication Flow

1. Try signing up/logging in
2. Verify Supabase redirects work correctly
3. Test password reset flow

### 7.4 Test All Routes

Visit key pages:
- `https://yourdomain.com/`
- `https://yourdomain.com/pricing`
- `https://yourdomain.com/portal`
- `https://yourdomain.com/free-score`

---

## Step 8: Update Marketing Materials

Once your custom domain is live:

### Update These Locations:
- [ ] Google Business Profile
- [ ] Social media profiles (LinkedIn, Twitter, Facebook)
- [ ] Email signatures
- [ ] Business cards
- [ ] Documentation and support materials
- [ ] App store listings (if applicable)
- [ ] Google Search Console (add new property)
- [ ] Google Analytics (update property URL)

---

## Troubleshooting

### DNS Not Resolving
- Wait 24-48 hours for full propagation
- Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Try different DNS servers (8.8.8.8 for Google DNS)

### SSL Certificate Not Provisioning
- Verify DNS records are correct
- Wait for DNS propagation to complete
- Check that both A and CNAME records exist
- Contact hosting support if issues persist

### Supabase Auth Redirects Failing
- Verify redirect URLs in Supabase dashboard
- Check browser console for errors
- Ensure Site URL is set correctly

### Mixed Content Warnings
- Check that all resources load via HTTPS
- Update any hardcoded HTTP URLs in code
- Verify API calls use HTTPS endpoints

---

## Security Best Practices

### 1. Enable DNSSEC (Domain Name System Security Extensions)
- Go to your domain registrar's DNS settings
- Enable DNSSEC if available
- Protects against DNS spoofing attacks

### 2. Configure CAA Records
Add CAA records to specify which certificate authorities can issue certificates:

```
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
TTL: 3600
```

### 3. Enable Domain Privacy
- Most registrars offer free WHOIS privacy
- Hides your personal contact information
- Enable during domain purchase or in registrar settings

### 4. Set Up Domain Auto-Renewal
- Prevents accidental domain expiration
- Enable in your registrar's account settings
- Keep payment method up to date

---

## Estimated Timeline

- **Domain Purchase:** Immediate
- **DNS Configuration:** 15 minutes
- **DNS Propagation:** 1-48 hours (usually 1-4 hours)
- **SSL Provisioning:** Automatic once DNS resolves (5-15 minutes)
- **Total Setup Time:** 2-24 hours

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Domain Registration (.com) | $10-15 | Annual |
| Domain Privacy Protection | Free-$10 | Annual |
| SSL Certificate | Free | Automatic renewal |
| Hosting (Vercel Pro) | $20+ | Monthly |
| **Total First Year** | **~$250** | - |

---

## Quick Setup Checklist

- [ ] Purchase domain from registrar
- [ ] Add domain to hosting platform (Vercel)
- [ ] Configure DNS records (A and CNAME)
- [ ] Wait for DNS propagation
- [ ] Verify HTTPS certificate provisioned
- [ ] Update Supabase redirect URLs
- [ ] Update Stripe webhook URLs (if applicable)
- [ ] Test authentication flow
- [ ] Test all major routes
- [ ] Configure www redirect
- [ ] Enable domain auto-renewal
- [ ] Update marketing materials

---

## Need Help?

If you encounter issues:

1. **Vercel Support:** https://vercel.com/support
3. **Supabase Support:** https://supabase.com/support
4. **Domain Registrar Support:** Contact your registrar's support team

---

## Next Steps After Domain Setup

1. **Set up Google Search Console**
   - Verify domain ownership
   - Submit sitemap
   - Monitor search performance

2. **Configure Email**
   - Set up professional email (e.g., support@yourdomain.com)
   - Use Google Workspace, Microsoft 365, or Zoho Mail

3. **Implement Monitoring**
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Configure SSL certificate expiration alerts

4. **Update SEO**
   - Submit sitemap to search engines
   - Update structured data with new domain
   - Set up 301 redirects from old domain if applicable
