/*
  # Fix Function Search Paths for Security

  1. Problem
    - Functions have role mutable search_path which is a security vulnerability
    - Attackers could potentially manipulate search_path to execute malicious code

  2. Solution
    - Recreate functions with explicit search_path set to 'public'
    - This makes the search_path immutable and secure

  3. Functions Fixed
    - update_updated_at_column
    - track_analytics_event
    - update_integration_updated_at

  4. Impact
    - Enhanced security
    - Prevents search_path manipulation attacks
    - No functional changes to existing behavior
*/

-- ============================================================================
-- Fix update_updated_at_column function
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- Fix track_analytics_event function
-- ============================================================================

CREATE OR REPLACE FUNCTION track_analytics_event(
  p_user_id uuid,
  p_event_type text,
  p_event_category text,
  p_event_data jsonb DEFAULT '{}'::jsonb,
  p_business_id uuid DEFAULT NULL
)
RETURNS uuid
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_event_id uuid;
BEGIN
  INSERT INTO analytics_events (
    user_id,
    event_type,
    event_category,
    event_data,
    business_id
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_category,
    p_event_data,
    p_business_id
  )
  RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$;

-- ============================================================================
-- Fix update_integration_updated_at function
-- ============================================================================

CREATE OR REPLACE FUNCTION update_integration_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
