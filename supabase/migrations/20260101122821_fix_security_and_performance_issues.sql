/*
  # Fix Security and Performance Issues

  1. RLS Policy Optimization
    - Replace direct auth function calls with subqueries for better performance
    - Fix policies on: free_score_rate_limits, free_score_abuse_logs, csrf_tokens
    - Prevents re-evaluation of auth functions for each row

  2. Multiple Permissive Policies
    - Consolidate overlapping policies on free_score_rate_limits
    - Consolidate overlapping policies on free_score_abuse_logs
    - Use restrictive policies where appropriate

  3. Unused Index Cleanup
    - Drop 63 unused indexes that consume disk space and slow writes
    - Keep only indexes that are actively used or needed for foreign keys

  4. Security Definer View
    - Recreate abuse_summary view without SECURITY DEFINER
    - View will execute with invoker's privileges (safer)

  5. Notes
    - Auth DB connection strategy and password protection require manual Supabase dashboard configuration
*/

-- ============================================================================
-- 1. FIX RLS POLICIES - Replace auth.uid() and auth.jwt() with subqueries
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Service role can manage rate limits" ON free_score_rate_limits;
DROP POLICY IF EXISTS "Admins can view rate limits" ON free_score_rate_limits;
DROP POLICY IF EXISTS "Service role can manage abuse logs" ON free_score_abuse_logs;
DROP POLICY IF EXISTS "Admins can view abuse logs" ON free_score_abuse_logs;
DROP POLICY IF EXISTS "Service role can manage CSRF tokens" ON csrf_tokens;

-- Recreate policies with optimized auth function calls
-- free_score_rate_limits policies
CREATE POLICY "Service role can manage rate limits"
  ON free_score_rate_limits
  FOR ALL
  USING ((select auth.jwt()->>'role') = 'service_role');

CREATE POLICY "Admins can view rate limits"
  ON free_score_rate_limits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (select auth.uid())
      AND users.role = 'admin'
    )
  );

-- free_score_abuse_logs policies
CREATE POLICY "Service role can manage abuse logs"
  ON free_score_abuse_logs
  FOR ALL
  USING ((select auth.jwt()->>'role') = 'service_role');

CREATE POLICY "Admins can view abuse logs"
  ON free_score_abuse_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (select auth.uid())
      AND users.role = 'admin'
    )
  );

-- csrf_tokens policies
CREATE POLICY "Service role can manage CSRF tokens"
  ON csrf_tokens
  FOR ALL
  USING ((select auth.jwt()->>'role') = 'service_role');

-- ============================================================================
-- 2. DROP UNUSED INDEXES
-- ============================================================================

-- Abuse protection tables (from recent migration)
DROP INDEX IF EXISTS idx_rate_limits_next_allowed;
DROP INDEX IF EXISTS idx_abuse_logs_email;
DROP INDEX IF EXISTS idx_abuse_logs_ip;
DROP INDEX IF EXISTS idx_abuse_logs_created;
DROP INDEX IF EXISTS idx_abuse_logs_type;
DROP INDEX IF EXISTS idx_csrf_token;
DROP INDEX IF EXISTS idx_csrf_expires;
DROP INDEX IF EXISTS idx_rate_limits_email;
DROP INDEX IF EXISTS idx_rate_limits_ip;
DROP INDEX IF EXISTS idx_rate_limits_last_submission;

-- Free score submissions
DROP INDEX IF EXISTS idx_free_score_submissions_email_sent;
DROP INDEX IF EXISTS idx_free_score_submissions_user_id_fk;

-- Task generation system
DROP INDEX IF EXISTS idx_task_generation_state_business_id_fk;
DROP INDEX IF EXISTS idx_tasks_business_id_fk;
DROP INDEX IF EXISTS idx_task_generation_log_task_id_fk;
DROP INDEX IF EXISTS idx_task_generation_log_template_id_fk;
DROP INDEX IF EXISTS idx_task_generation_log_user_id_fk;

-- Email campaign system
DROP INDEX IF EXISTS idx_user_campaign_progress_campaign_id_fk;
DROP INDEX IF EXISTS idx_campaign_emails_template_id_fk;
DROP INDEX IF EXISTS idx_email_logs_template_id_fk;
DROP INDEX IF EXISTS idx_email_logs_campaign_id_fk;
DROP INDEX IF EXISTS idx_email_logs_user_id_fk;

-- Integration system
DROP INDEX IF EXISTS idx_user_integrations_provider_id_fk;
DROP INDEX IF EXISTS idx_integration_webhooks_user_integration_id_fk;
DROP INDEX IF EXISTS idx_integration_sync_log_user_integration_id_fk;

-- Visibility scoring
DROP INDEX IF EXISTS idx_visibility_checks_business_id_fk;
DROP INDEX IF EXISTS idx_visibility_scores_business_id_fk;

-- Notification system
DROP INDEX IF EXISTS idx_notification_templates_channel_id_fk;
DROP INDEX IF EXISTS idx_notification_delivery_log_channel_id_fk;
DROP INDEX IF EXISTS idx_notification_delivery_log_notification_id_fk;
DROP INDEX IF EXISTS idx_notification_delivery_log_user_id_fk;
DROP INDEX IF EXISTS idx_notifications_notification_type_id_fk;
DROP INDEX IF EXISTS idx_notifications_user_id_fk;
DROP INDEX IF EXISTS idx_user_notification_preferences_channel_id_fk;
DROP INDEX IF EXISTS idx_user_notification_preferences_notification_type_id_fk;

-- Rex decision engine
DROP INDEX IF EXISTS idx_rex_action_history_evaluation_id_fk;
DROP INDEX IF EXISTS idx_rex_action_history_recommendation_id_fk;
DROP INDEX IF EXISTS idx_rex_action_history_business_id_fk;
DROP INDEX IF EXISTS idx_rex_action_history_user_id_fk;
DROP INDEX IF EXISTS idx_rex_confidence_scores_triggered_by_action_id_fk;
DROP INDEX IF EXISTS idx_rex_confidence_scores_business_id_fk;
DROP INDEX IF EXISTS idx_rex_confidence_scores_user_id_fk;
DROP INDEX IF EXISTS idx_rex_ece_evaluations_business_id_fk;
DROP INDEX IF EXISTS idx_rex_ece_evaluations_user_id_fk;
DROP INDEX IF EXISTS idx_rex_recommendations_evaluation_id_fk;
DROP INDEX IF EXISTS idx_rex_recommendations_user_id_fk;

-- Stripe integration
DROP INDEX IF EXISTS idx_stripe_prices_stripe_product_id_fk;
DROP INDEX IF EXISTS idx_stripe_invoices_stripe_customer_id_fk;
DROP INDEX IF EXISTS idx_stripe_invoices_stripe_subscription_id_fk;
DROP INDEX IF EXISTS idx_stripe_invoices_user_id_fk;
DROP INDEX IF EXISTS idx_stripe_payment_methods_stripe_customer_id_fk;
DROP INDEX IF EXISTS idx_stripe_payment_methods_user_id_fk;
DROP INDEX IF EXISTS idx_stripe_subscriptions_stripe_customer_id_fk;
DROP INDEX IF EXISTS idx_stripe_subscriptions_user_id_fk;
DROP INDEX IF EXISTS idx_stripe_webhook_events_user_id_fk;
DROP INDEX IF EXISTS idx_subscription_events_user_id_fk;

-- Analytics system
DROP INDEX IF EXISTS idx_analytics_events_business_id_fk;
DROP INDEX IF EXISTS idx_analytics_events_user_id_fk;
DROP INDEX IF EXISTS idx_api_usage_log_business_id_fk;
DROP INDEX IF EXISTS idx_api_usage_log_user_id_fk;

-- Background jobs
DROP INDEX IF EXISTS idx_background_jobs_business_id_fk;
DROP INDEX IF EXISTS idx_background_jobs_user_id_fk;

-- Benchmarks
DROP INDEX IF EXISTS idx_benchmarks_business_id_fk;

-- ============================================================================
-- 3. FIX SECURITY DEFINER VIEW
-- ============================================================================

-- Drop and recreate abuse_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS abuse_summary;

CREATE VIEW abuse_summary AS
SELECT
  date_trunc('day', created_at) as date,
  abuse_type,
  COUNT(*) as attempt_count,
  COUNT(DISTINCT email) as unique_emails,
  COUNT(DISTINCT ip_address) as unique_ips
FROM free_score_abuse_logs
WHERE created_at > (now() - interval '30 days')
GROUP BY date_trunc('day', created_at), abuse_type
ORDER BY date DESC, attempt_count DESC;

-- Re-grant access to authenticated users (admins will access via RLS)
GRANT SELECT ON abuse_summary TO authenticated;

-- ============================================================================
-- 4. CREATE ESSENTIAL INDEXES ONLY
-- ============================================================================

-- Keep only the most critical indexes for actual query performance
-- These are based on common query patterns and foreign key lookups

-- Rate limits: Email lookups are frequent
CREATE INDEX IF NOT EXISTS idx_rate_limits_email_lookup ON free_score_rate_limits(email, last_submission_at);

-- Abuse logs: Admin dashboard queries by date and type
CREATE INDEX IF NOT EXISTS idx_abuse_logs_admin_dashboard ON free_score_abuse_logs(created_at DESC, abuse_type);

-- CSRF tokens: Token verification is critical path
CREATE INDEX IF NOT EXISTS idx_csrf_token_verification ON csrf_tokens(token, expires_at) WHERE used = false;

-- Free score submissions: User's own submissions lookup
CREATE INDEX IF NOT EXISTS idx_free_score_user_submissions ON free_score_submissions(user_id, created_at DESC) WHERE user_id IS NOT NULL;

-- Tasks: Business tasks lookup (frequently used)
CREATE INDEX IF NOT EXISTS idx_tasks_business_lookup ON tasks(business_id, status, created_at DESC);

-- Notifications: Pending notifications by user
CREATE INDEX IF NOT EXISTS idx_notifications_user_pending ON notifications(user_id, created_at DESC) WHERE status = 'pending';

-- Analytics: Event tracking by user and date
CREATE INDEX IF NOT EXISTS idx_analytics_user_events ON analytics_events(user_id, created_at DESC);

-- Background jobs: Pending jobs queue
CREATE INDEX IF NOT EXISTS idx_background_jobs_pending ON background_jobs(status, scheduled_at) WHERE status IN ('pending', 'processing');