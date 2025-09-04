#!/bin/bash

# Enhanced Quality Gate: Two-Phase TypeScript Validation System
# Phase 1: Strict user code validation (blocks deployment)
# Phase 2: Full project analysis (informational only)

set -e  # Exit on any error

echo "🚀 Enhanced Quality Gate: TypeScript Validation System"
echo "=================================================="

# Color codes for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create reports directory
mkdir -p reports

# Phase 1: User Code Validation (Blocking)
echo -e "\n${BLUE}Phase 1: User Code Validation${NC}"
echo "================================="
echo "Validating user-written code with strict TypeScript rules..."

if npx tsc --project tsconfig.user-code.json --noEmit > reports/user-code-validation.log 2>&1; then
  echo -e "${GREEN}✅ Phase 1 PASSED: User code validation successful${NC}"
  PHASE1_PASSED=true
  USER_ERRORS=0
else
  echo -e "${RED}❌ Phase 1 FAILED: User code validation failed${NC}"
  echo -e "${RED}🚫 Deployment blocked due to user code issues${NC}"
  PHASE1_PASSED=false
  USER_ERRORS=$(grep -c "error TS" reports/user-code-validation.log 2>/dev/null || echo "0")

  # Show first 10 errors for quick feedback
  echo -e "\n${RED}First 10 errors:${NC}"
  head -20 reports/user-code-validation.log | grep "error TS" | head -10 || echo "No errors found in log"
fi

# Phase 2: Full Project Analysis (Informational)
echo -e "\n${YELLOW}Phase 2: Full Project Analysis${NC}"
echo "================================="
echo "Analyzing complete project including external libraries..."

if npx tsc --project tsconfig.ci.json --noEmit > reports/full-project-analysis.log 2>&1; then
  echo -e "${GREEN}✅ Phase 2 INFO: Full project analysis clean${NC}"
  PHASE2_PASSED=true
  TOTAL_ERRORS=0
else
  echo -e "${YELLOW}ℹ️ Phase 2 INFO: External library issues detected (non-blocking)${NC}"
  PHASE2_PASSED=false
  TOTAL_ERRORS=$(grep -c "error TS" reports/full-project-analysis.log 2>/dev/null || echo "0")
fi

# Generate comprehensive report
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
REPORT_FILE="reports/typescript-report.txt"

cat > "$REPORT_FILE" << EOF
TypeScript Quality Gate Report
Generated: $TIMESTAMP

=== QUALITY GATE SUMMARY ===
Phase 1 (User Code): $([ "$PHASE1_PASSED" = true ] && echo "✅ PASSED" || echo "❌ FAILED")
Phase 2 (Full Project): $([ "$PHASE2_PASSED" = true ] && echo "✅ CLEAN" || echo "ℹ️ EXTERNAL ISSUES")

=== ERROR COUNTS ===
User Code Errors: $USER_ERRORS
Total Project Errors: $TOTAL_ERRORS
External Library Issues: $((TOTAL_ERRORS - USER_ERRORS))

=== DEPLOYMENT STATUS ===
$([ "$PHASE1_PASSED" = true ] && echo "🚀 APPROVED FOR DEPLOYMENT" || echo "🚫 BLOCKED - FIX USER CODE ERRORS")

EOF

# Final Quality Gate Decision
echo -e "\n${BLUE}Quality Gate Summary${NC}"
echo "===================="

if [ "$PHASE1_PASSED" = true ]; then
  echo -e "${GREEN}🎉 QUALITY GATE PASSED${NC}"
  echo -e "${GREEN}✅ User code: $USER_ERRORS errors${NC}"
  if [ "$PHASE2_PASSED" = true ]; then
    echo -e "${GREEN}✅ Full project: Clean${NC}"
  else
    echo -e "${YELLOW}ℹ️ Full project: $((TOTAL_ERRORS - USER_ERRORS)) external library issues (informational)${NC}"
  fi
  echo -e "${GREEN}🚀 Deployment approved${NC}"

  # Success details
  echo -e "\n${GREEN}Report saved to: $REPORT_FILE${NC}"
  exit 0
else
  echo -e "${RED}❌ QUALITY GATE FAILED${NC}"
  echo -e "${RED}❌ User code: $USER_ERRORS errors found${NC}"
  echo -e "${RED}🚫 Deployment blocked${NC}"

  # Failure details
  echo -e "\n${RED}Fix the following user code errors:${NC}"
  echo -e "${RED}Report saved to: $REPORT_FILE${NC}"
  echo -e "${RED}User code log: reports/user-code-validation.log${NC}"
  exit 1
fi
