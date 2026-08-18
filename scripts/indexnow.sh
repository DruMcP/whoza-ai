#!/usr/bin/env bash
#
# IndexNow submission script for whoza.ai
# https://www.indexnow.org/documentation
#
# Usage:
#   INDEXNOW_KEY=your-key INDEXNOW_KEY_LOCATION=https://whoza.ai/indexnow-key.txt ./scripts/indexnow.sh
#
# Or with .env:
#   set -a; source .env.local; set +a; ./scripts/indexnow.sh
#
set -euo pipefail

SITEMAP_URL="${SITEMAP_URL:-https://whoza.ai/sitemap.xml}"
INDEXNOW_KEY="${INDEXNOW_KEY:-}"
INDEXNOW_KEY_LOCATION="${INDEXNOW_KEY_LOCATION:-}"
DRY_RUN="${DRY_RUN:-false}"
BATCH_SIZE="${BATCH_SIZE:-100}"
DELAY_SECONDS="${DELAY_SECONDS:-1}"

# Colours for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Colour

log_info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ── Validate config ──────────────────────────────────────────────────────────

if [[ -z "$INDEXNOW_KEY" ]]; then
  log_error "INDEXNOW_KEY is not set."
  echo "       Get a key from https://www.bing.com/indexnow or https://yandex.com/support/webmaster/indexnow/"
  echo "       Example: INDEXNOW_KEY=abc123 ./scripts/indexnow.sh"
  exit 1
fi

if [[ -z "$INDEXNOW_KEY_LOCATION" ]]; then
  log_warn "INDEXNOW_KEY_LOCATION not set — assuming key file is at root domain."
  INDEXNOW_KEY_LOCATION="https://whoza.ai/${INDEXNOW_KEY}.txt"
fi

log_info "Sitemap:       $SITEMAP_URL"
log_info "Key:           ${INDEXNOW_KEY:0:4}****"
log_info "Key location:  $INDEXNOW_KEY_LOCATION"
log_info "Dry run:       $DRY_RUN"

# ── Fetch sitemap ────────────────────────────────────────────────────────────

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

SITEMAP_FILE="$TMPDIR/sitemap.xml"

curl -fsSL "$SITEMAP_URL" -o "$SITEMAP_FILE" 2>/dev/null || {
  log_error "Failed to fetch sitemap from $SITEMAP_URL"
  exit 1
}

# Extract URLs (handles both <loc> wrapped and unwrapped)
grep -oP '(?<=<loc>)[^<]+' "$SITEMAP_FILE" > "$TMPDIR/urls.txt" || true

URL_COUNT=$(wc -l < "$TMPDIR/urls.txt" | tr -d ' ')

if [[ "$URL_COUNT" -eq 0 ]]; then
  log_error "No URLs found in sitemap."
  exit 1
fi

log_info "Found $URL_COUNT URLs in sitemap."

# ── Submit URLs ──────────────────────────────────────────────────────────────

SUCCESS=0
FAILED=0
TOTAL=0

while IFS= read -r URL; do
  TOTAL=$((TOTAL + 1))

  API_URL="https://api.indexnow.org/IndexNow?url=${URL}&key=${INDEXNOW_KEY}&keyLocation=${INDEXNOW_KEY_LOCATION}"

  if [[ "$DRY_RUN" == "true" ]]; then
    log_info "[DRY RUN] Would submit: $URL"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  # Send the ping
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -A "whoza-ai-indexnow/1.0" \
    --max-time 30 \
    "$API_URL" 2>/dev/null || echo "000")

  case "$HTTP_CODE" in
    200)
      log_info "✓ $URL"
      SUCCESS=$((SUCCESS + 1))
      ;;
    202)
      log_info "✓ $URL (accepted, processing)"
      SUCCESS=$((SUCCESS + 1))
      ;;
    400)
      log_error "✗ $URL — Invalid request (400)"
      FAILED=$((FAILED + 1))
      ;;
    403)
      log_error "✗ $URL — Forbidden (403) — check key validity"
      FAILED=$((FAILED + 1))
      ;;
    422)
      log_error "✗ $URL — Unprocessable (422) — URL not in key location domain"
      FAILED=$((FAILED + 1))
      ;;
    429)
      log_warn "✗ $URL — Rate limited (429) — backing off..."
      sleep 5
      # Retry once
      HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
        -A "whoza-ai-indexnow/1.0" \
        --max-time 30 \
        "$API_URL" 2>/dev/null || echo "000")
      if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "202" ]]; then
        log_info "✓ $URL (retry OK)"
        SUCCESS=$((SUCCESS + 1))
      else
        log_error "✗ $URL — Retry failed ($HTTP_CODE)"
        FAILED=$((FAILED + 1))
      fi
      ;;
    000)
      log_error "✗ $URL — Network error (timeout/connection failed)"
      FAILED=$((FAILED + 1))
      ;;
    *)
      log_warn "✗ $URL — Unexpected HTTP $HTTP_CODE"
      FAILED=$((FAILED + 1))
      ;;
  esac

  # Rate limiting — sleep between requests unless it's the last one
  if [[ $TOTAL -lt $URL_COUNT ]]; then
    sleep "$DELAY_SECONDS"
  fi

done < "$TMPDIR/urls.txt"

# ── Summary ──────────────────────────────────────────────────────────────────

echo ""
echo "═══════════════════════════════════════════════════"
echo "  IndexNow Submission Complete"
echo "═══════════════════════════════════════════════════"
echo "  Total URLs:   $TOTAL"
echo "  Successful:   $SUCCESS"
echo "  Failed:       $FAILED"
echo "═══════════════════════════════════════════════════"

if [[ $FAILED -gt 0 ]]; then
  exit 1
fi

exit 0
