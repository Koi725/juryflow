# AGENTS.md

Conventions for anyone (human or tool) working in this repository.

## Project

JuryFlow manages university group projects per course edition, from proposal to jury grading and closing. See [README](README.md), [docs/architecture.md](docs/architecture.md) and [docs/domain.md](docs/domain.md).

## Repository layout

```
juryflow/
  server/      Spring Boot API (Java 21, Maven)
  client/      Next.js (static export) inside Electron for Windows - not scaffolded yet
  scripts/     dev-up.sh, dev-down.sh, test.sh
  docs/        architecture.md, domain.md
  docker-compose.yml  .env.example  README.md  AGENTS.md  CONTRIBUTING.md
```

## Server

Package by feature under `server/src/main/java/pt/ua/juryflow/`:

```
common/    config, security, error handling, shared base classes
auth/      AuthController, AuthService, AuthTokenRepository, AuthToken, dto/
user/      users, roles, current-user endpoint, admin bootstrap
edition/   courses and editions
```

Planned features, added in later batches: `project`, `deliverable`, `defence`, `grading`, `minutes`, `importer`.

Tests mirror the same feature folders under `server/src/test/java`. Unit tests are named `*Test`, integration tests `*IT`.

### Rules

- Small classes, one responsibility. Readable names. No clever tricks.
- Encapsulation: private fields, no setters unless needed; behaviour lives on the entity where it belongs. Entities are created through constructors or static factories that validate.
- Constructor injection only.
- DTOs (Java records) at the API boundary; entities are never exposed.
- Validate every input (`jakarta.validation` on DTOs, guards in domain code).
- Authorization is checked in the service layer, server-side (`AccessGuard`), never only in controllers or the client.
- The project workflow is an explicit state machine (enum + allowed transitions). Every transition writes a `project_event` row.
- Schema changes only through new Flyway migrations (`V<n>__description.sql`). Never edit an applied migration. Hibernate runs with `ddl-auto: validate`.
- Configuration through environment variables. No credentials in code or committed files.
- Errors: throw an `ApiException` subclass; `GlobalExceptionHandler` turns it into the standard JSON error.

### Testing

- Unit tests: JUnit 5 + Mockito, no Spring context.
- Integration tests: extend `PostgresIntegrationTest` (Testcontainers PostgreSQL, full context).
- Run everything with `./scripts/test.sh`.

## Client conventions (enforced once the client exists)

```
client/src/
  components/<feature>/   index.ts, <feature>.tsx, <feature>.test.tsx     e.g. components/home/
  data/<feature>/         <feature>-data.ts                                e.g. data/home/home-data.ts, data/navbar/navbar-data.ts
  types/<feature>/        <feature>-types.ts
  tailwind/components.css imports every file under tailwind/components/
  tailwind/components/<feature>/<feature>.css                              e.g. tailwind/components/navbar/navbar.css
  app/globals.css         imports tailwind/components.css
```

- No styles inside `.tsx` files beyond class names; component styles live in `tailwind/components/<feature>/`.
- No hardcoded content in components; it lives in `data/`.
- Each feature folder exposes its component through `index.ts`.

## Git

Commit style and branching are in [CONTRIBUTING.md](CONTRIBUTING.md). Commits are made by the maintainer, not by tooling.
