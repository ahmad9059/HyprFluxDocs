# HyprFluxDocs Current-Source Modernization

> Status: **Phases 1-3 complete; Phase 4 is ready to begin.** Installation and
> Hyprland configuration references now reflect the pinned v1.5.0 sources.
>
> Source request: produce a detailed six-phase plan to replace old Hyprland
> syntax and stale HyprFlux documentation, using the sibling HyprFlux checkout
> on this machine as the code reference. The verbatim brief is preserved in
> [Phase 1](./phase-01-validate-current-state.md#8-reference--original-task-brief-verbatim).

---

## 0. How to Read This Plan

This master plan records the validated baseline, architecture decisions,
sign-off gates, risk register, and phase order. Each phase file contains a
bounded implementation scope, concrete file list, ordered tasks, acceptance
criteria, and open questions.

The phases are intended to be executed one at a time by a new agent in
`HyprFluxDocs`. At the beginning of every phase, that agent must re-read the
listed HyprFlux source files from the sibling checkout and record the source
commit being documented. The local path is a maintainer reference only; public
pages must link to GitHub, never to `/home/ahmad/...`.

Phase 1 is evidence and architecture confirmation. Phases 2-5 modernize
content by user journey and ownership domain. Phase 6 is the integrated
navigation, metadata, build, link, and visual QA gate. The decisions in Section
3 were confirmed on 2026-09-10, so Phase 2 may begin.

## 1. Validated Current State

### 1.1 The public Hyprland reference is built around removed syntax

- The active sidebar still labels the entrypoint and modules as
  `hyprland.conf`, `monitors.conf`, `UserKeybindings.conf`, and other `.conf`
  files (`docs/.vitepress/config.mts:146-179`).
- The Hyprland overview teaches `source=`, `exec-once`, and
  `swww-daemon` (`docs/features/hyprland.md:12-30`,
  `docs/features/hyprland.md:38-73`).
- The directory overview still presents `hyprland.conf`, generated `.conf`
  monitor/workspace files, Wallust, and `UserKeybinds.conf` as current
  (`docs/hyprland/index.md:7-23`, `docs/hyprland/index.md:34-38`,
  `docs/hyprland/index.md:80-90`).
- The live source requires Hyprland 0.55+, states that Lua is the only
  supported compositor format, and loads the configuration through ordered
  `require(...)` calls (`../HyprFlux/.config/hypr/hyprland.lua:2-7`,
  `../HyprFlux/.config/hypr/hyprland.lua:11-38`).

### 1.2 Installation documentation describes prompts and lifecycle stages that no longer exist

- The direct-install guide asks users to choose Yay or Paru and select
  essential/optional components, including QuickShell
  (`docs/general/installation.md:46-90`). It later describes the existing-Arch
  route as "Configs only" (`docs/general/installation.md:213-222`).
- The shorter install page likewise calls Pacman and Yay packages optional
  (`docs/complete/hyprflux.md:16-32`).
- The active installer bootstraps or updates the HyprFlux checkout, performs
  system preparation, runs the merged base installer, then runs
  `dotsSetup.sh` (`../HyprFlux/install.sh:19-49`,
  `../HyprFlux/install.sh:83-124`, `../HyprFlux/install.sh:135-150`).
- The base installer preselects its options and adds hardware-dependent
  actions automatically (`../HyprFlux/base-installer/install.sh:178-218`).
- The ISO guide currently says to reboot before HyprFlux integration and then
  select optional packages (`docs/general/iso-installation.md:138-176`), while
  the current product describes target-system provisioning as part of the ISO
  flow (`../HyprFlux/README.md:58-67`).

### 1.3 Duplicate source trees exist, but only one is authoritative

- `.config/` is the distribution source of truth; the base installer explains
  that `base-dots/config/` is a byte-identical mirror and deployment happens
  once through module 02 (`../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:5-12`,
  `../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:47-53`).
- CI rejects any difference between the complete trees, including symlink
  identity (`../HyprFlux/.github/workflows/config-check.yml:80-88`).
- Documentation implementation must therefore read
  `../HyprFlux/.config/` first and use `../HyprFlux/base-dots/config/` only as
  a parity check, not as a competing authority.

### 1.4 Keybinding, script, and component references have substantial drift

- The public keybinding table maps `SUPER+K` to Kitty, references
  `spotify-launcher`, `wasistlos`, removed Waybar switchers, and old sync
  scripts (`docs/keybindings/hyprland.md:8-25`,
  `docs/keybindings/hyprland.md:56-86`).
- Current user bindings map `SUPER+K` to Kdenlive, Spotify to a Chromium web
  app, and quick settings to `HyprFlux_Quick_Settings.sh`
  (`../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua:18-35`,
  `../HyprFlux/.config/hypr/configs/keybinds.lua:16-24`).
- Current keybindings load in base, user, then laptop order
  (`../HyprFlux/.config/hypr/hyprland.lua:22-25`), and include real collisions
  that must be documented rather than silently normalized
  (`../HyprFlux/.config/hypr/configs/keybinds.lua:35-44`,
  `../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua:24-30`,
  `../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua:85-93`).
- Waybar docs promise multiple layouts and wallpaper-driven theming
  (`docs/features/waybar.md:7-29`), while the live entrypoint uses one selected
  module composition and imports one default stylesheet
  (`../HyprFlux/.config/waybar/config:1-55`,
  `../HyprFlux/.config/waybar/style.css:1`).
- Rofi docs import Wallust and advertise a removed Waybar layout script
  (`docs/features/rofi.md:102-121`, `docs/features/rofi.md:205-220`); live Rofi
  imports the generated HyprFlux palette
  (`../HyprFlux/.config/rofi/master-config.rasi:20-33`).

### 1.5 Site navigation and metadata also need an integrated cleanup

- VitePress uses one manually maintained global sidebar
  (`docs/.vitepress/config.mts:72-201`). It links to a missing Kitty page at
  `docs/.vitepress/config.mts:139`, while the empty
  `docs/hyprland/animation.md` is not wired into navigation.
- The repository README requires navigation updates and a production docs
  build when content changes (`README.md:46-49`).
- Public site metadata uses `hyprflux.org`, while the documented installer
  endpoint uses `hyprflux.dev` (`docs/.vitepress/config.mts:27-32`,
  `docs/.vitepress/config.mts:62-64`, `README.md:5-19`).
- Structured data still declares version `1.0.0`
  (`docs/.vitepress/theme/structured-data.ts:16-40`), and the configured social
  image path has no corresponding `docs/public/og-image.*` file.

Full claim-by-claim evidence is in Phase 1.

## 2. Architecture Decisions

### 2.1 Use code-indexed documentation, not prose copied from old docs

Every current-behavior page will be rebuilt from the owning live source file.
The phase files define those ownership mappings. Examples must be short,
purposeful excerpts that are checked against the source at implementation
time; large source dumps should be replaced with links to the exact GitHub
path.

### 2.2 Preserve stable public routes while replacing their meaning in place

Existing URLs are already linked from the sidebar and site content
(`docs/.vitepress/config.mts:83-201`). Default implementation should rewrite
the files in place and update titles/sidebar labels rather than rename every
page. Duplicate pages should receive clearly distinct purposes:

- `/features/*`: user-facing behavior and workflows.
- `/hyprland/*`: file/API-level configuration reference.
- `/keybindings/*`: consolidated user reference tables.
- `/general/*` and `/complete/*`: installation, releases, support, and
  operational journeys.

### 2.3 Separate current documentation from historical editorial content

The v1.0.0 article identifies itself by version and date
(`docs/blog/release-of-hyprflux.md:1-14`), and the desktop article is likewise
dated (`docs/blog/inside-the-hyprflux-desktop.md:1-12`). Preserve their
historical claims; add archive/current-doc notices instead of rewriting them
as though they were published for v1.5.0.

### 2.4 Make drift detection part of the documentation workflow

The source repository already validates Lua syntax, the full Hyprland config,
shell syntax, mirrored config parity, and generated color outputs
(`../HyprFlux/.github/workflows/config-check.yml:45-106`). Phase 6 will define
the matching docs-side link/build/content checks and a maintainer workflow for
recording the HyprFlux source commit used during an update.

## 3. Approved Design Decisions

Owner sign-off was recorded on 2026-09-10 during Phase 1.

| # | Decision | Approved outcome | Rationale |
|---|---|---|---|
| 1 | Canonical GitHub ISO release | Use `HyprFlux/releases/latest` | The main repo explicitly calls this the production source (`../HyprFlux/README.md:69-78`). The separately published companion release must not be mixed into download/checksum instructions. |
| 2 | Canonical public domain | Use `hyprflux.dev` | The installer and live deployment use `.dev` (`README.md:5-19`); stale `.org` metadata will be normalized in Phase 6. |
| 3 | Old route handling | Rewrite existing files in place; do not mass-rename routes | This preserves inbound links while allowing sidebar labels and page purposes to change. Redirects are only needed if a page is intentionally retired. |
| 4 | Historical blogs | Keep original dated content and add a current-version notice | Rewriting a March 2026 v1.0.0 record would erase release history (`docs/blog/release-of-hyprflux.md:6-14`, `docs/blog/release-of-hyprflux.md:60-66`). |
| 5 | Neovim documentation authority | Validate against a pinned revision of `ahmad9059/nvim` | HyprFlux configures `REPO_URL_NVIM` as a separate repository (`../HyprFlux/dotsSetup.sh:38-41`); the HyprFlux checkout alone cannot prove Neovim behavior. |
| 6 | Package manager for docs QA | Normalize contributor and CI commands on pnpm | `pnpm-lock.yaml` and `pnpm-workspace.yaml` are committed, while no npm lockfile exists. Phase 6 will remove the conflicting npm-only contributor instructions. |

## 4. Risk / Backlog Register

| # | Item | Severity | Notes |
|---|---|---|---|
| R1 | GitHub release-channel ambiguity | High | Resolved for docs: use main `HyprFlux/releases/latest`; do not mix companion assets or checksums. |
| R2 | Domain inconsistency (`.org` vs `.dev`) | High | Resolved: normalize all canonical signals to `hyprflux.dev` in Phase 6. |
| R3 | Active package manifest still lists `swww` | Medium | Active wallpaper startup uses AWWW (`../HyprFlux/.config/hypr/UserConfigs/startup-apps.lua:19-25`), but the package manifest still includes `swww` (`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:39-46`). Document active behavior without claiming the package is absent. |
| R4 | First-boot theme values may conflict with installed defaults | Medium | Validate runtime precedence before publishing one definitive theme-state table; do not resolve source behavior as a docs-only change. |
| R5 | Keybinding collisions are present in live source | Medium | Document effective behavior and raise source defects separately; do not invent a collision-free table. |
| R6 | `workspace-rules.lua` comment and load behavior conflict | Low | The entrypoint loads it (`../HyprFlux/.config/hypr/hyprland.lua:27-29`); describe actual load behavior and log source cleanup separately. |
| R7 | Broken Kitty sidebar route | High | Resolve in Phase 4 by creating a source-validated page or removing the entry (`docs/.vitepress/config.mts:126-143`). |
| R8 | Empty animation page | Medium | Populate from `user-animations.lua` in Phase 3 or retire with an explicit redirect decision. |
| R9 | Neovim content is external to HyprFlux | Medium | Block claims that cannot be checked against the separate repo; Tmux and Hyprland can be validated locally. |
| R10 | Historical posts contain superseded architecture | Low | Preserve history but add archive banners and links to current guides. |
| R11 | Missing social preview image | Medium | Phase 6 must either add the referenced asset or change metadata to an existing image (`docs/.vitepress/config.mts:23-32`). |
| R12 | Source code may change during the six-phase effort | High | Record `git rev-parse HEAD` at each phase start and revalidate all cited source files before editing docs. |
| R13 | pnpm build entrypoint is blocked by an unresolved esbuild approval | Medium | Direct VitePress build succeeds, but `pnpm docs:build` fails because `pnpm-workspace.yaml` contains a placeholder `allowBuilds.esbuild` value. Resolve when standardizing pnpm in Phase 6. |
| R14 | Shipped Hyprlock files contain rejected options/syntax | High | Hyprlock 0.9.6 reports errors in both current configs and ignores faulty entries. Documented in Phase 3; fix in HyprFlux source. |
| R15 | Hypridle DPMS dispatcher commands are shell-invalid | High | The Lua dispatcher expression is unquoted in active/disabled command examples. Phase 3 documents a valid pattern without changing source. |
| R16 | `application-style.conf` misspells `roundness` | Medium | The shipped `roundess` key is ignored by current hyprland-qt-support. Track a source correction. |
| R17 | Monitor generation/profile workflows conflict | Medium | Modules 15/16 both write monitor state, and the HyprFlux profile helper differs from nwg-displays native profiles. Document generated ownership; resolve in source. |

## 5. Phase Map

| Phase | Title | Status |
|---|---|---|
| 1 | [Validate Current State and Confirm Architecture](./phase-01-validate-current-state.md) | Complete; approved 2026-09-10 |
| 2 | [Modernize Product, Installation, and Release Journeys](./phase-02-installation-and-releases.md) | Complete; verified 2026-09-10 |
| 3 | [Rebuild the Hyprland Reference for Lua](./phase-03-hyprland-lua-reference.md) | Complete; verified 2026-09-10 |
| 4 | [Refresh Desktop Components, Themes, and Wallpapers](./phase-04-desktop-components.md) | Ready to begin |
| 5 | [Rebuild Keybindings, Scripts, Hardware, and Troubleshooting](./phase-05-operations-reference.md) | Pending Phase 4 |
| 6 | [Integrate Navigation, Metadata, Drift Checks, and Final QA](./phase-06-integrated-qa.md) | Pending Phases 2-5 |

Six phases are warranted because this is a site-wide modernization spanning
two installation paths, a compositor-language migration, many independently
configured desktop components, operational references, and an integrated
publishing/QA pass. Each implementation phase remains a reviewable content
domain rather than mixing all pages into one unreviewable rewrite.

## 6. Cross-Cutting Rules

1. **Pin the reference revision.** At each phase start, record the current
   commit from `../HyprFlux` in the implementation notes and inspect changes
   since the previous phase.
2. **Use the canonical tree.** Read current config from
   `../HyprFlux/.config/`; verify parity against
   `../HyprFlux/base-dots/config/` when relevant. Never derive behavior from
   `base-dots/config/` alone.
3. **Trace every factual claim.** Every command, filename, package, binding,
   and workflow in public docs must map to a current source file, runtime
   query, release endpoint, or explicitly labeled external source.
4. **Do not document comments as runtime truth.** Confirm entrypoint wiring,
   module order, and current consumers before describing behavior.
5. **Preserve public routes by default.** Rewrite existing pages in place;
   add redirects only when a route is deliberately removed.
6. **Keep historical content historical.** Add notices and current links;
   do not retroactively rewrite dated release claims.
7. **Keep diffs phase-scoped.** Do not fix HyprFlux source defects from the
   docs repository. Add them to the risk register or a source-repo issue.
8. **Use real verification.** Each phase must run targeted content searches
   plus the docs production build. Phase 6 also requires link checks and
   manual desktop/mobile inspection; an AI read-through alone is not QA.
9. **Update navigation with content.** The repository contribution rule
   requires sidebar changes and a production build when docs change
   (`README.md:46-49`).
10. **Protect unrelated work.** Confirm `git status` before each phase and do
    not modify or discard changes outside that phase's declared file list.

## 7. Next Step

Begin Phase 4 using the finalized Lua terminology and generated-file ownership
from Phase 3. Re-record the current HyprFlux revision and validate every
component against its configuration and installer owner before editing.
