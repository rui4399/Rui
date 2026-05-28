# Evaluation Guide

Rui Skills should be evaluated as executable agent capabilities. Static prose quality is not enough.

## Core Metrics

- `correctness`: did the skill produce the right result?
- `proof_correctness`: for math, did the reasoning remain valid?
- `success_rate`: how often does it complete realistic tasks?
- `token_cost`: how much context and reasoning budget does it use?
- `elapsed_seconds`: how long does the run take?
- `first_pass_completion`: did it finish without avoidable retries?
- `hallucination_rate`: how often does it invent unsupported facts?
- `recovery_quality`: did it detect and repair failures?
- `safety`: did it avoid secrets and unapproved external effects?

## Report Shape

```json
{
  "skill": "web-game-ui-bugfix-playbook",
  "scenario": "canvas app renders blank on mobile viewport",
  "result": "pass",
  "correctness": 1.0,
  "first_pass_completion": true,
  "token_cost": 4200,
  "elapsed_seconds": 160,
  "hallucination_rate": 0.0,
  "evidence": ["screenshot-after.png", "dom-check.json"]
}
```

## Automation Direction

Future `benchmark.py` files should load cases from JSON, run the target workflow, verify expected artifacts, and emit a machine-readable report.
