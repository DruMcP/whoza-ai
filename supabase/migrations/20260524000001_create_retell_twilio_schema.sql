-- Retell + Twilio + ElevenLabs Integration Schema
-- All additive — zero breaking changes to existing tables

-- ─── Contractors table (foundation for multi-contractor support) ───

CREATE TABLE IF NOT EXISTS contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  postcode TEXT,
  trade TEXT,
  services TEXT[],
  service_area TEXT[],
  hours JSONB DEFAULT '{}',
  website TEXT,
  google_business_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'suspended', 'trial', 'cancelled')),
  
  -- Telephony backend selection (null = legacy Trillet path)
  telephony_backend TEXT CHECK (telephony_backend IN ('trillet', 'retell_twilio')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contractors_auth_user_id ON contractors(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_contractors_status ON contractors(status);

ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contractors can view own record"
  ON contractors FOR SELECT
  USING (auth_user_id = auth.uid());

CREATE POLICY "Service role can manage all contractors"
  ON contractors FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── Contractor telephony configuration ───

CREATE TABLE IF NOT EXISTS contractor_telephony (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  
  -- Backend selection
  telephony_backend TEXT NOT NULL DEFAULT 'trillet' 
    CHECK (telephony_backend IN ('trillet', 'retell_twilio')),
  
  -- Twilio subaccount (only used when backend = 'retell_twilio')
  twilio_subaccount_sid TEXT,
  twilio_subaccount_auth_token TEXT, -- AES-256 encrypted at application layer
  twilio_master_account_sid TEXT,
  
  -- Retell agent (only used when backend = 'retell_twilio')
  retell_agent_id TEXT,
  retell_api_key_encrypted TEXT,
  
  -- ElevenLabs voice (only used when backend = 'retell_twilio')
  elevenlabs_voice_id TEXT,
  elevenlabs_api_key_encrypted TEXT,
  
  -- Phone number (Twilio-provisioned)
  phone_number TEXT,
  phone_number_sid TEXT,
  number_type TEXT CHECK (number_type IN ('local', 'mobile', 'toll_free')),
  
  -- Number strategy
  number_strategy TEXT NOT NULL DEFAULT 'new' 
    CHECK (number_strategy IN ('forwarding', 'porting', 'new')),
  forwarding_number TEXT, -- original number if using call forwarding
  pac_code TEXT, -- for porting
  port_status TEXT CHECK (port_status IN ('pending', 'submitted', 'foc_received', 'completed', 'failed')),
  
  -- Webhook configuration
  inbound_webhook_url TEXT DEFAULT 'https://api.whoza.ai/webhooks/twilio/inbound',
  status_webhook_url TEXT DEFAULT 'https://api.whoza.ai/webhooks/twilio/status',
  
  -- Compliance
  uk_compliance_bundle_id TEXT,
  uk_compliance_status TEXT CHECK (uk_compliance_status IN ('not_started', 'submitted', 'approved', 'rejected', 'expired')),
  uk_compliance_submitted_at TIMESTAMPTZ,
  uk_compliance_approved_at TIMESTAMPTZ,
  
  -- Cost tracking
  twilio_balance_gbp DECIMAL(10,2) DEFAULT 0,
  low_balance_alert_sent_at TIMESTAMPTZ,
  
  -- Status
  setup_status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (setup_status IN ('pending', 'compliance_pending', 'number_pending', 'agent_pending', 'ready', 'active', 'suspended')),
  
  -- Metadata
  setup_notes TEXT,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contractor_telephony_contractor_id ON contractor_telephony(contractor_id);
CREATE INDEX IF NOT EXISTS idx_contractor_telephony_backend ON contractor_telephony(telephony_backend);
CREATE INDEX IF NOT EXISTS idx_contractor_telephony_setup_status ON contractor_telephony(setup_status);

ALTER TABLE contractor_telephony ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage all telephony"
  ON contractor_telephony FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── Retell-specific call records ───

CREATE TABLE IF NOT EXISTS retell_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  
  -- Retell identifiers
  retell_call_id TEXT NOT NULL UNIQUE,
  retell_agent_id TEXT NOT NULL,
  
  -- Twilio identifiers
  twilio_call_sid TEXT NOT NULL,
  twilio_account_sid TEXT,
  
  -- Call details
  from_number TEXT,
  to_number TEXT,
  direction TEXT DEFAULT 'inbound' CHECK (direction IN ('inbound', 'outbound')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'initiated' 
    CHECK (status IN ('initiated', 'ringing', 'in_progress', 'completed', 'failed', 'no_answer', 'busy')),
  
  -- Timing
  started_at TIMESTAMPTZ,
  answered_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  
  -- Media
  recording_url TEXT,
  recording_duration_seconds INTEGER,
  transcript TEXT,
  
  -- Retell metadata
  retell_metadata JSONB DEFAULT '{}',
  
  -- Cost tracking
  twilio_cost_usd DECIMAL(10,6) DEFAULT 0,
  retell_cost_usd DECIMAL(10,6) DEFAULT 0,
  elevenlabs_cost_usd DECIMAL(10,6) DEFAULT 0,
  total_cost_usd DECIMAL(10,6) DEFAULT 0,
  
  -- Outcome
  outcome TEXT CHECK (outcome IN ('qualified', 'booking_requested', 'voicemail', 'missed', 'transferred', 'declined')),
  
  -- Linked enquiry (if qualified)
  enquiry_id UUID REFERENCES enquiries(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_retell_calls_contractor_id ON retell_calls(contractor_id);
CREATE INDEX IF NOT EXISTS idx_retell_calls_retell_call_id ON retell_calls(retell_call_id);
CREATE INDEX IF NOT EXISTS idx_retell_calls_twilio_call_sid ON retell_calls(twilio_call_sid);
CREATE INDEX IF NOT EXISTS idx_retell_calls_status ON retell_calls(status);
CREATE INDEX IF NOT EXISTS idx_retell_calls_created_at ON retell_calls(created_at DESC);

ALTER TABLE retell_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage all retell calls"
  ON retell_calls FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── Unified webhook audit log ───

CREATE TABLE IF NOT EXISTS telephony_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  provider TEXT NOT NULL CHECK (provider IN ('trillet', 'twilio', 'retell')),
  event_type TEXT NOT NULL,
  
  -- Request details
  request_id TEXT NOT NULL,
  request_body JSONB,
  request_headers JSONB,
  
  -- Response details
  response_status INTEGER,
  response_body TEXT,
  processing_time_ms INTEGER,
  
  -- Error tracking
  error_message TEXT,
  error_stack TEXT,
  
  -- Related records
  call_id TEXT,
  contractor_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_provider ON telephony_webhook_logs(provider);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_type ON telephony_webhook_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_call_id ON telephony_webhook_logs(call_id);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON telephony_webhook_logs(created_at DESC);

ALTER TABLE telephony_webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage all webhook logs"
  ON telephony_webhook_logs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── Trigger for updated_at on new tables ───

CREATE OR REPLACE FUNCTION update_telephony_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_contractor_telephony_updated_at
  BEFORE UPDATE ON contractor_telephony
  FOR EACH ROW EXECUTE FUNCTION update_telephony_updated_at();

CREATE TRIGGER trigger_retell_calls_updated_at
  BEFORE UPDATE ON retell_calls
  FOR EACH ROW EXECUTE FUNCTION update_telephony_updated_at();

-- ─── Backfill: create contractor records for existing enquiries ───

-- Create a default contractor for any enquiries without a matching contractor
INSERT INTO contractors (auth_user_id, business_name, email, status, telephony_backend)
SELECT DISTINCT 
  client_id,
  'Whoza Trade Business',
  'business@whoza.ai',
  'active',
  NULL
FROM enquiries
WHERE client_id IS NOT NULL
  AND client_id NOT IN (SELECT auth_user_id FROM contractors WHERE auth_user_id IS NOT NULL)
ON CONFLICT (auth_user_id) DO NOTHING;

-- Link existing enquiries to contractors via client_id
-- (client_id already references auth.users, which maps to contractors.auth_user_id)
