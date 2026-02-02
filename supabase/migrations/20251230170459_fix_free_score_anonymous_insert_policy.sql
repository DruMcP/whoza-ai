/*
  # Fix Free Score Form - Allow Anonymous Submissions

  ## Problem
  The free score form at /free-score was failing with "Sorry, something went wrong" 
  because anonymous users could not insert into the free_score_submissions table.
  
  A previous migration (20251225120659) removed the INSERT policy for anonymous users
  but never recreated it.

  ## Changes
  1. Add INSERT policy allowing anonymous (anon) users to submit free scores
  2. Users can submit without authentication (email is optional)
  3. Maintain security by only allowing inserts, not reads
  
  ## Security
  - Anonymous users can INSERT (create new submissions)
  - Only authenticated users can SELECT their own submissions
  - Only admins can SELECT all submissions
  - Only admins can UPDATE submissions
*/

-- ============================================================================
-- FIX: Add missing INSERT policy for anonymous free score submissions
-- ============================================================================

DROP POLICY IF EXISTS "Anonymous users can submit free scores" ON free_score_submissions;

CREATE POLICY "Anonymous users can submit free scores"
  ON free_score_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add helpful comment
COMMENT ON POLICY "Anonymous users can submit free scores" ON free_score_submissions 
IS 'Allows anyone (anonymous or authenticated) to submit a free score request. This is intentional for lead generation.';

COMMENT ON TABLE free_score_submissions 
IS 'Stores free visibility score submissions. Anonymous inserts allowed for lead gen, but only authenticated users can view their own submissions.';
