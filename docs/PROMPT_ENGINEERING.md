# Prompt Engineering Control Parameters

This file captures the required working rules for this repository so all agents and contributors can follow a shared standard.

## Scope Rules

Apply these rules to any file type, including JavaScript, TypeScript, HTML, and CSS.

For large files (over 500 lines):

- Suggest splitting into smaller modules under 500 lines.
- Do not process or edit an entire large file at once.
- Focus only on the requested section.
- Summarize context instead of pasting full code.
- Break work into small, targeted changes to avoid loops.

## Quality and Safety Rules

- Enforce Prettier and ESLint once configured.
- Never introduce breaking changes.
- Keep code modular, clean, and documented.
- Prefer small PR-style changes.
- Maintain existing style and structure unless a task explicitly requires otherwise.

Before any edit:

1. Understand full context with high confidence.
2. Plan the minimum change.
3. Output focused diffs.
4. Run formatting and linting checks once toolchain is available.

Project rules:

- Consistent naming.
- No duplication.
- Error handling where needed.
- Tests when needed.
- Keep behavior functional and verify expected outcomes.

## Spelling and Terminology

- Use cSpell configuration to reduce unrecognized words.
- Keep project dictionary current as domain terms are added.

## Accessibility and Visual Quality

- Maintain strong contrast goals across themes.
- Validate text/background contrast whenever palette changes are made.
- Keep light and dark mode behavior aligned.

## TypeScript Direction

Long-term target is TypeScript-first implementation, including integration work for traxmate-lite via core-config `.ts` files.

Current repository status:

- TypeScript toolchain is not yet set up.
- Existing runtime code is currently in `index.js`.

## TypeScript Configuration Troubleshooting Reference

When TypeScript errors occur in VS Code:

1. Read full `tsconfig.json`.
2. Run local compile checks directly:
   - `./node_modules/.bin/tsc --noEmit`
3. Validate option relationships:
   - `moduleResolution: "node16"` requires `module: "Node16"`.
4. Handle deprecations by updating or removing old options.
5. Re-test immediately after changes.
6. Restart TypeScript server in VS Code if diagnostics persist.

Common defaults for modern Node projects:

- `module: "Node16"`
- `moduleResolution: "node16"`
- `target: "ES2020"` or later
- `noEmit: true` for type-check-only workflows

Verification checklist:

- Command-line type check passes.
- VS Code shows no TypeScript diagnostics.
- Project build succeeds.

## Commit and Push Control

- Ask for confirmation before any commit.
- Ask for confirmation before any push.
- Preserve rollback options during active change cycles.

## Documentation Maintenance

- Keep `docs/CHANGELOG.md` updated when prompts cause meaningful repo changes.
- Use this file as the single source of truth for prompt-level engineering constraints.