#!/bin/bash

# Deploy to whoza-ai Netlify Site
# This script ensures deployment to the CORRECT Netlify project

set -e

echo "🔍 Checking Netlify CLI..."
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI found"
echo ""

echo "🔗 Checking site connection..."
CURRENT_SITE=$(netlify status --json 2>/dev/null | grep -o '"name":"[^"]*"' | cut -d'"' -f4 || echo "not-linked")

if [ "$CURRENT_SITE" != "whoza-ai" ]; then
    echo "⚠️  WARNING: Currently linked to: $CURRENT_SITE"
    echo "❌ Expected: whoza-ai"
    echo ""
    echo "🔧 Fix this by running:"
    echo "   netlify unlink"
    echo "   netlify link"
    echo "   (Then select 'whoza-ai' from the list)"
    echo ""
    read -p "Do you want to continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Connected to correct site: whoza-ai"
fi

echo ""
echo "🏗️  Building project..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "✅ Build complete"
echo ""

echo "📦 Deploying to production..."
echo "   Site: whoza-ai"
echo "   Site ID: 9313ac92-d80f-4935-b4f7-61a0c5b07e2d"
netlify deploy --prod --dir=dist --site=9313ac92-d80f-4935-b4f7-61a0c5b07e2d

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🔍 Verify deployment:"
echo "   1. Visit: https://whoza.ai"
echo "   2. Check build timestamp in page source"
echo "   3. Test /free-score form"
echo ""
