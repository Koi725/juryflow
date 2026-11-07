#!/usr/bin/env bash
# Stop the dev stack. Pass --volumes to also delete the database data.
set -euo pipefail
cd "$(dirname "$0")/.."

docker compose down "$@"
