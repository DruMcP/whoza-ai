/*
  # Task Generation System Schema

  ## New Tables

  ### `task_templates`
  - `id` (uuid, primary key) - Unique template identifier
  - `title` (text) - Template title with placeholders
  - `description` (text) - Template description
  - `category` (text) - Task category: 'website', 'content', 'citations', 'reviews', 'social', 'technical', 'listings'
  - `priority_score` (integer) - Base priority score (1-100)
  - `difficulty_level` (text) - Difficulty: 'beginner', 'intermediate', 'advanced'
  - `impact_areas` (jsonb) - Areas of improvement: {'visibility': true, 'citations': true, 'reviews': true}
  - `prerequisites` (jsonb) - Required completions: {'categories': ['website'], 'templates': []}
  - `template_text` (text) - Copy-paste text with placeholders like {business_name}, {service_area}
  - `customization_rules` (jsonb) - Rules for customization
  - `estimated_time_minutes` (integer) - Estimated completion time
  - `is_active` (boolean) - Whether template is currently active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `task_generation_state`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, unique)
  - `business_id` (uuid, references business_profiles)
  - `skill_level` (text) - Current skill level: 'beginner', 'intermediate', 'advanced'
  - `completed_categories` (jsonb) - Completed category counts
  - `completed_templates` (text[]) - Array of completed template IDs
  - `last_task_generated_at` (timestamptz) - Last task generation timestamp
  - `next_task_priority` (text) - Next recommended priority area
  - `profile_completeness_score` (integer) - Profile completeness (0-100)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `task_generation_log`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `task_id` (uuid, references tasks)
  - `template_id` (uuid, references task_templates)
  - `generation_reason` (text) - Why this task was selected
  - `priority_score` (integer) - Calculated priority at generation time
  - `generated_at` (timestamptz) - Generation timestamp

  ## Security
  - Enable RLS on all tables
  - Admin-only access for task_templates
  - User access to their own generation state and logs
*/

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create task_templates table
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

CREATE POLICY "Admin can manage task templates"
  ON task_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "All authenticated users can view active templates"
  ON task_templates FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create task_generation_state table
CREATE TABLE IF NOT EXISTS task_generation_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE,
  skill_level text DEFAULT 'beginner' CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  completed_categories jsonb DEFAULT '{}',
  completed_templates text[] DEFAULT ARRAY[]::text[],
  last_task_generated_at timestamptz,
  next_task_priority text,
  profile_completeness_score integer DEFAULT 0 CHECK (profile_completeness_score >= 0 AND profile_completeness_score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_generation_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generation state"
  ON task_generation_state FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own generation state"
  ON task_generation_state FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation state"
  ON task_generation_state FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage all generation states"
  ON task_generation_state FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create task_generation_log table
CREATE TABLE IF NOT EXISTS task_generation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  template_id uuid REFERENCES task_templates(id) ON DELETE SET NULL,
  generation_reason text,
  priority_score integer,
  generated_at timestamptz DEFAULT now()
);

ALTER TABLE task_generation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can insert generation logs"
  ON task_generation_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_task_templates_category 
  ON task_templates(category, is_active);

CREATE INDEX IF NOT EXISTS idx_task_templates_priority 
  ON task_templates(priority_score DESC);

CREATE INDEX IF NOT EXISTS idx_task_generation_state_user 
  ON task_generation_state(user_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user 
  ON task_generation_log(user_id, generated_at DESC);

-- Update trigger for updated_at columns
DROP TRIGGER IF EXISTS update_task_templates_updated_at ON task_templates;
CREATE TRIGGER update_task_templates_updated_at
  BEFORE UPDATE ON task_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_task_generation_state_updated_at ON task_generation_state;
CREATE TRIGGER update_task_generation_state_updated_at
  BEFORE UPDATE ON task_generation_state
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
