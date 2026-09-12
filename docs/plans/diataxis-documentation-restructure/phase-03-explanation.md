# Phase 3 — Explanation

Depends on: Phase 2 complete and verified

Status: **Complete and verified.** See §7 — the actual content flow ran the
opposite direction from what this file originally anticipated: Phase 2 found
almost no explanation-shaped prose to hand off, while Phase 3 found
reference-shaped content on these two pages that needed to move *out* to
Reference pages instead.

---

## 1. Goal

Build the site's weakest quadrant into something real: pages whose only job
is to help a reader understand *why* HyprFlux is built the way it is, with no
step-by-step instructions and no field-by-field tables.

## 2. Scope

### In scope
- `docs/hyprland/index.md` — currently "Hyprland Configuration Architecture."
  Reframe purely as Explanation: why the configuration is split into Lua
  modules, why the load order is what it is, the design reasoning behind the
  entrypoint/module split. Any remaining pure-reference content (e.g., a
  file-listing table) is trimmed to a brief pointer, with full detail living
  in the Phase 2 reference pages it points to.
- `docs/features/hyprland.md` — currently "Hyprland in HyprFlux." Reframe as
  Explanation: Hyprland's role in the overall desktop stack, and the
  reasoning behind key architectural choices already documented elsewhere
  (e.g., the Lua migration, AWWW over SWWW) — discussion, not instructions.
- Explanation-shaped prose received from Phase 2's cleanup, integrated into
  one of these two pages rather than left orphaned.

### Out of scope
- Any `features/*.md` page other than `hyprland.md` (Phase 4).
- Any `hyprland/*.md` reference page other than `index.md` (already handled
  in Phase 2).
- New technical claims. This phase organizes and reframes existing verified
  reasoning; it does not invent new rationale that isn't already implied or
  stated somewhere in the current docs or source-verified phase work.

## 3. Approach

1. Re-read both in-scope pages in full, plus whatever explanation-shaped
   content Phase 2 relocated out of the reference pages.
2. Draft a detailed outline for each page (discussion topics, not steps),
   presented for approval before writing.
3. Ensure each page reads as a discussion: background, reasoning, trade-offs
   — actively avoid slipping into a tutorial ("do this") or reference
   ("field X defaults to Y") voice.
4. Cross-link from Reference pages (Phase 2) to these Explanation pages
   where a reader would benefit from the "why," instead of re-explaining it
   inline.

## 4. Files Touched

- `docs/hyprland/index.md`
- `docs/features/hyprland.md`
- `docs/hyprland/hyprland.md` (received the consolidated load-order list
  relocated out of `index.md`; not originally scoped, added per §7)

## 5. Acceptance Criteria / QA Checklist

- [x] Neither page contains a numbered step-by-step procedure.
- [x] Neither page contains a field-by-field configuration table (the exact
      16-item load-order list moved to `hyprland/hyprland.md`, its natural
      reference home; the migration name-mapping table stayed, see §7).
- [x] Every claim in these pages is traceable to content already present in
      the current docs — nothing new is asserted; two points (the load-order
      "additive, not overriding" model and the Lua-loop vs. copied-lines
      contrast) are new *synthesis* of already-documented facts, not new
      facts themselves.
- [x] Reference pages that previously held related content now link here (or
      vice versa) instead of repeating it.
- [x] `pnpm docs:check` passes.
- [x] The production VitePress build succeeds.
- [x] `git diff --check` is clean.

## 6. Open Questions

- None outstanding.

## 7. Audit Finding and Implementation Notes

Re-reading both pages in full showed the opposite problem from what this
file originally assumed. Phase 2's audit had already found almost no
explanation-shaped prose sitting in the Reference pages to hand off here.
Instead, **these two pages themselves were almost entirely Reference
content** (a directory tree, a 16-item numbered load order, a full
old-to-new filename mapping table, and repeated `hl.*` syntax snippets) with
very little actual discussion of *why* the system works this way.

No source in this repository — including the completed
`hyprfluxdocs-current-source-modernization` plan — states *why* HyprFlux
chose Lua over Hyprlang, *why* it's split into these particular modules, or
*why* generated files are separate from user files, beyond describing *that*
these things are true. Per the phase's own constraint (no new technical
claims), I did not invent that motivational history. Instead, both pages
were rewritten around **synthesis**: connecting facts that are already
independently verified and documented across multiple Reference pages into
one coherent explanation of how the pieces relate and what that means for a
reader — which is itself a legitimate and common form of Diátaxis
Explanation, distinct from "why we chose this" origin-story writing.

Two examples of that synthesis, each with a citation back to the reference
fact it's built from:

- **"Load order is a dependency chain, not a priority list."** This single
  framing explains two facts that were previously documented separately and
  without connective context: why `env-variables.lua` must load first
  (`hyprland/hyprland.md`) and why `SUPER+K`/`SUPER+O`/`SUPER+SHIFT+W`
  collide (`hyprland/keybinding.md`, `keybindings/hyprland.md`). Both facts
  already existed; the page now explains the one underlying rule that makes
  both of them make sense.
- **"From Hyprlang to Lua"** cites the already-documented numeric-workspace
  `for` loop in `configs/keybinds.lua` ("instead of 30 copied
  declarations," per `hyprland/keybinding.md`) as the concrete illustration
  of what a real language adds over a static assignment format.

### Content relocated, not just reframed

- The exact 16-item numbered load order moved from `hyprland/index.md` to a
  new **Complete Load Order** section on `hyprland/hyprland.md` — its
  natural single-file reference home, consolidating what that page already
  showed piecemeal across four code-block sections. This is a Phase 3-driven
  edit to a file Phase 2 had already reviewed; Phase 2's own finding ("no
  further changes needed") still stands for the reasons Phase 2 examined —
  this addition serves Phase 3's cleanup, not a Phase 2 gap.
- The standalone "Validate the Complete Configuration" section on
  `hyprland/index.md` was removed as a near-verbatim duplicate of
  `hyprland/hyprland.md#validation`; the Explanation page now links there
  instead.
- `features/hyprland.md`'s "Current Lua Model" and "Validate Changes"
  sections (both duplicating syntax and commands already reference-owned
  elsewhere) were removed in favor of links to the owning reference pages.
- The "Start Customizing" / "Quick Reference: Where to Make a Change" table
  (a goal→file lookup index, not a field-by-field configuration table)
  was kept on `features/hyprland.md`, clearly bounded under its own heading,
  since it doesn't have a better single-file home and a lookup index is
  reference-flavored support material rather than a violation of the
  no-configuration-table criterion.
- The old-to-current filename mapping table stayed on `hyprland/index.md`
  for the same reason: it's about the whole tree, not any one file, so no
  better single-page home exists for it under the "no new pages" constraint.

### Verification

Checked in-browser: both pages render with exactly one H1, no horizontal
overflow, zero console errors/warnings. All three new cross-reference
anchors were confirmed to resolve to a real heading ID on their target page:
`/hyprland/hyprland#complete-load-order`,
`/keybindings/hyprland#known-collisions`, and
`/hyprland/keybinding#generate-repeated-bindings`. `pnpm docs:check` and the
production build both pass; `git diff --check` is clean.
