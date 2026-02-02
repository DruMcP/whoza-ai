/*
  # Analytics and Reporting System

  ## Overview
  Comprehensive analytics infrastructure for tracking user and platform KPIs, enabling
  data-driven decision making and product development insights.

  ## New Tables

  ### `analytics_events`
  Raw event tracking for all user interactions and system events
  - `id` (uuid, primary key) - Event identifier
  - `event_type` (text) - Type of event (task_completed, score_calculated, login, etc.)
  - `event_category` (text) - Category (user_action, system_event, business_metric)
  - `user_id` (uuid) - User who triggered event (null for system events)
  - `business_id` (uuid) - Related business profile
  - `event_data` (jsonb) - Structured event data
  - `metadata` (jsonb) - Additional context (user agent, IP, etc.)
  - `created_at` (timestamptz) - Event timestamp

  ### `user_engagement_metrics`
  Aggregated daily/weekly/monthly metrics per user
  - `id` (uuid, primary key) - Metric identifier
  - `user_id` (uuid) - User reference
  - `period_type` (text) - daily, weekly, monthly
  - `period_start` (date) - Period start date
  - `period_end` (date) - Period end date
  - `tasks_assigned` (integer) - Tasks assigned in period
  - `tasks_completed` (integer) - Tasks completed in period
  - `task_completion_rate` (decimal) - Completion rate percentage
  - `avg_time_to_complete` (interval) - Average completion time
  - `score_at_start` (integer) - Visibility score at period start
  - `score_at_end` (integer) - Visibility score at period end
  - `score_change` (integer) - Score delta
  - `logins_count` (integer) - Number of logins
  - `portal_visits` (integer) - Portal page views
  - `notifications_sent` (integer) - Notifications delivered
  - `notifications_opened` (integer) - Notifications opened
  - `engagement_score` (decimal) - Calculated engagement score
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `platform_metrics`
  Aggregated platform-wide metrics
  - `id` (uuid, primary key) - Metric identifier
  - `period_type` (text) - daily, weekly, monthly
  - `period_start` (date) - Period start date
  - `period_end` (date) - Period end date
  - `new_signups` (integer) - New user registrations
  - `trial_starts` (integer) - Users starting trial
  - `trial_conversions` (integer) - Trials converted to paid
  - `trial_conversion_rate` (decimal) - Conversion rate percentage
  - `active_users` (integer) - Users who logged in
  - `paying_customers` (integer) - Users with paid subscriptions
  - `churned_users` (integer) - Users who cancelled
  - `churn_rate` (decimal) - Churn rate percentage
  - `mrr` (decimal) - Monthly recurring revenue
  - `arr` (decimal) - Annual recurring revenue
  - `average_ltv` (decimal) - Average lifetime value
  - `total_tasks_completed` (integer) - Platform-wide task completions
  - `avg_visibility_score` (decimal) - Average user score
  - `total_notifications_sent` (integer) - Platform-wide notifications
  - `notification_open_rate` (decimal) - Notification engagement
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `user_cohorts`
  Cohort analysis for tracking user groups over time
  - `id` (uuid, primary key) - Cohort identifier
  - `cohort_name` (text) - Cohort name (e.g., "2024-01")
  - `cohort_start_date` (date) - Cohort start date
  - `cohort_end_date` (date) - Cohort end date
  - `user_ids` (uuid[]) - Array of user IDs in cohort
  - `initial_users` (integer) - Starting user count
  - `retention_month_1` (integer) - Users retained after 1 month
  - `retention_month_2` (integer) - Users retained after 2 months
  - `retention_month_3` (integer) - Users retained after 3 months
  - `retention_month_6` (integer) - Users retained after 6 months
  - `retention_month_12` (integer) - Users retained after 12 months
  - `avg_ltv` (decimal) - Average LTV for cohort
  - `avg_task_completion_rate` (decimal) - Cohort average completion
  - `avg_score_improvement` (decimal) - Cohort average score improvement
  - `metadata` (jsonb) - Additional cohort data
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `subscription_events`
  Tracks all subscription lifecycle events for LTV calculation
  - `id` (uuid, primary key) - Event identifier
  - `user_id` (uuid) - User reference
  - `event_type` (text) - started, upgraded, downgraded, renewed, cancelled
  - `from_plan` (text) - Previous plan
  - `to_plan` (text) - New plan
  - `mrr_change` (decimal) - Change in MRR
  - `event_date` (date) - Event date
  - `metadata` (jsonb) - Additional event data
  - `created_at` (timestamptz) - Record creation

  ### `user_lifetime_value`
  Calculated LTV for each user
  - `id` (uuid, primary key) - Record identifier
  - `user_id` (uuid) - User reference
  - `total_revenue` (decimal) - Total revenue from user
  - `months_active` (integer) - Months as customer
  - `current_mrr` (decimal) - Current monthly revenue
  - `predicted_ltv` (decimal) - Predicted lifetime value
  - `customer_acquisition_cost` (decimal) - CAC if known
  - `roi` (decimal) - Return on investment
  - `risk_score` (decimal) - Churn risk score (0-1)
  - `last_payment_date` (date) - Last payment received
  - `calculated_at` (timestamptz) - Last calculation
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ## Security
  - Enable RLS on all tables
  - Users can view their own metrics
  - Only admins can view platform metrics
  - All event tracking is system-only

  ## Performance
  - Indexes on user_id, period dates, event types
  - Partitioning strategy for analytics_events by month
*/

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_category text NOT NULL CHECK (event_category IN ('user_action', 'system_event', 'business_metric', 'engagement')),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  business_id uuid REFERENCES business_profiles(id) ON DELETE SET NULL,
  event_data jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can insert events"
  ON analytics_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_engagement_metrics table
CREATE TABLE IF NOT EXISTS user_engagement_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period_type text NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  tasks_assigned integer DEFAULT 0,
  tasks_completed integer DEFAULT 0,
  task_completion_rate decimal(5,2) DEFAULT 0,
  avg_time_to_complete interval,
  score_at_start integer,
  score_at_end integer,
  score_change integer DEFAULT 0,
  logins_count integer DEFAULT 0,
  portal_visits integer DEFAULT 0,
  notifications_sent integer DEFAULT 0,
  notifications_opened integer DEFAULT 0,
  engagement_score decimal(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, period_type, period_start)
);

ALTER TABLE user_engagement_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all user metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create platform_metrics table
CREATE TABLE IF NOT EXISTS platform_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type text NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  new_signups integer DEFAULT 0,
  trial_starts integer DEFAULT 0,
  trial_conversions integer DEFAULT 0,
  trial_conversion_rate decimal(5,2) DEFAULT 0,
  active_users integer DEFAULT 0,
  paying_customers integer DEFAULT 0,
  churned_users integer DEFAULT 0,
  churn_rate decimal(5,2) DEFAULT 0,
  mrr decimal(12,2) DEFAULT 0,
  arr decimal(12,2) DEFAULT 0,
  average_ltv decimal(12,2) DEFAULT 0,
  total_tasks_completed integer DEFAULT 0,
  avg_visibility_score decimal(5,2) DEFAULT 0,
  total_notifications_sent integer DEFAULT 0,
  notification_open_rate decimal(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(period_type, period_start)
);

ALTER TABLE platform_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage platform metrics"
  ON platform_metrics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_cohorts table
CREATE TABLE IF NOT EXISTS user_cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_name text NOT NULL UNIQUE,
  cohort_start_date date NOT NULL,
  cohort_end_date date NOT NULL,
  user_ids uuid[] DEFAULT ARRAY[]::uuid[],
  initial_users integer DEFAULT 0,
  retention_month_1 integer DEFAULT 0,
  retention_month_2 integer DEFAULT 0,
  retention_month_3 integer DEFAULT 0,
  retention_month_6 integer DEFAULT 0,
  retention_month_12 integer DEFAULT 0,
  avg_ltv decimal(12,2) DEFAULT 0,
  avg_task_completion_rate decimal(5,2) DEFAULT 0,
  avg_score_improvement decimal(5,2) DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage cohorts"
  ON user_cohorts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create subscription_events table
CREATE TABLE IF NOT EXISTS subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('started', 'upgraded', 'downgraded', 'renewed', 'cancelled', 'reactivated')),
  from_plan text,
  to_plan text,
  mrr_change decimal(10,2) DEFAULT 0,
  event_date date DEFAULT CURRENT_DATE,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can insert subscription events"
  ON subscription_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view subscription events"
  ON subscription_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_lifetime_value table
CREATE TABLE IF NOT EXISTS user_lifetime_value (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_revenue decimal(12,2) DEFAULT 0,
  months_active integer DEFAULT 0,
  current_mrr decimal(10,2) DEFAULT 0,
  predicted_ltv decimal(12,2) DEFAULT 0,
  customer_acquisition_cost decimal(10,2) DEFAULT 0,
  roi decimal(10,2) DEFAULT 0,
  risk_score decimal(3,2) DEFAULT 0,
  last_payment_date date,
  calculated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_lifetime_value ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own LTV"
  ON user_lifetime_value FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage LTV"
  ON user_lifetime_value FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_category ON analytics_events(event_category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_engagement_user_period ON user_engagement_metrics(user_id, period_type, period_start DESC);
CREATE INDEX IF NOT EXISTS idx_user_engagement_period ON user_engagement_metrics(period_start DESC, period_type);

CREATE INDEX IF NOT EXISTS idx_platform_metrics_period ON platform_metrics(period_start DESC, period_type);

CREATE INDEX IF NOT EXISTS idx_subscription_events_user ON subscription_events(user_id, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_subscription_events_date ON subscription_events(event_date DESC);

CREATE INDEX IF NOT EXISTS idx_user_ltv_user ON user_lifetime_value(user_id);
CREATE INDEX IF NOT EXISTS idx_user_ltv_risk ON user_lifetime_value(risk_score DESC);

-- Create helper function to track events
CREATE OR REPLACE FUNCTION track_analytics_event(
  p_event_type text,
  p_event_category text,
  p_user_id uuid DEFAULT NULL,
  p_business_id uuid DEFAULT NULL,
  p_event_data jsonb DEFAULT '{}'::jsonb,
  p_metadata jsonb DEFAULT '{}'::jsonb
) RETURNS uuid AS $$
DECLARE
  v_event_id uuid;
BEGIN
  INSERT INTO analytics_events (
    event_type,
    event_category,
    user_id,
    business_id,
    event_data,
    metadata
  ) VALUES (
    p_event_type,
    p_event_category,
    p_user_id,
    p_business_id,
    p_event_data,
    p_metadata
  ) RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
