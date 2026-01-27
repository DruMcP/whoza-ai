-- Migration: Create Free Trial System
-- Description: Adds database schema and functions to support the Free Trial plan
-- Author: Manus AI
-- Date: 2026-01-27

-- ============================================================================
-- 1. Add Free Trial columns to users table
-- ============================================================================

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS trial_started_at timestamptz,
ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz,
ADD COLUMN IF NOT EXISTS trial_used boolean DEFAULT false NOT NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_trial_ends_at ON public.users(trial_ends_at) WHERE trial_ends_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_trial_used ON public.users(trial_used) WHERE trial_used = false;

-- ============================================================================
-- 2. Add Free Trial columns to stripe_subscriptions table
-- ============================================================================

ALTER TABLE public.stripe_subscriptions
ADD COLUMN IF NOT EXISTS trial_plan_id text;

-- ============================================================================
-- 3. Create function to start a free trial
-- ============================================================================

CREATE OR REPLACE FUNCTION public.start_free_trial(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_trial_duration_days integer := 90;
  v_result json;
BEGIN
  -- Check if user is eligible for a free trial
  IF EXISTS (
    SELECT 1 FROM public.users
    WHERE id = p_user_id AND trial_used = true
  ) THEN
    RAISE EXCEPTION 'User has already used their free trial';
  END IF;

  -- Start the trial
  UPDATE public.users
  SET
    trial_started_at = now(),
    trial_ends_at = now() + (v_trial_duration_days || ' days')::interval,
    trial_used = true,
    updated_at = now()
  WHERE id = p_user_id;

  -- Return trial information
  SELECT json_build_object(
    'user_id', p_user_id,
    'trial_started_at', trial_started_at,
    'trial_ends_at', trial_ends_at,
    'trial_duration_days', v_trial_duration_days
  ) INTO v_result
  FROM public.users
  WHERE id = p_user_id;

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.start_free_trial(uuid) TO authenticated;

-- ============================================================================
-- 4. Create function to check trial eligibility
-- ============================================================================

CREATE OR REPLACE FUNCTION public.check_trial_eligibility(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_trial_used boolean;
BEGIN
  SELECT trial_used INTO v_trial_used
  FROM public.users
  WHERE id = p_user_id;

  -- User is eligible if they haven't used their trial yet
  RETURN COALESCE(v_trial_used, false) = false;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_trial_eligibility(uuid) TO authenticated;

-- ============================================================================
-- 5. Create function to get trial status
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_trial_status(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result json;
  v_trial_started_at timestamptz;
  v_trial_ends_at timestamptz;
  v_trial_used boolean;
  v_is_active boolean;
  v_days_remaining integer;
BEGIN
  -- Get trial information
  SELECT trial_started_at, trial_ends_at, trial_used
  INTO v_trial_started_at, v_trial_ends_at, v_trial_used
  FROM public.users
  WHERE id = p_user_id;

  -- Determine if trial is active
  v_is_active := v_trial_started_at IS NOT NULL
    AND v_trial_ends_at IS NOT NULL
    AND v_trial_ends_at > now();

  -- Calculate days remaining
  IF v_is_active THEN
    v_days_remaining := EXTRACT(DAY FROM (v_trial_ends_at - now()))::integer;
  ELSE
    v_days_remaining := 0;
  END IF;

  -- Build result
  v_result := json_build_object(
    'user_id', p_user_id,
    'trial_started_at', v_trial_started_at,
    'trial_ends_at', v_trial_ends_at,
    'trial_used', COALESCE(v_trial_used, false),
    'is_active', v_is_active,
    'days_remaining', v_days_remaining
  );

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_trial_status(uuid) TO authenticated;

-- ============================================================================
-- 6. Create function to upgrade from trial
-- ============================================================================

CREATE OR REPLACE FUNCTION public.upgrade_from_trial(
  p_user_id uuid,
  p_new_plan_id text,
  p_stripe_subscription_id text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result json;
BEGIN
  -- Update user's trial status (trial is now complete)
  UPDATE public.users
  SET updated_at = now()
  WHERE id = p_user_id;

  -- Update or insert stripe subscription
  INSERT INTO public.stripe_subscriptions (
    user_id,
    subscription_id,
    status,
    plan_id,
    trial_plan_id,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_stripe_subscription_id,
    'active',
    p_new_plan_id,
    NULL,
    now(),
    now()
  )
  ON CONFLICT (subscription_id)
  DO UPDATE SET
    status = 'active',
    plan_id = p_new_plan_id,
    updated_at = now();

  -- Return result
  v_result := json_build_object(
    'user_id', p_user_id,
    'new_plan_id', p_new_plan_id,
    'subscription_id', p_stripe_subscription_id,
    'upgraded_at', now()
  );

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.upgrade_from_trial(uuid, text, text) TO authenticated;

-- ============================================================================
-- 7. Update RLS policies for trial users
-- ============================================================================

-- Users can read their own trial status
CREATE POLICY IF NOT EXISTS "Users can read own trial status"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- ============================================================================
-- 8. Add comments for documentation
-- ============================================================================

COMMENT ON COLUMN public.users.trial_started_at IS 'Timestamp when the user started their free trial';
COMMENT ON COLUMN public.users.trial_ends_at IS 'Timestamp when the user''s free trial ends';
COMMENT ON COLUMN public.users.trial_used IS 'Whether the user has used their one-time free trial';
COMMENT ON COLUMN public.stripe_subscriptions.trial_plan_id IS 'ID of the trial plan if this subscription started as a trial';

COMMENT ON FUNCTION public.start_free_trial(uuid) IS 'Starts a 90-day free trial for a user (one-time only)';
COMMENT ON FUNCTION public.check_trial_eligibility(uuid) IS 'Checks if a user is eligible for a free trial';
COMMENT ON FUNCTION public.get_trial_status(uuid) IS 'Returns the current status of a user''s free trial';
COMMENT ON FUNCTION public.upgrade_from_trial(uuid, text, text) IS 'Upgrades a user from a free trial to a paid plan';
