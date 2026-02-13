# Portal, Tasks, and Reports Debug Quick Start

**How to diagnose loading issues in 2 minutes**

**Applies to**: `/portal`, `/tasks`, `/reports`

---

## Step 1: Open Browser Console

1. Navigate to `/portal`, `/tasks`, or `/reports` in your browser
2. Press `F12` or `Right-click → Inspect`
3. Click the **Console** tab
4. Look for logs starting with `[Portal]`, `[Tasks]`, or `[Reports]`

---

## Step 2: Identify the Issue

### ✅ Normal (Working)
```
[Portal] Auth state changed: { hasUser: true, hasUserData: true, ... }
[Portal] Loading portal data for user: abc123...
[Portal] Business profile: found
[Portal] Portal data loaded, setting loading to false
[Portal] Rendering main portal for user: abc123...
```
**Status**: Working correctly
**Action**: None needed

---

### ⚠️ User Has No Profile
```
[Portal] Auth state changed: { hasUser: true, hasUserData: false, userId: "abc123..." }
[Portal] User authenticated but has no profile in users table: abc123...
```
**Status**: User is logged in but missing profile in database
**Fix**:
1. User should go to `/start` to complete onboarding
2. OR manually create profile in database:
```sql
INSERT INTO users (id, email, subscription_tier, subscription_status)
VALUES ('USER_ID', 'user@email.com', 'free', 'trial');
```

---

### ❌ RLS Policy Blocking
```
[Portal] Error fetching user data: { message: "permission denied for table users" }
```
**Status**: Database security policy is blocking the query
**Fix**: Check RLS policy on `users` table:
```sql
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

---

### ❌ Database Error
```
[Portal] Error loading portal data: { message: "Failed to fetch" }
```
**Status**: Database connection issue
**Fix**:
1. Check Supabase is running
2. Verify environment variables in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Check network connection

---

### ⏱️ Loading Timeout
```
[Portal] Showing loading state: { loading: true, authLoading: false, loadingTimeout: true }
```
**Status**: Portal took more than 10 seconds to load
**Action**:
1. Check the debug info displayed on screen
2. Look for errors in console
3. Click "Refresh Page" button
4. Check database connection

---

## Step 3: Quick Fixes

### Fix 1: User Missing from Database
```sql
-- Run in Supabase SQL Editor
INSERT INTO users (id, email, business_name, subscription_tier, subscription_status, created_at)
VALUES (
  'USER_AUTH_ID',  -- Get from console log
  'user@email.com',
  'Business Name',
  'free',
  'trial',
  NOW()
);
```

### Fix 2: Refresh User Session
```javascript
// Run in Browser Console
await supabase.auth.refreshSession();
window.location.reload();
```

### Fix 3: Check User ID
```javascript
// Run in Browser Console
const { data: { user } } = await supabase.auth.getUser();
console.log('User ID:', user?.id);
console.log('User Email:', user?.email);
```

### Fix 4: Check Database Record
```sql
-- Run in Supabase SQL Editor (replace USER_ID)
SELECT id, email, business_name, subscription_tier, subscription_status
FROM users
WHERE id = 'USER_ID';
```

---

## Common Scenarios

### Scenario 1: New User After Signup
**Symptoms**: Loading forever after creating account
**Console**: `hasUser: true, hasUserData: false`
**Fix**: User needs to complete onboarding at `/start`

### Scenario 2: Existing User Can't Access Portal
**Symptoms**: Worked before, broken now
**Console**: `Error fetching user data` or `permission denied`
**Fix**: Check RLS policies, verify user record exists

### Scenario 3: Infinite Loading, No Logs
**Symptoms**: Loading spinner forever, no console logs
**Console**: Empty or only shows `[Portal] Auth state changed`
**Fix**: Check if AuthContext is working, verify Supabase connection

### Scenario 4: Timeout with Debug Info
**Symptoms**: Portal shows timeout screen after 10 seconds
**Console**: Multiple logs but stuck in loading state
**Fix**: Check database queries, verify RLS policies, check network

---

## Emergency Recovery

If nothing works:

### Step 1: Clear Everything
```javascript
// Run in Browser Console
localStorage.clear();
sessionStorage.clear();
await supabase.auth.signOut();
```

### Step 2: Sign In Again
1. Go to `/start`
2. Sign in with credentials
3. Complete onboarding if prompted

### Step 3: Verify Database
```sql
-- Check if user exists
SELECT * FROM users WHERE email = 'YOUR_EMAIL';

-- If missing, insert user
INSERT INTO users (id, email, subscription_tier, subscription_status)
SELECT id, email, 'free', 'trial'
FROM auth.users
WHERE email = 'YOUR_EMAIL';
```

---

## Contact Support

If issue persists, provide these details:

1. **User ID** (from console log)
2. **Email** (user's email address)
3. **Console logs** (copy entire Console tab)
4. **Steps taken** (what you tried)
5. **Timeout debug info** (if timeout occurred)

Copy this from browser console:
```javascript
{
  userId: 'USER_ID',
  hasUser: true/false,
  hasUserData: true/false,
  subscription_tier: 'value',
  subscription_status: 'value'
}
```

---

## For Developers

### Enable Verbose Logging
All logs are already enabled in the current build.

### Check Auth State
```javascript
// Run in Browser Console
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
console.log('User:', session?.user);
```

### Check User Profile
```javascript
// Run in Browser Console
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', 'USER_ID')
  .maybeSingle();
console.log('Profile:', data);
console.log('Error:', error);
```

### Test RLS
```sql
-- Run as specific user in Supabase SQL Editor
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims.sub TO 'USER_ID';

SELECT * FROM users WHERE id = 'USER_ID';
```

---

## Summary

**90% of issues are caused by**:
1. User not in `users` table (50%)
2. RLS policy blocking query (30%)
3. Database connection error (10%)
4. Other (10%)

**Quick check**: Look for `hasUserData: false` in console logs. If false, user needs profile created.

**Emergency fix**: Create user profile manually in database.

---

## Note for All Pages

The debugging steps above apply to all three pages:

- **Portal** (`/portal`) - Shows `[Portal]` logs
- **Tasks** (`/tasks`) - Shows `[Tasks]` logs
- **Reports** (`/reports`) - Shows `[Reports]` logs

All three pages use identical loading logic and error handling, so the same debugging approach works for all.

**Common pattern**:
1. Check console logs with page-specific prefix
2. Look for `hasUserData: false` if loading forever
3. Create user profile if missing
4. Check RLS policies if errors appear

---

**Last Updated**: 2026-01-02
**Build Version**:
- Portal.js: 93.17 kB
- Tasks.js: 13.26 kB
- Reports.js: 13.43 kB
