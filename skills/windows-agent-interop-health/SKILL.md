---
name: windows-agent-interop-health
description: Use when diagnosing local AI agent failures across Windows, WSL, PowerShell, Node, Python, desktop apps, background bridges, or mixed Windows/Linux toolchains where health checks, process state, path resolution, or interop boundaries may be misleading.
---

# Windows Agent Interop Health

## Overview

Use this skill to diagnose local agent stacks that cross Windows, WSL, desktop apps, background services, and CLI tools. The core rule is: verify the real runtime boundary before repairing the tool that appears broken.

## Core Workflow

1. Classify the failing boundary: Windows-only, WSL-only, Windows-to-WSL, desktop-to-CLI, CLI-to-local-proxy, or bridge-to-chat-platform.
2. Capture the visible symptom and the authoritative state source:
   - process table for running services
   - endpoint or lock files for bridges
   - app logs for desktop/runtime failures
   - command exit code plus stderr for CLIs
3. Re-run a minimal health check from the same shell family that owns the failing process.
4. If the result conflicts with another shell, diagnose path resolution and environment inheritance first.
5. Patch or restart only after the failed layer is identified.
6. Write the check into a reusable script when the same failure appears twice.

## WSL Resolution Rules

On Windows, `wsl.exe` can resolve through a shim or a process bitness view that sees a different world than the user expects. Health checks should try WSL in this order:

1. `%WINDIR%\Sysnative\wsl.exe`
2. `%WINDIR%\System32\wsl.exe`
3. `wsl.exe` from `PATH`

Use `Sysnative` when a 32-bit host process needs the real 64-bit `System32`.

Check both command availability and WSL runtime state:

```powershell
& "$env:WINDIR\Sysnative\wsl.exe" --list --verbose
& "$env:WINDIR\Sysnative\wsl.exe" --exec sh -lc 'test -n "$WSL_INTEROP" && echo WSL_INTEROP=ok'
```

Do not mix Windows `node_modules` into Linux execution trees. If a command runs in WSL, install Linux dependencies there or call the Windows command from PowerShell.

## Background Bridge Checks

Treat lock files as hints, not truth. A bridge may leave a stale lock after its process exits.

Check in this order:

1. Is the owning process alive?
2. Does the endpoint file exist and have a recent `startedAt` or equivalent timestamp?
3. Do recent logs show inbound activity?
4. Is the endpoint idle, busy, awaiting approval, or absent?
5. Did the runtime load the code version you just changed?

If the endpoint is green but inbound logs are stale, restart the full input path rather than only the model runtime.

## Local Proxy Checks

Local model proxies may return misleading results:

- `GET /v1/models` can be unsupported even when `POST /v1/responses` works.
- `POST /v1/chat/completions` may return HTTP 200 with HTML, not model JSON.
- A provider named for an image model may still route to a text-only upstream.

Probe with the exact API surface the agent uses and validate response shape, not only HTTP status.

## Common Misdiagnoses

| Symptom | Better First Check |
| --- | --- |
| WSL says no distro | Resolve `Sysnative\wsl.exe` and compare from a normal terminal |
| Bridge lock exists | Verify owning process and endpoint freshness |
| Upload succeeded but user saw nothing | Check final send stage, not only CDN/upload logs |
| Tool unavailable | Check current session tools and local tool manifests before restarting |
| Proxy is healthy | Probe the actual endpoint and parse JSON shape |

## Completion Criteria

Finish when one is true:

- the failing boundary is identified with a concrete log, process, or probe result
- a restart or patch is applied and the endpoint/command is verified healthy
- the remaining action requires credentials, admin privileges, spending money, or a live-service change

