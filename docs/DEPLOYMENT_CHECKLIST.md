# Production Deployment Checklist

## Pre-Deployment Checklist

### Security Verification

#### Database Security
- [ ] All tables have Row Level Security (RLS) enabled
- [ ] All RLS policies use `auth.uid()` instead of `current_user`
- [ ] No RLS policies use `USING (true)` (overly permissive)
- [ ] Service role key is not exposed in client code
- [ ] All database queries use parameterized inputs
- [ ] Foreign key constraints are properly configured
- [ ] Database backups are enabled and tested
- [ ] SSL/TLS is enforced for all connections

#### Authentication Security
- [ ] JWT tokens are properly configured with expiration
- [ ] Password hashing is using bcrypt
- [ ] Session timeout is configured appropriately
- [ ] Rate limiting is enabled on auth endpoints
- [ ] Email verification is configured (if required)
- [ ] Password reset flow is secure
- [ ] No default or test accounts exist

#### API Security
- [ ] All Edge Functions validate authentication
- [ ] CORS headers are properly configured
- [ ] Input validation is implemented
- [ ] Output sanitization prevents XSS
- [ ] Error messages don't leak sensitive information
- [ ] API rate limiting is configured
- [ ] No debug endpoints are accessible

#### Application Security
- [ ] Environment variables are properly configured
- [ ] No API keys or secrets in client code
- [ ] Content Security Policy headers are set
- [ ] HTTPS is enforced on all routes
- [ ] Dependencies are up to date
- [ ] No known security vulnerabilities in packages
- [ ] Error tracking doesn't log sensitive data

### Performance Verification

#### Database Performance
- [ ] All frequently queried columns are indexed
- [ ] Query performance is acceptable (< 50ms p95)
- [ ] Connection pooling is configured
- [ ] Database size is within limits
- [ ] Slow query monitoring is enabled
- [ ] Query plans are optimized

#### Application Performance
- [ ] Bundle size is optimized (< 1MB gzipped)
- [ ] Images are optimized and compressed
- [ ] Code splitting is implemented where appropriate
- [ ] API response times are acceptable (< 200ms p95)
- [ ] Client-side caching is implemented
- [ ] Server-side caching is implemented

#### Infrastructure Performance
- [ ] CDN is configured for static assets
- [ ] Edge Functions are deployed to appropriate regions
- [ ] Auto-scaling is configured
- [ ] Resource limits are appropriate
- [ ] Load testing has been performed

### Data Verification

#### Database Integrity
- [ ] All migrations have been applied successfully
- [ ] Data integrity constraints are in place
- [ ] Referential integrity is maintained
- [ ] Test data has been removed
- [ ] Production data is properly seeded (if applicable)

#### Backup Verification
- [ ] Automated backups are scheduled
- [ ] Backup restoration has been tested
- [ ] Backup retention policy is configured
- [ ] Point-in-time recovery is enabled (if available)
- [ ] Geographic redundancy is configured

### Monitoring Setup

#### Logging
- [ ] Application logging is configured
- [ ] Error logging is configured
- [ ] Audit logging is enabled
- [ ] Log retention policy is configured
- [ ] Sensitive data is not logged

#### Alerting
- [ ] Critical alerts are configured (P0)
- [ ] High-priority alerts are configured (P1)
- [ ] Alert channels are set up (email, Slack, etc.)
- [ ] On-call rotation is defined
- [ ] Alert escalation is configured

#### Metrics
- [ ] Application metrics are being collected
- [ ] Database metrics are being monitored
- [ ] Business metrics are tracked
- [ ] Performance metrics are recorded
- [ ] Custom dashboards are created

### Compliance Verification

#### Legal & Privacy
- [ ] Privacy policy is published
- [ ] Terms of service are published
- [ ] Cookie consent is implemented (if required)
- [ ] GDPR compliance is verified (if applicable)
- [ ] Data retention policy is documented

#### Documentation
- [ ] API documentation is up to date
- [ ] User documentation is complete
- [ ] Admin documentation is available
- [ ] Deployment procedures are documented
- [ ] Incident response plan is documented

## Deployment Steps

### 1. Pre-Deployment Preparation

#### Code Preparation
```bash
# Ensure all changes are committed
git status

# Pull latest changes
git pull origin main

# Run tests
npm test

# Build application
npm run build

# Check bundle size
du -sh dist/
```

#### Environment Verification
```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Test database connection
npm run test:db

# Verify migrations are up to date
supabase db status
```

### 2. Database Migrations

#### Apply Migrations
```bash
# Review pending migrations
supabase db diff

# Apply migrations
supabase db push

# Verify migration success
supabase db status
```

#### Verify Data Integrity
```sql
-- Check table counts
SELECT
  schemaname,
  tablename,
  n_tup_ins,
  n_tup_upd,
  n_tup_del
FROM pg_stat_user_tables;

-- Verify RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

### 3. Deploy Edge Functions

#### Deploy Functions
```bash
# Deploy all edge functions
supabase functions deploy send-email
supabase functions deploy send-notification
supabase functions deploy process-email-campaigns
supabase functions deploy process-notifications
supabase functions deploy process-analytics

# Verify deployments
supabase functions list
```

#### Test Functions
```bash
# Test each function
curl -X POST https://[project-ref].supabase.co/functions/v1/health \
  -H "Authorization: Bearer [anon-key]"
```

### 4. Deploy Frontend

#### Build and Deploy
```bash
# Final build
npm run build

# Deploy to Netlify (automatic via git push)
git push origin main

# Or manual deploy
netlify deploy --prod
```

#### Verify Deployment
- [ ] Visit production URL
- [ ] Check that all pages load
- [ ] Test authentication flow
- [ ] Verify API calls work
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

### 5. Post-Deployment Verification

#### Smoke Tests
```bash
# Health check
curl https://your-app.com/api/health

# Test authentication
curl -X POST https://your-app.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test API endpoints
curl https://your-app.com/api/tasks \
  -H "Authorization: Bearer [token]"
```

#### Performance Verification
- [ ] Check page load time (< 3s)
- [ ] Check time to interactive (< 5s)
- [ ] Check API response time (< 200ms)
- [ ] Check database query time (< 50ms)
- [ ] Verify caching is working

#### Security Verification
- [ ] Verify HTTPS is enforced
- [ ] Check security headers
- [ ] Test authentication bypass attempts
- [ ] Verify RLS policies are working
- [ ] Check for exposed secrets
- [ ] Run security scan

### 6. Monitoring Setup

#### Enable Monitoring
- [ ] Verify logs are flowing
- [ ] Check metrics are being collected
- [ ] Test alert delivery
- [ ] Verify dashboard access
- [ ] Set up status page

#### Initial Monitoring
- Monitor for first 2 hours continuously
- Watch error rates
- Check response times
- Monitor user activity
- Review logs for issues

## Post-Deployment Tasks

### Immediate (0-4 hours)
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Fix any critical issues
- [ ] Update status page

### Short-term (Day 1)
- [ ] Review full day metrics
- [ ] Analyze user behavior
- [ ] Address reported issues
- [ ] Optimize as needed
- [ ] Send deployment summary

### Medium-term (Week 1)
- [ ] Conduct post-deployment review
- [ ] Document lessons learned
- [ ] Update runbooks
- [ ] Plan improvements
- [ ] Schedule next deployment

## Rollback Procedure

### When to Rollback
- Critical security vulnerability discovered
- Major functionality broken
- Data integrity issues
- Performance degradation > 50%
- Error rate > 5%

### Rollback Steps

#### 1. Assess Situation
```bash
# Check current error rate
# Review recent logs
# Identify affected users
# Estimate impact
```

#### 2. Rollback Frontend
```bash
# Revert to previous deployment
netlify rollback

# Or redeploy previous version
git revert [commit-hash]
git push origin main
```

#### 3. Rollback Backend (if needed)
```bash
# Revert database migration
supabase db reset --to [migration-version]

# Redeploy previous edge functions
supabase functions deploy [function-name] --version [previous-version]
```

#### 4. Verify Rollback
- [ ] Check application is working
- [ ] Verify error rate has decreased
- [ ] Monitor for new issues
- [ ] Test critical functionality
- [ ] Notify users (if needed)

#### 5. Post-Rollback
- [ ] Document root cause
- [ ] Plan fix
- [ ] Test fix thoroughly
- [ ] Schedule redeployment
- [ ] Update deployment procedures

## Environment-Specific Configurations

### Development
```env
# .env.development
VITE_SUPABASE_URL=https://dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=dev-anon-key
LOG_LEVEL=debug
```

### Staging
```env
# .env.staging
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging-anon-key
LOG_LEVEL=info
```

### Production
```env
# .env.production
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-anon-key
LOG_LEVEL=error
```

## Common Issues & Solutions

### Database Connection Errors
**Issue**: "connection refused" or "too many connections"
**Solution**:
1. Check connection pool settings
2. Verify network connectivity
3. Check Supabase status page
4. Review connection limits
5. Implement connection pooling

### Authentication Errors
**Issue**: Users unable to log in
**Solution**:
1. Verify JWT configuration
2. Check token expiration
3. Review RLS policies
4. Test auth flow manually
5. Check error logs

### Performance Issues
**Issue**: Slow response times
**Solution**:
1. Review slow query logs
2. Check database indexes
3. Verify caching is working
4. Monitor resource usage
5. Optimize queries

### Deployment Failures
**Issue**: Build or deployment fails
**Solution**:
1. Review build logs
2. Check dependency versions
3. Verify environment variables
4. Test build locally
5. Clear cache and retry

## Emergency Contacts

### Internal Team
- **DevOps Lead**: [contact info]
- **Backend Lead**: [contact info]
- **Security Lead**: [contact info]
- **On-Call Engineer**: [contact info]

### External Services
- **Supabase Support**: support@supabase.io
- **Netlify Support**: support@netlify.com
- **Status Pages**:
  - Supabase: https://status.supabase.com
  - Netlify: https://www.netlifystatus.com

## Deployment Sign-off

### Pre-Deployment Approval
- [ ] Code reviewed and approved
- [ ] Tests passed
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] Documentation updated

**Approved by**: _________________
**Date**: _________________

### Post-Deployment Verification
- [ ] Deployment completed successfully
- [ ] Smoke tests passed
- [ ] Monitoring confirmed operational
- [ ] No critical issues detected
- [ ] Rollback procedure ready if needed

**Verified by**: _________________
**Date**: _________________
**Time**: _________________

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: After each major deployment
**Owner**: DevOps Team
