/*
  # Fix Missing Foreign Key Indexes

  1. Performance Improvements
    - Add indexes on all foreign key columns that were missing them
    - This significantly improves JOIN performance and query optimization

  2. Tables Fixed
    - analytics_events (business_id)
    - campaign_emails (template_id)
    - email_logs (campaign_id, template_id)
    - notification_delivery_log (channel_id)
    - notification_templates (channel_id)
    - notifications (notification_type_id)
    - stripe_webhook_events (user_id)
    - task_generation_log (task_id, template_id)
    - task_generation_state (business_id)
    - user_campaign_progress (campaign_id)
    - user_notification_preferences (channel_id, notification_type_id)

  3. Impact
    - Improved query performance on JOINs
    - Better query plan optimization
    - Reduced database load
*/

-- Analytics Events
CREATE INDEX IF NOT EXISTS idx_analytics_events_business_id 
  ON analytics_events(business_id);

-- Campaign Emails
CREATE INDEX IF NOT EXISTS idx_campaign_emails_template_id 
  ON campaign_emails(template_id);

-- Email Logs
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id 
  ON email_logs(campaign_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_template_id 
  ON email_logs(template_id);

-- Notification Delivery Log
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_channel_id 
  ON notification_delivery_log(channel_id);

-- Notification Templates
CREATE INDEX IF NOT EXISTS idx_notification_templates_channel_id 
  ON notification_templates(channel_id);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_notification_type_id 
  ON notifications(notification_type_id);

-- Stripe Webhook Events
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_user_id 
  ON stripe_webhook_events(user_id);

-- Task Generation Log
CREATE INDEX IF NOT EXISTS idx_task_generation_log_task_id 
  ON task_generation_log(task_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_template_id 
  ON task_generation_log(template_id);

-- Task Generation State
CREATE INDEX IF NOT EXISTS idx_task_generation_state_business_id 
  ON task_generation_state(business_id);

-- User Campaign Progress
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_campaign_id 
  ON user_campaign_progress(campaign_id);

-- User Notification Preferences
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_channel_id 
  ON user_notification_preferences(channel_id);

CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_notification_type_id 
  ON user_notification_preferences(notification_type_id);
