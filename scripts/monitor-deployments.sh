#!/bin/bash

# Deployment Monitor Script
# This script helps monitor Vercel deployments and detect duplicates

set -e

echo "🔍 Vercel Deployment Monitor"
echo "=========================="
echo "Timestamp: $(date)"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel@latest
fi

echo "📋 Vercel CLI version: $(vercel --version)"
echo ""

# List recent deployments
echo "📦 Recent deployments:"
echo "----------------------"
vercel list --token "${VERCEL_TOKEN:-$1}" 2>/dev/null | head -10 || {
    echo "⚠️  Unable to fetch deployment list. Check your VERCEL_TOKEN."
    exit 1
}

echo ""
echo "🔧 Deployment configuration check:"
echo "--------------------------------"

# Check if auto-deployments are disabled
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
    if grep -q '"deploymentEnabled": false' vercel.json; then
        echo "✅ Auto-deployments disabled in vercel.json"
    else
        echo "⚠️  Auto-deployments may still be enabled"
    fi
else
    echo "⚠️  No vercel.json found"
fi

# Check GitHub Actions workflow
if [ -f ".github/workflows/ci-cd.yml" ]; then
    echo "✅ CI/CD workflow found"
    if grep -q "Deploy to Vercel" .github/workflows/ci-cd.yml; then
        echo "✅ Manual Vercel deployment configured in GitHub Actions"
    fi
else
    echo "⚠️  No CI/CD workflow found"
fi

echo ""
echo "💡 To prevent duplicate deployments:"
echo "1. Disable Vercel auto-deployments in project settings"
echo "2. Use only GitHub Actions for deployments"
echo "3. Monitor deployment logs for duplicates"
echo ""
