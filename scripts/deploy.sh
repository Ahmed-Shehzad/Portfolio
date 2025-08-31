#!/bin/bash

# Deploy script for Portfolio using Vercel prebuilt approach
# Usage: ./scripts/deploy.sh [preview|production]

set -e

ENVIRONMENT="${1:-preview}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "🚀 Starting deployment process for: $ENVIRONMENT"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel@latest
fi

# Check if environment variables are set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN environment variable is not set"
    echo "Please set it with: export VERCEL_TOKEN=your_token_here"
    exit 1
fi

if [ -z "$VERCEL_ORG_ID" ]; then
    echo "❌ VERCEL_ORG_ID environment variable is not set"
    echo "Please set it with: export VERCEL_ORG_ID=your_org_id"
    exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "❌ VERCEL_PROJECT_ID environment variable is not set"
    echo "Please set it with: export VERCEL_PROJECT_ID=your_project_id"
    exit 1
fi

echo "✅ Environment variables are set"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next .vercel/output

# Build the project
echo "🔨 Building project..."
npm run build

# Generate Vercel build output
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🏗️ Generating Vercel build output for production..."
    vercel build --prod
    echo "🚀 Deploying to production..."
    DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod)
else
    echo "🏗️ Generating Vercel build output for preview..."
    vercel build
    echo "🚀 Deploying to preview..."
    DEPLOYMENT_URL=$(vercel deploy --prebuilt)
fi

echo "✅ Deployment completed!"
echo "🔗 Deployment URL: $DEPLOYMENT_URL"

# Optional: Open the deployment in browser (macOS only)
if command -v open &> /dev/null; then
    read -p "Open deployment in browser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "$DEPLOYMENT_URL"
    fi
fi

echo "🎉 Deployment process completed successfully!"
