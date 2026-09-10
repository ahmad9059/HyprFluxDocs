# Phase 3 — Rebuild the Hyprland Reference for Lua

Depends on: Phase 2 and a pinned HyprFlux source revision

---

## 1. Goal

Replace the old Hyprlang compositor documentation with a complete Lua-first
reference for Hyprland 0.55+, while preserving the distinction between the Lua
compositor entrypoint and supporting tools that still legitimately use `.conf`
files. This phase owns configuration architecture and authoring; consolidated
user key tables and script operations are deferred to Phase 5.

## 2. Scope

### In scope

- Explain the `hyprland.lua` entrypoint and exact module load order.
- Document current Lua patterns: `require`, `hl.config`, `hl.env`, `hl.bind`,
  `hl.on`, rules, curves/animations, and dispatcher objects.
- Rewrite each existing file-reference route around its current Lua owner.
- Document generated `monitors.lua` and `workspaces.lua` behavior.
- Populate or retire the empty animation page using an explicit route decision.
- Retain accurate Hyprlock, Hypridle, and `application-style.conf` material,
  but refresh paths, variables, and cross-references.
- Update sidebar labels from removed `.conf` names to current filenames.

### Out of scope

- A complete user-facing keybinding table.
- Exhaustive script behavior and hardware troubleshooting.
- General Waybar/Rofi/SwayNC feature guides.
- Changing Lua config behavior in the HyprFlux source repository.
- Teaching legacy Hyprlang as a supported alternative.

## 3. Detailed Tasks / Design

### 3.1 Establish the Lua architecture page

Rewrite the Hyprland overview and directory index to show:

1. `hyprland.lua` as the only compositor entrypoint for Hyprland 0.55+.
2. `UserConfigs/user-defaults.lua` and the color module loaded first.
3. Environment variables before any other `hl.*` use.
4. Settings, decorations, and animations.
5. Base, user, and laptop keybindings.
6. Window/workspace rules.
7. startup callback, startup apps, generated monitors/workspaces, and laptop
   display handling.

This ordering is explicit in
`../HyprFlux/.config/hypr/hyprland.lua:9-38`. Replace the old tree and Wallust
claims at `docs/hyprland/index.md:7-38` and the old sourced-fragment model at
`docs/features/hyprland.md:12-47`.

### 3.2 Map existing routes to live files

Keep routes stable but change titles and content ownership:

| Existing docs route | Current source owner |
|---|---|
| `hyprland/hyprland.md` | `.config/hypr/hyprland.lua` |
| `hyprland/01-userdefaults.md` | `.config/hypr/UserConfigs/user-defaults.lua` |
| `hyprland/envariables.md` | `.config/hypr/UserConfigs/env-variables.lua` |
| `hyprland/usersettings.md` | `.config/hypr/UserConfigs/user-settings.lua` |
| `hyprland/userdecorations.md` | `.config/hypr/UserConfigs/user-decorations.lua` |
| `hyprland/animation.md` | `.config/hypr/UserConfigs/user-animations.lua` and animation presets |
| `hyprland/windowrules.md` | `.config/hypr/UserConfigs/window-rules.lua` |
| `hyprland/startup_apps.md` | `.config/hypr/UserConfigs/startup-apps.lua` |
| `hyprland/monitors.md` | `.config/hypr/monitors.lua`, monitor profiles, modules 15/16 |
| `hyprland/workspaces.md` | `.config/hypr/workspaces.lua` and `workspace-rules.lua` |
| `hyprland/keybinding.md` | `.config/hypr/configs/keybinds.lua` authoring model |
| `hyprland/userkeybindings.md` | `.config/hypr/UserConfigs/user-keybinds.lua` authoring model |
| `hyprland/hyprlock.md` | `.config/hypr/hyprlock.conf` and `hyprlock-1080p.conf` |
| `hyprland/hypridle.md` | `.config/hypr/hypridle.conf` |
| `hyprland/application-style.md` | `.config/hypr/application-style.conf` |

Use source links relative to the repository root in maintainer notes and
GitHub blob links in public pages. Do not expose local filesystem paths.

### 3.3 Teach current syntax with bounded examples

- Replace `source =` with the actual `require(...)` pattern.
- Replace `env =` examples with `hl.env(...)` from
  `env-variables.lua` after re-reading the current source.
- Replace Hyprlang `bind =` snippets with current `hl.bind(...)` examples,
  including option tables for locked/repeating/mouse behavior. The current
  flag mapping is documented in
  `../HyprFlux/.config/hypr/configs/keybinds.lua:1-8`.
- Replace `windowrule =` examples with the current rule API and explain that
  order matters; use short examples rather than copying the entire rule file.
- Replace `exec-once` with `hl.on("hyprland.start", ...)` and
  `hl.exec_cmd(...)`; current startup behavior is visible at
  `../HyprFlux/.config/hypr/UserConfigs/startup-apps.lua:19-55`.
- Document native Lua behavior where old shell dispatches no longer apply,
  such as all-float and zoom handling
  (`../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua:48-80`).

### 3.4 Explain generated and user-owned state

- Document `monitors.lua` and `workspaces.lua` as generated/runtime-managed
  files loaded by the entrypoint
  (`../HyprFlux/.config/hypr/hyprland.lua:31-38`).
- Explain nwg-displays and monitor-profile workflows without telling users to
  edit generated output as their first option.
- Explain that `workspace-rules.lua` is loaded even though a current source
  comment may imply otherwise; documentation follows actual entrypoint wiring.
- Separate safe user customization from generated files and installer-managed
  GPU marker blocks.

### 3.5 Keep valid `.conf` formats explicit

Do not globally replace every `.conf` string. Hyprlock, Hypridle, and
application-style remain separate tool configurations. Update their pages
against current files and make the architecture distinction prominent:

- Lua is mandatory for the Hyprland compositor entrypoint.
- Tool-specific parsers can still use Hyprlang-like or INI-style `.conf`
  formats.

### 3.6 Add validation and migration guidance

- Add Lua syntax validation with `luac -p`.
- Add the supported config check from
  `../HyprFlux/.config/hypr/hyprland.lua:2-7`.
- Explain the source parity requirement from
  `../HyprFlux/.github/workflows/config-check.yml:80-88` for contributors.
- Add a concise migration table from removed filenames to current Lua files;
  do not include legacy syntax as a supported configuration path.

## 4. Files Touched

- `docs/features/hyprland.md`
- `docs/hyprland/index.md`
- `docs/hyprland/hyprland.md`
- `docs/hyprland/01-userdefaults.md`
- `docs/hyprland/envariables.md`
- `docs/hyprland/usersettings.md`
- `docs/hyprland/userdecorations.md`
- `docs/hyprland/animation.md`
- `docs/hyprland/windowrules.md`
- `docs/hyprland/startup_apps.md`
- `docs/hyprland/monitors.md`
- `docs/hyprland/workspaces.md`
- `docs/hyprland/keybinding.md`
- `docs/hyprland/userkeybindings.md`
- `docs/hyprland/hyprlock.md`
- `docs/hyprland/hypridle.md`
- `docs/hyprland/application-style.md`
- `docs/.vitepress/config.mts` (Hyprland labels/routes only)

## 5. Acceptance Criteria / QA Checklist

- [ ] A source commit SHA is recorded for the phase.
- [ ] No current Hyprland compositor page identifies `hyprland.conf` as the entrypoint.
- [ ] No current module page teaches `source=`, `exec-once`, `bind =`,
      `env =`, or old `windowrule =` syntax as the supported implementation.
- [ ] The documented `require(...)` order matches `hyprland.lua` exactly.
- [ ] Every old module filename has a clear current-file mapping.
- [ ] Supporting `.conf` files are retained only where their owning tool still uses them.
- [ ] `animation.md` is non-empty or intentionally retired with route handling.
- [ ] Generated monitor/workspace files and safe customization boundaries are explained.
- [ ] Base/user/laptop keybinding load order is accurate.
- [ ] Lua snippets pass `luac -p` when extracted into valid contexts, or are
      clearly marked as partial snippets.
- [ ] `Hyprland --config ~/.config/hypr/hyprland.lua --verify-config` is documented.
- [ ] Sidebar labels use current filenames.
- [ ] The VitePress production build succeeds.
- [ ] The Hyprland section is manually reviewed for broken anchors and mobile tables.

## 6. Open Questions

- Should route slugs such as `01-userdefaults` be retained indefinitely for
  compatibility, or redirected later to normalized Lua filenames?
- Should the empty animation route become the canonical animation reference or
  redirect to a section in the main Hyprland guide?
- How much of the `hl` Lua API should be explained locally versus linked to
  upstream Hyprland documentation?
- Should legacy `.conf` migration guidance include an archived example, or only
  a filename/concept mapping?
