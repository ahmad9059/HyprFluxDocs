# Phase 5 — Navigation Labels

Depends on: Phases 1–4 complete and verified (labels should describe what the
pages actually are by this point)

Status: **Complete and verified.** See §7 for the exact label diff and
implementation notes.

---

## 1. Goal

Make the Diátaxis structure visible in the sidebar without changing any
route: relabel or annotate the existing navigation groups in
`docs/.vitepress/config.mts` so a reader can see which section is a Tutorial,
which are How-to guides, which is Reference, and which is Explanation.

## 2. Scope

### In scope
- `docs/.vitepress/config.mts` — `themeConfig.sidebar` (and `nav`, if a
  top-level label needs adjusting) only.

### Out of scope
- Any route, `link` path, or page content. This phase is a labels-only diff.
- `transformPageData`, sitemap, `head` metadata, or anything else the
  completed `hyprfluxdocs-current-source-modernization` Phase 6 added to this
  same file (Risk R4 in the master plan) — must not be touched or reordered.

## 3. Approach

1. Re-read the current `themeConfig.sidebar` structure in full.
2. Propose specific label changes (e.g., a group title or a short
   description) that map the existing groups to their Diátaxis quadrant,
   informed by where each page actually landed after Phases 1–4:
   - Getting Started / onboarding group → signal Tutorial + How-to.
   - `.config/hypr` group → signal Reference.
   - Keybindings group → signal Reference.
   - Features group → signal "What it is / Configuration / Common tasks"
     component pages (mixed, per Phase 4's pattern).
   - Wherever `hyprland/index.md` and `features/hyprland.md` sit → signal
     Explanation.
3. Present the exact label diff for approval before editing the file, since
   this is the one phase touching shared site configuration.
4. Apply the change, keeping every `link` value byte-for-byte identical.

## 4. Files Touched

- `docs/.vitepress/config.mts` (sidebar/nav labels only)

## 5. Acceptance Criteria / QA Checklist

- [x] No `link` value in `themeConfig.sidebar` or `nav` changed (confirmed:
      all 44 sidebar hrefs are byte-identical to before this phase).
- [x] No other part of `config.mts` (head metadata, sitemap, `transformPageData`,
      Vite config) was touched — the diff touches only 9 `text` string
      literals inside `themeConfig.sidebar`.
- [x] Sidebar labels clearly signal each page's Diátaxis quadrant, at
      whichever level (group or item) is actually accurate for that group —
      see §7 for why a uniform group-level tag wasn't used everywhere.
- [x] `pnpm docs:check` passes.
- [x] The production VitePress build succeeds.
- [x] `git diff --check` is clean, and the diff is limited to label text.

## 6. Open Questions

- None outstanding.

## 7. Label Diff and Implementation Notes

Re-reading the full sidebar (§3 step 1) showed that not every group is
quadrant-pure, because Phases 1–4 deliberately kept some pages mixed by
design (Phase 1's onboarding pages span Tutorial and How-to; Phase 4's
component pages are each internally What It Is/Configuration/Common Tasks).
Forcing one label onto a mixed group would misrepresent it, so the actual
rule applied was: **tag the group when every item in it shares one
quadrant; tag only the individual outlier item when a group is otherwise
homogeneous; leave ambiguous or out-of-scope groups alone.**

| Group | Label change | Reasoning |
|---|---|---|
| Getting Started | Unchanged (group); items tagged: "Quick Start (Tutorial)", "Download ISO (How-to)" | Mixed group (Tutorial + How-to + the untouched Showcase gallery) — item-level tags are the honest signal here. |
| ISO Installation | → "ISO Installation (How-to)" | Its one page is How-to. |
| Existing Arch Installation | → "Existing Arch Installation (How-to)" | Both pages are How-to. |
| Operations | Unchanged (group); only "Troubleshooting" tagged "(How-to)" | `general/hardware.md` was never in scope for any phase of this initiative and hasn't been classified — tagging the whole group would be an unaudited claim. |
| Keybindings | → "Keybindings (Reference)" | All 3 pages are pure Reference (Phase 2). |
| Features | → "Features (Component Guides)"; "Hyprland" tagged "(Explanation)" | 11 of 12 pages are Phase 4's mixed component pattern, not a single quadrant — "Component Guides" describes that pattern instead of falsely claiming one quadrant. The one genuine Explanation page (`features/hyprland.md`) is tagged individually so it doesn't blend in with its 11 siblings. |
| `.config/hypr` | → "`.config/hypr` (Reference)"; "Configuration Architecture" tagged "(Explanation)" | 15 of 16 pages are pure Reference (Phase 2); `hyprland/index.md` is Phase 3's Explanation page and is tagged individually for the same reason as above. |
| Blog | Untouched | Release notes/articles are explicitly out of scope for the Diátaxis quadrants. |

### Verification

`git diff docs/.vitepress/config.mts` confirmed the entire diff is 9 string
literals with no `link`, `head`, `transformPageData`, sitemap, or Vite
config lines touched. In-browser, all 44 sidebar links were enumerated and
every `href` matches its pre-Phase-5 route exactly. Checked the rendered
sidebar at both 1440×1000 and, importantly, inside the mobile hamburger
menu at 390×844 (since several labels grew noticeably longer): no group or
item label was clipped or caused horizontal page overflow, and there were
zero console errors or warnings. `pnpm docs:check` and the production build
both pass; `git diff --check` is clean.

### Follow-up: "(How-to)" tags removed per maintainer request

After initial review, the maintainer asked to remove the "(How-to)" tags
specifically, while keeping the Tutorial/Reference/Explanation/Component
Guides tags. Reverted the four affected labels back to their original text:
"Download ISO (How-to)" → "Download ISO", "ISO Installation (How-to)" →
"ISO Installation", "Existing Arch Installation (How-to)" → "Existing Arch
Installation", and "Troubleshooting (How-to)" → "Troubleshooting". No other
label, and no `link` value, changed. Confirmed no page frontmatter `title`
anywhere in the site ever contained "How-to" — the tag existed only in these
four sidebar labels. Re-verified in-browser: the sidebar now shows exactly
the remaining tags (Quick Start (Tutorial); Keybindings (Reference); Features
(Component Guides) with Hyprland (Explanation); `.config/hypr` (Reference)
with Configuration Architecture (Explanation)), `pnpm docs:check` and the
production build still pass, and `git diff --check` is clean.
