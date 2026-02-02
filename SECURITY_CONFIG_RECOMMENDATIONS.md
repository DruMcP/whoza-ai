# Security Configuration Recommendations

This document outlines security configurations that must be applied via the Supabase Dashboard, as they cannot be set through SQL migrations.

## ✅ Completed (via Migration)

The following issues have been resolved through database migrations:

### Migration 1: fix_security_issues_indexes_and_policies
1. **Added Missing Foreign Key Indexes** - 4 indexes added for rex tables
2. **Removed Unused Indexes** - 109 unused indexes dropped to improve write performance
3. **Consolidated RLS Policies** - 24 redundant permissive policies removed

### Migration 2: add_remaining_foreign_key_indexes
1. **Added 43 Foreign Key Indexes** across all system tables:
   - Analytics: 2 indexes
   - Task System: 7 indexes
   - Email Campaigns: 4 indexes
   - Notifications: 8 indexes
   - Rex Decision Engine: 7 indexes
   - Stripe Integration: 9 indexes
   - Other Systems: 7 indexes
2. **Fixed Final Duplicate Policy** - Removed remaining duplicate policy on email_logs

**Total Impact:**
- 54 foreign key indexes added for optimal query performance
- 109 unused indexes removed for better write performance
- 25 duplicate RLS policies consolidated for clearer security model

## 🔧 Requires Dashboard Configuration

### 1. Auth DB Connection Strategy (High Priority)

**Issue:** Auth server is configured to use a fixed maximum of 10 connections instead of a percentage-based strategy.

**Impact:** Increasing instance size won't improve Auth server performance without manual adjustment.

**Solution:**
1. Navigate to Supabase Dashboard → Settings → Database
2. Find "Auth Connection Pooling" or "Auth Server Configuration"
3. Change connection strategy from "Fixed" to "Percentage"
4. Set appropriate percentage (recommended: 10-20% of available connections)

**Why This Matters:**
- Ensures Auth server scales with your database instance
- Prevents Auth server bottlenecks as your application grows
- Automatically adjusts when you upgrade your database tier

---

### 2. Leaked Password Protection (Critical Security)

**Issue:** Password leak protection via HaveIBeenPwned.org is currently disabled.

**Impact:** Users can set passwords that have been compromised in data breaches.

**Solution:**
1. Navigate to Supabase Dashboard → Authentication → Settings
2. Find "Security" or "Password Protection" section
3. Enable "Prevent use of leaked passwords"
4. Save changes

**Why This Matters:**
- Protects user accounts from credential stuffing attacks
- Prevents use of passwords known to be compromised
- Industry best practice for modern authentication systems
- No performance impact on your application

---

## Implementation Checklist

- [ ] Configure Auth DB connection strategy to use percentage
- [ ] Enable leaked password protection
- [ ] Verify changes in Supabase Dashboard
- [ ] Test authentication flow after changes
- [ ] Document configuration in your internal wiki/docs

---

## Additional Security Recommendations

### Monitor and Review

After making these changes, regularly review:

1. **Connection Pool Usage** - Monitor Auth server connection usage in Dashboard
2. **Failed Login Attempts** - Track if leaked password protection is catching compromised passwords
3. **Database Performance** - Verify index changes improved query performance
4. **RLS Policy Performance** - Monitor policy evaluation times

### Best Practices

- Review security settings quarterly
- Enable email notifications for security events
- Keep Supabase CLI and libraries up to date
- Regularly audit RLS policies
- Monitor for new security recommendations in Supabase Dashboard

---

## Questions or Issues?

If you encounter any issues applying these configurations:

1. Check Supabase documentation: https://supabase.com/docs/guides/auth
2. Review your project tier limits and capabilities
3. Contact Supabase support if settings are not available in your tier

---

**Last Updated:** 2025-12-27
**Applied Migrations:**
- fix_security_issues_indexes_and_policies
- add_remaining_foreign_key_indexes
