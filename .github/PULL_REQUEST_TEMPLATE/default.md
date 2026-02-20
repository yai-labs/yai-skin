## IDs
- Issue-ID: #<issue-number-or-N/A>
- Issue-Reason (required if N/A): <required when Issue-ID is N/A>
- Change-Type: <feat|fix|docs|chore|refactor|ci>
- SemVer-Impact: <none|patch|minor|major>
- Risk-Level: <low|medium|high>
- Base-Commit: <40-char-sha>

## Issue linkage
- Closes-Issue: Closes #<issue-number> OR N/A

## Objective
<one paragraph>

## Evidence
- Positive:
  - <case 1>
- Negative:
  - <case 1>

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
