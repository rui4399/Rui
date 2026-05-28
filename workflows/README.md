# Workflows

Workflows compose multiple skills into repeatable agent pipelines.

## Math Research Pipeline

Use when a mathematical problem needs proof planning, computation, verification, and polished writeup.

1. `classify-problem`: identify domain, known tools, likely proof strategy, and risk.
2. `theorem-prover`: decompose into lemmas and proof obligations.
3. `asymptotic-analyzer` or `polynomial-engine`: run specialized symbolic or computational checks when relevant.
4. `latex-polisher`: rewrite proof with notation consistency.
5. `evals`: verify proof correctness, unsupported claims, and token/time cost.

Status: roadmap until the specialized skills have real examples and benchmarks.

## Paper Workflow Pipeline

Use when turning research notes into a structured paper draft.

1. collect context and constraints
2. outline assumptions, method, results, and limitations
3. draft sections with citation placeholders
4. run consistency and reproducibility checks
5. polish LaTeX and appendices

## Web Game UI QA Pipeline

Use when a browser game, canvas app, sprite workflow, or mobile WebView needs debugging.

1. `windows-ai-devtool-repair`: verify local Node, browser, Python, Java, or Android tooling.
2. `web-game-ui-bugfix-playbook`: reproduce UI, sprite, interaction, or performance defects.
3. `media-artifact-integrity-check`: verify generated or cached visual assets.
4. `chat-media-delivery-runbook`: deliver screenshots or media artifacts if needed.
5. `failure-to-runbook-loop`: preserve reusable lessons after verification.

Verification gates:

- local app starts
- canvas or primary scene is nonblank
- key interaction changes visible state
- desktop and mobile viewport checks are covered when relevant
- screenshot, DOM, or asset evidence is recorded
