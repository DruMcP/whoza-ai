/*
  # Remove Unused Indexes

  1. Changes
    - Remove indexes that are not being used by queries
    - Keep indexes that may become useful as the application scales
    - Only remove truly redundant indexes

  2. Indexes Removed
    - idx_free_score_submissions_user_id (redundant, user_id is nullable and not frequently queried)
    - idx_tasks_business_id (covered by other indexes with business_id as first column)

  3. Indexes Kept (despite low current usage)
    - idx_ai_team_waitlist_email (will be used for admin queries)
    - idx_ai_team_waitlist_product (will be used for product-specific analytics)
    - idx_ai_team_waitlist_created_at (useful for chronological queries)
*/

-- Remove truly unused indexes
DROP INDEX IF EXISTS idx_free_score_submissions_user_id;
DROP INDEX IF EXISTS idx_tasks_business_id;