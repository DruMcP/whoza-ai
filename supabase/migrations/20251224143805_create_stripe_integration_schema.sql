/*
  # Stripe Integration Schema

  1. New Tables
    - `stripe_customers`
      - Maps Rex users to Stripe customers
      - Customer metadata and status
      - Sync tracking

    - `stripe_products`
      - Product catalog from Stripe
      - Feature mappings
      - Pricing information

    - `stripe_prices`
      - Price details for products
      - Billing intervals
      - Currency support

    - `stripe_subscriptions`
      - Active and historical subscriptions
      - Status tracking
      - Billing cycle information

    - `stripe_invoices`
      - Invoice history
      - Payment status
      - PDF links

    - `stripe_payment_methods`
      - Stored payment methods
      - Default payment method tracking
      - Card/bank details (last 4 digits only)

    - `stripe_webhook_events`
      - Stripe-specific webhook events
      - Processing status
      - Event data

  2. Security
    - Enable RLS on all tables
    - Users can only see their own Stripe data
    - No sensitive card data stored (PCI compliance)
    - Admins can view aggregated metrics

  3. Important Notes
    - No full card numbers stored (PCI compliance)
    - Webhook events deduplicated by stripe_event_id
    - Subscription status synced via webhooks
    - Failed payment retry logic handled by Stripe
*/

-- Stripe Customers
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL UNIQUE,

  -- Customer Info
  email text,
  name text,
  phone text,

  -- Billing Address
  billing_address jsonb,

  -- Status
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deleted')),
  delinquent boolean DEFAULT false,

  -- Balance
  account_balance integer DEFAULT 0, -- In cents
  currency text DEFAULT 'gbp',

  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Products
CREATE TABLE IF NOT EXISTS stripe_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id text NOT NULL UNIQUE,

  -- Product Info
  name text NOT NULL,
  description text,
  active boolean DEFAULT true,

  -- Features
  features text[],
  feature_map jsonb DEFAULT '{}', -- Maps to app features

  -- Metadata
  metadata jsonb DEFAULT '{}',
  images text[],

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Prices
CREATE TABLE IF NOT EXISTS stripe_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id text NOT NULL UNIQUE,
  stripe_product_id text NOT NULL REFERENCES stripe_products(stripe_product_id) ON DELETE CASCADE,

  -- Pricing
  unit_amount integer, -- In cents
  currency text DEFAULT 'gbp',
  billing_scheme text DEFAULT 'per_unit' CHECK (billing_scheme IN ('per_unit', 'tiered', 'volume')),

  -- Recurring
  recurring_interval text CHECK (recurring_interval IN ('day', 'week', 'month', 'year')),
  recurring_interval_count integer DEFAULT 1,
  recurring_usage_type text CHECK (recurring_usage_type IN ('metered', 'licensed')),

  -- Tiers (for tiered pricing)
  tiers jsonb,

  -- Status
  active boolean DEFAULT true,
  
  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Subscriptions
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Subscription Details
  status text NOT NULL CHECK (status IN ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused')),
  
  -- Items (can have multiple price IDs)
  items jsonb NOT NULL, -- Array of subscription items with price_id and quantity

  -- Billing
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  ended_at timestamptz,

  -- Trial
  trial_start timestamptz,
  trial_end timestamptz,

  -- Amounts
  latest_invoice_id text,
  latest_invoice_amount integer, -- In cents

  -- Payment
  default_payment_method text,
  collection_method text DEFAULT 'charge_automatically' CHECK (collection_method IN ('charge_automatically', 'send_invoice')),

  -- Metadata
  metadata jsonb DEFAULT '{}',
  description text,

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Invoices
CREATE TABLE IF NOT EXISTS stripe_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_invoice_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  stripe_subscription_id text REFERENCES stripe_subscriptions(stripe_subscription_id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Invoice Details
  number text,
  status text CHECK (status IN ('draft', 'open', 'paid', 'uncollectible', 'void')),

  -- Amounts
  amount_due integer NOT NULL, -- In cents
  amount_paid integer DEFAULT 0,
  amount_remaining integer DEFAULT 0,
  currency text DEFAULT 'gbp',
  tax integer DEFAULT 0,
  total integer NOT NULL,

  -- Dates
  created timestamptz NOT NULL,
  due_date timestamptz,
  period_start timestamptz,
  period_end timestamptz,

  -- Payment
  paid boolean DEFAULT false,
  paid_at timestamptz,
  payment_intent_id text,
  charge_id text,

  -- Links
  invoice_pdf text,
  hosted_invoice_url text,

  -- Metadata
  metadata jsonb DEFAULT '{}',
  description text,
  lines jsonb, -- Invoice line items

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Payment Methods
CREATE TABLE IF NOT EXISTS stripe_payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_method_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Type
  type text NOT NULL CHECK (type IN ('card', 'bank_account', 'sepa_debit', 'ideal', 'paypal')),

  -- Card Details (PCI compliant - only last 4 and metadata)
  card_brand text,
  card_last4 text,
  card_exp_month integer,
  card_exp_year integer,
  card_fingerprint text,

  -- Bank Account Details (only last 4)
  bank_name text,
  bank_last4 text,

  -- Status
  is_default boolean DEFAULT false,

  -- Billing Details
  billing_details jsonb,

  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Webhook Events (specific to Stripe)
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text NOT NULL UNIQUE,

  -- Event Details
  event_type text NOT NULL,
  api_version text,
  
  -- Related Objects
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_invoice_id text,
  stripe_payment_method_id text,

  -- Event Data
  event_data jsonb NOT NULL,
  raw_payload text,

  -- Processing
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'skipped')),
  processed_at timestamptz,
  retry_count integer DEFAULT 0,
  max_retries integer DEFAULT 3,
  next_retry_at timestamptz,

  -- Error Tracking
  error_message text,
  error_details jsonb,

  -- Security
  signature_verified boolean DEFAULT false,
  source_ip inet,

  -- User mapping (for RLS)
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,

  received_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_status ON stripe_customers(status);

CREATE INDEX IF NOT EXISTS idx_stripe_products_active ON stripe_products(active);

CREATE INDEX IF NOT EXISTS idx_stripe_prices_product ON stripe_prices(stripe_product_id);
CREATE INDEX IF NOT EXISTS idx_stripe_prices_active ON stripe_prices(active);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id ON stripe_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer ON stripe_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_status ON stripe_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_period_end ON stripe_subscriptions(current_period_end);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_user_id ON stripe_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_customer ON stripe_invoices(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_subscription ON stripe_invoices(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_status ON stripe_invoices(status);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_created ON stripe_invoices(created);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_user_id ON stripe_payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_customer ON stripe_payment_methods(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_default ON stripe_payment_methods(is_default) WHERE is_default = true;

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_status ON stripe_webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_customer ON stripe_webhook_events(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_subscription ON stripe_webhook_events(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_next_retry ON stripe_webhook_events(next_retry_at) WHERE status = 'failed' AND retry_count < max_retries;
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_created ON stripe_webhook_events(created_at);

-- Enable Row Level Security
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Stripe Customers: Users see only their own
CREATE POLICY "Users view own stripe customer"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Products: Anyone can view active products
CREATE POLICY "Anyone can view active products"
  ON stripe_products FOR SELECT
  TO authenticated
  USING (active = true);

-- Stripe Prices: Anyone can view active prices
CREATE POLICY "Anyone can view active prices"
  ON stripe_prices FOR SELECT
  TO authenticated
  USING (active = true);

-- Stripe Subscriptions: Users see only their own
CREATE POLICY "Users view own subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Invoices: Users see only their own
CREATE POLICY "Users view own invoices"
  ON stripe_invoices FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Payment Methods: Users see only their own
CREATE POLICY "Users view own payment methods"
  ON stripe_payment_methods FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Webhook Events: Users see only their own
CREATE POLICY "Users view own webhook events"
  ON stripe_webhook_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- System can insert webhook events
CREATE POLICY "System inserts webhook events"
  ON stripe_webhook_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_stripe_customers_updated_at
  BEFORE UPDATE ON stripe_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_products_updated_at
  BEFORE UPDATE ON stripe_products
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_prices_updated_at
  BEFORE UPDATE ON stripe_prices
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_subscriptions_updated_at
  BEFORE UPDATE ON stripe_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_invoices_updated_at
  BEFORE UPDATE ON stripe_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_payment_methods_updated_at
  BEFORE UPDATE ON stripe_payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_webhook_events_updated_at
  BEFORE UPDATE ON stripe_webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();
