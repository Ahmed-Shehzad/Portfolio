# CI/CD Setup Guide

This document outlines the complete CI/CD pipeline configuration for the portfolio application.

## Overview

The CI/CD pipeline provides:

- ✅ **Quality Gates**: TypeScript validation, linting, testing
- 🚀 **Automated Deployments**: Preview on PRs, production on main
- 🔒 **Security**: Audit checks, dependency scanning
- 📊 **Monitoring**: Performance tracking, error reporting

## Required Secrets

Configure these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

### Vercel Integration

```bash
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Getting Vercel Secrets

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new token: `Settings > Tokens > Create Token`
3. Get Organization ID: `Settings > General > Organization ID`
4. Get Project ID: `Project Settings > General > Project ID`

## Workflow Files

### 1. Main Deployment (`vercel-deploy.yml`)

- **Triggers**: Push to main/develop, PRs to main
- **Quality Gates**: Lint, type-check, test, build
- **Deployments**: Preview for PRs, production for main
- **Security**: Audit checks, dependency scanning

### 2. Setup Validation (`validate-setup.yml`)

- **Triggers**: Manual dispatch, daily schedule
- **Purpose**: Validates CI/CD configuration
- **Checks**: Workflow files, configs, documentation

### 3. Branch Protection (`branch-protection.yml`)

- **Purpose**: Enforces quality standards
- **Requirements**: All checks must pass before merge

### 4. Dependency Updates (`dependency-updates.yml`)

- **Purpose**: Automated security updates
- **Schedule**: Weekly dependency checks

## Quality Gate System

### Two-Phase TypeScript Validation

#### Phase 1: User Code (Blocking)

- **Config**: `tsconfig.user-code.json`
- **Purpose**: Validates your application code only
- **Rules**: Strict TypeScript with enhanced checks
- **Behavior**: Blocks deployment if errors found

#### Phase 2: Full Project (Informational)

- **Config**: `tsconfig.ci.json`
- **Purpose**: Analyzes entire project including dependencies
- **Rules**: Full project scan
- **Behavior**: Reports issues but doesn't block deployment

### Script Location

```bash
./scripts/type-check-quality-gate.sh
```

### NPM Scripts

```json
{
  "type-check": "Standard TypeScript check",
  "type-check:ci": "CI-optimized with diagnostics",
  "type-check:strict": "Enhanced strict checking",
  "type-check:quality-gate": "Two-phase quality gate"
}
```

## Configuration Files

### Core Configurations

- `vercel.json`: Deployment and runtime configuration
- `next.config.ts`: Next.js build configuration
- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.user-code.json`: User code validation
- `tsconfig.ci.json`: Full project analysis

### Security & Quality

- `.audit-ci.json`: Security vulnerability scanning
- `eslint.config.js`: Code quality rules
- `prettier.config.js`: Code formatting

## Deployment Flow

### Pull Request Flow

1. **Quality Gates Run**: TypeScript, linting, testing
2. **Security Checks**: Audit, dependency scan
3. **Preview Deployment**: Vercel preview URL
4. **Status Checks**: All must pass for merge

### Main Branch Flow

1. **Quality Gates**: Same as PR checks
2. **Production Build**: Optimized build process
3. **Production Deployment**: Live site update
4. **Performance Monitoring**: Lighthouse, metrics

## Branch Protection Rules

Configure in GitHub: `Settings > Branches > Add rule`

### Required Settings

- Branch name pattern: `main`
- Require a pull request before merging: ✅
- Require status checks to pass before merging: ✅
- Required status checks:
  - `Quality Gates`
  - `security-audit`
  - `dependency-check`
- Require branches to be up to date before merging: ✅
- Include administrators: ✅

## Monitoring & Alerts

### GitHub Actions

- Workflow notifications on failures
- Artifact uploads for debugging
- Performance metrics collection

### Vercel Integration

- Deployment status updates
- Performance monitoring
- Error tracking and alerts

## Troubleshooting

### Common Issues

#### Quality Gate Failures

```bash
# Check specific errors
npm run type-check:quality-gate

# View detailed logs
cat reports/typescript-report.txt
```

#### Deployment Failures

1. Check GitHub Actions logs
2. Verify Vercel secrets are set
3. Ensure all quality gates pass

#### Security Audit Failures

```bash
# Run local audit
npm audit

# Fix automatically
npm audit fix
```

## Local Testing

### Test Quality Gates

```bash
# Run full quality check
npm run check

# Test deployment build
npm run build
```

### Test Workflows Locally

```bash
# Install act (GitHub Actions runner)
curl -q https://raw.githubusercontent.com/nektos/act/master/install.sh | bash

# Dry run workflows
./bin/act --dry-run
```

## Maintenance

### Regular Tasks

- Weekly dependency updates (automated)
- Monthly security audit review
- Quarterly workflow optimization

### Updates Required

- Update action versions in workflows
- Review and update security configurations
- Monitor performance metrics trends

---

## Quick Setup Checklist

- [ ] Configure GitHub secrets (Vercel tokens)
- [ ] Set up branch protection rules
- [ ] Test quality gate locally
- [ ] Create first PR to test preview deployment
- [ ] Merge to main for production deployment
- [ ] Monitor deployment dashboard

**Status**: ✅ CI/CD Pipeline Ready for Production
