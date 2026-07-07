#!/usr/bin/env bash
set -euo pipefail
 
# Move to the repo root
cd "$(git rev-parse --show-toplevel)"
 
# Ensure we’re not in a detached HEAD or bare repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a valid Git working tree."
  exit 1
fi
 
: "${GITHUB_REPO_CLONE_TOKEN:?GITHUB_REPO_CLONE_TOKEN is required}"

SUBMODULE_NAME="src/lib/content"
PUBLIC_URL="https://github.com/fofajardo/fofajardo-portfolio-content.git"
AUTHENTICATED_URL="https://x-access-token:${GITHUB_REPO_CLONE_TOKEN}@github.com/fofajardo/fofajardo-portfolio-content.git"

# The submodule is already committed in .gitmodules and the repository index.
# Override its URL only in the ephemeral local config so the token is never
# written to .gitmodules.
git submodule sync -- "$SUBMODULE_NAME"
git config "submodule.${SUBMODULE_NAME}.url" "$AUTHENTICATED_URL"

restore_public_url() {
  git config "submodule.${SUBMODULE_NAME}.url" "$PUBLIC_URL"
}
trap restore_public_url EXIT

echo "Initializing content submodule..."
git submodule update --init --recursive -- "$SUBMODULE_NAME"
