# Runtime

The runtime layer is the future execution surface for Rui Skills. It should load skill metadata, route tools, compose workflows, preserve compact context, and emit evaluation records.

## Target API

```python
load_skill("theorem-prover")
execute_skill(input_data)
compose_skills(["theorem-prover", "latex-polisher"])
```

## Runtime Responsibilities

- load `registry/index.json`
- resolve skill paths
- read `SKILL.md` only when triggered
- route tools by declared need
- prefer CodeGraph context and impact queries for large repositories before broad manual reads
- pass compact context between workflow steps
- record failures and recovery attempts
- emit evaluation reports

## Non-Goals For Now

- no hidden credential handling
- no automatic live-service changes
- no destructive repository operations
- no private memory leakage into public examples

## CLI Direction

The future CLI should expose:

```text
rui list
rui search proof
rui install theorem-prover
rui run theorem-prover --input problem.md
rui eval theorem-prover
```

The first implementation should be local-first and file-backed before any hosted service or web UI is added.

## Code Intelligence Hook

When a skill declares `codegraph`, the runtime should first check whether the target repository is indexed. If it is not indexed, it should ask the workflow whether indexing is appropriate for that repository scope, then keep `.codegraph/` out of publication unless the project explicitly tracks it.
