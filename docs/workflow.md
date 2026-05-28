# Workflow Design

Workflows compose skills into multi-step agent pipelines. A workflow should define the task class, required inputs, ordered steps, tool routing, memory handoff, recovery points, and evaluation gates.

## Workflow Shape

```yaml
name: math-proof-to-paper
steps:
  - classify-problem
  - select-strategy
  - solve-problem
  - verify-proof
  - polish-latex
  - evaluate-result
```

## Composition Rules

- Each step should map to a skill or subagent role.
- The output of one step must be explicit enough for the next step.
- Tool use should be routed by need, not by habit.
- Failed verification should return to the smallest failing step.
- Public examples should use sanitized inputs and outputs.

## Context Handoff

Long workflows should pass compact state:

- problem statement
- assumptions
- intermediate lemmas or artifacts
- tool outputs
- known failures
- final verification evidence

Do not pass raw private memory into public examples.
