# Scalability Guide

## Scalability Overview

This document outlines the application's scalability architecture, growth projections, and optimization strategies to handle increasing user loads without performance degradation.

## Current Architecture Capacity

### Infrastructure Limits (Supabase Pro Plan)

**Database:**
- Storage: 8GB (expandable to 100GB+)
- Connections: 200 simultaneous
- Bandwidth: 250GB/month
- API Requests: Unlimited
- IOPS: 2,880 baseline (burstable)

**Edge Functions:**
- Invocations: 500K/month free, then £2/million
- Execution time: 150s max per invocation
- Memory: 512MB per function
- Concurrent executions: Auto-scaling (no hard limit)

**Estimated User Capacity:**
- **Current tier**: 1,000-5,000 active users
- **With optimization**: 10,000-25,000 active users
- **Enterprise tier**: 100,000+ active users

## Scalability Principles

### 1. Stateless Architecture

**Current Design:**
```
User Request → Load Balancer → Serverless Function → Database
                                      ↓
                              (No state stored)
```

**Benefits:**
- Functions can scale horizontally infinitely
- No session affinity required
- Easy to distribute across regions
- Automatic failover

### 2. Database Optimization

**Implemented Optimizations:**
- 14+ indexes on frequently queried columns
- Row Level Security for security AND performance
- Connection pooling (automatic via Supabase)
- Efficient query patterns (avoid N+1)
- Pagination for large result sets

**Query Pattern Example:**
```javascript
// ❌ BAD: N+1 query problem
const users = await getUsers();
for (const user of users) {
  const profile = await getProfile(user.id); // N queries
}

// ✅ GOOD: Single query with join
const usersWithProfiles = await supabase
  .from('users')
  .select('*, business_profiles(*)')
  .limit(100);
```

### 3. Caching Strategy

**Multi-Layer Caching:**

**Level 1: Browser Cache**
- Static assets (CSS, JS, images): 1 year
- API responses: 5 minutes (where appropriate)
- User session data: Session storage

**Level 2: CDN Cache (Netlify)**
- Static pages: Edge-cached
- API responses: Can be cached with headers
- Automatic cache invalidation on deploy

**Level 3: Application Cache**
```javascript
// Cache frequently accessed, rarely changed data
const platformMetrics = await getCachedData(
  'platform-metrics',
  () => analyticsService.getPlatformOverview(),
  300000 // 5 minutes TTL
);
```

**Level 4: Database Cache**
- Prepared statement cache
- Query result cache (PostgreSQL)
- Index cache (hot data in memory)

## Growth Projections

### Traffic Patterns

**Current Baseline:**
- 100 users
- 1,000 requests/day
- 10 GB database storage
- 50 GB bandwidth/month

**6-Month Projection (500 users):**
- 5,000 requests/day
- 25 GB database storage
- 150 GB bandwidth/month
- Estimated cost: £25-50/month

**12-Month Projection (2,000 users):**
- 20,000 requests/day
- 60 GB database storage
- 400 GB bandwidth/month
- Estimated cost: £100-200/month

**24-Month Projection (10,000 users):**
- 100,000 requests/day
- 200 GB database storage
- 1.5 TB bandwidth/month
- Estimated cost: £500-1,000/month

### Scaling Triggers

**When to Scale Up:**

**Database:**
- Storage > 80% capacity
- Connections > 80% pool size
- Query response time > 100ms (p95)
- CPU usage > 70% sustained

**Actions:**
1. Upgrade Supabase plan
2. Add read replicas
3. Implement connection pooling (PgBouncer)
4. Optimize slow queries

**API Layer:**
- Edge function errors > 1%
- Response time > 500ms (p95)
- Cold start time > 200ms
- Memory usage > 80%

**Actions:**
1. Optimize function code
2. Increase memory allocation
3. Implement caching
4. Add more function instances

**Application:**
- Page load time > 3s
- Time to interactive > 5s
- Bundle size > 2MB
- Lighthouse score < 80

**Actions:**
1. Implement code splitting
2. Optimize images and assets
3. Add lazy loading
4. Reduce bundle size

## Optimization Strategies

### Database Optimization

#### 1. Query Optimization

**Analyze Query Performance:**
```sql
-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find slow queries
SELECT
  query,
  calls,
  total_exec_time,
  mean_exec_time,
  max_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Index Optimization:**
```sql
-- Check index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Identify missing indexes
SELECT
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct > 100
  AND correlation < 0.5;
```

#### 2. Table Partitioning

**For High-Volume Tables (analytics_events):**
```sql
-- Partition by month for time-series data
CREATE TABLE analytics_events_2024_12 PARTITION OF analytics_events
FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE analytics_events_2025_01 PARTITION OF analytics_events
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Automatically create new partitions monthly
```

**Benefits:**
- Faster queries on recent data
- Easier data archival
- Improved insert performance
- Reduced table bloat

#### 3. Connection Pooling

**Implement PgBouncer (Enterprise):**
```
Application (1000 connections)
         ↓
  PgBouncer Pool (20 connections)
         ↓
  PostgreSQL (20 actual connections)
```

**Configuration:**
```ini
[databases]
production = host=db.supabase.co port=5432 dbname=postgres

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
reserve_pool_size = 5
```

### Application Optimization

#### 1. Code Splitting

**Current Bundle:**
- Main bundle: ~610KB (gzipped: 165KB)
- Single bundle for entire app

**Optimized Bundle:**
```javascript
// Split by route
const Home = lazy(() => import('./pages/Home'));
const Portal = lazy(() => import('./pages/Portal'));
const Admin = lazy(() => import('./pages/Admin'));

// Split vendor code
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'analytics': ['./src/services/analyticsService'],
        },
      },
    },
  },
};
```

**Expected Results:**
- Main bundle: ~200KB
- Vendor bundles: ~300KB (cached)
- Route bundles: ~50KB each
- Faster initial load

#### 2. Image Optimization

**Current Implementation:**
```html
<img src="/5_banner.jpg" alt="Banner" />
```

**Optimized Implementation:**
```html
<picture>
  <source srcset="/images/banner-480.webp" media="(max-width: 480px)" type="image/webp" />
  <source srcset="/images/banner-768.webp" media="(max-width: 768px)" type="image/webp" />
  <source srcset="/images/banner-1200.webp" media="(max-width: 1200px)" type="image/webp" />
  <img src="/images/banner.jpg" alt="Banner" loading="lazy" />
</picture>
```

**Tools:**
```bash
# Convert to WebP
cwebp -q 80 banner.jpg -o banner.webp

# Generate responsive images
sharp banner.jpg -o banner-480.jpg --width 480
sharp banner.jpg -o banner-768.jpg --width 768
sharp banner.jpg -o banner-1200.jpg --width 1200
```

#### 3. API Request Batching

**Current:**
```javascript
// Multiple requests
const user = await getUser(userId);
const profile = await getProfile(userId);
const tasks = await getTasks(userId);
const scores = await getScores(userId);
```

**Optimized:**
```javascript
// Single request with joins
const { data } = await supabase
  .from('users')
  .select(`
    *,
    business_profiles (*),
    tasks (*),
    visibility_scores (*)
  `)
  .eq('id', userId)
  .single();
```

### Infrastructure Optimization

#### 1. Read Replicas (Enterprise)

**Architecture:**
```
            Write Operations
                 ↓
          Primary Database
           ↓          ↓
    Replication  Replication
           ↓          ↓
      Replica 1   Replica 2
           ↓          ↓
      Read Ops   Read Ops
```

**Configuration:**
```javascript
// Write to primary
const { data } = await supabasePrimary
  .from('tasks')
  .insert(newTask);

// Read from replica
const { data } = await supabaseReplica
  .from('tasks')
  .select('*')
  .eq('business_id', businessId);
```

**Benefits:**
- Distribute read load
- Reduce primary database load
- Improve read performance
- Geographic distribution

#### 2. CDN for Static Assets

**Current Setup:**
- Netlify CDN (automatic)
- Edge locations worldwide
- Automatic cache invalidation

**Optimization:**
```javascript
// Set optimal cache headers
export default {
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(jpg|png|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
};
```

**Cache Strategy:**
```
Static Assets (JS, CSS, Images):
  Cache-Control: public, max-age=31536000, immutable

HTML:
  Cache-Control: public, max-age=0, must-revalidate

API Responses:
  Cache-Control: private, max-age=300
```

#### 3. Edge Function Optimization

**Reduce Cold Starts:**
```typescript
// Keep connections warm
let supabaseClient;

function getClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }
  return supabaseClient;
}

// Reuse across invocations
const client = getClient();
```

**Batch Processing:**
```typescript
// Process multiple items in single invocation
async function processBatch(items: any[]) {
  const BATCH_SIZE = 100;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(processItem));
  }
}
```

## Horizontal Scaling

### Multi-Region Deployment

**Phase 1: Single Region (Current)**
```
Users (Global) → CDN → Single Region → Database
```

**Phase 2: Multi-Region (Future)**
```
Users (Europe) → CDN → EU Region → EU Database (Replica)
Users (US) → CDN → US Region → US Database (Primary)
Users (Asia) → CDN → Asia Region → Asia Database (Replica)
```

**Implementation:**
1. Deploy read replicas in target regions
2. Route read traffic to nearest replica
3. Route write traffic to primary
4. Implement conflict resolution

### Database Sharding (100K+ Users)

**Sharding Strategy:**
```
Users 0-24999    → Shard 1
Users 25000-49999 → Shard 2
Users 50000-74999 → Shard 3
Users 75000-99999 → Shard 4
```

**Shard Key Selection:**
```javascript
// Shard by user_id
function getShardId(userId) {
  const hash = hashCode(userId);
  return hash % NUM_SHARDS;
}

// Route to correct shard
const shard = getShardId(userId);
const supabase = getSupabaseClient(shard);
```

**Considerations:**
- Choose shard key carefully (can't easily change)
- Ensure even distribution
- Handle cross-shard queries
- Plan for rebalancing

## Cost Optimization

### Current Cost Structure (Monthly)

**Supabase Pro Plan: £25**
- 8GB storage
- 250GB bandwidth
- Unlimited API requests
- Daily backups

**Netlify Pro Plan: £19**
- 100GB bandwidth
- Unlimited builds
- Background functions

**Total: ~£44/month**

### Cost at Scale

**10,000 Users (~£150-200/month)**
- Supabase Enterprise: £100-150
- Netlify Pro: £19-40
- Monitoring tools: £30-50

**50,000 Users (~£800-1,200/month)**
- Supabase Enterprise: £500-800
- Netlify Enterprise: £100-200
- CDN/Edge: £100-150
- Monitoring/APM: £100-150

**100,000+ Users (~£3,000-5,000/month)**
- Database cluster: £2,000-3,000
- Application hosting: £500-1,000
- CDN: £300-500
- Monitoring/Security: £200-500

### Cost Optimization Strategies

**Database:**
- Archive old data (> 12 months)
- Compress large text fields
- Use appropriate data types
- Remove unused indexes
- Implement data lifecycle policies

**Bandwidth:**
- Optimize image sizes
- Enable compression
- Use CDN caching
- Implement efficient APIs
- Minimize payload sizes

**Compute:**
- Optimize function code
- Reduce cold starts
- Batch processing
- Efficient algorithms
- Cache aggressively

## Performance Benchmarks

### Target SLAs

**Response Time:**
- P50 (Median): < 100ms
- P95: < 200ms
- P99: < 500ms

**Availability:**
- Uptime: 99.9% (< 43 minutes downtime/month)
- Error rate: < 0.1%

**Database:**
- Query time: < 50ms (P95)
- Connection time: < 10ms
- Replication lag: < 1s

### Load Testing

**Tools:**
- k6 (recommended)
- Apache JMeter
- Artillery
- Gatling

**Test Scenarios:**

**Scenario 1: Normal Load**
```javascript
// 100 concurrent users
// 10 requests/user/minute
// Duration: 10 minutes
// Expected: All pass
```

**Scenario 2: Peak Load**
```javascript
// 500 concurrent users
// 20 requests/user/minute
// Duration: 5 minutes
// Expected: < 1% errors
```

**Scenario 3: Stress Test**
```javascript
// Ramp up to 2000 users
// 30 requests/user/minute
// Duration: 15 minutes
// Find breaking point
```

**Sample k6 Script:**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Sustain
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://your-app.com/api/tasks');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

## Migration Path to Higher Scale

### Current (0-5K users)
- Supabase Pro
- Netlify Pro
- No additional infrastructure

### Phase 2 (5-25K users)
- Supabase Pro/Enterprise
- Implement Redis caching
- Optimize database queries
- Add monitoring tools

### Phase 3 (25-100K users)
- Supabase Enterprise
- Read replicas
- Connection pooling (PgBouncer)
- Advanced caching
- APM tools

### Phase 4 (100K+ users)
- Multi-region deployment
- Database sharding
- Microservices architecture
- Dedicated ops team
- 24/7 monitoring

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: Quarterly
**Owner**: Architecture Team
