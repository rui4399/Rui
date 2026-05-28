# Codex Skill Lab

This directory contains public Codex skill drafts distilled from local agent maintenance work. They focus on the messy layer where AI systems actually break: desktop runtimes, Windows/WSL boundaries, bridge state, media delivery, provider routers, OAuth sessions, plugin visibility, and the discipline of turning failures into reusable procedures.

The collection is intentionally not a catalog of generic API wrappers. Each skill encodes a recurring operating pattern: what evidence to inspect, what false-positive signals to distrust, how to repair with the smallest blast radius, and what counts as done.

## Collection Map

### Runtime And Toolchain Recovery

- `windows-agent-interop-health`: diagnose Windows, WSL, and local agent boundary failures with executable health checks.
- `windows-ai-devtool-repair`: repair Windows AI development toolchains when Python, Node, PowerShell, WSL, or local proxies drift.
- `windows-shell-encoding-hygiene`: separate real command failures from PowerShell, Python, pytest, and UTF-8/GBK environment noise.
- `cross-runtime-path-resolution`: resolve executable and filesystem paths across Windows, WSL, Node, Python, PowerShell, desktop apps, and bridges.
- `codex-desktop-runtime-maintenance`: maintain a Codex-style desktop runtime across CLI, sandbox, plugin, database, proxy, and UI extension layers.
- `codex-config-drift-recovery`: recover thinned or rewritten local Codex configuration without damaging provider, plugin, MCP, memory, or sandbox blocks.
- `codexplusplus-tweak-lifecycle`: diagnose Codex++ safe mode, tweak discovery, preload injection, renderer UI, and visible extension behavior.

### Bridges, Messaging, And Media

- `chat-media-delivery-runbook`: debug chat-platform media delivery by separating generation, upload, send, and context-refresh stages.
- `bridge-endpoint-liveness-triage`: handle bridges that report ready or idle while inbound queues, logs, sessions, or outbound sends stop moving.
- `chat-empty-turn-recovery`: recover turns where the system reports completion but no assistant message reaches the user.
- `media-artifact-integrity-check`: verify generated or cached media before reuse when filenames, fallbacks, or prior send logs are weak evidence.
- `mobile-agent-session-bridge`: diagnose mobile/web control surfaces connected to local coding agents when sessions are online but turns stall.
- `capability-registry-maintenance`: keep agent capability registries, status files, and health reports aligned with implemented features.
- `hermes-gateway-recovery`: recover Hermes-style WSL gateways, bot connectors, fallback providers, proxy bridges, and stale sessions.

### Providers, MCP, And External Writes

- `provider-response-shape-probing`: classify provider health by usable JSON/output shape instead of status codes, labels, or generic probes.
- `local-model-routing-evaluation`: evaluate local router models by task-shaped probes, output shape, fallback behavior, and failure category.
- `mcp-oauth-session-freshness`: handle OAuth-backed MCP tools when CLI login succeeds but the active desktop session still has stale auth.
- `external-write-draft-fallback`: preserve local drafts and verify remote writes when OAuth, permissions, network, or content rules are uncertain.
- `codex-plugin-recovery-api-mode`: recover local plugin/skill routing when a Codex-style app is running in API-key mode or the UI does not expose plugins.

### Memory, Portability, And Publication

- `local-agent-memory-loop`: maintain explicit local memory files for agent preferences, lessons, active rules, and promotion.
- `codex-identity-portability`: migrate local Codex identity assets without copying secrets or active account state.
- `public-skill-distillation`: turn private logs, maintenance records, and agent conversations into public, reusable, sanitized skills.
- `agent-publication-readiness-review`: review a public GitHub skill library for taxonomy, polish, validation, and sensitive-information exposure.

### Web, Game, And Visual QA

- `web-game-ui-bugfix-playbook`: reproduce and repair browser-game UI, canvas, sprite, animation, viewport, input, and mobile WebView defects.

### Operating Philosophy

- `evidence-first-local-ops`: debug by ranking logs, process state, probes, config, UI status, and prior assumptions as evidence.
- `state-layered-agent-design`: design agent systems with separate layers for memory, sessions, runtime, tools, credentials, artifacts, and external state.
- `failure-to-runbook-loop`: convert repeated failures into memory entries, scripts, runbooks, or skills with explicit verification.

## Why These Are Different

Most skills explain a clean happy path. These focus on operational edge cases:

- a lock file exists but the process is dead
- upload succeeds but final chat delivery fails
- endpoint health says `idle` while inbound logs stop moving
- a local proxy returns HTTP 200 with HTML instead of model JSON
- `/v1/models` fails while the real `/responses` route works
- a diagnostic command silently rewrites configuration
- PowerShell emits unrelated Python errors after successful commands
- a UTF-8 script works in PowerShell 7 but breaks in PowerShell 5.1
- a gateway state file says running while the PID is dead
- CLI OAuth succeeds but the active desktop session still cannot use the MCP tool
- a mobile session receives the message but the local agent never emits a final reply
- a cached image filename says one thing while the file contains a rejected fallback

## Design Standard

Each public skill should answer four questions:

- When should an agent load this?
- What evidence should it inspect first?
- What common false-positive should it distrust?
- What observable condition means the work is done?

The intended user is an agent or developer maintaining local AI workflows where correctness depends on logs, state, process ownership, response shape, artifact integrity, and explicit verification.

## Public Safety

These drafts intentionally exclude user names, machine-specific absolute paths, private workspace names, API keys, account tokens, cookies, auth files, provider secrets, private chat details, recipient IDs, and copied proprietary code.

## Usage

Copy a skill folder into a Codex-compatible skills directory, or read the relevant `SKILL.md` directly when doing a similar repair. Adapt placeholder paths and commands to the target machine before running any operation.

Ask before using credentials, spending credits, posting externally, sending messages, or changing live services.
