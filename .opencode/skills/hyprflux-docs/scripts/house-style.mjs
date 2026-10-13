#!/usr/bin/env node
// House-style checker for the HyprFlux docs.
//
// Deterministic pass over the mechanical rules from the merged standards
// (references/standards.md). It cannot judge page type, accuracy, or tone;
// use it to catch punctuation, filler, and scaffolding that slip in.
//
// Usage:
//   node scripts/house-style.mjs                  # all published pages
//   node scripts/house-style.mjs docs/general     # a directory
//   node scripts/house-style.mjs docs/a.md b.md   # specific files
//   node scripts/house-style.mjs --json           # machine-readable output
//   node scripts/house-style.mjs --strict         # warnings also fail
//   node scripts/house-style.mjs --max 20         # max sentence words
//
// Exit code 1 when an error is found (or, with --strict, a warning).

import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  "..",
);

// ---------- options ----------
const argv = process.argv.slice(2);
const opts = { json: false, strict: false, max: 25, targets: [] };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--json") opts.json = true;
  else if (a === "--strict") opts.strict = true;
  else if (a === "--max") opts.max = Number(argv[++i]) || 25;
  else if (a === "--help" || a === "-h") {
    console.log(
      "Usage: house-style.mjs [--json] [--strict] [--max N] [files or dirs]",
    );
    process.exit(0);
  } else opts.targets.push(a);
}

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "cache",
  ".vitepress",
  "plans",
]);

// ---------- rules ----------
const BANNED = [
  [/\bseamless(ly)?\b/i, "marketing adjective: seamless"],
  [/\brobust(ly)?\b/i, "marketing adjective: robust"],
  [/\bleverag(e|es|ed|ing)\b/i, "buzzword: leverage"],
  [/\bdelv(e|es|ed|ing)\b/i, "filler verb: delve"],
  [/\beffortless(ly)?\b/i, "marketing adjective: effortless"],
  [/\bcutting[-\s]edge\b/i, "marketing adjective: cutting-edge"],
  [/\bblazing[-\s]?fast\b/i, "marketing adjective: blazing-fast"],
  [/\butiliz(e|es|ed|ing)\b/i, "wordy: use 'use'"],
  [/\bin order to\b/i, "wordy: use 'to'"],
  [/\bnote that\b/i, "filler: 'note that'"],
  [/\bit (is|'s) important to\b/i, "filler opener"],
  [/\bworth noting\b/i, "filler opener"],
  [/\bplease note\b/i, "filler: 'please note'"],
  [/\bat this time\b/i, "filler: 'at this time'"],
  [/\bmake sure to\b/i, "wordy: state the action"],
  [/\bstate[-\s]of[-\s]the[-\s]art\b/i, "marketing phrase"],
  [/\bbest[-\s]in[-\s]class\b/i, "marketing phrase"],
  [/\bworld[-\s]class\b/i, "marketing phrase"],
  [/\bgame[-\s]chang(er|ing)\b/i, "marketing phrase"],
  [/\bnext[-\s]level\b/i, "marketing phrase"],
  [/\btop[-\s]notch\b/i, "marketing phrase"],
  [/\bunleash(es|ed|ing)?\b/i, "marketing verb"],
  [/\bempower(s|ed|ing)?\b/i, "marketing verb"],
  [/\bstreamlin(e|es|ed|ing)\b/i, "marketing verb"],
  [/\bdive into\b/i, "phrasal verb: use 'read' or 'start'"],
  [/\breach out\b/i, "phrasal verb: use 'contact'"],
  [/\bspin up\b/i, "phrasal verb: use 'start'"],
  [/\bkick off\b/i, "phrasal verb: use 'start'"],
  [/\bplease\b/i, "courtesy filler in instructions"],
  [/\bsimply\b/i, "minimizer: 'simply'"],
  [/\beasily\b/i, "minimizer: 'easily'"],
];

const SCAFFOLD = [
  [/^#{1,6}\s+what it is\s*$/i, "generated scaffold heading: 'What It Is'"],
  [/^#{1,6}\s+ownership\s*$/i, "generated scaffold heading: 'Ownership'"],
  [/^>\s*source snapshot/i, "generated scaffold: 'Source snapshot' blockquote"],
];

const DASH = /[\u2014\u2013]/; // em dash, en dash
const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/u;

// ---------- helpers ----------
async function collect(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".") {
      if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      out.push(...(await collect(full)));
    } else if (entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

async function resolveTargets() {
  if (opts.targets.length === 0) {
    const t = [];
    const docs = path.join(repoRoot, "docs");
    if (existsSync(docs)) t.push(...(await collect(docs)));
    const readme = path.join(repoRoot, "README.md");
    if (existsSync(readme)) t.push(readme);
    return t;
  }
  const t = [];
  for (const target of opts.targets) {
    const full = path.resolve(process.cwd(), target);
    if (!existsSync(full)) continue;
    const s = await stat(full);
    if (s.isDirectory()) t.push(...(await collect(full)));
    else if (full.endsWith(".md")) t.push(full);
  }
  return t;
}

function stripInline(text) {
  return text
    .replace(/`[^`]*`/g, " CODE ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " IMAGE ") // images
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, "$1") // links keep text
    .replace(/https?:\/\/\S+/g, " URL ")
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(^|[\s(])([*_])([^*_\s][^*_]*?)\2(?=[\s.,;:!?)]|$)/g, "$1$3") // italic
    .replace(/^\s*(>|[-*+]|\d+\.)\s+/, "") // blockquote and list markers
    .replace(/<[^>]+>/g, " "); // html tags
}

function wordCount(text) {
  return text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

function scan(text, file) {
  const findings = [];
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let inFrontmatter = false;
  let frontmatterDone = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const lineNo = i + 1;

    if (lineNo === 1 && raw.trim() === "---") {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (raw.trim() === "---") inFrontmatter = false;
      continue;
    }

    if (/^\s*(```|~~~)/.test(raw)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    // raw checks that include code spans
    if (DASH.test(raw)) {
      findings.push({ sev: "error", rule: "dash", line: lineNo, msg: "em dash or en dash" });
    }
    if (EMOJI.test(raw)) {
      findings.push({ sev: "error", rule: "emoji", line: lineNo, msg: "emoji" });
    }

    const isHeading = /^#{1,6}\s/.test(raw);
    for (const [re, msg] of SCAFFOLD) {
      if (re.test(raw)) findings.push({ sev: "warn", rule: "scaffold", line: lineNo, msg });
    }

    const prose = stripInline(raw);

    for (const [re, msg] of BANNED) {
      const m = prose.match(re);
      if (m) {
        findings.push({
          sev: "error",
          rule: "filler",
          line: lineNo,
          msg: `${msg} ("${m[0]}")`,
        });
      }
    }

    const isTableRow = raw.trim().startsWith("|");
    const isCodeLine = /^\s{4,}/.test(raw) && !isHeading;

    if (prose.includes(";")) {
      findings.push({ sev: "error", rule: "semicolon", line: lineNo, msg: "semicolon in prose" });
    }

    if (raw.includes("!") && !raw.includes("![")) {
      findings.push({ sev: "warn", rule: "exclamation", line: lineNo, msg: "exclamation mark" });
    }
    if (/\b(TODO|TBD|FIXME)\b/.test(prose)) {
      findings.push({ sev: "warn", rule: "placeholder", line: lineNo, msg: "unfinished marker" });
    }

    // sentence length: skip headings, tables, indented code blocks
    if (!isHeading && !isTableRow && !isCodeLine && raw.trim() !== "") {
      const sentences = prose.split(/(?<=[.!?])\s+/);
      for (const s of sentences) {
        const w = wordCount(s);
        if (w > opts.max) {
          findings.push({
            sev: "warn",
            rule: "long-sentence",
            line: lineNo,
            msg: `${w} words (max ${opts.max})`,
          });
          break;
        }
      }
    }
  }
  return findings;
}

// ---------- run ----------
const files = await resolveTargets();
const results = [];
let errors = 0;
let warnings = 0;

for (const file of files) {
  const text = await readFile(file, "utf8");
  const findings = scan(text, file);
  if (findings.length === 0) continue;
  for (const f of findings) {
    if (f.sev === "error") errors++;
    else warnings++;
  }
  results.push({ file: path.relative(repoRoot, file), findings });
}

if (opts.json) {
  console.log(JSON.stringify({ files: results, errors, warnings }, null, 2));
} else {
  for (const r of results) {
    console.log(`\n${r.file}`);
    for (const f of r.findings) {
      const tag = f.sev === "error" ? "error" : "warn ";
      console.log(`  ${tag} ${String(f.line).padStart(4)}  ${f.rule.padEnd(13)} ${f.msg}`);
    }
  }
  console.log(
    `\n${files.length} file(s) scanned. ${errors} error(s), ${warnings} warning(s).`,
  );
}

process.exitCode = errors > 0 || (opts.strict && warnings > 0) ? 1 : 0;
