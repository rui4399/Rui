---
name: public-skill-distillation
description: Use when turning private work logs, local maintenance records, agent conversations, tool histories, or repeated debugging sessions into public GitHub skill drafts without leaking private state.
---

# Public Skill Distillation

## Overview

Use this skill to convert private operational experience into public, reusable skills. The rule is: publish the method and judgment, not the private raw record.

## Distillation Targets

Extract:

- recurring symptoms
- decision points
- evidence hierarchy
- repair sequence
- verification criteria
- common mistakes
- artifact boundaries
- safety rules

Do not extract:

- secrets
- cookies or tokens
- recipient IDs
- private chat content
- exact private paths
- raw logs with personal identifiers
- proprietary code copied from private workspaces

## Workflow

1. Scan records for repeated failure modes and non-obvious repairs.
2. Group them into reusable themes.
3. Choose a skill name that describes the trigger.
4. Write frontmatter with triggering conditions only.
5. Convert the work into steps, tables, and completion criteria.
6. Add source notes as generalized design background.
7. Run validation and sensitive-text scans.
8. Publish only after the public version stands without private context.

## Refinement Standard

A public skill is strong when:

- it tells an agent when to load it
- it changes behavior under pressure
- it contains a falsifiable evidence path
- it warns against a real mistake
- it ends with verification, not intention

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Copying a private incident | Generalize the reusable pattern |
| Writing a story | Write an executable workflow |
| Publishing paths and IDs | Use generic labels |
| Making a skill too broad | Split by trigger and evidence type |
| Summarizing workflow in frontmatter | Put workflow in the body |

## Completion Criteria

Finish when:

- the skill is useful without private logs
- sensitive scan is clean
- source notes explain inspiration without exposing private state
- the public repo presents a coherent collection, not a dump
