#!/usr/bin/env bash
# Run unit + integration tests (integration tests start PostgreSQL via Testcontainers, so Docker must be running).
# Uses the local JDK 21 if there is one; otherwise runs Maven inside a Docker container.
set -euo pipefail
cd "$(dirname "$0")/../server"

if java -version >/dev/null 2>&1; then
  ./mvnw -B verify "$@"
else
  docker run --rm \
    -v "$PWD":/app -w /app \
    -v juryflow-m2:/root/.m2 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e TESTCONTAINERS_HOST_OVERRIDE=host.docker.internal \
    maven:3.9-eclipse-temurin-21 mvn -B verify "$@"
fi
