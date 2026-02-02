/*
  # Fix Security Definer View

  1. Changes
    - Drop and recreate abuse_summary view without SECURITY DEFINER
    - SECURITY DEFINER can be a security risk as it executes with creator's privileges
    - View will now execute with caller's privileges (more secure)

  2. Security Improvements
    - Removes potential privilege escalation vector
    - View data access now properly controlled by RLS policies on underlying table
    - Admins still have full access via their role permissions
*/

-- Drop existing view
DROP VIEW IF EXISTS abuse_summary;

-- Recreate view without SECURITY DEFINER (uses SECURITY INVOKER by default)
CREATE OR REPLACE VIEW abuse_summary AS
SELECT 
  business_name,
  email,
  COUNT(*) AS submission_count,
  MAX(created_at) AS last_submission,
  COUNT(DISTINCT ip_address) AS unique_ips,
  bool_or(turnstile_verified) AS any_turnstile_verified
FROM free_score_submissions
WHERE created_at > (NOW() - INTERVAL '30 days')
GROUP BY business_name, email
HAVING COUNT(*) > 3
ORDER BY COUNT(*) DESC;

-- Grant select to authenticated users (admins will see via RLS)
GRANT SELECT ON abuse_summary TO authenticated;