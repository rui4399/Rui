# Getting Started

Rui Skills is an AI Agent Skill Platform, not a prompt dump. Start by choosing a skill from the registry, reading the corresponding `SKILL.md`, running the workflow with the required tools, and recording evaluation evidence.

## Five-Minute Path

1. Open `registry/index.json`.
2. Pick a skill whose `tags`, `tools`, and `status` match the task.
3. Read the skill's `SKILL.md`.
4. Execute its workflow with the smallest useful context.
5. Verify the observable completion criteria.
6. Record reusable results in `evals/` or a sanitized example.

## Current Stable Surface

- `skills/`: installable Codex-compatible skill folders.
- `registry/index.json`: metadata and roadmap placeholders.
- `docs/skill-authoring-guide.md`: required sections and compatibility rules.
- `workflows/README.md`: examples of composing skills into pipelines.
- `evals/README.md`: metrics and benchmark record format.

## Compatibility Rule

Current Codex validators may only accept `name` and `description` in `SKILL.md` frontmatter. Keep `SKILL.md` frontmatter compatible and store richer fields in `registry/index.json` until the runtime supports extended metadata directly.
