---
name: state-layered-agent-design
description: Use when designing, refactoring, or repairing an AI agent workflow that mixes memory, sessions, provider config, local tools, media transport, UI tools, automations, or external service state and needs durable boundaries between layers.
---

# State-Layered Agent Design

## Overview

Use this skill to design agent systems whose state can be inspected, repaired, and migrated. The principle is: separate durable identity, active session, runtime health, tool cache, credentials, and external service state.

## State Layers

Keep these separate:

- identity: stable preferences, principles, and reusable rules
- lessons: raw learnings and errors not always active
- active rules: concise always-on guidance
- session: current conversation, transient context, token load
- runtime: processes, ports, endpoint files, locks
- tools: skills, MCP servers, local tools, caches
- credentials: auth files, API keys, cookies, OAuth tokens
- artifacts: generated files, reports, media, drafts
- external state: remote pages, deployments, paid jobs, sent messages

Each layer needs a different backup, migration, and repair policy.

## Design Rules

1. Put durable memory in readable files.
2. Keep credentials out of memory and public docs.
3. Treat session state as disposable unless explicitly exported.
4. Make runtime health machine-checkable.
5. Keep tool caches reproducible or rebuildable.
6. Write artifacts to explicit output paths.
7. Record external side effects separately from local preparation.

## Repair Benefits

Layering prevents these failures:

- deleting auth when only logs were corrupt
- restarting a gateway when only a session was polluted
- resending media when only caption delivery failed
- copying secrets during account migration
- trusting stale UI state after CLI auth refresh

## Migration Policy

Portable by default:

- skills
- memories without secrets
- generated artifacts
- automation definitions
- non-secret indexes

Not portable by default:

- credentials
- cookies
- active sessions
- locked databases
- provider billing state

## Completion Criteria

Finish when:

- each important state item has a layer
- secrets and external side effects are isolated
- health checks can validate runtime state
- migration or repair can operate on one layer without damaging others

