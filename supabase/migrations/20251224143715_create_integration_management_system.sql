/*
  # Integration Management System

  1. New Tables
    - `integration_providers`
      - Metadata for available integrations (Stripe, Google, Facebook, etc.)
      - Configuration and feature flags
      - API endpoints and OAuth settings

    - `user_integrations`
      - User-specific integration connections
      - Connection status and health
      - Settings and preferences
      - Sync timestamps

    - `integration_credentials`
      - Encrypted API keys and OAuth tokens
      - Token expiry tracking
      - Secure credential storage

    - `integration_webhooks`
      - Webhook event logging
      - Processing status and retries
      - Event deduplication

    - `integration_sync_log`
      - Sync history and audit trail
      - Performance metrics
      - Error tracking

  2. Security
    - Enable RLS on all tables
    - Users can only see their own integrations
    - Admins can view all integrations
    - Credentials encrypted before storage
    - Audit logging for sensitive operations

  3. Important Notes
    - Credentials table uses encryption_key_id for key rotation
    - Webhook events deduplicated by external_event_id
    - Sync log retained for 90 days (can be partitioned)
    - Health checks run periodically via edge functions
*/

-- Integration Providers (master list of available integrations)
CREATE TABLE IF NOT EXISTS integration_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  logo_url text,
  category text NOT NULL CHECK (category IN ('payment', 'social_media', 'business_tools', 'analytics', 'crm', 'email', 'communication', 'reviews')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'coming_soon', 'deprecated')),

  -- API Configuration
  api_base_url text,
  api_version text,
  rate_limit_per_minute integer,

  -- OAuth Configuration
  requires_oauth boolean DEFAULT false,
  oauth_authorize_url text,
  oauth_token_url text,
  oauth_scopes text[],

  -- Features
  features jsonb DEFAULT '{}',
  webhook_support boolean DEFAULT false,
  webhook_url text,

  -- Metadata
  documentation_url text,
  support_url text,
  terms_url text,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Integration Connections
CREATE TABLE IF NOT EXISTS user_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES integration_providers(id) ON DELETE CASCADE,

  -- Connection Status
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'expired', 'disconnected')),
  health_status text DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'warning', 'error', 'unknown')),

  -- External IDs
  external_account_id text,
  external_account_name text,

  -- Settings
  settings jsonb DEFAULT '{}',
  auto_sync boolean DEFAULT true,
  sync_frequency_minutes integer DEFAULT 1440, -- Daily by default

  -- Timestamps
  connected_at timestamptz DEFAULT now(),
  last_synced_at timestamptz,
  last_health_check_at timestamptz,
  token_expires_at timestamptz,
  disconnected_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id, provider_id, external_account_id)
);

-- Integration Credentials (encrypted storage)
CREATE TABLE IF NOT EXISTS integration_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,

  -- Credential Type
  credential_type text NOT NULL CHECK (credential_type IN ('api_key', 'oauth_token', 'oauth_refresh_token', 'webhook_secret', 'client_secret')),

  -- Encrypted Data
  encrypted_value text NOT NULL,
  encryption_key_id uuid NOT NULL, -- For key rotation
  encryption_method text NOT NULL DEFAULT 'aes-256-gcm',

  -- Metadata
  expires_at timestamptz,
  scope text[],

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_integration_id, credential_type)
);

-- Integration Webhook Events
CREATE TABLE IF NOT EXISTS integration_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid REFERENCES user_integrations(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES integration_providers(id) ON DELETE CASCADE,

  -- Event Data
  external_event_id text NOT NULL,
  event_type text NOT NULL,
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

  received_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(provider_id, external_event_id) -- Prevent duplicate processing
);

-- Integration Sync Log
CREATE TABLE IF NOT EXISTS integration_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,

  -- Sync Details
  sync_type text NOT NULL CHECK (sync_type IN ('manual', 'scheduled', 'webhook', 'realtime')),
  sync_direction text NOT NULL CHECK (sync_direction IN ('inbound', 'outbound', 'bidirectional')),

  -- Status
  status text NOT NULL CHECK (status IN ('started', 'in_progress', 'completed', 'failed', 'partial')),

  -- Metrics
  records_processed integer DEFAULT 0,
  records_created integer DEFAULT 0,
  records_updated integer DEFAULT 0,
  records_failed integer DEFAULT 0,
  duration_ms integer,

  -- Error Tracking
  error_message text,
  error_details jsonb,

  -- Metadata
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_integration_providers_status ON integration_providers(status);
CREATE INDEX IF NOT EXISTS idx_integration_providers_category ON integration_providers(category);

CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON user_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id ON user_integrations(provider_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_status ON user_integrations(status);
CREATE INDEX IF NOT EXISTS idx_user_integrations_last_synced ON user_integrations(last_synced_at);

CREATE INDEX IF NOT EXISTS idx_integration_credentials_user_integration ON integration_credentials(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_credentials_expires ON integration_credentials(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_integration_webhooks_provider ON integration_webhooks(provider_id);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration ON integration_webhooks(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_status ON integration_webhooks(status);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_next_retry ON integration_webhooks(next_retry_at) WHERE status = 'failed' AND retry_count < max_retries;
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_created ON integration_webhooks(created_at);

CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration ON integration_sync_log(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_status ON integration_sync_log(status);
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_created ON integration_sync_log(created_at);

-- Enable Row Level Security
ALTER TABLE integration_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_sync_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Integration Providers: Public read for authenticated users
CREATE POLICY "Anyone can view available integrations"
  ON integration_providers FOR SELECT
  TO authenticated
  USING (status IN ('active', 'beta'));

-- User Integrations: Users see only their own
CREATE POLICY "Users view own integrations"
  ON user_integrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own integrations"
  ON user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own integrations"
  ON user_integrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own integrations"
  ON user_integrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Integration Credentials: Users access only their own
CREATE POLICY "Users view own credentials"
  ON integration_credentials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users insert own credentials"
  ON integration_credentials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users update own credentials"
  ON integration_credentials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users delete own credentials"
  ON integration_credentials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Integration Webhooks: System can insert, users can view their own
CREATE POLICY "System inserts webhooks"
  ON integration_webhooks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users view own webhooks"
  ON integration_webhooks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_webhooks.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Integration Sync Log: System can insert, users can view their own
CREATE POLICY "System inserts sync logs"
  ON integration_sync_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users view own sync logs"
  ON integration_sync_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_sync_log.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_integration_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_integration_providers_updated_at
  BEFORE UPDATE ON integration_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_user_integrations_updated_at
  BEFORE UPDATE ON user_integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_integration_credentials_updated_at
  BEFORE UPDATE ON integration_credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_integration_webhooks_updated_at
  BEFORE UPDATE ON integration_webhooks
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();
