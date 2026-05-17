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

-- Allow service role full access
CREATE POLICY "Service role full access" ON public.agent_metrics
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow authenticated read access
CREATE POLICY "Authenticated read access" ON public.agent_metrics
  FOR SELECT TO authenticated USING (true);

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