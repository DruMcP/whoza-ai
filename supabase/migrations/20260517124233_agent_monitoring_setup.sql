-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create agent_metrics table for autonomous monitoring
-- Tracks all agent health checks and metrics
CREATE TABLE IF NOT EXISTS public.agent_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for querying by agent and time
CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent_time 
  ON public.agent_metrics (agent_name, created_at DESC);

-- Index for metric type queries
CREATE INDEX IF NOT EXISTS idx_agent_metrics_type_time 
  ON public.agent_metrics (metric_type, created_at DESC);

-- Enable RLS
ALTER TABLE public.agent_metrics ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'agent_metrics' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.agent_metrics
      FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'agent_metrics' AND policyname = 'Authenticated read access'
  ) THEN
    CREATE POLICY "Authenticated read access" ON public.agent_metrics
      FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- Create call_baselines table for anomaly detection
-- Stores historical call volume baselines
CREATE TABLE IF NOT EXISTS public.call_baselines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  hour_of_day INTEGER NOT NULL CHECK (hour_of_day BETWEEN 0 AND 23),
  avg_calls NUMERIC NOT NULL DEFAULT 0,
  min_calls NUMERIC NOT NULL DEFAULT 0,
  max_calls NUMERIC NOT NULL DEFAULT 0,
  sample_count INTEGER NOT NULL DEFAULT 0,
  last_calculated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (day_of_week, hour_of_day)
);

-- Create call_errors view for error rate monitoring
CREATE OR REPLACE VIEW public.call_errors AS
SELECT 
  date_trunc('hour', created_at) as hour,
  count(*) FILTER (WHERE status = 'error') as error_count,
  count(*) as total_count,
  CASE 
    WHEN count(*) > 0 
    THEN (count(*) FILTER (WHERE status = 'error') * 100.0 / count(*))
    ELSE 0 
  END as error_rate_pct
FROM public.calls
WHERE created_at >= now() - interval '24 hours'
GROUP BY date_trunc('hour', created_at)
ORDER BY hour DESC;

-- Function to recalculate baselines (run weekly)
CREATE OR REPLACE FUNCTION public.recalculate_call_baselines()
RETURNS void AS $$
BEGIN
  INSERT INTO public.call_baselines (day_of_week, hour_of_day, avg_calls, min_calls, max_calls, sample_count, last_calculated_at)
  SELECT 
    EXTRACT(DOW FROM created_at)::integer as day_of_week,
    EXTRACT(HOUR FROM created_at)::integer as hour_of_day,
    avg(count)::numeric as avg_calls,
    min(count)::numeric as min_calls,
    max(count)::numeric as max_calls,
    count(*)::integer as sample_count,
    now() as last_calculated_at
  FROM (
    SELECT 
      date_trunc('hour', created_at) as hour,
      count(*) as count
    FROM public.calls
    WHERE created_at >= now() - interval '30 days'
    GROUP BY date_trunc('hour', created_at)
  ) hourly
  GROUP BY EXTRACT(DOW FROM hour), EXTRACT(HOUR FROM hour)
  ON CONFLICT (day_of_week, hour_of_day) 
  DO UPDATE SET
    avg_calls = EXCLUDED.avg_calls,
    min_calls = EXCLUDED.min_calls,
    max_calls = EXCLUDED.max_calls,
    sample_count = EXCLUDED.sample_count,
    last_calculated_at = EXCLUDED.last_calculated_at;
END;
$$ LANGUAGE plpgsql;

-- Function to count orphaned calls (calls without matching user)
CREATE OR REPLACE FUNCTION public.count_orphaned_calls()
RETURNS integer AS $$
DECLARE
  orphan_count integer;
BEGIN
  SELECT count(*) INTO orphan_count
  FROM public.calls c
  WHERE NOT EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = c.user_id
  );
  RETURN orphan_count;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger for agent_metrics
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_agent_metrics_updated_at ON public.agent_metrics;
CREATE TRIGGER update_agent_metrics_updated_at
  BEFORE UPDATE ON public.agent_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.agent_metrics TO service_role;
GRANT SELECT ON public.agent_metrics TO authenticated;
GRANT ALL ON public.call_baselines TO service_role;
GRANT SELECT ON public.call_baselines TO authenticated;
GRANT SELECT ON public.call_errors TO authenticated;
GRANT EXECUTE ON FUNCTION public.count_orphaned_calls() TO service_role;
GRANT EXECUTE ON FUNCTION public.recalculate_call_baselines() TO service_role;

-- Schedule cron jobs for edge functions
-- Note: These use pg_net (or pg_cron with HTTP extension) to invoke edge functions
-- For pg_cron, we need the pg_net extension or use a workaround with pg_http

-- Create a helper function to invoke edge functions via pg_net
CREATE OR REPLACE FUNCTION public.invoke_edge_function(function_name TEXT)
RETURNS void AS $$
DECLARE
  edge_url TEXT;
  anon_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZ2pzdHB4cXRrdXJ2dGV5eWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTA4MTksImV4cCI6MjA5MzAyNjgxOX0.ep7ipBwRgh6TmjEw87xJGDXfLRBHRKh1mgDq3_eUHrI';
BEGIN
  edge_url := 'https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/' || function_name;
  
  -- Use pg_net if available, otherwise we'll need to use a different approach
  PERFORM
    net.http_get(
      url := edge_url,
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || anon_key,
        'Content-Type', 'application/json'
      )
    );
EXCEPTION WHEN undefined_function THEN
  -- pg_net not available, log and continue
  RAISE NOTICE 'pg_net not available, edge function % not invoked', function_name;
END;
$$ LANGUAGE plpgsql;

-- Schedule webhook-health every 5 minutes
SELECT cron.schedule(
  'webhook-health-check',
  '*/5 * * * *',
  $$ SELECT net.http_get(
    url := 'https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/webhook-health',
    headers := jsonb_build_object(
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZ2pzdHB4cXRrdXJ2dGV5eWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTA4MTksImV4cCI6MjA5MzAyNjgxOX0.ep7ipBwRgh6TmjEw87xJGDXfLRBHRKh1mgDq3_eUHrI',
      'Content-Type', 'application/json'
    )
  ) $$
);

-- Schedule db-integrity daily at 04:00 UTC
SELECT cron.schedule(
  'db-integrity-check',
  '0 4 * * *',
  $$ SELECT net.http_get(
    url := 'https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/db-integrity',
    headers := jsonb_build_object(
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZ2pzdHB4cXRrdXJ2dGV5eWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTA4MTksImV4cCI6MjA5MzAyNjgxOX0.ep7ipBwRgh6TmjEw87xJGDXfLRBHRKh1mgDq3_eUHrI',
      'Content-Type', 'application/json'
    )
  ) $$
);

-- Schedule verify-backup daily at 02:00 UTC
SELECT cron.schedule(
  'verify-backup-check',
  '0 2 * * *',
  $$ SELECT net.http_get(
    url := 'https://ligjstpxqtkurvteyyhw.supabase.co/functions/v1/verify-backup',
    headers := jsonb_build_object(
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZ2pzdHB4cXRrdXJ2dGV5eWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTA4MTksImV4cCI6MjA5MzAyNjgxOX0.ep7ipBwRgh6TmjEw87xJGDXfLRBHRKh1mgDq3_eUHrI',
      'Content-Type', 'application/json'
    )
  ) $$
);

-- Also schedule baseline recalculation weekly (Sunday at 03:00 UTC)
SELECT cron.schedule(
  'recalculate-call-baselines',
  '0 3 * * 0',
  $$ SELECT public.recalculate_call_baselines() $$
);
