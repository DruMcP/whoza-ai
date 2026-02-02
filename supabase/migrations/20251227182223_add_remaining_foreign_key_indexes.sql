/*
  # Add Remaining Foreign Key Indexes

  ## 1. Missing Foreign Key Indexes
  Creates indexes for 43 foreign keys without covering indexes:
  
  ### Analytics System (2 indexes)
  - `analytics_events.business_id`
  - `analytics_events.user_id`
  
  ### Task System (4 indexes)
  - `benchmarks.business_id`
  - `tasks.business_id`
  - `task_generation_state.business_id`
  - `task_generation_log.task_id`, `task_generation_log.template_id`, `task_generation_log.user_id`
  
  ### Email Campaign System (4 indexes)
  - `campaign_emails.template_id`
  - `email_logs.campaign_id`, `email_logs.template_id`, `email_logs.user_id`
  
  ### Notification System (7 indexes)
  - `notifications.notification_type_id`, `notifications.user_id`
  - `notification_delivery_log.channel_id`, `notification_delivery_log.notification_id`, `notification_delivery_log.user_id`
  - `notification_templates.channel_id`
  - `user_notification_preferences.channel_id`, `user_notification_preferences.notification_type_id`
  
  ### Rex Decision Engine (8 indexes)
  - `rex_action_history.business_id`, `rex_action_history.user_id`
  - `rex_confidence_scores.business_id`, `rex_confidence_scores.user_id`
  - `rex_ece_evaluations.business_id`, `rex_ece_evaluations.user_id`
  - `rex_recommendations.user_id`
  
  ### Stripe Integration (11 indexes)
  - `stripe_invoices.stripe_customer_id`, `stripe_invoices.stripe_subscription_id`, `stripe_invoices.user_id`
  - `stripe_payment_methods.stripe_customer_id`, `stripe_payment_methods.user_id`
  - `stripe_prices.stripe_product_id`
  - `stripe_subscriptions.stripe_customer_id`, `stripe_subscriptions.user_id`
  - `stripe_webhook_events.user_id`
  
  ### Other Systems (7 indexes)
  - `free_score_submissions.user_id`
  - `integration_sync_log.user_integration_id`
  - `integration_webhooks.user_integration_id`
  - `subscription_events.user_id`
  - `user_campaign_progress.campaign_id`
  - `user_integrations.provider_id`
  - `visibility_scores.business_id`

  ## 2. Fix Duplicate RLS Policy
  Removes remaining duplicate policy on email_logs table

  ## Notes
  - Foreign key indexes improve JOIN performance and referential integrity checks
  - Indexes are critical for DELETE/UPDATE operations on parent tables
  - Previously created indexes on rex tables are kept (they support foreign key operations even if not yet used in queries)
*/

-- =========================================================================
-- SECTION 1: ANALYTICS SYSTEM INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id_fk 
ON analytics_events(business_id);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id_fk 
ON analytics_events(user_id);

-- =========================================================================
-- SECTION 2: TASK SYSTEM INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_benchmarks_business_id_fk 
ON benchmarks(business_id);

CREATE INDEX IF NOT EXISTS idx_tasks_business_id_fk 
ON tasks(business_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id_fk 
ON task_generation_state(business_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id_fk 
ON task_generation_log(task_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id_fk 
ON task_generation_log(template_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user_id_fk 
ON task_generation_log(user_id);

-- =========================================================================
-- SECTION 3: EMAIL CAMPAIGN SYSTEM INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_campaign_emails_template_id_fk 
ON campaign_emails(template_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id_fk 
ON email_logs(campaign_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_template_id_fk 
ON email_logs(template_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_user_id_fk 
ON email_logs(user_id);

-- =========================================================================
-- SECTION 4: NOTIFICATION SYSTEM INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id_fk 
ON notifications(notification_type_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id_fk 
ON notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id_fk 
ON notification_delivery_log(channel_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification_id_fk 
ON notification_delivery_log(notification_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_user_id_fk 
ON notification_delivery_log(user_id);

CREATE INDEX IF NOT EXISTS idx_notification_templates_channel_id_fk 
ON notification_templates(channel_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_channel_id_fk 
ON user_notification_preferences(channel_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id_fk 
ON user_notification_preferences(notification_type_id);

-- =========================================================================
-- SECTION 5: REX DECISION ENGINE INDEXES
-- =========================================================================

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

-- =========================================================================
-- SECTION 6: STRIPE INTEGRATION INDEXES
-- =========================================================================

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

CREATE INDEX IF NOT EXISTS idx_stripe_prices_stripe_product_id_fk 
ON stripe_prices(stripe_product_id);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id_fk 
ON stripe_subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id_fk 
ON stripe_subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_user_id_fk 
ON stripe_webhook_events(user_id);

-- =========================================================================
-- SECTION 7: OTHER SYSTEM INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_user_id_fk 
ON free_score_submissions(user_id);

CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration_id_fk 
ON integration_sync_log(user_integration_id);

CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration_id_fk 
ON integration_webhooks(user_integration_id);

CREATE INDEX IF NOT EXISTS idx_subscription_events_user_id_fk 
ON subscription_events(user_id);

CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id_fk 
ON user_campaign_progress(campaign_id);

CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id_fk 
ON user_integrations(provider_id);

CREATE INDEX IF NOT EXISTS idx_visibility_scores_business_id_fk 
ON visibility_scores(business_id);

-- =========================================================================
-- SECTION 8: FIX DUPLICATE RLS POLICY
-- =========================================================================

-- Remove duplicate admin policy on email_logs, keep user-specific policy
DROP POLICY IF EXISTS "Admin can manage email logs" ON email_logs;
