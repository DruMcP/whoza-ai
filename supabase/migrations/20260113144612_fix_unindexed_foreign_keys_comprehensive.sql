/*
  # Fix Unindexed Foreign Keys - Comprehensive

  1. Performance Improvements
    - Add indexes for all foreign key columns that lack covering indexes
    - This significantly improves JOIN performance and foreign key constraint checking
    - Indexes are added with IF NOT EXISTS to prevent errors

  2. Tables Fixed
    - analytics_events: business_id
    - api_usage_log: business_id, user_id
    - background_jobs: business_id, user_id
    - benchmarks: business_id
    - campaign_emails: template_id
    - email_logs: campaign_id, template_id
    - integration_sync_log: user_integration_id
    - integration_webhooks: user_integration_id
    - notification_delivery_log: channel_id, notification_id
    - notification_templates: channel_id
    - notifications: notification_type_id
    - rex_action_history: business_id, evaluation_id, recommendation_id
    - rex_confidence_scores: business_id, triggered_by_action_id
    - rex_ece_evaluations: business_id
    - rex_recommendations: evaluation_id
    - stripe_invoices: stripe_customer_id, stripe_subscription_id
    - stripe_payment_methods: stripe_customer_id
    - stripe_prices: stripe_product_id
    - stripe_subscriptions: stripe_customer_id
    - task_generation_log: task_id, template_id, user_id
    - task_generation_state: business_id
    - user_campaign_progress: campaign_id
    - user_integrations: provider_id
    - user_notification_preferences: channel_id, notification_type_id
    - visibility_checks: business_id
    - visibility_scores: business_id
*/

-- Analytics Events
CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id 
ON analytics_events(business_id);

-- API Usage Log
CREATE INDEX IF NOT EXISTS idx_api_usage_log_business_id 
ON api_usage_log(business_id);

CREATE INDEX IF NOT EXISTS idx_api_usage_log_user_id 
ON api_usage_log(user_id);

-- Background Jobs
CREATE INDEX IF NOT EXISTS idx_background_jobs_business_id 
ON background_jobs(business_id);

CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id 
ON background_jobs(user_id);

-- Benchmarks
CREATE INDEX IF NOT EXISTS idx_benchmarks_business_id 
ON benchmarks(business_id);

-- Campaign Emails
CREATE INDEX IF NOT EXISTS idx_campaign_emails_template_id 
ON campaign_emails(template_id);

-- Email Logs
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id 
ON email_logs(campaign_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_template_id 
ON email_logs(template_id);

-- Integration Sync Log
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration_id 
ON integration_sync_log(user_integration_id);

-- Integration Webhooks
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration_id 
ON integration_webhooks(user_integration_id);

-- Notification Delivery Log
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id 
ON notification_delivery_log(channel_id);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification_id 
ON notification_delivery_log(notification_id);

-- Notification Templates
CREATE INDEX IF NOT EXISTS idx_notification_templates_channel_id 
ON notification_templates(channel_id);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id 
ON notifications(notification_type_id);

-- Rex Action History
CREATE INDEX IF NOT EXISTS idx_rex_action_history_business_id 
ON rex_action_history(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_evaluation_id 
ON rex_action_history(evaluation_id);

CREATE INDEX IF NOT EXISTS idx_rex_action_history_recommendation_id 
ON rex_action_history(recommendation_id);

-- Rex Confidence Scores
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_business_id 
ON rex_confidence_scores(business_id);

CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_triggered_by_action_id 
ON rex_confidence_scores(triggered_by_action_id);

-- Rex ECE Evaluations
CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business_id 
ON rex_ece_evaluations(business_id);

-- Rex Recommendations
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_evaluation_id 
ON rex_recommendations(evaluation_id);

-- Stripe Invoices
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_customer_id 
ON stripe_invoices(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_subscription_id 
ON stripe_invoices(stripe_subscription_id);

-- Stripe Payment Methods
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_stripe_customer_id 
ON stripe_payment_methods(stripe_customer_id);

-- Stripe Prices
CREATE INDEX IF NOT EXISTS idx_stripe_prices_stripe_product_id 
ON stripe_prices(stripe_product_id);

-- Stripe Subscriptions
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id 
ON stripe_subscriptions(stripe_customer_id);

-- Task Generation Log
CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id 
ON task_generation_log(task_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id 
ON task_generation_log(template_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user_id 
ON task_generation_log(user_id);

-- Task Generation State
CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id 
ON task_generation_state(business_id);

-- User Campaign Progress
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id 
ON user_campaign_progress(campaign_id);

-- User Integrations
CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id 
ON user_integrations(provider_id);

-- User Notification Preferences
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_channel_id 
ON user_notification_preferences(channel_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id 
ON user_notification_preferences(notification_type_id);

-- Visibility Checks
CREATE INDEX IF NOT EXISTS idx_visibility_checks_business_id 
ON visibility_checks(business_id);

-- Visibility Scores
CREATE INDEX IF NOT EXISTS idx_visibility_scores_business_id 
ON visibility_scores(business_id);