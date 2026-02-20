# Consumer Pin Alignment

`yai-skin` tracks consumer pin alignment using `pins/consumers.lock.json`.

## Purpose

- Keep `site` and `yai-yx` aligned to the expected `yai-skin` commit.
- Provide strict pre-release validation in this repo.
- Keep future integration ready for `yai-cli` without forcing it now.

## Lock file

`pins/consumers.lock.json` declares each consumer repository:

- `repo`: consumer git URL.
- `branch`: branch checked for pin (default `main`).
- `submodulePath`: path where `yai-skin` is pinned as gitlink.
- `enabled`: when `false`, consumer is ignored.

## Commands

Advisory check (never fails pipeline):

```bash
npm run pins:check
```

Strict check (fails on mismatch):

```bash
npm run pins:check:strict
```

## Env overrides

- `STRICT_CONSUMER_PINS=1`: strict mode.
- `YAI_SKIN_EXPECTED_SHA=<40-char-sha>`: expected pin SHA override.
- `CONSUMER_PINS_FILE=<path>`: alternate lock file.

## Release policy

- Release guard runs strict consumer pin check on tag/manual release jobs.
- If mismatched, the script prints a fix plan for each consumer repo.
