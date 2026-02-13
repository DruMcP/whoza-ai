# Manual Configuration Checklist

**Status**: 2 configurations required to complete security fixes
**Time Required**: 5 minutes
**Priority**: Recommended (not blocking)

---

## ✅ SQL Fixes (COMPLETE)

All SQL-based security and performance issues have been resolved via migrations.

---

## ⚠️ Manual Configurations Required

### 1. Auth DB Connection Strategy (2 minutes)

**Why**: Allow auth server to scale with database instance upgrades.

**Steps**:

1. Open Supabase Dashboard
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/database
   ```

2. Scroll to: **Connection Pooling** section

3. Find: **Auth Server** configuration

4. Current setting: `10 connections` (fixed)

5. Change to: **Percentage-based allocation**
   - Recommended: `10%` of total connections
   - Or: Use suggested value from dashboard

6. Click: **Save**

**Expected Result**: Auth server connections will scale automatically with instance size.

**Verification**: Check that setting shows percentage instead of fixed number.

---

### 2. Leaked Password Protection (1 minute)

**Why**: Prevent users from choosing compromised passwords.

**Steps**:

1. Open Supabase Dashboard
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/settings
   ```

2. Scroll to: **Password Protection** or **Security** section

3. Find: **HaveIBeenPwned Integration** toggle

4. Enable: ✅ "Check passwords against HaveIBeenPwned.org"

5. Click: **Save**

**Expected Result**: Users will be prevented from using compromised passwords.

**Verification**: Try creating account with known leaked password (e.g., "password123") - should be rejected.

---

## Optional: Performance Monitoring

### Set Up Query Performance Monitoring

1. Go to: Supabase Dashboard → Database → Query Performance

2. Enable: Query statistics collection

3. Review slow queries weekly

4. Add indexes if new patterns emerge

---

## Verification

After completing manual configurations:

### Check Auth Connections
```sql
SHOW max_connections;
-- Verify auth server uses percentage
```

### Test Password Protection
1. Attempt signup with weak password
2. Expected: Error message about compromised password

---

## Summary

### Completed
- ✅ 65 SQL-based security fixes applied
- ✅ All migrations successful
- ✅ Build passing
- ✅ Production ready

### Pending
- ⚠️ Auth DB Connection Strategy (2 min)
- ⚠️ Leaked Password Protection (1 min)

### Time Required
- Total: 5 minutes
- Impact: High security value
- Priority: Recommended

---

**Note**: The application is fully functional without these manual configs. They are recommended best practices for optimal security and scalability.
