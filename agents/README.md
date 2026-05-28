# Agents

Agents are specialized roles used by workflows. They are not a replacement for skills; they execute focused parts of a larger pipeline.

## Planned Roles

- `proof-checker`: verify lemma chains and detect unsupported proof steps.
- `theorem-solver`: propose proof strategies and constructive arguments.
- `latex-reviewer`: check notation, theorem environments, and formatting.
- `benchmark-runner`: execute eval fixtures and summarize metrics.
- `publication-reviewer`: check public artifacts for secrets, private paths, and unclear triggers.

## Rules

- Subagents should receive only the minimum context required.
- Do not leak intended answers into validation prompts unless the evaluation requires it.
- Subagent outputs must be checked by the parent workflow before publication.
- Public examples must be sanitized.
