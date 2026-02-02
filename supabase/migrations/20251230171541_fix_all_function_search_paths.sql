/*
  # Fix All Function Search Path Issues

  ## Problem
  Multiple function signatures exist with incomplete or missing search_path settings.
  Functions with SECURITY DEFINER but without locked search_path are vulnerable to
  search path injection attacks (CWE-426).

  ## Functions Fixed
  
  ### calculate_api_costs
  - Fixed 2 additional signatures that were missing proper search_path
  - All 3 function signatures now have `SET search_path = public, pg_temp`

  ### get_next_pending_job
  - Fixed parameterless signature to include pg_temp in search_path
  - Both function signatures now have `SET search_path = public, pg_temp`

  ## Security Impact
  - ✅ All SECURITY DEFINER functions now have locked search_path
  - ✅ Protected against search path injection attacks
  - ✅ Prevents privilege escalation via malicious schemas
*/

-- ============================================================================
-- Fix calculate_api_costs Functions
-- ============================================================================

-- Drop all existing versions
DROP FUNCTION IF EXISTS calculate_api_costs(timestamptz, timestamptz);
DROP FUNCTION IF EXISTS calculate_api_costs(uuid, timestamp, timestamp);

-- Recreate the 2-parameter version with secure search_path
CREATE FUNCTION calculate_api_costs(
  p_start_date timestamptz DEFAULT (now() - interval '30 days'),
  p_end_date timestamptz DEFAULT now()
)
RETURNS TABLE (
  provider text,
  total_cost numeric,
  request_count bigint,
  cache_hit_count bigint,
  cache_hit_rate numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT
    api_usage_log.provider,
    ROUND(SUM(cost_estimate_usd)::numeric, 4) AS total_cost,
    COUNT(*)::bigint AS request_count,
    COUNT(*) FILTER (WHERE cache_hit = true)::bigint AS cache_hit_count,
    CASE 
      WHEN COUNT(*) > 0 THEN
        ROUND((COUNT(*) FILTER (WHERE cache_hit = true)::numeric / COUNT(*)::numeric) * 100, 2)
      ELSE 0
    END AS cache_hit_rate
  FROM api_usage_log
  WHERE
    created_at >= p_start_date
    AND created_at <= p_end_date
  GROUP BY api_usage_log.provider
  ORDER BY total_cost DESC;
END;
$$;

-- Recreate the user_id first version with secure search_path
CREATE FUNCTION calculate_api_costs(
  p_user_id uuid DEFAULT NULL,
  p_start_date timestamp DEFAULT NULL,
  p_end_date timestamp DEFAULT NULL
)
RETURNS TABLE (
  provider text,
  total_cost numeric,
  request_count bigint,
  cache_hit_count bigint,
  cache_hit_rate numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT
    api_usage_log.provider,
    ROUND(SUM(cost_estimate_usd)::numeric, 4) AS total_cost,
    COUNT(*)::bigint AS request_count,
    COUNT(*) FILTER (WHERE cache_hit = true)::bigint AS cache_hit_count,
    CASE 
      WHEN COUNT(*) > 0 THEN
        ROUND((COUNT(*) FILTER (WHERE cache_hit = true)::numeric / COUNT(*)::numeric) * 100, 2)
      ELSE 0
    END AS cache_hit_rate
  FROM api_usage_log
  WHERE
    (p_start_date IS NULL OR created_at >= p_start_date)
    AND (p_end_date IS NULL OR created_at <= p_end_date)
    AND (p_user_id IS NULL OR user_id = p_user_id)
  GROUP BY api_usage_log.provider
  ORDER BY total_cost DESC;
END;
$$;

-- ============================================================================
-- Fix get_next_pending_job Functions
-- ============================================================================

-- Drop the parameterless version
DROP FUNCTION IF EXISTS get_next_pending_job();

-- Recreate the parameterless version with secure search_path
CREATE FUNCTION get_next_pending_job()
RETURNS TABLE (
  job_id uuid,
  job_type text,
  payload jsonb,
  scheduled_for timestamptz,
  priority integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  WITH next_job AS (
    SELECT 
      id,
      type,
      payload,
      scheduled_for,
      priority
    FROM background_jobs
    WHERE 
      status = 'pending'
      AND scheduled_for <= NOW()
      AND (max_attempts IS NULL OR attempts < max_attempts)
    ORDER BY 
      priority DESC,
      scheduled_for ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  UPDATE background_jobs
  SET 
    status = 'processing',
    started_at = NOW(),
    attempts = attempts + 1,
    updated_at = NOW()
  FROM next_job
  WHERE background_jobs.id = next_job.id
  RETURNING 
    background_jobs.id AS job_id,
    background_jobs.type AS job_type,
    background_jobs.payload,
    background_jobs.scheduled_for,
    background_jobs.priority;
END;
$$;

-- ============================================================================
-- Add Documentation Comments
-- ============================================================================

COMMENT ON FUNCTION calculate_api_costs(timestamptz, timestamptz) IS 
  'Calculates API usage costs for a date range. Protected against search_path injection.';

COMMENT ON FUNCTION calculate_api_costs(uuid, timestamp, timestamp) IS 
  'Calculates API usage costs for a specific user and date range. Protected against search_path injection.';

COMMENT ON FUNCTION get_next_pending_job() IS 
  'Retrieves and locks the next pending background job (all types). Protected against search_path injection.';

COMMENT ON FUNCTION get_next_pending_job(text) IS 
  'Retrieves and locks the next pending background job by type. Protected against search_path injection.';
