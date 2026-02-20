# Release

Lightweight release flow for `yai-skin`.

## Checklist

1. Update `VERSION`.
2. Update `package.json` version.
3. Add release notes in `CHANGELOG.md`.
4. Verify `index.css` import order policy is unchanged (or documented).
5. Commit on a feature branch and open PR.
6. After merge, tag `vX.Y.Z` and push tags.
7. Publish to npm only when packaging is enabled.

## Commands

```bash
git checkout -b chore/release-vX.Y.Z
# apply version/changelog updates
git add VERSION package.json CHANGELOG.md
git commit -m "chore(release): vX.Y.Z"
git push -u origin chore/release-vX.Y.Z
```

After merge on `main`:

```bash
git checkout main
git pull origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```
