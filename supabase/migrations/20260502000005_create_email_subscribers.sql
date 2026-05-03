-- Create email_subscribers table for Phase 2 newsletter signup
CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text DEFAULT 'homepage-newsletter',
  page_path text DEFAULT '/',
  created_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for newsletter signup from homepage)
DROP POLICY IF EXISTS "Allow public inserts" ON email_subscribers;
CREATE POLICY "Allow public inserts" ON email_subscribers FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Allow reading own email (for checking subscription status)
DROP POLICY IF EXISTS "Allow public select by email" ON email_subscribers;
CREATE POLICY "Allow public select by email" ON email_subscribers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Indexes
CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_email_subscribers_created ON email_subscribers(created_at DESC);
CREATE INDEX idx_email_subscribers_source ON email_subscribers(source);

-- Row count estimate for "Join 200+ tradespeople" social proof
-- After seeding: SELECT COUNT(*) FROM email_subscribers WHERE unsubscribed_at IS NULL;
