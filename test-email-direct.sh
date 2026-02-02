#!/bin/bash

echo "🧪 Testing send-free-score-email Edge Function"
echo "=============================================="
echo ""

curl -X POST \
  https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/send-free-score-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_NEW_ANON_KEY_HERE" \
  -d '{
    "email": "dru.mcpherson@gmail.com",
    "businessName": "Direct Email Test",
    "score": 75,
    "tradeType": "Plumber",
    "location": "London",
    "websiteUrl": "",
    "summaryText": "Your business has good online visibility across key AI platforms. You are appearing in several search results and have strong local presence. A few targeted improvements could push you into the top tier."
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "=============================================="
echo "✅ If you see success: true and an email_id, check your inbox!"
echo "📧 Email should arrive at: dru.mcpherson@gmail.com"
echo "⏱️  Wait 1-2 minutes for delivery"
