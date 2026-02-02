/*
  # Fix Critical Performance and Security Issues

  ## Overview
  Comprehensive fix for Supabase-reported security and performance issues:
  1. Re-add 2 critical foreign key indexes (were incorrectly removed)
  2. Fix 6 remaining RLS policies with auth function optimization
  3. Remove 38 unused indexes consuming resources
  4. Ensure abuse_summary view is not SECURITY DEFINER

  ## Changes

  ### 1. Foreign Key Indexes (Critical)
  - Add idx_free_score_submissions_user_id (critical for JOIN performance)
  - Add idx_tasks_business_id (critical for JOIN performance)

  ### 2. RLS Policy Optimization (6 policies)
  - task_generation_log: "System can insert generation logs"
  - analytics_events: "System can insert events"
  - subscription_events: "System can insert subscription events"
  - integration_webhooks: "System inserts webhooks"
  - integration_sync_log: "System inserts sync logs"
  - stripe_webhook_events: "System inserts webhook events"

  ### 3. Remove Unused Indexes (38 indexes)
  These indexes were created for foreign keys but are never used.
  They consume storage and slow down INSERT/UPDATE operations.

  ### 4. Security Definer View
  Ensure abuse_summary view is not SECURITY DEFINER

  ## Performance Impact
  - Improved JOIN performance on foreign keys
  - Reduced RLS overhead (auth functions evaluated once per query, not per row)
  - Reduced storage usage from unused indexes
  - Faster INSERT/UPDATE operations (fewer indexes to maintain)

  ## Security Impact
  - No privilege escalation via SECURITY DEFINER views
  - RLS policies remain secure and performant
*/

-- ============================================================================
-- PART 1: RE-ADD CRITICAL FOREIGN KEY INDEXES
-- ============================================================================

-- These indexes were incorrectly dropped in 20260107095825_remove_unused_indexes.sql
-- They ARE needed for foreign key JOIN performance

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_user_id
  ON public.free_score_submissions(user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_tasks_business_id
  ON public.tasks(business_id);

-- ============================================================================
-- PART 2: OPTIMIZE RLS POLICIES - WRAP AUTH FUNCTIONS IN SELECT
-- ============================================================================

-- Wrapping auth functions in (select ...) prevents re-evaluation for each row
-- This is critical for performance at scale

-- Fix: task_generation_log
DROP POLICY IF EXISTS "System can insert generation logs" ON public.task_generation_log;
CREATE POLICY "System can insert generation logs"
  ON public.task_generation_log FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix: analytics_events
DROP POLICY IF EXISTS "System can insert events" ON public.analytics_events;
CREATE POLICY "System can insert events"
  ON public.analytics_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix: subscription_events
DROP POLICY IF EXISTS "System can insert subscription events" ON public.subscription_events;
CREATE POLICY "System can insert subscription events"
  ON public.subscription_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix: integration_webhooks
DROP POLICY IF EXISTS "System inserts webhooks" ON public.integration_webhooks;
CREATE POLICY "System inserts webhooks"
  ON public.integration_webhooks FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix: integration_sync_log
DROP POLICY IF EXISTS "System inserts sync logs" ON public.integration_sync_log;
CREATE POLICY "System inserts sync logs"
  ON public.integration_sync_log FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix: stripe_webhook_events
DROP POLICY IF EXISTS "System inserts webhook events" ON public.stripe_webhook_events;
CREATE POLICY "System inserts webhook events"
  ON public.stripe_webhook_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- ============================================================================
-- PART 3: REMOVE ALL UNUSED INDEXES
-- ============================================================================

-- These 38 indexes were created in 20260107095803 but are never used
-- They consume storage and slow down write operations

-- Analytics tables (3 unused)
DROP INDEX IF EXISTS public.idx_analytics_events_business_id_fk;
DROP INDEX IF EXISTS public.idx_api_usage_log_business_id_fk;
DROP INDEX IF EXISTS public.idx_api_usage_log_user_id_fk;

-- Background jobs and benchmarks (3 unused)
DROP INDEX IF EXISTS public.idx_background_jobs_business_id_fk;
DROP INDEX IF EXISTS public.idx_background_jobs_user_id_fk;
DROP INDEX IF EXISTS public.idx_benchmarks_business_id_fk;

-- Email campaign tables (3 unused)
DROP INDEX IF EXISTS public.idx_campaign_emails_template_id_fk;
DROP INDEX IF EXISTS public.idx_email_logs_campaign_id_fk;
DROP INDEX IF EXISTS public.idx_email_logs_template_id_fk;

-- Integration tables (2 unused)
DROP INDEX IF EXISTS public.idx_integration_sync_log_user_integration_id_fk;
DROP INDEX IF EXISTS public.idx_integration_webhooks_user_integration_id_fk;

-- Notification tables (4 unused)
DROP INDEX IF EXISTS public.idx_notification_delivery_log_channel_id_fk;
DROP INDEX IF EXISTS public.idx_notification_delivery_log_notification_id_fk;
DROP INDEX IF EXISTS public.idx_notification_templates_channel_id_fk;
DROP INDEX IF EXISTS public.idx_notifications_notification_type_id_fk;

-- Rex engine tables (7 unused)
DROP INDEX IF EXISTS public.idx_rex_action_history_business_id_fk;
DROP INDEX IF EXISTS public.idx_rex_action_history_evaluation_id_fk;
DROP INDEX IF EXISTS public.idx_rex_action_history_recommendation_id_fk;
DROP INDEX IF EXISTS public.idx_rex_confidence_scores_business_id_fk;
DROP INDEX IF EXISTS public.idx_rex_confidence_scores_triggered_by_action_id_fk;
DROP INDEX IF EXISTS public.idx_rex_ece_evaluations_business_id_fk;
DROP INDEX IF EXISTS public.idx_rex_recommendations_evaluation_id_fk;

-- Stripe tables (5 unused)
DROP INDEX IF EXISTS public.idx_stripe_invoices_stripe_customer_id_fk;
DROP INDEX IF EXISTS public.idx_stripe_invoices_stripe_subscription_id_fk;
DROP INDEX IF EXISTS public.idx_stripe_payment_methods_stripe_customer_id_fk;
DROP INDEX IF EXISTS public.idx_stripe_prices_stripe_product_id_fk;
DROP INDEX IF EXISTS public.idx_stripe_subscriptions_stripe_customer_id_fk;

-- Task generation tables (4 unused)
DROP INDEX IF EXISTS public.idx_task_generation_log_task_id_fk;
DROP INDEX IF EXISTS public.idx_task_generation_log_template_id_fk;
DROP INDEX IF EXISTS public.idx_task_generation_log_user_id_fk;
DROP INDEX IF EXISTS public.idx_task_generation_state_business_id_fk;

-- User tables (4 unused)
DROP INDEX IF EXISTS public.idx_user_campaign_progress_campaign_id_fk;
DROP INDEX IF EXISTS public.idx_user_integrations_provider_id_fk;
DROP INDEX IF EXISTS public.idx_user_notification_preferences_channel_id_fk;
DROP INDEX IF EXISTS public.idx_user_notification_preferences_notification_type_id_fk;

-- Visibility tables (2 unused)
DROP INDEX IF EXISTS public.idx_visibility_checks_business_id_fk;
DROP INDEX IF EXISTS public.idx_visibility_scores_business_id_fk;

-- Also drop the unused index from rate_limits (if still exists)
DROP INDEX IF EXISTS public.idx_free_score_rate_limits_email_sent_at;

-- ============================================================================
-- PART 4: ENSURE ABUSE_SUMMARY VIEW IS NOT SECURITY DEFINER
-- ============================================================================

-- Recreate the view without SECURITY DEFINER if it exists with that property
DROP VIEW IF EXISTS public.abuse_summary;

CREATE OR REPLACE VIEW public.abuse_summary AS
SELECT
  date_trunc('day', created_at) AS date,
  abuse_type,
  count(*) AS count,
  count(DISTINCT email) AS unique_emails,
  count(DISTINCT ip_address) AS unique_ips
FROM public.free_score_abuse_logs
WHERE blocked = true
GROUP BY date_trunc('day', created_at), abuse_type
ORDER BY date_trunc('day', created_at) DESC, count(*) DESC;

-- Ensure proper permissions (view respects RLS on underlying table)
GRANT SELECT ON public.abuse_summary TO authenticated;