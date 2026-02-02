/*
  # Add Missing Foreign Key Indexes

  ## Overview
  Adds 37 missing foreign key indexes to improve query performance.
  Foreign keys without indexes can cause table scans on JOIN operations.

  ## Changes
  - Analytics tables: analytics_events, api_usage_log
  - Background jobs and benchmarks
  - Email campaign tables
  - Integration tables
  - Notification tables
  - Rex engine tables
  - Stripe tables
  - Task generation tables
  - User tables
  - Visibility tables
*/

-- Analytics tables
CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id_fk ON public.analytics_events(business_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_log_business_id_fk ON public.api_usage_log(business_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_log_user_id_fk ON public.api_usage_log(user_id);

-- Background jobs and benchmarks
CREATE INDEX IF NOT EXISTS idx_background_jobs_business_id_fk ON public.background_jobs(business_id);
CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id_fk ON public.background_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_benchmarks_business_id_fk ON public.benchmarks(business_id);

-- Email campaign tables
CREATE INDEX IF NOT EXISTS idx_campaign_emails_template_id_fk ON public.campaign_emails(template_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id_fk ON public.email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_template_id_fk ON public.email_logs(template_id);

-- Integration tables
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration_id_fk ON public.integration_sync_log(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration_id_fk ON public.integration_webhooks(user_integration_id);

-- Notification tables
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id_fk ON public.notification_delivery_log(channel_id);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification_id_fk ON public.notification_delivery_log(notification_id);
CREATE INDEX IF NOT EXISTS idx_notification_templates_channel_id_fk ON public.notification_templates(channel_id);
CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id_fk ON public.notifications(notification_type_id);

-- Rex engine tables
CREATE INDEX IF NOT EXISTS idx_rex_action_history_business_id_fk ON public.rex_action_history(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_action_history_evaluation_id_fk ON public.rex_action_history(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_rex_action_history_recommendation_id_fk ON public.rex_action_history(recommendation_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_business_id_fk ON public.rex_confidence_scores(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_scores_triggered_by_action_id_fk ON public.rex_confidence_scores(triggered_by_action_id);
CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business_id_fk ON public.rex_ece_evaluations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_evaluation_id_fk ON public.rex_recommendations(evaluation_id);

-- Stripe tables
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_customer_id_fk ON public.stripe_invoices(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_stripe_subscription_id_fk ON public.stripe_invoices(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_stripe_customer_id_fk ON public.stripe_payment_methods(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_prices_stripe_product_id_fk ON public.stripe_prices(stripe_product_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_customer_id_fk ON public.stripe_subscriptions(stripe_customer_id);

-- Task generation tables
CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id_fk ON public.task_generation_log(task_id);
CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id_fk ON public.task_generation_log(template_id);
CREATE INDEX IF NOT EXISTS idx_task_generation_log_user_id_fk ON public.task_generation_log(user_id);
CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id_fk ON public.task_generation_state(business_id);

-- User tables
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id_fk ON public.user_campaign_progress(campaign_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id_fk ON public.user_integrations(provider_id);
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_channel_id_fk ON public.user_notification_preferences(channel_id);
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id_fk ON public.user_notification_preferences(notification_type_id);

-- Visibility tables
CREATE INDEX IF NOT EXISTS idx_visibility_checks_business_id_fk ON public.visibility_checks(business_id);
CREATE INDEX IF NOT EXISTS idx_visibility_scores_business_id_fk ON public.visibility_scores(business_id);
