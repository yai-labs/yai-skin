# Consumer Contract

This document defines how downstream repositories should consume `yai-skin`.

## Public import

Use only:

```css
@import "@yai-labs/yai-skin/index.css";
```

Do not import internal files from `base/`, `components/`, `tokens/` directly.

## SemVer expectations

- `patch`: visual fixes without contract breaks.
- `minor`: additive tokens/components/themes.
- `major`: breaking token or selector contract changes.

## Sync model

- Consumers pin a commit/tag (or package version).
- Upgrades are explicit and validated in the consumer repo.
- Producer-side lock for alignment lives in `pins/consumers.lock.json`.

## Current consumers

- `yai-yx` (submodule `ui/src/skin`)
- `site` (submodule `src/skin`)

## Pin validation

From `yai-skin` run:

```bash
npm run pins:check
```

For release-level enforcement:

```bash
npm run pins:check:strict
```
