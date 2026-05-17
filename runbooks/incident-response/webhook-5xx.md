# Incident Response: Webhook 5xx Errors

## Symptoms
- Trillet/Bland webhook returning 500/502/503
- Calls reaching webhook but failing to process
- Error logs show signature verification failures
- Supabase writes failing

## Severity
**P1 if > 50% failure rate, P2 if intermittent**

## Response Steps

### 1. Check Error Logs (T+0)
```bash
# Netlify function logs
npx netlify logs:function --site $NETLIFY_SITE_ID

# Or check via Netlify dashboard:
# https://app.netlify.com/sites/whoza-ai/functions
```

Common errors:
- `Invalid signature` → webhook secret mismatch
- `Payload too large` → unusual call data size
- `Supabase connection error` → database issue
- `Internal server error` → unhandled exception

### 2. Verify Webhook Secret (T+1)
```bash
# Check local secret
echo $TRILLET_WEBHOOK_SECRET

# Compare with Trillet dashboard setting
# Must be exactly the same (case-sensitive)
```

### 3. Check Supabase (T+2)
```bash
# Test Supabase connection
curl "https://ligjstpxqtkurvteyyhw.supabase.co/rest/v1/calls?limit=1" \
  -H "apikey: $SUPABASE_ANON_KEY"

# Check RLS policies
# SELECT * FROM pg_policies WHERE tablename = 'calls';
```

### 4. Signature Debug
If signature verification failing:
```bash
# Compare signatures manually
node -e "
const crypto = require('crypto');
const payload = '{\"event\":\"call.started\",\"callId\":\"test\"}';
const secret = process.env.TRILLET_WEBHOOK_SECRET;
const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
console.log('Expected signature:', expected);
"
```

### 5. Temporarily Bypass Signature (Emergency Only)
```typescript
// In app/api/trillet-webhook/route.ts
// COMMENT OUT signature check for emergency:
// const isValid = trilletServer.verifyWebhookSignature(payloadText, signature);
// if (!isValid) { ... }

// Replace with:
const isValid = true; // EMERGENCY BYPASS — revert immediately
```

**⚠️ WARNING:** Only bypass if confirmed Trillet outage. Re-enable ASAP.

### 6. Test Webhook Manually
```bash
curl -X POST https://www.whoza.ai/api/trillet-webhook \
  -H "Content-Type: application/json" \
  -H "X-Trillet-Signature: test-signature-bypass" \
  -d '{"event":"call.started","callId":"test-123"}'
```

### 7. If Supabase Write Failing
- Check connection pool usage in Supabase dashboard
- Verify table schemas match expected format
- Check for disk space issues

## Prevention
- webhook-health agent monitors every 5 minutes
- db-integrity agent checks for orphaned records daily
- All webhook handlers use try/catch with structured logging