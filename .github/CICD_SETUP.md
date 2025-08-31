# CI/CD Pipeline Setup Guide

This guide explains how to configure the CI/CD pipelines for your portfolio project with Vercel deployment and automated dependency management.

## 🔐 Required Secrets

### GitHub Secrets Configuration

You need to add the following secrets to your GitHub repository:

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following repository secrets:**

| Secret Name         | Description                 | How to Get                                                            |
| ------------------- | --------------------------- | --------------------------------------------------------------------- |
| `VERCEL_TOKEN`      | Vercel authentication token | [Create token in Vercel Dashboard](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID`     | Your Vercel organization ID | Found in Vercel project settings                                      |
| `VERCEL_PROJECT_ID` | Your specific project ID    | Found in Vercel project settings                                      |

## 🤖 Dependabot Configuration

Dependabot is configured to automatically create pull requests for dependency updates:

### Features:

- **NPM Dependencies**: Weekly updates on Mondays at 6 AM
- **GitHub Actions**: Weekly updates on Mondays at 7 AM
- **Grouped Updates**: Related packages are grouped together to reduce PR noise
- **Semantic Versioning**: Respects semver for update grouping
- **Auto-labeling**: PRs are automatically labeled and assigned

### Configuration Groups:

- **Next.js & React**: Framework and related packages
- **TypeScript Tools**: TypeScript and type definitions
- **Linting Tools**: ESLint, Prettier, and related tools
- **Tailwind CSS**: Styling framework and plugins
- **Testing Tools**: Vitest and testing utilities
- **Dev Tools**: Build tools and development dependencies

### 🚀 Getting Vercel Configuration Values

#### 1. Get Vercel Token

```bash
# Option 1: Via Vercel CLI
npx vercel login
npx vercel --token  # This will show your token

# Option 2: Via Vercel Dashboard
# 1. Go to https://vercel.com/account/tokens
# 2. Create a new token
# 3. Copy the token value
```

#### 2. Get Organization and Project IDs

```bash
# Via Vercel CLI (run in your project directory)
npx vercel link
# This will create .vercel/project.json with your IDs

# Or check the file directly
cat .vercel/project.json
```

Example `.vercel/project.json`:

```json
{
  "projectId": "prj_abc123...",
  "orgId": "team_xyz789..."
}
```

## 📋 Setup Steps

### 1. Initial Vercel Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel --prod

# Deploy initially (optional - CI will handle future deploys)
vercel --prod
```

### 2. GitHub Repository Configuration

1. **Add the secrets to GitHub:**
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your organization ID (from .vercel/project.json)
   - `VERCEL_PROJECT_ID`: Your project ID (from .vercel/project.json)

2. **Enable GitHub Actions:**
   - Ensure Actions are enabled in your repository settings
   - The workflows will automatically trigger on push/PR

### 3. Branch Protection Setup

Configure branch protection rules in GitHub:

1. **Go to Settings → Branches**
2. **Add rule for `main` branch:**
   - Require status checks to pass
   - Require branches to be up to date
   - Include these required status checks:
     - `Quality Gates`
     - `Portfolio Quality Checks`
     - `Portfolio Integration Tests`
     - `Security & Vulnerability Scan`

## 🛠️ Workflow Overview

### Primary Workflows

1. **`vercel-deploy.yml`** - Main CI/CD pipeline
   - **Triggers:** Push to main/develop, PRs to main
   - **Features:**
     - Quality gates (linting, testing, type checking)
     - Preview deployments for PRs
     - Production deployments for main branch
     - Performance auditing with Lighthouse
     - Automated health checks

2. **`branch-protection.yml`** - Code quality enforcement
   - **Triggers:** All PRs
   - **Features:**
     - PR title validation
     - Branch naming convention checks
     - Portfolio-specific quality checks
     - Integration testing
     - Security scanning

3. **`dependency-updates.yml`** - Automated maintenance
   - **Triggers:** Weekly schedule, manual dispatch
   - **Features:**
     - Dependency update detection
     - Security vulnerability scanning
     - Bundle size analysis
     - Maintenance reporting

4. **`dependabot-validation.yml`** - Dependabot configuration validation
   - **Triggers:** Changes to dependabot.yml, manual dispatch
   - **Features:**
     - YAML syntax validation
     - Package ecosystem verification
     - Configuration completeness checks

### Dependabot Configuration

5. **`.github/dependabot.yml`** - Automated dependency updates
   - **Schedule:** Weekly updates on Mondays
   - **Features:**
     - NPM package updates with intelligent grouping
     - GitHub Actions updates
     - Semantic versioning respect
     - Auto-labeling and assignment
     - Customizable ignore patterns

1. **`vercel-deploy.yml`** - Main CI/CD pipeline
   - **Triggers:** Push to main/develop, PRs to main
   - **Features:**
     - Quality gates (linting, testing, type checking)
     - Preview deployments for PRs
     - Production deployments for main branch
     - Performance auditing with Lighthouse
     - Automated health checks

1. **`branch-protection.yml`** - Code quality enforcement
   - **Triggers:** All PRs
   - **Features:**
     - PR title validation
     - Branch naming convention checks
     - Portfolio-specific quality checks
     - Integration testing
     - Security scanning

1. **`dependency-updates.yml`** - Automated maintenance
   - **Triggers:** Weekly schedule, manual dispatch
   - **Features:**
     - Dependency update detection
     - Security vulnerability scanning
     - Bundle size analysis
     - Maintenance reporting

## 🎯 Deployment Flow

### For Pull Requests:

1. **Quality Gates Run** → Code quality, tests, build verification
2. **Preview Deployment** → Temporary Vercel preview URL
3. **Automated Testing** → Integration tests on preview
4. **Manual Review** → Team reviews changes and preview
5. **Merge** → Triggers production deployment

### For Main Branch:

1. **Quality Gates** → Full quality verification
2. **Production Deployment** → Deploy to your custom domain
3. **Post-Deployment Validation** → Health checks and endpoint testing
4. **Performance Audit** → Lighthouse scoring and monitoring

## 📊 Monitoring & Maintenance

### Automatic Monitoring:

- **Lighthouse CI:** Performance, accessibility, SEO scoring
- **Security Audits:** Vulnerability scanning
- **Bundle Analysis:** Size monitoring and optimization alerts

### Weekly Maintenance:

- **Dependency Updates:** Automated outdated package detection
- **Security Patches:** Vulnerability remediation
- **Performance Reports:** Bundle size and optimization opportunities

## 🐛 Troubleshooting

### Common Issues:

1. **Vercel Token Issues:**

   ```bash
   # Regenerate token if expired
   # Go to https://vercel.com/account/tokens
   # Create new token and update GitHub secret
   ```

2. **Build Failures:**

   ```bash
   # Test locally first
   npm run build
   npm run start

   # Check specific error in GitHub Actions logs
   ```

3. **PDF Generation Failures:**
   ```bash
   # Ensure Puppeteer is properly configured
   # Memory allocation in vercel.json should be sufficient (1024MB)
   ```

### Debug Commands:

```bash
# Test Vercel deployment locally
vercel dev

# Check build output
vercel build

# Verify environment variables
vercel env ls
```

## 🔧 Customization Options

### Environment-Specific Configuration:

1. **Development/Staging:**
   - Add `VERCEL_ENV=preview` for preview deployments
   - Different Lighthouse thresholds for preview environments

2. **Production:**
   - Stricter quality gates
   - Full performance auditing
   - Enhanced security scanning

### Adding Custom Checks:

```yaml
# Add to .github/workflows/vercel-deploy.yml
- name: Custom Portfolio Check
  run: |
    # Your custom validation logic
    echo "Running custom portfolio checks..."
```

## 📚 Additional Resources

- [Vercel GitHub Integration](https://vercel.com/docs/deployments/git/vercel-for-github)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

_This CI/CD setup provides enterprise-grade deployment automation with comprehensive quality gates and monitoring for your portfolio project._
