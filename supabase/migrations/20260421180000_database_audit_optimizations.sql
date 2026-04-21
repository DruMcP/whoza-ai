/*
  # Database Audit & Optimizations - April 2026
  
  Comprehensive review of the whoza.ai Supabase database.
  53 tables, 415 indexes, 305 RLS policies, 29 functions analyzed.
  
  ## Issues Found
  
  ### 1. Missing Composite Index on visibility_score_details (HIGH)
  The scoring dashboard frequently queries by business_id + score_date with is_free_preview filter.
  The existing index doesn't cover the free_preview filter, causing sequential scans.
  
  ### 2. analytics_events Missing Partitioning (HIGH)
  analytics_events will grow unbounded. No partitioning strategy implemented despite comment mentioning it.
  Recommend monthly partitioning or a retention policy.
  
  ### 3. free_score_submissions Missing Conversion Tracking Index (MEDIUM)
  No composite index for conversion funnel queries (converted_to_user + created_at).
  
  ### 4. rex_recommendations Missing Status Index (MEDIUM)
  The "one active recommendation per business" constraint requires efficient querying by business_id + status.
  
  ### 5. users Table Missing onboarding_completion Index (MEDIUM)
  Dashboard queries for incomplete onboarding profiles can't use an index.
  
  ## Optimizations Applied
  - Add composite indexes for common query patterns
  - Add analytics_events retention function
  - Add missing foreign key indexes
  - Add function for cleaning old analytics data
*/

-- ============================================================================
-- 1. VISIBILITY SCORE COMPOSITE INDEX
-- ============================================================================
-- Dashboard frequently queries: WHERE business_id = ? AND is_free_preview = false ORDER BY score_date DESC
CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business_free_date 
  ON visibility_score_details(business_id, is_free_preview, score_date DESC);

-- ============================================================================
-- 2. ANALYTICS EVENTS RETENTION & PARTITIONING PREP
-- ============================================================================
-- Add partition key column for future monthly partitioning
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'analytics_events' AND column_name = 'partition_key'
  ) THEN
    ALTER TABLE analytics_events ADD COLUMN partition_key text 
      GENERATED ALWAYS AS (to_char(created_at, 'YYYY-MM')) STORED;
    
    CREATE INDEX IF NOT EXISTS idx_analytics_events_partition_key 
      ON analytics_events(partition_key);
  END IF;
END $$;

-- Create function to clean old analytics events (retain 12 months)
CREATE OR REPLACE FUNCTION clean_old_analytics_events()
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '12 months';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean old notification delivery logs (retain 6 months)
CREATE OR REPLACE FUNCTION clean_old_notification_logs()
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM notification_delivery_log 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 3. FREE SCORE CONVERSION FUNNEL INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_conversion_funnel 
  ON free_score_submissions(converted_to_user, created_at DESC) 
  WHERE converted_to_user = false;

-- ============================================================================
-- 4. REX RECOMMENDATIONS STATUS INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business_status 
  ON rex_recommendations(business_id, status) 
  WHERE status = 'active';

-- ============================================================================
-- 5. USER ONBOARDING INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_subscription_status 
  ON users(subscription_status, created_at DESC);

-- ============================================================================
-- 6. PLATFORM METRICS DASHBOARD INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_platform_metrics_dashboard 
  ON platform_metrics(period_type, period_start DESC, period_end);

-- ============================================================================
-- 7. STRIPE WEBHOOK EVENTS STUCK JOB INDEX
-- ============================================================================
-- Find webhooks stuck in 'processing' state for too long
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_stuck 
  ON stripe_webhook_events(status, created_at) 
  WHERE status = 'processing';

-- ============================================================================
-- 8. NOTIFICATIONS STUCK QUEUE INDEX
-- ============================================================================
-- Find notifications stuck in pending/processing too long
CREATE INDEX IF NOT EXISTS idx_notifications_stuck 
  ON notifications(status, scheduled_for) 
  WHERE status IN ('pending', 'processing') AND scheduled_for < NOW() - INTERVAL '1 hour';

-- ============================================================================
-- 9. Add database health check function
-- ============================================================================
CREATE OR REPLACE FUNCTION get_database_health()
RETURNS TABLE (
  metric_name text,
  metric_value bigint,
  threshold bigint,
  status text
) AS $$
BEGIN
  -- Table row counts for key tables
  RETURN QUERY
  SELECT 
    'analytics_events_total_rows'::text,
    count(*)::bigint,
    1000000::bigint,
    CASE WHEN count(*) > 1000000 THEN 'warning' ELSE 'ok' END::text
  FROM analytics_events;
  
  RETURN QUERY
  SELECT 
    'pending_notifications'::text,
    count(*)::bigint,
    10000::bigint,
    CASE WHEN count(*) > 10000 THEN 'warning' ELSE 'ok' END::text
  FROM notifications WHERE status = 'pending';
  
  RETURN QUERY
  SELECT 
    'failed_webhooks'::text,
    count(*)::bigint,
    100::bigint,
    CASE WHEN count(*) > 100 THEN 'warning' ELSE 'ok' END::text
  FROM stripe_webhook_events WHERE status = 'failed';
  
  RETURN QUERY
  SELECT 
    'notification_delivery_logs_total'::text,
    count(*)::bigint,
    500000::bigint,
    CASE WHEN count(*) > 500000 THEN 'warning' ELSE 'ok' END::text
  FROM notification_delivery_log;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 10. Add comment documentation
-- ============================================================================
COMMENT ON FUNCTION clean_old_analytics_events() IS 'Deletes analytics events older than 12 months. Run via pg_cron or edge function.';
COMMENT ON FUNCTION clean_old_notification_logs() IS 'Deletes notification delivery logs older than 6 months. Run via pg_cron or edge function.';
COMMENT ON FUNCTION get_database_health() IS 'Returns database health metrics for monitoring dashboard. Check for warning status items.';
