/*
  # Free AI Visibility Score System

  ## Overview
  Extends the existing visibility scoring system to support free, preview-only diagnostic scores
  that serve as a conversion tool. Free scores are lightweight, high-level assessments that
  demonstrate value without providing full service features.

  ## Changes to Existing Tables

  ### `visibility_score_details`
  Add three new columns:
  - `is_free_preview` (boolean) - Marks if this is a free diagnostic score
  - `score_band` (text) - Simple category: 'Low', 'Medium', 'High'
  - `summary_text` (text) - Plain-English explanation of the score

  ## New Tables

  ### `free_score_submissions`
  Tracks free score requests before users create full accounts:
  - `id` (uuid, primary key) - Unique submission identifier
  - `email` (text, optional) - Contact email if provided
  - `business_name` (text) - Name of the business
  - `trade_type` (text) - Type of trade/business
  - `location` (text) - Business location
  - `website_url` (text, optional) - Website or Google Business link
  - `calculated_score` (integer) - The free visibility score (0-100)
  - `score_band` (text) - Low/Medium/High classification
  - `summary_text` (text) - Explanation of what the score means
  - `converted_to_user` (boolean) - Whether they signed up
  - `user_id` (uuid, optional) - If they converted, link to user
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Free score submissions are publicly insertable (to allow pre-auth submissions)
  - Users can view their own submissions after auth
  - Admins can view all submissions

  ## Notes
  - Free scores use simplified calculation logic
  - No detailed breakdowns or recommendations included
  - Designed to demonstrate value and drive conversions
*/

-- Extend visibility_score_details table with free preview fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'is_free_preview'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN is_free_preview boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'score_band'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN score_band text CHECK (score_band IN ('Low', 'Medium', 'High'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'summary_text'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN summary_text text;
  END IF;
END $$;

-- Create free_score_submissions table
CREATE TABLE IF NOT EXISTS free_score_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  business_name text NOT NULL,
  trade_type text NOT NULL,
  location text NOT NULL,
  website_url text,
  calculated_score integer NOT NULL CHECK (calculated_score >= 0 AND calculated_score <= 100),
  score_band text NOT NULL CHECK (score_band IN ('Low', 'Medium', 'High')),
  summary_text text NOT NULL,
  converted_to_user boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE free_score_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a free score (pre-auth)
CREATE POLICY "Anyone can submit free score"
  ON free_score_submissions FOR INSERT
  WITH CHECK (true);

-- Users can view their own submissions (by email or user_id)
CREATE POLICY "Users can view own submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Admins can view all submissions
CREATE POLICY "Admin can view all submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Admins can update submissions (e.g., mark as converted)
CREATE POLICY "Admin can update submissions"
  ON free_score_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_email 
  ON free_score_submissions(email);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_user 
  ON free_score_submissions(user_id);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_created 
  ON free_score_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_converted 
  ON free_score_submissions(converted_to_user);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_free_score_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_free_score_submissions_updated_at_trigger ON free_score_submissions;
CREATE TRIGGER update_free_score_submissions_updated_at_trigger
  BEFORE UPDATE ON free_score_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_free_score_submissions_updated_at();