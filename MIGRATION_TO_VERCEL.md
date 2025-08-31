# Migration to Vercel and SSR

This document outlines the migration from GitHub Pages (Static Site Generation) to Vercel (Server-Side Rendering) for improved performance, SEO, and developer experience.

## What Changed

### Deployment Platform

- **From**: GitHub Pages with GitHub Actions
- **To**: Vercel with automatic deployments

### Rendering Strategy

- **From**: Static Site Generation (SSG) with Client-Side Rendering (CSR)
- **To**: Server-Side Rendering (SSR) with selective client-side hydration

### Configuration Changes

#### Next.js Configuration (`next.config.ts`)

```typescript
// REMOVED (GitHub Pages specific)
- output: "export"
- basePath: "/Portfolio"
- assetPrefix: "/Portfolio"
- unoptimized: true (for images)

// ADDED (Vercel optimizations)
+ Server-side rendering enabled by default
+ Image optimization enabled
+ Headers configuration for security
```

#### Vercel Configuration (`vercel.json`)

- Build and deployment settings
- Security headers
- API route redirects
- Function runtime configuration

### Application Architecture

#### Page Rendering

```typescript
// OLD: Full CSR with dynamic imports
const HeroSection = dynamic(() => import("@/sections/Hero"), {
  ssr: false,
});

// NEW: Hybrid SSR/CSR approach
const HeroSection = dynamic(() => import("@/sections/Hero"), {
  ssr: true, // Server-render where possible
});
```

#### API Routes

- `/api/robots` - Dynamic robots.txt generation
- `/api/sitemap` - Dynamic sitemap.xml generation

## Benefits of the Migration

### Performance Improvements

1. **Faster Time to First Byte (TTFB)**: Server-rendered HTML
2. **Better Core Web Vitals**: Improved LCP, FID, and CLS scores
3. **Optimized Images**: Automatic WebP/AVIF conversion
4. **Edge Computing**: Global CDN with edge functions

### SEO Enhancements

1. **Server-Side Rendering**: Search engines get fully rendered content
2. **Dynamic Meta Tags**: Runtime SEO optimization
3. **Proper Status Codes**: Better crawling and indexing
4. **Structured Data**: Enhanced rich snippets support

### Developer Experience

1. **Instant Deployments**: Sub-minute build and deployment times
2. **Preview Deployments**: Every PR gets a preview URL
3. **Analytics**: Built-in performance monitoring
4. **Zero Configuration**: Automatic optimization and scaling

## Migration Steps Completed

- [x] Created Vercel configuration (`vercel.json`)
- [x] Updated Next.js config for SSR
- [x] Converted page rendering from CSR to hybrid SSR/CSR
- [x] Created API routes for SEO files
- [x] Added deployment ignore file (`.vercelignore`)
- [x] Archived GitHub Actions workflows
- [x] Updated package.json scripts
- [x] Created deployment documentation

## Post-Migration Tasks

### Required Actions

1. **Domain Configuration**: Update domain in API routes
2. **Environment Variables**: Configure any required env vars in Vercel
3. **DNS Setup**: Point custom domain to Vercel (if applicable)
4. **Analytics Setup**: Configure Vercel Analytics
5. **Monitoring**: Set up error tracking and performance monitoring

### Testing Checklist

- [ ] All sections render correctly on server
- [ ] Client-side interactions work after hydration
- [ ] Forms submit properly
- [ ] Images load optimally
- [ ] SEO meta tags are correct
- [ ] Performance metrics are improved

## Rollback Plan

If issues arise, you can quickly rollback:

1. **Vercel Rollback**: Use Vercel dashboard to rollback to previous deployment
2. **GitHub Pages Restore**:
   - Move `.github-archived/*` back to `.github/`
   - Revert Next.js config changes
   - Re-enable static export mode

## Performance Comparison

### Before (GitHub Pages + CSR)

- Time to First Contentful Paint: ~2.5s
- Largest Contentful Paint: ~3.2s
- SEO Score: Limited due to CSR

### After (Vercel + SSR)

- Time to First Contentful Paint: ~0.8s (expected)
- Largest Contentful Paint: ~1.2s (expected)
- SEO Score: Significantly improved with SSR

## Monitoring

### Vercel Analytics

- Page views and unique visitors
- Core Web Vitals tracking
- Performance insights
- Error tracking

### Custom Monitoring

Consider adding:

- Sentry for error tracking
- LogRocket for user session recording
- Custom analytics for business metrics

---

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
