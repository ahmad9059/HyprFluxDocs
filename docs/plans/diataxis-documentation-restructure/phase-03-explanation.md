# Phase 3 — Explanation

Depends on: Phase 2 complete and verified (so Reference pages no longer hold
the explanation-shaped prose this phase needs to receive)

Status: **Not started.**

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

## 5. Acceptance Criteria / QA Checklist

- [ ] Neither page contains a numbered step-by-step procedure.
- [ ] Neither page contains a field-by-field configuration table (those stay
      in Phase 2's reference pages, linked from here).
- [ ] Every claim in these pages is traceable to content already present in
      the current docs or the completed source-modernization plan — nothing
      new is asserted.
- [ ] Reference pages that previously held this explanation-shaped prose now
      link here instead of repeating it.
- [ ] `pnpm docs:check` passes.
- [ ] The production VitePress build succeeds.
- [ ] `git diff --check` is clean.

## 6. Open Questions

- The detailed per-page outline for this phase depends on knowing exactly
  what Phase 2 relocates here. It will be drafted once Phase 2 is complete,
  and presented for approval before writing.
