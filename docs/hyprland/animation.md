---
title: user-animations.lua
description: The HyprFlux module for animation curves, leaves, and presets.
---

# `user-animations.lua`

Path: `~/.config/hypr/UserConfigs/user-animations.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/user-animations.lua).

This module enables animations, declares named curves, and maps animation leaves to those curves.

## Lua animation pattern

```lua
hl.config({ animations = { enabled = true } })

hl.curve("smooth", {
    type = "bezier",
    points = { { 0.25, 0.1 }, { 0.25, 1.0 } },
})

hl.animation({
    leaf = "windows",
    enabled = true,
    speed = 5,
    bezier = "smooth",
    style = "slide",
})
```

The current HyprFlux file registers seven curves and ten animation leaves. Its highest speed is 100 for `borderangle`, which matches the Lua API cap documented in the source.

## Current leaves

- `windows`, `windowsIn`, `windowsOut`, and `windowsMove`
- `border` and `borderangle`
- `fade`
- `workspaces`, `workspacesIn`, and `workspacesOut`

Child leaves inherit from broader animation categories unless you configure them separately. Define a curve before you refer to it from an animation.

## Presets

HyprFlux ships Lua presets under `~/.config/hypr/animations/`, including a disabled-animation preset. The animation selector does not load a preset in place. It copies the selected file over `UserConfigs/user-animations.lua`, then runs `hyprctl reload`.

::: warning Preset selection replaces the loaded file
Keep personal animation work somewhere else before you choose a preset. The selector overwrites `UserConfigs/user-animations.lua`.
:::

Some preset headers still mention `hyprctl config full-reload`. The current selector uses the supported `hyprctl reload` command.

## Disable animations

The minimal Lua form is:

```lua
hl.config({ animations = { enabled = false } })
```

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/user-animations.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```
