# GitHub Workflows Local Testing

This guide explains how to test your GitHub Actions workflows locally using `act`.

## Prerequisites

- ✅ **Docker**: Ensure Docker Desktop is running
- ✅ **act**: Installed via `brew install act` (already installed)
- ✅ **Configuration**: `.actrc` file configured for M1 Mac compatibility

## Quick Start

### Using the Test Script

```bash
# List all available workflows
./test-workflows.sh list

# Test code quality checks (default)
./test-workflows.sh quality

# Test unit and integration tests
./test-workflows.sh test

# Test build process
./test-workflows.sh build

# Test security scans
./test-workflows.sh security

# Test with specific event
./test-workflows.sh quality pull_request

# Run all workflows for push event
./test-workflows.sh all push
```

### Manual Act Commands

```bash
# List all workflows and jobs
act -l

# Run specific job for push event
act push -j quality

# Run specific job for pull request event
act pull_request -j build

# Run entire workflow
act push

# Dry run (plan only)
act push --dryrun

# Debug with verbose output
act push -j quality --verbose
```

## Available Workflows

### CI/CD Pipeline (`ci.yml`)

- **Events**: `push`, `pull_request`
- **Jobs**:
  - `security` - Security scans
  - `quality` - Code quality & linting
  - `test` - Unit & integration tests
  - `build` - Build application
  - `sonarqube` - SonarQube analysis
  - `deploy` - Deploy to GitHub Pages
  - `lighthouse` - Performance audit
  - `notify` - Notifications

### Preview Deployment (`preview.yml`)

- **Events**: `pull_request`
- **Jobs**:
  - `build-preview` - Build PR preview
  - `validate-build` - Validate build output

### Release (`release.yml`)

- **Events**: `push`, `workflow_dispatch`
- **Jobs**:
  - `validate` - Validate release
  - `build-release` - Build release
  - `create-release` - Create GitHub release
  - `deploy-production` - Deploy to production
  - `notify` - Post-release notification

### Dependency Updates (`deps.yml`)

- **Events**: `schedule`, `workflow_dispatch`
- **Jobs**:
  - `update-dependencies` - Update dependencies
  - `security-audit` - Security audit

## Common Issues and Solutions

### 1. TypeScript Module Resolution Errors

**Issue**: Image imports fail with "Cannot find module" errors.

**Current Status**: Found 16 TypeScript errors related to missing image type declarations.

**Files Affected**:

- `src/components/features/ContactModal.tsx`
- `src/components/features/about/CoreValues.tsx`
- `src/components/features/about/ProfessionalGrowth.tsx`
- `src/components/ui/Card.tsx`
- `src/features/portfolio/constants.ts`
- `src/sections/Contact.tsx`
- `src/sections/Hero.tsx`
- `src/sections/Testimonials.tsx`

**Solution**: Add missing image files or update import paths to match existing images.

### 2. Test Suite Issues

**Issue**: No test files found, exiting with code 1.

**Current Status**: Tests are configured but no test files exist yet.

**Solution**: Add test files following the pattern `**/*.{test,spec}.?(c|m)[jt]s?(x)`.

### 3. Environment Variables

**Issue**: Some workflows require environment variables that aren't available locally.

**Solution**: Set environment variables in `.actrc` or pass them via command line:

```bash
act push -j security --env GITHUB_TOKEN=your_token
```

### 4. Docker Platform Issues (M1 Mac)

**Issue**: Architecture mismatch warnings.

**Solution**: Already configured in `.actrc` with `--container-architecture linux/amd64`.

## Testing Strategy

### Quick Quality Check

```bash
./test-workflows.sh quality
```

This runs ESLint, Prettier, and TypeScript checks - the fastest feedback loop.

### Full Integration Test

```bash
./test-workflows.sh test
```

Runs the complete test suite with coverage reporting.

### Build Verification

```bash
./test-workflows.sh build
```

Ensures the application builds successfully for production.

### Security Assessment

```bash
./test-workflows.sh security
```

Runs security scans and dependency audits.

## Configuration Files

- **`.actrc`**: Act configuration for platform compatibility
- **`test-workflows.sh`**: Convenient testing script
- **`.gitignore`**: Excludes act artifacts and configuration

## Artifacts

Local test artifacts are stored in `./act-artifacts/` and are ignored by git.

## Next Steps

1. **Fix Image Imports**: Resolve the 16 TypeScript errors for missing image modules
2. **Add Tests**: Create test files to make the test workflow meaningful
3. **Environment Setup**: Configure any missing environment variables for full workflow compatibility
4. **Custom Workflows**: Test specific workflows relevant to your development process

## Tips

- Start with `quality` job for quick feedback
- Use `list` to explore available workflows
- Check Docker is running before testing
- Review GitHub Actions logs for comparison with local results
- Local testing can't perfectly replicate GitHub's environment, but catches most issues
