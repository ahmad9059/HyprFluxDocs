# Diátaxis Documentation Restructure

> Status: **Phases 1–4 complete and verified.** Phase 5 not started.
>
> Source request: apply the Diátaxis framework (Tutorial / How-to Guide /
> Reference / Explanation) to the existing HyprFluxDocs site, per the
> documentation-writer skill's workflow (audit → clarify → propose outline →
> approve → write). Restructure and clarify existing content; do not change
> routes, and do not alter previously source-verified technical facts.

---

## 0. How to Read This Plan

This master plan records the quadrant audit of the current site, the
decisions already confirmed with the maintainer, the phase order, and the
cross-cutting rules every phase must follow. Each `phase-0X-*.md` file holds
that phase's detailed page-by-page outline, files touched, and acceptance
criteria.

Phases execute **one at a time**. For each phase: I present (or have already
presented) a detailed per-page outline in the phase file, wait for approval,
write the full Markdown, then move to the next phase. This mirrors the
documentation-writer skill's own workflow, applied per phase instead of per
page, since the phases are the natural page-groupings for this site.

This plan is independent of, and does not modify, the completed
`docs/plans/hyprfluxdocs-current-source-modernization/` initiative. That
project established the verified technical facts this plan is restructuring;
it is not being re-opened here.

---

## 1. Audit: Current Site Mapped to Diátaxis Quadrants

| Quadrant | Current pages | Fit |
|---|---|---|
| **Tutorial** (learning-oriented, guided first success) | None cleanly exists. `general/quickstart.md` is a path-selector hub, not a narrated lesson. `general/iso-installation.md` and `general/installation.md` are step-by-step but written in how-to voice. | **Gap.** No true beginner-friendly, narrated "do this, see this result" tutorial exists. |
| **How-to Guide** (problem-oriented recipe) | `general/download.md`, `general/troubleshooting.md`, `general/installation.md`, `general/iso-installation.md`, `complete/arch.md`, `complete/hyprflux.md`, `hyprland/userkeybindings.md`; task-oriented sections buried inside several `features/*.md` pages. | Good candidates exist but several are entangled with reference/explanation prose on the same page. |
| **Reference** (information-oriented, technical) | All 13 pages in `hyprland/*.md` except `index.md` (`hyprland.lua`, `monitors.lua`, `workspaces.lua`, `env-variables.lua`, `hypridle.conf`, `hyprlock.conf`, `application-style.conf`, `user-defaults.lua`, `user-animations.lua`, `user-decorations.lua`, `user-settings.lua`, `window-rules.lua`, `startup-apps.lua`, `keybinding.md`, `scripts.md`) and all 3 `keybindings/*.md` pages. | **Largest, strongest quadrant already.** Mainly needs a consistency/voice pass and separation from embedded explanation/how-to prose. |
| **Explanation** (understanding-oriented, discursive) | `hyprland/index.md` (architecture overview) and `features/hyprland.md` ("Hyprland in HyprFlux") lean this way but are entangled with reference tables and how-to snippets. | **Weakest quadrant.** No page is purely "why it's built this way." |
| **Not a doc quadrant** (Diátaxis explicitly excludes these) | `index.md` (marketing home), `general/showcase.md` (gallery), `blog/*.md` (release notes/articles). | Out of scope for this plan. |
| **Mixed/unclear** | `features/*.md` (`waybar`, `rofi`, `swaync`, `hyprlock`, `kitty`, `nvim`, `yazi`, `cava`, `wlogout`, `qt-theming`, `wallpapers`) — each blends "what it is" (explanation), "current config" (reference), and "how to change X" (how-to) in one page per component. | Needs per-page internal restructuring, not a file split (see §3). |

**Bottom line:** the site is Reference-heavy, has no real Tutorial, a
thin/tangled Explanation layer, and several How-to candidates buried inside
component pages.

---

## 2. Architecture Decision: Building the Tutorial Without New Facts

The maintainer chose "preserve verified facts, restructure only" — not the
option to add new content — while the audit found no Tutorial exists at all.
Resolution, confirmed with the maintainer:

`general/quickstart.md` (currently a path-selector hub) becomes the Tutorial —
**"Install HyprFlux for the First Time"** — narrating a single golden path
(the ISO install, automatic partitioning only) using the exact steps and
commands already verified in `general/iso-installation.md`. No new technical
claims are introduced; only voice and sequencing change. `iso-installation.md`
and `installation.md` remain the complete How-to procedures covering every
branch (manual partitioning, existing-Arch provisioning, recovery) the
Tutorial intentionally omits.

---

## 3. Approved Decisions

Sign-off was obtained in chat before this plan was written.

| # | Decision | Approved outcome |
|---|---|---|
| 1 | Scope | Whole site, all sections, executed in phases. |
| 2 | Routing | Keep every current URL/route stable. No file moves, no new top-level Diátaxis folders. Sidebar labels may change (see decision 7). |
| 3 | Fact fidelity | Preserve all previously verified technical claims exactly. Restructure, reframe, and tighten prose only — do not add new technical content. |
| 4 | Tutorial gap | Fill it by restructuring already-verified ISO-install content into `quickstart.md` (§2), not by inventing new material. |
| 5 | Audience | Same as today: Arch Linux users comfortable with a terminal, ranging from Hyprland newcomers to experienced Linux users. |
| 6 | Component pages (`features/*.md`) | Keep one page per component (stable URL). Add clear internal headings so **What it is** (explanation), **Configuration** (reference), and **Common tasks** (how-to) are distinct sections on the same page. |
| 7 | Sidebar labels | Relabel sidebar groupings in `docs/.vitepress/config.mts` to signal quadrant (e.g., a "Reference" heading over the `.config/hypr` group). No path changes. |
| 8 | Delivery | Phase by phase. Each phase's detailed outline is reviewed and approved before I write that phase's full content. |

---

## 4. Risk / Backlog Register

| # | Item | Severity | Notes |
|---|---|---|---|
| R1 | Tutorial may read as thin since it can only reuse existing facts | Medium | Acceptable per decision 3/4; if it reads as too sparse after drafting, flag rather than inventing new steps. |
| R2 | Splitting `features/*.md` into three internal sections may reveal missing facts (e.g., no documented "common tasks" for a component) | Medium | Document the gap in that phase's notes rather than inventing content; leave a short section noting what's not yet covered. |
| R3 | Moving embedded rationale out of Reference pages (`hyprland/*.md`) into Explanation may leave some Reference pages feeling terse | Low | Acceptable trade — Reference should read like a technical dictionary; verify readability isn't harmed after Phase 2. |
| R4 | Phase 5 touches `docs/.vitepress/config.mts`, the same file the completed Phase 6 canonical-URL work modified | Medium | Sidebar-label-only change; must not touch `transformPageData`, sitemap, or head metadata added by that prior initiative. Diff must be reviewed for scope creep. |
| R5 | `pnpm docs:check` (from the prior modernization plan) asserts specific tokens/routes exist in several of these pages | Medium | Re-run `pnpm docs:check` and the production build after every phase that edits page content; update the validator only if a check's assumption about page structure (not facts) needs adjusting. |
| R6 | Per-phase content audits | Low | Resolved across all four content phases: Phase 2 (19 files) needed 2 small edits, Phase 3 (2 files) needed content relocation rather than rewriting, and Phase 4 (11 files) needed only heading/structure changes with zero factual edits. Every phase confirmed the prior source-modernization work had already produced accurate, well-organized content — this restructuring initiative has consistently been presentation-layer work, not a content rewrite. |

---

## 5. Phase Map

| Phase | Title | Status |
|---|---|---|
| 1 | [Tutorial and Onboarding How-To](./phase-01-tutorial-and-onboarding-howto.md) | Complete and verified |
| 2 | [Reference Cleanup](./phase-02-reference-cleanup.md) | Complete and verified |
| 3 | [Explanation](./phase-03-explanation.md) | Complete and verified |
| 4 | [Component Pages](./phase-04-component-pages.md) | Complete and verified |
| 5 | [Navigation Labels](./phase-05-navigation-labels.md) | Not started |

Five phases match the quadrant/section groupings already agreed with the
maintainer; each is an independently reviewable diff.

---

## 6. Cross-Cutting Rules

1. **No route changes.** Every existing page keeps its current path. No new
   pages are created except where explicitly approved (none currently).
2. **No new facts.** Preserve every previously verified technical claim;
   only restructure, reframe, and tighten prose to fit the correct quadrant.
3. **One phase at a time.** Present that phase's detailed page-by-page
   outline, wait for approval, then write full content, then move on.
4. **Keep quadrants separate.** A rewritten page must not silently blend
   explanation, reference, and how-to back together — use clear headings.
5. **Verify after every content phase.** Run `pnpm docs:check` and the
   production VitePress build after any phase that edits page content.
6. **Protect the prior initiative.** Do not modify
   `docs/plans/hyprfluxdocs-current-source-modernization/*` or reopen its
   verified facts; this plan restructures presentation, not accuracy.
7. **Log real gaps, don't fill them silently.** If restructuring a page
   surfaces a genuinely missing fact (e.g., no documented common task), note
   it in that phase's file rather than inventing content.

---

## 7. Next Step

Phases 1–4 are complete and verified. Only Phase 5 remains: relabel the
`docs/.vitepress/config.mts` sidebar groups to signal each section's
Diátaxis quadrant, touching labels only — no `link` values, and nothing
else in that file (see Risk R4 and `phase-05-navigation-labels.md`).
