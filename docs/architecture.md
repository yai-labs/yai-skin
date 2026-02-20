# Architecture

`yai-skin` is a CSS design-system package with layered composition.

## Layers

- `tokens/`: design tokens (color, spacing, typography, themes).
- `base/`: reset and structural primitives.
- `components/`: reusable UI component styles.
- `themes/`: theme variants under `tokens/themes/`.

## Public entrypoint

`index.css` is the only public entrypoint.
Consumers should import only `index.css`.

## Import order policy

Recommended and enforced ordering in `index.css`:

1. reset
2. tokens
3. base
4. components
5. themes
6. utilities
