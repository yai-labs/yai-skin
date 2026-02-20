# yai-skin

Lightweight CSS design-system for YAI frontend surfaces.

`yai-skin` provides shared visual primitives for consumer repos (for example `yai-yx` and `site`) while keeping governance coherent and intentionally minimal.

## Public API

Import only the single entrypoint:

```css
@import "@yai-labs/yai-skin/index.css";
```

Direct imports from internal folders are not part of the public contract.

## Repository structure

- `tokens/`: color, spacing, typography, and theme tokens
- `base/`: reset and structural layer
- `components/`: reusable component styles
- `icons/`: source icon assets + generator helper
- `shaders/`: optional visual effect assets
- `docs/`: architecture and release documentation
- `index.css`: single public entrypoint

## Layering policy

Entrypoint import order is fixed:

1. reset
2. tokens
3. base
4. components
5. themes
6. utilities

## Versioning and release

- SemVer: see `VERSIONING.md`
- Current version: `VERSION`
- Change history: `CHANGELOG.md`
- Release flow: `docs/release.md`

## Governance

- Contribution process: `CONTRIBUTING.md`
- Security reporting: `SECURITY.md`
- Community expectations: `CODE_OF_CONDUCT.md`

## License

MIT (`LICENSE`).
