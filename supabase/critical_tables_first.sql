/*
  # CRITICAL TABLES FIRST - Run this in Supabase SQL Editor
  # 
  # This creates the core tables needed for whoza.ai to function.
  # Run this script first, then run the optimization script.
  #
  # How to run:
  # 1. Go to https://supabase.com/dashboard/project/ryeqbewlmaqewsuvuhlm/sql-editor
  # 2. Click "New Query"
  # 3. Paste ALL of this script
  # 4. Click "Run"
  # 5. Check for green checkmark (success) or red X (errors)
  */

-- ============================================================================
-- STEP 1: CORE USER & BUSINESS TABLES
-- ============================================================================

-- business_profiles (links to auth.users)
CREATE TABLE IF NOT EXISTS business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  trade_type text NOT NULL,
  postcode text NOT NULL,
  service_area text,
  website_url text,
  google_business_url text,
  key_services text,
  credentials text,
  competitors text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own business profile"
  ON business_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own business profile"
  ON business_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business profile"
  ON business_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_business_profiles_user_id ON business_profiles(user_id);

-- ============================================================================
-- STEP 2: TASK SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS task_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('website', 'content', 'citations', 'reviews', 'social', 'technical', 'listings', 'foundational')),
  priority_score integer NOT NULL CHECK (priority_score >= 1 AND priority_score <= 100),
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  impact_areas jsonb DEFAULT '{}',
  prerequisites jsonb DEFAULT '{"categories": [], "templates": []}',
  template_text text NOT NULL,
  customization_rules jsonb DEFAULT '{}',
  estimated_time_minutes integer DEFAULT 30,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view active templates"
  ON task_templates FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_task_templates_category ON task_templates(category, is_active);

-- Tasks table (weekly tasks assigned to users)
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE,
  template_id uuid REFERENCES task_templates(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'approved', 'rejected')),
  priority text DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  due_date timestamptz,
  completed_at timestamptz,
  approved_at timestamptz,
  approved_by uuid,
  custom_instructions text,
  result_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_created ON tasks(user_id, created_at DESC);

-- ============================================================================
-- STEP 3: VISIBILITY SCORING
-- ============================================================================

CREATE TABLE IF NOT EXISTS visibility_score_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  score_date date NOT NULL DEFAULT CURRENT_DATE,
  overall_score integer NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  profile_completeness_score integer DEFAULT 0 CHECK (profile_completeness_score >= 0 AND profile_completeness_score <= 25),
  review_quality_score integer DEFAULT 0 CHECK (review_quality_score >= 0 AND review_quality_score <= 20),
  citation_presence_score integer DEFAULT 0 CHECK (citation_presence_score >= 0 AND citation_presence_score <= 20),
  content_relevance_score integer DEFAULT 0 CHECK (content_relevance_score >= 0 AND content_relevance_score <= 15),
  technical_seo_score integer DEFAULT 0 CHECK (technical_seo_score >= 0 AND technical_seo_score <= 10),
  social_presence_score integer DEFAULT 0 CHECK (social_presence_score >= 0 AND social_presence_score <= 10),
  benchmark_percentile integer DEFAULT 0 CHECK (benchmark_percentile >= 0 AND benchmark_percentile <= 100),
  month_over_month_change integer DEFAULT 0,
  recommendations jsonb DEFAULT '[]',
  calculation_metadata jsonb DEFAULT '{}',
  is_free_preview boolean DEFAULT false,
  score_band text CHECK (score_band IN ('Low', 'Medium', 'High')),
  summary_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id, score_date)
);

ALTER TABLE visibility_score_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.id = visibility_score_details.business_id
      AND business_profiles.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business ON visibility_score_details(business_id, score_date DESC);

-- ============================================================================
-- STEP 4: NOTIFICATION SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  is_enabled boolean DEFAULT true,
  requires_verification boolean DEFAULT false,
  available_plans text[] DEFAULT ARRAY['free', 'starter', 'growth', 'enterprise'],
  priority_order integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  default_enabled boolean DEFAULT true,
  user_can_disable boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type_id uuid,
  priority text DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  title text NOT NULL,
  content text NOT NULL,
  data jsonb DEFAULT '{}',
  scheduled_for timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'expired', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_status ON notifications(user_id, status);

-- ============================================================================
-- STEP 5: STRIPE SUPPORTING TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL UNIQUE,
  email text,
  name text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own stripe customer"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);

CREATE TABLE IF NOT EXISTS stripe_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  active boolean DEFAULT true,
  features text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stripe_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id text NOT NULL UNIQUE,
  stripe_product_id text NOT NULL,
  unit_amount integer,
  currency text DEFAULT 'gbp',
  recurring_interval text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- STEP 6: REX AI ENGINE TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_ece_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_clarity_score integer DEFAULT 0 CHECK (entity_clarity_score BETWEEN 0 AND 100),
  consensus_shaping_score integer DEFAULT 0 CHECK (consensus_shaping_score BETWEEN 0 AND 100),
  answer_readiness_score integer DEFAULT 0 CHECK (answer_readiness_score BETWEEN 0 AND 100),
  risk_reduction_score integer DEFAULT 0 CHECK (risk_reduction_score BETWEEN 0 AND 100),
  confidence_accretion_score integer DEFAULT 0 CHECK (confidence_accretion_score BETWEEN 0 AND 100),
  overall_ece_score integer DEFAULT 0 CHECK (overall_ece_score BETWEEN 0 AND 100),
  pillar_breakdown jsonb DEFAULT '{}',
  improvement_areas text[],
  strengths text[],
  evaluated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rex_ece_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evaluations"
  ON rex_ece_evaluations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_rex_ece_evaluations_business ON rex_ece_evaluations(business_id);

CREATE TABLE IF NOT EXISTS rex_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  evaluation_id uuid REFERENCES rex_ece_evaluations(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  pillar text NOT NULL CHECK (pillar IN ('entity_clarity', 'consensus_shaping', 'answer_readiness', 'risk_reduction', 'confidence_accretion')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dismissed', 'superseded')),
  priority text DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  estimated_impact text,
  time_to_complete_minutes integer,
  user_approved boolean DEFAULT false,
  approved_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rex_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recommendations"
  ON rex_recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business ON rex_recommendations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_user_status ON rex_recommendations(user_id, status);

-- ============================================================================
-- STEP 7: ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_category text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  business_id uuid REFERENCES business_profiles(id) ON DELETE SET NULL,
  event_data jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, created_at DESC);

-- ============================================================================
-- STEP 8: SEED DATA
-- ============================================================================

INSERT INTO notification_channels (name, display_name, is_enabled, requires_verification, priority_order) VALUES
  ('email', 'Email', true, true, 1),
  ('in_app', 'In-App', true, false, 2),
  ('whatsapp', 'WhatsApp', false, true, 3),
  ('sms', 'SMS', false, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO notification_types (name, display_name, description, default_enabled, user_can_disable) VALUES
  ('weekly_task', 'Weekly Task', 'Your weekly visibility task is ready', true, false),
  ('score_update', 'Score Update', 'Your monthly visibility score report', true, true),
  ('task_reminder', 'Task Reminder', 'Reminder to complete your pending task', true, true),
  ('system_alert', 'System Alert', 'Important system notifications', true, false)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 9: UPDATE TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('business_profiles', 'tasks', 'task_templates', 'visibility_score_details',
                       'notifications', 'stripe_customers', 'stripe_products', 'stripe_prices',
                       'rex_ece_evaluations', 'rex_recommendations', 'analytics_events')
  LOOP
    EXECUTE format('CREATE TRIGGER IF NOT EXISTS update_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', r.table_name, r.table_name);
  END LOOP;
END $$;

-- ============================================================================
-- STEP 10: AUDIT OPTIMIZATION INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business_free_date 
  ON visibility_score_details(business_id, is_free_preview, score_date DESC);

CREATE INDEX IF NOT EXISTS idx_tasks_business_status ON tasks(business_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_pending ON tasks(status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business_active ON rex_recommendations(business_id, status) WHERE status = 'active';

-- ============================================================================
-- VERIFICATION: List all created tables
-- ============================================================================

SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('business_profiles', 'tasks', 'task_templates', 'visibility_score_details',
                  'notification_channels', 'notification_types', 'notifications',
                  'stripe_customers', 'stripe_products', 'stripe_prices',
                  'rex_ece_evaluations', 'rex_recommendations', 'analytics_events')
ORDER BY tablename;
