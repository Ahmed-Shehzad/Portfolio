# Vercel Deployment Guide

This project has been configured for deployment on Vercel with Server-Side Rendering (SSR) enabled.

## Changes Made

### 1. Next.js Configuration

- Removed static export (`output: "export"`)
- Enabled image optimization
- Removed GitHub Pages specific paths (`basePath` and `assetPrefix`)
- Headers configuration moved to Vercel

### 2. Application Architecture

- Converted from Client-Side Rendering (CSR) to Server-Side Rendering (SSR)
- Removed `"use client"` directive from main page
- Removed dynamic imports with `ssr: false`
- Direct imports for better SSR performance

### 3. Vercel Configuration

- Created `vercel.json` with:
  - Build and output settings
  - Security headers
  - API route redirects for robots.txt and sitemap.xml
  - Function runtime configuration

### 4. API Routes

- `/api/robots` - Dynamic robots.txt generation
- `/api/sitemap` - Dynamic sitemap.xml generation

## Deployment Steps

### Option 1: Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Option 2: Git Integration

1. Connect your GitHub repository to Vercel
2. Import project at https://vercel.com/new
3. Configure environment variables if needed
4. Deploy automatically on push to main branch

### Option 3: GitHub Integration

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Configure build settings (should auto-detect)
5. Deploy

## Environment Variables

Add these environment variables in Vercel dashboard if needed:

- `NODE_ENV=production` (automatically set by Vercel)
- Any custom environment variables your app requires

## Custom Domain

1. Go to your project dashboard on Vercel
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS records as instructed

## Performance Benefits of SSR

- **Better SEO**: Search engines can crawl pre-rendered content
- **Faster First Contentful Paint**: Initial HTML is rendered on server
- **Improved Core Web Vitals**: Better LCP and CLS scores
- **Dynamic Content**: Can fetch data at request time

## Monitoring

Vercel provides built-in monitoring:

- Analytics dashboard
- Function logs
- Performance insights
- Error tracking

## Rollback

If issues occur:

- Use Vercel dashboard to rollback to previous deployment
- Or redeploy previous git commit

## Migration Checklist

- [x] Configure Next.js for SSR
- [x] Remove static export settings
- [x] Create Vercel configuration
- [x] Convert pages to SSR
- [x] Create API routes for SEO files
- [x] Update build scripts
- [ ] Update domain in robots.txt and sitemap
- [ ] Configure custom domain (if applicable)
- [ ] Set up environment variables
- [ ] Test deployment
- [ ] Update README with new deployment info
