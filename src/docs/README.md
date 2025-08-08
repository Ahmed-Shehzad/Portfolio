# Component Documentation

This directory contains comprehensive AsciiDoc documentation for all React components, hooks, and sections in the Muhammad Ahmed Shehzad Portfolio application.

## Documentation Format

All documentation is written in **AsciiDoc** format (`.adoc` files) which provides:

- Rich formatting capabilities
- Table support for structured data
- Code syntax highlighting
- Cross-referencing between documents
- Professional PDF export capabilities

## Directory Structure

```
docs/
├── index.adoc                    # Main documentation index
├── components/                   # Component documentation
│   ├── features/                # Feature-specific components
│   │   └── ContactModal.adoc    # Contact form modal documentation
│   ├── layout/                  # Layout components
│   │   └── HeroOrbit.adoc       # Orbital animation component
│   └── ui/                      # Generic UI components
│       ├── Card.adoc            # Card container component
│       ├── CardHeader.adoc      # Card header component
│       ├── Modal.adoc           # Modal dialog component
│       └── TechIcon.adoc        # Technology icon component
├── hooks/                       # Custom React hooks
│   └── useWebWorker.adoc        # Web Worker integration hook
├── sections/                    # Page sections
│   └── Hero.adoc               # Hero section documentation
└── wrappers/                    # HOC and wrapper components
```

## Documentation Standards

Each component documentation includes:

### Required Sections

- **Overview**: Component purpose and functionality
- **Component Details**: File location, type, and export information
- **Props Interface**: Complete props specification with types
- **Usage Examples**: Practical implementation examples
- **Dependencies**: Required imports and packages
- **Accessibility Features**: Screen reader and keyboard support
- **Performance Considerations**: Optimization details
- **Best Practices**: Usage guidelines and recommendations

### Optional Sections

- **Type Definitions**: TypeScript interfaces and types
- **Styling Architecture**: CSS and styling approach
- **Animation Features**: Animation and interaction details
- **Error Handling**: Error scenarios and recovery
- **Related Components**: Cross-references to related docs

## Viewing Documentation

### AsciiDoc Viewers

1. **VS Code**: Install "AsciiDoc" extension for syntax highlighting and preview
2. **IntelliJ/WebStorm**: Built-in AsciiDoc support
3. **GitHub**: Native AsciiDoc rendering in web interface
4. **Asciidoctor**: Command-line tool for HTML/PDF conversion

### Local Development

```bash
# Install AsciiDoctor (Ruby gem)
gem install asciidoctor

# Convert to HTML
asciidoctor src/docs/index.adoc

# Convert to PDF (requires asciidoctor-pdf)
gem install asciidoctor-pdf
asciidoctor-pdf src/docs/index.adoc
```

## Contributing to Documentation

### Adding New Component Documentation

1. **Create File**: Add new `.adoc` file in appropriate directory
2. **Follow Template**: Use existing documentation as template
3. **Update Index**: Add link in `index.adoc` main documentation
4. **Cross-Reference**: Link related components where relevant

### Documentation Template

```asciidoc
= Component Name
:toc:
:toc-placement: preamble
:sectnums:
:icons: font

[.lead]
Brief component description and purpose.

== Overview
Detailed component explanation...

== Component Details
[cols="1,3"]
|===
|*File Location* |`src/components/...`
|*Component Type* |Functional Component
|*Export Type* |Named Export
|===

== Props Interface
[cols="1,1,3,1"]
|===
|*Prop* |*Type* |*Description* |*Required*
|propName |string |Prop description |Yes/No
|===

== Usage Examples
[source,tsx]
----
// Code example
----

== Dependencies
== Best Practices
== Related Components
== Change History
```

### Writing Guidelines

1. **Clear Language**: Use clear, concise technical writing
2. **Code Examples**: Include practical, working examples
3. **Complete Coverage**: Document all props, methods, and features
4. **Accessibility**: Always include accessibility information
5. **Performance**: Note performance implications and optimizations
6. **Cross-References**: Link to related components and concepts

## Documentation Maintenance

### Regular Updates

- Review documentation when components change
- Update examples to reflect current API
- Add new sections for new features
- Remove outdated information promptly

### Version Control

- Document significant changes in "Change History" sections
- Use semantic versioning for major documentation updates
- Keep documentation in sync with component implementations

## Integration with Development Workflow

### Pre-commit Hooks

Documentation updates should be included in the same commits as component changes to maintain synchronization.

### Code Review Process

- Review documentation changes alongside code changes
- Verify examples are accurate and working
- Check for consistency with established patterns
- Ensure accessibility documentation is complete

## Export and Distribution

### HTML Generation

Generate static HTML for easy sharing and web deployment:

```bash
# Generate all documentation as HTML
find src/docs -name "*.adoc" -exec asciidoctor {} \;
```

### PDF Generation

Create professional PDF documentation:

```bash
# Generate comprehensive PDF from index
asciidoctor-pdf src/docs/index.adoc -o portfolio-documentation.pdf
```

## Tools and Extensions

### Recommended VS Code Extensions

- **AsciiDoc** by joaompinto: Syntax highlighting and preview
- **AsciiDoc Support** by Asciidoctor: Enhanced AsciiDoc features
- **Markdown All in One**: For any markdown documentation

### Useful Commands

```bash
# Watch for changes and regenerate HTML
ls src/docs/**/*.adoc | entr asciidoctor @@

# Validate AsciiDoc syntax
asciidoctor -v src/docs/index.adoc

# Generate table of contents
asciidoctor --help
```

This documentation system provides comprehensive, maintainable, and professional documentation for the entire component library while supporting both developer workflow and end-user consumption.
