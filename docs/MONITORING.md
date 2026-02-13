# Monitoring & Alerting Guide

## Monitoring Overview

Comprehensive monitoring strategy for ensuring application health, performance, and security.

## Monitoring Architecture

```
┌───────────────────────────────────────────────────────┐
│                  DATA SOURCES                          │
├───────────────────────────────────────────────────────┤
│  • Application Logs                                    │
│  • Database Metrics (Supabase Dashboard)              │
│  • Edge Function Logs                                 │
│  • Analytics Events                                   │
│  • Client-side Errors                                 │
│  • Performance Metrics                                │
└─────────────────┬─────────────────────────────────────┘
                  │
┌─────────────────▼─────────────────────────────────────┐
│              MONITORING TOOLS                          │
├───────────────────────────────────────────────────────┤
│  • Supabase Dashboard (built-in)                      │
│  • Analytics Dashboard (custom)                       │
│  • Browser DevTools                                   │
│  • Optional: Sentry, Datadog, New Relic              │
└─────────────────┬─────────────────────────────────────┘
                  │
┌─────────────────▼─────────────────────────────────────┐
│              ALERTING & RESPONSE                       │
├───────────────────────────────────────────────────────┤
│  • Email Notifications                                 │
│  • Slack/Teams Integration                            │
│  • PagerDuty (for critical alerts)                    │
│  • On-call Rotation                                   │
└───────────────────────────────────────────────────────┘
```

## Key Performance Indicators (KPIs)

### Application Performance

**Response Time Metrics:**
- P50 (Median): < 100ms
- P95: < 200ms
- P99: < 500ms
- Max acceptable: 1000ms

**Throughput Metrics:**
- Requests per second: Monitor trend
- Concurrent users: Current vs. capacity
- Database connections: Current vs. limit

**Error Metrics:**
- Error rate: < 1% of requests
- 4xx errors: < 2% of requests
- 5xx errors: < 0.5% of requests
- Database errors: < 0.1% of queries

### Database Performance

**Query Performance:**
- Average query time: < 50ms
- Slow query threshold: > 1000ms
- Connection pool usage: < 80%
- Cache hit rate: > 90%

**Resource Usage:**
- CPU usage: < 70% sustained
- Memory usage: < 80% sustained
- Storage usage: < 80% capacity
- I/O wait time: < 10%

### User Experience

**Engagement Metrics:**
- Active users (DAU/MAU)
- Session duration
- Page load time: < 3 seconds
- Time to interactive: < 5 seconds

**Business Metrics:**
- Task completion rate: > 80%
- User retention: > 70% (30-day)
- Conversion rate: Monitor trend
- Churn rate: < 5% monthly

## Monitoring Tools

### Built-in Monitoring (Supabase)

**Database Metrics:**
Access via Supabase Dashboard → Database

Metrics available:
- Connection count
- Query performance
- Table size
- Index usage
- Replication lag
- Storage usage

**API Metrics:**
Access via Supabase Dashboard → API

Metrics available:
- Request count
- Response time
- Error rate
- Bandwidth usage
- Top endpoints

**Edge Function Logs:**
Access via Supabase Dashboard → Edge Functions → Logs

Information available:
- Invocation count
- Execution time
- Success/failure rate
- Error messages
- Resource usage

### Custom Analytics Dashboard

**Platform Metrics (Admin Only):**
- Total users and growth
- Active users (daily/weekly/monthly)
- Revenue metrics (MRR, ARR, LTV)
- Conversion funnel
- Churn analysis

**User Metrics:**
- Engagement score
- Task completion rate
- Visibility score trend
- Login frequency

### Recommended External Tools

**Error Tracking:**
- **Sentry** - Real-time error tracking
  - Automatic error capture
  - Source map support
  - Release tracking
  - Performance monitoring

**Application Performance Monitoring (APM):**
- **Datadog** - Full-stack monitoring
  - Infrastructure metrics
  - Application traces
  - Log aggregation
  - Custom dashboards

**Uptime Monitoring:**
- **Pingdom** - Uptime and performance
  - Multi-location checks
  - Transaction monitoring
  - Real user monitoring
  - SMS/email alerts

## Alert Configuration

### Critical Alerts (P0)

**Database Issues:**
```javascript
// Alert when connection pool > 90%
if (activeConnections / maxConnections > 0.9) {
  alert('CRITICAL: Database connection pool at capacity');
}

// Alert when storage > 90%
if (storageUsed / storageLimit > 0.9) {
  alert('CRITICAL: Database storage nearly full');
}

// Alert when backup fails
if (lastBackupStatus === 'failed') {
  alert('CRITICAL: Database backup failed');
}
```

**Application Issues:**
```javascript
// Alert when error rate > 5%
if (errorRate > 0.05) {
  alert('CRITICAL: High error rate detected');
}

// Alert when service is down
if (uptimeCheck === 'down') {
  alert('CRITICAL: Service unavailable');
}
```

**Security Issues:**
```javascript
// Alert on multiple failed login attempts
if (failedLoginsLast5Min > 10) {
  alert('CRITICAL: Potential brute force attack');
}

// Alert on RLS policy violations
if (rlsViolations > 0) {
  alert('CRITICAL: Row level security violation detected');
}
```

### High Priority Alerts (P1)

**Performance Degradation:**
```javascript
// Alert when P95 response time > 1s
if (p95ResponseTime > 1000) {
  alert('HIGH: Response time degraded');
}

// Alert when slow queries detected
if (slowQueryCount > 5) {
  alert('HIGH: Multiple slow queries detected');
}
```

**Capacity Warnings:**
```javascript
// Alert when approaching limits
if (storageUsed / storageLimit > 0.8) {
  alert('HIGH: Storage approaching 80% capacity');
}

if (apiRequestsThisMonth / monthlyLimit > 0.8) {
  alert('HIGH: API usage at 80% of monthly limit');
}
```

### Medium Priority Alerts (P2)

**Usage Anomalies:**
```javascript
// Alert on unusual traffic patterns
if (currentTraffic > averageTraffic * 3) {
  alert('MEDIUM: Unusual traffic spike detected');
}

// Alert on sudden user drop
if (activeUsers < averageActiveUsers * 0.5) {
  alert('MEDIUM: Significant drop in active users');
}
```

**Business Metrics:**
```javascript
// Alert on conversion rate drop
if (conversionRate < averageConversionRate * 0.7) {
  alert('MEDIUM: Conversion rate dropped by 30%');
}

// Alert on churn spike
if (churnRate > averageChurnRate * 1.5) {
  alert('MEDIUM: Churn rate increased by 50%');
}
```

## Monitoring Queries

### Performance Monitoring

**Slow Queries (Last 24 Hours):**
```sql
SELECT
  query,
  calls,
  mean_exec_time,
  max_exec_time,
  stddev_exec_time
FROM pg_stat_statements
WHERE mean_exec_time > 1000 -- Over 1 second
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Connection Pool Status:**
```sql
SELECT
  count(*) as total_connections,
  count(*) FILTER (WHERE state = 'active') as active_connections,
  count(*) FILTER (WHERE state = 'idle') as idle_connections
FROM pg_stat_activity;
```

**Table Sizes:**
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
```

### Security Monitoring

**Failed Login Attempts (Last Hour):**
```sql
SELECT
  metadata->>'ip' as ip_address,
  COUNT(*) as failed_attempts,
  MAX(created_at) as last_attempt
FROM analytics_events
WHERE event_type = 'user_login'
  AND event_data->>'success' = 'false'
  AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY metadata->>'ip'
HAVING COUNT(*) > 5
ORDER BY failed_attempts DESC;
```

**RLS Policy Violations:**
```sql
-- Check for any direct table access bypassing RLS
SELECT
  usename,
  application_name,
  state,
  query
FROM pg_stat_activity
WHERE query NOT LIKE '%FROM auth.%'
  AND query NOT LIKE '%pg_stat_%'
  AND usename != 'postgres';
```

**Unusual Access Patterns:**
```sql
SELECT
  user_id,
  COUNT(DISTINCT metadata->>'ip') as unique_ips,
  COUNT(*) as total_requests,
  MIN(created_at) as first_seen,
  MAX(created_at) as last_seen
FROM analytics_events
WHERE created_at > NOW() - INTERVAL '1 day'
GROUP BY user_id
HAVING COUNT(DISTINCT metadata->>'ip') > 3
ORDER BY unique_ips DESC;
```

### Business Monitoring

**User Growth (Daily):**
```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_users
FROM users
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Active Users (Last 7 Days):**
```sql
SELECT
  COUNT(DISTINCT user_id) as active_users
FROM analytics_events
WHERE event_type = 'user_login'
  AND created_at > NOW() - INTERVAL '7 days';
```

**Task Completion Rate (Last 30 Days):**
```sql
SELECT
  COUNT(*) FILTER (WHERE status = 'Completed') * 100.0 / COUNT(*) as completion_rate
FROM tasks
WHERE created_at > NOW() - INTERVAL '30 days';
```

## Dashboard Configuration

### Supabase Dashboard

**Access**: https://app.supabase.com/project/[PROJECT_ID]

**Key Sections:**
1. **Database**: Connection stats, query performance
2. **API**: Request metrics, error rates
3. **Edge Functions**: Invocation logs, performance
4. **Storage**: Usage statistics
5. **Logs**: Real-time application logs

**Recommended Views:**
- Pin frequently used queries
- Set up custom SQL queries for monitoring
- Enable real-time updates for critical metrics
- Configure log filters for error tracking

### Custom Admin Dashboard

**Access**: `/admin` (admin users only)

**Analytics Tab Features:**
- Platform overview (users, revenue, engagement)
- Conversion funnel visualization
- Retention and churn analysis
- Lifetime value distribution
- Monthly performance trends

**Recommended Monitoring Frequency:**
- Real-time: During incidents
- Hourly: For high-traffic periods
- Daily: For routine monitoring
- Weekly: For trend analysis
- Monthly: For business reviews

## Log Management

### Log Levels

**ERROR**: System errors requiring immediate attention
```javascript
console.error('Database connection failed:', error);
```

**WARN**: Potential issues that should be reviewed
```javascript
console.warn('API rate limit approaching:', usage);
```

**INFO**: General informational messages
```javascript
console.log('User logged in:', userId);
```

**DEBUG**: Detailed information for troubleshooting
```javascript
console.debug('Query executed:', query, duration);
```

### Log Best Practices

**Do's:**
- ✅ Log all errors with stack traces
- ✅ Log important business events
- ✅ Include context (user ID, request ID, timestamp)
- ✅ Use structured logging (JSON format)
- ✅ Log security events (auth attempts, RLS violations)

**Don'ts:**
- ❌ Log sensitive data (passwords, tokens, PII)
- ❌ Log excessive debug info in production
- ❌ Log every single request (use sampling)
- ❌ Use console.log in production code
- ❌ Log without proper context

### Log Retention

**Production:**
- Error logs: 90 days
- Access logs: 30 days
- Debug logs: 7 days
- Audit logs: 12 months

**Development:**
- All logs: 7 days

## Performance Optimization

### Query Optimization

**Index Usage:**
```sql
-- Check missing indexes
SELECT
  schemaname,
  tablename,
  attname,
  n_distinct,
  most_common_vals
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct > 100
  AND correlation < 0.5;
```

**Query Plan Analysis:**
```sql
-- Explain query performance
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'user@example.com';
```

### Caching Strategy

**Application-Level Caching:**
```javascript
// Cache frequently accessed data
const cache = new Map();

async function getCachedData(key, fetchFn, ttl = 300000) {
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });

  return data;
}
```

**Database Query Caching:**
```javascript
// Use Supabase's built-in caching
const { data } = await supabase
  .from('platform_metrics')
  .select('*')
  .order('period_start', { ascending: false })
  .limit(1)
  .single();
```

## Incident Detection

### Automated Detection

**Health Check Endpoint:**
```javascript
// /api/health
export async function healthCheck() {
  const checks = {
    database: await checkDatabase(),
    api: await checkAPI(),
    functions: await checkFunctions(),
    timestamp: new Date().toISOString(),
  };

  const isHealthy = Object.values(checks).every(
    check => check !== 'database' && check !== 'api' && check !== 'functions'
      ? check === true
      : check.status === 'healthy'
  );

  return {
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks,
  };
}
```

**Anomaly Detection:**
```javascript
// Detect unusual patterns
function detectAnomalies(metrics, historicalData) {
  const threshold = 3; // Standard deviations

  const mean = historicalData.reduce((sum, val) => sum + val, 0) / historicalData.length;
  const stdDev = Math.sqrt(
    historicalData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / historicalData.length
  );

  if (Math.abs(metrics.value - mean) > threshold * stdDev) {
    return {
      anomaly: true,
      deviation: (metrics.value - mean) / stdDev,
      threshold,
    };
  }

  return { anomaly: false };
}
```

## Reporting

### Daily Report

**Automated Daily Summary:**
- Total requests
- Error rate
- Average response time
- New users
- Active users
- Task completion rate
- Top errors
- Resource usage

### Weekly Report

**Business Performance:**
- User growth trend
- Conversion rate
- Churn rate
- Revenue metrics
- Feature usage
- Performance trends

### Monthly Report

**Executive Summary:**
- Key metrics vs. targets
- User retention analysis
- Financial performance
- Infrastructure costs
- Security incidents
- Planned improvements

## Action Items

### Immediate Setup (Week 1)

- [ ] Configure Supabase dashboard alerts
- [ ] Set up email notifications for critical alerts
- [ ] Create monitoring queries bookmark
- [ ] Document on-call procedures
- [ ] Test alert delivery

### Short-term Setup (Month 1)

- [ ] Integrate error tracking (Sentry recommended)
- [ ] Set up uptime monitoring (Pingdom/UptimeRobot)
- [ ] Create custom monitoring dashboards
- [ ] Implement automated health checks
- [ ] Set up log aggregation

### Long-term Setup (Quarter 1)

- [ ] Implement full APM solution (Datadog/New Relic)
- [ ] Set up anomaly detection
- [ ] Create runbooks for common incidents
- [ ] Implement automated remediation
- [ ] Conduct chaos engineering exercises

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: 2025-01-24
**Owner**: DevOps Team
