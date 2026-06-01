---
name: windows-shell-encoding-hygiene
description: Use when Windows PowerShell, Python, Node, pytest, pip, or maintenance scripts behave differently across shells, emit Unicode errors, misread UTF-8 files, produce profile noise, or fail before the target command actually runs.
---

# Windows Shell Encoding Hygiene

## Overview

Use this skill when command output is polluted by shell startup, encoding, or global environment drift. The rule is: prove whether the target command failed or the shell around it failed.

## Failure Signatures

| Symptom | Likely Cause |
| --- | --- |
| `UnicodeDecodeError` reading Markdown | default GBK decode |
| `UnicodeEncodeError` printing package metadata | console output encoding |
| PowerShell 5.1 parses script incorrectly | UTF-8 without BOM plus non-ASCII |
| command succeeds then Python error appears | shell profile noise |
| pytest fails before collection | global package autoload |
| `ModuleNotFoundError` from unrelated package | wrong interpreter or polluted env |

## Workflow

1. Separate shell startup output from the command's own stdout and stderr.
2. Run a minimal version check for the interpreter actually used.
3. Re-run with explicit UTF-8 where text files contain non-ASCII.
4. Disable unrelated package autoload when testing project code.
5. Prefer project-local or bundled runtimes over damaged global installs.
6. Record the shell and interpreter used in the verification result.

## Practical Checks

Use these ideas, adapted to the host:

- force Python UTF-8 mode when validating Markdown or YAML
- set `PYTHONIOENCODING=utf-8` for text-heavy CLI output
- use `PYTEST_DISABLE_tool_AUTOLOAD=1` when global pytest add-ons are broken
- test PowerShell scripts in the shell version that will run them
- keep maintenance scripts parse-safe for Windows PowerShell 5.1 when required

## Script Safety

For Windows PowerShell 5.1 maintenance scripts:

- avoid non-ASCII literals when the file may be UTF-8 without BOM
- keep marker comments ASCII
- put localized user-facing text in files parsed by runtimes that handle UTF-8
- validate syntax before deploying recurring maintenance

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Fixing the app after shell noise | Reproduce in a clean shell first |
| Trusting PowerShell 7 parse results | Test PowerShell 5.1 if it runs the job |
| Using global Python for everything | Prefer known-good local runtime |
| Treating pytest tool errors as project failures | Disable autoload and retry |

## Completion Criteria

Finish when:

- the target command's real result is separated from environment noise
- the active shell and interpreter are named
- encoding-sensitive commands run with explicit encoding
- remaining global environment damage is not mistaken for project failure
