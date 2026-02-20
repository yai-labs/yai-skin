## IDs
- Issue-ID: N/A
- Issue-Reason (required if N/A): governance/docs alignment without tracked issue
- Change-Type: chore
- SemVer-Impact: none
- Risk-Level: low
- Base-Commit: <40-char-sha>

## Issue linkage
- Closes-Issue: N/A

## Objective
Align yai-skin governance/docs/workflows with YAI baseline while preserving CSS public contract.

## Evidence
- Positive:
  - CI/workflow checks executed on this PR branch.
- Negative:
  - No runtime behavior changes expected for consumers.

## Commands run
```bash
npm ci
npm run lint
npm run build
npm run typecheck
npm run pack:check
```

## Checklist
- [ ] Evidence provided
- [ ] Commands listed
- [ ] Linked issue or N/A with explicit reason
- [ ] index.css remains the only public entrypoint
