# Deployment Guide - Vercel Prebuilt Approach

This guide explains the updated CI/CD pipeline using Vercel's `--prebuilt` approach for better separation of build and deploy phases.

## 🏗️ Build & Deploy Architecture

Our deployment process now separates the build and deploy phases for better control and reliability:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Quality Gates │    │  Build Phase    │    │  Deploy Phase   │
│                 │    │                 │    │                 │
│ • Lint & Format │───▶│ • vercel build  │───▶│ • vercel deploy │
│ • Type Check    │    │ • Generate      │    │   --prebuilt    │
│ • Tests         │    │   .vercel/      │    │ • Health Checks │
│ • Build Verify  │    │   output/       │    │ • Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Deployment Commands

### Local Development

```bash
# Preview deployment
npm run deploy:preview

# Production deployment
npm run deploy:production

# Using the deployment script
./scripts/deploy.sh preview     # For preview
./scripts/deploy.sh production  # For production
```

### Manual Deployment

```bash
# 1. Build for preview
vercel build
vercel deploy --prebuilt

# 2. Build for production
vercel build --prod
vercel deploy --prebuilt --prod
```

## 🔧 Environment Variables Required

Set these environment variables for local deployment:

```bash
export VERCEL_TOKEN="your_vercel_token"
export VERCEL_ORG_ID="your_org_id"
export VERCEL_PROJECT_ID="your_project_id"
```

## 🤖 CI/CD Pipeline

### Workflow Jobs

1. **Quality Gates** - Linting, formatting, type checking, tests
2. **Build** - Generates Vercel build artifacts using `vercel build`
3. **Preview** - Deploys to preview using `vercel deploy --prebuilt` (PR only)
4. **Production** - Deploys to production using `vercel deploy --prebuilt --prod` (main branch only)
5. **Audit** - Performance and security checks
6. **Cleanup** - Removes old artifacts

### Trigger Conditions

- **Preview**: Triggered on pull requests to `main`
- **Production**: Triggered on pushes to `main` branch
- **Manual**: Can be triggered via `workflow_dispatch`

## 📦 Build Artifacts

The build process generates:

- `.vercel/output/` - Vercel-specific build output
- `.next/` - Next.js build output
- Build artifacts are uploaded and shared between jobs

## 🔍 Benefits of Prebuilt Approach

1. **Separation of Concerns**: Build and deploy are separate steps
2. **Reliability**: Deploy uses pre-validated build artifacts
3. **Speed**: No rebuild during deployment
4. **Debugging**: Easier to isolate build vs deploy issues
5. **Consistency**: Same build can be deployed to multiple environments

## 🛠️ Troubleshooting

### Common Issues

1. **Missing .vercel/output**: Run `vercel build` first
2. **Environment mismatch**: Use `vercel build --prod` for production
3. **Authentication errors**: Check VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

### Debug Commands

```bash
# Check build output
ls -la .vercel/output/

# Verify environment variables
echo $VERCEL_TOKEN
echo $VERCEL_ORG_ID
echo $VERCEL_PROJECT_ID

# Test deployment locally
vercel build --debug
vercel deploy --prebuilt --debug
```

## 📋 Migration from Old Approach

The old workflow used the `amondnet/vercel-action` GitHub Action. The new approach:

1. Uses official Vercel CLI directly
2. Separates build and deploy phases
3. Provides better error handling and debugging
4. Supports artifact caching between jobs

## 🎯 Next Steps

- Monitor deployment performance metrics
- Set up advanced monitoring and alerting
- Configure custom domains if needed
- Optimize build times with better caching strategies
