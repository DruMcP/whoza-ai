/*
  # Add Email Validation Constraint

  1. Changes
    - Add CHECK constraint to validate email format at database level
    - This ensures validation even when RLS is bypassed (service role, etc.)
    - More reliable than RLS-only validation

  2. Security Improvements
    - Prevents invalid emails at the database level
    - Works regardless of which role performs the insert
    - Complements the RLS policy for defense in depth
*/

-- Add CHECK constraint for email validation
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'ai_team_waitlist_email_format_check'
  ) THEN
    ALTER TABLE ai_team_waitlist
    ADD CONSTRAINT ai_team_waitlist_email_format_check
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;
END $$;