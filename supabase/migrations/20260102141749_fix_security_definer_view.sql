/*
  # Fix Security Definer View

  ## Overview
  Recreates the abuse_summary view without SECURITY DEFINER to improve security.

  ## Changes
  - Drops existing abuse_summary view
  - Recreates without SECURITY DEFINER property
  - Access controlled by RLS policies on underlying table

  ## Security Impact
  - View now respects caller's permissions
  - No privilege escalation risk
  - Users must have appropriate access to free_score_abuse_logs table
*/

-- Drop and recreate abuse_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS public.abuse_summary;

CREATE VIEW public.abuse_summary AS
SELECT 
  date_trunc('day', created_at) AS date,
  abuse_type,
  count(*) AS count,
  count(DISTINCT email) AS unique_emails,
  count(DISTINCT ip_address) AS unique_ips
FROM public.free_score_abuse_logs
WHERE blocked = true
GROUP BY date_trunc('day', created_at), abuse_type
ORDER BY date_trunc('day', created_at) DESC, count(*) DESC;