# JuryFlow

Project workflow and jury management system for university group projects.

A project goes through: proposal, evaluation, supervisor assignment, intermediate deliverables, final submission, defence in front of a jury, per-criterion scoring, individual final grades, jury minutes (PDF) and closing. Every action is kept in an audit history. Editions (course + academic year) are isolated but comparable.

Roles are `STUDENT` and `PROFESSOR` (admin is a flag on a professor). Supervisor and jury member are assignments on a project, not roles.

## Status

Backend foundation: Spring Boot server, PostgreSQL schema, token authentication, error handling, tests. The client (Next.js in Electron) is not started yet.

## Repository layout

| Path | Content |
| --- | --- |
| `server/` | Spring Boot API (Java 21, Maven) |
| `client/` | Reserved for the Next.js + Electron client |
| `scripts/` | Dev helpers: `dev-up.sh`, `dev-down.sh`, `test.sh` |
| `docs/` | Architecture and domain documentation |

## Quickstart

Requirements: Docker (with Compose).

```bash
cp .env.example .env     # fill in POSTGRES_PASSWORD, ADMIN_USERNAME, ADMIN_PASSWORD
./scripts/dev-up.sh      # builds the server image and starts PostgreSQL + server
```

The server listens on `http://localhost:8080`. On first start, if the `users` table is empty and `ADMIN_USERNAME` / `ADMIN_PASSWORD` are set, an admin professor is created.

```bash
curl -s -X POST localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"<ADMIN_USERNAME>","password":"<ADMIN_PASSWORD>"}'

curl -s localhost:8080/api/me -H 'Authorization: Bearer <token>'
```

Stop with `./scripts/dev-down.sh` (add `--volumes` to also delete the database).

## API (current)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | none | Returns a bearer token and the user |
| POST | `/api/auth/logout` | bearer | Revokes the current token |
| GET | `/api/me` | bearer | Current user |

Errors are always JSON: `{timestamp, status, error, message, path, fieldErrors}`.

## Tests

```bash
./scripts/test.sh
```

Runs unit tests (JUnit 5 + Mockito) and integration tests (Testcontainers PostgreSQL). Docker must be running. With a local JDK 21 it uses `server/mvnw`; without one it runs Maven in a container.

Directly with Maven: `cd server && ./mvnw test` (unit only) or `./mvnw verify` (unit + integration).

## Documentation

- [Architecture](docs/architecture.md)
- [Domain](docs/domain.md)
- [Agent / contributor conventions](AGENTS.md)
- [Contributing](CONTRIBUTING.md)
