-- Create missing Stripe tables referenced by stripe-webhook edge function

-- 1. stripe_webhook_events: tracks processed Stripe events (idempotency)
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  signature_verified BOOLEAN DEFAULT FALSE,
  raw_payload TEXT,
  event_data JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. stripe_subscriptions: mirrors Stripe subscription data
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  status TEXT NOT NULL,
  price_id TEXT,
  quantity INTEGER DEFAULT 1,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. subscription_events: audit log of subscription lifecycle events
CREATE TABLE IF NOT EXISTS subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  subscription_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. stripe_invoices: tracks invoices and payment history
CREATE TABLE IF NOT EXISTS stripe_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT,
  amount_paid INTEGER,
  amount_due INTEGER,
  currency TEXT DEFAULT 'gbp',
  status TEXT,
  invoice_pdf TEXT,
  hosted_invoice_url TEXT,
  created TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all new tables
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies: service role has full access, users can read their own data
CREATE POLICY "Users can view own stripe subscriptions"
  ON stripe_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription events"
  ON subscription_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own invoices"
  ON stripe_invoices FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id ON stripe_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_stripe_id ON stripe_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_events_user_id ON subscription_events(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_user_id ON stripe_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_stripe_id ON stripe_webhook_events(stripe_event_id);

-- Backfill stripe_subscriptions from existing public.subscriptions data
INSERT INTO stripe_subscriptions (
  user_id,
  stripe_subscription_id,
  stripe_customer_id,
  status,
  price_id,
  cancel_at_period_end,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
)
SELECT
  user_id,
  stripe_subscription_id,
  stripe_customer_id,
  status,
  stripe_price_id,
  cancel_at_period_end,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
FROM subscriptions
ON CONFLICT (stripe_subscription_id) DO NOTHING;

-- Backfill subscription_events for the existing subscriber
INSERT INTO subscription_events (user_id, event_type, subscription_id, metadata, created_at)
SELECT
  user_id,
  'subscription_created',
  stripe_subscription_id,
  jsonb_build_object('plan_name', plan_name, 'backfilled', true),
  created_at
FROM subscriptions
ON CONFLICT DO NOTHING;
