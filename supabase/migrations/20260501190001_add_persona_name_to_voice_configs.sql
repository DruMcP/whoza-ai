-- Migration: Add persona_name to voice_configs
-- Allows users to choose between Katie (female) or Mark (male) AI persona
-- Run in Supabase SQL Editor

-- Add persona_name column to voice_configs
ALTER TABLE voice_configs ADD COLUMN IF NOT EXISTS persona_name TEXT DEFAULT 'Katie';

-- Add constraint to ensure valid values
ALTER TABLE voice_configs DROP CONSTRAINT IF EXISTS voice_configs_persona_name_check;
ALTER TABLE voice_configs ADD CONSTRAINT voice_configs_persona_name_check
    CHECK (persona_name IN ('Katie', 'Mark'));

-- Update existing records to default to Katie (backward compatible)
UPDATE voice_configs SET persona_name = 'Katie' WHERE persona_name IS NULL;

-- Update comment
COMMENT ON COLUMN voice_configs.persona_name IS 'AI persona name: Katie (female) or Mark (male)';

-- Note: voice_gender column already exists and should be kept in sync with persona_name
--   Katie -> female, Mark -> male
--   But decoupled to allow future flexibility (e.g., Katie with male voice for accessibility)
