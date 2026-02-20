# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes focused and minimal.
3. Update `CHANGELOG.md` and version files when applicable.
4. Open a PR with a clear summary and impact notes.

## Contribution rules

- `index.css` is the only public entrypoint.
- Keep layering coherent: tokens/base/components/themes/utilities.
- Avoid introducing runtime/tooling complexity in this repo.

## Release-facing changes

For versioned changes, update:

- `VERSION`
- `package.json` `version`
- `CHANGELOG.md`
