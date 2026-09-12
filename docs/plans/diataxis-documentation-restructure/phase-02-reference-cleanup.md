# Phase 2 — Reference Cleanup

Depends on: Phase 1 complete and verified

Status: **Not started.** Page list is known from the site audit; full
per-page content has not yet been re-read in this plan, so no detailed
per-page outline exists yet (see §6).

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

The 16 pages listed in §2 "In scope."

## 5. Acceptance Criteria / QA Checklist

- [ ] Every in-scope page has a consistent structure: file location, load
      context, then field-by-field or section-by-section technical
      description.
- [ ] No default value, field name, path, or behavioral claim changed from
      what is currently documented.
- [ ] Explanation-shaped prose is either moved to Phase 3's Explanation pages
      or reduced to a short pointer, not left blended into the reference
      body.
- [ ] How-to-shaped prose is clearly headed as such within the page (not
      required to move, per the approved component-page pattern).
- [ ] All internal links between these 16 pages and the rest of the site
      still resolve.
- [ ] `pnpm docs:check` passes.
- [ ] The production VitePress build succeeds.
- [ ] `git diff --check` is clean.

## 6. Open Questions

- This phase's detailed per-page outline (the equivalent of Phase 1 §3) has
  not been produced yet — it requires re-reading all 16 files' current
  content first. That outline will be drafted and presented for approval at
  the start of this phase, before any file is rewritten.
