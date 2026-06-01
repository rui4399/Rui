---
name: local-capability-harvest
description: Use when scanning local Codex skills or agent capability folders to find public-safe improvements for a repository without bulk-publishing private local state.
---

# Local Capability Harvest

## Overview

Use this skill when a local machine has many installed skills or capability folders and the repository needs useful improvements, not a raw dump. The goal is to identify reusable patterns, deduplicate overlapping capabilities, sanitize private context, and publish only the parts that stand on their own.

## Harvest Targets

Prefer candidates that show one or more of these traits:

- repeated local use across projects
- clear trigger language
- executable validation or recovery steps
- broadly useful tool-routing knowledge
- failure modes that future agents can recognize
- public-safe examples that do not depend on one account, workspace, chat, or credential

Defer or reject candidates when they depend on private identity, private messages, recipient IDs, secrets, paid account state, unreleased code, or machine-specific paths.

## Workflow

1. Inventory candidate roots with a read-only scanner.
2. Extract only frontmatter-level metadata and short descriptions first.
3. Compare candidate names against the repository registry.
4. Group related capabilities by problem class instead of source folder.
5. Score candidates by reuse value, trigger clarity, validation value, and public-safety risk.
6. Read the full source only for the top candidates that pass the first screen.
7. Distill the method into a new or existing public skill.
8. Register the capability and update documentation counts.
9. Run repository validation and inspect the diff for local paths or secrets.

## Tool Routing

- Use `node tools/scan-local-capabilities.mjs` for the first inventory pass.
- Use `ripgrep` for targeted follow-up on candidate names, not broad private-log scans.
- Use `git diff --check` and the repository validator before publishing.
- Use GitHub tools only after the local diff is understood and safe to publish.

## Candidate Scoring

| Signal | Good Candidate | Risky Candidate |
| --- | --- | --- |
| Scope | General agent workflow | One private account or chat |
| Evidence | Has validation steps | Only a prompt style preference |
| Trigger | Clear failure or task phrase | Vague personality or branding |
| Portability | Uses placeholders and standard tools | Requires local absolute paths |
| Safety | Can be described without raw logs | Needs secrets, tokens, or IDs |

## Constraints

- Do not bulk-copy local skill folders into a public repository.
- Do not publish raw local paths, chat records, credential names, account identifiers, or generated private logs.
- Do not stage generated inventories unless they are explicitly sanitized and meant to be public artifacts.
- Prefer one strong public capability over many thin wrappers.

## Failure Recovery

If the scan is too noisy, narrow to capability families such as frontend QA, GitHub publishing, MCP recovery, local runtime repair, or skill evaluation.

If candidates overlap existing registry entries, update the existing skill or source notes instead of adding a duplicate.

If a candidate needs private evidence to make sense, keep it local and publish the generalized failure pattern only.

If validation flags local paths or secrets, remove the copied detail and restate it as a placeholder, generic root, or safety rule.

## Examples

Good harvest:

- A local browser-testing skill becomes a public workflow for verifying rendered apps with screenshots and console checks.
- Several local skill-evaluation scripts become a single repository tool for metadata inventory and duplicate detection.

Bad harvest:

- Copying a whole local capability folder into `skills/`.
- Publishing a local chat-companion prompt because it has many instructions.
- Adding a skill that only works with one machine's exact directory layout.

## Evaluation

The harvest is complete when:

- the added capability is useful without private local context
- the registry and documentation agree with the changed files
- the scan tool avoids printing absolute paths unless explicitly requested
- the validator passes
- the diff contains no raw private paths, secrets, account tokens, or private messages
