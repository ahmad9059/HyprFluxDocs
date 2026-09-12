# Phase 4 — Component Pages

Depends on: Phase 3 complete and verified (Explanation home for
`features/hyprland.md` sets the pattern the other component pages follow)

Status: **Complete and verified.** See §7 for the audit finding and
implementation notes.

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

- [x] Every in-scope page has the same three-section skeleton in the same
      order (`## What It Is` → `## Configuration` → `## Common Tasks`, with
      `## Related pages` retained as an unnested trailing footer, as before).
- [x] No default value, keybinding, path, or behavioral claim changed from
      what is currently documented.
- [x] Where a "Common tasks" section would otherwise be thin, the page still
      only contains genuinely task-oriented content already present in the
      source pages — no page needed an explicit "nothing to see here" note,
      since all 11 already had real task/troubleshooting content (see §7).
- [x] Cross-links to `keybindings/*.md`, `hyprland/*.md` reference pages, and
      `general/troubleshooting.md` are all preserved exactly (no link text or
      target was touched); no new cross-links were required.
- [x] `pnpm docs:check` passes.
- [x] The production VitePress build succeeds.
- [x] `git diff --check` is clean.

## 6. Open Questions

- None outstanding.

## 7. Audit Finding and Implementation Notes

All 11 pages were re-read in full before writing. Consistent with Phases 2
and 3's findings, **the content itself needed no factual changes** — every
page already opened with a positioning paragraph, already had an "Ownership"
table and technical settings tables, and already had troubleshooting/
customization/validation sections near the end. What was missing was purely
structural: none of the three zones had an explicit heading, so a reader
(or the sidebar's on-page outline) saw ten or more same-level H2 sections
with no signal of which were background, which were settings, and which
were actionable.

The restructuring applied one consistent classification rule across all 11
pages:

- **What It Is** — the opening positioning paragraph(s) and source-snapshot
  line; on `hyprlock.md`, also the short "Components" role table, since it
  sets the scene for a workflow rather than a single file.
- **Configuration** — tables and prose describing what is currently shipped,
  installed, or generated: ownership tables, settings tables, configuration
  trees/chains, styling and color-generation mechanisms, and (on
  `wlogout.md`) the internal lock-action wiring chain, since it describes
  *how the shipped button is wired*, not an action the reader takes.
- **Common Tasks** — everything the reader actively does: launch commands,
  reload/restart/troubleshooting steps, safe-customization procedures,
  validation commands, and interactive control tables (e.g. Waybar's
  "Common interactions," which describes what clicking each control does).

Two pages needed a small consolidation rather than a pure relabel:

- **`qt-theming.md`**, which documents several diagnosed first-boot/Qt
  precedence conflicts, had its three separate diagnostic command snippets
  (opening the Qt controllers, checking the live `QT_QPA_PLATFORMTHEME`
  environment variable, checking `gsettings`/Qt config values) consolidated
  into one "Diagnose the active theme" Common Tasks section, since the
  page's whole premise is that the shipped tables describe intent, not
  necessarily the running system.
- **`cava.md`** had its two diagnostic commands (run the Waybar adapter
  directly, stop only that adapter process) pulled out of the "Waybar Cava"
  configuration description into a small "Launch and diagnose" Common Tasks
  section, alongside the existing terminal `cava` launch command.
- **`yazi.md`**'s original "## Configuration" heading was renamed to
  "### Configuration Files" once nested under the new page-level
  "## Configuration" heading, to avoid a heading literally repeating its own
  parent.

No page's frontmatter was touched (none of the 11 had a frontmatter block
before this phase, consistent with the sibling `hyprland/*.md` convention),
no link target changed, and no route changed.

### Verification

Checked in-browser across all 11 pages at both 1440×1000 and a 390×844
mobile viewport: exactly one H1 per page, identical
What It Is/Configuration/Common Tasks/Related-pages heading skeleton, zero
console errors or warnings, and no horizontal overflow. `qt-theming.md`'s
three internal links to `#diagnose-the-active-theme` were confirmed to
resolve to the real heading ID. `pnpm docs:check` and the production build
both pass; `git diff --check` is clean.
