# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD, security, and automation.

## 📁 Workflow Files

### 🔄 `ci.yml` - Continuous Integration

**Triggers**: Push to `main`/`develop`, Pull Requests to `main`

**Jobs**:

- **Lint & Format Check**: Ensures code style consistency
- **TypeScript Type Check**: Validates TypeScript types (standard + strict)
- **Tests**: Runs unit tests with coverage reporting
- **Build**: Builds the application and uploads artifacts
- **Validate**: Full validation pipeline

### 🚀 `deploy.yml` - Deployment Pipeline

**Triggers**: Push to `main`, CI workflow completion

**Jobs**:

- **Deploy Preview**: Deploys preview builds for PRs
- **Deploy Production**: Deploys to production on main branch
- **Lighthouse**: Performance auditing post-deployment

### 🔒 `security.yml` - Security & Quality

**Triggers**: Push, Pull Requests, Weekly schedule

**Jobs**:

- **Security Audit**: npm audit and dependency scanning
- **SonarQube**: Code quality analysis
- **CodeQL**: GitHub's semantic code analysis
- **Bundle Analysis**: Next.js bundle size analysis

### 📦 `dependencies.yml` - Dependency Management

**Triggers**: Daily schedule, Manual dispatch

**Jobs**:

- **Update Dependencies**: Automated dependency updates
- **Security Updates**: Automated security vulnerability fixes

## 🔧 Required Secrets

Add these secrets to your GitHub repository settings:

### Vercel Deployment

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Code Quality (Optional)

```bash
SONAR_TOKEN=your_sonarqube_token
CODECOV_TOKEN=your_codecov_token
```

## 🚀 Getting Started

1. **Set up Vercel secrets**:

   ```bash
   # Get your Vercel token
   npx vercel login
   npx vercel link

   # Find your org and project IDs in .vercel/project.json
   ```

2. **Add secrets to GitHub**:
   - Go to repository Settings > Secrets and variables > Actions
   - Add the required secrets listed above

3. **Push to trigger workflows**:
   ```bash
   git add .github/
   git commit -m "Add GitHub Actions workflows"
   git push origin main
   ```

## 🔄 Workflow Behavior

### Pull Requests

- ✅ Full CI pipeline runs
- 🚀 Preview deployment created
- 📊 Bundle analysis performed
- 💬 Preview URL commented on PR

### Main Branch

- ✅ Full CI pipeline runs
- 🚀 Production deployment
- 🔍 Lighthouse performance audit
- 📈 Code quality analysis

### Scheduled

- 📦 Daily dependency updates
- 🔒 Weekly security scans

## 🛠️ Customization

### Environment URLs

Update the production URL in `deploy.yml`:

```yaml
environment:
  name: production
  url: https://your-domain.com
```

### Lighthouse URLs

Update the URLs to audit in `deploy.yml`:

```yaml
urls: |
  https://your-domain.com
  https://your-domain.com/en
  https://your-domain.com/de
```

### Branch Protection

Consider adding branch protection rules:

- Require PR reviews
- Require status checks (CI workflow)
- Require up-to-date branches
