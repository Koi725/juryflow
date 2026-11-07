#!/usr/bin/env bash
# Start the dev stack (PostgreSQL + server). Requires a filled-in .env at the repo root.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Missing .env - run: cp .env.example .env  (then fill in the values)" >&2
  exit 1
fi

docker compose up --build -d
echo "Server: http://localhost:${SERVER_PORT:-8080}  (logs: docker compose logs -f server)"
