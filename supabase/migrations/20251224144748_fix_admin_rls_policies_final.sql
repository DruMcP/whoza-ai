/*
  # Fix Remaining Admin RLS Policies

  1. Problem
    - Admin RLS policies still re-evaluating auth.jwt() for each row
    - Need to wrap the entire auth.jwt() call in a subquery, not just the expression

  2. Solution  
    - Change from: (select auth.jwt()->>'role') = 'admin'
    - Change to: ((select auth.jwt())->>'role') = 'admin'
    - This ensures JWT is fetched once and reused

  3. Tables Fixed (37 policies)
    - users, benchmarks, tasks, visibility_scores
    - proof_snippets, task_templates, task_generation_state
    - task_generation_log, visibility_score_details
    - scoring_benchmarks, email_templates, email_campaigns
    - campaign_emails, email_logs, user_campaign_progress
    - notification_channels, notification_types, notification_templates
    - user_notification_preferences, notifications, notification_delivery_log
    - analytics_events, user_engagement_metrics, platform_metrics
    - user_cohorts, subscription_events, user_lifetime_value
*/

-- ============================================================================
-- USERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert users" ON users;
CREATE POLICY "Admin can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- BENCHMARKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert benchmarks" ON benchmarks;
CREATE POLICY "Admin can insert benchmarks"
  ON benchmarks FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update benchmarks" ON benchmarks;
CREATE POLICY "Admin can update benchmarks"
  ON benchmarks FOR UPDATE
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- TASKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert tasks" ON tasks;
CREATE POLICY "Admin can insert tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- VISIBILITY SCORES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert visibility scores" ON visibility_scores;
CREATE POLICY "Admin can insert visibility scores"
  ON visibility_scores FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update visibility scores" ON visibility_scores;
CREATE POLICY "Admin can update visibility scores"
  ON visibility_scores FOR UPDATE
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- PROOF SNIPPETS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert proof snippets" ON proof_snippets;
CREATE POLICY "Admin can insert proof snippets"
  ON proof_snippets FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update proof snippets" ON proof_snippets;
CREATE POLICY "Admin can update proof snippets"
  ON proof_snippets FOR UPDATE
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can delete proof snippets" ON proof_snippets;
CREATE POLICY "Admin can delete proof snippets"
  ON proof_snippets FOR DELETE
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- TASK TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage task templates" ON task_templates;
CREATE POLICY "Admin can manage task templates"
  ON task_templates FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- TASK GENERATION STATE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage all generation states" ON task_generation_state;
CREATE POLICY "Admin can manage all generation states"
  ON task_generation_state FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- TASK GENERATION LOG TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all generation logs" ON task_generation_log;
CREATE POLICY "Admin can view all generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- VISIBILITY SCORE DETAILS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all score details" ON visibility_score_details;
CREATE POLICY "Admin can view all score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can insert score details" ON visibility_score_details;
CREATE POLICY "Admin can insert score details"
  ON visibility_score_details FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update score details" ON visibility_score_details;
CREATE POLICY "Admin can update score details"
  ON visibility_score_details FOR UPDATE
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- SCORING BENCHMARKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage benchmarks" ON scoring_benchmarks;
CREATE POLICY "Admin can manage benchmarks"
  ON scoring_benchmarks FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- EMAIL TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage email templates" ON email_templates;
CREATE POLICY "Admin can manage email templates"
  ON email_templates FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- EMAIL CAMPAIGNS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage email campaigns" ON email_campaigns;
CREATE POLICY "Admin can manage email campaigns"
  ON email_campaigns FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- CAMPAIGN EMAILS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage campaign emails" ON campaign_emails;
CREATE POLICY "Admin can manage campaign emails"
  ON campaign_emails FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- EMAIL LOGS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all email logs" ON email_logs;
CREATE POLICY "Admin can view all email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can manage email logs" ON email_logs;
CREATE POLICY "Admin can manage email logs"
  ON email_logs FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- USER CAMPAIGN PROGRESS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage campaign progress" ON user_campaign_progress;
CREATE POLICY "Admin can manage campaign progress"
  ON user_campaign_progress FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION CHANNELS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage channels" ON notification_channels;
CREATE POLICY "Admin can manage channels"
  ON notification_channels FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION TYPES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage notification types" ON notification_types;
CREATE POLICY "Admin can manage notification types"
  ON notification_types FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage notification templates" ON notification_templates;
CREATE POLICY "Admin can manage notification templates"
  ON notification_templates FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- USER NOTIFICATION PREFERENCES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all preferences" ON user_notification_preferences;
CREATE POLICY "Admin can view all preferences"
  ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage all notifications" ON notifications;
CREATE POLICY "Admin can manage all notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION DELIVERY LOG TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can view all delivery logs"
  ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can insert delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can insert delivery logs"
  ON notification_delivery_log FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- ANALYTICS EVENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all events" ON analytics_events;
CREATE POLICY "Admin can view all events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- USER ENGAGEMENT METRICS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all user metrics" ON user_engagement_metrics;
CREATE POLICY "Admin can view all user metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- PLATFORM METRICS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage platform metrics" ON platform_metrics;
CREATE POLICY "Admin can manage platform metrics"
  ON platform_metrics FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- USER COHORTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage cohorts" ON user_cohorts;
CREATE POLICY "Admin can manage cohorts"
  ON user_cohorts FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- SUBSCRIPTION EVENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view subscription events" ON subscription_events;
CREATE POLICY "Admin can view subscription events"
  ON subscription_events FOR SELECT
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin');

-- ============================================================================
-- USER LIFETIME VALUE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage LTV" ON user_lifetime_value;
CREATE POLICY "Admin can manage LTV"
  ON user_lifetime_value FOR ALL
  TO authenticated
  USING (((select auth.jwt())->>'role') = 'admin')
  WITH CHECK (((select auth.jwt())->>'role') = 'admin');
