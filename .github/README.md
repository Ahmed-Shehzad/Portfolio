# GitHub Actions Workflows

This directory contains comprehensive CI/CD workflows for the Muhammad Ahmed Shehzad Portfolio project.

## 🚀 Workflows Overview

### 1. **CI/CD Pipeline** (`ci.yml`)

**Triggers**: Push to `main`, `develop`, `feature/*` branches; Pull requests to `main`, `develop`

**Jobs**:

- **Quality**: Code linting, formatting, TypeScript checks
- **Test**: Unit tests with coverage reporting
- **Build**: Production build with static export
- **Security**: Dependency security audit
- **SonarQube**: Code quality analysis (on PR/main)
- **Deploy**: GitHub Pages deployment (main branch only)
- **Lighthouse**: Performance audit post-deployment
- **Notify**: Pipeline status summary

**Features**:

- ✅ Concurrent job execution for speed
- ✅ Comprehensive caching strategy
- ✅ Security vulnerability scanning
- ✅ Automated quality gates
- ✅ Performance monitoring
- ✅ Detailed pipeline summaries

### 2. **Preview Deployment** (`preview.yml`)

**Triggers**: Pull requests to `main`, `develop` (non-draft)

**Jobs**:

- **Build Preview**: Creates PR-specific build artifacts
- **Validate Build**: Ensures build integrity and structure

**Features**:

- ✅ PR-specific build artifacts
- ✅ Build validation and size checks
- ✅ Automated PR comments with build status
- ✅ Download links for build artifacts

### 3. **Release Management** (`release.yml`)

**Triggers**: Version tags (`v*.*.*`); Manual dispatch

**Jobs**:

- **Validate**: Version format validation
- **Build Release**: Production build with archives
- **Create Release**: GitHub release with changelog
- **Deploy Production**: GitHub Pages deployment (stable releases only)
- **Notify**: Release summary

**Features**:

- ✅ Semantic version validation
- ✅ Automated changelog generation
- ✅ Release artifacts with checksums
- ✅ Prerelease support
- ✅ Production deployment for stable releases

### 4. **Dependency Management** (`deps.yml`)

**Triggers**: Weekly schedule (Mondays 9 AM UTC); Manual dispatch

**Jobs**:

- **Update Dependencies**: Automated patch updates
- **Security Audit**: Vulnerability scanning

**Features**:

- ✅ Automated patch version updates
- ✅ PR creation for safe updates
- ✅ Security vulnerability detection
- ✅ Issue creation for major updates
- ✅ Comprehensive testing before merge

## 🔧 Setup Requirements

### Required Secrets

Add these secrets in your GitHub repository settings:

```bash
# Optional: For enhanced features
CODECOV_TOKEN=your_codecov_token
SONAR_TOKEN=your_sonar_token
SONAR_HOST_URL=https://sonarcloud.io
```

### Repository Settings

1. **GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Custom domain (optional): your-domain.com

2. **Branch Protection** (Recommended):

   ```
   Branch: main
   - Require status checks: ✅
   - Require CI/CD Pipeline: ✅
   - Dismiss stale reviews: ✅
   - Require up-to-date branches: ✅
   ```

3. **Environments** (Optional):
   ```
   Environment: github-pages
   - Deployment protection rules
   - Environment secrets if needed
   ```

## 📋 Workflow Configuration

### Quality Gates

The workflows enforce strict quality standards:

- TypeScript strict mode compliance
- ESLint with Next.js rules
- Prettier formatting
- 85%+ test coverage target
- Security vulnerability scanning
- Performance thresholds (Lighthouse)

### Caching Strategy

Optimized caching for faster builds:

- Node.js dependencies (`npm ci` cache)
- TypeScript build info
- Next.js build cache
- SonarQube analysis cache

### Performance Optimizations

- Concurrent job execution
- Conditional job execution
- Smart caching strategies
- Timeout limits for all jobs
- Artifact retention policies

## 🚀 Usage Examples

### Creating a Release

```bash
# Create and push a version tag
git tag v1.2.3
git push origin v1.2.3

# Or use GitHub CLI
gh release create v1.2.3 --generate-notes
```

### Manual Workflow Triggers

```bash
# Trigger dependency updates
gh workflow run deps.yml

# Trigger release workflow
gh workflow run release.yml -f version=v1.2.3
```

### Monitoring Workflows

```bash
# List workflow runs
gh run list

# View specific run
gh run view <run-id>

# Download artifacts
gh run download <run-id>
```

## 📊 Monitoring & Alerts

### Status Badges

Add these badges to your README:

```markdown
[![CI/CD Pipeline](https://github.com/Ahmed-Shehzad/Portfolio/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/Ahmed-Shehzad/Portfolio/actions)
[![Security Audit](https://github.com/Ahmed-Shehzad/Portfolio/workflows/Dependency%20Updates/badge.svg)](https://github.com/Ahmed-Shehzad/Portfolio/actions)
[![Release](https://github.com/Ahmed-Shehzad/Portfolio/workflows/Release/badge.svg)](https://github.com/Ahmed-Shehzad/Portfolio/releases)
```

### Notifications

The workflows automatically:

- Comment on PRs with build status
- Create issues for security vulnerabilities
- Create issues for major dependency updates
- Generate detailed pipeline summaries

## 🔍 Troubleshooting

### Common Issues

**Build Failures**:

- Check TypeScript errors in logs
- Verify all dependencies are installed
- Ensure Web Worker builds successfully

**Deployment Issues**:

- Verify GitHub Pages is enabled
- Check repository permissions
- Ensure `out/` directory exists after build

**Security Alerts**:

- Run `npm audit fix` locally
- Update vulnerable dependencies
- Check for breaking changes

**SonarQube Issues**:

- Verify SONAR_TOKEN is valid
- Check project configuration
- Review coverage requirements

### Debug Commands

```bash
# Local testing
npm run check          # Quality checks
npm run test:ci       # Tests with coverage
npm run build         # Production build

# Workflow debugging
gh workflow view ci.yml
gh run list --workflow ci.yml
gh run view <run-id> --log
```

## 📈 Performance Metrics

### Build Times (Typical)

- Quality checks: ~2-3 minutes
- Tests: ~3-5 minutes
- Build: ~2-3 minutes
- Total pipeline: ~8-12 minutes

### Optimization Tips

- Use `npm ci` instead of `npm install`
- Enable workflow caching
- Run jobs concurrently when possible
- Set appropriate timeout limits

## 🔐 Security Best Practices

### Implemented

- ✅ Dependency vulnerability scanning
- ✅ Security audit automation
- ✅ Minimal required permissions
- ✅ Secret management
- ✅ Branch protection rules

### Recommendations

- Regular dependency updates
- Monitor security advisories
- Use dependabot for automation
- Review third-party actions
- Implement SAST/DAST scanning

---

## 🤝 Contributing

When adding new workflows:

1. Follow existing naming conventions
2. Add comprehensive error handling
3. Include timeout limits
4. Use semantic versioning for actions
5. Document any new requirements
6. Test thoroughly before merging

For questions or improvements, please open an issue or submit a PR.
