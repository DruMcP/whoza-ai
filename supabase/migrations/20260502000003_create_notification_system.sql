/*
  # Multi-Channel Notification System

  ## Overview
  Creates a comprehensive notification infrastructure for delivering weekly tasks and monthly
  score updates across multiple channels (email, WhatsApp, in-app, SMS). Built with channel
  flexibility and user preferences in mind.

  ## New Tables

  ### `notification_channels`
  - `id` (uuid, primary key) - Channel identifier
  - `name` (text, unique) - Channel name (email, whatsapp, in_app, sms)
  - `display_name` (text) - User-facing channel name
  - `is_enabled` (boolean) - Whether channel is active globally
  - `requires_verification` (boolean) - Whether channel requires user verification
  - `available_plans` (text[]) - Which plans have access to this channel
  - `priority_order` (integer) - Fallback priority (lower = higher priority)
  - `created_at` (timestamptz) - Creation timestamp

  ### `notification_types`
  - `id` (uuid, primary key) - Type identifier
  - `name` (text, unique) - Type name (weekly_task, score_update, etc.)
  - `display_name` (text) - User-facing type name
  - `description` (text) - What this notification is for
  - `default_enabled` (boolean) - Whether enabled by default for new users
  - `user_can_disable` (boolean) - Whether user can turn off this type
  - `created_at` (timestamptz) - Creation timestamp

  ### `notification_templates`
  - `id` (uuid, primary key) - Template identifier
  - `notification_type_id` (uuid) - Reference to notification type
  - `channel_id` (uuid) - Reference to channel
  - `name` (text) - Template identifier
  - `subject_template` (text) - Subject line template (for email/SMS)
  - `content_template` (text) - Content template
  - `html_template` (text) - HTML version (for email)
  - `variables` (jsonb) - Available variables for template
  - `is_active` (boolean) - Whether template is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `user_notification_preferences`
  - `id` (uuid, primary key) - Preference identifier
  - `user_id` (uuid) - User reference
  - `notification_type_id` (uuid) - Notification type
  - `channel_id` (uuid) - Channel preference
  - `is_enabled` (boolean) - Whether this notification type is enabled for this channel
  - `delivery_time` (time) - Preferred delivery time (if applicable)
  - `delivery_days` (text[]) - Preferred delivery days (if applicable)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `notifications`
  - `id` (uuid, primary key) - Notification identifier
  - `user_id` (uuid) - Target user
  - `notification_type_id` (uuid) - Type of notification
  - `priority` (text) - urgent, high, normal, low
  - `title` (text) - Notification title
  - `content` (text) - Notification content
  - `data` (jsonb) - Additional data payload
  - `scheduled_for` (timestamptz) - When to send
  - `expires_at` (timestamptz) - When notification expires
  - `status` (text) - pending, processing, sent, failed, expired
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `notification_delivery_log`
  - `id` (uuid, primary key) - Log entry identifier
  - `notification_id` (uuid) - Reference to notification
  - `user_id` (uuid) - Target user
  - `channel_id` (uuid) - Delivery channel used
  - `recipient` (text) - Email, phone, etc.
  - `status` (text) - sent, delivered, failed, bounced, opened, clicked
  - `sent_at` (timestamptz) - When sent
  - `delivered_at` (timestamptz) - When delivered
  - `opened_at` (timestamptz) - When opened (if tracked)
  - `clicked_at` (timestamptz) - When clicked (if tracked)
  - `error_message` (text) - Error if failed
  - `provider_response` (jsonb) - Response from email/SMS provider
  - `metadata` (jsonb) - Additional tracking data
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can view and manage their own preferences
  - Users can view their own notification history
  - Admins can manage templates and view all notifications
*/

-- Create notification_channels table
CREATE TABLE IF NOT EXISTS notification_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  is_enabled boolean DEFAULT true,
  requires_verification boolean DEFAULT false,
  available_plans text[] DEFAULT ARRAY['free', 'starter', 'growth', 'enterprise'],
  priority_order integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_channels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view enabled channels" ON notification_channels;
CREATE POLICY "Anyone can view enabled channels" ON notification_channels FOR SELECT
  TO authenticated
  USING (is_enabled = true);

DROP POLICY IF EXISTS "Admin can manage channels" ON notification_channels;
CREATE POLICY "Admin can manage channels" ON notification_channels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_types table
CREATE TABLE IF NOT EXISTS notification_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  default_enabled boolean DEFAULT true,
  user_can_disable boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view notification types" ON notification_types;
CREATE POLICY "Anyone can view notification types" ON notification_types FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin can manage notification types" ON notification_types;
CREATE POLICY "Admin can manage notification types" ON notification_types FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_templates table
CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  name text NOT NULL,
  subject_template text,
  content_template text NOT NULL,
  html_template text,
  variables jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(notification_type_id, channel_id)
);

ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can manage notification templates" ON notification_templates;
CREATE POLICY "Admin can manage notification templates" ON notification_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_notification_preferences table
CREATE TABLE IF NOT EXISTS user_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  is_enabled boolean DEFAULT true,
  delivery_time time,
  delivery_days text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_type_id, channel_id)
);

ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own preferences" ON user_notification_preferences;
CREATE POLICY "Users can view own preferences" ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own preferences" ON user_notification_preferences;
CREATE POLICY "Users can manage own preferences" ON user_notification_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own preferences" ON user_notification_preferences;
CREATE POLICY "Users can update own preferences" ON user_notification_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin can view all preferences" ON user_notification_preferences;
CREATE POLICY "Admin can view all preferences" ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  priority text DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  title text NOT NULL,
  content text NOT NULL,
  data jsonb DEFAULT '{}',
  scheduled_for timestamptz DEFAULT now(),
  expires_at timestamptz,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'expired', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin can manage all notifications" ON notifications;
CREATE POLICY "Admin can manage all notifications" ON notifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_delivery_log table
CREATE TABLE IF NOT EXISTS notification_delivery_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  recipient text NOT NULL,
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed', 'bounced', 'opened', 'clicked')),
  sent_at timestamptz DEFAULT now(),
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  error_message text,
  provider_response jsonb,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_delivery_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own delivery logs" ON notification_delivery_log;
CREATE POLICY "Users can view own delivery logs" ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin can view all delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can view all delivery logs" ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admin can insert delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can insert delivery logs" ON notification_delivery_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_status ON notifications(user_id, status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for, status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification ON notification_delivery_log(notification_id);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_user ON notification_delivery_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_user ON user_notification_preferences(user_id);

-- Insert default notification channels
INSERT INTO notification_channels (name, display_name, is_enabled, requires_verification, available_plans, priority_order) VALUES
('email', 'Email', true, true, ARRAY['free', 'starter', 'growth', 'enterprise'], 1),
('in_app', 'In-App', true, false, ARRAY['free', 'starter', 'growth', 'enterprise'], 2),
('whatsapp', 'WhatsApp', false, true, ARRAY['growth', 'enterprise'], 3),
('sms', 'SMS', false, true, ARRAY['enterprise'], 4)
ON CONFLICT (name) DO NOTHING;

-- Insert default notification types
INSERT INTO notification_types (name, display_name, description, default_enabled, user_can_disable) VALUES
('weekly_task', 'Weekly Task', 'Your weekly SEO task is ready', true, false),
('score_update', 'Score Update', 'Your monthly visibility score report', true, true),
('task_reminder', 'Task Reminder', 'Reminder to complete your pending task', true, true),
('system_alert', 'System Alert', 'Important system notifications', true, false),
('marketing', 'Marketing Updates', 'News, tips, and product updates', true, true)
ON CONFLICT (name) DO NOTHING;
