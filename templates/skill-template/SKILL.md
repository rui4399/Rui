---
name: skill-template
description: Use when drafting a new Rui Skill that must remain Codex-compatible while supporting registry metadata, workflows, recovery, examples, and evaluation.
---

# Skill Template

## Purpose

State the reusable capability in one or two sentences.

## Input

- user goal
- relevant files, URLs, examples, or data
- expected output
- constraints and forbidden side effects

## Workflow

1. Inspect the minimum relevant context.
2. Identify the owning layer or artifact.
3. Execute the smallest useful change or analysis.
4. Verify with direct evidence.
5. Record reusable findings only when stable and sanitized.

## Tool Routing

- `filesystem`: read and edit local files.
- `python`: parse structured data, run deterministic checks, or compute examples.
- `browser`: inspect local web targets and visual state.
- `latex`: compile or validate mathematical documents.
- `github`: use only for scoped repository operations with appropriate authorization.

## Constraints

- Keep public artifacts free of secrets and private identifiers.
- Keep `SKILL.md` frontmatter validator-compatible.
- Put extended metadata in `registry/index.json`.
- Do not expand beyond the trigger.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| missing input | ask for the minimum missing artifact |
| tool unavailable | use a local read-only fallback or record the blocker |
| validation fails | fix the smallest failing section and rerun |
| private data appears | remove it and replace with a generalized pattern |

## Examples

User: "Turn this repeated debugging workflow into a reusable skill."

Agent action: classify trigger, define workflow, add constraints, add evaluation gates, validate frontmatter.

## Evaluation

The skill is acceptable when frontmatter validates, trigger conditions are clear, workflow steps are actionable, recovery covers likely failures, and registry metadata points to the correct path.
