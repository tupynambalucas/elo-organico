#!/usr/bin/env bash

# ==============================================================================
#  Elo Orgânico - GitHub Security & Quality (Secrets & Variables) Sync Script
# ==============================================================================
# This script scans the security-quality directory for dotenv files:
#   - .env.[category].secrets
#   - .env.[category].variables
# where [category] can be: actions, codespaces, dependabot
#
# Features:
#   - Synchronizes local secrets and variables with GitHub.
#   - Prunes/deletes secrets/variables on GitHub that were removed locally.
#   - Overwrites existing keys to keep them fully up to date.
#   - Safe skips: Missing files or empty files are skipped but pruned.
#
# Generates a runtime log at 'tools/github/logs/scripts/sync_security_quality.log'.
# ==============================================================================

set -euo pipefail

# Directory where secrets/variables files are located inside the container
BASE_DIR="/workspace/infrastructure/gh/features/security-quality"
LOG_DIR="/workspace/logs/scripts"
LOG_FILE="$LOG_DIR/$(basename "$0" .sh).log"

# Temporary files to accumulate keys/warnings for the run log
TMP_ACTIONS_SECRETS="/tmp/actions_secrets.keys"
TMP_ACTIONS_VARIABLES="/tmp/actions_variables.keys"
TMP_CODESPACES_SECRETS="/tmp/codespaces_secrets.keys"
TMP_CODESPACES_VARIABLES="/tmp/codespaces_variables.keys"
TMP_DEPENDABOT_SECRETS="/tmp/dependabot_secrets.keys"
TMP_DEPENDABOT_VARIABLES="/tmp/dependabot_variables.keys"

# Ensure temporary files are clean
rm -f "$TMP_ACTIONS_SECRETS" "$TMP_ACTIONS_VARIABLES" \
      "$TMP_CODESPACES_SECRETS" "$TMP_CODESPACES_VARIABLES" \
      "$TMP_DEPENDABOT_SECRETS" "$TMP_DEPENDABOT_VARIABLES"

touch "$TMP_ACTIONS_SECRETS" "$TMP_ACTIONS_VARIABLES" \
      "$TMP_CODESPACES_SECRETS" "$TMP_CODESPACES_VARIABLES" \
      "$TMP_DEPENDABOT_SECRETS" "$TMP_DEPENDABOT_VARIABLES"

echo "Verifying GitHub CLI authentication status..."
if ! gh auth status >/dev/null 2>&1; then
  if [ -n "${GH_TOKEN:-}" ]; then
    echo "Authenticated successfully via GH_TOKEN environment variable."
  else
    echo "Error: GitHub CLI is not authenticated. Please ensure GH_TOKEN is set." >&2
    exit 1
  fi
fi

# Ensure GH_REPO is set so gh CLI knows which repository to target
if [ -z "${GH_REPO:-}" ]; then
  echo "Error: GH_REPO environment variable is not set." >&2
  exit 1
fi
echo "Target GitHub repository: $GH_REPO"

categories=("actions" "codespaces" "dependabot")
modes=("secrets" "variables")
synchronized_any=false

for mode in "${modes[@]}"; do
  for category in "${categories[@]}"; do
    filepath="$BASE_DIR/$mode/.env.$category.$mode"

    # Identify the corresponding temp file for logging
    tmp_file=""
    if [ "$category" = "actions" ] && [ "$mode" = "secrets" ]; then
      tmp_file="$TMP_ACTIONS_SECRETS"
    elif [ "$category" = "actions" ] && [ "$mode" = "variables" ]; then
      tmp_file="$TMP_ACTIONS_VARIABLES"
    elif [ "$category" = "codespaces" ] && [ "$mode" = "secrets" ]; then
      tmp_file="$TMP_CODESPACES_SECRETS"
    elif [ "$category" = "codespaces" ] && [ "$mode" = "variables" ]; then
      tmp_file="$TMP_CODESPACES_VARIABLES"
    elif [ "$category" = "dependabot" ] && [ "$mode" = "secrets" ]; then
      tmp_file="$TMP_DEPENDABOT_SECRETS"
    elif [ "$category" = "dependabot" ] && [ "$mode" = "variables" ]; then
      tmp_file="$TMP_DEPENDABOT_VARIABLES"
    fi

    # Handle unsupported variable categories early
    if [ "$mode" = "variables" ] && [ "$category" != "actions" ]; then
      {
        echo "Category: $category | Mode: $mode"
        echo "  Status: Unsupported (GitHub does not support configuration variables for '$category')"
      } > "$tmp_file"
      continue
    fi

    # 1. Read local file keys and values
    declare -A local_map=()
    local_keys=()
    file_exists=false

    if [ -f "$filepath" ]; then
      file_exists=true
      while IFS= read -r line || [ -n "$line" ]; do
        line=$(echo "$line" | tr -d '\r')

        # Skip comments and empty lines
        if [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
          continue
        fi

        # KEY=VALUE pattern
        if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
          key="${BASH_REMATCH[1]}"
          value="${BASH_REMATCH[2]}"

          # Pure bash whitespace trimming
          key="${key#"${key%%[![:space:]]*}"}"
          key="${key%"${key##*[![:space:]]}"}"
          value="${value#"${value%%[![:space:]]*}"}"
          value="${value%"${value##*[![:space:]]}"}"

          # Ignore standard configuration/auth helper variables if they accidentally exist in these files
          if [ "$key" = "GH_REPO" ] || [ "$key" = "GH_TOKEN" ] || [ "$key" = "GITHUB_TOKEN" ]; then
            continue
          fi

          if [ -n "$key" ] && [ -n "$value" ]; then
            local_keys+=("$key")
            local_map["$key"]="$value"
          fi
        fi
      done < "$filepath"
    fi

    # 2. Fetch current GitHub keys for this category/mode
    gh_keys=()
    if [ "$mode" = "secrets" ]; then
      while read -r name _; do
        if [ -n "$name" ]; then
          gh_keys+=("$name")
        fi
      done < <(gh secret list --app "$category" 2>/dev/null || true)
    elif [ "$mode" = "variables" ] && [ "$category" = "actions" ]; then
      while read -r name _; do
        if [ -n "$name" ]; then
          gh_keys+=("$name")
        fi
      done < <(gh variable list 2>/dev/null || true)
    fi

    # 3. Identify and perform deletions (keys on GitHub but not in local_keys)
    deleted_keys=()
    for gk in "${gh_keys[@]}"; do
      if [ -z "${local_map["$gk"]:-}" ]; then
        echo "Pruning: Deleting $mode '$gk' from $category on GitHub..."
        if [ "$mode" = "secrets" ]; then
          if gh secret delete "$gk" --app "$category" >/dev/null 2>&1; then
            deleted_keys+=("$gk")
          else
            echo "  Warning: Failed to delete secret '$gk' from $category"
          fi
        elif [ "$mode" = "variables" ] && [ "$category" = "actions" ]; then
          if gh variable delete "$gk" >/dev/null 2>&1; then
            deleted_keys+=("$gk")
          else
            echo "  Warning: Failed to delete variable '$gk' from Actions"
          fi
        fi
      fi
    done

    # 4. Perform additions/updates of local keys
    added_updated_keys=()
    for lk in "${local_keys[@]}"; do
      val="${local_map["$lk"]}"
      echo "Synchronizing: Uploading $mode '$lk' -> App: $category"
      if [ "$mode" = "secrets" ]; then
        if gh secret set "$lk" --body "$val" --app "$category" >/dev/null 2>&1; then
          added_updated_keys+=("$lk")
          synchronized_any=true
        else
          echo "  Warning: Failed to set secret '$lk' for $category"
        fi
      elif [ "$mode" = "variables" ] && [ "$category" = "actions" ]; then
        if gh variable set "$lk" --body "$val" >/dev/null 2>&1; then
          added_updated_keys+=("$lk")
          synchronized_any=true
        else
          echo "  Warning: Failed to set variable '$lk' for Actions"
        fi
      fi
    done

    # 5. Generate log block for this pair
    {
      if [ "$file_exists" = "false" ]; then
        echo "Category: $category | Mode: $mode"
        echo "  Status: Empty (File not found)"
        if [ "${#deleted_keys[@]}" -gt 0 ]; then
          echo "  Removed:"
          for dk in "${deleted_keys[@]}"; do
            echo "    - $dk"
          done
        fi
      elif [ "${#local_keys[@]}" -eq 0 ]; then
        echo "Category: $category | Mode: $mode"
        echo "  Status: Empty (File contains no active keys)"
        if [ "${#deleted_keys[@]}" -gt 0 ]; then
          echo "  Removed:"
          for dk in "${deleted_keys[@]}"; do
            echo "    - $dk"
          done
        fi
      else
        echo "Category: $category | Mode: $mode"
        echo "  Status: Synchronized (${#added_updated_keys[@]} added/updated, ${#deleted_keys[@]} removed)"
        if [ "${#added_updated_keys[@]}" -gt 0 ]; then
          echo "  Added/Updated:"
          for ak in "${added_updated_keys[@]}"; do
            echo "    - $ak"
          done
        fi
        if [ "${#deleted_keys[@]}" -gt 0 ]; then
          echo "  Removed:"
          for dk in "${deleted_keys[@]}"; do
            echo "    - $dk"
          done
        fi
      fi
    } > "$tmp_file"

  done
done

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Generate the last run log file
{
  echo "=============================================================================="
  echo " GitHub Security & Quality Sync Log"
  echo " Last Run: $(date '+%Y-%m-%d %H:%M:%S') UTC"
  echo "=============================================================================="
  echo ""
  echo "[ACTIONS SECRETS]"
  cat "$TMP_ACTIONS_SECRETS"
  echo ""
  echo "[ACTIONS VARIABLES]"
  cat "$TMP_ACTIONS_VARIABLES"
  echo ""
  echo "[CODESPACES SECRETS]"
  cat "$TMP_CODESPACES_SECRETS"
  echo ""
  echo "[CODESPACES VARIABLES]"
  cat "$TMP_CODESPACES_VARIABLES"
  echo ""
  echo "[DEPENDABOT SECRETS]"
  cat "$TMP_DEPENDABOT_SECRETS"
  echo ""
  echo "[DEPENDABOT VARIABLES]"
  cat "$TMP_DEPENDABOT_VARIABLES"
  echo ""
} > "$LOG_FILE"

# Clean up temporary files
rm -f "$TMP_ACTIONS_SECRETS" "$TMP_ACTIONS_VARIABLES" \
      "$TMP_CODESPACES_SECRETS" "$TMP_CODESPACES_VARIABLES" \
      "$TMP_DEPENDABOT_SECRETS" "$TMP_DEPENDABOT_VARIABLES"

echo "=================================================="
if [ "$synchronized_any" = "false" ]; then
  echo "Finished with no variables or secrets uploaded (all files skipped or empty)."
else
  echo "All environment variables and secrets synchronized successfully!"
  echo "Execution log written to: tools/github/logs/scripts/$(basename "$0" .sh).log"
fi
echo "=================================================="
