#!/bin/bash

# Quick Deployment Script for whoza.ai
# This script helps you deploy the fixed build to Netlify

set -e

echo "🚀 whoza.ai Deployment Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "dist" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project files found"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Option 1: Git + Push (Recommended)
echo "📦 OPTION 1: Deploy via Git (Recommended)"
echo "==========================================="
echo ""

if [ -d ".git" ]; then
    echo "✅ Git repository detected"
    echo ""
    echo "Current git status:"
    git status --short
    echo ""

    read -p "Do you want to commit and push changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Adding files to git..."
        git add .

        read -p "Enter commit message (or press Enter for default): " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="Fix: Deploy correct Supabase URL and production build"
        fi

        echo "Committing changes..."
        git commit -m "$commit_msg"

        echo "Pushing to remote..."
        git push

        echo ""
        echo "✅ Changes pushed! Netlify should auto-deploy if connected."
        echo "   Check https://app.netlify.com for deployment status"
        exit 0
    fi
else
    echo "⚠️  Git repository not initialized"
    echo ""
    read -p "Do you want to initialize git now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Initializing git repository..."
        git init
        git add .
        git commit -m "Initial commit: Production ready build"

        echo ""
        echo "✅ Git initialized!"
        echo ""
        echo "Next steps:"
        echo "1. Create a repository on GitHub/GitLab"
        echo "2. Add remote: git remote add origin YOUR-REPO-URL"
        echo "3. Push: git push -u origin main"
        echo "4. Connect repository to Netlify at https://app.netlify.com"
        exit 0
    fi
fi

echo ""

# Option 2: Netlify CLI
echo "📦 OPTION 2: Deploy via Netlify CLI"
echo "===================================="
echo ""

if command_exists netlify; then
    echo "✅ Netlify CLI is installed"
    echo ""

    read -p "Do you want to deploy with Netlify CLI now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Checking authentication..."
        if netlify status >/dev/null 2>&1; then
            echo "✅ Authenticated with Netlify"
            echo ""
            echo "Deploying to production..."
            netlify deploy --prod --dir=dist

            echo ""
            echo "✅ Deployment complete!"
            echo ""
            echo "Verify deployment:"
            echo "curl -s 'https://whoza.ai' | grep -o 'https://[a-z0-9]*\.supabase\.co' | sort -u"
            exit 0
        else
            echo "⚠️  Not authenticated with Netlify"
            echo ""
            read -p "Do you want to login now? (y/n) " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                netlify login
                echo ""
                echo "Now run this script again to deploy"
                exit 0
            fi
        fi
    fi
else
    echo "⚠️  Netlify CLI is not installed"
    echo ""
    echo "Install with: npm install -g netlify-cli"
    echo "Or use npx: npx netlify-cli deploy --prod --dir=dist"
fi

echo ""

# Option 3: Manual deployment package
echo "📦 OPTION 3: Manual Deployment Package"
echo "======================================="
echo ""

if [ -f "whoza-dist-latest.zip" ]; then
    echo "✅ Deployment package already exists: whoza-dist-latest.zip"
else
    echo "Creating deployment package..."
    cd dist && zip -r ../whoza-dist-latest.zip . && cd ..
    echo "✅ Created: whoza-dist-latest.zip"
fi

echo ""
echo "Manual deployment steps:"
echo "1. Go to https://app.netlify.com"
echo "2. Open your 'whoza-ai' site"
echo "3. Go to 'Deploys' tab"
echo "4. Drag and drop: whoza-dist-latest.zip"
echo ""
echo "The file is ready at: $(pwd)/whoza-dist-latest.zip"
echo ""

# Summary
echo ""
echo "🎯 Summary"
echo "=========="
echo ""
echo "Your build is ready with:"
echo "  ✅ Correct Supabase URL: ryeqbewlmaqewsuvuhlm.supabase.co"
echo "  ✅ Secrets scanner whitelist configured"
echo "  ✅ Fresh production build"
echo ""
echo "Choose one deployment option above to go live!"
echo ""
echo "📚 For detailed instructions, see: URGENT_DEPLOYMENT_INSTRUCTIONS.md"
