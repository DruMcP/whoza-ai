/*
  # Create AI Team Waitlist System

  1. New Tables
    - `ai_team_waitlist`
      - `id` (uuid, primary key)
      - `email` (text, email address of interested user)
      - `product` (text, which AI team member: 'chloe' or 'simon')
      - `created_at` (timestamptz, when they signed up)
      - Unique constraint on (email, product) to prevent duplicates

  2. Security
    - Enable RLS on `ai_team_waitlist` table
    - Allow anonymous inserts (for public waitlist signup)
    - Allow authenticated users to view their own waitlist entries
*/

-- Create waitlist table for AI Team notifications
CREATE TABLE IF NOT EXISTS ai_team_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT NOT NULL CHECK (product IN ('chloe', 'simon')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_email_product UNIQUE(email, product)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_team_waitlist_email ON ai_team_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_ai_team_waitlist_product ON ai_team_waitlist(product);
CREATE INDEX IF NOT EXISTS idx_ai_team_waitlist_created_at ON ai_team_waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE ai_team_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public waitlist signup)
CREATE POLICY "Allow anonymous inserts" ON ai_team_waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to view their own waitlist entries
CREATE POLICY "Users can view own waitlist entries" ON ai_team_waitlist
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow admins to view all waitlist entries
CREATE POLICY "Admins can view all waitlist entries" ON ai_team_waitlist
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );