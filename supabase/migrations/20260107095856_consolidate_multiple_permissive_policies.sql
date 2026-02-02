/*
  # Consolidate Multiple Permissive Policies

  ## Overview
  Converts multiple permissive policies into single policies with combined logic.
  Multiple permissive policies can create confusion and potential security gaps.

  ## Changes
  - users table: Consolidate SELECT and UPDATE policies
  - visibility_checks table: Consolidate SELECT policies
*/

-- Fix users table SELECT policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;

CREATE POLICY "Users and admins can view profiles"
  ON public.users FOR SELECT TO authenticated
  USING (
    (select auth.uid()) = id
    OR EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND role = 'admin')
  );

-- Fix users table UPDATE policies
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

CREATE POLICY "Users and admins can update profiles"
  ON public.users FOR UPDATE TO authenticated
  USING (
    (select auth.uid()) = id
    OR EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    (select auth.uid()) = id
    OR EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND role = 'admin')
  );

-- Fix visibility_checks table SELECT policies (uses business_id, not user_id)
DROP POLICY IF EXISTS "Admins can manage all visibility checks" ON public.visibility_checks;
DROP POLICY IF EXISTS "Users can view own visibility checks" ON public.visibility_checks;

CREATE POLICY "Users and admins can view visibility checks"
  ON public.visibility_checks FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND role = 'admin')
  );
