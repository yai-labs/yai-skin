# yai-skin

Lightweight CSS design-system repository for YAI visual surfaces.

## Scope

`yai-skin` provides shared styling primitives and themes for consumers such as `yai-yx` and `site`.
It is intentionally lightweight: governance-consistent, but not a core/runtime repository.

## Structure

- `tokens/`: color, spacing, typography, theme tokens
- `base/`: reset and layout primitives
- `components/`: reusable component styles
- `icons/`: brand assets and icon generation helper
- `shaders/`: optional visual extras
- `index.css`: single public entrypoint

## Public API

Import only:

```css
@import "@yai-labs/yai-skin/index.css";
```

Do not import internal layer files directly from consumers.

## Docs

See:

- `docs/architecture.md`
- `docs/release.md`

## License

MIT (`LICENSE`).
