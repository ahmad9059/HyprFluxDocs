# `user-decorations.lua`

Path: `~/.config/hypr/UserConfigs/user-decorations.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-decorations.lua).

This module owns gaps, borders, opacity, dimming, shadows, blur, and group
colors. It imports the static generated HyprFlux palette instead of deriving
colors from the current wallpaper.

## Palette and Borders

```lua
local colors = require("hyprflux-colors")

hl.config({
    general = {
        border_size = 2,
        gaps_in = 2,
        gaps_out = 4,
        col = {
            active_border = colors.color12,
            inactive_border = colors.color10,
        },
    },
})
```

`hyprflux-colors.lua` is generated. Change the central palette source and run
the HyprFlux color synchronization utility rather than editing generated color
outputs independently.

## Current Decoration Values

| Setting | Value |
|---|---|
| Rounding | 10 |
| Active opacity | 1.0 |
| Inactive opacity | 0.9 |
| Inactive dimming | Enabled at 0.1 |
| Shadow | Disabled |
| Blur | Enabled, size 6, two passes |
| Special-workspace blur | Disabled |
| Popup blur | Enabled |

Nested blocks remain nested Lua tables:

```lua
hl.config({
    decoration = {
        shadow = { enabled = false },
        blur = {
            enabled = true,
            size = 6,
            passes = 2,
        },
    },
})
```

For a temporary lower-effects setup, disable shadow and blur explicitly rather
than copying unsupported performance presets from old documentation.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-decorations.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
```

Window-specific appearance belongs in
[`window-rules.lua`](/hyprland/windowrules), not in this global module.
