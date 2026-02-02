/*
  # Comprehensive Security and Performance Fixes

  ## Changes Made

  ### 1. Foreign Key Indexes (37 indexes added)
  Added indexes for all foreign key columns to improve query performance:
  - analytics_events (business_id)
  - api_usage_log (business_id, user_id)
  - background_jobs (business_id, user_id)
  - benchmarks (business_id)
  - campaign_emails (template_id)
  - email_logs (campaign_id, template_id)
  - integration_sync_log (user_integration_id)
  - integration_webhooks (user_integration_id)
  - notification_delivery_log (channel_id, notification_id)
  - notification_templates (channel_id)
  - notifications (notification_type_id)
  - rex_action_history (business_id, evaluation_id, recommendation_id)
  - rex_confidence_scores (business_id, triggered_by_action_id)
  - rex_ece_evaluations (business_id)
  - rex_recommendations (evaluation_id)
  - stripe_invoices (stripe_customer_id, stripe_subscription_id)
  - stripe_payment_methods (stripe_customer_id)
  - stripe_prices (stripe_product_id)
  - stripe_subscriptions (stripe_customer_id)
  - task_generation_log (task_id, template_id, user_id)
  - task_generation_state (business_id)
  - user_campaign_progress (campaign_id)
  - user_integrations (provider_id)
  - user_notification_preferences (channel_id, notification_type_id)
  - visibility_checks (business_id)
  - visibility_scores (business_id)

  ### 2. RLS Performance Optimization (11 policies fixed)
  Wrapped auth function calls with SELECT to prevent re-evaluation per row:
  - task_generation_log
  - free_score_abuse_logs
  - csrf_tokens
  - analytics_events
  - free_score_rate_limits
  - subscription_events
  - integration_webhooks
  - integration_sync_log
  - stripe_webhook_events
  - browser_fingerprints
  - captcha_verifications

  ### 3. Unused Indexes Removed (2 indexes)
  - idx_free_score_submissions_user_id (not being used)
  - idx_tasks_business_id (not being used)

  ### 4. Security Definer View Fixed
  - Recreated abuse_summary view without SECURITY DEFINER

  ## Manual Configuration Required
  The following issues require manual configuration in Supabase Dashboard:
  - Auth DB Connection Strategy: Change to percentage-based allocation
  - Leaked Password Protection: Enable in Auth settings
*/

-- =====================================================
-- PART 1: ADD MISSING FOREIGN KEY INDEXES
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

-- rex_confidence_scores
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_business_id
  ON public.rex_confidence_scores(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_triggered_by_action_id
  ON public.rex_confidence_scores(triggered_by_action_id);

-- rex_ece_evaluations
CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business_id
  ON public.rex_ece_evaluations(business_id);

-- rex_recommendations
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_evaluation_id
  ON public.rex_recommendations(evaluation_id);

-- stripe_invoices
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_customer_id
  ON public.stripe_invoices(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_subscription_id
  ON public.stripe_invoices(stripe_subscription_id);

-- stripe_payment_methods
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_stripe_customer_id
  ON public.stripe_payment_methods(stripe_customer_id);

-- stripe_prices
CREATE INDEX IF NOT EXISTS idx_stripe_prices_stripe_product_id
  ON public.stripe_prices(stripe_product_id);

-- stripe_subscriptions
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id
  ON public.stripe_subscriptions(stripe_customer_id);

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
-- PART 2: REMOVE UNUSED INDEXES
-- =====================================================

DROP INDEX IF EXISTS public.idx_free_score_submissions_user_id;
DROP INDEX IF EXISTS public.idx_tasks_business_id;

-- =====================================================
-- PART 3: FIX RLS POLICIES - AUTH FUNCTION OPTIMIZATION
-- =====================================================

-- task_generation_log
DROP POLICY IF EXISTS "System can insert generation logs" ON public.task_generation_log;
CREATE POLICY "System can insert generation logs"
  ON public.task_generation_log
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- free_score_abuse_logs
DROP POLICY IF EXISTS "Service role can manage abuse logs" ON public.free_score_abuse_logs;
CREATE POLICY "Service role can manage abuse logs"
  ON public.free_score_abuse_logs
  FOR ALL
  TO service_role
  USING ((select auth.role()) = 'service_role')
  WITH CHECK ((select auth.role()) = 'service_role');

-- csrf_tokens
DROP POLICY IF EXISTS "Service role can manage CSRF tokens" ON public.csrf_tokens;
CREATE POLICY "Service role can manage CSRF tokens"
  ON public.csrf_tokens
  FOR ALL
  TO service_role
  USING ((select auth.role()) = 'service_role')
  WITH CHECK ((select auth.role()) = 'service_role');

-- analytics_events
DROP POLICY IF EXISTS "System can insert events" ON public.analytics_events;
CREATE POLICY "System can insert events"
  ON public.analytics_events
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- free_score_rate_limits
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.free_score_rate_limits;
CREATE POLICY "Service role can manage rate limits"
  ON public.free_score_rate_limits
  FOR ALL
  TO service_role
  USING ((select auth.role()) = 'service_role')
  WITH CHECK ((select auth.role()) = 'service_role');

-- subscription_events
DROP POLICY IF EXISTS "System can insert subscription events" ON public.subscription_events;
CREATE POLICY "System can insert subscription events"
  ON public.subscription_events
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- integration_webhooks
DROP POLICY IF EXISTS "System inserts webhooks" ON public.integration_webhooks;
CREATE POLICY "System inserts webhooks"
  ON public.integration_webhooks
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- integration_sync_log
DROP POLICY IF EXISTS "System inserts sync logs" ON public.integration_sync_log;
CREATE POLICY "System inserts sync logs"
  ON public.integration_sync_log
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- stripe_webhook_events
DROP POLICY IF EXISTS "System inserts webhook events" ON public.stripe_webhook_events;
CREATE POLICY "System inserts webhook events"
  ON public.stripe_webhook_events
  FOR INSERT
  TO service_role
  WITH CHECK ((select auth.role()) = 'service_role');

-- browser_fingerprints
DROP POLICY IF EXISTS "Service role can manage browser fingerprints" ON public.browser_fingerprints;
CREATE POLICY "Service role can manage browser fingerprints"
  ON public.browser_fingerprints
  FOR ALL
  TO service_role
  USING ((select auth.role()) = 'service_role')
  WITH CHECK ((select auth.role()) = 'service_role');

-- captcha_verifications
DROP POLICY IF EXISTS "Service role can manage captcha verifications" ON public.captcha_verifications;
CREATE POLICY "Service role can manage captcha verifications"
  ON public.captcha_verifications
  FOR ALL
  TO service_role
  USING ((select auth.role()) = 'service_role')
  WITH CHECK ((select auth.role()) = 'service_role');

-- =====================================================
-- PART 4: FIX SECURITY DEFINER VIEW
-- =====================================================

-- Drop and recreate abuse_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS public.abuse_summary;

CREATE VIEW public.abuse_summary AS
SELECT
  fs.business_name,
  fs.email,
  COUNT(*) as submission_count,
  MAX(fs.created_at) as last_submission,
  COUNT(DISTINCT fs.ip_address) as unique_ips,
  bool_or(fs.turnstile_verified) as any_turnstile_verified
FROM public.free_score_submissions fs
WHERE fs.created_at > NOW() - INTERVAL '30 days'
GROUP BY fs.business_name, fs.email
HAVING COUNT(*) > 3
ORDER BY submission_count DESC;

-- Grant appropriate permissions
GRANT SELECT ON public.abuse_summary TO authenticated;
GRANT SELECT ON public.abuse_summary TO service_role;