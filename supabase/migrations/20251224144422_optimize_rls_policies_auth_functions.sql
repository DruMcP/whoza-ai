/*
  # Optimize RLS Policies for Performance

  1. Problem
    - RLS policies using auth.uid() directly re-evaluate for each row
    - This causes suboptimal performance at scale
    
  2. Solution
    - Replace auth.uid() with (select auth.uid())
    - This evaluates once and uses the result as a constant
    
  3. Impact
    - Significantly improved query performance
    - Better scalability for large datasets
    - Reduced database load

  4. Tables Updated
    - All tables with RLS policies using auth functions
*/

-- Drop and recreate all affected RLS policies with optimized auth function calls

-- ============================================================================
-- USERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can insert users" ON users;
CREATE POLICY "Admin can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- BUSINESS PROFILES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own business profile" ON business_profiles;
CREATE POLICY "Users can view own business profile"
  ON business_profiles FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own business profile" ON business_profiles;
CREATE POLICY "Users can update own business profile"
  ON business_profiles FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own business profile" ON business_profiles;
CREATE POLICY "Users can insert own business profile"
  ON business_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- ============================================================================
-- BENCHMARKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own benchmarks" ON benchmarks;
CREATE POLICY "Users can view own benchmarks"
  ON benchmarks FOR SELECT
  TO authenticated
  USING (business_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can insert benchmarks" ON benchmarks;
CREATE POLICY "Admin can insert benchmarks"
  ON benchmarks FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update benchmarks" ON benchmarks;
CREATE POLICY "Admin can update benchmarks"
  ON benchmarks FOR UPDATE
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- VISIBILITY SCORES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own visibility scores" ON visibility_scores;
CREATE POLICY "Users can view own visibility scores"
  ON visibility_scores FOR SELECT
  TO authenticated
  USING (business_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can insert visibility scores" ON visibility_scores;
CREATE POLICY "Admin can insert visibility scores"
  ON visibility_scores FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update visibility scores" ON visibility_scores;
CREATE POLICY "Admin can update visibility scores"
  ON visibility_scores FOR UPDATE
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- TASKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own tasks" ON tasks;
CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (business_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own tasks for approval" ON tasks;
CREATE POLICY "Users can update own tasks for approval"
  ON tasks FOR UPDATE
  TO authenticated
  USING (business_id = (select auth.uid()))
  WITH CHECK (business_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can insert tasks" ON tasks;
CREATE POLICY "Admin can insert tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- PROOF SNIPPETS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can insert proof snippets" ON proof_snippets;
CREATE POLICY "Admin can insert proof snippets"
  ON proof_snippets FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update proof snippets" ON proof_snippets;
CREATE POLICY "Admin can update proof snippets"
  ON proof_snippets FOR UPDATE
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can delete proof snippets" ON proof_snippets;
CREATE POLICY "Admin can delete proof snippets"
  ON proof_snippets FOR DELETE
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- TASK TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage task templates" ON task_templates;
CREATE POLICY "Admin can manage task templates"
  ON task_templates FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- TASK GENERATION STATE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own generation state" ON task_generation_state;
CREATE POLICY "Users can view own generation state"
  ON task_generation_state FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own generation state" ON task_generation_state;
CREATE POLICY "Users can update own generation state"
  ON task_generation_state FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own generation state" ON task_generation_state;
CREATE POLICY "Users can insert own generation state"
  ON task_generation_state FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can manage all generation states" ON task_generation_state;
CREATE POLICY "Admin can manage all generation states"
  ON task_generation_state FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- TASK GENERATION LOG TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own generation logs" ON task_generation_log;
CREATE POLICY "Users can view own generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all generation logs" ON task_generation_log;
CREATE POLICY "Admin can view all generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "System can insert generation logs" ON task_generation_log;
CREATE POLICY "System can insert generation logs"
  ON task_generation_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- VISIBILITY SCORE DETAILS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own score details" ON visibility_score_details;
CREATE POLICY "Users can view own score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (business_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all score details" ON visibility_score_details;
CREATE POLICY "Admin can view all score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can insert score details" ON visibility_score_details;
CREATE POLICY "Admin can insert score details"
  ON visibility_score_details FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can update score details" ON visibility_score_details;
CREATE POLICY "Admin can update score details"
  ON visibility_score_details FOR UPDATE
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- SCORING BENCHMARKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage benchmarks" ON scoring_benchmarks;
CREATE POLICY "Admin can manage benchmarks"
  ON scoring_benchmarks FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- EMAIL TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage email templates" ON email_templates;
CREATE POLICY "Admin can manage email templates"
  ON email_templates FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- EMAIL CAMPAIGNS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage email campaigns" ON email_campaigns;
CREATE POLICY "Admin can manage email campaigns"
  ON email_campaigns FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- CAMPAIGN EMAILS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage campaign emails" ON campaign_emails;
CREATE POLICY "Admin can manage campaign emails"
  ON campaign_emails FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- EMAIL LOGS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own email logs" ON email_logs;
CREATE POLICY "Users can view own email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all email logs" ON email_logs;
CREATE POLICY "Admin can view all email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can manage email logs" ON email_logs;
CREATE POLICY "Admin can manage email logs"
  ON email_logs FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER CAMPAIGN PROGRESS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own campaign progress" ON user_campaign_progress;
CREATE POLICY "Users can view own campaign progress"
  ON user_campaign_progress FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can manage campaign progress" ON user_campaign_progress;
CREATE POLICY "Admin can manage campaign progress"
  ON user_campaign_progress FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION CHANNELS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage channels" ON notification_channels;
CREATE POLICY "Admin can manage channels"
  ON notification_channels FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION TYPES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage notification types" ON notification_types;
CREATE POLICY "Admin can manage notification types"
  ON notification_types FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION TEMPLATES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage notification templates" ON notification_templates;
CREATE POLICY "Admin can manage notification templates"
  ON notification_templates FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER NOTIFICATION PREFERENCES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own preferences" ON user_notification_preferences;
CREATE POLICY "Users can view own preferences"
  ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can manage own preferences" ON user_notification_preferences;
CREATE POLICY "Users can manage own preferences"
  ON user_notification_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own preferences" ON user_notification_preferences;
CREATE POLICY "Users can update own preferences"
  ON user_notification_preferences FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all preferences" ON user_notification_preferences;
CREATE POLICY "Admin can view all preferences"
  ON user_notification_preferences FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can manage all notifications" ON notifications;
CREATE POLICY "Admin can manage all notifications"
  ON notifications FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- NOTIFICATION DELIVERY LOG TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own delivery logs" ON notification_delivery_log;
CREATE POLICY "Users can view own delivery logs"
  ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can view all delivery logs"
  ON notification_delivery_log FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

DROP POLICY IF EXISTS "Admin can insert delivery logs" ON notification_delivery_log;
CREATE POLICY "Admin can insert delivery logs"
  ON notification_delivery_log FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- ANALYTICS EVENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view all events" ON analytics_events;
CREATE POLICY "Admin can view all events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER ENGAGEMENT METRICS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own metrics" ON user_engagement_metrics;
CREATE POLICY "Users can view own metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can view all user metrics" ON user_engagement_metrics;
CREATE POLICY "Admin can view all user metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- PLATFORM METRICS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage platform metrics" ON platform_metrics;
CREATE POLICY "Admin can manage platform metrics"
  ON platform_metrics FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER COHORTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can manage cohorts" ON user_cohorts;
CREATE POLICY "Admin can manage cohorts"
  ON user_cohorts FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- SUBSCRIPTION EVENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admin can view subscription events" ON subscription_events;
CREATE POLICY "Admin can view subscription events"
  ON subscription_events FOR SELECT
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER LIFETIME VALUE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own LTV" ON user_lifetime_value;
CREATE POLICY "Users can view own LTV"
  ON user_lifetime_value FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admin can manage LTV" ON user_lifetime_value;
CREATE POLICY "Admin can manage LTV"
  ON user_lifetime_value FOR ALL
  TO authenticated
  USING ((select auth.jwt()->>'role') = 'admin')
  WITH CHECK ((select auth.jwt()->>'role') = 'admin');

-- ============================================================================
-- USER INTEGRATIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own integrations" ON user_integrations;
CREATE POLICY "Users view own integrations"
  ON user_integrations FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users insert own integrations" ON user_integrations;
CREATE POLICY "Users insert own integrations"
  ON user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own integrations" ON user_integrations;
CREATE POLICY "Users update own integrations"
  ON user_integrations FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own integrations" ON user_integrations;
CREATE POLICY "Users delete own integrations"
  ON user_integrations FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- INTEGRATION CREDENTIALS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own credentials" ON integration_credentials;
CREATE POLICY "Users view own credentials"
  ON integration_credentials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users insert own credentials" ON integration_credentials;
CREATE POLICY "Users insert own credentials"
  ON integration_credentials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users update own credentials" ON integration_credentials;
CREATE POLICY "Users update own credentials"
  ON integration_credentials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users delete own credentials" ON integration_credentials;
CREATE POLICY "Users delete own credentials"
  ON integration_credentials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

-- ============================================================================
-- INTEGRATION WEBHOOKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own webhooks" ON integration_webhooks;
CREATE POLICY "Users view own webhooks"
  ON integration_webhooks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_webhooks.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

-- ============================================================================
-- INTEGRATION SYNC LOG TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own sync logs" ON integration_sync_log;
CREATE POLICY "Users view own sync logs"
  ON integration_sync_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_sync_log.user_integration_id
      AND ui.user_id = (select auth.uid())
    )
  );

-- ============================================================================
-- STRIPE CUSTOMERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own stripe customer" ON stripe_customers;
CREATE POLICY "Users view own stripe customer"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- STRIPE SUBSCRIPTIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own subscriptions" ON stripe_subscriptions;
CREATE POLICY "Users view own subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- STRIPE INVOICES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own invoices" ON stripe_invoices;
CREATE POLICY "Users view own invoices"
  ON stripe_invoices FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- STRIPE PAYMENT METHODS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own payment methods" ON stripe_payment_methods;
CREATE POLICY "Users view own payment methods"
  ON stripe_payment_methods FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- STRIPE WEBHOOK EVENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Users view own webhook events" ON stripe_webhook_events;
CREATE POLICY "Users view own webhook events"
  ON stripe_webhook_events FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));
