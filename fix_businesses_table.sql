-- Quick fix: create businesses table to satisfy FK constraints in migration 01
-- This matches the expected schema for pending migrations

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT,
  trade_type TEXT,
  postcode TEXT,
  service_area TEXT,
  website_url TEXT,
  google_business_url TEXT,
  key_services TEXT,
  credentials TEXT,
  competitors TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for FK lookups
CREATE INDEX IF NOT EXISTS idx_businesses_user ON businesses(user_id);
