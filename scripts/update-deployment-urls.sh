#!/bin/bash

# Script to automatically update deployment URLs after Vercel deployment
# This script fetches the latest deployment URL and updates all references

set -e

echo "🔄 Updating deployment URLs..."

# Try to get the latest deployment URL dynamically
DYNAMIC_URL=$(vercel ls --scope muhammad-ahmed-shehzads-projects 2>/dev/null | grep "Production" | grep "● Ready" | head -1 | grep -oE "https://portfolio-[^[:space:]]*\.vercel\.app" || echo "")

if [ ! -z "$DYNAMIC_URL" ]; then
    LATEST_URL="$DYNAMIC_URL"
    echo "📍 Found dynamic URL: $LATEST_URL"
else
    # Fallback to reading from deployment-url.txt if dynamic detection fails
    if [ -f "deployment-url.txt" ]; then
        LATEST_URL=$(cat deployment-url.txt)
        echo "📍 Using URL from deployment-url.txt: $LATEST_URL"
    else
        echo "❌ Error: Could not find deployment URL"
        exit 1
    fi
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
