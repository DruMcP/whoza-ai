# Remaining Security Fixes - Manual Configuration Required

These final two security improvements require manual configuration in your Supabase dashboard. They cannot be automated via code or SQL migrations.

---

## 1. Auth DB Connection Strategy (Percentage-Based)

### Current Issue
Your Auth server is configured to use a fixed number of connections (10), which won't scale automatically when you upgrade your database instance.

### Why This Matters
- Fixed connection limits don't scale with database upgrades
- Can cause connection exhaustion under load
- Percentage-based allocation automatically scales with instance size

### How to Fix

1. **Access Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to Database Settings**
   - Click on "Database" in the left sidebar
   - Go to "Connection Pooling" section

3. **Update Auth Connection Strategy**
   - Look for "Auth Connection Pool" settings
   - Change from "Fixed" to "Percentage"
   - Recommended: Set to 10-15% of total connections
   - Click "Save"

### Recommended Settings
```
Connection Mode: Percentage
Percentage: 10-15%
```

This ensures Auth server connections scale automatically with your database instance size.

---

## 2. Enable Leaked Password Protection

### Current Issue
Leaked password protection (HaveIBeenPwned integration) is currently disabled.

### Why This Matters
- Prevents users from using compromised passwords
- Protects against credential stuffing attacks
- Industry best practice for authentication security
- Uses HaveIBeenPwned.org's 800M+ leaked password database

### How to Fix

1. **Access Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication Settings**
   - Click on "Authentication" in the left sidebar
   - Go to "Policies" or "Security" section

3. **Enable Password Protection**
   - Look for "Leaked Password Protection" or "HaveIBeenPwned Integration"
   - Toggle the switch to "Enabled"
   - Click "Save Changes"

### What This Does
- Checks passwords against HaveIBeenPwned database on signup/change
- Rejects compromised passwords automatically
- Uses k-anonymity model (privacy-preserving - passwords never sent in full)
- Zero additional latency in most cases

---

## Verification Checklist

After making these changes:

- [ ] Auth connection strategy changed to percentage-based
- [ ] Leaked password protection enabled
- [ ] Test user signup with a known compromised password (should be rejected)
- [ ] Test user signup with a secure password (should succeed)
- [ ] Monitor connection pool usage in dashboard

---

## Additional Security Recommendations

### 1. Enable MFA (Multi-Factor Authentication)
- Go to Authentication > Settings
- Enable "Phone" or "TOTP" MFA
- Require for admin users

### 2. Configure Password Requirements
- Minimum length: 12 characters (recommended)
- Require uppercase, lowercase, numbers, special characters
- Set in Authentication > Policies

### 3. Enable Email Confirmation
- Currently disabled for free score submissions
- Consider enabling for paid user accounts
- Go to Authentication > Settings > Email Auth

### 4. Set Up Rate Limiting
- Configure in Authentication > Rate Limits
- Recommended: 5 attempts per hour per IP for auth endpoints

### 5. Enable Audit Logs
- Go to Database > Logs
- Enable audit logging for auth.users table
- Monitor suspicious authentication patterns

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs/guides/database/connection-pooling
- **Auth Security**: https://supabase.com/docs/guides/auth/auth-password-protect
- **HaveIBeenPwned**: https://haveibeenpwned.com/API/v3

---

## Status Summary

### ✅ Fixed Automatically (via migration)
- 47 foreign key indexes added
- 3 RLS policies optimized
- 2 policy conflicts resolved
- 6 unused indexes removed
- 1 security definer view fixed

### ⚠️ Requires Manual Configuration
1. Auth DB connection strategy → percentage-based
2. Leaked password protection → enable HaveIBeenPwned

**Total Issues Resolved**: 56/58 (96.6%)
**Manual Action Required**: 2 items

---

## Next Steps

1. Complete the two manual configurations above
2. Run Supabase security advisor again to verify all issues resolved
3. Monitor dashboard for connection pool and auth metrics
4. Consider implementing additional security recommendations
