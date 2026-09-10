# Customize `user-keybinds.lua`

Path: `~/.config/hypr/UserConfigs/user-keybinds.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-keybinds.lua).

This module owns personal application and workflow bindings. It loads after the
base `configs/keybinds.lua` module and imports application choices from
`user-defaults.lua`.

## Use Application Defaults

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

## Use Typed Dispatchers

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

## Use Lua for Runtime State

The current all-float and zoom actions use callbacks rather than shell
pipelines. A small runtime configuration example is:

```lua
hl.bind("SUPER + ALT + mouse_down", function()
    local zoom = hl.get_config("cursor.zoom_factor") or 1
    hl.config({ cursor = { zoom_factor = math.max(zoom, 1) * 2 } })
end, { description = "Zoom in" })
```

## Avoid Accidental Duplicate Binds

Loading this file later does not mean it overrides a base combination. Matching
bindings can both execute. Check `configs/keybinds.lua`, `laptops.lua`, and
runtime registrations before adding a key:

```bash
hyprctl binds
```

The shipped source currently has intentional or unresolved duplicates:

- `SUPER+K`: base layout action and Kdenlive
- `SUPER+O`: base Dwindle action and Obsidian
- `SUPER+SHIFT+W`: wallpaper selection and wallpaper effects, both in the user
  module

Do not silently normalize these in documentation. The effective shortcut table
is maintained at [Hyprland keybindings](/keybindings/hyprland).

## Shell Commands

`hl.dsp.exec_cmd` accepts a command string. Test complex quoting, pipelines, and
fallback expressions in a shell first. Lua syntax validation cannot prove that
the embedded command behaves as intended.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```
