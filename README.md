<div align="center">

<img src="./assets/profile-banner.svg" alt="Rui Workbench banner" width="100%" />

# Rui Workbench

**An open agent skill platform for research, coding, automation, and local tooling.**

This repository turns repeated agent work into reusable, testable, composable, and installable capabilities. It is designed for coding agents that need clear triggers, tool routing, recovery plans, evaluation gates, and public-safe operational knowledge.

[![Repository](https://img.shields.io/badge/repo-rui4399%2FRui-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rui4399/Rui)
[![Capabilities](https://img.shields.io/badge/stable%20capabilities-30-0f766e?style=for-the-badge)](./skills)
[![Registry](https://img.shields.io/badge/registry-35%20entries-1d4ed8?style=for-the-badge)](./registry/index.json)
[![Validation](https://img.shields.io/badge/validation-local%20smoke%20check-7c3aed?style=for-the-badge)](./docs/validation.md)

</div>

---

## Start Here

| Goal | Entry point |
| --- | --- |
| Browse available capabilities | [registry/index.json](./registry/index.json) |
| Use a capability directly | [skills/](./skills) |
| Learn the format | [docs/skill-authoring-guide.md](./docs/skill-authoring-guide.md) |
| Compose multiple capabilities | [workflows/README.md](./workflows/README.md) |
| Validate the repository | [docs/validation.md](./docs/validation.md) |
| Study runtime direction | [runtime/README.md](./runtime/README.md) |

```bash
node tools/validate-skills.mjs
```

Current validation target: `35` registry entries, `30` stable capabilities, `5` roadmap capabilities, and `23` domains.

## What This Is

Rui Workbench is not a prompt collection. A real capability should define:

- intent and trigger
- required context
- workflow
- tool routing
- constraints
- failure recovery
- examples
- evaluation criteria

The repository is the seed of a broader AI Agent Skill Platform: a local-first system where capabilities can be indexed, installed, composed, tested, ranked, and improved.

<p align="center">
  <img src="./assets/platform-overview.svg" alt="Platform overview" width="100%" />
</p>

## Platform At A Glance

| Layer | Role | Status |
| --- | --- | --- |
| Capability folders | Codex-compatible folders with `SKILL.md` | active |
| Registry | Machine-readable metadata for search, install, and ranking | active |
| Validation | Local smoke checks for paths, frontmatter, metadata, and safety | active |
| Workflows | Multi-capability orchestration patterns | draft |
| Runtime | Loader, context handoff, tool routing, and CLI contract | draft |
| Evals | Benchmark metrics and report shape | draft |
| Memory | Public/private context inheritance policy | draft |
| Agents | Future subagent role definitions | draft |

## Core Capability Families

<p align="center">
  <img src="./assets/capability-map.svg" alt="Capability family map" width="100%" />
</p>

| Family | Examples | What they optimize |
| --- | --- | --- |
| Runtime recovery | `codex-desktop-runtime-maintenance`, `codex-config-drift-recovery` | fixing agent environments without damaging config |
| Windows and interop | `windows-agent-interop-health`, `cross-runtime-path-resolution` | separating Windows, WSL, shell, and process boundaries |
| Provider and MCP | `provider-response-shape-probing`, `mcp-oauth-session-freshness` | proving tool/provider health by usable behavior |
| Media and bridge QA | `chat-media-delivery-runbook`, `media-artifact-integrity-check` | validating generation, upload, send, and visible delivery |
| Code intelligence | `codegraph-mcp-code-intelligence` | symbol search, impact analysis, and affected-test discovery |
| Publication hygiene | `public-skill-distillation`, `agent-publication-readiness-review` | turning private work into safe public artifacts |
| Authoring and efficiency | `token-frugal-skill-authoring`, `local-capability-harvest`, `agent-efficiency-audit` | reducing default context, tightening triggers, and validating claims |
| Decision systems | `decision-record-architecture` | keeping rationale, options, status, and supersession traceable |
| Game and UI QA | `web-game-ui-bugfix-playbook` | reproducing and verifying browser-game visual defects |
| Operating philosophy | `evidence-first-local-ops`, `state-layered-agent-design` | making agent work auditable and recoverable |

## Workflow Lifecycle

<p align="center">
  <img src="./assets/workflow-lifecycle.svg" alt="Workflow lifecycle" width="100%" />
</p>

Every workflow should move through the same accountability loop:

1. select the capability from registry metadata
2. load only the needed instructions
3. route tools by declared need
4. perform the smallest useful action
5. recover from failures explicitly
6. record validation evidence
7. improve the capability when the lesson generalizes

## Quality Gates

<p align="center">
  <img src="./assets/quality-gates.svg" alt="Quality gate pipeline" width="100%" />
</p>

New capabilities move from local evidence into public artifacts through a small gate sequence: distill the recurring work, author a compact `SKILL.md`, register metadata, run validation, scan for private material, and only then publish.

## Featured Paths

| Path | Why it matters |
| --- | --- |
| [skills/](./skills) | Public capabilities distilled from local agent operations and engineering workflows |
| [registry/index.json](./registry/index.json) | Searchable metadata for tools, tags, difficulty, domains, and status |
| [tools/validate-skills.mjs](./tools/validate-skills.mjs) | Dependency-free structural validator for the platform |
| [tools/scan-local-capabilities.mjs](./tools/scan-local-capabilities.mjs) | Read-only local skill scanner for public-safe capability curation |
| [templates/skill-template/SKILL.md](./templates/skill-template/SKILL.md) | Authoring template that keeps Codex frontmatter compatible |
| [workflows/README.md](./workflows/README.md) | Pipeline examples for math, papers, game UI QA, and recovery work |
| [evals/README.md](./evals/README.md) | Benchmark dimensions for correctness, cost, latency, safety, and recovery |
| [ResearchFlow](https://github.com/RipeMangoBox/ResearchFlow) | Related research engine for paper retrieval, notes, indexes, and queries |

## Repository Layout

```text
Rui/
├── skills/       # installable single-capability modules
├── registry/     # machine-readable index and roadmap metadata
├── tools/        # validators and tool-routing notes
├── runtime/      # loader, composition, context, and CLI contracts
├── workflows/    # multi-capability orchestration patterns
├── evals/        # benchmark design, metrics, and report formats
├── templates/    # authoring templates
├── docs/         # getting started, schema, workflow, validation, and eval docs
├── memory/       # context inheritance and public/private memory policy
├── examples/     # future reproducible examples
└── agents/       # future subagent role definitions
```

## Publish Checklist

Before a capability is considered publishable:

1. It has a clear trigger in `description`.
2. It keeps `SKILL.md` frontmatter Codex-compatible.
3. It has registry metadata in `registry/index.json`.
4. It defines workflow, constraints, recovery, examples, and evaluation.
5. It avoids private logs, local absolute paths, credentials, and account state.
6. It passes the local smoke validator.

```bash
node tools/validate-skills.mjs
node tools/validate-skills.mjs --strict-sections
```

## Roadmap

| Phase | Goal | Core work |
| --- | --- | --- |
| Phase 1 | Standardize the platform base | Schema, registry, validation, templates, docs, safety checks |
| Phase 2 | Add runtime and CLI | Loader, workflow pipeline, tool routing, memory handoff, `rui` CLI |
| Phase 3 | Add benchmarks | Reports, fixtures, correctness checks, recovery scoring |
| Phase 4 | Build high-barrier research capabilities | theorem proving, asymptotics, polynomial analysis, LaTeX polishing, MCM papers |
| Phase 5 | Grow ecosystem | contribution templates, ranking, Web UI, marketplace-style discovery |

Planned research capabilities:

- `theorem-prover`
- `asymptotic-analyzer`
- `polynomial-engine`
- `latex-polisher`
- `mcm-paper-writer`

## Design Principles

- Local-first by default.
- Evidence before claims.
- Capability quality before count.
- Runtime and evaluation before prompt wording.
- Recovery paths are part of the product.
- Public artifacts should distill methods, not leak private context.

## Stack

<p>
  <img src="https://img.shields.io/badge/Codex-compatible%20folders-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Node.js-validation-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-evals-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/PowerShell-Windows%20ops-5391FE?style=flat-square&logo=powershell&logoColor=white" />
  <img src="https://img.shields.io/badge/CodeGraph-MCP-7C3AED?style=flat-square" />
  <img src="https://img.shields.io/badge/LaTeX-writing-008080?style=flat-square&logo=latex&logoColor=white" />
</p>

---

<div align="center">

**Reusable agent capabilities for real code, real tools, real failures, and measurable recovery.**

</div>
