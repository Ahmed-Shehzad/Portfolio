# Portfolio Deployment Automation

## 🚀 Quick Start

### One-Command Deployment

```bash
npm run deploy:auto
```

This runs the complete automated deployment pipeline.

### Update URLs Only

```bash
npm run urls:update:commit
```

This updates all deployment URLs and commits the changes.

## 📋 What Gets Automated

✅ **Pre-deployment checks** (lint, format, build)  
✅ **Vercel deployment** (production build)  
✅ **URL updates** across all files  
✅ **Git commits** with updated URLs  
✅ **Git push** to repository

## 📄 Files Updated Automatically

- `deployment-url.txt` - Current deployment URL
- `public/robots.txt` - Sitemap URL reference
- `public/sitemap.xml` - Canonical site URL
- Lastmod date in sitemap

## 🔧 Scripts Available

| Script          | Command                      | Description                  |
| --------------- | ---------------------------- | ---------------------------- |
| Full Deploy     | `npm run deploy:auto`        | Complete deployment pipeline |
| Update URLs     | `npm run urls:update`        | Update URLs only             |
| Update & Commit | `npm run urls:update:commit` | Update URLs and commit       |
| Manual Deploy   | `npm run deploy:production`  | Deploy without URL updates   |

## 🔄 GitHub Actions

Automatic deployment on every push to `main` branch:

- Runs all tests and checks
- Deploys to Vercel
- Updates URLs automatically
- Commits changes back

## ⚡ Quick Commands

```bash
# Full automated deployment
./scripts/auto-deploy.sh

# Just update URLs after manual deployment
./scripts/update-deployment-urls.sh --commit

# Check current deployment URL
cat deployment-url.txt
```

## 🛡️ Security Features

- Removes `unsafe-eval` from CSP automatically
- Maintains consistent URLs across all files
- Old URLs remain flagged (security feature)
- Always uses latest secure deployment
