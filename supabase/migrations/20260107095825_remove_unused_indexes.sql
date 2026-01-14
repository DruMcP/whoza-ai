/*
  # Remove Unused Indexes

  ## Overview
  Removes 4 indexes that have never been used according to pg_stat_user_indexes.
  Unused indexes consume storage and slow down INSERT/UPDATE operations.

  ## Changes
  - Drop idx_free_score_submissions_google_data_gin
  - Drop idx_free_score_submissions_user_id_fk
  - Drop idx_tasks_business_id_fk
  - Drop idx_free_score_rate_limits_email_sent_at
*/

DROP INDEX IF EXISTS public.idx_free_score_submissions_google_data_gin;
DROP INDEX IF EXISTS public.idx_free_score_submissions_user_id_fk;
DROP INDEX IF EXISTS public.idx_tasks_business_id_fk;
DROP INDEX IF EXISTS public.idx_free_score_rate_limits_email_sent_at;
