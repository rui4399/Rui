---
name: codex-desktop-runtime-maintenance
description: Use when a Codex-style desktop runtime, CLI, local tool layer, sandbox, logs database, local proxy, or UI extension system appears degraded, disconnected, stuck, in safe mode, missing tools, returning misleading health checks, or requiring repair without losing local state.
---

# Codex Desktop Runtime Maintenance

## Overview

Use this skill to maintain a local Codex-style desktop runtime as a layered system. The core rule is: identify which layer is broken before restarting or rewriting configuration.

## Runtime Layers

Check layers in this order:

1. Desktop process and UI extension host
2. CLI/runtime process
3. configuration file and feature flags
4. tool cache and skill discovery
5. sandbox configuration
6. local databases and logs
7. local proxy/provider routing
8. MCP servers and OAuth state

Do not treat one green health check as whole-system health.

## Diagnostic Workflow

1. Snapshot current state:
   - current branch or working tree if inside a repo
   - runtime config
   - extension list
   - latest logs
2. Verify process state before trusting lock files or UI status.
3. Run readonly checks first.
4. Compare failed checks against recent logs.
5. Make the smallest repair that matches the failing layer.
6. Re-run the same check that proved the failure.

## Known Failure Patterns

| Symptom | Likely Layer | First Check |
| --- | --- | --- |
| safe mode enabled | UI extension host | status/doctor plus extension logs |
| tool UI hidden | UI/auth mode mismatch | local tool cache and current tools |
| tools missing this turn | session hot-load state | local skill fallback |
| sandbox setup refresh fails | Windows sandbox config | sandbox log and config setting |
| logs database corrupt | local state DB | readonly integrity check |
| health probe says 404 | local proxy | actual API endpoint and response shape |
| HTTP 200 but unusable | provider/proxy | validate JSON, not status only |

## Repair Rules

- Back up configuration before editing.
- Preserve generated MCP blocks unless the owning tool wrote them.
- Do not delete locked databases while the desktop app is running.
- Do not use diagnostics known to rewrite config unless a backup exists.
- Treat UI reload, extension hot-load, and full app restart as different operations.
- Ask before switching live providers, deleting state, or using credentials.

## tool And Skill Recovery

If tool tools are unavailable:

1. Check whether the tool exists in cache.
2. Check whether its skill exists locally.
3. Validate skill metadata.
4. Route through the local skill if the native tool is not hot-loaded.
5. Restart only when session state is the blocker.

If a skill is skipped, inspect frontmatter first. Long or malformed descriptions can make otherwise valid skill content unreachable.

## Local Proxy Checks

For OpenAI-compatible local proxies:

- probe the endpoint the runtime actually uses
- inspect recent proxy request logs when available
- treat `/v1/models` 404 as inconclusive
- reject HTML responses on OpenAI API paths even if status is 200
- distinguish provider failure from runtime failure

## Completion Criteria

Finish when:

- the failing layer is identified with logs or a readonly check
- the repair is applied and the original check passes
- a local skill fallback lets work continue
- or the remaining action requires restart, credentials, admin privilege, or live provider changes

