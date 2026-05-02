#!/bin/bash
# Deploy all email infrastructure to staging

cd /root/.openclaw/workspace/whoza-ai-v0

echo "=== Deploying Edge Functions ==="

# Deploy each edge function
for func in send-email send-notification notify-admin-signup notify-waitlist process-email-campaigns process-notifications; do
  echo "Deploying $func..."
  supabase functions deploy $func --project-ref ligjstpxqtkurvteyyhw
done

echo "=== Applying Database Migrations ==="
supabase db push --project-ref ligjstpxqtkurvteyyhw

echo "=== Deployment Complete ==="
