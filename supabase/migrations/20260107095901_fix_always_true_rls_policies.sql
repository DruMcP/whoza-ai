/*
  # Fix RLS Policies That Are Always True

  ## Overview
  Replaces "always true" RLS policies with proper security checks.
  These policies were effectively bypassing security by allowing all access.

  ## Changes
  - analytics_events: Require service role or user ownership
  - free_score_submissions: Validate required fields
  - integration_sync_log: Require service role or user ownership
  - integration_webhooks: Require service role or user ownership
  - stripe_webhook_events: Require service role only
  - subscription_events: Require service role only
  - task_generation_log: Require service role or user ownership
*/

-- Fix analytics_events INSERT policy
DROP POLICY IF EXISTS "System can insert events" ON public.analytics_events;
CREATE POLICY "System can insert events"
  ON public.analytics_events FOR INSERT TO authenticated
  WITH CHECK (
    (select auth.jwt()->>'role') = 'service_role'
    OR (user_id = (select auth.uid()))
  );

-- Fix free_score_submissions INSERT policy
DROP POLICY IF EXISTS "Anonymous users can submit free scores" ON public.free_score_submissions;
CREATE POLICY "Anonymous users can submit free scores"
  ON public.free_score_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email != ''
    AND business_name IS NOT NULL
    AND business_name != ''
    AND length(email) <= 255
    AND length(business_name) <= 255
  );

-- Fix integration_sync_log INSERT policy
DROP POLICY IF EXISTS "System inserts sync logs" ON public.integration_sync_log;
CREATE POLICY "System inserts sync logs"
  ON public.integration_sync_log FOR INSERT TO authenticated
  WITH CHECK (
    (select auth.jwt()->>'role') = 'service_role'
    OR user_integration_id IN (
      SELECT ui.id FROM public.user_integrations ui
      WHERE ui.user_id = (select auth.uid())
    )
  );

-- Fix integration_webhooks INSERT policy
DROP POLICY IF EXISTS "System inserts webhooks" ON public.integration_webhooks;
CREATE POLICY "System inserts webhooks"
  ON public.integration_webhooks FOR INSERT TO authenticated
  WITH CHECK (
    (select auth.jwt()->>'role') = 'service_role'
    OR user_integration_id IN (
      SELECT ui.id FROM public.user_integrations ui
      WHERE ui.user_id = (select auth.uid())
    )
  );

-- Fix stripe_webhook_events INSERT policy
DROP POLICY IF EXISTS "System inserts webhook events" ON public.stripe_webhook_events;
CREATE POLICY "System inserts webhook events"
  ON public.stripe_webhook_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix subscription_events INSERT policy
DROP POLICY IF EXISTS "System can insert subscription events" ON public.subscription_events;
CREATE POLICY "System can insert subscription events"
  ON public.subscription_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

-- Fix task_generation_log INSERT policy
DROP POLICY IF EXISTS "System can insert generation logs" ON public.task_generation_log;
CREATE POLICY "System can insert generation logs"
  ON public.task_generation_log FOR INSERT TO authenticated
  WITH CHECK (
    (select auth.jwt()->>'role') = 'service_role'
    OR user_id = (select auth.uid())
  );
