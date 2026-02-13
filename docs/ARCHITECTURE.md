# System Architecture Documentation

## Architecture Overview

This document provides a comprehensive overview of the application's system architecture, including data flow, security layers, and scalability considerations.

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Browser   │  │   Mobile    │  │   Tablet    │                 │
│  │  (React 19) │  │  (Future)   │  │  (Future)   │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
└─────────┼────────────────┼────────────────┼────────────────────────┘
          │                │                │
          └────────────────┴────────────────┘
                           │
                      HTTPS/TLS 1.2+
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                      CDN LAYER (Netlify)                             │
│  • Global edge network                                               │
│  • Static asset caching (1 year)                                     │
│  • HTTPS enforcement                                                 │
│  • DDoS protection                                                   │
│  • Automatic failover                                                │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                   AUTHENTICATION LAYER                               │
│  ┌─────────────────────────────────────────────────────────┐        │
│  │              Supabase Auth Service                       │        │
│  │  • Email/password authentication                         │        │
│  │  • JWT token generation & validation                     │        │
│  │  • Session management                                    │        │
│  │  • Rate limiting (10 req/sec per IP)                     │        │
│  │  • Bcrypt password hashing                               │        │
│  └─────────────────────────────────────────────────────────┘        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            │ Authenticated Requests      │ Public Requests
            │ (JWT Token)                 │ (Limited access)
            │                             │
┌───────────▼──────────────┐   ┌─────────▼────────────────────────────┐
│  APPLICATION LAYER       │   │  API LAYER (Edge Functions)          │
│                          │   │                                      │
│  React Components        │   │  • send-email                        │
│  • Pages                 │   │  • send-notification                 │
│  • Components            │   │  • process-email-campaigns           │
│  • Services              │   │  • process-notifications             │
│  • State Management      │   │  • process-analytics                 │
│                          │   │                                      │
│  Client-side Logic       │   │  Edge Function Features:             │
│  • Form validation       │   │  • JWT validation                    │
│  • User interactions     │   │  • CORS handling                     │
│  • Local caching         │   │  • Input sanitization                │
│  • Error handling        │   │  • Rate limiting ready               │
│                          │   │  • Global deployment                 │
└───────────┬──────────────┘   └─────────┬────────────────────────────┘
            │                            │
            └────────────┬───────────────┘
                         │
                    PostgREST API
                         │
┌────────────────────────▼──────────────────────────────────────────────┐
│                    SECURITY LAYER (RLS)                                │
│  Row Level Security Policies:                                         │
│  • Users can only access their own data                               │
│  • Business data isolated by business_id                              │
│  • Admin-only access to platform metrics                              │
│  • No public access without explicit policies                         │
│  • All queries validated against auth.uid()                           │
└────────────────────────┬──────────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────────┐
│                     DATA LAYER (PostgreSQL 15+)                        │
│                                                                        │
│  Core Tables:                    System Tables:                       │
│  • users                         • analytics_events                   │
│  • business_profiles             • user_engagement_metrics            │
│  • tasks                         • platform_metrics                   │
│  • task_templates                • user_cohorts                       │
│  • visibility_scores             • subscription_events                │
│  • visibility_score_details      • user_lifetime_value                │
│  • benchmarks                    • notification_templates             │
│  • notification_delivery_log     • email_campaigns                    │
│  • notification_preferences                                           │
│                                                                        │
│  Features:                                                            │
│  • 14+ indexes for performance                                        │
│  • Foreign key constraints                                            │
│  • Automatic timestamps                                               │
│  • JSON/JSONB support                                                 │
│  • Full-text search ready                                             │
│  • Partitioning ready (analytics_events)                              │
└────────────────────────┬──────────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────────┐
│                  STORAGE LAYER (Encrypted)                             │
│  • AES-256 encryption at rest                                          │
│  • Encrypted backups (daily)                                           │
│  • Point-in-time recovery (7-30 days)                                  │
│  • Geographic redundancy                                               │
│  • Automatic replication                                               │
└────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### User Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Enter email & password
     ▼
┌────────────────┐
│  React Form    │
└────┬───────────┘
     │ 2. POST /auth/signin
     ▼
┌──────────────────┐
│ Supabase Auth    │
│ • Verify email   │
│ • Check password │
│ • Rate limit     │
└────┬─────────────┘
     │ 3. Query users table (RLS bypassed for auth)
     ▼
┌──────────────────┐
│   PostgreSQL     │
│ • Fetch user     │
│ • Verify hash    │
└────┬─────────────┘
     │ 4. User found & password matches
     ▼
┌──────────────────┐
│ Generate JWT     │
│ • Sign with key  │
│ • Add claims     │
│ • Set expiry     │
└────┬─────────────┘
     │ 5. Return token + user data
     ▼
┌──────────────────┐
│  React App       │
│ • Store token    │
│ • Update state   │
│ • Redirect       │
└────┬─────────────┘
     │ 6. Track login event
     ▼
┌──────────────────┐
│ Analytics System │
│ • Log event      │
│ • Update metrics │
└──────────────────┘
```

### Task Generation Flow

```
┌──────────┐
│  Admin   │
└────┬─────┘
     │ 1. Generate tasks
     ▼
┌────────────────────┐
│  Task Generator    │
│ • Analyze profile  │
│ • Select templates │
│ • Calculate score  │
└────┬───────────────┘
     │ 2. Query profile + templates
     ▼
┌────────────────────┐
│   PostgreSQL       │
│ • business_profiles│
│ • task_templates   │
│ • visibility_scores│
└────┬───────────────┘
     │ 3. Return data
     ▼
┌────────────────────┐
│  Generation Logic  │
│ • Match criteria   │
│ • Prioritize       │
│ • Create tasks     │
└────┬───────────────┘
     │ 4. Insert tasks
     ▼
┌────────────────────┐
│   PostgreSQL       │
│ • tasks table      │
│ • generation_log   │
└────┬───────────────┘
     │ 5. Trigger notification
     ▼
┌────────────────────┐
│ Notification Svc   │
│ • Prepare message  │
│ • Check prefs      │
│ • Queue delivery   │
└────┬───────────────┘
     │ 6. Send notification
     ▼
┌────────────────────┐
│  Edge Function     │
│ send-notification  │
└────┬───────────────┘
     │ 7. Deliver
     ▼
┌──────────┐
│  User    │
│  Email   │
└──────────┘
```

### Analytics Processing Flow

```
┌──────────────────┐
│   Cron/Schedule  │
│   (Daily 00:00)  │
└────┬─────────────┘
     │ 1. Trigger
     ▼
┌────────────────────┐
│  Edge Function     │
│  process-analytics │
└────┬───────────────┘
     │ 2. Query raw events
     ▼
┌────────────────────┐
│   PostgreSQL       │
│ • analytics_events │
│ • tasks            │
│ • visibility_scores│
│ • users            │
└────┬───────────────┘
     │ 3. Return data
     ▼
┌────────────────────┐
│  Aggregation       │
│ • Calculate metrics│
│ • Compute rates    │
│ • Generate scores  │
└────┬───────────────┘
     │ 4. Insert aggregated data
     ▼
┌────────────────────┐
│   PostgreSQL       │
│ • user_engagement  │
│ • platform_metrics │
│ • user_ltv         │
└────┬───────────────┘
     │ 5. Data ready
     ▼
┌────────────────────┐
│  Admin Dashboard   │
│ • Display charts   │
│ • Show trends      │
│ • Generate reports │
└────────────────────┘
```

## Security Architecture

### Defense in Depth

```
Layer 1: Network Security
├── TLS 1.2+ encryption (all connections)
├── HTTPS enforcement
├── DDoS protection (Netlify + Supabase)
└── IP-based rate limiting

Layer 2: Application Security
├── JWT token authentication
├── CORS policies
├── Input validation
├── Output sanitization
├── XSS prevention (React auto-escaping)
└── CSRF protection

Layer 3: API Security
├── JWT validation on all requests
├── Request signing
├── API key rotation ready
├── Rate limiting per endpoint
└── Request logging

Layer 4: Database Security
├── Row Level Security (RLS) on all tables
├── Parameterized queries (SQL injection prevention)
├── Least privilege access
├── Connection encryption
├── Audit logging
└── No direct database access

Layer 5: Data Security
├── Encryption at rest (AES-256)
├── Encryption in transit (TLS 1.2+)
├── Encrypted backups
├── Secure key management
├── Data isolation by user
└── Privacy controls
```

### Row Level Security (RLS) Implementation

**Policy Pattern:**
```sql
-- Users can only access their own data
CREATE POLICY "policy_name"
  ON table_name
  FOR operation
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

**Applied to All Tables:**
- `users` - Users see only their own record
- `business_profiles` - Users see only their business
- `tasks` - Users see only tasks for their business
- `visibility_scores` - Users see only their scores
- `analytics_events` - System can insert, admins can view
- `platform_metrics` - Admin-only access
- All other tables follow similar patterns

## Technology Stack

### Frontend
```
React 19.2.3
├── React Router DOM 7.11.0 (routing)
├── Vite 7.3.0 (build tool)
└── Vanilla CSS (styling)
```

### Backend
```
Supabase
├── PostgreSQL 15+ (database)
├── PostgREST (API layer)
├── GoTrue (authentication)
└── Deno Runtime (edge functions)
```

### Infrastructure
```
Netlify (Frontend)
├── Global CDN
├── Automatic builds
├── Preview deployments
└── Custom domains

Supabase (Backend)
├── AWS infrastructure
├── Multi-region support
├── Auto-scaling
└── Managed backups
```

### Development Tools
```
Node.js 18+
├── npm (package manager)
├── Vite (dev server)
├── ESLint (linting - ready)
└── Prettier (formatting - ready)
```

## Database Schema

### Core Entities

**users**
- Primary user account
- Authentication data
- Subscription information
- Profile metadata

**business_profiles**
- Business information
- Industry and location
- Contact details
- Linked to user (1:1)

**tasks**
- Actionable items for users
- Generated from templates
- Status tracking
- Completion tracking

**visibility_scores**
- Calculated scores per period
- Trend tracking
- Benchmark comparisons
- Score components

### System Entities

**analytics_events**
- Raw event tracking
- User actions
- System events
- Business metrics

**notification_delivery_log**
- Notification history
- Delivery status
- Open/click tracking
- User preferences

**email_campaigns**
- Marketing campaigns
- Scheduled sends
- Performance metrics
- A/B testing ready

## API Architecture

### RESTful API (Supabase)

**Authentication:**
```
POST   /auth/signup       - Register new user
POST   /auth/signin       - Login user
POST   /auth/signout      - Logout user
POST   /auth/reset        - Password reset
GET    /auth/user         - Get current user
```

**Core Resources:**
```
GET    /users/:id         - Get user
PATCH  /users/:id         - Update user
GET    /business_profiles - List profiles
POST   /business_profiles - Create profile
GET    /tasks             - List tasks
POST   /tasks             - Create task
PATCH  /tasks/:id         - Update task
GET    /visibility_scores - List scores
```

**Analytics:**
```
GET    /analytics_events              - List events
POST   /analytics_events              - Track event
GET    /user_engagement_metrics       - User metrics
GET    /platform_metrics              - Platform metrics
GET    /user_lifetime_value/:user_id  - User LTV
```

### Edge Functions (Serverless)

**Public Functions:**
```
POST   /functions/v1/send-email
POST   /functions/v1/send-notification
```

**System Functions:**
```
POST   /functions/v1/process-email-campaigns
POST   /functions/v1/process-notifications
POST   /functions/v1/process-analytics
```

## Deployment Architecture

### Environments

**Development:**
- Local development server
- Local Supabase instance (optional)
- Hot module reloading
- Debug mode enabled

**Staging:**
- Separate Supabase project
- Preview deployments on Netlify
- Feature branch testing
- Production parity

**Production:**
- Main Supabase project
- Netlify production site
- Performance monitoring
- Error tracking

### CI/CD Pipeline

```
Git Push
    ↓
GitHub Repository
    ↓
Netlify Webhook
    ↓
┌─────────────────┐
│  Build Process  │
│  1. Install deps│
│  2. Run tests   │
│  3. Build app   │
│  4. Optimize    │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Success?│
    └────┬────┘
         │
    Yes  │  No → Fail & Alert
         │
┌────────▼────────┐
│  Deploy to CDN  │
│  • Global edges │
│  • Cache clear  │
│  • Health check │
└────────┬────────┘
         │
┌────────▼────────┐
│  Production     │
│  • Monitor logs │
│  • Track errors │
│  • Alert team   │
└─────────────────┘
```

## Monitoring & Observability

### Metrics Collection

**Application Metrics:**
- Request count
- Response times (p50, p95, p99)
- Error rates
- User sessions

**Database Metrics:**
- Query performance
- Connection pool usage
- Table sizes
- Index efficiency

**Business Metrics:**
- User signups
- Task completions
- Conversion rates
- Churn rates

### Logging Strategy

**Log Levels:**
- ERROR: System failures
- WARN: Potential issues
- INFO: Important events
- DEBUG: Detailed traces

**Log Destinations:**
- Supabase logs (built-in)
- Browser console (dev only)
- External APM (optional)

## Disaster Recovery

### Backup Strategy

**Automated Backups:**
- Daily full backups
- Continuous WAL archiving
- 7-30 day retention
- Encrypted storage

**Recovery Procedures:**
1. Identify incident
2. Assess impact
3. Restore from backup
4. Verify integrity
5. Resume operations

**Recovery Objectives:**
- RTO: < 15 minutes
- RPO: < 5 minutes

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Architecture Review**: Quarterly
**Document Owner**: Architecture Team
