# Architecture

`yai-skin` is a CSS design-system package with a single public entrypoint and layered internals.

## Goals

- Provide a stable visual contract across YAI frontend surfaces.
- Keep repository governance light and maintainable.
- Avoid runtime/tooling complexity.

## Directory model

- `tokens/`: canonical design tokens.
- `base/`: reset and structural primitives.
- `components/`: reusable component-level styles.
- `icons/`: source icon assets and generation helpers.
- `shaders/`: optional visual effect assets.
- `index.css`: only supported public import.

## Public contract

Consumers should import only:

```css
@import "@yai-labs/yai-skin/index.css";
```

Direct imports from internal layer files are unsupported and can break across releases.

## Import order policy

`index.css` must keep this order:

1. reset
2. tokens
3. base
4. components
5. themes
6. utilities

This keeps token resolution deterministic and avoids override ambiguity.

## Compatibility expectations

- Token additions: minor release.
- Token removals/renames: major release.
- Bugfix-only style adjustments: patch release.
