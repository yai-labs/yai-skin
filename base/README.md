# Base Layer

Base layer styles provide foundational behavior shared by all themes and components.

## Files

- `reset.css`: CSS normalization and baseline reset.
- `layout.css`: shell/container layout primitives.
- `topbar.css`: topbar structural styling.
- `utilities.css`: utility classes loaded last.

## Rules

- Keep base styles generic and theme-agnostic.
- Avoid component-specific selectors in this layer.
- `utilities.css` must remain last in `index.css` import order.
