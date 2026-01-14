/*
  # Fix AI Team Waitlist RLS Policies - Final

  1. Changes
    - Remove all duplicate and overlapping policies
    - Optimize remaining policies by using (SELECT auth.function()) pattern
    - Consolidate into minimal necessary policies
    - Fix "always true" security issue by making insert more restrictive

  2. Security Improvements
    - Remove unrestricted "WITH CHECK (true)" policy
    - Add proper validation for public inserts
    - Optimize auth function calls for better performance
    - Keep only one insert policy and necessary select policies
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous inserts" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Allow public inserts" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Enable insert for all users" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Public can insert to waitlist" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Users can view own waitlist entries" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Authenticated users can view relevant waitlist entries" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Admins can view all waitlist entries" ON ai_team_waitlist;

-- Create single optimized insert policy for public access
-- Restricts to valid email format and product values (enforced by table constraints)
CREATE POLICY "Public can join waitlist" ON ai_team_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL 
    AND LENGTH(email) > 0 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND product IN ('chloe', 'simon')
  );

-- Create optimized select policy for authenticated users to view their own entries
CREATE POLICY "Users view own entries" ON ai_team_waitlist
  FOR SELECT
  TO authenticated
  USING (email = ((SELECT auth.jwt()) ->> 'email'));

-- Create optimized select policy for admins to view all entries
CREATE POLICY "Admins view all entries" ON ai_team_waitlist
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );