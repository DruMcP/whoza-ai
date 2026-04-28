#!/bin/bash
set -e

echo "🚀 whoza.ai Staging Deploy Script"
echo "=================================="

# Configuration
STAGING_BRANCH="staging"
STAGING_URL="https://whoza-ai-staging.netlify.app"
REPO_URL="https://github.com/DruMcP/whoza-ai.git"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Verify we're on staging branch${NC}"
current_branch=$(git branch --show-current)
if [ "$current_branch" != "$STAGING_BRANCH" ]; then
    echo -e "${RED}Error: Not on staging branch. Current: $current_branch${NC}"
    echo "Run: git checkout staging"
    exit 1
fi

echo -e "${GREEN}✓ On staging branch${NC}"

echo -e "${YELLOW}Step 2: Pull latest changes${NC}"
git pull origin staging

echo -e "${YELLOW}Step 3: Install dependencies${NC}"
npm install

echo -e "${YELLOW}Step 4: Build for staging${NC}"
cp .env.staging .env
npm run build

echo -e "${YELLOW}Step 5: Deploy to Netlify staging${NC}"
if command -v netlify &> /dev/null; then
    netlify deploy --prod --build
else
    echo -e "${YELLOW}Netlify CLI not found. Manual deploy required:${NC}"
    echo "1. Go to https://app.netlify.com"
    echo "2. Select whoza-ai-staging site"
    echo "3. Trigger deploy from GitHub staging branch"
fi

echo -e "${YELLOW}Step 6: Verify deployment${NC}"
echo "Checking $STAGING_URL..."
if curl -s -o /dev/null -w "%{http_code}" "$STAGING_URL" | grep -q "200\|301"; then
    echo -e "${GREEN}✓ Staging site is live${NC}"
else
    echo -e "${YELLOW}⚠ Could not verify staging site (may need a moment to propagate)${NC}"
fi

echo ""
echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Staging deploy complete!${NC}"
echo -e "${GREEN}URL: $STAGING_URL${NC}"
echo -e "${GREEN}==================================${NC}"

# Post-deploy checklist
echo ""
echo "📋 Post-Deploy Checklist:"
echo "  [ ] Test /voice landing page loads"
echo "  [ ] Test /voice/setup onboarding flow"
echo "  [ ] Test /portal voice dashboard"
echo "  [ ] Test trial signup (no credit card)"
echo "  [ ] Test plan selection page"
echo "  [ ] Verify Stripe test mode active"
echo "  [ ] Verify Supabase staging project connected"
echo "  [ ] Run SQL migration if not already done"
echo ""
echo "🧪 Run 14-day test protocol:"
echo "   scripts/14-day-test-protocol.sh"
