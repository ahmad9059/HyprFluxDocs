# Phase 6 — Integrate Navigation, Metadata, Drift Checks, and Final QA

Depends on: Phases 2–5 complete

> Status: **Complete; verified 2026-09-12.** Source baseline recorded at
> `f421b6bd108214079b56c435331ddbbfdfb89591` (`v1.5.0`).

---

## 1. Goal

Integrate the rewritten content into one coherent, discoverable, deployable
documentation site. Resolve route and domain inconsistencies, preserve history
without presenting it as current guidance, add lightweight drift controls, and
run the final content, build, accessibility, responsive, link, and release QA.

## 2. Scope

### In scope

- Final navigation, sidebar, previous/next flow, cross-links, route retention,
  and redirects.
- Domain, canonical URL, social metadata, structured-data version, sitemap,
  robots, `llms.txt`, and public repository/release links.
- Historical blog archive labels and current-documentation handoffs.
- Contributor guidance for source pinning, source ownership, and release updates.
- Automated stale-token/source-drift checks that are narrow enough to avoid
  blocking legitimate historical or `.conf` references.
- Production build, internal/external link checks, mobile/desktop visual QA,
  keyboard/accessibility checks, and clean-install journey review.

### Out of scope

- New product features or source-repository changes.
- Rewriting dated release posts to make them look current.
- A broad visual redesign unrelated to documentation accuracy.
- Changing DNS, analytics accounts, external release assets, or hosting without
  separate authorization.

## 3. Detailed Tasks / Design

### 3.1 Reconcile the information architecture

Review every active route against these boundaries:

- `/general/*`: choose, install, verify, and troubleshoot HyprFlux;
- `/complete/*`: end-to-end routes that hand off to canonical detailed guides;
- `/features/*`: user workflows and outcomes;
- `/hyprland/*`: configuration architecture and file/API reference;
- `/keybindings/*`: consolidated shortcut lookup;
- `/blog/*`: dated historical announcements.

Update the manually maintained navbar and sidebars in
`docs/.vitepress/config.mts:72-201`. Remove orphan links, add missing pages,
and ensure labels use current Lua filenames and product terms. Keep duplicate
subject pages only where their intent is clearly different and they cross-link.

### 3.2 Preserve routes deliberately

Produce a route ledger containing every pre-modernization Markdown route and
one outcome:

1. retained in place;
2. retained with rewritten content;
3. redirected to a canonical replacement;
4. archived with a current-doc notice;
5. removed only when confirmed private/unpublished and unlinked.

Use VitePress-compatible redirects or thin handoff pages according to the
project's deployment behavior. Do not silently delete old script/config routes
merely because their source owner disappeared.

#### Pre-modernization route ledger

| Outcome | Routes |
|---|---|
| Retained and revised | `/`, `/complete/arch`, `/features/cava`, `/features/hyprland`, `/features/hyprlock`, `/features/nvim`, `/features/qt-theming`, `/features/rofi`, `/features/swaync`, `/features/waybar`, `/features/wlogout`, `/features/yazi`, `/general/download`, `/general/installation`, `/general/iso-installation`, `/general/quickstart`, `/general/showcase`, `/hyprland/`, `/hyprland/01-userdefaults`, `/hyprland/animation`, `/hyprland/application-style`, `/hyprland/envariables`, `/hyprland/hypridle`, `/hyprland/hyprland`, `/hyprland/hyprlock`, `/hyprland/keybinding`, `/hyprland/monitors`, `/hyprland/scripts`, `/hyprland/startup_apps`, `/hyprland/userdecorations`, `/hyprland/userkeybindings`, `/hyprland/usersettings`, `/hyprland/windowrules`, `/hyprland/workspaces`, `/keybindings/hyprland`, `/keybindings/neovim`, `/keybindings/tmux` |
| Retained as compatibility handoff | `/complete/hyprflux` |
| Retained and explicitly archived | `/blog/`, `/blog/inside-the-hyprflux-desktop`, `/blog/release-of-hyprflux`, `/blog/what-is-coming-next` |
| Redirected, removed, or renamed | None |

The ledger is derived from HyprFluxDocs baseline
`f7cefb2f943f408808bb0583e88c6d025f013d14`. The route validator also protects
the post-modernization `/features/kitty`, `/features/wallpapers`,
`/general/hardware`, and `/general/troubleshooting` routes.

Before editing, resolve the ledger into an exact allowed-file list for this
phase. Replace the open-ended entries in Section 4 with those concrete paths in
the implementation notes so final QA does not become an unbounded rewrite.

### 3.3 Normalize domain and metadata

After owner sign-off, use one canonical domain consistently across:

- `docs/.vitepress/config.mts` site metadata and sitemap;
- `docs/.vitepress/theme/structured-data.ts`;
- `docs/public/robots.txt`;
- `docs/public/llms.txt`;
- README and visible absolute links;
- deployment configuration where relevant.

The current repository conflicts: README and installer use `.dev`
(`README.md:5-19`), while VitePress and public metadata use `.org`
(`docs/.vitepress/config.mts:27-32`,
`docs/.vitepress/config.mts:62-64`,
`docs/.vitepress/theme/structured-data.ts:3-12`,
`docs/public/llms.txt:14-17`). Do not guess which one is canonical.

Update structured software versioning from the stale hardcoded `1.0.0`
(`docs/.vitepress/theme/structured-data.ts:33-39`) to an explicitly maintained
current value or a documented build-time source. Prefer the smallest mechanism
that cannot silently report a false release.

### 3.4 Treat old blog content as an archive

- Preserve dates, release context, and statements that were true at publication.
- Add a consistent archive banner to posts whose install commands, filenames,
  screenshots, or architecture are no longer current.
- Link banners to current installation, download, or configuration guides.
- Exclude blog bodies from forbidden-token checks when a historical term is
  intentionally preserved.
- Correct only broken rendering, unsafe live links, or factual claims presented
  outside their historical context.

This is particularly important for the v1.0.0 announcement, whose install and
download section is preserved at `docs/blog/release-of-hyprflux.md:47-66`.

### 3.5 Add lightweight drift checks

Add one documented docs-validation command, for example `pnpm docs:check`, that
runs the minimum reliable set:

- VitePress production build/internal-link validation;
- exact forbidden-token checks scoped to current docs, excluding blog and plan archives;
- required-current-token checks such as `hyprland.lua` and AWWW on canonical pages;
- missing local image/file detection not already covered by the build;
- optional source-owner checks when `../HyprFlux` exists, with a clear skip in
  isolated docs CI rather than a false pass.

Implement this as a small Node script only if package/build tooling cannot
express the checks clearly. Do not create a brittle parser or duplicate
VitePress link validation. The current package scripts only expose development,
build, and preview commands (`package.json:10-15`), and no project CI file
was found in the initial audit, so the new command and any workflow must be
explicitly documented.

Forbidden-token rules must be semantic and path-scoped. For example, `.conf`
cannot be globally forbidden because Hyprlock and Hypridle still use it, and
`swww` cannot be globally forbidden while it remains in the current package
manifest. Target removed filenames and obsolete user instructions instead.

### 3.6 Complete content and experience QA

Run four review passes:

1. **Source fidelity:** compare every current-state table/command against the
   pinned HyprFlux revision and any approved external owner.
2. **Journey:** follow ISO and existing-Arch paths from homepage to verification
   and troubleshooting without relying on hidden knowledge.
3. **Site integrity:** build, local links, anchors, assets, release downloads,
   canonical URLs, redirects, sitemap, robots, and `llms.txt`.
4. **Experience:** desktop/mobile layout, table overflow, code copy, focus order,
   keyboard navigation, heading hierarchy, alt text, contrast, and reduced motion.

Treat screenshots as supporting evidence, not substitutes for text. Any browser
QA should cover at minimum homepage, both install routes, one Lua reference,
one component guide, the canonical keybinding table, troubleshooting, and an
archived blog post.

### 3.7 Update contributor and release maintenance guidance

- State that public docs must be reviewed against a pinned `../HyprFlux` commit.
- Record `.config/` as canonical and `base-dots/config/` as a parity mirror,
  consistent with source CI
  (`../HyprFlux/.github/workflows/config-check.yml:80-88`).
- Add a release checklist for version metadata, latest links, checksums,
  download mirrors, homepage badges, archive notices, and `llms.txt`.
- Standardize package-manager examples after checking the committed lockfile;
  do not mix npm and pnpm commands without a stated reason. Existing contributor
  text currently uses npm (`README.md:35-49`) while pnpm project files are committed.

## 4. Files Touched

- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/structured-data.ts`
- `docs/.vitepress/theme/custom.css` (only for archive notice or responsive fixes)
- `docs/index.md`
- `docs/public/robots.txt`
- `docs/public/llms.txt`
- `docs/public/IMAGES_README.md`
- `docs/public/sw.js`
- `README.md`
- `package.json`
- `pnpm-lock.yaml` or the selected package manager's lockfile, only if changed by tooling
- Existing pages requiring final cross-links or archive banners
- `scripts/check-docs.mjs` (new if needed)
- `.github/workflows/docs.yml` (new if CI adoption is approved)
- Deployment redirect configuration or thin compatibility pages identified by
  the route ledger

## 5. Acceptance Criteria / QA Checklist

- [x] All six phase source baselines and owner decisions are recorded.
- [x] Every active page appears in navigation or has an intentional deep-link-only role.
- [x] Every old public route has a recorded retain/redirect/archive/remove outcome.
- [x] The route ledger has been converted into an exact allowed-file list before edits.
- [x] Domain, canonical URL, sitemap, robots, structured data, `llms.txt`, and
      visible absolute links use the approved host.
- [x] Structured data does not report stale version `1.0.0` for current software.
- [x] Historical blog content is preserved and clearly labeled when obsolete.
- [x] Current docs contain no obsolete installer choices, Hyprland entrypoint,
      removed script names, or wallpaper-driven-color instructions.
- [x] Legitimate Hyprlock/Hypridle `.conf` and current package references are not
      incorrectly rejected by drift checks.
- [x] One documented docs check command succeeds from a clean checkout.
- [x] The production VitePress build succeeds with no broken internal links.
- [x] Approved external release/download links return expected files/pages.
- [x] Homepage-to-install-to-troubleshooting journeys pass manual review.
- [x] Representative pages pass desktop/mobile, keyboard, focus, heading, alt
      text, contrast, overflow, and reduced-motion checks.
- [x] Contributor/release guidance identifies canonical source ownership and
      one supported package manager.
- [x] `git diff --check` and repository status show only intended changes.

## 6. Approved Decisions and Open Questions

- **Approved in Phase 1:** `hyprflux.dev` is the canonical production domain.
- Does deployment support native redirects, or should compatibility routes use
  thin Markdown handoff pages?
- Should `softwareVersion` be manually maintained from the latest release or
  injected by the deployment workflow?
- Should docs validation run in GitHub Actions immediately or first ship as a
  local maintainer command?
- **Approved in Phase 1:** pnpm is authoritative for contributors and CI.
- What browser/device matrix is required beyond one desktop and one narrow mobile viewport?

Resolved during implementation:

- No redirects were required because all pre-modernization routes remain.
- `softwareVersion` is maintained manually with the release checklist.
- CI adoption is deferred; `pnpm docs:check` is the supported local contract.
- Browser QA used 1440x1000 desktop and 390x844 mobile viewports.

## 7. Implementation Guardrail

The route review resolved Phase 6 to this exact allowed-file list before
implementation:

- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/structured-data.ts`
- `docs/.vitepress/theme/custom.css`
- `docs/index.md`
- `docs/general/quickstart.md`
- `docs/general/installation.md`
- `docs/general/iso-installation.md`
- `docs/blog/index.md`
- `docs/blog/release-of-hyprflux.md`
- `docs/blog/inside-the-hyprflux-desktop.md`
- `docs/blog/what-is-coming-next.md`
- `docs/public/robots.txt`
- `docs/public/llms.txt`
- `docs/public/IMAGES_README.md`
- `docs/public/sw.js`
- `README.md`
- `SEO_IMPLEMENTATION.md`
- `package.json`
- `pnpm-workspace.yaml`
- `scripts/check-docs.mjs` (new)
- `docs/plans/hyprfluxdocs-current-source-modernization/00-MASTER-PLAN.md`
- `docs/plans/hyprfluxdocs-current-source-modernization/phase-06-integrated-qa.md`
- `docs/plans/hyprfluxdocs-current-source-modernization/COMPLETION-REPORT.md` (new)

No compatibility redirect files are required: every pre-modernization Markdown
route still exists. `/complete/hyprflux` remains a thin handoff page, while
`/plans/*` remains intentionally deep-link-only maintainer evidence. CI adoption
is deferred because it was not approved; the validation command ships locally
and can be wired into CI later without changing its contract.

## 8. Implementation Record

Phase 6 normalized canonical, sitemap, crawler, social, and JSON-LD metadata to
`https://hyprflux.dev`; removed unsupported rating/search claims; and records
software version 1.5.0. Existing blog prose remains intact behind explicit
archive notices and current-guide handoffs. A new current-release post,
`docs/blog/release-v1.5.0.md`, links the official
[v1.5.0 release](https://github.com/ahmad9059/HyprFlux/releases/tag/v1.5.0) and
its pinned commit, is the default Notes hero action and lead card, and is
listed first under the Blog sidebar.

`pnpm-workspace.yaml` now approves only esbuild's required lifecycle scripts.
`pnpm install` ran both installed esbuild postinstall versions successfully.
`pnpm docs:check` protects 47 public routes, shared assets, current-content
tokens, removed keybinding tokens, and the pinned sibling source revision. An
isolated-checkout run with `HYPRFLUX_SOURCE` pointed at a missing directory also
passed and printed the intended skip notice.

The production build completed with no broken internal links. The canonical
GitHub v1.5.0 release, live `/install` script, and social image returned
successfully. Browser checks covered the homepage, both installation paths, a
Lua reference, wallpaper component guide, keybinding table, troubleshooting,
showcase, and archived release post. Desktop and mobile checks found no page
overflow, missing image alt text, duplicate/missing H1, or final console
errors/warnings. Keyboard focus exposed the skip link and custom cards have a
3px focus ring. Emulated reduced motion reduced custom animation duration to
0.001 seconds.

The browser pass also found and fixed two integration-only defects: a relative
navbar favicon path on nested pages and service-worker interception of hashed
VitePress JavaScript. Final `git diff --check` passed.
