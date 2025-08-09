#!/usr/bin/env bash
set -euo pipefail

# Local helper to run sonar-scanner in Docker mirroring the CI workflow.
# Usage: SONAR_HOST_URL=https://your-sonarqube.example.com SONAR_TOKEN=xxxxx ./scripts/run-sonar-docker.sh

if [[ -z "${SONAR_TOKEN:-}" ]]; then
  echo "SONAR_TOKEN not set" >&2; exit 1;
fi
if [[ -z "${SONAR_HOST_URL:-}" ]]; then
  SONAR_HOST_URL="https://sonarcloud.io"
fi

# Ensure build + placeholder coverage
npm run build >/dev/null 2>&1 || { echo "Build failed"; exit 1; }
mkdir -p coverage
[[ -f coverage/lcov.info ]] || echo 'TN:' > coverage/lcov.info

echo "Running sonar-scanner against $SONAR_HOST_URL";

docker run --rm \
  -e SONAR_HOST_URL="$SONAR_HOST_URL" \
  -e SONAR_TOKEN="$SONAR_TOKEN" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli:latest
