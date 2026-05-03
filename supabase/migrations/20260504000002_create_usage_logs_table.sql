-- Usage Logs Table: Tracks daily call minute consumption per client

CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  date DATE NOT NULL,
  minutes_used INTEGER NOT NULL DEFAULT 0,
  minutes_remaining INTEGER NOT NULL DEFAULT 0,
  plan_allowance INTEGER NOT NULL,
  overage_minutes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_client_id ON usage_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_date ON usage_logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_client_date ON usage_logs(client_id, date DESC);

-- RLS policies
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own usage logs"
  ON usage_logs FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Service role can manage all usage logs"
  ON usage_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE usage_logs IS 'Daily call minute usage tracking for billing and alerts';
COMMENT ON COLUMN usage_logs.plan_allowance IS 'Minutes included in the client plan for the month';
COMMENT ON COLUMN usage_logs.overage_minutes IS 'Minutes consumed beyond plan allowance (billed at £0.22/min)';
