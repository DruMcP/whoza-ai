/*
  # Create Users Table for Onboarding

  ## Overview
  Creates the core `users` table to store user profiles and business information collected during the sign-up process.

  ## New Tables
  
  ### `users`
  Core user profile and business information table
  
  | Column | Type | Description |
  |--------|------|-------------|
  | id | uuid | Primary key, references auth.users(id) |
  | email | text | User's email address (indexed) |
  | business_name | text | Name of the business |
  | trade_type | text | Type of trade/service (e.g., Plumber, Electrician) |
  | postcode | text | Business postcode |
  | service_area | text | Geographic service area |
  | website_url | text | Business website URL (optional) |
  | google_business_url | text | Google Business Profile URL (optional) |
  | key_services | text | Main services offered (optional) |
  | credentials | text | Professional credentials/certifications (optional) |
  | competitors | text | Known competitors (optional) |
  | founder | boolean | Founder's Circle interest flag |
  | role | text | User role (default: 'customer') |
  | subscription_tier | text | Current subscription tier (default: 'free') |
  | subscription_status | text | Subscription status (default: 'trial') |
  | created_at | timestamptz | Account creation timestamp |
  | updated_at | timestamptz | Last update timestamp |

  ## Security
  
  ### Row Level Security (RLS)
  - ✅ RLS enabled on users table
  - ✅ Users can view their own profile
  - ✅ Users can insert their own profile (during sign-up)
  - ✅ Users can update their own profile
  - ✅ Admin users can view all profiles
  - ✅ No public access

  ## Indexes
  - Primary key on id
  - Index on email for faster lookups
  - Index on role for admin queries

  ## Notes
  - The `id` column references `auth.users(id)` with CASCADE delete
  - All optional fields can be NULL
  - Timestamps auto-update via trigger
  - Subscription fields default to free trial
*/

-- Drop table if it exists (clean slate)
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  business_name text NOT NULL,
  trade_type text NOT NULL,
  postcode text NOT NULL,
  service_area text,
  website_url text,
  google_business_url text,
  key_services text,
  credentials text,
  competitors text,
  founder boolean DEFAULT false,
  role text NOT NULL DEFAULT 'customer',
  subscription_tier text DEFAULT 'free',
  subscription_status text DEFAULT 'trial',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Create trigger
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policy: Users can insert their own profile during sign-up
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.role = 'admin'
    )
  );

-- RLS Policy: Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.role = 'admin'
    )
  );

-- Add comments for documentation
COMMENT ON TABLE users IS 'Core user profiles and business information collected during onboarding';
COMMENT ON COLUMN users.founder IS 'Indicates interest in Founders Circle program';
COMMENT ON COLUMN users.role IS 'User role: customer, admin';
COMMENT ON COLUMN users.subscription_tier IS 'Subscription tier: free, starter, pro, enterprise';
COMMENT ON COLUMN users.subscription_status IS 'Subscription status: trial, active, cancelled, past_due';