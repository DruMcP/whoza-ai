#!/usr/bin/env bash
#
# One-time setup for IndexNow on whoza.ai
# Run this after cloning the repo to generate a key and configure the environment.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$REPO_ROOT/.env.local"

# Check if key already exists
if grep -q "INDEXNOW_KEY" "$ENV_FILE" 2>/dev/null; then
  echo "IndexNow key already configured in .env.local"
  grep "INDEXNOW_KEY" "$ENV_FILE"
  exit 0
fi

# Generate a 64-char hex key
KEY=$(openssl rand -hex 32)

# Create the verification file in public/ (served at root domain)
KEY_FILE="$REPO_ROOT/public/${KEY}.txt"
echo "$KEY" > "$KEY_FILE"

echo "Generated IndexNow key: ${KEY:0:8}****"
echo "Key file: public/${KEY:0:8}****.txt"

# Append to .env.local
{
  echo ""
  echo "# ── IndexNow (Bing, Yandex, Seznam.cz) ──────────────────────────────"
  echo "INDEXNOW_KEY=$KEY"
  echo "INDEXNOW_KEY_LOCATION=https://whoza.ai/${KEY}.txt"
} >> "$ENV_FILE"

echo ""
echo "Added to .env.local:"
echo "  INDEXNOW_KEY=${KEY:0:8}****"
echo "  INDEXNOW_KEY_LOCATION=https://whoza.ai/${KEY:0:8}****.txt"
echo ""
echo "Next steps:"
echo "  1. Commit the key file: git add public/${KEY:0:8}****.txt"
echo "  2. The key file will be served at https://whoza.ai/${KEY:0:8}****.txt"
echo "  3. Run: ./scripts/indexnow.sh (after sourcing .env.local)"
