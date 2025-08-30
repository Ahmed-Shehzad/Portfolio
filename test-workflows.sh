#!/bin/bash

# GitHub Actions Local Testing Script
# Usage: ./test-workflows.sh [job-name] [event]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 GitHub Actions Local Testing${NC}"
echo "================================="

# Check if act is installed
if ! command -v act &> /dev/null; then
    echo -e "${RED}❌ 'act' is not installed. Install it with: brew install act${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi

# Default values
JOB_NAME=${1:-"quality"}
EVENT=${2:-"push"}

echo -e "${YELLOW}📋 Available workflows:${NC}"
act -l

echo ""
echo -e "${YELLOW}🧪 Testing Job: ${JOB_NAME} (Event: ${EVENT})${NC}"
echo ""

# Test specific workflow patterns
case $JOB_NAME in
    "quality")
        echo -e "${BLUE}Running Code Quality & Linting checks...${NC}"
        act $EVENT -j quality
        ;;
    "test")
        echo -e "${BLUE}Running Unit & Integration Tests...${NC}"
        act $EVENT -j test
        ;;
    "build")
        echo -e "${BLUE}Running Build Application...${NC}"
        act $EVENT -j build
        ;;
    "security")
        echo -e "${BLUE}Running Security Scan...${NC}"
        act $EVENT -j security
        ;;
    "all")
        echo -e "${BLUE}Running all workflows for ${EVENT} event...${NC}"
        act $EVENT
        ;;
    "list")
        echo -e "${BLUE}Listing all available workflows:${NC}"
        act --list
        ;;
    *)
        echo -e "${BLUE}Running custom job: ${JOB_NAME}...${NC}"
        act $EVENT -j $JOB_NAME
        ;;
esac

echo ""
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Workflow testing completed successfully!${NC}"
else
    echo -e "${RED}❌ Workflow testing failed. Check the output above for details.${NC}"
    exit 1
fi
