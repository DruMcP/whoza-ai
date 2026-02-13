# Security Guide & Checklist

## Security Overview

This document outlines the security measures implemented in the application and provides checklists for maintaining security posture.

## Security Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
│  Browser (HTTPS) → Netlify CDN → React Application          │
└─────────────────────┬───────────────────────────────────────┘
                      │ TLS 1.2+
┌─────────────────────▼───────────────────────────────────────┐
│                   AUTHENTICATION LAYER                       │
│  Supabase Auth → JWT Tokens → Session Management            │
└─────────────────────┬───────────────────────────────────────┘
                      │ Authenticated Requests
┌─────────────────────▼───────────────────────────────────────┐
│                  API LAYER (Edge Functions)                  │
│  JWT Validation → CORS → Input Validation → RLS Check       │
└─────────────────────┬───────────────────────────────────────┘
                      │ Parameterized Queries
┌─────────────────────▼───────────────────────────────────────┐
│                   DATA LAYER (PostgreSQL)                    │
│  Row Level Security → Encryption at Rest → Encrypted Backup │
└─────────────────────────────────────────────────────────────┘
```

## Pre-Production Security Checklist

### Database Security

- [x] Row Level Security (RLS) enabled on all tables
- [x] RLS policies test authenticated users with `auth.uid()`
- [x] No policies use `USING (true)` (overly permissive)
- [x] Foreign key constraints implemented
- [x] Indexes created for performance and security
- [x] No default passwords or test accounts
- [x] Database connection uses SSL/TLS
- [x] Service role key never exposed to client
- [x] Parameterized queries (no SQL injection risk)
- [x] Input validation on all user inputs

### Authentication Security

- [x] Password complexity requirements
- [x] Passwords hashed with bcrypt
- [x] JWT tokens with secure signing
- [x] Token expiration configured
- [x] Session timeout implemented
- [x] No credentials in code or version control
- [x] Email verification process (optional but recommended)
- [ ] Multi-factor authentication (2FA) - **Recommended Enhancement**
- [x] Rate limiting on authentication endpoints
- [x] Account lockout after failed attempts

### API Security

- [x] CORS headers properly configured
- [x] CORS allows only necessary origins
- [x] All Edge Functions validate JWT
- [x] Input sanitization implemented
- [x] Output encoding to prevent XSS
- [x] Error messages don't leak sensitive info
- [x] API rate limiting configured
- [x] No debug endpoints in production
- [x] Logging doesn't include sensitive data
- [x] HTTPS enforced on all endpoints

### Application Security

- [x] Environment variables for all secrets
- [x] No API keys in client-side code
- [x] XSS prevention (React auto-escaping)
- [x] CSRF protection implemented
- [x] Secure session storage
- [x] No `eval()` or `innerHTML` usage
- [x] Dependencies up to date
- [x] No known vulnerable packages
- [x] Content Security Policy headers
- [x] Secure HTTP headers configured

### Data Privacy

- [x] User data isolated by user_id
- [x] Business data isolated by business_id
- [x] Admin access restricted to admin role
- [x] Personal data encrypted at rest
- [x] Personal data encrypted in transit
- [x] Data retention policy defined
- [x] User data deletion capability
- [x] Audit logging implemented
- [x] Privacy policy in place
- [x] Terms of service in place

## Security Hardening Guide

### Environment Variables

**Required Environment Variables:**
```env
# Supabase Configuration (Already configured)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# NEVER expose these in client code
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (server-only)
```

**Security Rules:**
1. Never commit `.env` files to version control
2. Use different keys for development/staging/production
3. Rotate keys quarterly or after suspected compromise
4. Use environment-specific configurations
5. Restrict service role key to server environments only

### Database Hardening

**RLS Policy Review:**
```sql
-- ✅ GOOD: Restrictive policy
CREATE POLICY "Users view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- ❌ BAD: Overly permissive
CREATE POLICY "Anyone can view"
  ON users FOR SELECT
  TO authenticated
  USING (true);
```

**Query Security:**
```javascript
// ✅ GOOD: Parameterized query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);

// ❌ BAD: SQL injection risk (don't do this)
const query = `SELECT * FROM users WHERE id = '${userId}'`;
```

### Input Validation

**Always validate user input:**
```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.trim().toLowerCase();
}

function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }
  return input.trim().slice(0, 1000); // Limit length
}
```

### API Security Best Practices

**Edge Function Template:**
```typescript
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: corsHeaders }
      );
    }

    // Validate input
    const body = await req.json();
    if (!body || !body.requiredField) {
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize input
    const sanitized = sanitizeInput(body.requiredField);

    // Process request
    // ... your logic here

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Don't leak error details
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
});
```

## Vulnerability Management

### Dependency Scanning

**Weekly Scan (Automated):**
```bash
# Scan for vulnerabilities
npm audit

# View detailed report
npm audit --json

# Fix automatically (test first!)
npm audit fix

# Check outdated packages
npm outdated
```

**Recommended Tools:**
- **Snyk**: Continuous vulnerability scanning
- **Dependabot**: Automated dependency updates (GitHub)
- **npm audit**: Built-in vulnerability scanner
- **OWASP Dependency-Check**: Comprehensive scanning

### Security Updates Process

**Priority Levels:**

**Critical (P0)**: Immediate action required
- Active exploits in the wild
- Remote code execution vulnerabilities
- Authentication bypass issues
- Deploy fix within 24 hours

**High (P1)**: Urgent action required
- SQL injection vulnerabilities
- XSS vulnerabilities
- Privilege escalation issues
- Deploy fix within 1 week

**Medium (P2)**: Important action required
- Information disclosure
- Denial of service issues
- Deploy fix within 1 month

**Low (P3)**: Track and plan
- Minor security improvements
- Best practice violations
- Deploy with next release

### Update Process

1. **Identify**: Run security scans
2. **Assess**: Review vulnerability details and impact
3. **Test**: Update dependencies in development environment
4. **Validate**: Run full test suite
5. **Deploy**: Update production during maintenance window
6. **Monitor**: Watch for issues post-deployment
7. **Document**: Record changes and lessons learned

## Incident Response Plan

### Incident Types

**Security Breach:**
- Unauthorized access to user data
- Data exfiltration
- Account compromise
- System compromise

**Data Loss:**
- Accidental deletion
- Corruption
- Hardware failure
- Natural disaster

**Service Disruption:**
- DDoS attack
- System overload
- Configuration error
- Dependency failure

### Response Procedures

**Phase 1: Detection (0-5 minutes)**
1. Identify incident through monitoring/alerts
2. Confirm incident is real (not false positive)
3. Determine severity level
4. Alert response team

**Phase 2: Containment (5-30 minutes)**
1. Isolate affected systems
2. Prevent further damage
3. Preserve evidence
4. Document all actions

**Phase 3: Investigation (30 min - 4 hours)**
1. Determine root cause
2. Assess scope of impact
3. Identify affected users
4. Gather forensic data

**Phase 4: Remediation (1-24 hours)**
1. Implement fixes
2. Restore from backups if needed
3. Verify system integrity
4. Test functionality

**Phase 5: Recovery (1-3 days)**
1. Restore full service
2. Monitor for recurrence
3. Reset credentials if compromised
4. Update security measures

**Phase 6: Post-Mortem (1 week)**
1. Document incident timeline
2. Analyze response effectiveness
3. Identify improvements
4. Update procedures
5. Train team on lessons learned

### Communication Plan

**Internal Communication:**
- Slack/Teams channel for real-time updates
- Email for detailed reports
- Status page for team visibility

**External Communication:**
- Status page updates (https://status.yourapp.com)
- Email notifications to affected users
- Public statement if required
- Regulatory notifications if applicable (GDPR, etc.)

**Communication Templates:**

**Initial Notification:**
```
Subject: [Action Required] Security Incident Notification

We are investigating a potential security incident that may have affected
your account. As a precautionary measure, we recommend:

1. Reset your password immediately
2. Review recent account activity
3. Enable two-factor authentication
4. Monitor for suspicious activity

We will provide updates as we learn more.

Thank you for your patience and understanding.
```

**Resolution Notification:**
```
Subject: Security Incident Resolved

The security incident reported on [DATE] has been resolved. Our investigation
found [SUMMARY OF FINDINGS].

Actions taken:
- [ACTION 1]
- [ACTION 2]
- [ACTION 3]

Your data remains secure. No further action is required.

For questions, contact: security@yourapp.com
```

## Compliance & Auditing

### Audit Log Review

**Monthly Review Checklist:**
- [ ] Review all failed authentication attempts
- [ ] Check for unusual access patterns
- [ ] Verify admin operations were authorized
- [ ] Review database access logs
- [ ] Check for RLS policy violations
- [ ] Audit privilege escalation attempts
- [ ] Review API rate limit hits
- [ ] Check for suspicious queries

**Audit Query Examples:**
```sql
-- Failed login attempts in last 24 hours
SELECT *
FROM analytics_events
WHERE event_type = 'user_login'
  AND event_data->>'success' = 'false'
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Admin operations
SELECT *
FROM analytics_events
WHERE event_category = 'admin_action'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Unusual access patterns (multiple IPs)
SELECT user_id, COUNT(DISTINCT metadata->>'ip') as ip_count
FROM analytics_events
WHERE created_at > NOW() - INTERVAL '1 day'
GROUP BY user_id
HAVING COUNT(DISTINCT metadata->>'ip') > 3;
```

### Compliance Requirements

**GDPR (General Data Protection Regulation):**
- [x] Privacy policy published
- [x] User consent for data processing
- [x] Right to access data (user can view their data)
- [x] Right to deletion (user can delete account)
- [x] Right to portability (data export available)
- [x] Data breach notification plan (< 72 hours)
- [x] Data processing agreements with vendors

**CCPA (California Consumer Privacy Act):**
- [x] Privacy policy with data collection disclosure
- [x] User right to opt-out of data sale
- [x] User right to deletion
- [x] User right to know what data is collected

**SOC 2 Type II:**
- Supabase is SOC 2 Type II certified
- Application follows security best practices
- Regular security audits recommended

### Data Retention Policy

**User Data:**
- Active accounts: Retained indefinitely
- Deleted accounts: 30-day soft delete, then permanent deletion
- Backups: 7-30 days (automatic)
- Logs: 90 days retention

**Analytics Data:**
- Raw events: 12 months
- Aggregated metrics: 36 months
- Business intelligence data: 60 months

**Audit Logs:**
- Security events: 12 months minimum
- Admin operations: 24 months minimum
- Compliance logs: As required by regulation (typically 7 years)

## Security Contact

**Report Security Vulnerabilities:**
- Email: security@yourapp.com
- Response time: Within 24 hours
- Disclosure policy: Responsible disclosure (90 days)

**Bug Bounty Program:**
- Consider implementing when budget allows
- Rewards for valid security findings
- Encourages ethical hacking

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: 2025-01-24
**Owner**: Security Team
