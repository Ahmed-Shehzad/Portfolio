#!/bin/bash

# AsciiDoc Documentation Validation Script
# Usage: ./scripts/validate-docs.sh

set -e

echo "🔍 AsciiDoc Documentation Validation"
echo "===================================="

# Check if asciidoctor is installed
if ! command -v asciidoctor &> /dev/null; then
    echo "❌ AsciiDoctor not found. Please install it:"
    echo "   gem install asciidoctor"
    echo "   gem install asciidoctor-html5s"
    echo "   gem install asciidoctor-diagram"
    exit 1
fi

echo "✅ AsciiDoctor found: $(asciidoctor --version)"
echo ""

# Find all AsciiDoc files
echo "📄 Discovering AsciiDoc files..."
adoc_files=$(find . -name "*.adoc" -type f | sort)

if [ -z "$adoc_files" ]; then
    echo "⚠️  No AsciiDoc files found"
    exit 0
fi

file_count=$(echo "$adoc_files" | wc -l)
echo "Found $file_count AsciiDoc files:"
echo "$adoc_files" | sed 's/^/  - /'
echo ""

# Validate each file
echo "🔧 Validating syntax..."
validation_failed=false
valid_files=0
invalid_files=0

while IFS= read -r file; do
    if [ -n "$file" ]; then
        printf "  Checking %-50s ... " "$file"

        # Check syntax by attempting to convert to HTML
        if asciidoctor --safe-mode unsafe --no-header-footer -o /dev/null "$file" 2>/dev/null; then
            echo "✅ Valid"
            ((valid_files++))
        else
            echo "❌ Invalid"
            echo "    Error details:"
            asciidoctor --safe-mode unsafe --no-header-footer -o /dev/null "$file" 2>&1 | sed 's/^/    /'
            ((invalid_files++))
            validation_failed=true
        fi
    fi
done <<< "$adoc_files"

echo ""

# Structure validation
echo "🏗️  Validating documentation structure..."

main_doc="src/docs/index.adoc"
if [ -f "$main_doc" ]; then
    echo "  ✅ Main documentation found: $main_doc"

    # Check for required elements
    required_elements=("= " ":toc:" "== Overview")
    for element in "${required_elements[@]}"; do
        if grep -q "$element" "$main_doc"; then
            echo "  ✅ Found required element: '$element'"
        else
            echo "  ⚠️  Missing recommended element: '$element'"
        fi
    done
else
    echo "  ⚠️  Main documentation not found at: $main_doc"
fi

echo ""

# Summary
echo "📊 Validation Summary"
echo "===================="
echo "  Total files:     $file_count"
echo "  Valid files:     $valid_files"
echo "  Invalid files:   $invalid_files"
echo ""

if [ "$validation_failed" = true ]; then
    echo "❌ Documentation validation FAILED"
    exit 1
else
    echo "✅ Documentation validation PASSED"
    echo "All AsciiDoc files are syntactically valid!"
fi
