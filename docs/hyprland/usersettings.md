# `user-settings.lua`

Path: `~/.config/hypr/UserConfigs/user-settings.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-settings.lua).

This module sets layout, input, gesture tuning, compositor behavior, XWayland,
rendering, cursor, and debug options through one nested `hl.config` table.

## Configuration Pattern

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

Hyprlang keys containing dashes use underscores in Lua. Values should use Lua
types: `true` and `false` for booleans, numeric literals for numbers, and quoted
strings for text.

## Current Defaults

| Area | Notable values |
|---|---|
| Layout | Dwindle, preserved splits, border resizing enabled |
| Master layout | New windows become master; factor `0.5` |
| Keyboard | US layout, `ctrl:nocaps`, repeat rate 50, delay 300 ms |
| Pointer | Follow mouse, normal sensitivity, right-handed |
| Touchpad | Natural scrolling and tap-to-click enabled |
| Miscellaneous | VRR mode 2, ANR dialog enabled, middle-click paste disabled |
| XWayland | Enabled with forced zero scaling |
| Rendering | Direct scanout mode 2 (`auto`) |
| Cursor | Hyprcursor enabled; hardware cursor mode 2 |
| Debug | VFR enabled under `debug.vfr` |

`pseudotile` and the old gesture enablement properties were removed in
Hyprland 0.55. Do not restore them from older examples.

## Workspace Gesture

The `gestures` table tunes workspace swipe behavior, but enabling the gesture
uses the dedicated API:

```lua
hl.gesture({
    fingers = 3,
    direction = "horizontal",
    action = "workspace",
})
```

## Hardware-Managed Values

The installer can update keyboard layout and related machine-specific values.
Review source comments before changing generated or detected sections, and keep
hardware troubleshooting separate from ordinary preference changes.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-settings.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Use `hyprctl getoption <section>:<option>` to inspect a specific effective
option inside a running session, for example `hyprctl getoption general:layout`.
