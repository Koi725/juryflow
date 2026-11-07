#!/usr/bin/env bash
# Build the low-fidelity prototype and save a PNG of every screen to
# prototypes/low-fidelity/screenshots/ (Playwright, Chromium).
set -euo pipefail
cd "$(dirname "$0")/../prototypes/low-fidelity"

PORT="${PORT:-4173}"

[ -d node_modules ] || npm ci
npx playwright install chromium
npm run build

# Serve the static export in the background and always stop it on exit.
npx serve out -l "$PORT" >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -s -o /dev/null "http://localhost:$PORT/" && break
  sleep 1
done

BASE_URL="http://localhost:$PORT" node scripts/capture.mjs
