#!/bin/bash

# Automated deployment script for portfolio
# This script builds, deploys to Vercel, and updates all URL references

set -e

echo "🚀 Starting automated deployment..."

# Step 1: Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run lint
npm run format:check
echo "✅ Pre-deployment checks passed"

# Step 2: Build the project
echo "🏗️ Building project..."
npm run build
echo "✅ Build completed"

# Step 3: Deploy to Vercel
echo "📤 Deploying to Vercel..."
vercel deploy --prebuilt --prod
echo "✅ Deployment completed"

# Step 4: Wait a moment for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
sleep 5

# Step 5: Update deployment URLs
echo "🔄 Updating deployment URLs..."
./scripts/update-deployment-urls.sh --commit
echo "✅ URLs updated and committed"

# Step 6: Push changes to git
echo "📤 Pushing changes to git..."
git push origin main
echo "✅ Changes pushed to repository"

# Step 7: Get the final deployment URL
FINAL_URL=$(cat deployment-url.txt)
echo ""
echo "🎉 Deployment completed successfully!"
echo "📋 Your site is live at: $FINAL_URL"
echo ""
echo "🔗 Next steps:"
echo "   1. Test your site: $FINAL_URL"
echo "   2. Update any bookmarks or external links"
echo "   3. Share the new URL if needed"
