#!/bin/bash

# Portfolio Workflow Local Testing Script
# This script uses 'act' to run GitHub Actions workflows locally
# Usage: ./run-workflows-local.sh [workflow] [event]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ACT_VERSION="0.2.60"

# Function to print colored output
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Function to check if act is installed
check_act_installation() {
    if ! command -v act &> /dev/null; then
        print_error "act is not installed!"
        echo ""
        echo "Install act using one of these methods:"
        echo "  • Homebrew: brew install act"
        echo "  • GitHub releases: https://github.com/nektos/act/releases"
        echo "  • Bash: curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
        echo ""
        exit 1
    fi

    ACT_CURRENT_VERSION=$(act --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -n1)
    print_success "act is installed (version: $ACT_CURRENT_VERSION)"
}

# Function to check Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or running!"
        echo "Please install Docker and ensure it's running."
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker is not running!"
        echo "Please start Docker Desktop or Docker daemon."
        exit 1
    fi

    print_success "Docker is running"
}

# Function to show help
show_help() {
    echo "Portfolio Workflow Local Testing Script"
    echo ""
    echo "Usage: ./run-workflows-local.sh [workflow] [event]"
    echo ""
    echo "Available workflows:"
    echo "  ci, main         - Run main CI/CD pipeline (default)"
    echo "  preview          - Run PR preview workflow"
    echo "  deps             - Run dependency management workflow"
    echo "  release          - Run release workflow"
    echo "  all              - Run all workflows"
    echo "  list             - List all available workflows"
    echo ""
    echo "Available events:"
    echo "  push             - Simulate push event (default)"
    echo "  pull_request     - Simulate PR event"
    echo "  release          - Simulate release event"
    echo "  schedule         - Simulate scheduled event"
    echo ""
    echo "Examples:"
    echo "  ./run-workflows-local.sh                    # Run main CI pipeline with push event"
    echo "  ./run-workflows-local.sh ci push            # Run CI pipeline with push event"
    echo "  ./run-workflows-local.sh preview pull_request # Run preview with PR event"
    echo "  ./run-workflows-local.sh deps schedule      # Run deps workflow with schedule"
    echo "  ./run-workflows-local.sh list               # List all workflows"
    echo ""
    echo "Options:"
    echo "  -h, --help       - Show this help message"
    echo "  -v, --verbose    - Enable verbose output"
    echo "  -d, --dry-run    - Show what would be executed without running"
    echo "  --no-cache       - Don't use Docker layer caching"
    echo "  --reuse          - Reuse containers (faster subsequent runs)"
}

# Function to list workflows
list_workflows() {
    print_info "Available workflows in .github/workflows/:"
    echo ""

    if [ -d ".github/workflows" ]; then
        for workflow in .github/workflows/*.yml; do
            if [ -f "$workflow" ]; then
                workflow_name=$(basename "$workflow" .yml)
                # Extract workflow name from file if possible
                display_name=$(grep -E "^name:" "$workflow" | head -1 | sed 's/name: *//' | tr -d '"' || echo "$workflow_name")
                echo "  • $workflow_name - $display_name"
            fi
        done
    else
        print_error "No .github/workflows directory found!"
        exit 1
    fi
    echo ""
}

# Function to run specific workflow
run_workflow() {
    local workflow_file="$1"
    local event="$2"
    local extra_args="$3"

    if [ ! -f "$workflow_file" ]; then
        print_error "Workflow file not found: $workflow_file"
        exit 1
    fi

    local workflow_name=$(basename "$workflow_file" .yml)
    print_info "Running workflow: $workflow_name"
    print_info "Event: $event"
    print_info "File: $workflow_file"
    echo ""

    # Create act command
    local act_cmd="act $event -W $workflow_file"

    # Add platform specification for better compatibility
    act_cmd="$act_cmd -P ubuntu-latest=catthehacker/ubuntu:act-latest"

    # Add extra arguments
    if [ -n "$extra_args" ]; then
        act_cmd="$act_cmd $extra_args"
    fi

    # Add environment variables file if it exists
    if [ -f ".env.local" ]; then
        act_cmd="$act_cmd --env-file .env.local"
        print_info "Using environment file: .env.local"
    fi

    # Add secrets if they exist
    if [ -f ".secrets" ]; then
        act_cmd="$act_cmd --secret-file .secrets"
        print_info "Using secrets file: .secrets"
    fi

    if [ "$DRY_RUN" = "true" ]; then
        print_warning "DRY RUN - Command that would be executed:"
        echo "  $act_cmd"
        return
    fi

    print_info "Executing: $act_cmd"
    echo ""

    # Execute the command
    eval $act_cmd
}

# Function to run all workflows
run_all_workflows() {
    local event="$1"
    local extra_args="$2"

    print_info "Running all workflows with event: $event"
    echo ""

    for workflow in .github/workflows/*.yml; do
        if [ -f "$workflow" ]; then
            echo "=================================="
            run_workflow "$workflow" "$event" "$extra_args"
            echo ""
            echo "=================================="
            echo ""

            if [ "$workflow" != "$(ls .github/workflows/*.yml | tail -1)" ]; then
                read -p "Press Enter to continue to next workflow, or Ctrl+C to stop..."
            fi
        fi
    done

    print_success "All workflows completed!"
}

# Parse command line arguments
WORKFLOW=""
EVENT="push"
EXTRA_ARGS=""
VERBOSE=false
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -v|--verbose)
            VERBOSE=true
            EXTRA_ARGS="$EXTRA_ARGS --verbose"
            shift
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        --no-cache)
            EXTRA_ARGS="$EXTRA_ARGS --no-cache"
            shift
            ;;
        --reuse)
            EXTRA_ARGS="$EXTRA_ARGS --reuse"
            shift
            ;;
        list)
            list_workflows
            exit 0
            ;;
        all)
            WORKFLOW="all"
            shift
            ;;
        ci|main)
            WORKFLOW=".github/workflows/ci.yml"
            shift
            ;;
        preview)
            WORKFLOW=".github/workflows/preview.yml"
            shift
            ;;
        deps)
            WORKFLOW=".github/workflows/deps.yml"
            shift
            ;;
        release)
            WORKFLOW=".github/workflows/release.yml"
            shift
            ;;
        push|pull_request|release|schedule)
            EVENT="$1"
            shift
            ;;
        *)
            # Check if it's a workflow file
            if [ -f ".github/workflows/$1.yml" ]; then
                WORKFLOW=".github/workflows/$1.yml"
            elif [ -f "$1" ]; then
                WORKFLOW="$1"
            else
                print_error "Unknown argument: $1"
                echo ""
                show_help
                exit 1
            fi
            shift
            ;;
    esac
done

# Main execution
main() {
    echo "🚀 Portfolio Workflow Local Testing Script"
    echo "==========================================="
    echo ""

    # Check prerequisites
    check_act_installation
    check_docker
    echo ""

    # Set default workflow if none specified
    if [ -z "$WORKFLOW" ]; then
        WORKFLOW=".github/workflows/ci.yml"
        print_info "No workflow specified, using default: ci.yml"
    fi

    # Create environment hints
    if [ ! -f ".env.local" ]; then
        print_warning "No .env.local file found"
        print_info "Create .env.local for local environment variables:"
        echo "  NODE_ENV=development"
        echo "  CI=true"
        echo ""
    fi

    if [ ! -f ".secrets" ]; then
        print_warning "No .secrets file found"
        print_info "Create .secrets for GitHub secrets (if needed):"
        echo "  SONAR_TOKEN=your_sonar_token"
        echo "  GITHUB_TOKEN=your_github_token"
        echo ""
    fi

    # Run workflows
    if [ "$WORKFLOW" = "all" ]; then
        run_all_workflows "$EVENT" "$EXTRA_ARGS"
    else
        run_workflow "$WORKFLOW" "$EVENT" "$EXTRA_ARGS"
    fi

    print_success "Script execution completed!"
}

# Run main function
main "$@"
