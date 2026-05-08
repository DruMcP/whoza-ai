-- Trillet Calls Table: Stores all voice call events from Trillet

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  call_id TEXT NOT NULL UNIQUE,
  agent_id TEXT,
  workspace_id TEXT,
  event_type TEXT,
  status TEXT NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'completed', 'qualified', 'booked', 'transferred', 'voicemail', 'missed', 'declined', 'accepted', 'callback_scheduled', 'new')),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  recording_url TEXT,
  transcript TEXT,
  caller_number TEXT,
  caller_name TEXT,
  outcome TEXT CHECK (outcome IN ('booked', 'qualified', 'voicemail', 'transferred', 'missed')),
  custom_variables JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_calls_client_id ON calls(client_id);
CREATE INDEX IF NOT EXISTS idx_calls_call_id ON calls(call_id);
CREATE INDEX IF NOT EXISTS idx_calls_status ON calls(status);
CREATE INDEX IF NOT EXISTS idx_calls_created_at ON calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON calls(started_at DESC);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_calls_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calls_updated_at
  BEFORE UPDATE ON calls
  FOR EACH ROW
  EXECUTE FUNCTION update_calls_updated_at();

-- RLS policies
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own calls"
  ON calls FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Service role can manage all calls"
  ON calls FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE calls IS 'All voice calls handled by the Trillet AI agent';
COMMENT ON COLUMN calls.call_id IS 'Trillet call ID (unique external reference)';
COMMENT ON COLUMN calls.custom_variables IS 'JSON blob with qualification data extracted during the call';

-- ─── Add action columns to existing enquiries table ───

ALTER TABLE enquiries 
  ADD COLUMN IF NOT EXISTS action_taken TEXT,
  ADD COLUMN IF NOT EXISTS action_reason TEXT,
  ADD COLUMN IF NOT EXISTS callback_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS action_notes TEXT,
  ADD COLUMN IF NOT EXISTS action_at TIMESTAMPTZ;

-- Update status check constraint to match new statuses
ALTER TABLE enquiries 
  DROP CONSTRAINT IF EXISTS enquiries_status_check,
  ADD CONSTRAINT enquiries_status_check 
  CHECK (status IN ('new', 'accepted', 'callback_scheduled', 'declined', 'completed'));

-- Index for action tracking
CREATE INDEX IF NOT EXISTS idx_enquiries_action_at ON enquiries(action_at DESC);

-- ─── Appointments table for Trillet appointment.booked events ───

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT NOT NULL,
  agent_id TEXT,
  appointment_date DATE,
  appointment_time TIME,
  service_type TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_call_id ON appointments(call_id);
CREATE INDEX IF NOT EXISTS idx_appointments_customer_phone ON appointments(customer_phone);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() IN (
    SELECT client_id FROM enquiries WHERE call_id = appointments.call_id
  ));

CREATE POLICY "Service role can manage all appointments"
  ON appointments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─── Leads table for Trillet lead.captured events ───

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT NOT NULL,
  agent_id TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  source TEXT DEFAULT 'trillet_voice',
  custom_variables JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_call_id ON leads(call_id);
CREATE INDEX IF NOT EXISTS idx_leads_customer_phone ON leads(customer_phone);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own leads"
  ON leads FOR SELECT
  USING (auth.uid() IN (
    SELECT client_id FROM enquiries WHERE call_id = leads.call_id
  ));

CREATE POLICY "Service role can manage all leads"
  ON leads FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
