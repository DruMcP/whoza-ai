/*
  # Add google_data column to free_score_submissions
  
  ## Overview
  Adds missing `google_data` column to store Google Places API response data for free score submissions.
  
  ## Changes
  - Add `google_data` (jsonb) column to `free_score_submissions` table to store raw API response
  - Column is nullable as Google Places data may not always be available
  - Adds index for JSONB queries if needed in the future
  
  ## Purpose
  The Edge Function `verify-free-score` collects data from Google Places API and this column
  is needed to store that data for analysis and reporting purposes.
*/

-- Add google_data column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'free_score_submissions' AND column_name = 'google_data'
  ) THEN
    ALTER TABLE free_score_submissions 
    ADD COLUMN google_data jsonb DEFAULT null;
    
    -- Add comment for documentation
    COMMENT ON COLUMN free_score_submissions.google_data IS 'Raw Google Places API response data for this business lookup';
  END IF;
END $$;

-- Create index for JSONB queries (optional but useful)
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_google_data_gin 
  ON free_score_submissions USING gin(google_data);
