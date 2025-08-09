#!/usr/bin/env bash
set -euo pipefail

# SonarQube Bootstrap Script
# Automates creation / verification of a project and generation of a CI token.
#
# REQUIREMENTS:
#   1. Export SONAR_HOST_URL (e.g. https://sonar.example.com)
#   2. Provide either SONAR_ADMIN_TOKEN (preferred) OR SONAR_USERNAME + SONAR_PASSWORD
#   3. (Optional) Set PROJECT_KEY / PROJECT_NAME (defaults: portfolio / Portfolio)
#
# USAGE:
#   export SONAR_HOST_URL=https://sonar.example.com
#   export SONAR_ADMIN_TOKEN=xxxxx   # OR export SONAR_USERNAME=admin SONAR_PASSWORD=xxxx
#   ./scripts/sonar/sonar-bootstrap.sh
#
# OUTPUT:
#   - Displays project status (created or already existed)
#   - Generates a CI analysis token (unless one with same name already exists)
#   - Prints the token ONCE (capture & add to GitHub secret SONAR_TOKEN immediately)
#
# SECURITY:
#   Do NOT commit generated tokens. Treat them like passwords.

PROJECT_KEY=${PROJECT_KEY:-portfolio}
PROJECT_NAME=${PROJECT_NAME:-Portfolio}
TOKEN_NAME=${SONAR_TOKEN_NAME:-${PROJECT_KEY}-ci}

if [[ -z "${SONAR_HOST_URL:-}" ]]; then
  echo "❌ SONAR_HOST_URL not set" >&2; exit 1; fi

auth_header() {
  if [[ -n "${SONAR_ADMIN_TOKEN:-}" ]]; then
    printf "%s:" "$SONAR_ADMIN_TOKEN" | base64 | sed 's/^/Authorization: Basic /'
  elif [[ -n "${SONAR_USERNAME:-}" && -n "${SONAR_PASSWORD:-}" ]]; then
    printf "%s:%s" "$SONAR_USERNAME" "$SONAR_PASSWORD" | base64 | sed 's/^/Authorization: Basic /'
  else
    echo "❌ Provide SONAR_ADMIN_TOKEN or SONAR_USERNAME + SONAR_PASSWORD" >&2; exit 1
  fi
}

AUTH_HEADER=$(auth_header)

api_get() { curl -sS -H "$AUTH_HEADER" "$SONAR_HOST_URL$1"; }
api_post() { curl -sS -X POST -H "$AUTH_HEADER" "$SONAR_HOST_URL$1" -d "$2"; }

echo "🔍 Checking SonarQube health..."
health=$(api_get /api/system/health | jq -r '.health' || echo unknown)
if [[ "$health" != "GREEN" && "$health" != "YELLOW" ]]; then
  echo "⚠️  SonarQube not fully up (health=$health). Continue? (y/N)"; read -r ans; [[ "$ans" == y || "$ans" == Y ]] || exit 1
fi

echo "🔍 Verifying project '$PROJECT_KEY'..."
proj_status=$(api_get "/api/projects/search?projects=$PROJECT_KEY" | jq -r '.components | length')
if [[ "$proj_status" == "0" ]]; then
  echo "➡️  Creating project $PROJECT_KEY"
  create_resp=$(api_post /api/projects/create "project=$PROJECT_KEY&name=$(printf %s "$PROJECT_NAME" | sed 's/ /%20/g')")
  echo "$create_resp" | jq '.' || true
else
  echo "✅ Project already exists"
fi

echo "🔑 Generating project analysis token (name: $TOKEN_NAME)..."
token_resp=$(api_post /api/user_tokens/generate "name=$TOKEN_NAME" || true)
token_value=$(echo "$token_resp" | jq -r '.token // empty')

if [[ -n "$token_value" ]]; then
  echo "✅ New token generated. COPY IT NOW (will not be shown again):"
  echo "$token_value"
  echo
  echo "Add it as GitHub secret: SONAR_TOKEN"
else
  echo "ℹ️  Token may already exist or generation failed. Response:"
  echo "$token_resp" | jq '.' || true
  echo "If token already existed, generate a new one manually and update Secret."
fi

echo "📌 Done. Next steps:"
echo "  1. Add SONAR_TOKEN secret in GitHub."
echo "  2. Trigger workflow: SonarQube (Self-Hosted) Analysis."
echo "  3. (Optional) Customize Quality Gate in Sonar UI."
