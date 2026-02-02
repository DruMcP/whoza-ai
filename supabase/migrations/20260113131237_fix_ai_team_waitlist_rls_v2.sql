/*
  # Fix AI Team Waitlist RLS Policy v2

  1. Changes
    - Drop all existing insert policies
    - Create a simple policy that allows all inserts for testing
    - This will be the most permissive approach for a public waitlist
*/

-- Drop all existing policies for insert
DROP POLICY IF EXISTS "Allow anonymous inserts" ON ai_team_waitlist;
DROP POLICY IF EXISTS "Allow public inserts" ON ai_team_waitlist;

-- Grant insert permission to anon role
GRANT INSERT ON ai_team_waitlist TO anon;
GRANT INSERT ON ai_team_waitlist TO authenticated;

-- Create simple insert policy
CREATE POLICY "Enable insert for all users" ON ai_team_waitlist
  FOR INSERT
  WITH CHECK (true);