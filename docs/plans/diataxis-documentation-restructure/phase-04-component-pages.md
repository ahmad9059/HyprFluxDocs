# Phase 4 — Component Pages

Depends on: Phase 3 complete and verified (Explanation home for
`features/hyprland.md` sets the pattern the other component pages follow)

Status: **Not started.**

---

## 1. Goal

Restructure every remaining `features/*.md` page so it contains three
clearly headed, internally consistent sections — **What it is**
(explanation), **Configuration** (reference), **Common tasks** (how-to) — on
the same page, at the same URL, per the approved decision to keep one page
per component rather than splitting into separate files.

## 2. Scope

### In scope
- `docs/features/waybar.md`
- `docs/features/rofi.md`
- `docs/features/swaync.md`
- `docs/features/hyprlock.md`
- `docs/features/kitty.md`
- `docs/features/nvim.md`
- `docs/features/yazi.md`
- `docs/features/cava.md`
- `docs/features/wlogout.md`
- `docs/features/qt-theming.md`
- `docs/features/wallpapers.md`

### Out of scope
- `docs/features/hyprland.md` (handled in Phase 3 as pure Explanation, not
  this three-section pattern — its scope is architectural, not a single
  component).
- Any `hyprland/*.md` or `keybindings/*.md` page.
- New technical claims. If a component page currently has no documented
  "common task," that gap is noted rather than invented (see Risk R2 in the
  master plan).

## 3. Approach

1. Re-read each in-scope page in full.
2. Classify existing content into the three target sections.
3. Draft a per-page outline (which existing paragraphs go where, and what,
   if anything, is genuinely missing from "Common tasks") and present it for
   approval before writing — following the same pattern as Phase 1 §3.
4. Rewrite each page with explicit `## What it is`, `## Configuration`, and
   `## Common tasks` headings (exact heading text to be confirmed per page
   during outline review, e.g. some pages may need a fourth short
   "Troubleshooting" pointer to `general/troubleshooting.md` instead of
   duplicating it).
5. Keep the URL, frontmatter title/description, and every technical fact
   unchanged — this is a within-page reshuffle, not new content.

## 4. Files Touched

The 11 pages listed in §2 "In scope."

## 5. Acceptance Criteria / QA Checklist

- [ ] Every in-scope page has the same three-section skeleton in the same
      order.
- [ ] No default value, keybinding, path, or behavioral claim changed from
      what is currently documented.
- [ ] Where a "Common tasks" section would otherwise be empty, the page
      says so explicitly (e.g., links to troubleshooting) rather than
      inventing a task.
- [ ] Cross-links to `keybindings/*.md`, `hyprland/*.md` reference pages, and
      `general/troubleshooting.md` are preserved or added where the
      three-section split makes a link more appropriate than inline repeat.
- [ ] `pnpm docs:check` passes.
- [ ] The production VitePress build succeeds.
- [ ] `git diff --check` is clean.

## 6. Open Questions

- The detailed per-page outline for this phase has not been produced yet —
  it requires re-reading all 11 files' current content first. That outline
  will be drafted and presented for approval at the start of this phase.
