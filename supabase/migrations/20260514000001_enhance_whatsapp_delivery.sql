CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add WhatsApp delivery tracking columns to enquiries table
ALTER TABLE enquiries 
  ADD COLUMN IF NOT EXISTS whatsapp_provider TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_message_id TEXT,
  ADD COLUMN IF NOT EXISTS client_whatsapp_number TEXT;

-- Index for WhatsApp provider queries
CREATE INDEX IF NOT EXISTS idx_enquiries_whatsapp_provider ON enquiries(whatsapp_provider) WHERE whatsapp_sent = true;

-- Add call_id index on leads and appointments if not exists
CREATE INDEX IF NOT EXISTS idx_leads_client_id ON leads(client_id) WHERE client_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id) WHERE client_id IS NOT NULL;

-- Add webhook delivery log table for debugging
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT,
  enquiry_id UUID,
  provider TEXT NOT NULL,
  message_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'failed', 'read')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_call_id ON webhook_deliveries(call_id);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_enquiry_id ON webhook_deliveries(enquiry_id);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_status ON webhook_deliveries(status);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_webhook_deliveries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_webhook_deliveries_updated_at
  BEFORE UPDATE ON webhook_deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_webhook_deliveries_updated_at();

-- Comments
COMMENT ON TABLE webhook_deliveries IS 'Log of all WhatsApp/webhook delivery attempts for debugging and retry';
COMMENT ON COLUMN enquiries.whatsapp_provider IS 'WhatsApp provider used (twilio, meta, trillet, stub)';
COMMENT ON COLUMN enquiries.whatsapp_message_id IS 'Provider-specific message ID for delivery tracking';
COMMENT ON COLUMN enquiries.client_whatsapp_number IS 'Tradesperson WhatsApp number for receiving enquiries';
