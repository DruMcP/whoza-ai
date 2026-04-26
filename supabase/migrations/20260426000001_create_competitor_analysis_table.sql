-- Migration: Create competitor_analysis table
-- Replaces free_score_submissions for the new Competitor Analysis feature

CREATE TABLE IF NOT EXISTS competitor_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  trade_type text NOT NULL,
  location text NOT NULL,
  postcode text,
  website_url text,
  submitted_business_id text, -- Google Places place_id
  competitor_name text,
  competitor_website text,
  blind_spot_reasons jsonb DEFAULT '[]'::jsonb,
  quick_fixes jsonb DEFAULT '[]'::jsonb,
  is_submitted_business_recommended boolean DEFAULT false,
  user_email text,
  email_captured boolean DEFAULT false,
  wants_full_report boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE competitor_analysis ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an analysis (pre-auth)
CREATE POLICY "Anyone can submit competitor analysis"
  ON competitor_analysis FOR INSERT
  WITH CHECK (
    business_name IS NOT NULL
    AND business_name != ''
    AND trade_type IS NOT NULL
    AND trade_type != ''
    AND location IS NOT NULL
    AND location != ''
    AND length(business_name) <= 255
    AND length(trade_type) <= 255
    AND length(location) <= 255
  );

-- Users can view their own analyses (by email)
CREATE POLICY "Users can view own analyses"
  ON competitor_analysis FOR SELECT
  TO authenticated
  USING (
    user_email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid()))
  );

-- Admin can view all analyses
CREATE POLICY "Admin can view all analyses"
  ON competitor_analysis FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- Admin can update analyses
CREATE POLICY "Admin can update analyses"
  ON competitor_analysis FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_competitor_analysis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_competitor_analysis_updated_at
  BEFORE UPDATE ON competitor_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_competitor_analysis_updated_at();

-- Index for admin queries
CREATE INDEX IF NOT EXISTS idx_competitor_analysis_created_at
  ON competitor_analysis (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_competitor_analysis_email_captured
  ON competitor_analysis (email_captured)
  WHERE email_captured = true;
