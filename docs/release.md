# Release

Release flow (lightweight):

1. Update `VERSION`.
2. Update `package.json` version.
3. Add release notes to `CHANGELOG.md`.
4. Commit and tag: `vX.Y.Z`.
5. Push branch and tags.
6. Publish package when npm publishing is enabled.
