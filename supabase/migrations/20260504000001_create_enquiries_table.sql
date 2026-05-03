-- Enquiries Table: Stores qualified call enquiries from Trillet voice agent

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  call_id TEXT NOT NULL UNIQUE,
  caller_number TEXT,
  caller_name TEXT,
  transcript TEXT,
  duration_seconds INTEGER DEFAULT 0,
  recording_url TEXT,
  job_type TEXT,
  postcode TEXT,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'emergency')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'accepted', 'declined', 'completed')),
  qualification_data JSONB DEFAULT '{}',
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_enquiries_client_id ON enquiries(client_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_call_id ON enquiries(call_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_urgency ON enquiries(urgency);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_enquiries_updated_at();

-- RLS policies
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own enquiries"
  ON enquiries FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Service role can manage all enquiries"
  ON enquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE enquiries IS 'Qualified call enquiries captured by the Trillet voice agent';
COMMENT ON COLUMN enquiries.call_id IS 'Trillet call ID (unique external reference)';
COMMENT ON COLUMN enquiries.qualification_data IS 'JSON blob with extracted job details, symptoms, availability, etc.';
COMMENT ON COLUMN enquiries.whatsapp_sent IS 'Whether the enquiry summary was delivered via WhatsApp';
