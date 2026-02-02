/*
  # Anti-Scraping Security System

  1. New Tables
    - `request_logs`
      - Tracks all requests to protected endpoints
      - Records IP address, fingerprint, endpoint, timestamp
      - Used for rate limiting analysis

    - `rate_limit_violations`
      - Records when rate limits are exceeded
      - Tracks IP and fingerprint for blocking decisions
      - Auto-expires after 24 hours

    - `browser_fingerprints`
      - Stores unique browser fingerprints
      - Flags suspicious patterns (bot-like behavior)
      - Tracks trust score over time

    - `captcha_verifications`
      - Records CAPTCHA challenges and completions
      - Prevents repeated automated access
      - Links to fingerprints and IPs

  2. Security
    - Enable RLS on all tables
    - Only authenticated admins can read logs
    - System functions bypass RLS for logging

  3. Functions
    - `check_rate_limit()` - Validates request rate
    - `log_request()` - Records protected endpoint access
    - `flag_suspicious_fingerprint()` - Marks bot-like patterns
*/

-- Request logging table
CREATE TABLE IF NOT EXISTS request_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  fingerprint_id text NOT NULL,
  endpoint text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  response_status smallint DEFAULT 200
);

CREATE INDEX IF NOT EXISTS idx_request_logs_ip_created ON request_logs(ip_address, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_request_logs_fingerprint_created ON request_logs(fingerprint_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_request_logs_endpoint ON request_logs(endpoint);

ALTER TABLE request_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view request logs"
  ON request_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Rate limit violations table
CREATE TABLE IF NOT EXISTS rate_limit_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  fingerprint_id text NOT NULL,
  endpoint text NOT NULL,
  violation_count int DEFAULT 1,
  blocked_until timestamptz DEFAULT (now() + interval '1 hour'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_violations_ip ON rate_limit_violations(ip_address, blocked_until);
CREATE INDEX IF NOT EXISTS idx_rate_violations_fingerprint ON rate_limit_violations(fingerprint_id, blocked_until);

ALTER TABLE rate_limit_violations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view rate violations"
  ON rate_limit_violations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Browser fingerprints table
CREATE TABLE IF NOT EXISTS browser_fingerprints (
  id text PRIMARY KEY,
  trust_score int DEFAULT 50,
  is_suspicious boolean DEFAULT false,
  is_blocked boolean DEFAULT false,
  first_seen timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now(),
  request_count int DEFAULT 0,
  user_agent text,
  characteristics jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_fingerprints_trust_score ON browser_fingerprints(trust_score);
CREATE INDEX IF NOT EXISTS idx_fingerprints_suspicious ON browser_fingerprints(is_suspicious, is_blocked);

ALTER TABLE browser_fingerprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view fingerprints"
  ON browser_fingerprints FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- CAPTCHA verifications table
CREATE TABLE IF NOT EXISTS captcha_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint_id text NOT NULL,
  ip_address inet NOT NULL,
  challenge_token text NOT NULL,
  verified boolean DEFAULT false,
  verified_at timestamptz,
  expires_at timestamptz DEFAULT (now() + interval '2 hours'),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_captcha_fingerprint ON captcha_verifications(fingerprint_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_captcha_token ON captcha_verifications(challenge_token);

ALTER TABLE captcha_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view CAPTCHA verifications"
  ON captcha_verifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_ip inet,
  p_fingerprint text,
  p_endpoint text,
  p_limit_per_minute int DEFAULT 10,
  p_limit_per_hour int DEFAULT 60
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count_minute int;
  v_count_hour int;
  v_is_blocked boolean;
  v_blocked_until timestamptz;
BEGIN
  -- Check if currently blocked
  SELECT blocked_until INTO v_blocked_until
  FROM rate_limit_violations
  WHERE (ip_address = p_ip OR fingerprint_id = p_fingerprint)
    AND blocked_until > now()
  ORDER BY blocked_until DESC
  LIMIT 1;

  IF v_blocked_until IS NOT NULL THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limit_exceeded',
      'blocked_until', v_blocked_until
    );
  END IF;

  -- Count requests in last minute
  SELECT COUNT(*) INTO v_count_minute
  FROM request_logs
  WHERE (ip_address = p_ip OR fingerprint_id = p_fingerprint)
    AND endpoint = p_endpoint
    AND created_at > now() - interval '1 minute';

  -- Count requests in last hour
  SELECT COUNT(*) INTO v_count_hour
  FROM request_logs
  WHERE (ip_address = p_ip OR fingerprint_id = p_fingerprint)
    AND endpoint = p_endpoint
    AND created_at > now() - interval '1 hour';

  -- Check if limits exceeded
  IF v_count_minute >= p_limit_per_minute OR v_count_hour >= p_limit_per_hour THEN
    -- Record violation
    INSERT INTO rate_limit_violations (ip_address, fingerprint_id, endpoint)
    VALUES (p_ip, p_fingerprint, p_endpoint)
    ON CONFLICT DO NOTHING;

    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limit_exceeded',
      'requests_per_minute', v_count_minute,
      'requests_per_hour', v_count_hour
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'requests_per_minute', v_count_minute,
    'requests_per_hour', v_count_hour
  );
END;
$$;

-- Function to log requests
CREATE OR REPLACE FUNCTION log_request(
  p_ip inet,
  p_fingerprint text,
  p_endpoint text,
  p_user_agent text,
  p_status int DEFAULT 200
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert request log
  INSERT INTO request_logs (ip_address, fingerprint_id, endpoint, user_agent, response_status)
  VALUES (p_ip, p_fingerprint, p_endpoint, p_user_agent, p_status);

  -- Update or insert fingerprint
  INSERT INTO browser_fingerprints (id, request_count, last_seen, user_agent)
  VALUES (p_fingerprint, 1, now(), p_user_agent)
  ON CONFLICT (id) DO UPDATE SET
    request_count = browser_fingerprints.request_count + 1,
    last_seen = now();
END;
$$;

-- Function to flag suspicious fingerprints
CREATE OR REPLACE FUNCTION flag_suspicious_fingerprint(
  p_fingerprint text,
  p_reason text DEFAULT 'automated_behavior'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE browser_fingerprints
  SET
    is_suspicious = true,
    trust_score = GREATEST(trust_score - 20, 0)
  WHERE id = p_fingerprint;
END;
$$;

-- Function to verify CAPTCHA
CREATE OR REPLACE FUNCTION verify_captcha(
  p_fingerprint text,
  p_ip inet,
  p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_verified boolean;
BEGIN
  -- Check if valid CAPTCHA exists
  SELECT verified INTO v_verified
  FROM captcha_verifications
  WHERE fingerprint_id = p_fingerprint
    AND challenge_token = p_token
    AND expires_at > now()
    AND verified = true
  LIMIT 1;

  IF v_verified THEN
    -- Improve trust score
    UPDATE browser_fingerprints
    SET
      trust_score = LEAST(trust_score + 10, 100),
      is_suspicious = false
    WHERE id = p_fingerprint;

    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- Cleanup old logs (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_security_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete request logs older than 7 days
  DELETE FROM request_logs
  WHERE created_at < now() - interval '7 days';

  -- Delete expired rate limit violations
  DELETE FROM rate_limit_violations
  WHERE blocked_until < now() - interval '24 hours';

  -- Delete expired CAPTCHA verifications
  DELETE FROM captcha_verifications
  WHERE expires_at < now();
END;
$$;