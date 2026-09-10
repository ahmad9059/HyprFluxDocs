# `user-animations.lua`

Path: `~/.config/hypr/UserConfigs/user-animations.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-animations.lua).

This loaded module enables animations, declares named curves, and maps
animation leaves to those curves. The route replaces the previously empty
animation reference.

## Lua Animation Pattern

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

The current HyprFlux file registers seven curves and ten animation leaves. Its
highest speed is 100 for `borderangle`, matching the Lua API cap documented in
the source.

## Current Leaves

- `windows`, `windowsIn`, `windowsOut`, and `windowsMove`
- `border` and `borderangle`
- `fade`
- `workspaces`, `workspacesIn`, and `workspacesOut`

Child leaves inherit from broader animation categories unless configured
separately. Define a curve before referring to it from an animation.

## Presets

HyprFlux ships Lua presets under `~/.config/hypr/animations/`, including a
disabled-animation preset. The animation selector does not load a preset in
place. It copies the selected file over
`UserConfigs/user-animations.lua`, then runs `hyprctl reload`.

::: warning Preset selection replaces the loaded file
Keep personal animation work somewhere else before choosing a preset. The
selector overwrites `UserConfigs/user-animations.lua`.
:::

Some preset headers still mention `hyprctl config full-reload`; the current
selector uses the supported `hyprctl reload` command.

## Disable Animations

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
