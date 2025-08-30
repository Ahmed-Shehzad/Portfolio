# Documentation Validation

This project includes comprehensive AsciiDoc documentation validation as part of the CI/CD pipeline.

## Overview

The documentation validation system ensures:

- ✅ Syntax validation for all AsciiDoc files
- 📊 Documentation coverage analysis
- 🔍 Quality linting and consistency checks
- 🏗️ Structural validation of documentation hierarchy

## Documentation Structure

```
src/docs/
├── index.adoc                    # Main documentation index
├── components/                   # Component documentation
│   ├── ui/                      # UI components
│   └── features/                # Feature components
├── hooks/                       # Custom hooks documentation
├── sections/                    # Page sections documentation
└── wrappers/                    # Wrapper components documentation
```

## Validation Scripts

### Basic Syntax Validation

```bash
npm run docs:validate
# or
./scripts/validate-docs.sh
```

Validates:

- AsciiDoc syntax correctness
- Document structure requirements
- Required elements presence

### Advanced Quality Linting

```bash
npm run docs:lint
# or
./scripts/lint-docs.sh
```

Checks for:

- Missing document titles
- TODO/FIXME comments
- Broken internal links
- Documentation coverage gaps
- Consistent formatting

## GitHub Actions Integration

The documentation validation runs automatically in CI/CD:

```yaml
documentation:
  name: Documentation Validation
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Ruby & AsciiDoctor
      uses: ruby/setup-ruby@v1
    - name: Validate AsciiDoc syntax
    - name: Check documentation structure
    - name: Generate documentation summary
```

## AsciiDoc Configuration

The project uses `.asciidoctorrc` for consistent rendering:

- Document attributes and metadata
- Styling and theme configuration
- Technical stack version references
- Safety and compatibility settings

## Writing Documentation

### Required Elements

Every documentation file should include:

```asciidoc
= Document Title
:toc:
:sectnums:
:icons: font

[.lead]
Brief description of the component/feature.

== Overview
Detailed description...
```

### Best Practices

- Use semantic section levels (=, ==, ===)
- Include code examples with proper syntax highlighting
- Add cross-references to related components
- Maintain consistent formatting and style
- Keep documentation up-to-date with code changes

## Quality Gates

Documentation validation is integrated into the pipeline status:

- ✅ Syntax validation must pass
- ⚠️ Quality linting warnings are acceptable
- ❌ Broken links or major issues fail the build

## Local Development

Install AsciiDoctor for local validation:

```bash
gem install asciidoctor asciidoctor-html5s asciidoctor-diagram
```

Validate documentation before committing:

```bash
npm run docs:validate && npm run docs:lint
```
