#!/bin/bash

# Test the Free Score API with a real business
# This will show all the logging output

SUPABASE_URL="https://ryeqbewlmaqewsuvuhlm.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTcyMjEsImV4cCI6MjA1MDYzMzIyMX0.DQ2JXzsSxnj0-oBvr-BW__Y1dSuoSlhK4NGV9b4dDPY"

echo "🧪 Testing Free Score API with MacPherson Electrical Ltd..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# First, get a CSRF token
echo "1️⃣  Getting CSRF token..."
CSRF_RESPONSE=$(curl -s -X POST "${SUPABASE_URL}/functions/v1/verify-free-score/get-csrf" \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json")

CSRF_TOKEN=$(echo $CSRF_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$CSRF_TOKEN" ]; then
  echo "⚠️  Could not get CSRF token, using test token"
  CSRF_TOKEN="test-token-12345"
fi

echo "✅ CSRF Token obtained"
echo ""

# Submit the free score request
echo "2️⃣  Submitting free score request..."
echo ""

curl -X POST "${SUPABASE_URL}/functions/v1/verify-free-score" \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{
    "email": "dru.mcpherson@gmail.com",
    "businessName": "MacPherson Electrical Ltd",
    "location": "Edinburgh",
    "tradeType": "Electrician",
    "websiteUrl": "https://macphersonelectrical.co.uk",
    "csrfToken": "'$CSRF_TOKEN'",
    "turnstileToken": "test-token",
    "honeypot": ""
  }' | jq '.'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Test complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to Supabase Dashboard → Edge Functions → verify-free-score → Logs"
echo "   2. Look for the extensive logging output showing:"
echo "      - 🔑 API Key Status Check"
echo "      - 📋 Request Data"
echo "      - 🔍 [1/5] Google Places API call"
echo "      - 🌐 [2/5] Website analysis"
echo "      - 🤖 [3/5] OpenAI review analysis"
echo "      - 🤖 [4/5] OpenAI content analysis"
echo "      - 🔮 [5/5] Perplexity AI queries"
echo "      - 🎯 FINAL ECE V2.1 SCORE"
echo "      - 📊 Pillar Breakdown"
echo "      - 💡 Top Recommendations"
echo ""
