#!/bin/bash

# ========================================
# CRITICAL: Push Hero Image Fix to GitHub
# ========================================
# This will deploy the fix to your live site

echo "🚨 CRITICAL FIX READY TO DEPLOY"
echo "================================"
echo ""
echo "✅ Hero image fix committed to git"
echo "✅ Commit: dbd85b7"
echo "✅ Branch: main"
echo ""
echo "📦 Changes in this commit:"
echo "  - Cache-busting added (?v=20260113)"
echo "  - Error handling with console logging"
echo "  - Diagnostic test page created"
echo "  - Debug script for browser console"
echo "  - Comprehensive documentation"
echo ""

# Check if GitHub remote exists
if git remote | grep -q "^origin$"; then
    echo "✅ GitHub remote 'origin' already configured"
    REMOTE_URL=$(git remote get-url origin)
    echo "   URL: $REMOTE_URL"
    echo ""
    echo "🚀 Ready to push? Run:"
    echo "   git push origin main"
else
    echo "⚠️  No GitHub remote configured"
    echo ""
    echo "📝 To push to GitHub, run these commands:"
    echo ""
    echo "1. Add your GitHub repository as remote:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git"
    echo ""
    echo "2. Push the fix:"
    echo "   git push -u origin main"
    echo ""
    echo "If you don't have a GitHub repo yet:"
    echo "  - Go to: https://github.com/new"
    echo "  - Name: whoza-ai"
    echo "  - Visibility: Private"
    echo "  - Don't initialize with README"
    echo "  - Click 'Create repository'"
    echo "  - Copy the URL from the next page"
fi

echo ""
echo "⏱️  Once pushed, Netlify will auto-deploy in ~2 minutes"
echo ""
echo "🔍 After deployment, verify:"
echo "  1. Visit https://whoza.ai"
echo "  2. Open DevTools Console (F12)"
echo "  3. Look for: 'Hero image loaded successfully: 450 x 806'"
echo "  4. Check Network tab for hero_image.png?v=20260113"
echo "  5. Test diagnostic page: https://whoza.ai/test-hero-image.html"
echo ""
