# Incident Response: Voice Outage

## Symptoms
- No calls coming through to tradespeople
- Trillet/Bland webhook returning 5xx
- Dashboard shows zero calls in last 15 minutes during business hours
- Better Uptime monitor `trillet-webhook-health` is DOWN

## Severity
**P1 — Immediate human response required**

## Response Steps

### 1. Verify the Outage (T+0)
```bash
# Check webhook health endpoint
curl https://www.whoza.ai/api/health/trillet

# Check webhook receiver directly
curl https://www.whoza.ai/api/trillet-webhook

# Check Supabase for recent calls
curl "https://ligjstpxqtkurvteyyhw.supabase.co/rest/v1/calls?select=count&created_at=gte.$(date -u -d '15 minutes ago' +%Y-%m-%dT%H:%M:%SZ)" \
  -H "apikey: $SUPABASE_ANON_KEY"
```

### 2. Check Trillet/Bland Dashboard (T+2)
- Log into Trillet dashboard: https://app.trillet.io
- Check call logs — are calls reaching Trillet?
- If calls in Trillet but not in whoza.ai → webhook issue
- If no calls in Trillet → phone routing issue

### 3. Check Webhook Configuration (T+3)
```bash
# Verify webhook URL is correctly set in Trillet
curl -H "Authorization: Bearer $TRILLET_API_KEY" \
  https://api.trillet.io/v1/webhooks
```

**Expected webhook URL:** `https://www.whoza.ai/api/trillet-webhook`

### 4. Common Fixes

#### 4a. Webhook URL incorrect or changed
- Update webhook URL in Trillet dashboard
- Verify DNS/CNAME for whoza.ai is resolving
- Check Netlify deploy status

#### 4b. Supabase connection failure
- Check Supabase status: https://status.supabase.com
- Verify connection pool not exhausted
- Check for RLS policy issues

#### 4c. Netlify function cold start timeout
- Check Netlify Functions logs
- If cold start > 10s, function may timeout
- Warm functions by pinging health endpoint

#### 4d. Certificate/SSL issue
- Verify SSL cert for whoza.ai
- Check `https://www.whoza.ai/api/health/trillet` responds

### 5. Rollback Option
If recent deploy caused issue:
```bash
# Revert to previous production deploy
npx netlify deploy --prod --site $NETLIFY_SITE_ID --dir .next \
  --trigger-production-deploy
```

### 6. Communication
- Update status page: https://status.whoza.ai
- Post in Slack #whoza-alerts
- If outage > 30 minutes, email affected tradespeople

### 7. Post-Incident
- Document root cause in runbook
- Update monitoring thresholds if needed
- Schedule review with technical partner

## Escalation
- Dru McPherson (primary): dru@whoza.ai
- Technical partner: [contact in .env.production]
- Trillet support: support@trillet.io

## Prevention
- webhook-health agent runs every 5 minutes
- Better Uptime checks every 60 seconds
- PITR enabled on Supabase for data recovery