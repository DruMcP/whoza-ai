/*
  # Add Turnstile Verification Tracking

  1. Changes
    - Add `ip_address` column to `free_score_submissions` table (if not exists)
    - Add `turnstile_verified` column to `free_score_submissions` table
      - Tracks whether the submission was verified with Cloudflare Turnstile
      - Defaults to `false` for fallback submissions
    - Add `turnstile_verified` column to `free_score_rate_limits` table
      - Enables stricter rate limiting for unverified submissions
    
  2. Purpose
    - Allow fallback submissions when Turnstile fails to load
    - Apply different rate limits based on verification status
    - Track security metrics for monitoring and abuse prevention
*/

-- Add ip_address column to free_score_submissions first (needed for fallback rate limiting)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'free_score_submissions' AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE free_score_submissions 
    ADD COLUMN ip_address inet;
    
    CREATE INDEX IF NOT EXISTS idx_free_score_submissions_ip 
    ON free_score_submissions(ip_address);
  END IF;
END $$;

-- Add turnstile_verified to free_score_submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'free_score_submissions' AND column_name = 'turnstile_verified'
  ) THEN
    ALTER TABLE free_score_submissions 
    ADD COLUMN turnstile_verified boolean DEFAULT false NOT NULL;
    
    -- Add index for fallback rate limit queries
    CREATE INDEX IF NOT EXISTS idx_free_score_submissions_fallback_check 
    ON free_score_submissions(ip_address, turnstile_verified, created_at) 
    WHERE turnstile_verified = false;
  END IF;
END $$;

-- Add turnstile_verified to free_score_rate_limits
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'free_score_rate_limits' AND column_name = 'turnstile_verified'
  ) THEN
    ALTER TABLE free_score_rate_limits 
    ADD COLUMN turnstile_verified boolean DEFAULT false NOT NULL;
  END IF;
END $$;