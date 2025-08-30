#!/bin/bash

# Advanced AsciiDoc Documentation Linting
# This script performs additional quality checks beyond syntax validation

set -e

echo "🔍 Advanced Documentation Linting"
echo "================================="

# Check for common documentation issues
lint_issues=0

echo "📝 Checking documentation quality..."

# Find all AsciiDoc files
adoc_files=$(find src/docs -name "*.adoc" -type f | sort)

for file in $adoc_files; do
    echo "  Checking: $file"

    # Check for missing title
    if ! grep -q "^= " "$file"; then
        echo "    ⚠️  Missing document title (should start with '= ')"
        ((lint_issues++))
    fi

    # Check for very short files (likely incomplete)
    line_count=$(wc -l < "$file")
    if [ "$line_count" -lt 10 ]; then
        echo "    ⚠️  Very short file ($line_count lines) - might be incomplete"
        ((lint_issues++))
    fi

    # Check for TODO/FIXME comments
    if grep -q -i "TODO\|FIXME\|XXX" "$file"; then
        echo "    ⚠️  Contains TODO/FIXME comments"
        grep -n -i "TODO\|FIXME\|XXX" "$file" | sed 's/^/      /'
        ((lint_issues++))
    fi

    # Check for broken internal links (basic check)
    if grep -q "xref:" "$file"; then
        # Extract xref targets and check if referenced files exist
        grep -o "xref:[^[]*" "$file" | sed 's/xref://' | while read -r ref; do
            if [[ "$ref" == *.adoc ]]; then
                if [ ! -f "src/docs/$ref" ]; then
                    echo "    ❌ Broken internal link: $ref"
                    ((lint_issues++))
                fi
            fi
        done
    fi

    # Check for consistent section numbering
    if grep -q ":sectnums:" "$file" && ! grep -q "== " "$file"; then
        echo "    ⚠️  Has section numbering enabled but no level-2 sections"
        ((lint_issues++))
    fi
done

echo ""

# Check documentation coverage
echo "📊 Documentation Coverage Analysis..."

# Get list of TypeScript/React components
src_files=$(find src -name "*.tsx" -o -name "*.ts" | grep -v ".test." | grep -v ".spec." | sort)
documented_components=0
total_components=0

for src_file in $src_files; do
    # Extract component/hook name from file path
    component_name=$(basename "$src_file" .tsx)
    component_name=$(basename "$component_name" .ts)

    # Skip index files and config files
    if [[ "$component_name" == "index" || "$component_name" == "config" || "$component_name" == "constants" ]]; then
        continue
    fi

    ((total_components++))

    # Check if documentation exists
    relative_path=${src_file#src/}
    doc_path="src/docs/${relative_path%.*}.adoc"

    if [ -f "$doc_path" ]; then
        ((documented_components++))
    else
        echo "  ⚠️  Missing documentation for: $src_file"
    fi
done

coverage_percent=$((documented_components * 100 / total_components))
echo "  Documentation coverage: $documented_components/$total_components ($coverage_percent%)"

# Summary
echo ""
echo "📋 Linting Summary"
echo "=================="
echo "  Total lint issues: $lint_issues"
echo "  Documentation coverage: $coverage_percent%"

if [ "$lint_issues" -eq 0 ] && [ "$coverage_percent" -ge 70 ]; then
    echo "✅ Documentation quality check PASSED"
    exit 0
elif [ "$lint_issues" -gt 10 ]; then
    echo "❌ Documentation quality check FAILED (too many issues)"
    exit 1
else
    echo "⚠️  Documentation quality check PASSED with warnings"
    exit 0
fi
