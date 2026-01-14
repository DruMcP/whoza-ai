/*
  # Make Email Required in Free Score Submissions

  ## Overview
  Email address is now mandatory for all free score submissions. This ensures we can:
  1. Send results to customers
  2. Follow up with leads
  3. Build our marketing database
  4. Provide better customer service

  ## Changes
  1. Alter `free_score_submissions` table to make email NOT NULL
  2. No changes to RLS policies needed (already allow anonymous INSERT)

  ## Migration Safety
  - Uses ALTER TABLE to modify existing column
  - Existing records with null emails are NOT affected (grandfathered in)
  - New submissions MUST include email

  ## Important
  This is a CRITICAL change for marketing and lead generation.
*/

-- Make email required for all new free score submissions
ALTER TABLE free_score_submissions 
  ALTER COLUMN email SET NOT NULL;

-- Add a comment to document this requirement
COMMENT ON COLUMN free_score_submissions.email IS 
  'Email address is REQUIRED. Used to send results and follow up with leads. Added as required field on 2024-12-31.';
