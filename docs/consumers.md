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

## Current consumers

- `yai-yx` (via submodule path `ui/src/skin`)
- `site` (via submodule path `src/skin`)
