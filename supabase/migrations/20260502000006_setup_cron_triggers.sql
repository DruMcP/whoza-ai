-- Cron Trigger Setup for Background Jobs
-- Sets up pg_cron extension and creates scheduled jobs to trigger edge functions
-- for email campaigns, notifications, and Claire review reminders.
-- Prerequisites:
-- - pg_cron extension must be enabled (Supabase does this automatically)
-- - pg_net extension for HTTP requests (Supabase supports this)
-- - Service role key must be set as a vault secret or env variable
-- Jobs Created:
-- process-email-campaigns: Daily at 9:00 AM UTC (0 9 * * *)
-- process-notifications: Every 15 minutes (asterisk/15 * * * *)
-- claire-reminder: Hourly (0 * * * *)

-- =============================================================================
-- STEP 1: Enable Required Extensions
-- =============================================================================

-- Enable pg_cron extension (for job scheduling)
-- Note: This requires superuser privileges. On Supabase, it's pre-enabled.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
        CREATE EXTENSION IF NOT EXISTS pg_cron;
    END IF;
END
$$;

-- Enable pg_net extension (for HTTP requests)
-- Note: This is the standard way to make HTTP calls from PostgreSQL in Supabase
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_net') THEN
        CREATE EXTENSION IF NOT EXISTS pg_net;
    END IF;
END
$$;

-- =============================================================================
-- STEP 2: Create Helper Function for Edge Function Invocation
-- =============================================================================

-- Helper function to invoke Supabase edge functions via pg_net.
-- This function constructs the proper HTTP POST request with the service role key.
-- The service role key should be stored in Supabase vault for security.
-- Alternative: You can also use Supabase's internal function invocation if available:
-- - net.http_post() with proper Authorization header
-- For production deployments, consider using Supabase's scheduled functions feature
-- or setting up the service role key in vault:
--   SELECT vault.create_secret('your-service-role-key', 'service_role_key');

CREATE OR REPLACE FUNCTION invoke_edge_function(
    function_name TEXT,
    service_role_key TEXT DEFAULT NULL
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    request_id BIGINT;
    supabase_url TEXT := 'https://ligjstpxqtkurvteyyhw.supabase.co';
    full_url TEXT;
    auth_header TEXT;
    key TEXT;
BEGIN
    -- Construct full URL
    full_url := supabase_url || '/functions/v1/' || function_name;
    
    -- Get service role key (prefer passed parameter, fallback to environment)
    -- In production, this should come from vault or environment
    key := COALESCE(
        service_role_key,
        current_setting('app.service_role_key', true),
        ''
    );
    
    -- If no key available, log warning and return NULL
    IF key = '' THEN
        RAISE WARNING 'No service role key configured for edge function invocation. Set app.service_role_key or pass as parameter.';
        RETURN NULL;
    END IF;
    
    auth_header := 'Bearer ' || key;
    
    -- Make async HTTP POST request using pg_net
    SELECT net.http_post(
        url := full_url,
        headers := jsonb_build_object(
            'Authorization', auth_header,
            'Content-Type', 'application/json',
            'apikey', key
        ),
        body := '{}'::jsonb,
        timeout_milliseconds := 30000  -- 30 second timeout
    ) INTO request_id;
    
    RETURN request_id;
END;
$$;

COMMENT ON FUNCTION invoke_edge_function IS 'Invokes a Supabase edge function via pg_net HTTP POST. Requires service role key to be configured.';

-- =============================================================================
-- STEP 3: Create Cron Jobs
-- =============================================================================

-- IMPORTANT: Before deploying, ensure the service role key is available.
-- Option 1 - Set database config (for this session):
-- ALTER DATABASE postgres SET app.service_role_key = 'your-key';
-- Option 2 - Use Supabase Vault (recommended):
-- SELECT vault.create_secret('your-service-role-key', 'service_role_key');
-- Then modify invoke_edge_function to read from vault
-- Option 3 - Pass key directly in job (less secure, visible in cron.job table):
-- SELECT cron.schedule('job-name', 'cron-expression',
--   'SELECT invoke_edge_function(''function-name'', ''your-key'')');

-- Unschedule existing jobs if they exist (idempotent)
SELECT cron.unschedule('process-email-campaigns') WHERE EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'process-email-campaigns'
);
SELECT cron.unschedule('process-notifications') WHERE EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'process-notifications'
);
SELECT cron.unschedule('claire-reminder') WHERE EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'claire-reminder'
);

-- -----------------------------------------------------------------------------
-- Job 1: Process Email Campaigns (Daily at 9:00 AM UTC)
-- -----------------------------------------------------------------------------
-- This job checks for due campaign emails and sends them
SELECT cron.schedule(
    'process-email-campaigns',
    '0 9 * * *',  -- At 09:00 UTC daily
    'SELECT invoke_edge_function(''process-email-campaigns'')'
);

-- -----------------------------------------------------------------------------
-- Job 2: Process Notifications (Every 15 minutes)
-- -----------------------------------------------------------------------------
-- This job checks for pending notifications and sends them
SELECT cron.schedule(
    'process-notifications',
    '*/15 * * * *',  -- Every 15 minutes
    'SELECT invoke_edge_function(''process-notifications'')'
);

-- -----------------------------------------------------------------------------
-- Job 3: Claire Reminder (Hourly)
-- -----------------------------------------------------------------------------
-- This job sends review reminders for unclicked review requests after 24 hours
SELECT cron.schedule(
    'claire-reminder',
    '0 * * * *',  -- At the start of every hour
    'SELECT invoke_edge_function(''claire-reminder'')'
);

-- =============================================================================
-- STEP 4: Verification View
-- =============================================================================

-- Create a view for easy monitoring of cron jobs
CREATE OR REPLACE VIEW cron_job_status AS
SELECT 
    j.jobid,
    j.jobname,
    j.schedule,
    j.active,
    j.command,
    r.runid,
    r.status,
    r.start_time,
    r.end_time,
    CASE 
        WHEN r.status = 'succeeded' THEN '✅ Success'
        WHEN r.status = 'failed' THEN '❌ Failed'
        WHEN r.status = 'running' THEN '🔄 Running'
        ELSE '⏳ Pending'
    END AS status_emoji
FROM cron.job j
LEFT JOIN LATERAL (
    SELECT * FROM cron.job_run_details 
    WHERE jobid = j.jobid 
    ORDER BY start_time DESC 
    LIMIT 1
) r ON true
WHERE j.jobname IN ('process-email-campaigns', 'process-notifications', 'claire-reminder')
ORDER BY j.jobname;

COMMENT ON VIEW cron_job_status IS 'Monitor the status of background job cron schedules';

-- =============================================================================
-- STEP 5: Documentation / Alternative Approaches
-- =============================================================================

-- ALTERNATIVE APPROACHES if pg_net is not available:
-- 1. Use Supabase Edge Functions with Scheduled Invocations (Recommended)
--    Supabase now supports native scheduled functions. Consider migrating to:
--    https://supabase.com/docs/guides/functions/schedule-functions
-- 2. Use an External Cron Service
--    Services like cron-job.org, EasyCron, or GitHub Actions can trigger your
--    edge functions via HTTP POST with the service role key in headers.
-- 3. Use pg_cron with pg_http (if available)
--    Similar to pg_net but different API:
--    SELECT http_post(
--        url := 'https://.../functions/v1/...',
--        data := '{}',
--        headers := ARRAY[http_header('Authorization', 'Bearer ...')]
--    );
-- 4. Direct SQL Processing (No Edge Functions)
--    Move the logic into PostgreSQL functions that run directly in cron jobs
--    without calling external HTTP endpoints. This is more performant but
--    loses the benefits of edge function environment (Deno, external APIs, etc.)

-- =============================================================================
-- DEPLOYMENT CHECKLIST
-- =============================================================================

-- POST-MIGRATION STEPS:
-- 1. Verify extensions are enabled:
--    SELECT * FROM pg_extension WHERE extname IN ('pg_cron', 'pg_net');
-- 2. Configure the service role key:
--    Option A - Database config (simple, visible to db admins):
--    ALTER DATABASE postgres SET app.service_role_key = 'eyJhbG...your-key...';
--    Option B - Update the invoke_edge_function to read from vault (secure):
--    Modify the function to:
--      key := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'service_role_key');
-- 3. Verify jobs are scheduled:
--    SELECT * FROM cron.job;
-- 4. Check job run history:
--    SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 20;
-- 5. Monitor via the status view:
--    SELECT * FROM cron_job_status;
-- 6. Test manually (optional):
--    SELECT invoke_edge_function('process-email-campaigns', 'your-service-role-key');
--    SELECT net.http_get('https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/process-email-campaigns',
--      headers := '{"Authorization": "Bearer your-key"}'::jsonb);
-- 7. Check edge function logs in Supabase Dashboard for execution results
