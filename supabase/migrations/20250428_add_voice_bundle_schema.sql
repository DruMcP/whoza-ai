-- whoza.ai Voice + Bundle Schema Migration
-- Adds tables for AI Voice Agent, call logs, and bundle subscriptions
-- Run this in Supabase SQL Editor

-- ============================================================
-- VOICE CONFIGURATION TABLE
-- Stores per-client AI voice agent settings
-- ============================================================
CREATE TABLE IF NOT EXISTS voice_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Business identity
    business_name TEXT NOT NULL,
    trade_type TEXT NOT NULL,
    services TEXT[] DEFAULT '{}',
    postcodes TEXT[] DEFAULT '{}',
    pricing JSONB DEFAULT '{}',
    
    -- Calendar integration
    calendar_type TEXT DEFAULT 'google',
    calendar_id TEXT,
    
    -- Voice settings
    voice_profile TEXT DEFAULT 'trillet_ai',
    voice_gender TEXT DEFAULT 'female',
    language TEXT DEFAULT 'en-GB',
    emergency_keywords TEXT[] DEFAULT ARRAY['emergency', 'urgent', 'burst', 'flood', 'gas leak', 'no heat', 'no hot water', 'leaking', 'dangerous'],
    
    -- Call handling
    forward_number TEXT,
    divert_active BOOLEAN DEFAULT false,
    sms_summary BOOLEAN DEFAULT true,
    whatsapp_summary BOOLEAN DEFAULT true,
    
    -- Trillet integration
    trillet_subaccount_id TEXT,
    trillet_number TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'pending_setup',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    divert_activated_at TIMESTAMPTZ,
    divert_deactivated_at TIMESTAMPTZ,
    last_call_at TIMESTAMPTZ,
    
    UNIQUE(user_id)
);

-- Enable RLS on voice_configs
ALTER TABLE voice_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own voice config"
    ON voice_configs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own voice config"
    ON voice_configs FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all voice configs"
    ON voice_configs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- ============================================================
-- CALL LOGS TABLE
-- Stores every call handled by the AI voice agent
-- ============================================================
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Trillet identifiers
    trillet_call_id TEXT NOT NULL,
    
    -- Caller info
    caller_number TEXT,
    customer_name TEXT,
    customer_postcode TEXT,
    
    -- Call metadata
    direction TEXT DEFAULT 'inbound',
    status TEXT DEFAULT 'in_progress',
    outcome TEXT DEFAULT 'unknown',
    duration INTEGER DEFAULT 0,
    
    -- Content
    transcript TEXT,
    summary TEXT,
    recording_url TEXT,
    
    -- Service and booking
    service_requested TEXT,
    booking_made BOOLEAN DEFAULT false,
    booking_details JSONB,
    
    -- Emergency and spam
    is_emergency BOOLEAN DEFAULT false,
    transferred_to TEXT,
    transfer_reason TEXT,
    spam_score NUMERIC(3,2) DEFAULT 0,
    spam_reason TEXT,
    
    -- Timestamps
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    source TEXT DEFAULT 'direct'
);

-- Indexes for performance
CREATE INDEX idx_call_logs_user_id ON call_logs(user_id);
CREATE INDEX idx_call_logs_user_created ON call_logs(user_id, created_at DESC);
CREATE INDEX idx_call_logs_trillet_id ON call_logs(trillet_call_id);
CREATE INDEX idx_call_logs_status ON call_logs(status);
CREATE INDEX idx_call_logs_emergency ON call_logs(is_emergency) WHERE is_emergency = true;

-- Enable RLS on call_logs
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own call logs"
    ON call_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all call logs"
    ON call_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- ============================================================
-- TRILLET WEBHOOK EVENTS TABLE
-- Audit log for all Trillet webhook events
-- ============================================================
CREATE TABLE IF NOT EXISTS trillet_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    trillet_call_id TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    raw_payload JSONB,
    status TEXT DEFAULT 'pending',
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_trillet_webhooks_status ON trillet_webhook_events(status);
CREATE INDEX idx_trillet_webhooks_call ON trillet_webhook_events(trillet_call_id);

-- ============================================================
-- SUBSCRIPTION PLANS TABLE (Reference data)
-- Defines bundle pricing tiers
-- ============================================================
CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_monthly INTEGER NOT NULL, -- in pence (e.g., 6900 = £69)
    voice_minutes INTEGER NOT NULL,
    directory_listings INTEGER NOT NULL,
    review_automation BOOLEAN DEFAULT false,
    competitor_tracking BOOLEAN DEFAULT false,
    priority_support BOOLEAN DEFAULT false,
    monthly_calls BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert bundle plans
INSERT INTO subscription_plans (id, name, description, price_monthly, voice_minutes, directory_listings, review_automation, competitor_tracking, priority_support, monthly_calls)
VALUES 
    ('solo', 'Solo', 'One-person trade business', 6900, 300, 5, false, false, false, false),
    ('business', 'Business', 'Growing team (2–5 staff)', 12900, 600, 15, true, true, true, false),
    ('professional', 'Professional', 'Established business', 21900, 1200, 30, true, true, true, true),
    ('enterprise', 'Enterprise', 'Multi-location / franchise', 49900, 3000, 50, true, true, true, true)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_monthly = EXCLUDED.price_monthly,
    voice_minutes = EXCLUDED.voice_minutes,
    directory_listings = EXCLUDED.directory_listings;

-- ============================================================
-- TRIALS TABLE
-- Tracks trial signups separately from subscriptions
-- ============================================================
CREATE TABLE IF NOT EXISTS trials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES subscription_plans(id),
    
    -- Trial metadata
    started_at TIMESTAMPTZ DEFAULT now(),
    ends_at TIMESTAMPTZ NOT NULL,
    converted_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- Usage during trial
    calls_received INTEGER DEFAULT 0,
    calls_booked INTEGER DEFAULT 0,
    minutes_used INTEGER DEFAULT 0,
    
    -- Status
    status TEXT DEFAULT 'active',
    cancellation_reason TEXT,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(user_id)
);

CREATE INDEX idx_trials_user ON trials(user_id);
CREATE INDEX idx_trials_status ON trials(status);

ALTER TABLE trials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trial"
    ON trials FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================================
-- SCHEDULED TASKS TABLE
-- For review requests, reminders, and automation
-- ============================================================
CREATE TABLE IF NOT EXISTS scheduled_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_type TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    scheduled_for TIMESTAMPTZ NOT NULL,
    executed_at TIMESTAMPTZ,
    payload JSONB,
    result JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_scheduled_tasks_status ON scheduled_tasks(status);
CREATE INDEX idx_scheduled_tasks_scheduled ON scheduled_tasks(scheduled_for) WHERE status = 'scheduled';

-- ============================================================
-- EMAIL TEMPLATES TABLE
-- Add voice-specific email templates
-- ============================================================
INSERT INTO email_templates (name, subject, html_content, text_content, is_active)
VALUES 
    ('voice_welcome', 
     'Your whoza.ai AI Receptionist is Ready',
     '<h1>Welcome to whoza.ai Voice</h1><p>Your AI receptionist {{business_name}} is configured and ready to answer calls. Your number: {{trillet_number}}</p><p>To activate: dial <strong>**21*{{trillet_number}}#</strong> on your phone.</p>',
     'Welcome to whoza.ai Voice. Your AI receptionist is ready. Your number: {{trillet_number}}. To activate: dial **21*{{trillet_number}}#',
     true)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================

-- Update timestamp trigger for voice_configs
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_voice_configs_updated_at ON voice_configs;
CREATE TRIGGER update_voice_configs_updated_at
    BEFORE UPDATE ON voice_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_call_logs_updated_at ON call_logs;
CREATE TRIGGER update_call_logs_updated_at
    BEFORE UPDATE ON call_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VIEWS FOR ANALYTICS
-- ============================================================

-- Daily call summary per user
CREATE OR REPLACE VIEW user_call_summary AS
SELECT 
    user_id,
    DATE(created_at) as call_date,
    COUNT(*) as total_calls,
    COUNT(*) FILTER (WHERE status = 'completed') as answered_calls,
    COUNT(*) FILTER (WHERE booking_made = true) as booked_calls,
    COUNT(*) FILTER (WHERE is_emergency = true) as emergency_calls,
    COUNT(*) FILTER (WHERE status = 'spam_blocked') as spam_blocked,
    SUM(duration) as total_duration_seconds,
    AVG(duration) as avg_duration_seconds
FROM call_logs
GROUP BY user_id, DATE(created_at);

-- User health score view
CREATE OR REPLACE VIEW user_health_scores AS
SELECT 
    u.id as user_id,
    vc.status as voice_status,
    vc.divert_active,
    COUNT(cl.id) as total_calls_30d,
    COUNT(cl.id) FILTER (WHERE cl.created_at > now() - interval '7 days') as calls_7d,
    MAX(cl.created_at) as last_call_at,
    vc.trillet_number,
    s.plan_name,
    s.status as subscription_status,
    t.status as trial_status,
    CASE 
        WHEN vc.divert_active AND vc.status = 'active' THEN 'healthy'
        WHEN vc.status = 'pending_setup' THEN 'pending'
        WHEN vc.divert_active = false AND vc.status = 'active' THEN 'paused'
        WHEN s.status = 'cancelled' OR t.status = 'cancelled' THEN 'churned'
        ELSE 'unknown'
    END as health_status
FROM auth.users u
LEFT JOIN voice_configs vc ON vc.user_id = u.id
LEFT JOIN call_logs cl ON cl.user_id = u.id AND cl.created_at > now() - interval '30 days'
LEFT JOIN subscriptions s ON s.user_id = u.id
LEFT JOIN trials t ON t.user_id = u.id
GROUP BY u.id, vc.status, vc.divert_active, vc.trillet_number, s.plan_name, s.status, t.status;

-- ============================================================
-- GRANT PERMISSIONS
-- ============================================================
GRANT ALL ON voice_configs TO authenticated;
GRANT ALL ON call_logs TO authenticated;
GRANT ALL ON trials TO authenticated;
GRANT ALL ON scheduled_tasks TO authenticated;
GRANT ALL ON subscription_plans TO authenticated;
GRANT ALL ON trillet_webhook_events TO service_role;

GRANT SELECT ON user_call_summary TO authenticated;
GRANT SELECT ON user_health_scores TO authenticated;

-- ============================================================
-- COMMENTS
-- ============================================================
COMMENT ON TABLE voice_configs IS 'AI Voice Agent configuration per user - links to Trillet sub-accounts';
COMMENT ON TABLE call_logs IS 'Every call handled by the AI voice agent with full metadata and outcomes';
COMMENT ON TABLE trials IS '14-day free trial tracking with usage metrics';
COMMENT ON TABLE scheduled_tasks IS 'Delayed automation tasks (review requests, reminders, etc.)';
COMMENT ON VIEW user_health_scores IS 'Aggregated user health for churn prediction and intervention';
