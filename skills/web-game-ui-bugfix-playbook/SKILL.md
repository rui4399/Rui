---
name: web-game-ui-bugfix-playbook
description: Use when browser-game UI, canvas, sprite, animation, viewport, input, mobile WebView, or visual QA defects need reproduction and evidence-based repair.
---

# Web Game UI Bugfix Playbook

## Purpose

Debug and polish browser-game UI and visual asset workflows with reproducible checks. This skill covers canvas/WebGL games, sprite-sheet pipelines, mobile WebViews, HUD layout, input flows, and visual QA artifacts.

## Input

- local project path or dev-server URL
- reported UI, interaction, performance, or sprite issue
- expected screen, state, frame count, or viewport behavior
- build/test commands if known
- screenshots, videos, sprite manifests, or QA JSON when available

## Workflow

1. Identify the user-visible failure and likely owning layer: build, runtime, canvas, DOM/HUD, input, sprite pipeline, or mobile wrapper.
2. Reproduce with the smallest local run command or static artifact check.
3. For web UI, verify both DOM state and visible rendering; for canvas, check that a canvas exists and is nonblank when possible.
4. For sprites, verify frame count, cell size, bounding boxes, edge clipping, transparent/chroma-key handling, and contact-sheet review.
5. Patch the smallest layer that owns the defect.
6. Re-run the same reproduction and add one adjacent viewport or interaction check.
7. Record remaining unverified surfaces, especially real-device mobile behavior.

## Tool Routing

- `filesystem`: inspect source, manifests, sprite metadata, and QA JSON.
- `browser`: open local web targets, click controls, test viewports, and capture screenshots.
- `python`: inspect image dimensions, transparency, bounding boxes, and sprite grids.
- `node`: run frontend builds, dev servers, and package scripts.
- `android`: use only when the issue is WebView packaging or device performance.

## Constraints

- Do not claim visual correctness from code review alone.
- Do not rely on filenames as proof of media content.
- Do not treat a successful build as proof that interaction works.
- Do not tune performance by removing core gameplay feedback unless the user accepts the tradeoff.
- Avoid publishing private paths, raw logs, or proprietary assets in public skill notes.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| dev server will not start | inspect package scripts and install/build errors first |
| screenshot capture times out | verify DOM state, canvas presence, interaction state, and retry a lighter viewport |
| canvas is blank | check boot errors, asset loading, renderer creation, and animation loop start |
| mobile build fails | verify Java/SDK/toolchain before changing game code |
| sprite frames are wrong | validate manifest, slot count, cell size, bounding boxes, and source strip extraction |
| generated sprites include guide marks | regenerate with guide-use constraints and reject visible guide lines |

## Examples

### Canvas Game Smoke Check

Input: local dev server URL and report that the first screen is blank.

Expected evaluation:

- page title or root app exists
- one canvas or primary scene container exists
- boot error element is hidden or empty
- first main button click changes objective, route, or visible game state
- screenshot or DOM evidence is saved

### Sprite Sheet QA

Input: sprite manifest, extracted frame directory, and final sheet.

Expected evaluation:

- expected frame counts match actual extracted frames
- each frame has the declared width and height
- no nontransparent pixels touch forbidden edges
- empty cells are intentionally unused
- contact sheet exists for human review

## Evaluation

The skill succeeds when the failure is reproduced or the missing reproduction evidence is named, the owning layer is identified, the repair is verified with the same check that failed, at least one visual or interaction artifact supports the result, and remaining risks distinguish browser, mobile WebView, and generated-asset validation.
