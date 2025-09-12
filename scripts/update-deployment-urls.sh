#!/bin/bash

# Script to automatically update deployment URLs after Vercel deployment
# This script fetches the latest deployment URL and updates all references

set -e

echo "🔄 Updating deployment URLs..."

# For now, use the stable alias we know works
LATEST_URL="https://portfolio-gayf3a56s-muhammad-ahmed-shehzads-projects.vercel.app"

# Try to get the latest deployment URL dynamically (fallback to manual)
DYNAMIC_URL=$(vercel ls --scope muhammad-ahmed-shehzads-projects 2>/dev/null | grep -A20 "Deployments for" | grep "https://portfolio-.*vercel\.app" | grep "Production" | head -1 | sed 's/.*\(https:\/\/portfolio-[^[:space:]]*\.vercel\.app\).*/\1/' || echo "")

if [ ! -z "$DYNAMIC_URL" ]; then
    LATEST_URL="$DYNAMIC_URL"
    echo "📍 Found dynamic URL: $LATEST_URL"
else
    echo "📍 Using stable alias URL: $LATEST_URL"
fi

# Update deployment-url.txt
echo "$LATEST_URL" > deployment-url.txt
echo "✅ Updated deployment-url.txt"

# Update robots.txt (handle both macOS and Linux sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|Sitemap: https://.*vercel\.app/sitemap\.xml|Sitemap: $LATEST_URL/sitemap.xml|g" public/robots.txt
else
    # Linux (GitHub Actions)
    sed -i "s|Sitemap: https://.*vercel\.app/sitemap\.xml|Sitemap: $LATEST_URL/sitemap.xml|g" public/robots.txt
fi
echo "✅ Updated public/robots.txt"

# Update sitemap.xml (handle both macOS and Linux sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|<loc>https://.*vercel\.app/</loc>|<loc>$LATEST_URL/</loc>|g" public/sitemap.xml
else
    # Linux (GitHub Actions)
    sed -i "s|<loc>https://.*vercel\.app/</loc>|<loc>$LATEST_URL/</loc>|g" public/sitemap.xml
fi
echo "✅ Updated public/sitemap.xml"

# Update lastmod in sitemap.xml to current date (handle both macOS and Linux sed)
CURRENT_DATE=$(date +%Y-%m-%d)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|<lastmod>.*</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" public/sitemap.xml
else
    # Linux (GitHub Actions)
    sed -i "s|<lastmod>.*</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" public/sitemap.xml
fi
echo "✅ Updated sitemap lastmod date"

echo "🎉 All deployment URLs updated successfully!"
echo "📋 New URL: $LATEST_URL"

# Optionally commit the changes
if [ "$1" = "--commit" ]; then
    echo "📝 Committing changes..."
    git add deployment-url.txt public/robots.txt public/sitemap.xml
    git commit -m "chore: update deployment URLs to $LATEST_URL"
    echo "✅ Changes committed"
fi
