# Incident Response: Database Down / Supabase Issue

## Symptoms
- All API calls returning 500
- Dashboard cannot load data
- webhook-health agent reporting connection errors
- Supabase status page showing incident

## Severity
**P1 — All services affected**

## Response Steps

### 1. Verify Supabase Status (T+0)
- Check https://status.supabase.com
- Check Supabase project dashboard: https://supabase.com/dashboard/project/ligjstpxqtkurvteyyhw

### 2. Check Connection Pool (T+1)
```sql
-- Run in Supabase SQL Editor
SELECT 
  count(*) as active_connections,
  max_connections
FROM pg_stat_activity, 
  (SELECT setting::int as max_connections FROM pg_settings WHERE name = 'max_connections');
```

If active > 80% of max → connection exhaustion

### 3. Quick Fixes

#### 3a. Restart Connection Pool
```sql
-- Terminate idle connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' 
AND state_change < now() - interval '5 minutes';
```

#### 3b. Check RLS Policies
```sql
-- Verify RLS is enabled on critical tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('calls', 'users', 'enquiries');

-- If rowsecurity = false, enable immediately:
-- ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
```

#### 3c. Check Disk Space
```sql
SELECT pg_size_pretty(pg_database_size('postgres'));
```

### 4. If Supabase Region Down
- Check if PITR (Point-in-Time Recovery) can restore
- Contact Supabase support immediately
- Consider failover to read replica if configured

### 5. Restore from Backup
```bash
# PITR restore (requires Supabase dashboard)
# 1. Go to Database → Backups
# 2. Select point in time before incident
# 3. Initiate restore
# 4. Update connection string if new instance
```

### 6. Emergency Read-Only Mode
If database is partially degraded:
```typescript
// Set site to read-only
// In middleware or app config:
const READ_ONLY_MODE = true;
// Disable writes, show maintenance banner
```

## Escalation
- Supabase support: https://supabase.com/dashboard/support
- Status page: https://status.supabase.com
- Dru McPherson: dru@whoza.ai

## Prevention
- PITR enabled (verify weekly)
- db-integrity agent runs daily
- Connection pool monitoring
- RLS policy validation