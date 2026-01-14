/*
  # Comprehensive Security and Performance Fix

  ## Overview
  Fixes all identified security and performance issues including unindexed foreign keys,
  RLS policy optimization, unused index cleanup, and policy conflicts.

  ## Changes Made

  ### 1. Missing Foreign Key Indexes (47 indexes added)
  Adding indexes for all foreign keys to improve query performance:
  - analytics_events: business_id
  - api_usage_log: business_id, user_id
  - background_jobs: business_id, user_id
  - benchmarks: business_id
  - campaign_emails: template_id
  - email_logs: campaign_id, template_id, user_id
  - integration_sync_log: user_integration_id
  - integration_webhooks: user_integration_id
  - notification_delivery_log: channel_id, notification_id, user_id
  - notification_templates: channel_id
  - notifications: notification_type_id
  - rex_action_history: business_id, evaluation_id, recommendation_id, user_id
  - rex_confidence_scores: business_id, triggered_by_action_id, user_id
  - rex_ece_evaluations: business_id, user_id
  - rex_recommendations: evaluation_id, user_id
  - stripe_invoices: stripe_customer_id, stripe_subscription_id, user_id
  - stripe_payment_methods: stripe_customer_id, user_id
  - stripe_prices: stripe_product_id
  - stripe_subscriptions: stripe_customer_id, user_id
  - stripe_webhook_events: user_id
  - subscription_events: user_id
  - task_generation_log: task_id, template_id, user_id
  - task_generation_state: business_id
  - user_campaign_progress: campaign_id
  - user_integrations: provider_id
  - user_notification_preferences: channel_id, notification_type_id
  - visibility_checks: business_id
  - visibility_scores: business_id

  ### 2. RLS Policy Optimization (3 policies fixed)
  Fixed auth function calls to use subqueries for better performance:
  - free_score_rate_limits: Service role policy
  - free_score_abuse_logs: Service role policy
  - csrf_tokens: Service role policy

  ### 3. Policy Conflicts Resolution (2 tables fixed)
  Fixed multiple permissive policies by making service role policies restrictive:
  - free_score_abuse_logs: Made service role policy restrictive
  - free_score_rate_limits: Made service role policy restrictive

  ### 4. Unused Index Cleanup (6 indexes removed)
  Removed indexes that are not being used:
  - idx_abuse_logs_admin_dashboard
  - idx_free_score_user_submissions
  - idx_tasks_business_lookup
  - idx_notifications_user_pending
  - idx_analytics_user_events
  - idx_background_jobs_pending

  ### 5. Security Definer View
  Modified abuse_summary view to remove SECURITY DEFINER property

  ## Notes
  - All indexes use IF NOT EXISTS to prevent errors on re-run
  - Foreign key indexes improve JOIN performance and enforce referential integrity faster
  - RLS policy optimization reduces per-row function evaluation overhead
  - Unused indexes removed to reduce write overhead and storage
  - Policy conflicts resolved to ensure proper access control
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- analytics_events
CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id 
ON public.analytics_events(business_id);

-- api_usage_log
CREATE INDEX IF NOT EXISTS idx_api_usage_log_business_id 
ON public.api_usage_log(business_id);

CREATE INDEX IF NOT EXISTS idx_api_usage_log_user_id 
ON public.api_usage_log(user_id);

-- background_jobs
CREATE INDEX IF NOT EXISTS idx_background_jobs_business_id 
ON public.background_jobs(business_id);

CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id 
ON public.background_jobs(user_id);

-- benchmarks
CREATE INDEX IF NOT EXISTS idx_benchmarks_business_id 
ON public.benchmarks(business_id);

-- campaign_emails
CREATE INDEX IF NOT EXISTS idx_campaign_emails_template_id 
ON public.campaign_emails(template_id);

-- email_logs
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id 
ON public.email_logs(campaign_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_template_id 
ON public.email_logs(template_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_user_id 
ON public.email_logs(user_id);

-- integration_sync_log
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration_id 
ON public.integration_sync_log(user_integration_id);

-- integration_webhooks
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration_id 
ON public.integration_webhooks(user_integration_id);

-- notification_delivery_log
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id 
ON public.notification_delivery_log(channel_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification_id 
ON public.notification_delivery_log(notification_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_user_id 
ON public.notification_delivery_log(user_id);

-- notification_templates
CREATE INDEX IF NOT EXISTS idx_notification_templates_channel_id 
ON public.notification_templates(channel_id);

-- notifications
CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id 
ON public.notifications(notification_type_id);

-- rex_action_history
CREATE INDEX IF NOT EXISTS idx_rex_action_history_business_id 
ON public.rex_action_history(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_evaluation_id 
ON public.rex_action_history(evaluation_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_recommendation_id 
ON public.rex_action_history(recommendation_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_user_id 
ON public.rex_action_history(user_id);

-- rex_confidence_scores
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_business_id 
ON public.rex_confidence_scores(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_triggered_by_action_id 
ON public.rex_confidence_scores(triggered_by_action_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_user_id 
ON public.rex_confidence_scores(user_id);

-- rex_ece_evaluations
CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business_id 
ON public.rex_ece_evaluations(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_user_id 
ON public.rex_ece_evaluations(user_id);

-- rex_recommendations
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_evaluation_id 
ON public.rex_recommendations(evaluation_id);

CREATE INDEX IF NOT EXISTS idx_rex_recommendations_user_id 
ON public.rex_recommendations(user_id);

-- stripe_invoices
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_customer_id 
ON public.stripe_invoices(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_subscription_id 
ON public.stripe_invoices(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_user_id 
ON public.stripe_invoices(user_id);

-- stripe_payment_methods
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_stripe_customer_id 
ON public.stripe_payment_methods(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_user_id 
ON public.stripe_payment_methods(user_id);

-- stripe_prices
CREATE INDEX IF NOT EXISTS idx_stripe_prices_stripe_product_id 
ON public.stripe_prices(stripe_product_id);

-- stripe_subscriptions
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id 
ON public.stripe_subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id 
ON public.stripe_subscriptions(user_id);

-- stripe_webhook_events
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_user_id 
ON public.stripe_webhook_events(user_id);

-- subscription_events
CREATE INDEX IF NOT EXISTS idx_subscription_events_user_id 
ON public.subscription_events(user_id);

-- task_generation_log
CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id 
ON public.task_generation_log(task_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id 
ON public.task_generation_log(template_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user_id 
ON public.task_generation_log(user_id);

-- task_generation_state
CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id 
ON public.task_generation_state(business_id);

-- user_campaign_progress
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id 
ON public.user_campaign_progress(campaign_id);

-- user_integrations
CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id 
ON public.user_integrations(provider_id);

-- user_notification_preferences
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_channel_id 
ON public.user_notification_preferences(channel_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id 
ON public.user_notification_preferences(notification_type_id);

-- visibility_checks
CREATE INDEX IF NOT EXISTS idx_visibility_checks_business_id 
ON public.visibility_checks(business_id);

-- visibility_scores
CREATE INDEX IF NOT EXISTS idx_visibility_scores_business_id 
ON public.visibility_scores(business_id);

-- =====================================================
-- 2. FIX RLS POLICY OPTIMIZATION
-- =====================================================

-- Fix free_score_rate_limits policy
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.free_score_rate_limits;
CREATE POLICY "Service role can manage rate limits"
  ON public.free_score_rate_limits
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING ((SELECT auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((SELECT auth.jwt()->>'role') = 'service_role');

-- Fix free_score_abuse_logs policy
DROP POLICY IF EXISTS "Service role can manage abuse logs" ON public.free_score_abuse_logs;
CREATE POLICY "Service role can manage abuse logs"
  ON public.free_score_abuse_logs
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING ((SELECT auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((SELECT auth.jwt()->>'role') = 'service_role');

-- Fix csrf_tokens policy
DROP POLICY IF EXISTS "Service role can manage CSRF tokens" ON public.csrf_tokens;
CREATE POLICY "Service role can manage CSRF tokens"
  ON public.csrf_tokens
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING ((SELECT auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((SELECT auth.jwt()->>'role') = 'service_role');

-- =====================================================
-- 3. REMOVE UNUSED INDEXES
-- =====================================================

DROP INDEX IF EXISTS public.idx_abuse_logs_admin_dashboard;
DROP INDEX IF EXISTS public.idx_free_score_user_submissions;
DROP INDEX IF EXISTS public.idx_tasks_business_lookup;
DROP INDEX IF EXISTS public.idx_notifications_user_pending;
DROP INDEX IF EXISTS public.idx_analytics_user_events;
DROP INDEX IF EXISTS public.idx_background_jobs_pending;

-- =====================================================
-- 4. FIX SECURITY DEFINER VIEW
-- =====================================================

-- Drop and recreate abuse_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS public.abuse_summary;

CREATE VIEW public.abuse_summary AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  abuse_type,
  COUNT(*) as count,
  COUNT(DISTINCT email) as unique_emails,
  COUNT(DISTINCT ip_address) as unique_ips
FROM public.free_score_abuse_logs
WHERE blocked = true
GROUP BY DATE_TRUNC('day', created_at), abuse_type
ORDER BY date DESC, count DESC;