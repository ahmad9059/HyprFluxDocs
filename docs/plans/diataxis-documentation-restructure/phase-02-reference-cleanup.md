# Phase 2 — Reference Cleanup

Depends on: Phase 1 complete and verified

Status: **Complete and verified.** All 19 in-scope files were re-read in
full; see §7 for the audit finding and the two changes it produced.

---

## 1. Goal

Make every page in `hyprland/*.md` (except `index.md`) and `keybindings/*.md`
read as pure Reference: technical description of the machinery — location,
structure, fields, defaults, valid values, load order — with any embedded
"why" (explanation) or "how do I change this" (how-to) prose moved to a
clearly separate section or a pointer link, not deleted.

## 2. Scope

### In scope
- `docs/hyprland/hyprland.md` (`hyprland.lua` entrypoint)
- `docs/hyprland/monitors.md` (`monitors.lua`)
- `docs/hyprland/workspaces.md` (`workspaces.lua`)
- `docs/hyprland/envariables.md` (`env-variables.lua`)
- `docs/hyprland/hypridle.md` (`hypridle.conf`)
- `docs/hyprland/hyprlock.md` (`hyprlock.conf`)
- `docs/hyprland/application-style.md` (`application-style.conf`)
- `docs/hyprland/01-userdefaults.md` (`user-defaults.lua`)
- `docs/hyprland/animation.md` (`user-animations.lua`)
- `docs/hyprland/userdecorations.md` (`user-decorations.lua`)
- `docs/hyprland/usersettings.md` (`user-settings.lua`)
- `docs/hyprland/windowrules.md` (`window-rules.lua`)
- `docs/hyprland/startup_apps.md` (`startup-apps.lua`)
- `docs/hyprland/userkeybindings.md` (customizing `user-keybinds.lua` — this
  page is already how-to-shaped; confirm its how-to framing stays, or extract
  a "Customize your keybindings" how-to section separate from the reference
  table it points to)
- `docs/hyprland/keybinding.md` (base `keybinds.lua` authoring model)
- `docs/hyprland/scripts.md`
- `docs/keybindings/hyprland.md`
- `docs/keybindings/neovim.md`
- `docs/keybindings/tmux.md`

### Out of scope
- `docs/hyprland/index.md` (Phase 3 — Explanation)
- Any `features/*.md` page (Phase 4)
- Any technical fact, default value, or claim — content only moves between
  sections or pages that already exist; nothing new is asserted.

## 3. Approach

1. Re-read each in-scope file in full.
2. Classify every paragraph/section as Reference, Explanation, or How-to.
3. Keep Reference content in place, tightened to a consistent
   dictionary-style voice (short declarative sentences, tables where the
   source already documents fields/defaults).
4. Where a paragraph is really Explanation (a "why"), either move it to
   `hyprland/index.md` or `features/hyprland.md` (Phase 3) if it's general,
   or keep a one-sentence pointer plus a link if it's specific to that one
   file.
5. Where a paragraph is really How-to (a "to change X, do Y"), keep it in
   place under a clearly labeled "Customizing this file" section, or link to
   `userkeybindings.md`-style dedicated how-to content if one already exists
   for that file.
6. Do not merge or delete any file; every current route stays.

## 4. Files Touched

The 19 pages listed in §2 "In scope" (16 `hyprland/*.md` files plus 3
`keybindings/*.md` files).

## 5. Acceptance Criteria / QA Checklist

- [x] Every in-scope page has a consistent structure: file location, load
      context, then field-by-field or section-by-section technical
      description. (Already true for all 19 before this phase; verified.)
- [x] No default value, field name, path, or behavioral claim changed from
      what is currently documented.
- [x] Explanation-shaped prose is either moved to Phase 3's Explanation pages
      or reduced to a short pointer, not left blended into the reference
      body. (Audit found no genuinely misplaced explanation prose to move —
      see §7.)
- [x] How-to-shaped prose is clearly headed as such within the page (not
      required to move, per the approved component-page pattern).
- [x] All internal links between these 19 pages and the rest of the site
      still resolve.
- [x] `pnpm docs:check` passes.
- [x] The production VitePress build succeeds.
- [x] `git diff --check` is clean.

## 6. Open Questions

- None outstanding.

## 7. Audit Finding and Implementation Notes

All 19 in-scope files were read in full. The honest finding: **this quadrant
was already in excellent shape** from the prior source-modernization work.
Every `hyprland/*.md` module page already follows one consistent pattern —
`Path:` line, pinned-revision source link, one-paragraph purpose statement,
technical body (code blocks, tables of current values/fields), and a closing
`## Validation` section with real commands. The 3 `keybindings/*.md` pages
are already pure, line-numbered-and-sourced reference tables.

Very little content needed to move between quadrants. What looks
explanation-shaped at first glance (e.g., `hyprland.md`'s "Why Environment
Loads First," describing a required module load order) is a technical
dependency statement, not "why we designed it this way" discussion — that is
legitimate Reference content, not misplaced Explanation. What looks
how-to-shaped (e.g., `monitors.md`'s numbered nwg-displays procedure,
`startup_apps.md`'s "Add a Startup Application") was already isolated in its
own clearly headed section, satisfying the phase's "keep it in place under a
clearly labeled section" rule without requiring a move.

Given cross-cutting rule 7 (log real gaps, don't fill them silently) and the
sibling rule against manufacturing unnecessary churn in carefully
source-verified content, only the two changes the audit actually justified
were made:

1. **`hyprland/userkeybindings.md`** — H1 renamed from "Customize
   `user-keybinds.lua`" to "`user-keybinds.lua`," matching the plain-filename
   title convention used by every sibling module page (`user-defaults.lua`,
   `user-settings.lua`, `user-decorations.lua`, etc.). The imperative
   "Customize" wording was the one outlier suggesting How-to voice on an
   otherwise Reference-shaped page; no content changed.
2. **`hyprland/monitors.md`** — the "Recommended Workflow" heading was
   renamed to "How to Apply a New Monitor Layout" so its already-separate,
   already-numbered procedure unambiguously signals its How-to nature within
   the surrounding Reference page. No content changed.

No file was split, moved, or had a route change. No default value, command,
path, or behavioral claim was altered anywhere in the 19 files. Verified
in-browser: both edited pages render correctly (confirmed via their on-page
outline and rendered heading), zero console errors, and `pnpm docs:check`
plus the production build both pass.
