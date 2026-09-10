# Phase 4 — Refresh Desktop Components, Themes, and Wallpapers

Depends on: Phase 3 Lua terminology and source baseline

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

- `docs/features/waybar.md`
- `docs/features/rofi.md`
- `docs/features/swaync.md`
- `docs/features/wlogout.md`
- `docs/features/hyprlock.md`
- `docs/features/kitty.md` (new, if approved; otherwise remove nav entry)
- `docs/features/qt-theming.md`
- `docs/features/yazi.md`
- `docs/features/cava.md`
- `docs/features/nvim.md`
- `docs/.vitepress/config.mts` (feature section only)
- Relevant current screenshots/assets under `docs/public/` (only after an
  explicit stale/replace audit)

## 5. Acceptance Criteria / QA Checklist

- [ ] A source commit SHA and component ownership matrix are recorded.
- [ ] Every component page names its actual config entrypoint and install owner.
- [ ] Current pages contain no Wallust-driven-theme or `swww-daemon` workflow claims.
- [ ] AWWW and mpvpaper roles are accurate and distinct.
- [ ] Waybar docs match the shipped module composition and stylesheet entrypoint.
- [ ] Rofi docs import the current generated palette and list only live menus.
- [ ] SwayNC, Wlogout, Hyprlock, Hypridle, Qt/Kvantum, Yazi, and Cava examples
      match current source.
- [ ] The Kitty sidebar entry resolves to a real page or is removed.
- [ ] Yazi navigation matches the decision to retain its page.
- [ ] Neovim claims are validated against the external repo or explicitly scoped down.
- [ ] Duplicate feature/config pages have distinct user-facing vs authoring purposes.
- [ ] The production VitePress build succeeds.
- [ ] Component screenshots, wide tables, and code blocks are manually checked
      on desktop and mobile.

## 6. Approved Decisions and Open Questions

- Create a dedicated Kitty page or remove the sidebar item?
- **Approved in Phase 1:** Neovim is in scope, but its claims must be validated
  against a pinned revision of the external `ahmad9059/nvim` repository.
- Should Yazi be promoted into the active sidebar after refresh?
- Which theme values are effective after `initial-boot.sh` runs on a fresh install?
- Should component pages show exact current configuration snapshots or focus
  on stable workflows with source links to reduce drift?
