#!/bin/bash
# Whoza.ai Site Health Monitor
# Checks critical endpoints and reports issues

BASE_URL="https://whoza.ai"
FAILED=0
CHECKS=0

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

check_endpoint() {
  local path=$1
  local expected_code=${2:-200}
  local label=$3
  
  CHECKS=$((CHECKS + 1))
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code},%{time_total}" "${BASE_URL}${path}")
  HTTP_CODE=$(echo "$RESPONSE" | cut -d',' -f1)
  TIME=$(echo "$RESPONSE" | cut -d',' -f2)
  
  if [ "$HTTP_CODE" = "$expected_code" ]; then
    log "✅ $label: HTTP $HTTP_CODE (${TIME}s)"
  else
    log "❌ $label: HTTP $HTTP_CODE (expected $expected_code)"
    FAILED=$((FAILED + 1))
  fi
}

log "=== Whoza.ai Health Check Started ==="

# Core pages
check_endpoint "/" 200 "Homepage"
check_endpoint "/how-it-works/" 200 "How It Works"
check_endpoint "/pricing/" 200 "Pricing"
check_endpoint "/competitor-analysis/" 200 "Competitor Analysis"
check_endpoint "/case-studies/" 200 "Case Studies"

# Content pages
check_endpoint "/blog/" 200 "Blog"
check_endpoint "/blog/how-ai-search-engines-choose-which-local-businesses-to-recommend/" 200 "Blog Post"

# Location pages
check_endpoint "/uk/ai-visibility/london/" 200 "London UK"
check_endpoint "/us/ai-visibility/new-york/" 200 "New York US"

# Trade pages
check_endpoint "/trades/plumber/" 200 "Plumber Trade"
check_endpoint "/trades/electrician/" 200 "Electrician Trade"

# Static assets
check_endpoint "/sitemap.xml" 200 "Sitemap"
check_endpoint "/robots.txt" 200 "robots.txt"
check_endpoint "/og-image.png" 200 "OG Image"

# SEO critical checks
check_endpoint "/trades/builder/" 200 "Builder Trade"
check_endpoint "/trades/roofer/" 200 "Roofer Trade"
check_endpoint "/uk/ai-visibility/manchester/" 200 "Manchester UK"
check_endpoint "/us/ai-visibility/los-angeles/" 200 "Los Angeles US"

log "=== Summary: $((CHECKS - FAILED))/$CHECKS checks passed ==="

if [ $FAILED -gt 0 ]; then
  log "⚠️  $FAILED check(s) failed"
  exit 1
else
  log "✅ All checks passed — site is healthy"
  exit 0
fi
