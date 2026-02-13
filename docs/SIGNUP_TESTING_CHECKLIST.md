# Sign-Up Flow Testing Checklist

## 🎯 Quick Test (5 minutes)

### Test Sign-Up Flow
1. Navigate to `/start`
2. Fill out Step 1 (Account):
   - Email: `test+${Date.now()}@example.com`
   - Password: `TestPass123!`
   - Click "Continue"

3. Fill out Step 2 (Business):
   - Business Name: "Test Plumbing Services"
   - Trade Type: "Plumber"
   - Postcode: "SW1A 1AA"
   - Service Area: "London"
   - Click "Continue"

4. Fill out Step 3 (Services):
   - Website URL: "https://testplumbing.com"
   - Google Business URL: "https://maps.google.com/..."
   - Key Services: "Emergency repairs, installations"
   - Credentials: "Gas Safe Registered"
   - Competitors: "Joe's Plumbing, Quick Fix Ltd"
   - Click "Continue"

5. Fill out Step 4 (Finish):
   - Founder's Circle: Yes/No
   - Click "Create Account"

### Expected Result ✅
- No error messages
- Success message: "Account created successfully! Setting up your profile..."
- Redirect to `/checkout` page
- User logged in successfully

### Verify in Database
```sql
-- Check user was created
SELECT id, email, business_name, trade_type, postcode
FROM users
WHERE email = 'test@example.com';

-- Should return one row with all data populated
```

## 🔍 Detailed Testing (15 minutes)

### Test 1: Successful Sign-Up
- [ ] Step 1 validates email format
- [ ] Step 1 validates password length (min 6 characters)
- [ ] Step 2 validates postcode format
- [ ] Step 2 validates trade type required
- [ ] Step 3 validates URL format (if provided)
- [ ] Step 4 shows all collected data review
- [ ] Success message appears
- [ ] User redirected to checkout
- [ ] All data saved in database

### Test 2: Validation Errors
- [ ] Invalid email shows error
- [ ] Short password shows warning
- [ ] Invalid postcode shows error
- [ ] Invalid URL shows error
- [ ] Required fields can't be skipped

### Test 3: Duplicate Email
- [ ] Try signing up with existing email
- [ ] Should show: "User already registered"
- [ ] Should not create duplicate record

### Test 4: Login After Sign-Up
- [ ] Sign up new account
- [ ] Log out
- [ ] Log back in with same credentials
- [ ] Should redirect to `/portal`
- [ ] Profile data should be visible

### Test 5: Admin Access
- [ ] Create admin user (set role = 'admin' in DB)
- [ ] Log in as admin
- [ ] Navigate to `/admin`
- [ ] Should see all user profiles
- [ ] Should be able to view user details

## 🐛 Error Scenarios to Test

### Test 1: Network Interruption
- [ ] Start sign-up
- [ ] Disable network before submitting
- [ ] Submit form
- [ ] Should show network error
- [ ] Re-enable network and retry
- [ ] Should succeed

### Test 2: Browser Back Button
- [ ] Start sign-up
- [ ] Complete Step 1
- [ ] Press browser back button
- [ ] Should stay on Step 1 or go to previous page
- [ ] Data should be preserved

### Test 3: Page Refresh
- [ ] Fill out Step 1 and Step 2
- [ ] Refresh page
- [ ] Data might be lost (expected for security)
- [ ] Should be able to re-fill and continue

## 🔒 Security Testing

### Test 1: RLS Policies
```sql
-- As user A, try to read user B's data
-- This should return empty result
SELECT * FROM users WHERE email = 'userb@example.com';
```

### Test 2: Unauthorized Access
- [ ] Log out
- [ ] Try accessing `/portal`
- [ ] Should redirect to `/start`

### Test 3: SQL Injection (Automated Prevention)
- [ ] Try SQL injection in business name: `'; DROP TABLE users; --`
- [ ] Should be safely escaped
- [ ] Data should insert as literal string

## 📊 Database Verification Queries

### Check User Count
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Check Recent Sign-Ups
```sql
SELECT id, email, business_name, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;
```

### Check for Missing Data
```sql
-- Users with incomplete profiles
SELECT id, email, business_name
FROM users
WHERE business_name IS NULL
   OR trade_type IS NULL
   OR postcode IS NULL;
```

### Check RLS Policies
```sql
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'users';
```

Expected policies:
- Users can view own profile (SELECT)
- Users can insert own profile (INSERT)
- Users can update own profile (UPDATE)
- Admins can view all profiles (SELECT)
- Admins can update all profiles (UPDATE)

## 🎯 Success Criteria

All checks must pass:
- ✅ User can complete sign-up flow without errors
- ✅ All form data is saved to database
- ✅ User can log in after sign-up
- ✅ User profile data loads correctly
- ✅ No SQL errors in application logs
- ✅ No console errors in browser
- ✅ RLS policies prevent unauthorized access
- ✅ Build completes without warnings

## 🚨 Known Issues (None Currently)

No known issues at this time.

## 📝 Reporting Issues

If you encounter an error:

1. **Note the exact error message**
2. **Check browser console** (F12 → Console tab)
3. **Check Supabase logs** (Dashboard → Logs)
4. **Record the steps** to reproduce
5. **Screenshot the error** if visible

Include this information:
- Error message
- Stack trace (if available)
- User email attempting sign-up
- Timestamp of error
- Browser and OS version

---

**Last Updated**: 2026-01-02
**Status**: ✅ All Tests Passing
**Next Review**: After production deployment
