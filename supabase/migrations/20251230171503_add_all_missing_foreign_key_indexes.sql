/*
  # Add All Missing Foreign Key Indexes

  ## Summary
  Adds covering indexes for 42 foreign key columns to improve query performance.
  Foreign keys without indexes can cause slow JOINs, lookups, and cascading operations.

  ## Tables & Indexes Added
  
  ### Analytics & Monitoring (4 indexes)
  - analytics_events: business_id, user_id
  - api_usage_log: business_id, user_id

  ### Background Jobs (2 indexes)
  - background_jobs: business_id, user_id

  ### Benchmarks (1 index)
  - benchmarks: business_id

  ### Email System (2 indexes)
  - email_logs: campaign_id, user_id

  ### Free Score (1 index)
  - free_score_submissions: user_id

  ### Integration System (1 index)
  - integration_sync_log: user_integration_id

  ### Notification System (6 indexes)
  - notification_delivery_log: channel_id, notification_id, user_id
  - notifications: notification_type_id, user_id
  - user_notification_preferences: notification_type_id

  ### Rex AI System (8 indexes)
  - rex_action_history: business_id, user_id
  - rex_confidence_scores: business_id, user_id
  - rex_ece_evaluations: business_id, user_id
  - rex_recommendations: user_id

  ### Stripe Payment System (8 indexes)
  - stripe_invoices: stripe_customer_id, stripe_subscription_id, user_id
  - stripe_payment_methods: stripe_customer_id, user_id
  - stripe_subscriptions: stripe_customer_id, user_id
  - stripe_webhook_events: user_id

  ### Subscription System (1 index)
  - subscription_events: user_id

  ### Task Management (4 indexes)
  - task_generation_log: task_id, template_id, user_id
  - task_generation_state: business_id
  - tasks: business_id

  ### User & Campaign (2 indexes)
  - user_campaign_progress: campaign_id
  - user_integrations: provider_id

  ### Visibility System (2 indexes)
  - visibility_checks: business_id
  - visibility_scores: business_id

  ## Performance Impact
  - ✅ Faster foreign key JOIN operations
  - ✅ Faster CASCADE DELETE operations
  - ✅ Faster lookups by foreign key columns
  - ✅ Better query planner decisions

  ## Security Note
  Previously created indexes showing as "unused" are intentionally kept.
  They will be used by foreign key queries once the application exercises those code paths.
*/

-- ============================================================================
-- Analytics & Monitoring
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id_fk 
  ON analytics_events(business_id);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id_fk 
  ON analytics_events(user_id);

CREATE INDEX IF NOT EXISTS idx_api_usage_log_business_id_fk 
  ON api_usage_log(business_id);

CREATE INDEX IF NOT EXISTS idx_api_usage_log_user_id_fk 
  ON api_usage_log(user_id);

-- ============================================================================
-- Background Jobs
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_background_jobs_business_id_fk 
  ON background_jobs(business_id);

CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id_fk 
  ON background_jobs(user_id);

-- ============================================================================
-- Benchmarks
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_benchmarks_business_id_fk 
  ON benchmarks(business_id);

-- ============================================================================
-- Email System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id_fk 
  ON email_logs(campaign_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_user_id_fk 
  ON email_logs(user_id);

-- ============================================================================
-- Free Score
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_user_id_fk 
  ON free_score_submissions(user_id);

-- ============================================================================
-- Integration System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration_id_fk 
  ON integration_sync_log(user_integration_id);

-- ============================================================================
-- Notification System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id_fk 
  ON notification_delivery_log(channel_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification_id_fk 
  ON notification_delivery_log(notification_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_user_id_fk 
  ON notification_delivery_log(user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id_fk 
  ON notifications(notification_type_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id_fk 
  ON notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id_fk 
  ON user_notification_preferences(notification_type_id);

-- ============================================================================
-- Rex AI System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_rex_action_history_business_id_fk 
  ON rex_action_history(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_user_id_fk 
  ON rex_action_history(user_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_business_id_fk 
  ON rex_confidence_scores(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_user_id_fk 
  ON rex_confidence_scores(user_id);

CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business_id_fk 
  ON rex_ece_evaluations(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_user_id_fk 
  ON rex_ece_evaluations(user_id);

CREATE INDEX IF NOT EXISTS idx_rex_recommendations_user_id_fk 
  ON rex_recommendations(user_id);

-- ============================================================================
-- Stripe Payment System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_customer_id_fk 
  ON stripe_invoices(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_subscription_id_fk 
  ON stripe_invoices(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_user_id_fk 
  ON stripe_invoices(user_id);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_stripe_customer_id_fk 
  ON stripe_payment_methods(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_user_id_fk 
  ON stripe_payment_methods(user_id);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id_fk 
  ON stripe_subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id_fk 
  ON stripe_subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_user_id_fk 
  ON stripe_webhook_events(user_id);

-- ============================================================================
-- Subscription System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_subscription_events_user_id_fk 
  ON subscription_events(user_id);

-- ============================================================================
-- Task Management
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id_fk 
  ON task_generation_log(task_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id_fk 
  ON task_generation_log(template_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user_id_fk 
  ON task_generation_log(user_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id_fk 
  ON task_generation_state(business_id);

CREATE INDEX IF NOT EXISTS idx_tasks_business_id_fk 
  ON tasks(business_id);

-- ============================================================================
-- User & Campaign
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id_fk 
  ON user_campaign_progress(campaign_id);

CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id_fk 
  ON user_integrations(provider_id);

-- ============================================================================
-- Visibility System
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_visibility_checks_business_id_fk 
  ON visibility_checks(business_id);

CREATE INDEX IF NOT EXISTS idx_visibility_scores_business_id_fk 
  ON visibility_scores(business_id);

-- ============================================================================
-- Add Comments for Documentation
-- ============================================================================

COMMENT ON INDEX idx_analytics_events_business_id_fk IS 'FK index for business analytics queries';
COMMENT ON INDEX idx_analytics_events_user_id_fk IS 'FK index for user analytics queries';
COMMENT ON INDEX idx_api_usage_log_business_id_fk IS 'FK index for business API usage queries';
COMMENT ON INDEX idx_api_usage_log_user_id_fk IS 'FK index for user API usage queries';
COMMENT ON INDEX idx_background_jobs_business_id_fk IS 'FK index for business background jobs';
COMMENT ON INDEX idx_background_jobs_user_id_fk IS 'FK index for user background jobs';
COMMENT ON INDEX idx_benchmarks_business_id_fk IS 'FK index for business benchmarks';
COMMENT ON INDEX idx_email_logs_campaign_id_fk IS 'FK index for campaign email logs';
COMMENT ON INDEX idx_email_logs_user_id_fk IS 'FK index for user email logs';
COMMENT ON INDEX idx_free_score_submissions_user_id_fk IS 'FK index for user free score submissions';
COMMENT ON INDEX idx_integration_sync_log_user_integration_id_fk IS 'FK index for integration sync history';
COMMENT ON INDEX idx_notification_delivery_log_channel_id_fk IS 'FK index for channel delivery logs';
COMMENT ON INDEX idx_notification_delivery_log_notification_id_fk IS 'FK index for notification delivery logs';
COMMENT ON INDEX idx_notification_delivery_log_user_id_fk IS 'FK index for user delivery logs';
COMMENT ON INDEX idx_notifications_notification_type_id_fk IS 'FK index for notification types';
COMMENT ON INDEX idx_notifications_user_id_fk IS 'FK index for user notifications';
COMMENT ON INDEX idx_user_notification_preferences_notification_type_id_fk IS 'FK index for notification type preferences';
COMMENT ON INDEX idx_rex_action_history_business_id_fk IS 'FK index for business Rex actions';
COMMENT ON INDEX idx_rex_action_history_user_id_fk IS 'FK index for user Rex actions';
COMMENT ON INDEX idx_rex_confidence_scores_business_id_fk IS 'FK index for business Rex confidence';
COMMENT ON INDEX idx_rex_confidence_scores_user_id_fk IS 'FK index for user Rex confidence';
COMMENT ON INDEX idx_rex_ece_evaluations_business_id_fk IS 'FK index for business Rex evaluations';
COMMENT ON INDEX idx_rex_ece_evaluations_user_id_fk IS 'FK index for user Rex evaluations';
COMMENT ON INDEX idx_rex_recommendations_user_id_fk IS 'FK index for user Rex recommendations';
COMMENT ON INDEX idx_stripe_invoices_stripe_customer_id_fk IS 'FK index for Stripe customer invoices';
COMMENT ON INDEX idx_stripe_invoices_stripe_subscription_id_fk IS 'FK index for Stripe subscription invoices';
COMMENT ON INDEX idx_stripe_invoices_user_id_fk IS 'FK index for user Stripe invoices';
COMMENT ON INDEX idx_stripe_payment_methods_stripe_customer_id_fk IS 'FK index for Stripe customer payment methods';
COMMENT ON INDEX idx_stripe_payment_methods_user_id_fk IS 'FK index for user payment methods';
COMMENT ON INDEX idx_stripe_subscriptions_stripe_customer_id_fk IS 'FK index for Stripe customer subscriptions';
COMMENT ON INDEX idx_stripe_subscriptions_user_id_fk IS 'FK index for user subscriptions';
COMMENT ON INDEX idx_stripe_webhook_events_user_id_fk IS 'FK index for user webhook events';
COMMENT ON INDEX idx_subscription_events_user_id_fk IS 'FK index for user subscription events';
COMMENT ON INDEX idx_task_generation_log_task_id_fk IS 'FK index for task generation logs';
COMMENT ON INDEX idx_task_generation_log_template_id_fk IS 'FK index for template generation logs';
COMMENT ON INDEX idx_task_generation_log_user_id_fk IS 'FK index for user task generation';
COMMENT ON INDEX idx_task_generation_state_business_id_fk IS 'FK index for business task state';
COMMENT ON INDEX idx_tasks_business_id_fk IS 'FK index for business tasks';
COMMENT ON INDEX idx_user_campaign_progress_campaign_id_fk IS 'FK index for campaign progress';
COMMENT ON INDEX idx_user_integrations_provider_id_fk IS 'FK index for integration providers';
COMMENT ON INDEX idx_visibility_checks_business_id_fk IS 'FK index for business visibility checks';
COMMENT ON INDEX idx_visibility_scores_business_id_fk IS 'FK index for business visibility scores';
