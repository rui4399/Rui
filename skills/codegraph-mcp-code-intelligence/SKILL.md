---
name: codegraph-mcp-code-intelligence
description: Use when a codebase needs local-first symbol search, dependency impact analysis, affected-test discovery, or task-focused context packs through CodeGraph CLI or MCP before editing.
---

# CodeGraph MCP Code Intelligence

## Purpose

Use CodeGraph as a local code-intelligence layer before changing a nontrivial repository. The skill is for repo triage, symbol discovery, call/dependency impact, affected-test selection, and compact context building.

## Input

- repository path
- task or suspected bug
- symbols, files, modules, or failing tests if known
- whether CodeGraph is already initialized in that repository
- available validation command, test runner, or review target

## Workflow

1. Verify the tool is available with `codegraph --version` and that Codex has a `codegraph` MCP server configured when MCP access is expected.
2. Inspect repository trust and ignore rules before creating any index files. If `.codegraph/` would be created, keep it uncommitted unless the project explicitly tracks it.
3. Initialize or refresh the index only for the target repository: `codegraph init -i <path>`, `codegraph index <path>`, or `codegraph sync <path>`.
4. Use query commands to map the task before broad file reading:
   - `codegraph query "<symbol-or-term>" --path <path> --json`
   - `codegraph context "<task>" --path <path> --format markdown`
   - `codegraph callers "<symbol>" --path <path>`
   - `codegraph callees "<symbol>" --path <path>`
   - `codegraph impact "<symbol>" --path <path>`
   - `codegraph affected --path <path> <changed-files>`
5. Cross-check CodeGraph output against direct file reads before editing. Treat it as an index, not an authority.
6. Patch the smallest owning layer and run the selected validation or affected tests.
7. If CodeGraph changes the work plan, record which query changed the plan and what evidence confirmed it.

## Tool Routing

- `codegraph`: symbol search, context packs, callers, callees, impact, affected tests.
- `filesystem`: confirm exact code, apply edits, inspect generated `.codegraph/` state.
- `git`: identify changed files, avoid committing local indexes, review diffs.
- `python` or `node`: run project-specific tests, parsers, or build checks.
- `browser`: only for UI code where the indexed change affects visible behavior.

## Constraints

- Do not commit `.codegraph/` artifacts unless the repository owner explicitly wants them tracked.
- Do not run indexing across a home directory, secrets directory, or unrelated monorepo root.
- Do not paste large indexed context into public docs; summarize the reasoning path.
- Do not trust impact output without checking the source files and tests it names.
- Do not use CodeGraph results as permission to skip normal test/build verification.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| `codegraph` command missing | install the CLI or use direct ripgrep/file inspection |
| MCP server configured but unavailable in-session | restart or reload the agent session; use CLI commands meanwhile |
| index is stale | run `codegraph sync <path>` or `codegraph index --force <path>` |
| stale lock blocks indexing | inspect whether a process is active, then use `codegraph unlock <path>` only for stale locks |
| query returns weak results | narrow to file names, exported symbols, route names, or test names and cross-check with `rg` |
| affected tests are incomplete | combine `codegraph affected` with package scripts, changed-file review, and known test topology |

## Examples

### Refactor Impact Pass

Input: change request for a shared helper.

Expected flow:

1. query the helper symbol
2. inspect callers and callees
3. generate a task context pack
4. edit the helper and closest callers
5. run affected tests plus one broader smoke test

### Bug Triage Pass

Input: failing behavior with a named route or component.

Expected flow:

1. query the route/component name
2. inspect context output for owning files
3. read the relevant files directly
4. patch the smallest bug
5. validate with the failing test or UI reproduction

## Evaluation

The skill succeeds when CodeGraph either narrows the search space or proves it is not useful for the task, the final edit is backed by direct file evidence, affected validation is run or explicitly scoped, and no index or private context artifact is accidentally published.
