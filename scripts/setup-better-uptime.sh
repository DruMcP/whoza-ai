#!/bin/bash
# Better Uptime Monitor Setup Script
# Creates all monitors defined in monitors.conf
# Requires: BETTERUPTIME_API_KEY environment variable

set -euo pipefail

API_KEY="${BETTERUPTIME_API_KEY:-}"
if [ -z "$API_KEY" ]; then
  echo "❌ ERROR: BETTERUPTIME_API_KEY not set"
  echo "Set it via: export BETTERUPTIME_API_KEY=your_api_key"
  exit 1
fi

API_URL="https://betteruptime.com/api/v2/monitors"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONF_FILE="$SCRIPT_DIR/../monitoring/better-uptime/monitors.conf"

echo "🔧 Setting up Better Uptime monitors for whoza.ai..."
echo ""

# Parse monitors.conf and create each monitor
while IFS= read -r line || [ -n "$line" ]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "$line" ]] && continue
  
  # Parse monitor definition
  # Format: monitors[name]="url|method|expected_status|timeout|regions"
  if [[ "$line" =~ monitors\[([^\]]+)\]\=\"([^\"]+)\" ]]; then
    name="${BASH_REMATCH[1]}"
    config="${BASH_REMATCH[2]}"
    
    IFS='|' read -r url method expected_status timeout regions <<< "$config"
    
    echo "  Creating: $name → $url"
    
    response=$(curl -s -X POST "$API_URL" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"monitor_type\": \"status\",
        \"url\": \"$url\",
        \"pronounceable_name\": \"whoza.ai: $name\",
        \"http_method\": \"$method\",
        \"request_timeout\": $timeout,
        \"expected_status_codes\": [$expected_status],
        \"regions\": [$(echo "$regions" | sed 's/[^,]*/"&"/g')],
        \"check_frequency\": 60,
        \"confirmation_period\": 2,
        \"recovery_period\": 2,
        \"request_headers\": [{\"name\":\"User-Agent\",\"value\":\"BetterUptime-whoza-ai/1.0\"}]
      }" 2>/dev/null)
    
    if echo "$response" | grep -q '"id"'; then
      echo "    ✅ Created successfully"
    else
      echo "    ⚠️  Failed: $(echo "$response" | grep -o '"message":"[^"]*"' | head -1)"
    fi
  fi
done < "$CONF_FILE"

echo ""
echo "✅ Better Uptime setup complete"
echo "📊 View monitors at: https://betteruptime.com/team/monitors"
