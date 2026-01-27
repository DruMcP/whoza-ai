-- Migration: Add Free Trial Weekly Visibility Scores & Whitelist Access
-- Description: Enables weekly visibility score tracking for trial users and whitelist access to new features
-- Date: 2026-01-27

-- ============================================================================
-- 1. Add whitelist access flag to users table
-- ============================================================================

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS feature_whitelist_access boolean DEFAULT false NOT NULL;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_users_whitelist 
  ON public.users(feature_whitelist_access) 
  WHERE feature_whitelist_access = true;

-- Update existing trial users to have whitelist access
UPDATE public.users
SET feature_whitelist_access = true
WHERE trial_used = true OR trial_ends_at > NOW();

-- ============================================================================
-- 2. Create trial_visibility_scores table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.trial_visibility_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  
  -- Score data (same structure as free_score_submissions)
  overall_score integer NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  website_score integer CHECK (website_score >= 0 AND website_score <= 100),
  google_business_score integer CHECK (google_business_score >= 0 AND google_business_score <= 100),
  social_media_score integer CHECK (social_media_score >= 0 AND social_media_score <= 100),
  reviews_score integer CHECK (reviews_score >= 0 AND reviews_score <= 100),
  content_score integer CHECK (content_score >= 0 AND content_score <= 100),
  
  -- Detailed insights
  insights jsonb,
  recommendations jsonb,
  
  -- Metadata
  score_date timestamptz NOT NULL DEFAULT now(),
  week_number integer NOT NULL CHECK (week_number >= 1 AND week_number <= 12),
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  
  -- Audit
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, week_number)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trial_scores_user_date 
  ON public.trial_visibility_scores(user_id, score_date DESC);

CREATE INDEX IF NOT EXISTS idx_trial_scores_email_pending 
  ON public.trial_visibility_scores(user_id, email_sent) 
  WHERE email_sent = false;

CREATE INDEX IF NOT EXISTS idx_trial_scores_week 
  ON public.trial_visibility_scores(user_id, week_number);

-- ============================================================================
-- 3. Enable RLS on trial_visibility_scores
-- ============================================================================

ALTER TABLE public.trial_visibility_scores ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists, then create
DROP POLICY IF EXISTS "Users can view own trial scores" ON public.trial_visibility_scores;
CREATE POLICY "Users can view own trial scores"
  ON public.trial_visibility_scores
  FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. Create function to generate trial visibility score record
-- ============================================================================

CREATE OR REPLACE FUNCTION public.generate_trial_visibility_score(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_record record;
  v_week_number integer;
  v_score_record record;
  v_result json;
BEGIN
  -- Get user details
  SELECT 
    business_name,
    trial_started_at,
    trial_ends_at,
    trial_used
  INTO v_user_record
  FROM users
  WHERE id = p_user_id;
  
  -- Check if user exists
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  -- Check if user has active trial
  IF NOT v_user_record.trial_used OR v_user_record.trial_ends_at < NOW() THEN
    RETURN json_build_object(
      'success', false,
      'error', 'User does not have an active trial'
    );
  END IF;
  
  -- Calculate week number (1-12)
  v_week_number := CEIL(EXTRACT(EPOCH FROM (NOW() - v_user_record.trial_started_at)) / (7 * 24 * 60 * 60))::integer;
  
  IF v_week_number < 1 THEN
    v_week_number := 1;
  END IF;
  
  IF v_week_number > 12 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Trial period exceeded (week ' || v_week_number || ')'
    );
  END IF;
  
  -- Check if score already exists for this week
  SELECT * INTO v_score_record
  FROM trial_visibility_scores
  WHERE user_id = p_user_id AND week_number = v_week_number;
  
  IF FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Score already generated for this week',
      'existing_score', v_score_record.overall_score,
      'week_number', v_week_number
    );
  END IF;
  
  -- Create placeholder record (actual score will be calculated by Edge Function)
  INSERT INTO trial_visibility_scores (
    user_id,
    business_name,
    overall_score,
    week_number,
    score_date
  ) VALUES (
    p_user_id,
    v_user_record.business_name,
    0, -- Placeholder, will be updated by Edge Function
    v_week_number,
    NOW()
  )
  RETURNING * INTO v_score_record;
  
  RETURN json_build_object(
    'success', true,
    'score_id', v_score_record.id,
    'week_number', v_week_number,
    'message', 'Score record created, awaiting calculation'
  );
END;
$$;

-- ============================================================================
-- 5. Create function to get trial users needing weekly score
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_trial_users_needing_score()
RETURNS TABLE (
  user_id uuid,
  email text,
  business_name text,
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  current_week integer,
  days_since_last_score integer,
  last_score integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH user_scores AS (
    SELECT 
      u.id,
      u.email,
      u.business_name,
      u.trial_started_at,
      u.trial_ends_at,
      CEIL(EXTRACT(EPOCH FROM (NOW() - u.trial_started_at)) / (7 * 24 * 60 * 60))::integer as calc_week,
      MAX(tvs.score_date) as last_score_date,
      MAX(tvs.overall_score) as last_overall_score
    FROM users u
    LEFT JOIN trial_visibility_scores tvs ON tvs.user_id = u.id
    WHERE 
      u.trial_used = true
      AND u.trial_ends_at > NOW()
    GROUP BY u.id, u.email, u.business_name, u.trial_started_at, u.trial_ends_at
  )
  SELECT 
    us.id as user_id,
    us.email,
    us.business_name,
    us.trial_started_at,
    us.trial_ends_at,
    us.calc_week as current_week,
    COALESCE(
      EXTRACT(DAY FROM (NOW() - us.last_score_date))::integer,
      999
    ) as days_since_last_score,
    COALESCE(us.last_overall_score, 0) as last_score
  FROM user_scores us
  WHERE 
    us.calc_week <= 12
    AND (
      -- No scores yet, or last score was 7+ days ago
      us.last_score_date IS NULL 
      OR us.last_score_date < NOW() - INTERVAL '7 days'
    );
END;
$$;

-- ============================================================================
-- 6. Create function to get trial score history for a user
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_trial_score_history(p_user_id uuid)
RETURNS TABLE (
  week_number integer,
  overall_score integer,
  website_score integer,
  google_business_score integer,
  social_media_score integer,
  reviews_score integer,
  content_score integer,
  score_date timestamptz,
  insights jsonb,
  recommendations jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user has access to view scores
  IF auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  RETURN QUERY
  SELECT 
    tvs.week_number,
    tvs.overall_score,
    tvs.website_score,
    tvs.google_business_score,
    tvs.social_media_score,
    tvs.reviews_score,
    tvs.content_score,
    tvs.score_date,
    tvs.insights,
    tvs.recommendations
  FROM trial_visibility_scores tvs
  WHERE tvs.user_id = p_user_id
  ORDER BY tvs.week_number ASC;
END;
$$;

-- ============================================================================
-- 7. Create function to update trial score (called by Edge Function)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_trial_visibility_score(
  p_score_id uuid,
  p_overall_score integer,
  p_website_score integer DEFAULT NULL,
  p_google_business_score integer DEFAULT NULL,
  p_social_media_score integer DEFAULT NULL,
  p_reviews_score integer DEFAULT NULL,
  p_content_score integer DEFAULT NULL,
  p_insights jsonb DEFAULT NULL,
  p_recommendations jsonb DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated_record record;
BEGIN
  -- Update the score record
  UPDATE trial_visibility_scores
  SET 
    overall_score = p_overall_score,
    website_score = p_website_score,
    google_business_score = p_google_business_score,
    social_media_score = p_social_media_score,
    reviews_score = p_reviews_score,
    content_score = p_content_score,
    insights = p_insights,
    recommendations = p_recommendations,
    updated_at = NOW()
  WHERE id = p_score_id
  RETURNING * INTO v_updated_record;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Score record not found'
    );
  END IF;
  
  RETURN json_build_object(
    'success', true,
    'score_id', v_updated_record.id,
    'overall_score', v_updated_record.overall_score,
    'week_number', v_updated_record.week_number
  );
END;
$$;

-- ============================================================================
-- 8. Create function to mark trial score email as sent
-- ============================================================================

CREATE OR REPLACE FUNCTION public.mark_trial_score_email_sent(p_score_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE trial_visibility_scores
  SET 
    email_sent = true,
    email_sent_at = NOW(),
    updated_at = NOW()
  WHERE id = p_score_id;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Score record not found'
    );
  END IF;
  
  RETURN json_build_object(
    'success', true,
    'score_id', p_score_id,
    'email_sent_at', NOW()
  );
END;
$$;

-- ============================================================================
-- 9. Add comments for documentation
-- ============================================================================

COMMENT ON COLUMN public.users.feature_whitelist_access IS 'Grants early access to new features (Chloe, Simon, etc.) - automatically enabled for trial users';

COMMENT ON TABLE public.trial_visibility_scores IS 'Weekly visibility scores for Free Trial users - tracks progress over 12-week trial period';
COMMENT ON COLUMN public.trial_visibility_scores.week_number IS 'Week of trial period (1-12 for 3-month trial)';
COMMENT ON COLUMN public.trial_visibility_scores.insights IS 'JSON object containing detailed insights about the score';
COMMENT ON COLUMN public.trial_visibility_scores.recommendations IS 'JSON array of actionable recommendations';

COMMENT ON FUNCTION public.generate_trial_visibility_score(uuid) IS 'Creates a new weekly visibility score record for a trial user';
COMMENT ON FUNCTION public.get_trial_users_needing_score() IS 'Returns trial users who need a weekly visibility score (no score yet or 7+ days since last)';
COMMENT ON FUNCTION public.get_trial_score_history(uuid) IS 'Returns complete score history for a trial user';
COMMENT ON FUNCTION public.update_trial_visibility_score(uuid, integer, integer, integer, integer, integer, integer, jsonb, jsonb) IS 'Updates a trial score record with calculated values (called by Edge Function)';
COMMENT ON FUNCTION public.mark_trial_score_email_sent(uuid) IS 'Marks a trial score email as sent';
