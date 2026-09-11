# Phase 4 — Refresh Desktop Components, Themes, and Wallpapers

Depends on: Phase 3 Lua terminology and source baseline

Status: **Complete on 2026-09-12**

---

## 1. Goal

Rebuild user-facing component guides from the actual shipped configuration and
installer modules. This phase removes obsolete Wallust/SWWW/AGS/QuickShell and
layout-switcher narratives from current docs while documenting the real static
palette, AWWW wallpaper workflow, application stack, and component behavior.

## 2. Scope

### In scope

- Waybar, Rofi, SwayNC, Wlogout, Hyprlock, Kitty, Qt/Kvantum, Yazi, Cava, and
  Neovim feature pages.
- Current GTK, Qt, Kvantum, icon, cursor, and generated color architecture.
- Current AWWW image wallpaper, mpvpaper video wallpaper, randomization,
  auto-change, and effects workflows.
- Package/app inventory and data-driven Chromium web apps where those facts
  help users understand a component.
- Resolve missing Kitty navigation and add Yazi to the feature navigation if
  its refreshed page remains public.

### Out of scope

- Full Hyprland config reference completed in Phase 3.
- Consolidated keybinding tables and exhaustive script catalog.
- Hardware detection/runbook content.
- Source fixes for stale packages, scripts, or first-boot theme conflicts.
- Unverified claims about the external Neovim repository.

## 3. Detailed Tasks / Design

### 3.1 Build a component ownership matrix before editing

For every page, record:

- package source and whether it is official/AUR/prebuilt/external;
- configuration entrypoint(s) under `../HyprFlux/.config/`;
- installer module or base-installer step;
- user-facing launch path or script;
- current theme/color dependency;
- validation method.

The package manifest distinguishes official/default and AUR packages at
`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:14-86` and
`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:132-145`.

### 3.2 Rewrite Waybar around the selected shipped layout

- Document the actual include graph and left/center/right modules from
  `../HyprFlux/.config/waybar/config:1-55`.
- Document the single imported default stylesheet from
  `../HyprFlux/.config/waybar/style.css:1`.
- Remove claims that removed `WaybarStyles.sh`/`WaybarLayout.sh` menus are
  available and remove wallpaper-derived color claims currently introduced at
  `docs/features/waybar.md:7-29`.
- Explain `waybar-git` only if the reason remains current in the package source
  (`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:43-46`,
  `../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:132-145`).

### 3.3 Rewrite Rofi and generated colors

- Replace Wallust imports with `hyprflux-colors.rasi`, matching
  `../HyprFlux/.config/rofi/master-config.rasi:20-33`.
- Inventory only selectors that still have a matching config and executable
  script.
- Remove the advertised Waybar layout selector at
  `docs/features/rofi.md:205-212` unless a live source owner is found.
- Explain that shared colors are generated and CI-checked across Rofi, Waybar,
  terminals, SwayNC, and Wlogout
  (`../HyprFlux/.github/workflows/config-check.yml:90-106`).

### 3.4 Refresh notification, logout, lock, and idle behavior

- Validate SwayNC geometry, widgets, buttons, and quick-settings command from
  `.config/swaync/config.json` and its CSS.
- Validate Wlogout actions from `.config/wlogout/layout`, including lock and
  logout command ownership.
- Align Hyprlock examples with current `$lock_*` variables rather than copied
  literal colors.
- Keep Hypridle in its native `.conf` format and verify timeout/DPMS actions
  against `.config/hypr/hypridle.conf`.
- Ensure `/features/hyprlock` and `/hyprland/hyprlock` have different purposes:
  user workflow vs config reference.

### 3.5 Document the actual theme stack

Validate and explain:

- GTK theme, icon, cursor, font defaults configured by `dotsSetup.sh`
  (`../HyprFlux/dotsSetup.sh:92-96`);
- Qt5ct/Qt6ct and Kvantum source files;
- Bibata Hyprcursor installation and runtime cursor selection;
- static generated HyprFlux colors rather than wallpaper-driven theming.

Before publishing a single definitive "first boot theme" table, resolve the
known source precedence question between installation modules and
`initial-boot.sh`. If behavior is still inconsistent, document user-visible
current behavior and log the source issue rather than choosing a preferred
value in docs.

### 3.6 Replace SWWW wallpaper docs with AWWW/mpvpaper

Document the real ownership chain:

1. wallpaper bank cloned to `~/Pictures/wallpapers`;
2. prebuilt AWWW installed with AUR fallback;
3. `awww-daemon` started at session startup;
4. image selection/effects/random/auto-change scripts;
5. mpvpaper for video wallpapers.

The installer logic is at `../HyprFlux/modules/12-wallpapers.sh:9-56`, and
session startup is at
`../HyprFlux/.config/hypr/UserConfigs/startup-apps.lua:14-25`. Do not claim
that `swww` is absent from the package list while the source still contains it
(`../HyprFlux/base-installer/install-scripts/01-hypr-pkgs.sh:39-46`).

### 3.7 Resolve missing and externally owned component pages

- Create `docs/features/kitty.md` from the shipped Kitty config, or remove the
  active sidebar entry if a dedicated page is not warranted. The current route
  is configured at `docs/.vitepress/config.mts:139` but has no source page.
- Refresh Yazi and add it to navigation if retained.
- Validate Tmux/Neovim references only against their actual owners. The
  HyprFlux orchestrator points Neovim to an external repo
  (`../HyprFlux/dotsSetup.sh:38-41`); unsupported details must be removed or
  explicitly version-linked.

## 4. Files Touched

### 4.1 Source baseline and ownership matrix

Phase 4 uses HyprFlux revision
`f421b6bd108214079b56c435331ddbbfdfb89591` (`v1.5.0`). The externally owned
Neovim configuration was audited separately at
`ahmad9059/nvim@d11951c8dd548f0e9d1b470ba279d28e2d7a4696`.

The canonical `.config` tree and `base-dots/config` parity mirror matched at the
start of the phase. Current installation deploys canonical `.config` through
`modules/02-dotfiles.sh`; legacy `base-dots/copy.sh` behavior is not an active
install owner.

| Component | Package/source owner | Config entrypoint | Install/runtime owner | Validation |
|---|---|---|---|---|
| Waybar | `waybar-git`, repository/AUR helper | `.config/waybar/config`, `style.css` | modules 02, 05, and hardware module 16 | include graph, generated colors, live reload |
| Rofi | official `rofi` package batch | `.config/rofi/config.rasi` -> `master-config.rasi` | module 02 and Hyprland menu scripts | Rasi/source inventory and direct menu runs |
| SwayNC | official `swaync` package batch | `.config/swaync/config.json`, `style.css` | module 02; Hyprland startup | JSON/widget inventory and client reload |
| Wlogout | official `wlogout` package batch | `.config/wlogout/layout`, `style.css` | module 02; `Wlogout.sh` geometry | action trace and direct launcher run |
| Hyprlock/Hypridle | base Hyprland installer | `.config/hypr/hyprlock*.conf`, `hypridle.conf` | module 02; Hypridle startup and logind mediation | invalid-socket parser checks and action trace |
| Kitty | official `kitty` package batch | `.config/kitty/kitty.conf` | module 02; `user-defaults.lua` | launch with installed config |
| GTK/Qt/Kvantum | theme modules plus Qt/Kvantum packages | `.config/qt5ct`, `.config/qt6ct`, `.config/Kvantum` | modules 02, 04, 07, 14; `initial-boot.sh` | file/gsettings precedence audit |
| Yazi | official `yazi` package batch | `.config/yazi/yazi.toml` | module 02; shell alias/tmuxifier | direct launch and command dependency audit |
| Cava | official `cava` package batch | `.config/cava/config` | module 02; `WaybarCava.sh` for panel output | direct and Waybar config comparison |
| Wallpapers | external WallpaperBank; prebuilt AWWW; `mpvpaper` helper | Hyprland wallpaper scripts and `startup-apps.lua` | module 12 and session startup | script trace, runtime-state ownership, `luac -p` after video persistence |
| Neovim | official package plus external `ahmad9059/nvim` | external `init.lua` | module 03 destructive clone/bootstrap | pinned external source audit and `:checkhealth` guidance |

### 4.2 Resolved implementation decisions

- Keep Kitty and create the missing page because it is the configured default
  terminal and has several active launch paths.
- Keep Yazi and add it to feature navigation as the shipped terminal file
  manager, while identifying Thunar as the graphical default.
- Add a dedicated wallpaper route because image selection, effects, random,
  disabled auto-change, and video behavior span several owners and cannot be
  represented accurately as a Rofi subsection.
- Focus component pages on stable workflows and ownership, with exact current
  values only where they explain shipped behavior or a confirmed defect.
- Document conflicting first-boot theme values as source defects. Do not choose
  an invented effective theme on behalf of GTK/Qt applications.

- `docs/features/waybar.md`
- `docs/features/rofi.md`
- `docs/features/swaync.md`
- `docs/features/wlogout.md`
- `docs/features/hyprlock.md`
- `docs/features/wallpapers.md` (new)
- `docs/features/kitty.md` (new)
- `docs/features/qt-theming.md`
- `docs/features/yazi.md`
- `docs/features/cava.md`
- `docs/features/nvim.md`
- `docs/hyprland/hyprlock.md` (installed/runtime ownership correction)
- `docs/hyprland/hypridle.md` (lock-mediation behavior correction)
- `docs/.vitepress/config.mts` (feature section only)
- Relevant current screenshots/assets under `docs/public/` (only after an
  explicit stale/replace audit)

## 5. Acceptance Criteria / QA Checklist

- [x] A source commit SHA and component ownership matrix are recorded.
- [x] Every component page names its actual config entrypoint and install owner.
- [x] Current pages contain no Wallust-driven-theme or `swww-daemon` workflow claims.
- [x] AWWW and mpvpaper roles are accurate and distinct.
- [x] Waybar docs match the shipped module composition and stylesheet entrypoint.
- [x] Rofi docs import the current generated palette and list only live menus.
- [x] SwayNC, Wlogout, Hyprlock, Hypridle, Qt/Kvantum, Yazi, and Cava examples
      match current source.
- [x] The Kitty sidebar entry resolves to a real page or is removed.
- [x] Yazi navigation matches the decision to retain its page.
- [x] Neovim claims are validated against the external repo or explicitly scoped down.
- [x] Duplicate feature/config pages have distinct user-facing vs authoring purposes.
- [x] The production VitePress build succeeds.
- [x] Component screenshots, wide tables, and code blocks are manually checked
      on desktop and mobile.

## 6. Resolved Decisions

- Create a dedicated Kitty page and retain its navigation because Kitty is the
  shipped default terminal.
- Keep Neovim in scope and attribute editor behavior to the independently pinned
  external repository revision.
- Promote Yazi into feature navigation as the shipped terminal file manager;
  retain Thunar as the documented graphical default.
- Do not publish one effective first-boot theme value while source owners
  conflict. Record the GTK, Qt, Kvantum, and cursor precedence separately.
- Focus pages on stable workflows and ownership. Include exact current values
  only where they define shipped behavior or expose a confirmed source defect.

## 7. Completion Record

Phase 4 was completed on 2026-09-12 against HyprFlux revision
`f421b6bd108214079b56c435331ddbbfdfb89591` and external Neovim revision
`d11951c8dd548f0e9d1b470ba279d28e2d7a4696`. Source parity between canonical
`.config` and `base-dots/config` was confirmed before editing.

The existing Waybar, Rofi, SwayNC, Wlogout, Hyprlock, Qt/Kvantum, Yazi, Cava,
and Neovim pages were rebuilt from current owners. A missing Kitty page and a
canonical Wallpapers page were added; Kitty, Wallpapers, and Yazi all resolve
through feature navigation. Hyprlock and Hypridle configuration pages received
small ownership corrections so feature workflow and authoring reference remain
distinct.

Four independent source-fidelity reviews checked the rewritten component
groups and a second pass verified every correction. Internal links in the
reviewed pages and all feature sidebar routes resolved.

```bash
./node_modules/.bin/vitepress build docs
```

The production build succeeded. Browser checks at 1440x900 and 390x844 covered
Waybar, toolkit theming, Wallpapers, Neovim, Yazi, and Kitty. There was no
document-level horizontal overflow; wide tables and code blocks remained in
scrollable containers. The only browser warning was the existing unused
`fav.avif` preload, which remains assigned to Phase 6 metadata cleanup.

No screenshots were retained or replaced because the rewritten pages do not
depend on stale component captures. Confirmed component, wallpaper, theme, and
external Neovim defects were documented without changing HyprFlux source and
are recorded in the master risk register.
