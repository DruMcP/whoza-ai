/*
  # Add ECE Pillar to Task System

  1. Changes
    - Add `ece_pillar` column to `task_templates` table
    - Add `ece_pillar` column to `tasks` table
    - Create index on `ece_pillar` for fast filtering
  
  2. Notes
    - ECE Pillars: CLARITY, CONSENSUS, ANSWERABILITY, SAFETY, CONTEXT
    - This allows tasks to be categorized by Entity Confidence Engineering pillars
*/

-- Add ece_pillar to task_templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'ece_pillar'
  ) THEN
    ALTER TABLE task_templates 
    ADD COLUMN ece_pillar text CHECK (ece_pillar IN ('CLARITY', 'CONSENSUS', 'ANSWERABILITY', 'SAFETY', 'CONTEXT'));
  END IF;
END $$;

-- Add ece_pillar to tasks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'ece_pillar'
  ) THEN
    ALTER TABLE tasks 
    ADD COLUMN ece_pillar text CHECK (ece_pillar IN ('CLARITY', 'CONSENSUS', 'ANSWERABILITY', 'SAFETY', 'CONTEXT'));
  END IF;
END $$;

-- Create index for fast filtering by pillar
CREATE INDEX IF NOT EXISTS idx_task_templates_ece_pillar ON task_templates(ece_pillar);
CREATE INDEX IF NOT EXISTS idx_tasks_ece_pillar ON tasks(ece_pillar);
