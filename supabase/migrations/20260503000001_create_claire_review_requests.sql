-- Claire: Post-Job Conversion Engine
-- Migration: Create review_requests table

CREATE TABLE IF NOT EXISTS review_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('emergency', 'standard', 'install')),
  job_value DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'clicked', 'completed', 'declined')),
  sent_at TIMESTAMPTZ,
  reminder_sent BOOLEAN DEFAULT FALSE,
  reminder_sent_at TIMESTAMPTZ,
  review_completed BOOLEAN DEFAULT FALSE,
  review_platform TEXT DEFAULT 'google',
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  review_url TEXT,
  trillet_call_id TEXT,
  twilio_message_sid TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_review_requests_client_status ON review_requests(client_id, status);
CREATE INDEX IF NOT EXISTS idx_review_requests_phone_created ON review_requests(phone, created_at);
CREATE INDEX IF NOT EXISTS idx_review_requests_sent_at ON review_requests(sent_at);
CREATE INDEX IF NOT EXISTS idx_review_requests_status_created ON review_requests(status, created_at);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_review_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_review_requests_updated_at
  BEFORE UPDATE ON review_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_review_requests_updated_at();

-- RLS policies
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own review requests"
  ON review_requests FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Service role can manage all review requests"
  ON review_requests FOR ALL
  USING (true)
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE review_requests IS 'Claire: Tracks review requests sent to customers after job completion';
COMMENT ON COLUMN review_requests.job_value IS 'Job value in GBP for ROI calculation and revenue attribution';
COMMENT ON COLUMN review_requests.rating IS '1-5 star rating when review completed';
COMMENT ON COLUMN review_requests.metadata IS 'Extensible JSON for business_name, scheduled_send_at, revenue attribution, feedback sentiment';
