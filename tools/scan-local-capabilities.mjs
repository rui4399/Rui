#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DEFAULT_ROOTS = [
  path.join(os.homedir(), ".codex", "skills"),
  path.join(os.homedir(), ".agents", "skills"),
  path.join(os.homedir(), ".codex", "skills", ".system"),
];

function parseArgs(argv) {
  const args = {
    roots: [],
    repo: REPO_ROOT,
    limit: 30,
    json: false,
    showPaths: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--root") args.roots.push(argv[++index]);
    else if (arg === "--repo") args.repo = argv[++index];
    else if (arg === "--limit") args.limit = Number(argv[++index] ?? args.limit);
    else if (arg === "--json") args.json = true;
    else if (arg === "--show-paths") args.showPaths = true;
    else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }
  if (!args.roots.length && process.env.CODEX_SKILL_ROOTS) {
    args.roots = process.env.CODEX_SKILL_ROOTS.split(path.delimiter).filter(Boolean);
  }
  if (!args.roots.length) args.roots = DEFAULT_ROOTS;
  if (!Number.isFinite(args.limit) || args.limit < 1) args.limit = 30;
  return args;
}

function printHelp() {
  console.log(`Usage: node tools/scan-local-capabilities.mjs [options]

Options:
  --root <path>       Add a local root to scan. Repeatable.
  --repo <path>       Repository root with registry/index.json. Defaults to this repo.
  --limit <n>         Number of candidates to print. Defaults to 30.
  --json              Print machine-readable JSON.
  --show-paths        Include source file paths in output. Off by default.
  -h, --help          Show this help.

The scanner reads SKILL.md frontmatter and short descriptions only. It is meant
for public-safe curation, not for publishing raw local skill folders.`);
}

function walkSkillFiles(root, out = []) {
  if (!root || !fs.existsSync(root)) return out;
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) walkSkillFiles(fullPath, out);
    else if (entry.isFile() && entry.name === "SKILL.md") out.push(fullPath);
  }
  return out;
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function frontmatterField(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function readRegistryNames(repoRoot) {
  const registryPath = path.join(repoRoot, "registry", "index.json");
  if (!fs.existsSync(registryPath)) return new Set();
  try {
    const registry = JSON.parse(readText(registryPath));
    return new Set((registry.skills ?? []).map((skill) => skill.name).filter(Boolean));
  } catch {
    return new Set();
  }
}

function sourceKind(root) {
  const normalized = root.replaceAll("\\", "/").toLowerCase();
  if (normalized.includes("/.system")) return "system";
  if (normalized.includes("/.agents/skills")) return "agent-local";
  if (normalized.includes("/.codex/skills")) return "codex-local";
  return "custom";
}

function scoreCandidate(item, existingNames) {
  const text = `${item.name} ${item.description}`.toLowerCase();
  let score = 0;
  const positive = [
    "agent",
    "automation",
    "browser",
    "codex",
    "debug",
    "deploy",
    "frontend",
    "game",
    "github",
    "local",
    "mcp",
    "publish",
    "registry",
    "repo",
    "review",
    "skill",
    "test",
    "validation",
    "workflow",
  ];
  const risky = [
    "account",
    "adult",
    "chat",
    "companion",
    "cookie",
    "personal",
    "profile",
    "secret",
    "token",
  ];
  for (const keyword of positive) if (text.includes(keyword)) score += 1;
  for (const keyword of risky) if (text.includes(keyword)) score -= 2;
  if (existingNames.has(item.name)) score -= 5;
  if (item.description.length > 40) score += 1;
  return score;
}

function scan(args) {
  const existingNames = readRegistryNames(args.repo);
  const rootSummaries = [];
  const candidates = [];
  for (const root of args.roots) {
    const files = walkSkillFiles(root);
    rootSummaries.push({ label: sourceKind(root), count: files.length });
    for (const filePath of files) {
      const text = readText(filePath);
      const name = frontmatterField(text, "name") || path.basename(path.dirname(filePath)).toLowerCase();
      const description = frontmatterField(text, "description").replace(/\s+/g, " ");
      const item = {
        name,
        source: sourceKind(root),
        description,
      };
      item.score = scoreCandidate(item, existingNames);
      if (args.showPaths) item.path = filePath;
      if (item.score > 2) candidates.push(item);
    }
  }
  candidates.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return {
    scanned_roots: rootSummaries,
    existing_registry_entries: existingNames.size,
    candidates: candidates.slice(0, args.limit),
  };
}

function printMarkdown(result) {
  console.log("# Local Capability Scan\n");
  console.log("| Source | SKILL.md files |");
  console.log("| --- | ---: |");
  for (const root of result.scanned_roots) console.log(`| ${root.label} | ${root.count} |`);
  console.log(`\nExisting registry entries: ${result.existing_registry_entries}\n`);
  console.log("| Score | Name | Source | Description |");
  console.log("| ---: | --- | --- | --- |");
  for (const item of result.candidates) {
    const description = item.description.replaceAll("|", "\\|").slice(0, 140);
    console.log(`| ${item.score} | ${item.name} | ${item.source} | ${description} |`);
  }
}

const args = parseArgs(process.argv.slice(2));
const result = scan(args);
if (args.json) console.log(JSON.stringify(result, null, 2));
else printMarkdown(result);
