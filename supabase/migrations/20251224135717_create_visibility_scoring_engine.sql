/*
  # AI Visibility Scoring Engine

  ## Overview
  Creates a comprehensive scoring system that measures business visibility across AI platforms
  using multi-factor analysis including profile completeness, reviews, citations, content,
  technical SEO, and social presence.

  ## New Tables

  ### `visibility_score_details`
  - `id` (uuid, primary key) - Unique score detail identifier
  - `business_id` (uuid, references business_profiles) - Associated business
  - `score_date` (date) - Date of score calculation
  - `overall_score` (integer, 0-100) - Total AI visibility score
  - `profile_completeness_score` (integer, 0-25) - Profile completion score
  - `review_quality_score` (integer, 0-20) - Review quality and quantity score
  - `citation_presence_score` (integer, 0-20) - Directory and citation score
  - `content_relevance_score` (integer, 0-15) - Content quality score
  - `technical_seo_score` (integer, 0-10) - Technical SEO score
  - `social_presence_score` (integer, 0-10) - Social media presence score
  - `benchmark_percentile` (integer, 0-100) - Percentile rank vs similar businesses
  - `month_over_month_change` (integer) - Change from previous month
  - `recommendations` (jsonb) - Specific improvement recommendations
  - `calculation_metadata` (jsonb) - Details of how score was calculated
  - `created_at` (timestamptz) - Creation timestamp

  ### `scoring_benchmarks`
  - `id` (uuid, primary key) - Benchmark identifier
  - `trade_type` (text) - Type of trade/business
  - `metric_name` (text) - Name of metric being benchmarked
  - `percentile_25` (numeric) - 25th percentile value
  - `percentile_50` (numeric) - 50th percentile (median) value
  - `percentile_75` (numeric) - 75th percentile value
  - `percentile_90` (numeric) - 90th percentile value
  - `sample_size` (integer) - Number of businesses in benchmark
  - `last_updated` (timestamptz) - Last update timestamp
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can view their own scores
  - Admins have full access
*/

-- Create visibility_score_details table
CREATE TABLE IF NOT EXISTS visibility_score_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  score_date date NOT NULL DEFAULT CURRENT_DATE,
  overall_score integer NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  profile_completeness_score integer DEFAULT 0 CHECK (profile_completeness_score >= 0 AND profile_completeness_score <= 25),
  review_quality_score integer DEFAULT 0 CHECK (review_quality_score >= 0 AND review_quality_score <= 20),
  citation_presence_score integer DEFAULT 0 CHECK (citation_presence_score >= 0 AND citation_presence_score <= 20),
  content_relevance_score integer DEFAULT 0 CHECK (content_relevance_score >= 0 AND content_relevance_score <= 15),
  technical_seo_score integer DEFAULT 0 CHECK (technical_seo_score >= 0 AND technical_seo_score <= 10),
  social_presence_score integer DEFAULT 0 CHECK (social_presence_score >= 0 AND social_presence_score <= 10),
  benchmark_percentile integer DEFAULT 0 CHECK (benchmark_percentile >= 0 AND benchmark_percentile <= 100),
  month_over_month_change integer DEFAULT 0,
  recommendations jsonb DEFAULT '[]',
  calculation_metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id, score_date)
);

ALTER TABLE visibility_score_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.id = visibility_score_details.business_id
      AND business_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can insert score details"
  ON visibility_score_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can update score details"
  ON visibility_score_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create scoring_benchmarks table
CREATE TABLE IF NOT EXISTS scoring_benchmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_type text NOT NULL,
  metric_name text NOT NULL,
  percentile_25 numeric DEFAULT 0,
  percentile_50 numeric DEFAULT 0,
  percentile_75 numeric DEFAULT 0,
  percentile_90 numeric DEFAULT 0,
  sample_size integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(trade_type, metric_name)
);

ALTER TABLE scoring_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view benchmarks"
  ON scoring_benchmarks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage benchmarks"
  ON scoring_benchmarks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business 
  ON visibility_score_details(business_id, score_date DESC);

CREATE INDEX IF NOT EXISTS idx_visibility_score_details_date 
  ON visibility_score_details(score_date DESC);

CREATE INDEX IF NOT EXISTS idx_scoring_benchmarks_trade 
  ON scoring_benchmarks(trade_type, metric_name);

-- Insert default benchmark data for common trades
INSERT INTO scoring_benchmarks (trade_type, metric_name, percentile_25, percentile_50, percentile_75, percentile_90, sample_size) VALUES
('Electrician', 'overall_score', 45, 62, 75, 85, 500),
('Plumber', 'overall_score', 42, 60, 73, 83, 480),
('Builder', 'overall_score', 40, 58, 70, 80, 450),
('Carpenter', 'overall_score', 43, 61, 72, 82, 420),
('Painter', 'overall_score', 38, 55, 68, 78, 400),
('Electrician', 'profile_completeness', 15, 20, 23, 25, 500),
('Plumber', 'profile_completeness', 14, 19, 22, 24, 480),
('Builder', 'profile_completeness', 13, 18, 21, 23, 450),
('Electrician', 'review_quality', 10, 14, 17, 19, 500),
('Plumber', 'review_quality', 9, 13, 16, 18, 480),
('Builder', 'review_quality', 8, 12, 15, 17, 450),
('Electrician', 'citation_presence', 8, 12, 16, 18, 500),
('Plumber', 'citation_presence', 7, 11, 15, 17, 480),
('Builder', 'citation_presence', 6, 10, 14, 16, 450)
ON CONFLICT (trade_type, metric_name) DO NOTHING;
