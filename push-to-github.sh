#!/bin/bash

# Push to GitHub Script
# Whoza.ai - ECE Explainer Integration

echo "=================================================="
echo "  Whoza.ai - Push to GitHub"
echo "=================================================="
echo ""
echo "Repository: https://github.com/DruMcP/whoza-ai.git"
echo "Branch: main"
echo "Commit: Complete ECE Explainer Integration - Phase 1"
echo ""
echo "=================================================="
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    echo "✓ GitHub CLI detected"
    echo ""
    echo "Checking authentication status..."

    if gh auth status &> /dev/null; then
        echo "✓ Already authenticated with GitHub"
        echo ""
        echo "Pushing to GitHub..."
        git push -u origin main

        if [ $? -eq 0 ]; then
            echo ""
            echo "=================================================="
            echo "  ✓ Successfully pushed to GitHub!"
            echo "=================================================="
            echo ""
            echo "View your repository:"
            echo "https://github.com/DruMcP/whoza-ai"
            echo ""
            echo "Next steps:"
            echo "1. Verify changes on GitHub"
            echo "2. Check Netlify auto-deploy (if connected)"
            echo "3. Test ECE Explainer on live site"
        else
            echo ""
            echo "✗ Push failed. Try force push:"
            echo "git push -u origin main --force"
        fi
    else
        echo "⚠ Not authenticated with GitHub"
        echo ""
        echo "Please authenticate first:"
        echo "gh auth login"
        echo ""
        echo "Then run this script again or use:"
        echo "git push -u origin main"
    fi
else
    echo "⚠ GitHub CLI not found"
    echo ""
    echo "Option 1: Install GitHub CLI"
    echo "  macOS:   brew install gh"
    echo "  Windows: winget install --id GitHub.cli"
    echo "  Linux:   See https://github.com/cli/cli#installation"
    echo ""
    echo "Option 2: Use Personal Access Token"
    echo "  1. Create token: https://github.com/settings/tokens"
    echo "  2. Run: git push -u origin main"
    echo "  3. Username: DruMcP"
    echo "  4. Password: [paste your token]"
    echo ""
    echo "Option 3: Manual push"
    echo "  git push -u origin main"
fi

echo ""
echo "=================================================="
echo "  Documentation"
echo "=================================================="
echo ""
echo "See PUSH_TO_GITHUB_NOW.md for detailed instructions"
echo ""
