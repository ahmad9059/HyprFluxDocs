---
name: HyprFlux Docs
description: Write, edit, or review documentation in the HyprFluxDocs repository. Use this skill whenever a task touches HyprFlux user-facing prose, page structure, VitePress navigation, redirects, release notes, or the accuracy of documented commands against the HyprFlux source. It covers the repository house style, the merged writing standards, the Diátaxis page-type playbook, the source-verification workflow, and the checks to run before finishing. Trigger it even when the request only says "update the docs", "add a page", "fix this guide", "write a release note", or "make this clearer", and even when the file is not named.
---

# HyprFlux Docs

This repository is the source for the public documentation site at
[www.hyprflux.dev](https://www.hyprflux.dev). It is built with VitePress and Tailwind
CSS, and it also hosts the Vercel functions that serve the one-line installer.
The readers are Arch Linux users who are comfortable in a terminal, from
Hyprland newcomers to experienced users.

The goal is text that reads like a maintainer wrote it for a competent peer,
not like a brochure. Every page must be accurate against the actual HyprFlux
source, and free of the patterns that make writing look machine-generated.

## The standards, merged

This repo follows four frameworks. They are merged into one operative ruleset in
`references/standards.md`. Read that file before a substantial rewrite.

1. **ASD-STE100, STE-flavored mode.** Sentence mechanics: active voice, short
   sentences, one idea per sentence, no semicolons, no phrasal verbs. Apply the
   structural rules in full and the lexical rules as a direction of travel.
2. **ISO 24495-1 plain language.** The acceptance test: the page must be
   relevant, findable, understandable, and usable.
3. **Google developer documentation style guide.** Formatting, punctuation,
   lists, code, UI text, links, procedures, and notices.
4. **Diátaxis.** Which kind of page you are writing. See `page-types.md`.

When two sources disagree, the repository's own rules win, then Google, then
STE, then ISO 24495-1. The repository overrides are listed in
`references/standards.md`.

The essentials:

- Write in second person, present tense, active voice. Address the reader as
  "you".
- Keep sentences under about 25 words. Use one instruction per sentence.
- No em dashes. No emojis. Minimal bold. No semicolons.
- Keep paragraphs short, but do not make every sentence its own paragraph.
- Use tables only for real data. Do not turn prose into a table.
- Lead with the practical instruction or the example.
- Prefer concrete commands and file paths over abstract description.
- Keep Linux and Hyprland terminology. Do not oversimplify concepts such as
  compositors, systemd user units, or Lua module loading.

## Start here

Before you change a word:

1. **Pick the page type.** Use `references/page-types.md`. Mixing the types on
   one page is the most common structural mistake here.
2. **Verify against the source.** The HyprFlux source is a sibling checkout at
   `../HyprFlux`. Do not trust an existing page or your memory for a command,
   path, default, or feature claim. `references/repo-map.md` lists where each
   fact lives.

If the source is not available, say so and mark the unverified claim rather
than guessing. Never invent a feature, a flag, a file path, or a compatibility
statement.

## Repository rules that are easy to break

- **Do not change routes.** A page keeps its path. If you add one, add it to
  the sidebar in `docs/.vitepress/config.mts` and to `expectedRoutes` in
  `scripts/check-docs.mjs`.
- **Preserve anchors.** Pages link to headings on other pages, for example
  `/general/iso-installation#_5-choose-a-disk-method` and
  `/keybindings/hyprland#known-collisions`. VitePress checks page links at build
  time but not heading anchors. If you rename a heading, update every link.
- **The source pin is authoritative.** `sourceRevision` in
  `scripts/check-docs.mjs` names the HyprFlux commit the docs describe. When
  behavior changes, update the pin, the revision in `docs/public/llms.txt`, and
  the pinned source links together.
- **`.config/` is canonical in HyprFlux.** `base-dots/config/` is a parity
  mirror.
- **Do not edit HyprFlux source or config files** as part of a docs task unless
  the user asks.
- **`docs/plans/` is internal history**, excluded from the published site. It is
  not a style example or a fact source.

## Workflow

1. Read the page you are changing and the source files that own the behavior.
2. Write or rewrite the page in the correct page type.
3. Run the house-style checker on what you touched:

   ```bash
   node .opencode/skills/hyprflux-docs/scripts/house-style.mjs docs/general/installation.md
   ```

   With no arguments it checks all published pages. It reports em dashes,
   emojis, filler and marketing words, semicolons in prose, over-long
   sentences, and leftover generated-page scaffolding.
4. Run the repository checks, which validate routes, assets, content tokens,
   and the source pin, then build the site:

   ```bash
   pnpm docs:check
   ```

5. Read your own diff once more for accuracy and natural language.

## Anti-patterns to remove on sight

The checker catches the mechanical ones. Watch for the rest by eye.

- The repeated page scaffold: `## What It Is`, a `> Source snapshot`
  blockquote, `### Ownership`, `## Common Tasks`, `## Related pages`. State the
  same facts in the shape the page needs.
- Meta-instructions aimed at a writer: "Do not document those lines as ...",
  "Documentation should not present the typo as ...". State the fact.
- Marketing adjectives: seamless, robust, powerful, effortless, cutting-edge.
  Delete, or replace with the measurement that earns the claim.
- Filler openers: "It is important to note that", "Please note", "Keep in
  mind", "In order to".
- Synonym rotation: "user", then "customer", then "client" for one thing. Pick
  one word.
- Enumerating options a tutorial should not offer. A tutorial has one path.
- Sections that exist only to look complete. If a section carries no
  information a reader would act on, delete it.

## Bundled resources

- `references/standards.md` - the merged standards: STE-flavored rules,
  ISO 24495-1 principles, Google style rules, and the repository overrides,
  with before and after examples.
- `references/page-types.md` - the Diátaxis playbook for this repo.
- `references/repo-map.md` - where each fact lives, and how to verify it.
- `scripts/house-style.mjs` - the deterministic style checker.
