# Memory Strategy

Rui Skills can inherit context, but public skills must remain portable and safe.

## Memory Layers

- `profile`: stable user or project preferences.
- `active rules`: concise rules that affect most tasks.
- `learnings`: reusable observations not always active.
- `errors`: failure signatures and recovery notes.
- `project notes`: local context scoped to one repository or workspace.

## Skill Interaction

A skill may use memory to choose tone, tools, risk level, or likely workflows. It should not expose private memory in public artifacts unless the pattern has been generalized and sanitized.

## Promotion Rule

Raw incident -> reusable learning -> active rule -> public skill only after private state is removed.
