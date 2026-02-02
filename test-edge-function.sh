#!/bin/bash

# Test Free VCS Email Edge Function
# Tests if email sending works correctly

echo "========================================"
echo "TESTING FREE VCS EMAIL EDGE FUNCTION"
echo "========================================"
echo ""

echo "Sending test email to: dru.mcpherson@gmail.com"
echo "Business: Test Business (curl)"
echo "Score: 65/100"
echo ""

echo "Calling edge function..."
echo ""

response=$(curl -s -X POST https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/send-free-score-email \
  -H "Authorization: Bearer YOUR_NEW_ANON_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dru.mcpherson@gmail.com",
    "businessName": "Test Business (curl)",
    "score": 65,
    "tradeType": "Electrician",
    "location": "Birmingham, UK",
    "websiteUrl": "https://test.com",
    "summaryText": "This is a test email sent via curl to verify the email function works."
  }')

echo "Response:"
echo "$response" | jq '.' 2>/dev/null || echo "$response"
echo ""
echo "========================================"

# Check if success
if echo "$response" | grep -q '"success":true'; then
  echo "✅ SUCCESS! Email sent."
  echo ""
  echo "Check inbox: dru.mcpherson@gmail.com"
  echo "Email should arrive within 1-2 minutes"
  echo ""
  exit 0
elif echo "$response" | grep -q 'You can only send testing emails'; then
  echo "⚠️  RESEND SANDBOX MODE DETECTED"
  echo ""
  echo "The edge function works, but Resend is in sandbox mode."
  echo "Emails only work for: dru.mcpherson@gmail.com"
  echo ""
  echo "Fix: Verify custom domain in Resend"
  echo "See: EMAIL_FIX_QUICK_START.md"
  echo ""
  exit 1
else
  echo "❌ FAILED"
  echo ""
  echo "Edge function returned an error."
  echo "Check the response above for details."
  echo ""
  exit 1
fi
