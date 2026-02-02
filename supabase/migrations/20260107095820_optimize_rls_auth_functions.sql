/*
  # Optimize RLS Policies - Wrap Auth Functions

  ## Overview
  Wraps auth function calls in SELECT statements to improve query performance.
  This prevents the auth functions from being re-evaluated for each row.

  ## Changes
  - free_score_abuse_logs: Optimize service role check
  - csrf_tokens: Optimize service role check
  - free_score_rate_limits: Optimize service role check
  - browser_fingerprints: Optimize service role check
  - captcha_verifications: Optimize service role check
*/

DROP POLICY IF EXISTS "Service role can manage abuse logs" ON public.free_score_abuse_logs;
CREATE POLICY "Service role can manage abuse logs"
  ON public.free_score_abuse_logs FOR ALL TO authenticated
  USING ((select auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

DROP POLICY IF EXISTS "Service role can manage CSRF tokens" ON public.csrf_tokens;
CREATE POLICY "Service role can manage CSRF tokens"
  ON public.csrf_tokens FOR ALL TO authenticated
  USING ((select auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.free_score_rate_limits;
CREATE POLICY "Service role can manage rate limits"
  ON public.free_score_rate_limits FOR ALL TO authenticated
  USING ((select auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

DROP POLICY IF EXISTS "Service role can manage browser fingerprints" ON public.browser_fingerprints;
CREATE POLICY "Service role can manage browser fingerprints"
  ON public.browser_fingerprints FOR ALL TO authenticated
  USING ((select auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');

DROP POLICY IF EXISTS "Service role can manage captcha verifications" ON public.captcha_verifications;
CREATE POLICY "Service role can manage captcha verifications"
  ON public.captcha_verifications FOR ALL TO authenticated
  USING ((select auth.jwt()->>'role') = 'service_role')
  WITH CHECK ((select auth.jwt()->>'role') = 'service_role');
