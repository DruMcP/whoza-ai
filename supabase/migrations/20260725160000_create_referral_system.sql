-- Referral Programme ("Refer a Trade")
-- Additive — zero breaking changes to existing tables

-- ─── 1. Add referral_code to contractors table ───
ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referral_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_reward_months INTEGER NOT NULL DEFAULT 0;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_contractors_referral_code 
  ON contractors(referral_code) 
  WHERE referral_code IS NOT NULL;

-- ─── 2. Referrals tracking table ───
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_contractor_id UUID REFERENCES contractors(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'signed_up', 'paid', 'rewarded')),
  reward_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (reward_status IN ('pending', 'issued', 'claimed', 'expired')),
  reward_months INTEGER NOT NULL DEFAULT 1,
  source TEXT,
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  signed_up_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  rewarded_at TIMESTAMPTZ,
  -- Prevent duplicate referrals of same email by same referrer
  UNIQUE(referrer_contractor_id, referred_email)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer 
  ON referrals(referrer_contractor_id) 
  WHERE status IN ('pending', 'signed_up', 'paid');
CREATE INDEX IF NOT EXISTS idx_referrals_referred_email 
  ON referrals(referred_email);
CREATE INDEX IF NOT EXISTS idx_referrals_status 
  ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_contractor 
  ON referrals(referred_contractor_id) 
  WHERE referred_contractor_id IS NOT NULL;

-- ─── 3. RLS policies (public read for referral validation, restricted writes) ───
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Allow public to check if a referral code exists
CREATE POLICY "Allow public to read referral codes"
  ON contractors
  FOR SELECT
  TO anon, authenticated
  USING (referral_code IS NOT NULL);

-- Referrals: allow inserts from API (service role) and reads for authenticated users
CREATE POLICY "Allow authenticated to view own referrals"
  ON referrals
  FOR SELECT
  TO authenticated
  USING (
    referrer_contractor_id IN (
      SELECT id FROM contractors WHERE auth_user_id = auth.uid()
    )
  );

-- ─── 4. Function to generate unique referral code ───
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  attempts INTEGER := 0;
  max_attempts INTEGER := 10;
BEGIN
  -- Only generate if referral_code is null
  IF NEW.referral_code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  LOOP
    -- Generate 8-char alphanumeric code (excluding confusing chars)
    new_code := UPPER(SUBSTRING(MD5(NEW.id::TEXT || NOW()::TEXT || attempts::TEXT) FROM 1 FOR 8));
    -- Replace confusing characters
    new_code := REPLACE(REPLACE(REPLACE(REPLACE(new_code, '0', 'X'), 'O', 'Y'), 'I', 'Z'), 'L', 'K');
    
    -- Check uniqueness
    IF NOT EXISTS (SELECT 1 FROM contractors WHERE referral_code = new_code) THEN
      NEW.referral_code := new_code;
      RETURN NEW;
    END IF;
    
    attempts := attempts + 1;
    IF attempts >= max_attempts THEN
      -- Fallback: use id-based code
      NEW.referral_code := UPPER(SUBSTRING(REPLACE(NEW.id::TEXT, '-', '') FROM 1 FOR 8));
      RETURN NEW;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on contractor insert
DROP TRIGGER IF EXISTS auto_generate_referral_code ON contractors;
CREATE TRIGGER auto_generate_referral_code
  BEFORE INSERT ON contractors
  FOR EACH ROW
  WHEN (NEW.referral_code IS NULL)
  EXECUTE FUNCTION generate_referral_code();

-- ─── 5. Function to backfill referral codes for existing contractors ───
-- Run this manually after deploy: UPDATE contractors SET referral_code = NULL WHERE referral_code IS NULL;
-- The trigger won't fire on UPDATE, so we need a one-time backfill
DO $$
BEGIN
  UPDATE contractors 
  SET referral_code = UPPER(SUBSTRING(REPLACE(id::TEXT, '-', '') FROM 1 FOR 8))
  WHERE referral_code IS NULL;
END $$;

-- ─── 6. Update timestamp trigger ───
CREATE OR REPLACE FUNCTION update_referrals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_referrals_timestamp ON referrals;
CREATE TRIGGER update_referrals_timestamp
  BEFORE UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referrals_updated_at();
