#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANIFEST_PATH="${1:-$SITE_ROOT/release-assets-manifest.json}"
API_ROOT="https://api.github.com"

TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"

if [[ -z "$TOKEN" ]]; then
  echo "Missing GITHUB_TOKEN or GH_TOKEN." >&2
  exit 1
fi

if [[ ! -f "$MANIFEST_PATH" ]]; then
  echo "Manifest not found: $MANIFEST_PATH" >&2
  exit 1
fi

repo="$(jq -r '.repository' "$MANIFEST_PATH")"
release_tag="${RELEASE_TAG:-$(jq -r '.release_tag' "$MANIFEST_PATH")}"
release_name="${RELEASE_NAME:-$(jq -r '.release_name' "$MANIFEST_PATH")}"
release_body="$(jq -r '.release_body' "$MANIFEST_PATH")"

auth_header="Authorization: Bearer $TOKEN"
accept_header="Accept: application/vnd.github+json"
version_header="X-GitHub-Api-Version: 2022-11-28"

release_json="$(curl -fsS \
  -H "$auth_header" \
  -H "$accept_header" \
  -H "$version_header" \
  "$API_ROOT/repos/$repo/releases/tags/$release_tag" || true)"

if [[ -z "$release_json" ]]; then
  create_payload="$(jq -n \
    --arg tag_name "$release_tag" \
    --arg name "$release_name" \
    --arg body "$release_body" \
    '{tag_name: $tag_name, name: $name, body: $body, draft: false, prerelease: false}')"

  release_json="$(curl -fsS \
    -X POST \
    -H "$auth_header" \
    -H "$accept_header" \
    -H "$version_header" \
    -d "$create_payload" \
    "$API_ROOT/repos/$repo/releases")"
fi

release_id="$(printf '%s' "$release_json" | jq -r '.id')"
release_html_url="$(printf '%s' "$release_json" | jq -r '.html_url')"
upload_url_template="$(printf '%s' "$release_json" | jq -r '.upload_url' | sed 's/{?name,label}//')"

assets_json="$(curl -fsS \
  -H "$auth_header" \
  -H "$accept_header" \
  -H "$version_header" \
  "$API_ROOT/repos/$repo/releases/$release_id/assets")"

asset_count="$(jq '.assets | length' "$MANIFEST_PATH")"

for ((i = 0; i < asset_count; i++)); do
  local_path="$(jq -r ".assets[$i].localPath" "$MANIFEST_PATH")"
  upload_name="$(jq -r ".assets[$i].uploadName" "$MANIFEST_PATH")"
  content_type="$(jq -r ".assets[$i].contentType" "$MANIFEST_PATH")"
  label="$(jq -r ".assets[$i].label" "$MANIFEST_PATH")"
  absolute_path="$SITE_ROOT/$local_path"

  if [[ ! -f "$absolute_path" ]]; then
    echo "Skipping missing asset: $absolute_path" >&2
    continue
  fi

  existing_asset_id="$(printf '%s' "$assets_json" | jq -r --arg name "$upload_name" '.[] | select(.name == $name) | .id' | head -n 1)"

  if [[ -n "$existing_asset_id" ]]; then
    curl -fsS \
      -X DELETE \
      -H "$auth_header" \
      -H "$accept_header" \
      -H "$version_header" \
      "$API_ROOT/repos/$repo/releases/assets/$existing_asset_id" >/dev/null
  fi

  encoded_name="$(jq -nr --arg value "$upload_name" '$value|@uri')"

  curl -fsS \
    -X POST \
    -H "$auth_header" \
    -H "Content-Type: $content_type" \
    --data-binary @"$absolute_path" \
    "$upload_url_template?name=$encoded_name" >/dev/null

  echo "Uploaded: $label -> $upload_name"
done

echo
echo "Release ready:"
echo "$release_html_url"
