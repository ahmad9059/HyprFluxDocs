---
title: Hyprland in HyprFlux
description: Learn how HyprFlux organizes Hyprland 0.55+ with a modular Lua configuration, generated display state, and user-owned overrides.
---

# Hyprland in HyprFlux

Hyprland is the Wayland compositor at the center of the HyprFlux desktop.
HyprFlux 1.5 uses Hyprland 0.55 or newer and configures the compositor through
Lua. The old `hyprland.conf` entrypoint and sourced Hyprlang fragments are no
longer supported.

## What HyprFlux Adds

- A modular `~/.config/hypr/hyprland.lua` entrypoint
- User-owned modules for applications, environment, settings, appearance,
  animations, bindings, rules, and startup
- Base bindings plus separate user and laptop binding layers
- Generated Lua output for monitors and workspace assignments
- A static shared color palette used across the desktop
- Hyprlock and Hypridle integration for locking and idle behavior

## Start Customizing

Use the file that owns the behavior you want to change:

| Goal | Start here |
|---|---|
| Change terminal, editor, file manager | `UserConfigs/user-defaults.lua` |
| Change input, layout, cursor, VRR | `UserConfigs/user-settings.lua` |
| Change gaps, borders, blur, opacity | `UserConfigs/user-decorations.lua` |
| Change animation behavior | `UserConfigs/user-animations.lua` |
| Add application shortcuts | `UserConfigs/user-keybinds.lua` |
| Place or style application windows | `UserConfigs/window-rules.lua` |
| Start session applications | `UserConfigs/startup-apps.lua` |
| Configure outputs and workspace assignment | `nwg-displays` |

Read the [configuration architecture](/hyprland/) before editing. It explains
which files are user-owned, generated, or installer-managed.

## Current Lua Model

HyprFlux modules use the `hl` API rather than Hyprlang assignment lines:

```lua
local defaults = require("UserConfigs.user-defaults")

hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.config({ general = { layout = "dwindle" } })
hl.bind("SUPER + RETURN", hl.dsp.exec_cmd(defaults.term))
```

The complete shortcut lookup belongs in the
[Hyprland keybinding reference](/keybindings/hyprland). The pages in this
section focus on authoring and ownership instead of duplicating that table.

## Validate Changes

Check Lua syntax and then validate the complete compositor configuration:

```bash
luac -p ~/.config/hypr/hyprland.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Inside a running session, reload and inspect errors with:

```bash
hyprctl reload
hyprctl configerrors
```

If validation fails, restore the last known-good edit rather than replacing the
whole configuration tree. See the [`hyprland.lua` reference](/hyprland/hyprland)
for the exact module order.

## Upstream References

- [Hyprland configuration](https://wiki.hypr.land/Configuring/Start/)
- [Hyprland Lua configuration](https://wiki.hypr.land/Configuring/Lua/)
- [Hyprland dispatchers](https://wiki.hypr.land/Configuring/Dispatchers/)
- [HyprFlux v1.5.0 source](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr)
