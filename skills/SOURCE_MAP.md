# Design Notes

This file explains the engineering background behind the public skill drafts. It is not a private log dump; it records the reusable patterns that were extracted from local maintenance work while avoiding private paths, credentials, and sensitive details.

## windows-agent-interop-health

Inspired by:

- local Hermes/WSL/Codex bridge skill
- WSL health false-negative incidents
- bridge endpoint and stale lock maintenance
- local proxy probing lessons

Distinctive angle:

- focuses on mixed Windows/WSL/desktop/CLI boundary diagnosis
- includes `Sysnative` WSL resolution and process-vs-lock verification
- treats proxy response shape as part of health, not just HTTP status

## chat-media-delivery-runbook

Inspired by:

- local WeChat/ComfyUI/avatar maintenance skill
- media upload vs final send failures
- generated-image placeholder and batch-send incidents
- avatar anti-aliasing and prompt-guard lessons

Distinctive angle:

- models chat media as a staged delivery pipeline
- separates generation, upload, send, caption, and visibility
- documents stale send context as a first-class failure mode

## local-agent-memory-loop

Inspired by:

- local soul/profile/active memory files
- reusable learning and error logging workflow
- promotion rules from raw observations into active guidance

Distinctive angle:

- treats agent memory as explicit files with conservative promotion
- defines when not to log
- keeps secrets out of memory by design

## codex-plugin-recovery-api-mode

Inspired by:

- current-dialogue plugin routing skill
- plugin cache and local skill fallback work
- API-key mode UI/plugin visibility issues
- config mutation incidents from diagnostics

Distinctive angle:

- aims at current-session recovery rather than generic plugin setup
- uses local manifests and skills when native tools are not hot-loaded
- includes config safety checks before diagnostics

## codex-identity-portability

Inspired by:

- Codex inherit skill
- Codex shared records skill
- account migration and local record sharing work

Distinctive angle:

- separates portable identity from account secrets
- supports shared non-secret records across Windows accounts
- requires dry-run planning and backup before apply

## windows-ai-devtool-repair

Inspired by:

- Python/Conda corruption recovery
- PowerShell 5.1 encoding and parser failures
- npm workspace/runtime dependency repair
- Android build path and JDK/SDK fixes
- local provider/proxy diagnostic lessons

Distinctive angle:

- handles noisy Windows AI toolchains as layered systems
- distinguishes shell noise from command failure
- includes concrete anti-patterns from real repair sessions

## codex-desktop-runtime-maintenance

Inspired by:

- local Codex runtime repair work
- Codex++ safe-mode and tweak-loading diagnostics
- sandbox setup refresh failures
- corrupt logs database repair planning
- local proxy and provider-health false positives

Distinctive angle:

- treats desktop runtime, CLI, plugins, sandbox, databases, MCP, and provider proxy as separate layers
- distinguishes UI reload, hot-load, and full restart
- emphasizes readonly checks and backups before mutation

## hermes-gateway-recovery

Inspired by:

- Hermes/WSL gateway and QQBot repair sessions
- gateway state files with dead PIDs
- empty response failures from provider/session/fallback state
- WSL-to-Windows CC Switch bridge design

Distinctive angle:

- requires PID, port, session, provider, and response-body evidence
- treats empty output with exit code 0 as failure
- separates bridge restart, gateway restart, and session reset

## mobile-agent-session-bridge

Inspired by:

- Happy mobile to local Codex bridge debugging
- broken global npm dependency repair
- websocket timeout diagnosis
- stale session and turn-start-without-final-reply cases

Distinctive angle:

- separates mobile reachability, daemon control plane, local app-server, and turn completion
- defines healthy markers and failure markers for session bridges
- avoids reusing stale session ids after cleanup

## mcp-oauth-session-freshness

Inspired by:

- Notion MCP OAuth setup and stale active-session failures
- long Notion write fallback into local drafts
- child-page split and parent-page block preservation

Distinctive angle:

- separates config correctness, CLI OAuth login, active desktop auth freshness, and tool visibility
- requires read-only current-session verification before writes
- saves pending writes locally when auth is stale

## codegraph-mcp-code-intelligence

Inspired by:

- adding a local CodeGraph MCP server to Codex
- recurring need to inspect large repositories without loading too much context
- local-first preference for symbol, caller, callee, impact, and affected-test discovery

Distinctive angle:

- treats CodeGraph as a narrowing tool, not a source of truth
- requires direct file evidence before edits
- prevents generated index artifacts and large context dumps from leaking into public commits

## evidence-first-local-ops

Inspired by:

- recurring false positives from UI status, lock files, green health checks, and provider names
- repeated need to prove current state from logs, process state, ports, and probes

Distinctive angle:

- turns a local debugging philosophy into an executable agent workflow
- ranks evidence sources explicitly
- requires conclusions to point to falsifiable evidence

## state-layered-agent-design

Inspired by:

- Codex memory files, local skills, plugin caches, session stores, media artifacts, auth stores, and shared records
- account migration and non-secret record sharing work
- bridge state and capability registry patterns

Distinctive angle:

- separates identity, lessons, active rules, sessions, runtime, tools, credentials, artifacts, and external side effects
- gives each layer a distinct repair and migration policy
- prevents common overbroad fixes such as deleting auth for a log corruption

## failure-to-runbook-loop

Inspired by:

- repeated maintenance learnings promoted into memory
- bridge maintenance scripts created from recurring failures
- public skills distilled from local work logs

Distinctive angle:

- defines when a failure should become a note, error entry, script, runbook, skill, or active rule
- makes "next occurrence is cheaper to diagnose" the completion standard
- separates durable lessons from private raw logs

## provider-response-shape-probing

Inspired by:

- local proxy checks where `/v1/models` failed but real requests worked
- provider responses that returned HTTP 200 with HTML instead of API JSON
- image provider routes that rewrote prompts instead of returning artifacts
- Hermes empty-output incidents with successful process exits

Distinctive angle:

- treats response shape as health evidence
- separates status code, JSON parseability, output fields, and caller usability
- avoids trusting provider names or catalog entries as capability proof

## windows-shell-encoding-hygiene

Inspired by:

- PowerShell 5.1 misreading UTF-8 maintenance scripts
- Python and pip Unicode failures in Windows consoles
- pytest global plugin pollution
- shell profile noise that appeared after successful commands

Distinctive angle:

- distinguishes shell failure from target command failure
- makes encoding and interpreter choice part of verification
- captures when project tests should isolate themselves from global plugins

## codex-config-drift-recovery

Inspired by:

- Codex config being reduced after diagnostic/plugin commands
- provider, plugin, MCP, memory, and sandbox sections needing restoration
- generated config blocks that should not be overwritten casually

Distinctive angle:

- diagnoses config drift by section
- requires current snapshot and known-good baseline before repair
- prefers non-mutating verification after restoration

## codexplusplus-tweak-lifecycle

Inspired by:

- Codex++ safe mode disabling local tweaks
- renderer preload and settings injection compatibility failures
- tweak discovery logs showing installed tweaks without visible UI behavior
- local plugin/skills entry work for API-key mode

Distinctive angle:

- models tweak health as lifecycle layers
- separates install, discovery, preload, renderer injection, and visible UI
- avoids treating invisible UI as proof that the whole runtime failed

## bridge-endpoint-liveness-triage

Inspired by:

- WeChat/Codex bridge endpoint reporting idle while inbound files stopped changing
- stale lock files and endpoint files
- maintenance loops that were alive while their target bridge was stale
- mobile/web sessions that connected but never completed turns

Distinctive angle:

- distinguishes readiness from liveness
- uses fresh movement through logs, queues, sessions, and outbound events
- scopes restarts to the stale layer when possible

## chat-empty-turn-recovery

Inspired by:

- Codex turns that emitted `task_complete` without assistant text
- Hermes oneshot/gateway empty response cases
- provider/session failures that exited successfully but produced no content

Distinctive angle:

- treats silent completion as delivery failure
- separates model output absence from transport failure
- defines when to send a user-facing fallback without claiming success

## media-artifact-integrity-check

Inspired by:

- generated image fallback files whose names did not match their visible content
- cached or rejected media accidentally reused for chat sends
- media upload success being mistaken for final delivery

Distinctive angle:

- ranks direct preview above filenames and prior send logs
- requires checking artifact content before reuse
- separates source, transformed, uploaded, and final-delivered media

## capability-registry-maintenance

Inspired by:

- local bridge capability reports needing to reflect implemented features
- virtual companion and media-expression state layers
- maintenance scripts that validate capabilities by machine-readable fields

Distinctive angle:

- makes capability registration part of feature completion
- distinguishes feature existence from last verification
- keeps user-facing status separate from raw technical errors

## local-model-routing-evaluation

Inspired by:

- CC Switch model probes across text, image, and fallback providers
- model aliases that included unusable or wrong-surface providers
- quota, timeout, HTML-wrapper, and surface-mismatch failures

Distinctive angle:

- classifies models by task-shaped probes
- records failure category instead of only pass/fail
- separates primary, fallback, and do-not-use routes

## public-skill-distillation

Inspired by:

- turning local Codex/Hermes/Codex++ maintenance logs into public GitHub skills
- repeated need to preserve methods while removing private state
- user request for skills that reflect both work records and operating philosophy

Distinctive angle:

- publishes judgment, evidence paths, and verification standards instead of raw incidents
- gives a workflow for converting private records into public skill drafts
- explicitly separates reusable knowledge from secrets, paths, and private chats

## external-write-draft-fallback

Inspired by:

- Notion MCP OAuth freshness failures after CLI login succeeded
- preserving local drafts when current desktop tools could not write remotely
- remote page update rules that can reject destructive replacement
- chat delivery requests where send can fail after content generation

Distinctive angle:

- treats local drafts as part of reliable remote writes
- requires read-only current-session checks before mutation
- records retry conditions and verification requirements

## cross-runtime-path-resolution

Inspired by:

- WSL path resolution from Windows desktop processes
- `Sysnative` vs `System32` WSL lookup differences
- npm shims, Python launchers, sandbox helpers, and app-server child processes
- commands that worked interactively but failed from bridge/runtime callers

Distinctive angle:

- resolves executables from the final caller's runtime
- names filesystem-view boundaries explicitly
- avoids copying paths across Windows, WSL, Node, Python, and PowerShell without conversion

## agent-publication-readiness-review

Inspired by:

- public GitHub README refinement after skill drafts were added
- validation and sensitive-scan checks before push
- turning a list of skills into a coherent public portfolio section

Distinctive angle:

- reviews taxonomy, trigger clarity, distinctiveness, verification, safety, and polish
- treats public skill collections as systems, not dumps
- makes validation and sensitive scanning explicit pre-push requirements

## web-game-ui-bugfix-playbook

Inspired by:

- browser-game UI and canvas smoke-test work
- sprite-sheet, contact-sheet, and generated-asset QA workflows
- mobile WebView performance and viewport repair passes
- visual verification habits from local frontend and game debugging

Distinctive angle:

- requires both functional and visible rendering evidence
- separates build success from canvas, sprite, HUD, input, and mobile wrapper correctness
- treats screenshots, canvas nonblank checks, sprite dimensions, and frame counts as first-class verification artifacts
