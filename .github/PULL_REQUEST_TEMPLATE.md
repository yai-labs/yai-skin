## Context

## What Changed

## Why

## Verification
- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run typecheck`
- [ ] `npm run pack:check`

### Commands Run
```bash
# paste commands here
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
