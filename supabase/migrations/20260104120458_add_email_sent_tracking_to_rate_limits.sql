/*
  # Add Email Sent Tracking to Rate Limits

  1. Changes
    - Add `email_sent_at` column to `free_score_rate_limits` table
    - This column tracks when the last email was sent to prevent duplicates

  2. Purpose
    - Server-side deduplication of email sends
    - Prevents duplicate emails even if frontend guards fail
    - 10-second window to block rapid duplicate sends

  ## Notes
  - Used by verify-free-score edge function
  - Provides ultimate failsafe against duplicate emails
*/

-- Add email_sent_at column to track when emails are sent
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'free_score_rate_limits'
    AND column_name = 'email_sent_at'
  ) THEN
    ALTER TABLE free_score_rate_limits
    ADD COLUMN email_sent_at timestamptz;

    -- Add index for fast duplicate checking
    CREATE INDEX IF NOT EXISTS idx_free_score_rate_limits_email_sent_at
    ON free_score_rate_limits(email, email_sent_at);

    COMMENT ON COLUMN free_score_rate_limits.email_sent_at IS
    'Timestamp of when the last email was sent to this email address. Used for server-side duplicate prevention.';
  END IF;
END $$;
