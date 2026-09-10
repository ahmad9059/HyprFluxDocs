# Phase 1 — Validate Current State and Confirm Architecture

Depends on: none

Status: **Complete and owner-approved on 2026-09-10**

---

## 1. Live vs. Legacy Structure

The docs and source repositories contain multiple representations of the same
system, so the first phase establishes which paths are authoritative before
any prose is rewritten.

### Documentation surfaces

- The live site is driven by one VitePress nav/sidebar definition
  (`docs/.vitepress/config.mts:65-201`). Pages linked there are active user
  journeys or references.
- Unlinked Markdown still builds into public routes unless excluded. This
  matters for the old `docs/hyprland/index.md` and empty
  `docs/hyprland/animation.md`, even though neither is currently in the
  sidebar (`docs/.vitepress/config.mts:146-180`).
- Dated blog entries are editorial history, not current reference material
  (`docs/blog/release-of-hyprflux.md:1-14`,
  `docs/blog/inside-the-hyprflux-desktop.md:1-12`).

### Source surfaces

- `../HyprFlux/.config/` is canonical distribution configuration.
- `../HyprFlux/base-dots/config/` is a required mirror, not another source of
  truth (`../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:5-12`,
  `../HyprFlux/.github/workflows/config-check.yml:80-88`).
- The normal install path runs merged `base-installer/install.sh` and then
  `dotsSetup.sh` (`../HyprFlux/install.sh:107-150`).
- `base-dots/copy.sh` must be treated as a separate/manual workflow unless
  current source wiring proves otherwise; the merged base-installer explicitly
  avoids running it (`../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:5-12`).

## 2. Claim-by-Claim Validation

### 2.1 "HyprFluxDocs uses the old Hyprland syntax"

**Confirmed.** The sidebar advertises `.conf` compositor files
(`docs/.vitepress/config.mts:146-179`), the feature overview teaches Hyprlang
`source=`, `exec-once`, and `env =` syntax
(`docs/features/hyprland.md:12-30`, `docs/features/hyprland.md:38-73`), and the
directory guide names `hyprland.conf` as the entrypoint
(`docs/hyprland/index.md:7-23`). The current source says Lua is the only format
for Hyprland 0.55+ and loads modules with `require(...)`
(`../HyprFlux/.config/hypr/hyprland.lua:2-7`,
`../HyprFlux/.config/hypr/hyprland.lua:11-38`).

### 2.2 "All old docs should be updated from the HyprFlux checkout"

**Partially confirmed and narrowed.** Current reference and workflow pages
should be updated from the live checkout. Dated release/editorial posts should
remain historically accurate and gain archive notices instead. The v1.0.0
article explicitly identifies its version and publication date
(`docs/blog/release-of-hyprflux.md:2-14`), so rewriting it as v1.5.0 would be
incorrect.

### 2.3 "The existing-Arch route is only a dotfiles/config copy"

**Not confirmed.** The docs describe it as "Configs only"
(`docs/general/installation.md:213-222`), but the public entrypoint updates the
system, runs the merged base installer, and then executes every numbered
`dotsSetup` module (`../HyprFlux/install.sh:83-124`,
`../HyprFlux/install.sh:135-150`, `../HyprFlux/dotsSetup.sh:98-120`). Public
wording must explain that it is full HyprFlux provisioning on an existing Arch
base, not a harmless config-only copier.

### 2.4 "Users choose their AUR helper and optional components"

**Not confirmed.** The docs teach Yay/Paru selection and optional QuickShell
(`docs/general/installation.md:54-90`), while the base installer preselects
SDDM, Bluetooth, Thunar, XDPH, Zsh, and dots, adding NVIDIA/input-group actions
when detected (`../HyprFlux/base-installer/install.sh:178-218`). The package
manifest says formerly optional applications now install in one pass
(`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:73-86`).

### 2.5 "ISO integration occurs after the first reboot"

**Not confirmed for the current release.** The guide places HyprFlux
integration and optional packages after reboot
(`docs/general/iso-installation.md:138-176`). Current project documentation
describes an online ISO with target-system provisioning
(`../HyprFlux/README.md:58-67`), and the top-level installer has an ISO mode in
which the outer installer owns reboot (`../HyprFlux/install.sh:140-150`). Phase
2 must validate the exact ISO step sequence against the sibling HyprFlux-ISO
checkout before rewriting screenshots or numbered steps.

### 2.6 "The docs can use either config tree as a reference"

**Not confirmed.** The source itself declares `.config/` authoritative and
`base-dots/config/` mirrored (`../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:34-53`).
CI enforces parity (`../HyprFlux/.github/workflows/config-check.yml:80-88`).
All phase work must read `.config/` first.

### 2.7 "Current keybinding pages are reliable"

**Not confirmed.** Docs say `SUPER+K` opens Kitty and `SUPER+S` runs
`spotify-launcher` (`docs/keybindings/hyprland.md:10-25`); live user config
maps those keys to Kdenlive and a Chromium Spotify app
(`../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua:18-35`). The docs also
reference removed Waybar switchers and sync scripts
(`docs/keybindings/hyprland.md:56-86`). Phase 5 must regenerate the table from
all three loaded Lua binding modules, not patch individual rows.

### 2.8 "Wallpaper-driven dynamic theming remains current"

**Not confirmed.** Waybar and Rofi docs still describe Wallust-driven colors
(`docs/features/waybar.md:7-29`, `docs/features/rofi.md:102-121`). Current Rofi
imports `hyprflux-colors.rasi` (`../HyprFlux/.config/rofi/master-config.rasi:20-33`),
Waybar imports a static default stylesheet (`../HyprFlux/.config/waybar/style.css:1`),
and current startup launches `awww-daemon`
(`../HyprFlux/.config/hypr/UserConfigs/startup-apps.lua:19-25`).

### 2.9 "The current sidebar is complete and valid"

**Not confirmed.** It points to `/features/kitty.md`
(`docs/.vitepress/config.mts:126-143`), but no such file exists. Yazi has a
page but no sidebar item, while many configuration labels still use obsolete
filenames (`docs/.vitepress/config.mts:146-179`).

## 3. Recommended Architecture — Confirmed Sound

Use a code-indexed documentation architecture:

1. Record the current HyprFlux commit at phase start.
2. Map each public page to one or more owning source files.
3. Keep user-oriented component guides separate from file-oriented config
   references.
4. Rewrite existing routes in place where possible.
5. Consolidate duplicate keybinding truth into one generated/verified user
   reference while keeping config pages focused on authoring Lua.
6. Preserve dated blog content with archive notices.
7. Finish with automated stale-token, internal-link, production-build, and
   manual responsive checks.

This fits the repository's manually maintained VitePress structure
(`docs/.vitepress/config.mts:72-201`) and its requirement to update navigation
and build before pushing (`README.md:46-49`).

## 4. Confirmed Gaps Not Explicitly Named in the Brief

1. The canonical release repository is ambiguous: current docs point to
   HyprFlux-ISO, while the main repo names its own releases page as production
   (`../HyprFlux/README.md:69-78`).
2. Canonical domain metadata is split between `.org` and `.dev`
   (`docs/.vitepress/config.mts:27-32`, `README.md:5-19`).
3. Structured data still publishes software version `1.0.0`
   (`docs/.vitepress/theme/structured-data.ts:16-40`).
4. The configured Open Graph image does not exist in `docs/public/`
   (`docs/.vitepress/config.mts:23-32`).
5. `docs/hyprland/animation.md` is empty.
6. Neovim behavior is owned by a separate repository configured at
   `../HyprFlux/dotsSetup.sh:38-41`; it cannot be truthfully refreshed from
   HyprFlux alone.
7. The source package manifest still includes `swww` even though the active
   wallpaper workflow uses AWWW
   (`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:39-46`,
   `../HyprFlux/modules/12-wallpapers.sh:26-56`). This is a source backlog item,
   not permission for docs to call SWWW current.

## 5. What Phase 1 Did Not Do

- No public Markdown page was rewritten.
- No navigation, API route, metadata, or asset was changed.
- No HyprFlux source defect was fixed.
- No historical article was rewritten.
- No release channel or domain decision was made on the owner's behalf.

## 6. Sign-Off Needed Before Phase 2

- [x] Use the main [HyprFlux releases page](https://github.com/ahmad9059/HyprFlux/releases/latest)
      as the canonical ISO download source.
- [x] Use `hyprflux.dev` as the canonical public site domain.
- [x] Rewrite existing documentation routes in place rather than mass-renaming.
- [x] Preserve dated blog posts and add archive/current-documentation notices.
- [x] Include Neovim validation, but pin and inspect the separate
      `ahmad9059/nvim` repository before updating Neovim claims.
- [x] Use pnpm as the supported contributor workflow.

## 7. Completion Record

Phase 1 was revalidated and approved on 2026-09-10 against these revisions:

- HyprFluxDocs baseline: `f7cefb2f943f408808bb0583e88c6d025f013d14`
- HyprFlux source baseline: `f421b6bd108214079b56c435331ddbbfdfb89591`
- HyprFlux-ISO comparison baseline: `025a7fadaf68099d32ce80cd060ec8f12a773efd`

The revalidation confirmed that `hyprflux.dev` serves the documentation site,
while `hyprflux.org` did not resolve successfully. It also confirmed that the
repository commits `pnpm-lock.yaml` and `pnpm-workspace.yaml` and has no npm
lockfile. Both GitHub repositories currently expose v1.5.0 ISO releases with
different checksums; the owner explicitly selected the main HyprFlux releases
page, consistent with `../HyprFlux/README.md:69-70`.

The installed VitePress binary completed a production build successfully on
2026-09-10. The selected `pnpm docs:build` entrypoint is currently blocked by
the existing placeholder value for esbuild under `allowBuilds` in
`pnpm-workspace.yaml`; resolving that package-manager configuration remains a
Phase 6 tooling task.

All six architecture decisions are now recorded. Phase 2 is unblocked. No
public documentation, navigation, application code, installer endpoint, or
HyprFlux source file was changed during Phase 1.

## 8. Reference — Original Task Brief (Verbatim)

> our hyprfluxdocs repo use the old hyprland syntax and all old docs, I want
> you to build a detailed plan of 6 phases in hyprfluxdocs repo, that we will
> update the docs, and point to this hyprflux for code reference or my machine,
> and I will start new agent in that repo and iterate on each phase and start
> update, build a detailed plan of 6 phases
