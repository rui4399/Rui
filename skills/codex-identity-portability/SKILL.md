---
name: codex-identity-portability
description: Use when exporting, importing, cloning, backing up, or sharing a local Codex-style assistant setup across Windows accounts or machines while preserving memories, skills, tools, generated artifacts, records, and configuration without copying secrets.
---

# Codex Identity Portability

## Overview

Use this skill to move durable local assistant identity assets without leaking credentials or corrupting active state. Treat identity, records, runtime caches, and account secrets as separate layers.

## Asset Classes

Portable by default:

- memories and preference files
- local skills and skill metadata
- non-secret tool manifests
- generated images or artifacts
- automation definitions
- session indexes and history summaries
- local tool shims and documented setup scripts

Do not copy by default:

- auth files
- browser cookies and profiles
- API keys or token stores
- sandbox secrets
- active locked SQLite databases
- provider billing credentials

Ask for explicit confirmation before migrating any secret-bearing state.

## Migration Workflow

1. Identify source and target assistant homes.
2. Run a dry-run inventory.
3. Classify files as portable, secret, volatile, or account-bound.
4. Create a plan artifact.
5. Apply only after the plan is reviewed.
6. Verify target readability and expected counts.

For active databases, close the desktop app before replacing files or links.

## Shared Records Pattern

For multiple Windows accounts on one machine, use a shared records root for non-secret records and per-account auth for credentials.

Good shared candidates:

- sessions or archived sessions
- generated media
- memories
- automations
- session index files
- local history files without secrets

Keep auth and browser state per-account.

## Backup Rules

Before replacing a local path with a copied directory or link:

1. Check whether the target exists.
2. Move it to a timestamped backup.
3. Apply the copy or link.
4. Verify file count and sample readability.
5. Keep rollback instructions in the plan.

## Safety Checklist

- No `auth.json`, cookies, token files, or API keys in the bundle
- No active database copied while the app is running
- Dry run completed before apply
- Target path is explicit
- Backups exist for overwritten paths
- User approved any credential or live-account migration

## Completion Criteria

Finish when:

- an export/import/share plan exists and excludes secrets
- the dry run lists exactly what would move
- apply completed and target files are readable
- or the blocker is a concrete locked file, missing permission, or required user approval

