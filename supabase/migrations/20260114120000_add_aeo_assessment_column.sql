/*
  # Add AEO Assessment Column to Users Table

  ## Overview
  Adds a JSONB column to store AEO (Answer Engine Optimization) assessment data
  collected during the onboarding process.

  ## Changes
  
  ### New Column: `aeo_assessment`
  
  | Column | Type | Description |
  |--------|------|-------------|
  | aeo_assessment | jsonb | Stores AEO assessment responses and scores |

  ## Data Structure
  
  The `aeo_assessment` column stores a JSON object with the following structure:
  
  ```json
  {
    "responses": {
      "website": "yes_updated",
      "googleBusiness": "yes_optimized",
      "reviews": "20_plus",
      "aiTesting": "yes_found",
      "structuredData": "yes_implemented"
    },
    "score": 85,
    "segment": "Visible",
    "completedAt": "2026-01-14T12:00:00Z"
  }
  ```
  
  Or if skipped:
  
  ```json
  {
    "skipped": true,
    "completedAt": "2026-01-14T12:00:00Z"
  }
  ```

  ## Notes
  - Column is nullable (optional during onboarding)
  - Uses JSONB for efficient querying and indexing
  - No RLS changes needed (inherits from users table)
*/

-- Add aeo_assessment column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS aeo_assessment jsonb;

-- Add comment for documentation
COMMENT ON COLUMN users.aeo_assessment IS 'AEO (Answer Engine Optimization) assessment data from onboarding: responses, score, segment, and completion timestamp';

-- Create index for querying by assessment completion
CREATE INDEX IF NOT EXISTS idx_users_aeo_assessment_completed 
ON users ((aeo_assessment IS NOT NULL));

-- Create index for querying by score segment (for analytics)
CREATE INDEX IF NOT EXISTS idx_users_aeo_assessment_segment 
ON users ((aeo_assessment->>'segment'));
