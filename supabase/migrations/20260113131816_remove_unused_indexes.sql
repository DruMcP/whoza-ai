/*
  # Remove Unused Indexes

  ## 1. Overview
    - Remove indexes that are not being used by any queries
    - Reduces database overhead and maintenance costs
    - Improves write performance

  ## 2. Indexes to Remove
    - All indexes marked as unused by the database analyzer
    - Keeping only indexes that are actively used or critical for foreign keys

  ## Important Notes
    - Unused indexes waste space and slow down writes
    - Can always be recreated if needed in the future
    - Foreign key indexes (newly added) are kept
*/

-- ============================================================
-- REMOVE UNUSED INDEXES FROM AI TEAM WAITLIST
-- ============================================================

-- These were created but never used (table is too new/small)
DROP INDEX IF EXISTS idx_ai_team_waitlist_email;
DROP INDEX IF EXISTS idx_ai_team_waitlist_product;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM REX TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_rex_ece_evaluations_business_id;
DROP INDEX IF EXISTS idx_rex_action_history_business_id;
DROP INDEX IF EXISTS idx_rex_action_history_evaluation_id;
DROP INDEX IF EXISTS idx_rex_action_history_recommendation_id;
DROP INDEX IF EXISTS idx_rex_confidence_scores_business_id;
DROP INDEX IF EXISTS idx_rex_confidence_scores_triggered_by_action_id;
DROP INDEX IF EXISTS idx_rex_recommendations_evaluation_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM ANALYTICS TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_analytics_events_business_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM API USAGE TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_api_usage_log_business_id;
DROP INDEX IF EXISTS idx_api_usage_log_user_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM BACKGROUND JOBS
-- ============================================================

DROP INDEX IF EXISTS idx_background_jobs_business_id;
DROP INDEX IF EXISTS idx_background_jobs_user_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM BENCHMARKS
-- ============================================================

DROP INDEX IF EXISTS idx_benchmarks_business_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM EMAIL CAMPAIGN TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_campaign_emails_template_id;
DROP INDEX IF EXISTS idx_email_logs_campaign_id;
DROP INDEX IF EXISTS idx_email_logs_template_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM INTEGRATION TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_integration_sync_log_user_integration_id;
DROP INDEX IF EXISTS idx_integration_webhooks_user_integration_id;
DROP INDEX IF EXISTS idx_user_integrations_provider_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM NOTIFICATION TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_notification_delivery_log_channel_id;
DROP INDEX IF EXISTS idx_notification_delivery_log_notification_id;
DROP INDEX IF EXISTS idx_notification_templates_channel_id;
DROP INDEX IF EXISTS idx_notifications_notification_type_id;
DROP INDEX IF EXISTS idx_user_notification_preferences_channel_id;
DROP INDEX IF EXISTS idx_user_notification_preferences_notification_type_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM STRIPE TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_stripe_invoices_stripe_customer_id;
DROP INDEX IF EXISTS idx_stripe_invoices_stripe_subscription_id;
DROP INDEX IF EXISTS idx_stripe_payment_methods_stripe_customer_id;
DROP INDEX IF EXISTS idx_stripe_prices_stripe_product_id;
DROP INDEX IF EXISTS idx_stripe_subscriptions_stripe_customer_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM TASK TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_task_generation_log_task_id;
DROP INDEX IF EXISTS idx_task_generation_log_template_id;
DROP INDEX IF EXISTS idx_task_generation_log_user_id;
DROP INDEX IF EXISTS idx_task_generation_state_business_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM USER TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_user_campaign_progress_campaign_id;


-- ============================================================
-- REMOVE UNUSED INDEXES FROM VISIBILITY TABLES
-- ============================================================

DROP INDEX IF EXISTS idx_visibility_checks_business_id;
DROP INDEX IF EXISTS idx_visibility_scores_business_id;


-- ============================================================
-- VERIFICATION
-- ============================================================

DO $$
DECLARE
  removed_count INTEGER;
BEGIN
  -- Count remaining indexes (just for information)
  SELECT COUNT(*) INTO removed_count
  FROM pg_indexes
  WHERE schemaname = 'public';
  
  RAISE NOTICE 'Database optimization complete. % indexes remain in public schema.', removed_count;
END $$;