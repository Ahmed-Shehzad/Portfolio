# CI/CD Setup Guide

This document provides a comprehensive guide for setting up and maintaining the CI/CD pipeline for the Portfolio project using GitHub Actions.

## 🎯 Overview

The CI/CD pipeline is designed to ensure code quality, run automated tests, and deploy the application with confidence. It includes multiple stages of validation, testing, and deployment automation.

## 🏗️ Pipeline Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Code Quality  │    │   Build & Test  │    │   Deployment    │
│                 │    │                 │    │                 │
│ • Linting       │───▶│ • TypeScript    │───▶│ • Preview       │
│ • Formatting    │    │ • Unit Tests    │    │ • Production    │
│ • Type Check    │    │ • Integration   │    │ • Notifications │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Workflow Structure

```
.github/
├── workflows/
│   ├── ci.yml              # Main CI pipeline
│   ├── cd.yml              # Deployment pipeline
│   ├── quality-gate.yml    # Code quality checks
│   └── dependency-check.yml # Security scanning
├── ISSUE_TEMPLATE/
├── PULL_REQUEST_TEMPLATE.md
└── CICD_SETUP.md          # This document
```

## 🔧 Workflow Configuration

### Main CI Pipeline (`ci.yml`)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run formatting check
        run: npm run format:check

      - name: TypeScript check
        run: npm run check

  test:
    runs-on: ubuntu-latest
    needs: quality-check
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    runs-on: ubuntu-latest
    needs: [quality-check, test]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-files
          path: .next/
```

### Deployment Pipeline (`cd.yml`)

```yaml
name: CD Pipeline

on:
  push:
    branches: [main]
  workflow_run:
    workflows: ["CI Pipeline"]
    types:
      - completed

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    if: github.event.workflow_run.conclusion == 'success'
    environment: preview
    steps:
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: deploy-preview
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

## 🔐 Environment Setup

### Required Secrets

Configure the following secrets in your GitHub repository:

#### Vercel Deployment

```bash
VERCEL_TOKEN          # Vercel API token
ORG_ID               # Vercel organization ID
PROJECT_ID           # Vercel project ID
```

#### Email Service (if using)

```bash
SMTP_USER            # Email service username
SMTP_PASS            # Email service password
SMTP_HOST            # SMTP server host
SMTP_PORT            # SMTP server port
```

#### Optional Services

```bash
CODECOV_TOKEN        # Code coverage reporting
SLACK_WEBHOOK        # Slack notifications
DISCORD_WEBHOOK      # Discord notifications
```

### Environment Variables

Configure environment-specific variables:

#### Development

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Preview

```env
NODE_ENV=preview
NEXT_PUBLIC_APP_URL=https://portfolio-preview.vercel.app
```

#### Production

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://portfolio.vercel.app
```

## ⚙️ Quality Gates

### Code Quality Checks

1. **ESLint**: Code linting with custom rules
2. **Prettier**: Code formatting enforcement
3. **TypeScript**: Type checking and compilation
4. **Husky**: Pre-commit hooks validation

### Test Coverage Requirements

```yaml
coverage:
  minimum: 80%
  threshold:
    statements: 80
    branches: 75
    functions: 80
    lines: 80
```

### Performance Budgets

```yaml
performance:
  budgets:
    - path: "/**"
      maximumFileSizeBudget: 170kb
      maximumWarning: 150kb
```

## 🚀 Deployment Strategy

### Branch Protection Rules

```yaml
main:
  required_status_checks:
    - "quality-check"
    - "test"
    - "build"
  enforce_admins: true
  required_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
```

### Deployment Environments

1. **Development**: Local development server
2. **Preview**: Automatic preview deployments for PRs
3. **Production**: Main branch automatic deployment

### Rollback Strategy

```yaml
rollback:
  triggers:
    - Failed health checks
    - Performance degradation
    - User-reported issues
  methods:
    - Automatic Vercel rollback
    - Manual intervention
    - Feature flag toggles
```

## 📊 Monitoring & Notifications

### Build Status Monitoring

```yaml
notifications:
  slack:
    channels:
      - "#deployments"
      - "#alerts"
  email:
    recipients:
      - "dev-team@company.com"
  discord:
    webhook_url: ${{ secrets.DISCORD_WEBHOOK }}
```

### Performance Monitoring

```yaml
monitoring:
  tools:
    - Vercel Analytics
    - Core Web Vitals
    - Lighthouse CI
  alerts:
    - Performance regression
    - Build failures
    - Deployment issues
```

## 🔧 Local Development Setup

### Prerequisites

```bash
# Required tools
node >= 18.0.0
npm >= 9.0.0
git >= 2.30.0
```

### Setup Commands

```bash
# Clone repository
git clone https://github.com/Ahmed-Shehzad/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Install git hooks
npm run prepare

# Start development server
npm run dev
```

### Testing Workflows Locally

```bash
# Install act (GitHub Actions local runner)
brew install act

# Run CI workflow locally
act -j quality-check

# Run with specific environment
act -j quality-check --env-file .env.local
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
npm --version
```

#### Deployment Issues

```bash
# Check Vercel configuration
npx vercel --debug

# Validate environment variables
npx vercel env ls
```

#### Test Failures

```bash
# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Debug Commands

```bash
# Check workflow syntax
act --list

# Validate GitHub Actions
gh workflow list

# Check deployment status
npx vercel ls
```

## 📚 Best Practices

### Commit Messages

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Branch Naming

```
feature/feature-name
bugfix/issue-description
hotfix/critical-fix
release/version-number
```

### Pull Request Guidelines

1. Clear description of changes
2. Reference related issues
3. Include screenshots for UI changes
4. Ensure all checks pass
5. Request appropriate reviewers

## 🔄 Maintenance

### Regular Tasks

#### Weekly

- [ ] Review dependency updates
- [ ] Check security alerts
- [ ] Monitor performance metrics
- [ ] Review failed builds

#### Monthly

- [ ] Update workflow dependencies
- [ ] Review and update secrets
- [ ] Performance audit
- [ ] Security scan review

#### Quarterly

- [ ] Workflow optimization review
- [ ] Tool and service evaluation
- [ ] Documentation updates
- [ ] Team training updates

### Dependency Management

```yaml
dependabot:
  version: 2
  updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
        interval: "weekly"
      open-pull-requests-limit: 10
```

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)

## 🆘 Support

For CI/CD issues and questions:

1. Check this documentation
2. Review GitHub Actions logs
3. Check Vercel deployment logs
4. Create an issue in the repository
5. Contact the development team

---

_Last updated: September 2025_
