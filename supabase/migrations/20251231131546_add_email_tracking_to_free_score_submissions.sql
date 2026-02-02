/*
  # Add Email Tracking to Free Score Submissions

  1. Changes
    - Add `email_sent` column (boolean, default false)
    - Add `email_sent_at` column (timestamp, nullable)
    - Add index on `email_sent` for querying unsent emails
  
  2. Purpose
    - Track when automated emails are sent to free score submitters
    - Enable retry logic for failed email sends
    - Provide visibility into email delivery status
  
  3. Notes
    - Non-breaking change - existing records will have email_sent = false
    - email_sent_at remains NULL until first successful email send
*/

-- Add email tracking columns
ALTER TABLE free_score_submissions
ADD COLUMN IF NOT EXISTS email_sent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS email_sent_at timestamptz;

-- Add index for querying unsent emails (useful for retry logic)
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_email_sent 
ON free_score_submissions(email_sent) 
WHERE email_sent = false;

-- Add comment for documentation
COMMENT ON COLUMN free_score_submissions.email_sent IS 'Whether the automated results email was successfully sent';
COMMENT ON COLUMN free_score_submissions.email_sent_at IS 'Timestamp when the results email was successfully sent';
