/*
  # Fix track_analytics_event Function Search Path

  1. Problem
    - Function has role mutable search_path vulnerability
    - Could be exploited for privilege escalation

  2. Solution
    - Recreate function with explicit immutable search_path
    - Set search_path = public to prevent manipulation

  3. Impact
    - Enhanced security
    - No functional changes
*/

-- Drop and recreate with secure search_path
DROP FUNCTION IF EXISTS track_analytics_event(text, text, uuid, uuid, jsonb, jsonb);

CREATE OR REPLACE FUNCTION track_analytics_event(
  p_event_type text,
  p_event_category text,
  p_user_id uuid DEFAULT NULL,
  p_business_id uuid DEFAULT NULL,
  p_event_data jsonb DEFAULT '{}'::jsonb,
  p_metadata jsonb DEFAULT '{}'::jsonb
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
$$;
