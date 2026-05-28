# Tool Routing

Skills declare preferred tool classes in `registry/index.json`. The declaration is advisory; the agent must still inspect the active environment before using a tool.

## Tool Classes

- `filesystem`: local reads, edits, validation, and artifact inspection.
- `python`: structured parsing, symbolic checks, benchmarks, and image/data validation.
- `browser`: local web app inspection, screenshots, interactions, and viewport checks.
- `latex`: TeX compilation, proof formatting, and document validation.
- `github`: repository operations; use only within authorized scope.
- `mcp`: structured external tools that may require fresh OAuth/session state.
- `codegraph`: local code-intelligence index for symbol search, context packs, callers, callees, impact, and affected-test discovery.
- `wechat`: local bridge delivery for media/files/status when explicitly requested.

## Routing Rules

- Prefer read-only inspection before edits.
- Use deterministic tools for validation when possible.
- Treat code indexes as search accelerators; verify the named files directly before editing.
- Treat credentials, paid APIs, live services, and destructive operations as high risk.
- Record fallback behavior when the preferred tool is unavailable.
