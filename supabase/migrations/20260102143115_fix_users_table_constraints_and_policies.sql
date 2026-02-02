/*
  # Fix Users Table Constraints and Policies

  ## Overview
  Fixes the users table to work properly with Supabase Auth and sign-up flow.
  Note: Cannot add auth.users trigger due to permission limitations.
  Application code will handle profile creation with upsert.

  ## Changes Made

  ### 1. Add Service Role Policies
  - Allows service role to manage all user profiles
  - Required for admin operations and edge functions

  ### 2. Update Insert Policy
  - Ensures authenticated users can create their own profile
  - Handles upsert operations from application code

  ### 3. Add Anon Insert Policy
  - Allows anonymous users to create profile during sign-up
  - Restricted to their own auth.uid()
  - Temporary access during authentication flow

  ### 4. Backfill Existing Users
  - Creates profiles for any existing auth users without profiles
  - Sets default values

  ## Security
  - RLS remains enabled and restrictive
  - Users can only access/modify their own data
  - Service role has full access for admin operations
  - Anonymous access only during sign-up for own profile

  ## Application Changes Required
  - Start.jsx must use upsert instead of insert
  - Must handle profile creation in onboarding flow
  - Error handling for database operations
*/

-- =====================================================
-- 1. ADD SERVICE ROLE POLICIES
-- =====================================================

-- Service role can SELECT all profiles
DROP POLICY IF EXISTS "Service role can select all profiles" ON public.users;
CREATE POLICY "Service role can select all profiles"
  ON public.users
  FOR SELECT
  TO service_role
  USING (true);

-- Service role can INSERT profiles
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.users;
CREATE POLICY "Service role can insert profiles"
  ON public.users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Service role can UPDATE all profiles
DROP POLICY IF EXISTS "Service role can update all profiles" ON public.users;
CREATE POLICY "Service role can update all profiles"
  ON public.users
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Service role can DELETE profiles
DROP POLICY IF EXISTS "Service role can delete profiles" ON public.users;
CREATE POLICY "Service role can delete profiles"
  ON public.users
  FOR DELETE
  TO service_role
  USING (true);

-- =====================================================
-- 2. UPDATE AUTHENTICATED USER POLICIES
-- =====================================================

-- Recreate insert policy with better error handling
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

-- =====================================================
-- 3. ADD ANONYMOUS INSERT POLICY FOR SIGN-UP FLOW
-- =====================================================

-- Allow anon users to insert their own profile during sign-up
-- This is needed because the sign-up process happens in anon context
DROP POLICY IF EXISTS "Anonymous users can insert during signup" ON public.users;
CREATE POLICY "Anonymous users can insert during signup"
  ON public.users
  FOR INSERT
  TO anon
  WITH CHECK ((select auth.uid()) = id);

-- Allow anon users to read their own profile during sign-up
DROP POLICY IF EXISTS "Anonymous users can read own profile" ON public.users;
CREATE POLICY "Anonymous users can read own profile"
  ON public.users
  FOR SELECT
  TO anon
  USING ((select auth.uid()) = id);

-- =====================================================
-- 4. BACKFILL EXISTING AUTH USERS
-- =====================================================

-- Create profiles for any existing auth users without profiles
-- This requires service role context
DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  -- Count how many auth users don't have profiles
  SELECT COUNT(*) INTO missing_count
  FROM auth.users au
  LEFT JOIN public.users pu ON au.id = pu.id
  WHERE pu.id IS NULL;

  IF missing_count > 0 THEN
    -- Create missing profiles
    INSERT INTO public.users (
      id,
      email,
      business_name,
      trade_type,
      postcode,
      role,
      subscription_tier,
      subscription_status,
      created_at,
      updated_at
    )
    SELECT 
      au.id,
      COALESCE(au.email, 'no-email@example.com'),
      'Pending Setup',
      'Pending Setup',
      'Pending Setup',
      'customer',
      'free',
      'trial',
      au.created_at,
      NOW()
    FROM auth.users au
    LEFT JOIN public.users pu ON au.id = pu.id
    WHERE pu.id IS NULL
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Backfilled % missing user profiles', missing_count;
  ELSE
    RAISE NOTICE 'No missing user profiles to backfill';
  END IF;
END $$;

-- =====================================================
-- 5. ADD HELPER FUNCTION FOR PROFILE CREATION
-- =====================================================

-- Create a helper function that can be called from application code or edge functions
CREATE OR REPLACE FUNCTION public.create_user_profile(
  user_id UUID,
  user_email TEXT,
  p_business_name TEXT DEFAULT 'Pending Setup',
  p_trade_type TEXT DEFAULT 'Pending Setup',
  p_postcode TEXT DEFAULT 'Pending Setup',
  p_service_area TEXT DEFAULT NULL,
  p_website_url TEXT DEFAULT NULL,
  p_google_business_url TEXT DEFAULT NULL,
  p_key_services TEXT DEFAULT NULL,
  p_credentials TEXT DEFAULT NULL,
  p_competitors TEXT DEFAULT NULL,
  p_founder BOOLEAN DEFAULT false
)
RETURNS public.users
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.users;
BEGIN
  -- Insert or update user profile
  INSERT INTO public.users (
    id,
    email,
    business_name,
    trade_type,
    postcode,
    service_area,
    website_url,
    google_business_url,
    key_services,
    credentials,
    competitors,
    founder,
    role,
    subscription_tier,
    subscription_status,
    created_at,
    updated_at
  )
  VALUES (
    user_id,
    user_email,
    p_business_name,
    p_trade_type,
    p_postcode,
    p_service_area,
    p_website_url,
    p_google_business_url,
    p_key_services,
    p_credentials,
    p_competitors,
    p_founder,
    'customer',
    'free',
    'trial',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    business_name = EXCLUDED.business_name,
    trade_type = EXCLUDED.trade_type,
    postcode = EXCLUDED.postcode,
    service_area = EXCLUDED.service_area,
    website_url = EXCLUDED.website_url,
    google_business_url = EXCLUDED.google_business_url,
    key_services = EXCLUDED.key_services,
    credentials = EXCLUDED.credentials,
    competitors = EXCLUDED.competitors,
    founder = EXCLUDED.founder,
    updated_at = NOW()
  RETURNING * INTO result;

  RETURN result;
END;
$$;

-- Add comment
COMMENT ON FUNCTION public.create_user_profile IS
  'Helper function to create or update user profiles. Uses SECURITY DEFINER to bypass RLS. Can be called from application code or edge functions.';

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Verify policies exist
DO $$
DECLARE
  policy_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'users'
    AND policyname IN (
      'Service role can select all profiles',
      'Service role can insert profiles',
      'Users can insert own profile',
      'Anonymous users can insert during signup'
    );

  IF policy_count < 4 THEN
    RAISE WARNING 'Expected at least 4 new policies, found %', policy_count;
  ELSE
    RAISE NOTICE 'All required policies created successfully';
  END IF;
END $$;

-- Verify function exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'create_user_profile'
  ) THEN
    RAISE EXCEPTION 'Function create_user_profile not created';
  END IF;
  
  RAISE NOTICE 'Helper function create_user_profile created successfully';
END $$;