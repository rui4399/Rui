# Validation

Rui Workbench should be checked locally before publishing or promotion.

## Smoke Check

Run the repository validator:

```bash
node tools/validate-skills.mjs
```

It checks:

- `registry/index.json` parses
- registry entries contain required metadata
- active skills have real `SKILL.md` files
- frontmatter stays Codex-compatible
- folder names match skill names
- public text avoids obvious local-path and secret-style leaks

Warnings mark quality gaps such as missing recommended sections. Errors block release.

For a stricter authoring-quality pass, include section checks:

```bash
node tools/validate-skills.mjs --strict-sections
```

## Local Capability Scan

When improving the repository from installed local skills, start with the read-only scanner:

```bash
node tools/scan-local-capabilities.mjs --limit 20
```

The scan reads `SKILL.md` metadata and descriptions, compares names with the registry, and hides source paths unless `--show-paths` is explicitly passed. Treat its output as a shortlist for manual review, not as publishable content.

## Codex Check

When available, run Codex's skill validator on each changed skill:

```bash
python <skill-creator>/scripts/quick_validate.py skills/<skill-name>
```

## Release Gate

Before pushing or publishing:

1. run `node tools/validate-skills.mjs`
2. run `node tools/scan-local-capabilities.mjs --limit 20` when the change came from local skill harvesting
3. run `quick_validate.py` for changed skills
4. run `git diff --check`
5. review `git diff --stat`
6. confirm that generated indexes, private logs, credentials, and machine-local paths are not staged
