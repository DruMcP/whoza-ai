#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Whoza.ai Production Build & Deploy      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Verify .env.production exists
echo -e "${YELLOW}[1/5] Checking .env.production...${NC}"
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ Error: .env.production not found!${NC}"
    echo "Please create it with the correct Supabase URL"
    exit 1
fi

# Check for correct Supabase URL
if grep -q "ryeqbewlmaqewsuvuhlm.supabase.co" .env.production; then
    echo -e "${GREEN}✅ Correct Supabase URL found${NC}"
else
    echo -e "${RED}❌ Error: Wrong Supabase URL in .env.production${NC}"
    echo "Expected: ryeqbewlmaqewsuvuhlm.supabase.co"
    exit 1
fi

# Step 2: Clean build directories
echo ""
echo -e "${YELLOW}[2/5] Cleaning build directories...${NC}"
rm -rf dist node_modules/.vite
echo -e "${GREEN}✅ Cleaned${NC}"

# Step 3: Build
echo ""
echo -e "${YELLOW}[3/5] Building production bundle...${NC}"
NODE_ENV=production npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build completed${NC}"

# Step 4: Verify build
echo ""
echo -e "${YELLOW}[4/5] Verifying build...${NC}"
SUPABASE_URL=$(grep -o "https://[a-z]*\.supabase\.co" dist/assets/index-*.js | sort -u)
echo "Found Supabase URL: $SUPABASE_URL"

if echo "$SUPABASE_URL" | grep -q "ryeqbewlmaqewsuvuhlm"; then
    echo -e "${GREEN}✅ Correct URL in build${NC}"
else
    echo -e "${RED}❌ Wrong URL in build: $SUPABASE_URL${NC}"
    echo "Expected: https://ryeqbewlmaqewsuvuhlm.supabase.co"
    exit 1
fi

# Step 5: Create deployment package
echo ""
echo -e "${YELLOW}[5/5] Creating deployment package...${NC}"
cd dist
zip -q -r ../whoza-dist-latest.zip .
cd ..
SIZE=$(ls -lh whoza-dist-latest.zip | awk '{print $5}')
echo -e "${GREEN}✅ Package created: whoza-dist-latest.zip ($SIZE)${NC}"

# Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        ✅ BUILD SUCCESSFUL!                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📦 Deployment package: whoza-dist-latest.zip ($SIZE)${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Go to https://app.netlify.com"
echo "  2. Open 'whoza-ai' site → Deploys tab"
echo "  3. Drag whoza-dist-latest.zip to deploy area"
echo "  4. Wait 30 seconds"
echo "  5. Test: https://whoza.ai"
echo ""
echo -e "${YELLOW}Or deploy via CLI:${NC}"
echo "  netlify deploy --prod --dir=dist"
echo ""
