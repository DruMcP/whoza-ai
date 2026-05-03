-- P0 Migration + Tradesperson Photo Feature
-- whoza.ai v2 Infrastructure Fix
-- Date: 2026-05-04
-- Purpose: Fix P0 gaps + add tradesperson photo for customer safety

-- ============================================================================
-- 1. ADD MISSING voice_configs FIELDS (P0 Fix)
-- ============================================================================

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS review_enabled BOOLEAN DEFAULT true;

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS google_review_link TEXT;

COMMENT ON COLUMN voice_configs.review_enabled IS 'Whether Claire should auto-send review requests after completed bookings';
COMMENT ON COLUMN voice_configs.google_review_link IS 'Google Business Profile review URL for Claire to include in review requests';

-- ============================================================================
-- 2. ADD TRADESPERSON PHOTO FIELD (Launch Feature)
-- ============================================================================

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS tradesperson_photo_url TEXT;

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS tradesperson_name TEXT;

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS tradesperson_bio TEXT;

ALTER TABLE voice_configs 
ADD COLUMN IF NOT EXISTS tradesperson_credentials TEXT[] DEFAULT '{}';

COMMENT ON COLUMN voice_configs.tradesperson_photo_url IS 'URL of tradesperson photo for customer safety confirmations';
COMMENT ON COLUMN voice_configs.tradesperson_name IS 'Full name of tradesperson shown to customers';
COMMENT ON COLUMN voice_configs.tradesperson_bio IS 'Short bio for customer profile page';
COMMENT ON COLUMN voice_configs.tradesperson_credentials IS 'Credentials (Gas Safe, NICEIC, etc.)';

-- ============================================================================
-- 3. UPDATE EMAIL TEMPLATES FOR PHOTO CONFIRMATIONS
-- ============================================================================

-- WhatsApp/SMS confirmation with photo
INSERT INTO email_templates (name, subject, html_content, text_content, is_active)
VALUES 
    ('booking_confirmation_with_photo', 
     'Your booking with {{business_name}} is confirmed',
     '<h1>Your booking is confirmed</h1>
      <p>Hi {{customer_name}},</p>
      <p>{{tradesperson_name}} from {{business_name}} will be attending your {{service_type}} job on {{booking_date}}.</p>
      <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <img src="{{tradesperson_photo_url}}" alt="{{tradesperson_name}}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;" />
        <h3>{{tradesperson_name}}</h3>
        <p>{{tradesperson_bio}}</p>
        <p><strong>Credentials:</strong> {{tradesperson_credentials}}</p>
      </div>
      <p>If you have any concerns, contact us at {{business_phone}}.</p>
      <p><small>For your safety: whoza.ai verifies all tradespeople on our platform.</small></p>',
     'Hi {{customer_name}}, {{tradesperson_name}} from {{business_name}} will attend your {{service_type}} job on {{booking_date}}. View profile: {{profile_url}}',
     true)
ON CONFLICT (name) DO UPDATE SET
    subject = EXCLUDED.subject,
    html_content = EXCLUDED.html_content,
    text_content = EXCLUDED.text_content,
    is_active = EXCLUDED.is_active;

-- ============================================================================
-- 4. STORAGE BUCKET POLICY FOR TRADESPERSON PHOTOS
-- ============================================================================

-- Note: Run this in Supabase Storage dashboard or via Storage API
-- Bucket: 'tradesperson-photos'
-- Public: false (signed URLs only)
-- Max file size: 2MB
-- Allowed types: image/jpeg, image/png

-- ============================================================================
-- 5. UPDATE voice_configs RLS POLICIES (if needed for new fields)
-- ============================================================================

-- Existing RLS policies on voice_configs already cover SELECT/UPDATE for own records
-- No additional policy changes needed - new fields inherit existing policies

-- ============================================================================
-- 6. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_voice_configs_review_enabled ON voice_configs(review_enabled) WHERE review_enabled = true;

-- ============================================================================
-- Verification queries (run after applying)
-- ============================================================================

-- SELECT column_name FROM information_schema.columns WHERE table_name = 'voice_configs' AND column_name IN ('review_enabled', 'google_review_link', 'tradesperson_photo_url', 'tradesperson_name');
-- SELECT * FROM email_templates WHERE name = 'booking_confirmation_with_photo';
