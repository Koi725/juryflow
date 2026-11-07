# Architecture

## Overview

```
Electron app (Windows)                    Docker Compose
  Next.js static export  ── HTTPS/JSON ─►  server (Spring Boot, :8080) ──► PostgreSQL (:5432)
```

- The client is a static Next.js export running inside Electron (pending confirmation). It talks to the server only through the JSON API.
- The server owns all rules and all authorization. The client never decides who may do what.
- PostgreSQL is the only state. The schema is managed by Flyway.

## Server layers

Each feature package contains its own layers:

```
Controller  ── HTTP, validation (@Valid), maps DTOs
   │
Service     ── use cases, authorization (AccessGuard), transactions
   │
Entity / Repository ── domain behaviour, persistence (Spring Data JPA)
```

- Controllers never touch repositories or entities.
- DTOs are records at the boundary; entities are never serialized.
- `common/` holds cross-cutting code: configuration, security wiring, error handling, base classes.

## Authentication flow

Opaque bearer tokens, no sessions.

1. **Login** - `POST /api/auth/login` with username and password. The service loads the active user and checks the BCrypt hash. Unknown user, wrong password and inactive user all return the same `401` message.
2. **Token issue** - 32 random bytes (`SecureRandom`), Base64url encoded, returned once to the client. Only the SHA-256 hash is stored in `auth_tokens`, with `user_id`, `expires_at` and `revoked`. Lifetime is `TOKEN_TTL` (default 8h).
3. **Request** - the client sends `Authorization: Bearer <token>`. `BearerTokenFilter` hashes the value and asks `AuthService.authenticate`, which accepts the token only if it exists, is not revoked, is not expired and its user is active. The result (`AuthenticatedUser`: id, username, role, admin flag, token id) is put in the security context.
4. **Authorization** - the filter chain requires authentication for everything except login. Role and admin checks happen in services through `AccessGuard`.
5. **Logout** - `POST /api/auth/logout` marks the caller's token as revoked.

Unauthenticated requests get `401`, forbidden ones `403`, both with the standard JSON error body.

## Error format

```json
{
  "timestamp": "2026-03-01T09:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/auth/login",
  "fieldErrors": [{ "field": "username", "message": "must not be blank" }]
}
```

Unexpected errors return a generic `500` message; details go to the server log only.

## Bootstrap

On startup, if there are no users and `ADMIN_USERNAME` / `ADMIN_PASSWORD` are set, an admin professor is created. Otherwise nothing happens.

## Deployment (dev)

`docker-compose.yml` runs PostgreSQL (named volume, healthcheck) and the server (multi-stage image, non-root user) which starts only when the database is healthy.
