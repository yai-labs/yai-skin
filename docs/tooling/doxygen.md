# Doxygen for a CSS Repository

Short answer: Doxygen is optional here and usually not the best default for `yai-skin`.

## Should we use Doxygen in `yai-skin`?

- For CSS libraries, Doxygen has limited native value.
- Markdown docs + CI validation are generally enough.
- Keep Doxygen only if you need a unified docs publishing pattern across YAI repos.

## If you still want to use it

You can make Doxygen parse Markdown and treat CSS as plain text via a filter.

### Minimal approach

1. Use Markdown (`README.md`, `docs/*.md`) as the main source.
2. Configure Doxygen `INPUT` to include `docs/` and root docs.
3. Optionally include `*.css` as inputs for reference only.

### CSS notes

- Doxygen does not understand CSS semantics deeply.
- Document CSS contract in Markdown, not in CSS comments only.
- Use `index.css` and docs pages as canonical contract sources.

## Recommendation for this repo

- Keep the current lightweight docs workflow.
- Use GitHub Pages workflow for docs index publishing.
- Add Doxygen only if there is a concrete cross-repo documentation need.
