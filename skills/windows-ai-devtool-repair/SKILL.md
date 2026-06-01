---
name: windows-ai-devtool-repair
description: Use when repairing Windows AI development environments where Python, Conda, Node, npm workspaces, PowerShell encoding, Android builds, local proxies, or desktop app runtimes fail in noisy or misleading ways.
---

# Windows AI Devtool Repair

## Overview

Use this skill when a Windows AI/devtool stack breaks with noisy secondary errors. The rule is: separate the requested command result from shell startup/shutdown noise, then repair the narrowest broken layer.

## Triage Order

1. Capture the exact command, shell, working directory, and exit code.
2. Decide whether the error came from:
   - the requested tool
   - shell profile startup/shutdown
   - Python/Conda environment initialization
   - Node/npm dependency layout
   - Windows path or encoding behavior
   - local proxy/provider response shape
   - admin-only OS operation
3. Reproduce with a minimal command in a clean shell when possible.
4. Repair the layer that owns the failure.
5. Re-run the original command.

## Python And Conda

If PowerShell prints Python fatal errors after unrelated commands, do not assume the command failed. Check the real exit code and whether the task actually used Python.

For corrupted Conda package caches:

- prefer deleting the corrupted extracted package directory
- then force-reinstall the package
- avoid deleting the whole base environment first
- use `PYTHONNOUSERSITE=1` for project environments when user-site packages pollute imports

For pytest failures caused by globally auto-loaded packages, try:

```powershell
$env:PYTEST_DISABLE_tool_AUTOLOAD = "1"
python -m pytest -q
```

Use UTF-8 output settings when package metadata contains non-ASCII text:

```powershell
$env:PYTHONIOENCODING = "utf-8"
```

## Node And npm

If many runtime packages suddenly disappear after installing one missing package into a shared runtime prefix, suspect npm pruning.

Safer pattern:

- install task dependencies in a workspace-local `node_modules`
- or install the full required package set into the shared prefix together
- avoid patching one dependency at a time into bundled runtimes

For npm workspaces with many missing files, do not chase files individually. Remove the generated `node_modules` tree and reinstall from lockfile or workspace root.

## PowerShell 5.1 Encoding

Maintenance scripts that run under Windows PowerShell 5.1 must be parse-safe there, not only in PowerShell 7.

Rules:

- save scripts with UTF-8 BOM if they contain non-ASCII text
- prefer ASCII markers for patch detection
- validate with Windows PowerShell 5.1 parser
- keep long JavaScript snippets in here-strings or external files
- avoid reserved variable names such as `$pid`

## Android And Windows Paths

When Android or Gradle builds fail under non-ASCII paths:

1. Copy or mirror the project to an ASCII shadow build path.
2. Use a supported JDK version for the Gradle/Android toolchain combination.
3. Set `ANDROID_HOME` and `ANDROID_SDK_ROOT` explicitly.
4. If dependency TLS fails but SDK tools work, consider a minimal manual build path for small native projects.

## Local Proxy Diagnostics

Validate response shape, not only status code:

- HTTP 200 with HTML is not an OpenAI-compatible JSON response.
- `GET /models` returning 404 may be acceptable for a proxy that only supports `POST /responses`.
- Image generation requires probing the actual image-capable upstream, not just a provider name.

## Completion Criteria

Finish when:

- the original command succeeds
- the broken layer is identified with a minimal reproduction
- a safer workaround is documented
- or the remaining step needs admin privileges, credentials, network recovery, or app restart

