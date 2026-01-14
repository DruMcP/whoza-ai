/*
  # Fix RLS Performance and Security Issues

  ## Overview
  Resolves critical performance and security issues identified in database audit:
  1. RLS policies re-evaluating auth functions for each row (performance issue)
  2. Function search path mutability (security issue)

  ## Changes

  ### RLS Performance Optimization
  Updates RLS policies to wrap auth function calls with SELECT subqueries,
  preventing re-evaluation for each row. This is critical for query performance at scale.

  Tables affected:
  - request_logs
  - rate_limit_violations
  - browser_fingerprints
  - captcha_verifications
  - free_score_submissions

  ### Function Security
  Sets stable search_path on trigger functions to prevent search_path manipulation attacks.

  ## Security Notes
  - All changes are backward compatible
  - No data modifications
  - Only policy and function definitions updated
  - Follows Supabase best practices for RLS optimization
*/

-- ============================================================================
-- FIX RLS POLICIES - Anti-Scraping System Tables
-- ============================================================================

-- Drop and recreate policies for request_logs
DROP POLICY IF EXISTS "Admins can view request logs" ON request_logs;
CREATE POLICY "Admins can view request logs"
  ON request_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- Drop and recreate policies for rate_limit_violations
DROP POLICY IF EXISTS "Admins can view rate violations" ON rate_limit_violations;
CREATE POLICY "Admins can view rate violations"
  ON rate_limit_violations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- Drop and recreate policies for browser_fingerprints
DROP POLICY IF EXISTS "Admins can view fingerprints" ON browser_fingerprints;
CREATE POLICY "Admins can view fingerprints"
  ON browser_fingerprints FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- Drop and recreate policies for captcha_verifications
DROP POLICY IF EXISTS "Admins can view CAPTCHA verifications" ON captcha_verifications;
CREATE POLICY "Admins can view CAPTCHA verifications"
  ON captcha_verifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- ============================================================================
-- FIX RLS POLICIES - Free Score Submissions
-- ============================================================================

-- Drop and recreate policies for free_score_submissions
DROP POLICY IF EXISTS "Users can view own submissions" ON free_score_submissions;
CREATE POLICY "Users can view own submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    user_id = (SELECT auth.uid()) OR
    email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Admin can view all submissions" ON free_score_submissions;
CREATE POLICY "Admin can view all submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admin can update submissions" ON free_score_submissions;
CREATE POLICY "Admin can update submissions"
  ON free_score_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- ============================================================================
-- FIX FUNCTION SEARCH PATH MUTABILITY
-- ============================================================================

-- Recreate function with stable search_path
CREATE OR REPLACE FUNCTION update_free_score_submissions_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger to ensure it's using the updated function
DROP TRIGGER IF EXISTS update_free_score_submissions_updated_at_trigger ON free_score_submissions;
CREATE TRIGGER update_free_score_submissions_updated_at_trigger
  BEFORE UPDATE ON free_score_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_free_score_submissions_updated_at();

-- ============================================================================
-- VERIFICATION COMMENTS
-- ============================================================================

-- All RLS policies now use (SELECT auth.uid()) instead of auth.uid()
-- This prevents re-evaluation of the auth function for each row
-- Function search_path is now stable and immutable
-- Changes are backward compatible and require no data migration