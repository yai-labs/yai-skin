# CI and Automation

`yai-skin` uses a lightweight but structured workflow set.

## Primary checks

- `CI`: install + lint + build + typecheck.
- `Package Smoke`: validates entrypoint/metadata and tarball content.
- `Release Guard`: validates tag/version, package consistency, and strict consumer pin alignment for release events.

## Governance checks

- `validate-pr-metadata`: validates mandatory PR metadata fields.
- `validate-changelog`: ensures changelog discipline on library-impacting changes.
- `pr-issue-enforcement`: requires issue linkage or explicit rationale.
- `auto-label-pr`: applies labels based on changed paths.

## Docs/structure checks

- `validate-architecture-alignment`
- `sync-architecture-alignment`
- `validate-traceability`
- `validate-runbook-adr-links` (adapted for local docs consistency)
- `validate-agent-pack`

## Pin alignment checks

- `validate-consumer-pins`: advisory check for pin lock/config changes.
- strict consumer pin enforcement runs in `Release Guard`.

## PR body generator

Use the same flow used in YAI repos to prefill PR body metadata.

```bash
npm run pr:body
```

This writes `.pr/PR_BODY.md` from `.github/PULL_REQUEST_TEMPLATE/default.md` and injects `Base-Commit` from `origin/main`.

To also update the open PR body automatically:

```bash
npm run pr:body:apply
```

Requires GitHub CLI authentication (`gh auth login`) and an open PR for the current branch.

## Required status checks suggestion

For branch protection on `main`, require at least:

1. `CI`
2. `validate-pr-metadata`
3. `Package Smoke`
