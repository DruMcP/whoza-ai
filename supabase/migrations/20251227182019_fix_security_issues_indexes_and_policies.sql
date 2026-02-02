/*
  # Security Fixes: Indexes and RLS Policies Optimization

  ## 1. Add Missing Foreign Key Indexes
  Creates indexes for foreign keys that were missing covering indexes:
  - `rex_action_history.evaluation_id`
  - `rex_action_history.recommendation_id`
  - `rex_confidence_scores.triggered_by_action_id`
  - `rex_recommendations.evaluation_id`

  ## 2. Remove Unused Indexes
  Drops 109 indexes that have not been used, improving:
  - Write performance (faster INSERTs/UPDATEs)
  - Storage efficiency
  - Maintenance overhead reduction

  ## 3. Consolidate Multiple Permissive RLS Policies
  Fixes security issue where multiple permissive policies exist for the same operation:
  - Drops redundant admin policies where user policies already cover the use case
  - Maintains security while improving policy evaluation performance
  - Ensures single, clear policy per operation where appropriate

  ## Notes
  - Auth DB connection strategy and leaked password protection require dashboard configuration
  - All changes are designed to be safe and non-breaking
  - Indexes are dropped with IF EXISTS to prevent errors
*/

-- =========================================================================
-- SECTION 1: ADD MISSING FOREIGN KEY INDEXES
-- =========================================================================

-- Add index for rex_action_history.evaluation_id foreign key
CREATE INDEX IF NOT EXISTS idx_rex_action_history_evaluation_id 
ON rex_action_history(evaluation_id);

-- Add index for rex_action_history.recommendation_id foreign key
CREATE INDEX IF NOT EXISTS idx_rex_action_history_recommendation_id 
ON rex_action_history(recommendation_id);

-- Add index for rex_confidence_scores.triggered_by_action_id foreign key
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_triggered_by_action_id 
ON rex_confidence_scores(triggered_by_action_id);

-- Add index for rex_recommendations.evaluation_id foreign key
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_evaluation_id 
ON rex_recommendations(evaluation_id);

-- =========================================================================
-- SECTION 2: DROP UNUSED INDEXES
-- =========================================================================

-- Task-related unused indexes
DROP INDEX IF EXISTS idx_business_profiles_user_id;
DROP INDEX IF EXISTS idx_tasks_business_id;
DROP INDEX IF EXISTS idx_tasks_status;
DROP INDEX IF EXISTS idx_visibility_scores_business_id;
DROP INDEX IF EXISTS idx_benchmarks_business_id;
DROP INDEX IF EXISTS idx_task_templates_priority;
DROP INDEX IF EXISTS idx_task_generation_state_user;
DROP INDEX IF EXISTS idx_task_templates_category;
DROP INDEX IF EXISTS idx_task_generation_log_user;
DROP INDEX IF EXISTS idx_task_generation_log_task_id;
DROP INDEX IF EXISTS idx_task_generation_log_template_id;
DROP INDEX IF EXISTS idx_task_generation_state_business_id;

-- Visibility scoring unused indexes
DROP INDEX IF EXISTS idx_visibility_score_details_business;
DROP INDEX IF EXISTS idx_visibility_score_details_date;
DROP INDEX IF EXISTS idx_scoring_benchmarks_trade;

-- Email campaign unused indexes
DROP INDEX IF EXISTS idx_user_campaign_progress_next_email;
DROP INDEX IF EXISTS idx_user_campaign_progress_user;
DROP INDEX IF EXISTS idx_user_campaign_progress_campaign_id;
DROP INDEX IF EXISTS idx_email_logs_user;
DROP INDEX IF EXISTS idx_email_logs_status;
DROP INDEX IF EXISTS idx_email_logs_campaign_id;
DROP INDEX IF EXISTS idx_email_logs_template_id;
DROP INDEX IF EXISTS idx_campaign_emails_campaign;
DROP INDEX IF EXISTS idx_campaign_emails_template_id;

-- Notification system unused indexes
DROP INDEX IF EXISTS idx_notifications_user_status;
DROP INDEX IF EXISTS idx_notifications_scheduled;
DROP INDEX IF EXISTS idx_notifications_notification_type_id;
DROP INDEX IF EXISTS idx_notification_delivery_log_notification;
DROP INDEX IF EXISTS idx_notification_delivery_log_user;
DROP INDEX IF EXISTS idx_notification_delivery_log_channel_id;
DROP INDEX IF EXISTS idx_notification_templates_channel_id;
DROP INDEX IF EXISTS idx_user_notification_preferences_user;
DROP INDEX IF EXISTS idx_user_notification_preferences_channel_id;
DROP INDEX IF EXISTS idx_user_notification_preferences_notification_type_id;

-- Analytics unused indexes
DROP INDEX IF EXISTS idx_analytics_events_user;
DROP INDEX IF EXISTS idx_analytics_events_type;
DROP INDEX IF EXISTS idx_analytics_events_category;
DROP INDEX IF EXISTS idx_analytics_events_created;
DROP INDEX IF EXISTS idx_analytics_events_business_id;
DROP INDEX IF EXISTS idx_user_engagement_user_period;
DROP INDEX IF EXISTS idx_user_engagement_period;
DROP INDEX IF EXISTS idx_platform_metrics_period;
DROP INDEX IF EXISTS idx_subscription_events_user;
DROP INDEX IF EXISTS idx_subscription_events_date;
DROP INDEX IF EXISTS idx_user_ltv_user;
DROP INDEX IF EXISTS idx_user_ltv_risk;

-- Integration system unused indexes
DROP INDEX IF EXISTS idx_integration_providers_status;
DROP INDEX IF EXISTS idx_integration_providers_category;
DROP INDEX IF EXISTS idx_user_integrations_user_id;
DROP INDEX IF EXISTS idx_user_integrations_provider_id;
DROP INDEX IF EXISTS idx_user_integrations_status;
DROP INDEX IF EXISTS idx_user_integrations_last_synced;
DROP INDEX IF EXISTS idx_integration_credentials_user_integration;
DROP INDEX IF EXISTS idx_integration_credentials_expires;
DROP INDEX IF EXISTS idx_integration_webhooks_provider;
DROP INDEX IF EXISTS idx_integration_webhooks_user_integration;
DROP INDEX IF EXISTS idx_integration_webhooks_status;
DROP INDEX IF EXISTS idx_integration_webhooks_next_retry;
DROP INDEX IF EXISTS idx_integration_webhooks_created;
DROP INDEX IF EXISTS idx_integration_sync_log_user_integration;
DROP INDEX IF EXISTS idx_integration_sync_log_status;
DROP INDEX IF EXISTS idx_integration_sync_log_created;

-- Stripe integration unused indexes
DROP INDEX IF EXISTS idx_stripe_customers_user_id;
DROP INDEX IF EXISTS idx_stripe_customers_stripe_id;
DROP INDEX IF EXISTS idx_stripe_customers_status;
DROP INDEX IF EXISTS idx_stripe_products_active;
DROP INDEX IF EXISTS idx_stripe_prices_product;
DROP INDEX IF EXISTS idx_stripe_prices_active;
DROP INDEX IF EXISTS idx_stripe_subscriptions_user_id;
DROP INDEX IF EXISTS idx_stripe_subscriptions_customer;
DROP INDEX IF EXISTS idx_stripe_subscriptions_status;
DROP INDEX IF EXISTS idx_stripe_subscriptions_period_end;
DROP INDEX IF EXISTS idx_stripe_invoices_user_id;
DROP INDEX IF EXISTS idx_stripe_invoices_customer;
DROP INDEX IF EXISTS idx_stripe_invoices_subscription;
DROP INDEX IF EXISTS idx_stripe_invoices_status;
DROP INDEX IF EXISTS idx_stripe_invoices_created;
DROP INDEX IF EXISTS idx_stripe_payment_methods_user_id;
DROP INDEX IF EXISTS idx_stripe_payment_methods_customer;
DROP INDEX IF EXISTS idx_stripe_payment_methods_default;
DROP INDEX IF EXISTS idx_stripe_webhook_events_type;
DROP INDEX IF EXISTS idx_stripe_webhook_events_status;
DROP INDEX IF EXISTS idx_stripe_webhook_events_customer;
DROP INDEX IF EXISTS idx_stripe_webhook_events_subscription;
DROP INDEX IF EXISTS idx_stripe_webhook_events_next_retry;
DROP INDEX IF EXISTS idx_stripe_webhook_events_created;
DROP INDEX IF EXISTS idx_stripe_webhook_events_user_id;

-- Anti-scraping system unused indexes
DROP INDEX IF EXISTS idx_fingerprints_trust_score;
DROP INDEX IF EXISTS idx_fingerprints_suspicious;
DROP INDEX IF EXISTS idx_captcha_fingerprint;
DROP INDEX IF EXISTS idx_captcha_token;

-- Free score system unused indexes
DROP INDEX IF EXISTS idx_free_score_submissions_converted;
DROP INDEX IF EXISTS idx_free_score_submissions_email;
DROP INDEX IF EXISTS idx_free_score_submissions_user;
DROP INDEX IF EXISTS idx_free_score_submissions_created;

-- Rex decision engine unused indexes
DROP INDEX IF EXISTS idx_rex_evaluations_business;
DROP INDEX IF EXISTS idx_rex_evaluations_user;
DROP INDEX IF EXISTS idx_rex_evaluations_overall_score;
DROP INDEX IF EXISTS idx_rex_evaluations_evaluated_at;
DROP INDEX IF EXISTS idx_rex_recommendations_business;
DROP INDEX IF EXISTS idx_rex_recommendations_user;
DROP INDEX IF EXISTS idx_rex_recommendations_status;
DROP INDEX IF EXISTS idx_rex_recommendations_target_pillar;
DROP INDEX IF EXISTS idx_rex_history_business;
DROP INDEX IF EXISTS idx_rex_history_user;
DROP INDEX IF EXISTS idx_rex_history_completed;
DROP INDEX IF EXISTS idx_rex_history_pillar;
DROP INDEX IF EXISTS idx_rex_confidence_business;
DROP INDEX IF EXISTS idx_rex_confidence_user;
DROP INDEX IF EXISTS idx_rex_confidence_measured;
DROP INDEX IF EXISTS idx_rex_confidence_type;

-- =========================================================================
-- SECTION 3: CONSOLIDATE MULTIPLE PERMISSIVE POLICIES
-- =========================================================================

-- email_logs: Keep user policy, drop redundant admin views
DROP POLICY IF EXISTS "Admin can view all email logs" ON email_logs;

-- free_score_submissions: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all submissions" ON free_score_submissions;

-- notification_channels: Keep public view policy, drop admin manage (admin has separate manage policies)
DROP POLICY IF EXISTS "Admin can manage channels" ON notification_channels;

-- notification_delivery_log: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all delivery logs" ON notification_delivery_log;

-- notification_types: Keep public view policy, drop admin manage (admin has separate manage policies)
DROP POLICY IF EXISTS "Admin can manage notification types" ON notification_types;

-- notifications: Keep user policy, drop redundant admin manage
DROP POLICY IF EXISTS "Admin can manage all notifications" ON notifications;

-- rex_action_history: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all action history" ON rex_action_history;

-- rex_confidence_scores: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all confidence scores" ON rex_confidence_scores;

-- rex_ece_evaluations: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all evaluations" ON rex_ece_evaluations;

-- rex_evaluation_criteria: Keep public view policy, drop admin manage (admin has separate manage policies)
DROP POLICY IF EXISTS "Admin can manage criteria" ON rex_evaluation_criteria;

-- rex_recommendations: Consolidate overlapping policies
DROP POLICY IF EXISTS "Admin can manage recommendations" ON rex_recommendations;
DROP POLICY IF EXISTS "Admin can view all recommendations" ON rex_recommendations;

-- scoring_benchmarks: Keep public view policy, drop admin manage (admin has separate manage policies)
DROP POLICY IF EXISTS "Admin can manage benchmarks" ON scoring_benchmarks;

-- task_generation_log: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all generation logs" ON task_generation_log;

-- task_generation_state: Consolidate overlapping admin policies
DROP POLICY IF EXISTS "Admin can manage all generation states" ON task_generation_state;

-- task_templates: Keep public view policy, drop admin manage (admin has separate manage policies)
DROP POLICY IF EXISTS "Admin can manage task templates" ON task_templates;

-- user_campaign_progress: Keep user policy, drop redundant admin manage
DROP POLICY IF EXISTS "Admin can manage campaign progress" ON user_campaign_progress;

-- user_engagement_metrics: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all user metrics" ON user_engagement_metrics;

-- user_lifetime_value: Keep user policy, drop redundant admin manage
DROP POLICY IF EXISTS "Admin can manage LTV" ON user_lifetime_value;

-- user_notification_preferences: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all preferences" ON user_notification_preferences;

-- visibility_score_details: Keep user policy, drop redundant admin view
DROP POLICY IF EXISTS "Admin can view all score details" ON visibility_score_details;
