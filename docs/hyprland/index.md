---
title: Hyprland Configuration Architecture
description: Understand the HyprFlux Lua entrypoint, module order, and user-owned versus generated Hyprland files.
---

# Hyprland Configuration Architecture

HyprFlux configures Hyprland 0.55+ through
`~/.config/hypr/hyprland.lua`. Lua is the only supported compositor format in
the current release. Supporting tools such as Hyprlock and Hypridle still use
their own `.conf` formats.

Source baseline: [HyprFlux v1.5.0 at `f421b6b`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr).

## Directory Map

```text
~/.config/hypr/
├── hyprland.lua                 # compositor entrypoint
├── hyprflux-colors.lua          # generated Lua palette
├── monitors.lua                 # generated output rules
├── workspaces.lua               # generated workspace assignments
├── configs/
│   └── keybinds.lua             # HyprFlux base bindings
├── UserConfigs/
│   ├── user-defaults.lua
│   ├── env-variables.lua
│   ├── user-settings.lua
│   ├── user-decorations.lua
│   ├── user-animations.lua
│   ├── user-keybinds.lua
│   ├── laptops.lua
│   ├── window-rules.lua
│   ├── workspace-rules.lua
│   ├── startup-apps.lua
│   └── LaptopDisplay.lua
├── animations/                  # selectable Lua presets
├── Monitor_Profiles/            # HyprFlux profile assets
├── scripts/                     # maintained desktop helpers
├── hyprlock.conf                # Hyprlock native configuration
├── hyprlock-1080p.conf          # optional low-resolution variant
├── hypridle.conf                # Hypridle native configuration
└── application-style.conf       # Hyprland Qt/QML application style
```

## Exact Load Order

`hyprland.lua` evaluates modules from top to bottom:

1. `UserConfigs.user-defaults`
2. `hyprflux-colors`
3. `UserConfigs.env-variables`
4. `UserConfigs.user-settings`
5. `UserConfigs.user-decorations`
6. `UserConfigs.user-animations`
7. `configs.keybinds`
8. `UserConfigs.user-keybinds`
9. `UserConfigs.laptops`
10. `UserConfigs.window-rules`
11. `UserConfigs.workspace-rules`
12. Register the `initial-boot.sh` startup callback
13. `UserConfigs.startup-apps`
14. `monitors`
15. `workspaces`
16. `UserConfigs.LaptopDisplay`

The defaults and color modules return ordinary Lua tables. The environment
module must remain before every module that calls another `hl.*` API.

## Ownership Boundaries

### User configuration

Most files under `UserConfigs/` are intended for personal settings. The
installer can still update bounded sections, such as the GPU marker block in
`env-variables.lua`, so read comments before editing.

### Generated files

Do not make `monitors.lua`, `workspaces.lua`, or `hyprflux-colors.lua` your
primary manual edit point:

- `nwg-displays` writes monitor and workspace Lua output.
- installer hardware modules can regenerate monitor output and profiles.
- `utilities/sync-colors.sh` generates the Lua palette from the central color
  source.
- the animation selector replaces `UserConfigs/user-animations.lua` with the
  chosen preset.

### Distribution defaults

`configs/keybinds.lua` is the base binding layer. Add personal application
bindings in `UserConfigs/user-keybinds.lua` and check for duplicate key
combinations first. A later declaration does not automatically remove an
earlier binding.

## Old-to-Current File Map

Stable documentation routes are retained, but the source filenames changed:

| Previous name | Current owner |
|---|---|
| `hyprland.conf` | `hyprland.lua` |
| `01-UserDefaults.conf` | `UserConfigs/user-defaults.lua` |
| `ENVariables.conf` | `UserConfigs/env-variables.lua` |
| `UserSettings.conf` | `UserConfigs/user-settings.lua` |
| `UserDecorations.conf` | `UserConfigs/user-decorations.lua` |
| `UserAnimations.conf` | `UserConfigs/user-animations.lua` |
| `Keybinds.conf` | `configs/keybinds.lua` |
| `UserKeybinds.conf` | `UserConfigs/user-keybinds.lua` |
| `Laptops.conf` | `UserConfigs/laptops.lua` |
| `WindowRules.conf` | `UserConfigs/window-rules.lua` |
| `WorkSpaceRules` | `UserConfigs/workspace-rules.lua` |
| `LaptopDisplay.conf` | `UserConfigs/LaptopDisplay.lua` |
| `Startup_Apps.conf` | `UserConfigs/startup-apps.lua` |
| `monitors.conf` compositor input | generated `monitors.lua` |
| `workspaces.conf` compositor input | generated `workspaces.lua` |

The old names are migration references only; do not create new compositor
configuration with the removed syntax.

## Validate the Complete Configuration

```bash
luac -p ~/.config/hypr/hyprland.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

For source contributions, `.config/` is canonical and
`base-dots/config/` is a byte-identical parity mirror enforced by HyprFlux CI.
