# Scripts Directory

This directory contains utility scripts for build automation, deployment, testing, and quality assurance for the Portfolio project.

## 📁 Script Overview

| Script                         | Purpose                      | Usage                       |
| ------------------------------ | ---------------------------- | --------------------------- |
| `convert-junit-to-generic.mjs` | Test report conversion       | CI/CD pipelines             |
| `deploy.sh`                    | Vercel deployment automation | Manual/automated deployment |
| `lint-docs.sh`                 | Documentation quality checks | Documentation validation    |
| `type-check-quality-gate.sh`   | TypeScript quality gate      | CI/CD quality control       |
| `validate-docs.sh`             | AsciiDoc validation          | Documentation compilation   |

## 🔧 Scripts Documentation

### convert-junit-to-generic.mjs

**Purpose**: Converts Vitest JUnit XML test reports into SonarQube Generic Test Execution format for code coverage analysis.

**Features**:

- Parses JUnit XML format from Vitest
- Converts to SonarQube Generic Test format
- Handles test suite and test case transformations
- Sanitizes output for safe XML generation
- Entity decoding for special characters

**Usage**:

```bash
# Convert test reports for SonarQube
node scripts/convert-junit-to-generic.mjs input-junit.xml output-generic.xml

# Example in CI/CD pipeline
npm test -- --reporter=junit --outputFile=junit.xml
node scripts/convert-junit-to-generic.mjs junit.xml sonarqube-test-report.xml
```

**Input**: JUnit XML format from Vitest
**Output**: SonarQube Generic Test Execution XML format

---

### deploy.sh

**Purpose**: Automated deployment script for Vercel with environment-specific configurations and validation.

**Features**:

- Environment-specific deployment (preview/production)
- Vercel CLI installation check
- Environment variable validation
- Build process integration
- Deployment status monitoring
- Error handling and rollback support

**Usage**:

```bash
# Deploy to preview environment
./scripts/deploy.sh preview

# Deploy to production
./scripts/deploy.sh production

# Default deployment (preview)
./scripts/deploy.sh
```

**Required Environment Variables**:

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

**Prerequisites**:

- Vercel CLI installed or script will install it
- Valid Vercel credentials
- Project configured in Vercel dashboard

---

### lint-docs.sh

**Purpose**: Advanced documentation linting for AsciiDoc files with quality checks beyond syntax validation.

**Features**:

- Document title validation
- Content length checks
- Structure validation
- Link verification
- Code block validation
- Comprehensive quality reporting

**Usage**:

```bash
# Run documentation linting
./scripts/lint-docs.sh

# Run as part of CI/CD
npm run lint:docs
```

**Checks Performed**:

- ✅ Document title presence (starts with `= `)
- ✅ Minimum content length validation
- ✅ Structure and formatting consistency
- ✅ Code block syntax validation
- ✅ Internal link verification

**Output**: Detailed report with warnings and errors

---

### type-check-quality-gate.sh

**Purpose**: Enhanced two-phase TypeScript validation system for quality gate enforcement in CI/CD pipelines.

**Features**:

- **Phase 1**: Strict user code validation (deployment blocking)
- **Phase 2**: Full project analysis (informational)
- Detailed error reporting and categorization
- Quality metrics calculation
- Color-coded output for better readability

**Usage**:

```bash
# Run quality gate validation
./scripts/type-check-quality-gate.sh

# Run as part of CI/CD
npm run check:quality-gate
```

**Phase 1 - User Code Validation**:

- Uses `tsconfig.user-code.json` for strict validation
- Blocks deployment on errors
- Focuses on user-written code only
- Generates `reports/user-code-validation.log`

**Phase 2 - Full Project Analysis**:

- Uses main `tsconfig.json` for comprehensive check
- Includes dependencies and generated files
- Informational only (non-blocking)
- Generates `reports/full-project-analysis.log`

**Exit Codes**:

- `0`: All checks passed
- `1`: Phase 1 failed (user code issues)
- `2`: Script execution error

---

### validate-docs.sh

**Purpose**: AsciiDoc documentation validation and compilation verification.

**Features**:

- AsciiDoctor installation verification
- Syntax validation for all `.adoc` files
- Compilation testing
- Error reporting and location tracking
- Support for AsciiDoc extensions

**Usage**:

```bash
# Validate all AsciiDoc files
./scripts/validate-docs.sh

# Run as part of documentation build
npm run docs:validate
```

**Prerequisites**:

```bash
# Install AsciiDoctor (Ruby gem)
gem install asciidoctor
gem install asciidoctor-html5s
gem install asciidoctor-diagram
```

**Features**:

- ✅ File discovery and enumeration
- ✅ Syntax validation
- ✅ Compilation testing
- ✅ Extension support validation
- ✅ Detailed error reporting

## 🚀 Integration with CI/CD

### GitHub Actions Integration

```yaml
# Example workflow integration
jobs:
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - name: TypeScript Quality Gate
        run: ./scripts/type-check-quality-gate.sh

      - name: Documentation Validation
        run: ./scripts/validate-docs.sh

      - name: Documentation Linting
        run: ./scripts/lint-docs.sh

  test-and-coverage:
    runs-on: ubuntu-latest
    steps:
      - name: Run Tests
        run: npm test -- --reporter=junit --outputFile=junit.xml

      - name: Convert Test Reports
        run: node scripts/convert-junit-to-generic.mjs junit.xml sonarqube.xml

  deploy:
    needs: [quality-gate, test-and-coverage]
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: ./scripts/deploy.sh production
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Package.json Scripts

```json
{
  "scripts": {
    "deploy:preview": "./scripts/deploy.sh preview",
    "deploy:production": "./scripts/deploy.sh production",
    "check:quality-gate": "./scripts/type-check-quality-gate.sh",
    "docs:validate": "./scripts/validate-docs.sh",
    "docs:lint": "./scripts/lint-docs.sh",
    "test:convert": "node scripts/convert-junit-to-generic.mjs"
  }
}
```

## 🛠️ Development Workflow

### Local Development

```bash
# Run quality checks before committing
npm run check:quality-gate

# Validate documentation changes
npm run docs:validate
npm run docs:lint

# Test deployment locally
npm run deploy:preview
```

### Pre-commit Hooks

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run quality gate
./scripts/type-check-quality-gate.sh

# Validate documentation
./scripts/validate-docs.sh
```

## 📊 Reports and Outputs

### Generated Reports

All scripts generate reports in the `reports/` directory:

```
reports/
├── user-code-validation.log      # TypeScript user code validation
├── full-project-analysis.log     # Complete TypeScript analysis
├── documentation-lint.log        # Documentation quality report
├── asciidoc-validation.log       # AsciiDoc syntax validation
└── sonarqube-test-report.xml     # SonarQube test execution format
```

### Log Formats

**TypeScript Quality Gate**:

```
🚀 Enhanced Quality Gate: TypeScript Validation System
==================================================

Phase 1: User Code Validation
=================================
✅ Phase 1 PASSED: User code validation successful
Found 0 TypeScript errors in user code

Phase 2: Full Project Analysis
================================
✅ Phase 2 PASSED: Full project analysis completed
Found 0 TypeScript errors in entire project
```

**Documentation Validation**:

```
🔍 AsciiDoc Documentation Validation
====================================
✅ AsciiDoctor found: Asciidoctor 2.0.18

📄 Discovering AsciiDoc files...
  ✅ src/docs/architecture/overview.adoc
  ✅ src/docs/deployment/guide.adoc

🎉 All documentation files validated successfully!
```

## 🔧 Configuration

### Script Permissions

Ensure all shell scripts have execute permissions:

```bash
chmod +x scripts/*.sh
```

### Environment Setup

Create a `.env.local` file with required variables:

```env
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_organization_id
VERCEL_PROJECT_ID=your_project_id

# Optional: Custom report directory
REPORTS_DIR=./reports
```

### TypeScript Configurations

Scripts rely on specific TypeScript configurations:

- `tsconfig.json`: Main project configuration
- `tsconfig.user-code.json`: Strict user code validation
- `tsconfig.ci.json`: CI-specific configuration

## 🚨 Troubleshooting

### Common Issues

#### Permission Denied

```bash
# Fix script permissions
chmod +x scripts/*.sh
```

#### Missing Dependencies

```bash
# Install required tools
npm install -g vercel@latest
gem install asciidoctor
```

#### Environment Variables

```bash
# Check environment variables
echo $VERCEL_TOKEN
echo $VERCEL_ORG_ID
echo $VERCEL_PROJECT_ID
```

### Debug Mode

Enable debug output for scripts:

```bash
# Run with debug output
DEBUG=1 ./scripts/deploy.sh

# Verbose TypeScript checking
VERBOSE=1 ./scripts/type-check-quality-gate.sh
```

## 📚 Best Practices

### Script Development

- Always use `set -e` for error handling
- Provide clear usage instructions
- Include environment variable validation
- Generate comprehensive reports
- Use color-coded output for readability

### Integration Guidelines

- Scripts should be idempotent
- Include proper exit codes
- Generate machine-readable reports
- Support both local and CI environments
- Include rollback mechanisms where applicable

### Maintenance

- Regularly update dependencies
- Test scripts in isolated environments
- Keep documentation synchronized
- Monitor script performance
- Review and optimize error handling

---

_Last updated: September 2025_
