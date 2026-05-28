# Skill Authoring Guide

## Goal

A Rui Skill is a reusable agent capability with triggers, workflow, tool routing, constraints, recovery, examples, and evaluation. It should change how an agent behaves under pressure.

## Compatible Frontmatter

Use only validator-safe fields in `SKILL.md` unless the active validator accepts more:

```yaml
---
name: theorem-prover
description: Use when a mathematical theorem, proof, lemma chain, or proof verification task needs structured agent reasoning.
---
```

## Extended Registry Schema

Put richer platform metadata in `registry/index.json`:

```json
{
  "name": "theorem-prover",
  "version": "0.1.0",
  "author": "Rui",
  "path": "skills/theorem-prover/SKILL.md",
  "summary": "Structured theorem proving and proof verification workflow.",
  "triggers": ["proof", "theorem", "lemma", "verify"],
  "tools": ["python", "latex"],
  "domain": "math",
  "difficulty": "advanced",
  "tags": ["math", "proof"],
  "status": "roadmap"
}
```

## Required Body Sections

Every high-quality skill should include:

- `Purpose`: what problem the skill solves.
- `Input`: minimum context required.
- `Workflow`: concrete execution steps.
- `Tool Routing`: which tools to use and when.
- `Constraints`: safety, scope, and non-goals.
- `Failure Recovery`: how to respond when checks fail.
- `Examples`: realistic use cases.
- `Evaluation`: observable success criteria.

## Quality Bar

Prefer one strong skill over five shallow skills. A skill is not ready if it lacks a trigger, has no verification gate, depends on private paths, or only restates generic advice.

## Public Safety

Do not publish secrets, tokens, cookies, recipient IDs, private logs, private chat context, machine-specific absolute paths, or proprietary code. Distill methods and checks, not raw incidents.
