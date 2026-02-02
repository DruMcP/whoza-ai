/*
  # Rex Decision Engine - Entity Confidence Engineering System

  ## Overview
  Implements Rex, an AI decision engine that uses Entity Confidence Engineering (ECE)
  to generate ONE human-approved action at a time to increase business visibility
  through entity clarity, consensus, and trust.

  ## Core Principles
  - ONE recommendation per business at a time
  - All actions require explicit human approval
  - Focus on 5 ECE pillars: Entity Clarity, Consensus Shaping, Answer Readiness, 
    Risk Reduction, and Confidence Accretion
  - Conservative, incremental, trust-first approach

  ## New Tables
  1. `rex_ece_evaluations` - Stores ECE pillar assessments for each business
  2. `rex_recommendations` - Current ONE active recommendation per business
  3. `rex_action_history` - Historical record of completed actions and impact
  4. `rex_confidence_scores` - Time-series tracking of confidence accretion
  5. `rex_evaluation_criteria` - Configurable criteria for ECE assessment

  ## Security
  - RLS enabled on all tables
  - Users can only access their own business data
  - Admins can view all data for support purposes
*/

-- ============================================================================
-- ECE EVALUATION CRITERIA
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_evaluation_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar text NOT NULL CHECK (pillar IN (
    'entity_clarity',
    'consensus_shaping', 
    'answer_readiness',
    'risk_reduction',
    'confidence_accretion'
  )),
  criterion_key text NOT NULL,
  criterion_name text NOT NULL,
  description text NOT NULL,
  weight integer NOT NULL DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(pillar, criterion_key)
);

ALTER TABLE rex_evaluation_criteria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active criteria"
  ON rex_evaluation_criteria FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admin can manage criteria"
  ON rex_evaluation_criteria FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- ============================================================================
-- ECE EVALUATIONS (5 Pillars Assessment)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_ece_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Entity Clarity (0-100)
  entity_clarity_score integer NOT NULL DEFAULT 0 CHECK (entity_clarity_score BETWEEN 0 AND 100),
  entity_clarity_notes text,
  entity_clarity_weaknesses jsonb DEFAULT '[]'::jsonb,
  
  -- Consensus Shaping (0-100)
  consensus_score integer NOT NULL DEFAULT 0 CHECK (consensus_score BETWEEN 0 AND 100),
  consensus_notes text,
  consensus_conflicts jsonb DEFAULT '[]'::jsonb,
  
  -- Answer Readiness (0-100)
  answer_readiness_score integer NOT NULL DEFAULT 0 CHECK (answer_readiness_score BETWEEN 0 AND 100),
  answer_readiness_notes text,
  answer_readiness_gaps jsonb DEFAULT '[]'::jsonb,
  
  -- Risk Reduction (0-100)
  risk_reduction_score integer NOT NULL DEFAULT 0 CHECK (risk_reduction_score BETWEEN 0 AND 100),
  risk_reduction_notes text,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  
  -- Confidence Accretion (0-100)
  confidence_score integer NOT NULL DEFAULT 0 CHECK (confidence_score BETWEEN 0 AND 100),
  confidence_notes text,
  confidence_opportunities jsonb DEFAULT '[]'::jsonb,
  
  -- Overall Assessment
  overall_score integer GENERATED ALWAYS AS (
    (entity_clarity_score + consensus_score + answer_readiness_score + 
     risk_reduction_score + confidence_score) / 5
  ) STORED,
  weakest_pillar text,
  evaluation_data jsonb DEFAULT '{}'::jsonb,
  
  evaluated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rex_ece_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evaluations"
  ON rex_ece_evaluations FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own evaluations"
  ON rex_ece_evaluations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all evaluations"
  ON rex_ece_evaluations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_evaluations_business ON rex_ece_evaluations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_user ON rex_ece_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_overall_score ON rex_ece_evaluations(overall_score);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_evaluated_at ON rex_ece_evaluations(evaluated_at);

-- ============================================================================
-- REX RECOMMENDATIONS (ONE Active Per Business)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  evaluation_id uuid REFERENCES rex_ece_evaluations(id) ON DELETE SET NULL,
  
  -- Recommendation Details
  target_pillar text NOT NULL CHECK (target_pillar IN (
    'entity_clarity',
    'consensus_shaping',
    'answer_readiness',
    'risk_reduction',
    'confidence_accretion'
  )),
  action_type text NOT NULL,
  title text NOT NULL,
  explanation text NOT NULL,
  exact_copy text,
  application_location text NOT NULL,
  expected_impact text NOT NULL,
  estimated_minutes integer DEFAULT 5,
  
  -- Status Tracking
  status text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft',
    'sent_to_admin',
    'sent_to_customer',
    'approved',
    'in_progress',
    'completed',
    'declined',
    'superseded'
  )),
  
  -- Approval Workflow
  generated_at timestamptz DEFAULT now(),
  sent_to_admin_at timestamptz,
  sent_to_customer_at timestamptz,
  approved_at timestamptz,
  completed_at timestamptz,
  declined_at timestamptz,
  decline_reason text,
  
  -- Impact Tracking
  completion_notes text,
  actual_impact_notes text,
  confidence_increase integer,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create partial unique index to ensure only ONE active recommendation per business
CREATE UNIQUE INDEX IF NOT EXISTS idx_rex_recommendations_one_active_per_business 
ON rex_recommendations(business_id) 
WHERE status IN ('draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress');

ALTER TABLE rex_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recommendations"
  ON rex_recommendations FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update own recommendations"
  ON rex_recommendations FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all recommendations"
  ON rex_recommendations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage recommendations"
  ON rex_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business ON rex_recommendations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_user ON rex_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_status ON rex_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_target_pillar ON rex_recommendations(target_pillar);

-- ============================================================================
-- REX ACTION HISTORY
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_action_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id uuid REFERENCES rex_recommendations(id) ON DELETE SET NULL,
  evaluation_id uuid REFERENCES rex_ece_evaluations(id) ON DELETE SET NULL,
  
  -- Action Details
  target_pillar text NOT NULL,
  action_type text NOT NULL,
  title text NOT NULL,
  what_changed text NOT NULL,
  where_applied text NOT NULL,
  
  -- Impact Measurement
  confidence_before integer,
  confidence_after integer,
  confidence_increase integer,
  pillar_score_before integer,
  pillar_score_after integer,
  impact_notes text,
  
  -- Timeline
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rex_action_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own action history"
  ON rex_action_history FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own action history"
  ON rex_action_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all action history"
  ON rex_action_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_history_business ON rex_action_history(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_history_user ON rex_action_history(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_history_completed ON rex_action_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_rex_history_pillar ON rex_action_history(target_pillar);

-- ============================================================================
-- REX CONFIDENCE SCORES (Time-Series)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_confidence_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Pillar Scores
  entity_clarity_score integer NOT NULL DEFAULT 0 CHECK (entity_clarity_score BETWEEN 0 AND 100),
  consensus_score integer NOT NULL DEFAULT 0 CHECK (consensus_score BETWEEN 0 AND 100),
  answer_readiness_score integer NOT NULL DEFAULT 0 CHECK (answer_readiness_score BETWEEN 0 AND 100),
  risk_reduction_score integer NOT NULL DEFAULT 0 CHECK (risk_reduction_score BETWEEN 0 AND 100),
  confidence_score integer NOT NULL DEFAULT 0 CHECK (confidence_score BETWEEN 0 AND 100),
  
  -- Overall
  overall_confidence integer NOT NULL DEFAULT 0 CHECK (overall_confidence BETWEEN 0 AND 100),
  
  -- Context
  measurement_type text NOT NULL CHECK (measurement_type IN (
    'initial',
    'post_action',
    'monthly_review',
    'manual'
  )),
  triggered_by_action_id uuid REFERENCES rex_action_history(id) ON DELETE SET NULL,
  notes text,
  
  measured_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rex_confidence_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own confidence scores"
  ON rex_confidence_scores FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own confidence scores"
  ON rex_confidence_scores FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all confidence scores"
  ON rex_confidence_scores FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_confidence_business ON rex_confidence_scores(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_user ON rex_confidence_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_measured ON rex_confidence_scores(measured_at);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_type ON rex_confidence_scores(measurement_type);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION get_active_rex_recommendation(p_business_id uuid)
RETURNS TABLE (
  recommendation_id uuid,
  title text,
  status text,
  target_pillar text,
  generated_at timestamptz
)
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    id,
    rex_recommendations.title,
    rex_recommendations.status,
    rex_recommendations.target_pillar,
    rex_recommendations.generated_at
  FROM rex_recommendations
  WHERE business_id = p_business_id
    AND status IN ('draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress')
  ORDER BY generated_at DESC
  LIMIT 1;
END;
$$;

CREATE OR REPLACE FUNCTION get_confidence_trend(p_business_id uuid, p_days integer DEFAULT 30)
RETURNS TABLE (
  measured_at timestamptz,
  overall_confidence integer,
  entity_clarity integer,
  consensus integer,
  answer_readiness integer,
  risk_reduction integer,
  confidence integer
)
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rex_confidence_scores.measured_at,
    rex_confidence_scores.overall_confidence,
    rex_confidence_scores.entity_clarity_score,
    rex_confidence_scores.consensus_score,
    rex_confidence_scores.answer_readiness_score,
    rex_confidence_scores.risk_reduction_score,
    rex_confidence_scores.confidence_score
  FROM rex_confidence_scores
  WHERE business_id = p_business_id
    AND measured_at >= now() - (p_days || ' days')::interval
  ORDER BY measured_at ASC;
END;
$$;

-- ============================================================================
-- SEED DEFAULT ECE CRITERIA
-- ============================================================================

INSERT INTO rex_evaluation_criteria (pillar, criterion_key, criterion_name, description, weight) VALUES
('entity_clarity', 'business_role_clear', 'Business Role Clarity', 'Is what the business does immediately clear and unambiguous?', 5),
('entity_clarity', 'service_location_consistent', 'Service + Location Consistency', 'Are services and service areas consistently described everywhere?', 4),
('entity_clarity', 'primary_service_obvious', 'Primary Service Obvious', 'Can someone instantly name the main service offered?', 5),
('entity_clarity', 'no_generic_terms', 'No Generic Terminology', 'Avoids vague terms like solutions or services', 3),

('consensus_shaping', 'website_profile_match', 'Website-Profile Alignment', 'Website and profiles describe business identically', 5),
('consensus_shaping', 'review_description_match', 'Review-Description Consistency', 'Customer reviews reflect stated services', 4),
('consensus_shaping', 'no_conflicting_categories', 'No Category Conflicts', 'Business categories are consistent across platforms', 4),
('consensus_shaping', 'unified_value_prop', 'Unified Value Proposition', 'Core promise is stated the same way everywhere', 5),

('answer_readiness', 'faq_answer_style', 'FAQ in Answer Format', 'FAQs written as direct answers to questions', 4),
('answer_readiness', 'service_desc_conversational', 'Conversational Service Descriptions', 'Services described in natural, helpful language', 3),
('answer_readiness', 'location_pages_specific', 'Specific Location Content', 'Location pages answer why hire us HERE', 4),
('answer_readiness', 'anticipates_objections', 'Addresses Concerns', 'Content preemptively answers common concerns', 3),

('risk_reduction', 'credentials_explicit', 'Explicit Credentials', 'Licenses, certifications prominently displayed and verifiable', 5),
('risk_reduction', 'boundaries_clear', 'Clear Service Boundaries', 'Explicitly states what is and is not offered', 4),
('risk_reduction', 'verification_easy', 'Easy Verification', 'Claims can be quickly fact-checked', 5),
('risk_reduction', 'contact_transparent', 'Transparent Contact Info', 'Real address, phone, contact methods visible', 3),

('confidence_accretion', 'incremental_improvements', 'Small Consistent Improvements', 'Regular small updates vs rare big changes', 4),
('confidence_accretion', 'review_response_quality', 'Review Response Quality', 'Thoughtful, specific responses to reviews', 3),
('confidence_accretion', 'content_freshness', 'Content Freshness', 'Recent updates signal active business', 3),
('confidence_accretion', 'proof_elements', 'Trust Proof Elements', 'Before/after, testimonials, case examples present', 4)
ON CONFLICT (pillar, criterion_key) DO NOTHING;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_rex_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_rex_evaluation_criteria_updated_at
  BEFORE UPDATE ON rex_evaluation_criteria
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();

CREATE TRIGGER update_rex_ece_evaluations_updated_at
  BEFORE UPDATE ON rex_ece_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();

CREATE TRIGGER update_rex_recommendations_updated_at
  BEFORE UPDATE ON rex_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();