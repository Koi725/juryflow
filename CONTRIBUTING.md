# Contributing

## Branching

- `main` is always working and tested.
- Work on short-lived branches named `<type>/<short-topic>`, e.g. `feat/edition-crud`, `fix/token-expiry`, `docs/domain`.
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.
- Merge into `main` only when `./scripts/test.sh` passes.

## Commit messages

- One line, about five words, imperative mood: `Add edition service`.
- No body, no trailing period.
- One logical change per commit.

## Before you push

1. `./scripts/test.sh` is green.
2. No secrets in the diff (`.env` stays local).
3. New behaviour has tests; new inputs have validation.

Code conventions are in [AGENTS.md](AGENTS.md).
