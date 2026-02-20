## Context

Issue-ID: #<number or N/A>
Issue-Reason: <required if Issue-ID is N/A>
Change-Type: <feat|fix|docs|chore|refactor|ci>
SemVer-Impact: <none|patch|minor|major>
Risk-Level: <low|medium|high>

## What Changed

## Why

## Evidence
- Positive:
- Negative:

## Commands run
```bash
npm ci
npm run lint
npm run build
npm run typecheck
npm run pack:check
```

## Package Contract Alignment
- [ ] `index.css` remains the only public entrypoint
- [ ] Import order policy respected (reset > tokens > base > components > themes > utilities)
- [ ] `VERSION` / `package.json` / `CHANGELOG.md` updated if release-facing

## Risk / Rollback

## Checklist
- [ ] No secrets committed
- [ ] No generated artifacts committed (e.g. `*.tgz`)
- [ ] Docs updated if behavior changed
