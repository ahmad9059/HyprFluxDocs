---
title: user-settings.lua
description: The HyprFlux module that sets layout, input, compositor, rendering, and cursor options.
---

# `user-settings.lua`

Path: `~/.config/hypr/UserConfigs/user-settings.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/user-settings.lua).

This module sets layout, input, gesture tuning, compositor behavior, XWayland, rendering, cursor, and debug options through one nested `hl.config` table.

## Configuration pattern

```lua
hl.config({
    general = {
        layout = "dwindle",
        resize_on_border = true,
    },
    input = {
        kb_layout = "us",
        numlock_by_default = true,
        touchpad = {
            natural_scroll = true,
            tap_to_click = true,
        },
    },
})
```

Hyprlang keys that contain dashes use underscores in Lua. Values should use Lua types: `true` and `false` for booleans, numeric literals for numbers, and quoted strings for text.

## Current defaults

| Area | Notable values |
|---|---|
| Layout | Dwindle, preserved splits, border resizing enabled |
| Master layout | New windows become master; factor `0.5` |
| Keyboard | US layout, `kb_options` unset, repeat rate 50, delay 300 ms |
| Pointer | Follow mouse, normal sensitivity, right-handed |
| Touchpad | Natural scrolling and tap-to-click enabled |
| Miscellaneous | VRR mode 2, ANR dialog enabled, middle-click paste disabled |
| XWayland | Enabled with forced zero scaling |
| Rendering | Direct scanout mode 2 (`auto`) |
| Cursor | Hyprcursor enabled; hardware cursor mode 2 |
| Debug | VFR enabled under `debug.vfr` |

`kb_options` is empty by default. The installer can fill in `kb_layout` from hardware detection. If you want a keyboard remap such as Caps Lock to Ctrl, set `kb_options = "ctrl:nocaps"` here yourself.

`pseudotile` and the old gesture enablement properties were removed in Hyprland 0.55. Do not restore them from older examples.

## Workspace gesture

The `gestures` table tunes workspace swipe behavior, but you enable the gesture with the dedicated API:

```lua
hl.gesture({
    fingers = 3,
    direction = "horizontal",
    action = "workspace",
})
```

## Hardware-managed values

The installer can update the keyboard layout and related machine-specific values. Review the source comments before you change a generated or detected section, and keep hardware troubleshooting separate from ordinary preference changes.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-settings.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Use `hyprctl getoption <section>:<option>` to inspect a specific effective option in a running session, for example `hyprctl getoption general:layout`.
