---
name: codex-config-drift-recovery
description: Use when a Codex-style configuration appears thinned, rewritten, missing provider or MCP blocks, reset to authentication defaults, changed after a diagnostic command, or inconsistent with the runtime behavior users expect.
---

# Codex Config Drift Recovery

## Overview

Use this skill when local configuration may have drifted from the working baseline. The rule is: classify config loss before rerunning diagnostics that may rewrite the file again.

## Drift Signals

- provider routing disappears
- provider or MCP sections are missing
- local feature flags reset
- authentication requirement flips unexpectedly
- sandbox mode changes without intent
- diagnostic output disagrees with known working behavior
- config is much shorter than previous backups or expected shape

## Recovery Workflow

1. Stop and snapshot the current config.
2. Find the nearest known-good backup or exported baseline.
3. Diff by sections, not only by whole-file size.
4. Identify which tool last wrote the file if logs are available.
5. Restore only the missing or corrupted sections.
6. Preserve generated blocks owned by active tools.
7. Re-run a read-only or low-risk verification that does not rewrite config.

## Section Checklist

Check for expected layers:

- model and provider routing
- feature flags
- tool discovery or dispatcher configuration
- MCP server definitions
- memory or profile paths
- Windows sandbox settings
- local proxy base URL
- generated managed blocks

## Verification

A restored config is not verified by file presence alone. Verify through:

- a runtime status command that does not mutate config
- actual model request through the configured route
- tool or skill visibility in the current session
- MCP server list or a read-only MCP action
- sandbox setup logs if sandbox behavior changed

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Running the same mutating diagnostic again | Back up and use read-only checks |
| Replacing the whole file from memory | Restore from a known-good baseline |
| Deleting generated MCP blocks | Preserve owner-managed sections |
| Trusting a generic provider probe | Test the configured caller path |

## Completion Criteria

Finish when:

- config drift is explained by section
- a backup or current snapshot exists
- restored sections match the intended local stack
- verification proves runtime behavior, not only file shape
