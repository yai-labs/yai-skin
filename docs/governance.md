# Governance

`yai-skin` follows a lightweight governance model: consistent with YAI repositories, but without runtime-law complexity.

## Scope

- This repository is a visual/design contract package.
- It is not a runtime/core repo.
- Governance focuses on quality, compatibility, and release discipline.

## Required artifacts

- `VERSION`
- `CHANGELOG.md`
- `VERSIONING.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/` templates and workflows

## Pull request requirements

- Use `.github/PULL_REQUEST_TEMPLATE.md`.
- Pass required checks (at minimum `CI`).
- Include evidence and commands run.
- Keep changes scoped and backward-compatible unless explicitly versioned as breaking.

## Ownership

- Code ownership is defined in `.github/CODEOWNERS`.
- Labels and issue templates are used as triage primitives, not bureaucracy.
