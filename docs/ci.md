# CI and Automation

`yai-skin` uses a lightweight but structured workflow set.

## Primary checks

- `CI`: install + lint + build + typecheck.
- `Package Smoke`: validates entrypoint/metadata and tarball content.
- `Release Guard`: validates tag/version and package consistency for releases.

## Governance checks

- `validate-pr-metadata`: validates mandatory PR metadata fields.
- `validate-changelog`: ensures changelog discipline on library-impacting changes.
- `pr-issue-enforcement`: requires issue linkage or explicit rationale.
- `auto-label-pr`: applies labels based on changed paths.

## Docs/structure checks

- `validate-architecture-alignment`
- `validate-traceability`
- `validate-runbook-adr-links` (adapted for local docs consistency)
- `validate-agent-pack`

## Required status checks suggestion

For branch protection on `main`, require at least:

1. `CI`
2. `validate-pr-metadata`
3. `Package Smoke`
