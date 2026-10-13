---
title: user-keybinds.lua
description: How to add your own Hyprland bindings in the HyprFlux user layer.
---

# `user-keybinds.lua`

Path: `~/.config/hypr/UserConfigs/user-keybinds.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/user-keybinds.lua).

This module owns personal application and workflow bindings. It loads after the base `configs/keybinds.lua` module and imports application choices from `user-defaults.lua`.

## Use application defaults

```lua
local defaults = require("UserConfigs.user-defaults")
local mainMod = "SUPER"

hl.bind(
    mainMod .. " + RETURN",
    hl.dsp.exec_cmd(defaults.term),
    { description = "Terminal" }
)

hl.bind(
    mainMod .. " + F",
    hl.dsp.exec_cmd(defaults.files),
    { description = "File manager" }
)
```

## Use typed dispatchers

Prefer a dispatcher over a shell command when the action is part of Hyprland:

```lua
hl.bind(
    "SUPER + SPACE",
    hl.dsp.window.float({ action = "toggle" }),
    { description = "Toggle floating" }
)

hl.bind(
    "SUPER + CTRL + O",
    hl.dsp.window.set_prop({ prop = "opaque", value = "toggle" }),
    { description = "Toggle opacity" }
)
```

## Use Lua for runtime state

The all-float and zoom actions use callbacks rather than shell pipelines. A small runtime example:

```lua
hl.bind("SUPER + ALT + mouse_down", function()
    local zoom = hl.get_config("cursor.zoom_factor") or 1
    hl.config({ cursor = { zoom_factor = math.max(zoom, 1) * 2 } })
end, { description = "Zoom in" })
```

## Avoid accidental duplicate binds

Loading this file later does not mean it overrides a base combination. Matching bindings can both run. Check `configs/keybinds.lua`, `laptops.lua`, and the runtime registrations before you add a key:

```bash
hyprctl binds
```

The shipped source has these unresolved duplicates:

- `SUPER+K`: base layout action and Kdenlive
- `SUPER+O`: base Dwindle action and Obsidian
- `SUPER+SHIFT+W`: wallpaper selection and wallpaper effects, both in the user module

The effective shortcut table is maintained at [Hyprland keybindings](/keybindings/hyprland).

## Shell commands

`hl.dsp.exec_cmd` accepts a command string. Test complex quoting, pipelines, and fallback expressions in a shell first. Lua syntax validation cannot prove that the embedded command behaves as intended.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```
