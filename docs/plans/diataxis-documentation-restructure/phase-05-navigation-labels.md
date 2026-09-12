# Phase 5 — Navigation Labels

Depends on: Phases 1–4 complete and verified (labels should describe what the
pages actually are by this point)

Status: **Not started.**

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

- [ ] No `link` value in `themeConfig.sidebar` or `nav` changed.
- [ ] No other part of `config.mts` (head metadata, sitemap, `transformPageData`,
      Vite config) was touched.
- [ ] Sidebar group labels clearly signal each page's Diátaxis quadrant.
- [ ] `pnpm docs:check` passes.
- [ ] The production VitePress build succeeds.
- [ ] `git diff --check` is clean, and the diff is limited to label text.

## 6. Open Questions

- Exact label wording will be proposed once Phases 1–4 show where pages
  actually ended up (particularly Phase 2's relocation of explanation-shaped
  prose and Phase 4's per-component sections).
