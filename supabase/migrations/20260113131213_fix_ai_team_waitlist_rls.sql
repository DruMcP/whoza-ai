/*
  # Fix AI Team Waitlist RLS Policy

  1. Changes
    - Drop and recreate the insert policy to allow anonymous users
    - Ensure the policy applies to both anonymous and authenticated users
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON ai_team_waitlist;

-- Create new insert policy that allows both anonymous and authenticated users
CREATE POLICY "Allow public inserts" ON ai_team_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);