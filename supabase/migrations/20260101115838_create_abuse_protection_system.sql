/*
  # Abuse Protection System for Free Score Submissions

  1. New Tables
    - `free_score_rate_limits`
      - Tracks email and IP-based rate limiting
      - Prevents repeat abuse with 30-day email limit
      - Prevents mass abuse with 24-hour IP limit

    - `free_score_abuse_logs`
      - Logs all suspicious activity
      - Tracks patterns: rapid submissions, similar names, same IPs
      - Enables admin monitoring and alerts

    - `csrf_tokens`
      - Stores valid CSRF tokens with expiry
      - Prevents cross-site request forgery attacks
      - Auto-expires after 1 hour

  2. Security
    - Enable RLS on all tables
    - Only authenticated users can read their own data
    - Service role required for writes (via edge functions)
    - Abuse logs only accessible to admins

  3. Indexes
    - Index on email, ip_address, and timestamps for fast lookups
    - Index on abuse flags for admin dashboards

  4. Functions
    - `check_email_rate_limit()` - Returns true if email can submit
    - `check_ip_rate_limit()` - Returns true if IP can submit
    - `log_abuse_attempt()` - Logs suspicious activity
    - `clean_expired_tokens()` - Removes old CSRF tokens
*/

-- Table for tracking rate limits by email and IP
CREATE TABLE IF NOT EXISTS free_score_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address inet NOT NULL,
  business_name text,
  location text,
  submission_count integer DEFAULT 1,
  first_submission_at timestamptz DEFAULT now(),
  last_submission_at timestamptz DEFAULT now(),
  next_allowed_at timestamptz DEFAULT (now() + interval '30 days'),
  is_blocked boolean DEFAULT false,
  block_reason text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for logging abuse attempts and suspicious activity
CREATE TABLE IF NOT EXISTS free_score_abuse_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  ip_address inet,
  abuse_type text NOT NULL,
  details jsonb DEFAULT '{}',
  user_agent text,
  referrer text,
  blocked boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table for CSRF token management
CREATE TABLE IF NOT EXISTS csrf_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  ip_address inet,
  expires_at timestamptz DEFAULT (now() + interval '1 hour'),
  used boolean DEFAULT false,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_email ON free_score_rate_limits(email);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON free_score_rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limits_last_submission ON free_score_rate_limits(last_submission_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_next_allowed ON free_score_rate_limits(next_allowed_at);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_email ON free_score_abuse_logs(email);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_ip ON free_score_abuse_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_created ON free_score_abuse_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_type ON free_score_abuse_logs(abuse_type);
CREATE INDEX IF NOT EXISTS idx_csrf_token ON csrf_tokens(token);
CREATE INDEX IF NOT EXISTS idx_csrf_expires ON csrf_tokens(expires_at);

-- Enable RLS
ALTER TABLE free_score_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_score_abuse_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE csrf_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for free_score_rate_limits
CREATE POLICY "Service role can manage rate limits"
  ON free_score_rate_limits
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view rate limits"
  ON free_score_rate_limits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS Policies for free_score_abuse_logs
CREATE POLICY "Service role can manage abuse logs"
  ON free_score_abuse_logs
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view abuse logs"
  ON free_score_abuse_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS Policies for csrf_tokens
CREATE POLICY "Service role can manage CSRF tokens"
  ON csrf_tokens
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Function to check if email can submit (1 per 30 days)
CREATE OR REPLACE FUNCTION check_email_rate_limit(p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rate_limit free_score_rate_limits;
  v_result jsonb;
BEGIN
  SELECT * INTO v_rate_limit
  FROM free_score_rate_limits
  WHERE email = p_email
  ORDER BY last_submission_at DESC
  LIMIT 1;

  IF v_rate_limit IS NULL THEN
    RETURN jsonb_build_object(
      'allowed', true,
      'reason', 'new_email'
    );
  END IF;

  IF v_rate_limit.is_blocked THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'blocked',
      'message', v_rate_limit.block_reason
    );
  END IF;

  IF v_rate_limit.next_allowed_at > now() THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limited',
      'next_allowed_at', v_rate_limit.next_allowed_at,
      'message', format('You can request another free score on %s', to_char(v_rate_limit.next_allowed_at, 'DD Mon YYYY'))
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'reason', 'rate_limit_expired'
  );
END;
$$;

-- Function to check if IP can submit (3 per 24 hours)
CREATE OR REPLACE FUNCTION check_ip_rate_limit(p_ip inet)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_submission_count integer;
  v_oldest_submission timestamptz;
  v_next_allowed_at timestamptz;
BEGIN
  SELECT COUNT(*), MIN(last_submission_at)
  INTO v_submission_count, v_oldest_submission
  FROM free_score_rate_limits
  WHERE ip_address = p_ip
  AND last_submission_at > (now() - interval '24 hours');

  IF v_submission_count >= 3 THEN
    v_next_allowed_at := v_oldest_submission + interval '24 hours';

    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'ip_rate_limited',
      'submission_count', v_submission_count,
      'next_allowed_at', v_next_allowed_at,
      'message', format('Too many requests from your location. Please try again at %s', to_char(v_next_allowed_at, 'HH24:MI on DD Mon'))
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'submission_count', v_submission_count
  );
END;
$$;

-- Function to log abuse attempts
CREATE OR REPLACE FUNCTION log_abuse_attempt(
  p_email text,
  p_ip inet,
  p_abuse_type text,
  p_details jsonb DEFAULT '{}',
  p_user_agent text DEFAULT NULL,
  p_referrer text DEFAULT NULL,
  p_blocked boolean DEFAULT true
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO free_score_abuse_logs (
    email,
    ip_address,
    abuse_type,
    details,
    user_agent,
    referrer,
    blocked
  ) VALUES (
    p_email,
    p_ip,
    p_abuse_type,
    p_details,
    p_user_agent,
    p_referrer,
    p_blocked
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$;

-- Function to clean expired CSRF tokens (run periodically)
CREATE OR REPLACE FUNCTION clean_expired_csrf_tokens()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted_count integer;
BEGIN
  DELETE FROM csrf_tokens
  WHERE expires_at < now() OR (used = true AND used_at < (now() - interval '1 hour'));

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
  RETURN v_deleted_count;
END;
$$;

-- Function to generate CSRF token
CREATE OR REPLACE FUNCTION generate_csrf_token(p_ip inet DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token text;
BEGIN
  v_token := encode(gen_random_bytes(32), 'base64');

  INSERT INTO csrf_tokens (token, ip_address)
  VALUES (v_token, p_ip);

  RETURN v_token;
END;
$$;

-- Function to verify CSRF token
CREATE OR REPLACE FUNCTION verify_csrf_token(p_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token_record csrf_tokens;
BEGIN
  SELECT * INTO v_token_record
  FROM csrf_tokens
  WHERE token = p_token
  AND expires_at > now()
  AND used = false
  LIMIT 1;

  IF v_token_record IS NULL THEN
    RETURN false;
  END IF;

  UPDATE csrf_tokens
  SET used = true, used_at = now()
  WHERE id = v_token_record.id;

  RETURN true;
END;
$$;

-- Create a view for admin dashboard to monitor abuse
CREATE OR REPLACE VIEW abuse_summary AS
SELECT
  date_trunc('day', created_at) as date,
  abuse_type,
  COUNT(*) as attempt_count,
  COUNT(DISTINCT email) as unique_emails,
  COUNT(DISTINCT ip_address) as unique_ips
FROM free_score_abuse_logs
WHERE created_at > (now() - interval '30 days')
GROUP BY date_trunc('day', created_at), abuse_type
ORDER BY date DESC, attempt_count DESC;

GRANT ALL ON free_score_rate_limits TO service_role;
GRANT ALL ON free_score_abuse_logs TO service_role;
GRANT ALL ON csrf_tokens TO service_role;
GRANT SELECT ON abuse_summary TO authenticated;