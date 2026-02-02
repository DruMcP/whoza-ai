/*
  # Fix Security and Performance Issues

  1. Performance Improvements
    - Add missing index on background_jobs(user_id)
    - Fix RLS policies to use (select auth.uid()) for better performance
    - Fix function search paths to be immutable
    
  2. Security Improvements
    - Consolidate multiple permissive policies into single efficient policies
    - Ensure proper RLS policy structure based on actual table columns
    
  3. Index Optimization
    - Drop unused indexes that are not critical for performance
    - Keep indexes that support important queries
*/

-- ============================================================================
-- 1. ADD MISSING INDEX FOR FOREIGN KEY
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id 
ON public.background_jobs(user_id);

-- ============================================================================
-- 2. FIX RLS POLICIES - REPLACE auth.uid() WITH (select auth.uid())
-- ============================================================================

-- Fix api_cache policies
DROP POLICY IF EXISTS "Admin can manage API cache" ON public.api_cache;
CREATE POLICY "Admin can manage API cache"
  ON public.api_cache
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

-- Fix visibility_checks policies
-- Note: visibility_checks has business_id but NO user_id column
DROP POLICY IF EXISTS "Admin can insert visibility checks" ON public.visibility_checks;
CREATE POLICY "Admin can insert visibility checks"
  ON public.visibility_checks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admin can view all visibility checks" ON public.visibility_checks;
DROP POLICY IF EXISTS "Users can view own visibility checks" ON public.visibility_checks;

CREATE POLICY "View visibility checks"
  ON public.visibility_checks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM public.business_profiles
      WHERE id = visibility_checks.business_id 
      AND user_id = (select auth.uid())
    )
  );

-- Fix api_usage_log policies
DROP POLICY IF EXISTS "Admin can insert API usage logs" ON public.api_usage_log;
CREATE POLICY "Admin can insert API usage logs"
  ON public.api_usage_log
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admin can view all API usage" ON public.api_usage_log;
DROP POLICY IF EXISTS "Users can view own API usage" ON public.api_usage_log;

CREATE POLICY "View API usage"
  ON public.api_usage_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = (select auth.uid()) 
      AND (u.role = 'admin' OR u.id = api_usage_log.user_id)
    )
    OR
    EXISTS (
      SELECT 1 FROM public.business_profiles bp
      WHERE bp.id = api_usage_log.business_id 
      AND bp.user_id = (select auth.uid())
    )
  );

-- Fix background_jobs policies
DROP POLICY IF EXISTS "Admin can manage all background jobs" ON public.background_jobs;
DROP POLICY IF EXISTS "Users can view own background jobs" ON public.background_jobs;

CREATE POLICY "Admin can manage background jobs"
  ON public.background_jobs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

CREATE POLICY "View own background jobs"
  ON public.background_jobs
  FOR SELECT
  TO authenticated
  USING (
    user_id = (select auth.uid())
    OR
    EXISTS (
      SELECT 1 FROM public.business_profiles bp
      WHERE bp.id = background_jobs.business_id 
      AND bp.user_id = (select auth.uid())
    )
  );

-- ============================================================================
-- 3. FIX FUNCTION SEARCH PATHS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.api_cache
  WHERE expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_next_pending_job()
RETURNS TABLE (
  id UUID,
  job_type TEXT,
  user_id UUID,
  business_id UUID,
  params JSONB,
  priority INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bj.id,
    bj.job_type,
    bj.user_id,
    bj.business_id,
    bj.params,
    bj.priority
  FROM public.background_jobs bj
  WHERE bj.status = 'pending'
    AND bj.scheduled_at <= NOW()
    AND bj.attempts < bj.max_attempts
  ORDER BY bj.priority DESC, bj.scheduled_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
END;
$$;

CREATE OR REPLACE FUNCTION public.calculate_api_costs(
  p_user_id UUID DEFAULT NULL,
  p_start_date TIMESTAMP DEFAULT NULL,
  p_end_date TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (
  provider TEXT,
  total_calls BIGINT,
  total_cost NUMERIC,
  cache_hits BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    log.provider,
    COUNT(*)::BIGINT as total_calls,
    SUM(log.cost_estimate_usd)::NUMERIC as total_cost,
    COUNT(*) FILTER (WHERE log.cache_hit = true)::BIGINT as cache_hits
  FROM public.api_usage_log log
  WHERE 
    (p_user_id IS NULL OR log.user_id = p_user_id)
    AND (p_start_date IS NULL OR log.created_at >= p_start_date)
    AND (p_end_date IS NULL OR log.created_at <= p_end_date)
  GROUP BY log.provider;
END;
$$;

-- ============================================================================
-- 4. DROP UNUSED INDEXES (Conservative approach)
-- ============================================================================

-- Drop indexes on rarely-queried FK columns
DROP INDEX IF EXISTS public.idx_campaign_emails_template_id_fk;
DROP INDEX IF EXISTS public.idx_email_logs_template_id_fk;
DROP INDEX IF EXISTS public.idx_notification_templates_channel_id_fk;
DROP INDEX IF EXISTS public.idx_user_notification_preferences_channel_id_fk;
DROP INDEX IF EXISTS public.idx_stripe_prices_stripe_product_id_fk;
DROP INDEX IF EXISTS public.idx_integration_webhooks_user_integration_id_fk;

-- Drop redundant indexes on api_cache (cache_key unique constraint is sufficient)
DROP INDEX IF EXISTS public.idx_api_cache_key;
DROP INDEX IF EXISTS public.idx_api_cache_provider;

-- Drop redundant task template indexes
DROP INDEX IF EXISTS public.idx_task_templates_ece_pillar;

-- Drop redundant Rex system indexes (composite indexes exist)
DROP INDEX IF EXISTS public.idx_rex_action_history_evaluation_id;
DROP INDEX IF EXISTS public.idx_rex_action_history_recommendation_id;
DROP INDEX IF EXISTS public.idx_rex_confidence_scores_triggered_by_action_id;
DROP INDEX IF EXISTS public.idx_rex_recommendations_evaluation_id;

-- ============================================================================
-- 5. ADD HELPFUL COMMENTS
-- ============================================================================

COMMENT ON POLICY "View visibility checks" ON public.visibility_checks 
IS 'Optimized policy: Admins see all, users see checks for their businesses only';

COMMENT ON POLICY "View API usage" ON public.api_usage_log 
IS 'Optimized policy: Admins see all, users see their own via user_id or business ownership';

COMMENT ON POLICY "View own background jobs" ON public.background_jobs 
IS 'Optimized policy: Users see jobs they created or jobs for their businesses';

COMMENT ON FUNCTION public.cleanup_expired_cache() 
IS 'Removes expired cache entries. Search path immutable for security.';

COMMENT ON FUNCTION public.get_next_pending_job() 
IS 'Returns next pending job with row-level locking. Search path immutable for security.';

COMMENT ON FUNCTION public.calculate_api_costs(UUID, TIMESTAMP, TIMESTAMP) 
IS 'Calculates API costs by provider with date filtering. Search path immutable for security.';

COMMENT ON INDEX public.idx_background_jobs_user_id
IS 'Foreign key index - improves join and filter performance for user-based queries';
