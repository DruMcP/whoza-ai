#!/bin/bash

# Whoza.ai - GitHub & Netlify Setup Script
# This script helps you push to GitHub and connect to Netlify

set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Whoza.ai - GitHub & Netlify Setup          ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════╝${NC}"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Git repository not initialized${NC}"
    echo "Run: git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
    echo "Commit them first:"
    echo "  git add ."
    echo "  git commit -m 'Your commit message'"
    exit 1
fi

echo -e "${GREEN}✅ Git repository is ready${NC}"
echo ""

# Step 1: Check for GitHub remote
echo -e "${YELLOW}[Step 1/4] Checking GitHub remote...${NC}"
if git remote | grep -q "origin"; then
    REMOTE_URL=$(git remote get-url origin)
    echo -e "${GREEN}✅ GitHub remote exists: $REMOTE_URL${NC}"
else
    echo -e "${YELLOW}No GitHub remote found.${NC}"
    echo ""
    echo "To add GitHub remote:"
    echo "  1. Create repo at: https://github.com/new"
    echo "  2. Name it: whoza-ai"
    echo "  3. Run: git remote add origin https://github.com/YOUR_USERNAME/whoza-ai.git"
    echo "  4. Run: git push -u origin main"
    echo ""
    read -p "Enter your GitHub repository URL (or press Enter to skip): " REPO_URL

    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✅ Remote added${NC}"
    else
        echo -e "${YELLOW}Skipped. Add manually later.${NC}"
    fi
fi
echo ""

# Step 2: Push to GitHub
echo -e "${YELLOW}[Step 2/4] Push to GitHub...${NC}"
if git remote | grep -q "origin"; then
    echo "Ready to push to GitHub?"
    read -p "Push now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main
        echo -e "${GREEN}✅ Pushed to GitHub${NC}"
    else
        echo -e "${YELLOW}Skipped. Push manually: git push -u origin main${NC}"
    fi
else
    echo -e "${YELLOW}No remote configured. Skipping push.${NC}"
fi
echo ""

# Step 3: Netlify Connection Instructions
echo -e "${YELLOW}[Step 3/4] Connect to Netlify...${NC}"
echo ""
echo "Follow these steps in Netlify:"
echo ""
echo "1. Go to: https://app.netlify.com"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Select 'GitHub'"
echo "4. Authorize Netlify"
echo "5. Select 'whoza-ai' repository"
echo "6. Configure build settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "7. DON'T DEPLOY YET! Add environment variables first."
echo ""
read -p "Press Enter when Netlify is connected (don't deploy yet)..."
echo ""

# Step 4: Environment Variables
echo -e "${YELLOW}[Step 4/4] Add Environment Variables...${NC}"
echo ""
echo "Add these variables in Netlify:"
echo "Site settings → Environment variables → Add a variable"
echo ""
echo -e "${BLUE}Copy these values:${NC}"
echo ""
echo "VITE_SUPABASE_URL"
echo "https://ryeqbewlmaqewsuvuhlm.supabase.co"
echo ""
echo "VITE_SUPABASE_ANON_KEY"
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXFiZXdsbWFxZXdzdXZ1aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk2MDIsImV4cCI6MjA4MjgzNTYwMn0.2z3ii0wYdSVEQqVaD60m9ND_vVM9I2guoIoYBKbG0j4"
echo ""
echo "VITE_RESEND_API_KEY"
echo "re_jCUyu7dS_BTwTPsfNyXyDcaM8n4FxMmhX"
echo ""
echo "VITE_GOOGLE_PLACES_API_KEY"
echo "AIzaSyDXpEGqFvcgWvUcKbSCZstbUYZSqpWL62A"
echo ""
echo "VITE_APP_URL"
echo "https://whoza.ai"
echo ""
read -p "Press Enter when all environment variables are added..."
echo ""

# Final Instructions
echo -e "${BLUE}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              Setup Complete! 🎉               ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo ""
echo "1. In Netlify, click 'Deploy site'"
echo "2. Wait 1-2 minutes for build to complete"
echo "3. Test: https://whoza.ai"
echo "4. Verify authentication works"
echo ""
echo -e "${GREEN}From now on:${NC}"
echo "  git add ."
echo "  git commit -m 'Your changes'"
echo "  git push"
echo "  → Automatic deploy to Netlify! 🚀"
echo ""
echo "Full documentation: CONNECT_TO_GITHUB_AND_NETLIFY.md"
echo ""
